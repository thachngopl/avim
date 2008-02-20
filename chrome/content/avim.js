/*
 * AVIM JavaScript Vietnamese Input Method Source File dated 02-11-2007
 * 
 * Copyright (C) 2004-2007 Hieu Tran Dang <lt2hieu2004 (at) users (dot) sf (dot) net>
 * Website:	http://avim.veneroida.com/
 * 
 * You are allowed to use this software in any way you want providing:
 * 	1. You must retain this copyright notice at all time
 * 	2. You must not claim that you or any other third party is the author
 *	   of this software in any way.
 * 
 * Modified for the AVIM Firefox extension by Minh Nguyen <http://www.1ec5.org/>.
 */

// Remember to set these defaults in defaults/preferences/avim.js!
var va="email,TextboxEval".split(','); //Put the ID of the fields you DON'T want to let users type Vietnamese in, multiple fields allowed, separated by a comma (,)
var method=0; //Default input method, 0=AUTO, 1=TELEX, 2=VNI, 3=VIQR, 4=VIQR*
var on_off=1; //Start AVIM on
var dockspell=1; //Start AVIM with spell checking on
var dauCu=1; //Start AVIM with old way of marking accent (o`a, o`e, u`y)
var radioID="him_auto,him_telex,him_vni,him_viqr,him_viqr2,him_off,him_ckspell,him_daucu".split(",");
var enabledID = "him_on";
var methodLabel = "avim-status";
var nextKeyID = "avim-enabled-key";
var methodCmdID = "avim-method-cmd";
var alphabet="QWERTYUIOPASDFGHJKLZXCVBNM ",them,attached=[];
var S,F,J,R,X,D,oc,sk,saveStr,wi,frame,D2;
var support=true,changed=false,specialChange=false,uni,uni2,g,h,SFJRX,DAWEO,Z,AEO,moc,trang,kl=0,tw5,range=null,fID=document.getElementsByTagName("iframe");
var skey=[97,226,259,101,234,105,111,244,417,117,432,121,65,194,258,69,202,73,79,212,416,85,431,89];
var skey2="a,a,a,e,e,i,o,o,o,u,u,y,A,A,A,E,E,I,O,O,O,U,U,Y".split(','),A,E,O,whit=false,english="ĐÂĂƠƯÊÔ",lowen="đâăơưêô",ds1="d,D".split(","),db1=[273,272];
var os1="o,O,ơ,Ơ,ó,Ó,ò,Ò,ọ,Ọ,ỏ,Ỏ,õ,Õ,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ".split(","),ob1="ô,Ô,ô,Ô,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ".split(",");
var mocs1="o,O,ô,Ô,u,U,ó,Ó,ò,Ò,ọ,Ọ,ỏ,Ỏ,õ,Õ,ú,Ú,ù,Ù,ụ,Ụ,ủ,Ủ,ũ,Ũ,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ".split(",");var mocb1="ơ,Ơ,ơ,Ơ,ư,Ư,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ,ứ,Ứ,ừ,Ừ,ự,Ự,ử,Ử,ữ,Ữ,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ".split(",");
var trangs1="a,A,â,Â,á,Á,à,À,ạ,Ạ,ả,Ả,ã,Ã,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ".split(",");var trangb1="ă,Ă,ă,Ă,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ".split(",");
var as1="a,A,ă,Ă,á,Á,à,À,ạ,Ạ,ả,Ả,ã,Ã,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ,ế,Ế,ề,Ề,ệ,Ệ,ể,Ể,ễ,Ễ".split(",");var ab1="â,Â,â,Â,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ,é,É,è,È,ẹ,Ẹ,ẻ,Ẻ,ẽ,Ẽ".split(",");
var es1="e,E,é,É,è,È,ẹ,Ẹ,ẻ,Ẻ,ẽ,Ẽ".split(",");var eb1="ê,Ê,ế,Ế,ề,Ề,ệ,Ệ,ể,Ể,ễ,Ễ".split(",");
var arA="á,à,ả,ã,ạ,a,Á,À,Ả,Ã,Ạ,A".split(',');var mocrA="ó,ò,ỏ,õ,ọ,o,ú,ù,ủ,ũ,ụ,u,Ó,Ò,Ỏ,Õ,Ọ,O,Ú,Ù,Ủ,Ũ,Ụ,U".split(',');var erA="é,è,ẻ,ẽ,ẹ,e,É,È,Ẻ,Ẽ,Ẹ,E".split(',');var orA="ó,ò,ỏ,õ,ọ,o,Ó,Ò,Ỏ,Õ,Ọ,O".split(',');
var aA="ấ,ầ,ẩ,ẫ,ậ,â,Ấ,Ầ,Ẩ,Ẫ,Ậ,Â".split(',');var mocA="ớ,ờ,ở,ỡ,ợ,ơ,ứ,ừ,ử,ữ,ự,ư,Ớ,Ờ,Ở,Ỡ,Ợ,Ơ,Ứ,Ừ,Ử,Ữ,Ự,Ư".split(',');var trangA="ắ,ằ,ẳ,ẵ,ặ,ă,Ắ,Ằ,Ẳ,Ẵ,Ặ,Ă".split(',');var eA="ế,ề,ể,ễ,ệ,ê,Ế,Ề,Ể,Ễ,Ệ,Ê".split(',');var oA="ố,ồ,ổ,ỗ,ộ,ô,Ố,Ồ,Ổ,Ỗ,Ộ,Ô".split(',');

