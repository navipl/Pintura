
var indexFotos = [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var dados = JSON.parse(this.responseText);
		indexFotos = dados.fotos;
	}
};
xmlhttp.open("GET", "js/fotos-galeria.json", true);
xmlhttp.send();

//Função Que Cria o efeito de PiscaPisca na Galeria
function PiscaPisca() {

	//Variavel que recebe a quantidade de filhos (figures) do ID Galerias 
	var qtdFotos = $('.cont-galeria').children().length;

	var controle = [];

	var mapaFotos = MapaGaleria(qtdFotos, indexFotos);
	console.log(indexFotos[1].fLocal);

	//Funçao oculta a seção solicitada
	function Ocultar() {
		var sort = [];

		sort[0] = Sorteio();
		sort[1] = Sorteio();


		while (sort[0] == controle[0] || sort[0] == controle[1]) {
			sort[0] = Sorteio();
		}

		while (sort[1] == controle[0] || sort[1] == controle[1] || sort[1] == sort[0]) {
			sort[1] = Sorteio();
		}

		mapaFotos[sort[0] - 1] = NovaFoto();
		mapaFotos[sort[1] - 1] = NovaFoto();

		var trocaFt = setTimeout(function () {
			$('.cont-galeria figure:nth-child(' + sort[0] + ') img').attr("src", indexFotos[mapaFotos[sort[0] - 1]].fLocal);
			$('.cont-galeria figure:nth-child(' + sort[1] + ') img').attr("src", indexFotos[mapaFotos[sort[1] - 1]].fLocal);
		}, 1000);


		$('.cont-galeria figure:nth-child(' + sort[0] + ')').addClass('ocultar');
		$('.cont-galeria figure:nth-child(' + sort[1] + ')').addClass('ocultar');

		//Se o mouse estiver encima das imagens a animação para
		$('.cont-galeria').mouseover(function () {
			Limpar();
			clearInterval(trocaFto);
		});

		controle = sort;
	}

	//Função verifica quais fotos estão na galeria e retorna a de numero maior
	function MapaGaleria(qtF, iF) {
		var mg = [];
		for (var i = 1; i <= qtF; i++) {
			var valor = $(".cont-galeria figure:nth-child(" + i + ") img").attr("src");
			mg.push(Localizador(valor));
		}

		function Localizador(v) {
			var resp = false;
			var cont = 0;

			while (!resp) {
				if (v == iF[cont].fLocal) {
					resp = true;
					return cont;
				} else {
					cont++;
				}
			}
		}
		return mg;
	}

	function NovaFoto() {
		var p;
		//função que retorna o valor da posição maior dentro do mapa da galeria
		var mapaMaior = mapaFotos.reduce(function (a, b) {
			return Math.max(a, b);
		});

		p = mapaMaior + 1;

		if (p >= indexFotos.length) {
			p = 0;
		}
		var busca = false;
		var contBusca = 0;

		while (!busca) {
			console.log(p);
			if (p == mapaFotos[contBusca]) {
				p++;
				contBusca = 0;
			} else {
				contBusca++;
			}

			if (contBusca >= mapaFotos.length) {
				busca = true;
			}
		}

		return p;
	}

	//Funçao que sorteia um numero e aplica na id da seção
	function Sorteio() {
		var sorteio = Math.floor(Math.random() * (qtdFotos + 1));
		if (sorteio == 0) {
			sorteio++;
		}
		return sorteio;
	}

	//Funçao que limpa as clsases da seção tornando ela visivel
	function Limpar() {
		$('.cont-galeria').children().removeClass('ocultar');
	}

	//Chama as funções para criar a animaçã piscapisca
	var PiscaAtivo = setInterval(function () {
		Limpar();
		Ocultar();
	}, 2000);

	//Se o mouse estiver encima das imagens a animação para
	$('.cont-galeria').mouseover(function () {
		Limpar();
		clearInterval(PiscaAtivo);
	});

	//A animação volta quandio o mouse sai de cima das imagens
	$('.cont-galeria').mouseleave(function () {
		PiscaPisca();
	});
};







