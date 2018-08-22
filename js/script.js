
//Função Que Cria o efeito de PiscaPisca na Galeria
function PiscaPisca() {
	var controle = [];

//Variavel que recebe a quantidade de filhos (figures) do ID Galerias 
var qtdFotos = $('#Galeria').children().length;

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

/*
       $('#Galeria').mouseover(function() {
        	Limpar();
        	clearInterval(PiscaAtivo);

        });*/
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


    $(document).ready(function() {
    	$(window).on("load",function(){

    		PiscaPisca();/*Chama o efeiro Pisca Pisca*/ 
    		
    		$(window).scroll(function() {/*Chama o efeiro do Topo*/
    			TopoFixo();	
    		});
    		
    	});
    });


