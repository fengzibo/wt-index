function createLi(){
	var num = parseInt(Math.random()*2) ;
	var oLi=document.createElement("li");;
	switch(num){
		case 0:
		oLi.className="lst-sty1";
		oLi.innerHTML="<a class='acom-til'>宝宝心里苦0</a><a><img class='sty1-img lf'></a><div><p>奥斯卡大家哈苏的噶UI的活塞U盾hi爱US会丢撒hi</p></div>";
		break;
		case 1:
		oLi.className="lst-sty2";
		oLi.innerHTML="<a class='acom-til'>宝宝心里苦1</a><a><img class='sty1-img lf'></a><div><p>213阿萨德</p></div>";
		break;
		case 2:
		oLi.className="lst-sty2";
		oLi.innerHTML="<a><img class='sty1-img lf'></a><a class='acom-til'>宝宝心里苦2</a><div><p>213阿萨德</p></div>";
		break;
	}
	return oLi;
}
window.onload=function(){
	var oBox=document.getElementById('box');
	var aUl=oBox.getElementsByTagName('ul');
	
	function createAll(){
		for(var i=0; i<6; i++){
			var oLi=createLi();

			var h1=aUl[0].offsetHeight;
			var h2=aUl[1].offsetHeight;
			var h3=aUl[2].offsetHeight;

			var oMinUl=null;
			//比较高度
			if(h1<h2){
				if(h1<h3){
					oMinUl=aUl[0];
				}else{
					oMinUl=aUl[2];
				}
			}else{
				if(h2<h3){
					oMinUl=aUl[1];
				}else{
					oMinUl=aUl[2];
				}
			}

			oMinUl.appendChild(oLi);
		}
	}
	
	createAll();
	//window.onscroll=function(){
	//	var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
	//	var scrollBottom=scrollT+document.documentElement.clientHeight;
	//	document.title=scrollBottom+'|'+document.body.scrollHeight ;
	//	if(scrollBottom>=document.body.scrollHeight){
	//		createAll();
	//	}
	//}
}