
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
 	$('#' + sort[0]).addClass('ocultar');

 	sort[1] = Sorteio();

 	while (sort[1] == controle[0] && sort[1] == controle[2] && sort[1] == sort[0])  {
 		sort[1] = Sorteio();
 	}

 	$('#' + sort[1]).addClass('ocultar');

 	controle = sort;

 }

        //Funçao que sorteia um numero e aplica na id da seção
        function Sorteio() {
        	var sorteio = Math.floor((Math.random()* qtdFotos) + 1);
        	return sorteio;
        }

        //Funçao que limpa as clsases da seção tornando ela visivel
        function Limpar() {
        	for (var i = 0; i <= qtdFotos; i++) {
        		var id = "#" + i;
        		$(id).removeClass('ocultar');
        	}
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

    	if ($(window).scrollTop() >= 300) {
    		$("#Topo-Menu").addClass('topo-asezo');
    		$("#Topo-Menu").removeClass('topo-apagado');
    	}
    	else {
    		$("#Topo-Menu").removeClass('topo-asezo');
    		$("#Topo-Menu").addClass('topo-apagado');
    	}
    }


    /*Dimenção da tela 
    function Dimecao() {
    	var altuta = $(window).height();//variavel que aloca a altura da janela
    	var largura = $(window).width();//variavel que aloca a largura da janela

        /*esses caras estão criando o codigo que serrá adicionado na tag Script que conten a classe Resoluçao
        ela ira adicionar as novas resoluções aos conteiners principais de cada seção
        var rowConteiners = "--conteiners: repeat(3,"+ altuta +"px)" + (altuta + altuta/10 ) + "px 70px;";
        var ContInterno = "--altura-especial: " + (altuta/3) * 2 + "px";

        $("#resolucao").append(":root {" + rowConteiners 
        	+ ContInterno +"}");
    }*/ 

    /*Agrupa e desagrupa a seção Serviços*/
    


//Esse carra chama as funções conforme o carregamento da página ocorra sem erro
$(document).ready(function() {
	$(window).on("load",function(){

		PiscaPisca();/*Chama o efeiro Pisca Pisca*/ 

		$(window).scroll(function() {/*Chama o efeiro do Topo*/
			TopoFixo();	
		});

	});
});


