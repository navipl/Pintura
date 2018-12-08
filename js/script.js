
//Função Que Cria o efeito de PiscaPisca na Galeria
function PiscaPisca() {
	var controle = [];

//Variavel que recebe a quantidade de filhos (figures) do ID Galerias 
var qtdFotos = $('.cont-galeria').children().length;

 //Funçao oculta a seção solicitada
 function Ocultar() {
 	var sort = [];
 	sort[0] = Sorteio();

 	while (sort[0] == controle[0] && sort[0] == controle[1]) {
 		sort[0] = Sorteio();
 	}
 	$('.cont-galeria figure:nth-child(' + sort[0] + ')').addClass('ocultar');

 	sort[1] = Sorteio();

 	while (sort[1] == controle[0] && sort[1] == controle[2] && sort[1] == sort[0])  {
 		sort[1] = Sorteio();
 	}

 	$('.cont-galeria figure:nth-child(' + sort[1] + ')').addClass('ocultar');

 	controle = sort;
 }
        //Funçao que sorteia um numero e aplica na id da seção
        function Sorteio() {
        	var sorteio = Math.floor((Math.random()* qtdFotos) + 1);
        	return sorteio;
        }

        //Funçao que limpa as clsases da seção tornando ela visivel
        function Limpar() {
        	$('.cont-galeria').children().removeClass('ocultar');
        }

        //Chama as funções para criar a animaçã piscapisca
        var PiscaAtivo = setInterval(function() {
        	Limpar();
        	Ocultar();
        } ,2000);

        //Se o mouse estiver encima das imagens a animação para
        $('.cont-galeria').mouseover(function() {
        	Limpar();
        	clearInterval(PiscaAtivo);
        });

        //A animação volta quandio o mouse sai de cima das imagens
        $('.cont-galeria').mouseleave(function() {
        	PiscaAtivo = setInterval(function() {
        		Limpar();
        		Ocultar();
        	} ,2000);
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
     else if (menuTop < alturaTop){
     	$("#Topo-Menu").removeClass("menu-fixo");
     }


    /*Esse trecho identifica a seção que esta sendo visualizada e marca ela no menu*/
 	var s = $("#Servicos").position().top;//Posição da seção serviços
 	var g = $("#Galeria").position().top;//Posição da seção Galeria
 	var o = $("#Solicite").position().top;//Posição da seção orgamentos
 	var kids = $(".menu-pintura").children();//Variavel que recebe os itens do menu

 	if (docScroll >= s && docScroll < g) {
        kids.removeClass("menu-ativo");//remove a borda de todos os itens do menu
 		$(".menu-pintura li:nth-child(1)").addClass("menu-ativo");//Add a borda ao primeiro item
 	}

 	else if (docScroll >= g && docScroll < o) {
 		kids.removeClass("menu-ativo");//remove a borda de todos os itens do menu
 		$(".menu-pintura li:nth-child(2)").addClass("menu-ativo");//Add a borda ao segundo item
 	}

 	else if (docScroll >= o) {
 		kids.removeClass("menu-ativo");//remove a borda de todos os itens do menu
 		$(".menu-pintura li:nth-child(3)").addClass("menu-ativo");//Add a borda ao terceiro item
 	}

 	else {
 		kids.removeClass("menu-ativo");
 	}
 }

 function SocialAtivar(ind, clas) {
	$("#Menu-Social figure:nth-child(n)").removeClass();
	$("#Menu-Social figure:nth-child("+ ind +")").addClass(clas);
	$("#Menu-Social figure:nth-child("+ ind +")").addClass("ico-ativo");

}




//Esse carra chama as funções conforme o carregamento da página ocorra sem erro
jQuery(document).ready(function($) {
	PiscaPisca();//Chama o efeiro Pisca Pisca 
	TopoFixo();//Chama o efeiro do Topo

	/*Chama o efeiro do Topo*/
	$(document).on("scroll", function() {
		TopoFixo();
	});

	$("#Menu-Social figure").click(function(){
		$("#Social-Box").toggleClass("social-ativo");	
	});

	$("#Servicos, #Galeria, #Solicite, #Rodape, .menu-pintura,.box-super").mouseenter(function(){
		$("#Menu-Social figure:nth-child(n)").removeClass();
		$("#Social-Box").removeClass("social-ativo");	
		
	});

	

});