function notWord(w) {
	var str=" \r\n#,\\;.:-_()<>+-*/=?!\"$%{}[]'~|^@&\t"+fcc(160);
	return (str.indexOf(w)>=0);
}
function nan(w) {
	return (isNaN(w))||(w=='e');
}
function mozGetText(obj) {
	var v,pos,w="";g=1;
	v=(obj.data)?obj.data:obj.value;
	if(v.length<=0) return false;
	if(!obj.data) {
		if(!obj.setSelectionRange) return false;
		pos=obj.selectionStart;
	} else pos=obj.pos;
	if(obj.selectionStart!=obj.selectionEnd) return ["",pos];
	while(1) {
		if(pos-g<0) break;
		else if(notWord(v.substr(pos-g,1))) {
			if(v.substr(pos-g,1)=="\\") w=v.substr(pos-g,1)+w;
			break;
		}
		else w=v.substr(pos-g,1)+w;
		g++;
	}
	return [w,pos];
}
function start(obj,key) {
	var w="",nnc;oc=obj;uni2=false;
	if(method==0) { uni="D,A,E,O,W,W".split(','); uni2="9,6,6,6,7,8".split(','); D2="DAWEO6789"; }
	else if(method==1) { uni="D,A,E,O,W,W".split(','); D2="DAWEO"; }
	else if(method==2) { uni="9,6,6,6,7,8".split(','); D2="6789"; }
	else if(method==3) { uni="D,^,^,^,+,(".split(','); D2="D^+("; }
	else if(method==4) { uni="D,^,^,^,*,(".split(','); D2="D^*("; }
	key=fcc(key.which);
	w=mozGetText(obj);
	nnc=(D2.indexOf(up(key))>=0);
	if((!w)||(obj.sel)) return;
	main(w[0],key,w[1],uni,nnc);
	if(!dockspell) w=mozGetText(obj);
	if((w)&&(uni2)&&(!changed)) main(w[0],key,w[1],uni2,nnc);
	if(D2.indexOf(up(key))>=0) {
		w=mozGetText(obj);
		if(!w) return;
		normC(w[0],key,w[1]);
	}
}
function tr(k,w,by,sf,i) {
	var r,pos=findC(w,k,sf);
	if(pos) {
		if(pos[1]) return replaceChar(oc,i-pos[0],pos[1]);
		var c,pC=w.substr(w.length-pos,1),cmp;r=sf;
		for(g=0;g<r.length;g++) {
			if((nan(r[g]))||(r[g]=="e")) cmp=pC;
			else cmp=pC.charCodeAt(0);
			if(cmp==r[g]) {
				if(!nan(by[g])) c=by[g];
				else c=by[g].charCodeAt(0);
				return replaceChar(oc,i-pos,c);
			}
		}
	}
	return false;
}
function main(w,k,i,a,nnc) {
	var uk=up(k),bya=[db1,ab1,eb1,ob1,mocb1,trangb1],got=false,t="d,D,a,A,a,A,o,O,u,U,e,E,o,O".split(",");
	var sfa=[ds1,as1,es1,os1,mocs1,trangs1],by=[],sf=[];
	if((method==2)||((method==0)&&(a[0]=="9"))) {
		DAWEO="6789";SFJRX="12534";S="1";F="2";J="5";R="3";X="4";Z="0";D="9";FRX="234";AEO="6";moc="7";trang="8";them="678";A="^";E="^";O="^";
	} else if(method==3) {
		DAWEO="^+(D";SFJRX="'`.?~";S="'";F="`";J=".";R="?";X="~";Z="-";D="D";FRX="`?~";AEO="^";moc="+";trang="(";them="^+(";A="^";E="^";O="^";
	} else if(method==4) {
		DAWEO="^*(D";SFJRX="'`.?~";S="'";F="`";J=".";R="?";X="~";Z="-";D="D";FRX="`?~";AEO="^";moc="*";trang="(";them="^*(";A="^";E="^";O="^";
	} else if((method==1)||((method==0)&&(a[0]=="D"))) {
		SFJRX="SFJRX";DAWEO="DAWEO";D='D';S='S';F='F';J='J';R='R';X='X';Z='Z';FRX="FRX";them="AOEW";trang="W";moc="W";A="A";E="E";O="O";
	}
	if(SFJRX.indexOf(uk)>=0) {
		var ret=sr(w,k,i); got=true;
		if(ret) return ret;
	} else if(uk==Z) {
		sf=repSign(null);
		for(h=0;h<english.length;h++) {
			sf[sf.length]=lowen.charCodeAt(h);
			sf[sf.length]=english.charCodeAt(h);
		}
		for(h=0;h<5;h++) for(g=0;g<skey.length;g++) by[by.length]=skey[g];
		for(h=0;h<t.length;h++) by[by.length]=t[h];
		got=true;
	}
	else for(h=0;h<a.length;h++) if(a[h]==uk) { got=true; by=by.concat(bya[h]); sf=sf.concat(sfa[h]); }
	if(uk==moc) whit=true;
	if(!got) {
		if(nnc) return;
		return normC(w,k,i);
	}
	return DAWEOZ(k,w,by,sf,i,uk);
}
function DAWEOZ(k,w,by,sf,i,uk) { if((DAWEO.indexOf(uk)>=0)||(Z.indexOf(uk)>=0)) return tr(k,w,by,sf,i); }
function normC(w,k,i) {
	var uk=up(k),u=repSign(null),fS,c,j,space=(k.charCodeAt(0)==32);
	if(space) return;
	for(j=1;j<=w.length;j++) {
		for(h=0;h<u.length;h++) {
			if(u[h]==w.charCodeAt(w.length-j)) {
				if(h<=23) fS=S;
				else if(h<=47) fS=F;
				else if(h<=71) fS=J;
				else if(h<=95) fS=R;
				else fS=X;
				c=skey[h%24]; if((alphabet.indexOf(uk)<0)&&(D2.indexOf(uk)<0)) return w;
				w=unV(w);
				if((!space)&&(!changed)) w+=k;
				var sp=oc.selectionStart,pos=sp;
				if(!changed) {
					var sst=oc.scrollTop;pos+=k.length;
					if(!oc.data) { oc.value=oc.value.substr(0,sp)+k+oc.value.substr(oc.selectionEnd);changed=true;oc.scrollTop=sst; }
					else { oc.insertData(oc.pos,k);oc.pos++;range.setEnd(oc,oc.pos);specialChange=true; }
				}
				if(!oc.data) oc.setSelectionRange(pos,pos);
				if(!ckspell(w,fS)) {
					replaceChar(oc,i-j,c);
					var a=[D];
					if(!oc.data) {
						main(w,fS,pos,a,false);
					} else {
						var ww=mozGetText(oc);
						main(ww[0],fS,ww[1],a,false);
					}
				}
			}
		}
	}
}
function spellerr(w, k) {
	if (!!dockspell) ckspell(w, k);
	else return false;
}
function ckspell(w,k) {
	w=unV(w); var exc="UOU,IEU".split(','),z,next=true,noE="UU,UOU,UOI,IEU,AO,IA,AI,AY,AU,AO".split(','),noBE="YEU",test,a,b;
	var check=true,noM="UE,UYE,IU,EU,UY".split(','),noMT="AY,AU".split(','),noT="UA",t=-1,notV2="IAO";
	var uw=up(w),tw=uw,update=false,gi="IO",noAOEW="OE,OO,AO,EO,IA,AI".split(','),noAOE="OA";
	var notViet="AA,AE,EE,OU,YY,YI,IY,EY,EA,EI,II,IO,YO,YA,OOO".split(','),uk=up(k),twE,uw2=unV2(uw);
	var vSConsonant="B,C,D,G,H,K,L,M,N,P,Q,R,S,T,V,X".split(','),vDConsonant="CH,GI,KH,NGH,GH,NG,NH,PH,QU,TH,TR".split(',');
	var vDConsonantE="CH,NG,NH".split(','),sConsonant="C,P,T,CH".split(','),vSConsonantE="C,M,N,P,T".split(',');
	var noNHE="O,U,IE,Ô,Ơ,Ư,IÊ,Ă,Â,UYE,UYÊ,UO,ƯƠ,ƯO,UƠ,UA,ƯA,OĂ,OE,OÊ".split(','),oMoc="UU,UOU".split(',');
	if(FRX.indexOf(uk)>=0) for(a=0;a<sConsonant.length;a++) if(uw.substr(uw.length-sConsonant[a].length,sConsonant[a].length)==sConsonant[a]) return true;
	for(a=0;a<uw.length;a++) {
		if("FJZW1234567890".indexOf(uw.substr(a,1))>=0) return true;
		for(b=0;b<notViet.length;b++) {
			if(uw2.substr(a,notViet[b].length)==notViet[b]) {
				for(z=0;z<exc.length;z++) if(uw2.indexOf(exc[z])>=0) next=false;
				if((next)&&((gi.indexOf(notViet[b])<0)||(a<=0)||(uw2.substr(a-1,1)!='G'))) return true;
			}
		}
	}
	for(b=0;b<vDConsonant.length;b++) if(tw.indexOf(vDConsonant[b])==0){tw=tw.substr(vDConsonant[b].length);update=true;t=b;break}
	if(!update) for(b=0;b<vSConsonant.length;b++) if(tw.indexOf(vSConsonant[b])==0){tw=tw.substr(1);break}
	update=false;twE=tw;
	for(b=0;b<vDConsonantE.length;b++) {
		if(tw.substr(tw.length-vDConsonantE[b].length)==vDConsonantE[b]) {
			tw=tw.substr(0,tw.length-vDConsonantE[b].length);
			if(b==2){
				for(z=0;z<noNHE.length;z++) if(tw==noNHE[z]) return true;
				if((uk==trang)&&((tw=="OA")||(tw=="A"))) return true;
			}
			update=true;break;
		}
	}
	if(!update) for(b=0;b<vSConsonantE.length;b++) if(tw.substr(tw.length-1)==vSConsonantE[b]){tw=tw.substr(0,tw.length-1);break}
	if(tw) {
		for(a=0;a<vDConsonant.length;a++) {
			for(b=0;b<tw.length;b++) { if(tw.substr(b,vDConsonant[a].length)==vDConsonant[a]) return true; }
		}
		for(a=0;a<vSConsonant.length;a++) { if(tw.indexOf(vSConsonant[a])>=0) return true; }
	}
	test=tw.substr(0,1);
	if((t==3)&&((test=="A")||(test=="O")||(test=="U")||(test=="Y"))) return true;
	if((t==5)&&((test=="E")||(test=="I")||(test=="Y"))) return true;
	uw2=unV2(tw);
	if(uw2==notV2) return true;
	if(tw!=twE) for(z=0;z<noE.length;z++) if(uw2==noE[z]) return true;
	if((tw!=uw)&&(uw2==noBE)) return true;
	if(uk!=moc) for(z=0;z<oMoc.length;z++) if(tw==oMoc[z]) return true;
	if((uw2.indexOf('UYE')>0)&&(uk=='E')) check=false;
	if((them.indexOf(uk)>=0)&&(check)) {
		for(a=0;a<noAOEW.length;a++) if(uw2.indexOf(noAOEW[a])>=0) return true;
		if(uk!=trang) if(uw2==noAOE) return true;
		if((uk==trang)&&(trang!='W')) if(uw2==noT) return true;
		if(uk==moc) for(a=0;a<noM.length;a++) if(uw2==noM[a]) return true;
		if((uk==moc)||(uk==trang)) for(a=0;a<noMT.length;a++) if(uw2==noMT[a]) return true;
	}
	tw5=tw;
	if((uw2.charCodeAt(0)==272)||(uw2.charCodeAt(0)==273)) { if(uw2.length>4) return true; }
	else if(uw2.length>3) return true;
	return false;
}
function DAWEOF(cc,k) {
	var ret=[],kA=[A,moc,trang,E,O],z,a;ret[0]=g;
	var ccA=[aA,mocA,trangA,eA,oA],ccrA=[arA,mocrA,arA,erA,orA];
	for(a=0;a<kA.length;a++) if(k==kA[a]) for(z=0;z<ccA[a].length;z++) if(cc==ccA[a][z]) ret[1]=ccrA[a][z];
	if(ret[1]) return ret;
	return false;
}
function findC(w,k,sf) {
	if(((method==3)||(method==4))&&(w.substr(w.length-1,1)=="\\")) return [1,k.charCodeAt(0)];
	var str="",res,cc="",pc="",tE="",vowA=[],s="ÂĂÊÔƠƯêâăơôư",c=0,dn=false,uw=up(w),tv;
	var DAWEOFA=aA.join()+eA.join()+mocA.join()+trangA.join()+oA.join()+english;DAWEOFA=up(DAWEOFA);
	for(g=0;g<sf.length;g++) {
		if(nan(sf[g])) str+=sf[g];
		else str+=fcc(sf[g]);
	}
	var uk=up(k),i=w.length,uni_array=repSign(k),w2=up(unV2(unV(w))),dont="ƯA,ƯU".split(',');
	if (DAWEO.indexOf(uk)>=0) {
		if(uk==moc) {
			if((w2.indexOf("UU")>=0)&&(tw5!=dont[1])) {
				if(w2.indexOf("UU")==(w.length-2)) res=2;
				else return false;
			} else if(w2.indexOf("UOU")>=0) {
				if(w2.indexOf("UOU")==(w.length-3)) res=2;
				else return false;
			}
		}
		if(!res) {
			for(g=1;g<=w.length;g++) {
				cc=w.substr(w.length-g,1);
				pc=up(w.substr(w.length-g-1,1));
				uc=up(cc);
				for(h=0;h<dont.length;h++) if((tw5==dont[h])&&(tw5==unV(pc+uc))) dn=true;
				if(dn) { dn=false; continue; }
				if(str.indexOf(uc)>=0) {
					if(((uk==moc)&&(unV(uc)=="U")&&(up(unV(w.substr(w.length-g+1,1)))=="A"))||((uk==trang)&&(unV(uc)=='A')&&(unV(pc)=='U'))) {
						if(unV(uc)=="U") tv=1;
						else tv=2;
						ccc=up(w.substr(w.length-g-tv,1));
						if(ccc!="Q") res=g+tv-1;
						else if(uk==trang) res=g;
						else if(moc!=trang) return false;
					} else res=g;
					if((!whit)||(uw.indexOf("Ư")<0)||(uw.indexOf("W")<0)) break;
				} else if(DAWEOFA.indexOf(uc)>=0) {
					if(uk==D) {
						if(cc=="đ") res=[g,'d'];
						else if(cc=="Đ") res=[g,'D'];
					} else res=DAWEOF(cc,uk);
					if(res) break;
				}
			}
		}
	}
	if((uk!=Z)&&(DAWEO.indexOf(uk)<0)) { var tEC=retKC(uk); for (g=0;g<tEC.length;g++) tE+=fcc(tEC[g]); }
	for(g=1;g<=w.length;g++) {
		if(DAWEO.indexOf(uk)<0) {
			cc=up(w.substr(w.length-g,1));
			pc=up(w.substr(w.length-g-1,1));
			if(str.indexOf(cc)>=0) {
				if(cc=='U') {
					if(pc!='Q') { c++;vowA[vowA.length]=g; }
				} else if(cc=='I') {
					if((pc!='G')||(c<=0)) { c++;vowA[vowA.length]=g; }
				} else { c++;vowA[vowA.length]=g; }
			} else if(uk!=Z) {
				for(h=0;h<uni_array.length;h++) if(uni_array[h]==w.charCodeAt(w.length-g)) {
					if(spellerr(w,k)) return false;
					return [g,tEC[h%24]];
				}
				for(h=0;h<tEC.length;h++) if(tEC[h]==w.charCodeAt(w.length-g)) return [g,fcc(skey[h])];
			}
		}
	}
	if((uk!=Z)&&(typeof(res)!='object')) if(spellerr(w,k)) return false;
	if(DAWEO.indexOf(uk)<0) {
		for(g=1;g<=w.length;g++) {
			if((uk!=Z)&&(s.indexOf(w.substr(w.length-g,1))>=0)) return g;
			else if(tE.indexOf(w.substr(w.length-g,1))>=0) {
				for(h=0;h<tEC.length;h++) {
					if(w.substr(w.length-g,1).charCodeAt(0)==tEC[h]) return [g,fcc(skey[h])];
				}
			}
		}
	}
	if(res) return res;
	if((c==1)||(uk==Z)) return vowA[0];
	else if(c==2) {
		var v=2;
		if(w.substr(w.length-1)==" ") v=3;
		var ttt=up(w.substr(w.length-v,2));
		if((dauCu==0)&&((ttt=="UY")||(ttt=="OA")||(ttt=="OE"))) return vowA[0];
		var c2=0,fdconsonant,sc="BCD"+fcc(272)+"GHKLMNPQRSTVX",dc="CH,GI,KH,NGH,GH,NG,NH,PH,QU,TH,TR".split(',');
		for(h=1;h<=w.length;h++) {
			fdconsonant=false;
			for(g=0;g<dc.length;g++) {
				if(up(w.substr(w.length-h-dc[g].length+1,dc[g].length)).indexOf(dc[g])>=0) {
					c2++;fdconsonant=true;
					if(dc[g]!='NGH') h++;
					else h+=2;
				}
			}
			if(!fdconsonant) {
				if(sc.indexOf(up(w.substr(w.length-h,1)))>=0) c2++;
				else break;
			}
		}
		if((c2==1)||(c2==2)) return vowA[0];
		return vowA[1];
	} else if(c==3) return vowA[1];
	else return false;
}
function unV(w) {
	var u=repSign(null),b,a;
	for(a=1;a<=w.length;a++) {
		for(b=0;b<u.length;b++) {
			if(u[b]==w.charCodeAt(w.length-a)) {
				w=w.substr(0,w.length-a)+fcc(skey[b%24])+w.substr(w.length-a+1);
			}
		}
	}
	return w;
}
function unV2(w) {
	var a,b;
	for(a=1;a<=w.length;a++) {
		for(b=0;b<skey.length;b++) {
			if(skey[b]==w.charCodeAt(w.length-a)) w=w.substr(0,w.length-a)+skey2[b]+w.substr(w.length-a+1);
		}
	}
	return w;
}
function repSign(k) {
	var t=[],u=[],a,b;
	for(a=0;a<5;a++) {
		if((k==null)||(SFJRX.substr(a,1)!=up(k))) {
			t=retKC(SFJRX.substr(a,1));
			for(b=0;b<t.length;b++) u[u.length]=t[b];
		}
	}
	return u;
}
function sr(w,k,i) {
	var sf=getSF();
	pos=findC(w,k,sf);
	if(pos) {
		if(pos[1]) replaceChar(oc,i-pos[0],pos[1]);
		else {
			var c=retUni(w,k,pos);
			replaceChar(oc,i-pos,c);
		}
	}
	return false;
}
function retUni(w,k,pos) {
	var u=retKC(up(k)),uC,lC,c=w.charCodeAt(w.length-pos),a;
	for(a=0;a<skey.length;a++) if(skey[a]==c) {
		if(a<12) { lC=a;uC=a+12; }
		else { lC=a-12;uC=a; }
		t=fcc(c);if(t!=up(t)) return u[lC];
		return u[uC];
	}
}
function replaceChar(o,pos,c) {
	var bb=false; if(!nan(c)) { var replaceBy=fcc(c),wfix=up(unV(fcc(c))); changed=true; }
	else { var replaceBy=c; if((up(c)=="O")&&(whit)) bb=true; }
	if(!o.data) {
		var savePos=o.selectionStart,sst=o.scrollTop;
		if ((up(o.value.substr(pos-1,1))=='U')&&(pos<savePos-1)&&(up(o.value.substr(pos-2,1))!='Q')) {
			if((wfix=="Ơ")||(bb)) {
				if (o.value.substr(pos-1,1)=='u') var r=fcc(432);
				else var r=fcc(431);
			}
			if(bb) {
				changed=true; if(c=="o") replaceBy="ơ";
				else replaceBy="Ơ";
			}
		}
		o.value=o.value.substr(0,pos)+replaceBy+o.value.substr(pos+1);
		if(r) o.value=o.value.substr(0,pos-1)+r+o.value.substr(pos);
		o.setSelectionRange(savePos,savePos);o.scrollTop=sst;
	} else {
		if ((up(o.data.substr(pos-1,1))=='U')&&(pos<o.pos-1)) {
			if((wfix=="Ơ")||(bb)) {
				if (o.data.substr(pos-1,1)=='u') var r=fcc(432);
				else var r=fcc(431);
			}
			if(bb) {
				changed=true; if(c=="o") replaceBy="ơ";
				else replaceBy="Ơ";
			}
		}
		o.deleteData(pos,1);o.insertData(pos,replaceBy);
		if(r) { o.deleteData(pos-1,1);o.insertData(pos-1,r); }
	}
	if(whit) whit=false;
}
function retKC(k) {
	if(k==S) return [225,7845,7855,233,7871,237,243,7889,7899,250,7913,253,193,7844,7854,201,7870,205,211,7888,7898,218,7912,221];
	if(k==F) return [224,7847,7857,232,7873,236,242,7891,7901,249,7915,7923,192,7846,7856,200,7872,204,210,7890,7900,217,7914,7922];
	if(k==J) return [7841,7853,7863,7865,7879,7883,7885,7897,7907,7909,7921,7925,7840,7852,7862,7864,7878,7882,7884,7896,7906,7908,7920,7924];
	if(k==R) return [7843,7849,7859,7867,7875,7881,7887,7893,7903,7911,7917,7927,7842,7848,7858,7866,7874,7880,7886,7892,7902,7910,7916,7926];
	if(k==X) return [227,7851,7861,7869,7877,297,245,7895,7905,361,7919,7929,195,7850,7860,7868,7876,296,213,7894,7904,360,7918,7928];
}
function $(id) { return document.getElementById(id); }
function getSF() {
	var sf=[],x; for(x=0;x<skey.length;x++) sf[sf.length]=fcc(skey[x]);
	return sf;
}
function updateInfo() {
	setCookie();
	getCookie();
	updateMenu();
}
function updateMenu() {
	// Update method menu items
	var radioOn = $(enabledID ? enabledID : radioID[5]);
	setObservedAttr(radioOn, "checked", !!on_off);
	var cmdMethod = $(methodCmdID);
	if (cmdMethod) cmdMethod.setAttribute("disabled", !on_off);
	setObservedAttr($(radioID[6]), "disabled", !on_off);
	setObservedAttr($(radioID[7]), "disabled", !on_off);
	setObservedAttr($(radioID[method]), "checked", true);
	
	// Update options menu items
	setObservedAttr($(radioID[6]), "checked", !!dockspell);
	setObservedAttr($(radioID[7]), "checked", !!dauCu);
	
	// Update status bar panel
	if ($(methodLabel)) {
		if (on_off) setObservedAttr($(methodLabel), "label", $(radioID[method]).getAttribute("label"));
		else setObservedAttr($(methodLabel), "label", $(radioID[5]).getAttribute("label"));
	}
}
function setObservedAttr(bcaster, attr, val) {
	if (!bcaster) return;
	var ids = bcaster.getAttribute("observers");
	if (!ids) {	// not a <broadcaster>
		bcaster.setAttribute(attr, val);
		return;
	}
	ids = ids.split(",");
	for (var i = 0; i < ids.length; i++) {
		var radio = $(ids[i]);
		if (radio) radio.setAttribute(attr, val);
	}
}
function setMethod(m) {
	if (m == -1) on_off = 0;
	else {
		on_off = 1;
		method = m;
	}
	updateInfo();
}
function toggleEnabled(item) {
	if (enabledID) {
		var enabled = item.getAttribute("checked") == "true";
		setMethod(enabled ? method : -1);
	}
	else setMethod(item.value);
}
function setDauCu(box) {
	if(typeof(box)=="number") dauCu=box;
	else dauCu = 0 + (box.getAttribute("checked") == "true");
	updateInfo();
}
function setSpell(box) {
	if(typeof(box)=="number") dockspell = box;
	else {
		if(box.getAttribute("checked") == "true") { dockspell=1; }
		else { dockspell=0; }
	}
	updateInfo();
}
function ifInit(w) {
	var sel=w.getSelection();
	range=sel?sel.getRangeAt(0):document.createRange();
}
function ifMoz(e) {
	var code=e.which,cwi=e.target.parentNode.wi;
	if(typeof(cwi)=="undefined") cwi=e.target.parentNode.parentNode.wi;
	if((e.ctrlKey)||((e.altKey)&&(code!=92)&&(code!=126))) return;
	ifInit(cwi);
	var node=range.endContainer,newPos;sk=fcc(code);saveStr="";
	if(checkCode(code)||(!range.startOffset)||(typeof(node.data)=='undefined')) return;
	node.sel=false;
	if(node.data) {
		saveStr=node.data.substr(range.endOffset);
		if(range.startOffset!=range.endOffset) node.sel=true;
		node.deleteData(range.startOffset,node.data.length);
	}
	range.setEnd(node,range.endOffset);
	range.setStart(node,0);
	if(!node.data) return;
	node.value=node.data; node.pos=node.data.length; node.which=code;
	start(node,e);
	node.insertData(node.data.length,saveStr);
	newPos=node.data.length-saveStr.length+kl;
	range.setEnd(node,newPos);range.setStart(node,newPos);kl=0;
	if(specialChange) { specialChange=false; changed=false; node.deleteData(node.pos-1,1); }
	if(changed) { changed=false; e.preventDefault(); }
}
function FKeyPress() {
	if (document.documentElement.localName == "page") return;
	var obj=findF();
	sk=fcc(obj.event.keyCode);
	if(checkCode(obj.event.keyCode)||((obj.event.ctrlKey)&&(obj.event.keyCode!=92)&&(obj.event.keyCode!=126))) return;
	start(obj,fcc(obj.event.keyCode));
	if (changed) { changed=false; return false; }
}
function checkCode(code) { return((on_off==0)||((code<45)&&(code!=42)&&(code!=32)&&(code!=39)&&(code!=40)&&(code!=43))||(code==145)||(code==255)); }
function fcc(x) { return String.fromCharCode(x); }
function setCookie() {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.avim.");
	prefs.setBoolPref("enabled", !!on_off);
	prefs.setIntPref("method", method);
	prefs.setBoolPref("ignoreMalformed", !!dockspell);
	prefs.setBoolPref("oldAccents", !!dauCu);
	prefs.setCharPref("ignoredFieldIds", va.join(","));
}
function getCookie() {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.avim.");
	on_off = 0 + prefs.getBoolPref("enabled");
	method = prefs.getIntPref("method");
	dockspell = 0 + prefs.getBoolPref("ignoreMalformed");
	dauCu = 0 + prefs.getBoolPref("oldAccents");
	va = prefs.getCharPref("ignoredFieldIds").split(",");
}
function up(w) {
	w=w.toUpperCase();
	return w;
}
function findIgnore(el) {
	for(var i=0;i<va.length;i++) if((el.id == va[i] || el.name == va[i]) && va[i].length > 0) return true;
}
function onKeyPress(e) {
	if (document.documentElement.localName == "page") return;
	if(!support) return;
	var el=e.target,code=e.which;
	if(e.ctrlKey) return;
	if((e.altKey)&&(code!=92)&&(code!=126)) return;
	var xulURI = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
	var xulAnonIDs = {"searchbar": "searchbar-textbox", "findbar": "findbar-textbox"};
	if (el.namespaceURI == xulURI && xulAnonIDs[el.localName]) {
		el = document.getAnonymousElementByAttribute(el, "anonid", xulAnonIDs[el.localName]);
	}
	var isHTML = el.type == "textarea" || el.type == "text";
	var xulTags = ["textbox", "searchbar", "findbar"];
	var isXUL = el.namespaceURI == xulURI && xulTags.indexOf(el.localName) >= 0 && el.type != "password";
	if((!isHTML && !isXUL) || checkCode(code)) return;
	sk=fcc(code); if (findIgnore(el)) return;
	start(el,e);
	if(changed) {
		changed=false;
		e.preventDefault();
	}
}
function attachEvt(obj,evt,handle,capture) {
	obj.addEventListener(evt,handle,capture);
}
function findF() {
	for(g=0;g<fID.length;g++) {
		if(findIgnore(fID[g])) continue;
		frame=fID[g];
		if(typeof(frame)!="undefined") {
			try { if((frame.contentWindow.document)&&(frame.contentWindow.event)) return frame.contentWindow; }
			catch(e) { if((frame.document)&&(frame.event)) return frame; }
		}
	}
}
function initAVIM() {
	var kkk=false;
	for(g=0;g<fID.length;g++) {
		if(findIgnore(fID[g])) continue;
		var iframedit;
		try {
			wi=fID[g].contentWindow;iframedit=wi.document;iframedit.wi=wi;
			if((iframedit)&&(up(iframedit.designMode)=="ON")) {
				attachEvt(iframedit,"keypress",ifMoz,false);
			}
		} catch(e) { }
	}
}
function uglyF() { var ugly=50;while(ugly<5000) {setTimeout(initAVIM,ugly);ugly+=50} }
attachEvt(document,"keypress",onKeyPress,false);
uglyF();attachEvt(document,"mousedown",uglyF,false);
attachEvt(window, "focus", function () {
	getCookie();
	updateMenu();
}, false);