/*Efeito menu topo*/
function TopoFixo() {

	/*Este trecho do codigo fixa o menu ou mantem o mesmo abaixo da seção inicial*/
	var menuTop = $("#Topo-Menu").offset().top; //Seta a possição inicial do menu com relação ao seu topo
	var docScroll = $(document).scrollTop(); //Seta a distancia de rolagem do topo conforme decemos a pagina
	var alturaTop = $("#Topo").outerHeight();//Seta a altura do primeiro conteiner onde o menu deve esta abaixo

	//Se a distancia do topo for maior que a posição em que o menu está, ele passa a ser fixo
	if (docScroll > menuTop) {
		$("#Topo-Menu").addClass("menu-fixo");
	}

	//Se a possição fixa do menu for menor que a altura do primeiro conteiner ele volta a ficar abaixo do conteiner inicial
	else if (menuTop < alturaTop) {
		$("#Topo-Menu").removeClass("menu-fixo");
	}


	/*Esse trecho identifica a seção que esta sendo visualizada e marca ela no menu*/
	var s = $("#Servicos").position().top;//Posição da seção serviços
	var g = $("#Galeria").position().top;//Posição da seção Galeria
	var c = $("#Contatos").position().top;//Posição da seção orgamentos
	var o = $("#Solicite").position().top;//Posição da seção orgamentos
	var kids = $(".menu-pintura").children();//Variavel que recebe os itens do menu

	if (docScroll >= s - 60 && docScroll < g - 60) {
		kids.removeClass("menu-ativo");//remove a borda de todos os itens do menu
		$(".menu-pintura li:nth-child(1)").addClass("menu-ativo");//Add a borda ao primeiro item
	}

	else if (docScroll >= g - 60 && docScroll < c - 60) {
		kids.removeClass("menu-ativo");//remove a borda de todos os itens do menu
		$(".menu-pintura li:nth-child(2)").addClass("menu-ativo");//Add a borda ao segundo item
	}

	else if (docScroll >= c - 60 && docScroll < o - 60) {
		kids.removeClass("menu-ativo");//remove a borda de todos os itens do menu
		$(".menu-pintura li:nth-child(3)").addClass("menu-ativo");//Add a borda ao segundo item
	}

	else if (docScroll >= o - 60) {
		kids.removeClass("menu-ativo");//remove a borda de todos os itens do menu
		$(".menu-pintura li:nth-child(4)").addClass("menu-ativo");//Add a borda ao terceiro item
	}

	else {
		kids.removeClass("menu-ativo");
	}
}

function SocialAtivar(ind, clas) {
	$("#Menu-Social figure:nth-child(n)").removeClass();
	$("#Menu-Social figure:nth-child(" + ind + ")").addClass(clas);

}


function ManipulaMoldal() {
	$("#Moldal").toggleClass('moldal-ativo');
	$("#Moldal").toggleClass('moldal-inativo');

	$("#Cont-Inicio .box-center").toggleClass('box-frozen');

}

function ExibeMoldal(m) {
	var conteudo = $(m).html();

	$("#Moldal .cont-moldal div").empty();

	$("#Moldal .cont-moldal div").append(conteudo);

	ManipulaMoldal();
}




//Esse carra chama as funções conforme o carregamento da página ocorra sem erro
jQuery(document).ready(function ($) {
	PiscaPisca();//Chama o efeiro Pisca Pisca 
	TopoFixo();//Chama o efeiro do Topo

	/*Chama o efeiro do Topo*/
	$(document).on("scroll", function () {
		TopoFixo();

		$("#Menu-Social figure:nth-child(n)").removeClass();
		$("#Social-Box").removeClass("social-ativo");
		$("#Topo-Menu .box-menu").removeClass("boton-menu-ativo");
	});

	$("#Menu-Social figure").click(function () {
		$("#Social-Box").toggleClass("social-ativo");
	})

	$("#Menu-Social").mouseleave(function () {
		$("#Menu-Social figure:nth-child(n)").removeClass();
		$("#Social-Box").removeClass("social-ativo");
	});


	$("#Botao-Menu .boton-menu").click(function () {
		$("#Topo-Menu .box-menu").toggleClass("boton-menu-ativo");
	})

	$("#Topo-Menu").mouseleave(function () {
		$("#Topo-Menu .box-menu").removeClass("boton-menu-ativo");
	});

});



