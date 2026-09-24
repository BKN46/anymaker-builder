(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const Fl="178",Gi={ROTATE:0,DOLLY:1,PAN:2},is={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},gp=0,Hd=1,_p=2,mu=1,gu=2,vi=3,Ai=0,on=1,Je=2,Wi=0,as=1,Vd=2,Gd=3,Wd=4,vp=5,gr=100,xp=101,yp=102,Mp=103,bp=104,Sp=200,Ep=201,wp=202,Tp=203,Ic=204,Nc=205,Ap=206,Rp=207,Cp=208,Pp=209,Dp=210,Lp=211,Ip=212,Np=213,Up=214,Uc=0,Oc=1,Fc=2,ps=3,zc=4,Bc=5,kc=6,Hc=7,_u=0,Op=1,Fp=2,Xi=0,zp=1,Bp=2,kp=3,Hp=4,Vp=5,Gp=6,Wp=7,vu=300,ms=301,gs=302,Vc=303,Gc=304,ya=306,Wc=1e3,xr=1001,Xc=1002,Xn=1003,Xp=1004,go=1005,ri=1006,Wa=1007,yr=1008,oi=1009,xu=1010,yu=1011,$s=1012,zl=1013,Mr=1014,bi=1015,oo=1016,Bl=1017,kl=1018,Zs=1020,Mu=35902,bu=1021,Su=1022,Vn=1023,Ks=1026,Js=1027,Eu=1028,Hl=1029,wu=1030,Vl=1031,Gl=1033,Yo=33776,qo=33777,$o=33778,Zo=33779,jc=35840,Yc=35841,qc=35842,$c=35843,Zc=36196,Kc=37492,Jc=37496,Qc=37808,tl=37809,el=37810,nl=37811,il=37812,rl=37813,sl=37814,ol=37815,al=37816,cl=37817,ll=37818,dl=37819,hl=37820,ul=37821,Ko=36492,fl=36494,pl=36495,Tu=36283,ml=36284,gl=36285,_l=36286,jp=3200,Yp=3201,Au=0,qp=1,Hi="",Dn="srgb",_s="srgb-linear",ia="linear",ce="srgb",Hr=7680,Xd=519,$p=512,Zp=513,Kp=514,Ru=515,Jp=516,Qp=517,tm=518,em=519,jd=35044,Yd="300 es",Si=2e3,ra=2001;class Ir{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const $e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qd=1234567;const cs=Math.PI/180,vs=180/Math.PI;function ws(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]).toLowerCase()}function Xt(n,t,e){return Math.max(t,Math.min(e,n))}function Wl(n,t){return(n%t+t)%t}function nm(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function im(n,t,e){return n!==t?(e-n)/(t-n):0}function js(n,t,e){return(1-e)*n+e*t}function rm(n,t,e,i){return js(n,t,1-Math.exp(-e*i))}function sm(n,t=1){return t-Math.abs(Wl(n,t*2)-t)}function om(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function am(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function cm(n,t){return n+Math.floor(Math.random()*(t-n+1))}function lm(n,t){return n+Math.random()*(t-n)}function dm(n){return n*(.5-Math.random())}function hm(n){n!==void 0&&(qd=n);let t=qd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function um(n){return n*cs}function fm(n){return n*vs}function pm(n){return(n&n-1)===0&&n!==0}function mm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function gm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function _m(n,t,e,i,r){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+i)/2),d=o((t+i)/2),h=s((t-i)/2),f=o((t-i)/2),u=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":n.set(a*d,c*h,c*f,a*l);break;case"YZY":n.set(c*f,a*d,c*h,a*l);break;case"ZXZ":n.set(c*h,c*f,a*d,a*l);break;case"XZX":n.set(a*d,c*g,c*u,a*l);break;case"YXY":n.set(c*u,a*d,c*g,a*l);break;case"ZYZ":n.set(c*g,c*u,a*d,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ns(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const br={DEG2RAD:cs,RAD2DEG:vs,generateUUID:ws,clamp:Xt,euclideanModulo:Wl,mapLinear:nm,inverseLerp:im,lerp:js,damp:rm,pingpong:sm,smoothstep:om,smootherstep:am,randInt:cm,randFloat:lm,randFloatSpread:dm,seededRandom:hm,degToRad:um,radToDeg:fm,isPowerOfTwo:pm,ceilPowerOfTwo:mm,floorPowerOfTwo:gm,setQuaternionFromProperEuler:_m,normalize:nn,denormalize:ns};class Lt{constructor(t=0,e=0){Lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let c=i[r+0],l=i[r+1],d=i[r+2],h=i[r+3];const f=s[o+0],u=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=d,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=u,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==f||l!==u||d!==g){let m=1-a;const p=c*f+l*u+d*g+h*_,b=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const C=Math.sqrt(M),A=Math.atan2(C,p*b);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const v=a*b;if(c=c*m+f*v,l=l*m+u*v,d=d*m+g*v,h=h*m+_*v,m===1-a){const C=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=C,l*=C,d*=C,h*=C}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],d=i[r+3],h=s[o],f=s[o+1],u=s[o+2],g=s[o+3];return t[e]=a*g+d*h+c*u-l*f,t[e+1]=c*g+d*f+l*h-a*u,t[e+2]=l*g+d*u+a*f-c*h,t[e+3]=d*g-a*h-c*f-l*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),d=a(r/2),h=a(s/2),f=c(i/2),u=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*d*h+l*u*g,this._y=l*u*h-f*d*g,this._z=l*d*g+f*u*h,this._w=l*d*h-f*u*g;break;case"YXZ":this._x=f*d*h+l*u*g,this._y=l*u*h-f*d*g,this._z=l*d*g-f*u*h,this._w=l*d*h+f*u*g;break;case"ZXY":this._x=f*d*h-l*u*g,this._y=l*u*h+f*d*g,this._z=l*d*g+f*u*h,this._w=l*d*h-f*u*g;break;case"ZYX":this._x=f*d*h-l*u*g,this._y=l*u*h+f*d*g,this._z=l*d*g-f*u*h,this._w=l*d*h+f*u*g;break;case"YZX":this._x=f*d*h+l*u*g,this._y=l*u*h+f*d*g,this._z=l*d*g-f*u*h,this._w=l*d*h-f*u*g;break;case"XZY":this._x=f*d*h-l*u*g,this._y=l*u*h-f*d*g,this._z=l*d*g+f*u*h,this._w=l*d*h+f*u*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],d=e[6],h=e[10],f=i+a+h;if(f>0){const u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(d-c)*u,this._y=(s-l)*u,this._z=(o-r)*u}else if(i>a&&i>h){const u=2*Math.sqrt(1+i-a-h);this._w=(d-c)/u,this._x=.25*u,this._y=(r+o)/u,this._z=(s+l)/u}else if(a>h){const u=2*Math.sqrt(1+a-i-h);this._w=(s-l)/u,this._x=(r+o)/u,this._y=.25*u,this._z=(c+d)/u}else{const u=2*Math.sqrt(1+h-i-a);this._w=(o-r)/u,this._x=(s+l)/u,this._y=(c+d)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,d=e._w;return this._x=i*d+o*a+r*l-s*c,this._y=r*d+o*c+s*a-i*l,this._z=s*d+o*l+i*c-r*a,this._w=o*d-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const u=1-e;return this._w=u*o+e*this._w,this._x=u*i+e*this._x,this._y=u*r+e*this._y,this._z=u*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,a),h=Math.sin((1-e)*d)/l,f=Math.sin(e*d)/l;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(t=0,e=0,i=0){w.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($d.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($d.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*i),d=2*(a*e-s*r),h=2*(s*i-o*e);return this.x=e+c*l+o*h-a*d,this.y=i+c*d+a*l-s*h,this.z=r+c*h+s*d-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Xa.copy(this).projectOnVector(t),this.sub(Xa)}reflect(t){return this.sub(Xa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xa=new w,$d=new ze;class kt{constructor(t,e,i,r,s,o,a,c,l){kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,c,l)}set(t,e,i,r,s,o,a,c,l){const d=this.elements;return d[0]=t,d[1]=r,d[2]=a,d[3]=e,d[4]=s,d[5]=c,d[6]=i,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],d=i[4],h=i[7],f=i[2],u=i[5],g=i[8],_=r[0],m=r[3],p=r[6],b=r[1],M=r[4],v=r[7],C=r[2],A=r[5],R=r[8];return s[0]=o*_+a*b+c*C,s[3]=o*m+a*M+c*A,s[6]=o*p+a*v+c*R,s[1]=l*_+d*b+h*C,s[4]=l*m+d*M+h*A,s[7]=l*p+d*v+h*R,s[2]=f*_+u*b+g*C,s[5]=f*m+u*M+g*A,s[8]=f*p+u*v+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8];return e*o*d-e*a*l-i*s*d+i*a*c+r*s*l-r*o*c}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],h=d*o-a*l,f=a*c-d*s,u=l*s-o*c,g=e*h+i*f+r*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(r*l-d*i)*_,t[2]=(a*i-r*o)*_,t[3]=f*_,t[4]=(d*e-r*c)*_,t[5]=(r*s-a*e)*_,t[6]=u*_,t[7]=(i*c-l*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ja.makeScale(t,e)),this}rotate(t){return this.premultiply(ja.makeRotation(-t)),this}translate(t,e){return this.premultiply(ja.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ja=new kt;function Cu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function sa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function vm(){const n=sa("canvas");return n.style.display="block",n}const Zd={};function ls(n){n in Zd||(Zd[n]=!0,console.warn(n))}function xm(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function ym(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Mm(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Kd=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jd=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bm(){const n={enabled:!0,workingColorSpace:_s,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ce&&(r.r=Ei(r.r),r.g=Ei(r.g),r.b=Ei(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ce&&(r.r=ds(r.r),r.g=ds(r.g),r.b=ds(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Hi?ia:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ls("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ls("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[_s]:{primaries:t,whitePoint:i,transfer:ia,toXYZ:Kd,fromXYZ:Jd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Dn},outputColorSpaceConfig:{drawingBufferColorSpace:Dn}},[Dn]:{primaries:t,whitePoint:i,transfer:ce,toXYZ:Kd,fromXYZ:Jd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Dn}}}),n}const Zt=bm();function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ds(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Vr;class Sm{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Vr===void 0&&(Vr=sa("canvas")),Vr.width=t.width,Vr.height=t.height;const r=Vr.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Vr}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=sa("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ei(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Em=0;class Xl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=ws(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ya(r[o].image)):s.push(Ya(r[o]))}else s=Ya(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Ya(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Sm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wm=0;const qa=new w;class un extends Ir{constructor(t=un.DEFAULT_IMAGE,e=un.DEFAULT_MAPPING,i=xr,r=xr,s=ri,o=yr,a=Vn,c=oi,l=un.DEFAULT_ANISOTROPY,d=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=ws(),this.name="",this.source=new Xl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Lt(0,0),this.repeat=new Lt(1,1),this.center=new Lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(qa).x}get height(){return this.source.getSize(qa).y}get depth(){return this.source.getSize(qa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wc:t.x=t.x-Math.floor(t.x);break;case xr:t.x=t.x<0?0:1;break;case Xc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wc:t.y=t.y-Math.floor(t.y);break;case xr:t.y=t.y<0?0:1;break;case Xc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=vu;un.DEFAULT_ANISOTROPY=1;class Ae{constructor(t=0,e=0,i=0,r=1){Ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const c=t.elements,l=c[0],d=c[4],h=c[8],f=c[1],u=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(d-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+u+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,v=(u+1)/2,C=(p+1)/2,A=(d+f)/4,R=(h+_)/4,D=(g+m)/4;return M>v&&M>C?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=A/i,s=R/i):v>C?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=A/r,s=D/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=R/s,r=D/s),this.set(i,r,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-d)*(f-d));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-_)/b,this.z=(f-d)/b,this.w=Math.acos((l+u+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tm extends Ir{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new un(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:ri,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Xl(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sr extends Tm{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Pu extends un{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Am extends un{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jn{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Bn):Bn.fromBufferAttribute(s,o),Bn.applyMatrix4(t.matrixWorld),this.expandByPoint(Bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_o.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_o.copy(i.boundingBox)),_o.applyMatrix4(t.matrixWorld),this.union(_o)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bn),Bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ns),vo.subVectors(this.max,Ns),Gr.subVectors(t.a,Ns),Wr.subVectors(t.b,Ns),Xr.subVectors(t.c,Ns),Ii.subVectors(Wr,Gr),Ni.subVectors(Xr,Wr),ar.subVectors(Gr,Xr);let e=[0,-Ii.z,Ii.y,0,-Ni.z,Ni.y,0,-ar.z,ar.y,Ii.z,0,-Ii.x,Ni.z,0,-Ni.x,ar.z,0,-ar.x,-Ii.y,Ii.x,0,-Ni.y,Ni.x,0,-ar.y,ar.x,0];return!$a(e,Gr,Wr,Xr,vo)||(e=[1,0,0,0,1,0,0,0,1],!$a(e,Gr,Wr,Xr,vo))?!1:(xo.crossVectors(Ii,Ni),e=[xo.x,xo.y,xo.z],$a(e,Gr,Wr,Xr,vo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const fi=[new w,new w,new w,new w,new w,new w,new w,new w],Bn=new w,_o=new jn,Gr=new w,Wr=new w,Xr=new w,Ii=new w,Ni=new w,ar=new w,Ns=new w,vo=new w,xo=new w,cr=new w;function $a(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){cr.fromArray(n,s);const a=r.x*Math.abs(cr.x)+r.y*Math.abs(cr.y)+r.z*Math.abs(cr.z),c=t.dot(cr),l=e.dot(cr),d=i.dot(cr);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const Rm=new jn,Us=new w,Za=new w;class Ma{constructor(t=new w,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Rm.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Us.subVectors(t,this.center);const e=Us.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Us,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Za.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Us.copy(t.center).add(Za)),this.expandByPoint(Us.copy(t.center).sub(Za))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const pi=new w,Ka=new w,yo=new w,Ui=new w,Ja=new w,Mo=new w,Qa=new w;class ba{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(pi.copy(this.origin).addScaledVector(this.direction,e),pi.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Ka.copy(t).add(e).multiplyScalar(.5),yo.copy(e).sub(t).normalize(),Ui.copy(this.origin).sub(Ka);const s=t.distanceTo(e)*.5,o=-this.direction.dot(yo),a=Ui.dot(this.direction),c=-Ui.dot(yo),l=Ui.lengthSq(),d=Math.abs(1-o*o);let h,f,u,g;if(d>0)if(h=o*c-a,f=o*a-c,g=s*d,h>=0)if(f>=-g)if(f<=g){const _=1/d;h*=_,f*=_,u=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),u=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),u=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),u=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),u=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),u=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),u=-h*h+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ka).addScaledVector(yo,f),u}intersectSphere(t,e){pi.subVectors(t.center,this.origin);const i=pi.dot(this.direction),r=pi.dot(pi)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,r=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,r=(t.min.x-f.x)*l),d>=0?(s=(t.min.y-f.y)*d,o=(t.max.y-f.y)*d):(s=(t.max.y-f.y)*d,o=(t.min.y-f.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,pi)!==null}intersectTriangle(t,e,i,r,s){Ja.subVectors(e,t),Mo.subVectors(i,t),Qa.crossVectors(Ja,Mo);let o=this.direction.dot(Qa),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ui.subVectors(this.origin,t);const c=a*this.direction.dot(Mo.crossVectors(Ui,Mo));if(c<0)return null;const l=a*this.direction.dot(Ja.cross(Ui));if(l<0||c+l>o)return null;const d=-a*Ui.dot(Qa);return d<0?null:this.at(d/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,i,r,s,o,a,c,l,d,h,f,u,g,_,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,c,l,d,h,f,u,g,_,m)}set(t,e,i,r,s,o,a,c,l,d,h,f,u,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=d,p[10]=h,p[14]=f,p[3]=u,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/jr.setFromMatrixColumn(t,0).length(),s=1/jr.setFromMatrixColumn(t,1).length(),o=1/jr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*d,u=o*h,g=a*d,_=a*h;e[0]=c*d,e[4]=-c*h,e[8]=l,e[1]=u+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+u*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*d,u=c*h,g=l*d,_=l*h;e[0]=f+_*a,e[4]=g*a-u,e[8]=o*l,e[1]=o*h,e[5]=o*d,e[9]=-a,e[2]=u*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*d,u=c*h,g=l*d,_=l*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+u*a,e[1]=u+g*a,e[5]=o*d,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*d,u=o*h,g=a*d,_=a*h;e[0]=c*d,e[4]=g*l-u,e[8]=f*l+_,e[1]=c*h,e[5]=_*l+f,e[9]=u*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,u=o*l,g=a*c,_=a*l;e[0]=c*d,e[4]=_-f*h,e[8]=g*h+u,e[1]=h,e[5]=o*d,e[9]=-a*d,e[2]=-l*d,e[6]=u*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*c,u=o*l,g=a*c,_=a*l;e[0]=c*d,e[4]=-h,e[8]=l*d,e[1]=f*h+_,e[5]=o*d,e[9]=u*h-g,e[2]=g*h-u,e[6]=a*d,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Cm,t,Pm)}lookAt(t,e,i){const r=this.elements;return yn.subVectors(t,e),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Oi.crossVectors(i,yn),Oi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Oi.crossVectors(i,yn)),Oi.normalize(),bo.crossVectors(yn,Oi),r[0]=Oi.x,r[4]=bo.x,r[8]=yn.x,r[1]=Oi.y,r[5]=bo.y,r[9]=yn.y,r[2]=Oi.z,r[6]=bo.z,r[10]=yn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],d=i[1],h=i[5],f=i[9],u=i[13],g=i[2],_=i[6],m=i[10],p=i[14],b=i[3],M=i[7],v=i[11],C=i[15],A=r[0],R=r[4],D=r[8],E=r[12],y=r[1],P=r[5],B=r[9],F=r[13],G=r[2],j=r[6],X=r[10],$=r[14],V=r[3],it=r[7],ut=r[11],yt=r[15];return s[0]=o*A+a*y+c*G+l*V,s[4]=o*R+a*P+c*j+l*it,s[8]=o*D+a*B+c*X+l*ut,s[12]=o*E+a*F+c*$+l*yt,s[1]=d*A+h*y+f*G+u*V,s[5]=d*R+h*P+f*j+u*it,s[9]=d*D+h*B+f*X+u*ut,s[13]=d*E+h*F+f*$+u*yt,s[2]=g*A+_*y+m*G+p*V,s[6]=g*R+_*P+m*j+p*it,s[10]=g*D+_*B+m*X+p*ut,s[14]=g*E+_*F+m*$+p*yt,s[3]=b*A+M*y+v*G+C*V,s[7]=b*R+M*P+v*j+C*it,s[11]=b*D+M*B+v*X+C*ut,s[15]=b*E+M*F+v*$+C*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],d=t[2],h=t[6],f=t[10],u=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*c*h-r*l*h-s*a*f+i*l*f+r*a*u-i*c*u)+_*(+e*c*u-e*l*f+s*o*f-r*o*u+r*l*d-s*c*d)+m*(+e*l*h-e*a*u-s*o*h+i*o*u+s*a*d-i*l*d)+p*(-r*a*d-e*c*h+e*a*f+r*o*h-i*o*f+i*c*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],h=t[9],f=t[10],u=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=h*m*l-_*f*l+_*c*u-a*m*u-h*c*p+a*f*p,M=g*f*l-d*m*l-g*c*u+o*m*u+d*c*p-o*f*p,v=d*_*l-g*h*l+g*a*u-o*_*u-d*a*p+o*h*p,C=g*h*c-d*_*c-g*a*f+o*_*f+d*a*m-o*h*m,A=e*b+i*M+r*v+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=b*R,t[1]=(_*f*s-h*m*s-_*r*u+i*m*u+h*r*p-i*f*p)*R,t[2]=(a*m*s-_*c*s+_*r*l-i*m*l-a*r*p+i*c*p)*R,t[3]=(h*c*s-a*f*s-h*r*l+i*f*l+a*r*u-i*c*u)*R,t[4]=M*R,t[5]=(d*m*s-g*f*s+g*r*u-e*m*u-d*r*p+e*f*p)*R,t[6]=(g*c*s-o*m*s-g*r*l+e*m*l+o*r*p-e*c*p)*R,t[7]=(o*f*s-d*c*s+d*r*l-e*f*l-o*r*u+e*c*u)*R,t[8]=v*R,t[9]=(g*h*s-d*_*s-g*i*u+e*_*u+d*i*p-e*h*p)*R,t[10]=(o*_*s-g*a*s+g*i*l-e*_*l-o*i*p+e*a*p)*R,t[11]=(d*a*s-o*h*s-d*i*l+e*h*l+o*i*u-e*a*u)*R,t[12]=C*R,t[13]=(d*_*r-g*h*r+g*i*f-e*_*f-d*i*m+e*h*m)*R,t[14]=(g*a*r-o*_*r-g*i*c+e*_*c+o*i*m-e*a*m)*R,t[15]=(o*h*r-d*a*r+d*i*c-e*h*c-o*i*f+e*a*f)*R,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,c=t.z,l=s*o,d=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,d*a+i,d*c-r*o,0,l*c-r*a,d*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,d=o+o,h=a+a,f=s*l,u=s*d,g=s*h,_=o*d,m=o*h,p=a*h,b=c*l,M=c*d,v=c*h,C=i.x,A=i.y,R=i.z;return r[0]=(1-(_+p))*C,r[1]=(u+v)*C,r[2]=(g-M)*C,r[3]=0,r[4]=(u-v)*A,r[5]=(1-(f+p))*A,r[6]=(m+b)*A,r[7]=0,r[8]=(g+M)*R,r[9]=(m-b)*R,r[10]=(1-(f+_))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=jr.set(r[0],r[1],r[2]).length();const o=jr.set(r[4],r[5],r[6]).length(),a=jr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],kn.copy(this);const l=1/s,d=1/o,h=1/a;return kn.elements[0]*=l,kn.elements[1]*=l,kn.elements[2]*=l,kn.elements[4]*=d,kn.elements[5]*=d,kn.elements[6]*=d,kn.elements[8]*=h,kn.elements[9]*=h,kn.elements[10]*=h,e.setFromRotationMatrix(kn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Si){const c=this.elements,l=2*s/(e-t),d=2*s/(i-r),h=(e+t)/(e-t),f=(i+r)/(i-r);let u,g;if(a===Si)u=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===ra)u=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=u,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Si){const c=this.elements,l=1/(e-t),d=1/(i-r),h=1/(o-s),f=(e+t)*l,u=(i+r)*d;let g,_;if(a===Si)g=(o+s)*h,_=-2*h;else if(a===ra)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-u,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const jr=new w,kn=new oe,Cm=new w(0,0,0),Pm=new w(1,1,1),Oi=new w,bo=new w,yn=new w,Qd=new oe,th=new ze;class Yn{constructor(t=0,e=0,i=0,r=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],d=r[9],h=r[2],f=r[6],u=r[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,u),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Qd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Qd,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return th.setFromEuler(this),this.setFromQuaternion(th,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Dm=0;const eh=new w,Yr=new ze,mi=new oe,So=new w,Os=new w,Lm=new w,Im=new ze,nh=new w(1,0,0),ih=new w(0,1,0),rh=new w(0,0,1),sh={type:"added"},Nm={type:"removed"},qr={type:"childadded",child:null},tc={type:"childremoved",child:null};class xe extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new w,e=new Yn,i=new ze,r=new w(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new oe},normalMatrix:{value:new kt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yr.setFromAxisAngle(t,e),this.quaternion.multiply(Yr),this}rotateOnWorldAxis(t,e){return Yr.setFromAxisAngle(t,e),this.quaternion.premultiply(Yr),this}rotateX(t){return this.rotateOnAxis(nh,t)}rotateY(t){return this.rotateOnAxis(ih,t)}rotateZ(t){return this.rotateOnAxis(rh,t)}translateOnAxis(t,e){return eh.copy(t).applyQuaternion(this.quaternion),this.position.add(eh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nh,t)}translateY(t){return this.translateOnAxis(ih,t)}translateZ(t){return this.translateOnAxis(rh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?So.copy(t):So.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(Os,So,this.up):mi.lookAt(So,Os,this.up),this.quaternion.setFromRotationMatrix(mi),r&&(mi.extractRotation(r.matrixWorld),Yr.setFromRotationMatrix(mi),this.quaternion.premultiply(Yr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sh),qr.child=t,this.dispatchEvent(qr),qr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nm),tc.child=t,this.dispatchEvent(tc),tc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mi.multiply(t.parent.matrixWorld)),t.applyMatrix4(mi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sh),qr.child=t,this.dispatchEvent(qr),qr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,Lm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,Im,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),d=o(t.images),h=o(t.shapes),f=o(t.skeletons),u=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),u.length>0&&(i.animations=u),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}xe.DEFAULT_UP=new w(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Hn=new w,gi=new w,ec=new w,_i=new w,$r=new w,Zr=new w,oh=new w,nc=new w,ic=new w,rc=new w,sc=new Ae,oc=new Ae,ac=new Ae;class Ln{constructor(t=new w,e=new w,i=new w){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Hn.subVectors(t,e),r.cross(Hn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Hn.subVectors(r,e),gi.subVectors(i,e),ec.subVectors(t,e);const o=Hn.dot(Hn),a=Hn.dot(gi),c=Hn.dot(ec),l=gi.dot(gi),d=gi.dot(ec),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,u=(l*c-a*d)*f,g=(o*d-a*c)*f;return s.set(1-u-g,g,u)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(t,e,i,r,s,o,a,c){return this.getBarycoord(t,e,i,r,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(t,e,i,r,s,o){return sc.setScalar(0),oc.setScalar(0),ac.setScalar(0),sc.fromBufferAttribute(t,e),oc.fromBufferAttribute(t,i),ac.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(sc,s.x),o.addScaledVector(oc,s.y),o.addScaledVector(ac,s.z),o}static isFrontFacing(t,e,i,r){return Hn.subVectors(i,e),gi.subVectors(t,e),Hn.cross(gi).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Hn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Hn.cross(gi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return Ln.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return Ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;$r.subVectors(r,i),Zr.subVectors(s,i),nc.subVectors(t,i);const c=$r.dot(nc),l=Zr.dot(nc);if(c<=0&&l<=0)return e.copy(i);ic.subVectors(t,r);const d=$r.dot(ic),h=Zr.dot(ic);if(d>=0&&h<=d)return e.copy(r);const f=c*h-d*l;if(f<=0&&c>=0&&d<=0)return o=c/(c-d),e.copy(i).addScaledVector($r,o);rc.subVectors(t,s);const u=$r.dot(rc),g=Zr.dot(rc);if(g>=0&&u<=g)return e.copy(s);const _=u*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(i).addScaledVector(Zr,a);const m=d*g-u*h;if(m<=0&&h-d>=0&&u-g>=0)return oh.subVectors(s,r),a=(h-d)/(h-d+(u-g)),e.copy(r).addScaledVector(oh,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(i).addScaledVector($r,o).addScaledVector(Zr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Du={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},Eo={h:0,s:0,l:0};function cc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Dn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Zt.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=Zt.workingColorSpace){if(t=Wl(t,1),e=Xt(e,0,1),i=Xt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=cc(o,s,t+1/3),this.g=cc(o,s,t),this.b=cc(o,s,t-1/3)}return Zt.colorSpaceToWorking(this,r),this}setStyle(t,e=Dn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Dn){const i=Du[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Dn){return Zt.workingToColorSpace(Ze.copy(this),t),Math.round(Xt(Ze.r*255,0,255))*65536+Math.round(Xt(Ze.g*255,0,255))*256+Math.round(Xt(Ze.b*255,0,255))}getHexString(t=Dn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.workingToColorSpace(Ze.copy(this),e);const i=Ze.r,r=Ze.g,s=Ze.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=d<=.5?h/(o+a):h/(2-o-a),o){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=Zt.workingColorSpace){return Zt.workingToColorSpace(Ze.copy(this),e),t.r=Ze.r,t.g=Ze.g,t.b=Ze.b,t}getStyle(t=Dn){Zt.workingToColorSpace(Ze.copy(this),t);const e=Ze.r,i=Ze.g,r=Ze.b;return t!==Dn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Fi),this.setHSL(Fi.h+t,Fi.s+e,Fi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fi),t.getHSL(Eo);const i=js(Fi.h,Eo.h,e),r=js(Fi.s,Eo.s,e),s=js(Fi.l,Eo.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ze=new jt;jt.NAMES=Du;let Um=0;class Ts extends Ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=as,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Nc,this.blendEquation=gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==as&&(i.blending=this.blending),this.side!==Ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ic&&(i.blendSrc=this.blendSrc),this.blendDst!==Nc&&(i.blendDst=this.blendDst),this.blendEquation!==gr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ai extends Ts{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=_u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Le=new w,wo=new Lt;let Om=0;class Re{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Om++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=jd,this.updateRanges=[],this.gpuType=bi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)wo.fromBufferAttribute(this,e),wo.applyMatrix3(t),this.setXY(e,wo.x,wo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ns(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=nn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ns(e,this.array)),e}setX(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ns(e,this.array)),e}setY(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ns(e,this.array)),e}setZ(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ns(e,this.array)),e}setW(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),r=nn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),r=nn(r,this.array),s=nn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jd&&(t.usage=this.usage),t}}class Lu extends Re{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Iu extends Re{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class de extends Re{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Fm=0;const Pn=new oe,lc=new xe,Kr=new w,Mn=new jn,Fs=new jn,He=new w;class Ne extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cu(t)?Iu:Lu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new kt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Pn.makeRotationFromQuaternion(t),this.applyMatrix4(Pn),this}rotateX(t){return Pn.makeRotationX(t),this.applyMatrix4(Pn),this}rotateY(t){return Pn.makeRotationY(t),this.applyMatrix4(Pn),this}rotateZ(t){return Pn.makeRotationZ(t),this.applyMatrix4(Pn),this}translate(t,e,i){return Pn.makeTranslation(t,e,i),this.applyMatrix4(Pn),this}scale(t,e,i){return Pn.makeScale(t,e,i),this.applyMatrix4(Pn),this}lookAt(t){return lc.lookAt(t),lc.updateMatrix(),this.applyMatrix4(lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new de(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ma);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(t){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Fs.setFromBufferAttribute(a),this.morphTargetsRelative?(He.addVectors(Mn.min,Fs.min),Mn.expandByPoint(He),He.addVectors(Mn.max,Fs.max),Mn.expandByPoint(He)):(Mn.expandByPoint(Fs.min),Mn.expandByPoint(Fs.max))}Mn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)He.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(He));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)He.fromBufferAttribute(a,l),c&&(Kr.fromBufferAttribute(t,l),He.add(Kr)),r=Math.max(r,i.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Re(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<i.count;D++)a[D]=new w,c[D]=new w;const l=new w,d=new w,h=new w,f=new Lt,u=new Lt,g=new Lt,_=new w,m=new w;function p(D,E,y){l.fromBufferAttribute(i,D),d.fromBufferAttribute(i,E),h.fromBufferAttribute(i,y),f.fromBufferAttribute(s,D),u.fromBufferAttribute(s,E),g.fromBufferAttribute(s,y),d.sub(l),h.sub(l),u.sub(f),g.sub(f);const P=1/(u.x*g.y-g.x*u.y);isFinite(P)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(h,-u.y).multiplyScalar(P),m.copy(h).multiplyScalar(u.x).addScaledVector(d,-g.x).multiplyScalar(P),a[D].add(_),a[E].add(_),a[y].add(_),c[D].add(m),c[E].add(m),c[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let D=0,E=b.length;D<E;++D){const y=b[D],P=y.start,B=y.count;for(let F=P,G=P+B;F<G;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const M=new w,v=new w,C=new w,A=new w;function R(D){C.fromBufferAttribute(r,D),A.copy(C);const E=a[D];M.copy(E),M.sub(C.multiplyScalar(C.dot(E))).normalize(),v.crossVectors(A,E);const P=v.dot(c[D])<0?-1:1;o.setXYZW(D,M.x,M.y,M.z,P)}for(let D=0,E=b.length;D<E;++D){const y=b[D],P=y.start,B=y.count;for(let F=P,G=P+B;F<G;F+=3)R(t.getX(F+0)),R(t.getX(F+1)),R(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Re(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,u=i.count;f<u;f++)i.setXYZ(f,0,0,0);const r=new w,s=new w,o=new w,a=new w,c=new w,l=new w,d=new w,h=new w;if(t)for(let f=0,u=t.count;f<u;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),d.subVectors(o,s),h.subVectors(r,s),d.cross(h),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(d),c.add(d),l.add(d),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,u=e.count;f<u;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),d.subVectors(o,s),h.subVectors(r,s),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(a,c){const l=a.array,d=a.itemSize,h=a.normalized,f=new l.constructor(c.length*d);let u=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?u=c[_]*a.data.stride+a.offset:u=c[_]*d;for(let p=0;p<d;p++)f[g++]=l[u++]}return new Re(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ne,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,i);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let d=0,h=l.length;d<h;d++){const f=l[d],u=t(f,i);c.push(u)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,f=l.length;h<f;h++){const u=l[h];d.push(u.toJSON(t.data))}d.length>0&&(r[c]=d,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(e))}const s=t.morphAttributes;for(const l in s){const d=[],h=s[l];for(let f=0,u=h.length;f<u;f++)d.push(h[f].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,d=o.length;l<d;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ah=new oe,lr=new ba,To=new Ma,ch=new w,Ao=new w,Ro=new w,Co=new w,dc=new w,Po=new w,lh=new w,Do=new w;class st extends xe{constructor(t=new Ne,e=new ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Po.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=a[c],h=s[c];d!==0&&(dc.fromBufferAttribute(h,t),o?Po.addScaledVector(dc,d):Po.addScaledVector(dc.sub(e),d))}e.add(Po)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),To.copy(i.boundingSphere),To.applyMatrix4(s),lr.copy(t.ray).recast(t.near),!(To.containsPoint(lr.origin)===!1&&(lr.intersectSphere(To,ch)===null||lr.origin.distanceToSquared(ch)>(t.far-t.near)**2))&&(ah.copy(s).invert(),lr.copy(t.ray).applyMatrix4(ah),!(i.boundingBox!==null&&lr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,lr)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,f=s.groups,u=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],b=Math.max(m.start,u.start),M=Math.min(a.count,Math.min(m.start+m.count,u.start+u.count));for(let v=b,C=M;v<C;v+=3){const A=a.getX(v),R=a.getX(v+1),D=a.getX(v+2);r=Lo(this,p,t,i,l,d,h,A,R,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,u.start),_=Math.min(a.count,u.start+u.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);r=Lo(this,o,t,i,l,d,h,b,M,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],b=Math.max(m.start,u.start),M=Math.min(c.count,Math.min(m.start+m.count,u.start+u.count));for(let v=b,C=M;v<C;v+=3){const A=v,R=v+1,D=v+2;r=Lo(this,p,t,i,l,d,h,A,R,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,u.start),_=Math.min(c.count,u.start+u.count);for(let m=g,p=_;m<p;m+=3){const b=m,M=m+1,v=m+2;r=Lo(this,o,t,i,l,d,h,b,M,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function zm(n,t,e,i,r,s,o,a){let c;if(t.side===on?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,t.side===Ai,a),c===null)return null;Do.copy(a),Do.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Do);return l<e.near||l>e.far?null:{distance:l,point:Do.clone(),object:n}}function Lo(n,t,e,i,r,s,o,a,c,l){n.getVertexPosition(a,Ao),n.getVertexPosition(c,Ro),n.getVertexPosition(l,Co);const d=zm(n,t,e,i,Ao,Ro,Co,lh);if(d){const h=new w;Ln.getBarycoord(lh,Ao,Ro,Co,h),r&&(d.uv=Ln.getInterpolatedAttribute(r,a,c,l,h,new Lt)),s&&(d.uv1=Ln.getInterpolatedAttribute(s,a,c,l,h,new Lt)),o&&(d.normal=Ln.getInterpolatedAttribute(o,a,c,l,h,new w),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new w,materialIndex:0};Ln.getNormal(Ao,Ro,Co,f.normal),d.face=f,d.barycoord=h}return d}class Ee extends Ne{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],d=[],h=[];let f=0,u=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(d,3)),this.setAttribute("uv",new de(h,2));function g(_,m,p,b,M,v,C,A,R,D,E){const y=v/R,P=C/D,B=v/2,F=C/2,G=A/2,j=R+1,X=D+1;let $=0,V=0;const it=new w;for(let ut=0;ut<X;ut++){const yt=ut*P-F;for(let Bt=0;Bt<j;Bt++){const re=Bt*y-B;it[_]=re*b,it[m]=yt*M,it[p]=G,l.push(it.x,it.y,it.z),it[_]=0,it[m]=0,it[p]=A>0?1:-1,d.push(it.x,it.y,it.z),h.push(Bt/R),h.push(1-ut/D),$+=1}}for(let ut=0;ut<D;ut++)for(let yt=0;yt<R;yt++){const Bt=f+yt+j*ut,re=f+yt+j*(ut+1),Y=f+(yt+1)+j*(ut+1),rt=f+(yt+1)+j*ut;c.push(Bt,re,rt),c.push(re,Y,rt),V+=6}a.addGroup(u,V,E),u+=V,f+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ee(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function xs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function rn(n){const t={};for(let e=0;e<n.length;e++){const i=xs(n[e]);for(const r in i)t[r]=i[r]}return t}function Bm(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Nu(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const km={clone:xs,merge:rn};var Hm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qi extends Ts{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hm,this.fragmentShader=Vm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xs(t.uniforms),this.uniformsGroups=Bm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Uu extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Si}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zi=new w,dh=new Lt,hh=new Lt;class bn extends Uu{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(cs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zi.x,zi.y).multiplyScalar(-t/zi.z),zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(zi.x,zi.y).multiplyScalar(-t/zi.z)}getViewSize(t,e){return this.getViewBounds(t,dh,hh),e.subVectors(hh,dh)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(cs*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,e-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Jr=-90,Qr=1;class Gm extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new bn(Jr,Qr,t,e);r.layers=this.layers,this.add(r);const s=new bn(Jr,Qr,t,e);s.layers=this.layers,this.add(s);const o=new bn(Jr,Qr,t,e);o.layers=this.layers,this.add(o);const a=new bn(Jr,Qr,t,e);a.layers=this.layers,this.add(a);const c=new bn(Jr,Qr,t,e);c.layers=this.layers,this.add(c);const l=new bn(Jr,Qr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===Si)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ra)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,d]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,c),t.setRenderTarget(i,4,r),t.render(e,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,d),t.setRenderTarget(h,f,u),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ou extends un{constructor(t=[],e=ms,i,r,s,o,a,c,l,d){super(t,e,i,r,s,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Wm extends Sr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Ou(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ee(5,5,5),s=new qi({name:"CubemapFromEquirect",uniforms:xs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:Wi});s.uniforms.tEquirect.value=e;const o=new st(r,s),a=e.minFilter;return e.minFilter===yr&&(e.minFilter=ri),new Gm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}class Gn extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xm={type:"move"};class hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=d.position.distanceTo(h.position),u=.02,g=.005;l.inputState.pinching&&f>u+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=u-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xm)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Gn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class jm extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const uc=new w,Ym=new w,qm=new kt;class ti{constructor(t=new w(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=uc.subVectors(i,e).cross(Ym.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(uc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||qm.getNormalMatrix(t),r=this.coplanarPoint(uc).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const dr=new Ma,$m=new Lt(.5,.5),Io=new w;class Yl{constructor(t=new ti,e=new ti,i=new ti,r=new ti,s=new ti,o=new ti){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Si){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],d=r[5],h=r[6],f=r[7],u=r[8],g=r[9],_=r[10],m=r[11],p=r[12],b=r[13],M=r[14],v=r[15];if(i[0].setComponents(c-s,f-l,m-u,v-p).normalize(),i[1].setComponents(c+s,f+l,m+u,v+p).normalize(),i[2].setComponents(c+o,f+d,m+g,v+b).normalize(),i[3].setComponents(c-o,f-d,m-g,v-b).normalize(),i[4].setComponents(c-a,f-h,m-_,v-M).normalize(),e===Si)i[5].setComponents(c+a,f+h,m+_,v+M).normalize();else if(e===ra)i[5].setComponents(a,h,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),dr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),dr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(dr)}intersectsSprite(t){dr.center.set(0,0,0);const e=$m.distanceTo(t.center);return dr.radius=.7071067811865476+e,dr.applyMatrix4(t.matrixWorld),this.intersectsSphere(dr)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Io.x=r.normal.x>0?t.max.x:t.min.x,Io.y=r.normal.y>0?t.max.y:t.min.y,Io.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Io)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Nr extends Ts{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const oa=new w,aa=new w,uh=new oe,zs=new ba,No=new Ma,fc=new w,fh=new w;class xi extends xe{constructor(t=new Ne,e=new Nr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)oa.fromBufferAttribute(e,r-1),aa.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=oa.distanceTo(aa);t.setAttribute("lineDistance",new de(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),No.copy(i.boundingSphere),No.applyMatrix4(r),No.radius+=s,t.ray.intersectsSphere(No)===!1)return;uh.copy(r).invert(),zs.copy(t.ray).applyMatrix4(uh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const u=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=u,m=g-1;_<m;_+=l){const p=d.getX(_),b=d.getX(_+1),M=Uo(this,t,zs,c,p,b,_);M&&e.push(M)}if(this.isLineLoop){const _=d.getX(g-1),m=d.getX(u),p=Uo(this,t,zs,c,_,m,g-1);p&&e.push(p)}}else{const u=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=u,m=g-1;_<m;_+=l){const p=Uo(this,t,zs,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=Uo(this,t,zs,c,g-1,u,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Uo(n,t,e,i,r,s,o){const a=n.geometry.attributes.position;if(oa.fromBufferAttribute(a,r),aa.fromBufferAttribute(a,s),e.distanceSqToSegment(oa,aa,fc,fh)>i)return;fc.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(fc);if(!(l<t.near||l>t.far))return{distance:l,point:fh.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const ph=new w,mh=new w;class ql extends xi{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)ph.fromBufferAttribute(e,r),mh.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+ph.distanceTo(mh);t.setAttribute("lineDistance",new de(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Fu extends un{constructor(t,e,i=Mr,r,s,o,a=Xn,c=Xn,l,d=Ks,h=1){if(d!==Ks&&d!==Js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,r,s,o,a,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class je extends Ne{constructor(t=1,e=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const d=[],h=[],f=[],u=[];let g=0;const _=[],m=i/2;let p=0;b(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(d),this.setAttribute("position",new de(h,3)),this.setAttribute("normal",new de(f,3)),this.setAttribute("uv",new de(u,2));function b(){const v=new w,C=new w;let A=0;const R=(e-t)/i;for(let D=0;D<=s;D++){const E=[],y=D/s,P=y*(e-t)+t;for(let B=0;B<=r;B++){const F=B/r,G=F*c+a,j=Math.sin(G),X=Math.cos(G);C.x=P*j,C.y=-y*i+m,C.z=P*X,h.push(C.x,C.y,C.z),v.set(j,R,X).normalize(),f.push(v.x,v.y,v.z),u.push(F,1-y),E.push(g++)}_.push(E)}for(let D=0;D<r;D++)for(let E=0;E<s;E++){const y=_[E][D],P=_[E+1][D],B=_[E+1][D+1],F=_[E][D+1];(t>0||E!==0)&&(d.push(y,P,F),A+=3),(e>0||E!==s-1)&&(d.push(P,B,F),A+=3)}l.addGroup(p,A,0),p+=A}function M(v){const C=g,A=new Lt,R=new w;let D=0;const E=v===!0?t:e,y=v===!0?1:-1;for(let B=1;B<=r;B++)h.push(0,m*y,0),f.push(0,y,0),u.push(.5,.5),g++;const P=g;for(let B=0;B<=r;B++){const G=B/r*c+a,j=Math.cos(G),X=Math.sin(G);R.x=E*X,R.y=m*y,R.z=E*j,h.push(R.x,R.y,R.z),f.push(0,y,0),A.x=j*.5+.5,A.y=X*.5*y+.5,u.push(A.x,A.y),g++}for(let B=0;B<r;B++){const F=C+B,G=P+B;v===!0?d.push(G,G+1,F):d.push(G+1,G,F),D+=3}l.addGroup(p,D,v===!0?1:2),p+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new je(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $l extends Ne{constructor(t=[],e=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:r};const s=[],o=[];a(r),l(i),d(),this.setAttribute("position",new de(s,3)),this.setAttribute("normal",new de(s.slice(),3)),this.setAttribute("uv",new de(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const M=new w,v=new w,C=new w;for(let A=0;A<e.length;A+=3)u(e[A+0],M),u(e[A+1],v),u(e[A+2],C),c(M,v,C,b)}function c(b,M,v,C){const A=C+1,R=[];for(let D=0;D<=A;D++){R[D]=[];const E=b.clone().lerp(v,D/A),y=M.clone().lerp(v,D/A),P=A-D;for(let B=0;B<=P;B++)B===0&&D===A?R[D][B]=E:R[D][B]=E.clone().lerp(y,B/P)}for(let D=0;D<A;D++)for(let E=0;E<2*(A-D)-1;E++){const y=Math.floor(E/2);E%2===0?(f(R[D][y+1]),f(R[D+1][y]),f(R[D][y])):(f(R[D][y+1]),f(R[D+1][y+1]),f(R[D+1][y]))}}function l(b){const M=new w;for(let v=0;v<s.length;v+=3)M.x=s[v+0],M.y=s[v+1],M.z=s[v+2],M.normalize().multiplyScalar(b),s[v+0]=M.x,s[v+1]=M.y,s[v+2]=M.z}function d(){const b=new w;for(let M=0;M<s.length;M+=3){b.x=s[M+0],b.y=s[M+1],b.z=s[M+2];const v=m(b)/2/Math.PI+.5,C=p(b)/Math.PI+.5;o.push(v,1-C)}g(),h()}function h(){for(let b=0;b<o.length;b+=6){const M=o[b+0],v=o[b+2],C=o[b+4],A=Math.max(M,v,C),R=Math.min(M,v,C);A>.9&&R<.1&&(M<.2&&(o[b+0]+=1),v<.2&&(o[b+2]+=1),C<.2&&(o[b+4]+=1))}}function f(b){s.push(b.x,b.y,b.z)}function u(b,M){const v=b*3;M.x=t[v+0],M.y=t[v+1],M.z=t[v+2]}function g(){const b=new w,M=new w,v=new w,C=new w,A=new Lt,R=new Lt,D=new Lt;for(let E=0,y=0;E<s.length;E+=9,y+=6){b.set(s[E+0],s[E+1],s[E+2]),M.set(s[E+3],s[E+4],s[E+5]),v.set(s[E+6],s[E+7],s[E+8]),A.set(o[y+0],o[y+1]),R.set(o[y+2],o[y+3]),D.set(o[y+4],o[y+5]),C.copy(b).add(M).add(v).divideScalar(3);const P=m(C);_(A,y+0,b,P),_(R,y+2,M,P),_(D,y+4,v,P)}}function _(b,M,v,C){C<0&&b.x===1&&(o[M]=b.x-1),v.x===0&&v.z===0&&(o[M]=C/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $l(t.vertices,t.indices,t.radius,t.details)}}const Oo=new w,Fo=new w,pc=new w,zo=new Ln;class zu extends Ne{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const r=Math.pow(10,4),s=Math.cos(cs*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],d=["a","b","c"],h=new Array(3),f={},u=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=zo;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),zo.getNormal(pc),h[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,h[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,h[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let b=0;b<3;b++){const M=(b+1)%3,v=h[b],C=h[M],A=zo[d[b]],R=zo[d[M]],D=`${v}_${C}`,E=`${C}_${v}`;E in f&&f[E]?(pc.dot(f[E].normal)<=s&&(u.push(A.x,A.y,A.z),u.push(R.x,R.y,R.z)),f[E]=null):D in f||(f[D]={index0:l[b],index1:l[M],normal:pc.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:m}=f[g];Oo.fromBufferAttribute(a,_),Fo.fromBufferAttribute(a,m),u.push(Oo.x,Oo.y,Oo.z),u.push(Fo.x,Fo.y,Fo.z)}this.setAttribute("position",new de(u,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class rs extends $l{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new rs(t.radius,t.detail)}}class ao extends Ne{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),c=Math.floor(r),l=a+1,d=c+1,h=t/a,f=e/c,u=[],g=[],_=[],m=[];for(let p=0;p<d;p++){const b=p*f-o;for(let M=0;M<l;M++){const v=M*h-s;g.push(v,-b,0),_.push(0,0,1),m.push(M/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){const M=b+l*p,v=b+l*(p+1),C=b+1+l*(p+1),A=b+1+l*p;u.push(M,v,A),u.push(v,C,A)}this.setIndex(u),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ao(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ur extends Ne{constructor(t=1,e=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const d=[],h=new w,f=new w,u=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const b=[],M=p/i;let v=0;p===0&&o===0?v=.5/e:p===i&&c===Math.PI&&(v=-.5/e);for(let C=0;C<=e;C++){const A=C/e;h.x=-t*Math.cos(r+A*s)*Math.sin(o+M*a),h.y=t*Math.cos(o+M*a),h.z=t*Math.sin(r+A*s)*Math.sin(o+M*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(A+v,1-M),b.push(l++)}d.push(b)}for(let p=0;p<i;p++)for(let b=0;b<e;b++){const M=d[p][b+1],v=d[p][b],C=d[p+1][b],A=d[p+1][b+1];(p!==0||o>0)&&u.push(M,v,A),(p!==i-1||c<Math.PI)&&u.push(v,C,A)}this.setIndex(u),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ur(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class _r extends Ne{constructor(t=1,e=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],c=[],l=[],d=new w,h=new w,f=new w;for(let u=0;u<=i;u++)for(let g=0;g<=r;g++){const _=g/r*s,m=u/i*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(_),h.y=(t+e*Math.cos(m))*Math.sin(_),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),d.x=t*Math.cos(_),d.y=t*Math.sin(_),f.subVectors(h,d).normalize(),c.push(f.x,f.y,f.z),l.push(g/r),l.push(u/i)}for(let u=1;u<=i;u++)for(let g=1;g<=r;g++){const _=(r+1)*u+g-1,m=(r+1)*(u-1)+g-1,p=(r+1)*(u-1)+g,b=(r+1)*u+g;o.push(_,m,b),o.push(m,p,b)}this.setIndex(o),this.setAttribute("position",new de(a,3)),this.setAttribute("normal",new de(c,3)),this.setAttribute("uv",new de(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _r(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Er extends Ts{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Au,this.normalScale=new Lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Zm extends Ts{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Km extends Ts{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Jm extends Nr{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class Zl extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Qm extends Zl{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const mc=new oe,gh=new w,_h=new w;class Bu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Lt(512,512),this.mapType=oi,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yl,this._frameExtents=new Lt(1,1),this._viewportCount=1,this._viewports=[new Ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;gh.setFromMatrixPosition(t.matrixWorld),e.position.copy(gh),_h.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(_h),e.updateMatrixWorld(),mc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(mc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class tg extends Bu{constructor(){super(new bn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,i=vs*2*t.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=t.distance||e.far;(i!==e.fov||r!==e.aspect||s!==e.far)&&(e.fov=i,e.aspect=r,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class eg extends Zl{constructor(t,e,i=0,r=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new tg}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Kl extends Uu{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class ng extends Bu{constructor(){super(new Kl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ig extends Zl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new ng}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rg extends bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const vh=new oe;class ku{constructor(t,e,i=0,r=1/0){this.ray=new ba(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new jl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return vh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vh),this}intersectObject(t,e=!0,i=[]){return vl(t,this,i,e),i.sort(xh),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)vl(t[r],this,i,e);return i.sort(xh),i}}function xh(n,t){return n.distance-t.distance}function vl(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)vl(s[o],t,e,!0)}}class yh{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class sg extends ql{constructor(t=10,e=10,i=4473924,r=8947848){i=new jt(i),r=new jt(r);const s=e/2,o=t/e,a=t/2,c=[],l=[];for(let f=0,u=0,g=-a;f<=e;f++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);const _=f===s?i:r;_.toArray(l,u),u+=3,_.toArray(l,u),u+=3,_.toArray(l,u),u+=3,_.toArray(l,u),u+=3}const d=new Ne;d.setAttribute("position",new de(c,3)),d.setAttribute("color",new de(l,3));const h=new Nr({vertexColors:!0,toneMapped:!1});super(d,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Bo=new jn;class og extends ql{constructor(t,e=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),r=new Float32Array(24),s=new Ne;s.setIndex(new Re(i,1)),s.setAttribute("position",new Re(r,3)),super(s,new Nr({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Bo.setFromObject(this.object),Bo.isEmpty())return;const t=Bo.min,e=Bo.max,i=this.geometry.attributes.position,r=i.array;r[0]=e.x,r[1]=e.y,r[2]=e.z,r[3]=t.x,r[4]=e.y,r[5]=e.z,r[6]=t.x,r[7]=t.y,r[8]=e.z,r[9]=e.x,r[10]=t.y,r[11]=e.z,r[12]=e.x,r[13]=e.y,r[14]=t.z,r[15]=t.x,r[16]=e.y,r[17]=t.z,r[18]=t.x,r[19]=t.y,r[20]=t.z,r[21]=e.x,r[22]=t.y,r[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Hu extends Ir{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Mh(n,t,e,i){const r=ag(i);switch(e){case bu:return n*t;case Eu:return n*t/r.components*r.byteLength;case Hl:return n*t/r.components*r.byteLength;case wu:return n*t*2/r.components*r.byteLength;case Vl:return n*t*2/r.components*r.byteLength;case Su:return n*t*3/r.components*r.byteLength;case Vn:return n*t*4/r.components*r.byteLength;case Gl:return n*t*4/r.components*r.byteLength;case Yo:case qo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case $o:case Zo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Yc:case $c:return Math.max(n,16)*Math.max(t,8)/4;case jc:case qc:return Math.max(n,8)*Math.max(t,8)/2;case Zc:case Kc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Jc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Qc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case tl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case el:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case nl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case il:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case rl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case sl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case ol:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case al:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case cl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ll:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case dl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case hl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ul:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ko:case fl:case pl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Tu:case ml:return Math.ceil(n/4)*Math.ceil(t/4)*8;case gl:case _l:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ag(n){switch(n){case oi:case xu:return{byteLength:1,components:1};case $s:case yu:case oo:return{byteLength:2,components:1};case Bl:case kl:return{byteLength:2,components:4};case Mr:case zl:case bi:return{byteLength:4,components:1};case Mu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fl);function Vu(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function cg(n){const t=new WeakMap;function e(a,c){const l=a.array,d=a.usage,h=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,d),a.onUploadCallback();let u;if(l instanceof Float32Array)u=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)u=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?u=n.HALF_FLOAT:u=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=n.SHORT;else if(l instanceof Uint32Array)u=n.UNSIGNED_INT;else if(l instanceof Int32Array)u=n.INT;else if(l instanceof Int8Array)u=n.BYTE;else if(l instanceof Uint8Array)u=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,c,l){const d=c.array,h=c.updateRanges;if(n.bindBuffer(l,a),h.length===0)n.bufferSubData(l,0,d);else{h.sort((u,g)=>u.start-g.start);let f=0;for(let u=1;u<h.length;u++){const g=h[f],_=h[u];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let u=0,g=h.length;u<g;u++){const _=h[u];n.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var lg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ug=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_g=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ag=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Dg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Lg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ig=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ng=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bg="gl_FragColor = linearToOutputTexel( gl_FragColor );",kg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Wg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$g=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Kg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,t_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,e_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,n_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,i_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,r_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,s_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,o_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,a_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,c_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,l_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,d_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,h_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,p_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,m_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,g_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,__=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,v_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,x_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,M_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,b_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,E_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,w_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,A_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,R_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,D_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,L_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,I_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,N_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,U_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,O_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,F_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,z_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,B_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,k_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,H_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,W_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,X_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,j_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Y_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,q_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Z_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,K_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,J_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Q_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,t0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,e0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,n0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,i0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,o0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,a0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const c0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,l0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,m0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,g0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,x0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,M0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,S0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,A0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,C0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,P0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,D0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,I0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,z0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,k0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:lg,alphahash_pars_fragment:dg,alphamap_fragment:hg,alphamap_pars_fragment:ug,alphatest_fragment:fg,alphatest_pars_fragment:pg,aomap_fragment:mg,aomap_pars_fragment:gg,batching_pars_vertex:_g,batching_vertex:vg,begin_vertex:xg,beginnormal_vertex:yg,bsdfs:Mg,iridescence_fragment:bg,bumpmap_pars_fragment:Sg,clipping_planes_fragment:Eg,clipping_planes_pars_fragment:wg,clipping_planes_pars_vertex:Tg,clipping_planes_vertex:Ag,color_fragment:Rg,color_pars_fragment:Cg,color_pars_vertex:Pg,color_vertex:Dg,common:Lg,cube_uv_reflection_fragment:Ig,defaultnormal_vertex:Ng,displacementmap_pars_vertex:Ug,displacementmap_vertex:Og,emissivemap_fragment:Fg,emissivemap_pars_fragment:zg,colorspace_fragment:Bg,colorspace_pars_fragment:kg,envmap_fragment:Hg,envmap_common_pars_fragment:Vg,envmap_pars_fragment:Gg,envmap_pars_vertex:Wg,envmap_physical_pars_fragment:e_,envmap_vertex:Xg,fog_vertex:jg,fog_pars_vertex:Yg,fog_fragment:qg,fog_pars_fragment:$g,gradientmap_pars_fragment:Zg,lightmap_pars_fragment:Kg,lights_lambert_fragment:Jg,lights_lambert_pars_fragment:Qg,lights_pars_begin:t_,lights_toon_fragment:n_,lights_toon_pars_fragment:i_,lights_phong_fragment:r_,lights_phong_pars_fragment:s_,lights_physical_fragment:o_,lights_physical_pars_fragment:a_,lights_fragment_begin:c_,lights_fragment_maps:l_,lights_fragment_end:d_,logdepthbuf_fragment:h_,logdepthbuf_pars_fragment:u_,logdepthbuf_pars_vertex:f_,logdepthbuf_vertex:p_,map_fragment:m_,map_pars_fragment:g_,map_particle_fragment:__,map_particle_pars_fragment:v_,metalnessmap_fragment:x_,metalnessmap_pars_fragment:y_,morphinstance_vertex:M_,morphcolor_vertex:b_,morphnormal_vertex:S_,morphtarget_pars_vertex:E_,morphtarget_vertex:w_,normal_fragment_begin:T_,normal_fragment_maps:A_,normal_pars_fragment:R_,normal_pars_vertex:C_,normal_vertex:P_,normalmap_pars_fragment:D_,clearcoat_normal_fragment_begin:L_,clearcoat_normal_fragment_maps:I_,clearcoat_pars_fragment:N_,iridescence_pars_fragment:U_,opaque_fragment:O_,packing:F_,premultiplied_alpha_fragment:z_,project_vertex:B_,dithering_fragment:k_,dithering_pars_fragment:H_,roughnessmap_fragment:V_,roughnessmap_pars_fragment:G_,shadowmap_pars_fragment:W_,shadowmap_pars_vertex:X_,shadowmap_vertex:j_,shadowmask_pars_fragment:Y_,skinbase_vertex:q_,skinning_pars_vertex:$_,skinning_vertex:Z_,skinnormal_vertex:K_,specularmap_fragment:J_,specularmap_pars_fragment:Q_,tonemapping_fragment:t0,tonemapping_pars_fragment:e0,transmission_fragment:n0,transmission_pars_fragment:i0,uv_pars_fragment:r0,uv_pars_vertex:s0,uv_vertex:o0,worldpos_vertex:a0,background_vert:c0,background_frag:l0,backgroundCube_vert:d0,backgroundCube_frag:h0,cube_vert:u0,cube_frag:f0,depth_vert:p0,depth_frag:m0,distanceRGBA_vert:g0,distanceRGBA_frag:_0,equirect_vert:v0,equirect_frag:x0,linedashed_vert:y0,linedashed_frag:M0,meshbasic_vert:b0,meshbasic_frag:S0,meshlambert_vert:E0,meshlambert_frag:w0,meshmatcap_vert:T0,meshmatcap_frag:A0,meshnormal_vert:R0,meshnormal_frag:C0,meshphong_vert:P0,meshphong_frag:D0,meshphysical_vert:L0,meshphysical_frag:I0,meshtoon_vert:N0,meshtoon_frag:U0,points_vert:O0,points_frag:F0,shadow_vert:z0,shadow_frag:B0,sprite_vert:k0,sprite_frag:H0},at={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new Lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},ei={basic:{uniforms:rn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:rn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new jt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:rn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:rn([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:rn([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new jt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:rn([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:rn([at.points,at.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:rn([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:rn([at.common,at.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:rn([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:rn([at.sprite,at.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:rn([at.common,at.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:rn([at.lights,at.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};ei.physical={uniforms:rn([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const ko={r:0,b:0,g:0},hr=new Yn,V0=new oe;function G0(n,t,e,i,r,s,o){const a=new jt(0);let c=s===!0?0:1,l,d,h=null,f=0,u=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function _(M){let v=!1;const C=g(M);C===null?p(a,c):C&&C.isColor&&(p(C,1),v=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,v){const C=g(v);C&&(C.isCubeTexture||C.mapping===ya)?(d===void 0&&(d=new st(new Ee(1,1,1),new qi({name:"BackgroundCubeMaterial",uniforms:xs(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(A,R,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),hr.copy(v.backgroundRotation),hr.x*=-1,hr.y*=-1,hr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(hr.y*=-1,hr.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(V0.makeRotationFromEuler(hr)),d.material.toneMapped=Zt.getTransfer(C.colorSpace)!==ce,(h!==C||f!==C.version||u!==n.toneMapping)&&(d.material.needsUpdate=!0,h=C,f=C.version,u=n.toneMapping),d.layers.enableAll(),M.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new st(new ao(2,2),new qi({name:"BackgroundMaterial",uniforms:xs(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Zt.getTransfer(C.colorSpace)!==ce,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||f!==C.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=C,f=C.version,u=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,v){M.getRGB(ko,Nu(n)),i.buffers.color.setClear(ko.r,ko.g,ko.b,v,o)}function b(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(a,c)},render:_,addToRenderList:m,dispose:b}}function W0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(y,P,B,F,G){let j=!1;const X=h(F,B,P);s!==X&&(s=X,l(s.object)),j=u(y,F,B,G),j&&g(y,F,B,G),G!==null&&t.update(G,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,v(y,P,B,F),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return n.createVertexArray()}function l(y){return n.bindVertexArray(y)}function d(y){return n.deleteVertexArray(y)}function h(y,P,B){const F=B.wireframe===!0;let G=i[y.id];G===void 0&&(G={},i[y.id]=G);let j=G[P.id];j===void 0&&(j={},G[P.id]=j);let X=j[F];return X===void 0&&(X=f(c()),j[F]=X),X}function f(y){const P=[],B=[],F=[];for(let G=0;G<e;G++)P[G]=0,B[G]=0,F[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:F,object:y,attributes:{},index:null}}function u(y,P,B,F){const G=s.attributes,j=P.attributes;let X=0;const $=B.getAttributes();for(const V in $)if($[V].location>=0){const ut=G[V];let yt=j[V];if(yt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(yt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(yt=y.instanceColor)),ut===void 0||ut.attribute!==yt||yt&&ut.data!==yt.data)return!0;X++}return s.attributesNum!==X||s.index!==F}function g(y,P,B,F){const G={},j=P.attributes;let X=0;const $=B.getAttributes();for(const V in $)if($[V].location>=0){let ut=j[V];ut===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ut=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ut=y.instanceColor));const yt={};yt.attribute=ut,ut&&ut.data&&(yt.data=ut.data),G[V]=yt,X++}s.attributes=G,s.attributesNum=X,s.index=F}function _(){const y=s.newAttributes;for(let P=0,B=y.length;P<B;P++)y[P]=0}function m(y){p(y,0)}function p(y,P){const B=s.newAttributes,F=s.enabledAttributes,G=s.attributeDivisors;B[y]=1,F[y]===0&&(n.enableVertexAttribArray(y),F[y]=1),G[y]!==P&&(n.vertexAttribDivisor(y,P),G[y]=P)}function b(){const y=s.newAttributes,P=s.enabledAttributes;for(let B=0,F=P.length;B<F;B++)P[B]!==y[B]&&(n.disableVertexAttribArray(B),P[B]=0)}function M(y,P,B,F,G,j,X){X===!0?n.vertexAttribIPointer(y,P,B,G,j):n.vertexAttribPointer(y,P,B,F,G,j)}function v(y,P,B,F){_();const G=F.attributes,j=B.getAttributes(),X=P.defaultAttributeValues;for(const $ in j){const V=j[$];if(V.location>=0){let it=G[$];if(it===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(it=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(it=y.instanceColor)),it!==void 0){const ut=it.normalized,yt=it.itemSize,Bt=t.get(it);if(Bt===void 0)continue;const re=Bt.buffer,Y=Bt.type,rt=Bt.bytesPerElement,Et=Y===n.INT||Y===n.UNSIGNED_INT||it.gpuType===zl;if(it.isInterleavedBufferAttribute){const ft=it.data,wt=ft.stride,Jt=it.offset;if(ft.isInstancedInterleavedBuffer){for(let Dt=0;Dt<V.locationSize;Dt++)p(V.location+Dt,ft.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Dt=0;Dt<V.locationSize;Dt++)m(V.location+Dt);n.bindBuffer(n.ARRAY_BUFFER,re);for(let Dt=0;Dt<V.locationSize;Dt++)M(V.location+Dt,yt/V.locationSize,Y,ut,wt*rt,(Jt+yt/V.locationSize*Dt)*rt,Et)}else{if(it.isInstancedBufferAttribute){for(let ft=0;ft<V.locationSize;ft++)p(V.location+ft,it.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let ft=0;ft<V.locationSize;ft++)m(V.location+ft);n.bindBuffer(n.ARRAY_BUFFER,re);for(let ft=0;ft<V.locationSize;ft++)M(V.location+ft,yt/V.locationSize,Y,ut,yt*rt,yt/V.locationSize*ft*rt,Et)}}else if(X!==void 0){const ut=X[$];if(ut!==void 0)switch(ut.length){case 2:n.vertexAttrib2fv(V.location,ut);break;case 3:n.vertexAttrib3fv(V.location,ut);break;case 4:n.vertexAttrib4fv(V.location,ut);break;default:n.vertexAttrib1fv(V.location,ut)}}}}b()}function C(){D();for(const y in i){const P=i[y];for(const B in P){const F=P[B];for(const G in F)d(F[G].object),delete F[G];delete P[B]}delete i[y]}}function A(y){if(i[y.id]===void 0)return;const P=i[y.id];for(const B in P){const F=P[B];for(const G in F)d(F[G].object),delete F[G];delete P[B]}delete i[y.id]}function R(y){for(const P in i){const B=i[P];if(B[y.id]===void 0)continue;const F=B[y.id];for(const G in F)d(F[G].object),delete F[G];delete B[y.id]}}function D(){E(),o=!0,s!==r&&(s=r,l(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function X0(n,t,e){let i;function r(l){i=l}function s(l,d){n.drawArrays(i,l,d),e.update(d,i,1)}function o(l,d,h){h!==0&&(n.drawArraysInstanced(i,l,d,h),e.update(d,i,h))}function a(l,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,h);let u=0;for(let g=0;g<h;g++)u+=d[g];e.update(u,i,1)}function c(l,d,h,f){if(h===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let g=0;g<l.length;g++)o(l[g],d[g],f[g]);else{u.multiDrawArraysInstancedWEBGL(i,l,0,d,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=d[_]*f[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function j0(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==Vn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const D=R===oo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==oi&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==bi&&!D)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:u,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:C,maxSamples:A}}function Y0(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new ti,a=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const u=h.length!==0||f||i!==0||r;return r=f,i=h.length,u},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=d(h,f,0)},this.setState=function(h,f,u){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?d(null):l();else{const b=s?0:i,M=b*4;let v=p.clippingState||null;c.value=v,v=d(g,f,M,u);for(let C=0;C!==M;++C)v[C]=e[C];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(h,f,u,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=u+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=u;M!==_;++M,v+=4)o.copy(h[M]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function q0(n){let t=new WeakMap;function e(o,a){return a===Vc?o.mapping=ms:a===Gc&&(o.mapping=gs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Vc||a===Gc)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Wm(c.height);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",r),e(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const ss=4,bh=[.125,.215,.35,.446,.526,.582],vr=20,gc=new Kl,Sh=new jt;let _c=null,vc=0,xc=0,yc=!1;const pr=(1+Math.sqrt(5))/2,ts=1/pr,Eh=[new w(-pr,ts,0),new w(pr,ts,0),new w(-ts,0,pr),new w(ts,0,pr),new w(0,pr,-ts),new w(0,pr,ts),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],$0=new w;class wh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:o=256,position:a=$0}=s;_c=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,r,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ah(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_c,vc,xc),this._renderer.xr.enabled=yc,t.scissorTest=!1,Ho(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ms||t.mapping===gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_c=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ri,minFilter:ri,generateMipmaps:!1,type:oo,format:Vn,colorSpace:_s,depthBuffer:!1},r=Th(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Th(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Z0(s)),this._blurMaterial=K0(s,t,e)}return r}_compileMaterial(t){const e=new st(this._lodPlanes[0],t);this._renderer.compile(e,gc)}_sceneToCubeUV(t,e,i,r,s){const c=new bn(90,1,e,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(Sh),h.toneMapping=Xi,h.autoClear=!1;const g=new ai({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),_=new st(new Ee,g);let m=!1;const p=t.background;p?p.isColor&&(g.color.copy(p),t.background=null,m=!0):(g.color.copy(Sh),m=!0);for(let b=0;b<6;b++){const M=b%3;M===0?(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+d[b],s.y,s.z)):M===1?(c.up.set(0,0,l[b]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+d[b],s.z)):(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+d[b]));const v=this._cubeSize;Ho(r,M*v,b>2?v:0,v,v),h.setRenderTarget(r),m&&h.render(_,c),h.render(t,c)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=u,h.autoClear=f,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===ms||t.mapping===gs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ah());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new st(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Ho(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,gc)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Eh[(r-s-1)%Eh.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new st(this._lodPlanes[r],l),f=l.uniforms,u=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*u):2*Math.PI/(2*vr-1),_=s/g,m=isFinite(s)?1+Math.floor(d*_):vr;m>vr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vr}`);const p=[];let b=0;for(let R=0;R<vr;++R){const D=R/_,E=Math.exp(-D*D/2);p.push(E),R===0?b+=E:R<m&&(b+=2*E)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-i;const v=this._sizeLods[r],C=3*v*(r>M-ss?r-M+ss:0),A=4*(this._cubeSize-v);Ho(e,C,A,3*v,2*v),c.setRenderTarget(e),c.render(h,gc)}}function Z0(n){const t=[],e=[],i=[];let r=n;const s=n-ss+1+bh.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let c=1/a;o>n-ss?c=bh[o-n+ss-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),d=-l,h=1+l,f=[d,d,h,d,h,h,d,d,h,h,d,h],u=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*u),M=new Float32Array(m*g*u),v=new Float32Array(p*g*u);for(let A=0;A<u;A++){const R=A%3*2/3-1,D=A>2?0:-1,E=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];b.set(E,_*g*A),M.set(f,m*g*A);const y=[A,A,A,A,A,A];v.set(y,p*g*A)}const C=new Ne;C.setAttribute("position",new Re(b,_)),C.setAttribute("uv",new Re(M,m)),C.setAttribute("faceIndex",new Re(v,p)),t.push(C),r>ss&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Th(n,t,e){const i=new Sr(n,t,e);return i.texture.mapping=ya,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ho(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function K0(n,t,e){const i=new Float32Array(vr),r=new w(0,1,0);return new qi({name:"SphericalGaussianBlur",defines:{n:vr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Ah(){return new qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Rh(){return new qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Jl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function J0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Vc||c===Gc,d=c===ms||c===gs;if(l||d){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new wh(n)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const u=a.image;return l&&u&&u.height>0||d&&u&&r(u)?(e===null&&(e=new wh(n)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0;const l=6;for(let d=0;d<l;d++)a[d]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Q0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&ls("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function tv(n,t,e,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const u=s.get(f);u&&(t.remove(u),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const u in f)t.update(f[u],n.ARRAY_BUFFER)}function l(h){const f=[],u=h.index,g=h.attributes.position;let _=0;if(u!==null){const b=u.array;_=u.version;for(let M=0,v=b.length;M<v;M+=3){const C=b[M+0],A=b[M+1],R=b[M+2];f.push(C,A,A,R,R,C)}}else if(g!==void 0){const b=g.array;_=g.version;for(let M=0,v=b.length/3-1;M<v;M+=3){const C=M+0,A=M+1,R=M+2;f.push(C,A,A,R,R,C)}}else return;const m=new(Cu(f)?Iu:Lu)(f,1);m.version=_;const p=s.get(h);p&&t.remove(p),s.set(h,m)}function d(h){const f=s.get(h);if(f){const u=h.index;u!==null&&f.version<u.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:d}}function ev(n,t,e){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,u){n.drawElements(i,u,s,f*o),e.update(u,i,1)}function l(f,u,g){g!==0&&(n.drawElementsInstanced(i,u,s,f*o,g),e.update(u,i,g))}function d(f,u,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=u[p];e.update(m,i,1)}function h(f,u,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,u[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,u,0,s,f,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=u[b]*_[b];e.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function nv(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function iv(n,t,e){const i=new WeakMap,r=new Ae;function s(o,a,c){const l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let y=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var u=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let C=a.attributes.position.count*v,A=1;C>t.maxTextureSize&&(A=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const R=new Float32Array(C*A*4*h),D=new Pu(R,C,A,h);D.type=bi,D.needsUpdate=!0;const E=v*4;for(let P=0;P<h;P++){const B=p[P],F=b[P],G=M[P],j=C*A*4*P;for(let X=0;X<B.count;X++){const $=X*E;g===!0&&(r.fromBufferAttribute(B,X),R[j+$+0]=r.x,R[j+$+1]=r.y,R[j+$+2]=r.z,R[j+$+3]=0),_===!0&&(r.fromBufferAttribute(F,X),R[j+$+4]=r.x,R[j+$+5]=r.y,R[j+$+6]=r.z,R[j+$+7]=0),m===!0&&(r.fromBufferAttribute(G,X),R[j+$+8]=r.x,R[j+$+9]=r.y,R[j+$+10]=r.z,R[j+$+11]=G.itemSize===4?r.w:1)}}f={count:h,texture:D,size:new Lt(C,A)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function rv(n,t,e,i){let r=new WeakMap;function s(c){const l=i.render.frame,d=c.geometry,h=t.get(c,d);if(r.get(h)!==l&&(t.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}const Gu=new un,Ch=new Fu(1,1),Wu=new Pu,Xu=new Am,ju=new Ou,Ph=[],Dh=[],Lh=new Float32Array(16),Ih=new Float32Array(9),Nh=new Float32Array(4);function As(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Ph[r];if(s===void 0&&(s=new Float32Array(r),Ph[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Be(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ke(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Sa(n,t){let e=Dh[t];e===void 0&&(e=new Int32Array(t),Dh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function sv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function ov(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2fv(this.addr,t),ke(e,t)}}function av(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;n.uniform3fv(this.addr,t),ke(e,t)}}function cv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4fv(this.addr,t),ke(e,t)}}function lv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;Nh.set(i),n.uniformMatrix2fv(this.addr,!1,Nh),ke(e,i)}}function dv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;Ih.set(i),n.uniformMatrix3fv(this.addr,!1,Ih),ke(e,i)}}function hv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;Lh.set(i),n.uniformMatrix4fv(this.addr,!1,Lh),ke(e,i)}}function uv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function fv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2iv(this.addr,t),ke(e,t)}}function pv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3iv(this.addr,t),ke(e,t)}}function mv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4iv(this.addr,t),ke(e,t)}}function gv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function _v(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2uiv(this.addr,t),ke(e,t)}}function vv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3uiv(this.addr,t),ke(e,t)}}function xv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4uiv(this.addr,t),ke(e,t)}}function yv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ch.compareFunction=Ru,s=Ch):s=Gu,e.setTexture2D(t||s,r)}function Mv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Xu,r)}function bv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||ju,r)}function Sv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Wu,r)}function Ev(n){switch(n){case 5126:return sv;case 35664:return ov;case 35665:return av;case 35666:return cv;case 35674:return lv;case 35675:return dv;case 35676:return hv;case 5124:case 35670:return uv;case 35667:case 35671:return fv;case 35668:case 35672:return pv;case 35669:case 35673:return mv;case 5125:return gv;case 36294:return _v;case 36295:return vv;case 36296:return xv;case 35678:case 36198:case 36298:case 36306:case 35682:return yv;case 35679:case 36299:case 36307:return Mv;case 35680:case 36300:case 36308:case 36293:return bv;case 36289:case 36303:case 36311:case 36292:return Sv}}function wv(n,t){n.uniform1fv(this.addr,t)}function Tv(n,t){const e=As(t,this.size,2);n.uniform2fv(this.addr,e)}function Av(n,t){const e=As(t,this.size,3);n.uniform3fv(this.addr,e)}function Rv(n,t){const e=As(t,this.size,4);n.uniform4fv(this.addr,e)}function Cv(n,t){const e=As(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Pv(n,t){const e=As(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Dv(n,t){const e=As(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Lv(n,t){n.uniform1iv(this.addr,t)}function Iv(n,t){n.uniform2iv(this.addr,t)}function Nv(n,t){n.uniform3iv(this.addr,t)}function Uv(n,t){n.uniform4iv(this.addr,t)}function Ov(n,t){n.uniform1uiv(this.addr,t)}function Fv(n,t){n.uniform2uiv(this.addr,t)}function zv(n,t){n.uniform3uiv(this.addr,t)}function Bv(n,t){n.uniform4uiv(this.addr,t)}function kv(n,t,e){const i=this.cache,r=t.length,s=Sa(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Gu,s[o])}function Hv(n,t,e){const i=this.cache,r=t.length,s=Sa(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Xu,s[o])}function Vv(n,t,e){const i=this.cache,r=t.length,s=Sa(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||ju,s[o])}function Gv(n,t,e){const i=this.cache,r=t.length,s=Sa(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Wu,s[o])}function Wv(n){switch(n){case 5126:return wv;case 35664:return Tv;case 35665:return Av;case 35666:return Rv;case 35674:return Cv;case 35675:return Pv;case 35676:return Dv;case 5124:case 35670:return Lv;case 35667:case 35671:return Iv;case 35668:case 35672:return Nv;case 35669:case 35673:return Uv;case 5125:return Ov;case 36294:return Fv;case 36295:return zv;case 36296:return Bv;case 35678:case 36198:case 36298:case 36306:case 35682:return kv;case 35679:case 36299:case 36307:return Hv;case 35680:case 36300:case 36308:case 36293:return Vv;case 36289:case 36303:case 36311:case 36292:return Gv}}class Xv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ev(e.type)}}class jv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wv(e.type)}}class Yv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const Mc=/(\w+)(\])?(\[|\.)?/g;function Uh(n,t){n.seq.push(t),n.map[t.id]=t}function qv(n,t,e){const i=n.name,r=i.length;for(Mc.lastIndex=0;;){const s=Mc.exec(i),o=Mc.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Uh(e,l===void 0?new Xv(a,n,t):new jv(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new Yv(a),Uh(e,h)),e=h}}}class Jo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);qv(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Oh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const $v=37297;let Zv=0;function Kv(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Fh=new kt;function Jv(n){Zt._getMatrix(Fh,Zt.workingColorSpace,n);const t=`mat3( ${Fh.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(n)){case ia:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function zh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Kv(n.getShaderSource(t),o)}else return r}function Qv(n,t){const e=Jv(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function tx(n,t){let e;switch(t){case zp:e="Linear";break;case Bp:e="Reinhard";break;case kp:e="Cineon";break;case Hp:e="ACESFilmic";break;case Gp:e="AgX";break;case Wp:e="Neutral";break;case Vp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Vo=new w;function ex(){Zt.getLuminanceCoefficients(Vo);const n=Vo.x.toFixed(4),t=Vo.y.toFixed(4),e=Vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vs).join(`
`)}function ix(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function rx(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Vs(n){return n!==""}function Bh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const sx=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(n){return n.replace(sx,ax)}const ox=new Map;function ax(n,t){let e=Wt[t];if(e===void 0){const i=ox.get(t);if(i!==void 0)e=Wt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return xl(e)}const cx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hh(n){return n.replace(cx,lx)}function lx(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Vh(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function dx(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===mu?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===gu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===vi&&(t="SHADOWMAP_TYPE_VSM"),t}function hx(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ms:case gs:t="ENVMAP_TYPE_CUBE";break;case ya:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ux(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===gs&&(t="ENVMAP_MODE_REFRACTION"),t}function fx(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case _u:t="ENVMAP_BLENDING_MULTIPLY";break;case Op:t="ENVMAP_BLENDING_MIX";break;case Fp:t="ENVMAP_BLENDING_ADD";break}return t}function px(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function mx(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=dx(e),l=hx(e),d=ux(e),h=fx(e),f=px(e),u=nx(e),g=ix(s),_=r.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vs).join(`
`),p.length>0&&(p+=`
`)):(m=[Vh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vs).join(`
`),p=[Vh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xi?"#define TONE_MAPPING":"",e.toneMapping!==Xi?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Xi?tx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Qv("linearToOutputTexel",e.outputColorSpace),ex(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Vs).join(`
`)),o=xl(o),o=Bh(o,e),o=kh(o,e),a=xl(a),a=Bh(a,e),a=kh(a,e),o=Hh(o),a=Hh(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Yd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=b+m+o,v=b+p+a,C=Oh(r,r.VERTEX_SHADER,M),A=Oh(r,r.FRAGMENT_SHADER,v);r.attachShader(_,C),r.attachShader(_,A),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(P){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(C).trim(),G=r.getShaderInfoLog(A).trim();let j=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,C,A);else{const $=zh(r,C,"vertex"),V=zh(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+$+`
`+V)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||G==="")&&(X=!1);X&&(P.diagnostics={runnable:j,programLog:B,vertexShader:{log:F,prefix:m},fragmentShader:{log:G,prefix:p}})}r.deleteShader(C),r.deleteShader(A),D=new Jo(r,_),E=rx(r,_)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,$v)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=A,this}let gx=0;class _x{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new vx(t),e.set(t,i)),i}}class vx{constructor(t){this.id=gx++,this.code=t,this.usedTimes=0}}function xx(n,t,e,i,r,s,o){const a=new jl,c=new _x,l=new Set,d=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let u=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,y,P,B,F){const G=B.fog,j=F.geometry,X=E.isMeshStandardMaterial?B.environment:null,$=(E.isMeshStandardMaterial?e:t).get(E.envMap||X),V=$&&$.mapping===ya?$.image.height:null,it=g[E.type];E.precision!==null&&(u=r.getMaxPrecision(E.precision),u!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",u,"instead."));const ut=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,yt=ut!==void 0?ut.length:0;let Bt=0;j.morphAttributes.position!==void 0&&(Bt=1),j.morphAttributes.normal!==void 0&&(Bt=2),j.morphAttributes.color!==void 0&&(Bt=3);let re,Y,rt,Et;if(it){const se=ei[it];re=se.vertexShader,Y=se.fragmentShader}else re=E.vertexShader,Y=E.fragmentShader,c.update(E),rt=c.getVertexShaderID(E),Et=c.getFragmentShaderID(E);const ft=n.getRenderTarget(),wt=n.state.buffers.depth.getReversed(),Jt=F.isInstancedMesh===!0,Dt=F.isBatchedMesh===!0,Me=!!E.map,be=!!E.matcap,Qt=!!$,L=!!E.aoMap,tn=!!E.lightMap,te=!!E.bumpMap,fe=!!E.normalMap,Mt=!!E.displacementMap,qt=!!E.emissiveMap,At=!!E.metalnessMap,Gt=!!E.roughnessMap,Oe=E.anisotropy>0,T=E.clearcoat>0,x=E.dispersion>0,z=E.iridescence>0,q=E.sheen>0,K=E.transmission>0,W=Oe&&!!E.anisotropyMap,bt=T&&!!E.clearcoatMap,ct=T&&!!E.clearcoatNormalMap,xt=T&&!!E.clearcoatRoughnessMap,St=z&&!!E.iridescenceMap,J=z&&!!E.iridescenceThicknessMap,pt=q&&!!E.sheenColorMap,Pt=q&&!!E.sheenRoughnessMap,Ct=!!E.specularMap,ot=!!E.specularColorMap,Ot=!!E.specularIntensityMap,I=K&&!!E.transmissionMap,dt=K&&!!E.thicknessMap,Q=!!E.gradientMap,gt=!!E.alphaMap,tt=E.alphaTest>0,Z=!!E.alphaHash,_t=!!E.extensions;let zt=Xi;E.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(zt=n.toneMapping);const pe={shaderID:it,shaderType:E.type,shaderName:E.name,vertexShader:re,fragmentShader:Y,defines:E.defines,customVertexShaderID:rt,customFragmentShaderID:Et,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:u,batching:Dt,batchingColor:Dt&&F._colorsTexture!==null,instancing:Jt,instancingColor:Jt&&F.instanceColor!==null,instancingMorph:Jt&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ft===null?n.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:_s,alphaToCoverage:!!E.alphaToCoverage,map:Me,matcap:be,envMap:Qt,envMapMode:Qt&&$.mapping,envMapCubeUVHeight:V,aoMap:L,lightMap:tn,bumpMap:te,normalMap:fe,displacementMap:f&&Mt,emissiveMap:qt,normalMapObjectSpace:fe&&E.normalMapType===qp,normalMapTangentSpace:fe&&E.normalMapType===Au,metalnessMap:At,roughnessMap:Gt,anisotropy:Oe,anisotropyMap:W,clearcoat:T,clearcoatMap:bt,clearcoatNormalMap:ct,clearcoatRoughnessMap:xt,dispersion:x,iridescence:z,iridescenceMap:St,iridescenceThicknessMap:J,sheen:q,sheenColorMap:pt,sheenRoughnessMap:Pt,specularMap:Ct,specularColorMap:ot,specularIntensityMap:Ot,transmission:K,transmissionMap:I,thicknessMap:dt,gradientMap:Q,opaque:E.transparent===!1&&E.blending===as&&E.alphaToCoverage===!1,alphaMap:gt,alphaTest:tt,alphaHash:Z,combine:E.combine,mapUv:Me&&_(E.map.channel),aoMapUv:L&&_(E.aoMap.channel),lightMapUv:tn&&_(E.lightMap.channel),bumpMapUv:te&&_(E.bumpMap.channel),normalMapUv:fe&&_(E.normalMap.channel),displacementMapUv:Mt&&_(E.displacementMap.channel),emissiveMapUv:qt&&_(E.emissiveMap.channel),metalnessMapUv:At&&_(E.metalnessMap.channel),roughnessMapUv:Gt&&_(E.roughnessMap.channel),anisotropyMapUv:W&&_(E.anisotropyMap.channel),clearcoatMapUv:bt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:ct&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:J&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&_(E.sheenRoughnessMap.channel),specularMapUv:Ct&&_(E.specularMap.channel),specularColorMapUv:ot&&_(E.specularColorMap.channel),specularIntensityMapUv:Ot&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:dt&&_(E.thicknessMap.channel),alphaMapUv:gt&&_(E.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(fe||Oe),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!j.attributes.uv&&(Me||gt),fog:!!G,useFog:E.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:wt,skinning:F.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Bt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:zt,decodeVideoTexture:Me&&E.map.isVideoTexture===!0&&Zt.getTransfer(E.map.colorSpace)===ce,decodeVideoTextureEmissive:qt&&E.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(E.emissiveMap.colorSpace)===ce,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Je,flipSided:E.side===on,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:_t&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&E.extensions.multiDraw===!0||Dt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return pe.vertexUv1s=l.has(1),pe.vertexUv2s=l.has(2),pe.vertexUv3s=l.has(3),l.clear(),pe}function p(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)y.push(P),y.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(b(y,E),M(y,E),y.push(n.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function b(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function M(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),E.push(a.mask)}function v(E){const y=g[E.type];let P;if(y){const B=ei[y];P=km.clone(B.uniforms)}else P=E.uniforms;return P}function C(E,y){let P;for(let B=0,F=d.length;B<F;B++){const G=d[B];if(G.cacheKey===y){P=G,++P.usedTimes;break}}return P===void 0&&(P=new mx(n,y,E,s),d.push(P)),P}function A(E){if(--E.usedTimes===0){const y=d.indexOf(E);d[y]=d[d.length-1],d.pop(),E.destroy()}}function R(E){c.remove(E)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:d,dispose:D}}function yx(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function Mx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Gh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Wh(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(h,f,u,g,_,m){let p=n[t];return p===void 0?(p={id:h.id,object:h,geometry:f,material:u,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[t]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=u,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),t++,p}function a(h,f,u,g,_,m){const p=o(h,f,u,g,_,m);u.transmission>0?i.push(p):u.transparent===!0?r.push(p):e.push(p)}function c(h,f,u,g,_,m){const p=o(h,f,u,g,_,m);u.transmission>0?i.unshift(p):u.transparent===!0?r.unshift(p):e.unshift(p)}function l(h,f){e.length>1&&e.sort(h||Mx),i.length>1&&i.sort(f||Gh),r.length>1&&r.sort(f||Gh)}function d(){for(let h=t,f=n.length;h<f;h++){const u=n[h];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:d,sort:l}}function bx(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new Wh,n.set(i,[o])):r>=s.length?(o=new Wh,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Sx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new w,color:new jt};break;case"SpotLight":e={position:new w,direction:new w,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new w,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new w,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new w,halfWidth:new w,halfHeight:new w};break}return n[t.id]=e,e}}}function Ex(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let wx=0;function Tx(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Ax(n){const t=new Sx,e=Ex(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new w);const r=new w,s=new oe,o=new oe;function a(l){let d=0,h=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let u=0,g=0,_=0,m=0,p=0,b=0,M=0,v=0,C=0,A=0,R=0;l.sort(Tx);for(let E=0,y=l.length;E<y;E++){const P=l[E],B=P.color,F=P.intensity,G=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=B.r*F,h+=B.g*F,f+=B.b*F;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],F);R++}else if(P.isDirectionalLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,V=e.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,i.directionalShadow[u]=V,i.directionalShadowMap[u]=j,i.directionalShadowMatrix[u]=P.shadow.matrix,b++}i.directional[u]=X,u++}else if(P.isSpotLight){const X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(B).multiplyScalar(F),X.distance=G,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[_]=X;const $=P.shadow;if(P.map&&(i.spotLightMap[C]=P.map,C++,$.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[_]=$.matrix,P.castShadow){const V=e.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=j,v++}_++}else if(P.isRectAreaLight){const X=t.get(P);X.color.copy(B).multiplyScalar(F),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=X,m++}else if(P.isPointLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const $=P.shadow,V=e.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,V.shadowCameraNear=$.camera.near,V.shadowCameraFar=$.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=P.shadow.matrix,M++}i.point[g]=X,g++}else if(P.isHemisphereLight){const X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(F),X.groundColor.copy(P.groundColor).multiplyScalar(F),i.hemi[p]=X,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const D=i.hash;(D.directionalLength!==u||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==b||D.numPointShadows!==M||D.numSpotShadows!==v||D.numSpotMaps!==C||D.numLightProbes!==R)&&(i.directional.length=u,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=v+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,D.directionalLength=u,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=b,D.numPointShadows=M,D.numSpotShadows=v,D.numSpotMaps=C,D.numLightProbes=R,i.version=wx++)}function c(l,d){let h=0,f=0,u=0,g=0,_=0;const m=d.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){const M=l[p];if(M.isDirectionalLight){const v=i.directional[h];v.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(M.isSpotLight){const v=i.spot[u];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),u++}else if(M.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:i}}function Xh(n){const t=new Ax(n),e=[],i=[];function r(d){l.camera=d,e.length=0,i.length=0}function s(d){e.push(d)}function o(d){i.push(d)}function a(){t.setup(e)}function c(d){t.setupView(e,d)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Rx(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Xh(n),t.set(r,[a])):s>=o.length?(a=new Xh(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const Cx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Px=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Dx(n,t,e){let i=new Yl;const r=new Lt,s=new Lt,o=new Ae,a=new Zm({depthPacking:Yp}),c=new Km,l={},d=e.maxTextureSize,h={[Ai]:on,[on]:Ai,[Je]:Je},f=new qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Lt},radius:{value:4}},vertexShader:Cx,fragmentShader:Px}),u=f.clone();u.defines.HORIZONTAL_PASS=1;const g=new Ne;g.setAttribute("position",new Re(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new st(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mu;let p=this.type;this.render=function(A,R,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),y=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Wi),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const F=p!==vi&&this.type===vi,G=p===vi&&this.type!==vi;for(let j=0,X=A.length;j<X;j++){const $=A[j],V=$.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const it=V.getFrameExtents();if(r.multiply(it),s.copy(V.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/it.x),r.x=s.x*it.x,V.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/it.y),r.y=s.y*it.y,V.mapSize.y=s.y)),V.map===null||F===!0||G===!0){const yt=this.type!==vi?{minFilter:Xn,magFilter:Xn}:{};V.map!==null&&V.map.dispose(),V.map=new Sr(r.x,r.y,yt),V.map.texture.name=$.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const ut=V.getViewportCount();for(let yt=0;yt<ut;yt++){const Bt=V.getViewport(yt);o.set(s.x*Bt.x,s.y*Bt.y,s.x*Bt.z,s.y*Bt.w),B.viewport(o),V.updateMatrices($,yt),i=V.getFrustum(),v(R,D,V.camera,$,this.type)}V.isPointLightShadow!==!0&&this.type===vi&&b(V,D),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,y,P)};function b(A,R){const D=t.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,u.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Sr(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,D,f,_,null),u.uniforms.shadow_pass.value=A.mapPass.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,D,u,_,null)}function M(A,R,D,E){let y=null;const P=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)y=P;else if(y=D.isPointLight===!0?c:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const B=y.uuid,F=R.uuid;let G=l[B];G===void 0&&(G={},l[B]=G);let j=G[F];j===void 0&&(j=y.clone(),G[F]=j,R.addEventListener("dispose",C)),y=j}if(y.visible=R.visible,y.wireframe=R.wireframe,E===vi?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:h[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=n.properties.get(y);B.light=D}return y}function v(A,R,D,E,y){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===vi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const F=t.update(A),G=A.material;if(Array.isArray(G)){const j=F.groups;for(let X=0,$=j.length;X<$;X++){const V=j[X],it=G[V.materialIndex];if(it&&it.visible){const ut=M(A,it,E,y);A.onBeforeShadow(n,A,R,D,F,ut,V),n.renderBufferDirect(D,null,F,ut,A,V),A.onAfterShadow(n,A,R,D,F,ut,V)}}}else if(G.visible){const j=M(A,G,E,y);A.onBeforeShadow(n,A,R,D,F,j,null),n.renderBufferDirect(D,null,F,j,A,null),A.onAfterShadow(n,A,R,D,F,j,null)}}const B=A.children;for(let F=0,G=B.length;F<G;F++)v(B[F],R,D,E,y)}function C(A){A.target.removeEventListener("dispose",C);for(const D in l){const E=l[D],y=A.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const Lx={[Uc]:Oc,[Fc]:kc,[zc]:Hc,[ps]:Bc,[Oc]:Uc,[kc]:Fc,[Hc]:zc,[Bc]:ps};function Ix(n,t){function e(){let I=!1;const dt=new Ae;let Q=null;const gt=new Ae(0,0,0,0);return{setMask:function(tt){Q!==tt&&!I&&(n.colorMask(tt,tt,tt,tt),Q=tt)},setLocked:function(tt){I=tt},setClear:function(tt,Z,_t,zt,pe){pe===!0&&(tt*=zt,Z*=zt,_t*=zt),dt.set(tt,Z,_t,zt),gt.equals(dt)===!1&&(n.clearColor(tt,Z,_t,zt),gt.copy(dt))},reset:function(){I=!1,Q=null,gt.set(-1,0,0,0)}}}function i(){let I=!1,dt=!1,Q=null,gt=null,tt=null;return{setReversed:function(Z){if(dt!==Z){const _t=t.get("EXT_clip_control");Z?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),dt=Z;const zt=tt;tt=null,this.setClear(zt)}},getReversed:function(){return dt},setTest:function(Z){Z?ft(n.DEPTH_TEST):wt(n.DEPTH_TEST)},setMask:function(Z){Q!==Z&&!I&&(n.depthMask(Z),Q=Z)},setFunc:function(Z){if(dt&&(Z=Lx[Z]),gt!==Z){switch(Z){case Uc:n.depthFunc(n.NEVER);break;case Oc:n.depthFunc(n.ALWAYS);break;case Fc:n.depthFunc(n.LESS);break;case ps:n.depthFunc(n.LEQUAL);break;case zc:n.depthFunc(n.EQUAL);break;case Bc:n.depthFunc(n.GEQUAL);break;case kc:n.depthFunc(n.GREATER);break;case Hc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}gt=Z}},setLocked:function(Z){I=Z},setClear:function(Z){tt!==Z&&(dt&&(Z=1-Z),n.clearDepth(Z),tt=Z)},reset:function(){I=!1,Q=null,gt=null,tt=null,dt=!1}}}function r(){let I=!1,dt=null,Q=null,gt=null,tt=null,Z=null,_t=null,zt=null,pe=null;return{setTest:function(se){I||(se?ft(n.STENCIL_TEST):wt(n.STENCIL_TEST))},setMask:function(se){dt!==se&&!I&&(n.stencilMask(se),dt=se)},setFunc:function(se,zn,ui){(Q!==se||gt!==zn||tt!==ui)&&(n.stencilFunc(se,zn,ui),Q=se,gt=zn,tt=ui)},setOp:function(se,zn,ui){(Z!==se||_t!==zn||zt!==ui)&&(n.stencilOp(se,zn,ui),Z=se,_t=zn,zt=ui)},setLocked:function(se){I=se},setClear:function(se){pe!==se&&(n.clearStencil(se),pe=se)},reset:function(){I=!1,dt=null,Q=null,gt=null,tt=null,Z=null,_t=null,zt=null,pe=null}}}const s=new e,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let d={},h={},f=new WeakMap,u=[],g=null,_=!1,m=null,p=null,b=null,M=null,v=null,C=null,A=null,R=new jt(0,0,0),D=0,E=!1,y=null,P=null,B=null,F=null,G=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,$=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(V)[1]),X=$>=1):V.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),X=$>=2);let it=null,ut={};const yt=n.getParameter(n.SCISSOR_BOX),Bt=n.getParameter(n.VIEWPORT),re=new Ae().fromArray(yt),Y=new Ae().fromArray(Bt);function rt(I,dt,Q,gt){const tt=new Uint8Array(4),Z=n.createTexture();n.bindTexture(I,Z),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let _t=0;_t<Q;_t++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(dt,0,n.RGBA,1,1,gt,0,n.RGBA,n.UNSIGNED_BYTE,tt):n.texImage2D(dt+_t,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,tt);return Z}const Et={};Et[n.TEXTURE_2D]=rt(n.TEXTURE_2D,n.TEXTURE_2D,1),Et[n.TEXTURE_CUBE_MAP]=rt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[n.TEXTURE_2D_ARRAY]=rt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Et[n.TEXTURE_3D]=rt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ft(n.DEPTH_TEST),o.setFunc(ps),te(!1),fe(Hd),ft(n.CULL_FACE),L(Wi);function ft(I){d[I]!==!0&&(n.enable(I),d[I]=!0)}function wt(I){d[I]!==!1&&(n.disable(I),d[I]=!1)}function Jt(I,dt){return h[I]!==dt?(n.bindFramebuffer(I,dt),h[I]=dt,I===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=dt),I===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=dt),!0):!1}function Dt(I,dt){let Q=u,gt=!1;if(I){Q=f.get(dt),Q===void 0&&(Q=[],f.set(dt,Q));const tt=I.textures;if(Q.length!==tt.length||Q[0]!==n.COLOR_ATTACHMENT0){for(let Z=0,_t=tt.length;Z<_t;Z++)Q[Z]=n.COLOR_ATTACHMENT0+Z;Q.length=tt.length,gt=!0}}else Q[0]!==n.BACK&&(Q[0]=n.BACK,gt=!0);gt&&n.drawBuffers(Q)}function Me(I){return g!==I?(n.useProgram(I),g=I,!0):!1}const be={[gr]:n.FUNC_ADD,[xp]:n.FUNC_SUBTRACT,[yp]:n.FUNC_REVERSE_SUBTRACT};be[Mp]=n.MIN,be[bp]=n.MAX;const Qt={[Sp]:n.ZERO,[Ep]:n.ONE,[wp]:n.SRC_COLOR,[Ic]:n.SRC_ALPHA,[Dp]:n.SRC_ALPHA_SATURATE,[Cp]:n.DST_COLOR,[Ap]:n.DST_ALPHA,[Tp]:n.ONE_MINUS_SRC_COLOR,[Nc]:n.ONE_MINUS_SRC_ALPHA,[Pp]:n.ONE_MINUS_DST_COLOR,[Rp]:n.ONE_MINUS_DST_ALPHA,[Lp]:n.CONSTANT_COLOR,[Ip]:n.ONE_MINUS_CONSTANT_COLOR,[Np]:n.CONSTANT_ALPHA,[Up]:n.ONE_MINUS_CONSTANT_ALPHA};function L(I,dt,Q,gt,tt,Z,_t,zt,pe,se){if(I===Wi){_===!0&&(wt(n.BLEND),_=!1);return}if(_===!1&&(ft(n.BLEND),_=!0),I!==vp){if(I!==m||se!==E){if((p!==gr||v!==gr)&&(n.blendEquation(n.FUNC_ADD),p=gr,v=gr),se)switch(I){case as:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vd:n.blendFunc(n.ONE,n.ONE);break;case Gd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case as:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vd:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Gd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wd:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}b=null,M=null,C=null,A=null,R.set(0,0,0),D=0,m=I,E=se}return}tt=tt||dt,Z=Z||Q,_t=_t||gt,(dt!==p||tt!==v)&&(n.blendEquationSeparate(be[dt],be[tt]),p=dt,v=tt),(Q!==b||gt!==M||Z!==C||_t!==A)&&(n.blendFuncSeparate(Qt[Q],Qt[gt],Qt[Z],Qt[_t]),b=Q,M=gt,C=Z,A=_t),(zt.equals(R)===!1||pe!==D)&&(n.blendColor(zt.r,zt.g,zt.b,pe),R.copy(zt),D=pe),m=I,E=!1}function tn(I,dt){I.side===Je?wt(n.CULL_FACE):ft(n.CULL_FACE);let Q=I.side===on;dt&&(Q=!Q),te(Q),I.blending===as&&I.transparent===!1?L(Wi):L(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const gt=I.stencilWrite;a.setTest(gt),gt&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),qt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ft(n.SAMPLE_ALPHA_TO_COVERAGE):wt(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(I){y!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),y=I)}function fe(I){I!==gp?(ft(n.CULL_FACE),I!==P&&(I===Hd?n.cullFace(n.BACK):I===_p?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):wt(n.CULL_FACE),P=I}function Mt(I){I!==B&&(X&&n.lineWidth(I),B=I)}function qt(I,dt,Q){I?(ft(n.POLYGON_OFFSET_FILL),(F!==dt||G!==Q)&&(n.polygonOffset(dt,Q),F=dt,G=Q)):wt(n.POLYGON_OFFSET_FILL)}function At(I){I?ft(n.SCISSOR_TEST):wt(n.SCISSOR_TEST)}function Gt(I){I===void 0&&(I=n.TEXTURE0+j-1),it!==I&&(n.activeTexture(I),it=I)}function Oe(I,dt,Q){Q===void 0&&(it===null?Q=n.TEXTURE0+j-1:Q=it);let gt=ut[Q];gt===void 0&&(gt={type:void 0,texture:void 0},ut[Q]=gt),(gt.type!==I||gt.texture!==dt)&&(it!==Q&&(n.activeTexture(Q),it=Q),n.bindTexture(I,dt||Et[I]),gt.type=I,gt.texture=dt)}function T(){const I=ut[it];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{n.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{n.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function bt(){try{n.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ct(){try{n.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(){try{n.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function St(){try{n.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{n.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(I){re.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),re.copy(I))}function Pt(I){Y.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Y.copy(I))}function Ct(I,dt){let Q=l.get(dt);Q===void 0&&(Q=new WeakMap,l.set(dt,Q));let gt=Q.get(I);gt===void 0&&(gt=n.getUniformBlockIndex(dt,I.name),Q.set(I,gt))}function ot(I,dt){const gt=l.get(dt).get(I);c.get(dt)!==gt&&(n.uniformBlockBinding(dt,gt,I.__bindingPointIndex),c.set(dt,gt))}function Ot(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},it=null,ut={},h={},f=new WeakMap,u=[],g=null,_=!1,m=null,p=null,b=null,M=null,v=null,C=null,A=null,R=new jt(0,0,0),D=0,E=!1,y=null,P=null,B=null,F=null,G=null,re.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ft,disable:wt,bindFramebuffer:Jt,drawBuffers:Dt,useProgram:Me,setBlending:L,setMaterial:tn,setFlipSided:te,setCullFace:fe,setLineWidth:Mt,setPolygonOffset:qt,setScissorTest:At,activeTexture:Gt,bindTexture:Oe,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:St,texImage3D:J,updateUBOMapping:Ct,uniformBlockBinding:ot,texStorage2D:ct,texStorage3D:xt,texSubImage2D:q,texSubImage3D:K,compressedTexSubImage2D:W,compressedTexSubImage3D:bt,scissor:pt,viewport:Pt,reset:Ot}}function Nx(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Lt,d=new WeakMap;let h;const f=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return u?new OffscreenCanvas(T,x):sa("canvas")}function _(T,x,z){let q=1;const K=Oe(T);if((K.width>z||K.height>z)&&(q=z/Math.max(K.width,K.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const W=Math.floor(q*K.width),bt=Math.floor(q*K.height);h===void 0&&(h=g(W,bt));const ct=x?g(W,bt):h;return ct.width=W,ct.height=bt,ct.getContext("2d").drawImage(T,0,0,W,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+W+"x"+bt+")."),ct}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(T,x,z,q,K=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let W=x;if(x===n.RED&&(z===n.FLOAT&&(W=n.R32F),z===n.HALF_FLOAT&&(W=n.R16F),z===n.UNSIGNED_BYTE&&(W=n.R8)),x===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(W=n.R8UI),z===n.UNSIGNED_SHORT&&(W=n.R16UI),z===n.UNSIGNED_INT&&(W=n.R32UI),z===n.BYTE&&(W=n.R8I),z===n.SHORT&&(W=n.R16I),z===n.INT&&(W=n.R32I)),x===n.RG&&(z===n.FLOAT&&(W=n.RG32F),z===n.HALF_FLOAT&&(W=n.RG16F),z===n.UNSIGNED_BYTE&&(W=n.RG8)),x===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(W=n.RG8UI),z===n.UNSIGNED_SHORT&&(W=n.RG16UI),z===n.UNSIGNED_INT&&(W=n.RG32UI),z===n.BYTE&&(W=n.RG8I),z===n.SHORT&&(W=n.RG16I),z===n.INT&&(W=n.RG32I)),x===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(W=n.RGB8UI),z===n.UNSIGNED_SHORT&&(W=n.RGB16UI),z===n.UNSIGNED_INT&&(W=n.RGB32UI),z===n.BYTE&&(W=n.RGB8I),z===n.SHORT&&(W=n.RGB16I),z===n.INT&&(W=n.RGB32I)),x===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),z===n.UNSIGNED_INT&&(W=n.RGBA32UI),z===n.BYTE&&(W=n.RGBA8I),z===n.SHORT&&(W=n.RGBA16I),z===n.INT&&(W=n.RGBA32I)),x===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),x===n.RGBA){const bt=K?ia:Zt.getTransfer(q);z===n.FLOAT&&(W=n.RGBA32F),z===n.HALF_FLOAT&&(W=n.RGBA16F),z===n.UNSIGNED_BYTE&&(W=bt===ce?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function v(T,x){let z;return T?x===null||x===Mr||x===Zs?z=n.DEPTH24_STENCIL8:x===bi?z=n.DEPTH32F_STENCIL8:x===$s&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Mr||x===Zs?z=n.DEPTH_COMPONENT24:x===bi?z=n.DEPTH_COMPONENT32F:x===$s&&(z=n.DEPTH_COMPONENT16),z}function C(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Xn&&T.minFilter!==ri?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function A(T){const x=T.target;x.removeEventListener("dispose",A),D(x),x.isVideoTexture&&d.delete(x)}function R(T){const x=T.target;x.removeEventListener("dispose",R),y(x)}function D(T){const x=i.get(T);if(x.__webglInit===void 0)return;const z=T.source,q=f.get(z);if(q){const K=q[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(T),Object.keys(q).length===0&&f.delete(z)}i.remove(T)}function E(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const z=T.source,q=f.get(z);delete q[x.__cacheKey],o.memory.textures--}function y(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(x.__webglFramebuffer[q]))for(let K=0;K<x.__webglFramebuffer[q].length;K++)n.deleteFramebuffer(x.__webglFramebuffer[q][K]);else n.deleteFramebuffer(x.__webglFramebuffer[q]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[q])}else{if(Array.isArray(x.__webglFramebuffer))for(let q=0;q<x.__webglFramebuffer.length;q++)n.deleteFramebuffer(x.__webglFramebuffer[q]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let q=0;q<x.__webglColorRenderbuffer.length;q++)x.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[q]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=T.textures;for(let q=0,K=z.length;q<K;q++){const W=i.get(z[q]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(z[q])}i.remove(T)}let P=0;function B(){P=0}function F(){const T=P;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),P+=1,T}function G(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function j(T,x){const z=i.get(T);if(T.isVideoTexture&&At(T),T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){const q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Et(z,T,x);return}}e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+x)}function X(T,x){const z=i.get(T);if(T.version>0&&z.__version!==T.version){Et(z,T,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+x)}function $(T,x){const z=i.get(T);if(T.version>0&&z.__version!==T.version){Et(z,T,x);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+x)}function V(T,x){const z=i.get(T);if(T.version>0&&z.__version!==T.version){ft(z,T,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+x)}const it={[Wc]:n.REPEAT,[xr]:n.CLAMP_TO_EDGE,[Xc]:n.MIRRORED_REPEAT},ut={[Xn]:n.NEAREST,[Xp]:n.NEAREST_MIPMAP_NEAREST,[go]:n.NEAREST_MIPMAP_LINEAR,[ri]:n.LINEAR,[Wa]:n.LINEAR_MIPMAP_NEAREST,[yr]:n.LINEAR_MIPMAP_LINEAR},yt={[$p]:n.NEVER,[em]:n.ALWAYS,[Zp]:n.LESS,[Ru]:n.LEQUAL,[Kp]:n.EQUAL,[tm]:n.GEQUAL,[Jp]:n.GREATER,[Qp]:n.NOTEQUAL};function Bt(T,x){if(x.type===bi&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===ri||x.magFilter===Wa||x.magFilter===go||x.magFilter===yr||x.minFilter===ri||x.minFilter===Wa||x.minFilter===go||x.minFilter===yr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,it[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,it[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,it[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ut[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ut[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,yt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Xn||x.minFilter!==go&&x.minFilter!==yr||x.type===bi&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function re(T,x){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",A));const q=x.source;let K=f.get(q);K===void 0&&(K={},f.set(q,K));const W=G(x);if(W!==T.__cacheKey){K[W]===void 0&&(K[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),K[W].usedTimes++;const bt=K[T.__cacheKey];bt!==void 0&&(K[T.__cacheKey].usedTimes--,bt.usedTimes===0&&E(x)),T.__cacheKey=W,T.__webglTexture=K[W].texture}return z}function Y(T,x,z){return Math.floor(Math.floor(T/z)/x)}function rt(T,x,z,q){const W=T.updateRanges;if(W.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,z,q,x.data);else{W.sort((J,pt)=>J.start-pt.start);let bt=0;for(let J=1;J<W.length;J++){const pt=W[bt],Pt=W[J],Ct=pt.start+pt.count,ot=Y(Pt.start,x.width,4),Ot=Y(pt.start,x.width,4);Pt.start<=Ct+1&&ot===Ot&&Y(Pt.start+Pt.count-1,x.width,4)===ot?pt.count=Math.max(pt.count,Pt.start+Pt.count-pt.start):(++bt,W[bt]=Pt)}W.length=bt+1;const ct=n.getParameter(n.UNPACK_ROW_LENGTH),xt=n.getParameter(n.UNPACK_SKIP_PIXELS),St=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let J=0,pt=W.length;J<pt;J++){const Pt=W[J],Ct=Math.floor(Pt.start/4),ot=Math.ceil(Pt.count/4),Ot=Ct%x.width,I=Math.floor(Ct/x.width),dt=ot,Q=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ot),n.pixelStorei(n.UNPACK_SKIP_ROWS,I),e.texSubImage2D(n.TEXTURE_2D,0,Ot,I,dt,Q,z,q,x.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ct),n.pixelStorei(n.UNPACK_SKIP_PIXELS,xt),n.pixelStorei(n.UNPACK_SKIP_ROWS,St)}}function Et(T,x,z){let q=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(q=n.TEXTURE_3D);const K=re(T,x),W=x.source;e.bindTexture(q,T.__webglTexture,n.TEXTURE0+z);const bt=i.get(W);if(W.version!==bt.__version||K===!0){e.activeTexture(n.TEXTURE0+z);const ct=Zt.getPrimaries(Zt.workingColorSpace),xt=x.colorSpace===Hi?null:Zt.getPrimaries(x.colorSpace),St=x.colorSpace===Hi||ct===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let J=_(x.image,!1,r.maxTextureSize);J=Gt(x,J);const pt=s.convert(x.format,x.colorSpace),Pt=s.convert(x.type);let Ct=M(x.internalFormat,pt,Pt,x.colorSpace,x.isVideoTexture);Bt(q,x);let ot;const Ot=x.mipmaps,I=x.isVideoTexture!==!0,dt=bt.__version===void 0||K===!0,Q=W.dataReady,gt=C(x,J);if(x.isDepthTexture)Ct=v(x.format===Js,x.type),dt&&(I?e.texStorage2D(n.TEXTURE_2D,1,Ct,J.width,J.height):e.texImage2D(n.TEXTURE_2D,0,Ct,J.width,J.height,0,pt,Pt,null));else if(x.isDataTexture)if(Ot.length>0){I&&dt&&e.texStorage2D(n.TEXTURE_2D,gt,Ct,Ot[0].width,Ot[0].height);for(let tt=0,Z=Ot.length;tt<Z;tt++)ot=Ot[tt],I?Q&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,ot.width,ot.height,pt,Pt,ot.data):e.texImage2D(n.TEXTURE_2D,tt,Ct,ot.width,ot.height,0,pt,Pt,ot.data);x.generateMipmaps=!1}else I?(dt&&e.texStorage2D(n.TEXTURE_2D,gt,Ct,J.width,J.height),Q&&rt(x,J,pt,Pt)):e.texImage2D(n.TEXTURE_2D,0,Ct,J.width,J.height,0,pt,Pt,J.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){I&&dt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Ct,Ot[0].width,Ot[0].height,J.depth);for(let tt=0,Z=Ot.length;tt<Z;tt++)if(ot=Ot[tt],x.format!==Vn)if(pt!==null)if(I){if(Q)if(x.layerUpdates.size>0){const _t=Mh(ot.width,ot.height,x.format,x.type);for(const zt of x.layerUpdates){const pe=ot.data.subarray(zt*_t/ot.data.BYTES_PER_ELEMENT,(zt+1)*_t/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,zt,ot.width,ot.height,1,pt,pe)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,ot.width,ot.height,J.depth,pt,ot.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,Ct,ot.width,ot.height,J.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?Q&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,ot.width,ot.height,J.depth,pt,Pt,ot.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,Ct,ot.width,ot.height,J.depth,0,pt,Pt,ot.data)}else{I&&dt&&e.texStorage2D(n.TEXTURE_2D,gt,Ct,Ot[0].width,Ot[0].height);for(let tt=0,Z=Ot.length;tt<Z;tt++)ot=Ot[tt],x.format!==Vn?pt!==null?I?Q&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,ot.width,ot.height,pt,ot.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,Ct,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?Q&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,ot.width,ot.height,pt,Pt,ot.data):e.texImage2D(n.TEXTURE_2D,tt,Ct,ot.width,ot.height,0,pt,Pt,ot.data)}else if(x.isDataArrayTexture)if(I){if(dt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Ct,J.width,J.height,J.depth),Q)if(x.layerUpdates.size>0){const tt=Mh(J.width,J.height,x.format,x.type);for(const Z of x.layerUpdates){const _t=J.data.subarray(Z*tt/J.data.BYTES_PER_ELEMENT,(Z+1)*tt/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,J.width,J.height,1,pt,Pt,_t)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,pt,Pt,J.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ct,J.width,J.height,J.depth,0,pt,Pt,J.data);else if(x.isData3DTexture)I?(dt&&e.texStorage3D(n.TEXTURE_3D,gt,Ct,J.width,J.height,J.depth),Q&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,pt,Pt,J.data)):e.texImage3D(n.TEXTURE_3D,0,Ct,J.width,J.height,J.depth,0,pt,Pt,J.data);else if(x.isFramebufferTexture){if(dt)if(I)e.texStorage2D(n.TEXTURE_2D,gt,Ct,J.width,J.height);else{let tt=J.width,Z=J.height;for(let _t=0;_t<gt;_t++)e.texImage2D(n.TEXTURE_2D,_t,Ct,tt,Z,0,pt,Pt,null),tt>>=1,Z>>=1}}else if(Ot.length>0){if(I&&dt){const tt=Oe(Ot[0]);e.texStorage2D(n.TEXTURE_2D,gt,Ct,tt.width,tt.height)}for(let tt=0,Z=Ot.length;tt<Z;tt++)ot=Ot[tt],I?Q&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,pt,Pt,ot):e.texImage2D(n.TEXTURE_2D,tt,Ct,pt,Pt,ot);x.generateMipmaps=!1}else if(I){if(dt){const tt=Oe(J);e.texStorage2D(n.TEXTURE_2D,gt,Ct,tt.width,tt.height)}Q&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,pt,Pt,J)}else e.texImage2D(n.TEXTURE_2D,0,Ct,pt,Pt,J);m(x)&&p(q),bt.__version=W.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function ft(T,x,z){if(x.image.length!==6)return;const q=re(T,x),K=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+z);const W=i.get(K);if(K.version!==W.__version||q===!0){e.activeTexture(n.TEXTURE0+z);const bt=Zt.getPrimaries(Zt.workingColorSpace),ct=x.colorSpace===Hi?null:Zt.getPrimaries(x.colorSpace),xt=x.colorSpace===Hi||bt===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const St=x.isCompressedTexture||x.image[0].isCompressedTexture,J=x.image[0]&&x.image[0].isDataTexture,pt=[];for(let Z=0;Z<6;Z++)!St&&!J?pt[Z]=_(x.image[Z],!0,r.maxCubemapSize):pt[Z]=J?x.image[Z].image:x.image[Z],pt[Z]=Gt(x,pt[Z]);const Pt=pt[0],Ct=s.convert(x.format,x.colorSpace),ot=s.convert(x.type),Ot=M(x.internalFormat,Ct,ot,x.colorSpace),I=x.isVideoTexture!==!0,dt=W.__version===void 0||q===!0,Q=K.dataReady;let gt=C(x,Pt);Bt(n.TEXTURE_CUBE_MAP,x);let tt;if(St){I&&dt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Ot,Pt.width,Pt.height);for(let Z=0;Z<6;Z++){tt=pt[Z].mipmaps;for(let _t=0;_t<tt.length;_t++){const zt=tt[_t];x.format!==Vn?Ct!==null?I?Q&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,0,0,zt.width,zt.height,Ct,zt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,Ot,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,0,0,zt.width,zt.height,Ct,ot,zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,Ot,zt.width,zt.height,0,Ct,ot,zt.data)}}}else{if(tt=x.mipmaps,I&&dt){tt.length>0&&gt++;const Z=Oe(pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Ot,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(J){I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,pt[Z].width,pt[Z].height,Ct,ot,pt[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ot,pt[Z].width,pt[Z].height,0,Ct,ot,pt[Z].data);for(let _t=0;_t<tt.length;_t++){const pe=tt[_t].image[Z].image;I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,0,0,pe.width,pe.height,Ct,ot,pe.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,Ot,pe.width,pe.height,0,Ct,ot,pe.data)}}else{I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ct,ot,pt[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ot,Ct,ot,pt[Z]);for(let _t=0;_t<tt.length;_t++){const zt=tt[_t];I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,0,0,Ct,ot,zt.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,Ot,Ct,ot,zt.image[Z])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),W.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function wt(T,x,z,q,K,W){const bt=s.convert(z.format,z.colorSpace),ct=s.convert(z.type),xt=M(z.internalFormat,bt,ct,z.colorSpace),St=i.get(x),J=i.get(z);if(J.__renderTarget=x,!St.__hasExternalTextures){const pt=Math.max(1,x.width>>W),Pt=Math.max(1,x.height>>W);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,W,xt,pt,Pt,x.depth,0,bt,ct,null):e.texImage2D(K,W,xt,pt,Pt,0,bt,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),qt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,K,J.__webglTexture,0,Mt(x)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,K,J.__webglTexture,W),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Jt(T,x,z){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const q=x.depthTexture,K=q&&q.isDepthTexture?q.type:null,W=v(x.stencilBuffer,K),bt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=Mt(x);qt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,W,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,W,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,W,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,bt,n.RENDERBUFFER,T)}else{const q=x.textures;for(let K=0;K<q.length;K++){const W=q[K],bt=s.convert(W.format,W.colorSpace),ct=s.convert(W.type),xt=M(W.internalFormat,bt,ct,W.colorSpace),St=Mt(x);z&&qt(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,St,xt,x.width,x.height):qt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,St,xt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,xt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Dt(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(x.depthTexture);q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),j(x.depthTexture,0);const K=q.__webglTexture,W=Mt(x);if(x.depthTexture.format===Ks)qt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(x.depthTexture.format===Js)qt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Me(T){const x=i.get(T),z=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const q=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),q){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,q.removeEventListener("dispose",K)};q.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=q}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const q=T.texture.mipmaps;q&&q.length>0?Dt(x.__webglFramebuffer[0],T):Dt(x.__webglFramebuffer,T)}else if(z){x.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[q]),x.__webglDepthbuffer[q]===void 0)x.__webglDepthbuffer[q]=n.createRenderbuffer(),Jt(x.__webglDepthbuffer[q],T,!1);else{const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,W)}}else{const q=T.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Jt(x.__webglDepthbuffer,T,!1);else{const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,W)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function be(T,x,z){const q=i.get(T);x!==void 0&&wt(q.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Me(T)}function Qt(T){const x=T.texture,z=i.get(T),q=i.get(x);T.addEventListener("dispose",R);const K=T.textures,W=T.isWebGLCubeRenderTarget===!0,bt=K.length>1;if(bt||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=x.version,o.memory.textures++),W){z.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[ct]=[];for(let xt=0;xt<x.mipmaps.length;xt++)z.__webglFramebuffer[ct][xt]=n.createFramebuffer()}else z.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let ct=0;ct<x.mipmaps.length;ct++)z.__webglFramebuffer[ct]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(bt)for(let ct=0,xt=K.length;ct<xt;ct++){const St=i.get(K[ct]);St.__webglTexture===void 0&&(St.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&qt(T)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ct=0;ct<K.length;ct++){const xt=K[ct];z.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[ct]);const St=s.convert(xt.format,xt.colorSpace),J=s.convert(xt.type),pt=M(xt.internalFormat,St,J,xt.colorSpace,T.isXRRenderTarget===!0),Pt=Mt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt,pt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,z.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Jt(z.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Bt(n.TEXTURE_CUBE_MAP,x);for(let ct=0;ct<6;ct++)if(x.mipmaps&&x.mipmaps.length>0)for(let xt=0;xt<x.mipmaps.length;xt++)wt(z.__webglFramebuffer[ct][xt],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,xt);else wt(z.__webglFramebuffer[ct],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(x)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ct=0,xt=K.length;ct<xt;ct++){const St=K[ct],J=i.get(St);e.bindTexture(n.TEXTURE_2D,J.__webglTexture),Bt(n.TEXTURE_2D,St),wt(z.__webglFramebuffer,T,St,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,0),m(St)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,q.__webglTexture),Bt(ct,x),x.mipmaps&&x.mipmaps.length>0)for(let xt=0;xt<x.mipmaps.length;xt++)wt(z.__webglFramebuffer[xt],T,x,n.COLOR_ATTACHMENT0,ct,xt);else wt(z.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,ct,0);m(x)&&p(ct),e.unbindTexture()}T.depthBuffer&&Me(T)}function L(T){const x=T.textures;for(let z=0,q=x.length;z<q;z++){const K=x[z];if(m(K)){const W=b(T),bt=i.get(K).__webglTexture;e.bindTexture(W,bt),p(W),e.unbindTexture()}}}const tn=[],te=[];function fe(T){if(T.samples>0){if(qt(T)===!1){const x=T.textures,z=T.width,q=T.height;let K=n.COLOR_BUFFER_BIT;const W=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,bt=i.get(T),ct=x.length>1;if(ct)for(let St=0;St<x.length;St++)e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer);const xt=T.texture.mipmaps;xt&&xt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let St=0;St<x.length;St++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,bt.__webglColorRenderbuffer[St]);const J=i.get(x[St]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,z,q,0,0,z,q,K,n.NEAREST),c===!0&&(tn.length=0,te.length=0,tn.push(n.COLOR_ATTACHMENT0+St),T.depthBuffer&&T.resolveDepthBuffer===!1&&(tn.push(W),te.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,te)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,tn))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let St=0;St<x.length;St++){e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,bt.__webglColorRenderbuffer[St]);const J=i.get(x[St]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,J,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Mt(T){return Math.min(r.maxSamples,T.samples)}function qt(T){const x=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function At(T){const x=o.render.frame;d.get(T)!==x&&(d.set(T,x),T.update())}function Gt(T,x){const z=T.colorSpace,q=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==_s&&z!==Hi&&(Zt.getTransfer(z)===ce?(q!==Vn||K!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function Oe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=$,this.setTextureCube=V,this.rebindTextures=be,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=fe,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=qt}function Ux(n,t){function e(i,r=Hi){let s;const o=Zt.getTransfer(r);if(i===oi)return n.UNSIGNED_BYTE;if(i===Bl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===kl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===xu)return n.BYTE;if(i===yu)return n.SHORT;if(i===$s)return n.UNSIGNED_SHORT;if(i===zl)return n.INT;if(i===Mr)return n.UNSIGNED_INT;if(i===bi)return n.FLOAT;if(i===oo)return n.HALF_FLOAT;if(i===bu)return n.ALPHA;if(i===Su)return n.RGB;if(i===Vn)return n.RGBA;if(i===Ks)return n.DEPTH_COMPONENT;if(i===Js)return n.DEPTH_STENCIL;if(i===Eu)return n.RED;if(i===Hl)return n.RED_INTEGER;if(i===wu)return n.RG;if(i===Vl)return n.RG_INTEGER;if(i===Gl)return n.RGBA_INTEGER;if(i===Yo||i===qo||i===$o||i===Zo)if(o===ce)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Yo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===qo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$o)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Yo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===qo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$o)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Zo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jc||i===Yc||i===qc||i===$c)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===jc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$c)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Zc||i===Kc||i===Jc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Zc||i===Kc)return o===ce?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Jc)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qc||i===tl||i===el||i===nl||i===il||i===rl||i===sl||i===ol||i===al||i===cl||i===ll||i===dl||i===hl||i===ul)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Qc)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===tl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===el)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===nl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===il)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===rl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ol)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===al)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===cl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ll)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===dl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ul)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ko||i===fl||i===pl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Ko)return o===ce?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===pl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Tu||i===ml||i===gl||i===_l)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ko)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ml)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===gl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_l)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const Ox=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class zx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new un,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new qi({vertexShader:Ox,fragmentShader:Fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new st(new ao(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Bx extends Ir{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,d=null,h=null,f=null,u=null,g=null;const _=new zx,m=e.getContextAttributes();let p=null,b=null;const M=[],v=[],C=new Lt;let A=null;const R=new bn;R.viewport=new Ae;const D=new bn;D.viewport=new Ae;const E=[R,D],y=new rg;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let rt=M[Y];return rt===void 0&&(rt=new hc,M[Y]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Y){let rt=M[Y];return rt===void 0&&(rt=new hc,M[Y]=rt),rt.getGripSpace()},this.getHand=function(Y){let rt=M[Y];return rt===void 0&&(rt=new hc,M[Y]=rt),rt.getHandSpace()};function F(Y){const rt=v.indexOf(Y.inputSource);if(rt===-1)return;const Et=M[rt];Et!==void 0&&(Et.update(Y.inputSource,Y.frame,l||o),Et.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",j);for(let Y=0;Y<M.length;Y++){const rt=v[Y];rt!==null&&(v[Y]=null,M[Y].disconnect(rt))}P=null,B=null,_.reset(),t.setRenderTarget(p),u=null,f=null,h=null,r=null,b=null,re.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",G),r.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(C),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Et=null,ft=null,wt=null;m.depth&&(wt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Et=m.stencil?Js:Ks,ft=m.stencil?Zs:Mr);const Jt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:s};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(Jt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new Sr(f.textureWidth,f.textureHeight,{format:Vn,type:oi,depthTexture:new Fu(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,Et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,e,Et),r.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),b=new Sr(u.framebufferWidth,u.framebufferHeight,{format:Vn,type:oi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),re.setContext(r),re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(Y){for(let rt=0;rt<Y.removed.length;rt++){const Et=Y.removed[rt],ft=v.indexOf(Et);ft>=0&&(v[ft]=null,M[ft].disconnect(Et))}for(let rt=0;rt<Y.added.length;rt++){const Et=Y.added[rt];let ft=v.indexOf(Et);if(ft===-1){for(let Jt=0;Jt<M.length;Jt++)if(Jt>=v.length){v.push(Et),ft=Jt;break}else if(v[Jt]===null){v[Jt]=Et,ft=Jt;break}if(ft===-1)break}const wt=M[ft];wt&&wt.connect(Et)}}const X=new w,$=new w;function V(Y,rt,Et){X.setFromMatrixPosition(rt.matrixWorld),$.setFromMatrixPosition(Et.matrixWorld);const ft=X.distanceTo($),wt=rt.projectionMatrix.elements,Jt=Et.projectionMatrix.elements,Dt=wt[14]/(wt[10]-1),Me=wt[14]/(wt[10]+1),be=(wt[9]+1)/wt[5],Qt=(wt[9]-1)/wt[5],L=(wt[8]-1)/wt[0],tn=(Jt[8]+1)/Jt[0],te=Dt*L,fe=Dt*tn,Mt=ft/(-L+tn),qt=Mt*-L;if(rt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(qt),Y.translateZ(Mt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),wt[10]===-1)Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const At=Dt+Mt,Gt=Me+Mt,Oe=te-qt,T=fe+(ft-qt),x=be*Me/Gt*At,z=Qt*Me/Gt*At;Y.projectionMatrix.makePerspective(Oe,T,x,z,At,Gt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function it(Y,rt){rt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(rt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let rt=Y.near,Et=Y.far;_.texture!==null&&(_.depthNear>0&&(rt=_.depthNear),_.depthFar>0&&(Et=_.depthFar)),y.near=D.near=R.near=rt,y.far=D.far=R.far=Et,(P!==y.near||B!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,B=y.far),R.layers.mask=Y.layers.mask|2,D.layers.mask=Y.layers.mask|4,y.layers.mask=R.layers.mask|D.layers.mask;const ft=Y.parent,wt=y.cameras;it(y,ft);for(let Jt=0;Jt<wt.length;Jt++)it(wt[Jt],ft);wt.length===2?V(y,R,D):y.projectionMatrix.copy(R.projectionMatrix),ut(Y,y,ft)};function ut(Y,rt,Et){Et===null?Y.matrix.copy(rt.matrixWorld):(Y.matrix.copy(Et.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(rt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=vs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&u===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let yt=null;function Bt(Y,rt){if(d=rt.getViewerPose(l||o),g=rt,d!==null){const Et=d.views;u!==null&&(t.setRenderTargetFramebuffer(b,u.framebuffer),t.setRenderTarget(b));let ft=!1;Et.length!==y.cameras.length&&(y.cameras.length=0,ft=!0);for(let Dt=0;Dt<Et.length;Dt++){const Me=Et[Dt];let be=null;if(u!==null)be=u.getViewport(Me);else{const L=h.getViewSubImage(f,Me);be=L.viewport,Dt===0&&(t.setRenderTargetTextures(b,L.colorTexture,L.depthStencilTexture),t.setRenderTarget(b))}let Qt=E[Dt];Qt===void 0&&(Qt=new bn,Qt.layers.enable(Dt),Qt.viewport=new Ae,E[Dt]=Qt),Qt.matrix.fromArray(Me.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(Me.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(be.x,be.y,be.width,be.height),Dt===0&&(y.matrix.copy(Qt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ft===!0&&y.cameras.push(Qt)}const wt=r.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const Dt=h.getDepthInformation(Et[0]);Dt&&Dt.isValid&&Dt.texture&&_.init(t,Dt,r.renderState)}}for(let Et=0;Et<M.length;Et++){const ft=v[Et],wt=M[Et];ft!==null&&wt!==void 0&&wt.update(ft,rt,l||o)}yt&&yt(Y,rt),rt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:rt}),g=null}const re=new Vu;re.setAnimationLoop(Bt),this.setAnimationLoop=function(Y){yt=Y},this.dispose=function(){}}}const ur=new Yn,kx=new oe;function Hx(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Nu(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),d(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&u(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===on&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===on&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),M=b.envMap,v=b.envMapRotation;M&&(m.envMap.value=M,ur.copy(v),ur.x*=-1,ur.y*=-1,ur.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ur.y*=-1,ur.z*=-1),m.envMapRotation.value.setFromMatrix4(kx.makeRotationFromEuler(ur)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function u(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===on&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Vx(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,M){const v=M.program;i.uniformBlockBinding(b,v)}function l(b,M){let v=r[b.id];v===void 0&&(g(b),v=d(b),r[b.id]=v,b.addEventListener("dispose",m));const C=M.program;i.updateUBOMapping(b,C);const A=t.render.frame;s[b.id]!==A&&(f(b),s[b.id]=A)}function d(b){const M=h();b.__bindingPointIndex=M;const v=n.createBuffer(),C=b.__size,A=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,C,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,v),v}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const M=r[b.id],v=b.uniforms,C=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let A=0,R=v.length;A<R;A++){const D=Array.isArray(v[A])?v[A]:[v[A]];for(let E=0,y=D.length;E<y;E++){const P=D[E];if(u(P,A,E,C)===!0){const B=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let G=0;for(let j=0;j<F.length;j++){const X=F[j],$=_(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,B+G,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,G),G+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(b,M,v,C){const A=b.value,R=M+"_"+v;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{const D=C[R];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return C[R]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function g(b){const M=b.uniforms;let v=0;const C=16;for(let R=0,D=M.length;R<D;R++){const E=Array.isArray(M[R])?M[R]:[M[R]];for(let y=0,P=E.length;y<P;y++){const B=E[y],F=Array.isArray(B.value)?B.value:[B.value];for(let G=0,j=F.length;G<j;G++){const X=F[G],$=_(X),V=v%C,it=V%$.boundary,ut=V+it;v+=it,ut!==0&&C-ut<$.storage&&(v+=C-ut),B.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=$.storage}}}const A=v%C;return A>0&&(v+=C-A),b.__size=v,b.__cache={},this}function _(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function m(b){const M=b.target;M.removeEventListener("dispose",m);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const b in r)n.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class Gx{constructor(t={}){const{canvas:e=vm(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let C=!1;this._outputColorSpace=Dn;let A=0,R=0,D=null,E=-1,y=null;const P=new Ae,B=new Ae;let F=null;const G=new jt(0);let j=0,X=e.width,$=e.height,V=1,it=null,ut=null;const yt=new Ae(0,0,X,$),Bt=new Ae(0,0,X,$);let re=!1;const Y=new Yl;let rt=!1,Et=!1;const ft=new oe,wt=new oe,Jt=new w,Dt=new Ae,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let be=!1;function Qt(){return D===null?V:1}let L=i;function tn(S,U){return e.getContext(S,U)}try{const S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Fl}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",tt,!1),e.addEventListener("webglcontextcreationerror",Z,!1),L===null){const U="webgl2";if(L=tn(U,S),L===null)throw tn(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let te,fe,Mt,qt,At,Gt,Oe,T,x,z,q,K,W,bt,ct,xt,St,J,pt,Pt,Ct,ot,Ot,I;function dt(){te=new Q0(L),te.init(),ot=new Ux(L,te),fe=new j0(L,te,t,ot),Mt=new Ix(L,te),fe.reverseDepthBuffer&&f&&Mt.buffers.depth.setReversed(!0),qt=new nv(L),At=new yx,Gt=new Nx(L,te,Mt,At,fe,ot,qt),Oe=new q0(v),T=new J0(v),x=new cg(L),Ot=new W0(L,x),z=new tv(L,x,qt,Ot),q=new rv(L,z,x,qt),pt=new iv(L,fe,Gt),xt=new Y0(At),K=new xx(v,Oe,T,te,fe,Ot,xt),W=new Hx(v,At),bt=new bx,ct=new Rx(te),J=new G0(v,Oe,T,Mt,q,u,c),St=new Dx(v,q,fe),I=new Vx(L,qt,fe,Mt),Pt=new X0(L,te,qt),Ct=new ev(L,te,qt),qt.programs=K.programs,v.capabilities=fe,v.extensions=te,v.properties=At,v.renderLists=bt,v.shadowMap=St,v.state=Mt,v.info=qt}dt();const Q=new Bx(v,L);this.xr=Q,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=te.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=te.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(X,$,!1))},this.getSize=function(S){return S.set(X,$)},this.setSize=function(S,U,k=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=S,$=U,e.width=Math.floor(S*V),e.height=Math.floor(U*V),k===!0&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(X*V,$*V).floor()},this.setDrawingBufferSize=function(S,U,k){X=S,$=U,V=k,e.width=Math.floor(S*k),e.height=Math.floor(U*k),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(yt)},this.setViewport=function(S,U,k,H){S.isVector4?yt.set(S.x,S.y,S.z,S.w):yt.set(S,U,k,H),Mt.viewport(P.copy(yt).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(Bt)},this.setScissor=function(S,U,k,H){S.isVector4?Bt.set(S.x,S.y,S.z,S.w):Bt.set(S,U,k,H),Mt.scissor(B.copy(Bt).multiplyScalar(V).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(S){Mt.setScissorTest(re=S)},this.setOpaqueSort=function(S){it=S},this.setTransparentSort=function(S){ut=S},this.getClearColor=function(S){return S.copy(J.getClearColor())},this.setClearColor=function(){J.setClearColor(...arguments)},this.getClearAlpha=function(){return J.getClearAlpha()},this.setClearAlpha=function(){J.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,k=!0){let H=0;if(S){let O=!1;if(D!==null){const et=D.texture.format;O=et===Gl||et===Vl||et===Hl}if(O){const et=D.texture.type,ht=et===oi||et===Mr||et===$s||et===Zs||et===Bl||et===kl,vt=J.getClearColor(),mt=J.getClearAlpha(),It=vt.r,Ut=vt.g,Tt=vt.b;ht?(g[0]=It,g[1]=Ut,g[2]=Tt,g[3]=mt,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=It,_[1]=Ut,_[2]=Tt,_[3]=mt,L.clearBufferiv(L.COLOR,0,_))}else H|=L.COLOR_BUFFER_BIT}U&&(H|=L.DEPTH_BUFFER_BIT),k&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",tt,!1),e.removeEventListener("webglcontextcreationerror",Z,!1),J.dispose(),bt.dispose(),ct.dispose(),At.dispose(),Oe.dispose(),T.dispose(),q.dispose(),Ot.dispose(),I.dispose(),K.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",Nd),Q.removeEventListener("sessionend",Ud),sr.stop()};function gt(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function tt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const S=qt.autoReset,U=St.enabled,k=St.autoUpdate,H=St.needsUpdate,O=St.type;dt(),qt.autoReset=S,St.enabled=U,St.autoUpdate=k,St.needsUpdate=H,St.type=O}function Z(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function _t(S){const U=S.target;U.removeEventListener("dispose",_t),zt(U)}function zt(S){pe(S),At.remove(S)}function pe(S){const U=At.get(S).programs;U!==void 0&&(U.forEach(function(k){K.releaseProgram(k)}),S.isShaderMaterial&&K.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,k,H,O,et){U===null&&(U=Me);const ht=O.isMesh&&O.matrixWorld.determinant()<0,vt=dp(S,U,k,H,O);Mt.setMaterial(H,ht);let mt=k.index,It=1;if(H.wireframe===!0){if(mt=z.getWireframeAttribute(k),mt===void 0)return;It=2}const Ut=k.drawRange,Tt=k.attributes.position;let Yt=Ut.start*It,ae=(Ut.start+Ut.count)*It;et!==null&&(Yt=Math.max(Yt,et.start*It),ae=Math.min(ae,(et.start+et.count)*It)),mt!==null?(Yt=Math.max(Yt,0),ae=Math.min(ae,mt.count)):Tt!=null&&(Yt=Math.max(Yt,0),ae=Math.min(ae,Tt.count));const Te=ae-Yt;if(Te<0||Te===1/0)return;Ot.setup(O,H,vt,k,mt);let me,he=Pt;if(mt!==null&&(me=x.get(mt),he=Ct,he.setIndex(me)),O.isMesh)H.wireframe===!0?(Mt.setLineWidth(H.wireframeLinewidth*Qt()),he.setMode(L.LINES)):he.setMode(L.TRIANGLES);else if(O.isLine){let Rt=H.linewidth;Rt===void 0&&(Rt=1),Mt.setLineWidth(Rt*Qt()),O.isLineSegments?he.setMode(L.LINES):O.isLineLoop?he.setMode(L.LINE_LOOP):he.setMode(L.LINE_STRIP)}else O.isPoints?he.setMode(L.POINTS):O.isSprite&&he.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ls("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),he.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))he.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Rt=O._multiDrawStarts,Se=O._multiDrawCounts,$t=O._multiDrawCount,vn=mt?x.get(mt).bytesPerElement:1,kr=At.get(H).currentProgram.getUniforms();for(let xn=0;xn<$t;xn++)kr.setValue(L,"_gl_DrawID",xn),he.render(Rt[xn]/vn,Se[xn])}else if(O.isInstancedMesh)he.renderInstances(Yt,Te,O.count);else if(k.isInstancedBufferGeometry){const Rt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Se=Math.min(k.instanceCount,Rt);he.renderInstances(Yt,Te,Se)}else he.render(Yt,Te)};function se(S,U,k){S.transparent===!0&&S.side===Je&&S.forceSinglePass===!1?(S.side=on,S.needsUpdate=!0,mo(S,U,k),S.side=Ai,S.needsUpdate=!0,mo(S,U,k),S.side=Je):mo(S,U,k)}this.compile=function(S,U,k=null){k===null&&(k=S),p=ct.get(k),p.init(U),M.push(p),k.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),S!==k&&S.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const H=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const et=O.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const vt=et[ht];se(vt,k,O),H.add(vt)}else se(et,k,O),H.add(et)}),p=M.pop(),H},this.compileAsync=function(S,U,k=null){const H=this.compile(S,U,k);return new Promise(O=>{function et(){if(H.forEach(function(ht){At.get(ht).currentProgram.isReady()&&H.delete(ht)}),H.size===0){O(S);return}setTimeout(et,10)}te.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let zn=null;function ui(S){zn&&zn(S)}function Nd(){sr.stop()}function Ud(){sr.start()}const sr=new Vu;sr.setAnimationLoop(ui),typeof self<"u"&&sr.setContext(self),this.setAnimationLoop=function(S){zn=S,Q.setAnimationLoop(S),S===null?sr.stop():sr.start()},Q.addEventListener("sessionstart",Nd),Q.addEventListener("sessionend",Ud),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(U),U=Q.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,U,D),p=ct.get(S,M.length),p.init(U),M.push(p),wt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(wt),Et=this.localClippingEnabled,rt=xt.init(this.clippingPlanes,Et),m=bt.get(S,b.length),m.init(),b.push(m),Q.enabled===!0&&Q.isPresenting===!0){const et=v.xr.getDepthSensingMesh();et!==null&&Va(et,U,-1/0,v.sortObjects)}Va(S,U,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(it,ut),be=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,be&&J.addToRenderList(m,S),this.info.render.frame++,rt===!0&&xt.beginShadows();const k=p.state.shadowsArray;St.render(k,S,U),rt===!0&&xt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,O=m.transmissive;if(p.setupLights(),U.isArrayCamera){const et=U.cameras;if(O.length>0)for(let ht=0,vt=et.length;ht<vt;ht++){const mt=et[ht];Fd(H,O,S,mt)}be&&J.render(S);for(let ht=0,vt=et.length;ht<vt;ht++){const mt=et[ht];Od(m,S,mt,mt.viewport)}}else O.length>0&&Fd(H,O,S,U),be&&J.render(S),Od(m,S,U);D!==null&&R===0&&(Gt.updateMultisampleRenderTarget(D),Gt.updateRenderTargetMipmap(D)),S.isScene===!0&&S.onAfterRender(v,S,U),Ot.resetDefaultState(),E=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],rt===!0&&xt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Va(S,U,k,H){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){H&&Dt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(wt);const ht=q.update(S),vt=S.material;vt.visible&&m.push(S,ht,vt,k,Dt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){const ht=q.update(S),vt=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Dt.copy(S.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Dt.copy(ht.boundingSphere.center)),Dt.applyMatrix4(S.matrixWorld).applyMatrix4(wt)),Array.isArray(vt)){const mt=ht.groups;for(let It=0,Ut=mt.length;It<Ut;It++){const Tt=mt[It],Yt=vt[Tt.materialIndex];Yt&&Yt.visible&&m.push(S,ht,Yt,k,Dt.z,Tt)}}else vt.visible&&m.push(S,ht,vt,k,Dt.z,null)}}const et=S.children;for(let ht=0,vt=et.length;ht<vt;ht++)Va(et[ht],U,k,H)}function Od(S,U,k,H){const O=S.opaque,et=S.transmissive,ht=S.transparent;p.setupLightsView(k),rt===!0&&xt.setGlobalState(v.clippingPlanes,k),H&&Mt.viewport(P.copy(H)),O.length>0&&po(O,U,k),et.length>0&&po(et,U,k),ht.length>0&&po(ht,U,k),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Fd(S,U,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Sr(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?oo:oi,minFilter:yr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const et=p.state.transmissionRenderTarget[H.id],ht=H.viewport||P;et.setSize(ht.z*v.transmissionResolutionScale,ht.w*v.transmissionResolutionScale);const vt=v.getRenderTarget(),mt=v.getActiveCubeFace(),It=v.getActiveMipmapLevel();v.setRenderTarget(et),v.getClearColor(G),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),be&&J.render(k);const Ut=v.toneMapping;v.toneMapping=Xi;const Tt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),rt===!0&&xt.setGlobalState(v.clippingPlanes,H),po(S,k,H),Gt.updateMultisampleRenderTarget(et),Gt.updateRenderTargetMipmap(et),te.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let ae=0,Te=U.length;ae<Te;ae++){const me=U[ae],he=me.object,Rt=me.geometry,Se=me.material,$t=me.group;if(Se.side===Je&&he.layers.test(H.layers)){const vn=Se.side;Se.side=on,Se.needsUpdate=!0,zd(he,k,H,Rt,Se,$t),Se.side=vn,Se.needsUpdate=!0,Yt=!0}}Yt===!0&&(Gt.updateMultisampleRenderTarget(et),Gt.updateRenderTargetMipmap(et))}v.setRenderTarget(vt,mt,It),v.setClearColor(G,j),Tt!==void 0&&(H.viewport=Tt),v.toneMapping=Ut}function po(S,U,k){const H=U.isScene===!0?U.overrideMaterial:null;for(let O=0,et=S.length;O<et;O++){const ht=S[O],vt=ht.object,mt=ht.geometry,It=ht.group;let Ut=ht.material;Ut.allowOverride===!0&&H!==null&&(Ut=H),vt.layers.test(k.layers)&&zd(vt,U,k,mt,Ut,It)}}function zd(S,U,k,H,O,et){S.onBeforeRender(v,U,k,H,O,et),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(v,U,k,H,S,et),O.transparent===!0&&O.side===Je&&O.forceSinglePass===!1?(O.side=on,O.needsUpdate=!0,v.renderBufferDirect(k,U,H,O,S,et),O.side=Ai,O.needsUpdate=!0,v.renderBufferDirect(k,U,H,O,S,et),O.side=Je):v.renderBufferDirect(k,U,H,O,S,et),S.onAfterRender(v,U,k,H,O,et)}function mo(S,U,k){U.isScene!==!0&&(U=Me);const H=At.get(S),O=p.state.lights,et=p.state.shadowsArray,ht=O.state.version,vt=K.getParameters(S,O.state,et,U,k),mt=K.getProgramCacheKey(vt);let It=H.programs;H.environment=S.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(S.isMeshStandardMaterial?T:Oe).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,It===void 0&&(S.addEventListener("dispose",_t),It=new Map,H.programs=It);let Ut=It.get(mt);if(Ut!==void 0){if(H.currentProgram===Ut&&H.lightsStateVersion===ht)return kd(S,vt),Ut}else vt.uniforms=K.getUniforms(S),S.onBeforeCompile(vt,v),Ut=K.acquireProgram(vt,mt),It.set(mt,Ut),H.uniforms=vt.uniforms;const Tt=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Tt.clippingPlanes=xt.uniform),kd(S,vt),H.needsLights=up(S),H.lightsStateVersion=ht,H.needsLights&&(Tt.ambientLightColor.value=O.state.ambient,Tt.lightProbe.value=O.state.probe,Tt.directionalLights.value=O.state.directional,Tt.directionalLightShadows.value=O.state.directionalShadow,Tt.spotLights.value=O.state.spot,Tt.spotLightShadows.value=O.state.spotShadow,Tt.rectAreaLights.value=O.state.rectArea,Tt.ltc_1.value=O.state.rectAreaLTC1,Tt.ltc_2.value=O.state.rectAreaLTC2,Tt.pointLights.value=O.state.point,Tt.pointLightShadows.value=O.state.pointShadow,Tt.hemisphereLights.value=O.state.hemi,Tt.directionalShadowMap.value=O.state.directionalShadowMap,Tt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Tt.spotShadowMap.value=O.state.spotShadowMap,Tt.spotLightMatrix.value=O.state.spotLightMatrix,Tt.spotLightMap.value=O.state.spotLightMap,Tt.pointShadowMap.value=O.state.pointShadowMap,Tt.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=Ut,H.uniformsList=null,Ut}function Bd(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Jo.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function kd(S,U){const k=At.get(S);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function dp(S,U,k,H,O){U.isScene!==!0&&(U=Me),Gt.resetTextureUnits();const et=U.fog,ht=H.isMeshStandardMaterial?U.environment:null,vt=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:_s,mt=(H.isMeshStandardMaterial?T:Oe).get(H.envMap||ht),It=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ut=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Tt=!!k.morphAttributes.position,Yt=!!k.morphAttributes.normal,ae=!!k.morphAttributes.color;let Te=Xi;H.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Te=v.toneMapping);const me=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,he=me!==void 0?me.length:0,Rt=At.get(H),Se=p.state.lights;if(rt===!0&&(Et===!0||S!==y)){const en=S===y&&H.id===E;xt.setState(H,S,en)}let $t=!1;H.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==Se.state.version||Rt.outputColorSpace!==vt||O.isBatchedMesh&&Rt.batching===!1||!O.isBatchedMesh&&Rt.batching===!0||O.isBatchedMesh&&Rt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Rt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Rt.instancing===!1||!O.isInstancedMesh&&Rt.instancing===!0||O.isSkinnedMesh&&Rt.skinning===!1||!O.isSkinnedMesh&&Rt.skinning===!0||O.isInstancedMesh&&Rt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Rt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Rt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Rt.instancingMorph===!1&&O.morphTexture!==null||Rt.envMap!==mt||H.fog===!0&&Rt.fog!==et||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==xt.numPlanes||Rt.numIntersection!==xt.numIntersection)||Rt.vertexAlphas!==It||Rt.vertexTangents!==Ut||Rt.morphTargets!==Tt||Rt.morphNormals!==Yt||Rt.morphColors!==ae||Rt.toneMapping!==Te||Rt.morphTargetsCount!==he)&&($t=!0):($t=!0,Rt.__version=H.version);let vn=Rt.currentProgram;$t===!0&&(vn=mo(H,U,O));let kr=!1,xn=!1,Is=!1;const ge=vn.getUniforms(),Rn=Rt.uniforms;if(Mt.useProgram(vn.program)&&(kr=!0,xn=!0,Is=!0),H.id!==E&&(E=H.id,xn=!0),kr||y!==S){Mt.buffers.depth.getReversed()?(ft.copy(S.projectionMatrix),ym(ft),Mm(ft),ge.setValue(L,"projectionMatrix",ft)):ge.setValue(L,"projectionMatrix",S.projectionMatrix),ge.setValue(L,"viewMatrix",S.matrixWorldInverse);const cn=ge.map.cameraPosition;cn!==void 0&&cn.setValue(L,Jt.setFromMatrixPosition(S.matrixWorld)),fe.logarithmicDepthBuffer&&ge.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ge.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,xn=!0,Is=!0)}if(O.isSkinnedMesh){ge.setOptional(L,O,"bindMatrix"),ge.setOptional(L,O,"bindMatrixInverse");const en=O.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),ge.setValue(L,"boneTexture",en.boneTexture,Gt))}O.isBatchedMesh&&(ge.setOptional(L,O,"batchingTexture"),ge.setValue(L,"batchingTexture",O._matricesTexture,Gt),ge.setOptional(L,O,"batchingIdTexture"),ge.setValue(L,"batchingIdTexture",O._indirectTexture,Gt),ge.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&ge.setValue(L,"batchingColorTexture",O._colorsTexture,Gt));const Cn=k.morphAttributes;if((Cn.position!==void 0||Cn.normal!==void 0||Cn.color!==void 0)&&pt.update(O,k,vn),(xn||Rt.receiveShadow!==O.receiveShadow)&&(Rt.receiveShadow=O.receiveShadow,ge.setValue(L,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Rn.envMap.value=mt,Rn.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(Rn.envMapIntensity.value=U.environmentIntensity),xn&&(ge.setValue(L,"toneMappingExposure",v.toneMappingExposure),Rt.needsLights&&hp(Rn,Is),et&&H.fog===!0&&W.refreshFogUniforms(Rn,et),W.refreshMaterialUniforms(Rn,H,V,$,p.state.transmissionRenderTarget[S.id]),Jo.upload(L,Bd(Rt),Rn,Gt)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Jo.upload(L,Bd(Rt),Rn,Gt),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ge.setValue(L,"center",O.center),ge.setValue(L,"modelViewMatrix",O.modelViewMatrix),ge.setValue(L,"normalMatrix",O.normalMatrix),ge.setValue(L,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const en=H.uniformsGroups;for(let cn=0,Ga=en.length;cn<Ga;cn++){const or=en[cn];I.update(or,vn),I.bind(or,vn)}}return vn}function hp(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function up(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(S,U,k){const H=At.get(S);H.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),At.get(S.texture).__webglTexture=U,At.get(S.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:k,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){const k=At.get(S);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0};const fp=L.createFramebuffer();this.setRenderTarget=function(S,U=0,k=0){D=S,A=U,R=k;let H=!0,O=null,et=!1,ht=!1;if(S){const mt=At.get(S);if(mt.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(mt.__webglFramebuffer===void 0)Gt.setupRenderTarget(S);else if(mt.__hasExternalTextures)Gt.rebindTextures(S,At.get(S.texture).__webglTexture,At.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Tt=S.depthTexture;if(mt.__boundDepthTexture!==Tt){if(Tt!==null&&At.has(Tt)&&(S.width!==Tt.image.width||S.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Gt.setupDepthRenderbuffer(S)}}const It=S.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(ht=!0);const Ut=At.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ut[U])?O=Ut[U][k]:O=Ut[U],et=!0):S.samples>0&&Gt.useMultisampledRTT(S)===!1?O=At.get(S).__webglMultisampledFramebuffer:Array.isArray(Ut)?O=Ut[k]:O=Ut,P.copy(S.viewport),B.copy(S.scissor),F=S.scissorTest}else P.copy(yt).multiplyScalar(V).floor(),B.copy(Bt).multiplyScalar(V).floor(),F=re;if(k!==0&&(O=fp),Mt.bindFramebuffer(L.FRAMEBUFFER,O)&&H&&Mt.drawBuffers(S,O),Mt.viewport(P),Mt.scissor(B),Mt.setScissorTest(F),et){const mt=At.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,mt.__webglTexture,k)}else if(ht){const mt=At.get(S.texture),It=U;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.__webglTexture,k,It)}else if(S!==null&&k!==0){const mt=At.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,mt.__webglTexture,k)}E=-1},this.readRenderTargetPixels=function(S,U,k,H,O,et,ht,vt=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=At.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ht!==void 0&&(mt=mt[ht]),mt){Mt.bindFramebuffer(L.FRAMEBUFFER,mt);try{const It=S.textures[vt],Ut=It.format,Tt=It.type;if(!fe.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!fe.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-H&&k>=0&&k<=S.height-O&&(S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+vt),L.readPixels(U,k,H,O,ot.convert(Ut),ot.convert(Tt),et))}finally{const It=D!==null?At.get(D).__webglFramebuffer:null;Mt.bindFramebuffer(L.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(S,U,k,H,O,et,ht,vt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=At.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ht!==void 0&&(mt=mt[ht]),mt)if(U>=0&&U<=S.width-H&&k>=0&&k<=S.height-O){Mt.bindFramebuffer(L.FRAMEBUFFER,mt);const It=S.textures[vt],Ut=It.format,Tt=It.type;if(!fe.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!fe.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Yt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Yt),L.bufferData(L.PIXEL_PACK_BUFFER,et.byteLength,L.STREAM_READ),S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+vt),L.readPixels(U,k,H,O,ot.convert(Ut),ot.convert(Tt),0);const ae=D!==null?At.get(D).__webglFramebuffer:null;Mt.bindFramebuffer(L.FRAMEBUFFER,ae);const Te=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await xm(L,Te,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Yt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,et),L.deleteBuffer(Yt),L.deleteSync(Te),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,k=0){const H=Math.pow(2,-k),O=Math.floor(S.image.width*H),et=Math.floor(S.image.height*H),ht=U!==null?U.x:0,vt=U!==null?U.y:0;Gt.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,k,0,0,ht,vt,O,et),Mt.unbindTexture()};const pp=L.createFramebuffer(),mp=L.createFramebuffer();this.copyTextureToTexture=function(S,U,k=null,H=null,O=0,et=null){et===null&&(O!==0?(ls("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=O,O=0):et=0);let ht,vt,mt,It,Ut,Tt,Yt,ae,Te;const me=S.isCompressedTexture?S.mipmaps[et]:S.image;if(k!==null)ht=k.max.x-k.min.x,vt=k.max.y-k.min.y,mt=k.isBox3?k.max.z-k.min.z:1,It=k.min.x,Ut=k.min.y,Tt=k.isBox3?k.min.z:0;else{const Cn=Math.pow(2,-O);ht=Math.floor(me.width*Cn),vt=Math.floor(me.height*Cn),S.isDataArrayTexture?mt=me.depth:S.isData3DTexture?mt=Math.floor(me.depth*Cn):mt=1,It=0,Ut=0,Tt=0}H!==null?(Yt=H.x,ae=H.y,Te=H.z):(Yt=0,ae=0,Te=0);const he=ot.convert(U.format),Rt=ot.convert(U.type);let Se;U.isData3DTexture?(Gt.setTexture3D(U,0),Se=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Gt.setTexture2DArray(U,0),Se=L.TEXTURE_2D_ARRAY):(Gt.setTexture2D(U,0),Se=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const $t=L.getParameter(L.UNPACK_ROW_LENGTH),vn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),kr=L.getParameter(L.UNPACK_SKIP_PIXELS),xn=L.getParameter(L.UNPACK_SKIP_ROWS),Is=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,me.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,me.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,It),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ut),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Tt);const ge=S.isDataArrayTexture||S.isData3DTexture,Rn=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){const Cn=At.get(S),en=At.get(U),cn=At.get(Cn.__renderTarget),Ga=At.get(en.__renderTarget);Mt.bindFramebuffer(L.READ_FRAMEBUFFER,cn.__webglFramebuffer),Mt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ga.__webglFramebuffer);for(let or=0;or<mt;or++)ge&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,At.get(S).__webglTexture,O,Tt+or),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,At.get(U).__webglTexture,et,Te+or)),L.blitFramebuffer(It,Ut,ht,vt,Yt,ae,ht,vt,L.DEPTH_BUFFER_BIT,L.NEAREST);Mt.bindFramebuffer(L.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||S.isRenderTargetTexture||At.has(S)){const Cn=At.get(S),en=At.get(U);Mt.bindFramebuffer(L.READ_FRAMEBUFFER,pp),Mt.bindFramebuffer(L.DRAW_FRAMEBUFFER,mp);for(let cn=0;cn<mt;cn++)ge?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Cn.__webglTexture,O,Tt+cn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Cn.__webglTexture,O),Rn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,en.__webglTexture,et,Te+cn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,en.__webglTexture,et),O!==0?L.blitFramebuffer(It,Ut,ht,vt,Yt,ae,ht,vt,L.COLOR_BUFFER_BIT,L.NEAREST):Rn?L.copyTexSubImage3D(Se,et,Yt,ae,Te+cn,It,Ut,ht,vt):L.copyTexSubImage2D(Se,et,Yt,ae,It,Ut,ht,vt);Mt.bindFramebuffer(L.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Rn?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(Se,et,Yt,ae,Te,ht,vt,mt,he,Rt,me.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Se,et,Yt,ae,Te,ht,vt,mt,he,me.data):L.texSubImage3D(Se,et,Yt,ae,Te,ht,vt,mt,he,Rt,me):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,et,Yt,ae,ht,vt,he,Rt,me.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,et,Yt,ae,me.width,me.height,he,me.data):L.texSubImage2D(L.TEXTURE_2D,et,Yt,ae,ht,vt,he,Rt,me);L.pixelStorei(L.UNPACK_ROW_LENGTH,$t),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,vn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,kr),L.pixelStorei(L.UNPACK_SKIP_ROWS,xn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Is),et===0&&U.generateMipmaps&&L.generateMipmap(Se),Mt.unbindTexture()},this.copyTextureToTexture3D=function(S,U,k=null,H=null,O=0){return ls('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,U,k,H,O)},this.initRenderTarget=function(S){At.get(S).__webglFramebuffer===void 0&&Gt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Gt.setTextureCube(S,0):S.isData3DTexture?Gt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Gt.setTexture2DArray(S,0):Gt.setTexture2D(S,0),Mt.unbindTexture()},this.resetState=function(){A=0,R=0,D=null,Mt.reset(),Ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}}const jh={type:"change"},Ql={type:"start"},Yu={type:"end"},Go=new ba,Yh=new ti,Wx=Math.cos(70*br.DEG2RAD),Fe=new w,ln=2*Math.PI,le={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},bc=1e-6;class Xx extends Hu{constructor(t,e=null){super(t,e),this.state=le.NONE,this.target=new w,this.cursor=new w,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gi.ROTATE,MIDDLE:Gi.DOLLY,RIGHT:Gi.PAN},this.touches={ONE:is.ROTATE,TWO:is.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new w,this._lastQuaternion=new ze,this._lastTargetPosition=new w,this._quat=new ze().setFromUnitVectors(t.up,new w(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new yh,this._sphericalDelta=new yh,this._scale=1,this._panOffset=new w,this._rotateStart=new Lt,this._rotateEnd=new Lt,this._rotateDelta=new Lt,this._panStart=new Lt,this._panEnd=new Lt,this._panDelta=new Lt,this._dollyStart=new Lt,this._dollyEnd=new Lt,this._dollyDelta=new Lt,this._dollyDirection=new w,this._mouse=new Lt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Yx.bind(this),this._onPointerDown=jx.bind(this),this._onPointerUp=qx.bind(this),this._onContextMenu=ey.bind(this),this._onMouseWheel=Kx.bind(this),this._onKeyDown=Jx.bind(this),this._onTouchStart=Qx.bind(this),this._onTouchMove=ty.bind(this),this._onMouseDown=$x.bind(this),this._onMouseMove=Zx.bind(this),this._interceptControlDown=ny.bind(this),this._interceptControlUp=iy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jh),this.update(),this.state=le.NONE}update(t=null){const e=this.object.position;Fe.copy(e).sub(this.target),Fe.applyQuaternion(this._quat),this._spherical.setFromVector3(Fe),this.autoRotate&&this.state===le.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=ln:i>Math.PI&&(i-=ln),r<-Math.PI?r+=ln:r>Math.PI&&(r-=ln),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Fe.setFromSpherical(this._spherical),Fe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Fe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Fe.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const a=new w(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new w(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Fe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Go.origin.copy(this.object.position),Go.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Go.direction))<Wx?this.object.lookAt(this.target):(Yh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Go.intersectPlane(Yh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>bc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>bc||this._lastTargetPosition.distanceToSquared(this.target)>bc?(this.dispatchEvent(jh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ln/60*this.autoRotateSpeed*t:ln/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Fe.setFromMatrixColumn(e,0),Fe.multiplyScalar(-t),this._panOffset.add(Fe)}_panUp(t,e){this.screenSpacePanning===!0?Fe.setFromMatrixColumn(e,1):(Fe.setFromMatrixColumn(e,0),Fe.crossVectors(this.object.up,Fe)),Fe.multiplyScalar(t),this._panOffset.add(Fe)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Fe.copy(r).sub(this.target);let s=Fe.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,s=e-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Lt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function jx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Yx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function qx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yu),this.state=le.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function $x(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Gi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=le.DOLLY;break;case Gi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=le.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=le.ROTATE}break;case Gi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=le.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=le.PAN}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(Ql)}function Zx(n){switch(this.state){case le.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case le.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case le.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Kx(n){this.enabled===!1||this.enableZoom===!1||this.state!==le.NONE||(n.preventDefault(),this.dispatchEvent(Ql),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Yu))}function Jx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Qx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case is.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=le.TOUCH_ROTATE;break;case is.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=le.TOUCH_PAN;break;default:this.state=le.NONE}break;case 2:switch(this.touches.TWO){case is.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=le.TOUCH_DOLLY_PAN;break;case is.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=le.TOUCH_DOLLY_ROTATE;break;default:this.state=le.NONE}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(Ql)}function ty(n){switch(this._trackPointer(n),this.state){case le.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case le.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case le.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case le.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=le.NONE}}function ey(n){this.enabled!==!1&&n.preventDefault()}function ny(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function iy(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const fr=new ku,Ke=new w,Bi=new w,_e=new ze,qh={X:new w(1,0,0),Y:new w(0,1,0),Z:new w(0,0,1)},Sc={type:"change"},$h={type:"mouseDown",mode:null},Zh={type:"mouseUp",mode:null},Kh={type:"objectChange"};class ry extends Hu{constructor(t,e=null){super(void 0,e);const i=new dy(this);this._root=i;const r=new hy;this._gizmo=r,i.add(r);const s=new uy;this._plane=s,i.add(s);const o=this;function a(M,v){let C=v;Object.defineProperty(o,M,{get:function(){return C!==void 0?C:v},set:function(A){C!==A&&(C=A,s[M]=A,r[M]=A,o.dispatchEvent({type:M+"-changed",value:A}),o.dispatchEvent(Sc))}}),o[M]=v,s[M]=v,r[M]=v}a("camera",t),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0),a("minX",-1/0),a("maxX",1/0),a("minY",-1/0),a("maxY",1/0),a("minZ",-1/0),a("maxZ",1/0);const c=new w,l=new w,d=new ze,h=new ze,f=new w,u=new ze,g=new w,_=new w,m=new w,p=0,b=new w;a("worldPosition",c),a("worldPositionStart",l),a("worldQuaternion",d),a("worldQuaternionStart",h),a("cameraPosition",f),a("cameraQuaternion",u),a("pointStart",g),a("pointEnd",_),a("rotationAxis",m),a("rotationAngle",p),a("eye",b),this._offset=new w,this._startNorm=new w,this._endNorm=new w,this._cameraScale=new w,this._parentPosition=new w,this._parentQuaternion=new ze,this._parentQuaternionInv=new ze,this._parentScale=new w,this._worldScaleStart=new w,this._worldQuaternionInv=new ze,this._worldScale=new w,this._positionStart=new w,this._quaternionStart=new ze,this._scaleStart=new w,this._getPointer=sy.bind(this),this._onPointerDown=ay.bind(this),this._onPointerHover=oy.bind(this),this._onPointerMove=cy.bind(this),this._onPointerUp=ly.bind(this),e!==null&&this.connect(e)}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(t){if(this.object===void 0||this.dragging===!0)return;t!==null&&fr.setFromCamera(t,this.camera);const e=Ec(this._gizmo.picker[this.mode],fr);e?this.axis=e.object.name:this.axis=null}pointerDown(t){if(!(this.object===void 0||this.dragging===!0||t!=null&&t.button!==0)&&this.axis!==null){t!==null&&fr.setFromCamera(t,this.camera);const e=Ec(this._plane,fr,!0);e&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(e.point).sub(this.worldPositionStart)),this.dragging=!0,$h.mode=this.mode,this.dispatchEvent($h)}}pointerMove(t){const e=this.axis,i=this.mode,r=this.object;let s=this.space;if(i==="scale"?s="local":(e==="E"||e==="XYZE"||e==="XYZ")&&(s="world"),r===void 0||e===null||this.dragging===!1||t!==null&&t.button!==-1)return;t!==null&&fr.setFromCamera(t,this.camera);const o=Ec(this._plane,fr,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),i==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&e!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),e.indexOf("X")===-1&&(this._offset.x=0),e.indexOf("Y")===-1&&(this._offset.y=0),e.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&e!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(r.position.applyQuaternion(_e.copy(this._quaternionStart).invert()),e.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),s==="world"&&(r.parent&&r.position.add(Ke.setFromMatrixPosition(r.parent.matrixWorld)),e.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(Ke.setFromMatrixPosition(r.parent.matrixWorld)))),r.position.x=Math.max(this.minX,Math.min(this.maxX,r.position.x)),r.position.y=Math.max(this.minY,Math.min(this.maxY,r.position.y)),r.position.z=Math.max(this.minZ,Math.min(this.maxZ,r.position.z));else if(i==="scale"){if(e.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),Bi.set(a,a,a)}else Ke.copy(this.pointStart),Bi.copy(this.pointEnd),Ke.applyQuaternion(this._worldQuaternionInv),Bi.applyQuaternion(this._worldQuaternionInv),Bi.divide(Ke),e.search("X")===-1&&(Bi.x=1),e.search("Y")===-1&&(Bi.y=1),e.search("Z")===-1&&(Bi.z=1);r.scale.copy(this._scaleStart).multiply(Bi),this.scaleSnap&&(e.search("X")!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Y")!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Z")!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(i==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(Ke.setFromMatrixPosition(this.camera.matrixWorld));let c=!1;e==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Ke.copy(this.rotationAxis).cross(this.eye))*a):(e==="X"||e==="Y"||e==="Z")&&(this.rotationAxis.copy(qh[e]),Ke.copy(qh[e]),s==="local"&&Ke.applyQuaternion(this.worldQuaternion),Ke.cross(this.eye),Ke.length()===0?c=!0:this.rotationAngle=this._offset.dot(Ke.normalize())*a),(e==="E"||c)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&e!=="E"&&e!=="XYZE"?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(_e.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(_e.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Sc),this.dispatchEvent(Kh)}}pointerUp(t){t!==null&&t.button!==0||(this.dragging&&this.axis!==null&&(Zh.mode=this.mode,this.dispatchEvent(Zh)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(t){return this.object=t,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Sc),this.dispatchEvent(Kh),this.pointStart.copy(this.pointEnd))}getRaycaster(){return fr}getMode(){return this.mode}setMode(t){this.mode=t}setTranslationSnap(t){this.translationSnap=t}setRotationSnap(t){this.rotationSnap=t}setScaleSnap(t){this.scaleSnap=t}setSize(t){this.size=t}setSpace(t){this.space=t}setColors(t,e,i,r){const s=this._gizmo.materialLib;s.xAxis.color.set(t),s.yAxis.color.set(e),s.zAxis.color.set(i),s.active.color.set(r),s.xAxisTransparent.color.set(t),s.yAxisTransparent.color.set(e),s.zAxisTransparent.color.set(i),s.activeTransparent.color.set(r),s.xAxis._color&&s.xAxis._color.set(t),s.yAxis._color&&s.yAxis._color.set(e),s.zAxis._color&&s.zAxis._color.set(i),s.active._color&&s.active._color.set(r),s.xAxisTransparent._color&&s.xAxisTransparent._color.set(t),s.yAxisTransparent._color&&s.yAxisTransparent._color.set(e),s.zAxisTransparent._color&&s.zAxisTransparent._color.set(i),s.activeTransparent._color&&s.activeTransparent._color.set(r)}}function sy(n){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:n.button};{const t=this.domElement.getBoundingClientRect();return{x:(n.clientX-t.left)/t.width*2-1,y:-(n.clientY-t.top)/t.height*2+1,button:n.button}}}function oy(n){if(this.enabled)switch(n.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(n));break}}function ay(n){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(n)),this.pointerDown(this._getPointer(n)))}function cy(n){this.enabled&&this.pointerMove(this._getPointer(n))}function ly(n){this.enabled&&(this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(n)))}function Ec(n,t,e){const i=t.intersectObject(n,!0);for(let r=0;r<i.length;r++)if(i[r].object.visible||e)return i[r];return!1}const Wo=new Yn,ue=new w(0,1,0),Jh=new w(0,0,0),Qh=new oe,Xo=new ze,Qo=new ze,Kn=new w,tu=new oe,Gs=new w(1,0,0),mr=new w(0,1,0),Ws=new w(0,0,1),jo=new w,Bs=new w,ks=new w;class dy extends xe{constructor(t){super(),this.isTransformControlsRoot=!0,this.controls=t,this.visible=!1}updateMatrixWorld(t){const e=this.controls;e.object!==void 0&&(e.object.updateMatrixWorld(),e.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):e.object.parent.matrixWorld.decompose(e._parentPosition,e._parentQuaternion,e._parentScale),e.object.matrixWorld.decompose(e.worldPosition,e.worldQuaternion,e._worldScale),e._parentQuaternionInv.copy(e._parentQuaternion).invert(),e._worldQuaternionInv.copy(e.worldQuaternion).invert()),e.camera.updateMatrixWorld(),e.camera.matrixWorld.decompose(e.cameraPosition,e.cameraQuaternion,e._cameraScale),e.camera.isOrthographicCamera?e.camera.getWorldDirection(e.eye).negate():e.eye.copy(e.cameraPosition).sub(e.worldPosition).normalize(),super.updateMatrixWorld(t)}dispose(){this.traverse(function(t){t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})}}class hy extends xe{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const t=new ai({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),e=new Nr({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),i=t.clone();i.opacity=.15;const r=e.clone();r.opacity=.5;const s=t.clone();s.color.setHex(16711680);const o=t.clone();o.color.setHex(65280);const a=t.clone();a.color.setHex(255);const c=t.clone();c.color.setHex(16711680),c.opacity=.5;const l=t.clone();l.color.setHex(65280),l.opacity=.5;const d=t.clone();d.color.setHex(255),d.opacity=.5;const h=t.clone();h.opacity=.25;const f=t.clone();f.color.setHex(16776960),f.opacity=.25;const u=t.clone();u.color.setHex(16776960);const g=t.clone();g.color.setHex(7895160),this.materialLib={xAxis:s,yAxis:o,zAxis:a,active:u,xAxisTransparent:c,yAxisTransparent:l,zAxisTransparent:d,activeTransparent:f};const _=new je(0,.04,.1,12);_.translate(0,.05,0);const m=new Ee(.08,.08,.08);m.translate(0,.04,0);const p=new Ne;p.setAttribute("position",new de([0,0,0,1,0,0],3));const b=new je(.0075,.0075,.5,3);b.translate(0,.25,0);function M(j,X){const $=new _r(j,.0075,3,64,X*Math.PI*2);return $.rotateY(Math.PI/2),$.rotateX(Math.PI/2),$}function v(){const j=new Ne;return j.setAttribute("position",new de([0,0,0,1,1,1],3)),j}const C={X:[[new st(_,s),[.5,0,0],[0,0,-Math.PI/2]],[new st(_,s),[-.5,0,0],[0,0,Math.PI/2]],[new st(b,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new st(_,o),[0,.5,0]],[new st(_,o),[0,-.5,0],[Math.PI,0,0]],[new st(b,o)]],Z:[[new st(_,a),[0,0,.5],[Math.PI/2,0,0]],[new st(_,a),[0,0,-.5],[-Math.PI/2,0,0]],[new st(b,a),null,[Math.PI/2,0,0]]],XYZ:[[new st(new rs(.1,0),h),[0,0,0]]],XY:[[new st(new Ee(.15,.15,.01),d),[.15,.15,0]]],YZ:[[new st(new Ee(.15,.15,.01),c),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new st(new Ee(.15,.15,.01),l),[.15,0,.15],[-Math.PI/2,0,0]]]},A={X:[[new st(new je(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new st(new je(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new st(new je(.2,0,.6,4),i),[0,.3,0]],[new st(new je(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new st(new je(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new st(new je(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new st(new rs(.2,0),i)]],XY:[[new st(new Ee(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new st(new Ee(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new st(new Ee(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]]},R={START:[[new st(new rs(.01,2),r),null,null,null,"helper"]],END:[[new st(new rs(.01,2),r),null,null,null,"helper"]],DELTA:[[new xi(v(),r),null,null,null,"helper"]],X:[[new xi(p,r),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new xi(p,r),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new xi(p,r),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},D={XYZE:[[new st(M(.5,1),g),null,[0,Math.PI/2,0]]],X:[[new st(M(.5,.5),s)]],Y:[[new st(M(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new st(M(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new st(M(.75,1),f),null,[0,Math.PI/2,0]]]},E={AXIS:[[new xi(p,r),[-1e3,0,0],null,[1e6,1,1],"helper"]]},y={XYZE:[[new st(new Ur(.25,10,8),i)]],X:[[new st(new _r(.5,.1,4,24),i),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new st(new _r(.5,.1,4,24),i),[0,0,0],[Math.PI/2,0,0]]],Z:[[new st(new _r(.5,.1,4,24),i),[0,0,0],[0,0,-Math.PI/2]]],E:[[new st(new _r(.75,.1,2,24),i)]]},P={X:[[new st(m,s),[.5,0,0],[0,0,-Math.PI/2]],[new st(b,s),[0,0,0],[0,0,-Math.PI/2]],[new st(m,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new st(m,o),[0,.5,0]],[new st(b,o)],[new st(m,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new st(m,a),[0,0,.5],[Math.PI/2,0,0]],[new st(b,a),[0,0,0],[Math.PI/2,0,0]],[new st(m,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new st(new Ee(.15,.15,.01),d),[.15,.15,0]]],YZ:[[new st(new Ee(.15,.15,.01),c),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new st(new Ee(.15,.15,.01),l),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new st(new Ee(.1,.1,.1),h)]]},B={X:[[new st(new je(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new st(new je(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new st(new je(.2,0,.6,4),i),[0,.3,0]],[new st(new je(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new st(new je(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new st(new je(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new st(new Ee(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new st(new Ee(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new st(new Ee(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new st(new Ee(.2,.2,.2),i),[0,0,0]]]},F={X:[[new xi(p,r),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new xi(p,r),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new xi(p,r),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function G(j){const X=new xe;for(const $ in j)for(let V=j[$].length;V--;){const it=j[$][V][0].clone(),ut=j[$][V][1],yt=j[$][V][2],Bt=j[$][V][3],re=j[$][V][4];it.name=$,it.tag=re,ut&&it.position.set(ut[0],ut[1],ut[2]),yt&&it.rotation.set(yt[0],yt[1],yt[2]),Bt&&it.scale.set(Bt[0],Bt[1],Bt[2]),it.updateMatrix();const Y=it.geometry.clone();Y.applyMatrix4(it.matrix),it.geometry=Y,it.renderOrder=1/0,it.position.set(0,0,0),it.rotation.set(0,0,0),it.scale.set(1,1,1),X.add(it)}return X}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=G(C)),this.add(this.gizmo.rotate=G(D)),this.add(this.gizmo.scale=G(P)),this.add(this.picker.translate=G(A)),this.add(this.picker.rotate=G(y)),this.add(this.picker.scale=G(B)),this.add(this.helper.translate=G(R)),this.add(this.helper.rotate=G(E)),this.add(this.helper.scale=G(F)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(t){const i=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:Qo;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let r=[];r=r.concat(this.picker[this.mode].children),r=r.concat(this.gizmo[this.mode].children),r=r.concat(this.helper[this.mode].children);for(let s=0;s<r.length;s++){const o=r[s];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(_e.setFromEuler(Wo.set(0,0,0)),o.quaternion.copy(i).multiply(_e),Math.abs(ue.copy(Gs).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(_e.setFromEuler(Wo.set(0,0,Math.PI/2)),o.quaternion.copy(i).multiply(_e),Math.abs(ue.copy(mr).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(_e.setFromEuler(Wo.set(0,Math.PI/2,0)),o.quaternion.copy(i).multiply(_e),Math.abs(ue.copy(Ws).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(_e.setFromEuler(Wo.set(0,Math.PI/2,0)),ue.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(Qh.lookAt(Jh,ue,mr)),o.quaternion.multiply(_e),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),Ke.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Ke.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(Ke),o.visible=this.dragging):(o.quaternion.copy(i),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(i),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(ue.copy(Gs).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(ue.copy(mr).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(ue.copy(Ws).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(ue.copy(Ws).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(ue.copy(Gs).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(ue.copy(mr).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(Xo.copy(i),ue.copy(this.eye).applyQuaternion(_e.copy(i).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(Qh.lookAt(this.eye,Jh,mr)),o.name==="X"&&(_e.setFromAxisAngle(Gs,Math.atan2(-ue.y,ue.z)),_e.multiplyQuaternions(Xo,_e),o.quaternion.copy(_e)),o.name==="Y"&&(_e.setFromAxisAngle(mr,Math.atan2(ue.x,ue.z)),_e.multiplyQuaternions(Xo,_e),o.quaternion.copy(_e)),o.name==="Z"&&(_e.setFromAxisAngle(Ws,Math.atan2(ue.y,ue.x)),_e.multiplyQuaternions(Xo,_e),o.quaternion.copy(_e))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis?(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1):this.axis.split("").some(function(c){return o.name===c})&&(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1))}super.updateMatrixWorld(t)}}class uy extends st{constructor(){super(new ao(1e5,1e5,2,2),new ai({visible:!1,wireframe:!0,side:Je,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(t){let e=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(e="local"),jo.copy(Gs).applyQuaternion(e==="local"?this.worldQuaternion:Qo),Bs.copy(mr).applyQuaternion(e==="local"?this.worldQuaternion:Qo),ks.copy(Ws).applyQuaternion(e==="local"?this.worldQuaternion:Qo),ue.copy(Bs),this.mode){case"translate":case"scale":switch(this.axis){case"X":ue.copy(this.eye).cross(jo),Kn.copy(jo).cross(ue);break;case"Y":ue.copy(this.eye).cross(Bs),Kn.copy(Bs).cross(ue);break;case"Z":ue.copy(this.eye).cross(ks),Kn.copy(ks).cross(ue);break;case"XY":Kn.copy(ks);break;case"YZ":Kn.copy(jo);break;case"XZ":ue.copy(ks),Kn.copy(Bs);break;case"XYZ":case"E":Kn.set(0,0,0);break}break;default:Kn.set(0,0,0)}Kn.length()===0?this.quaternion.copy(this.cameraQuaternion):(tu.lookAt(Ke.set(0,0,0),Kn,ue),this.quaternion.setFromRotationMatrix(tu)),super.updateMatrixWorld(t)}}const fy=new Map([["3,1,5,2,2,3,3,4",{stride:36,uv:16,normal:24}],["3,1,5,2,3,4,0,0",{stride:28,normal:16}],["3,1,5,2,0,0,0,0",{stride:16}]]);function py(n){const t=n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength);if(t.length>64*1024*1024)throw new Error("Mesh exceeds 64 MiB limit");const e=new DataView(t.buffer,t.byteOffset,t.byteLength);let i=0;const r=h=>{if(!Number.isSafeInteger(h)||h<0||i+h>t.length)throw new Error(`Truncated mesh at ${i}, need ${h} bytes`)},s=()=>{r(4);const h=e.getUint32(i,!0);return i+=4,h},o=h=>{r(h);const f=new TextDecoder().decode(t.subarray(i,i+h));return i+=h,f.replace(/ $/,"")},a=h=>{if(!Number.isFinite(h)||Math.abs(h)>1e9)throw new Error(`Invalid float at ${i}`);return h};if(o(4)!=="mesh")throw new Error("Not an Anymaker mesh");const c=s();if(c!==5)throw new Error(`Unsupported mesh version ${c}`);const l=s();if(!l||l>256)throw new Error("Invalid submesh count");const d=[];for(let h=0;h<l;h++){const f=s();if(f>4096)throw new Error("Invalid mesh name length");const u=o(f),g=i;r(140);const _=Array.from({length:8},()=>s()),m=fy.get(_.join(","));if(!m)throw new Error(`Unsupported vertex layout: ${_}`);const p=Array.from(t.subarray(g+32,g+88));i=g+88;const b=Array.from({length:6},()=>{const P=a(e.getFloat64(i,!0));return i+=8,P}),M=s();if(!M||M%m.stride)throw new Error("Invalid vertex buffer size");r(M);const v=M/m.stride;if(v>1e6)throw new Error("Too many vertices");const C=new Float32Array(v*3),A=new Uint8Array(v*4),R=m.normal?new Float32Array(v*3):null,D=m.uv?new Float32Array(v*2):null;for(let P=0;P<v;P++){const B=i+P*m.stride;for(let F=0;F<3;F++)C[P*3+F]=a(e.getFloat32(B+F*4,!0)),R&&(R[P*3+F]=a(e.getFloat32(B+m.normal+F*4,!0)));if(A.set(t.subarray(B+12,B+16),P*4),D)for(let F=0;F<2;F++)D[P*2+F]=a(e.getFloat32(B+m.uv+F*4,!0))}i+=M;const E=s();if(!E||E%12)throw new Error("Index buffer is not a triangle list");r(E);const y=new Uint32Array(E/4);for(let P=0;P<y.length;P++)if(y[P]=s(),y[P]>=v)throw new Error("Index outside vertex buffer");d.push({name:u,signature:_,metadata:p,bounds:b,positions:C,normals:R,colors:A,uv:D,indices:y})}if(t.length-i!==8||s()!==0||s()!==0)throw new Error("Unsupported mesh trailer (possibly skeleton/animation)");return{version:c,parts:d}}class qu{files=new Map;cache=new Map;register(t){for(const e of t){const i=e.webkitRelativePath||e.name,r=i.indexOf("meshes/");i.endsWith(".mesh")&&this.files.set(r>=0?i.slice(r):e.name,e)}return this.cache.clear(),this.files.size}async parse(t){const e=this.files.get(t),i=t.split("/").pop(),r=[...this.files.entries()].filter(([a])=>a===i),s=e||(r.length===1?r[0][1]:null);if(!s)return null;if(this.cache.has(s))return this.cache.get(s);if(s.size>64*1024*1024)throw new Error("模型超过 64 MiB 限制");const o=py(await s.arrayBuffer());return this.cache.size>=32&&this.cache.delete(this.cache.keys().next().value),this.cache.set(s,o),o}async instantiate(t,e={}){const i=t.mesh_static?.mesh_path||t.mesh,r=i?await this.parse(i):null,s=new Gn;if(!r){const o=new st(new Ee(.2,.2,.2),new ai({color:"#f3ba66",wireframe:!0}));return s.add(o),s.userData.visual="missing",s.userData.reason=i?"缺少本地 Mesh："+i:"定义没有静态 Mesh",s}for(const o of r.parts){const a=new Ne;a.setAttribute("position",new Re(o.positions,3)),a.setIndex(new Re(o.indices,1)),o.normals?a.setAttribute("normal",new Re(o.normals,3)):a.computeVertexNormals(),o.uv&&a.setAttribute("uv",new Re(o.uv,2)),a.setAttribute("gameColorBytes",new Re(o.colors,4,!0));const c=new Er({color:"#b4c3ce",roughness:.7,metalness:.1,side:Je}),l=new st(a,c);l.name=o.name,l.castShadow=l.receiveShadow=!0,s.add(l)}return s.userData.visual="mesh",s.userData.reason="真实静态几何 · 中性诊断材质（非游戏着色）",s.userData.vertices=r.parts.reduce((o,a)=>o+a.positions.length/3,0),s.userData.triangles=r.parts.reduce((o,a)=>o+a.indices.length/3,0),s}}function ca(n){n.traverse(t=>{t.geometry?.dispose(),Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material?.dispose()})}const ye=.08,$u=8,my=1e-7,an=["x","y","z"],Zu=n=>typeof n=="number"&&Number.isFinite(n)&&Math.abs(n)<=1e4,gy=n=>Number(n.toFixed(12));function ci(n){if(!Zu(n))return null;const t=Math.round(n/ye);return Math.abs(n-t*ye)<=my?t:null}function Rs(n){if(!Number.isSafeInteger(n)||Math.abs(n*ye)>1e4)throw new Error("格坐标超出合法范围");return gy(n*ye)}function Ea(n,t="坐标"){const e=ci(n);if(e===null)throw new Error(`${t}必须对齐 8 cm 整数格`);return Rs(e)}function Ce(n,t="坐标"){if(!n||typeof n!="object")throw new Error(`${t}必须是三维坐标`);return Object.fromEntries(an.map(e=>[e,Ea(n[e],`${t}.${e}`)]))}function _y(n){return Zu(n)?Rs(Math.round(n/ye)):null}function Ri(n){if(!n||typeof n!="object")return null;const t=Object.fromEntries(an.map(e=>[e,_y(n[e])]));return an.every(e=>t[e]!==null)?t:null}function yl(n,t){const e=Ce(n,"梁起点"),i=Ce(t,"梁终点");return Object.fromEntries(an.map(r=>[r,ci(i[r])-ci(e[r])]))}function Ku(n){const t=(e,i)=>i?t(i,e%i):e;return n.map(e=>Math.abs(e)).reduce(t,0)}function Ml(n){if(!Number.isSafeInteger(n))throw new Error("格数必须是整数");return String(n)}const Hs=(n,t)=>n==null?null:new t(n);function vy(n,t){t?.position&&n.position.set(...t.position);const e=t?.previewRotation;Array.isArray(e)&&e.length===9&&e.every(Number.isFinite)&&n.quaternion.setFromRotationMatrix(new oe().set(e[0],e[1],e[2],0,e[3],e[4],e[5],0,e[6],e[7],e[8],0,0,0,0,1))}const xy=n=>Array.isArray(n)&&n.length===3&&n.every(Number.isInteger)?n:null,bl={x:0,y:1,z:2};function eu(n,t,e){const i=/^(.*)_0_0_0\.mesh$/.exec(n||"");if(!i)return null;const r=[0,0,0];return r[bl[t]]=e,`${i[1]}_${r.join("_")}.mesh`}function yy(n,t,e,i){const r=t.staticMesh||n.mesh_static?.mesh_path||n.mesh||null;if(!r)return[];const s=[{path:r,transform:null}],o=xy(e);if(!o)return s;for(const a of Object.keys(bl)){if(n[`mode_${a}`]!=="tile")continue;const c=bl[a],l=Number(n.interval?.[c]),d=o[c];if(!Number.isInteger(l)||l<=0||d<=0||d%l)continue;const h=eu(r,a,1),f=eu(r,a,2);if(!h||!f||!i.entries[h]||!i.entries[f])continue;const u=d/l;for(let _=1;_<u;_++){const m=[0,0,0];m[c]=_*l*ye,s.push({path:h,transform:{position:m}})}const g=[0,0,0];g[c]=d*ye,s.push({path:f,transform:{position:g}});break}return s}function My(n){if(!n||!["anymaker-published-mesh","anymaker-published-mesh-opaque"].includes(n.format)||n.version!==1||!Array.isArray(n.parts))throw new Error("Invalid published Mesh payload");return{version:5,opaque:n.format==="anymaker-published-mesh-opaque",parts:n.parts.map(t=>({name:t.name,signature:t.signature,metadata:t.metadata,bounds:t.bounds,positions:Hs(t.positions,Float32Array),normals:Hs(t.normals,Float32Array),colors:Hs(t.colors,Uint8Array),uv:Hs(t.uv,Float32Array),indices:Hs(t.indices,Uint32Array)}))}}class by{constructor(t,e=new qu){this.baseUrl=t.endsWith("/")?t:t+"/",this.fallback=e,this.manifestPromise=null,this.meshCache=new Map}async manifest(){return this.manifestPromise||(this.manifestPromise=fetch(this.baseUrl+"assets/manifests/mesh-manifest.json").then(t=>{if(!t.ok)throw new Error(`Published Mesh manifest HTTP ${t.status}`);return t.json()}).then(t=>{if(t.format!=="anymaker-mesh-manifest"||t.version!==1||!t.entries)throw new Error("Invalid published Mesh manifest");return t})),this.manifestPromise}async parse(t){const i=(await this.manifest()).entries[t];if(!i)throw new Error(`Published Mesh is not indexed: ${t}`);if(this.meshCache.has(t))return this.meshCache.get(t);const r=fetch(this.baseUrl+i.url).then(async s=>{if(!s.ok)throw new Error(`Published Mesh HTTP ${s.status}: ${t}`);let o=s.body;const a=/gzip/i.test(s.headers.get("content-encoding")||"");if(typeof DecompressionStream=="function"&&i.compression==="gzip"&&!a)o=o.pipeThrough(new DecompressionStream("gzip"));else if(i.compression==="gzip"&&!a)throw new Error("该浏览器不支持 gzip Mesh 解压");const c=JSON.parse(await new Response(o).text());if(c.source!==t||c.sourceSha256!==i.sourceSha256)throw new Error(`Published Mesh hash/source mismatch: ${t}`);return My(c)});this.meshCache.set(t,r);try{return await r}catch(s){throw this.meshCache.delete(t),s}}register(t){return this.fallback.register(t)}async instantiate(t,{nativeExtension:e}={}){try{const i=t.meshBinding||{staticMesh:t.mesh_static?.mesh_path||t.mesh||null,dynamicMeshes:[]},r=await this.manifest(),o=[...yy(t,i,e,r),...(i.dynamicMeshes||[]).filter(d=>d.path).map(d=>({path:d.path,transform:d}))];if(!o.length)return this.fallback.instantiate(t,{nativeExtension:e});const a=await Promise.all(o.map(d=>this.parse(d.path))),c=new Gn;if(a.every(d=>d.opaque||!d.parts.length)){const d=new st(new Ee(.2,.2,.2),new ai({color:"#d49b4a",wireframe:!0}));return c.add(d),c.userData.visual="opaque",c.userData.reason="已入库但使用未解码的原生 Mesh 变体",c}const l=(d,h=null,f="")=>{for(const u of d.parts){const g=new Ne;g.setAttribute("position",new Re(u.positions,3)),g.setIndex(new Re(u.indices,1)),u.normals?g.setAttribute("normal",new Re(u.normals,3)):g.computeVertexNormals(),u.uv&&g.setAttribute("uv",new Re(u.uv,2)),g.setAttribute("gameColorBytes",new Re(u.colors,4,!0));const _=f.includes("/car_wheel"),m=f.endsWith("car_wheel.mesh")?"#1b2027":f.endsWith("car_wheel_b_1.mesh")?"#667380":f.endsWith("car_wheel_trims_a.mesh")?"#aebbc5":"#b4c3ce",p=new st(g,new Er({color:m,roughness:_?.52:.7,metalness:_?.35:.1,side:Je}));p.name=u.name,p.userData.source=f,p.castShadow=p.receiveShadow=!0,vy(p,h),c.add(p)}};return a.forEach((d,h)=>l(d,o[h].transform,o[h].path)),c.userData.visual="mesh",c.userData.reason="独立发布 Mesh（完整解析，gzip 懒加载）",c.userData.vertices=a.flatMap(d=>d.parts).reduce((d,h)=>d+h.positions.length/3,0),c.userData.triangles=a.flatMap(d=>d.parts).reduce((d,h)=>d+h.indices.length/3,0),c}catch(i){if(this.fallback.files.size)return this.fallback.instantiate(t,{nativeExtension:e});throw i}}dispose(){for(const t of this.meshCache.values())t.then(e=>e.parts).catch(()=>{});this.meshCache.clear()}}const Sy=n=>({x:0,y:1,z:2})[n];function Ey(n,t){const e=Sy(t);if(e===void 0)throw new Error("Invalid reflection axis");const i=n.clone(),r=i.getAttribute("position");for(let a=e;a<r.array.length;a+=3)r.array[a]=r.array[a]===0?0:-r.array[a];r.needsUpdate=!0;const s=i.getAttribute("normal");if(s){for(let a=e;a<s.array.length;a+=3)s.array[a]=s.array[a]===0?0:-s.array[a];s.needsUpdate=!0}const o=i.getIndex();if(o){for(let a=0;a+2<o.count;a+=3){const c=o.getX(a+1);o.setX(a+1,o.getX(a+2)),o.setX(a+2,c)}o.needsUpdate=!0}return i.computeBoundingBox(),i.computeBoundingSphere(),i}function wy(n,t){return n.traverse(e=>{if(!e.isMesh||!e.geometry)return;const i=e.geometry;e.geometry=Ey(i,t),i.dispose()}),n}const Ju="anymaker-builder-domain",Qu=1,wr=["x","y","z"],Sl=.08,ve=n=>structuredClone(n),An=(n,t=0)=>Object.fromEntries(wr.map(e=>[e,Number(n?.[e]??t)])),tf=()=>({position:An(),rotation:An(),scale:An({x:1,y:1,z:1},1)}),Un=(n,t)=>typeof n=="string"&&n?n:t;class td{constructor(t={}){this.id=Un(t.id,"component"),this.type=Un(t.type,"unknown"),this.gridId=Un(t.gridId,"grid-1"),this.transform={position:An(t.position??t.transform?.position),rotation:An(t.rotation??t.transform?.rotation),scale:An(t.scale??t.transform?.scale,1)},this.mirror=t.mirror?{axis:t.mirror.axis,offset:t.mirror.offset}:void 0,this.colors=Array.isArray(t.colors)?[...t.colors]:void 0,this.hidden=t.hidden===!0?!0:void 0,this.extras=ve(t.extras||{})}}class ef{constructor(t={}){Object.assign(this,ve(t),{id:Un(t.id,"node"),position:An(t.position)})}}class nf{constructor(t={}){Object.assign(this,ve(t),{id:Un(t.id,"edge"),a:Un(t.a,""),b:Un(t.b,"")})}}class rf{constructor(t={}){Object.assign(this,ve(t),{id:Un(t.id,"plate"),nodeIds:Array.isArray(t.nodeIds)?[...t.nodeIds]:[]})}}class sf{constructor(t={}){Object.assign(this,ve(t),{id:Un(t.id,"link"),kind:Un(t.kind,"unknown"),from:ve(t.from||{}),to:ve(t.to||{})})}}class of{constructor(t={}){this.id=Un(t.id,"grid-1"),this.origin=An(t.origin),this.dir=An(t.dir,0),this.transform={...tf(),...t.transform||{}},this.components=(t.components||[]).map(e=>new td({...e,gridId:this.id})),this.nodes=(t.nodes||[]).map(e=>new ef(e)),this.edges=(t.edges||[]).map(e=>new nf(e)),this.plates=(t.plates||[]).map(e=>new rf(e)),this.links=(t.links||[]).map(e=>new sf(e)),this.extras=ve(t.extras||{})}}class af{constructor(t={}){this.id=Un(t.id,"vehicle-1"),this.transform={...tf(),...t.transform||{}},this.grids=(t.grids||[]).map(e=>new of(e)),this.extras=ve(t.extras||{})}}class cf{constructor(t={}){this.format=Ju,this.version=Qu,this.units={position:"game-world",rotation:"radians-xyz",scale:"ratio",...t.units||{}},this.vehicles=(t.vehicles||[]).map(e=>new af(e)),this.extras=ve(t.extras||{})}}function es(n,t){const e=new Set;for(const i of n){if(!i.id||e.has(i.id))throw new Error(`Duplicate ${t} ID: ${i.id}`);e.add(i.id)}return e}function Cs(n){if(!n||n.format!==Ju||n.version!==Qu||!Array.isArray(n.vehicles))throw new Error("Unsupported domain model version");es(n.vehicles,"vehicle");for(const t of n.vehicles){es(t.grids,"grid");const e=new Set;for(const i of t.grids){for(const o of i.components){if(!o.id||e.has(o.id))throw new Error(`Duplicate component ID: ${o.id}`);e.add(o.id)}const r=es(i.nodes,"node"),s=es(i.edges,"edge");es(i.plates,"plate"),es(i.links,"link");for(const o of i.edges)if(!r.has(o.a)||!r.has(o.b))throw new Error(`Edge ${o.id} references an unknown node`);for(const o of i.plates)if(o.nodeIds.some(a=>!r.has(a)))throw new Error(`Plate ${o.id} references an unknown node`);for(const o of i.links)if(!o.from||!o.to)throw new Error(`Link ${o.id} has no endpoints`);if(!s)throw new Error("Invalid edge collection")}}return n}function Ty(n){const e=(Array.isArray(n?.objects)?n.objects:[]).map(o=>new td(o)),i=new Map;for(const o of e)i.has(o.gridId)||i.set(o.gridId,[]),i.get(o.gridId).push(o);const r=[...i.entries()].map(([o,a])=>({id:o,components:a}));if(r.length||r.push({id:"grid-1",components:[]}),n.topology){const o=r.find(a=>a.id==="grid-1")||r[0];o.nodes=ve(n.topology.nodes||[]),o.edges=ve(n.topology.edges||[]),o.plates=ve(n.topology.plates||[]),o.links=ve(n.topology.links||[])}const s=new cf({vehicles:[{id:"vehicle-1",grids:r}]});return Cs(s)}function lf(n,t){if(!t)return n.vehicles;const e=new Map(n.vehicles.map(s=>[s.id,s])),i=new Set(t.filter(s=>e.has(s))),r=[...i];for(;r.length;){const s=r.shift(),o=e.get(s);for(const a of o.grids.flatMap(c=>c.components)){const c=a.extras?.native?.state?.connected_vehicle;e.has(String(c))&&!i.has(String(c))&&(i.add(String(c)),r.push(String(c)))}}return n.vehicles.filter(s=>i.has(s.id))}function df(n,t){const e=new Map(n.map(o=>[o.id,o])),i=new Map(t.filter(o=>e.has(o)).map(o=>[o,{x:0,y:0,z:0}])),r=(o,a)=>o.grids.flatMap(c=>c.components).find(c=>c.id===String(a)),s=[...i.keys()];for(;s.length;){const o=e.get(s.shift()),a=i.get(o.id);for(const c of o.grids.flatMap(l=>l.components)){const l=String(c.extras?.native?.state?.connected_vehicle??""),d=e.get(l),h=d&&r(d,c.extras?.native?.state?.connected_component);!h||i.has(l)||(i.set(l,wr.reduce((f,u)=>({...f,[u]:a[u]+c.transform.position[u]-h.transform.position[u]}),{})),s.push(l))}}return i}function Ay(n){const t=[...n].sort((i,r)=>i-r),e=Math.floor(t.length/2);return t.length%2?t[e]:(t[e-1]+t[e])/2}function Ry(n){const t=new Map;for(const e of n){const i=new Map;for(const s of e.grids)for(const o of s.components)i.set(String(o.id),{component:o,grid:s});const r=e.grids.flatMap(s=>s.links);for(const s of e.grids){const o=s.extras?.native?.raw;if(!o||!Array.isArray(o.origin)&&!Array.isArray(o.dir))continue;const a=new Set(s.components.map(l=>String(l.id))),c=[];for(const l of r){const d=String(l.from?.comp??""),h=String(l.to?.comp??""),f=a.has(d),u=a.has(h);if(f===u)continue;const g=i.get(f?d:h),_=i.get(f?h:d);!g||!_||_.grid===s||c.push(Object.fromEntries(wr.map(m=>[m,_.component.transform.position[m]-g.component.transform.position[m]])))}c.length&&t.set(`${e.id}:${s.id}`,Object.fromEntries(wr.map(l=>[l,Ay(c.map(d=>d[l]))])))}}return t}function Cy(n,t,e=An()){return Object.fromEntries(wr.map(i=>[i,(n[i]+t[i]+e[i])*Sl]))}function nu(n){const t=n.extras?.native?.state?.ext;return Array.isArray(t)&&t.length===3&&t.every(e=>Number.isInteger(e))?[...t]:void 0}function Py(n,{vehicleIds:t=null}={}){Cs(n);const e=lf(n,t),i={...n,vehicles:e};if(!i.vehicles.length)throw new Error("No selected vehicle exists in the domain model");const r=[],s=!!i.extras?.native,o=s?df(e,t||[]):new Map,a=s?Ry(e):new Map;for(const h of i.vehicles)for(const f of h.grids)for(const u of f.components){const g=o.get(h.id)||An(),_=a.get(`${h.id}:${f.id}`)||An(),m=s?Cy(u.transform.position,g,_):ve(u.transform.position),p=u.colors||u.extras?.native?.colors;r.push({id:s?`${h.id}:${f.id}:${u.id}`:u.id,type:u.type,gridId:f.id,...u.mirror?{mirror:ve(u.mirror)}:{},...Array.isArray(p)&&p.length<=10&&p.every(b=>Number.isInteger(b)&&b>=0&&b<=255)?{colors:[...p]}:{},...u.hidden?{hidden:!0}:{},...nu(u)?{nativeExtension:nu(u)}:{},position:m,rotation:ve(u.transform.rotation),scale:ve(u.transform.scale)})}const c={nodes:[],edges:[],plates:[]},l=[];for(const h of i.vehicles)for(const f of h.grids)c.nodes.push(...f.nodes.map(ve)),c.edges.push(...f.edges.map(ve)),c.plates.push(...f.plates.map(ve)),l.push(...f.links.map(ve));const d={format:"anymaker-web-project",version:1,objects:r};if(s){const h=hf(n,{vehicleIds:t});return(h.nodes.length||h.edges.length||h.plates.length||h.links.length)&&(d.topology=h),d}return l.length&&(c.links=l),(c.nodes.length||c.edges.length||c.plates.length||l.length)&&(d.topology=c),d}function hf(n,{vehicleIds:t=null}={}){Cs(n);const e=lf(n,t),i={...n,vehicles:e};if(!i.vehicles.length)throw new Error("No selected vehicle exists in the domain model");const r=[],s=[],o=[],a=[],c=!!i.extras?.native,l=c?df(e,t||[]):new Map;for(const d of i.vehicles){const h=new Map(d.grids.flatMap(u=>u.components.map(g=>[String(g.id),c?`${d.id}:${u.id}:${g.id}`:g.id]))),f=l.get(d.id)||An();for(const u of d.grids){r.push(...u.nodes.map(_=>({id:`${u.id}:${_.id}`,position:c?Object.fromEntries(wr.map(m=>[m,(_.position[m]+f[m])*Sl])):ve(_.position),gridId:u.id})));const g=_=>`${u.id}:${_}`;s.push(...u.edges.map(_=>({id:g(_.id),a:g(_.a),b:g(_.b),gridId:u.id,...Number.isInteger(_.extras?.native?.col)&&_.extras.native.col>=0&&_.extras.native.col<=255?{col:_.extras.native.col}:{}}))),o.push(...u.plates.map(_=>({id:g(_.id),nodeIds:_.nodeIds.map(g),gridId:u.id,...Number.isInteger(_.extras?.native?.col_front)&&_.extras.native.col_front>=0&&_.extras.native.col_front<=255?{col_front:_.extras.native.col_front}:{},...Number.isInteger(_.extras?.native?.col_back)&&_.extras.native.col_back>=0&&_.extras.native.col_back<=255?{col_back:_.extras.native.col_back}:{},..._.extras?.native?.type==="window"?{type:"window"}:{}}))),a.push(...u.links.map(_=>{const m=(p,b)=>{const M=h.get(String(p?.comp));if(!M)throw new Error(`Native ${_.kind} link ${_.id} ${b} references an unknown component`);return{componentId:M,...Number.isInteger(p?.pos)?{port:p.pos}:{}}};return{id:g(_.id),kind:_.kind,from:m(_.from,"source"),to:m(_.to,"target"),points:(_.points||[]).map(p=>c?Object.fromEntries(wr.map((b,M)=>[b,(Number(p[M])+f[b])*Sl])):ve(p)),...Number.isInteger(_.extras?.native?.color)&&_.extras.native.color>=0&&_.extras.native.color<=255?{color:_.extras.native.color}:{}}}))}}return{nodes:r,edges:s,plates:o,links:a}}const Dy=["electric","mechanical","liquid","gas","belt","data"],uf=Object.freeze({electric:"#f1c232",mechanical:"#f2994a",liquid:"#2f80ed",gas:"#27ae60",belt:"#98a2b3",data:"#9b51e0"}),Ly=n=>structuredClone(n),Ys=n=>n===void 0?0:n;function iu(n,t,e){if(!n||typeof n.componentId!="string"||!n.componentId)throw new Error(`${t} endpoint must reference a component`);if(e&&!e.has(n.componentId))throw new Error(`${t} endpoint references an unknown component: ${n.componentId}`);if(!Number.isInteger(Ys(n.port))||Ys(n.port)<0||Ys(n.port)>255)throw new Error(`${t} port must be an integer from 0 to 255`);return{componentId:n.componentId,...n.port===void 0?{}:{port:n.port}}}function la(n=[],t=null){if(!Array.isArray(n))throw new Error("Connections must be an array");const e=new Set;return n.map((i,r)=>{if(!i||typeof i.id!="string"||!i.id||e.has(i.id))throw new Error(`Connection ID is invalid or duplicated: ${r}`);if(!Dy.includes(i.kind))throw new Error(`Unsupported connection kind: ${String(i.kind)}`);const s=iu(i.from,"Connection source",t),o=iu(i.to,"Connection target",t);if(s.componentId===o.componentId&&Ys(s.port)===Ys(o.port))throw new Error("A connection cannot use the same component port twice");if(!Array.isArray(i.points)||i.points.length>256)throw new Error("Connection route must contain at most 256 points");if(i.color!==void 0&&(!Number.isInteger(i.color)||i.color<0||i.color>255))throw new Error("Connection color must be an integer from 0 to 255");e.add(i.id);const a={id:i.id,kind:i.kind,from:s,to:o,points:i.points.map(c=>Ce(c,"Connection route point"))};return Number.isInteger(i.color)&&i.color>=0&&i.color<=255&&(a.color=i.color),a})}function Iy(n,t,e=null){const i=la(n,e),r=`${t.kind}-link`;let s=1;for(;i.some(a=>a.id===`${r}-${s}`);)s++;const[o]=la([{...Ly(t),id:`${r}-${s}`}],e);return{links:[...i,o],link:o}}function Ny(n,t,e=null){const i=la(n,e);if(!i.some(r=>r.id===t))throw new Error(`Connection does not exist: ${t}`);return{links:i.filter(r=>r.id!==t)}}const El=1e-6,Tn=n=>structuredClone(n),ed=n=>({x:Number(n.position?.x??0),y:Number(n.position?.y??0),z:Number(n.position?.z??0)}),ta=(n,t)=>({x:n.x-t.x,y:n.y-t.y,z:n.z-t.z}),Uy=(n,t)=>({x:n.y*t.z-n.z*t.y,y:n.z*t.x-n.x*t.z,z:n.x*t.y-n.y*t.x}),Oy=(n,t)=>n.x*t.x+n.y*t.y+n.z*t.z,ff=n=>Math.hypot(n.x,n.y,n.z),nd=(n,t)=>ff(ta(n,t))<=El,wl=(n,t)=>[n,t].sort().join("::"),wc=n=>n===void 0||Number.isInteger(n)&&n>=0&&n<=255,Tc=n=>n===void 0||typeof n=="string"&&/^#[\da-f]{6}$/i.test(n);function Fy(n,t){return n.length!==t.length?!1:n.some((e,i)=>{if(e!==t[0])return!1;const r=n.every((o,a)=>o===t[(i+a)%t.length]),s=n.every((o,a)=>o===t[(i-a+t.length)%t.length]);return r||s})}function On(n={},t=null){const e=Array.isArray(n.nodes)?n.nodes:[],i=Array.isArray(n.edges)?n.edges:[],r=Array.isArray(n.plates)?n.plates:[],s=la(n.links||[],t),o=new Set,a=new Map,c=[];for(const h of e){if(!h||typeof h.id!="string"||!h.id||o.has(h.id))throw new Error("节点 ID 无效或重复");const f=Ce(h.position,"节点坐标");o.add(h.id),a.set(h.id,f),c.push({...Tn(h),position:f})}const l=new Set;for(const h of i){if(!h||typeof h.id!="string"||!h.id||l.has(h.id))throw new Error("梁 ID 无效或重复");if(!o.has(h.a)||!o.has(h.b)||h.a===h.b)throw new Error("梁引用未知或相同节点");if(nd(a.get(h.a),a.get(h.b)))throw new Error("梁长度必须大于零");if(!wc(h.col))throw new Error("梁颜色编号无效");if(!Tc(h.color))throw new Error("梁 RGB 颜色无效");if(h.hidden!==void 0&&typeof h.hidden!="boolean")throw new Error("梁可见性无效");l.add(h.id)}const d=new Set;for(const h of r){if(!h||typeof h.id!="string"||!h.id||d.has(h.id))throw new Error("面板 ID 无效或重复");if(gf(h.nodeIds,e,h.normalOffset),!wc(h.col_front)||!wc(h.col_back))throw new Error("面板颜色编号无效");if(!Tc(h.color_front)||!Tc(h.color_back))throw new Error("面板 RGB 颜色无效");if(h.type!==void 0&&h.type!=="window")throw new Error("面板类型无效");if(h.hidden!==void 0&&typeof h.hidden!="boolean")throw new Error("面板可见性无效");d.add(h.id)}return{nodes:c,edges:Tn(i),plates:Tn(r),...n.links!==void 0?{links:s}:{}}}function id(n,t){const e=new Set(n.map(r=>String(r.id)));let i=1;for(;e.has(`${t}-${i}`);)i++;return`${t}-${i}`}function da(n,t,e="node"){const i=On({nodes:n,edges:[],plates:[]}).nodes,r=Ce(t,"节点坐标"),s=i.find(a=>nd(ed(a),r));if(s)return{nodes:i,node:s,created:!1};const o={id:id(i,e),position:r};return i.push(o),{nodes:i,node:o,created:!0}}function zy(n,t,e){const i=Ce(e,"节点坐标");let r=!1;const s=Tn(n).map(o=>o.id!==t?o:(r=!0,{...o,position:i}));if(!r)throw new Error("节点不存在："+t);return{nodes:s}}function pf(n,t,e){const i=On(n),r=Ce(e,"节点坐标");if(!i.nodes.some(a=>a.id===t))throw new Error("节点不存在："+t);const s=i.nodes.find(a=>a.id!==t&&nd(ed(a),r));if(s){const a=mf(i.nodes,i.edges,i.plates,t,s.id,i.links);return{...On(a),merged:!0,idMap:a.idMap}}const o=zy(i.nodes,t,r);return{...On({...i,nodes:o.nodes}),merged:!1,idMap:{}}}function mf(n,t,e,i,r,s){if(i===r)throw new Error("不能将节点合并到自身");if(!n.some(l=>l.id===i)||!n.some(l=>l.id===r))throw new Error("合并节点不存在");const o=[],a=new Set;for(const l of t){const d=l.a===i?r:l.a,h=l.b===i?r:l.b;if(d===h)continue;const f=wl(d,h);a.has(f)||(a.add(f),o.push({...Tn(l),a:d,b:h}))}const c=Tn(e).map(l=>({...l,nodeIds:l.nodeIds.map(d=>d===i?r:d)})).map(l=>({...l,nodeIds:l.nodeIds.filter((d,h,f)=>f.indexOf(d)===h)})).filter(l=>l.nodeIds.length>=3);return{nodes:n.filter(l=>l.id!==i).map(Tn),edges:o,plates:c,...s!==void 0?{links:Tn(s)}:{},idMap:{[i]:r}}}function By(n,t){if(!n.nodes.some(e=>e.id===t))throw new Error("节点不存在："+t);return On({...n,nodes:n.nodes.filter(e=>e.id!==t),edges:n.edges.filter(e=>e.a!==t&&e.b!==t),plates:n.plates.filter(e=>!e.nodeIds.includes(t))})}function ky(n,t){if(!n.edges.some(e=>e.id===t))throw new Error("梁不存在："+t);return On({...n,edges:n.edges.filter(e=>e.id!==t)})}function Hy(n,t){if(!n.plates.some(e=>e.id===t))throw new Error("面板不存在："+t);return On({...n,plates:n.plates.filter(e=>e.id!==t)})}function Tl(n,t,e,i={}){if(!t||!e||t===e)throw new Error("梁必须连接两个不同节点");if(n.some(o=>wl(o.a,o.b)===wl(t,e)))throw new Error("梁已存在");const r=Tn(i);delete r.id,delete r.a,delete r.b;const s={id:id(n,"edge"),a:t,b:e,...r};return{edges:[...Tn(n),s],edge:s}}function Vy(n,t,e){const i=On(n),r=da(i.nodes,t),s=da(r.nodes,e),o=Tl(i.edges,r.node.id,s.node.id);return On({...i,nodes:s.nodes,edges:o.edges})}function Gy(n,t,e=[]){const i=(e.length?e:[]).find(l=>l.id===t);if(!i)throw new Error("梁不存在："+t);const r=n.find(l=>l.id===i.a),s=n.find(l=>l.id===i.b);if(!r||!s)throw new Error("梁引用未知节点");const o=Ce(r.position,"梁起点"),a=yl(o,s.position),c=Ku(an.map(l=>a[l]));return c<=1?[]:Array.from({length:c-1},(l,d)=>Object.fromEntries(an.map(h=>[h,Rs(ci(o[h])+a[h]*(d+1)/c)])))}function Wy(n,t,e,i,r=[]){const s=t.find(M=>M.id===e);if(!s)throw new Error("梁不存在："+e);const o=n.find(M=>M.id===s.a),a=n.find(M=>M.id===s.b);if(!o||!a)throw new Error("梁引用未知节点");const c=Ce(o.position,"梁起点"),l=yl(c,a.position),d=Ku(an.map(M=>l[M]));if(d<=1)throw new Error("该梁没有可用整格分割点");const h=Ce(i,"分割点"),f=yl(c,h);let u=null;for(const M of an){const v=l[M],C=f[M];if(v===0){if(C!==0)throw new Error("分割点必须位于梁中心线内部");continue}if(C*v<=0||Math.abs(C)>=Math.abs(v)||C*d%v!==0)throw new Error("分割点必须位于梁中心线内部");const A=C*d/v;if(u!==null&&u!==A)throw new Error("分割点必须位于梁中心线内部");u=A}if(!Number.isInteger(u)||u<=0||u>=d)throw new Error("分割点必须位于梁中心线内部");const g=da(n,h,"node"),_=t.filter(M=>M.id!==e),m=Tl(_,s.a,g.node.id,s).edges,p=Tl(m,g.node.id,s.b,s).edges,b=Tn(r).map(M=>{const v=M.nodeIds||[],C=v.findIndex((A,R)=>{const D=v[(R+1)%v.length];return A===s.a&&D===s.b||A===s.b&&D===s.a});return C<0?M:{...M,nodeIds:[...v.slice(0,C+1),g.node.id,...v.slice(C+1)]}});return{nodes:g.nodes,edges:p,plates:b,node:g.node,replaced:s}}function gf(n,t,e=0){if(!Array.isArray(n)||n.length<3)throw new Error("面板至少需要三个节点");if(new Set(n).size!==n.length)throw new Error("面板节点不能重复");if(!Number.isFinite(e)||Math.abs(e)>1e4)throw new Error("面板法向偏移无效");const i=new Map(t.map(o=>[o.id,o])),r=n.map(o=>{const a=i.get(o);if(!a)throw new Error("面板引用未知节点："+o);return ed(a)});let s=null;for(let o=1;o<r.length-1&&!s;o++)for(let a=o+1;a<r.length;a++){const c=Uy(ta(r[o],r[0]),ta(r[a],r[0]));ff(c)>El&&(s=c)}if(!s)throw new Error("面板节点不能共线");for(const o of r.slice(3))if(Math.abs(Oy(s,ta(o,r[0])))>El)throw new Error("面板节点必须共面");return{points:r,normal:s}}function Xy(n,t,e,i={}){if(gf(t,e,i.normalOffset),n.some(s=>Array.isArray(s.nodeIds)&&Fy(s.nodeIds,t)))throw new Error("该闭合梁环已有面板或玻璃");const r={id:id(n,"plate"),nodeIds:[...t],...Tn(i)};return{plates:[...Tn(n),r],plate:r}}function _f(n,t,e,i,r={}){if(!Array.isArray(t)||t.length<3)throw new Error("面板至少需要选择三根梁");if(new Set(t).size!==t.length)throw new Error("面板梁不能重复选择");const s=new Map(e.map(u=>[u.id,u])),o=t.map(u=>{const g=s.get(u);if(!g)throw new Error("面板引用了未知梁："+u);return g}),a=new Map;for(const u of o)for(const g of[u.a,u.b]){const _=a.get(g)||[];_.push(u),a.set(g,_)}if([...a.values()].some(u=>u.length!==2))throw new Error("选择的梁必须组成单一闭合环，且不能分支");const c=o[0],l=[c.a],d=new Set([c.id]);let h=c,f=c.b;for(;f!==l[0];){if(d.size>=o.length)throw new Error("选择的梁未形成闭合环");l.push(f);const u=a.get(f).find(g=>g.id!==h.id&&!d.has(g.id));if(!u)throw new Error("选择的梁未形成单一闭合环");d.add(u.id),f=u.a===f?u.b:u.a,h=u}if(d.size!==o.length)throw new Error("选择的梁必须组成单一闭合环");return Xy(n,l,i,r)}function jy(n,t,e,i,r={}){return _f(n,t,e,i,{...r,type:"window"})}const Qs="anymaker-web-project",to=1,Al=2e3,ea=["x","y","z"],Yy=(n,t)=>Object.hasOwn(n,t);function ys(n,t){if(!n||n.format!==Qs||n.version!==to||!Array.isArray(n.objects))throw new Error("Unsupported editor project format");if(n.objects.length>Al)throw new Error("Component limit exceeded: "+Al);const e=new Set,i=n.objects.map((s,o)=>{if(!s||typeof s.id!="string"||!s.id||s.id.length>100||e.has(s.id))throw new Error("组件 ID 无效或重复："+o);if(e.add(s.id),!t.has(s.type))throw new Error("Unknown component definition: "+String(s.type));const a={id:s.id,type:s.type};if(s.gridId!==void 0&&(typeof s.gridId!="string"||!/^[A-Za-z0-9_-]{1,80}$/.test(s.gridId)))throw new Error("Invalid grid ID at "+o);if(s.gridId!==void 0&&(a.gridId=s.gridId),s.mirror!==void 0){if(!s.mirror||!["x","y","z"].includes(s.mirror.axis))throw new Error("Invalid mirror data at "+o);a.mirror={axis:s.mirror.axis,offset:Ea(s.mirror.offset,"镜像偏移")}}if(s.colors!==void 0){if(!Array.isArray(s.colors)||s.colors.length>10||s.colors.some(c=>!Number.isInteger(c)||c<0||c>255))throw new Error("Invalid component color slots at "+o);a.colors=[...s.colors]}if(s.hidden!==void 0){if(typeof s.hidden!="boolean")throw new Error("Invalid component visibility at "+o);s.hidden&&(a.hidden=!0)}if(s.nativeExtension!==void 0){if(!Array.isArray(s.nativeExtension)||s.nativeExtension.length!==3||s.nativeExtension.some(c=>!Number.isInteger(c)||Math.abs(c)>1e4))throw new Error("Invalid native component extension at "+o);a.nativeExtension=[...s.nativeExtension]}for(const c of["position","rotation","scale"]){const l=s[c];if(!l||!ea.every(d=>Yy(l,d)&&typeof l[d]=="number"&&Number.isFinite(l[d])&&Math.abs(l[d])<=1e4))throw new Error("Invalid transform at "+o+"."+c);if(c==="scale"&&ea.some(d=>l[d]<=0||l[d]>100))throw new Error("Scale must be in (0, 100]");a[c]=c==="position"?Ce(l,"组件位置"):Object.fromEntries(ea.map(d=>[d,l[d]]))}return a}),r={format:Qs,version:to,objects:i};return n.topology!==void 0&&(r.topology=On(n.topology,new Set(i.map(s=>s.id)))),Ty(r),r}function vf(n,t){if(!n||n.format!==Qs)throw new Error("Unsupported editor project format");if(n.version===to)return ys(n,t);if(n.version!==0)throw new Error("Unsupported editor project schema version: "+n.version);const i=(Array.isArray(n.objects)?n.objects:Array.isArray(n.components)?n.components:[]).map((r,s)=>({id:r.id||`legacy-${s+1}`,type:r.type||r.definition,gridId:r.gridId,position:r.position||{x:0,y:0,z:0},rotation:r.rotation||{x:0,y:0,z:0},scale:r.scale||{x:1,y:1,z:1}}));return ys({format:Qs,version:to,objects:i,topology:n.topology},t)}function wa(n,t){const e={format:Qs,version:to,objects:structuredClone(n)};return t!==void 0&&(e.topology=On(t,new Set(n.map(i=>i.id)))),e}function Jn(n){return String(n).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function qy(n){for(const a of n.objects||[])Ce(a.position,"组件位置"),a.mirror&&Ea(a.mirror.offset,"镜像偏移");On(n.topology);const t=(a,c)=>"<"+a+" "+ea.map(l=>l+'="'+c[l].toFixed(6)+'"').join(" ")+"/>",e=n.objects.map(a=>{const c=a.gridId?' grid="'+Jn(a.gridId)+'"':"",l=a.mirror?'<mirror axis="'+Jn(a.mirror.axis)+'" offset="'+Number(a.mirror.offset).toFixed(6)+'"/>':"";return'  <component instance="'+Jn(a.id)+'" definition="'+Jn(a.type)+'"'+c+">"+t("position",a.position)+t("rotation-radians-xyz",a.rotation)+t("scale",a.scale)+l+"</component>"}),i=n.topology||{nodes:[],edges:[],plates:[]},r=i.nodes.map(a=>'  <node id="'+Jn(a.id)+'" x="'+a.position.x.toFixed(6)+'" y="'+a.position.y.toFixed(6)+'" z="'+a.position.z.toFixed(6)+'"/>'),s=i.edges.map(a=>'  <edge id="'+Jn(a.id)+'" a="'+Jn(a.a)+'" b="'+Jn(a.b)+'"/>'),o=i.plates.map(a=>'  <plate id="'+Jn(a.id)+'" nodes="'+a.nodeIds.map(Jn).join(" ")+'"/>');return['<?xml version="1.0" encoding="UTF-8"?>',"<!-- EDITOR INTERCHANGE ONLY. Not a verified Anymaker vehicle save. -->",`<anymaker-web-project version="1" game-compatible="false" coordinate-unit="world" grid-cell-size-cm="${$u}">`,"<topology>",...r,...s,...o,"</topology>",...e,"</anymaker-web-project>"].join(`
`)}class $y{constructor(t,e="Initial state"){this.entries=[structuredClone(t)],this.labels=[e],this.cursor=0}commit(t,e="Edit"){JSON.stringify(t)!==JSON.stringify(this.entries[this.cursor])&&(this.entries.splice(this.cursor+1),this.labels.splice(this.cursor+1),this.entries.push(structuredClone(t)),this.labels.push(e),this.entries.length>60&&(this.entries.shift(),this.labels.shift()),this.cursor=this.entries.length-1)}peekUndo(){return this.cursor>0?structuredClone(this.entries[this.cursor-1]):null}peekRedo(){return this.cursor<this.entries.length-1?structuredClone(this.entries[this.cursor+1]):null}}const Tr=n=>structuredClone(n),Rl=(n,t=0)=>Object.fromEntries(an.map(e=>[e,Number(n?.[e]??t)])),Zy=(n,t)=>Object.fromEntries(an.map(e=>[e,n[e]+t[e]]));function xf(n,t="copy"){const e=new Set(n.map(i=>i.id));return i=>{const r=`${i}-${t}`;let s=r,o=2;for(;e.has(s);)s=`${r}-${o++}`;return e.add(s),s}}function Ky(n,t,e={x:0,y:0,z:0}){const i=new Set(t),r=Ce(Rl(e),"复制位移"),s=Tr(n),o=xf(s),a={};for(const c of n){if(!i.has(c.id))continue;const l=Tr(c);l.id=o(c.id),l.position=Ce(Zy(Ce(Rl(l.position),"组件位置"),r),"复制后的组件位置"),a[c.id]=l.id,s.push(l)}return{objects:s,idMap:a,created:Object.values(a)}}function Jy(n,t){const e=new Set(t),i=n.filter(r=>e.has(r.id)).map(r=>r.id);return{objects:Tr(n).filter(r=>!e.has(r.id)),removed:i}}function Qy(n,t,{axis:e="x",offset:i=0}={}){if(!an.includes(e))throw new Error("镜像平面无效");const r=Ea(i,"镜像偏移"),s=new Set(t),o=Tr(n),a=xf(o,"mirror"),c={};for(const l of n){if(!s.has(l.id))continue;const d=Tr(l);d.id=a(l.id),d.position=Ce(Rl(d.position),"组件位置"),d.position[e]=2*r-d.position[e],d.position=Ce(d.position,"镜像后的组件位置"),d.mirror={axis:e,offset:r},c[l.id]=d.id,o.push(d)}return{objects:o,idMap:c,created:Object.values(c)}}function tM(n,t,e){if(typeof e!="string"||!/^[A-Za-z0-9_-]{1,80}$/.test(e))throw new Error("子网格 ID 无效");const i=new Set(t);if(!i.size)throw new Error("至少选择一个组件才能拆分子网格");let r=0;return{objects:Tr(n).map(o=>i.has(o.id)?(r++,{...o,gridId:e}):o),gridId:e,changed:r}}function eM(n,t,e){if(!/^[A-Za-z0-9_-]{1,80}$/.test(e))throw new Error("目标子网格 ID 无效");const i=new Set(t);if(!i.size)throw new Error("至少选择一个源子网格");let r=0;return{objects:Tr(n).map(o=>i.has(o.gridId)?(r++,{...o,gridId:e}):o),gridId:e,changed:r}}function yf(n){return[...new Set(n.map(t=>t.gridId).filter(Boolean))].sort()}const Mf=20,nM=Mf/ye,bf=ye,Ac=bf,Cl=13421772,Ta=1e-6,eo="beam-outline",Nn=n=>new w(n.x,n.y,n.z),ha=n=>n&&an.every(t=>Number.isFinite(n[t])&&Math.abs(n[t])<=1e4);function Aa(n,t){const e=n.getWorldQuaternion(new ze),i=Nn(t),r=new w(1,0,0).applyQuaternion(e),s=new w(0,1,0).applyQuaternion(e),o=new w(0,0,1).applyQuaternion(e);return{origin:i,right:r,up:s,plane:new ti().setFromNormalAndCoplanarPoint(o,i)}}function Sf(n,t){if(Math.abs(n.direction.dot(t.plane.normal))<Ta)return null;const e=n.intersectPlane(t.plane,new w);if(!e)return null;const i=Ri(e);return i?Nn(i):null}function iM(n,t,e){const i=n.intersectObjects(t,!0)[0]?.point,r=i&&Ri(i);if(r)return Nn(r);const s=n.ray.intersectPlane(e,new w),o=s&&Ri(s);return o?Nn(o):null}function rM(n,t,{axisSnap:e=!1,node:i=null,viewNormal:r=t.plane.normal}={}){const s=Ri(t.origin);if(!s)return null;const o=Nn(s);if(!e){const l=ha(i)?Ce(i,"节点坐标"):Sf(n,t);return l?{point:Nn(l),axis:null}:null}if(ha(i)){const l=Ce(i,"节点坐标"),d=an.filter(h=>ci(l[h])!==ci(s[h]));if(d.length<=1)return{point:Nn(l),axis:d[0]||null}}let a=null;const c=n.origin.clone().sub(o);for(const l of an){if(Math.abs(r[l])>.995)continue;const d=n.direction[l],h=1-d*d;if(h<1e-4)continue;const f=(c[l]-d*c.dot(n.direction))/h,u=d*f-c.dot(n.direction);if(u<=Ta||!Number.isFinite(f))continue;const g=o.clone();g[l]+=f;const _=n.at(u,new w).distanceToSquared(g)/(u*u);if(!Number.isFinite(_)||a&&_>=a.score)continue;const m=Ri(g);m&&(a={point:Nn(m),axis:l,score:_})}return a?{point:a.point,axis:a.axis}:null}function Ef(n,t){if(!ha(n)||!ha(t))return[];let e,i;try{e=Ce(n,"梁起点"),i=Ce(t,"梁终点")}catch{return[]}const r=Nn(e);return an.map(s=>{const o=r.clone();r[s]=i[s];const a=Math.abs(ci(i[s])-ci(e[s]));return{axis:s,length:a*bf,cells:a,from:o,to:r.clone()}})}function sM(n){const t=n.getObjectByName(eo);t&&(t.geometry.dispose(),t.geometry=new zu(n.geometry))}function rd(n,t,e){const i=Nn(t),r=Nn(e),s=r.clone().sub(i),o=s.length();if(![...i.toArray(),...r.toArray()].every(Number.isFinite)||o<=Ta)return n.visible=!1,!1;const a=s.normalize(),c=Math.abs(a.z)<.999?new w(0,0,1):new w(1,0,0),l=c.addScaledVector(a,-c.dot(a)).normalize(),d=new w().crossVectors(a,l).normalize(),h=o+Ac;return n.position.copy(i).add(r).multiplyScalar(.5),n.quaternion.setFromRotationMatrix(new oe().makeBasis(d,a,l)),n.scale.set(Ac,h,Ac),n.visible=!0,n.updateMatrixWorld(!0),n.userData.beamOutlineRequested&&!n.getObjectByName(eo)?wf(n):sM(n),!0}function wf(n){if(!n.geometry?.getAttribute("position"))return!1;const t=new ql(new zu(n.geometry),new Nr({color:1515819,depthTest:!0,depthWrite:!1}));return t.name=eo,t.renderOrder=2,t.userData.topologyOutline=!0,n.add(t),!0}function oM(n,t){n.userData.beamOutlineRequested=!!t;let e=n.getObjectByName(eo);!e&&t&&(wf(n),e=n.getObjectByName(eo)),e&&(e.visible=!!t)}function Tf(n,t,e,{outlined:i=!1}={}){const r=new st(new Ee(1,1,1),e);return r.userData.beamOutlineRequested=!!i,rd(r,n,t),r}function aM(n,t,e,i,r){const s=new st(new je(.5,.5,1,r),e),o=t.clone().sub(n),a=o.length();if(a<=Ta)return s.visible=!1,s;const c=o.multiplyScalar(1/a),l=Math.abs(c.z)<.999?new w(0,0,1):new w(1,0,0),d=l.addScaledVector(c,-l.dot(c)).normalize(),h=new w().crossVectors(c,d).normalize();return s.position.copy(n).add(t).multiplyScalar(.5),s.quaternion.setFromRotationMatrix(new oe().makeBasis(h,c,d)),s.scale.set(i*2,a,i*2),s.castShadow=!0,s.receiveShadow=!0,s}function cM(n,t,{radius:e=.015,radialSegments:i=8}={}){const r=new Gn,s=n.map(o=>Nn(o));for(let o=1;o<s.length;o++)r.add(aM(s[o-1],s[o],t,e,i));for(let o=1;o<s.length-1;o++){const a=new st(new Ur(e,i,Math.max(4,Math.ceil(i/2))),t);a.position.copy(s[o]),a.castShadow=!0,a.receiveShadow=!0,r.add(a)}return r}const lM={"梁 1 格 · 点击起点":"Beam 1 cell · Click start","梁 1 格 · 点击终点 · Esc 取消":"Beam 1 cell · Click end · Esc to cancel",轴向吸附:"Axis snap","仅建梁：自动吸附单一世界轴（A 切换）":"Beams only: snap to one world axis (A to toggle)","XYZ 长度 · 整数格（1 格 = 8 cm）":"XYZ lengths · Integer cells (1 cell = 8 cm)","吸附 {axis} 轴":"Snap to {axis} axis",自由建梁:"Free beam","{axis} {cells} 格（{centimeters} cm）":"{axis} {cells} cells ({centimeters} cm)","{axis} {cells} 格":"{axis} {cells} cells","操作失败：{error}":"Operation failed: {error}",请先选择组件:"Select a component first",达到组件上限:"Component limit reached","已放置真实静态 Mesh":"Placed a real mesh",已放置缺失资源标记:"Placed a missing-asset marker","已删除 {count} 个组件":"Deleted {count} components","已复制 {count} 个组件":"Copied {count} components","已镜像 {count} 个组件（X 平面）":"Mirrored {count} components across X","新子网格 ID":"New grid ID","已将 {count} 个组件拆分到子网格 {gridId}":"Moved {count} components into grid {gridId}",当前工程尚未建立子网格:"No grids in this project",已合并子网格:"Grids merged",已撤销:"Undone",已重做:"Redone","{message}（{count} 逻辑节点）":"{message} ({count} logical nodes)",已删除节点及其关联拓扑:"Deleted node and connected topology",已删除梁:"Beam deleted",已删除面板:"Plate deleted",面板至少需要三个节点:"A plate needs at least three nodes",已创建面板:"Plate created","面板创建失败：{error}":"Plate creation failed: {error}","按 Alt 点击实体梁内部可分割":"Alt-click inside a beam to split it",已分割实体梁:"Beam split","当前位置无法投影到建造平面，请调整视角或按 Esc 重新开始":"No intersection with the build plane. Adjust the view or press Esc to restart.","起点已定位；移动鼠标预览实体梁，再次点击完成":"Start placed. Move to preview the beam and click to finish.","已创建 1 格实体梁":"Created a 1-cell solid beam",已合并节点:"Nodes merged","节点合并失败：{error}":"Node merge failed: {error}","已选择节点 {id}；点击节点合并，点击空白位置移动；Esc 取消选择":"Selected node {id}. Click a node to merge, empty space to move, or Esc to cancel.",已移动并合并节点:"Node moved and merged",已移动节点:"Node moved","已创建节点 {id}":"Created node {id}","已选择已有节点 {id}":"Selected existing node {id}",面板工具需要点击已有节点:"Select existing nodes to form a plate","面板已选择 {count} 个节点；按 Enter 完成，Esc 取消":"{count} plate nodes selected; Enter to finish, Esc to cancel","无法定位：射线与建造平面平行":"No intersection: ray parallel to build plane","梁 1 格 · 整格端点 · 点击完成 / Esc 取消":"Beam 1 cell · Grid endpoint · Click to finish / Esc to cancel","梁 1 格 · 无有效终点 · Esc 取消":"Beam 1 cell · No valid endpoint · Esc to cancel",无有效终点:"No valid endpoint",该梁没有可用整格分割点:"This beam has no valid interior grid split point","梁操作失败：{error}":"Beam operation failed: {error}","拓扑操作失败：{error}":"Topology operation failed: {error}","节点辅助已隐藏，请先显示节点后编辑节点或面板；直接建梁不受影响":"Show nodes to edit them or construct plates. Direct beam construction still works while nodes are hidden.","清空当前工程？此操作可以撤销。":"Clear this project? This can be undone.","已导出中间 XML；不能作为已验证游戏存档使用":"Debug XML exported. This is not a verified game save.","工程文件超过 10 MiB":"Project file exceeds 10 MiB",工程已加载:"Project loaded","本地已登记 {count} 个 Mesh。按组件请求解码，不上传。材质、动态装配尚未还原。":"{count} local meshes registered. Decoded on demand, never uploaded. Game materials and dynamic assemblies are not fully reproduced.","模型库已登记；选择组件并在视口点击放置":"Mesh library registered. Select a component and click in the viewport to place it.","文件超过 20 MiB":"File exceeds 20 MiB","请同时选择一份 .data 和一份 .meta 文件":"Select one .data and one .meta file together","请选择唯一的一份 .data 和一份 .meta 文件":"Select exactly one .data and one .meta file",".data 与 .meta 必须使用相同文件名":"The .data and .meta files must have the same name","没有 vehicles.vehicles 数组":"Missing vehicles.vehicles array","载具 {id}：{nodes} 节点 / {edges} 梁 / {plates} 面板 / {grids} 网格 / {components} 组件":"Vehicle {id}: {nodes} nodes / {edges} beams / {plates} plates / {grids} grids / {components} components","已配对 {dataName} / {metaName}。{vehicles}。确认后才导入当前场景。":"Paired {dataName} / {metaName}. {vehicles}. Confirm to import into the current scene.","无法导入原生文件：{error}":"Could not import native files: {error}",正在导入配套原生载具:"Importing paired native vehicle",原生模型尚未加载:"No native model loaded",当前操作仍在进行:"An operation is in progress","已将配套 .data / .meta 的组件导入当前场景；节点、梁、面板和连接仍保留在领域模型中":"Paired .data / .meta components imported. Original topology and connections remain in the domain model.","导出原生配套文件（未验证）":"Export native pair (unverified)","原生配套文件的无编辑 round-trip 校验失败":"Unedited native-pair round-trip validation failed","已导出原始 .data / .meta 配套文件；当前编辑器修改尚未完整回写，不能作为游戏兼容存档":"Exported the original .data / .meta pair. Current editor changes are not fully written back, so this is not a game-compatible save.","原生导出失败：{error}":"Native export failed: {error}",已取消当前拓扑操作:"Topology operation cancelled","组件目录加载失败：{error}":"Component catalog failed: {error}",节点坐标无效:"Invalid node coordinates",梁长度必须大于零:"Beam length must be positive",梁的端点必须是不同节点:"Beam endpoints must be different nodes"},dM={...lM,镜头辅助灯:"Camera fill light",镜头辅助灯强度:"Camera fill intensity",界面语言:"Interface language","正在加载定义…":"Loading definitions…",编辑工具:"Build tools",导入本地载具:"Import local vehicle",新建:"New",撤销:"Undo",重做:"Redo",保存工程:"Save project",打开工程:"Open project","中间格式 XML":"Debug XML",收起方块库:"Collapse library",展开方块库:"Expand library",方块库:"Component library","收起方块库（在视口按 Tab 也可切换）":"Collapse library (Tab in viewport)","展开方块库（在视口按 Tab 也可切换）":"Expand library (Tab in viewport)",组件定义:"Components",搜索组件:"Search components","搜索中文、原始 ID、类别…":"Search name, ID or category…",组件分类:"Component category",全部分类:"All categories",调整方块库宽度:"Resize component library",三维建造视口:"3D construction viewport",打开右侧面板:"Open settings panel",收起右侧面板:"Collapse settings panel",等距:"Isometric",顶视:"Top",前视:"Front","聚焦 F":"Fit F","工作平面 Y = 0":"Ground plane Y = 0",编辑器面板:"Editor settings","工作网格 · 编辑器参数":"Grid & editor settings","固定单位网格：1 格 = 8 cm；所有位置均为整数格。":"Fixed unit grid: 1 cell = 8 cm; every position uses integer cells.",隐藏网格:"Hide grid",显示网格:"Show grid",隐藏节点:"Hide nodes",显示节点:"Show nodes","左键：当前工具 · 右键拖动：旋转视角":"Left click: active tool · Right drag: orbit","中键：平移 · 滚轮：缩放 · F：聚焦":"Middle drag: pan · Wheel: zoom · F: fit","Shift + 点击连续放置 · Ctrl / ⌘ + Z：撤销":"Shift + click: keep placing · Ctrl / ⌘ + Z: undo",选中方块属性:"Selection properties",资源与校验:"Resources & diagnostics",资源状态:"Asset status","尚未导入 Mesh。橙色线框仅是缺失资源标记，不代表游戏尺寸。":"No local meshes imported. Orange wireframes indicate missing assets, not game dimensions.","选择 .mesh 文件":"Select .mesh files","推荐选择游戏的 rom/meshes 文件夹。只在浏览器读取，不上传、不执行 EXE。仅渲染静态 Mesh，动态部件数量会单独提示。":"For asset auditing, select rom/meshes. Files stay in your browser; nothing is uploaded or executed. Dynamic parts are reported separately.",本地原生载具:"Local native vehicle","选择配套 .data / .meta":"Choose paired .data / .meta","选择同名的 .data 与 .meta JSON 文件。浏览器只读取，不上传；确认后才替换当前场景。":"Choose same-named .data and .meta JSON files. They stay in your browser; confirm before replacing the scene.",校验:"Validation","导出原生 JSON（仅已映射字段）":"Experimental native JSON (mapped fields only)","导入 .data / .meta 到当前场景":"Import .data / .meta into scene",选择:"Select",放置:"Place",删除:"Erase",移动:"Move",旋转:"Rotate",缩放:"Scale",节点:"Node",梁:"Beam",面板:"Plate",复制选中:"Copy selection","镜像 X":"Mirror X",拆分子网格:"Split grid",合并子网格:"Merge grids","无法初始化 WebGL2。请启用硬件加速或更换浏览器。":"WebGL2 could not start. Enable hardware acceleration or use another browser.","{count} 个组件":"{count} components","{nodes} 节点 · {edges} 梁 · {plates} 面板":"{nodes} nodes · {edges} beams · {plates} plates","{count} 个组件没有真实 Mesh。":"{count} components have missing meshes.","静态几何已加载。":"Static geometry loaded.","{geometry} 连接拓扑、占用规则、动态装配和游戏文件兼容性尚未验证。":"{geometry} Connections, occupancy rules, dynamic assembly and game file compatibility are not yet verified.","选择组件查看属性。按住 Shift 点击可多选。":"Select a component to inspect it. Shift-click to select multiple.","已选择 {count} 个组件":"{count} components selected","可批量复制、镜像、拆分或删除。批量变换和框选尚未实现。":"Copy, mirror, split or delete the selection. Group transforms and box selection are not implemented.",删除已选组件:"Delete selection","资源诊断：{reason}":"Asset: {reason}","{vertices} 顶点 / {triangles} 三角形":"{vertices} vertices / {triangles} triangles","子网格 {gridId} · 动态部件 {count}（按需装配）":"Grid {gridId} · {count} dynamic parts (on-demand assembly)",未分配:"Unassigned","位置（格；1 格 = 8 cm）":"Position (cells; 1 cell = 8 cm)","旋转 °":"Rotation °",缩放比例:"Scale ratio",输入超出合法范围:"Value outside the allowed range","原始定义 / 端口 / 动态部件":"Raw definition / ports / dynamic parts",删除组件:"Delete component","准备放置：{name}":"Ready to place: {name}","没有匹配组件，试试其他名称或分类。":"No matching components. Try another name or category.","已加载 {count} 条组件索引，详情按需读取":"Loaded {count} components; details load on demand","仅切换逻辑节点辅助标记，不隐藏梁、不改变工程":"Toggle logical node helpers only; beams and project data stay unchanged",已显示逻辑节点辅助标记:"Logical node helpers shown","节点已隐藏；仍可直接建梁并吸附逻辑端点":"Nodes hidden. Build beams directly and snap to existing endpoints.","梁：两击完成，Esc 取消，Alt 点击分割。所有节点、组件和端点均对齐世界 XYZ 整数格；1 格 = 8 cm。截面边长为 1 格；世界轴向梁的面与 XYZ 平面平行。XYZ 标尺仅显示整数格与厘米。A 切换轴向吸附；节点可隐藏。":"Beam: click twice, Esc to cancel, Alt-click to split. Nodes, components and endpoints all align to integer world XYZ cells; 1 cell = 8 cm. The cross-section is 1 cell; faces of world-axis beams stay parallel to the XYZ planes. XYZ rulers show only integer cells and centimetres. A toggles axis snap. Nodes can be hidden.","节点是结构逻辑，不计入组件数量":"Nodes are structural logic, not components"};let sd="en";const Af=new WeakMap,Rf=new Map(Object.entries(dM));function hM(n){for(const[t,e]of Object.entries(n))typeof e=="string"&&Rf.set(t,e)}function Ci(){return sd}function Cf(n){sd=n==="zh"?"zh":"en"}function Ht(n,t={}){const e=String(n??""),i=sd==="zh"?e:Rf.get(e)??e,r=typeof t=="function"?t():t;return i.replace(/\{([A-Za-z][\w]*)\}/g,(s,o)=>Object.hasOwn(r||{},o)?String(r[o]??""):s)}function ee(n,t,e={}){n.dataset.i18n=t,Af.set(n,e),n.textContent=Ht(t,e)}function _n(n=document){const t="[data-i18n], [data-i18n-title], [data-i18n-aria-label], [data-i18n-placeholder]",e=[...n.matches?.(t)?[n]:[],...n.querySelectorAll(t)];for(const i of e){i.hasAttribute("data-i18n")&&(i.textContent=Ht(i.dataset.i18n,Af.get(i)));for(const[r,s]of[["title","i18nTitle"],["aria-label","i18nAriaLabel"],["placeholder","i18nPlaceholder"]])i.dataset[s]!==void 0&&i.setAttribute(r,Ht(i.dataset[s]))}}const uM={x:"#c94747",y:"#278452",z:"#326bc5"},ru="http://www.w3.org/2000/svg",Pf=n=>String(Math.abs(n)*$u);function fM(n,t){const e=typeof t=="function"?t:()=>t,i=document.createElement("div");i.id="beam-ruler",i.hidden=!0;const r=document.createElementNS(ru,"svg");r.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="beam-measurements";const o=document.createElement("strong");ee(o,"XYZ 长度 · 整数格（1 格 = 8 cm）");const a=document.createElement("span");a.id="beam-ruler-mode",s.append(o,a),i.append(r,s),n.append(i);const c=Object.entries(uM).map(([u,g])=>{const _=document.createElementNS(ru,"path");_.classList.add("beam-dimension-line");const m=document.createElement("span");m.className="beam-dimension-label",m.setAttribute("aria-hidden","true");const p=document.createElement("output");p.dataset.axis=u,p.setAttribute("aria-live","off");for(const b of[_,m,p])b.style.setProperty("--axis-color",g);return r.append(_),i.append(m),s.append(p),{path:_,label:m,output:p}});let l=[];function d(){i.hidden=!0,l=[]}function h(u,g,_){const m=u.clone().project(e());return m.z<-1||m.z>1||![m.x,m.y,m.z].every(Number.isFinite)?null:{x:(m.x+1)*g/2,y:(1-m.y)*_/2}}function f(){if(i.hidden)return;const u=n.clientWidth,g=n.clientHeight;l.forEach((_,m)=>{const{path:p,label:b}=c[m],M=h(_.from,u,g),v=h(_.to,u,g),C=M&&v&&_.length>1e-6&&Math.hypot(v.x-M.x,v.y-M.y)>8;if(b.hidden=!C,p.style.display=C?"":"none",!C)return;const A=Math.hypot(v.x-M.x,v.y-M.y),R=-(v.y-M.y)/A*4,D=(v.x-M.x)/A*4;p.setAttribute("d",`M${M.x},${M.y} L${v.x},${v.y} M${M.x-R},${M.y-D} L${M.x+R},${M.y+D} M${v.x-R},${v.y-D} L${v.x+R},${v.y+D}`);const E=Math.max(4,Math.min(u-b.offsetWidth-4,(M.x+v.x)/2+R*2)),y=Math.max(4,Math.min(g-b.offsetHeight-4,(M.y+v.y)/2+D*2));b.style.transform=`translate(${E}px, ${y}px)`})}return{show(u,g,_=null){if(l=Ef(u,g),!l.length){d();return}i.hidden=!1,i.dataset.axis=_||"",ee(a,_?"吸附 {axis} 轴":"自由建梁",{axis:_?.toUpperCase()}),l.forEach((m,p)=>{const{label:b,output:M}=c[p],v={axis:m.axis.toUpperCase(),cells:Ml(m.cells),centimeters:Pf(m.cells)};ee(M,"{axis} {cells} 格（{centimeters} cm）",v),M.dataset.cells=String(m.cells),ee(b,"{axis} {cells} 格",v)}),f()},update:f,hide:d,relabel(){_n(i)},dispose(){d(),i.remove()}}}function pM(n,t){const e=typeof t=="function"?t:()=>t,i=document.createElement("div");i.id="beam-length-labels",i.hidden=!0,n.append(i);let r=[];function s(a){const c=a.clone().project(e());return c.z<-1||c.z>1||![c.x,c.y,c.z].every(Number.isFinite)?null:{x:(c.x+1)*n.clientWidth/2,y:(1-c.y)*n.clientHeight/2}}function o(){if(!i.hidden)for(const{label:a,midpoint:c}of r){const l=s(c);a.hidden=!l,l&&(a.style.transform=`translate(${l.x}px, ${l.y}px) translate(-50%, -50%)`)}}return{setBeams(a,c){const l=new Map(a.map(d=>[d.id,d.position]));i.replaceChildren(),r=c.flatMap(d=>{const h=l.get(d.a),f=l.get(d.b);if(!h||!f)return[];const u=Ef(h,f);if(!u.length)return[];const g=document.createElement("output");return g.className="beam-length-label",g.textContent=u.map(({axis:_,cells:m})=>`${_.toUpperCase()} ${Ml(m)}`).join(" · "),g.title=u.map(({axis:_,cells:m})=>`${_.toUpperCase()} ${Ml(m)} cells / ${Pf(m)} cm`).join(" · "),i.append(g),[{label:g,midpoint:new w(h.x,h.y,h.z).add(new w(f.x,f.y,f.z)).multiplyScalar(.5)}]}),o()},setVisible(a){i.hidden=!a,a&&o()},update:o,dispose(){r=[],i.remove()}}}const hs=n=>({x:Number(n?.[0]??0),y:Number(n?.[1]??0),z:Number(n?.[2]??0)}),Df=n=>Array.isArray(n)&&n.length===9&&n.every(t=>Number.isFinite(t))?[...n]:null,mM=(n,t)=>Array.isArray(n)&&n.length===t&&n.every(e=>Number.isFinite(e));function gM(n){if(!n)return{x:0,y:0,z:0};n=[n[0],n[3],n[6],n[1],n[4],n[7],n[2],n[5],n[8]];const e=Math.asin((i=>Math.max(-1,Math.min(1,i)))(n[2]));return Math.abs(n[2])<.9999999?{x:Math.atan2(-n[5],n[8]),y:e,z:Math.atan2(-n[1],n[0])}:{x:Math.atan2(n[7],n[4]),y:e,z:0}}function _M(n){const t=Df(n?.m),e=mM(n?.t,3)?hs(n.t):hs();if(n?.m!==void 0&&!t)throw new Error("Native vehicle transform matrix must contain nine finite numbers");return{position:e,rotationMatrix:t||void 0}}function vM(n,t,e){if(!n||!Number.isInteger(n.id))throw new Error("Native component ID must be an integer");const i=t[n.def]||`native-definition-${n.def}`,r=Df(n.rot),s=new td({id:String(n.id),type:i,gridId:e,position:hs(n.pos),rotation:gM(r),scale:{x:1,y:1,z:1}});if(s.extras.native={definitionIndex:n.def,rotationMatrix:r,colors:Array.isArray(n.colors)?[...n.colors]:void 0,state:Object.fromEntries(Object.entries(n).filter(([o])=>!["id","def","pos","rot","colors"].includes(o)))},n.rot!==void 0&&!s.extras.native.rotationMatrix)throw new Error(`Invalid native rotation matrix for component ${n.id}`);return s}function xM(n){const t=typeof n=="string"?JSON.parse(n):n;if(!t||!t.vehicles||!Array.isArray(t.vehicles.vehicles))throw new Error("Native data has no vehicles.vehicles array");const e=Array.isArray(t.definitions?.components)?t.definitions.components:[],i=t.vehicles.vehicles.map(s=>{const o=new af({id:String(s.id),transform:_M(s.transform)});o.extras.native={rawVehicle:structuredClone(s)};const a=Array.isArray(s.grids)?s.grids:[];return o.grids=a.map((c,l)=>{const d=`grid-${o.id}-${l+1}`,h=new of({id:d,origin:hs(c.origin),dir:hs(c.dir)});h.components=(c.components||[]).map(u=>vM(u,e,d)),h.nodes=l===0?(s.nodes||[]).map(u=>new ef({id:String(u.id),position:hs(u.pos),extras:{native:structuredClone(u)}})):[],h.edges=l===0?(s.edges||[]).map((u,g)=>new nf({id:`${d}-edge-${g+1}`,a:String(u.n0),b:String(u.n1),extras:{native:structuredClone(u)}})):[],h.plates=l===0?(s.plates||[]).map(u=>new rf({id:String(u.id),nodeIds:(u.nodes||[]).map(String),extras:{native:structuredClone(u)}})):[];const f=["electric","mechanical","liquid","gas","belt","data"];return h.links=l===0?f.flatMap(u=>(s[`${u}_links`]||[]).map((g,_)=>new sf({id:`${d}-${u}-link-${_+1}`,kind:u,from:structuredClone(g.p0||{}),to:structuredClone(g.p1||{}),points:structuredClone(g.points||[]),extras:{native:structuredClone(g)}}))):[],h.extras.native={index:l,raw:structuredClone(c)},h}),o}),r=new cf({vehicles:i,extras:{native:{definitions:[...e],raw:structuredClone(t)}}});return Cs(r),r}function Lf(n,t){const e=typeof t=="string"?JSON.parse(t):t;if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Native .meta must be a JSON object");const i=xM(n);return i.extras.native.meta=structuredClone(e),i}function yM(n){return Cs(n),n.vehicles.map(t=>({id:t.id,grids:t.grids.length,nodes:t.grids.reduce((e,i)=>e+i.nodes.length,0),edges:t.grids.reduce((e,i)=>e+i.edges.length,0),plates:t.grids.reduce((e,i)=>e+i.plates.length,0),components:t.grids.reduce((e,i)=>e+i.components.length,0),links:t.grids.reduce((e,i)=>e+i.links.length,0)}))}function ua(n,t,e="$",i=[],r=100){if(i.length>=r||Object.is(n,t))return i;const s=Array.isArray(n),o=Array.isArray(t);if(s||o){if(!s||!o||n.length!==t.length)return i.push({path:e,expected:n,actual:t}),i;for(let d=0;d<n.length&&i.length<r;d++)ua(n[d],t[d],`${e}[${d}]`,i,r);return i}if(!(n&&typeof n=="object")||!(t&&typeof t=="object"))return i.push({path:e,expected:n,actual:t}),i;const l=[...new Set([...Object.keys(n),...Object.keys(t)])].sort();for(const d of l)if(!Object.hasOwn(n,d)||!Object.hasOwn(t,d)?i.push({path:`${e}.${d}`,expected:n[d],actual:t[d]}):ua(n[d],t[d],`${e}.${d}`,i,r),i.length>=r)break;return i}function If(n){Cs(n);const t=n.extras?.native?.raw,e=n.extras?.native?.meta;if(!t||!e)throw new Error("Domain model has no paired native source files");return{data:structuredClone(t),meta:structuredClone(e)}}function MM(n,t){const e=typeof n=="string"?JSON.parse(n):n,i=typeof t=="string"?JSON.parse(t):t,r=If(Lf(e,i));return{data:ua(e,r.data),meta:ua(i,r.meta)}}const su=n=>{if(typeof n!="string"||!n.startsWith("data/")||n.includes("..")||!n.endsWith(".json"))throw new Error("Invalid component data path");return n};class bM{constructor(t){this.baseUrl=t.endsWith("/")?t:t+"/",this.index=new Map,this.details=new Map,this.bindings=new Map}async load(){const t=await fetch(this.baseUrl+"data/index.json");if(!t.ok)throw new Error("组件索引加载失败 HTTP "+t.status);const e=await t.json();if(e.format!=="anymaker-component-index"||e.version!==1||e.schema!=="anymaker-component-index/1"||!Number.isInteger(e.resourceVersion)||!Array.isArray(e.definitions))throw new Error("不支持的组件索引格式");for(const i of e.definitions){if(!i||typeof i.id!="string"||!i.id||this.index.has(i.id))throw new Error("组件索引 ID 无效或重复");this.index.set(i.id,{...i,detail:su(i.detail),binding:su(i.binding)})}if(this.index.size!==e.count)throw new Error("组件索引数量不匹配");return e}has(t){return this.index.has(t)}entry(t){return this.index.get(t)}entries(){return this.index.values()}async definition(t){if(this.details.has(t))return this.details.get(t);const e=this.entry(t);if(!e)throw new Error("未知组件："+t);const[i,r]=await Promise.all([fetch(this.baseUrl+e.detail),fetch(this.baseUrl+e.binding)]);if(!i.ok||!r.ok)throw new Error("组件详情或 Mesh 绑定加载失败："+t);const[s,o]=await Promise.all([i.json(),r.json()]);if(s.id!==t||o.id!==t)throw new Error("组件数据 ID 不匹配："+t);const a={...s,meshBinding:o};return this.details.set(t,a),this.bindings.set(t,o),a}}const ou=new Map([["engine",["动力","#b56532","M3 9h3V6h9v3h3l3 3v6H6v-3H3z M9 3h6 M12 3v3"]],["liquid",["液体","#1682ac","M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12z M8 15a4 4 0 0 0 4 4"]],["wheel",["车轮","#57667e","M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M12 3v5 M12 16v5 M3 12h5 M16 12h5"]],["torque",["传动","#956831","M3 9h5v6H3z M16 9h5v6h-5z M8 12h8 M10 5h4 M12 3v4 M10 19h4"]],["electric",["电气","#ae7a16","M13 2 5 14h6l-1 8 9-13h-7z"]],["control",["控制","#7353b4","M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6"]],["light",["照明","#b78b22","M9 18v-2a6 6 0 1 1 6 0v2z M9 21h6 M12 1v1 M2 8h2 M20 8h2"]],["connector",["连接","#607a91","M9 14 7 16a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0 M15 10l2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0 M8 16l8-8"]],["sound",["声音","#9161aa","M3 9h4l5-4v14l-5-4H3z M16 8a6 6 0 0 1 0 8 M19 5a10 10 0 0 1 0 14"]],["interface",["仪表","#50879f","M3 4h18v13H3z M8 21h8 M12 17v4 M6 13l4-4 3 2 5-5"]],["storage",["存储","#976c45","M3 6l9-4 9 4v12l-9 4-9-4z M3 6l9 4 9-4 M12 10v12 M7 4l9 4"]],["radio",["无线","#6964bd","M12 21V11 M9 21h6 M10 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0 M7 5a7 7 0 0 0 0 10 M17 5a7 7 0 0 1 0 10 M4 2a11 11 0 0 0 0 16 M20 2a11 11 0 0 1 0 16"]],["weapon",["装置","#7c6b70","M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0 M12 2v6 M12 16v6 M2 12h6 M16 12h6"]],["aircraft",["航空","#437d9c","M12 2l2 8 7 4v3l-7-2v4l2 2h-8l2-2v-4l-7 2v-3l7-4z"]],["gas",["气体","#599993","M3 7h12a3 3 0 1 0-3-3 M3 12h16a3 3 0 1 1-3 3 M3 17h6a3 3 0 1 1-3 3"]],["hydraulic",["液压","#5089a7","M4 8h10v8H4z M14 12h6 M20 8v8 M2 5v14 M7 4v4 M7 16v4"]],["mechanical",["机械","#737d91","M9 3h6v3l3 2 3-1 2 5-3 2v3l-5 3-3-2-3 2-5-3v-3l-3-2 2-5 3 1 3-2z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"]],["data",["数据","#6b68aa","M8 5 2 12l6 7 M16 5l6 7-6 7 M14 3l-4 18"]],["furniture",["家具","#a07152","M6 3h12v10H6z M4 13h16v4H4z M6 17v4 M18 17v4"]],["building",["建材","#718898","M3 3h18v18H3z M3 9h18 M3 15h18 M9 3v6 M15 9v6 M9 15v6"]],["sensor",["传感","#579279","M12 3a9 9 0 1 0 9 9 M12 7a5 5 0 1 0 5 5 M12 12l8-8 M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"]],["miscellaneous",["其他","#788394","M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z"]]]);function od(n){const[t,e,i]=ou.get(n)||ou.get("miscellaneous");return{label:t,color:e,path:i}}function SM(n){const t=od(n),e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.6"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.setAttribute("aria-hidden","true"),e.classList.add("category-icon"),e.style.color=t.color;const i=document.createElementNS(e.namespaceURI,"path");return i.setAttribute("d",t.path),e.append(i),e}const au=new Map([[26,"#bd2636"],[28,"#631a24"],[49,"#2b3440"],[79,"#20252c"]]);function Rc(n){return Math.round(Math.max(0,Math.min(1,n))*255).toString(16).padStart(2,"0")}function ad(n){if(au.has(n))return au.get(n);const t=n*.61803398875%1,e=.62,i=.46,r=(1-Math.abs(2*i-1))*e,s=t*6,o=r*(1-Math.abs(s%2-1)),[a,c,l]=s<1?[r,o,0]:s<2?[o,r,0]:s<3?[0,r,o]:s<4?[0,o,r]:s<5?[o,0,r]:[r,0,o],d=i-r/2;return"#"+Rc(a+d)+Rc(c+d)+Rc(l+d)}function cu(n){return n?.type==="window"}const Qn=(n,t,e,i)=>Number.isFinite(n)&&n>=t&&n<=e?n:i,dn=(n,t)=>typeof n=="boolean"?n:t,Cc=(n,t,e="")=>typeof n=="string"&&n.length<=t?n:e,lu=n=>Array.isArray(n)&&n.length===3&&n.every(t=>Number.isFinite(t)&&Math.abs(t)<=1e4),EM=n=>typeof n=="string"&&/^#[\da-f]{6}$/i.test(n)?n.toLowerCase():null,wM=(n,t)=>{if(!Array.isArray(n)||n.length>12)return t;const e=n.map(i=>EM(i)||(Number.isInteger(i)&&i>=0&&i<=255?ad(i):null));return e.every(Boolean)?[...new Set(e)]:t},TM=6e4;function ji(n={}){const t=n&&n.version===1?n:{};let e=null;if(lu(t.camera?.position)&&lu(t.camera?.target)){const i=Math.hypot(...t.camera.position.map((r,s)=>r-t.camera.target[s]));i>.005&&i<2e3&&(e={position:[...t.camera.position],target:[...t.camera.target]})}return{version:1,language:t.language==="zh"?"zh":"en",leftWidth:Qn(t.leftWidth,240,720,304),leftCollapsed:dn(t.leftCollapsed,!1),rightOpen:dn(t.rightOpen,!1),gridColor:typeof t.gridColor=="string"&&/^#[\da-f]{6}$/i.test(t.gridColor)?t.gridColor:"#8294a8",gridOpacity:Qn(t.gridOpacity,0,1,.45),gridStyle:t.gridStyle==="dashed"?"dashed":"solid",gridVisible:dn(t.gridVisible,!0),nodesVisible:dn(t.nodesVisible,!0),nodeColor:typeof t.nodeColor=="string"&&/^#[\da-f]{6}$/i.test(t.nodeColor)?t.nodeColor:"#246bce",nodeSize:Qn(t.nodeSize,.02,.25,.055),nodeOpacity:Qn(t.nodeOpacity,0,1,1),beamAxisSnap:dn(t.beamAxisSnap,!1),beamLengthsVisible:dn(t.beamLengthsVisible,!1),beamOutlinesVisible:dn(t.beamOutlinesVisible,!1),backgroundColor:typeof t.backgroundColor=="string"&&/^#[\da-f]{6}$/i.test(t.backgroundColor)?t.backgroundColor:"#ffffff",lightAzimuth:Qn(t.lightAzimuth,-180,180,35),lightElevation:Qn(t.lightElevation,5,90,55),lightIntensity:Qn(t.lightIntensity,0,8,3),shadowStrength:Qn(t.shadowStrength,0,1,.65),lightSoftness:Qn(t.lightSoftness,0,8,2),cameraLightEnabled:dn(t.cameraLightEnabled,!0),cameraLightIntensity:Qn(t.cameraLightIntensity,0,8,2),paintQuickColors:wM(t.paintQuickColors,["#bd2636","#631a24","#2b3440","#20252c","#a16a30"]),orthographic:dn(t.orthographic,!1),showBuildingFurniture:dn(t.showBuildingFurniture,!1),query:Cc(t.query,200),category:Cc(t.category,80),selectedType:Cc(t.selectedType,100,"engine"),tool:["select","place","erase","translate","rotate","scale","node","beam","split","plate","glass","connect","paint"].includes(t.tool)?t.tool:"select",drawers:{catalog:dn(t.drawers?.catalog,!0),inspector:dn(t.drawers?.inspector,!1),resources:dn(t.drawers?.resources,!1),history:dn(t.drawers?.history,!1)},camera:e}}function AM(n,t="/"){const e="anymaker:"+t,i={settings:e+":settings:v1",project:e+":autosave:v1",backup:e+":autosave-backup:v1"};function r(o,a){if(o.length>a)throw new Error("Local record exceeds the size limit");return JSON.parse(o)}function s(o,a){const c=r(o,8388608);if(!c||c.version!==1||!Number.isFinite(c.savedAt))throw new Error("Unsupported local backup");return{...c,document:a(c.document)}}return{keys:i,loadSettings(){try{const o=n().getItem(i.settings);return{settings:ji(o?r(o,16384):void 0),error:null}}catch(o){return{settings:ji(),error:o}}},saveSettings(o){try{return n().setItem(i.settings,JSON.stringify(ji(o))),{ok:!0}}catch(a){return{ok:!1,error:a}}},loadProject(o){let a=null;for(const c of[i.project,i.backup])try{const l=n().getItem(c);if(l)return{record:s(l,o),recoveredBackup:c===i.backup,error:null}}catch(l){a=l}return{record:null,error:a}},saveProject(o,a,c=Date.now()){try{const l=a(o),d=JSON.stringify({version:1,savedAt:c,document:l});if(d.length>8*1024*1024)throw new Error("Project too large for local backup");const h=n(),f=h.getItem(i.project);if(f){let u=!1;try{s(f,a),u=!0}catch{}if(u)try{h.setItem(i.backup,f)}catch{}}return h.setItem(i.project,d),{ok:!0,savedAt:c}}catch(l){return{ok:!1,error:l}}}}}async function RM({store:n,validate:t,restore:e,snapshot:i,canSave:r,notify:s}){let o=!1,a="",c="ready",l=null,d="";const h=(b,M="")=>{c=b,d=M,s({state:c,savedAt:l,detail:d})},f=n.loadProject(t);if(f.record)try{await e(f.record.document),a=JSON.stringify(i()),l=f.record.savedAt,h(f.recoveredBackup?"recovered":"restored")}catch(b){o=!0,h("error",b.message)}else f.error?(o=!0,h("error",f.error.message)):(a=JSON.stringify(i()),h("ready"));function u(b=!1){if(o||!r())return!1;try{const M=i(),v=JSON.stringify(M);if(!b&&v===a)return!0;const C=n.saveProject(M,t);return C.ok?(l=C.savedAt,a=v,h("saved"),!0):(h("write-error",C.error.message),!1)}catch(M){return h("write-error",M.message),!1}}const g=setInterval(()=>u(),TM),_=()=>{document.visibilityState==="hidden"&&u()},m=()=>u(),p=b=>{b.key===n.keys.project&&(o=!0,h("conflict"))};return document.addEventListener("visibilitychange",_),window.addEventListener("pagehide",m),window.addEventListener("storage",p),{save:u,resume(){return o=!1,u(!0)},refresh(){s({state:c,savedAt:l,detail:d})},dispose(){clearInterval(g),document.removeEventListener("visibilitychange",_),window.removeEventListener("pagehide",m),window.removeEventListener("storage",p)}}}const du={right:[1,0,0],left:[-1,0,0],top:[0,1,1e-5],bottom:[0,-1,1e-5],front:[0,0,1],back:[0,0,-1],iso:[1,.8,1]};function CM(n,t,e){if(!Object.hasOwn(du,e))return!1;const i=Math.max(.5,n.position.distanceTo(t.target));return n.up.set(0,1,0),n.position.copy(t.target).addScaledVector(new w(...du[e]).normalize(),i),n.lookAt(t.target),t.update(),n.updateMatrixWorld(!0),!0}function PM(n,{gridColor:t,gridOpacity:e,gridStyle:i}){const r=n.material,s={color:t,transparent:!0,opacity:e,depthWrite:!1,vertexColors:!1};n.material=i==="dashed"?new Jm({...s,dashSize:.055,gapSize:.045}):new Nr(s),i==="dashed"&&n.computeLineDistances();for(const o of Array.isArray(r)?r:[r])o.dispose()}function DM(n,t,e,i){const r=typeof t=="function"?t:()=>t,s=document.createElement("section");s.id="orientation-indicator",s.setAttribute("aria-label",i("orientation"));const o=document.createElement("div");o.className="orientation-sphere";const a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("viewBox","0 0 120 120"),a.setAttribute("aria-hidden","true"),o.append(a);const c=[["right","+X","#cc5258",[1,0,0]],["left","−X","#cc5258",[-1,0,0]],["top","+Y","#45996b",[0,1,0]],["bottom","−Y","#45996b",[0,-1,0]],["front","+Z","#4387d4",[0,0,1]],["back","−Z","#4387d4",[0,0,-1]]].map(([u,g,_,m])=>{const p=document.createElementNS(a.namespaceURI,"line");p.setAttribute("x1","60"),p.setAttribute("y1","60"),p.setAttribute("stroke",_),a.append(p);const b=document.createElement("button");return b.dataset.view=u,b.textContent=g,b.style.setProperty("--axis-color",_),b.title=i(u),b.setAttribute("aria-label",i(u)),b.onclick=()=>e(u),o.append(b),{view:u,line:p,button:b,direction:new w(...m)}}),l=document.createElement("div");l.className="orientation-footer";const d=document.createElement("button");d.dataset.view="iso",d.textContent=i("iso"),d.onclick=()=>e("iso"),l.append(d),s.append(o,l),n.append(s);const h=new ze,f=new w;return{root:s,footer:l,update(){h.copy(r().quaternion).invert();for(const{line:u,button:g,direction:_}of c){f.copy(_).applyQuaternion(h);const m=60+f.x*40,p=60-f.y*40;u.setAttribute("x2",String(m)),u.setAttribute("y2",String(p));const b=Math.hypot(f.x,f.y)<.1?f.z<0?-16:16:0;g.style.left=m+b+"px",g.style.top=p+"px",g.style.zIndex=String(Math.round((f.z+1)*10)),g.style.opacity=f.z<-.1?".55":"1",g.style.transform="translate(-50%, -50%) scale("+(f.z<-.1?.8:1)+")"}},relabel(){s.setAttribute("aria-label",i("orientation"));for(const u of c)u.button.title=i(u.view),u.button.setAttribute("aria-label",i(u.view));d.textContent=i("iso")}}}const LM={透明化:"Hide",取消透明化:"Restore hidden","透明化工具需要点击组件、梁或面板":"The hide tool needs a component, beam, or panel.","已透明化 {count} 个对象":"Hid {count} object(s).",已取消透明化:"Restored all hidden objects.",玻璃:"Glass",玻璃至少需要选择三根梁:"Glass needs at least three beams.",玻璃工具需要选择围成闭合环的梁:"The glass tool needs beams that form a closed loop.","玻璃已选择 {count} 根梁；按 Enter 创建，Esc 取消":"Glass has selected {count} beams; press Enter to create or Esc to cancel.",已创建玻璃面板:"Created glass panel",视图与光照:"View and lighting",背景颜色:"Background color",正交镜头:"Orthographic camera",光照方位角:"Light azimuth",光照高度角:"Light elevation",光照强度:"Light intensity",阴影强度:"Shadow strength",光照柔和度:"Light softness",涂色色板:"Paint palette",保存快捷颜色:"Save quick color",删除快捷颜色:"Remove saved color",显示建材与家具:"Show building and furniture",连接类型:"Connection type",历史记录:"History","最近 50 次已提交操作。选择任一项即可恢复到该状态。":"Latest 50 committed operations. Select an item to restore that state.",初始状态:"Initial state",编辑:"Edit",放置组件:"Place component",删除组件:"Delete component",恢复此状态:"Restore this state",已恢复历史记录:"Restored history entry",载具尺寸:"Vehicle size",空载具:"Empty vehicle","{axis} {cells} 格 / {cm} cm":"{axis} {cells} cells / {cm} cm","载具总尺寸按组件和结构节点的包围范围计算；1 格 = 8 cm":"Vehicle size is calculated from the bounds of components and structural nodes; 1 cell = 8 cm","点击组件端口作为起点，再点击兼容端口完成连接。":"Click a component port for the source, then a compatible port for the target.",切分梁:"Split beam",连接:"Connect",连接工具:"Connection tool",连接类型:"Connection type",起点端口:"Source port",终点端口:"Target port",电线:"Electric",机械连接:"Mechanical",液体管线:"Liquid",气体管线:"Gas",皮带:"Belt",数据线:"Data",连接工具说明:"Choose a network type, then click a source and target component. Routes and port compatibility are not yet verified against the game.",连接工具需要点击两个组件:"The connection tool needs a source and target component.","端口必须是 0 到 255 的整数":"Port must be an integer from 0 to 255.","已选择连接起点；点击目标组件完成，Esc 取消":"Source selected; click a target component to finish, or press Esc to cancel.",请选择另一个组件作为连接终点:"Choose another component as the connection target.","已创建 {kind} 连接":"Created {kind} connection",已删除连接:"Deleted connection",切分工具需要点击梁的内部:"The split tool needs an interior point on a beam.",该梁没有可用整格切分点:"This beam has no available cell split point.",已切分实体梁并新增节点:"Split the solid beam and added a node",参考预览:"Reference preview","隐藏编辑辅助并使用黑色背景；仅用于与参考截图进行人工对照，不代表游戏渲染已经匹配":"Hide editing aids on black for manual screenshot comparison. This does not claim the game rendering matches.","已开启参考预览：编辑辅助已隐藏，可对照 vehicle.png；相机、光照和游戏材质尚未验证":"Reference preview enabled: editing aids are hidden for comparison with vehicle.png; game camera, lighting, and materials remain unverified.",已退出参考预览:"Reference preview disabled.",导入载具范围:"Vehicle import scope","导入载具 {id} 及其关联子载具（默认主载具）":"Import vehicle {id} with its connected sub-vehicles (default primary vehicle)","导入载具 {id} 及其关联子载具":"Import vehicle {id} with its connected sub-vehicles","导入全部 {count} 个载具":"Import all {count} vehicles",涂色:"Paint","颜色（Hex RGB）":"Color (Hex RGB)","使用原生颜色编号；以下仅为诊断预览，不代表游戏调色板。":"Use native color indices. The preview below is diagnostic only and does not represent the game palette.",原生颜色编号:"Native color index",面板涂色面:"Panel paint side",前面:"Front",背面:"Back","XYZ 视角指示器":"XYZ orientation","右视图 +X":"Right view +X","左视图 −X":"Left view −X","顶视图 +Y":"Top view +Y","底视图 −Y":"Bottom view −Y","前视图 +Z":"Front view +Z","后视图 −Z":"Back view −Z",网格颜色:"Grid color",网格透明度:"Grid opacity",网格线型:"Grid lines",结构显示:"Structure display","显示梁 XYZ 长度（格）":"Show beam XYZ lengths (cells)",显示梁描边:"Show beam outlines",节点显示:"Node display",节点颜色:"Node color",节点大小:"Node size",节点透明度:"Node opacity","固定单位网格：1 格 = 8 cm；所有位置均为整数格。":"Fixed unit grid: 1 cell = 8 cm; every position uses integer cells.",实线:"Solid",虚线:"Dashed","自动保存：每分钟":"Autosave: every minute",已恢复本地工程:"Local project restored",已从上一份有效备份恢复:"Recovered the previous valid backup","已自动保存 {time}":"Autosaved at {time}","本地恢复失败：{detail}":"Local recovery failed: {detail}","本地保存失败，请下载工程：{detail}":"Local save failed. Download your project: {detail}","另一标签页已保存，自动保存已暂停":"Another tab saved this project. Autosave paused.",以当前工程继续自动保存:"Resume autosave with this project","用当前工程覆盖本地恢复记录并继续自动保存？":"Replace the local recovery record with this project and resume autosave?","设置保存失败：{detail}":"Could not save preferences: {detail}","本地存储只属于当前浏览器和站点；清理站点数据会删除备份，请定期下载工程。":"Local backups belong to this browser and site. Clearing site data removes them; download your project regularly."};hM(LM);const cd=AM(()=>window.localStorage,location.pathname),Pl=cd.loadSettings(),nt=Pl.settings;Cf(nt.language);let ld=!1,Dl=null,dd=null;const N=n=>document.querySelector(n),$i=["x","y","z"],hd=new by("./",new qu),We=new bM("./");let Ra=new Map,wn="",Ve=null,Ge=new Set,Pe=[],Kt=!0,Nt="select",os=null,ud=!1,Wn=null,Pi=null,lt={nodes:[],edges:[],plates:[],links:[]};const Ie=new $y({objects:[],topology:lt},"初始状态");let sn=null,Sn=nt.nodesVisible,Ar=!0;const IM=12;let wi=nt.gridVisible,si=[],ki=null,hn=null,fd=null,Vi=null,fa=null,Ye=null,Ll="",Xs="",na=0,ne=!1,pa=null;N("#app").innerHTML='<header class="topbar"><div class="brand" aria-label="ANYMAKER builder by BKN"><strong>ANYMAKER</strong><small>builder by BKN</small></div><select id="language-select" data-i18n-aria-label="界面语言"><option value="en">English</option><option value="zh">中文</option></select><span class="status" id="save-status" role="status" data-i18n="正在加载定义…"></span><section class="section top-tool-section"><h2 data-i18n="编辑工具"></h2><div class="tool-grid" id="tools"></div></section><nav class="top-actions"><button id="library-btn" data-i18n="导入本地载具"></button><button id="new-btn" data-i18n="新建"></button><button id="undo-btn" data-i18n="撤销"></button><button id="redo-btn" data-i18n="重做"></button><button id="save-btn" data-i18n="保存工程"></button><button id="load-btn" data-i18n="打开工程"></button><button id="export-btn" class="primary" data-i18n="中间格式 XML"></button></nav></header><main class="workspace" id="workspace"><button id="left-sidebar-toggle" class="sidebar-toggle left-toggle" aria-controls="left-sidebar" aria-expanded="true" aria-keyshortcuts="Tab" data-i18n-title="收起方块库（在视口按 Tab 也可切换）" data-i18n="收起方块库"></button><aside id="left-sidebar" class="sidebar left-sidebar" data-i18n-aria-label="方块库"><details id="catalog-drawer" class="drawer-section" open><summary data-i18n="方块库"></summary><section class="section"><h2><span data-i18n="组件定义"></span> <span id="catalog-count"></span></h2><input class="search" id="component-search" data-i18n-aria-label="搜索组件" data-i18n-placeholder="搜索中文、原始 ID、类别…"><select id="category-filter" data-i18n-aria-label="组件分类"><option value="" data-i18n="全部分类"></option></select><label class="catalog-visibility"><input id="show-building-furniture" type="checkbox"><span data-i18n="显示建材与家具"></span></label><div id="component-list"></div></section></details></aside><div id="left-sidebar-resizer" role="separator" aria-orientation="vertical" aria-controls="left-sidebar" data-i18n-aria-label="调整方块库宽度" aria-valuemin="240" aria-valuemax="720" aria-valuenow="304" tabindex="0"></div><section id="viewport" tabindex="0" data-i18n-aria-label="三维建造视口"><button id="right-sidebar-toggle" class="sidebar-toggle right-toggle" aria-controls="right-sidebar" aria-expanded="false" data-i18n="打开右侧面板"></button><div class="view-controls"><button data-view="iso" data-i18n="等距"></button><button data-view="top" data-i18n="顶视"></button><button data-view="front" data-i18n="前视"></button><button id="fit-btn" data-i18n="聚焦 F"></button></div><div class="hud"><span class="badge" id="object-count"></span><span class="badge" id="vehicle-size"></span><span id="topology-count" hidden></span><span class="badge" id="cursor-pos" data-i18n="工作平面 Y = 0"></span></div></section><aside id="right-sidebar" class="sidebar right-sidebar" data-i18n-aria-label="编辑器面板" hidden><section id="grid-settings" class="section"><h2 data-i18n="工作网格 · 编辑器参数"></h2><p class="status" data-i18n="固定单位网格：1 格 = 8 cm；所有位置均为整数格。"></p><button id="grid-btn" aria-pressed="true" data-i18n="隐藏网格"></button><p class="status"><span data-i18n="左键：当前工具 · 右键拖动：旋转视角"></span><br><span data-i18n="中键：平移 · 滚轮：缩放 · F：聚焦"></span><br><span data-i18n="Shift + 点击连续放置 · Ctrl / ⌘ + Z：撤销"></span></p></section><details class="drawer-section inspector-drawer"><summary data-i18n="选中方块属性"></summary><section class="section"><div id="inspector-content" class="empty"></div></section></details><details class="drawer-section" id="resource-drawer"><summary data-i18n="资源与校验"></summary><section class="section"><h2 data-i18n="资源状态"></h2><p class="status" id="asset-status" data-i18n="尚未导入 Mesh。橙色线框仅是缺失资源标记，不代表游戏尺寸。"></p><button id="mesh-files-btn" class="full" data-i18n="选择 .mesh 文件"></button><p class="status" data-i18n="推荐选择游戏的 rom/meshes 文件夹。只在浏览器读取，不上传、不执行 EXE。仅渲染静态 Mesh，动态部件数量会单独提示。"></p></section><section class="section"><h2 data-i18n="本地原生载具"></h2><button id="native-btn" class="full" data-i18n="选择配套 .data / .meta"></button><p class="status" id="native-summary" data-i18n="选择同名的 .data 与 .meta JSON 文件。浏览器只读取，不上传；确认后才替换当前场景。"></p></section><section class="section"><h2 data-i18n="校验"></h2><div id="validation" class="status"></div></section></details></aside></main><input id="mesh-input" type="file" accept=".mesh" multiple hidden><input id="file-input" type="file" accept=".json" hidden><input id="native-input" type="file" accept=".data,.meta" multiple hidden>';_n(document);const ni=document.createElement("span");ni.id="component-id-tooltip";ni.hidden=!0;document.body.append(ni);const Zi=document.createElement("button");Zi.id="native-export-btn";Zi.className="full";ee(Zi,"导出原生配套文件（未验证）");Zi.disabled=!0;Pi=document.createElement("button");Pi.id="native-import-btn";Pi.className="full";ee(Pi,"导入 .data / .meta 到当前场景");Pi.disabled=!0;const En=document.createElement("select");En.id="native-vehicle-select";En.className="full";En.disabled=!0;En.setAttribute("aria-label",Ht("导入载具范围"));const li=document.createElement("button");li.id="native-reference-preview-btn";li.className="full";li.disabled=!0;li.setAttribute("aria-pressed","false");ee(li,"参考预览");li.dataset.i18nTitle="隐藏编辑辅助并使用黑色背景；仅用于与参考截图进行人工对照，不代表游戏渲染已经匹配";document.querySelector("#native-btn").parentElement.append(En,Pi,li,Zi);const co=document.createElement("section");co.id="connection-settings";co.className="section";co.innerHTML='<h2 data-i18n="连接工具"></h2><label for="connection-kind" data-i18n="连接类型"></label><select id="connection-kind" class="full"><option value="electric" data-i18n="电线"></option><option value="mechanical" data-i18n="机械连接"></option><option value="liquid" data-i18n="液体管线"></option><option value="gas" data-i18n="气体管线"></option><option value="belt" data-i18n="皮带"></option><option value="data" data-i18n="数据线"></option></select><div class="transform-grid connection-ports"><label><span data-i18n="起点端口"></span><input id="connection-from-port" type="number" min="0" max="255" step="1" value="0"></label><label><span data-i18n="终点端口"></span><input id="connection-to-port" type="number" min="0" max="255" step="1" value="0"></label></div><p class="status" data-i18n="连接工具说明"></p>';N("#right-sidebar").insertBefore(co,N("#resource-drawer"));_n(co);const nr=document.createElement("section");nr.id="paint-toolbar";nr.className="context-toolbar";nr.hidden=!0;nr.innerHTML='<strong data-i18n="涂色色板"></strong><div id="paint-quick-colors" class="quick-colors"></div><label><input id="paint-toolbar-color" type="color" value="#bd2636" aria-label="Hex RGB color"><input id="paint-toolbar-hex" type="text" value="#bd2636" maxlength="7" spellcheck="false" aria-label="Hex RGB color"></label><button id="save-paint-quick-color" type="button" data-i18n="保存快捷颜色"></button>';_n(nr);const di=document.createElement("section");di.id="connection-toolbar";di.className="context-toolbar";di.hidden=!0;di.innerHTML='<strong data-i18n="连接类型"></strong><div id="connection-kind-buttons" class="connection-kind-buttons"></div><span class="context-help" data-i18n="点击组件端口作为起点，再点击兼容端口完成连接。"></span>';for(const[n,t]of[["electric","电线"],["mechanical","机械连接"],["liquid","液体管线"],["gas","气体管线"],["belt","皮带"],["data","数据线"]]){const e=document.createElement("button");e.type="button",e.dataset.kind=n,e.dataset.i18n=t,e.addEventListener("click",()=>{N("#connection-kind").value=n,Rd()}),di.querySelector("#connection-kind-buttons").append(e)}_n(di);const qn=N("#workspace");qn.append(nr,di);const Ki=N("#left-sidebar"),yi=N("#left-sidebar-toggle"),$n=N("#left-sidebar-resizer"),Or=N("#right-sidebar"),Mi=N("#right-sidebar-toggle");Or.prepend(N("#resource-drawer"));Or.prepend(N(".inspector-drawer"));const ir=document.createElement("details");ir.id="history-drawer";ir.className="drawer-section";ir.innerHTML='<summary data-i18n="历史记录"></summary><section class="section"><p class="status" data-i18n="最近 50 次已提交操作。选择任一项即可恢复到该状态。"></p><div id="history-list" class="history-list"></div></section>';_n(ir);Or.insertBefore(ir,N("#grid-settings"));const qs={min:240,max:720,viewport:360};let Ti=nt.leftWidth,ma=!1;qn.prepend(N(".top-tool-section"));N("#export-btn").className="full";N("#resource-drawer").append(N("#export-btn"));N("#save-btn").classList.add("primary");for(const n of[yi,Mi])n.removeAttribute("data-i18n");function Il(){const n=Or.hidden?0:304;return Math.max(qs.min,Math.min(qs.max,qn.clientWidth-n-qs.viewport-8))}function Ca(n){Ti=Math.round(Math.min(Il(),Math.max(qs.min,n))),qn.style.setProperty("--left-sidebar-width",Ki.hidden?"0px":Ti+"px"),$n.setAttribute("aria-valuenow",String(Ti)),$n.setAttribute("aria-valuemax",String(Il())),De()}function pd(n,{focusToggle:t=!1}={}){Ki.hidden=n,$n.hidden=n,qn.style.setProperty("--left-sidebar-width",n?"0px":Ti+"px"),qn.style.setProperty("--left-resizer-width",n?"0px":"8px"),yi.textContent=n?"›":"‹",yi.dataset.i18nTitle=n?"展开方块库（在视口按 Tab 也可切换）":"收起方块库（在视口按 Tab 也可切换）",yi.dataset.i18nAriaLabel=n?"展开方块库":"收起方块库",_n(yi),yi.setAttribute("aria-expanded",String(!n)),t&&yi.focus({preventScroll:!0}),De()}function Nf(n){Or.hidden=!n,qn.classList.toggle("right-sidebar-open",n),Mi.textContent=n?"›":"‹",Mi.dataset.i18nAriaLabel=n?"收起右侧面板":"打开右侧面板",Mi.dataset.i18nTitle=Mi.dataset.i18nAriaLabel,_n(Mi),Mi.setAttribute("aria-expanded",String(n)),De(),requestAnimationFrame(()=>{Ca(Ti),Id()})}yi.onclick=()=>pd(!Ki.hidden);Mi.onclick=()=>Nf(Or.hidden);$n.addEventListener("pointerdown",n=>{n.button!==0||n.pointerType!=="mouse"||(n.preventDefault(),n.stopPropagation(),ma=!0,qn.classList.add("is-resizing"),$n.setPointerCapture(n.pointerId))});$n.addEventListener("pointermove",n=>{if(!ma)return;const t=qn.getBoundingClientRect();Ca(n.clientX-t.left)});function Uf(n){ma&&(ma=!1,qn.classList.remove("is-resizing"),$n.hasPointerCapture(n.pointerId)&&$n.releasePointerCapture(n.pointerId))}$n.addEventListener("pointerup",Uf);$n.addEventListener("pointercancel",Uf);$n.addEventListener("keydown",n=>{const t=n.key==="ArrowLeft"?Ti-16:n.key==="ArrowRight"?Ti+16:n.key==="Home"?qs.min:n.key==="End"?Il():null;t!==null&&(n.preventDefault(),Ca(t))});new ResizeObserver(()=>{Ki.hidden||Ca(Ti)}).observe(qn);const Of=[["select","选择","V"],["place","放置","P"],["erase","删除","E"],["translate","移动","G"],["rotate","旋转","R"],["scale","缩放","S"],["node","节点","N"],["beam","梁","B"],["split","切分梁","I"],["plate","面板","L"],["glass","玻璃","J"],["connect","连接","K"],["paint","涂色","C"],["hide","透明化","H"]];for(const[n,t,e]of Of){const i=document.createElement("button");i.className="tool",i.dataset.tool=n;const r={select:"↖",place:"＋",erase:"⌫",translate:"✥",rotate:"⟳",scale:"⤢",node:"●",beam:"／",split:"✂",plate:"◇",glass:"◫",connect:"⌁",paint:"◈",hide:"◌"};i.innerHTML='<span class="tool-icon">'+r[n]+'</span><span class="tool-label" data-i18n="'+t+'"></span><kbd>'+e+"</kbd>",i.dataset.i18nTitle=t,_n(i),i.addEventListener("click",()=>tr(n)),N("#tools").append(i)}const NM=[["copy-action","⧉","复制选中"],["mirror-action","⇋","镜像 X"],["split-action","⌘","拆分子网格"],["merge-action","⊕","合并子网格"]],Ff=N("#tools");for(const[n,t,e]of NM){const i=document.createElement("button");i.id=n,i.className="icon-action",i.dataset.i18nTitle=e,i.dataset.i18nAriaLabel=e,i.textContent=t,_n(i),Ff.append(i)}const hi=document.createElement("button");hi.id="restore-transparency";hi.className="transparency-reset";hi.hidden=!0;hi.dataset.i18n="取消透明化";hi.dataset.i18nTitle="取消透明化";hi.dataset.i18nAriaLabel="取消透明化";_n(hi);Ff.append(hi);const pn=N("#viewport"),Xe=new jm;Xe.background=new jt(nt.backgroundColor);const Ms=new Gn;Ms.name="interaction-highlights";Xe.add(Ms);const md=new bn(45,1,.005,2e3),gd=new Kl(-1,1,1,-1,.005,2e3);let Ft=md;Ft.position.set(2.5,2.2,3);gd.position.copy(Ft.position);Xe.add(md,gd);const Ji=new eg(16777215,nt.cameraLightIntensity,40,br.degToRad(52),.78,.35),no=new xe;Ji.name="editor-camera-light";Ji.castShadow=!1;Ji.position.set(0,0,0);no.position.set(0,0,-1);Ji.target=no;Ft.add(Ji,no);let Ue;try{Ue=new Gx({antialias:!0,alpha:!0,logarithmicDepthBuffer:!0})}catch{throw ee(pn,"无法初始化 WebGL2。请启用硬件加速或更换浏览器。"),new Error("WebGL2 unavailable")}Ue.setPixelRatio(Math.min(devicePixelRatio,2));Ue.shadowMap.enabled=!0;Ue.shadowMap.type=gu;pn.append(Ue.domElement);const we=new Xx(Ft,Ue.domElement);we.mouseButtons={LEFT:null,MIDDLE:Gi.PAN,RIGHT:Gi.ROTATE};we.enableDamping=!0;we.target.set(0,.2,0);const ie=new ry(Ft,Ue.domElement);ie.setSize(.75);Xe.add(ie.getHelper());ie.addEventListener("dragging-changed",n=>{if(we.enabled=!n.value,n.value){ud=!0;const t=ie.object?.userData?.topology==="node"?ie.object.userData.nodeId:null;Vi=t&&Nt==="translate"?{nodeId:t}:null;return}if(Vi){const{nodeId:t}=Vi;Vi=null;try{const e=Ri(ie.object?.position);if(!e)throw new Error("节点位置超出整数格范围");const i=pf(lt,t,e);fn(i,i.merged?"已移动并合并节点":"已移动节点"),ga(i.idMap[t]||t)}catch(e){In("移动节点失败：{error}",e)}}else Fn(),Li()});ie.addEventListener("objectChange",()=>{!Vi||ie.object?.userData?.nodeId!==Vi.nodeId||zM(Vi.nodeId,ie.object.position)});const zf=new Qm(12969215,2504782,1.1);Xe.add(zf);const us=new ig(16777215,nt.lightIntensity);us.castShadow=!0;us.shadow.mapSize.set(2048,2048);Xe.add(us);function UM(n){Ji.removeFromParent(),no.removeFromParent(),n.add(Ji,no)}function Bf(){const n=br.degToRad(nt.lightAzimuth),t=br.degToRad(nt.lightElevation),e=8;us.position.set(Math.cos(t)*Math.cos(n)*e,Math.sin(t)*e,Math.cos(t)*Math.sin(n)*e),us.intensity=nt.lightIntensity,us.shadow.radius=nt.lightSoftness,zf.intensity=Math.max(.05,1.35-nt.shadowStrength*1.05),Ji.intensity=nt.cameraLightEnabled?nt.cameraLightIntensity:0}Bf();const Fr=new sg(Mf,nM,4351872,2110277);Fr.position.set(-ye/2,-.002,-ye/2);Xe.add(Fr);const Qe=new Gn;Qe.name="topology-overlay";Xe.add(Qe);const Rr=new Gn;Rr.name="connection-ports";Xe.add(Rr);const ii={node:new ai({color:nt.nodeColor,transparent:nt.nodeOpacity<1,opacity:nt.nodeOpacity,depthTest:!0,depthWrite:!1}),nodeSelected:new ai({color:14776349,transparent:nt.nodeOpacity<1,opacity:nt.nodeOpacity,depthTest:!0,depthWrite:!1}),edge:new Er({color:Cl,metalness:.05,roughness:.85}),plate:new Er({color:Cl,metalness:.05,roughness:.85,side:Je,depthTest:!0,depthWrite:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})},mn=new ku;mn.params.Line.threshold=.06;const bs=new Lt,kf=new ti(new w(0,1,0),0),Cr=Tf(new w,new w,new Er({color:Cl,transparent:!0,opacity:.5,depthWrite:!1}),{outlined:nt.beamOutlinesVisible}),Pr=fM(pn,()=>Ft),io=pM(pn,()=>Ft);let fs=nt.beamAxisSnap,ro=null,lo=!1;const Dr=new st(new Ur(.07,12,8),new ai({color:14124580,depthTest:!1}));Dr.visible=!1;Dr.renderOrder=3;Xe.add(Cr,Dr);const Di=document.createElement("span");Di.id="build-status";Di.className="badge";Di.hidden=!0;N(".hud").append(Di);function OM(n){return new jt(ad(n))}function Pc(n,t,e,i=Je,{depthWrite:r=!0}={}){if(typeof n!="string"&&!Number.isInteger(t)&&i===Je&&r)return e;const s=new Er({color:typeof n=="string"?n:Number.isInteger(t)?OM(t):e.color,metalness:.05,roughness:.85,side:i,depthTest:!0,depthWrite:r,polygonOffset:i!==Je,polygonOffsetFactor:-1,polygonOffsetUnits:-1});return s.userData.topologyPaint=!0,s}const hu=.001;function FM(n){return n+(n<0?-hu:hu)}function Hf(n,t,e=ye/2){const i=n.map(o=>t.get(o)),r=new w;for(let o=1;o<i.length-1&&r.lengthSq()===0;o++)for(let a=o+1;a<i.length&&(r.copy(i[o]).sub(i[0]).cross(i[a].clone().sub(i[0])),!(r.lengthSq()>0));a++);r.normalize().multiplyScalar(FM(e));const s=[];for(let o=1;o<i.length-1;o++)for(const a of[i[0],i[o],i[o+1]])s.push(...a.clone().add(r).toArray());return s}function Vf(n=Qe){const t=new Set;n.traverse(e=>{e.geometry?.dispose();for(const i of Array.isArray(e.material)?e.material:[e.material])(i?.userData?.topologyPaint||i?.userData?.topologyLink||i?.userData?.topologyOutline)&&!t.has(i)&&(t.add(i),i.dispose())}),n.clear()}function Pa(n,t=new Map){const e=new Gn;try{const i=new Map(n.nodes.map(r=>[r.id,r]));for(const r of n.nodes){const s=new st(new Ur(.055,10,8),ii.node);s.position.set(r.position.x,r.position.y,r.position.z),s.userData.topology="node",s.userData.nodeId=r.id,s.visible=Sn&&Ar&&!ne,s.renderOrder=2,e.add(s)}for(const r of n.edges){const s=Tf(i.get(r.a).position,i.get(r.b).position,Pc(r.color,r.col,ii.edge),{outlined:nt.beamOutlinesVisible});s.userData.topology="edge",s.userData.edgeId=r.id,s.castShadow=!0,s.receiveShadow=!0,s.renderOrder=1,s.visible=!r.hidden,e.add(s)}for(const[r,s]of n.plates.entries()){const o=new Map(n.nodes.map(u=>[u.id,new w(u.position.x,u.position.y,u.position.z)])),a=s.normalOffset??ye/2,c=Hf(s.nodeIds,o,a),l=new Ne;l.setAttribute("position",new de(c,3)),l.computeVertexNormals();const d=typeof s.color_front=="string"||typeof s.color_back=="string"||Number.isInteger(s.col_front)||Number.isInteger(s.col_back);d&&(l.addGroup(0,c.length/3,0),l.addGroup(0,c.length/3,1));let h=d?[Pc(s.color_front,s.col_front,ii.plate,Ai),Pc(s.color_back,s.col_back,ii.plate,on)]:ii.plate.clone();for(const u of Array.isArray(h)?h:[h])u.userData.topologyPaint=!0,u.polygonOffset=!0,u.polygonOffsetFactor=-1,u.polygonOffsetUnits=-(r+1);if(cu(s))for(const u of Array.isArray(h)?h:[h])u.transparent=!0,u.opacity=.42,u.depthTest=!0,u.depthWrite=!1;const f=new st(l,h);f.userData.topology="plate",f.userData.plateId=s.id,f.userData.nodeIds=[...s.nodeIds],f.userData.normalOffset=a,f.visible=!s.hidden,f.renderOrder=cu(s)?4:2,e.add(f)}for(const r of n.links||[]){const s=t.get(r.from.componentId),o=t.get(r.to.componentId);if(!s||!o)continue;const a=[s,...r.points||[],o].map(h=>new w(h.x,h.y,h.z)),c={electric:{radius:.012,radialSegments:8},mechanical:{radius:.022,radialSegments:8},liquid:{radius:.02,radialSegments:10},gas:{radius:.018,radialSegments:10},belt:{radius:.028,radialSegments:4},data:{radius:.01,radialSegments:8}}[r.kind],l=new Er({color:uf[r.kind],metalness:.1,roughness:.6,transparent:!0,opacity:.92,depthTest:!0,depthWrite:!1});l.userData.topologyLink=!0;const d=cM(a,l,c);d.renderOrder=4,d.userData.topology="link",d.userData.linkId=r.id,d.traverse(h=>{h.userData.topology="link",h.userData.linkId=r.id}),e.add(d)}return e}catch(i){throw Vf(e),i}}function Gf(n){return Qe.children.find(t=>t.userData.topology==="node"&&t.userData.nodeId===n)||null}function zM(n,t){const e=new w(t.x,t.y,t.z),i=new Map(lt.nodes.map(r=>[r.id,new w(r.position.x,r.position.y,r.position.z)]));i.set(n,e);for(const r of Qe.children){if(r.userData.topology==="node"&&r.userData.nodeId===n&&r.position.copy(e),r.userData.topology==="edge"){const s=lt.edges.find(o=>o.id===r.userData.edgeId);s&&!r.userData.topologyJunction&&rd(r,i.get(s.a),i.get(s.b)),r.userData.topologyJunction&&r.userData.nodeId===n&&r.position.copy(e)}if(r.userData.topology==="plate"){const s=r.userData.nodeIds,o=Hf(s,i,r.userData.normalOffset),a=r.geometry.getAttribute("position");a.count===o.length/3?a.set(o):r.geometry.setAttribute("position",new de(o,3)),r.geometry.getAttribute("position").needsUpdate=!0,r.geometry.computeVertexNormals()}}Qe.updateMatrixWorld(!0)}function zr(){for(const n of Qe.children){if(n.userData.topology!=="node")continue;const t=n.userData.nodeId===hn;n.material=t?ii.nodeSelected:ii.node,n.scale.setScalar((t?1.75:1)*(nt.nodeSize/.055)),n.visible=Sn&&Ar&&!ne}}function Da(n){Vf(),Qe.add(...n.children),Qe.updateMatrixWorld(!0),zr(),io.setBeams(lt.nodes,lt.edges),io.setVisible(!ne&&nt.beamLengthsVisible)}function BM(){const t=Ft.position.distanceTo(we.target)/(Ft.isOrthographicCamera?Math.max(Ft.zoom,.001):1)<=IM;t!==Ar&&(Ar=t,Fr.visible=wi&&!ne&&t,zr())}function Lr(){ie.object?.userData?.topology==="node"&&ie.detach(),hn=null,fd=null,Vi=null,zr()}function ga(n){const t=lt.nodes.find(e=>e.id===n);if(!t)return!1;if(Ve=null,Ge.clear(),hn=t.id,fd=Aa(Ft,new w(t.position.x,t.position.y,t.position.z)),zr(),Nt==="translate"){const e=Gf(t.id);e&&(ie.setMode("translate"),ie.attach(e))}return Li(),!0}function La(){sn=null,ro=null,Cr.visible=!1,Dr.visible=!1,Pr.hide(),ee(Di,"梁 1 格 · 点击起点")}function _d(){La(),Lr(),si=[],ki=null,Qi()}function Vt(n,t={}){ee(N("#save-status"),n,t)}function In(n,t){Vt(n,()=>({error:Ht(t.message)}))}function Nl(n){return(Ci()==="zh"?n.name_zh||n.name:n.name||n.name_zh)||n.id}function Ul(n){return Ci()==="zh"?od(n).label:n}function Dc(){ni.hidden=!0}function uu(n){ni.textContent=n.dataset.id||"",ni.hidden=!1;const t=n.getBoundingClientRect(),e=ni.offsetWidth;ni.style.left=Math.max(12,Math.min(window.innerWidth-e-12,t.left+t.width/2-e/2))+"px",ni.style.top=Math.max(8,t.top-ni.offsetHeight-7)+"px"}function ho(){return Pe.filter(n=>Ge.has(n.userData.id))}function uo(){return ho().map(n=>n.userData.id)}function kM(){Rr.traverse(n=>{n.geometry?.dispose(),n.material?.dispose()}),Rr.clear()}function Qi(){if(kM(),Nt!=="connect"||ne){N("#viewport").dataset.connectionPortCount="0";return}const n=N("#connection-kind").value,t=uf[n],e=i=>{const s=(Array.isArray(i?.logic_nodes)?i.logic_nodes:[]).map((o,a)=>({...o,port:a})).filter(o=>o.type===n||n==="mechanical"&&typeof o.type=="string"&&o.type.startsWith("mechanical_"));return s.length||n!=="mechanical"?s:(i?.surfaces||[]).map((o,a)=>({...o,port:a})).filter(o=>typeof o.type=="string"&&o.type.startsWith("torque"))};for(const i of Pe){if(!i.visible)continue;const r=e(Ra.get(i.userData.type));r.length&&(i.updateWorldMatrix(!0,!1),r.forEach(s=>{const o=Array.isArray(s.pos)&&s.pos.length===3?s.pos:[0,0,0];if(!o.every(Number.isFinite))return;const a=s.port,c=new st(new Ur(.055,10,8),new ai({color:t,transparent:nt.nodeOpacity<1,opacity:nt.nodeOpacity,depthTest:!1,depthWrite:!1}));c.position.set(o[0]*ye,o[1]*ye,o[2]*ye),i.localToWorld(c.position),c.scale.setScalar(nt.nodeSize/.055),c.renderOrder=7,c.userData.connectionPort={componentId:i.userData.id,port:a,type:s.type||"surface"},Rr.add(c)}))}N("#viewport").dataset.connectionPortCount=String(Rr.children.length)}function HM(){return mn.intersectObjects(Rr.children,!0)[0]?.object.userData.connectionPort||null}function VM(){Ms.traverse(n=>{n.geometry?.dispose(),n.material?.dispose()}),Ms.clear()}function Ia(n=pa){if(VM(),!["select","erase"].includes(Nt)||ne){N("#viewport").dataset.interactionHighlightCount="0";return}const t=(e,i)=>{if(!e)return;const r=new og(e,i);r.material.depthTest=!1,r.material.transparent=!0,r.material.opacity=.9,r.renderOrder=8,Ms.add(r)};if(Nt==="select")for(const e of ho())t(e,2590709);t(n,Nt==="erase"?15026253:15770153),N("#viewport").dataset.interactionHighlightCount=String(Ms.children.length)}function tr(n){if(!Kt){if(Nt=n,De(),document.querySelectorAll(".tool").forEach(t=>t.classList.toggle("active",t.dataset.tool===Nt)),nr.hidden=n!=="paint"||ne,di.hidden=n!=="connect"||ne,ie.detach(),n!=="place"?YM():fa&&lo&&Yf(fa),n!=="beam"&&La(),Di.hidden=n!=="beam",n==="beam"&&!sn&&ee(Di,"梁 1 格 · 点击起点"),["plate","glass"].includes(n)||(si=[]),n!=="connect"&&(ki=null),["node","translate"].includes(n)||Lr(),Ve&&Ge.size===1&&["translate","rotate","scale"].includes(Nt))ie.setMode(Nt),ie.attach(Ve);else if(Nt==="translate"&&hn){const t=Gf(hn);t&&(ie.setMode("translate"),ie.attach(t))}Qi(),Ia()}}function GM(){ie.setTranslationSnap(ye),ie.setRotationSnap(Math.PI/2),ie.setScaleSnap(null)}function Ss(n,{toggle:t=!1}={}){if(Lr(),!n)Ve=null,Ge.clear();else if(t){const e=n.userData.id;Ge.has(e)?Ge.delete(e):Ge.add(e),Ve=Ge.has(e)?n:ho()[0]||null}else Ve=n,Ge=new Set([n.userData.id]);tr(Nt),Ia(),Li()}function gn(){return Pe.map(n=>({id:n.userData.id,type:n.userData.type,...n.userData.gridId?{gridId:n.userData.gridId}:{},...n.userData.mirror?{mirror:{...n.userData.mirror}}:{},...Array.isArray(n.userData.colors)?{colors:[...n.userData.colors]}:{},...n.userData.hidden?{hidden:!0}:{},...Array.isArray(n.userData.nativeExtension)?{nativeExtension:[...n.userData.nativeExtension]}:{},position:Ce(n.position,"组件位置"),rotation:Object.fromEntries($i.map(t=>[t,n.rotation[t]])),scale:Object.fromEntries($i.map(t=>[t,Math.abs(n.scale[t])]))}))}function Fn(n="编辑",t={}){if(Ve){const e=Ri(Ve.position);if(!e)throw new Error("组件位置超出整数格范围");Ve.position.set(e.x,e.y,e.z),$i.forEach(i=>{const r=Math.sign(Ve.scale[i])||1;Ve.scale[i]=r*br.clamp(Math.abs(Ve.scale[i]),.001,100)})}Ie.commit(Pd(),{key:n,params:t}),lt.links?.length&&Da(Pa(lt,new Map(gn().map(e=>[e.id,e.position])))),er()}function WM(){const n=new jn;let t=!1;for(const e of Pe){const i=new jn().setFromObject(e);i.isEmpty()||(n.union(i),t=!0)}for(const e of lt.nodes)n.expandByPoint(new w(e.position.x,e.position.y,e.position.z)),t=!0;return t?Object.fromEntries($i.map(e=>{const i=Math.max(0,Math.ceil(n.max[e]/ye)-Math.floor(n.min[e]/ye));return[e,{cells:i,cm:i*8}]})):null}function Wf(){let n=N("#vehicle-size");if(n)return n;const t=N(".hud");if(!t)return null;n=document.createElement("span"),n.id="vehicle-size",n.className="badge";const e=N("#cursor-pos");return t.insertBefore(n,e||null),n}function XM(){const n=N("#history-list");n.replaceChildren();const t=Math.max(0,Ie.entries.length-50);for(let e=Ie.entries.length-1;e>=t;e--){const i=document.createElement("button");i.type="button",i.className="history-entry";const r=Ie.labels[e],s=r&&typeof r=="object"?Ht(r.key,r.params):Ht(r||"编辑");i.textContent=`${e+1}. ${s}`,i.title=Ht("恢复此状态"),i.setAttribute("aria-label",`${Ht("恢复此状态")} · ${i.textContent}`),i.setAttribute("aria-current",String(e===Ie.cursor)),i.disabled=Kt||e===Ie.cursor,i.onclick=()=>tb(e),n.append(i)}}function er(){ee(N("#object-count"),"{count} 个组件",{count:Pe.length});const n=(lt.links||[]).length;ee(N("#topology-count"),n?"{nodes} 节点 · {edges} 梁 · {plates} 面板 · {links} 连接":"{nodes} 节点 · {edges} 梁 · {plates} 面板",{nodes:lt.nodes.length,edges:lt.edges.length,plates:lt.plates.length,links:n});const t=WM(),e=Wf();e&&(t?e.textContent=`${Ht("载具尺寸")}: ${$i.map(r=>Ht("{axis} {cells} 格 / {cm} cm",{axis:r.toUpperCase(),...t[r]})).join(" · ")}`:e.textContent=`${Ht("载具尺寸")}: ${Ht("空载具")}`,e.dataset.topologyCount=`${lt.nodes.length}/${lt.edges.length}/${lt.plates.length}/${(lt.links||[]).length}`),N("#undo-btn").disabled=Kt||Ie.cursor===0,N("#redo-btn").disabled=Kt||Ie.cursor===Ie.entries.length-1;const i=Pe.filter(r=>r.userData.visual!=="mesh").length;ee(N("#validation"),"{geometry} 连接拓扑、占用规则、动态装配和游戏文件兼容性尚未验证。",()=>({geometry:i?Ht("{count} 个组件没有真实 Mesh。",{count:i}):Ht("静态几何已加载。")})),XM(),jM()}function jM(){const n=Pe.some(t=>t.userData.hidden)||lt.edges.some(t=>t.hidden)||lt.plates.some(t=>t.hidden);hi.hidden=!n}async function qe(n){if(!Kt){Kt=!0,ie.enabled=!1,er();try{await n()}catch(t){In("操作失败：{error}",t)}finally{Kt=!1,ie.enabled=!0,tr(Nt),er()}}}async function Xf(n){const t=await We.definition(n.type);Ra.set(n.type,t);const e=await hd.instantiate(t,{nativeExtension:n.nativeExtension});e.userData={...e.userData,id:n.id,type:n.type,gridId:n.gridId,mirror:n.mirror,colors:n.colors,nativeExtension:n.nativeExtension,hidden:n.hidden===!0},Number.isInteger(n.colors?.[0])&&e.traverse(i=>{if(i.isMesh&&!i.userData.source?.includes("/car_wheel"))for(const r of Array.isArray(i.material)?i.material:[i.material])r.color.set(ad(n.colors[0]))});for(const i of["position","rotation","scale"])e[i].set(...$i.map(r=>n[i][r]));return n.mirror?.axis&&wy(e,n.mirror.axis),e.visible=!n.hidden,e}function jf(){Ye&&(Xe.remove(Ye),ca(Ye),Ye=null,Ll="")}function YM(){na++,Xs="",jf()}function fu(n){if(!Ye||!n)return;Ye.position.set(n.x,0,n.z),Ye.updateMatrixWorld(!0);const t=new jn().setFromObject(Ye);Ye.position.y=Rs(Math.ceil((n.y-t.min.y)/ye)),Ye.visible=!0,Ye.updateMatrixWorld(!0)}function qM(n){return n.traverse(t=>{if(!t.isMesh)return;const i=(Array.isArray(t.material)?t.material:[t.material]).map(r=>{const s=r.clone();return s.transparent=!0,s.opacity=Math.min(s.opacity,.35),s.depthWrite=!1,s.needsUpdate=!0,s});t.material=Array.isArray(t.material)?i:i[0],t.castShadow=!1,t.receiveShadow=!1,t.renderOrder=1}),n}async function Yf(n){if(Nt!=="place"||!n||!We.has(wn)){Ye&&(Ye.visible=!1);return}if(Ye&&Ll===wn){fu(n);return}if(Xs===wn)return;const t=wn,e=++na;Xs=t,jf();try{const i=await We.definition(t),r=qM(await hd.instantiate(i));if(e!==na||Nt!=="place"||t!==wn){ca(r);return}Xs="",Ye=r,Ll=t,Xe.add(r),fu(fa||n)}catch(i){e===na&&(Xs="",In("放置虚影加载失败：{error}",i))}}async function Zn(n,t=lt){ne&&Md(!1);const e=ys(wa(n,t),We.index),i=[];let r;try{await Promise.all([...new Set(e.objects.map(s=>s.type))].map(async s=>{const o=await We.definition(s);Ra.set(s,o)})),i.push(...await Promise.all(e.objects.map(s=>Xf(s)))),r=Pa(e.topology,new Map(e.objects.map(s=>[s.id,s.position])))}catch(s){throw i.forEach(ca),s}_d(),ie.detach(),Ve=null,Ge.clear(),Pe.forEach(s=>{Xe.remove(s),ca(s)}),Pe=i,Pe.forEach(s=>Xe.add(s)),lt=e.topology,Da(r),Qi(),Li(),er()}async function $M(n){if(!We.has(wn))throw new Error("请先选择组件");if(Pe.length>=Al)throw new Error("达到组件上限");const t=await Xf({id:crypto.randomUUID(),type:wn,gridId:"grid-1",position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1}}),e=Ri(n);if(!e)throw new Error("放置位置超出整数格范围");const i=new jn().setFromObject(t);t.position.set(e.x,Rs(Math.ceil((e.y-i.min.y)/ye)),e.z),Xe.add(t),Pe.push(t),Ss(t),Fn("放置组件"),Li(),Vt(t.userData.visual==="mesh"?"已放置真实静态 Mesh":"已放置缺失资源标记")}async function _a(n){if(!n)return;const t=Ge.has(n.userData.id)?uo():[n.userData.id],e=Jy(gn(),t);await Zn(e.objects,{...lt,links:(lt.links||[]).filter(i=>!t.includes(i.from.componentId)&&!t.includes(i.to.componentId))}),Ss(null),Fn("删除组件"),Vt("已删除 {count} 个组件",{count:e.removed.length})}async function Na(n,t,e,i={}){await Zn(n.objects,lt);const r=new Set(t||[]),s=Pe.filter(o=>r.has(o.userData.id));Ge=new Set(s.map(o=>o.userData.id)),Ve=s[0]||null,tr(Nt),Li(),Fn(e,i),Vt(e,i)}function ZM(){!Ge.size||Kt||qe(async()=>{const n=Ky(gn(),uo(),{x:ye,y:0,z:0});await Na(n,n.created,"已复制 {count} 个组件",{count:n.created.length})})}function KM(){!Ge.size||Kt||qe(async()=>{const n=Qy(gn(),uo(),{axis:"x",offset:0});await Na(n,n.created,"已镜像 {count} 个组件（X 平面）",{count:n.created.length})})}function JM(){if(!Ge.size||Kt)return;const n=prompt(Ht("新子网格 ID"),`grid-${yf(gn()).length+1}`);n&&qe(async()=>{const t=uo(),e=tM(gn(),t,n);await Na(e,t,"已将 {count} 个组件拆分到子网格 {gridId}",{count:e.changed,gridId:n})})}function QM(){Kt||!Pe.length||qe(async()=>{const n=gn(),t=yf(n);if(!t.length)throw new Error("当前工程尚未建立子网格");const e=eM(n,t,"grid-1");await Na(e,uo(),"已合并子网格")})}N("#copy-action").onclick=ZM;N("#mirror-action").onclick=KM;N("#split-action").onclick=JM;N("#merge-action").onclick=QM;hi.onclick=()=>{Kt||qe(sb)};function qf(){_d();const n=Ie.peekUndo();n&&qe(async()=>{await Zn(n.objects,n.topology),Ie.cursor--,Vt("已撤销")})}function Ol(){const n=Ie.peekRedo();n&&qe(async()=>{await Zn(n.objects,n.topology),Ie.cursor++,Vt("已重做")})}function tb(n){if(Kt||!Number.isInteger(n)||n<0||n>=Ie.entries.length||n===Ie.cursor)return;const t=structuredClone(Ie.entries[n]);qe(async()=>{await Zn(t.objects,t.topology),Ie.cursor=n,Vt("已恢复历史记录")})}function Li(){const n=N("#inspector-content");if(n.replaceChildren(),!Ve){n.textContent=Ht("选择组件查看属性。按住 Shift 点击可多选。");return}if(Ge.size>1){const l=document.createElement("strong");l.textContent=Ht("已选择 {count} 个组件",{count:Ge.size}),n.append(l);const d=document.createElement("p");d.className="status",d.textContent=Ht("可批量复制、镜像、拆分或删除。批量变换和框选尚未实现。"),n.append(d);const h=document.createElement("button");h.className="full",h.textContent=Ht("删除已选组件"),h.id="delete-selected",h.onclick=()=>qe(async()=>{await _a(Ve)}),n.append(h);return}const t=Ve,e=Ra.get(t.userData.type),i=document.createElement("strong");i.textContent=Nl(e),n.append(i);const r=document.createElement("p");r.className="status",r.textContent=e.id+" · "+Ht("资源诊断：{reason}",{reason:Ht(t.userData.reason||"")})+(t.userData.vertices?" · "+Ht("{vertices} 顶点 / {triangles} 三角形",{vertices:t.userData.vertices,triangles:t.userData.triangles}):"")+" · "+Ht("子网格 {gridId} · 动态部件 {count}（按需装配）",{gridId:t.userData.gridId||Ht("未分配"),count:e.meshes_dynamic?.length||0}),n.append(r);for(const[l,d]of[["position","位置（格；1 格 = 8 cm）"],["rotation","旋转 °"],["scale","缩放比例"]]){const h=document.createElement("div");h.className="property";const f=document.createElement("span");f.textContent=Ht(d),h.append(f);const u=document.createElement("div");u.className="transform-grid";for(const g of $i){const _=document.createElement("label");_.textContent=g.toUpperCase();const m=document.createElement("input");m.type="number",m.step=l==="position"?"1":l==="rotation"?"90":".01",m.dataset.field=l,m.dataset.axis=g,m.setAttribute("aria-label",l+"-"+g);const p=l==="position"?ci(t.position[g]):l==="rotation"?br.radToDeg(t[l][g]):t[l][g];m.value=l==="position"?String(p):Number(p).toFixed(4),m.addEventListener("change",()=>{const b=Number(m.value);if(Kt||!m.value.trim()||!Number.isFinite(b)||Math.abs(b)>1e4||l==="position"&&!Number.isInteger(b)||l==="scale"&&(b<=0||b>100)){Vt("输入超出合法范围"),Li();return}t[l][g]=l==="position"?Rs(b):l==="rotation"?br.degToRad(b):b,Fn(),Li()}),_.append(m),u.append(_)}h.append(u),n.append(h)}const s=document.createElement("details"),o=document.createElement("summary");o.textContent=Ht("原始定义 / 端口 / 动态部件"),s.append(o);const a=document.createElement("pre");a.textContent=JSON.stringify(e,null,2),s.append(a),n.append(s);const c=document.createElement("button");c.className="full",c.textContent=Ht("删除组件"),c.id="delete-selected",c.onclick=()=>qe(async()=>{await _a(t)}),n.append(c)}function Br(){Dc();const n=N("#component-search").value.trim().toLowerCase(),t=N("#category-filter").value,e=new Set(["building","furniture"]),i=N("#show-building-furniture").checked,r=N("#component-list");r.replaceChildren();const s=[...We.entries()].filter(o=>(i||!e.has(o.category))&&(!t||o.category===t)&&[o.id,o.name,o.name_zh,o.category,od(o.category).label].join(" ").toLowerCase().includes(n));N("#catalog-count").textContent=s.length+" / "+We.index.size;for(const o of s){const a=document.createElement("button");a.className="component",a.dataset.id=o.id,a.dataset.category=o.category,a.classList.toggle("active",wn===o.id),a.setAttribute("aria-pressed",String(wn===o.id));const c=Nl(o);a.title=c+`
`+o.id+" · "+Ul(o.category),a.setAttribute("aria-label",c+" · "+o.id+" · "+Ul(o.category));const l=document.createElement("span");l.className="component-name",l.textContent=c;const d=document.createElement("code");d.className="component-id",d.textContent=o.id,a.append(SM(o.category),l,d),a.addEventListener("mouseenter",()=>uu(a)),a.addEventListener("mouseleave",Dc),a.addEventListener("focus",()=>uu(a)),a.addEventListener("blur",Dc),a.onclick=()=>{Kt||(wn=o.id,tr("place"),Br(),Vt("准备放置：{name}",()=>({name:Nl(o)})))},r.append(a)}if(!s.length){const o=document.createElement("p");o.className="catalog-empty",o.textContent=Ht("没有匹配组件，试试其他名称或分类。"),r.append(o)}}function Ua(){for(const n of N("#category-filter").options)n.value&&(n.hidden=!N("#show-building-furniture").checked&&["building","furniture"].includes(n.value),n.textContent=Ul(n.value)+(Ci()==="zh"?" · "+n.value:""));N("#category-filter").selectedOptions[0]?.hidden&&(N("#category-filter").value="")}async function eb(){const n=await We.load();wn=We.has("engine")?"engine":We.index.keys().next().value;for(const t of[...new Set(n.definitions.map(e=>e.category))].sort()){const e=document.createElement("option");e.value=t,N("#category-filter").append(e)}Ua(),Br(),Vt("已加载 {count} 条组件索引，详情按需读取",{count:We.index.size})}function vd(n){const t=Ue.domElement.getBoundingClientRect();bs.set((n.clientX-t.left)/t.width*2-1,-(n.clientY-t.top)/t.height*2+1),mn.setFromCamera(bs,Ft)}function $f(){const n=[...Pe.filter(t=>t.visible),...Qe.children.filter(t=>t.visible&&t.userData.topology!=="node")];return iM(mn,n,kf)}function va(){const n=Ue.domElement.getBoundingClientRect();let t=null,e=56;for(const r of Pe){if(!r.visible)continue;const s=r.getWorldPosition(new w).project(Ft);if(s.z<-1||s.z>1)continue;const o=Math.hypot((s.x-bs.x)*n.width/2,(s.y-bs.y)*n.height/2);o<e&&(t=r,e=o)}if(t)return t;let i=mn.intersectObjects(Pe.filter(r=>r.visible),!0)[0]?.object;for(;i&&!Pe.includes(i);)i=i.parent;return i||null}function Es(n=!1){if((!Sn||!Ar)&&!n)return null;const t=Ue.domElement.getBoundingClientRect();let e=null,i=14,r=1/0;for(const s of lt.nodes){const o=new w(s.position.x,s.position.y,s.position.z),a=o.clone().project(Ft);if(a.z<-1||a.z>1)continue;const c=Math.hypot((a.x-bs.x)*t.width/2,(a.y-bs.y)*t.height/2),l=o.distanceTo(Ft.position);(c<i||c===i&&l<r)&&(e=s.id,i=c,r=l)}return e}function nb(){const n=Es();if(n)return{kind:"node",id:n};const t=mn.intersectObjects(Qe.children.filter(i=>i.visible&&i.userData.topology!=="node"),!0)[0];if(!t)return null;const e=t.object.userData.topology;return{kind:e,id:t.object.userData[e+"Id"],point:t.point}}function Zf(){const n=mn.intersectObjects(Qe.children.filter(i=>i.visible&&["edge","plate"].includes(i.userData.topology)),!0),t=n.find(i=>i.object.userData.topology==="edge")||n[0];if(t){const i=t.object.userData.topology;return{kind:i,id:t.object.userData[i+"Id"]}}let e=null;for(const i of lt.edges){if(i.hidden)continue;const r=lt.nodes.find(a=>a.id===i.a)?.position,s=lt.nodes.find(a=>a.id===i.b)?.position;if(!r||!s)continue;const o=mn.ray.distanceSqToSegment(new w(r.x,r.y,r.z),new w(s.x,s.y,s.z));o>ye**2||e&&o>=e.distanceSq||(e={kind:"edge",id:i.id,distanceSq:o})}return e&&{kind:e.kind,id:e.id}}function ib(){const n=Zf();if(!n){Vt("涂色工具需要点击梁或面板");return}const t=ka();if(!t){Vt("颜色必须是 #RRGGBB 格式");return}if(n.kind==="edge"){fn({...lt,edges:lt.edges.map(r=>r.id===n.id?{...r,color:t}:r)},"已为梁设置颜色 {color}",{color:t});return}const e=N("#paint-side").value,i=e==="back"?"color_back":"color_front";fn({...lt,plates:lt.plates.map(r=>r.id===n.id?{...r,[i]:t}:r)},"已为面板{side}设置颜色 {color}",{color:t,side:e==="back"?"背面":"前面"})}function rb(){const n=ho().filter(i=>i.visible);if(n.length){for(const i of n)i.userData.hidden=!0,i.visible=!1;return Ss(null),Fn("已透明化 {count} 个对象",{count:n.length}),Vt("已透明化 {count} 个对象",{count:n.length}),!0}const t=Zf();if(t?.kind==="edge")return fn({...lt,edges:lt.edges.map(i=>i.id===t.id?{...i,hidden:!0}:i)},"已透明化 {count} 个对象",{count:1}),!0;if(t?.kind==="plate")return fn({...lt,plates:lt.plates.map(i=>i.id===t.id?{...i,hidden:!0}:i)},"已透明化 {count} 个对象",{count:1}),!0;const e=va();return e?(e.userData.hidden=!0,e.visible=!1,Ss(null),Fn("已透明化 {count} 个对象",{count:1}),Vt("已透明化 {count} 个对象",{count:1}),!0):(Vt("透明化工具需要点击组件、梁或面板"),!1)}async function sb(){const n=gn().map(e=>{const{hidden:i,...r}=e;return r}),t={...lt,edges:lt.edges.map(e=>{const{hidden:i,...r}=e;return r}),plates:lt.plates.map(e=>{const{hidden:i,...r}=e;return r})};await Zn(n,t),Fn("已取消透明化"),Vt("已取消透明化")}function xd(){const n=Es(!0),t=lt.nodes.find(i=>i.id===n),e=rM(mn.ray,sn?.frame||Aa(Ft,we.target),{axisSnap:!!sn&&fs,node:t?.position,viewNormal:Ft.getWorldDirection(new w)});return sn&&(sn.axis=e?.axis||null),e?.point||null}function Kf(n){Nt!=="beam"||!sn||(Cr.visible=!!n&&rd(Cr,sn.start,n),n?Pr.show(sn.start,n,sn.axis):Pr.hide(),ee(Di,n?"梁 1 格 · 整格端点 · 点击完成 / Esc 取消":"梁 1 格 · 无有效终点 · Esc 取消"))}function yd(){!sn||!ro||Nt!=="beam"||(vd(ro),Kf(xd()))}function Jf(){const n=Es(),t=lt.nodes.find(e=>e.id===n);return t?new w(t.position.x,t.position.y,t.position.z):Sf(mn.ray,fd||Aa(Ft,we.target))}function fn(n,t,e={}){const i=ys(wa(gn(),n),We.index),r=Pa(i.topology,new Map(i.objects.map(o=>[o.id,o.position])));lt=i.topology,Da(r),Ie.commit(i,{key:t,params:e}),er();const s=lt.nodes.length;Vt("{message}（{count} 逻辑节点）",()=>({message:Ht(t,e),count:s}))}function Qf(n,t){const e={node:By,edge:ky,plate:Hy}[n];if(n==="link"){fn({...lt,links:Ny(lt.links||[],t,new Set(gn().map(i=>i.id))).links},"已删除连接");return}e&&(n==="node"&&hn===t&&Lr(),fn(e(lt,t),n==="node"?"已删除节点及其关联拓扑":n==="edge"?"已删除梁":"已删除面板"))}function ob(n="plate"){const t=n==="glass";if(si.length<3){Vt(t?"玻璃至少需要选择三根梁":"面板至少需要选择三根梁");return}try{const i=(t?jy:_f)(lt.plates,si,lt.edges,lt.nodes,{normalOffset:ye/2});fn({...lt,plates:i.plates},t?"已创建玻璃面板":"已创建面板"),si=[]}catch(e){In("面板创建失败：{error}",e)}}function tp(){const n=mn.intersectObjects(Qe.children.filter(l=>l.visible&&l.userData.topology==="edge"),!1)[0];if(!n)return Vt("切分工具需要点击梁的内部"),!1;const t=lt.edges.find(l=>l.id===n.object.userData.edgeId);if(!t)return!1;const e=[t.a,t.b].map(l=>lt.nodes.find(d=>d.id===l).position),i=new w(e[0].x,e[0].y,e[0].z),r=new w(e[1].x,e[1].y,e[1].z),s=new w;mn.ray.distanceSqToSegment(i,r,new w,s);const o=Gy(lt.nodes,t.id,lt.edges);if(!o.length)return Vt("该梁没有可用整格切分点"),!1;const a=o.map(l=>new w(l.x,l.y,l.z)).reduce((l,d)=>d.distanceToSquared(s)<l.distanceToSquared(s)?d:l),c=Wy(lt.nodes,lt.edges,t.id,a,lt.plates);return fn({...lt,nodes:c.nodes,edges:c.edges,plates:c.plates},"已切分实体梁并新增节点"),!0}function ab(n){if(n.altKey)return tp();const t=xd();if(!t){Vt("当前位置无法投影到建造平面，请调整视角或按 Esc 重新开始");return}if(!sn){sn={start:t.clone(),frame:Aa(Ft,t),axis:null},ro={clientX:n.clientX,clientY:n.clientY},Dr.position.copy(t),Dr.visible=!0,Pr.show(t,t),ee(Di,"梁 1 格 · 点击终点 · Esc 取消"),Vt("起点已定位；移动鼠标预览实体梁，再次点击完成");return}fn(Vy(lt,sn.start,t),"已创建 1 格实体梁"),La()}function cb(){const n=HM();if(!n){Vt("连接工具需要点击组件端口");return}if(!ki){ki=n,N("#connection-from-port").value=String(n.port),Qi(),Vt("已选择连接起点；点击目标组件完成，Esc 取消");return}if(ki.componentId===n.componentId&&ki.port===n.port){Vt("请选择另一个组件端口作为连接终点");return}N("#connection-to-port").value=String(n.port);const t=N("#connection-kind").value,e=Iy(lt.links||[],{kind:t,from:ki,to:n,points:[]},new Set(gn().map(i=>i.id)));ki=null,fn({...lt,links:e.links},"已创建 {kind} 连接",{kind:t}),Qi()}function pu(n){if(Nt==="node"){const t=Es();if(t){if(hn&&hn!==t)try{const i=mf(lt.nodes,lt.edges,lt.plates,hn,t,lt.links);fn(i,"已合并节点"),Lr()}catch(i){In("节点合并失败：{error}",i)}else ga(t),Vt("已选择节点 {id}；点击节点合并，点击空白位置移动；Esc 取消选择",{id:t});return!0}if(hn){const i=pf(lt,hn,n);return fn(i,i.merged?"已移动并合并节点":"已移动节点"),Lr(),!0}const e=da(lt.nodes,n);return fn({...lt,nodes:e.nodes},e.created?"已创建节点 {id}":"已选择已有节点 {id}",{id:e.node.id}),e.created||ga(e.node.id),!0}if(Nt==="plate"||Nt==="glass"){const e=mn.intersectObjects(Qe.children.filter(i=>i.visible&&i.userData.topology==="edge"),!1)[0]?.object.userData.edgeId;return e?(si.includes(e)||(si.push(e),Vt(Nt==="glass"?"玻璃已选择 {count} 根梁；按 Enter 创建，Esc 取消":"面板已选择 {count} 根梁；按 Enter 创建，Esc 取消",{count:si.length})),!0):(Vt(Nt==="glass"?"玻璃工具需要选择围成闭合环的梁":"面板工具需要选择围成闭合环的梁"),!0)}return!1}Ue.domElement.addEventListener("contextmenu",n=>n.preventDefault());Ue.domElement.addEventListener("pointerdown",n=>{n.button!==0||Kt||(pn.focus({preventScroll:!0}),ud=ie.dragging,os={x:n.clientX,y:n.clientY})});Ue.domElement.addEventListener("pointermove",n=>{if(Kt)return;if(lo=!0,ro={clientX:n.clientX,clientY:n.clientY},vd(n),Nt==="select"||Nt==="erase"){const r=va();r!==pa&&(pa=r,Ia())}const t=Nt==="beam"?xd():Nt==="node"?Jf():Nt==="place"?$f():mn.ray.intersectPlane(kf,new w),e=t&&Ri(t),i=e?new w(e.x,e.y,e.z):null;fa=i,ee(N("#cursor-pos"),i?"{coordinates}":"无法定位：射线与建造平面平行",{coordinates:i?$i.map(r=>r.toUpperCase()+" "+ci(i[r])+" 格").join(" · "):""}),Kf(i),Yf(i)});Ue.domElement.addEventListener("pointerleave",()=>{lo=!1,pa=null,Ia(),Cr.visible=!1,Pr.hide(),Ye&&(Ye.visible=!1)});Ue.domElement.addEventListener("pointerup",n=>{if(!os||n.button!==0)return;const t=Math.hypot(n.clientX-os.x,n.clientY-os.y);if(os=null,!(Kt||ud||t>5||ie.axis&&["translate","rotate","scale"].includes(Nt))){if(vd(n),Nt==="beam"){try{ab(n)}catch(e){In("梁操作失败：{error}",e)}return}if(Nt==="split"){try{tp()}catch(e){In("梁切分失败：{error}",e)}return}if(Nt==="connect"){try{cb()}catch(e){In("连接操作失败：{error}",e)}return}if(Nt==="paint"){ib();return}if(Nt==="hide"){rb();return}if(Nt==="node"){if(!Sn){Vt("节点辅助已隐藏，请先显示节点后编辑节点或面板；直接建梁不受影响");return}const e=Jf();try{e&&e.length()<=1e4&&pu(e)}catch(i){In("拓扑操作失败：{error}",i)}return}if(Nt==="plate"||Nt==="glass"){try{pu()}catch(e){In("拓扑操作失败：{error}",e)}return}if(Nt==="place"){const e=$f();if(!e||e.length()>1e3)return;qe(async()=>{await $M(e),n.shiftKey||(Nt="select")})}else if(Nt==="erase"){const e=nb();e?Qf(e.kind,e.id):qe(async()=>{await _a(va())})}else Nt==="translate"&&Es()?ga(Es()):Ss(va(),{toggle:n.shiftKey})}});Ue.domElement.addEventListener("pointercancel",()=>{os=null,La()});function Ps({reference:n=ne}={}){const t=new jn;if(Ge.size?ho().forEach(s=>t.expandByObject(s)):n&&lt.nodes.length?lt.nodes.forEach(s=>t.expandByPoint(new w(s.position.x,s.position.y,s.position.z))):(Pe.forEach(s=>t.expandByObject(s)),t.expandByObject(Qe)),t.isEmpty()){we.target.set(0,.2,0),Ft.position.set(2.5,2.2,3);return}const e=t.getCenter(new w),i=Ft.isPerspectiveCamera?Ft.fov:45,r=Math.max(.4,t.getSize(new w).length()/Math.sin(i*Math.PI/360)*(n?.72:1));Ft.position.copy(e).add(new w(1,.8,1).normalize().multiplyScalar(r)),we.target.copy(e),we.update()}N("#fit-btn").onclick=Ps;for(const n of document.querySelectorAll(".view-controls [data-view]"))n.remove();const lb={orientation:"XYZ 视角指示器",right:"右视图 +X",left:"左视图 −X",top:"顶视图 +Y",bottom:"底视图 −Y",front:"前视图 +Z",back:"后视图 −Z",iso:"等距"},Oa=DM(pn,()=>Ft,n=>{if(Kt||ie.dragging)return;const t=we.enableDamping;we.enableDamping=!1,we.update(),CM(Ft,we,n),we.enableDamping=t,De()},n=>Ht(lb[n]));Oa.footer.append(N("#fit-btn"));function Md(n){ne=!!n,Xe.background.set(nt.backgroundColor),Fr.visible=!ne&&wi&&Ar,ie.getHelper().visible=!ne;for(const t of Qe.children)t.userData.topology==="link"&&(t.visible=!ne);Cr.visible=!1,Dr.visible=!1,Pr.hide(),zr(),io.setVisible(!ne&&nt.beamLengthsVisible),Oa.root.hidden=ne,N(".view-controls").hidden=ne,N(".top-tool-section").hidden=ne,nr.hidden=ne||Nt!=="paint",di.hidden=ne||Nt!=="connect",N(".hud").hidden=ne,yi.hidden=ne,Mi.hidden=ne,N("#native-reference-preview-btn").setAttribute("aria-pressed",String(ne)),ee(N("#native-reference-preview-btn"),ne?"退出参考预览":"参考预览"),Qi(),ne&&Ps({reference:!0})}li.onclick=()=>{Kt||!Pe.length||(Md(!ne),Vt(ne?"已开启参考预览：编辑辅助已隐藏，可对照 vehicle.png；相机、光照和游戏材质尚未验证":"已退出参考预览"))};const Fa=document.createElement("div");Fa.innerHTML='<div class="property"><label for="grid-color" data-i18n="网格颜色"></label><input id="grid-color" type="color"></div><div class="property"><label for="grid-opacity" data-i18n="网格透明度"></label><input id="grid-opacity" type="range" min="0" max="1" step="0.05"></div><div class="property"><label for="grid-style" data-i18n="网格线型"></label><select id="grid-style"><option value="solid" data-i18n="实线"></option><option value="dashed" data-i18n="虚线"></option></select></div><h2 data-i18n="节点显示"></h2><div class="property"><label for="node-color" data-i18n="节点颜色"></label><input id="node-color" type="color"></div><div class="property"><label for="node-size" data-i18n="节点大小"></label><input id="node-size" type="range" min="0.02" max="0.25" step="0.005"><output id="node-size-value"></output></div><div class="property"><label for="node-opacity" data-i18n="节点透明度"></label><input id="node-opacity" type="range" min="0" max="1" step="0.05"></div><h2 data-i18n="结构显示"></h2><div class="property"><label for="beam-lengths-visible" data-i18n="显示梁 XYZ 长度（格）"></label><input id="beam-lengths-visible" type="checkbox"></div><div class="property"><label for="beam-outlines-visible" data-i18n="显示梁描边"></label><input id="beam-outlines-visible" type="checkbox"></div><h2 data-i18n="涂色"></h2><div class="property"><label for="paint-color" data-i18n="颜色（Hex RGB）"></label><input id="paint-color" type="color" value="#bd2636"><input id="paint-color-hex" type="text" value="#bd2636" maxlength="7" spellcheck="false"><output id="paint-color-preview" class="paint-color-preview"></output></div><div class="property"><label for="paint-side" data-i18n="面板涂色面"></label><select id="paint-side"><option value="front" data-i18n="前面"></option><option value="back" data-i18n="背面"></option></select></div>';const bd=document.createElement("div");bd.innerHTML='<h2 data-i18n="视图与光照"></h2><div class="property"><label for="background-color" data-i18n="背景颜色"></label><input id="background-color" type="color"></div><div class="property"><label for="orthographic-view" data-i18n="正交镜头"></label><input id="orthographic-view" type="checkbox"></div><div class="property"><label for="light-azimuth" data-i18n="光照方位角"></label><input id="light-azimuth" type="range" min="-180" max="180" step="1"><output id="light-azimuth-value"></output></div><div class="property"><label for="light-elevation" data-i18n="光照高度角"></label><input id="light-elevation" type="range" min="5" max="90" step="1"><output id="light-elevation-value"></output></div><div class="property"><label for="light-intensity" data-i18n="光照强度"></label><input id="light-intensity" type="range" min="0" max="8" step="0.1"><output id="light-intensity-value"></output></div><div class="property"><label for="shadow-strength" data-i18n="阴影强度"></label><input id="shadow-strength" type="range" min="0" max="1" step="0.05"><output id="shadow-strength-value"></output></div><div class="property"><label for="light-softness" data-i18n="光照柔和度"></label><input id="light-softness" type="range" min="0" max="8" step="0.25"><output id="light-softness-value"></output></div>';const ep=document.createElement("div"),Sd=document.createElement("div");Sd.className="property";const za=document.createElement("label");za.htmlFor="camera-light-enabled";za.dataset.i18n="镜头辅助灯";ee(za,"镜头辅助灯");const Ed=document.createElement("input");Ed.id="camera-light-enabled";Ed.type="checkbox";Sd.append(za,Ed);const wd=document.createElement("div");wd.className="property";const Ba=document.createElement("label");Ba.htmlFor="camera-light-intensity";Ba.dataset.i18n="镜头辅助灯强度";ee(Ba,"镜头辅助灯强度");const Ds=document.createElement("input");Ds.id="camera-light-intensity";Ds.type="range";Ds.min="0";Ds.max="8";Ds.step=".1";const np=document.createElement("output");np.id="camera-light-intensity-value";wd.append(Ba,Ds,np);ep.append(Sd,wd);bd.prepend(ep);Fa.append(bd);N("#grid-btn").before(Fa);_n(Fa);N("#grid-color").value=nt.gridColor;N("#grid-opacity").value=nt.gridOpacity;N("#grid-style").value=nt.gridStyle;N("#node-color").value=nt.nodeColor;N("#node-size").value=nt.nodeSize;N("#node-opacity").value=nt.nodeOpacity;N("#beam-lengths-visible").checked=nt.beamLengthsVisible;N("#beam-outlines-visible").checked=nt.beamOutlinesVisible;N("#background-color").value=nt.backgroundColor;N("#orthographic-view").checked=nt.orthographic;N("#camera-light-enabled").checked=nt.cameraLightEnabled;N("#camera-light-intensity").value=nt.cameraLightIntensity;N("#light-azimuth").value=nt.lightAzimuth;N("#light-elevation").value=nt.lightElevation;N("#light-intensity").value=nt.lightIntensity;N("#shadow-strength").value=nt.shadowStrength;N("#light-softness").value=nt.lightSoftness;Fr.visible=wi;function ip(){const n=ji({version:1,gridColor:N("#grid-color").value,gridOpacity:Number(N("#grid-opacity").value),gridStyle:N("#grid-style").value});PM(Fr,n),De()}ip();for(const n of["grid-color","grid-opacity","grid-style"])N("#"+n).addEventListener("input",ip);function rp(){const n=ji({version:1,nodeColor:N("#node-color").value,nodeSize:Number(N("#node-size").value),nodeOpacity:Number(N("#node-opacity").value)});nt.nodeColor=n.nodeColor,nt.nodeSize=n.nodeSize,nt.nodeOpacity=n.nodeOpacity,ii.node.color.set(n.nodeColor);for(const t of[ii.node,ii.nodeSelected])t.opacity=n.nodeOpacity,t.transparent=n.nodeOpacity<1,t.needsUpdate=!0;N("#node-size-value").textContent=n.nodeSize.toFixed(3),zr(),Qi(),De()}rp();for(const n of["node-color","node-size","node-opacity"])N("#"+n).addEventListener("input",rp);function Td(){const n=ji({version:1,backgroundColor:N("#background-color").value,lightAzimuth:Number(N("#light-azimuth").value),lightElevation:Number(N("#light-elevation").value),lightIntensity:Number(N("#light-intensity").value),shadowStrength:Number(N("#shadow-strength").value),lightSoftness:Number(N("#light-softness").value),cameraLightEnabled:N("#camera-light-enabled").checked,cameraLightIntensity:Number(N("#camera-light-intensity").value),orthographic:N("#orthographic-view").checked});Object.assign(nt,{backgroundColor:n.backgroundColor,lightAzimuth:n.lightAzimuth,lightElevation:n.lightElevation,lightIntensity:n.lightIntensity,shadowStrength:n.shadowStrength,lightSoftness:n.lightSoftness,cameraLightEnabled:n.cameraLightEnabled,cameraLightIntensity:n.cameraLightIntensity,orthographic:n.orthographic}),Xe.background.set(nt.backgroundColor),Bf(),fb(nt.orthographic),N("#light-azimuth-value").textContent=n.lightAzimuth.toFixed(0)+"°",N("#light-elevation-value").textContent=n.lightElevation.toFixed(0)+"°",N("#light-intensity-value").textContent=n.lightIntensity.toFixed(1),N("#shadow-strength-value").textContent=n.shadowStrength.toFixed(2),N("#light-softness-value").textContent=n.lightSoftness.toFixed(2),N("#camera-light-intensity-value").textContent=n.cameraLightIntensity.toFixed(1),De()}for(const n of["background-color","light-azimuth","light-elevation","light-intensity","shadow-strength","light-softness","camera-light-enabled","camera-light-intensity"])N("#"+n).addEventListener("input",Td);N("#orthographic-view").addEventListener("change",Td);Td();function db(){nt.beamLengthsVisible=ji({version:1,beamLengthsVisible:N("#beam-lengths-visible").checked}).beamLengthsVisible,io.setVisible(!ne&&nt.beamLengthsVisible),De()}N("#beam-lengths-visible").addEventListener("change",db);function hb(){nt.beamOutlinesVisible=ji({version:1,beamOutlinesVisible:N("#beam-outlines-visible").checked}).beamOutlinesVisible,oM(Cr,nt.beamOutlinesVisible),Da(Pa(lt,new Map(gn().map(n=>[n.id,n.position])))),De()}N("#beam-outlines-visible").addEventListener("change",hb);function ka(n=N("#paint-color-hex").value){return typeof n=="string"&&/^#[\da-f]{6}$/i.test(n)?n.toLowerCase():null}function sp(){const n=ka(),t=N("#paint-color-preview");t.textContent=n||"—",t.style.backgroundColor=n||"transparent"}function fo(n){const t=ka(n);return t?(N("#paint-color").value=t,N("#paint-color-hex").value=t,N("#paint-toolbar-color").value=t,N("#paint-toolbar-hex").value=t,sp(),!0):!1}function Ad(){const n=N("#paint-quick-colors");n.replaceChildren();for(const t of nt.paintQuickColors){const e=document.createElement("span");e.className="quick-color-item";const i=document.createElement("button");i.type="button",i.className="quick-color",i.textContent=t,i.style.backgroundColor=t,i.setAttribute("aria-label",`${Ht("颜色（Hex RGB）")} ${t}`),i.title=t,i.onclick=()=>fo(t);const r=document.createElement("button");r.type="button",r.className="quick-color-remove",r.textContent="×",r.setAttribute("aria-label",`${Ht("删除快捷颜色")} ${t}`),r.title=`${Ht("删除快捷颜色")} ${t}`,r.onclick=()=>{nt.paintQuickColors=nt.paintQuickColors.filter(s=>s!==t),Ad(),De()},e.append(i,r),n.append(e)}}function Rd(){const n=N("#connection-kind").value;for(const t of di.querySelectorAll("[data-kind]"))t.classList.toggle("active",t.dataset.kind===n);Qi()}N("#paint-color").addEventListener("input",n=>fo(n.target.value));N("#paint-toolbar-color").addEventListener("input",n=>fo(n.target.value));N("#paint-color-hex").addEventListener("change",n=>fo(n.target.value));N("#paint-toolbar-hex").addEventListener("change",n=>fo(n.target.value));N("#save-paint-quick-color").onclick=()=>{const n=ka();n&&(nt.paintQuickColors=[...new Set([...nt.paintQuickColors,n])].slice(-12),Ad(),De())};N("#connection-kind").addEventListener("change",Rd);Ad();Rd();sp();function op(){ee(N("#grid-btn"),wi?"隐藏网格":"显示网格"),N("#grid-btn").setAttribute("aria-pressed",String(wi))}op();N("#grid-btn").onclick=()=>{wi=!wi,Fr.visible=!ne&&wi&&Ar,op(),De()};const Yi=document.createElement("button");Yi.id="nodes-btn";ee(Yi,Sn?"隐藏节点":"显示节点");Yi.setAttribute("aria-pressed",String(Sn));Yi.dataset.i18nTitle="仅切换逻辑节点辅助标记，不隐藏梁、不改变工程";N(".view-controls").append(Yi);Yi.onclick=()=>{Sn=!Sn,Sn||(Lr(),si=[]),zr(),ee(Yi,Sn?"隐藏节点":"显示节点"),Yi.setAttribute("aria-pressed",String(Sn)),Vt(Sn?"已显示逻辑节点辅助标记":"节点已隐藏；仍可直接建梁并吸附逻辑端点"),De()};const rr=document.createElement("button");rr.id="axis-snap-btn";ee(rr,"轴向吸附");rr.dataset.i18nTitle="仅建梁：自动吸附单一世界轴（A 切换）";rr.setAttribute("aria-keyshortcuts","A");rr.setAttribute("aria-pressed",String(fs));N(".view-controls").append(rr);function ap(){Kt||(fs=!fs,rr.setAttribute("aria-pressed",String(fs)),yd(),De())}rr.onclick=ap;const Cd=document.createElement("p");Cd.className="status construction-help";ee(Cd,"梁：两击完成，Esc 取消，Alt 点击分割。所有节点、组件和端点均对齐世界 XYZ 整数格；1 格 = 8 cm。截面边长为 1 格；世界轴向梁的面与 XYZ 平面平行。XYZ 标尺仅显示整数格与厘米。A 切换轴向吸附；节点可隐藏。");N("#grid-btn").after(Cd);const Lc=Wf();Lc&&(Lc.dataset.i18nTitle="载具总尺寸按组件和结构节点的包围范围计算；1 格 = 8 cm",_n(Lc));N("#component-search").oninput=()=>{Br(),De()};N("#category-filter").onchange=()=>{Br(),De()};N("#show-building-furniture").onchange=()=>{nt.showBuildingFurniture=N("#show-building-furniture").checked,Ua(),Br(),De()};N("#undo-btn").onclick=qf;N("#redo-btn").onclick=Ol;N("#new-btn").onclick=()=>{!Kt&&(!Pe.length||confirm(Ht("清空当前工程？此操作可以撤销。")))&&qe(async()=>{await Zn([],{nodes:[],edges:[],plates:[],links:[]}),Fn()})};function xa(n,t,e){const i=URL.createObjectURL(new Blob([n],{type:e})),r=document.createElement("a");r.href=i,r.download=t,document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}function Pd(){return ys(wa(gn(),lt),We.index)}N("#save-btn").onclick=()=>{Kt||xa(JSON.stringify(Pd(),null,2),"anymaker-project.json","application/json")};N("#export-btn").onclick=()=>{Kt||(xa(qy(Pd()),"anymaker-intermediate.xml","application/xml"),Vt("已导出中间 XML；不能作为已验证游戏存档使用"))};N("#load-btn").onclick=()=>N("#file-input").click();N("#file-input").onchange=n=>{const t=n.target.files[0];n.target.value="",t&&qe(async()=>{if(t.size>10*1024*1024)throw new Error("工程文件超过 10 MiB");const e=vf(JSON.parse(await t.text()),We.index);await Zn(e.objects,e.topology||{nodes:[],edges:[],plates:[],links:[]}),Fn(),Ps(),Vt("工程已加载")})};N("#library-btn").onclick=()=>N("#native-input").click();N("#mesh-files-btn").onclick=()=>N("#mesh-input").click();N("#mesh-input").onchange=n=>{const t=[...n.target.files];n.target.value="",t.length&&qe(async()=>{const e=hd.register(t);ee(N("#asset-status"),"本地已登记 {count} 个 Mesh。按组件请求解码，不上传。材质、动态装配尚未还原。",{count:e}),await Zn(gn()),Ps(),Vt("模型库已登记；选择组件并在视口点击放置")})};function ub(n){if(n.length!==2)throw new Error("请同时选择一份 .data 和一份 .meta 文件");const t=Object.create(null);for(const e of n){if(!e||e.size>20*1024*1024)throw new Error("文件超过 20 MiB");const i=/^(.+)\.(data|meta)$/i.exec(e.name);if(!i||t[i[2].toLowerCase()])throw new Error("请选择唯一的一份 .data 和一份 .meta 文件");t[i[2].toLowerCase()]={file:e,baseName:i[1]}}if(!t.data||!t.meta||t.data.baseName.toLowerCase()!==t.meta.baseName.toLowerCase())throw new Error(".data 与 .meta 必须使用相同文件名");return t}N("#native-btn").onclick=()=>N("#native-input").click();N("#native-input").onchange=async n=>{const t=[...n.target.files];if(n.target.value="",!!t.length){Wn=null,Zi.disabled=!0,Pi.disabled=!0,li.disabled=!0,En.disabled=!0,En.replaceChildren();try{const e=ub(t),[i,r]=await Promise.all([e.data.file.text(),e.meta.file.text()]),s=JSON.parse(i),o=JSON.parse(r);Wn=Lf(s,o),Wn.extras.native.fileBaseName=e.data.baseName;const a=MM(s,o);if(a.data.length||a.meta.length)throw new Error("原生配套文件的无编辑 round-trip 校验失败");const c=yM(Wn);N("#native-summary").dataset.domainStats=JSON.stringify(c),Zi.disabled=!1,Pi.disabled=!1,li.disabled=!1;const l=s.vehicles?.vehicles;if(!Array.isArray(l))throw new Error("没有 vehicles.vehicles 数组");const d=l.map(f=>({id:f.id,nodes:f.nodes?.length||0,edges:f.edges?.length||0,plates:f.plates?.length||0,grids:f.grids?.length||0,components:(f.grids||[]).reduce((u,g)=>u+(g.components?.length||0),0)})),h=d.reduce((f,u)=>u.components>f.components?u:f,d[0]);En.append(new Option(Ht("导入载具 {id} 及其关联子载具（默认主载具）",{id:h.id}),String(h.id)));for(const f of d)f.id!==h.id&&En.append(new Option(Ht("导入载具 {id} 及其关联子载具",{id:f.id}),String(f.id)));En.append(new Option(Ht("导入全部 {count} 个载具",{count:d.length}),"all")),En.disabled=!1,ee(N("#native-summary"),"已配对 {dataName} / {metaName}。{vehicles}。确认后才导入当前场景。",()=>({dataName:e.data.file.name,metaName:e.meta.file.name,vehicles:d.map(f=>Ht("载具 {id}：{nodes} 节点 / {edges} 梁 / {plates} 面板 / {grids} 网格 / {components} 组件",f)).join(Ci()==="zh"?"；":"; ")}))}catch(e){ee(N("#native-summary"),"无法导入原生文件：{error}",()=>({error:Ht(e instanceof Error?e.message:String(e))}))}}};Pi.onclick=()=>{if(Vt("正在导入配套原生载具"),!Wn||Kt){Vt(Wn?"当前操作仍在进行":"原生模型尚未加载");return}qe(async()=>{const n=En.value==="all"?null:[En.value],t=ys(Py(Wn,{vehicleIds:n}),We.index);await Zn(t.objects,t.topology||hf(Wn,{vehicleIds:n})),Fn(),Md(!0),Vt("已将配套 .data / .meta 的组件、节点、梁和面板导入当前场景；连接仍保留在领域模型中")})};Zi.onclick=()=>{if(Wn)try{const n=If(Wn),t=Wn.extras.native.fileBaseName||"anymaker-native";xa(JSON.stringify(n.data,null,2),`${t}.data`,"application/json"),xa(JSON.stringify(n.meta,null,2),`${t}.meta`,"application/json"),Vt("已导出原始 .data / .meta 配套文件；当前编辑器修改尚未完整回写，不能作为游戏兼容存档")}catch(n){In("原生导出失败：{error}",n)}};window.addEventListener("keydown",n=>{if(n.key==="Tab"&&n.target===pn){n.preventDefault(),pd(!Ki.hidden,{focusToggle:!0});return}if(n.target instanceof HTMLElement&&(n.target.matches("input,textarea,select")||n.target.isContentEditable))return;if(n.key==="Escape"&&!Kt){(sn||si.length||hn)&&Vt("已取消当前拓扑操作"),_d(),Ss(null),tr("select");return}if(n.target instanceof HTMLElement&&n.target.matches('button,summary,[role="separator"]')||n.target!==document.body&&n.target!==pn&&n.target!==Ue.domElement||Kt)return;const e=n.key.toLowerCase();if(n.ctrlKey||n.metaKey){e==="z"?(n.preventDefault(),n.shiftKey?Ol():qf()):e==="y"&&(n.preventDefault(),Ol());return}if(e==="a"&&!n.altKey&&!n.repeat){n.preventDefault(),ap();return}const i=Of.find(r=>r[2].toLowerCase()===e);i&&tr(i[0]),(e==="delete"||e==="backspace")&&(n.preventDefault(),hn?Qf("node",hn):qe(async()=>{await _a(Ve)})),e==="enter"&&["plate","glass"].includes(Nt)&&(n.preventDefault(),ob(Nt)),e==="f"&&Ps()});function cp(){const n=Math.max(1,pn.clientWidth),t=Math.max(1,pn.clientHeight);if(Ft.isOrthographicCamera){const e=Math.max(.5,Ft.position.distanceTo(we.target)),i=Math.max(.2,e*.65);Ft.left=-i*n/t,Ft.right=i*n/t,Ft.top=i,Ft.bottom=-i}else Ft.aspect=n/t;Ft.updateProjectionMatrix()}function fb(n){const t=n?gd:md;Ft!==t&&(t.position.copy(Ft.position),t.quaternion.copy(Ft.quaternion),t.up.copy(Ft.up),Ft=t,UM(Ft),we.object=Ft,ie.camera=Ft,cp(),we.update(),De())}const Dd=document.createElement("div");Dd.className="badge local-backup";const so=document.createElement("span");so.id="autosave-status";so.setAttribute("role","status");const Ls=document.createElement("button");Ls.id="resume-autosave";Ls.hidden=!0;ee(Ls,"以当前工程继续自动保存");Dd.append(so,Ls);N(".hud").append(Dd);const Ld=document.createElement("p");Ld.className="status";ee(Ld,"本地存储只属于当前浏览器和站点；清理站点数据会删除备份，请定期下载工程。");N("#grid-settings").append(Ld);function pb({state:n,savedAt:t,detail:e}){so.dataset.state=n,ee(so,{ready:"自动保存：每分钟",restored:"已恢复本地工程",recovered:"已从上一份有效备份恢复",saved:"已自动保存 {time}",error:"本地恢复失败：{detail}","write-error":"本地保存失败，请下载工程：{detail}",conflict:"另一标签页已保存，自动保存已暂停"}[n],()=>({detail:e,time:t?new Date(t).toLocaleTimeString(Ci()==="zh"?"zh-CN":"en-US"):""})),Ls.hidden=!["error","conflict"].includes(n)}Ls.onclick=()=>{!Kt&&confirm(Ht("用当前工程覆盖本地恢复记录并继续自动保存？"))&&dd?.resume()};function mb(){return{version:1,language:Ci(),leftWidth:Ti,leftCollapsed:Ki.hidden,rightOpen:!Or.hidden,gridColor:N("#grid-color").value,gridOpacity:Number(N("#grid-opacity").value),gridStyle:N("#grid-style").value,gridVisible:wi,nodesVisible:Sn,nodeColor:N("#node-color").value,nodeSize:Number(N("#node-size").value),nodeOpacity:Number(N("#node-opacity").value),beamAxisSnap:fs,beamLengthsVisible:nt.beamLengthsVisible,beamOutlinesVisible:nt.beamOutlinesVisible,tool:Nt,selectedType:wn,backgroundColor:nt.backgroundColor,lightAzimuth:nt.lightAzimuth,lightElevation:nt.lightElevation,lightIntensity:nt.lightIntensity,shadowStrength:nt.shadowStrength,lightSoftness:nt.lightSoftness,cameraLightEnabled:nt.cameraLightEnabled,cameraLightIntensity:nt.cameraLightIntensity,paintQuickColors:nt.paintQuickColors,orthographic:nt.orthographic,showBuildingFurniture:N("#show-building-furniture").checked,query:N("#component-search").value,category:N("#category-filter").value,drawers:{catalog:N("#catalog-drawer").open,inspector:N(".inspector-drawer").open,resources:N("#resource-drawer").open,history:ir.open},camera:{position:Ft.position.toArray(),target:we.target.toArray()}}}function Ha(){if(!ld)return;clearTimeout(Dl);const n=cd.saveSettings(mb());n.ok||Vt("设置保存失败：{detail}",{detail:n.error.message})}function De(){ld&&(clearTimeout(Dl),Dl=setTimeout(Ha,180))}we.addEventListener("change",()=>{De(),!Kt&&lo&&yd()});for(const n of[N("#catalog-drawer"),N(".inspector-drawer"),N("#resource-drawer"),ir])n.addEventListener("toggle",De);window.addEventListener("pagehide",Ha);document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ha()});function lp(n){const t=Ki.scrollTop,e=N("#inspector-content details")?.open;Cf(n),document.documentElement.lang=Ci()==="zh"?"zh-CN":"en",N("#language-select").value=Ci(),_n(document),Ua(),Br(),Li(),er(),e&&N("#inspector-content details")&&(N("#inspector-content details").open=!0),Ki.scrollTop=t,Oa.relabel(),dd?.refresh(),Ha()}N("#language-select").addEventListener("change",n=>lp(n.target.value));const Id=()=>{cp(),Ue.setSize(pn.clientWidth,pn.clientHeight,!1),!Kt&&lo&&yd()};new ResizeObserver(Id).observe(pn);pd(nt.leftCollapsed);Nf(nt.rightOpen);N("#catalog-drawer").open=nt.drawers.catalog;N(".inspector-drawer").open=nt.drawers.inspector;N("#resource-drawer").open=nt.drawers.resources;ir.open=nt.drawers.history;lp(Ci());GM();er();Id();async function gb(){await eb(),N("#component-search").value=nt.query,N("#show-building-furniture").checked=nt.showBuildingFurniture,Ua(),N("#category-filter").value=[...N("#category-filter").options].some(n=>n.value===nt.category)?nt.category:"",We.has(nt.selectedType)&&(wn=nt.selectedType),Br(),dd=await RM({store:cd,validate:n=>vf(n,We.index),restore:async n=>{await Zn(n.objects,n.topology||{nodes:[],edges:[],plates:[],links:[]}),Fn()},snapshot:()=>{const n=Ie.entries[Ie.cursor];return wa(n.objects,n.topology)},canSave:()=>!Kt&&!ie.dragging,notify:pb}),nt.camera?(Ft.position.fromArray(nt.camera.position),we.target.fromArray(nt.camera.target),we.update()):(Pe.length||lt.nodes.length)&&Ps(),Kt=!1,tr(nt.tool),er(),ld=!0,pn.dataset.ready="true",Pl.error&&Vt("设置保存失败：{detail}",{detail:Pl.error.message})}gb().catch(n=>In("组件目录加载失败：{error}",n));Ue.setAnimationLoop(()=>{we.update(),BM(),Oa.update(),Pr.update(),io.update(),Ue.render(Xe,Ft)});
//# sourceMappingURL=index-BlV39wi6.js.map
