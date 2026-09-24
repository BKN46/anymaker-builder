(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Yl="178",ji={ROTATE:0,DOLLY:1,PAN:2},cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kp=0,iu=1,Jp=2,Nh=1,Uh=2,Si=3,Di=0,ln=1,en=2,Yi=0,hs=1,ru=2,su=3,ou=4,Qp=5,yr=100,em=101,tm=102,nm=103,im=104,rm=200,sm=201,om=202,am=203,Vc=204,Gc=205,cm=206,lm=207,dm=208,um=209,hm=210,fm=211,pm=212,mm=213,gm=214,Wc=0,Xc=1,jc=2,wr=3,Yc=4,qc=5,$c=6,Zc=7,Oh=0,_m=1,vm=2,qi=0,xm=1,ym=2,Mm=3,Sm=4,bm=5,Em=6,wm=7,Fh=300,xs=301,ys=302,Kc=303,Jc=304,Ca=306,Qc=1e3,br=1001,el=1002,Yn=1003,Tm=1004,bo=1005,si=1006,Qa=1007,Er=1008,li=1009,zh=1010,Bh=1011,eo=1012,ql=1013,Tr=1014,Ti=1015,ho=1016,$l=1017,Zl=1018,to=1020,kh=35902,Hh=1021,Vh=1022,Xn=1023,no=1026,io=1027,Gh=1028,Kl=1029,Wh=1030,Jl=1031,Ql=1033,ea=33776,ta=33777,na=33778,ia=33779,tl=35840,nl=35841,il=35842,rl=35843,sl=36196,ol=37492,al=37496,cl=37808,ll=37809,dl=37810,ul=37811,hl=37812,fl=37813,pl=37814,ml=37815,gl=37816,_l=37817,vl=37818,xl=37819,yl=37820,Ml=37821,ra=36492,Sl=36494,bl=36495,Xh=36283,El=36284,wl=36285,Tl=36286,Am=3200,Cm=3201,jh=0,Rm=1,Wi="",In="srgb",Ms="srgb-linear",da="linear",ct="srgb",Xr=7680,au=519,Pm=512,Dm=513,Lm=514,Yh=515,Im=516,Nm=517,Um=518,Om=519,cu=35044,lu="300 es",Ai=2e3,ua=2001;class Or{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let du=1234567;const fs=Math.PI/180,Ss=180/Math.PI;function Rs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function ed(n,e){return(n%e+e)%e}function Fm(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function zm(n,e,t){return n!==e?(t-n)/(e-n):0}function Zs(n,e,t){return(1-t)*n+t*e}function Bm(n,e,t,i){return Zs(n,e,1-Math.exp(-t*i))}function km(n,e=1){return e-Math.abs(ed(n,e*2)-e)}function Hm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Vm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Gm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Wm(n,e){return n+Math.random()*(e-n)}function Xm(n){return n*(.5-Math.random())}function jm(n){n!==void 0&&(du=n);let e=du+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ym(n){return n*fs}function qm(n){return n*Ss}function $m(n){return(n&n-1)===0&&n!==0}function Zm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Km(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Jm(n,e,t,i,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),h=o((e-i)/2),p=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*d,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function as(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function on(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ar={DEG2RAD:fs,RAD2DEG:Ss,generateUUID:Rs,clamp:Xe,euclideanModulo:ed,mapLinear:Fm,inverseLerp:zm,lerp:Zs,damp:Bm,pingpong:km,smoothstep:Hm,smootherstep:Vm,randInt:Gm,randFloat:Wm,randFloatSpread:Xm,seededRandom:jm,degToRad:Ym,radToDeg:qm,isPowerOfTwo:$m,ceilPowerOfTwo:Zm,floorPowerOfTwo:Km,setQuaternionFromProperEuler:Jm,normalize:on,denormalize:as};class Ne{constructor(e=0,t=0){Ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kt{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const h=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==h||c!==p||u!==g){let m=1-a;const f=l*h+c*p+u*g+d*_,S=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){const R=Math.sqrt(y),A=Math.atan2(R,f*S);m=Math.sin(m*A)/R,a=Math.sin(a*A)/R}const v=a*S;if(l=l*m+h*v,c=c*m+p*v,u=u*m+g*v,d=d*m+_*v,m===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],h=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*p-c*h,e[t+1]=l*g+u*h+c*d-a*p,e[t+2]=c*g+u*p+a*h-l*d,e[t+3]=u*g-a*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),h=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,i=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(uu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(uu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ec.copy(this).projectOnVector(e),this.sub(ec)}reflect(e){return this.sub(ec.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ec=new w,uu=new kt;class Ve{constructor(e,t,i,r,s,o,a,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],f=r[6],S=r[1],y=r[4],v=r[7],R=r[2],A=r[5],C=r[8];return s[0]=o*_+a*S+l*R,s[3]=o*m+a*y+l*A,s[6]=o*f+a*v+l*C,s[1]=c*_+u*S+d*R,s[4]=c*m+u*y+d*A,s[7]=c*f+u*v+d*C,s[2]=h*_+p*S+g*R,s[5]=h*m+p*y+g*A,s[8]=h*f+p*v+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,p=c*s-o*l,g=t*d+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(tc.makeScale(e,t)),this}rotate(e){return this.premultiply(tc.makeRotation(-e)),this}translate(e,t){return this.premultiply(tc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const tc=new Ve;function qh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ha(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qm(){const n=ha("canvas");return n.style.display="block",n}const hu={};function ps(n){n in hu||(hu[n]=!0,console.warn(n))}function eg(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function tg(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function ng(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const fu=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pu=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ig(){const n={enabled:!0,workingColorSpace:Ms,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ct&&(r.r=Ci(r.r),r.g=Ci(r.g),r.b=Ci(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ct&&(r.r=ms(r.r),r.g=ms(r.g),r.b=ms(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Wi?da:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ps("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ps("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ms]:{primaries:e,whitePoint:i,transfer:da,toXYZ:fu,fromXYZ:pu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:fu,fromXYZ:pu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),n}const Ke=ig();function Ci(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ms(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let jr;class rg{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{jr===void 0&&(jr=ha("canvas")),jr.width=e.width,jr.height=e.height;const r=jr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=jr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ha("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ci(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ci(t[i]/255)*255):t[i]=Ci(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sg=0;class td{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Rs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(nc(r[o].image)):s.push(nc(r[o]))}else s=nc(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function nc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?rg.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let og=0;const ic=new w;class vn extends Or{constructor(e=vn.DEFAULT_IMAGE,t=vn.DEFAULT_MAPPING,i=br,r=br,s=si,o=Er,a=Xn,l=li,c=vn.DEFAULT_ANISOTROPY,u=Wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:og++}),this.uuid=Rs(),this.name="",this.source=new td(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ic).x}get height(){return this.source.getSize(ic).y}get depth(){return this.source.getSize(ic).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qc:e.x=e.x-Math.floor(e.x);break;case br:e.x=e.x<0?0:1;break;case el:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qc:e.y=e.y-Math.floor(e.y);break;case br:e.y=e.y<0?0:1;break;case el:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Fh;vn.DEFAULT_ANISOTROPY=1;class Rt{constructor(e=0,t=0,i=0,r=1){Rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,v=(p+1)/2,R=(f+1)/2,A=(u+h)/4,C=(d+_)/4,D=(g+m)/4;return y>v&&y>R?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=A/i,s=C/i):v>R?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=A/r,s=D/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=C/s,r=D/s),this.set(i,r,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-_)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ag extends Or{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new vn(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:si,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new td(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cr extends ag{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class $h extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yn,this.minFilter=Yn,this.wrapR=br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class cg extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yn,this.minFilter=Yn,this.wrapR=br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qn{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vn):Vn.fromBufferAttribute(s,o),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Eo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Eo.copy(i.boundingBox)),Eo.applyMatrix4(e.matrixWorld),this.union(Eo)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zs),wo.subVectors(this.max,zs),Yr.subVectors(e.a,zs),qr.subVectors(e.b,zs),$r.subVectors(e.c,zs),Oi.subVectors(qr,Yr),Fi.subVectors($r,qr),ur.subVectors(Yr,$r);let t=[0,-Oi.z,Oi.y,0,-Fi.z,Fi.y,0,-ur.z,ur.y,Oi.z,0,-Oi.x,Fi.z,0,-Fi.x,ur.z,0,-ur.x,-Oi.y,Oi.x,0,-Fi.y,Fi.x,0,-ur.y,ur.x,0];return!rc(t,Yr,qr,$r,wo)||(t=[1,0,0,0,1,0,0,0,1],!rc(t,Yr,qr,$r,wo))?!1:(To.crossVectors(Oi,Fi),t=[To.x,To.y,To.z],rc(t,Yr,qr,$r,wo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_i),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _i=[new w,new w,new w,new w,new w,new w,new w,new w],Vn=new w,Eo=new qn,Yr=new w,qr=new w,$r=new w,Oi=new w,Fi=new w,ur=new w,zs=new w,wo=new w,To=new w,hr=new w;function rc(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){hr.fromArray(n,s);const a=r.x*Math.abs(hr.x)+r.y*Math.abs(hr.y)+r.z*Math.abs(hr.z),l=e.dot(hr),c=t.dot(hr),u=i.dot(hr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const lg=new qn,Bs=new w,sc=new w;class Ra{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):lg.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bs.subVectors(e,this.center);const t=Bs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Bs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bs.copy(e.center).add(sc)),this.expandByPoint(Bs.copy(e.center).sub(sc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const vi=new w,oc=new w,Ao=new w,zi=new w,ac=new w,Co=new w,cc=new w;class Pa{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vi.copy(this.origin).addScaledVector(this.direction,t),vi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){oc.copy(e).add(t).multiplyScalar(.5),Ao.copy(t).sub(e).normalize(),zi.copy(this.origin).sub(oc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ao),a=zi.dot(this.direction),l=-zi.dot(Ao),c=zi.lengthSq(),u=Math.abs(1-o*o);let d,h,p,g;if(u>0)if(d=o*l-a,h=o*a-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,p=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(oc).addScaledVector(Ao,h),p}intersectSphere(e,t){vi.subVectors(e.center,this.origin);const i=vi.dot(this.direction),r=vi.dot(vi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,vi)!==null}intersectTriangle(e,t,i,r,s){ac.subVectors(t,e),Co.subVectors(i,e),cc.crossVectors(ac,Co);let o=this.direction.dot(cc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zi.subVectors(this.origin,e);const l=a*this.direction.dot(Co.crossVectors(zi,Co));if(l<0)return null;const c=a*this.direction.dot(ac.cross(zi));if(c<0||l+c>o)return null;const u=-a*zi.dot(cc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,i,r,s,o,a,l,c,u,d,h,p,g,_,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,h,p,g,_,m)}set(e,t,i,r,s,o,a,l,c,u,d,h,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Zr.setFromMatrixColumn(e,0).length(),s=1/Zr.setFromMatrixColumn(e,1).length(),o=1/Zr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,p=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,p=l*d,g=c*u,_=c*d;t[0]=h+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,p=l*d,g=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,p=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=g*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dg,e,ug)}lookAt(e,t,i){const r=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Bi.crossVectors(i,bn),Bi.lengthSq()===0&&(Math.abs(i.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Bi.crossVectors(i,bn)),Bi.normalize(),Ro.crossVectors(bn,Bi),r[0]=Bi.x,r[4]=Ro.x,r[8]=bn.x,r[1]=Bi.y,r[5]=Ro.y,r[9]=bn.y,r[2]=Bi.z,r[6]=Ro.z,r[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],S=i[3],y=i[7],v=i[11],R=i[15],A=r[0],C=r[4],D=r[8],E=r[12],M=r[1],P=r[5],B=r[9],F=r[13],G=r[2],j=r[6],X=r[10],$=r[14],V=r[3],ie=r[7],he=r[11],ye=r[15];return s[0]=o*A+a*M+l*G+c*V,s[4]=o*C+a*P+l*j+c*ie,s[8]=o*D+a*B+l*X+c*he,s[12]=o*E+a*F+l*$+c*ye,s[1]=u*A+d*M+h*G+p*V,s[5]=u*C+d*P+h*j+p*ie,s[9]=u*D+d*B+h*X+p*he,s[13]=u*E+d*F+h*$+p*ye,s[2]=g*A+_*M+m*G+f*V,s[6]=g*C+_*P+m*j+f*ie,s[10]=g*D+_*B+m*X+f*he,s[14]=g*E+_*F+m*$+f*ye,s[3]=S*A+y*M+v*G+R*V,s[7]=S*C+y*P+v*j+R*ie,s[11]=S*D+y*B+v*X+R*he,s[15]=S*E+y*F+v*$+R*ye,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+s*l*d-r*c*d-s*a*h+i*c*h+r*a*p-i*l*p)+_*(+t*l*p-t*c*h+s*o*h-r*o*p+r*c*u-s*l*u)+m*(+t*c*d-t*a*p-s*o*d+i*o*p+s*a*u-i*c*u)+f*(-r*a*u-t*l*d+t*a*h+r*o*d-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],S=d*m*c-_*h*c+_*l*p-a*m*p-d*l*f+a*h*f,y=g*h*c-u*m*c-g*l*p+o*m*p+u*l*f-o*h*f,v=u*_*c-g*d*c+g*a*p-o*_*p-u*a*f+o*d*f,R=g*d*l-u*_*l-g*a*h+o*_*h+u*a*m-o*d*m,A=t*S+i*y+r*v+s*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=S*C,e[1]=(_*h*s-d*m*s-_*r*p+i*m*p+d*r*f-i*h*f)*C,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*f+i*l*f)*C,e[3]=(d*l*s-a*h*s-d*r*c+i*h*c+a*r*p-i*l*p)*C,e[4]=y*C,e[5]=(u*m*s-g*h*s+g*r*p-t*m*p-u*r*f+t*h*f)*C,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*f-t*l*f)*C,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*p+t*l*p)*C,e[8]=v*C,e[9]=(g*d*s-u*_*s-g*i*p+t*_*p+u*i*f-t*d*f)*C,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*f+t*a*f)*C,e[11]=(u*a*s-o*d*s-u*i*c+t*d*c+o*i*p-t*a*p)*C,e[12]=R*C,e[13]=(u*_*r-g*d*r+g*i*h-t*_*h-u*i*m+t*d*m)*C,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*m-t*a*m)*C,e[15]=(o*d*r-u*a*r+u*i*l-t*d*l-o*i*h+t*a*h)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,p=s*u,g=s*d,_=o*u,m=o*d,f=a*d,S=l*c,y=l*u,v=l*d,R=i.x,A=i.y,C=i.z;return r[0]=(1-(_+f))*R,r[1]=(p+v)*R,r[2]=(g-y)*R,r[3]=0,r[4]=(p-v)*A,r[5]=(1-(h+f))*A,r[6]=(m+S)*A,r[7]=0,r[8]=(g+y)*C,r[9]=(m-S)*C,r[10]=(1-(h+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Zr.set(r[0],r[1],r[2]).length();const o=Zr.set(r[4],r[5],r[6]).length(),a=Zr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Gn.copy(this);const c=1/s,u=1/o,d=1/a;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=u,Gn.elements[5]*=u,Gn.elements[6]*=u,Gn.elements[8]*=d,Gn.elements[9]*=d,Gn.elements[10]*=d,t.setFromRotationMatrix(Gn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Ai){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r);let p,g;if(a===Ai)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===ua)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Ai){const l=this.elements,c=1/(t-e),u=1/(i-r),d=1/(o-s),h=(t+e)*c,p=(i+r)*u;let g,_;if(a===Ai)g=(o+s)*d,_=-2*d;else if(a===ua)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Zr=new w,Gn=new ot,dg=new w(0,0,0),ug=new w(1,1,1),Bi=new w,Ro=new w,bn=new w,mu=new ot,gu=new kt;class $n{constructor(e=0,t=0,i=0,r=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return mu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gu.setFromEuler(this),this.setFromQuaternion(gu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class nd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hg=0;const _u=new w,Kr=new kt,xi=new ot,Po=new w,ks=new w,fg=new w,pg=new kt,vu=new w(1,0,0),xu=new w(0,1,0),yu=new w(0,0,1),Mu={type:"added"},mg={type:"removed"},Jr={type:"childadded",child:null},lc={type:"childremoved",child:null};class yt extends Or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hg++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new w,t=new $n,i=new kt,r=new w(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ve}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Kr.setFromAxisAngle(e,t),this.quaternion.multiply(Kr),this}rotateOnWorldAxis(e,t){return Kr.setFromAxisAngle(e,t),this.quaternion.premultiply(Kr),this}rotateX(e){return this.rotateOnAxis(vu,e)}rotateY(e){return this.rotateOnAxis(xu,e)}rotateZ(e){return this.rotateOnAxis(yu,e)}translateOnAxis(e,t){return _u.copy(e).applyQuaternion(this.quaternion),this.position.add(_u.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vu,e)}translateY(e){return this.translateOnAxis(xu,e)}translateZ(e){return this.translateOnAxis(yu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Po.copy(e):Po.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(ks,Po,this.up):xi.lookAt(Po,ks,this.up),this.quaternion.setFromRotationMatrix(xi),r&&(xi.extractRotation(r.matrixWorld),Kr.setFromRotationMatrix(xi),this.quaternion.premultiply(Kr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Mu),Jr.child=e,this.dispatchEvent(Jr),Jr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mg),lc.child=e,this.dispatchEvent(lc),lc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Mu),Jr.child=e,this.dispatchEvent(Jr),Jr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,fg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,pg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}yt.DEFAULT_UP=new w(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new w,yi=new w,dc=new w,Mi=new w,Qr=new w,es=new w,Su=new w,uc=new w,hc=new w,fc=new w,pc=new Rt,mc=new Rt,gc=new Rt;class Un{constructor(e=new w,t=new w,i=new w){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Wn.subVectors(e,t),r.cross(Wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Wn.subVectors(r,t),yi.subVectors(i,t),dc.subVectors(e,t);const o=Wn.dot(Wn),a=Wn.dot(yi),l=Wn.dot(dc),c=yi.dot(yi),u=yi.dot(dc),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mi.x),l.addScaledVector(o,Mi.y),l.addScaledVector(a,Mi.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return pc.setScalar(0),mc.setScalar(0),gc.setScalar(0),pc.fromBufferAttribute(e,t),mc.fromBufferAttribute(e,i),gc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(pc,s.x),o.addScaledVector(mc,s.y),o.addScaledVector(gc,s.z),o}static isFrontFacing(e,t,i,r){return Wn.subVectors(i,t),yi.subVectors(e,t),Wn.cross(yi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Wn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Qr.subVectors(r,i),es.subVectors(s,i),uc.subVectors(e,i);const l=Qr.dot(uc),c=es.dot(uc);if(l<=0&&c<=0)return t.copy(i);hc.subVectors(e,r);const u=Qr.dot(hc),d=es.dot(hc);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Qr,o);fc.subVectors(e,s);const p=Qr.dot(fc),g=es.dot(fc);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(es,a);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Su.subVectors(s,r),a=(d-u)/(d-u+(p-g)),t.copy(r).addScaledVector(Su,a);const f=1/(m+_+h);return o=_*f,a=h*f,t.copy(i).addScaledVector(Qr,o).addScaledVector(es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ki={h:0,s:0,l:0},Do={h:0,s:0,l:0};function _c(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=In){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=ed(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=_c(o,s,e+1/3),this.g=_c(o,s,e),this.b=_c(o,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,t=In){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=In){const i=Zh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ci(e.r),this.g=Ci(e.g),this.b=Ci(e.b),this}copyLinearToSRGB(e){return this.r=ms(e.r),this.g=ms(e.g),this.b=ms(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=In){return Ke.workingToColorSpace(Jt.copy(this),e),Math.round(Xe(Jt.r*255,0,255))*65536+Math.round(Xe(Jt.g*255,0,255))*256+Math.round(Xe(Jt.b*255,0,255))}getHexString(e=In){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Jt.copy(this),t);const i=Jt.r,r=Jt.g,s=Jt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=In){Ke.workingToColorSpace(Jt.copy(this),e);const t=Jt.r,i=Jt.g,r=Jt.b;return e!==In?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ki),this.setHSL(ki.h+e,ki.s+t,ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ki),e.getHSL(Do);const i=Zs(ki.h,Do.h,t),r=Zs(ki.s,Do.s,t),s=Zs(ki.l,Do.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new je;je.NAMES=Zh;let gg=0;class Ps extends Or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gg++}),this.uuid=Rs(),this.name="",this.type="Material",this.blending=hs,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vc,this.blendDst=Gc,this.blendEquation=yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=au,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xr,this.stencilZFail=Xr,this.stencilZPass=Xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(i.blending=this.blending),this.side!==Di&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Vc&&(i.blendSrc=this.blendSrc),this.blendDst!==Gc&&(i.blendDst=this.blendDst),this.blendEquation!==yr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==au&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Xr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Xr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class di extends Ps{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const It=new w,Lo=new Ne;let _g=0;class Pt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_g++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=cu,this.updateRanges=[],this.gpuType=Ti,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Lo.fromBufferAttribute(this,t),Lo.applyMatrix3(e),this.setXY(t,Lo.x,Lo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=as(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=on(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=as(t,this.array)),t}setX(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=as(t,this.array)),t}setY(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=as(t,this.array)),t}setZ(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=as(t,this.array)),t}setW(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),i=on(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),i=on(i,this.array),r=on(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),i=on(i,this.array),r=on(r,this.array),s=on(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==cu&&(e.usage=this.usage),e}}class Kh extends Pt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Jh extends Pt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class dt extends Pt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let vg=0;const Ln=new ot,vc=new yt,ts=new w,En=new qn,Hs=new qn,Wt=new w;class Ut extends Or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qh(e)?Jh:Kh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ln.makeRotationFromQuaternion(e),this.applyMatrix4(Ln),this}rotateX(e){return Ln.makeRotationX(e),this.applyMatrix4(Ln),this}rotateY(e){return Ln.makeRotationY(e),this.applyMatrix4(Ln),this}rotateZ(e){return Ln.makeRotationZ(e),this.applyMatrix4(Ln),this}translate(e,t,i){return Ln.makeTranslation(e,t,i),this.applyMatrix4(Ln),this}scale(e,t,i){return Ln.makeScale(e,t,i),this.applyMatrix4(Ln),this}lookAt(e){return vc.lookAt(e),vc.updateMatrix(),this.applyMatrix4(vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];En.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ra);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const i=this.boundingSphere.center;if(En.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Hs.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(En.min,Hs.min),En.expandByPoint(Wt),Wt.addVectors(En.max,Hs.max),En.expandByPoint(Wt)):(En.expandByPoint(Hs.min),En.expandByPoint(Hs.max))}En.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Wt.fromBufferAttribute(a,c),l&&(ts.fromBufferAttribute(e,c),Wt.add(ts)),r=Math.max(r,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new w,l[D]=new w;const c=new w,u=new w,d=new w,h=new Ne,p=new Ne,g=new Ne,_=new w,m=new w;function f(D,E,M){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,M),h.fromBufferAttribute(s,D),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,M),u.sub(c),d.sub(c),p.sub(h),g.sub(h);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(P),a[D].add(_),a[E].add(_),a[M].add(_),l[D].add(m),l[E].add(m),l[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let D=0,E=S.length;D<E;++D){const M=S[D],P=M.start,B=M.count;for(let F=P,G=P+B;F<G;F+=3)f(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const y=new w,v=new w,R=new w,A=new w;function C(D){R.fromBufferAttribute(r,D),A.copy(R);const E=a[D];y.copy(E),y.sub(R.multiplyScalar(R.dot(E))).normalize(),v.crossVectors(A,E);const P=v.dot(l[D])<0?-1:1;o.setXYZW(D,y.x,y.y,y.z,P)}for(let D=0,E=S.length;D<E;++D){const M=S[D],P=M.start,B=M.count;for(let F=P,G=P+B;F<G;F+=3)C(e.getX(F+0)),C(e.getX(F+1)),C(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new w,s=new w,o=new w,a=new w,l=new w,c=new w,u=new w,d=new w;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new Pt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bu=new ot,fr=new Pa,Io=new Ra,Eu=new w,No=new w,Uo=new w,Oo=new w,xc=new w,Fo=new w,wu=new w,zo=new w;class oe extends yt{constructor(e=new Ut,t=new di){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Fo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(xc.fromBufferAttribute(d,e),o?Fo.addScaledVector(xc,u):Fo.addScaledVector(xc.sub(t),u))}t.add(Fo)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Io.copy(i.boundingSphere),Io.applyMatrix4(s),fr.copy(e.ray).recast(e.near),!(Io.containsPoint(fr.origin)===!1&&(fr.intersectSphere(Io,Eu)===null||fr.origin.distanceToSquared(Eu)>(e.far-e.near)**2))&&(bu.copy(s).invert(),fr.copy(e.ray).applyMatrix4(bu),!(i.boundingBox!==null&&fr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,fr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,R=y;v<R;v+=3){const A=a.getX(v),C=a.getX(v+1),D=a.getX(v+2);r=Bo(this,f,e,i,c,u,d,A,C,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);r=Bo(this,o,e,i,c,u,d,S,y,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,R=y;v<R;v+=3){const A=v,C=v+1,D=v+2;r=Bo(this,f,e,i,c,u,d,A,C,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=m,y=m+1,v=m+2;r=Bo(this,o,e,i,c,u,d,S,y,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function xg(n,e,t,i,r,s,o,a){let l;if(e.side===ln?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Di,a),l===null)return null;zo.copy(a),zo.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(zo);return c<t.near||c>t.far?null:{distance:c,point:zo.clone(),object:n}}function Bo(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,No),n.getVertexPosition(l,Uo),n.getVertexPosition(c,Oo);const u=xg(n,e,t,i,No,Uo,Oo,wu);if(u){const d=new w;Un.getBarycoord(wu,No,Uo,Oo,d),r&&(u.uv=Un.getInterpolatedAttribute(r,a,l,c,d,new Ne)),s&&(u.uv1=Un.getInterpolatedAttribute(s,a,l,c,d,new Ne)),o&&(u.normal=Un.getInterpolatedAttribute(o,a,l,c,d,new w),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new w,materialIndex:0};Un.getNormal(No,Uo,Oo,h.normal),u.face=h,u.barycoord=d}return u}class wt extends Ut{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(d,2));function g(_,m,f,S,y,v,R,A,C,D,E){const M=v/C,P=R/D,B=v/2,F=R/2,G=A/2,j=C+1,X=D+1;let $=0,V=0;const ie=new w;for(let he=0;he<X;he++){const ye=he*P-F;for(let He=0;He<j;He++){const rt=He*M-B;ie[_]=rt*S,ie[m]=ye*y,ie[f]=G,c.push(ie.x,ie.y,ie.z),ie[_]=0,ie[m]=0,ie[f]=A>0?1:-1,u.push(ie.x,ie.y,ie.z),d.push(He/C),d.push(1-he/D),$+=1}}for(let he=0;he<D;he++)for(let ye=0;ye<C;ye++){const He=h+ye+j*he,rt=h+ye+j*(he+1),Y=h+(ye+1)+j*(he+1),se=h+(ye+1)+j*he;l.push(He,rt,se),l.push(rt,Y,se),V+=6}a.addGroup(p,V,E),p+=V,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function bs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function an(n){const e={};for(let t=0;t<n.length;t++){const i=bs(n[t]);for(const r in i)e[r]=i[r]}return e}function yg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Qh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Mg={clone:bs,merge:an};var Sg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ki extends Ps{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sg,this.fragmentShader=bg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bs(e.uniforms),this.uniformsGroups=yg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ef extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Ai}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new w,Tu=new Ne,Au=new Ne;class wn extends ef{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ss*2*Math.atan(Math.tan(fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,Tu,Au),t.subVectors(Au,Tu)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ns=-90,is=1;class Eg extends yt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new wn(ns,is,e,t);r.layers=this.layers,this.add(r);const s=new wn(ns,is,e,t);s.layers=this.layers,this.add(s);const o=new wn(ns,is,e,t);o.layers=this.layers,this.add(o);const a=new wn(ns,is,e,t);a.layers=this.layers,this.add(a);const l=new wn(ns,is,e,t);l.layers=this.layers,this.add(l);const c=new wn(ns,is,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Ai)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ua)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class tf extends vn{constructor(e=[],t=xs,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wg extends Cr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new tf(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new wt(5,5,5),s=new Ki({name:"CubemapFromEquirect",uniforms:bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:Yi});s.uniforms.tEquirect.value=t;const o=new oe(r,s),a=t.minFilter;return t.minFilter===Er&&(t.minFilter=si),new Eg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class jn extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tg={type:"move"};class yc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Tg)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new jn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Ag extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Mc=new w,Cg=new w,Rg=new Ve;class ti{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Mc.subVectors(i,t).cross(Cg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Mc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Rg.getNormalMatrix(e),r=this.coplanarPoint(Mc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pr=new Ra,Pg=new Ne(.5,.5),ko=new w;class id{constructor(e=new ti,t=new ti,i=new ti,r=new ti,s=new ti,o=new ti){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ai){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],d=r[6],h=r[7],p=r[8],g=r[9],_=r[10],m=r[11],f=r[12],S=r[13],y=r[14],v=r[15];if(i[0].setComponents(l-s,h-c,m-p,v-f).normalize(),i[1].setComponents(l+s,h+c,m+p,v+f).normalize(),i[2].setComponents(l+o,h+u,m+g,v+S).normalize(),i[3].setComponents(l-o,h-u,m-g,v-S).normalize(),i[4].setComponents(l-a,h-d,m-_,v-y).normalize(),t===Ai)i[5].setComponents(l+a,h+d,m+_,v+y).normalize();else if(t===ua)i[5].setComponents(a,d,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pr)}intersectsSprite(e){pr.center.set(0,0,0);const t=Pg.distanceTo(e.center);return pr.radius=.7071067811865476+t,pr.applyMatrix4(e.matrixWorld),this.intersectsSphere(pr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ko.x=r.normal.x>0?e.max.x:e.min.x,ko.y=r.normal.y>0?e.max.y:e.min.y,ko.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ko)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fr extends Ps{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const fa=new w,pa=new w,Cu=new ot,Vs=new Pa,Ho=new Ra,Sc=new w,Ru=new w;class bi extends yt{constructor(e=new Ut,t=new Fr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)fa.fromBufferAttribute(t,r-1),pa.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=fa.distanceTo(pa);e.setAttribute("lineDistance",new dt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ho.copy(i.boundingSphere),Ho.applyMatrix4(r),Ho.radius+=s,e.ray.intersectsSphere(Ho)===!1)return;Cu.copy(r).invert(),Vs.copy(e.ray).applyMatrix4(Cu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const f=u.getX(_),S=u.getX(_+1),y=Vo(this,e,Vs,l,f,S,_);y&&t.push(y)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),f=Vo(this,e,Vs,l,_,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const f=Vo(this,e,Vs,l,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=Vo(this,e,Vs,l,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Vo(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(fa.fromBufferAttribute(a,r),pa.fromBufferAttribute(a,s),t.distanceSqToSegment(fa,pa,Sc,Ru)>i)return;Sc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Sc);if(!(c<e.near||c>e.far))return{distance:c,point:Ru.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Pu=new w,Du=new w;class rd extends bi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Pu.fromBufferAttribute(t,r),Du.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Pu.distanceTo(Du);e.setAttribute("lineDistance",new dt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nf extends vn{constructor(e,t,i=Tr,r,s,o,a=Yn,l=Yn,c,u=no,d=1){if(u!==no&&u!==io)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new td(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Yt extends Ut{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],p=[];let g=0;const _=[],m=i/2;let f=0;S(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new dt(d,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(p,2));function S(){const v=new w,R=new w;let A=0;const C=(t-e)/i;for(let D=0;D<=s;D++){const E=[],M=D/s,P=M*(t-e)+e;for(let B=0;B<=r;B++){const F=B/r,G=F*l+a,j=Math.sin(G),X=Math.cos(G);R.x=P*j,R.y=-M*i+m,R.z=P*X,d.push(R.x,R.y,R.z),v.set(j,C,X).normalize(),h.push(v.x,v.y,v.z),p.push(F,1-M),E.push(g++)}_.push(E)}for(let D=0;D<r;D++)for(let E=0;E<s;E++){const M=_[E][D],P=_[E+1][D],B=_[E+1][D+1],F=_[E][D+1];(e>0||E!==0)&&(u.push(M,P,F),A+=3),(t>0||E!==s-1)&&(u.push(P,B,F),A+=3)}c.addGroup(f,A,0),f+=A}function y(v){const R=g,A=new Ne,C=new w;let D=0;const E=v===!0?e:t,M=v===!0?1:-1;for(let B=1;B<=r;B++)d.push(0,m*M,0),h.push(0,M,0),p.push(.5,.5),g++;const P=g;for(let B=0;B<=r;B++){const G=B/r*l+a,j=Math.cos(G),X=Math.sin(G);C.x=E*X,C.y=m*M,C.z=E*j,d.push(C.x,C.y,C.z),h.push(0,M,0),A.x=j*.5+.5,A.y=X*.5*M+.5,p.push(A.x,A.y),g++}for(let B=0;B<r;B++){const F=R+B,G=P+B;v===!0?u.push(G,G+1,F):u.push(G+1,G,F),D+=3}c.addGroup(f,D,v===!0?1:2),f+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class sd extends Ut{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(s.slice(),3)),this.setAttribute("uv",new dt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const y=new w,v=new w,R=new w;for(let A=0;A<t.length;A+=3)p(t[A+0],y),p(t[A+1],v),p(t[A+2],R),l(y,v,R,S)}function l(S,y,v,R){const A=R+1,C=[];for(let D=0;D<=A;D++){C[D]=[];const E=S.clone().lerp(v,D/A),M=y.clone().lerp(v,D/A),P=A-D;for(let B=0;B<=P;B++)B===0&&D===A?C[D][B]=E:C[D][B]=E.clone().lerp(M,B/P)}for(let D=0;D<A;D++)for(let E=0;E<2*(A-D)-1;E++){const M=Math.floor(E/2);E%2===0?(h(C[D][M+1]),h(C[D+1][M]),h(C[D][M])):(h(C[D][M+1]),h(C[D+1][M+1]),h(C[D+1][M]))}}function c(S){const y=new w;for(let v=0;v<s.length;v+=3)y.x=s[v+0],y.y=s[v+1],y.z=s[v+2],y.normalize().multiplyScalar(S),s[v+0]=y.x,s[v+1]=y.y,s[v+2]=y.z}function u(){const S=new w;for(let y=0;y<s.length;y+=3){S.x=s[y+0],S.y=s[y+1],S.z=s[y+2];const v=m(S)/2/Math.PI+.5,R=f(S)/Math.PI+.5;o.push(v,1-R)}g(),d()}function d(){for(let S=0;S<o.length;S+=6){const y=o[S+0],v=o[S+2],R=o[S+4],A=Math.max(y,v,R),C=Math.min(y,v,R);A>.9&&C<.1&&(y<.2&&(o[S+0]+=1),v<.2&&(o[S+2]+=1),R<.2&&(o[S+4]+=1))}}function h(S){s.push(S.x,S.y,S.z)}function p(S,y){const v=S*3;y.x=e[v+0],y.y=e[v+1],y.z=e[v+2]}function g(){const S=new w,y=new w,v=new w,R=new w,A=new Ne,C=new Ne,D=new Ne;for(let E=0,M=0;E<s.length;E+=9,M+=6){S.set(s[E+0],s[E+1],s[E+2]),y.set(s[E+3],s[E+4],s[E+5]),v.set(s[E+6],s[E+7],s[E+8]),A.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),D.set(o[M+4],o[M+5]),R.copy(S).add(y).add(v).divideScalar(3);const P=m(R);_(A,M+0,S,P),_(C,M+2,y,P),_(D,M+4,v,P)}}function _(S,y,v,R){R<0&&S.x===1&&(o[y]=S.x-1),v.x===0&&v.z===0&&(o[y]=R/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sd(e.vertices,e.indices,e.radius,e.details)}}const Go=new w,Wo=new w,bc=new w,Xo=new Un;class rf extends Ut{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(fs*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),h={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:f}=Xo;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),Xo.getNormal(bc),d[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,d[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,d[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){const y=(S+1)%3,v=d[S],R=d[y],A=Xo[u[S]],C=Xo[u[y]],D=`${v}_${R}`,E=`${R}_${v}`;E in h&&h[E]?(bc.dot(h[E].normal)<=s&&(p.push(A.x,A.y,A.z),p.push(C.x,C.y,C.z)),h[E]=null):D in h||(h[D]={index0:c[S],index1:c[y],normal:bc.clone()})}}for(const g in h)if(h[g]){const{index0:_,index1:m}=h[g];Go.fromBufferAttribute(a,_),Wo.fromBufferAttribute(a,m),p.push(Go.x,Go.y,Go.z),p.push(Wo.x,Wo.y,Wo.z)}this.setAttribute("position",new dt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ls extends sd{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ls(e.radius,e.detail)}}class fo extends Ut{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,h=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<u;f++){const S=f*h-o;for(let y=0;y<c;y++){const v=y*d-s;g.push(v,-S,0),_.push(0,0,1),m.push(y/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<a;S++){const y=S+c*f,v=S+c*(f+1),R=S+1+c*(f+1),A=S+1+c*f;p.push(y,v,A),p.push(v,R,A)}this.setIndex(p),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fo(e.width,e.height,e.widthSegments,e.heightSegments)}}class zr extends Ut{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new w,h=new w,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const S=[],y=f/i;let v=0;f===0&&o===0?v=.5/t:f===i&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const A=R/t;d.x=-e*Math.cos(r+A*s)*Math.sin(o+y*a),d.y=e*Math.cos(o+y*a),d.z=e*Math.sin(r+A*s)*Math.sin(o+y*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(A+v,1-y),S.push(c++)}u.push(S)}for(let f=0;f<i;f++)for(let S=0;S<t;S++){const y=u[f][S+1],v=u[f][S],R=u[f+1][S],A=u[f+1][S+1];(f!==0||o>0)&&p.push(y,v,A),(f!==i-1||l<Math.PI)&&p.push(v,R,A)}this.setIndex(p),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mr extends Ut{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new w,d=new w,h=new w;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){const _=g/r*s,m=p/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,f=(r+1)*(p-1)+g,S=(r+1)*p+g;o.push(_,m,S),o.push(m,f,S)}this.setIndex(o),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(l,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Rr extends Ps{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jh,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Dg extends Ps{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Am,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Lg extends Ps{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ig extends Fr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class od extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ng extends od{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ec=new ot,Lu=new w,Iu=new w;class sf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=li,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new id,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Lu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Lu),Iu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Iu),t.updateMatrixWorld(),Ec.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ec),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ec)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ug extends sf{constructor(){super(new wn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Ss*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Og extends od{constructor(e,t,i=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Ug}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ad extends ef{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Fg extends sf{constructor(){super(new ad(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zg extends od{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Fg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Bg extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Nu=new ot;class of{constructor(e,t,i=0,r=1/0){this.ray=new Pa(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new nd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Nu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nu),this}intersectObject(e,t=!0,i=[]){return Al(e,this,i,t),i.sort(Uu),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Al(e[r],this,i,t);return i.sort(Uu),i}}function Uu(n,e){return n.distance-e.distance}function Al(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Al(s[o],e,t,!0)}}class Ou{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class kg extends rd{constructor(e=10,t=10,i=4473924,r=8947848){i=new je(i),r=new je(r);const s=t/2,o=e/t,a=e/2,l=[],c=[];for(let h=0,p=0,g=-a;h<=t;h++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=h===s?i:r;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}const u=new Ut;u.setAttribute("position",new dt(l,3)),u.setAttribute("color",new dt(c,3));const d=new Fr({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const jo=new qn;class Hg extends rd{constructor(e,t=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),r=new Float32Array(24),s=new Ut;s.setIndex(new Pt(i,1)),s.setAttribute("position",new Pt(r,3)),super(s,new Fr({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&jo.setFromObject(this.object),jo.isEmpty())return;const e=jo.min,t=jo.max,i=this.geometry.attributes.position,r=i.array;r[0]=t.x,r[1]=t.y,r[2]=t.z,r[3]=e.x,r[4]=t.y,r[5]=t.z,r[6]=e.x,r[7]=e.y,r[8]=t.z,r[9]=t.x,r[10]=e.y,r[11]=t.z,r[12]=t.x,r[13]=t.y,r[14]=e.z,r[15]=e.x,r[16]=t.y,r[17]=e.z,r[18]=e.x,r[19]=e.y,r[20]=e.z,r[21]=t.x,r[22]=e.y,r[23]=e.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class af extends Or{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Fu(n,e,t,i){const r=Vg(i);switch(t){case Hh:return n*e;case Gh:return n*e/r.components*r.byteLength;case Kl:return n*e/r.components*r.byteLength;case Wh:return n*e*2/r.components*r.byteLength;case Jl:return n*e*2/r.components*r.byteLength;case Vh:return n*e*3/r.components*r.byteLength;case Xn:return n*e*4/r.components*r.byteLength;case Ql:return n*e*4/r.components*r.byteLength;case ea:case ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case na:case ia:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case nl:case rl:return Math.max(n,16)*Math.max(e,8)/4;case tl:case il:return Math.max(n,8)*Math.max(e,8)/2;case sl:case ol:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case cl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case dl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ul:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case hl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case fl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case pl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ml:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case gl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case _l:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case vl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case xl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case yl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ra:case Sl:case bl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Xh:case El:return Math.ceil(n/4)*Math.ceil(e/4)*8;case wl:case Tl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Vg(n){switch(n){case li:case zh:return{byteLength:1,components:1};case eo:case Bh:case ho:return{byteLength:2,components:1};case $l:case Zl:return{byteLength:2,components:4};case Tr:case ql:case Ti:return{byteLength:4,components:1};case kh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yl);function cf(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Gg(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Wg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xg=`#ifdef USE_ALPHAHASH
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
#endif`,jg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$g=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zg=`#ifdef USE_AOMAP
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
#endif`,Kg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jg=`#ifdef USE_BATCHING
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
#endif`,Qg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,e_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,t_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,n_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,i_=`#ifdef USE_IRIDESCENCE
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
#endif`,r_=`#ifdef USE_BUMPMAP
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
#endif`,s_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,o_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,a_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,c_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,l_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,d_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,u_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,h_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,f_=`#define PI 3.141592653589793
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
} // validated`,p_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,m_=`vec3 transformedNormal = objectNormal;
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
#endif`,g_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,__=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,v_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,x_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,y_="gl_FragColor = linearToOutputTexel( gl_FragColor );",M_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,S_=`#ifdef USE_ENVMAP
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
#endif`,b_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,E_=`#ifdef USE_ENVMAP
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
#endif`,w_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,T_=`#ifdef USE_ENVMAP
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
#endif`,A_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,C_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,R_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,P_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,D_=`#ifdef USE_GRADIENTMAP
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
}`,L_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,I_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,N_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,U_=`uniform bool receiveShadow;
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
#endif`,O_=`#ifdef USE_ENVMAP
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
#endif`,F_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,B_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,k_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,H_=`PhysicalMaterial material;
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
#endif`,V_=`struct PhysicalMaterial {
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
}`,G_=`
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
#endif`,W_=`#if defined( RE_IndirectDiffuse )
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
#endif`,X_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,j_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Y_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Z_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,K_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,J_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Q_=`#if defined( USE_POINTS_UV )
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
#endif`,e0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,t0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,n0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,i0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,r0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,s0=`#ifdef USE_MORPHTARGETS
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
#endif`,o0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,a0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,c0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,l0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,u0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,h0=`#ifdef USE_NORMALMAP
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
#endif`,f0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,p0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,m0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,g0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,v0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,x0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,y0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,M0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,S0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,b0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,E0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,w0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,T0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,A0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,C0=`float getShadowMask() {
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
}`,R0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,P0=`#ifdef USE_SKINNING
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
#endif`,D0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,L0=`#ifdef USE_SKINNING
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
#endif`,I0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,N0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,U0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,O0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,F0=`#ifdef USE_TRANSMISSION
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
#endif`,z0=`#ifdef USE_TRANSMISSION
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
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const G0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,W0=`uniform sampler2D t2D;
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
}`,X0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,q0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`#include <common>
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
}`,Z0=`#if DEPTH_PACKING == 3200
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
}`,K0=`#define DISTANCE
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
}`,J0=`#define DISTANCE
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
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ev=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tv=`uniform float scale;
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
}`,nv=`uniform vec3 diffuse;
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
}`,iv=`#include <common>
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
}`,rv=`uniform vec3 diffuse;
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
}`,sv=`#define LAMBERT
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
}`,ov=`#define LAMBERT
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
}`,av=`#define MATCAP
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
}`,cv=`#define MATCAP
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
}`,lv=`#define NORMAL
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
}`,dv=`#define NORMAL
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
}`,uv=`#define PHONG
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
}`,hv=`#define PHONG
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
}`,fv=`#define STANDARD
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
}`,pv=`#define STANDARD
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
}`,mv=`#define TOON
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
}`,gv=`#define TOON
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
}`,_v=`uniform float size;
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
}`,vv=`uniform vec3 diffuse;
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
}`,xv=`#include <common>
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
}`,yv=`uniform vec3 color;
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
}`,Mv=`uniform float rotation;
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
}`,Sv=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:Wg,alphahash_pars_fragment:Xg,alphamap_fragment:jg,alphamap_pars_fragment:Yg,alphatest_fragment:qg,alphatest_pars_fragment:$g,aomap_fragment:Zg,aomap_pars_fragment:Kg,batching_pars_vertex:Jg,batching_vertex:Qg,begin_vertex:e_,beginnormal_vertex:t_,bsdfs:n_,iridescence_fragment:i_,bumpmap_pars_fragment:r_,clipping_planes_fragment:s_,clipping_planes_pars_fragment:o_,clipping_planes_pars_vertex:a_,clipping_planes_vertex:c_,color_fragment:l_,color_pars_fragment:d_,color_pars_vertex:u_,color_vertex:h_,common:f_,cube_uv_reflection_fragment:p_,defaultnormal_vertex:m_,displacementmap_pars_vertex:g_,displacementmap_vertex:__,emissivemap_fragment:v_,emissivemap_pars_fragment:x_,colorspace_fragment:y_,colorspace_pars_fragment:M_,envmap_fragment:S_,envmap_common_pars_fragment:b_,envmap_pars_fragment:E_,envmap_pars_vertex:w_,envmap_physical_pars_fragment:O_,envmap_vertex:T_,fog_vertex:A_,fog_pars_vertex:C_,fog_fragment:R_,fog_pars_fragment:P_,gradientmap_pars_fragment:D_,lightmap_pars_fragment:L_,lights_lambert_fragment:I_,lights_lambert_pars_fragment:N_,lights_pars_begin:U_,lights_toon_fragment:F_,lights_toon_pars_fragment:z_,lights_phong_fragment:B_,lights_phong_pars_fragment:k_,lights_physical_fragment:H_,lights_physical_pars_fragment:V_,lights_fragment_begin:G_,lights_fragment_maps:W_,lights_fragment_end:X_,logdepthbuf_fragment:j_,logdepthbuf_pars_fragment:Y_,logdepthbuf_pars_vertex:q_,logdepthbuf_vertex:$_,map_fragment:Z_,map_pars_fragment:K_,map_particle_fragment:J_,map_particle_pars_fragment:Q_,metalnessmap_fragment:e0,metalnessmap_pars_fragment:t0,morphinstance_vertex:n0,morphcolor_vertex:i0,morphnormal_vertex:r0,morphtarget_pars_vertex:s0,morphtarget_vertex:o0,normal_fragment_begin:a0,normal_fragment_maps:c0,normal_pars_fragment:l0,normal_pars_vertex:d0,normal_vertex:u0,normalmap_pars_fragment:h0,clearcoat_normal_fragment_begin:f0,clearcoat_normal_fragment_maps:p0,clearcoat_pars_fragment:m0,iridescence_pars_fragment:g0,opaque_fragment:_0,packing:v0,premultiplied_alpha_fragment:x0,project_vertex:y0,dithering_fragment:M0,dithering_pars_fragment:S0,roughnessmap_fragment:b0,roughnessmap_pars_fragment:E0,shadowmap_pars_fragment:w0,shadowmap_pars_vertex:T0,shadowmap_vertex:A0,shadowmask_pars_fragment:C0,skinbase_vertex:R0,skinning_pars_vertex:P0,skinning_vertex:D0,skinnormal_vertex:L0,specularmap_fragment:I0,specularmap_pars_fragment:N0,tonemapping_fragment:U0,tonemapping_pars_fragment:O0,transmission_fragment:F0,transmission_pars_fragment:z0,uv_pars_fragment:B0,uv_pars_vertex:k0,uv_vertex:H0,worldpos_vertex:V0,background_vert:G0,background_frag:W0,backgroundCube_vert:X0,backgroundCube_frag:j0,cube_vert:Y0,cube_frag:q0,depth_vert:$0,depth_frag:Z0,distanceRGBA_vert:K0,distanceRGBA_frag:J0,equirect_vert:Q0,equirect_frag:ev,linedashed_vert:tv,linedashed_frag:nv,meshbasic_vert:iv,meshbasic_frag:rv,meshlambert_vert:sv,meshlambert_frag:ov,meshmatcap_vert:av,meshmatcap_frag:cv,meshnormal_vert:lv,meshnormal_frag:dv,meshphong_vert:uv,meshphong_frag:hv,meshphysical_vert:fv,meshphysical_frag:pv,meshtoon_vert:mv,meshtoon_frag:gv,points_vert:_v,points_frag:vv,shadow_vert:xv,shadow_frag:yv,sprite_vert:Mv,sprite_frag:Sv},ce={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},ni={basic:{uniforms:an([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:an([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new je(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:an([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:an([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:an([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new je(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:an([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:an([ce.points,ce.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:an([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:an([ce.common,ce.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:an([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:an([ce.sprite,ce.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:an([ce.common,ce.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:an([ce.lights,ce.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};ni.physical={uniforms:an([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Yo={r:0,b:0,g:0},mr=new $n,bv=new ot;function Ev(n,e,t,i,r,s,o){const a=new je(0);let l=s===!0?0:1,c,u,d=null,h=0,p=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function _(y){let v=!1;const R=g(y);R===null?f(a,l):R&&R.isColor&&(f(R,1),v=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,v){const R=g(v);R&&(R.isCubeTexture||R.mapping===Ca)?(u===void 0&&(u=new oe(new wt(1,1,1),new Ki({name:"BackgroundCubeMaterial",uniforms:bs(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,C,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),mr.copy(v.backgroundRotation),mr.x*=-1,mr.y*=-1,mr.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(mr.y*=-1,mr.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(bv.makeRotationFromEuler(mr)),u.material.toneMapped=Ke.getTransfer(R.colorSpace)!==ct,(d!==R||h!==R.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=R,h=R.version,p=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new oe(new fo(2,2),new Ki({name:"BackgroundMaterial",uniforms:bs(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(R.colorSpace)!==ct,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||h!==R.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=R,h=R.version,p=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function f(y,v){y.getRGB(Yo,Qh(n)),i.buffers.color.setClear(Yo.r,Yo.g,Yo.b,v,o)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,f(a,l)},render:_,addToRenderList:m,dispose:S}}function wv(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(M,P,B,F,G){let j=!1;const X=d(F,B,P);s!==X&&(s=X,c(s.object)),j=p(M,F,B,G),j&&g(M,F,B,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,v(M,P,B,F),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function d(M,P,B){const F=B.wireframe===!0;let G=i[M.id];G===void 0&&(G={},i[M.id]=G);let j=G[P.id];j===void 0&&(j={},G[P.id]=j);let X=j[F];return X===void 0&&(X=h(l()),j[F]=X),X}function h(M){const P=[],B=[],F=[];for(let G=0;G<t;G++)P[G]=0,B[G]=0,F[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:F,object:M,attributes:{},index:null}}function p(M,P,B,F){const G=s.attributes,j=P.attributes;let X=0;const $=B.getAttributes();for(const V in $)if($[V].location>=0){const he=G[V];let ye=j[V];if(ye===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ye=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ye=M.instanceColor)),he===void 0||he.attribute!==ye||ye&&he.data!==ye.data)return!0;X++}return s.attributesNum!==X||s.index!==F}function g(M,P,B,F){const G={},j=P.attributes;let X=0;const $=B.getAttributes();for(const V in $)if($[V].location>=0){let he=j[V];he===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(he=M.instanceColor));const ye={};ye.attribute=he,he&&he.data&&(ye.data=he.data),G[V]=ye,X++}s.attributes=G,s.attributesNum=X,s.index=F}function _(){const M=s.newAttributes;for(let P=0,B=M.length;P<B;P++)M[P]=0}function m(M){f(M,0)}function f(M,P){const B=s.newAttributes,F=s.enabledAttributes,G=s.attributeDivisors;B[M]=1,F[M]===0&&(n.enableVertexAttribArray(M),F[M]=1),G[M]!==P&&(n.vertexAttribDivisor(M,P),G[M]=P)}function S(){const M=s.newAttributes,P=s.enabledAttributes;for(let B=0,F=P.length;B<F;B++)P[B]!==M[B]&&(n.disableVertexAttribArray(B),P[B]=0)}function y(M,P,B,F,G,j,X){X===!0?n.vertexAttribIPointer(M,P,B,G,j):n.vertexAttribPointer(M,P,B,F,G,j)}function v(M,P,B,F){_();const G=F.attributes,j=B.getAttributes(),X=P.defaultAttributeValues;for(const $ in j){const V=j[$];if(V.location>=0){let ie=G[$];if(ie===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(ie=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(ie=M.instanceColor)),ie!==void 0){const he=ie.normalized,ye=ie.itemSize,He=e.get(ie);if(He===void 0)continue;const rt=He.buffer,Y=He.type,se=He.bytesPerElement,Ee=Y===n.INT||Y===n.UNSIGNED_INT||ie.gpuType===ql;if(ie.isInterleavedBufferAttribute){const fe=ie.data,we=fe.stride,Je=ie.offset;if(fe.isInstancedInterleavedBuffer){for(let Ie=0;Ie<V.locationSize;Ie++)f(V.location+Ie,fe.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Ie=0;Ie<V.locationSize;Ie++)m(V.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let Ie=0;Ie<V.locationSize;Ie++)y(V.location+Ie,ye/V.locationSize,Y,he,we*se,(Je+ye/V.locationSize*Ie)*se,Ee)}else{if(ie.isInstancedBufferAttribute){for(let fe=0;fe<V.locationSize;fe++)f(V.location+fe,ie.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let fe=0;fe<V.locationSize;fe++)m(V.location+fe);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let fe=0;fe<V.locationSize;fe++)y(V.location+fe,ye/V.locationSize,Y,he,ye*se,ye/V.locationSize*fe*se,Ee)}}else if(X!==void 0){const he=X[$];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(V.location,he);break;case 3:n.vertexAttrib3fv(V.location,he);break;case 4:n.vertexAttrib4fv(V.location,he);break;default:n.vertexAttrib1fv(V.location,he)}}}}S()}function R(){D();for(const M in i){const P=i[M];for(const B in P){const F=P[B];for(const G in F)u(F[G].object),delete F[G];delete P[B]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const P=i[M.id];for(const B in P){const F=P[B];for(const G in F)u(F[G].object),delete F[G];delete P[B]}delete i[M.id]}function C(M){for(const P in i){const B=i[P];if(B[M.id]===void 0)continue;const F=B[M.id];for(const G in F)u(F[G].object),delete F[G];delete B[M.id]}}function D(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:E,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Tv(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];t.update(p,i,1)}function l(c,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Av(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Xn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const D=C===ho&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==li&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Ti&&!D)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:R,maxSamples:A}}function Cv(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new ti,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const S=s?0:i,y=S*4;let v=f.clippingState||null;l.value=v,v=u(g,h,y,p);for(let R=0;R!==y;++R)v[R]=t[R];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,v=p;y!==_;++y,v+=4)o.copy(d[y]).applyMatrix4(S,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Rv(n){let e=new WeakMap;function t(o,a){return a===Kc?o.mapping=xs:a===Jc&&(o.mapping=ys),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Kc||a===Jc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new wg(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ds=4,zu=[.125,.215,.35,.446,.526,.582],Sr=20,wc=new ad,Bu=new je;let Tc=null,Ac=0,Cc=0,Rc=!1;const vr=(1+Math.sqrt(5))/2,rs=1/vr,ku=[new w(-vr,rs,0),new w(vr,rs,0),new w(-rs,0,vr),new w(rs,0,vr),new w(0,vr,-rs),new w(0,vr,rs),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Pv=new w;class Hu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=Pv}=s;Tc=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Tc,Ac,Cc),this._renderer.xr.enabled=Rc,e.scissorTest=!1,qo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xs||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tc=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:si,minFilter:si,generateMipmaps:!1,type:ho,format:Xn,colorSpace:Ms,depthBuffer:!1},r=Vu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vu(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dv(s)),this._blurMaterial=Lv(s,e,t)}return r}_compileMaterial(e){const t=new oe(this._lodPlanes[0],e);this._renderer.compile(t,wc)}_sceneToCubeUV(e,t,i,r,s){const l=new wn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Bu),d.toneMapping=qi,d.autoClear=!1;const g=new di({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),_=new oe(new wt,g);let m=!1;const f=e.background;f?f.isColor&&(g.color.copy(f),e.background=null,m=!0):(g.color.copy(Bu),m=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):y===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));const v=this._cubeSize;qo(r,y*v,S>2?v:0,v,v),d.setRenderTarget(r),m&&d.render(_,l),d.render(e,l)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=p,d.autoClear=h,e.background=f}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===xs||e.mapping===ys;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new oe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;qo(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,wc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ku[(r-s-1)%ku.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new oe(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Sr-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Sr;m>Sr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Sr}`);const f=[];let S=0;for(let C=0;C<Sr;++C){const D=C/_,E=Math.exp(-D*D/2);f.push(E),C===0?S+=E:C<m&&(S+=2*E)}for(let C=0;C<f.length;C++)f[C]=f[C]/S;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:y}=this;h.dTheta.value=g,h.mipInt.value=y-i;const v=this._sizeLods[r],R=3*v*(r>y-ds?r-y+ds:0),A=4*(this._cubeSize-v);qo(t,R,A,3*v,2*v),l.setRenderTarget(t),l.render(d,wc)}}function Dv(n){const e=[],t=[],i=[];let r=n;const s=n-ds+1+zu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ds?l=zu[o-n+ds-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,_=3,m=2,f=1,S=new Float32Array(_*g*p),y=new Float32Array(m*g*p),v=new Float32Array(f*g*p);for(let A=0;A<p;A++){const C=A%3*2/3-1,D=A>2?0:-1,E=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];S.set(E,_*g*A),y.set(h,m*g*A);const M=[A,A,A,A,A,A];v.set(M,f*g*A)}const R=new Ut;R.setAttribute("position",new Pt(S,_)),R.setAttribute("uv",new Pt(y,m)),R.setAttribute("faceIndex",new Pt(v,f)),e.push(R),r>ds&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Vu(n,e,t){const i=new Cr(n,e,t);return i.texture.mapping=Ca,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qo(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Lv(n,e,t){const i=new Float32Array(Sr),r=new w(0,1,0);return new Ki({name:"SphericalGaussianBlur",defines:{n:Sr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:cd(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Gu(){return new Ki({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cd(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Wu(){return new Ki({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function cd(){return`

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
	`}function Iv(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Kc||l===Jc,u=l===xs||l===ys;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Hu(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new Hu(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Nv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ps("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Uv(n,e,t,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(d){const h=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const S=p.array;_=p.version;for(let y=0,v=S.length;y<v;y+=3){const R=S[y+0],A=S[y+1],C=S[y+2];h.push(R,A,A,C,C,R)}}else if(g!==void 0){const S=g.array;_=g.version;for(let y=0,v=S.length/3-1;y<v;y+=3){const R=y+0,A=y+1,C=y+2;h.push(R,A,A,C,C,R)}}else return;const m=new(qh(h)?Jh:Kh)(h,1);m.version=_;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Ov(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,p){n.drawElements(i,p,s,h*o),t.update(p,i,1)}function c(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,h*o,g),t.update(p,i,g))}function u(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function d(h,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)c(h[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,_,0,g);let f=0;for(let S=0;S<g;S++)f+=p[S]*_[S];t.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Fv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function zv(n,e,t){const i=new WeakMap,r=new Rt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let M=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let R=a.attributes.position.count*v,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const C=new Float32Array(R*A*4*d),D=new $h(C,R,A,d);D.type=Ti,D.needsUpdate=!0;const E=v*4;for(let P=0;P<d;P++){const B=f[P],F=S[P],G=y[P],j=R*A*4*P;for(let X=0;X<B.count;X++){const $=X*E;g===!0&&(r.fromBufferAttribute(B,X),C[j+$+0]=r.x,C[j+$+1]=r.y,C[j+$+2]=r.z,C[j+$+3]=0),_===!0&&(r.fromBufferAttribute(F,X),C[j+$+4]=r.x,C[j+$+5]=r.y,C[j+$+6]=r.z,C[j+$+7]=0),m===!0&&(r.fromBufferAttribute(G,X),C[j+$+8]=r.x,C[j+$+9]=r.y,C[j+$+10]=r.z,C[j+$+11]=G.itemSize===4?r.w:1)}}h={count:d,texture:D,size:new Ne(R,A)},i.set(a,h),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Bv(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const lf=new vn,Xu=new nf(1,1),df=new $h,uf=new cg,hf=new tf,ju=[],Yu=[],qu=new Float32Array(16),$u=new Float32Array(9),Zu=new Float32Array(4);function Ds(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=ju[r];if(s===void 0&&(s=new Float32Array(r),ju[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Vt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Gt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Da(n,e){let t=Yu[e];t===void 0&&(t=new Int32Array(e),Yu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function kv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Hv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2fv(this.addr,e),Gt(t,e)}}function Vv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;n.uniform3fv(this.addr,e),Gt(t,e)}}function Gv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4fv(this.addr,e),Gt(t,e)}}function Wv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;Zu.set(i),n.uniformMatrix2fv(this.addr,!1,Zu),Gt(t,i)}}function Xv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;$u.set(i),n.uniformMatrix3fv(this.addr,!1,$u),Gt(t,i)}}function jv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;qu.set(i),n.uniformMatrix4fv(this.addr,!1,qu),Gt(t,i)}}function Yv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function qv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2iv(this.addr,e),Gt(t,e)}}function $v(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3iv(this.addr,e),Gt(t,e)}}function Zv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4iv(this.addr,e),Gt(t,e)}}function Kv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Jv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2uiv(this.addr,e),Gt(t,e)}}function Qv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3uiv(this.addr,e),Gt(t,e)}}function ex(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4uiv(this.addr,e),Gt(t,e)}}function tx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Xu.compareFunction=Yh,s=Xu):s=lf,t.setTexture2D(e||s,r)}function nx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||uf,r)}function ix(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||hf,r)}function rx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||df,r)}function sx(n){switch(n){case 5126:return kv;case 35664:return Hv;case 35665:return Vv;case 35666:return Gv;case 35674:return Wv;case 35675:return Xv;case 35676:return jv;case 5124:case 35670:return Yv;case 35667:case 35671:return qv;case 35668:case 35672:return $v;case 35669:case 35673:return Zv;case 5125:return Kv;case 36294:return Jv;case 36295:return Qv;case 36296:return ex;case 35678:case 36198:case 36298:case 36306:case 35682:return tx;case 35679:case 36299:case 36307:return nx;case 35680:case 36300:case 36308:case 36293:return ix;case 36289:case 36303:case 36311:case 36292:return rx}}function ox(n,e){n.uniform1fv(this.addr,e)}function ax(n,e){const t=Ds(e,this.size,2);n.uniform2fv(this.addr,t)}function cx(n,e){const t=Ds(e,this.size,3);n.uniform3fv(this.addr,t)}function lx(n,e){const t=Ds(e,this.size,4);n.uniform4fv(this.addr,t)}function dx(n,e){const t=Ds(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ux(n,e){const t=Ds(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function hx(n,e){const t=Ds(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function fx(n,e){n.uniform1iv(this.addr,e)}function px(n,e){n.uniform2iv(this.addr,e)}function mx(n,e){n.uniform3iv(this.addr,e)}function gx(n,e){n.uniform4iv(this.addr,e)}function _x(n,e){n.uniform1uiv(this.addr,e)}function vx(n,e){n.uniform2uiv(this.addr,e)}function xx(n,e){n.uniform3uiv(this.addr,e)}function yx(n,e){n.uniform4uiv(this.addr,e)}function Mx(n,e,t){const i=this.cache,r=e.length,s=Da(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||lf,s[o])}function Sx(n,e,t){const i=this.cache,r=e.length,s=Da(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||uf,s[o])}function bx(n,e,t){const i=this.cache,r=e.length,s=Da(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||hf,s[o])}function Ex(n,e,t){const i=this.cache,r=e.length,s=Da(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||df,s[o])}function wx(n){switch(n){case 5126:return ox;case 35664:return ax;case 35665:return cx;case 35666:return lx;case 35674:return dx;case 35675:return ux;case 35676:return hx;case 5124:case 35670:return fx;case 35667:case 35671:return px;case 35668:case 35672:return mx;case 35669:case 35673:return gx;case 5125:return _x;case 36294:return vx;case 36295:return xx;case 36296:return yx;case 35678:case 36198:case 36298:case 36306:case 35682:return Mx;case 35679:case 36299:case 36307:return Sx;case 35680:case 36300:case 36308:case 36293:return bx;case 36289:case 36303:case 36311:case 36292:return Ex}}class Tx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=sx(t.type)}}class Ax{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wx(t.type)}}class Cx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Pc=/(\w+)(\])?(\[|\.)?/g;function Ku(n,e){n.seq.push(e),n.map[e.id]=e}function Rx(n,e,t){const i=n.name,r=i.length;for(Pc.lastIndex=0;;){const s=Pc.exec(i),o=Pc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Ku(t,c===void 0?new Tx(a,n,e):new Ax(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Cx(a),Ku(t,d)),t=d}}}class sa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Rx(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ju(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Px=37297;let Dx=0;function Lx(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Qu=new Ve;function Ix(n){Ke._getMatrix(Qu,Ke.workingColorSpace,n);const e=`mat3( ${Qu.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case da:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function eh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Lx(n.getShaderSource(e),o)}else return r}function Nx(n,e){const t=Ix(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ux(n,e){let t;switch(e){case xm:t="Linear";break;case ym:t="Reinhard";break;case Mm:t="Cineon";break;case Sm:t="ACESFilmic";break;case Em:t="AgX";break;case wm:t="Neutral";break;case bm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const $o=new w;function Ox(){Ke.getLuminanceCoefficients($o);const n=$o.x.toFixed(4),e=$o.y.toFixed(4),t=$o.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(js).join(`
`)}function zx(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Bx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function js(n){return n!==""}function th(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(n){return n.replace(kx,Vx)}const Hx=new Map;function Vx(n,e){let t=We[e];if(t===void 0){const i=Hx.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Cl(t)}const Gx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ih(n){return n.replace(Gx,Wx)}function Wx(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function rh(n){let e=`precision ${n.precision} float;
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
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Xx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Nh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Uh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Si&&(e="SHADOWMAP_TYPE_VSM"),e}function jx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case xs:case ys:e="ENVMAP_TYPE_CUBE";break;case Ca:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Yx(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===ys&&(e="ENVMAP_MODE_REFRACTION"),e}function qx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Oh:e="ENVMAP_BLENDING_MULTIPLY";break;case _m:e="ENVMAP_BLENDING_MIX";break;case vm:e="ENVMAP_BLENDING_ADD";break}return e}function $x(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Zx(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Xx(t),c=jx(t),u=Yx(t),d=qx(t),h=$x(t),p=Fx(t),g=zx(s),_=r.createProgram();let m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(js).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(js).join(`
`),f.length>0&&(f+=`
`)):(m=[rh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),f=[rh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qi?"#define TONE_MAPPING":"",t.toneMapping!==qi?We.tonemapping_pars_fragment:"",t.toneMapping!==qi?Ux("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Nx("linearToOutputTexel",t.outputColorSpace),Ox(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(js).join(`
`)),o=Cl(o),o=th(o,t),o=nh(o,t),a=Cl(a),a=th(a,t),a=nh(a,t),o=ih(o),a=ih(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===lu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===lu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=S+m+o,v=S+f+a,R=Ju(r,r.VERTEX_SHADER,y),A=Ju(r,r.FRAGMENT_SHADER,v);r.attachShader(_,R),r.attachShader(_,A),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(P){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(R).trim(),G=r.getShaderInfoLog(A).trim();let j=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,R,A);else{const $=eh(r,R,"vertex"),V=eh(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+$+`
`+V)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||G==="")&&(X=!1);X&&(P.diagnostics={runnable:j,programLog:B,vertexShader:{log:F,prefix:m},fragmentShader:{log:G,prefix:f}})}r.deleteShader(R),r.deleteShader(A),D=new sa(r,_),E=Bx(r,_)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,Px)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Dx++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let Kx=0;class Jx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Qx(e),t.set(e,i)),i}}class Qx{constructor(e){this.id=Kx++,this.code=e,this.usedTimes=0}}function ey(n,e,t,i,r,s,o){const a=new nd,l=new Jx,c=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,M,P,B,F){const G=B.fog,j=F.geometry,X=E.isMeshStandardMaterial?B.environment:null,$=(E.isMeshStandardMaterial?t:e).get(E.envMap||X),V=$&&$.mapping===Ca?$.image.height:null,ie=g[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const he=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ye=he!==void 0?he.length:0;let He=0;j.morphAttributes.position!==void 0&&(He=1),j.morphAttributes.normal!==void 0&&(He=2),j.morphAttributes.color!==void 0&&(He=3);let rt,Y,se,Ee;if(ie){const st=ni[ie];rt=st.vertexShader,Y=st.fragmentShader}else rt=E.vertexShader,Y=E.fragmentShader,l.update(E),se=l.getVertexShaderID(E),Ee=l.getFragmentShaderID(E);const fe=n.getRenderTarget(),we=n.state.buffers.depth.getReversed(),Je=F.isInstancedMesh===!0,Ie=F.isBatchedMesh===!0,St=!!E.map,bt=!!E.matcap,Qe=!!$,L=!!E.aoMap,rn=!!E.lightMap,et=!!E.bumpMap,ft=!!E.normalMap,Me=!!E.displacementMap,$e=!!E.emissiveMap,Ce=!!E.metalnessMap,Ge=!!E.roughnessMap,zt=E.anisotropy>0,T=E.clearcoat>0,x=E.dispersion>0,z=E.iridescence>0,q=E.sheen>0,K=E.transmission>0,W=zt&&!!E.anisotropyMap,Se=T&&!!E.clearcoatMap,le=T&&!!E.clearcoatNormalMap,xe=T&&!!E.clearcoatRoughnessMap,be=z&&!!E.iridescenceMap,J=z&&!!E.iridescenceThicknessMap,pe=q&&!!E.sheenColorMap,De=q&&!!E.sheenRoughnessMap,Pe=!!E.specularMap,ae=!!E.specularColorMap,ze=!!E.specularIntensityMap,I=K&&!!E.transmissionMap,de=K&&!!E.thicknessMap,Q=!!E.gradientMap,ge=!!E.alphaMap,ee=E.alphaTest>0,Z=!!E.alphaHash,_e=!!E.extensions;let ke=qi;E.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(ke=n.toneMapping);const mt={shaderID:ie,shaderType:E.type,shaderName:E.name,vertexShader:rt,fragmentShader:Y,defines:E.defines,customVertexShaderID:se,customFragmentShaderID:Ee,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ie,batchingColor:Ie&&F._colorsTexture!==null,instancing:Je,instancingColor:Je&&F.instanceColor!==null,instancingMorph:Je&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:fe===null?n.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:Ms,alphaToCoverage:!!E.alphaToCoverage,map:St,matcap:bt,envMap:Qe,envMapMode:Qe&&$.mapping,envMapCubeUVHeight:V,aoMap:L,lightMap:rn,bumpMap:et,normalMap:ft,displacementMap:h&&Me,emissiveMap:$e,normalMapObjectSpace:ft&&E.normalMapType===Rm,normalMapTangentSpace:ft&&E.normalMapType===jh,metalnessMap:Ce,roughnessMap:Ge,anisotropy:zt,anisotropyMap:W,clearcoat:T,clearcoatMap:Se,clearcoatNormalMap:le,clearcoatRoughnessMap:xe,dispersion:x,iridescence:z,iridescenceMap:be,iridescenceThicknessMap:J,sheen:q,sheenColorMap:pe,sheenRoughnessMap:De,specularMap:Pe,specularColorMap:ae,specularIntensityMap:ze,transmission:K,transmissionMap:I,thicknessMap:de,gradientMap:Q,opaque:E.transparent===!1&&E.blending===hs&&E.alphaToCoverage===!1,alphaMap:ge,alphaTest:ee,alphaHash:Z,combine:E.combine,mapUv:St&&_(E.map.channel),aoMapUv:L&&_(E.aoMap.channel),lightMapUv:rn&&_(E.lightMap.channel),bumpMapUv:et&&_(E.bumpMap.channel),normalMapUv:ft&&_(E.normalMap.channel),displacementMapUv:Me&&_(E.displacementMap.channel),emissiveMapUv:$e&&_(E.emissiveMap.channel),metalnessMapUv:Ce&&_(E.metalnessMap.channel),roughnessMapUv:Ge&&_(E.roughnessMap.channel),anisotropyMapUv:W&&_(E.anisotropyMap.channel),clearcoatMapUv:Se&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:le&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:J&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:De&&_(E.sheenRoughnessMap.channel),specularMapUv:Pe&&_(E.specularMap.channel),specularColorMapUv:ae&&_(E.specularColorMap.channel),specularIntensityMapUv:ze&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:de&&_(E.thicknessMap.channel),alphaMapUv:ge&&_(E.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(ft||zt),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!j.attributes.uv&&(St||ge),fog:!!G,useFog:E.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:we,skinning:F.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:He,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:St&&E.map.isVideoTexture===!0&&Ke.getTransfer(E.map.colorSpace)===ct,decodeVideoTextureEmissive:$e&&E.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(E.emissiveMap.colorSpace)===ct,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===en,flipSided:E.side===ln,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:_e&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&E.extensions.multiDraw===!0||Ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function f(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)M.push(P),M.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(S(M,E),y(M,E),M.push(n.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function S(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function y(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),E.push(a.mask)}function v(E){const M=g[E.type];let P;if(M){const B=ni[M];P=Mg.clone(B.uniforms)}else P=E.uniforms;return P}function R(E,M){let P;for(let B=0,F=u.length;B<F;B++){const G=u[B];if(G.cacheKey===M){P=G,++P.usedTimes;break}}return P===void 0&&(P=new Zx(n,M,E,s),u.push(P)),P}function A(E){if(--E.usedTimes===0){const M=u.indexOf(E);u[M]=u[u.length-1],u.pop(),E.destroy()}}function C(E){l.remove(E)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:R,releaseProgram:A,releaseShaderCache:C,programs:u,dispose:D}}function ty(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function ny(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function sh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function oh(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,h,p,g,_,m){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function a(d,h,p,g,_,m){const f=o(d,h,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):t.push(f)}function l(d,h,p,g,_,m){const f=o(d,h,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function c(d,h){t.length>1&&t.sort(d||ny),i.length>1&&i.sort(h||sh),r.length>1&&r.sort(h||sh)}function u(){for(let d=e,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function iy(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new oh,n.set(i,[o])):r>=s.length?(o=new oh,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function ry(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new je};break;case"SpotLight":t={position:new w,direction:new w,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new w,halfWidth:new w,halfHeight:new w};break}return n[e.id]=t,t}}}function sy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let oy=0;function ay(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function cy(n){const e=new ry,t=sy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new w);const r=new w,s=new ot,o=new ot;function a(c){let u=0,d=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,S=0,y=0,v=0,R=0,A=0,C=0;c.sort(ay);for(let E=0,M=c.length;E<M;E++){const P=c[E],B=P.color,F=P.intensity,G=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=B.r*F,d+=B.g*F,h+=B.b*F;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],F);C++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,V=t.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=P.shadow.matrix,S++}i.directional[p]=X,p++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(B).multiplyScalar(F),X.distance=G,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[_]=X;const $=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,$.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[_]=$.matrix,P.castShadow){const V=t.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=j,v++}_++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(B).multiplyScalar(F),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const $=P.shadow,V=t.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,V.shadowCameraNear=$.camera.near,V.shadowCameraFar=$.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=P.shadow.matrix,y++}i.point[g]=X,g++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(F),X.groundColor.copy(P.groundColor).multiplyScalar(F),i.hemi[f]=X,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const D=i.hash;(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==S||D.numPointShadows!==y||D.numSpotShadows!==v||D.numSpotMaps!==R||D.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=v+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,D.directionalLength=p,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=S,D.numPointShadows=y,D.numSpotShadows=v,D.numSpotMaps=R,D.numLightProbes=C,i.version=oy++)}function l(c,u){let d=0,h=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const y=c[f];if(y.isDirectionalLight){const v=i.directional[d];v.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(y.isSpotLight){const v=i.spot[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const v=i.point[h];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),h++}else if(y.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function ah(n){const e=new cy(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function ly(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new ah(n),e.set(r,[a])):s>=o.length?(a=new ah(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const dy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uy=`uniform sampler2D shadow_pass;
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
}`;function hy(n,e,t){let i=new id;const r=new Ne,s=new Ne,o=new Rt,a=new Dg({depthPacking:Cm}),l=new Lg,c={},u=t.maxTextureSize,d={[Di]:ln,[ln]:Di,[en]:en},h=new Ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:dy,fragmentShader:uy}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ut;g.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new oe(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nh;let f=this.type;this.render=function(A,C,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),M=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Yi),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const F=f!==Si&&this.type===Si,G=f===Si&&this.type!==Si;for(let j=0,X=A.length;j<X;j++){const $=A[j],V=$.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const ie=V.getFrameExtents();if(r.multiply(ie),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ie.x),r.x=s.x*ie.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ie.y),r.y=s.y*ie.y,V.mapSize.y=s.y)),V.map===null||F===!0||G===!0){const ye=this.type!==Si?{minFilter:Yn,magFilter:Yn}:{};V.map!==null&&V.map.dispose(),V.map=new Cr(r.x,r.y,ye),V.map.texture.name=$.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const he=V.getViewportCount();for(let ye=0;ye<he;ye++){const He=V.getViewport(ye);o.set(s.x*He.x,s.y*He.y,s.x*He.z,s.y*He.w),B.viewport(o),V.updateMatrices($,ye),i=V.getFrustum(),v(C,D,V.camera,$,this.type)}V.isPointLightShadow!==!0&&this.type===Si&&S(V,D),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(E,M,P)};function S(A,C){const D=e.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Cr(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(C,null,D,h,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(C,null,D,p,_,null)}function y(A,C,D,E){let M=null;const P=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)M=P;else if(M=D.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=M.uuid,F=C.uuid;let G=c[B];G===void 0&&(G={},c[B]=G);let j=G[F];j===void 0&&(j=M.clone(),G[F]=j,C.addEventListener("dispose",R)),M=j}if(M.visible=C.visible,M.wireframe=C.wireframe,E===Si?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:d[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=n.properties.get(M);B.light=D}return M}function v(A,C,D,E,M){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Si)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const F=e.update(A),G=A.material;if(Array.isArray(G)){const j=F.groups;for(let X=0,$=j.length;X<$;X++){const V=j[X],ie=G[V.materialIndex];if(ie&&ie.visible){const he=y(A,ie,E,M);A.onBeforeShadow(n,A,C,D,F,he,V),n.renderBufferDirect(D,null,F,he,A,V),A.onAfterShadow(n,A,C,D,F,he,V)}}}else if(G.visible){const j=y(A,G,E,M);A.onBeforeShadow(n,A,C,D,F,j,null),n.renderBufferDirect(D,null,F,j,A,null),A.onAfterShadow(n,A,C,D,F,j,null)}}const B=A.children;for(let F=0,G=B.length;F<G;F++)v(B[F],C,D,E,M)}function R(A){A.target.removeEventListener("dispose",R);for(const D in c){const E=c[D],M=A.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}const fy={[Wc]:Xc,[jc]:$c,[Yc]:Zc,[wr]:qc,[Xc]:Wc,[$c]:jc,[Zc]:Yc,[qc]:wr};function py(n,e){function t(){let I=!1;const de=new Rt;let Q=null;const ge=new Rt(0,0,0,0);return{setMask:function(ee){Q!==ee&&!I&&(n.colorMask(ee,ee,ee,ee),Q=ee)},setLocked:function(ee){I=ee},setClear:function(ee,Z,_e,ke,mt){mt===!0&&(ee*=ke,Z*=ke,_e*=ke),de.set(ee,Z,_e,ke),ge.equals(de)===!1&&(n.clearColor(ee,Z,_e,ke),ge.copy(de))},reset:function(){I=!1,Q=null,ge.set(-1,0,0,0)}}}function i(){let I=!1,de=!1,Q=null,ge=null,ee=null;return{setReversed:function(Z){if(de!==Z){const _e=e.get("EXT_clip_control");Z?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),de=Z;const ke=ee;ee=null,this.setClear(ke)}},getReversed:function(){return de},setTest:function(Z){Z?fe(n.DEPTH_TEST):we(n.DEPTH_TEST)},setMask:function(Z){Q!==Z&&!I&&(n.depthMask(Z),Q=Z)},setFunc:function(Z){if(de&&(Z=fy[Z]),ge!==Z){switch(Z){case Wc:n.depthFunc(n.NEVER);break;case Xc:n.depthFunc(n.ALWAYS);break;case jc:n.depthFunc(n.LESS);break;case wr:n.depthFunc(n.LEQUAL);break;case Yc:n.depthFunc(n.EQUAL);break;case qc:n.depthFunc(n.GEQUAL);break;case $c:n.depthFunc(n.GREATER);break;case Zc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=Z}},setLocked:function(Z){I=Z},setClear:function(Z){ee!==Z&&(de&&(Z=1-Z),n.clearDepth(Z),ee=Z)},reset:function(){I=!1,Q=null,ge=null,ee=null,de=!1}}}function r(){let I=!1,de=null,Q=null,ge=null,ee=null,Z=null,_e=null,ke=null,mt=null;return{setTest:function(st){I||(st?fe(n.STENCIL_TEST):we(n.STENCIL_TEST))},setMask:function(st){de!==st&&!I&&(n.stencilMask(st),de=st)},setFunc:function(st,Hn,gi){(Q!==st||ge!==Hn||ee!==gi)&&(n.stencilFunc(st,Hn,gi),Q=st,ge=Hn,ee=gi)},setOp:function(st,Hn,gi){(Z!==st||_e!==Hn||ke!==gi)&&(n.stencilOp(st,Hn,gi),Z=st,_e=Hn,ke=gi)},setLocked:function(st){I=st},setClear:function(st){mt!==st&&(n.clearStencil(st),mt=st)},reset:function(){I=!1,de=null,Q=null,ge=null,ee=null,Z=null,_e=null,ke=null,mt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,S=null,y=null,v=null,R=null,A=null,C=new je(0,0,0),D=0,E=!1,M=null,P=null,B=null,F=null,G=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,$=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(V)[1]),X=$>=1):V.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),X=$>=2);let ie=null,he={};const ye=n.getParameter(n.SCISSOR_BOX),He=n.getParameter(n.VIEWPORT),rt=new Rt().fromArray(ye),Y=new Rt().fromArray(He);function se(I,de,Q,ge){const ee=new Uint8Array(4),Z=n.createTexture();n.bindTexture(I,Z),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let _e=0;_e<Q;_e++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,ee):n.texImage2D(de+_e,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ee);return Z}const Ee={};Ee[n.TEXTURE_2D]=se(n.TEXTURE_2D,n.TEXTURE_2D,1),Ee[n.TEXTURE_CUBE_MAP]=se(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[n.TEXTURE_2D_ARRAY]=se(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ee[n.TEXTURE_3D]=se(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),fe(n.DEPTH_TEST),o.setFunc(wr),et(!1),ft(iu),fe(n.CULL_FACE),L(Yi);function fe(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function we(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function Je(I,de){return d[I]!==de?(n.bindFramebuffer(I,de),d[I]=de,I===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=de),I===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=de),!0):!1}function Ie(I,de){let Q=p,ge=!1;if(I){Q=h.get(de),Q===void 0&&(Q=[],h.set(de,Q));const ee=I.textures;if(Q.length!==ee.length||Q[0]!==n.COLOR_ATTACHMENT0){for(let Z=0,_e=ee.length;Z<_e;Z++)Q[Z]=n.COLOR_ATTACHMENT0+Z;Q.length=ee.length,ge=!0}}else Q[0]!==n.BACK&&(Q[0]=n.BACK,ge=!0);ge&&n.drawBuffers(Q)}function St(I){return g!==I?(n.useProgram(I),g=I,!0):!1}const bt={[yr]:n.FUNC_ADD,[em]:n.FUNC_SUBTRACT,[tm]:n.FUNC_REVERSE_SUBTRACT};bt[nm]=n.MIN,bt[im]=n.MAX;const Qe={[rm]:n.ZERO,[sm]:n.ONE,[om]:n.SRC_COLOR,[Vc]:n.SRC_ALPHA,[hm]:n.SRC_ALPHA_SATURATE,[dm]:n.DST_COLOR,[cm]:n.DST_ALPHA,[am]:n.ONE_MINUS_SRC_COLOR,[Gc]:n.ONE_MINUS_SRC_ALPHA,[um]:n.ONE_MINUS_DST_COLOR,[lm]:n.ONE_MINUS_DST_ALPHA,[fm]:n.CONSTANT_COLOR,[pm]:n.ONE_MINUS_CONSTANT_COLOR,[mm]:n.CONSTANT_ALPHA,[gm]:n.ONE_MINUS_CONSTANT_ALPHA};function L(I,de,Q,ge,ee,Z,_e,ke,mt,st){if(I===Yi){_===!0&&(we(n.BLEND),_=!1);return}if(_===!1&&(fe(n.BLEND),_=!0),I!==Qp){if(I!==m||st!==E){if((f!==yr||v!==yr)&&(n.blendEquation(n.FUNC_ADD),f=yr,v=yr),st)switch(I){case hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ru:n.blendFunc(n.ONE,n.ONE);break;case su:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ou:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ru:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case su:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ou:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}S=null,y=null,R=null,A=null,C.set(0,0,0),D=0,m=I,E=st}return}ee=ee||de,Z=Z||Q,_e=_e||ge,(de!==f||ee!==v)&&(n.blendEquationSeparate(bt[de],bt[ee]),f=de,v=ee),(Q!==S||ge!==y||Z!==R||_e!==A)&&(n.blendFuncSeparate(Qe[Q],Qe[ge],Qe[Z],Qe[_e]),S=Q,y=ge,R=Z,A=_e),(ke.equals(C)===!1||mt!==D)&&(n.blendColor(ke.r,ke.g,ke.b,mt),C.copy(ke),D=mt),m=I,E=!1}function rn(I,de){I.side===en?we(n.CULL_FACE):fe(n.CULL_FACE);let Q=I.side===ln;de&&(Q=!Q),et(Q),I.blending===hs&&I.transparent===!1?L(Yi):L(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const ge=I.stencilWrite;a.setTest(ge),ge&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),$e(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?fe(n.SAMPLE_ALPHA_TO_COVERAGE):we(n.SAMPLE_ALPHA_TO_COVERAGE)}function et(I){M!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),M=I)}function ft(I){I!==Kp?(fe(n.CULL_FACE),I!==P&&(I===iu?n.cullFace(n.BACK):I===Jp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):we(n.CULL_FACE),P=I}function Me(I){I!==B&&(X&&n.lineWidth(I),B=I)}function $e(I,de,Q){I?(fe(n.POLYGON_OFFSET_FILL),(F!==de||G!==Q)&&(n.polygonOffset(de,Q),F=de,G=Q)):we(n.POLYGON_OFFSET_FILL)}function Ce(I){I?fe(n.SCISSOR_TEST):we(n.SCISSOR_TEST)}function Ge(I){I===void 0&&(I=n.TEXTURE0+j-1),ie!==I&&(n.activeTexture(I),ie=I)}function zt(I,de,Q){Q===void 0&&(ie===null?Q=n.TEXTURE0+j-1:Q=ie);let ge=he[Q];ge===void 0&&(ge={type:void 0,texture:void 0},he[Q]=ge),(ge.type!==I||ge.texture!==de)&&(ie!==Q&&(n.activeTexture(Q),ie=Q),n.bindTexture(I,de||Ee[I]),ge.type=I,ge.texture=de)}function T(){const I=he[ie];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{n.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{n.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Se(){try{n.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function le(){try{n.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xe(){try{n.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(){try{n.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{n.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(I){rt.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),rt.copy(I))}function De(I){Y.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Y.copy(I))}function Pe(I,de){let Q=c.get(de);Q===void 0&&(Q=new WeakMap,c.set(de,Q));let ge=Q.get(I);ge===void 0&&(ge=n.getUniformBlockIndex(de,I.name),Q.set(I,ge))}function ae(I,de){const ge=c.get(de).get(I);l.get(de)!==ge&&(n.uniformBlockBinding(de,ge,I.__bindingPointIndex),l.set(de,ge))}function ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ie=null,he={},d={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,S=null,y=null,v=null,R=null,A=null,C=new je(0,0,0),D=0,E=!1,M=null,P=null,B=null,F=null,G=null,rt.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:fe,disable:we,bindFramebuffer:Je,drawBuffers:Ie,useProgram:St,setBlending:L,setMaterial:rn,setFlipSided:et,setCullFace:ft,setLineWidth:Me,setPolygonOffset:$e,setScissorTest:Ce,activeTexture:Ge,bindTexture:zt,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:be,texImage3D:J,updateUBOMapping:Pe,uniformBlockBinding:ae,texStorage2D:le,texStorage3D:xe,texSubImage2D:q,texSubImage3D:K,compressedTexSubImage2D:W,compressedTexSubImage3D:Se,scissor:pe,viewport:De,reset:ze}}function my(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ne,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return p?new OffscreenCanvas(T,x):ha("canvas")}function _(T,x,z){let q=1;const K=zt(T);if((K.width>z||K.height>z)&&(q=z/Math.max(K.width,K.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const W=Math.floor(q*K.width),Se=Math.floor(q*K.height);d===void 0&&(d=g(W,Se));const le=x?g(W,Se):d;return le.width=W,le.height=Se,le.getContext("2d").drawImage(T,0,0,W,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+W+"x"+Se+")."),le}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){n.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(T,x,z,q,K=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let W=x;if(x===n.RED&&(z===n.FLOAT&&(W=n.R32F),z===n.HALF_FLOAT&&(W=n.R16F),z===n.UNSIGNED_BYTE&&(W=n.R8)),x===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(W=n.R8UI),z===n.UNSIGNED_SHORT&&(W=n.R16UI),z===n.UNSIGNED_INT&&(W=n.R32UI),z===n.BYTE&&(W=n.R8I),z===n.SHORT&&(W=n.R16I),z===n.INT&&(W=n.R32I)),x===n.RG&&(z===n.FLOAT&&(W=n.RG32F),z===n.HALF_FLOAT&&(W=n.RG16F),z===n.UNSIGNED_BYTE&&(W=n.RG8)),x===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(W=n.RG8UI),z===n.UNSIGNED_SHORT&&(W=n.RG16UI),z===n.UNSIGNED_INT&&(W=n.RG32UI),z===n.BYTE&&(W=n.RG8I),z===n.SHORT&&(W=n.RG16I),z===n.INT&&(W=n.RG32I)),x===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(W=n.RGB8UI),z===n.UNSIGNED_SHORT&&(W=n.RGB16UI),z===n.UNSIGNED_INT&&(W=n.RGB32UI),z===n.BYTE&&(W=n.RGB8I),z===n.SHORT&&(W=n.RGB16I),z===n.INT&&(W=n.RGB32I)),x===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),z===n.UNSIGNED_INT&&(W=n.RGBA32UI),z===n.BYTE&&(W=n.RGBA8I),z===n.SHORT&&(W=n.RGBA16I),z===n.INT&&(W=n.RGBA32I)),x===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),x===n.RGBA){const Se=K?da:Ke.getTransfer(q);z===n.FLOAT&&(W=n.RGBA32F),z===n.HALF_FLOAT&&(W=n.RGBA16F),z===n.UNSIGNED_BYTE&&(W=Se===ct?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function v(T,x){let z;return T?x===null||x===Tr||x===to?z=n.DEPTH24_STENCIL8:x===Ti?z=n.DEPTH32F_STENCIL8:x===eo&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Tr||x===to?z=n.DEPTH_COMPONENT24:x===Ti?z=n.DEPTH_COMPONENT32F:x===eo&&(z=n.DEPTH_COMPONENT16),z}function R(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Yn&&T.minFilter!==si?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function A(T){const x=T.target;x.removeEventListener("dispose",A),D(x),x.isVideoTexture&&u.delete(x)}function C(T){const x=T.target;x.removeEventListener("dispose",C),M(x)}function D(T){const x=i.get(T);if(x.__webglInit===void 0)return;const z=T.source,q=h.get(z);if(q){const K=q[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(T),Object.keys(q).length===0&&h.delete(z)}i.remove(T)}function E(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const z=T.source,q=h.get(z);delete q[x.__cacheKey],o.memory.textures--}function M(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(x.__webglFramebuffer[q]))for(let K=0;K<x.__webglFramebuffer[q].length;K++)n.deleteFramebuffer(x.__webglFramebuffer[q][K]);else n.deleteFramebuffer(x.__webglFramebuffer[q]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[q])}else{if(Array.isArray(x.__webglFramebuffer))for(let q=0;q<x.__webglFramebuffer.length;q++)n.deleteFramebuffer(x.__webglFramebuffer[q]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let q=0;q<x.__webglColorRenderbuffer.length;q++)x.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[q]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=T.textures;for(let q=0,K=z.length;q<K;q++){const W=i.get(z[q]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(z[q])}i.remove(T)}let P=0;function B(){P=0}function F(){const T=P;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),P+=1,T}function G(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function j(T,x){const z=i.get(T);if(T.isVideoTexture&&Ce(T),T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){const q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ee(z,T,x);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+x)}function X(T,x){const z=i.get(T);if(T.version>0&&z.__version!==T.version){Ee(z,T,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+x)}function $(T,x){const z=i.get(T);if(T.version>0&&z.__version!==T.version){Ee(z,T,x);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+x)}function V(T,x){const z=i.get(T);if(T.version>0&&z.__version!==T.version){fe(z,T,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+x)}const ie={[Qc]:n.REPEAT,[br]:n.CLAMP_TO_EDGE,[el]:n.MIRRORED_REPEAT},he={[Yn]:n.NEAREST,[Tm]:n.NEAREST_MIPMAP_NEAREST,[bo]:n.NEAREST_MIPMAP_LINEAR,[si]:n.LINEAR,[Qa]:n.LINEAR_MIPMAP_NEAREST,[Er]:n.LINEAR_MIPMAP_LINEAR},ye={[Pm]:n.NEVER,[Om]:n.ALWAYS,[Dm]:n.LESS,[Yh]:n.LEQUAL,[Lm]:n.EQUAL,[Um]:n.GEQUAL,[Im]:n.GREATER,[Nm]:n.NOTEQUAL};function He(T,x){if(x.type===Ti&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===si||x.magFilter===Qa||x.magFilter===bo||x.magFilter===Er||x.minFilter===si||x.minFilter===Qa||x.minFilter===bo||x.minFilter===Er)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ie[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ie[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ie[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,he[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,he[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ye[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Yn||x.minFilter!==bo&&x.minFilter!==Er||x.type===Ti&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function rt(T,x){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",A));const q=x.source;let K=h.get(q);K===void 0&&(K={},h.set(q,K));const W=G(x);if(W!==T.__cacheKey){K[W]===void 0&&(K[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),K[W].usedTimes++;const Se=K[T.__cacheKey];Se!==void 0&&(K[T.__cacheKey].usedTimes--,Se.usedTimes===0&&E(x)),T.__cacheKey=W,T.__webglTexture=K[W].texture}return z}function Y(T,x,z){return Math.floor(Math.floor(T/z)/x)}function se(T,x,z,q){const W=T.updateRanges;if(W.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,z,q,x.data);else{W.sort((J,pe)=>J.start-pe.start);let Se=0;for(let J=1;J<W.length;J++){const pe=W[Se],De=W[J],Pe=pe.start+pe.count,ae=Y(De.start,x.width,4),ze=Y(pe.start,x.width,4);De.start<=Pe+1&&ae===ze&&Y(De.start+De.count-1,x.width,4)===ae?pe.count=Math.max(pe.count,De.start+De.count-pe.start):(++Se,W[Se]=De)}W.length=Se+1;const le=n.getParameter(n.UNPACK_ROW_LENGTH),xe=n.getParameter(n.UNPACK_SKIP_PIXELS),be=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let J=0,pe=W.length;J<pe;J++){const De=W[J],Pe=Math.floor(De.start/4),ae=Math.ceil(De.count/4),ze=Pe%x.width,I=Math.floor(Pe/x.width),de=ae,Q=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,I),t.texSubImage2D(n.TEXTURE_2D,0,ze,I,de,Q,z,q,x.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,le),n.pixelStorei(n.UNPACK_SKIP_PIXELS,xe),n.pixelStorei(n.UNPACK_SKIP_ROWS,be)}}function Ee(T,x,z){let q=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(q=n.TEXTURE_3D);const K=rt(T,x),W=x.source;t.bindTexture(q,T.__webglTexture,n.TEXTURE0+z);const Se=i.get(W);if(W.version!==Se.__version||K===!0){t.activeTexture(n.TEXTURE0+z);const le=Ke.getPrimaries(Ke.workingColorSpace),xe=x.colorSpace===Wi?null:Ke.getPrimaries(x.colorSpace),be=x.colorSpace===Wi||le===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let J=_(x.image,!1,r.maxTextureSize);J=Ge(x,J);const pe=s.convert(x.format,x.colorSpace),De=s.convert(x.type);let Pe=y(x.internalFormat,pe,De,x.colorSpace,x.isVideoTexture);He(q,x);let ae;const ze=x.mipmaps,I=x.isVideoTexture!==!0,de=Se.__version===void 0||K===!0,Q=W.dataReady,ge=R(x,J);if(x.isDepthTexture)Pe=v(x.format===io,x.type),de&&(I?t.texStorage2D(n.TEXTURE_2D,1,Pe,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,Pe,J.width,J.height,0,pe,De,null));else if(x.isDataTexture)if(ze.length>0){I&&de&&t.texStorage2D(n.TEXTURE_2D,ge,Pe,ze[0].width,ze[0].height);for(let ee=0,Z=ze.length;ee<Z;ee++)ae=ze[ee],I?Q&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ae.width,ae.height,pe,De,ae.data):t.texImage2D(n.TEXTURE_2D,ee,Pe,ae.width,ae.height,0,pe,De,ae.data);x.generateMipmaps=!1}else I?(de&&t.texStorage2D(n.TEXTURE_2D,ge,Pe,J.width,J.height),Q&&se(x,J,pe,De)):t.texImage2D(n.TEXTURE_2D,0,Pe,J.width,J.height,0,pe,De,J.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){I&&de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Pe,ze[0].width,ze[0].height,J.depth);for(let ee=0,Z=ze.length;ee<Z;ee++)if(ae=ze[ee],x.format!==Xn)if(pe!==null)if(I){if(Q)if(x.layerUpdates.size>0){const _e=Fu(ae.width,ae.height,x.format,x.type);for(const ke of x.layerUpdates){const mt=ae.data.subarray(ke*_e/ae.data.BYTES_PER_ELEMENT,(ke+1)*_e/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,ke,ae.width,ae.height,1,pe,mt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ae.width,ae.height,J.depth,pe,ae.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Pe,ae.width,ae.height,J.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?Q&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ae.width,ae.height,J.depth,pe,De,ae.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Pe,ae.width,ae.height,J.depth,0,pe,De,ae.data)}else{I&&de&&t.texStorage2D(n.TEXTURE_2D,ge,Pe,ze[0].width,ze[0].height);for(let ee=0,Z=ze.length;ee<Z;ee++)ae=ze[ee],x.format!==Xn?pe!==null?I?Q&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,ae.width,ae.height,pe,ae.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Pe,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?Q&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ae.width,ae.height,pe,De,ae.data):t.texImage2D(n.TEXTURE_2D,ee,Pe,ae.width,ae.height,0,pe,De,ae.data)}else if(x.isDataArrayTexture)if(I){if(de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Pe,J.width,J.height,J.depth),Q)if(x.layerUpdates.size>0){const ee=Fu(J.width,J.height,x.format,x.type);for(const Z of x.layerUpdates){const _e=J.data.subarray(Z*ee/J.data.BYTES_PER_ELEMENT,(Z+1)*ee/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,J.width,J.height,1,pe,De,_e)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,pe,De,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Pe,J.width,J.height,J.depth,0,pe,De,J.data);else if(x.isData3DTexture)I?(de&&t.texStorage3D(n.TEXTURE_3D,ge,Pe,J.width,J.height,J.depth),Q&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,pe,De,J.data)):t.texImage3D(n.TEXTURE_3D,0,Pe,J.width,J.height,J.depth,0,pe,De,J.data);else if(x.isFramebufferTexture){if(de)if(I)t.texStorage2D(n.TEXTURE_2D,ge,Pe,J.width,J.height);else{let ee=J.width,Z=J.height;for(let _e=0;_e<ge;_e++)t.texImage2D(n.TEXTURE_2D,_e,Pe,ee,Z,0,pe,De,null),ee>>=1,Z>>=1}}else if(ze.length>0){if(I&&de){const ee=zt(ze[0]);t.texStorage2D(n.TEXTURE_2D,ge,Pe,ee.width,ee.height)}for(let ee=0,Z=ze.length;ee<Z;ee++)ae=ze[ee],I?Q&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe,De,ae):t.texImage2D(n.TEXTURE_2D,ee,Pe,pe,De,ae);x.generateMipmaps=!1}else if(I){if(de){const ee=zt(J);t.texStorage2D(n.TEXTURE_2D,ge,Pe,ee.width,ee.height)}Q&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,De,J)}else t.texImage2D(n.TEXTURE_2D,0,Pe,pe,De,J);m(x)&&f(q),Se.__version=W.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function fe(T,x,z){if(x.image.length!==6)return;const q=rt(T,x),K=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+z);const W=i.get(K);if(K.version!==W.__version||q===!0){t.activeTexture(n.TEXTURE0+z);const Se=Ke.getPrimaries(Ke.workingColorSpace),le=x.colorSpace===Wi?null:Ke.getPrimaries(x.colorSpace),xe=x.colorSpace===Wi||Se===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const be=x.isCompressedTexture||x.image[0].isCompressedTexture,J=x.image[0]&&x.image[0].isDataTexture,pe=[];for(let Z=0;Z<6;Z++)!be&&!J?pe[Z]=_(x.image[Z],!0,r.maxCubemapSize):pe[Z]=J?x.image[Z].image:x.image[Z],pe[Z]=Ge(x,pe[Z]);const De=pe[0],Pe=s.convert(x.format,x.colorSpace),ae=s.convert(x.type),ze=y(x.internalFormat,Pe,ae,x.colorSpace),I=x.isVideoTexture!==!0,de=W.__version===void 0||q===!0,Q=K.dataReady;let ge=R(x,De);He(n.TEXTURE_CUBE_MAP,x);let ee;if(be){I&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,ze,De.width,De.height);for(let Z=0;Z<6;Z++){ee=pe[Z].mipmaps;for(let _e=0;_e<ee.length;_e++){const ke=ee[_e];x.format!==Xn?Pe!==null?I?Q&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_e,0,0,ke.width,ke.height,Pe,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_e,ze,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_e,0,0,ke.width,ke.height,Pe,ae,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_e,ze,ke.width,ke.height,0,Pe,ae,ke.data)}}}else{if(ee=x.mipmaps,I&&de){ee.length>0&&ge++;const Z=zt(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,ze,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(J){I?Q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,pe[Z].width,pe[Z].height,Pe,ae,pe[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,ze,pe[Z].width,pe[Z].height,0,Pe,ae,pe[Z].data);for(let _e=0;_e<ee.length;_e++){const mt=ee[_e].image[Z].image;I?Q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_e+1,0,0,mt.width,mt.height,Pe,ae,mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_e+1,ze,mt.width,mt.height,0,Pe,ae,mt.data)}}else{I?Q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Pe,ae,pe[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,ze,Pe,ae,pe[Z]);for(let _e=0;_e<ee.length;_e++){const ke=ee[_e];I?Q&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_e+1,0,0,Pe,ae,ke.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_e+1,ze,Pe,ae,ke.image[Z])}}}m(x)&&f(n.TEXTURE_CUBE_MAP),W.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function we(T,x,z,q,K,W){const Se=s.convert(z.format,z.colorSpace),le=s.convert(z.type),xe=y(z.internalFormat,Se,le,z.colorSpace),be=i.get(x),J=i.get(z);if(J.__renderTarget=x,!be.__hasExternalTextures){const pe=Math.max(1,x.width>>W),De=Math.max(1,x.height>>W);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,W,xe,pe,De,x.depth,0,Se,le,null):t.texImage2D(K,W,xe,pe,De,0,Se,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),$e(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,K,J.__webglTexture,0,Me(x)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,K,J.__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Je(T,x,z){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const q=x.depthTexture,K=q&&q.isDepthTexture?q.type:null,W=v(x.stencilBuffer,K),Se=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=Me(x);$e(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,W,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,W,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,W,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Se,n.RENDERBUFFER,T)}else{const q=x.textures;for(let K=0;K<q.length;K++){const W=q[K],Se=s.convert(W.format,W.colorSpace),le=s.convert(W.type),xe=y(W.internalFormat,Se,le,W.colorSpace),be=Me(x);z&&$e(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,be,xe,x.width,x.height):$e(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be,xe,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,xe,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ie(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(x.depthTexture);q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),j(x.depthTexture,0);const K=q.__webglTexture,W=Me(x);if(x.depthTexture.format===no)$e(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(x.depthTexture.format===io)$e(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function St(T){const x=i.get(T),z=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const q=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),q){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,q.removeEventListener("dispose",K)};q.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=q}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const q=T.texture.mipmaps;q&&q.length>0?Ie(x.__webglFramebuffer[0],T):Ie(x.__webglFramebuffer,T)}else if(z){x.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[q]),x.__webglDepthbuffer[q]===void 0)x.__webglDepthbuffer[q]=n.createRenderbuffer(),Je(x.__webglDepthbuffer[q],T,!1);else{const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,W)}}else{const q=T.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Je(x.__webglDepthbuffer,T,!1);else{const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,W)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function bt(T,x,z){const q=i.get(T);x!==void 0&&we(q.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&St(T)}function Qe(T){const x=T.texture,z=i.get(T),q=i.get(x);T.addEventListener("dispose",C);const K=T.textures,W=T.isWebGLCubeRenderTarget===!0,Se=K.length>1;if(Se||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=x.version,o.memory.textures++),W){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let xe=0;xe<x.mipmaps.length;xe++)z.__webglFramebuffer[le][xe]=n.createFramebuffer()}else z.__webglFramebuffer[le]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<x.mipmaps.length;le++)z.__webglFramebuffer[le]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Se)for(let le=0,xe=K.length;le<xe;le++){const be=i.get(K[le]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&$e(T)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let le=0;le<K.length;le++){const xe=K[le];z.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[le]);const be=s.convert(xe.format,xe.colorSpace),J=s.convert(xe.type),pe=y(xe.internalFormat,be,J,xe.colorSpace,T.isXRRenderTarget===!0),De=Me(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,pe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,z.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Je(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),He(n.TEXTURE_CUBE_MAP,x);for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)we(z.__webglFramebuffer[le][xe],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,xe);else we(z.__webglFramebuffer[le],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(x)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let le=0,xe=K.length;le<xe;le++){const be=K[le],J=i.get(be);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),He(n.TEXTURE_2D,be),we(z.__webglFramebuffer,T,be,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,0),m(be)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(le=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,q.__webglTexture),He(le,x),x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)we(z.__webglFramebuffer[xe],T,x,n.COLOR_ATTACHMENT0,le,xe);else we(z.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,le,0);m(x)&&f(le),t.unbindTexture()}T.depthBuffer&&St(T)}function L(T){const x=T.textures;for(let z=0,q=x.length;z<q;z++){const K=x[z];if(m(K)){const W=S(T),Se=i.get(K).__webglTexture;t.bindTexture(W,Se),f(W),t.unbindTexture()}}}const rn=[],et=[];function ft(T){if(T.samples>0){if($e(T)===!1){const x=T.textures,z=T.width,q=T.height;let K=n.COLOR_BUFFER_BIT;const W=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=i.get(T),le=x.length>1;if(le)for(let be=0;be<x.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const xe=T.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let be=0;be<x.length;be++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);const J=i.get(x[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,z,q,0,0,z,q,K,n.NEAREST),l===!0&&(rn.length=0,et.length=0,rn.push(n.COLOR_ATTACHMENT0+be),T.depthBuffer&&T.resolveDepthBuffer===!1&&(rn.push(W),et.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,et)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,rn))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let be=0;be<x.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);const J=i.get(x[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,J,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Me(T){return Math.min(r.maxSamples,T.samples)}function $e(T){const x=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ce(T){const x=o.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function Ge(T,x){const z=T.colorSpace,q=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Ms&&z!==Wi&&(Ke.getTransfer(z)===ct?(q!==Xn||K!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function zt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=$,this.setTextureCube=V,this.rebindTextures=bt,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=we,this.useMultisampledRTT=$e}function gy(n,e){function t(i,r=Wi){let s;const o=Ke.getTransfer(r);if(i===li)return n.UNSIGNED_BYTE;if(i===$l)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Zl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===kh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===zh)return n.BYTE;if(i===Bh)return n.SHORT;if(i===eo)return n.UNSIGNED_SHORT;if(i===ql)return n.INT;if(i===Tr)return n.UNSIGNED_INT;if(i===Ti)return n.FLOAT;if(i===ho)return n.HALF_FLOAT;if(i===Hh)return n.ALPHA;if(i===Vh)return n.RGB;if(i===Xn)return n.RGBA;if(i===no)return n.DEPTH_COMPONENT;if(i===io)return n.DEPTH_STENCIL;if(i===Gh)return n.RED;if(i===Kl)return n.RED_INTEGER;if(i===Wh)return n.RG;if(i===Jl)return n.RG_INTEGER;if(i===Ql)return n.RGBA_INTEGER;if(i===ea||i===ta||i===na||i===ia)if(o===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ea)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===na)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ia)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ea)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ta)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===na)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ia)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===tl||i===nl||i===il||i===rl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===tl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===il)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===rl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===sl||i===ol||i===al)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===sl||i===ol)return o===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===al)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===cl||i===ll||i===dl||i===ul||i===hl||i===fl||i===pl||i===ml||i===gl||i===_l||i===vl||i===xl||i===yl||i===Ml)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===cl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ll)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ul)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===hl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ml)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===gl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_l)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===yl)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ml)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ra||i===Sl||i===bl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ra)return o===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Sl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xh||i===El||i===wl||i===Tl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ra)return s.COMPRESSED_RED_RGTC1_EXT;if(i===El)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===wl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Tl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===to?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const _y=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vy=`
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

}`;class xy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new vn,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ki({vertexShader:_y,fragmentShader:vy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new oe(new fo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class yy extends Or{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null;const _=new xy,m=t.getContextAttributes();let f=null,S=null;const y=[],v=[],R=new Ne;let A=null;const C=new wn;C.viewport=new Rt;const D=new wn;D.viewport=new Rt;const E=[C,D],M=new Bg;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let se=y[Y];return se===void 0&&(se=new yc,y[Y]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Y){let se=y[Y];return se===void 0&&(se=new yc,y[Y]=se),se.getGripSpace()},this.getHand=function(Y){let se=y[Y];return se===void 0&&(se=new yc,y[Y]=se),se.getHandSpace()};function F(Y){const se=v.indexOf(Y.inputSource);if(se===-1)return;const Ee=y[se];Ee!==void 0&&(Ee.update(Y.inputSource,Y.frame,c||o),Ee.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",j);for(let Y=0;Y<y.length;Y++){const se=v[Y];se!==null&&(v[Y]=null,y[Y].disconnect(se))}P=null,B=null,_.reset(),e.setRenderTarget(f),p=null,h=null,d=null,r=null,S=null,rt.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",G),r.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,fe=null,we=null;m.depth&&(we=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=m.stencil?io:no,fe=m.stencil?to:Tr);const Je={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(Je),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new Cr(h.textureWidth,h.textureHeight,{format:Xn,type:li,depthTexture:new nf(h.textureWidth,h.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const Ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Ee),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Cr(p.framebufferWidth,p.framebufferHeight,{format:Xn,type:li,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),rt.setContext(r),rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(Y){for(let se=0;se<Y.removed.length;se++){const Ee=Y.removed[se],fe=v.indexOf(Ee);fe>=0&&(v[fe]=null,y[fe].disconnect(Ee))}for(let se=0;se<Y.added.length;se++){const Ee=Y.added[se];let fe=v.indexOf(Ee);if(fe===-1){for(let Je=0;Je<y.length;Je++)if(Je>=v.length){v.push(Ee),fe=Je;break}else if(v[Je]===null){v[Je]=Ee,fe=Je;break}if(fe===-1)break}const we=y[fe];we&&we.connect(Ee)}}const X=new w,$=new w;function V(Y,se,Ee){X.setFromMatrixPosition(se.matrixWorld),$.setFromMatrixPosition(Ee.matrixWorld);const fe=X.distanceTo($),we=se.projectionMatrix.elements,Je=Ee.projectionMatrix.elements,Ie=we[14]/(we[10]-1),St=we[14]/(we[10]+1),bt=(we[9]+1)/we[5],Qe=(we[9]-1)/we[5],L=(we[8]-1)/we[0],rn=(Je[8]+1)/Je[0],et=Ie*L,ft=Ie*rn,Me=fe/(-L+rn),$e=Me*-L;if(se.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX($e),Y.translateZ(Me),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),we[10]===-1)Y.projectionMatrix.copy(se.projectionMatrix),Y.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Ce=Ie+Me,Ge=St+Me,zt=et-$e,T=ft+(fe-$e),x=bt*St/Ge*Ce,z=Qe*St/Ge*Ce;Y.projectionMatrix.makePerspective(zt,T,x,z,Ce,Ge),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ie(Y,se){se===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(se.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let se=Y.near,Ee=Y.far;_.texture!==null&&(_.depthNear>0&&(se=_.depthNear),_.depthFar>0&&(Ee=_.depthFar)),M.near=D.near=C.near=se,M.far=D.far=C.far=Ee,(P!==M.near||B!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,B=M.far),C.layers.mask=Y.layers.mask|2,D.layers.mask=Y.layers.mask|4,M.layers.mask=C.layers.mask|D.layers.mask;const fe=Y.parent,we=M.cameras;ie(M,fe);for(let Je=0;Je<we.length;Je++)ie(we[Je],fe);we.length===2?V(M,C,D):M.projectionMatrix.copy(C.projectionMatrix),he(Y,M,fe)};function he(Y,se,Ee){Ee===null?Y.matrix.copy(se.matrixWorld):(Y.matrix.copy(Ee.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(se.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(se.projectionMatrix),Y.projectionMatrixInverse.copy(se.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ss*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let ye=null;function He(Y,se){if(u=se.getViewerPose(c||o),g=se,u!==null){const Ee=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let fe=!1;Ee.length!==M.cameras.length&&(M.cameras.length=0,fe=!0);for(let Ie=0;Ie<Ee.length;Ie++){const St=Ee[Ie];let bt=null;if(p!==null)bt=p.getViewport(St);else{const L=d.getViewSubImage(h,St);bt=L.viewport,Ie===0&&(e.setRenderTargetTextures(S,L.colorTexture,L.depthStencilTexture),e.setRenderTarget(S))}let Qe=E[Ie];Qe===void 0&&(Qe=new wn,Qe.layers.enable(Ie),Qe.viewport=new Rt,E[Ie]=Qe),Qe.matrix.fromArray(St.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(St.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(bt.x,bt.y,bt.width,bt.height),Ie===0&&(M.matrix.copy(Qe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),fe===!0&&M.cameras.push(Qe)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){const Ie=d.getDepthInformation(Ee[0]);Ie&&Ie.isValid&&Ie.texture&&_.init(e,Ie,r.renderState)}}for(let Ee=0;Ee<y.length;Ee++){const fe=v[Ee],we=y[Ee];fe!==null&&we!==void 0&&we.update(fe,se,c||o)}ye&&ye(Y,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const rt=new cf;rt.setAnimationLoop(He),this.setAnimationLoop=function(Y){ye=Y},this.dispose=function(){}}}const gr=new $n,My=new ot;function Sy(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Qh(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,S,y,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,S,y):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ln&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ln&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=e.get(f),y=S.envMap,v=S.envMapRotation;y&&(m.envMap.value=y,gr.copy(v),gr.x*=-1,gr.y*=-1,gr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(gr.y*=-1,gr.z*=-1),m.envMapRotation.value.setFromMatrix4(My.makeRotationFromEuler(gr)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=y*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ln&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function by(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const v=y.program;i.uniformBlockBinding(S,v)}function c(S,y){let v=r[S.id];v===void 0&&(g(S),v=u(S),r[S.id]=v,S.addEventListener("dispose",m));const R=y.program;i.updateUBOMapping(S,R);const A=e.render.frame;s[S.id]!==A&&(h(S),s[S.id]=A)}function u(S){const y=d();S.__bindingPointIndex=y;const v=n.createBuffer(),R=S.__size,A=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,R,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,v),v}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const y=r[S.id],v=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let A=0,C=v.length;A<C;A++){const D=Array.isArray(v[A])?v[A]:[v[A]];for(let E=0,M=D.length;E<M;E++){const P=D[E];if(p(P,A,E,R)===!0){const B=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let G=0;for(let j=0;j<F.length;j++){const X=F[j],$=_(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,B+G,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,G),G+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,y,v,R){const A=S.value,C=y+"_"+v;if(R[C]===void 0)return typeof A=="number"||typeof A=="boolean"?R[C]=A:R[C]=A.clone(),!0;{const D=R[C];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return R[C]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function g(S){const y=S.uniforms;let v=0;const R=16;for(let C=0,D=y.length;C<D;C++){const E=Array.isArray(y[C])?y[C]:[y[C]];for(let M=0,P=E.length;M<P;M++){const B=E[M],F=Array.isArray(B.value)?B.value:[B.value];for(let G=0,j=F.length;G<j;G++){const X=F[G],$=_(X),V=v%R,ie=V%$.boundary,he=V+ie;v+=ie,he!==0&&R-he<$.storage&&(v+=R-he),B.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=$.storage}}}const A=v%R;return A>0&&(v+=R-A),S.__size=v,S.__cache={},this}function _(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){const y=S.target;y.removeEventListener("dispose",m);const v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function f(){for(const S in r)n.deleteBuffer(r[S]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Ey{constructor(e={}){const{canvas:t=Qm(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const S=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let R=!1;this._outputColorSpace=In;let A=0,C=0,D=null,E=-1,M=null;const P=new Rt,B=new Rt;let F=null;const G=new je(0);let j=0,X=t.width,$=t.height,V=1,ie=null,he=null;const ye=new Rt(0,0,X,$),He=new Rt(0,0,X,$);let rt=!1;const Y=new id;let se=!1,Ee=!1;const fe=new ot,we=new ot,Je=new w,Ie=new Rt,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let bt=!1;function Qe(){return D===null?V:1}let L=i;function rn(b,U){return t.getContext(b,U)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yl}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",ee,!1),t.addEventListener("webglcontextcreationerror",Z,!1),L===null){const U="webgl2";if(L=rn(U,b),L===null)throw rn(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let et,ft,Me,$e,Ce,Ge,zt,T,x,z,q,K,W,Se,le,xe,be,J,pe,De,Pe,ae,ze,I;function de(){et=new Nv(L),et.init(),ae=new gy(L,et),ft=new Av(L,et,e,ae),Me=new py(L,et),ft.reverseDepthBuffer&&h&&Me.buffers.depth.setReversed(!0),$e=new Fv(L),Ce=new ty,Ge=new my(L,et,Me,Ce,ft,ae,$e),zt=new Rv(v),T=new Iv(v),x=new Gg(L),ze=new wv(L,x),z=new Uv(L,x,$e,ze),q=new Bv(L,z,x,$e),pe=new zv(L,ft,Ge),xe=new Cv(Ce),K=new ey(v,zt,T,et,ft,ze,xe),W=new Sy(v,Ce),Se=new iy,le=new ly(et),J=new Ev(v,zt,T,Me,q,p,l),be=new hy(v,q,ft),I=new by(L,$e,ft,Me),De=new Tv(L,et,$e),Pe=new Ov(L,et,$e),$e.programs=K.programs,v.capabilities=ft,v.extensions=et,v.properties=Ce,v.renderLists=Se,v.shadowMap=be,v.state=Me,v.info=$e}de();const Q=new yy(v,L);this.xr=Q,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=et.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=et.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(b){b!==void 0&&(V=b,this.setSize(X,$,!1))},this.getSize=function(b){return b.set(X,$)},this.setSize=function(b,U,k=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=b,$=U,t.width=Math.floor(b*V),t.height=Math.floor(U*V),k===!0&&(t.style.width=b+"px",t.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(X*V,$*V).floor()},this.setDrawingBufferSize=function(b,U,k){X=b,$=U,V=k,t.width=Math.floor(b*k),t.height=Math.floor(U*k),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(ye)},this.setViewport=function(b,U,k,H){b.isVector4?ye.set(b.x,b.y,b.z,b.w):ye.set(b,U,k,H),Me.viewport(P.copy(ye).multiplyScalar(V).round())},this.getScissor=function(b){return b.copy(He)},this.setScissor=function(b,U,k,H){b.isVector4?He.set(b.x,b.y,b.z,b.w):He.set(b,U,k,H),Me.scissor(B.copy(He).multiplyScalar(V).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(b){Me.setScissorTest(rt=b)},this.setOpaqueSort=function(b){ie=b},this.setTransparentSort=function(b){he=b},this.getClearColor=function(b){return b.copy(J.getClearColor())},this.setClearColor=function(){J.setClearColor(...arguments)},this.getClearAlpha=function(){return J.getClearAlpha()},this.setClearAlpha=function(){J.setClearAlpha(...arguments)},this.clear=function(b=!0,U=!0,k=!0){let H=0;if(b){let O=!1;if(D!==null){const te=D.texture.format;O=te===Ql||te===Jl||te===Kl}if(O){const te=D.texture.type,ue=te===li||te===Tr||te===eo||te===to||te===$l||te===Zl,ve=J.getClearColor(),me=J.getClearAlpha(),Ue=ve.r,Oe=ve.g,Te=ve.b;ue?(g[0]=Ue,g[1]=Oe,g[2]=Te,g[3]=me,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=Ue,_[1]=Oe,_[2]=Te,_[3]=me,L.clearBufferiv(L.COLOR,0,_))}else H|=L.COLOR_BUFFER_BIT}U&&(H|=L.DEPTH_BUFFER_BIT),k&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",ee,!1),t.removeEventListener("webglcontextcreationerror",Z,!1),J.dispose(),Se.dispose(),le.dispose(),Ce.dispose(),zt.dispose(),T.dispose(),q.dispose(),ze.dispose(),I.dispose(),K.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",Zd),Q.removeEventListener("sessionend",Kd),lr.stop()};function ge(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ee(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const b=$e.autoReset,U=be.enabled,k=be.autoUpdate,H=be.needsUpdate,O=be.type;de(),$e.autoReset=b,be.enabled=U,be.autoUpdate=k,be.needsUpdate=H,be.type=O}function Z(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function _e(b){const U=b.target;U.removeEventListener("dispose",_e),ke(U)}function ke(b){mt(b),Ce.remove(b)}function mt(b){const U=Ce.get(b).programs;U!==void 0&&(U.forEach(function(k){K.releaseProgram(k)}),b.isShaderMaterial&&K.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,k,H,O,te){U===null&&(U=St);const ue=O.isMesh&&O.matrixWorld.determinant()<0,ve=Xp(b,U,k,H,O);Me.setMaterial(H,ue);let me=k.index,Ue=1;if(H.wireframe===!0){if(me=z.getWireframeAttribute(k),me===void 0)return;Ue=2}const Oe=k.drawRange,Te=k.attributes.position;let Ye=Oe.start*Ue,at=(Oe.start+Oe.count)*Ue;te!==null&&(Ye=Math.max(Ye,te.start*Ue),at=Math.min(at,(te.start+te.count)*Ue)),me!==null?(Ye=Math.max(Ye,0),at=Math.min(at,me.count)):Te!=null&&(Ye=Math.max(Ye,0),at=Math.min(at,Te.count));const At=at-Ye;if(At<0||At===1/0)return;ze.setup(O,H,ve,k,me);let gt,ut=De;if(me!==null&&(gt=x.get(me),ut=Pe,ut.setIndex(gt)),O.isMesh)H.wireframe===!0?(Me.setLineWidth(H.wireframeLinewidth*Qe()),ut.setMode(L.LINES)):ut.setMode(L.TRIANGLES);else if(O.isLine){let Re=H.linewidth;Re===void 0&&(Re=1),Me.setLineWidth(Re*Qe()),O.isLineSegments?ut.setMode(L.LINES):O.isLineLoop?ut.setMode(L.LINE_LOOP):ut.setMode(L.LINE_STRIP)}else O.isPoints?ut.setMode(L.POINTS):O.isSprite&&ut.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ps("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))ut.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Re=O._multiDrawStarts,Et=O._multiDrawCounts,Ze=O._multiDrawCount,Mn=me?x.get(me).bytesPerElement:1,Wr=Ce.get(H).currentProgram.getUniforms();for(let Sn=0;Sn<Ze;Sn++)Wr.setValue(L,"_gl_DrawID",Sn),ut.render(Re[Sn]/Mn,Et[Sn])}else if(O.isInstancedMesh)ut.renderInstances(Ye,At,O.count);else if(k.isInstancedBufferGeometry){const Re=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Et=Math.min(k.instanceCount,Re);ut.renderInstances(Ye,At,Et)}else ut.render(Ye,At)};function st(b,U,k){b.transparent===!0&&b.side===en&&b.forceSinglePass===!1?(b.side=ln,b.needsUpdate=!0,So(b,U,k),b.side=Di,b.needsUpdate=!0,So(b,U,k),b.side=en):So(b,U,k)}this.compile=function(b,U,k=null){k===null&&(k=b),f=le.get(k),f.init(U),y.push(f),k.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),b!==k&&b.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();const H=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const te=O.material;if(te)if(Array.isArray(te))for(let ue=0;ue<te.length;ue++){const ve=te[ue];st(ve,k,O),H.add(ve)}else st(te,k,O),H.add(te)}),f=y.pop(),H},this.compileAsync=function(b,U,k=null){const H=this.compile(b,U,k);return new Promise(O=>{function te(){if(H.forEach(function(ue){Ce.get(ue).currentProgram.isReady()&&H.delete(ue)}),H.size===0){O(b);return}setTimeout(te,10)}et.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Hn=null;function gi(b){Hn&&Hn(b)}function Zd(){lr.stop()}function Kd(){lr.start()}const lr=new cf;lr.setAnimationLoop(gi),typeof self<"u"&&lr.setContext(self),this.setAnimationLoop=function(b){Hn=b,Q.setAnimationLoop(b),b===null?lr.stop():lr.start()},Q.addEventListener("sessionstart",Zd),Q.addEventListener("sessionend",Kd),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(U),U=Q.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,U,D),f=le.get(b,y.length),f.init(U),y.push(f),we.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(we),Ee=this.localClippingEnabled,se=xe.init(this.clippingPlanes,Ee),m=Se.get(b,S.length),m.init(),S.push(m),Q.enabled===!0&&Q.isPresenting===!0){const te=v.xr.getDepthSensingMesh();te!==null&&Ka(te,U,-1/0,v.sortObjects)}Ka(b,U,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ie,he),bt=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,bt&&J.addToRenderList(m,b),this.info.render.frame++,se===!0&&xe.beginShadows();const k=f.state.shadowsArray;be.render(k,b,U),se===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,O=m.transmissive;if(f.setupLights(),U.isArrayCamera){const te=U.cameras;if(O.length>0)for(let ue=0,ve=te.length;ue<ve;ue++){const me=te[ue];Qd(H,O,b,me)}bt&&J.render(b);for(let ue=0,ve=te.length;ue<ve;ue++){const me=te[ue];Jd(m,b,me,me.viewport)}}else O.length>0&&Qd(H,O,b,U),bt&&J.render(b),Jd(m,b,U);D!==null&&C===0&&(Ge.updateMultisampleRenderTarget(D),Ge.updateRenderTargetMipmap(D)),b.isScene===!0&&b.onAfterRender(v,b,U),ze.resetDefaultState(),E=-1,M=null,y.pop(),y.length>0?(f=y[y.length-1],se===!0&&xe.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Ka(b,U,k,H){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)k=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Y.intersectsSprite(b)){H&&Ie.setFromMatrixPosition(b.matrixWorld).applyMatrix4(we);const ue=q.update(b),ve=b.material;ve.visible&&m.push(b,ue,ve,k,Ie.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Y.intersectsObject(b))){const ue=q.update(b),ve=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ie.copy(b.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Ie.copy(ue.boundingSphere.center)),Ie.applyMatrix4(b.matrixWorld).applyMatrix4(we)),Array.isArray(ve)){const me=ue.groups;for(let Ue=0,Oe=me.length;Ue<Oe;Ue++){const Te=me[Ue],Ye=ve[Te.materialIndex];Ye&&Ye.visible&&m.push(b,ue,Ye,k,Ie.z,Te)}}else ve.visible&&m.push(b,ue,ve,k,Ie.z,null)}}const te=b.children;for(let ue=0,ve=te.length;ue<ve;ue++)Ka(te[ue],U,k,H)}function Jd(b,U,k,H){const O=b.opaque,te=b.transmissive,ue=b.transparent;f.setupLightsView(k),se===!0&&xe.setGlobalState(v.clippingPlanes,k),H&&Me.viewport(P.copy(H)),O.length>0&&Mo(O,U,k),te.length>0&&Mo(te,U,k),ue.length>0&&Mo(ue,U,k),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function Qd(b,U,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new Cr(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?ho:li,minFilter:Er,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const te=f.state.transmissionRenderTarget[H.id],ue=H.viewport||P;te.setSize(ue.z*v.transmissionResolutionScale,ue.w*v.transmissionResolutionScale);const ve=v.getRenderTarget(),me=v.getActiveCubeFace(),Ue=v.getActiveMipmapLevel();v.setRenderTarget(te),v.getClearColor(G),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),bt&&J.render(k);const Oe=v.toneMapping;v.toneMapping=qi;const Te=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),se===!0&&xe.setGlobalState(v.clippingPlanes,H),Mo(b,k,H),Ge.updateMultisampleRenderTarget(te),Ge.updateRenderTargetMipmap(te),et.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let at=0,At=U.length;at<At;at++){const gt=U[at],ut=gt.object,Re=gt.geometry,Et=gt.material,Ze=gt.group;if(Et.side===en&&ut.layers.test(H.layers)){const Mn=Et.side;Et.side=ln,Et.needsUpdate=!0,eu(ut,k,H,Re,Et,Ze),Et.side=Mn,Et.needsUpdate=!0,Ye=!0}}Ye===!0&&(Ge.updateMultisampleRenderTarget(te),Ge.updateRenderTargetMipmap(te))}v.setRenderTarget(ve,me,Ue),v.setClearColor(G,j),Te!==void 0&&(H.viewport=Te),v.toneMapping=Oe}function Mo(b,U,k){const H=U.isScene===!0?U.overrideMaterial:null;for(let O=0,te=b.length;O<te;O++){const ue=b[O],ve=ue.object,me=ue.geometry,Ue=ue.group;let Oe=ue.material;Oe.allowOverride===!0&&H!==null&&(Oe=H),ve.layers.test(k.layers)&&eu(ve,U,k,me,Oe,Ue)}}function eu(b,U,k,H,O,te){b.onBeforeRender(v,U,k,H,O,te),b.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(v,U,k,H,b,te),O.transparent===!0&&O.side===en&&O.forceSinglePass===!1?(O.side=ln,O.needsUpdate=!0,v.renderBufferDirect(k,U,H,O,b,te),O.side=Di,O.needsUpdate=!0,v.renderBufferDirect(k,U,H,O,b,te),O.side=en):v.renderBufferDirect(k,U,H,O,b,te),b.onAfterRender(v,U,k,H,O,te)}function So(b,U,k){U.isScene!==!0&&(U=St);const H=Ce.get(b),O=f.state.lights,te=f.state.shadowsArray,ue=O.state.version,ve=K.getParameters(b,O.state,te,U,k),me=K.getProgramCacheKey(ve);let Ue=H.programs;H.environment=b.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(b.isMeshStandardMaterial?T:zt).get(b.envMap||H.environment),H.envMapRotation=H.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Ue===void 0&&(b.addEventListener("dispose",_e),Ue=new Map,H.programs=Ue);let Oe=Ue.get(me);if(Oe!==void 0){if(H.currentProgram===Oe&&H.lightsStateVersion===ue)return nu(b,ve),Oe}else ve.uniforms=K.getUniforms(b),b.onBeforeCompile(ve,v),Oe=K.acquireProgram(ve,me),Ue.set(me,Oe),H.uniforms=ve.uniforms;const Te=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Te.clippingPlanes=xe.uniform),nu(b,ve),H.needsLights=Yp(b),H.lightsStateVersion=ue,H.needsLights&&(Te.ambientLightColor.value=O.state.ambient,Te.lightProbe.value=O.state.probe,Te.directionalLights.value=O.state.directional,Te.directionalLightShadows.value=O.state.directionalShadow,Te.spotLights.value=O.state.spot,Te.spotLightShadows.value=O.state.spotShadow,Te.rectAreaLights.value=O.state.rectArea,Te.ltc_1.value=O.state.rectAreaLTC1,Te.ltc_2.value=O.state.rectAreaLTC2,Te.pointLights.value=O.state.point,Te.pointLightShadows.value=O.state.pointShadow,Te.hemisphereLights.value=O.state.hemi,Te.directionalShadowMap.value=O.state.directionalShadowMap,Te.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Te.spotShadowMap.value=O.state.spotShadowMap,Te.spotLightMatrix.value=O.state.spotLightMatrix,Te.spotLightMap.value=O.state.spotLightMap,Te.pointShadowMap.value=O.state.pointShadowMap,Te.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=Oe,H.uniformsList=null,Oe}function tu(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=sa.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function nu(b,U){const k=Ce.get(b);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function Xp(b,U,k,H,O){U.isScene!==!0&&(U=St),Ge.resetTextureUnits();const te=U.fog,ue=H.isMeshStandardMaterial?U.environment:null,ve=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Ms,me=(H.isMeshStandardMaterial?T:zt).get(H.envMap||ue),Ue=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Oe=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Te=!!k.morphAttributes.position,Ye=!!k.morphAttributes.normal,at=!!k.morphAttributes.color;let At=qi;H.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(At=v.toneMapping);const gt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ut=gt!==void 0?gt.length:0,Re=Ce.get(H),Et=f.state.lights;if(se===!0&&(Ee===!0||b!==M)){const sn=b===M&&H.id===E;xe.setState(H,b,sn)}let Ze=!1;H.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==Et.state.version||Re.outputColorSpace!==ve||O.isBatchedMesh&&Re.batching===!1||!O.isBatchedMesh&&Re.batching===!0||O.isBatchedMesh&&Re.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Re.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Re.instancing===!1||!O.isInstancedMesh&&Re.instancing===!0||O.isSkinnedMesh&&Re.skinning===!1||!O.isSkinnedMesh&&Re.skinning===!0||O.isInstancedMesh&&Re.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Re.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Re.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Re.instancingMorph===!1&&O.morphTexture!==null||Re.envMap!==me||H.fog===!0&&Re.fog!==te||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==xe.numPlanes||Re.numIntersection!==xe.numIntersection)||Re.vertexAlphas!==Ue||Re.vertexTangents!==Oe||Re.morphTargets!==Te||Re.morphNormals!==Ye||Re.morphColors!==at||Re.toneMapping!==At||Re.morphTargetsCount!==ut)&&(Ze=!0):(Ze=!0,Re.__version=H.version);let Mn=Re.currentProgram;Ze===!0&&(Mn=So(H,U,O));let Wr=!1,Sn=!1,Fs=!1;const _t=Mn.getUniforms(),Pn=Re.uniforms;if(Me.useProgram(Mn.program)&&(Wr=!0,Sn=!0,Fs=!0),H.id!==E&&(E=H.id,Sn=!0),Wr||M!==b){Me.buffers.depth.getReversed()?(fe.copy(b.projectionMatrix),tg(fe),ng(fe),_t.setValue(L,"projectionMatrix",fe)):_t.setValue(L,"projectionMatrix",b.projectionMatrix),_t.setValue(L,"viewMatrix",b.matrixWorldInverse);const fn=_t.map.cameraPosition;fn!==void 0&&fn.setValue(L,Je.setFromMatrixPosition(b.matrixWorld)),ft.logarithmicDepthBuffer&&_t.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&_t.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Sn=!0,Fs=!0)}if(O.isSkinnedMesh){_t.setOptional(L,O,"bindMatrix"),_t.setOptional(L,O,"bindMatrixInverse");const sn=O.skeleton;sn&&(sn.boneTexture===null&&sn.computeBoneTexture(),_t.setValue(L,"boneTexture",sn.boneTexture,Ge))}O.isBatchedMesh&&(_t.setOptional(L,O,"batchingTexture"),_t.setValue(L,"batchingTexture",O._matricesTexture,Ge),_t.setOptional(L,O,"batchingIdTexture"),_t.setValue(L,"batchingIdTexture",O._indirectTexture,Ge),_t.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&_t.setValue(L,"batchingColorTexture",O._colorsTexture,Ge));const Dn=k.morphAttributes;if((Dn.position!==void 0||Dn.normal!==void 0||Dn.color!==void 0)&&pe.update(O,k,Mn),(Sn||Re.receiveShadow!==O.receiveShadow)&&(Re.receiveShadow=O.receiveShadow,_t.setValue(L,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Pn.envMap.value=me,Pn.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(Pn.envMapIntensity.value=U.environmentIntensity),Sn&&(_t.setValue(L,"toneMappingExposure",v.toneMappingExposure),Re.needsLights&&jp(Pn,Fs),te&&H.fog===!0&&W.refreshFogUniforms(Pn,te),W.refreshMaterialUniforms(Pn,H,V,$,f.state.transmissionRenderTarget[b.id]),sa.upload(L,tu(Re),Pn,Ge)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(sa.upload(L,tu(Re),Pn,Ge),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&_t.setValue(L,"center",O.center),_t.setValue(L,"modelViewMatrix",O.modelViewMatrix),_t.setValue(L,"normalMatrix",O.normalMatrix),_t.setValue(L,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const sn=H.uniformsGroups;for(let fn=0,Ja=sn.length;fn<Ja;fn++){const dr=sn[fn];I.update(dr,Mn),I.bind(dr,Mn)}}return Mn}function jp(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function Yp(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(b,U,k){const H=Ce.get(b);H.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),Ce.get(b.texture).__webglTexture=U,Ce.get(b.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:k,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,U){const k=Ce.get(b);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0};const qp=L.createFramebuffer();this.setRenderTarget=function(b,U=0,k=0){D=b,A=U,C=k;let H=!0,O=null,te=!1,ue=!1;if(b){const me=Ce.get(b);if(me.__useDefaultFramebuffer!==void 0)Me.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(me.__webglFramebuffer===void 0)Ge.setupRenderTarget(b);else if(me.__hasExternalTextures)Ge.rebindTextures(b,Ce.get(b.texture).__webglTexture,Ce.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Te=b.depthTexture;if(me.__boundDepthTexture!==Te){if(Te!==null&&Ce.has(Te)&&(b.width!==Te.image.width||b.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ge.setupDepthRenderbuffer(b)}}const Ue=b.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ue=!0);const Oe=Ce.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Oe[U])?O=Oe[U][k]:O=Oe[U],te=!0):b.samples>0&&Ge.useMultisampledRTT(b)===!1?O=Ce.get(b).__webglMultisampledFramebuffer:Array.isArray(Oe)?O=Oe[k]:O=Oe,P.copy(b.viewport),B.copy(b.scissor),F=b.scissorTest}else P.copy(ye).multiplyScalar(V).floor(),B.copy(He).multiplyScalar(V).floor(),F=rt;if(k!==0&&(O=qp),Me.bindFramebuffer(L.FRAMEBUFFER,O)&&H&&Me.drawBuffers(b,O),Me.viewport(P),Me.scissor(B),Me.setScissorTest(F),te){const me=Ce.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,me.__webglTexture,k)}else if(ue){const me=Ce.get(b.texture),Ue=U;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,me.__webglTexture,k,Ue)}else if(b!==null&&k!==0){const me=Ce.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,me.__webglTexture,k)}E=-1},this.readRenderTargetPixels=function(b,U,k,H,O,te,ue,ve=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ue!==void 0&&(me=me[ue]),me){Me.bindFramebuffer(L.FRAMEBUFFER,me);try{const Ue=b.textures[ve],Oe=Ue.format,Te=Ue.type;if(!ft.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-H&&k>=0&&k<=b.height-O&&(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),L.readPixels(U,k,H,O,ae.convert(Oe),ae.convert(Te),te))}finally{const Ue=D!==null?Ce.get(D).__webglFramebuffer:null;Me.bindFramebuffer(L.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(b,U,k,H,O,te,ue,ve=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ue!==void 0&&(me=me[ue]),me)if(U>=0&&U<=b.width-H&&k>=0&&k<=b.height-O){Me.bindFramebuffer(L.FRAMEBUFFER,me);const Ue=b.textures[ve],Oe=Ue.format,Te=Ue.type;if(!ft.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ye),L.bufferData(L.PIXEL_PACK_BUFFER,te.byteLength,L.STREAM_READ),b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),L.readPixels(U,k,H,O,ae.convert(Oe),ae.convert(Te),0);const at=D!==null?Ce.get(D).__webglFramebuffer:null;Me.bindFramebuffer(L.FRAMEBUFFER,at);const At=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await eg(L,At,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ye),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,te),L.deleteBuffer(Ye),L.deleteSync(At),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,U=null,k=0){const H=Math.pow(2,-k),O=Math.floor(b.image.width*H),te=Math.floor(b.image.height*H),ue=U!==null?U.x:0,ve=U!==null?U.y:0;Ge.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,k,0,0,ue,ve,O,te),Me.unbindTexture()};const $p=L.createFramebuffer(),Zp=L.createFramebuffer();this.copyTextureToTexture=function(b,U,k=null,H=null,O=0,te=null){te===null&&(O!==0?(ps("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=O,O=0):te=0);let ue,ve,me,Ue,Oe,Te,Ye,at,At;const gt=b.isCompressedTexture?b.mipmaps[te]:b.image;if(k!==null)ue=k.max.x-k.min.x,ve=k.max.y-k.min.y,me=k.isBox3?k.max.z-k.min.z:1,Ue=k.min.x,Oe=k.min.y,Te=k.isBox3?k.min.z:0;else{const Dn=Math.pow(2,-O);ue=Math.floor(gt.width*Dn),ve=Math.floor(gt.height*Dn),b.isDataArrayTexture?me=gt.depth:b.isData3DTexture?me=Math.floor(gt.depth*Dn):me=1,Ue=0,Oe=0,Te=0}H!==null?(Ye=H.x,at=H.y,At=H.z):(Ye=0,at=0,At=0);const ut=ae.convert(U.format),Re=ae.convert(U.type);let Et;U.isData3DTexture?(Ge.setTexture3D(U,0),Et=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ge.setTexture2DArray(U,0),Et=L.TEXTURE_2D_ARRAY):(Ge.setTexture2D(U,0),Et=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const Ze=L.getParameter(L.UNPACK_ROW_LENGTH),Mn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Wr=L.getParameter(L.UNPACK_SKIP_PIXELS),Sn=L.getParameter(L.UNPACK_SKIP_ROWS),Fs=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,gt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,gt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ue),L.pixelStorei(L.UNPACK_SKIP_ROWS,Oe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Te);const _t=b.isDataArrayTexture||b.isData3DTexture,Pn=U.isDataArrayTexture||U.isData3DTexture;if(b.isDepthTexture){const Dn=Ce.get(b),sn=Ce.get(U),fn=Ce.get(Dn.__renderTarget),Ja=Ce.get(sn.__renderTarget);Me.bindFramebuffer(L.READ_FRAMEBUFFER,fn.__webglFramebuffer),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ja.__webglFramebuffer);for(let dr=0;dr<me;dr++)_t&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ce.get(b).__webglTexture,O,Te+dr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ce.get(U).__webglTexture,te,At+dr)),L.blitFramebuffer(Ue,Oe,ue,ve,Ye,at,ue,ve,L.DEPTH_BUFFER_BIT,L.NEAREST);Me.bindFramebuffer(L.READ_FRAMEBUFFER,null),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||b.isRenderTargetTexture||Ce.has(b)){const Dn=Ce.get(b),sn=Ce.get(U);Me.bindFramebuffer(L.READ_FRAMEBUFFER,$p),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,Zp);for(let fn=0;fn<me;fn++)_t?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Dn.__webglTexture,O,Te+fn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Dn.__webglTexture,O),Pn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,sn.__webglTexture,te,At+fn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,sn.__webglTexture,te),O!==0?L.blitFramebuffer(Ue,Oe,ue,ve,Ye,at,ue,ve,L.COLOR_BUFFER_BIT,L.NEAREST):Pn?L.copyTexSubImage3D(Et,te,Ye,at,At+fn,Ue,Oe,ue,ve):L.copyTexSubImage2D(Et,te,Ye,at,Ue,Oe,ue,ve);Me.bindFramebuffer(L.READ_FRAMEBUFFER,null),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Pn?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Et,te,Ye,at,At,ue,ve,me,ut,Re,gt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Et,te,Ye,at,At,ue,ve,me,ut,gt.data):L.texSubImage3D(Et,te,Ye,at,At,ue,ve,me,ut,Re,gt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,te,Ye,at,ue,ve,ut,Re,gt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,te,Ye,at,gt.width,gt.height,ut,gt.data):L.texSubImage2D(L.TEXTURE_2D,te,Ye,at,ue,ve,ut,Re,gt);L.pixelStorei(L.UNPACK_ROW_LENGTH,Ze),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Mn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Wr),L.pixelStorei(L.UNPACK_SKIP_ROWS,Sn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Fs),te===0&&U.generateMipmaps&&L.generateMipmap(Et),Me.unbindTexture()},this.copyTextureToTexture3D=function(b,U,k=null,H=null,O=0){return ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,U,k,H,O)},this.initRenderTarget=function(b){Ce.get(b).__webglFramebuffer===void 0&&Ge.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ge.setTextureCube(b,0):b.isData3DTexture?Ge.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ge.setTexture2DArray(b,0):Ge.setTexture2D(b,0),Me.unbindTexture()},this.resetState=function(){A=0,C=0,D=null,Me.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}const ch={type:"change"},ld={type:"start"},ff={type:"end"},Zo=new Pa,lh=new ti,wy=Math.cos(70*Ar.DEG2RAD),Bt=new w,pn=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Dc=1e-6;class Ty extends af{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new w,this.cursor=new w,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ji.ROTATE,MIDDLE:ji.DOLLY,RIGHT:ji.PAN},this.touches={ONE:cs.ROTATE,TWO:cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new w,this._lastQuaternion=new kt,this._lastTargetPosition=new w,this._quat=new kt().setFromUnitVectors(e.up,new w(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ou,this._sphericalDelta=new Ou,this._scale=1,this._panOffset=new w,this._rotateStart=new Ne,this._rotateEnd=new Ne,this._rotateDelta=new Ne,this._panStart=new Ne,this._panEnd=new Ne,this._panDelta=new Ne,this._dollyStart=new Ne,this._dollyEnd=new Ne,this._dollyDelta=new Ne,this._dollyDirection=new w,this._mouse=new Ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Cy.bind(this),this._onPointerDown=Ay.bind(this),this._onPointerUp=Ry.bind(this),this._onContextMenu=Oy.bind(this),this._onMouseWheel=Ly.bind(this),this._onKeyDown=Iy.bind(this),this._onTouchStart=Ny.bind(this),this._onTouchMove=Uy.bind(this),this._onMouseDown=Py.bind(this),this._onMouseMove=Dy.bind(this),this._interceptControlDown=Fy.bind(this),this._interceptControlUp=zy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ch),this.update(),this.state=lt.NONE}update(e=null){const t=this.object.position;Bt.copy(t).sub(this.target),Bt.applyQuaternion(this._quat),this._spherical.setFromVector3(Bt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=pn:i>Math.PI&&(i-=pn),r<-Math.PI?r+=pn:r>Math.PI&&(r-=pn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Bt.setFromSpherical(this._spherical),Bt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Bt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new w(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new w(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Zo.origin.copy(this.object.position),Zo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zo.direction))<wy?this.object.lookAt(this.target):(lh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zo.intersectPlane(lh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Dc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Dc||this._lastTargetPosition.distanceToSquared(this.target)>Dc?(this.dispatchEvent(ch),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?pn/60*this.autoRotateSpeed*e:pn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Bt.setFromMatrixColumn(t,0),Bt.multiplyScalar(-e),this._panOffset.add(Bt)}_panUp(e,t){this.screenSpacePanning===!0?Bt.setFromMatrixColumn(t,1):(Bt.setFromMatrixColumn(t,0),Bt.crossVectors(this.object.up,Bt)),Bt.multiplyScalar(e),this._panOffset.add(Bt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Bt.copy(r).sub(this.target);let s=Bt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/t.clientHeight),this._rotateUp(pn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/t.clientHeight),this._rotateUp(pn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ne,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Ay(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Cy(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Ry(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ff),this.state=lt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Py(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ji.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=lt.DOLLY;break;case ji.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}break;case ji.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(ld)}function Dy(n){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Ly(n){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(n.preventDefault(),this.dispatchEvent(ld),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(ff))}function Iy(n){this.enabled!==!1&&this._handleKeyDown(n)}function Ny(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case cs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=lt.TOUCH_ROTATE;break;case cs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=lt.TOUCH_DOLLY_PAN;break;case cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(ld)}function Uy(n){switch(this._trackPointer(n),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=lt.NONE}}function Oy(n){this.enabled!==!1&&n.preventDefault()}function Fy(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zy(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const _r=new of,Qt=new w,Vi=new w,vt=new kt,dh={X:new w(1,0,0),Y:new w(0,1,0),Z:new w(0,0,1)},Lc={type:"change"},uh={type:"mouseDown",mode:null},hh={type:"mouseUp",mode:null},fh={type:"objectChange"};class By extends af{constructor(e,t=null){super(void 0,t);const i=new Xy(this);this._root=i;const r=new jy;this._gizmo=r,i.add(r);const s=new Yy;this._plane=s,i.add(s);const o=this;function a(y,v){let R=v;Object.defineProperty(o,y,{get:function(){return R!==void 0?R:v},set:function(A){R!==A&&(R=A,s[y]=A,r[y]=A,o.dispatchEvent({type:y+"-changed",value:A}),o.dispatchEvent(Lc))}}),o[y]=v,s[y]=v,r[y]=v}a("camera",e),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0),a("minX",-1/0),a("maxX",1/0),a("minY",-1/0),a("maxY",1/0),a("minZ",-1/0),a("maxZ",1/0);const l=new w,c=new w,u=new kt,d=new kt,h=new w,p=new kt,g=new w,_=new w,m=new w,f=0,S=new w;a("worldPosition",l),a("worldPositionStart",c),a("worldQuaternion",u),a("worldQuaternionStart",d),a("cameraPosition",h),a("cameraQuaternion",p),a("pointStart",g),a("pointEnd",_),a("rotationAxis",m),a("rotationAngle",f),a("eye",S),this._offset=new w,this._startNorm=new w,this._endNorm=new w,this._cameraScale=new w,this._parentPosition=new w,this._parentQuaternion=new kt,this._parentQuaternionInv=new kt,this._parentScale=new w,this._worldScaleStart=new w,this._worldQuaternionInv=new kt,this._worldScale=new w,this._positionStart=new w,this._quaternionStart=new kt,this._scaleStart=new w,this._getPointer=ky.bind(this),this._onPointerDown=Vy.bind(this),this._onPointerHover=Hy.bind(this),this._onPointerMove=Gy.bind(this),this._onPointerUp=Wy.bind(this),t!==null&&this.connect(t)}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&_r.setFromCamera(e,this.camera);const t=Ic(this._gizmo.picker[this.mode],_r);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&_r.setFromCamera(e,this.camera);const t=Ic(this._plane,_r,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,uh.mode=this.mode,this.dispatchEvent(uh)}}pointerMove(e){const t=this.axis,i=this.mode,r=this.object;let s=this.space;if(i==="scale"?s="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(s="world"),r===void 0||t===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&_r.setFromCamera(e,this.camera);const o=Ic(this._plane,_r,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),i==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(r.position.applyQuaternion(vt.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),s==="world"&&(r.parent&&r.position.add(Qt.setFromMatrixPosition(r.parent.matrixWorld)),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(Qt.setFromMatrixPosition(r.parent.matrixWorld)))),r.position.x=Math.max(this.minX,Math.min(this.maxX,r.position.x)),r.position.y=Math.max(this.minY,Math.min(this.maxY,r.position.y)),r.position.z=Math.max(this.minZ,Math.min(this.maxZ,r.position.z));else if(i==="scale"){if(t.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),Vi.set(a,a,a)}else Qt.copy(this.pointStart),Vi.copy(this.pointEnd),Qt.applyQuaternion(this._worldQuaternionInv),Vi.applyQuaternion(this._worldQuaternionInv),Vi.divide(Qt),t.search("X")===-1&&(Vi.x=1),t.search("Y")===-1&&(Vi.y=1),t.search("Z")===-1&&(Vi.z=1);r.scale.copy(this._scaleStart).multiply(Vi),this.scaleSnap&&(t.search("X")!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(i==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(Qt.setFromMatrixPosition(this.camera.matrixWorld));let l=!1;t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Qt.copy(this.rotationAxis).cross(this.eye))*a):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(dh[t]),Qt.copy(dh[t]),s==="local"&&Qt.applyQuaternion(this.worldQuaternion),Qt.cross(this.eye),Qt.length()===0?l=!0:this.rotationAngle=this._offset.dot(Qt.normalize())*a),(t==="E"||l)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&t!=="E"&&t!=="XYZE"?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(vt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(vt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Lc),this.dispatchEvent(fh)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(hh.mode=this.mode,this.dispatchEvent(hh)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(e){return this.object=e,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Lc),this.dispatchEvent(fh),this.pointStart.copy(this.pointEnd))}getRaycaster(){return _r}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}setColors(e,t,i,r){const s=this._gizmo.materialLib;s.xAxis.color.set(e),s.yAxis.color.set(t),s.zAxis.color.set(i),s.active.color.set(r),s.xAxisTransparent.color.set(e),s.yAxisTransparent.color.set(t),s.zAxisTransparent.color.set(i),s.activeTransparent.color.set(r),s.xAxis._color&&s.xAxis._color.set(e),s.yAxis._color&&s.yAxis._color.set(t),s.zAxis._color&&s.zAxis._color.set(i),s.active._color&&s.active._color.set(r),s.xAxisTransparent._color&&s.xAxisTransparent._color.set(e),s.yAxisTransparent._color&&s.yAxisTransparent._color.set(t),s.zAxisTransparent._color&&s.zAxisTransparent._color.set(i),s.activeTransparent._color&&s.activeTransparent._color.set(r)}}function ky(n){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:n.button};{const e=this.domElement.getBoundingClientRect();return{x:(n.clientX-e.left)/e.width*2-1,y:-(n.clientY-e.top)/e.height*2+1,button:n.button}}}function Hy(n){if(this.enabled)switch(n.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(n));break}}function Vy(n){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(n)),this.pointerDown(this._getPointer(n)))}function Gy(n){this.enabled&&this.pointerMove(this._getPointer(n))}function Wy(n){this.enabled&&(this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(n)))}function Ic(n,e,t){const i=e.intersectObject(n,!0);for(let r=0;r<i.length;r++)if(i[r].object.visible||t)return i[r];return!1}const Ko=new $n,ht=new w(0,1,0),ph=new w(0,0,0),mh=new ot,Jo=new kt,oa=new kt,Jn=new w,gh=new ot,Ys=new w(1,0,0),xr=new w(0,1,0),qs=new w(0,0,1),Qo=new w,Gs=new w,Ws=new w;class Xy extends yt{constructor(e){super(),this.isTransformControlsRoot=!0,this.controls=e,this.visible=!1}updateMatrixWorld(e){const t=this.controls;t.object!==void 0&&(t.object.updateMatrixWorld(),t.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):t.object.parent.matrixWorld.decompose(t._parentPosition,t._parentQuaternion,t._parentScale),t.object.matrixWorld.decompose(t.worldPosition,t.worldQuaternion,t._worldScale),t._parentQuaternionInv.copy(t._parentQuaternion).invert(),t._worldQuaternionInv.copy(t.worldQuaternion).invert()),t.camera.updateMatrixWorld(),t.camera.matrixWorld.decompose(t.cameraPosition,t.cameraQuaternion,t._cameraScale),t.camera.isOrthographicCamera?t.camera.getWorldDirection(t.eye).negate():t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(),super.updateMatrixWorld(e)}dispose(){this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class jy extends yt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new di({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new Fr({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),i=e.clone();i.opacity=.15;const r=t.clone();r.opacity=.5;const s=e.clone();s.color.setHex(16711680);const o=e.clone();o.color.setHex(65280);const a=e.clone();a.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const u=e.clone();u.color.setHex(255),u.opacity=.5;const d=e.clone();d.opacity=.25;const h=e.clone();h.color.setHex(16776960),h.opacity=.25;const p=e.clone();p.color.setHex(16776960);const g=e.clone();g.color.setHex(7895160),this.materialLib={xAxis:s,yAxis:o,zAxis:a,active:p,xAxisTransparent:l,yAxisTransparent:c,zAxisTransparent:u,activeTransparent:h};const _=new Yt(0,.04,.1,12);_.translate(0,.05,0);const m=new wt(.08,.08,.08);m.translate(0,.04,0);const f=new Ut;f.setAttribute("position",new dt([0,0,0,1,0,0],3));const S=new Yt(.0075,.0075,.5,3);S.translate(0,.25,0);function y(j,X){const $=new Mr(j,.0075,3,64,X*Math.PI*2);return $.rotateY(Math.PI/2),$.rotateX(Math.PI/2),$}function v(){const j=new Ut;return j.setAttribute("position",new dt([0,0,0,1,1,1],3)),j}const R={X:[[new oe(_,s),[.5,0,0],[0,0,-Math.PI/2]],[new oe(_,s),[-.5,0,0],[0,0,Math.PI/2]],[new oe(S,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new oe(_,o),[0,.5,0]],[new oe(_,o),[0,-.5,0],[Math.PI,0,0]],[new oe(S,o)]],Z:[[new oe(_,a),[0,0,.5],[Math.PI/2,0,0]],[new oe(_,a),[0,0,-.5],[-Math.PI/2,0,0]],[new oe(S,a),null,[Math.PI/2,0,0]]],XYZ:[[new oe(new ls(.1,0),d),[0,0,0]]],XY:[[new oe(new wt(.15,.15,.01),u),[.15,.15,0]]],YZ:[[new oe(new wt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new oe(new wt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]]},A={X:[[new oe(new Yt(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new oe(new Yt(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new oe(new Yt(.2,0,.6,4),i),[0,.3,0]],[new oe(new Yt(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new oe(new Yt(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new oe(new Yt(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new oe(new ls(.2,0),i)]],XY:[[new oe(new wt(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new oe(new wt(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new oe(new wt(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]]},C={START:[[new oe(new ls(.01,2),r),null,null,null,"helper"]],END:[[new oe(new ls(.01,2),r),null,null,null,"helper"]],DELTA:[[new bi(v(),r),null,null,null,"helper"]],X:[[new bi(f,r),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new bi(f,r),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new bi(f,r),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},D={XYZE:[[new oe(y(.5,1),g),null,[0,Math.PI/2,0]]],X:[[new oe(y(.5,.5),s)]],Y:[[new oe(y(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new oe(y(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new oe(y(.75,1),h),null,[0,Math.PI/2,0]]]},E={AXIS:[[new bi(f,r),[-1e3,0,0],null,[1e6,1,1],"helper"]]},M={XYZE:[[new oe(new zr(.25,10,8),i)]],X:[[new oe(new Mr(.5,.1,4,24),i),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new oe(new Mr(.5,.1,4,24),i),[0,0,0],[Math.PI/2,0,0]]],Z:[[new oe(new Mr(.5,.1,4,24),i),[0,0,0],[0,0,-Math.PI/2]]],E:[[new oe(new Mr(.75,.1,2,24),i)]]},P={X:[[new oe(m,s),[.5,0,0],[0,0,-Math.PI/2]],[new oe(S,s),[0,0,0],[0,0,-Math.PI/2]],[new oe(m,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new oe(m,o),[0,.5,0]],[new oe(S,o)],[new oe(m,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new oe(m,a),[0,0,.5],[Math.PI/2,0,0]],[new oe(S,a),[0,0,0],[Math.PI/2,0,0]],[new oe(m,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new oe(new wt(.15,.15,.01),u),[.15,.15,0]]],YZ:[[new oe(new wt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new oe(new wt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new oe(new wt(.1,.1,.1),d)]]},B={X:[[new oe(new Yt(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new oe(new Yt(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new oe(new Yt(.2,0,.6,4),i),[0,.3,0]],[new oe(new Yt(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new oe(new Yt(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new oe(new Yt(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new oe(new wt(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new oe(new wt(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new oe(new wt(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new oe(new wt(.2,.2,.2),i),[0,0,0]]]},F={X:[[new bi(f,r),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new bi(f,r),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new bi(f,r),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function G(j){const X=new yt;for(const $ in j)for(let V=j[$].length;V--;){const ie=j[$][V][0].clone(),he=j[$][V][1],ye=j[$][V][2],He=j[$][V][3],rt=j[$][V][4];ie.name=$,ie.tag=rt,he&&ie.position.set(he[0],he[1],he[2]),ye&&ie.rotation.set(ye[0],ye[1],ye[2]),He&&ie.scale.set(He[0],He[1],He[2]),ie.updateMatrix();const Y=ie.geometry.clone();Y.applyMatrix4(ie.matrix),ie.geometry=Y,ie.renderOrder=1/0,ie.position.set(0,0,0),ie.rotation.set(0,0,0),ie.scale.set(1,1,1),X.add(ie)}return X}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=G(R)),this.add(this.gizmo.rotate=G(D)),this.add(this.gizmo.scale=G(P)),this.add(this.picker.translate=G(A)),this.add(this.picker.rotate=G(M)),this.add(this.picker.scale=G(B)),this.add(this.helper.translate=G(C)),this.add(this.helper.rotate=G(E)),this.add(this.helper.scale=G(F)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const i=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:oa;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let r=[];r=r.concat(this.picker[this.mode].children),r=r.concat(this.gizmo[this.mode].children),r=r.concat(this.helper[this.mode].children);for(let s=0;s<r.length;s++){const o=r[s];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(vt.setFromEuler(Ko.set(0,0,0)),o.quaternion.copy(i).multiply(vt),Math.abs(ht.copy(Ys).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(vt.setFromEuler(Ko.set(0,0,Math.PI/2)),o.quaternion.copy(i).multiply(vt),Math.abs(ht.copy(xr).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(vt.setFromEuler(Ko.set(0,Math.PI/2,0)),o.quaternion.copy(i).multiply(vt),Math.abs(ht.copy(qs).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(vt.setFromEuler(Ko.set(0,Math.PI/2,0)),ht.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(mh.lookAt(ph,ht,xr)),o.quaternion.multiply(vt),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),Qt.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Qt.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(Qt),o.visible=this.dragging):(o.quaternion.copy(i),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(i),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(ht.copy(Ys).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(ht.copy(xr).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(ht.copy(qs).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(ht.copy(qs).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(ht.copy(Ys).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(ht.copy(xr).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(Jo.copy(i),ht.copy(this.eye).applyQuaternion(vt.copy(i).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(mh.lookAt(this.eye,ph,xr)),o.name==="X"&&(vt.setFromAxisAngle(Ys,Math.atan2(-ht.y,ht.z)),vt.multiplyQuaternions(Jo,vt),o.quaternion.copy(vt)),o.name==="Y"&&(vt.setFromAxisAngle(xr,Math.atan2(ht.x,ht.z)),vt.multiplyQuaternions(Jo,vt),o.quaternion.copy(vt)),o.name==="Z"&&(vt.setFromAxisAngle(qs,Math.atan2(ht.y,ht.x)),vt.multiplyQuaternions(Jo,vt),o.quaternion.copy(vt))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis?(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1):this.axis.split("").some(function(l){return o.name===l})&&(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1))}super.updateMatrixWorld(e)}}class Yy extends oe{constructor(){super(new fo(1e5,1e5,2,2),new di({visible:!1,wireframe:!0,side:en,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),Qo.copy(Ys).applyQuaternion(t==="local"?this.worldQuaternion:oa),Gs.copy(xr).applyQuaternion(t==="local"?this.worldQuaternion:oa),Ws.copy(qs).applyQuaternion(t==="local"?this.worldQuaternion:oa),ht.copy(Gs),this.mode){case"translate":case"scale":switch(this.axis){case"X":ht.copy(this.eye).cross(Qo),Jn.copy(Qo).cross(ht);break;case"Y":ht.copy(this.eye).cross(Gs),Jn.copy(Gs).cross(ht);break;case"Z":ht.copy(this.eye).cross(Ws),Jn.copy(Ws).cross(ht);break;case"XY":Jn.copy(Ws);break;case"YZ":Jn.copy(Qo);break;case"XZ":ht.copy(Ws),Jn.copy(Gs);break;case"XYZ":case"E":Jn.set(0,0,0);break}break;default:Jn.set(0,0,0)}Jn.length()===0?this.quaternion.copy(this.cameraQuaternion):(gh.lookAt(Qt.set(0,0,0),Jn,ht),this.quaternion.setFromRotationMatrix(gh)),super.updateMatrixWorld(e)}}const qy=new Map([["3,1,5,2,2,3,3,4",{stride:36,uv:16,normal:24}],["3,1,5,2,3,4,0,0",{stride:28,normal:16}],["3,1,5,2,0,0,0,0",{stride:16}]]);function $y(n){const e=n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength);if(e.length>64*1024*1024)throw new Error("Mesh exceeds 64 MiB limit");const t=new DataView(e.buffer,e.byteOffset,e.byteLength);let i=0;const r=d=>{if(!Number.isSafeInteger(d)||d<0||i+d>e.length)throw new Error(`Truncated mesh at ${i}, need ${d} bytes`)},s=()=>{r(4);const d=t.getUint32(i,!0);return i+=4,d},o=d=>{r(d);const h=new TextDecoder().decode(e.subarray(i,i+d));return i+=d,h.replace(/ $/,"")},a=d=>{if(!Number.isFinite(d)||Math.abs(d)>1e9)throw new Error(`Invalid float at ${i}`);return d};if(o(4)!=="mesh")throw new Error("Not an Anymaker mesh");const l=s();if(l!==5)throw new Error(`Unsupported mesh version ${l}`);const c=s();if(!c||c>256)throw new Error("Invalid submesh count");const u=[];for(let d=0;d<c;d++){const h=s();if(h>4096)throw new Error("Invalid mesh name length");const p=o(h),g=i;r(140);const _=Array.from({length:8},()=>s()),m=qy.get(_.join(","));if(!m)throw new Error(`Unsupported vertex layout: ${_}`);const f=Array.from(e.subarray(g+32,g+88));i=g+88;const S=Array.from({length:6},()=>{const P=a(t.getFloat64(i,!0));return i+=8,P}),y=s();if(!y||y%m.stride)throw new Error("Invalid vertex buffer size");r(y);const v=y/m.stride;if(v>1e6)throw new Error("Too many vertices");const R=new Float32Array(v*3),A=new Uint8Array(v*4),C=m.normal?new Float32Array(v*3):null,D=m.uv?new Float32Array(v*2):null;for(let P=0;P<v;P++){const B=i+P*m.stride;for(let F=0;F<3;F++)R[P*3+F]=a(t.getFloat32(B+F*4,!0)),C&&(C[P*3+F]=a(t.getFloat32(B+m.normal+F*4,!0)));if(A.set(e.subarray(B+12,B+16),P*4),D)for(let F=0;F<2;F++)D[P*2+F]=a(t.getFloat32(B+m.uv+F*4,!0))}i+=y;const E=s();if(!E||E%12)throw new Error("Index buffer is not a triangle list");r(E);const M=new Uint32Array(E/4);for(let P=0;P<M.length;P++)if(M[P]=s(),M[P]>=v)throw new Error("Index outside vertex buffer");u.push({name:p,signature:_,metadata:f,bounds:S,positions:R,normals:C,colors:A,uv:D,indices:M})}if(e.length-i!==8||s()!==0||s()!==0)throw new Error("Unsupported mesh trailer (possibly skeleton/animation)");return{version:l,parts:u}}class pf{files=new Map;cache=new Map;register(e){for(const t of e){const i=t.webkitRelativePath||t.name,r=i.indexOf("meshes/");i.endsWith(".mesh")&&this.files.set(r>=0?i.slice(r):t.name,t)}return this.cache.clear(),this.files.size}async parse(e){const t=this.files.get(e),i=e.split("/").pop(),r=[...this.files.entries()].filter(([a])=>a===i),s=t||(r.length===1?r[0][1]:null);if(!s)return null;if(this.cache.has(s))return this.cache.get(s);if(s.size>64*1024*1024)throw new Error("模型超过 64 MiB 限制");const o=$y(await s.arrayBuffer());return this.cache.size>=32&&this.cache.delete(this.cache.keys().next().value),this.cache.set(s,o),o}async instantiate(e,t={}){const i=e.mesh_static?.mesh_path||e.mesh,r=i?await this.parse(i):null,s=new jn;if(!r){const o=new oe(new wt(.2,.2,.2),new di({color:"#f3ba66",wireframe:!0}));return s.add(o),s.userData.visual="missing",s.userData.reason=i?"缺少本地 Mesh："+i:"定义没有静态 Mesh",s}for(const o of r.parts){const a=new Ut;a.setAttribute("position",new Pt(o.positions,3)),a.setIndex(new Pt(o.indices,1)),o.normals?a.setAttribute("normal",new Pt(o.normals,3)):a.computeVertexNormals(),o.uv&&a.setAttribute("uv",new Pt(o.uv,2)),a.setAttribute("gameColorBytes",new Pt(o.colors,4,!0));const l=new Rr({color:"#b4c3ce",roughness:.7,metalness:.1,side:en}),c=new oe(a,l);c.name=o.name,c.castShadow=c.receiveShadow=!0,s.add(c)}return s.userData.visual="mesh",s.userData.reason="真实静态几何 · 中性诊断材质（非游戏着色）",s.userData.vertices=r.parts.reduce((o,a)=>o+a.positions.length/3,0),s.userData.triangles=r.parts.reduce((o,a)=>o+a.indices.length/3,0),s}}function ma(n){n.traverse(e=>{e.geometry?.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material?.dispose()})}const pt=.08,mf=8,Zy=1e-7,$t=["x","y","z"],gf=n=>typeof n=="number"&&Number.isFinite(n)&&Math.abs(n)<=1e4,Ky=n=>Number(n.toFixed(12));function ui(n){if(!gf(n))return null;const e=Math.round(n/pt);return Math.abs(n-e*pt)<=Zy?e:null}function Ls(n){if(!Number.isSafeInteger(n)||Math.abs(n*pt)>1e4)throw new Error("格坐标超出合法范围");return Ky(n*pt)}function La(n,e="坐标"){const t=ui(n);if(t===null)throw new Error(`${e}必须对齐 8 cm 整数格`);return Ls(t)}function Dt(n,e="坐标"){if(!n||typeof n!="object")throw new Error(`${e}必须是三维坐标`);return Object.fromEntries($t.map(t=>[t,La(n[t],`${e}.${t}`)]))}function Jy(n){return gf(n)?Ls(Math.round(n/pt)):null}function Li(n){if(!n||typeof n!="object")return null;const e=Object.fromEntries($t.map(t=>[t,Jy(n[t])]));return $t.every(t=>e[t]!==null)?e:null}function Rl(n,e){const t=Dt(n,"梁起点"),i=Dt(e,"梁终点");return Object.fromEntries($t.map(r=>[r,ui(i[r])-ui(t[r])]))}function _f(n){const e=(t,i)=>i?e(i,t%i):t;return n.map(t=>Math.abs(t)).reduce(e,0)}function Pl(n){if(!Number.isSafeInteger(n))throw new Error("格数必须是整数");return String(n)}const Xs=(n,e)=>n==null?null:new e(n),Qy=pt;function eM(n,e){if(!/\/car_wheel(?:_b_1|_trims_a)?\.mesh$/.test(e||""))return n;const t=Array.isArray(n?.position)?[...n.position]:[0,0,0];return t[2]+=Qy,{...n,position:t}}function tM(n,e){e?.position&&n.position.set(...e.position);const t=e?.previewRotation;Array.isArray(t)&&t.length===9&&t.every(Number.isFinite)&&n.quaternion.setFromRotationMatrix(new ot().set(t[0],t[1],t[2],0,t[3],t[4],t[5],0,t[6],t[7],t[8],0,0,0,0,1))}const nM=n=>Array.isArray(n)&&n.length===3&&n.every(Number.isInteger)?n:null,Dl={x:0,y:1,z:2};function _h(n,e,t){const i=/^(.*)_0_0_0\.mesh$/.exec(n||"");if(!i)return null;const r=[0,0,0];return r[Dl[e]]=t,`${i[1]}_${r.join("_")}.mesh`}function iM(n,e,t,i){const r=e.staticMesh||n.mesh_static?.mesh_path||n.mesh||null;if(!r)return[];const s=[{path:r,transform:null}],o=nM(t);if(!o)return s;for(const a of Object.keys(Dl)){if(n[`mode_${a}`]!=="tile")continue;const l=Dl[a],c=Number(n.interval?.[l]),u=o[l];if(!Number.isInteger(c)||c<=0||u<=0||u%c)continue;const d=_h(r,a,1),h=_h(r,a,2);if(!d||!h||!i.entries[d]||!i.entries[h])continue;const p=u/c;for(let _=1;_<p;_++){const m=[0,0,0];m[l]=_*c*pt,s.push({path:d,transform:{position:m}})}const g=[0,0,0];g[l]=u*pt,s.push({path:h,transform:{position:g}});break}return s}function rM(n){if(!n||!["anymaker-published-mesh","anymaker-published-mesh-opaque"].includes(n.format)||n.version!==1||!Array.isArray(n.parts))throw new Error("Invalid published Mesh payload");return{version:5,opaque:n.format==="anymaker-published-mesh-opaque",parts:n.parts.map(e=>({name:e.name,signature:e.signature,metadata:e.metadata,bounds:e.bounds,positions:Xs(e.positions,Float32Array),normals:Xs(e.normals,Float32Array),colors:Xs(e.colors,Uint8Array),uv:Xs(e.uv,Float32Array),indices:Xs(e.indices,Uint32Array)}))}}class sM{constructor(e,t=new pf){this.baseUrl=e.endsWith("/")?e:e+"/",this.fallback=t,this.manifestPromise=null,this.meshCache=new Map}async manifest(){return this.manifestPromise||(this.manifestPromise=fetch(this.baseUrl+"assets/manifests/mesh-manifest.json").then(e=>{if(!e.ok)throw new Error(`Published Mesh manifest HTTP ${e.status}`);return e.json()}).then(e=>{if(e.format!=="anymaker-mesh-manifest"||e.version!==1||!e.entries)throw new Error("Invalid published Mesh manifest");return e})),this.manifestPromise}async parse(e){const i=(await this.manifest()).entries[e];if(!i)throw new Error(`Published Mesh is not indexed: ${e}`);if(this.meshCache.has(e))return this.meshCache.get(e);const r=fetch(this.baseUrl+i.url).then(async s=>{if(!s.ok)throw new Error(`Published Mesh HTTP ${s.status}: ${e}`);let o=s.body;const a=/gzip/i.test(s.headers.get("content-encoding")||"");if(typeof DecompressionStream=="function"&&i.compression==="gzip"&&!a)o=o.pipeThrough(new DecompressionStream("gzip"));else if(i.compression==="gzip"&&!a)throw new Error("该浏览器不支持 gzip Mesh 解压");const l=JSON.parse(await new Response(o).text());if(l.source!==e||l.sourceSha256!==i.sourceSha256)throw new Error(`Published Mesh hash/source mismatch: ${e}`);return rM(l)});this.meshCache.set(e,r);try{return await r}catch(s){throw this.meshCache.delete(e),s}}register(e){return this.fallback.register(e)}async instantiate(e,{nativeExtension:t}={}){try{const i=e.meshBinding||{staticMesh:e.mesh_static?.mesh_path||e.mesh||null,dynamicMeshes:[]},r=await this.manifest(),o=[...iM(e,i,t,r),...(i.dynamicMeshes||[]).filter(u=>u.path).map(u=>({path:u.path,transform:eM(u,u.path)}))];if(!o.length)return this.fallback.instantiate(e,{nativeExtension:t});const a=await Promise.all(o.map(u=>this.parse(u.path))),l=new jn;if(a.every(u=>u.opaque||!u.parts.length)){const u=new oe(new wt(.2,.2,.2),new di({color:"#d49b4a",wireframe:!0}));return l.add(u),l.userData.visual="opaque",l.userData.reason="已入库但使用未解码的原生 Mesh 变体",l}const c=(u,d=null,h="")=>{for(const p of u.parts){const g=new Ut;g.setAttribute("position",new Pt(p.positions,3)),g.setIndex(new Pt(p.indices,1)),p.normals?g.setAttribute("normal",new Pt(p.normals,3)):g.computeVertexNormals(),p.uv&&g.setAttribute("uv",new Pt(p.uv,2)),g.setAttribute("gameColorBytes",new Pt(p.colors,4,!0));const _=h.includes("/car_wheel"),m=h.endsWith("car_wheel.mesh")?"#1b2027":h.endsWith("car_wheel_b_1.mesh")?"#667380":h.endsWith("car_wheel_trims_a.mesh")?"#aebbc5":"#b4c3ce",f=new oe(g,new Rr({color:m,roughness:_?.52:.7,metalness:_?.35:.1,side:en}));f.name=p.name,f.userData.source=h,f.castShadow=f.receiveShadow=!0,tM(f,d),l.add(f)}};return a.forEach((u,d)=>c(u,o[d].transform,o[d].path)),l.userData.visual="mesh",l.userData.reason="独立发布 Mesh（完整解析，gzip 懒加载）",l.userData.vertices=a.flatMap(u=>u.parts).reduce((u,d)=>u+d.positions.length/3,0),l.userData.triangles=a.flatMap(u=>u.parts).reduce((u,d)=>u+d.indices.length/3,0),l}catch(i){if(this.fallback.files.size)return this.fallback.instantiate(e,{nativeExtension:t});throw i}}dispose(){for(const e of this.meshCache.values())e.then(t=>t.parts).catch(()=>{});this.meshCache.clear()}}const oM=n=>({x:0,y:1,z:2})[n];function aM(n,e){const t=oM(e);if(t===void 0)throw new Error("Invalid reflection axis");const i=n.clone(),r=i.getAttribute("position");for(let a=t;a<r.array.length;a+=3)r.array[a]=r.array[a]===0?0:-r.array[a];r.needsUpdate=!0;const s=i.getAttribute("normal");if(s){for(let a=t;a<s.array.length;a+=3)s.array[a]=s.array[a]===0?0:-s.array[a];s.needsUpdate=!0}const o=i.getIndex();if(o){for(let a=0;a+2<o.count;a+=3){const l=o.getX(a+1);o.setX(a+1,o.getX(a+2)),o.setX(a+2,l)}o.needsUpdate=!0}return i.computeBoundingBox(),i.computeBoundingSphere(),i}function cM(n,e){return n.traverse(t=>{if(!t.isMesh||!t.geometry)return;const i=t.geometry;t.geometry=aM(i,e),i.dispose()}),n}const vf="anymaker-builder-domain",xf=1,Ii=["x","y","z"],yf=.08,xt=n=>structuredClone(n),tn=(n,e=0)=>Object.fromEntries(Ii.map(t=>[t,Number(n?.[t]??e)])),lM=n=>Array.isArray(n)?{x:Number(n[0]??0),y:Number(n[1]??0),z:Number(n[2]??0)}:tn(n),Mf=()=>({position:tn(),rotation:tn(),scale:tn({x:1,y:1,z:1},1)}),zn=(n,e)=>typeof n=="string"&&n?n:e,Sf=()=>[1,0,0,0,1,0,0,0,1],vh=(n,e)=>Ii.reduce((t,i)=>t+n[i]*e[i],0),dM=(n,e)=>({x:n.y*e.z-n.z*e.y,y:n.z*e.x-n.x*e.z,z:n.x*e.y-n.y*e.x}),bf=n=>Math.hypot(...Ii.map(e=>n[e])),dd=(n,e)=>Object.fromEntries(Ii.map(t=>[t,n[t]*e])),Ef=(n,e)=>Object.fromEntries(Ii.map(t=>[t,n[t]-e[t]])),xh=n=>dd(n,1/bf(n)),wf=(n,e)=>({x:n[0]*e.x+n[1]*e.y+n[2]*e.z,y:n[3]*e.x+n[4]*e.y+n[5]*e.z,z:n[6]*e.x+n[7]*e.y+n[8]*e.z}),uM=(n,e)=>Array.from({length:9},(t,i)=>{const r=Math.floor(i/3),s=i%3;return n[r*3]*e[s]+n[r*3+1]*e[s+3]+n[r*3+2]*e[s+6]}),Tf=n=>[n[0],n[3],n[6],n[1],n[4],n[7],n[2],n[5],n[8]],ud=(n,e)=>Object.fromEntries(Ii.map(t=>[t,n[t]+e[t]]));function hM(n){const t=Math.asin((i=>Math.max(-1,Math.min(1,i)))(n[2]));return Math.abs(n[2])<.9999999?{x:Math.atan2(-n[5],n[8]),y:t,z:Math.atan2(-n[1],n[0])}:{x:Math.atan2(n[7],n[4]),y:t,z:0}}function fM(n){const e=n.extras?.native?.rotationMatrix;return!Array.isArray(e)||e.length!==9||e.some(t=>!Number.isFinite(t))?Sf():Tf(e)}class hd{constructor(e={}){this.id=zn(e.id,"component"),this.type=zn(e.type,"unknown"),this.gridId=zn(e.gridId,"grid-1"),this.transform={position:tn(e.position??e.transform?.position),rotation:tn(e.rotation??e.transform?.rotation),scale:tn(e.scale??e.transform?.scale,1)},this.mirror=e.mirror?{axis:e.mirror.axis,offset:e.mirror.offset}:void 0,this.colors=Array.isArray(e.colors)?[...e.colors]:void 0,this.hidden=e.hidden===!0?!0:void 0,this.extras=xt(e.extras||{})}}class Af{constructor(e={}){Object.assign(this,xt(e),{id:zn(e.id,"node"),position:tn(e.position)})}}class Cf{constructor(e={}){Object.assign(this,xt(e),{id:zn(e.id,"edge"),a:zn(e.a,""),b:zn(e.b,"")})}}class Rf{constructor(e={}){Object.assign(this,xt(e),{id:zn(e.id,"plate"),nodeIds:Array.isArray(e.nodeIds)?[...e.nodeIds]:[]})}}class Pf{constructor(e={}){Object.assign(this,xt(e),{id:zn(e.id,"link"),kind:zn(e.kind,"unknown"),from:xt(e.from||{}),to:xt(e.to||{})})}}class Df{constructor(e={}){this.id=zn(e.id,"grid-1"),this.origin=tn(e.origin),this.dir=tn(e.dir,0),this.transform={...Mf(),...e.transform||{}},this.components=(e.components||[]).map(t=>new hd({...t,gridId:this.id})),this.nodes=(e.nodes||[]).map(t=>new Af(t)),this.edges=(e.edges||[]).map(t=>new Cf(t)),this.plates=(e.plates||[]).map(t=>new Rf(t)),this.links=(e.links||[]).map(t=>new Pf(t)),this.extras=xt(e.extras||{})}}class Lf{constructor(e={}){this.id=zn(e.id,"vehicle-1"),this.transform={...Mf(),...e.transform||{}},this.grids=(e.grids||[]).map(t=>new Df(t)),this.extras=xt(e.extras||{})}}class If{constructor(e={}){this.format=vf,this.version=xf,this.units={position:"game-world",rotation:"radians-xyz",scale:"ratio",...e.units||{}},this.vehicles=(e.vehicles||[]).map(t=>new Lf(t)),this.extras=xt(e.extras||{})}}function ss(n,e){const t=new Set;for(const i of n){if(!i.id||t.has(i.id))throw new Error(`Duplicate ${e} ID: ${i.id}`);t.add(i.id)}return t}function Br(n){if(!n||n.format!==vf||n.version!==xf||!Array.isArray(n.vehicles))throw new Error("Unsupported domain model version");ss(n.vehicles,"vehicle");for(const e of n.vehicles){ss(e.grids,"grid");const t=new Set;for(const i of e.grids){for(const o of i.components){if(!o.id||t.has(o.id))throw new Error(`Duplicate component ID: ${o.id}`);t.add(o.id)}const r=ss(i.nodes,"node"),s=ss(i.edges,"edge");ss(i.plates,"plate"),ss(i.links,"link");for(const o of i.edges)if(!r.has(o.a)||!r.has(o.b))throw new Error(`Edge ${o.id} references an unknown node`);for(const o of i.plates)if(o.nodeIds.some(a=>!r.has(a)))throw new Error(`Plate ${o.id} references an unknown node`);for(const o of i.links)if(!o.from||!o.to)throw new Error(`Link ${o.id} has no endpoints`);if(!s)throw new Error("Invalid edge collection")}}return n}function pM(n){const t=(Array.isArray(n?.objects)?n.objects:[]).map(o=>new hd(o)),i=new Map;for(const o of t)i.has(o.gridId)||i.set(o.gridId,[]),i.get(o.gridId).push(o);const r=[...i.entries()].map(([o,a])=>({id:o,components:a}));if(r.length||r.push({id:"grid-1",components:[]}),n.topology){const o=r.find(a=>a.id==="grid-1")||r[0];o.nodes=xt(n.topology.nodes||[]),o.edges=xt(n.topology.edges||[]),o.plates=xt(n.topology.plates||[]),o.links=xt(n.topology.links||[])}const s=new If({vehicles:[{id:"vehicle-1",grids:r}]});return Br(s)}function Nf(n,e){if(!e)return n.vehicles;const t=new Map(n.vehicles.map(s=>[s.id,s])),i=new Set(e.filter(s=>t.has(s))),r=[...i];for(;r.length;){const s=r.shift(),o=t.get(s);for(const a of o.grids.flatMap(l=>l.components)){const l=a.extras?.native?.state?.connected_vehicle;t.has(String(l))&&!i.has(String(l))&&(i.add(String(l)),r.push(String(l)))}}return n.vehicles.filter(s=>i.has(s.id))}function Uf(n){const e=tn(n?.origin),t=tn(n?.dir);if([...Ii.map(a=>e[a]),...Ii.map(a=>t[a])].some(a=>!Number.isFinite(a)))throw new Error("Native grid origin/dir must contain finite numbers");if(bf(t)<1e-9)return{origin:e,rotation:Sf()};const i=xh(t);let r={x:1,y:0,z:0};Math.abs(vh(r,i))>.999999&&(r={x:0,y:0,z:1});const s=xh(Ef(r,dd(i,vh(r,i)))),o=dM(s,i);return{origin:e,rotation:[s.x,i.x,o.x,s.y,i.y,o.y,s.z,i.z,o.z]}}function Ll(n,e){return ud(e.origin,wf(e.rotation,n))}function Of(n){const e=new Map;for(const t of n)for(const i of t.grids)e.set(`${t.id}:${i.id}`,Uf(i));return e}function Ff(n,e,t){const i=new Map(n.map(c=>[c.id,c])),r=new Set;for(const c of n)for(const u of c.grids.flatMap(d=>d.components)){const d=String(u.extras?.native?.state?.connected_vehicle??"");i.has(d)&&r.add(d)}const s=e.length?e.filter(c=>i.has(c)):n.map(c=>c.id).filter(c=>!r.has(c)),o=new Map(s.map(c=>[c,tn()])),a=(c,u)=>{for(const d of c.grids){const h=d.components.find(p=>p.id===String(u));if(h)return{component:h,grid:d}}return null},l=[...o.keys()];for(;l.length;){const c=i.get(l.shift()),u=o.get(c.id);for(const d of c.grids)for(const h of d.components){const p=String(h.extras?.native?.state?.connected_vehicle??""),g=i.get(p),_=g&&a(g,h.extras?.native?.state?.connected_component);if(!_||o.has(p))continue;const m=Ll(h.transform.position,t.get(`${c.id}:${d.id}`)),f=Ll(_.component.transform.position,t.get(`${g.id}:${_.grid.id}`));o.set(p,ud(u,Ef(m,f))),l.push(p)}}return o}function Il(n,e,t){const i=ud(Ll(n,t),e);return Object.fromEntries(Ii.map(r=>[r,i[r]*yf]))}function yh(n,e){const t=Uf(n),i=dd(tn(e),1/yf);return wf(Tf(t.rotation),i)}function Mh(n){const e=n.extras?.native?.state?.ext;return Array.isArray(e)&&e.length===3&&e.every(t=>Number.isInteger(t))?[...e]:void 0}function mM(n,{vehicleIds:e=null}={}){Br(n);const t=Nf(n,e),i={...n,vehicles:t};if(!i.vehicles.length)throw new Error("No selected vehicle exists in the domain model");const r=[],s=!!i.extras?.native,o=s?Of(t):new Map,a=s?Ff(t,e||[],o):new Map;for(const d of i.vehicles)for(const h of d.grids)for(const p of h.components){const g=a.get(d.id)||tn(),_=o.get(`${d.id}:${h.id}`),m=s?Il(p.transform.position,g,_):xt(p.transform.position),f=p.colors||p.extras?.native?.colors;r.push({id:s?`${d.id}:${h.id}:${p.id}`:p.id,type:p.type,gridId:h.id,...p.mirror?{mirror:xt(p.mirror)}:{},...Array.isArray(f)&&f.length<=10&&f.every(S=>Number.isInteger(S)&&S>=0&&S<=255)?{colors:[...f]}:{},...p.hidden?{hidden:!0}:{},...Mh(p)?{nativeExtension:Mh(p)}:{},...s?{nativeProjected:!0}:{},position:m,rotation:s?hM(uM(_.rotation,fM(p))):xt(p.transform.rotation),scale:xt(p.transform.scale)})}const l={nodes:[],edges:[],plates:[]},c=[];for(const d of i.vehicles)for(const h of d.grids)l.nodes.push(...h.nodes.map(xt)),l.edges.push(...h.edges.map(xt)),l.plates.push(...h.plates.map(xt)),c.push(...h.links.map(xt));const u={format:"anymaker-web-project",version:1,objects:r};if(s){const d=zf(n,{vehicleIds:e});return(d.nodes.length||d.edges.length||d.plates.length||d.links.length)&&(u.topology=d),u}return c.length&&(l.links=c),(l.nodes.length||l.edges.length||l.plates.length||c.length)&&(u.topology=l),u}function zf(n,{vehicleIds:e=null}={}){Br(n);const t=Nf(n,e),i={...n,vehicles:t};if(!i.vehicles.length)throw new Error("No selected vehicle exists in the domain model");const r=[],s=[],o=[],a=[],l=!!i.extras?.native,c=l?Of(t):new Map,u=l?Ff(t,e||[],c):new Map;for(const d of i.vehicles){const h=new Map(d.grids.flatMap(g=>g.components.map(_=>[String(_.id),l?`${d.id}:${g.id}:${_.id}`:_.id]))),p=u.get(d.id)||tn();for(const g of d.grids){const _=c.get(`${d.id}:${g.id}`);r.push(...g.nodes.map(f=>({id:`${g.id}:${f.id}`,position:l?Il(f.position,p,_):xt(f.position),gridId:g.id,...l?{nativeProjected:!0}:{}})));const m=f=>`${g.id}:${f}`;s.push(...g.edges.map(f=>({id:m(f.id),a:m(f.a),b:m(f.b),gridId:g.id,...Number.isInteger(f.extras?.native?.col)&&f.extras.native.col>=0&&f.extras.native.col<=255?{col:f.extras.native.col}:{}}))),o.push(...g.plates.map(f=>({id:m(f.id),nodeIds:f.nodeIds.map(m),gridId:g.id,...Number.isInteger(f.extras?.native?.col_front)&&f.extras.native.col_front>=0&&f.extras.native.col_front<=255?{col_front:f.extras.native.col_front}:{},...Number.isInteger(f.extras?.native?.col_back)&&f.extras.native.col_back>=0&&f.extras.native.col_back<=255?{col_back:f.extras.native.col_back}:{},...f.extras?.native?.type==="window"?{type:"window"}:{}}))),a.push(...g.links.map(f=>{const S=(y,v)=>{const R=h.get(String(y?.comp));if(!R)throw new Error(`Native ${f.kind} link ${f.id} ${v} references an unknown component`);return{componentId:R,...Number.isInteger(y?.pos)?{port:y.pos}:{}}};return{id:m(f.id),kind:f.kind,from:S(f.from,"source"),to:S(f.to,"target"),points:(f.points||[]).map(y=>l?Il(lM(y),p,_):xt(y)),...l?{nativeProjected:!0}:{},...Number.isInteger(f.extras?.native?.color)&&f.extras.native.color>=0&&f.extras.native.color<=255?{color:f.extras.native.color}:{}}}))}}return{nodes:r,edges:s,plates:o,links:a}}const gM=["electric","mechanical","liquid","gas","belt","data"],Bf=Object.freeze({electric:"#f1c232",mechanical:"#f2994a",liquid:"#2f80ed",gas:"#27ae60",belt:"#98a2b3",data:"#9b51e0"}),kf=n=>structuredClone(n),Ks=n=>n===void 0?0:n,_M=n=>n&&["x","y","z"].every(e=>typeof n[e]=="number"&&Number.isFinite(n[e])&&Math.abs(n[e])<=1e4),vM=(n,e)=>{if(!e)return Dt(n,"Connection route point");if(!_M(n))throw new Error("Native connection route point is invalid");return kf(n)};function Sh(n,e,t){if(!n||typeof n.componentId!="string"||!n.componentId)throw new Error(`${e} endpoint must reference a component`);if(t&&!t.has(n.componentId))throw new Error(`${e} endpoint references an unknown component: ${n.componentId}`);if(!Number.isInteger(Ks(n.port))||Ks(n.port)<0||Ks(n.port)>255)throw new Error(`${e} port must be an integer from 0 to 255`);return{componentId:n.componentId,...n.port===void 0?{}:{port:n.port}}}function ga(n=[],e=null){if(!Array.isArray(n))throw new Error("Connections must be an array");const t=new Set;return n.map((i,r)=>{if(!i||typeof i.id!="string"||!i.id||t.has(i.id))throw new Error(`Connection ID is invalid or duplicated: ${r}`);if(!gM.includes(i.kind))throw new Error(`Unsupported connection kind: ${String(i.kind)}`);const s=Sh(i.from,"Connection source",e),o=Sh(i.to,"Connection target",e);if(s.componentId===o.componentId&&Ks(s.port)===Ks(o.port))throw new Error("A connection cannot use the same component port twice");if(!Array.isArray(i.points)||i.points.length>256)throw new Error("Connection route must contain at most 256 points");if(i.color!==void 0&&(!Number.isInteger(i.color)||i.color<0||i.color>255))throw new Error("Connection color must be an integer from 0 to 255");if(i.nativeProjected!==void 0&&i.nativeProjected!==!0)throw new Error("Native connection projection is invalid");t.add(i.id);const a={id:i.id,kind:i.kind,from:s,to:o,points:i.points.map(l=>vM(l,i.nativeProjected===!0)),...i.nativeProjected?{nativeProjected:!0}:{}};return Number.isInteger(i.color)&&i.color>=0&&i.color<=255&&(a.color=i.color),a})}function xM(n,e,t=null){const i=ga(n,t),r=`${e.kind}-link`;let s=1;for(;i.some(a=>a.id===`${r}-${s}`);)s++;const[o]=ga([{...kf(e),id:`${r}-${s}`}],t);return{links:[...i,o],link:o}}function yM(n,e,t=null){const i=ga(n,t);if(!i.some(r=>r.id===e))throw new Error(`Connection does not exist: ${e}`);return{links:i.filter(r=>r.id!==e)}}const Nl=1e-6,Cn=n=>structuredClone(n),fd=n=>({x:Number(n.position?.x??0),y:Number(n.position?.y??0),z:Number(n.position?.z??0)}),aa=(n,e)=>({x:n.x-e.x,y:n.y-e.y,z:n.z-e.z}),MM=(n,e)=>({x:n.y*e.z-n.z*e.y,y:n.z*e.x-n.x*e.z,z:n.x*e.y-n.y*e.x}),SM=(n,e)=>n.x*e.x+n.y*e.y+n.z*e.z,Hf=n=>Math.hypot(n.x,n.y,n.z),pd=(n,e)=>Hf(aa(n,e))<=Nl,Ul=(n,e)=>[n,e].sort().join("::"),Nc=n=>n===void 0||Number.isInteger(n)&&n>=0&&n<=255,Uc=n=>n===void 0||typeof n=="string"&&/^#[\da-f]{6}$/i.test(n);function bM(n,e){return n.length!==e.length?!1:n.some((t,i)=>{if(t!==e[0])return!1;const r=n.every((o,a)=>o===e[(i+a)%e.length]),s=n.every((o,a)=>o===e[(i-a+e.length)%e.length]);return r||s})}function Bn(n={},e=null){const t=Array.isArray(n.nodes)?n.nodes:[],i=Array.isArray(n.edges)?n.edges:[],r=Array.isArray(n.plates)?n.plates:[],s=ga(n.links||[],e),o=new Set,a=new Map,l=[];for(const d of t){if(!d||typeof d.id!="string"||!d.id||o.has(d.id))throw new Error("节点 ID 无效或重复");if(d.nativeProjected!==void 0&&d.nativeProjected!==!0)throw new Error("节点原生投影标记无效");const h=d.nativeProjected===!0,p=h?d.position:Dt(d.position,"节点坐标");if(!p||$t.some(g=>typeof p[g]!="number"))throw new Error("节点坐标无效");if($t.some(g=>!Number.isFinite(p[g])||Math.abs(p[g])>1e4))throw new Error("节点坐标无效");o.add(d.id),a.set(d.id,p),l.push({...Cn(d),...h?{nativeProjected:!0}:{},position:p})}const c=new Set;for(const d of i){if(!d||typeof d.id!="string"||!d.id||c.has(d.id))throw new Error("梁 ID 无效或重复");if(!o.has(d.a)||!o.has(d.b)||d.a===d.b)throw new Error("梁引用未知或相同节点");if(pd(a.get(d.a),a.get(d.b)))throw new Error("梁长度必须大于零");if(!Nc(d.col))throw new Error("梁颜色编号无效");if(!Uc(d.color))throw new Error("梁 RGB 颜色无效");if(d.hidden!==void 0&&typeof d.hidden!="boolean")throw new Error("梁可见性无效");c.add(d.id)}const u=new Set;for(const d of r){if(!d||typeof d.id!="string"||!d.id||u.has(d.id))throw new Error("面板 ID 无效或重复");if(Wf(d.nodeIds,t,d.normalOffset),!Nc(d.col_front)||!Nc(d.col_back))throw new Error("面板颜色编号无效");if(!Uc(d.color_front)||!Uc(d.color_back))throw new Error("面板 RGB 颜色无效");if(d.type!==void 0&&d.type!=="window")throw new Error("面板类型无效");if(d.hidden!==void 0&&typeof d.hidden!="boolean")throw new Error("面板可见性无效");u.add(d.id)}return{nodes:l,edges:Cn(i),plates:Cn(r),...n.links!==void 0?{links:s}:{}}}function md(n,e){const t=new Set(n.map(r=>String(r.id)));let i=1;for(;t.has(`${e}-${i}`);)i++;return`${e}-${i}`}function _a(n,e,t="node"){const i=Bn({nodes:n,edges:[],plates:[]}).nodes,r=Dt(e,"节点坐标"),s=i.find(a=>pd(fd(a),r));if(s)return{nodes:i,node:s,created:!1};const o={id:md(i,t),position:r};return i.push(o),{nodes:i,node:o,created:!0}}function EM(n,e,t){const i=Dt(t,"节点坐标");let r=!1;const s=Cn(n).map(o=>o.id!==e?o:(r=!0,{...o,position:i}));if(!r)throw new Error("节点不存在："+e);return{nodes:s}}function Vf(n,e,t){const i=Bn(n),r=Dt(t,"节点坐标");if(!i.nodes.some(a=>a.id===e))throw new Error("节点不存在："+e);const s=i.nodes.find(a=>a.id!==e&&pd(fd(a),r));if(s){const a=Gf(i.nodes,i.edges,i.plates,e,s.id,i.links);return{...Bn(a),merged:!0,idMap:a.idMap}}const o=EM(i.nodes,e,r);return{...Bn({...i,nodes:o.nodes}),merged:!1,idMap:{}}}function Gf(n,e,t,i,r,s){if(i===r)throw new Error("不能将节点合并到自身");if(!n.some(c=>c.id===i)||!n.some(c=>c.id===r))throw new Error("合并节点不存在");const o=[],a=new Set;for(const c of e){const u=c.a===i?r:c.a,d=c.b===i?r:c.b;if(u===d)continue;const h=Ul(u,d);a.has(h)||(a.add(h),o.push({...Cn(c),a:u,b:d}))}const l=Cn(t).map(c=>({...c,nodeIds:c.nodeIds.map(u=>u===i?r:u)})).map(c=>({...c,nodeIds:c.nodeIds.filter((u,d,h)=>h.indexOf(u)===d)})).filter(c=>c.nodeIds.length>=3);return{nodes:n.filter(c=>c.id!==i).map(Cn),edges:o,plates:l,...s!==void 0?{links:Cn(s)}:{},idMap:{[i]:r}}}function wM(n,e){if(!n.nodes.some(t=>t.id===e))throw new Error("节点不存在："+e);return Bn({...n,nodes:n.nodes.filter(t=>t.id!==e),edges:n.edges.filter(t=>t.a!==e&&t.b!==e),plates:n.plates.filter(t=>!t.nodeIds.includes(e))})}function TM(n,e){if(!n.edges.some(t=>t.id===e))throw new Error("梁不存在："+e);return Bn({...n,edges:n.edges.filter(t=>t.id!==e)})}function AM(n,e){if(!n.plates.some(t=>t.id===e))throw new Error("面板不存在："+e);return Bn({...n,plates:n.plates.filter(t=>t.id!==e)})}function Ol(n,e,t,i={}){if(!e||!t||e===t)throw new Error("梁必须连接两个不同节点");if(n.some(o=>Ul(o.a,o.b)===Ul(e,t)))throw new Error("梁已存在");const r=Cn(i);delete r.id,delete r.a,delete r.b;const s={id:md(n,"edge"),a:e,b:t,...r};return{edges:[...Cn(n),s],edge:s}}function CM(n,e,t){const i=Bn(n),r=_a(i.nodes,e),s=_a(r.nodes,t),o=Ol(i.edges,r.node.id,s.node.id);return Bn({...i,nodes:s.nodes,edges:o.edges})}function RM(n,e,t=[]){const i=(t.length?t:[]).find(c=>c.id===e);if(!i)throw new Error("梁不存在："+e);const r=n.find(c=>c.id===i.a),s=n.find(c=>c.id===i.b);if(!r||!s)throw new Error("梁引用未知节点");const o=Dt(r.position,"梁起点"),a=Rl(o,s.position),l=_f($t.map(c=>a[c]));return l<=1?[]:Array.from({length:l-1},(c,u)=>Object.fromEntries($t.map(d=>[d,Ls(ui(o[d])+a[d]*(u+1)/l)])))}function PM(n,e,t,i,r=[]){const s=e.find(y=>y.id===t);if(!s)throw new Error("梁不存在："+t);const o=n.find(y=>y.id===s.a),a=n.find(y=>y.id===s.b);if(!o||!a)throw new Error("梁引用未知节点");const l=Dt(o.position,"梁起点"),c=Rl(l,a.position),u=_f($t.map(y=>c[y]));if(u<=1)throw new Error("该梁没有可用整格分割点");const d=Dt(i,"分割点"),h=Rl(l,d);let p=null;for(const y of $t){const v=c[y],R=h[y];if(v===0){if(R!==0)throw new Error("分割点必须位于梁中心线内部");continue}if(R*v<=0||Math.abs(R)>=Math.abs(v)||R*u%v!==0)throw new Error("分割点必须位于梁中心线内部");const A=R*u/v;if(p!==null&&p!==A)throw new Error("分割点必须位于梁中心线内部");p=A}if(!Number.isInteger(p)||p<=0||p>=u)throw new Error("分割点必须位于梁中心线内部");const g=_a(n,d,"node"),_=e.filter(y=>y.id!==t),m=Ol(_,s.a,g.node.id,s).edges,f=Ol(m,g.node.id,s.b,s).edges,S=Cn(r).map(y=>{const v=y.nodeIds||[],R=v.findIndex((A,C)=>{const D=v[(C+1)%v.length];return A===s.a&&D===s.b||A===s.b&&D===s.a});return R<0?y:{...y,nodeIds:[...v.slice(0,R+1),g.node.id,...v.slice(R+1)]}});return{nodes:g.nodes,edges:f,plates:S,node:g.node,replaced:s}}function Wf(n,e,t=0){if(!Array.isArray(n)||n.length<3)throw new Error("面板至少需要三个节点");if(new Set(n).size!==n.length)throw new Error("面板节点不能重复");if(!Number.isFinite(t)||Math.abs(t)>1e4)throw new Error("面板法向偏移无效");const i=new Map(e.map(o=>[o.id,o])),r=n.map(o=>{const a=i.get(o);if(!a)throw new Error("面板引用未知节点："+o);return fd(a)});let s=null;for(let o=1;o<r.length-1&&!s;o++)for(let a=o+1;a<r.length;a++){const l=MM(aa(r[o],r[0]),aa(r[a],r[0]));Hf(l)>Nl&&(s=l)}if(!s)throw new Error("面板节点不能共线");for(const o of r.slice(3))if(Math.abs(SM(s,aa(o,r[0])))>Nl)throw new Error("面板节点必须共面");return{points:r,normal:s}}function DM(n,e,t,i={}){if(Wf(e,t,i.normalOffset),n.some(s=>Array.isArray(s.nodeIds)&&bM(s.nodeIds,e)))throw new Error("该闭合梁环已有面板或玻璃");const r={id:md(n,"plate"),nodeIds:[...e],...Cn(i)};return{plates:[...Cn(n),r],plate:r}}function Xf(n,e,t,i,r={}){if(!Array.isArray(e)||e.length<3)throw new Error("面板至少需要选择三根梁");if(new Set(e).size!==e.length)throw new Error("面板梁不能重复选择");const s=new Map(t.map(p=>[p.id,p])),o=e.map(p=>{const g=s.get(p);if(!g)throw new Error("面板引用了未知梁："+p);return g}),a=new Map;for(const p of o)for(const g of[p.a,p.b]){const _=a.get(g)||[];_.push(p),a.set(g,_)}if([...a.values()].some(p=>p.length!==2))throw new Error("选择的梁必须组成单一闭合环，且不能分支");const l=o[0],c=[l.a],u=new Set([l.id]);let d=l,h=l.b;for(;h!==c[0];){if(u.size>=o.length)throw new Error("选择的梁未形成闭合环");c.push(h);const p=a.get(h).find(g=>g.id!==d.id&&!u.has(g.id));if(!p)throw new Error("选择的梁未形成单一闭合环");u.add(p.id),h=p.a===h?p.b:p.a,d=p}if(u.size!==o.length)throw new Error("选择的梁必须组成单一闭合环");return DM(n,c,i,r)}function LM(n,e,t,i,r={}){return Xf(n,e,t,i,{...r,type:"window"})}const ro="anymaker-web-project",so=1,va=2e3,ca=["x","y","z"],IM=(n,e)=>Object.hasOwn(n,e);function NM(n,e,t){if(n===void 0)return;if(!Array.isArray(n)||n.length>50)throw new Error("Invalid visibility groups");const i=new Set((t?.edges||[]).map(o=>o.id)),r=new Set((t?.plates||[]).map(o=>o.id)),s=new Set;return n.map((o,a)=>{if(!o||typeof o.id!="string"||!/^[A-Za-z0-9_-]{1,100}$/.test(o.id)||s.has(o.id))throw new Error("Invalid visibility group at "+a);if(typeof o.name!="string"||!o.name.trim()||o.name.length>80)throw new Error("Invalid visibility group name at "+a);s.add(o.id);const l=(u,d)=>{if(!Array.isArray(o[u])||o[u].length>va||o[u].some(h=>typeof h!="string"||!d.has(h))||new Set(o[u]).size!==o[u].length)throw new Error("Invalid visibility group members at "+a);return[...o[u]]},c={id:o.id,name:o.name.trim(),components:l("components",e),edges:l("edges",i),plates:l("plates",r)};if(!c.components.length&&!c.edges.length&&!c.plates.length)throw new Error("Empty visibility group at "+a);return c})}function Es(n,e){if(!n||n.format!==ro||n.version!==so||!Array.isArray(n.objects))throw new Error("Unsupported editor project format");if(n.objects.length>va)throw new Error("Component limit exceeded: "+va);const t=new Set,i=n.objects.map((o,a)=>{if(!o||typeof o.id!="string"||!o.id||o.id.length>100||t.has(o.id))throw new Error("组件 ID 无效或重复："+a);if(t.add(o.id),!e.has(o.type))throw new Error("Unknown component definition: "+String(o.type));const l={id:o.id,type:o.type};if(o.gridId!==void 0&&(typeof o.gridId!="string"||!/^[A-Za-z0-9_-]{1,80}$/.test(o.gridId)))throw new Error("Invalid grid ID at "+a);if(o.gridId!==void 0&&(l.gridId=o.gridId),o.mirror!==void 0){if(!o.mirror||!["x","y","z"].includes(o.mirror.axis))throw new Error("Invalid mirror data at "+a);l.mirror={axis:o.mirror.axis,offset:La(o.mirror.offset,"镜像偏移")}}if(o.colors!==void 0){if(!Array.isArray(o.colors)||o.colors.length>10||o.colors.some(c=>!Number.isInteger(c)||c<0||c>255))throw new Error("Invalid component color slots at "+a);l.colors=[...o.colors]}if(o.hidden!==void 0){if(typeof o.hidden!="boolean")throw new Error("Invalid component visibility at "+a);o.hidden&&(l.hidden=!0)}if(o.nativeProjected!==void 0){if(o.nativeProjected!==!0)throw new Error("Invalid native projection at "+a);l.nativeProjected=!0}if(o.nativeExtension!==void 0){if(!Array.isArray(o.nativeExtension)||o.nativeExtension.length!==3||o.nativeExtension.some(c=>!Number.isInteger(c)||Math.abs(c)>1e4))throw new Error("Invalid native component extension at "+a);l.nativeExtension=[...o.nativeExtension]}for(const c of["position","rotation","scale"]){const u=o[c];if(!u||!ca.every(d=>IM(u,d)&&typeof u[d]=="number"&&Number.isFinite(u[d])&&Math.abs(u[d])<=1e4))throw new Error("Invalid transform at "+a+"."+c);if(c==="scale"&&ca.some(d=>u[d]<=0||u[d]>100))throw new Error("Scale must be in (0, 100]");l[c]=c==="position"&&!l.nativeProjected?Dt(u,"组件位置"):Object.fromEntries(ca.map(d=>[d,u[d]]))}return l}),r={format:ro,version:so,objects:i};n.topology!==void 0&&(r.topology=Bn(n.topology,new Set(i.map(o=>o.id))));const s=NM(n.visibilityGroups,new Set(i.map(o=>o.id)),r.topology);return s?.length&&(r.visibilityGroups=s),pM(r),r}function jf(n,e){if(!n||n.format!==ro)throw new Error("Unsupported editor project format");if(n.version===so)return Es(n,e);if(n.version!==0)throw new Error("Unsupported editor project schema version: "+n.version);const i=(Array.isArray(n.objects)?n.objects:Array.isArray(n.components)?n.components:[]).map((r,s)=>({id:r.id||`legacy-${s+1}`,type:r.type||r.definition,gridId:r.gridId,position:r.position||{x:0,y:0,z:0},rotation:r.rotation||{x:0,y:0,z:0},scale:r.scale||{x:1,y:1,z:1}}));return Es({format:ro,version:so,objects:i,topology:n.topology,visibilityGroups:n.visibilityGroups},e)}function Ia(n,e,t){const i={format:ro,version:so,objects:structuredClone(n)};return e!==void 0&&(i.topology=Bn(e,new Set(n.map(r=>r.id)))),t?.length&&(i.visibilityGroups=structuredClone(t)),i}function Qn(n){return String(n).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function UM(n){for(const a of n.objects||[])a.nativeProjected||Dt(a.position,"组件位置"),a.mirror&&La(a.mirror.offset,"镜像偏移");Bn(n.topology);const e=(a,l)=>"<"+a+" "+ca.map(c=>c+'="'+l[c].toFixed(6)+'"').join(" ")+"/>",t=n.objects.map(a=>{const l=a.gridId?' grid="'+Qn(a.gridId)+'"':"",c=a.mirror?'<mirror axis="'+Qn(a.mirror.axis)+'" offset="'+Number(a.mirror.offset).toFixed(6)+'"/>':"";return'  <component instance="'+Qn(a.id)+'" definition="'+Qn(a.type)+'"'+l+">"+e("position",a.position)+e("rotation-radians-xyz",a.rotation)+e("scale",a.scale)+c+"</component>"}),i=n.topology||{nodes:[],edges:[],plates:[]},r=i.nodes.map(a=>'  <node id="'+Qn(a.id)+'" x="'+a.position.x.toFixed(6)+'" y="'+a.position.y.toFixed(6)+'" z="'+a.position.z.toFixed(6)+'"/>'),s=i.edges.map(a=>'  <edge id="'+Qn(a.id)+'" a="'+Qn(a.a)+'" b="'+Qn(a.b)+'"/>'),o=i.plates.map(a=>'  <plate id="'+Qn(a.id)+'" nodes="'+a.nodeIds.map(Qn).join(" ")+'"/>');return['<?xml version="1.0" encoding="UTF-8"?>',"<!-- EDITOR INTERCHANGE ONLY. Not a verified Anymaker vehicle save. -->",`<anymaker-web-project version="1" game-compatible="false" coordinate-unit="world" grid-cell-size-cm="${mf}">`,"<topology>",...r,...s,...o,"</topology>",...t,"</anymaker-web-project>"].join(`
`)}class OM{constructor(e,t="Initial state"){this.entries=[structuredClone(e)],this.labels=[t],this.cursor=0}commit(e,t="Edit"){JSON.stringify(e)!==JSON.stringify(this.entries[this.cursor])&&(this.entries.splice(this.cursor+1),this.labels.splice(this.cursor+1),this.entries.push(structuredClone(e)),this.labels.push(t),this.entries.length>60&&(this.entries.shift(),this.labels.shift()),this.cursor=this.entries.length-1)}peekUndo(){return this.cursor>0?structuredClone(this.entries[this.cursor-1]):null}peekRedo(){return this.cursor<this.entries.length-1?structuredClone(this.entries[this.cursor+1]):null}}const Pr=n=>structuredClone(n),Fl=(n,e=0)=>Object.fromEntries($t.map(t=>[t,Number(n?.[t]??e)])),FM=(n,e)=>Object.fromEntries($t.map(t=>[t,n[t]+e[t]]));function Yf(n,e="copy"){const t=new Set(n.map(i=>i.id));return i=>{const r=`${i}-${e}`;let s=r,o=2;for(;t.has(s);)s=`${r}-${o++}`;return t.add(s),s}}function zM(n,e,t={x:0,y:0,z:0}){const i=new Set(e),r=Dt(Fl(t),"复制位移"),s=Pr(n),o=Yf(s),a={};for(const l of n){if(!i.has(l.id))continue;const c=Pr(l);c.id=o(l.id),c.position=Dt(FM(Dt(Fl(c.position),"组件位置"),r),"复制后的组件位置"),a[l.id]=c.id,s.push(c)}return{objects:s,idMap:a,created:Object.values(a)}}function BM(n,e){const t=new Set(e),i=n.filter(r=>t.has(r.id)).map(r=>r.id);return{objects:Pr(n).filter(r=>!t.has(r.id)),removed:i}}function kM(n,e,{axis:t="x",offset:i=0}={}){if(!$t.includes(t))throw new Error("镜像平面无效");const r=La(i,"镜像偏移"),s=new Set(e),o=Pr(n),a=Yf(o,"mirror"),l={};for(const c of n){if(!s.has(c.id))continue;const u=Pr(c);u.id=a(c.id),u.position=Dt(Fl(u.position),"组件位置"),u.position[t]=2*r-u.position[t],u.position=Dt(u.position,"镜像后的组件位置"),u.mirror={axis:t,offset:r},l[c.id]=u.id,o.push(u)}return{objects:o,idMap:l,created:Object.values(l)}}function HM(n,e,t){if(typeof t!="string"||!/^[A-Za-z0-9_-]{1,80}$/.test(t))throw new Error("子网格 ID 无效");const i=new Set(e);if(!i.size)throw new Error("至少选择一个组件才能拆分子网格");let r=0;return{objects:Pr(n).map(o=>i.has(o.id)?(r++,{...o,gridId:t}):o),gridId:t,changed:r}}function VM(n,e,t){if(!/^[A-Za-z0-9_-]{1,80}$/.test(t))throw new Error("目标子网格 ID 无效");const i=new Set(e);if(!i.size)throw new Error("至少选择一个源子网格");let r=0;return{objects:Pr(n).map(o=>i.has(o.gridId)?(r++,{...o,gridId:t}):o),gridId:t,changed:r}}function qf(n){return[...new Set(n.map(e=>e.gridId).filter(Boolean))].sort()}const $f=20,GM=$f/pt,Zf=pt,Oc=Zf,zl=13421772,Na=1e-6,oo="edge-outline",Fn=n=>new w(n.x,n.y,n.z),xa=n=>n&&$t.every(e=>Number.isFinite(n[e])&&Math.abs(n[e])<=1e4);function Ua(n,e){const t=n.getWorldQuaternion(new kt),i=Fn(e),r=new w(1,0,0).applyQuaternion(t),s=new w(0,1,0).applyQuaternion(t),o=new w(0,0,1).applyQuaternion(t);return{origin:i,right:r,up:s,plane:new ti().setFromNormalAndCoplanarPoint(o,i)}}function Kf(n,e){if(Math.abs(n.direction.dot(e.plane.normal))<Na)return null;const t=n.intersectPlane(e.plane,new w);if(!t)return null;const i=Li(t);return i?Fn(i):null}function WM(n,e,t){const i=n.intersectObjects(e,!0)[0]?.point,r=i&&Li(i);if(r)return Fn(r);const s=n.ray.intersectPlane(t,new w),o=s&&Li(s);return o?Fn(o):null}function XM(n,e,{axisSnap:t=!1,node:i=null,viewNormal:r=e.plane.normal}={}){const s=Li(e.origin);if(!s)return null;const o=Fn(s);if(!t){const c=xa(i)?Dt(i,"节点坐标"):Kf(n,e);return c?{point:Fn(c),axis:null}:null}if(xa(i)){const c=Dt(i,"节点坐标"),u=$t.filter(d=>ui(c[d])!==ui(s[d]));if(u.length<=1)return{point:Fn(c),axis:u[0]||null}}let a=null;const l=n.origin.clone().sub(o);for(const c of $t){if(Math.abs(r[c])>.995)continue;const u=n.direction[c],d=1-u*u;if(d<1e-4)continue;const h=(l[c]-u*l.dot(n.direction))/d,p=u*h-l.dot(n.direction);if(p<=Na||!Number.isFinite(h))continue;const g=o.clone();g[c]+=h;const _=n.at(p,new w).distanceToSquared(g)/(p*p);if(!Number.isFinite(_)||a&&_>=a.score)continue;const m=Li(g);m&&(a={point:Fn(m),axis:c,score:_})}return a?{point:a.point,axis:a.axis}:null}function Jf(n,e){if(!xa(n)||!xa(e))return[];let t,i;try{t=Dt(n,"梁起点"),i=Dt(e,"梁终点")}catch{return[]}const r=Fn(t);return $t.map(s=>{const o=r.clone();r[s]=i[s];const a=Math.abs(ui(i[s])-ui(t[s]));return{axis:s,length:a*Zf,cells:a,from:o,to:r.clone()}})}function jM(n){const e=n.getObjectByName(oo);e&&(e.geometry.dispose(),e.geometry=new rf(n.geometry))}function gd(n,e,t){const i=Fn(e),r=Fn(t),s=r.clone().sub(i),o=s.length();if(![...i.toArray(),...r.toArray()].every(Number.isFinite)||o<=Na)return n.visible=!1,!1;const a=s.normalize(),l=Math.abs(a.z)<.999?new w(0,0,1):new w(1,0,0),c=l.addScaledVector(a,-l.dot(a)).normalize(),u=new w().crossVectors(a,c).normalize(),d=o+Oc;return n.position.copy(i).add(r).multiplyScalar(.5),n.quaternion.setFromRotationMatrix(new ot().makeBasis(u,a,c)),n.scale.set(Oc,d,Oc),n.visible=!0,n.updateMatrixWorld(!0),n.userData.edgeOutlineRequested&&!n.getObjectByName(oo)?Qf(n):jM(n),!0}function Qf(n){if(!n.geometry?.getAttribute("position"))return!1;const e=new rd(new rf(n.geometry),new Fr({color:1515819,depthTest:!0,depthWrite:!1}));return e.name=oo,e.renderOrder=2,e.userData.topologyOutline=!0,n.add(e),!0}function YM(n,e){n.userData.edgeOutlineRequested=!!e;let t=n.getObjectByName(oo);!t&&e&&(Qf(n),t=n.getObjectByName(oo)),t&&(t.visible=!!e)}function ep(n,e,t,{outlined:i=!1}={}){const r=new oe(new wt(1,1,1),t);return r.userData.edgeOutlineRequested=!!i,gd(r,n,e),r}function qM(n,e,t,i,r){const s=new oe(new Yt(.5,.5,1,r),t),o=e.clone().sub(n),a=o.length();if(a<=Na)return s.visible=!1,s;const l=o.multiplyScalar(1/a),c=Math.abs(l.z)<.999?new w(0,0,1):new w(1,0,0),u=c.addScaledVector(l,-c.dot(l)).normalize(),d=new w().crossVectors(l,u).normalize();return s.position.copy(n).add(e).multiplyScalar(.5),s.quaternion.setFromRotationMatrix(new ot().makeBasis(d,l,u)),s.scale.set(i*2,a,i*2),s.castShadow=!0,s.receiveShadow=!0,s}function $M(n,e,{radius:t=.015,radialSegments:i=8}={}){const r=new jn,s=n.map(o=>Fn(o));for(let o=1;o<s.length;o++)r.add(qM(s[o-1],s[o],e,t,i));for(let o=1;o<s.length-1;o++){const a=new oe(new zr(t,i,Math.max(4,Math.ceil(i/2))),e);a.position.copy(s[o]),a.castShadow=!0,a.receiveShadow=!0,r.add(a)}return r}const ZM={"梁 1 格 · 点击起点":"Edge 1 cell · Click start","梁 1 格 · 点击终点 · Esc 取消":"Edge 1 cell · Click end · Esc to cancel",轴向吸附:"Axis snap","仅建梁：自动吸附单一世界轴（A 切换）":"Edges only: snap to one world axis (A to toggle)","XYZ 长度 · 整数格（1 格 = 8 cm）":"XYZ lengths · Integer cells (1 cell = 8 cm)","吸附 {axis} 轴":"Snap to {axis} axis",自由建梁:"Free edge","{axis} {cells} 格（{centimeters} cm）":"{axis} {cells} cells ({centimeters} cm)","{axis} {cells} 格":"{axis} {cells} cells","操作失败：{error}":"Operation failed: {error}",请先选择组件:"Select a component first",达到组件上限:"Component limit reached","已放置真实静态 Mesh":"Placed a real mesh",已放置缺失资源标记:"Placed a missing-asset marker","已删除 {count} 个组件":"Deleted {count} components","已复制 {count} 个组件":"Copied {count} components","已镜像 {count} 个组件（X 平面）":"Mirrored {count} components across X","新子网格 ID":"New grid ID","已将 {count} 个组件拆分到子网格 {gridId}":"Moved {count} components into grid {gridId}",当前工程尚未建立子网格:"No grids in this project",已合并子网格:"Grids merged",已撤销:"Undone",已重做:"Redone","{message}（{count} 逻辑节点）":"{message} ({count} logical nodes)",已删除节点及其关联拓扑:"Deleted node and connected topology",已删除梁:"Edge deleted",已删除面板:"Plate deleted",面板至少需要三个节点:"A plate needs at least three nodes",已创建面板:"Plate created","面板创建失败：{error}":"Plate creation failed: {error}","按 Alt 点击实体梁内部可分割":"Alt-click inside an edge to split it",已分割实体梁:"Edge split","当前位置无法投影到建造平面，请调整视角或按 Esc 重新开始":"No intersection with the build plane. Adjust the view or press Esc to restart.","起点已定位；移动鼠标预览实体梁，再次点击完成":"Start placed. Move to preview the edge and click to finish.","已创建 1 格实体梁":"Created a 1-cell solid edge",已合并节点:"Nodes merged","节点合并失败：{error}":"Node merge failed: {error}","已选择节点 {id}；点击节点合并，点击空白位置移动；Esc 取消选择":"Selected node {id}. Click a node to merge, empty space to move, or Esc to cancel.",已移动并合并节点:"Node moved and merged",已移动节点:"Node moved","已创建节点 {id}":"Created node {id}","已选择已有节点 {id}":"Selected existing node {id}",面板工具需要点击已有节点:"Select existing nodes to form a plate","面板已选择 {count} 个节点；按 Enter 完成，Esc 取消":"{count} plate nodes selected; Enter to finish, Esc to cancel","无法定位：射线与建造平面平行":"No intersection: ray parallel to build plane","梁 1 格 · 整格端点 · 点击完成 / Esc 取消":"Edge 1 cell · Grid endpoint · Click to finish / Esc to cancel","梁 1 格 · 无有效终点 · Esc 取消":"Edge 1 cell · No valid endpoint · Esc to cancel",无有效终点:"No valid endpoint",该梁没有可用整格分割点:"This edge has no valid interior grid split point","梁操作失败：{error}":"Edge operation failed: {error}","拓扑操作失败：{error}":"Topology operation failed: {error}","节点辅助已隐藏，请先显示节点后编辑节点或面板；直接建梁不受影响":"Show nodes to edit them or construct plates. Direct edge construction still works while nodes are hidden.","清空当前工程？此操作可以撤销。":"Clear this project? This can be undone.","已导出中间 XML；不能作为已验证游戏存档使用":"Debug XML exported. This is not a verified game save.","工程文件超过 10 MiB":"Project file exceeds 10 MiB",工程已加载:"Project loaded","本地已登记 {count} 个 Mesh。按组件请求解码，不上传。材质、动态装配尚未还原。":"{count} local meshes registered. Decoded on demand, never uploaded. Game materials and dynamic assemblies are not fully reproduced.","模型库已登记；选择组件并在视口点击放置":"Mesh library registered. Select a component and click in the viewport to place it.","文件超过 20 MiB":"File exceeds 20 MiB","请同时选择一份 .data 和一份 .meta 文件":"Select one .data and one .meta file together","请选择唯一的一份 .data 和一份 .meta 文件":"Select exactly one .data and one .meta file",".data 与 .meta 必须使用相同文件名":"The .data and .meta files must have the same name","没有 vehicles.vehicles 数组":"Missing vehicles.vehicles array","载具 {id}：{nodes} 节点 / {edges} 梁 / {plates} 面板 / {grids} 网格 / {components} 组件":"Vehicle {id}: {nodes} nodes / {edges} edges / {plates} plates / {grids} grids / {components} components","已导入 {dataName} / {metaName}：{vehicle}。":"Imported {dataName} / {metaName}: {vehicle}.","无法导入原生文件：{error}":"Could not import native files: {error}",正在导入配套原生载具:"Importing paired native vehicle",原生模型尚未加载:"No native model loaded",当前操作仍在进行:"An operation is in progress","已将配套 .data / .meta 的组件导入当前场景；节点、梁、面板和连接仍保留在领域模型中":"Paired .data / .meta components imported. Original topology and connections remain in the domain model.","保存载具 (.data / .meta)":"Save vehicle (.data / .meta)","请先导入配套 .data / .meta 到当前场景后再保存载具":"Import the paired .data / .meta into the scene before saving a vehicle",原生保存暂不支持新增或删除组件:"Native saving does not yet support adding or deleting components","原生保存暂不支持组件旋转、缩放、网格归属或属性修改":"Native saving does not yet support component rotation, scale, grid assignment, or property changes","原生保存暂不支持梁、面板或连接修改":"Native saving does not yet support edge, plate, or connection changes","原生保存暂不支持新增、删除或合并节点":"Native saving does not yet support adding, deleting, or merging nodes","已保存原生 .data / .meta 配套载具；未映射的编辑会被阻止导出":"Saved the native .data / .meta vehicle pair. Unmapped edits are blocked from export.","原生配套文件的无编辑 round-trip 校验失败":"Unedited native-pair round-trip validation failed","原生导出失败：{error}":"Native export failed: {error}",已取消当前拓扑操作:"Topology operation cancelled","组件目录加载失败：{error}":"Component catalog failed: {error}",节点坐标无效:"Invalid node coordinates",梁长度必须大于零:"Edge length must be positive",梁的端点必须是不同节点:"Edge endpoints must be different nodes"},KM={...ZM,镜头辅助灯:"Camera fill light",镜头辅助灯强度:"Camera fill intensity",界面语言:"Interface language","正在加载定义…":"Loading definitions…",编辑工具:"Build tools",导入本地载具:"Import local vehicle",新建:"New",撤销:"Undo",重做:"Redo",保存载具:"Save vehicle","中间格式 XML":"Debug XML",收起方块库:"Collapse library",展开方块库:"Expand library",方块库:"Component library","收起方块库（在视口按 Tab 也可切换）":"Collapse library (Tab in viewport)","展开方块库（在视口按 Tab 也可切换）":"Expand library (Tab in viewport)",组件定义:"Components",搜索组件:"Search components","搜索中文、原始 ID、类别…":"Search name, ID or category…",组件分类:"Component category",全部分类:"All categories",调整方块库宽度:"Resize component library",三维建造视口:"3D construction viewport",打开右侧面板:"Open settings panel",收起右侧面板:"Collapse settings panel",等距:"Isometric",顶视:"Top",前视:"Front","聚焦 F":"Fit F","工作平面 Y = 0":"Ground plane Y = 0",编辑器面板:"Editor settings","工作网格 · 编辑器参数":"Grid & editor settings","固定单位网格：1 格 = 8 cm；手动编辑位置为整数格，原生子网格投影可保留小数。":"Fixed unit grid: 1 cell = 8 cm. Manual edits use integer cells; projected native subgrids may retain fractions.",隐藏网格:"Hide grid",显示网格:"Show grid",隐藏节点:"Hide nodes",显示节点:"Show nodes","左键：当前工具 · 右键拖动：旋转视角":"Left click: active tool · Right drag: orbit","中键：平移 · 滚轮：缩放 · F：聚焦":"Middle drag: pan · Wheel: zoom · F: fit","Shift + 点击连续放置 · Ctrl / ⌘ + Z：撤销":"Shift + click: keep placing · Ctrl / ⌘ + Z: undo",选中方块属性:"Selection properties",资源与校验:"Resources & diagnostics",资源状态:"Asset status","尚未导入 Mesh。橙色线框仅是缺失资源标记，不代表游戏尺寸。":"No local meshes imported. Orange wireframes indicate missing assets, not game dimensions.","选择 .mesh 文件":"Select .mesh files","推荐选择游戏的 rom/meshes 文件夹。只在浏览器读取，不上传、不执行 EXE。仅渲染静态 Mesh，动态部件数量会单独提示。":"For asset auditing, select rom/meshes. Files stay in your browser; nothing is uploaded or executed. Dynamic parts are reported separately.",本地原生载具:"Local native vehicle","选择配套 .data / .meta":"Choose paired .data / .meta","选择同名的 .data 与 .meta JSON 文件。浏览器只读取，不上传；校验后立即替换当前场景。":"Choose same-named .data and .meta JSON files. They stay in your browser and replace the scene immediately after validation.",校验:"Validation","导出原生 JSON（仅已映射字段）":"Experimental native JSON (mapped fields only)",选择:"Select",放置:"Place",删除:"Erase",移动:"Move",旋转:"Rotate",缩放:"Scale",节点:"Node",梁:"Edge",面板:"Plate",复制选中:"Copy selection","镜像 X":"Mirror X",拆分子网格:"Split grid",合并子网格:"Merge grids","无法初始化 WebGL2。请启用硬件加速或更换浏览器。":"WebGL2 could not start. Enable hardware acceleration or use another browser.","{count} 个组件":"{count} components","{nodes} 节点 · {edges} 梁 · {plates} 面板":"{nodes} nodes · {edges} edges · {plates} plates","{count} 个组件没有真实 Mesh。":"{count} components have missing meshes.","静态几何已加载。":"Static geometry loaded.","{geometry} 连接拓扑、占用规则、动态装配和游戏文件兼容性尚未验证。":"{geometry} Connections, occupancy rules, dynamic assembly and game file compatibility are not yet verified.","选择组件查看属性。按住 Shift 点击可多选。":"Select a component to inspect it. Shift-click to select multiple.","已选择 {count} 个结构对象":"{count} structural items selected","Shift 点击可同时选择梁和面板。结构编辑命令尚不支持批量变换。":"Shift-click to select edges and plates together. Structural editing commands do not support batch transforms yet.","已选择 {count} 个组件":"{count} components selected","可批量复制、镜像、拆分或删除。批量变换和框选尚未实现。":"Copy, mirror, split or delete the selection. Group transforms and box selection are not implemented.",删除已选组件:"Delete selection","资源诊断：{reason}":"Asset: {reason}","{vertices} 顶点 / {triangles} 三角形":"{vertices} vertices / {triangles} triangles","子网格 {gridId} · 动态部件 {count}（按需装配）":"Grid {gridId} · {count} dynamic parts (on-demand assembly)",未分配:"Unassigned","位置（格；1 格 = 8 cm）":"Position (cells; 1 cell = 8 cm)","旋转 °":"Rotation °",缩放比例:"Scale ratio",输入超出合法范围:"Value outside the allowed range","原始定义 / 端口 / 动态部件":"Raw definition / ports / dynamic parts",删除组件:"Delete component","准备放置：{name}":"Ready to place: {name}","没有匹配组件，试试其他名称或分类。":"No matching components. Try another name or category.","已加载 {count} 条组件索引，详情按需读取":"Loaded {count} components; details load on demand","仅切换逻辑节点辅助标记，不隐藏梁、不改变工程":"Toggle logical node helpers only; edges and project data stay unchanged",已显示逻辑节点辅助标记:"Logical node helpers shown","节点已隐藏；仍可直接建梁并吸附逻辑端点":"Nodes hidden. Build edges directly and snap to existing endpoints.","梁：两击完成，Esc 取消，Alt 点击分割。所有节点、组件和端点均对齐世界 XYZ 整数格；1 格 = 8 cm。截面边长为 1 格；世界轴向梁的面与 XYZ 平面平行。XYZ 标尺仅显示整数格与厘米。A 切换轴向吸附；节点可隐藏。":"Edge: click twice, Esc to cancel, Alt-click to split. Nodes, components and endpoints all align to integer world XYZ cells; 1 cell = 8 cm. The cross-section is 1 cell; faces of world-axis edges stay parallel to the XYZ planes. XYZ rulers show only integer cells and centimetres. A toggles axis snap. Nodes can be hidden.","节点是结构逻辑，不计入组件数量":"Nodes are structural logic, not components"};let _d="en";const tp=new WeakMap,vd=new Map(Object.entries(KM));function JM(n){for(const[e,t]of Object.entries(n))typeof t=="string"&&vd.set(e,t)}function Ji(){return _d}function np(n){_d=n==="zh"?"zh":"en"}function QM(n){for(const[e,t]of vd){if(!e.includes("{"))continue;const i=[];let r=0,s="^";for(const a of e.matchAll(/\{([A-Za-z][\w]*)\}/g))s+=e.slice(r,a.index).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s+="([\\s\\S]*?)",i.push(a[1]),r=a.index+a[0].length;s+=e.slice(r).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$";const o=new RegExp(s).exec(n);if(o)return{template:t,values:Object.fromEntries(i.map((a,l)=>[a,o[l+1]]))}}return null}function Ae(n,e={}){const t=String(n??""),i=typeof e=="function"?e():e;if(_d==="zh")return t.replace(/\{([A-Za-z][\w]*)\}/g,(l,c)=>Object.hasOwn(i||{},c)?String(i[c]??""):l);const r=vd.get(t),s=r?null:QM(t),o=r??s?.template??t,a={...s?.values,...i||{}};return o.replace(/\{([A-Za-z][\w]*)\}/g,(l,c)=>Object.hasOwn(a,c)?String(a[c]??""):l)}function it(n,e,t={}){n.dataset.i18n=e,tp.set(n,t),n.textContent=Ae(e,t)}function hn(n=document){const e="[data-i18n], [data-i18n-title], [data-i18n-aria-label], [data-i18n-placeholder]",t=[...n.matches?.(e)?[n]:[],...n.querySelectorAll(e)];for(const i of t){i.hasAttribute("data-i18n")&&(i.textContent=Ae(i.dataset.i18n,tp.get(i)));for(const[r,s]of[["title","i18nTitle"],["aria-label","i18nAriaLabel"],["placeholder","i18nPlaceholder"]])i.dataset[s]!==void 0&&i.setAttribute(r,Ae(i.dataset[s]))}}const eS={x:"#c94747",y:"#278452",z:"#326bc5"},bh="http://www.w3.org/2000/svg",ip=n=>String(Math.abs(n)*mf);function tS(n,e){const t=typeof e=="function"?e:()=>e,i=document.createElement("div");i.id="edge-ruler",i.hidden=!0;const r=document.createElementNS(bh,"svg");r.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="edge-measurements";const o=document.createElement("strong");it(o,"XYZ 长度 · 整数格（1 格 = 8 cm）");const a=document.createElement("span");a.id="edge-ruler-mode",s.append(o,a),i.append(r,s),n.append(i);const l=Object.entries(eS).map(([p,g])=>{const _=document.createElementNS(bh,"path");_.classList.add("edge-dimension-line");const m=document.createElement("span");m.className="edge-dimension-label",m.setAttribute("aria-hidden","true");const f=document.createElement("output");f.dataset.axis=p,f.setAttribute("aria-live","off");for(const S of[_,m,f])S.style.setProperty("--axis-color",g);return r.append(_),i.append(m),s.append(f),{path:_,label:m,output:f}});let c=[];function u(){i.hidden=!0,c=[]}function d(p,g,_){const m=p.clone().project(t());return m.z<-1||m.z>1||![m.x,m.y,m.z].every(Number.isFinite)?null:{x:(m.x+1)*g/2,y:(1-m.y)*_/2}}function h(){if(i.hidden)return;const p=n.clientWidth,g=n.clientHeight;c.forEach((_,m)=>{const{path:f,label:S}=l[m],y=d(_.from,p,g),v=d(_.to,p,g),R=y&&v&&_.length>1e-6&&Math.hypot(v.x-y.x,v.y-y.y)>8;if(S.hidden=!R,f.style.display=R?"":"none",!R)return;const A=Math.hypot(v.x-y.x,v.y-y.y),C=-(v.y-y.y)/A*4,D=(v.x-y.x)/A*4;f.setAttribute("d",`M${y.x},${y.y} L${v.x},${v.y} M${y.x-C},${y.y-D} L${y.x+C},${y.y+D} M${v.x-C},${v.y-D} L${v.x+C},${v.y+D}`);const E=Math.max(4,Math.min(p-S.offsetWidth-4,(y.x+v.x)/2+C*2)),M=Math.max(4,Math.min(g-S.offsetHeight-4,(y.y+v.y)/2+D*2));S.style.transform=`translate(${E}px, ${M}px)`})}return{show(p,g,_=null){if(c=Jf(p,g),!c.length){u();return}i.hidden=!1,i.dataset.axis=_||"",it(a,_?"吸附 {axis} 轴":"自由建梁",{axis:_?.toUpperCase()}),c.forEach((m,f)=>{const{label:S,output:y}=l[f],v={axis:m.axis.toUpperCase(),cells:Pl(m.cells),centimeters:ip(m.cells)};it(y,"{axis} {cells} 格（{centimeters} cm）",v),y.dataset.cells=String(m.cells),it(S,"{axis} {cells} 格",v)}),h()},update:h,hide:u,relabel(){hn(i)},dispose(){u(),i.remove()}}}function nS(n,e){const t=typeof e=="function"?e:()=>e,i=document.createElement("div");i.id="edge-length-labels",i.hidden=!0,n.append(i);let r=[];function s(a){const l=a.clone().project(t());return l.z<-1||l.z>1||![l.x,l.y,l.z].every(Number.isFinite)?null:{x:(l.x+1)*n.clientWidth/2,y:(1-l.y)*n.clientHeight/2}}function o(){if(!i.hidden)for(const{label:a,midpoint:l}of r){const c=s(l);a.hidden=!c,c&&(a.style.transform=`translate(${c.x}px, ${c.y}px) translate(-50%, -50%)`)}}return{setEdges(a,l){const c=new Map(a.map(u=>[u.id,u.position]));i.replaceChildren(),r=l.flatMap(u=>{const d=c.get(u.a),h=c.get(u.b);if(!d||!h)return[];const p=Jf(d,h);if(!p.length)return[];const g=document.createElement("output");return g.className="edge-length-label",g.textContent=p.map(({axis:_,cells:m})=>`${_.toUpperCase()} ${Pl(m)}`).join(" · "),g.title=p.map(({axis:_,cells:m})=>`${_.toUpperCase()} ${Pl(m)} cells / ${ip(m)} cm`).join(" · "),i.append(g),[{label:g,midpoint:new w(d.x,d.y,d.z).add(new w(h.x,h.y,h.z)).multiplyScalar(.5)}]}),o()},setVisible(a){i.hidden=!a,a&&o()},update:o,dispose(){r=[],i.remove()}}}const gs=n=>({x:Number(n?.[0]??0),y:Number(n?.[1]??0),z:Number(n?.[2]??0)}),rp=n=>Array.isArray(n)&&n.length===9&&n.every(e=>Number.isFinite(e))?[...n]:null,iS=(n,e)=>Array.isArray(n)&&n.length===e&&n.every(t=>Number.isFinite(t));function rS(n){if(!n)return{x:0,y:0,z:0};n=[n[0],n[3],n[6],n[1],n[4],n[7],n[2],n[5],n[8]];const t=Math.asin((i=>Math.max(-1,Math.min(1,i)))(n[2]));return Math.abs(n[2])<.9999999?{x:Math.atan2(-n[5],n[8]),y:t,z:Math.atan2(-n[1],n[0])}:{x:Math.atan2(n[7],n[4]),y:t,z:0}}function sS(n){const e=rp(n?.m),t=iS(n?.t,3)?gs(n.t):gs();if(n?.m!==void 0&&!e)throw new Error("Native vehicle transform matrix must contain nine finite numbers");return{position:t,rotationMatrix:e||void 0}}function oS(n,e,t){if(!n||!Number.isInteger(n.id))throw new Error("Native component ID must be an integer");const i=e[n.def]||`native-definition-${n.def}`,r=rp(n.rot),s=new hd({id:String(n.id),type:i,gridId:t,position:gs(n.pos),rotation:rS(r),scale:{x:1,y:1,z:1}});if(s.extras.native={definitionIndex:n.def,rotationMatrix:r,colors:Array.isArray(n.colors)?[...n.colors]:void 0,state:Object.fromEntries(Object.entries(n).filter(([o])=>!["id","def","pos","rot","colors"].includes(o)))},n.rot!==void 0&&!s.extras.native.rotationMatrix)throw new Error(`Invalid native rotation matrix for component ${n.id}`);return s}function aS(n){const e=typeof n=="string"?JSON.parse(n):n;if(!e||!e.vehicles||!Array.isArray(e.vehicles.vehicles))throw new Error("Native data has no vehicles.vehicles array");const t=Array.isArray(e.definitions?.components)?e.definitions.components:[],i=e.vehicles.vehicles.map(s=>{const o=new Lf({id:String(s.id),transform:sS(s.transform)});o.extras.native={rawVehicle:structuredClone(s)};const a=Array.isArray(s.grids)?s.grids:[];return o.grids=a.map((l,c)=>{const u=`grid-${o.id}-${c+1}`,d=new Df({id:u,origin:gs(l.origin),dir:gs(l.dir)});d.components=(l.components||[]).map(p=>oS(p,t,u)),d.nodes=c===0?(s.nodes||[]).map(p=>new Af({id:String(p.id),position:gs(p.pos),extras:{native:structuredClone(p)}})):[],d.edges=c===0?(s.edges||[]).map((p,g)=>new Cf({id:`${u}-edge-${g+1}`,a:String(p.n0),b:String(p.n1),extras:{native:structuredClone(p)}})):[],d.plates=c===0?(s.plates||[]).map(p=>new Rf({id:String(p.id),nodeIds:(p.nodes||[]).map(String),extras:{native:structuredClone(p)}})):[];const h=["electric","mechanical","liquid","gas","belt","data"];return d.links=c===0?h.flatMap(p=>(s[`${p}_links`]||[]).map((g,_)=>new Pf({id:`${u}-${p}-link-${_+1}`,kind:p,from:structuredClone(g.p0||{}),to:structuredClone(g.p1||{}),points:structuredClone(g.points||[]),extras:{native:structuredClone(g)}}))):[],d.extras.native={index:c,raw:structuredClone(l)},d}),o}),r=new If({vehicles:i,extras:{native:{definitions:[...t],raw:structuredClone(e)}}});return Br(r),r}function sp(n,e){const t=typeof e=="string"?JSON.parse(e):e;if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Native .meta must be a JSON object");const i=aS(n);return i.extras.native.meta=structuredClone(t),i}function cS(n){return Br(n),n.vehicles.map(e=>({id:e.id,grids:e.grids.length,nodes:e.grids.reduce((t,i)=>t+i.nodes.length,0),edges:e.grids.reduce((t,i)=>t+i.edges.length,0),plates:e.grids.reduce((t,i)=>t+i.plates.length,0),components:e.grids.reduce((t,i)=>t+i.components.length,0),links:e.grids.reduce((t,i)=>t+i.links.length,0)}))}function lS(n,{strict:e=!0}={}){Br(n);const t=n.extras?.native?.raw;if(!t)throw new Error("Domain model has no native source document");const i=structuredClone(t),r=[];for(const s of n.vehicles){const o=i.vehicles.vehicles.find(a=>String(a.id)===s.id);if(!o){r.push(`Missing native vehicle ${s.id}`);continue}for(const a of s.grids){const l=a.extras?.native?.index,c=Number.isInteger(l)?o.grids?.[l]:null;if(!c){r.push(`Missing native grid ${a.id}`);continue}for(const u of a.components){const d=(c.components||[]).find(p=>String(p.id)===u.id);if(!d){r.push(`New or unmapped native component ${u.id}`);continue}d.pos=[u.transform.position.x,u.transform.position.y,u.transform.position.z];const h=u.extras?.native?.rotationMatrix;h&&(d.rot=[...h])}for(const u of a.nodes){const d=(o.nodes||[]).find(h=>String(h.id)===u.id);d&&(d.pos=[u.position.x,u.position.y,u.position.z])}}}if(e&&r.length)throw new Error(`Native export blocked:
`+r.join(`
`));return{value:i,diagnostics:r}}function ya(n,e,t="$",i=[],r=100){if(i.length>=r||Object.is(n,e))return i;const s=Array.isArray(n),o=Array.isArray(e);if(s||o){if(!s||!o||n.length!==e.length)return i.push({path:t,expected:n,actual:e}),i;for(let u=0;u<n.length&&i.length<r;u++)ya(n[u],e[u],`${t}[${u}]`,i,r);return i}if(!(n&&typeof n=="object")||!(e&&typeof e=="object"))return i.push({path:t,expected:n,actual:e}),i;const c=[...new Set([...Object.keys(n),...Object.keys(e)])].sort();for(const u of c)if(!Object.hasOwn(n,u)||!Object.hasOwn(e,u)?i.push({path:`${t}.${u}`,expected:n[u],actual:e[u]}):ya(n[u],e[u],`${t}.${u}`,i,r),i.length>=r)break;return i}function op(n){Br(n);const e=n.extras?.native?.raw,t=n.extras?.native?.meta;if(!e||!t)throw new Error("Domain model has no paired native source files");return{data:structuredClone(e),meta:structuredClone(t)}}function dS(n,e){const t=typeof n=="string"?JSON.parse(n):n,i=typeof e=="string"?JSON.parse(e):e,r=op(sp(t,i));return{data:ya(t,r.data),meta:ya(i,r.meta)}}const Eh=n=>{if(typeof n!="string"||!n.startsWith("data/")||n.includes("..")||!n.endsWith(".json"))throw new Error("Invalid component data path");return n};class uS{constructor(e){this.baseUrl=e.endsWith("/")?e:e+"/",this.index=new Map,this.details=new Map,this.bindings=new Map}async load(){const e=await fetch(this.baseUrl+"data/index.json");if(!e.ok)throw new Error("组件索引加载失败 HTTP "+e.status);const t=await e.json();if(t.format!=="anymaker-component-index"||t.version!==1||t.schema!=="anymaker-component-index/1"||!Number.isInteger(t.resourceVersion)||!Array.isArray(t.definitions))throw new Error("不支持的组件索引格式");for(const i of t.definitions){if(!i||typeof i.id!="string"||!i.id||this.index.has(i.id))throw new Error("组件索引 ID 无效或重复");this.index.set(i.id,{...i,detail:Eh(i.detail),binding:Eh(i.binding)})}if(this.index.size!==t.count)throw new Error("组件索引数量不匹配");return t}has(e){return this.index.has(e)}entry(e){return this.index.get(e)}entries(){return this.index.values()}async definition(e){if(this.details.has(e))return this.details.get(e);const t=this.entry(e);if(!t)throw new Error("未知组件："+e);const[i,r]=await Promise.all([fetch(this.baseUrl+t.detail),fetch(this.baseUrl+t.binding)]);if(!i.ok||!r.ok)throw new Error("组件详情或 Mesh 绑定加载失败："+e);const[s,o]=await Promise.all([i.json(),r.json()]);if(s.id!==e||o.id!==e)throw new Error("组件数据 ID 不匹配："+e);const a={...s,meshBinding:o};return this.details.set(e,a),this.bindings.set(e,o),a}}const wh=new Map([["engine",["动力","#b56532","M3 9h3V6h9v3h3l3 3v6H6v-3H3z M9 3h6 M12 3v3"]],["liquid",["液体","#1682ac","M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12z M8 15a4 4 0 0 0 4 4"]],["wheel",["车轮","#57667e","M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M12 3v5 M12 16v5 M3 12h5 M16 12h5"]],["torque",["传动","#956831","M3 9h5v6H3z M16 9h5v6h-5z M8 12h8 M10 5h4 M12 3v4 M10 19h4"]],["electric",["电气","#ae7a16","M13 2 5 14h6l-1 8 9-13h-7z"]],["control",["控制","#7353b4","M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6"]],["light",["照明","#b78b22","M9 18v-2a6 6 0 1 1 6 0v2z M9 21h6 M12 1v1 M2 8h2 M20 8h2"]],["connector",["连接","#607a91","M9 14 7 16a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0 M15 10l2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0 M8 16l8-8"]],["sound",["声音","#9161aa","M3 9h4l5-4v14l-5-4H3z M16 8a6 6 0 0 1 0 8 M19 5a10 10 0 0 1 0 14"]],["interface",["仪表","#50879f","M3 4h18v13H3z M8 21h8 M12 17v4 M6 13l4-4 3 2 5-5"]],["storage",["存储","#976c45","M3 6l9-4 9 4v12l-9 4-9-4z M3 6l9 4 9-4 M12 10v12 M7 4l9 4"]],["radio",["无线","#6964bd","M12 21V11 M9 21h6 M10 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0 M7 5a7 7 0 0 0 0 10 M17 5a7 7 0 0 1 0 10 M4 2a11 11 0 0 0 0 16 M20 2a11 11 0 0 1 0 16"]],["weapon",["装置","#7c6b70","M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0 M12 2v6 M12 16v6 M2 12h6 M16 12h6"]],["aircraft",["航空","#437d9c","M12 2l2 8 7 4v3l-7-2v4l2 2h-8l2-2v-4l-7 2v-3l7-4z"]],["gas",["气体","#599993","M3 7h12a3 3 0 1 0-3-3 M3 12h16a3 3 0 1 1-3 3 M3 17h6a3 3 0 1 1-3 3"]],["hydraulic",["液压","#5089a7","M4 8h10v8H4z M14 12h6 M20 8v8 M2 5v14 M7 4v4 M7 16v4"]],["mechanical",["机械","#737d91","M9 3h6v3l3 2 3-1 2 5-3 2v3l-5 3-3-2-3 2-5-3v-3l-3-2 2-5 3 1 3-2z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"]],["data",["数据","#6b68aa","M8 5 2 12l6 7 M16 5l6 7-6 7 M14 3l-4 18"]],["furniture",["家具","#a07152","M6 3h12v10H6z M4 13h16v4H4z M6 17v4 M18 17v4"]],["building",["建材","#718898","M3 3h18v18H3z M3 9h18 M3 15h18 M9 3v6 M15 9v6 M9 15v6"]],["sensor",["传感","#579279","M12 3a9 9 0 1 0 9 9 M12 7a5 5 0 1 0 5 5 M12 12l8-8 M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"]],["miscellaneous",["其他","#788394","M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z"]]]);function xd(n){const[e,t,i]=wh.get(n)||wh.get("miscellaneous");return{label:e,color:t,path:i}}function hS(n){const e=xd(n),t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.6"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.setAttribute("aria-hidden","true"),t.classList.add("category-icon"),t.style.color=e.color;const i=document.createElementNS(t.namespaceURI,"path");return i.setAttribute("d",e.path),t.append(i),t}const Th=new Map([[26,"#bd2636"],[28,"#631a24"],[49,"#2b3440"],[79,"#20252c"]]);function Fc(n){return Math.round(Math.max(0,Math.min(1,n))*255).toString(16).padStart(2,"0")}function yd(n){if(Th.has(n))return Th.get(n);const e=n*.61803398875%1,t=.62,i=.46,r=(1-Math.abs(2*i-1))*t,s=e*6,o=r*(1-Math.abs(s%2-1)),[a,l,c]=s<1?[r,o,0]:s<2?[o,r,0]:s<3?[0,r,o]:s<4?[0,o,r]:s<5?[o,0,r]:[r,0,o],u=i-r/2;return"#"+Fc(a+u)+Fc(l+u)+Fc(c+u)}function fS(n){return n?.type==="window"}const ei=(n,e,t,i)=>Number.isFinite(n)&&n>=e&&n<=t?n:i,mn=(n,e)=>typeof n=="boolean"?n:e,zc=(n,e,t="")=>typeof n=="string"&&n.length<=e?n:t,Ah=n=>Array.isArray(n)&&n.length===3&&n.every(e=>Number.isFinite(e)&&Math.abs(e)<=1e4),pS=n=>typeof n=="string"&&/^#[\da-f]{6}$/i.test(n)?n.toLowerCase():null,mS=(n,e)=>{if(!Array.isArray(n)||n.length>12)return e;const t=n.map(i=>pS(i)||(Number.isInteger(i)&&i>=0&&i<=255?yd(i):null));return t.every(Boolean)?[...new Set(t)]:e},gS=6e4;function $i(n={}){const e=n&&n.version===1?n:{};let t=null;if(Ah(e.camera?.position)&&Ah(e.camera?.target)){const i=Math.hypot(...e.camera.position.map((r,s)=>r-e.camera.target[s]));i>.005&&i<2e3&&(t={position:[...e.camera.position],target:[...e.camera.target]})}return{version:1,language:e.language==="zh"?"zh":"en",leftWidth:ei(e.leftWidth,240,720,304),leftCollapsed:mn(e.leftCollapsed,!1),rightOpen:mn(e.rightOpen,!1),gridColor:typeof e.gridColor=="string"&&/^#[\da-f]{6}$/i.test(e.gridColor)?e.gridColor:"#8294a8",gridOpacity:ei(e.gridOpacity,0,1,.45),gridStyle:e.gridStyle==="dashed"?"dashed":"solid",gridVisible:mn(e.gridVisible,!0),nodesVisible:mn(e.nodesVisible,!0),nodeColor:typeof e.nodeColor=="string"&&/^#[\da-f]{6}$/i.test(e.nodeColor)?e.nodeColor:"#246bce",nodeSize:ei(e.nodeSize,.02,.25,.055),nodeOpacity:ei(e.nodeOpacity,0,1,1),edgeAxisSnap:mn(e.edgeAxisSnap,!1),edgeLengthsVisible:mn(e.edgeLengthsVisible,!1),edgeOutlinesVisible:mn(e.edgeOutlinesVisible,!1),backgroundColor:typeof e.backgroundColor=="string"&&/^#[\da-f]{6}$/i.test(e.backgroundColor)?e.backgroundColor:"#ffffff",lightAzimuth:ei(e.lightAzimuth,-180,180,35),lightElevation:ei(e.lightElevation,5,90,55),lightIntensity:ei(e.lightIntensity,0,8,3),shadowStrength:ei(e.shadowStrength,0,1,.65),lightSoftness:ei(e.lightSoftness,0,8,2),cameraLightEnabled:mn(e.cameraLightEnabled,!0),cameraLightIntensity:ei(e.cameraLightIntensity,0,8,2),paintQuickColors:mS(e.paintQuickColors,["#bd2636","#631a24","#2b3440","#20252c","#a16a30"]),orthographic:mn(e.orthographic,!1),showBuildingFurniture:mn(e.showBuildingFurniture,!1),query:zc(e.query,200),category:zc(e.category,80),selectedType:zc(e.selectedType,100,"engine"),tool:["select","place","erase","translate","rotate","scale","node","edge","split","plate","glass","connect","paint"].includes(e.tool)?e.tool:"select",drawers:{catalog:mn(e.drawers?.catalog,!0),inspector:mn(e.drawers?.inspector,!1),resources:mn(e.drawers?.resources,!1),history:mn(e.drawers?.history,!1)},camera:t}}function _S(n,e="/"){const t="anymaker:"+e,i={settings:t+":settings:v1",project:t+":autosave:v1",backup:t+":autosave-backup:v1"};function r(o,a){if(o.length>a)throw new Error("Local record exceeds the size limit");return JSON.parse(o)}function s(o,a){const l=r(o,8388608);if(!l||l.version!==1||!Number.isFinite(l.savedAt))throw new Error("Unsupported local backup");return{...l,document:a(l.document)}}return{keys:i,loadSettings(){try{const o=n().getItem(i.settings);return{settings:$i(o?r(o,16384):void 0),error:null}}catch(o){return{settings:$i(),error:o}}},saveSettings(o){try{return n().setItem(i.settings,JSON.stringify($i(o))),{ok:!0}}catch(a){return{ok:!1,error:a}}},loadProject(o){let a=null;for(const l of[i.project,i.backup])try{const c=n().getItem(l);if(c)return{record:s(c,o),recoveredBackup:l===i.backup,error:null}}catch(c){a=c}return{record:null,error:a}},saveProject(o,a,l=Date.now()){try{const c=a(o),u=JSON.stringify({version:1,savedAt:l,document:c});if(u.length>8*1024*1024)throw new Error("Project too large for local backup");const d=n(),h=d.getItem(i.project);if(h){let p=!1;try{s(h,a),p=!0}catch{}if(p)try{d.setItem(i.backup,h)}catch{}}return d.setItem(i.project,u),{ok:!0,savedAt:l}}catch(c){return{ok:!1,error:c}}}}}async function vS({store:n,validate:e,restore:t,snapshot:i,canSave:r,notify:s}){let o=!1,a="",l="ready",c=null,u="";const d=(S,y="")=>{l=S,u=y,s({state:l,savedAt:c,detail:u})},h=n.loadProject(e);if(h.record)try{await t(h.record.document),a=JSON.stringify(i()),c=h.record.savedAt,d(h.recoveredBackup?"recovered":"restored")}catch(S){o=!0,d("error",S.message)}else h.error?(o=!0,d("error",h.error.message)):(a=JSON.stringify(i()),d("ready"));function p(S=!1){if(o||!r())return!1;try{const y=i(),v=JSON.stringify(y);if(!S&&v===a)return!0;const R=n.saveProject(y,e);return R.ok?(c=R.savedAt,a=v,d("saved"),!0):(d("write-error",R.error.message),!1)}catch(y){return d("write-error",y.message),!1}}const g=setInterval(()=>p(),gS),_=()=>{document.visibilityState==="hidden"&&p()},m=()=>p(),f=S=>{S.key===n.keys.project&&(o=!0,d("conflict"))};return document.addEventListener("visibilitychange",_),window.addEventListener("pagehide",m),window.addEventListener("storage",f),{save:p,resume(){return o=!1,p(!0)},refresh(){s({state:l,savedAt:c,detail:u})},dispose(){clearInterval(g),document.removeEventListener("visibilitychange",_),window.removeEventListener("pagehide",m),window.removeEventListener("storage",f)}}}const Ch={right:[1,0,0],left:[-1,0,0],top:[0,1,1e-5],bottom:[0,-1,1e-5],front:[0,0,1],back:[0,0,-1],iso:[1,.8,1]};function xS(n,e,t){if(!Object.hasOwn(Ch,t))return!1;const i=Math.max(.5,n.position.distanceTo(e.target));return n.up.set(0,1,0),n.position.copy(e.target).addScaledVector(new w(...Ch[t]).normalize(),i),n.lookAt(e.target),e.update(),n.updateMatrixWorld(!0),!0}function yS(n,{gridColor:e,gridOpacity:t,gridStyle:i}){const r=n.material,s={color:e,transparent:!0,opacity:t,depthWrite:!1,vertexColors:!1};n.material=i==="dashed"?new Ig({...s,dashSize:.055,gapSize:.045}):new Fr(s),i==="dashed"&&n.computeLineDistances();for(const o of Array.isArray(r)?r:[r])o.dispose()}function MS(n,e,t,i){const r=typeof e=="function"?e:()=>e,s=document.createElement("section");s.id="orientation-indicator",s.setAttribute("aria-label",i("orientation"));const o=document.createElement("div");o.className="orientation-sphere";const a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("viewBox","0 0 120 120"),a.setAttribute("aria-hidden","true"),o.append(a);const l=[["right","+X","#cc5258",[1,0,0]],["left","−X","#cc5258",[-1,0,0]],["top","+Y","#45996b",[0,1,0]],["bottom","−Y","#45996b",[0,-1,0]],["front","+Z","#4387d4",[0,0,1]],["back","−Z","#4387d4",[0,0,-1]]].map(([p,g,_,m])=>{const f=document.createElementNS(a.namespaceURI,"line");f.setAttribute("x1","60"),f.setAttribute("y1","60"),f.setAttribute("stroke",_),a.append(f);const S=document.createElement("button");return S.dataset.view=p,S.textContent=g,S.style.setProperty("--axis-color",_),S.title=i(p),S.setAttribute("aria-label",i(p)),S.onclick=()=>t(p),o.append(S),{view:p,line:f,button:S,direction:new w(...m)}}),c=document.createElement("div");c.className="orientation-footer";const u=document.createElement("button");u.dataset.view="iso",u.textContent=i("iso"),u.onclick=()=>t("iso"),c.append(u),s.append(o,c),n.append(s);const d=new kt,h=new w;return{root:s,footer:c,update(){d.copy(r().quaternion).invert();for(const{line:p,button:g,direction:_}of l){h.copy(_).applyQuaternion(d);const m=60+h.x*40,f=60-h.y*40;p.setAttribute("x2",String(m)),p.setAttribute("y2",String(f));const S=Math.hypot(h.x,h.y)<.1?h.z<0?-16:16:0;g.style.left=m+S+"px",g.style.top=f+"px",g.style.zIndex=String(Math.round((h.z+1)*10)),g.style.opacity=h.z<-.1?".55":"1",g.style.transform="translate(-50%, -50%) scale("+(h.z<-.1?.8:1)+")"}},relabel(){s.setAttribute("aria-label",i("orientation"));for(const p of l)p.button.title=i(p.view),p.button.setAttribute("aria-label",i(p.view));u.textContent=i("iso")}}}const Nn=Object.freeze({component:0,edge:1,plate:2}),po=16,SS=po*2,ap=1/(1<<20),bS=ap/(po*4);function Oa(n){return Number.isInteger(n)&&n>=0&&n<=Nn.plate}function cp(n){return Number.isInteger(n)&&n>=0&&n<po}function lp(n){const e=String(n??"");let t=2166136261;for(let i=0;i<e.length;i++)t^=e.charCodeAt(i),t=Math.imul(t,16777619);return(t>>>0)%po}function ES(n,e=0){if(!Oa(n)||!cp(e))throw new Error("Invalid render depth layer");return-((n+1)*SS+e)}function wS(n,e=0){if(!Oa(n)||!cp(e))throw new Error("Invalid render depth layer");return-((n+1)*ap+e*bS)}function TS(n,e){const t=n.userData.renderDepthState||{onBeforeCompile:n.onBeforeCompile,customProgramCacheKey:n.customProgramCacheKey,bias:0};t.bias=e,n.userData.renderDepthState=t,n.onBeforeCompile=i=>{t.onBeforeCompile.call(n,i);const r=t.bias.toExponential();i.fragmentShader=i.fragmentShader.replace("#include <logdepthbuf_fragment>",`#include <logdepthbuf_fragment>
#ifdef USE_LOGDEPTHBUF
  gl_FragDepth = clamp( gl_FragDepth + (${r}), 0.0, 1.0 );
#endif`)},n.customProgramCacheKey=()=>`${t.customProgramCacheKey.call(n)}|render-depth-${t.bias}`}function Fa(n,e,{key:t=""}={}){if(!n||n.transparent||n.depthWrite===!1)return n;const i=lp(t),r=ES(e,i);return n.depthTest=!0,n.depthWrite=!0,n.depthFunc=wr,n.polygonOffset=!0,n.polygonOffsetFactor=0,n.polygonOffsetUnits=r,TS(n,wS(e,i)),n.needsUpdate=!0,n.userData.renderDepthLayer=e,n.userData.renderDepthRank=i,n}function Bl(n,e,{key:t=""}={}){if(!Oa(e))throw new Error("Invalid render depth layer");const i=lp(t),r=e*po+i;return n.traverse(s=>{if(s.isMesh){for(const o of Array.isArray(s.material)?s.material:[s.material])Fa(o,e,{key:t});s.renderOrder=r}}),n}function AS(n){return n?.isMesh?(Array.isArray(n.material)?n.material:[n.material]).some(e=>e&&!e.transparent&&e.depthWrite!==!1):!1}function CS(n){const e=[];for(const t of n||[]){if(!t?.object||!Oa(t.layer))throw new Error("Invalid opaque depth entry");let i=0;t.object.traverse(r=>{if(!r.isMesh)return;const s=i++;AS(r)&&e.push({mesh:r,layer:t.layer,key:`${String(t.key??"")}:${s}`})})}e.sort((t,i)=>t.layer-i.layer||(t.key<i.key?-1:t.key>i.key?1:0));for(let t=0;t<e.length;t++){const i=e[t];i.mesh.renderOrder=t;for(const r of Array.isArray(i.mesh.material)?i.mesh.material:[i.mesh.material])Fa(r,i.layer,{key:i.key})}return e.length}const RS={透明化:"Hide",透明化组:"Visibility groups",组名称:"Group name",保存当前透明化为组:"Save hidden as group","组会保存当前已透明化的组件、梁和面板；可随时按组隐藏或恢复。":"A group stores the currently hidden components, edges, and plates. Hide or restore it at any time.",按组透明化:"Hide group",按组恢复:"Restore group",删除透明化组:"Delete visibility group",请输入透明化组名称:"Enter a visibility group name.",当前没有透明化的对象可保存:"There are no hidden objects to save.","已保存透明化组 {name}":"Saved visibility group {name}",已删除透明化组:"Deleted visibility group","已按组透明化 {name}":"Hid group {name}","已按组恢复 {name}":"Restored group {name}",取消透明化:"Restore hidden","透明化工具需要点击组件、梁或面板":"The hide tool needs a component, edge, or panel.","已透明化 {count} 个对象":"Hid {count} object(s).",已取消透明化:"Restored all hidden objects.",玻璃:"Glass",玻璃至少需要选择三根梁:"Glass needs at least three edges.",玻璃工具需要选择围成闭合环的梁:"The glass tool needs edges that form a closed loop.","玻璃已选择 {count} 根梁；按 Enter 创建，Esc 取消":"Glass has selected {count} edges; press Enter to create or Esc to cancel.",已创建玻璃面板:"Created glass panel",视图与光照:"View and lighting",背景颜色:"Background color",正交镜头:"Orthographic camera",光照方位角:"Light azimuth",光照高度角:"Light elevation",光照强度:"Light intensity",阴影强度:"Shadow strength",光照柔和度:"Light softness",涂色色板:"Paint palette",保存快捷颜色:"Save quick color",删除快捷颜色:"Remove saved color",显示建材与家具:"Show building and furniture",连接类型:"Connection type",历史记录:"History","最近 50 次已提交操作。选择任一项即可恢复到该状态。":"Latest 50 committed operations. Select an item to restore that state.",初始状态:"Initial state",编辑:"Edit",放置组件:"Place component",删除组件:"Delete component",恢复此状态:"Restore this state",已恢复历史记录:"Restored history entry",载具尺寸:"Vehicle size",空载具:"Empty vehicle","{axis} {cells} 格 / {cm} cm":"{axis} {cells} cells / {cm} cm","载具总尺寸按组件和结构节点的包围范围计算；1 格 = 8 cm":"Vehicle size is calculated from the bounds of components and structural nodes; 1 cell = 8 cm","点击组件端口作为起点，再点击兼容端口完成连接。":"Click a component port for the source, then a compatible port for the target.",切分梁:"Split edge",连接:"Connect",连接工具:"Connection tool",连接类型:"Connection type",起点端口:"Source port",终点端口:"Target port",电线:"Electric",机械连接:"Mechanical",液体管线:"Liquid",气体管线:"Gas",皮带:"Belt",数据线:"Data",连接工具说明:"Choose a network type, then click a source and target component. Routes and port compatibility are not yet verified against the game.",连接工具需要点击两个组件:"The connection tool needs a source and target component.",连接工具需要点击组件端口:"The connection tool needs a component port.","端口必须是 0 到 255 的整数":"Port must be an integer from 0 to 255.","已选择连接起点；点击目标组件完成，Esc 取消":"Source selected; click a target component to finish, or press Esc to cancel.",请选择另一个组件作为连接终点:"Choose another component as the connection target.",请选择另一个组件端口作为连接终点:"Choose another component port as the connection target.","已创建 {kind} 连接":"Created {kind} connection",已删除连接:"Deleted connection",切分工具需要点击梁的内部:"The split tool needs an interior point on an edge.",该梁没有可用整格切分点:"This edge has no available cell split point.",已切分实体梁并新增节点:"Split the solid edge and added a node","梁切分失败：{error}":"Could not split edge: {error}","连接操作失败：{error}":"Connection operation failed: {error}","移动节点失败：{error}":"Could not move node: {error}","放置虚影加载失败：{error}":"Could not load placement preview: {error}",参考预览:"Reference preview",退出参考预览:"Exit reference preview","隐藏编辑辅助并使用黑色背景；仅用于与参考截图进行人工对照，不代表游戏渲染已经匹配":"Hide editing aids on black for manual screenshot comparison. This does not claim the game rendering matches.","已开启参考预览：编辑辅助已隐藏，可对照 vehicle.png；相机、光照和游戏材质尚未验证":"Reference preview enabled: editing aids are hidden for comparison with vehicle.png; game camera, lighting, and materials remain unverified.",已退出参考预览:"Reference preview disabled.","已将配套 .data / .meta 的组件、节点、梁和面板导入当前场景；连接仍保留在领域模型中":"Paired .data / .meta components, nodes, edges, and plates imported into the scene; connections remain in the domain model.",涂色:"Paint","颜色（Hex RGB）":"Color (Hex RGB)","使用原生颜色编号；以下仅为诊断预览，不代表游戏调色板。":"Use native color indices. The preview below is diagnostic only and does not represent the game palette.",原生颜色编号:"Native color index",面板涂色面:"Panel paint side",前面:"Front",背面:"Back",涂色工具需要点击梁或面板:"The paint tool needs an edge or plate.","颜色必须是 #RRGGBB 格式":"Color must use the #RRGGBB format.","已为梁设置颜色 {color}":"Set edge color to {color}","已为面板前面设置颜色 {color}":"Set front plate color to {color}","已为面板背面设置颜色 {color}":"Set back plate color to {color}","XYZ 视角指示器":"XYZ orientation","右视图 +X":"Right view +X","左视图 −X":"Left view −X","顶视图 +Y":"Top view +Y","底视图 −Y":"Bottom view −Y","前视图 +Z":"Front view +Z","后视图 −Z":"Back view −Z",网格颜色:"Grid color",网格透明度:"Grid opacity",网格线型:"Grid lines",结构显示:"Structure display","显示梁 XYZ 长度（格）":"Show edge XYZ lengths (cells)",显示梁描边:"Show edge outlines",节点显示:"Node display",节点颜色:"Node color",节点大小:"Node size",节点透明度:"Node opacity","固定单位网格：1 格 = 8 cm；手动编辑位置为整数格，原生子网格投影可保留小数。":"Fixed unit grid: 1 cell = 8 cm. Manual edits use integer cells; projected native subgrids may retain fractions.",实线:"Solid",虚线:"Dashed","自动保存：每分钟":"Autosave: every minute",已恢复本地工程:"Local project restored",已从上一份有效备份恢复:"Recovered the previous valid backup","已自动保存 {time}":"Autosaved at {time}","本地恢复失败：{detail}":"Local recovery failed: {detail}","本地保存失败，请下载工程：{detail}":"Local save failed. Download your project: {detail}","另一标签页已保存，自动保存已暂停":"Another tab saved this project. Autosave paused.",以当前工程继续自动保存:"Resume autosave with this project","用当前工程覆盖本地恢复记录并继续自动保存？":"Replace the local recovery record with this project and resume autosave?","设置保存失败：{detail}":"Could not save preferences: {detail}","本地存储只属于当前浏览器和站点；清理站点数据会删除备份，请定期下载工程。":"Local backups belong to this browser and site. Clearing site data removes them; download your project regularly.","组件 {id} 没有原生映射":"Component {id} has no native mapping","组件 {id} 的原生记录丢失":"Component {id} is missing its native record","节点 {id} 没有原生映射":"Node {id} has no native mapping","节点 {id} 的原生记录丢失":"Node {id} is missing its native record",节点位置超出整数格范围:"Node position is outside the integer cell range",组件位置超出整数格范围:"Component position is outside the integer cell range",放置位置超出整数格范围:"Placement position is outside the integer cell range","模型超过 64 MiB 限制":"Mesh exceeds the 64 MiB limit","该浏览器不支持 gzip Mesh 解压":"This browser does not support gzip Mesh decompression","组件索引加载失败 HTTP {status}":"Component index request failed: HTTP {status}",不支持的组件索引格式:"Unsupported component index format","组件索引 ID 无效或重复":"Component index ID is invalid or duplicated",组件索引数量不匹配:"Component index count does not match","未知组件：{id}":"Unknown component: {id}","组件详情或 Mesh 绑定加载失败：{id}":"Could not load component details or Mesh binding: {id}","组件数据 ID 不匹配：{id}":"Component data ID does not match: {id}","缺少本地 Mesh：{path}":"Local Mesh is missing: {path}","定义没有静态 Mesh":"Definition has no static Mesh","真实静态几何 · 中性诊断材质（非游戏着色）":"Real static geometry · Neutral diagnostic material (not game shading)","已入库但使用未解码的原生 Mesh 变体":"Published but using an undecoded native Mesh variant","独立发布 Mesh（完整解析，gzip 懒加载）":"Standalone published Mesh (fully decoded, gzip lazy-loaded)",格坐标超出合法范围:"Cell coordinate is outside the allowed range","{label}必须对齐 8 cm 整数格":"{label} must align to an 8 cm integer cell","{label}必须是三维坐标":"{label} must be a three-dimensional coordinate",格数必须是整数:"Cell count must be an integer",镜像平面无效:"Invalid mirror plane","子网格 ID 无效":"Invalid grid ID",至少选择一个组件才能拆分子网格:"Select at least one component to split into a grid","目标子网格 ID 无效":"Invalid target grid ID",至少选择一个源子网格:"Select at least one source grid","组件 ID 无效或重复：{index}":"Component ID is invalid or duplicated: {index}","节点 ID 无效或重复":"Node ID is invalid or duplicated","梁 ID 无效或重复":"Edge ID is invalid or duplicated",梁引用未知或相同节点:"Edge references an unknown or identical node",梁颜色编号无效:"Edge color index is invalid","梁 RGB 颜色无效":"Edge RGB color is invalid",梁可见性无效:"Edge visibility is invalid","面板 ID 无效或重复":"Plate ID is invalid or duplicated",面板颜色编号无效:"Plate color index is invalid","面板 RGB 颜色无效":"Plate RGB color is invalid",面板类型无效:"Plate type is invalid",面板可见性无效:"Plate visibility is invalid","节点不存在：{id}":"Node does not exist: {id}",不能将节点合并到自身:"Cannot merge a node into itself",合并节点不存在:"A node to merge does not exist","梁不存在：{id}":"Edge does not exist: {id}","面板不存在：{id}":"Plate does not exist: {id}",梁必须连接两个不同节点:"An edge must connect two different nodes",梁已存在:"Edge already exists",梁引用未知节点:"Edge references an unknown node",分割点必须位于梁中心线内部:"Split point must lie inside the edge centre line",面板节点不能重复:"Plate nodes cannot repeat",面板法向偏移无效:"Plate normal offset is invalid","面板引用未知节点：{id}":"Plate references an unknown node: {id}",面板节点不能共线:"Plate nodes cannot be collinear",面板节点必须共面:"Plate nodes must be coplanar",该闭合梁环已有面板或玻璃:"This closed edge loop already has a plate or glass",面板梁不能重复选择:"The same edge cannot be selected twice for a plate","面板引用了未知梁：{id}":"Plate references an unknown edge: {id}","选择的梁必须组成单一闭合环，且不能分支":"Selected edges must form one closed loop without branches",面板至少需要选择三根梁:"A plate needs at least three edges",选择的梁未形成闭合环:"Selected edges do not form a closed loop",选择的梁未形成单一闭合环:"Selected edges do not form a single closed loop",选择的梁必须组成单一闭合环:"Selected edges must form a single closed loop"};JM(RS);const Md=_S(()=>window.localStorage,location.pathname),kl=Md.loadSettings(),ne=kl.settings;np(ne.language);let Sd=!1,Hl=null,bd=null;const N=n=>document.querySelector(n),ai=["x","y","z"],Ed=new sM("./",new pf),Xt=new uS("./");let za=new Map,An="",Ct=null,Ht=new Set,Mt=[],qe=!0,Le="select",us=null,wd=!1,_n=null,Js=null,re={nodes:[],edges:[],plates:[],links:[]};const Nt=new OM({objects:[],topology:re},"初始状态");let cn=null,Tn=ne.nodesVisible,Dr=!0;const PS=12;let Ri=ne.gridVisible,ci=[],Gi=null,gn=null,oi=new Set,Rn=[],Td=null,Xi=null,Ma=null,qt=null,Vl="",$s="",la=0,tt=!1,Sa=null;N("#app").innerHTML='<header class="topbar"><div class="brand" aria-label="ANYMAKER builder by BKN"><strong>ANYMAKER</strong><small>builder by BKN</small></div><select id="language-select" data-i18n-aria-label="界面语言"><option value="en">English</option><option value="zh">中文</option></select><span class="status" id="save-status" role="status" data-i18n="正在加载定义…"></span><section class="section top-tool-section"><h2 data-i18n="编辑工具"></h2><div class="tool-grid" id="tools"></div></section><nav class="top-actions"><button id="library-btn" data-i18n="导入本地载具"></button><button id="new-btn" data-i18n="新建"></button><button id="undo-btn" data-i18n="撤销"></button><button id="redo-btn" data-i18n="重做"></button><button id="save-btn" data-i18n="保存载具"></button><button id="export-btn" class="primary" data-i18n="中间格式 XML"></button></nav></header><main class="workspace" id="workspace"><button id="left-sidebar-toggle" class="sidebar-toggle left-toggle" aria-controls="left-sidebar" aria-expanded="true" aria-keyshortcuts="Tab" data-i18n-title="收起方块库（在视口按 Tab 也可切换）" data-i18n="收起方块库"></button><aside id="left-sidebar" class="sidebar left-sidebar" data-i18n-aria-label="方块库"><details id="catalog-drawer" class="drawer-section" open><summary data-i18n="方块库"></summary><section class="section"><h2><span data-i18n="组件定义"></span> <span id="catalog-count"></span></h2><input class="search" id="component-search" data-i18n-aria-label="搜索组件" data-i18n-placeholder="搜索中文、原始 ID、类别…"><select id="category-filter" data-i18n-aria-label="组件分类"><option value="" data-i18n="全部分类"></option></select><label class="catalog-visibility"><input id="show-building-furniture" type="checkbox"><span data-i18n="显示建材与家具"></span></label><div id="component-list"></div></section></details></aside><div id="left-sidebar-resizer" role="separator" aria-orientation="vertical" aria-controls="left-sidebar" data-i18n-aria-label="调整方块库宽度" aria-valuemin="240" aria-valuemax="720" aria-valuenow="304" tabindex="0"></div><section id="viewport" tabindex="0" data-i18n-aria-label="三维建造视口"><button id="right-sidebar-toggle" class="sidebar-toggle right-toggle" aria-controls="right-sidebar" aria-expanded="false" data-i18n="打开右侧面板"></button><div class="view-controls"><button data-view="iso" data-i18n="等距"></button><button data-view="top" data-i18n="顶视"></button><button data-view="front" data-i18n="前视"></button><button id="fit-btn" data-i18n="聚焦 F"></button></div><div class="hud"><span class="badge" id="object-count"></span><span class="badge" id="vehicle-size"></span><span id="topology-count" hidden></span><span class="badge" id="cursor-pos" data-i18n="工作平面 Y = 0"></span></div></section><aside id="right-sidebar" class="sidebar right-sidebar" data-i18n-aria-label="编辑器面板" hidden><section id="grid-settings" class="section"><h2 data-i18n="工作网格 · 编辑器参数"></h2><p class="status" data-i18n="固定单位网格：1 格 = 8 cm；手动编辑位置为整数格，原生子网格投影可保留小数。"></p><button id="grid-btn" aria-pressed="true" data-i18n="隐藏网格"></button><p class="status"><span data-i18n="左键：当前工具 · 右键拖动：旋转视角"></span><br><span data-i18n="中键：平移 · 滚轮：缩放 · F：聚焦"></span><br><span data-i18n="Shift + 点击连续放置 · Ctrl / ⌘ + Z：撤销"></span></p></section><details class="drawer-section inspector-drawer"><summary data-i18n="选中方块属性"></summary><section class="section"><div id="inspector-content" class="empty"></div></section></details><details class="drawer-section" id="resource-drawer"><summary data-i18n="资源与校验"></summary><section class="section"><h2 data-i18n="资源状态"></h2><p class="status" id="asset-status" data-i18n="尚未导入 Mesh。橙色线框仅是缺失资源标记，不代表游戏尺寸。"></p><button id="mesh-files-btn" class="full" data-i18n="选择 .mesh 文件"></button><p class="status" data-i18n="推荐选择游戏的 rom/meshes 文件夹。只在浏览器读取，不上传、不执行 EXE。仅渲染静态 Mesh，动态部件数量会单独提示。"></p></section><section class="section"><h2 data-i18n="本地原生载具"></h2><button id="native-btn" class="full" data-i18n="选择配套 .data / .meta"></button><p class="status" id="native-summary" data-i18n="选择同名的 .data 与 .meta JSON 文件。浏览器只读取，不上传；校验后立即替换当前场景。"></p></section><section class="section"><h2 data-i18n="校验"></h2><div id="validation" class="status"></div></section></details></aside></main><input id="mesh-input" type="file" accept=".mesh" multiple hidden><input id="file-input" type="file" accept=".json" hidden><input id="native-input" type="file" accept=".data,.meta" multiple hidden><button id="project-save-btn" type="button" hidden></button>';hn(document);const ii=document.createElement("span");ii.id="component-id-tooltip";ii.hidden=!0;document.body.append(ii);const rr=document.createElement("button");rr.id="native-export-btn";rr.className="full";it(rr,"保存载具 (.data / .meta)");rr.disabled=!0;const hi=document.createElement("button");hi.id="native-reference-preview-btn";hi.className="full";hi.disabled=!0;hi.setAttribute("aria-pressed","false");it(hi,"参考预览");hi.dataset.i18nTitle="隐藏编辑辅助并使用黑色背景；仅用于与参考截图进行人工对照，不代表游戏渲染已经匹配";document.querySelector("#native-btn").parentElement.append(hi,rr);const mo=document.createElement("section");mo.id="connection-settings";mo.className="section";mo.innerHTML='<h2 data-i18n="连接工具"></h2><label for="connection-kind" data-i18n="连接类型"></label><select id="connection-kind" class="full"><option value="electric" data-i18n="电线"></option><option value="mechanical" data-i18n="机械连接"></option><option value="liquid" data-i18n="液体管线"></option><option value="gas" data-i18n="气体管线"></option><option value="belt" data-i18n="皮带"></option><option value="data" data-i18n="数据线"></option></select><div class="transform-grid connection-ports"><label><span data-i18n="起点端口"></span><input id="connection-from-port" type="number" min="0" max="255" step="1" value="0"></label><label><span data-i18n="终点端口"></span><input id="connection-to-port" type="number" min="0" max="255" step="1" value="0"></label></div><p class="status" data-i18n="连接工具说明"></p>';N("#right-sidebar").insertBefore(mo,N("#resource-drawer"));hn(mo);const sr=document.createElement("section");sr.id="paint-toolbar";sr.className="context-toolbar";sr.hidden=!0;sr.innerHTML='<strong data-i18n="涂色色板"></strong><div id="paint-quick-colors" class="quick-colors"></div><label><input id="paint-toolbar-color" type="color" value="#bd2636" aria-label="Hex RGB color"><input id="paint-toolbar-hex" type="text" value="#bd2636" maxlength="7" spellcheck="false" aria-label="Hex RGB color"></label><button id="save-paint-quick-color" type="button" data-i18n="保存快捷颜色"></button>';hn(sr);const pi=document.createElement("section");pi.id="connection-toolbar";pi.className="context-toolbar";pi.hidden=!0;pi.innerHTML='<strong data-i18n="连接类型"></strong><div id="connection-kind-buttons" class="connection-kind-buttons"></div><span class="context-help" data-i18n="点击组件端口作为起点，再点击兼容端口完成连接。"></span>';for(const[n,e]of[["electric","电线"],["mechanical","机械连接"],["liquid","液体管线"],["gas","气体管线"],["belt","皮带"],["data","数据线"]]){const t=document.createElement("button");t.type="button",t.dataset.kind=n,t.dataset.i18n=e,t.addEventListener("click",()=>{N("#connection-kind").value=n,Xd()}),pi.querySelector("#connection-kind-buttons").append(t)}hn(pi);const or=document.createElement("section");or.id="transparency-toolbar";or.className="context-toolbar";or.hidden=!0;or.innerHTML='<strong data-i18n="透明化组"></strong><label class="transparency-group-save"><input id="transparency-group-name" type="text" maxlength="80" data-i18n-placeholder="组名称" placeholder="Group name"><button id="save-transparency-group" type="button" data-i18n="保存当前透明化为组"></button></label><div id="transparency-groups" class="transparency-groups"></div><span class="context-help" data-i18n="组会保存当前已透明化的组件、梁和面板；可随时按组隐藏或恢复。"></span>';hn(or);const Zn=N("#workspace");Zn.append(sr,pi,or);const Qi=N("#left-sidebar"),Ei=N("#left-sidebar-toggle"),Kn=N("#left-sidebar-resizer"),kr=N("#right-sidebar"),wi=N("#right-sidebar-toggle");kr.prepend(N("#resource-drawer"));kr.prepend(N(".inspector-drawer"));const ar=document.createElement("details");ar.id="history-drawer";ar.className="drawer-section";ar.innerHTML='<summary data-i18n="历史记录"></summary><section class="section"><p class="status" data-i18n="最近 50 次已提交操作。选择任一项即可恢复到该状态。"></p><div id="history-list" class="history-list"></div></section>';hn(ar);kr.insertBefore(ar,N("#grid-settings"));const Qs={min:240,max:720,viewport:360};let Pi=ne.leftWidth,ba=!1;Zn.prepend(N(".top-tool-section"));N("#export-btn").className="full";N("#resource-drawer").append(N("#export-btn"));N("#save-btn").classList.add("primary");for(const n of[Ei,wi])n.removeAttribute("data-i18n");function Gl(){const n=kr.hidden?0:304;return Math.max(Qs.min,Math.min(Qs.max,Zn.clientWidth-n-Qs.viewport-8))}function Ba(n){Pi=Math.round(Math.min(Gl(),Math.max(Qs.min,n))),Zn.style.setProperty("--left-sidebar-width",Qi.hidden?"0px":Pi+"px"),Kn.setAttribute("aria-valuenow",String(Pi)),Kn.setAttribute("aria-valuemax",String(Gl())),Lt()}function Ad(n,{focusToggle:e=!1}={}){Qi.hidden=n,Kn.hidden=n,Zn.style.setProperty("--left-sidebar-width",n?"0px":Pi+"px"),Zn.style.setProperty("--left-resizer-width",n?"0px":"8px"),Ei.textContent=n?"›":"‹",Ei.dataset.i18nTitle=n?"展开方块库（在视口按 Tab 也可切换）":"收起方块库（在视口按 Tab 也可切换）",Ei.dataset.i18nAriaLabel=n?"展开方块库":"收起方块库",hn(Ei),Ei.setAttribute("aria-expanded",String(!n)),e&&Ei.focus({preventScroll:!0}),Lt()}function Cd(n){kr.hidden=!n,Zn.classList.toggle("right-sidebar-open",n),wi.textContent=n?"›":"‹",wi.dataset.i18nAriaLabel=n?"收起右侧面板":"打开右侧面板",wi.dataset.i18nTitle=wi.dataset.i18nAriaLabel,hn(wi),wi.setAttribute("aria-expanded",String(n)),Lt(),requestAnimationFrame(()=>{Ba(Pi),$d()})}Ei.onclick=()=>Ad(!Qi.hidden);wi.onclick=()=>Cd(kr.hidden);Kn.addEventListener("pointerdown",n=>{n.button!==0||n.pointerType!=="mouse"||(n.preventDefault(),n.stopPropagation(),ba=!0,Zn.classList.add("is-resizing"),Kn.setPointerCapture(n.pointerId))});Kn.addEventListener("pointermove",n=>{if(!ba)return;const e=Zn.getBoundingClientRect();Ba(n.clientX-e.left)});function dp(n){ba&&(ba=!1,Zn.classList.remove("is-resizing"),Kn.hasPointerCapture(n.pointerId)&&Kn.releasePointerCapture(n.pointerId))}Kn.addEventListener("pointerup",dp);Kn.addEventListener("pointercancel",dp);Kn.addEventListener("keydown",n=>{const e=n.key==="ArrowLeft"?Pi-16:n.key==="ArrowRight"?Pi+16:n.key==="Home"?Qs.min:n.key==="End"?Gl():null;e!==null&&(n.preventDefault(),Ba(e))});new ResizeObserver(()=>{Qi.hidden||Ba(Pi)}).observe(Zn);const up=[["select","选择","V"],["place","放置","P"],["erase","删除","E"],["translate","移动","G"],["rotate","旋转","R"],["scale","缩放","S"],["node","节点","N"],["edge","梁","B"],["split","切分梁","I"],["plate","面板","L"],["glass","玻璃","J"],["connect","连接","K"],["paint","涂色","C"],["hide","透明化","H"]];for(const[n,e,t]of up){const i=document.createElement("button");i.className="tool",i.dataset.tool=n;const r={select:"↖",place:"＋",erase:"⌫",translate:"✥",rotate:"⟳",scale:"⤢",node:"●",edge:"／",split:"✂",plate:"◇",glass:"◫",connect:"⌁",paint:"◈",hide:"◌"};i.innerHTML='<span class="tool-icon">'+r[n]+'</span><span class="tool-label" data-i18n="'+e+'"></span><kbd>'+t+"</kbd>",i.dataset.i18nTitle=e,hn(i),i.addEventListener("click",()=>Ui(n)),N("#tools").append(i)}const DS=[["copy-action","⧉","复制选中"],["mirror-action","⇋","镜像 X"],["split-action","⌘","拆分子网格"],["merge-action","⊕","合并子网格"]],hp=N("#tools");for(const[n,e,t]of DS){const i=document.createElement("button");i.id=n,i.className="icon-action",i.dataset.i18nTitle=t,i.dataset.i18nAriaLabel=t,i.textContent=e,hn(i),hp.append(i)}const mi=document.createElement("button");mi.id="restore-transparency";mi.className="transparency-reset";mi.hidden=!0;mi.dataset.i18n="取消透明化";mi.dataset.i18nTitle="取消透明化";mi.dataset.i18nAriaLabel="取消透明化";hn(mi);hp.append(mi);const yn=N("#viewport"),jt=new Ag;jt.background=new je(ne.backgroundColor);const ws=new jn;ws.name="interaction-highlights";jt.add(ws);const Rd=new wn(45,1,.005,2e3),Pd=new ad(-1,1,1,-1,.005,2e3);let Be=Rd;Be.position.set(2.5,2.2,3);Pd.position.copy(Be.position);jt.add(Rd,Pd);const er=new Og(16777215,ne.cameraLightIntensity,40,Ar.degToRad(52),.78,.35),ao=new yt;er.name="editor-camera-light";er.castShadow=!1;er.position.set(0,0,0);ao.position.set(0,0,-1);er.target=ao;Be.add(er,ao);let Ot;try{Ot=new Ey({antialias:!0,alpha:!0,logarithmicDepthBuffer:!0})}catch{throw it(yn,"无法初始化 WebGL2。请启用硬件加速或更换浏览器。"),new Error("WebGL2 unavailable")}Ot.setPixelRatio(Math.min(devicePixelRatio,2));Ot.shadowMap.enabled=!0;Ot.shadowMap.type=Uh;yn.append(Ot.domElement);const Tt=new Ty(Be,Ot.domElement);Tt.mouseButtons={LEFT:null,MIDDLE:ji.PAN,RIGHT:ji.ROTATE};Tt.enableDamping=!0;Tt.target.set(0,.2,0);const nt=new By(Be,Ot.domElement);nt.setSize(.75);jt.add(nt.getHelper());nt.addEventListener("dragging-changed",n=>{if(Tt.enabled=!n.value,n.value){wd=!0;const e=nt.object?.userData?.topology==="node"?nt.object.userData.nodeId:null;Xi=e&&Le==="translate"?{nodeId:e}:null;return}if(Xi){const{nodeId:e}=Xi;Xi=null;try{const t=Li(nt.object?.position);if(!t)throw new Error("节点位置超出整数格范围");const i=Vf(re,e,t);xn(i,i.merged?"已移动并合并节点":"已移动节点"),Ea(i.idMap[e]||e)}catch(t){On("移动节点失败：{error}",t)}}else un(),fi()});nt.addEventListener("objectChange",()=>{!Xi||nt.object?.userData?.nodeId!==Xi.nodeId||US(Xi.nodeId,nt.object.position)});const fp=new Ng(12969215,2504782,1.1);jt.add(fp);const _s=new zg(16777215,ne.lightIntensity);_s.castShadow=!0;_s.shadow.mapSize.set(2048,2048);jt.add(_s);function LS(n){er.removeFromParent(),ao.removeFromParent(),n.add(er,ao)}function pp(){const n=Ar.degToRad(ne.lightAzimuth),e=Ar.degToRad(ne.lightElevation),t=8;_s.position.set(Math.cos(e)*Math.cos(n)*t,Math.sin(e)*t,Math.cos(e)*Math.sin(n)*t),_s.intensity=ne.lightIntensity,_s.shadow.radius=ne.lightSoftness,fp.intensity=Math.max(.05,1.35-ne.shadowStrength*1.05),er.intensity=ne.cameraLightEnabled?ne.cameraLightIntensity:0}pp();const Hr=new kg($f,GM,4351872,2110277);Hr.position.set(-pt/2,-.002,-pt/2);jt.add(Hr);const Ft=new jn;Ft.name="topology-overlay";jt.add(Ft);const Lr=new jn;Lr.name="connection-ports";jt.add(Lr);const ri={node:new di({color:ne.nodeColor,transparent:ne.nodeOpacity<1,opacity:ne.nodeOpacity,depthTest:!0,depthWrite:!1}),nodeSelected:new di({color:14776349,transparent:ne.nodeOpacity<1,opacity:ne.nodeOpacity,depthTest:!0,depthWrite:!1}),edge:new Rr({color:zl,metalness:.05,roughness:.85}),plate:new Rr({color:zl,metalness:.05,roughness:.85,side:en,depthTest:!0,depthWrite:!0})},dn=new of;dn.params.Line.threshold=.06;const Ts=new Ne,mp=new ti(new w(0,1,0),0),Ir=ep(new w,new w,new Rr({color:zl,transparent:!0,opacity:.5,depthWrite:!1}),{outlined:ne.edgeOutlinesVisible}),Nr=tS(yn,()=>Be),co=nS(yn,()=>Be);let vs=ne.edgeAxisSnap,lo=null,go=!1;const Ur=new oe(new zr(.07,12,8),new di({color:14124580,depthTest:!1}));Ur.visible=!1;Ur.renderOrder=3;jt.add(Ir,Ur);const Ni=document.createElement("span");Ni.id="build-status";Ni.className="badge";Ni.hidden=!0;N(".hud").append(Ni);function IS(n){return new je(yd(n))}function Bc(n,e,t,i=en,{depthWrite:r=!0,depthLayer:s=Nn.edge,depthKey:o=""}={}){const a=typeof n!="string"&&!Number.isInteger(e)&&i===en&&r?t.clone():new Rr({color:typeof n=="string"?n:Number.isInteger(e)?IS(e):t.color,metalness:.05,roughness:.85,side:i,depthTest:!0,depthWrite:r});return Fa(a,s,{key:o}),a.userData.topologyPaint=!0,a}const Rh=.001;function NS(n){return n+(n<0?-Rh:Rh)}function gp(n,e,t=pt/2){const i=n.map(o=>e.get(o)),r=new w;for(let o=1;o<i.length-1&&r.lengthSq()===0;o++)for(let a=o+1;a<i.length&&(r.copy(i[o]).sub(i[0]).cross(i[a].clone().sub(i[0])),!(r.lengthSq()>0));a++);r.normalize().multiplyScalar(NS(t));const s=[];for(let o=1;o<i.length-1;o++)for(const a of[i[0],i[o],i[o+1]])s.push(...a.clone().add(r).toArray());return s}function _p(n=Ft){const e=new Set;n.traverse(t=>{t.geometry?.dispose();for(const i of Array.isArray(t.material)?t.material:[t.material])(i?.userData?.topologyPaint||i?.userData?.topologyLink||i?.userData?.topologyOutline)&&!e.has(i)&&(e.add(i),i.dispose())}),n.clear()}function ka(n,e=new Map){const t=new jn;try{const i=new Map(n.nodes.map(r=>[r.id,r]));for(const r of n.nodes){const s=new oe(new zr(.055,10,8),ri.node);s.position.set(r.position.x,r.position.y,r.position.z),s.userData.topology="node",s.userData.nodeId=r.id,s.visible=Tn&&Dr&&!tt,s.renderOrder=2,t.add(s)}for(const r of n.edges){const s=`edge:${r.id}`,o=ep(i.get(r.a).position,i.get(r.b).position,Bc(r.color,r.col,ri.edge,en,{depthLayer:Nn.edge,depthKey:s}),{outlined:ne.edgeOutlinesVisible});o.userData.topology="edge",o.userData.edgeId=r.id,o.castShadow=!0,o.receiveShadow=!0,Bl(o,Nn.edge,{key:s}),o.visible=!r.hidden,t.add(o)}for(const r of n.plates){const s=`plate:${r.id}`,o=new Map(n.nodes.map(g=>[g.id,new w(g.position.x,g.position.y,g.position.z)])),a=r.normalOffset??pt/2,l=gp(r.nodeIds,o,a),c=new Ut;c.setAttribute("position",new dt(l,3)),c.computeVertexNormals();const u=typeof r.color_front=="string"||typeof r.color_back=="string"||Number.isInteger(r.col_front)||Number.isInteger(r.col_back),d=fS(r);u&&(c.addGroup(0,l.length/3,0),c.addGroup(0,l.length/3,1));let h=u?[Bc(r.color_front,r.col_front,ri.plate,Di,{depthWrite:!d,depthLayer:Nn.plate,depthKey:s}),Bc(r.color_back,r.col_back,ri.plate,ln,{depthWrite:!d,depthLayer:Nn.plate,depthKey:s})]:ri.plate.clone();for(const g of Array.isArray(h)?h:[h])g.userData.topologyPaint=!0,d||Fa(g,Nn.plate,{key:s});if(d)for(const g of Array.isArray(h)?h:[h])g.transparent=!0,g.opacity=.42,g.depthTest=!0,g.depthWrite=!1;const p=new oe(c,h);p.userData.topology="plate",p.userData.plateId=r.id,p.userData.nodeIds=[...r.nodeIds],p.userData.normalOffset=a,p.visible=!r.hidden,d?p.renderOrder=4:Bl(p,Nn.plate,{key:s}),t.add(p)}for(const r of n.links||[]){const s=e.get(r.from.componentId),o=e.get(r.to.componentId);if(!s||!o)continue;const a=[s,...r.points||[],o].map(d=>new w(d.x,d.y,d.z)),l={electric:{radius:.012,radialSegments:8},mechanical:{radius:.022,radialSegments:8},liquid:{radius:.02,radialSegments:10},gas:{radius:.018,radialSegments:10},belt:{radius:.028,radialSegments:4},data:{radius:.01,radialSegments:8}}[r.kind],c=new Rr({color:Bf[r.kind],metalness:.1,roughness:.6,transparent:!0,opacity:.92,depthTest:!0,depthWrite:!1});c.userData.topologyLink=!0;const u=$M(a,c,l);u.renderOrder=4,u.userData.topology="link",u.userData.linkId=r.id,u.traverse(d=>{d.userData.topology="link",d.userData.linkId=r.id}),t.add(u)}return t}catch(i){throw _p(t),i}}function vp(n){return Ft.children.find(e=>e.userData.topology==="node"&&e.userData.nodeId===n)||null}function US(n,e){const t=new w(e.x,e.y,e.z),i=new Map(re.nodes.map(r=>[r.id,new w(r.position.x,r.position.y,r.position.z)]));i.set(n,t);for(const r of Ft.children){if(r.userData.topology==="node"&&r.userData.nodeId===n&&r.position.copy(t),r.userData.topology==="edge"){const s=re.edges.find(o=>o.id===r.userData.edgeId);s&&!r.userData.topologyJunction&&gd(r,i.get(s.a),i.get(s.b)),r.userData.topologyJunction&&r.userData.nodeId===n&&r.position.copy(t)}if(r.userData.topology==="plate"){const s=r.userData.nodeIds,o=gp(s,i,r.userData.normalOffset),a=r.geometry.getAttribute("position");a.count===o.length/3?a.set(o):r.geometry.setAttribute("position",new dt(o,3)),r.geometry.getAttribute("position").needsUpdate=!0,r.geometry.computeVertexNormals()}}Ft.updateMatrixWorld(!0)}function Vr(){for(const n of Ft.children){if(n.userData.topology!=="node")continue;const e=n.userData.nodeId===gn;n.material=e?ri.nodeSelected:ri.node,n.scale.setScalar((e?1.75:1)*(ne.nodeSize/.055)),n.visible=Tn&&Dr&&!tt}}function Ha(n){_p(),Ft.add(...n.children),Ft.updateMatrixWorld(!0),xp(),Vr(),co.setEdges(re.nodes,re.edges),co.setVisible(!tt&&ne.edgeLengthsVisible)}function xp(){const n=Mt.map(e=>({object:e,layer:Nn.component,key:`component:${e.userData.id}`}));for(const e of Ft.children)e.userData.topology==="edge"&&n.push({object:e,layer:Nn.edge,key:`edge:${e.userData.edgeId}`}),e.userData.topology==="plate"&&n.push({object:e,layer:Nn.plate,key:`plate:${e.userData.plateId}`});CS(n)}function OS(){const e=Be.position.distanceTo(Tt.target)/(Be.isOrthographicCamera?Math.max(Be.zoom,.001):1)<=PS;e!==Dr&&(Dr=e,Hr.visible=Ri&&!tt&&e,Vr())}function tr(){nt.object?.userData?.topology==="node"&&nt.detach(),gn=null,Td=null,Xi=null,Vr()}function Ea(n){const e=re.nodes.find(t=>t.id===n);if(!e)return!1;if(Ct=null,Ht.clear(),oi.clear(),gn=e.id,Td=Ua(Be,new w(e.position.x,e.position.y,e.position.z)),Vr(),Le==="translate"){const t=vp(e.id);t&&(nt.setMode("translate"),nt.attach(t))}return fi(),!0}function Va(){cn=null,lo=null,Ir.visible=!1,Ur.visible=!1,Nr.hide(),it(Ni,"梁 1 格 · 点击起点")}function Dd(){Va(),tr(),ci=[],Gi=null,nr()}function Fe(n,e={}){it(N("#save-status"),n,e)}function On(n,e){Fe(n,()=>({error:Ae(e.message)}))}function Wl(n){return(Ji()==="zh"?n.name_zh||n.name:n.name||n.name_zh)||n.id}function Xl(n){return Ji()==="zh"?xd(n).label:n}function kc(){ii.hidden=!0}function Ph(n){ii.textContent=n.dataset.id||"",ii.hidden=!1;const e=n.getBoundingClientRect(),t=ii.offsetWidth;ii.style.left=Math.max(12,Math.min(window.innerWidth-t-12,e.left+e.width/2-t/2))+"px",ii.style.top=Math.max(8,e.top-ii.offsetHeight-7)+"px"}function _o(){return Mt.filter(n=>Ht.has(n.userData.id))}function vo(){return _o().map(n=>n.userData.id)}function FS(n,e){return`${n}:${e}`}function zS(n,e){return Ft.children.find(t=>t.userData.topology===n&&t.userData[`${n}Id`]===e)||null}function Ld(){return[...oi].map(n=>{const e=n.indexOf(":");return e<0?null:zS(n.slice(0,e),n.slice(e+1))}).filter(Boolean)}function yp(){oi.clear()}function Mp(n=Rn,e=nn(),t=re){const i=new Set(e.map(o=>o.id)),r=new Set((t.edges||[]).map(o=>o.id)),s=new Set((t.plates||[]).map(o=>o.id));return(n||[]).map(o=>({...o,components:(o.components||[]).filter(a=>i.has(a)),edges:(o.edges||[]).filter(a=>r.has(a)),plates:(o.plates||[]).filter(a=>s.has(a))})).filter(o=>o.components.length||o.edges.length||o.plates.length)}function BS(){Lr.traverse(n=>{n.geometry?.dispose(),n.material?.dispose()}),Lr.clear()}function nr(){if(BS(),Le!=="connect"||tt){N("#viewport").dataset.connectionPortCount="0";return}const n=N("#connection-kind").value,e=Bf[n],t=i=>{const s=(Array.isArray(i?.logic_nodes)?i.logic_nodes:[]).map((o,a)=>({...o,port:a})).filter(o=>o.type===n||n==="mechanical"&&typeof o.type=="string"&&o.type.startsWith("mechanical_"));return s.length||n!=="mechanical"?s:(i?.surfaces||[]).map((o,a)=>({...o,port:a})).filter(o=>typeof o.type=="string"&&o.type.startsWith("torque"))};for(const i of Mt){if(!i.visible)continue;const r=t(za.get(i.userData.type));r.length&&(i.updateWorldMatrix(!0,!1),r.forEach(s=>{const o=Array.isArray(s.pos)&&s.pos.length===3?s.pos:[0,0,0];if(!o.every(Number.isFinite))return;const a=s.port,l=new oe(new zr(.055,10,8),new di({color:e,transparent:ne.nodeOpacity<1,opacity:ne.nodeOpacity,depthTest:!1,depthWrite:!1}));l.position.set(o[0]*pt,o[1]*pt,o[2]*pt),i.localToWorld(l.position),l.scale.setScalar(ne.nodeSize/.055),l.renderOrder=7,l.userData.connectionPort={componentId:i.userData.id,port:a,type:s.type||"surface"},Lr.add(l)}))}N("#viewport").dataset.connectionPortCount=String(Lr.children.length)}function kS(){return dn.intersectObjects(Lr.children,!0)[0]?.object.userData.connectionPort||null}function HS(){ws.traverse(n=>{n.geometry?.dispose(),n.material?.dispose()}),ws.clear()}function Is(n=Sa){if(HS(),!["select","erase"].includes(Le)){N("#viewport").dataset.interactionHighlightCount="0";return}const e=(t,i)=>{if(!t)return;const r=new Hg(t,i);r.material.depthTest=!1,r.material.transparent=!0,r.material.opacity=.9,r.renderOrder=8,ws.add(r)};if(Le==="select"){for(const t of _o())e(t,2590709);for(const t of Ld())e(t,2590709)}e(n,Le==="erase"?15026253:15770153),N("#viewport").dataset.interactionHighlightCount=String(ws.children.length)}function Ui(n){if(!qe){if(Le=n,Lt(),document.querySelectorAll(".tool").forEach(e=>e.classList.toggle("active",e.dataset.tool===Le)),sr.hidden=n!=="paint"||tt,pi.hidden=n!=="connect"||tt,or.hidden=n!=="hide"||tt,nt.detach(),n!=="place"?YS():Ma&&go&&wp(Ma),n!=="edge"&&Va(),Ni.hidden=n!=="edge",n==="edge"&&!cn&&it(Ni,"梁 1 格 · 点击起点"),["plate","glass"].includes(n)||(ci=[]),n!=="connect"&&(Gi=null),["node","translate"].includes(n)||tr(),Ct&&Ht.size===1&&["translate","rotate","scale"].includes(Le))nt.setMode(Le),nt.attach(Ct);else if(Le==="translate"&&gn){const e=vp(gn);e&&(nt.setMode("translate"),nt.attach(e))}nr(),Is()}}function VS(){nt.setTranslationSnap(pt),nt.setRotationSnap(Math.PI/2),nt.setScaleSnap(null)}function As(n,{toggle:e=!1}={}){if(tr(),yp(),!n)Ct=null,Ht.clear();else if(e){const t=n.userData.id;Ht.has(t)?Ht.delete(t):Ht.add(t),Ct=Ht.has(t)?n:_o()[0]||null}else Ct=n,Ht=new Set([n.userData.id]);Ui(Le),Is(),fi()}function GS(n,{toggle:e=!1}={}){if(tr(),Ct=null,Ht.clear(),!n)yp();else{const t=FS(n.kind,n.id);e?oi.has(t)?oi.delete(t):oi.add(t):oi=new Set([t])}Ui(Le),Is(),fi()}function nn(){return Mt.map(n=>({id:n.userData.id,type:n.userData.type,...n.userData.gridId?{gridId:n.userData.gridId}:{},...n.userData.mirror?{mirror:{...n.userData.mirror}}:{},...Array.isArray(n.userData.colors)?{colors:[...n.userData.colors]}:{},...n.userData.hidden?{hidden:!0}:{},...Array.isArray(n.userData.nativeExtension)?{nativeExtension:[...n.userData.nativeExtension]}:{},...n.userData.nativeProjected?{nativeProjected:!0}:{},position:n.userData.nativeProjected?Object.fromEntries(ai.map(e=>[e,n.position[e]])):Dt(n.position,"组件位置"),rotation:Object.fromEntries(ai.map(e=>[e,n.rotation[e]])),scale:Object.fromEntries(ai.map(e=>[e,Math.abs(n.scale[e])]))}))}function un(n="编辑",e={}){if(Ct){if(Ct.userData.nativeProjected){if(ai.some(t=>!Number.isFinite(Ct.position[t])||Math.abs(Ct.position[t])>1e4))throw new Error("组件位置超出合法范围")}else{const t=Li(Ct.position);if(!t)throw new Error("组件位置超出整数格范围");Ct.position.set(t.x,t.y,t.z)}ai.forEach(t=>{const i=Math.sign(Ct.scale[t])||1;Ct.scale[t]=i*Ar.clamp(Math.abs(Ct.scale[t]),.001,100)})}Nt.commit(yo(),{key:n,params:e}),re.links?.length&&Ha(ka(re,new Map(nn().map(t=>[t.id,t.position])))),ir()}function WS(){const n=new qn;let e=!1;for(const t of Mt){const i=new qn().setFromObject(t);i.isEmpty()||(n.union(i),e=!0)}for(const t of re.nodes)n.expandByPoint(new w(t.position.x,t.position.y,t.position.z)),e=!0;return e?Object.fromEntries(ai.map(t=>{const i=Math.max(0,Math.ceil(n.max[t]/pt)-Math.floor(n.min[t]/pt));return[t,{cells:i,cm:i*8}]})):null}function Sp(){let n=N("#vehicle-size");if(n)return n;const e=N(".hud");if(!e)return null;n=document.createElement("span"),n.id="vehicle-size",n.className="badge";const t=N("#cursor-pos");return e.insertBefore(n,t||null),n}function XS(){const n=N("#history-list");n.replaceChildren();const e=Math.max(0,Nt.entries.length-50);for(let t=Nt.entries.length-1;t>=e;t--){const i=document.createElement("button");i.type="button",i.className="history-entry";const r=Nt.labels[t],s=r&&typeof r=="object"?Ae(r.key,r.params):Ae(r||"编辑");i.textContent=`${t+1}. ${s}`,i.title=Ae("恢复此状态"),i.setAttribute("aria-label",`${Ae("恢复此状态")} · ${i.textContent}`),i.setAttribute("aria-current",String(t===Nt.cursor)),i.disabled=qe||t===Nt.cursor,i.onclick=()=>eb(t),n.append(i)}}function ir(){it(N("#object-count"),"{count} 个组件",{count:Mt.length});const n=(re.links||[]).length;it(N("#topology-count"),n?"{nodes} 节点 · {edges} 梁 · {plates} 面板 · {links} 连接":"{nodes} 节点 · {edges} 梁 · {plates} 面板",{nodes:re.nodes.length,edges:re.edges.length,plates:re.plates.length,links:n});const e=WS(),t=Sp();t&&(e?t.textContent=`${Ae("载具尺寸")}: ${ai.map(r=>Ae("{axis} {cells} 格 / {cm} cm",{axis:r.toUpperCase(),...e[r]})).join(" · ")}`:t.textContent=`${Ae("载具尺寸")}: ${Ae("空载具")}`,t.dataset.topologyCount=`${re.nodes.length}/${re.edges.length}/${re.plates.length}/${(re.links||[]).length}`),N("#undo-btn").disabled=qe||Nt.cursor===0,N("#redo-btn").disabled=qe||Nt.cursor===Nt.entries.length-1;const i=Mt.filter(r=>r.userData.visual!=="mesh").length;it(N("#validation"),"{geometry} 连接拓扑、占用规则、动态装配和游戏文件兼容性尚未验证。",()=>({geometry:i?Ae("{count} 个组件没有真实 Mesh。",{count:i}):Ae("静态几何已加载。")})),XS(),jS(),Ud()}function jS(){const n=Mt.some(e=>e.userData.hidden)||re.edges.some(e=>e.hidden)||re.plates.some(e=>e.hidden);mi.hidden=!n}async function Zt(n){if(qe)return;qe=!0,nt.enabled=!1,ir();let e=!1;try{await n(),e=!0}catch(t){On("操作失败：{error}",t)}finally{qe=!1,nt.enabled=!0,Ui(Le),ir()}return e}async function bp(n){const e=await Xt.definition(n.type);za.set(n.type,e);const t=await Ed.instantiate(e,{nativeExtension:n.nativeExtension});t.userData={...t.userData,id:n.id,type:n.type,gridId:n.gridId,mirror:n.mirror,colors:n.colors,nativeExtension:n.nativeExtension,nativeProjected:n.nativeProjected===!0,hidden:n.hidden===!0},Number.isInteger(n.colors?.[0])&&t.traverse(i=>{if(i.isMesh&&!i.userData.source?.includes("/car_wheel"))for(const r of Array.isArray(i.material)?i.material:[i.material])r.color.set(yd(n.colors[0]))});for(const i of["position","rotation","scale"])t[i].set(...ai.map(r=>n[i][r]));return n.mirror?.axis&&cM(t,n.mirror.axis),Bl(t,Nn.component,{key:`component:${n.id}`}),t.visible=!n.hidden,t}function Ep(){qt&&(jt.remove(qt),ma(qt),qt=null,Vl="")}function YS(){la++,$s="",Ep()}function Dh(n){if(!qt||!n)return;qt.position.set(n.x,0,n.z),qt.updateMatrixWorld(!0);const e=new qn().setFromObject(qt);qt.position.y=Ls(Math.ceil((n.y-e.min.y)/pt)),qt.visible=!0,qt.updateMatrixWorld(!0)}function qS(n){return n.traverse(e=>{if(!e.isMesh)return;const i=(Array.isArray(e.material)?e.material:[e.material]).map(r=>{const s=r.clone();return s.transparent=!0,s.opacity=Math.min(s.opacity,.35),s.depthWrite=!1,s.needsUpdate=!0,s});e.material=Array.isArray(e.material)?i:i[0],e.castShadow=!1,e.receiveShadow=!1,e.renderOrder=1}),n}async function wp(n){if(Le!=="place"||!n||!Xt.has(An)){qt&&(qt.visible=!1);return}if(qt&&Vl===An){Dh(n);return}if($s===An)return;const e=An,t=++la;$s=e,Ep();try{const i=await Xt.definition(e),r=qS(await Ed.instantiate(i));if(t!==la||Le!=="place"||e!==An){ma(r);return}$s="",qt=r,Vl=e,jt.add(r),Dh(Ma||n)}catch(i){t===la&&($s="",On("放置虚影加载失败：{error}",i))}}async function kn(n,e=re,t=Rn){tt&&zd(!1),t=Mp(t,n,e);const i=Es(Ia(n,e,t),Xt.index),r=[];let s;try{await Promise.all([...new Set(i.objects.map(o=>o.type))].map(async o=>{const a=await Xt.definition(o);za.set(o,a)})),r.push(...await Promise.all(i.objects.map(o=>bp(o)))),s=ka(i.topology,new Map(i.objects.map(o=>[o.id,o.position])))}catch(o){throw r.forEach(ma),o}Dd(),nt.detach(),Ct=null,Ht.clear(),oi.clear(),Mt.forEach(o=>{jt.remove(o),ma(o)}),Mt=r,Mt.forEach(o=>jt.add(o)),re=i.topology,Rn=i.visibilityGroups||[],Ha(s),nr(),fi(),ir()}async function $S(n){if(!Xt.has(An))throw new Error("请先选择组件");if(Mt.length>=va)throw new Error("达到组件上限");const e=await bp({id:crypto.randomUUID(),type:An,gridId:"grid-1",position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1}}),t=Li(n);if(!t)throw new Error("放置位置超出整数格范围");const i=new qn().setFromObject(e);e.position.set(t.x,Ls(Math.ceil((t.y-i.min.y)/pt)),t.z),jt.add(e),Mt.push(e),xp(),As(e),un("放置组件"),fi(),Fe(e.userData.visual==="mesh"?"已放置真实静态 Mesh":"已放置缺失资源标记")}async function wa(n){if(!n)return;const e=Ht.has(n.userData.id)?vo():[n.userData.id],t=BM(nn(),e);await kn(t.objects,{...re,links:(re.links||[]).filter(i=>!e.includes(i.from.componentId)&&!e.includes(i.to.componentId))}),As(null),un("删除组件"),Fe("已删除 {count} 个组件",{count:t.removed.length})}async function Ga(n,e,t,i={}){await kn(n.objects,re);const r=new Set(e||[]),s=Mt.filter(o=>r.has(o.userData.id));Ht=new Set(s.map(o=>o.userData.id)),Ct=s[0]||null,Ui(Le),fi(),un(t,i),Fe(t,i)}function ZS(){!Ht.size||qe||Zt(async()=>{const n=zM(nn(),vo(),{x:pt,y:0,z:0});await Ga(n,n.created,"已复制 {count} 个组件",{count:n.created.length})})}function KS(){!Ht.size||qe||Zt(async()=>{const n=kM(nn(),vo(),{axis:"x",offset:0});await Ga(n,n.created,"已镜像 {count} 个组件（X 平面）",{count:n.created.length})})}function JS(){if(!Ht.size||qe)return;const n=prompt(Ae("新子网格 ID"),`grid-${qf(nn()).length+1}`);n&&Zt(async()=>{const e=vo(),t=HM(nn(),e,n);await Ga(t,e,"已将 {count} 个组件拆分到子网格 {gridId}",{count:t.changed,gridId:n})})}function QS(){qe||!Mt.length||Zt(async()=>{const n=nn(),e=qf(n);if(!e.length)throw new Error("当前工程尚未建立子网格");const t=VM(n,e,"grid-1");await Ga(t,vo(),"已合并子网格")})}N("#copy-action").onclick=ZS;N("#mirror-action").onclick=KS;N("#split-action").onclick=JS;N("#merge-action").onclick=QS;mi.onclick=()=>{qe||Zt(ob)};function Tp(){Dd();const n=Nt.peekUndo();n&&Zt(async()=>{await kn(n.objects,n.topology,n.visibilityGroups||[]),Nt.cursor--,Fe("已撤销")})}function jl(){const n=Nt.peekRedo();n&&Zt(async()=>{await kn(n.objects,n.topology,n.visibilityGroups||[]),Nt.cursor++,Fe("已重做")})}function eb(n){if(qe||!Number.isInteger(n)||n<0||n>=Nt.entries.length||n===Nt.cursor)return;const e=structuredClone(Nt.entries[n]);Zt(async()=>{await kn(e.objects,e.topology,e.visibilityGroups||[]),Nt.cursor=n,Fe("已恢复历史记录")})}function fi(){const n=N("#inspector-content");if(n.replaceChildren(),oi.size){const c=Ld(),u=document.createElement("strong");u.textContent=Ae("已选择 {count} 个结构对象",{count:c.length}),n.append(u);const d=c.map(g=>g.userData.topology==="edge"?Ae("梁"):Ae("面板")),h=document.createElement("p");h.className="status",h.textContent=Ae("Shift 点击可同时选择梁和面板。结构编辑命令尚不支持批量变换。"),n.append(h);const p=document.createElement("p");p.className="status",p.textContent=d.join(" · "),n.append(p);return}if(!Ct){n.textContent=Ae("选择组件查看属性。按住 Shift 点击可多选。");return}if(Ht.size>1){const c=document.createElement("strong");c.textContent=Ae("已选择 {count} 个组件",{count:Ht.size}),n.append(c);const u=document.createElement("p");u.className="status",u.textContent=Ae("可批量复制、镜像、拆分或删除。批量变换和框选尚未实现。"),n.append(u);const d=document.createElement("button");d.className="full",d.textContent=Ae("删除已选组件"),d.id="delete-selected",d.onclick=()=>Zt(async()=>{await wa(Ct)}),n.append(d);return}const e=Ct,t=za.get(e.userData.type),i=document.createElement("strong");i.textContent=Wl(t),n.append(i);const r=document.createElement("p");r.className="status",r.textContent=t.id+" · "+Ae("资源诊断：{reason}",{reason:Ae(e.userData.reason||"")})+(e.userData.vertices?" · "+Ae("{vertices} 顶点 / {triangles} 三角形",{vertices:e.userData.vertices,triangles:e.userData.triangles}):"")+" · "+Ae("子网格 {gridId} · 动态部件 {count}（按需装配）",{gridId:e.userData.gridId||Ae("未分配"),count:t.meshes_dynamic?.length||0}),n.append(r);for(const[c,u]of[["position","位置（格；1 格 = 8 cm）"],["rotation","旋转 °"],["scale","缩放比例"]]){const d=document.createElement("div");d.className="property";const h=document.createElement("span");h.textContent=Ae(u),d.append(h);const p=document.createElement("div");p.className="transform-grid";for(const g of ai){const _=document.createElement("label");_.textContent=g.toUpperCase();const m=document.createElement("input");m.type="number",m.step=c==="position"?e.userData.nativeProjected?".001":"1":c==="rotation"?"90":".01",m.dataset.field=c,m.dataset.axis=g,m.setAttribute("aria-label",c+"-"+g);const f=c==="position"?e.userData.nativeProjected?e.position[g]/pt:ui(e.position[g]):c==="rotation"?Ar.radToDeg(e[c][g]):e[c][g];m.value=c==="position"?String(f):Number(f).toFixed(4),m.addEventListener("change",()=>{const S=Number(m.value);if(qe||!m.value.trim()||!Number.isFinite(S)||Math.abs(S)>1e4||c==="position"&&!e.userData.nativeProjected&&!Number.isInteger(S)||c==="scale"&&(S<=0||S>100)){Fe("输入超出合法范围"),fi();return}e[c][g]=c==="position"?Ls(S):c==="rotation"?Ar.degToRad(S):S,un(),fi()}),_.append(m),p.append(_)}d.append(p),n.append(d)}const s=document.createElement("details"),o=document.createElement("summary");o.textContent=Ae("原始定义 / 端口 / 动态部件"),s.append(o);const a=document.createElement("pre");a.textContent=JSON.stringify(t,null,2),s.append(a),n.append(s);const l=document.createElement("button");l.className="full",l.textContent=Ae("删除组件"),l.id="delete-selected",l.onclick=()=>Zt(async()=>{await wa(e)}),n.append(l)}function Gr(){kc();const n=N("#component-search").value.trim().toLowerCase(),e=N("#category-filter").value,t=new Set(["building","furniture"]),i=N("#show-building-furniture").checked,r=N("#component-list");r.replaceChildren();const s=[...Xt.entries()].filter(o=>(i||!t.has(o.category))&&(!e||o.category===e)&&[o.id,o.name,o.name_zh,o.category,xd(o.category).label].join(" ").toLowerCase().includes(n));N("#catalog-count").textContent=s.length+" / "+Xt.index.size;for(const o of s){const a=document.createElement("button");a.className="component",a.dataset.id=o.id,a.dataset.category=o.category,a.classList.toggle("active",An===o.id),a.setAttribute("aria-pressed",String(An===o.id));const l=Wl(o);a.title=l+`
`+o.id+" · "+Xl(o.category),a.setAttribute("aria-label",l+" · "+o.id+" · "+Xl(o.category));const c=document.createElement("span");c.className="component-name",c.textContent=l;const u=document.createElement("code");u.className="component-id",u.textContent=o.id,a.append(hS(o.category),c,u),a.addEventListener("mouseenter",()=>Ph(a)),a.addEventListener("mouseleave",kc),a.addEventListener("focus",()=>Ph(a)),a.addEventListener("blur",kc),a.onclick=()=>{qe||(An=o.id,Ui("place"),Gr(),Fe("准备放置：{name}",()=>({name:Wl(o)})))},r.append(a)}if(!s.length){const o=document.createElement("p");o.className="catalog-empty",o.textContent=Ae("没有匹配组件，试试其他名称或分类。"),r.append(o)}}function Wa(){for(const n of N("#category-filter").options)n.value&&(n.hidden=!N("#show-building-furniture").checked&&["building","furniture"].includes(n.value),n.textContent=Xl(n.value)+(Ji()==="zh"?" · "+n.value:""));N("#category-filter").selectedOptions[0]?.hidden&&(N("#category-filter").value="")}async function tb(){const n=await Xt.load();An=Xt.has("engine")?"engine":Xt.index.keys().next().value;for(const e of[...new Set(n.definitions.map(t=>t.category))].sort()){const t=document.createElement("option");t.value=e,N("#category-filter").append(t)}Wa(),Gr(),Fe("已加载 {count} 条组件索引，详情按需读取",{count:Xt.index.size})}function Id(n){const e=Ot.domElement.getBoundingClientRect();Ts.set((n.clientX-e.left)/e.width*2-1,-(n.clientY-e.top)/e.height*2+1),dn.setFromCamera(Ts,Be)}function Ap(){const n=[...Mt.filter(e=>e.visible),...Ft.children.filter(e=>e.visible&&e.userData.topology!=="node")];return WM(dn,n,mp)}function Ta(){const n=Ot.domElement.getBoundingClientRect();let e=null,t=56;for(const r of Mt){if(!r.visible)continue;const s=r.getWorldPosition(new w).project(Be);if(s.z<-1||s.z>1)continue;const o=Math.hypot((s.x-Ts.x)*n.width/2,(s.y-Ts.y)*n.height/2);o<t&&(e=r,t=o)}if(e)return e;let i=dn.intersectObjects(Mt.filter(r=>r.visible),!0)[0]?.object;for(;i&&!Mt.includes(i);)i=i.parent;return i||null}function Cs(n=!1){if((!Tn||!Dr)&&!n)return null;const e=Ot.domElement.getBoundingClientRect();let t=null,i=14,r=1/0;for(const s of re.nodes){const o=new w(s.position.x,s.position.y,s.position.z),a=o.clone().project(Be);if(a.z<-1||a.z>1)continue;const l=Math.hypot((a.x-Ts.x)*e.width/2,(a.y-Ts.y)*e.height/2),c=o.distanceTo(Be.position);(l<i||l===i&&c<r)&&(t=s.id,i=l,r=c)}return t}function nb(){const n=Cs();if(n)return{kind:"node",id:n};const e=Nd();if(e)return e;const t=dn.intersectObjects(Ft.children.filter(r=>r.visible&&r.userData.topology==="link"),!0)[0];if(!t)return null;const i=t.object.userData.topology;return{kind:i,id:t.object.userData[i+"Id"],point:t.point}}function Nd(){const n=dn.intersectObjects(Ft.children.filter(r=>r.visible&&["edge","plate"].includes(r.userData.topology)),!0),e=n.find(r=>r.object.userData.topology==="edge")||n[0];if(!e)return null;let t=e.object;for(;t&&t.parent!==Ft;)t=t.parent;const i=t?.userData.topology;return["edge","plate"].includes(i)?{kind:i,id:t.userData[`${i}Id`],point:e.point,object:t}:null}function ib(){return Nd()?.object||Ta()}function Cp(){const n=dn.intersectObjects(Ft.children.filter(i=>i.visible&&["edge","plate"].includes(i.userData.topology)),!0),e=n.find(i=>i.object.userData.topology==="edge")||n[0];if(e){const i=e.object.userData.topology;return{kind:i,id:e.object.userData[i+"Id"]}}let t=null;for(const i of re.edges){if(i.hidden)continue;const r=re.nodes.find(a=>a.id===i.a)?.position,s=re.nodes.find(a=>a.id===i.b)?.position;if(!r||!s)continue;const o=dn.ray.distanceSqToSegment(new w(r.x,r.y,r.z),new w(s.x,s.y,s.z));o>pt**2||t&&o>=t.distanceSq||(t={kind:"edge",id:i.id,distanceSq:o})}return t&&{kind:t.kind,id:t.id}}function rb(){const n=Cp();if(!n){Fe("涂色工具需要点击梁或面板");return}const e=$a();if(!e){Fe("颜色必须是 #RRGGBB 格式");return}if(n.kind==="edge"){xn({...re,edges:re.edges.map(r=>r.id===n.id?{...r,color:e}:r)},"已为梁设置颜色 {color}",{color:e});return}const t=N("#paint-side").value,i=t==="back"?"color_back":"color_front";xn({...re,plates:re.plates.map(r=>r.id===n.id?{...r,[i]:e}:r)},t==="back"?"已为面板背面设置颜色 {color}":"已为面板前面设置颜色 {color}",{color:e})}function sb(){const n=_o().filter(i=>i.visible);if(n.length){for(const i of n)i.userData.hidden=!0,i.visible=!1;return As(null),un("已透明化 {count} 个对象",{count:n.length}),Fe("已透明化 {count} 个对象",{count:n.length}),!0}const e=Cp();if(e?.kind==="edge")return xn({...re,edges:re.edges.map(i=>i.id===e.id?{...i,hidden:!0}:i)},"已透明化 {count} 个对象",{count:1}),!0;if(e?.kind==="plate")return xn({...re,plates:re.plates.map(i=>i.id===e.id?{...i,hidden:!0}:i)},"已透明化 {count} 个对象",{count:1}),!0;const t=Ta();return t?(t.userData.hidden=!0,t.visible=!1,As(null),un("已透明化 {count} 个对象",{count:1}),Fe("已透明化 {count} 个对象",{count:1}),!0):(Fe("透明化工具需要点击组件、梁或面板"),!1)}async function ob(){const n=nn().map(t=>{const{hidden:i,...r}=t;return r}),e={...re,edges:re.edges.map(t=>{const{hidden:i,...r}=t;return r}),plates:re.plates.map(t=>{const{hidden:i,...r}=t;return r})};await kn(n,e),un("已取消透明化"),Fe("已取消透明化")}function ab(){return{components:Mt.filter(n=>n.userData.hidden).map(n=>n.userData.id),edges:re.edges.filter(n=>n.hidden).map(n=>n.id),plates:re.plates.filter(n=>n.hidden).map(n=>n.id)}}function Rp(n){return n.components.length+n.edges.length+n.plates.length}function Ud(){const n=N("#transparency-groups");if(n){n.replaceChildren();for(const e of Rn){const t=document.createElement("div");t.className="transparency-group";const i=document.createElement("span");i.textContent=`${e.name} · ${Rp(e)}`;const r=document.createElement("button");r.type="button",r.textContent=Ae("按组透明化"),r.title=`${Ae("按组透明化")} ${e.name}`,r.onclick=()=>{qe||Lh(e.id,!0)};const s=document.createElement("button");s.type="button",s.textContent=Ae("按组恢复"),s.title=`${Ae("按组恢复")} ${e.name}`,s.onclick=()=>{qe||Lh(e.id,!1)};const o=document.createElement("button");o.type="button",o.className="transparency-group-remove",o.textContent="×",o.setAttribute("aria-label",`${Ae("删除透明化组")} ${e.name}`),o.title=`${Ae("删除透明化组")} ${e.name}`,o.onclick=()=>{Rn=Rn.filter(a=>a.id!==e.id),un("已删除透明化组"),Ud()},t.append(i,r,s,o),n.append(t)}}}async function Lh(n,e){const t=Rn.find(l=>l.id===n);if(!t)return;const i=new Set(t.components),r=new Set(t.edges),s=new Set(t.plates),o=nn().map(l=>e===i.has(l.id)?{...l,...e?{hidden:!0}:{}}:l);if(!e)for(const l of o)i.has(l.id)&&delete l.hidden;const a={...re,edges:re.edges.map(l=>e===r.has(l.id)?{...l,...e?{hidden:!0}:{}}:l),plates:re.plates.map(l=>e===s.has(l.id)?{...l,...e?{hidden:!0}:{}}:l)};if(!e){for(const l of a.edges)r.has(l.id)&&delete l.hidden;for(const l of a.plates)s.has(l.id)&&delete l.hidden}await kn(o,a,Rn),un(e?"已按组透明化 {name}":"已按组恢复 {name}",{name:t.name}),Fe(e?"已按组透明化 {name}":"已按组恢复 {name}",{name:t.name})}function cb(){const n=N("#transparency-group-name").value.trim(),e=ab();if(!n){Fe("请输入透明化组名称");return}if(!Rp(e)){Fe("当前没有透明化的对象可保存");return}const i={id:Rn.find(r=>r.name===n)?.id||`visibility-group-${crypto.randomUUID()}`,name:n,...e};Rn=[...Rn.filter(r=>r.name!==n),i],un("已保存透明化组 {name}",{name:n}),N("#transparency-group-name").value="",Ud(),Fe("已保存透明化组 {name}",{name:n})}function Od(){const n=Cs(!0),e=re.nodes.find(i=>i.id===n),t=XM(dn.ray,cn?.frame||Ua(Be,Tt.target),{axisSnap:!!cn&&vs,node:e?.position,viewNormal:Be.getWorldDirection(new w)});return cn&&(cn.axis=t?.axis||null),t?.point||null}function Pp(n){Le!=="edge"||!cn||(Ir.visible=!!n&&gd(Ir,cn.start,n),n?Nr.show(cn.start,n,cn.axis):Nr.hide(),it(Ni,n?"梁 1 格 · 整格端点 · 点击完成 / Esc 取消":"梁 1 格 · 无有效终点 · Esc 取消"))}function Fd(){!cn||!lo||Le!=="edge"||(Id(lo),Pp(Od()))}function Dp(){const n=Cs(),e=re.nodes.find(t=>t.id===n);return e?new w(e.position.x,e.position.y,e.position.z):Kf(dn.ray,Td||Ua(Be,Tt.target))}function xn(n,e,t={}){const i=Es(Ia(nn(),n),Xt.index),r=ka(i.topology,new Map(i.objects.map(o=>[o.id,o.position])));re=i.topology,Ha(r),Nt.commit(i,{key:e,params:t}),ir();const s=re.nodes.length;Fe("{message}（{count} 逻辑节点）",()=>({message:Ae(e,t),count:s}))}function Lp(n,e){const t={node:wM,edge:TM,plate:AM}[n];if(n==="link"){xn({...re,links:yM(re.links||[],e,new Set(nn().map(i=>i.id))).links},"已删除连接");return}t&&(n==="node"&&gn===e&&tr(),xn(t(re,e),n==="node"?"已删除节点及其关联拓扑":n==="edge"?"已删除梁":"已删除面板"))}function lb(n="plate"){const e=n==="glass";if(ci.length<3){Fe(e?"玻璃至少需要选择三根梁":"面板至少需要选择三根梁");return}try{const i=(e?LM:Xf)(re.plates,ci,re.edges,re.nodes,{normalOffset:pt/2});xn({...re,plates:i.plates},e?"已创建玻璃面板":"已创建面板"),ci=[]}catch(t){On("面板创建失败：{error}",t)}}function Ip(){const n=dn.intersectObjects(Ft.children.filter(c=>c.visible&&c.userData.topology==="edge"),!1)[0];if(!n)return Fe("切分工具需要点击梁的内部"),!1;const e=re.edges.find(c=>c.id===n.object.userData.edgeId);if(!e)return!1;const t=[e.a,e.b].map(c=>re.nodes.find(u=>u.id===c).position),i=new w(t[0].x,t[0].y,t[0].z),r=new w(t[1].x,t[1].y,t[1].z),s=new w;dn.ray.distanceSqToSegment(i,r,new w,s);const o=RM(re.nodes,e.id,re.edges);if(!o.length)return Fe("该梁没有可用整格切分点"),!1;const a=o.map(c=>new w(c.x,c.y,c.z)).reduce((c,u)=>u.distanceToSquared(s)<c.distanceToSquared(s)?u:c),l=PM(re.nodes,re.edges,e.id,a,re.plates);return xn({...re,nodes:l.nodes,edges:l.edges,plates:l.plates},"已切分实体梁并新增节点"),!0}function db(n){if(n.altKey)return Ip();const e=Od();if(!e){Fe("当前位置无法投影到建造平面，请调整视角或按 Esc 重新开始");return}if(!cn){cn={start:e.clone(),frame:Ua(Be,e),axis:null},lo={clientX:n.clientX,clientY:n.clientY},Ur.position.copy(e),Ur.visible=!0,Nr.show(e,e),it(Ni,"梁 1 格 · 点击终点 · Esc 取消"),Fe("起点已定位；移动鼠标预览实体梁，再次点击完成");return}xn(CM(re,cn.start,e),"已创建 1 格实体梁"),Va()}function ub(){const n=kS();if(!n){Fe("连接工具需要点击组件端口");return}if(!Gi){Gi=n,N("#connection-from-port").value=String(n.port),nr(),Fe("已选择连接起点；点击目标组件完成，Esc 取消");return}if(Gi.componentId===n.componentId&&Gi.port===n.port){Fe("请选择另一个组件端口作为连接终点");return}N("#connection-to-port").value=String(n.port);const e=N("#connection-kind").value,t=xM(re.links||[],{kind:e,from:Gi,to:n,points:[]},new Set(nn().map(i=>i.id)));Gi=null,xn({...re,links:t.links},"已创建 {kind} 连接",{kind:e}),nr()}function Ih(n){if(Le==="node"){const e=Cs();if(e){if(gn&&gn!==e)try{const i=Gf(re.nodes,re.edges,re.plates,gn,e,re.links);xn(i,"已合并节点"),tr()}catch(i){On("节点合并失败：{error}",i)}else Ea(e),Fe("已选择节点 {id}；点击节点合并，点击空白位置移动；Esc 取消选择",{id:e});return!0}if(gn){const i=Vf(re,gn,n);return xn(i,i.merged?"已移动并合并节点":"已移动节点"),tr(),!0}const t=_a(re.nodes,n);return xn({...re,nodes:t.nodes},t.created?"已创建节点 {id}":"已选择已有节点 {id}",{id:t.node.id}),t.created||Ea(t.node.id),!0}if(Le==="plate"||Le==="glass"){const t=dn.intersectObjects(Ft.children.filter(i=>i.visible&&i.userData.topology==="edge"),!1)[0]?.object.userData.edgeId;return t?(ci.includes(t)||(ci.push(t),Fe(Le==="glass"?"玻璃已选择 {count} 根梁；按 Enter 创建，Esc 取消":"面板已选择 {count} 根梁；按 Enter 创建，Esc 取消",{count:ci.length})),!0):(Fe(Le==="glass"?"玻璃工具需要选择围成闭合环的梁":"面板工具需要选择围成闭合环的梁"),!0)}return!1}Ot.domElement.addEventListener("contextmenu",n=>n.preventDefault());Ot.domElement.addEventListener("pointerdown",n=>{n.button!==0||qe||(yn.focus({preventScroll:!0}),wd=nt.dragging,us={x:n.clientX,y:n.clientY})});Ot.domElement.addEventListener("pointermove",n=>{if(qe)return;if(go=!0,lo={clientX:n.clientX,clientY:n.clientY},Id(n),Le==="select"||Le==="erase"){const r=ib();r!==Sa&&(Sa=r,Is())}const e=Le==="edge"?Od():Le==="node"?Dp():Le==="place"?Ap():dn.ray.intersectPlane(mp,new w),t=e&&Li(e),i=t?new w(t.x,t.y,t.z):null;Ma=i,it(N("#cursor-pos"),i?"{coordinates}":"无法定位：射线与建造平面平行",{coordinates:i?ai.map(r=>Ae("{axis} {cells} 格",{axis:r.toUpperCase(),cells:ui(i[r])})).join(" · "):""}),Pp(i),wp(i)});Ot.domElement.addEventListener("pointerleave",()=>{go=!1,Sa=null,Is(),Ir.visible=!1,Nr.hide(),qt&&(qt.visible=!1)});Ot.domElement.addEventListener("pointerup",n=>{if(!us||n.button!==0)return;const e=Math.hypot(n.clientX-us.x,n.clientY-us.y);if(us=null,!(qe||wd||e>5||nt.axis&&["translate","rotate","scale"].includes(Le))){if(Id(n),Le==="edge"){try{db(n)}catch(t){On("梁操作失败：{error}",t)}return}if(Le==="split"){try{Ip()}catch(t){On("梁切分失败：{error}",t)}return}if(Le==="connect"){try{ub()}catch(t){On("连接操作失败：{error}",t)}return}if(Le==="paint"){rb();return}if(Le==="hide"){sb();return}if(Le==="node"){if(!Tn){Fe("节点辅助已隐藏，请先显示节点后编辑节点或面板；直接建梁不受影响");return}const t=Dp();try{t&&t.length()<=1e4&&Ih(t)}catch(i){On("拓扑操作失败：{error}",i)}return}if(Le==="plate"||Le==="glass"){try{Ih()}catch(t){On("拓扑操作失败：{error}",t)}return}if(Le==="place"){const t=Ap();if(!t||t.length()>1e3)return;Zt(async()=>{await $S(t),n.shiftKey||(Le="select")})}else if(Le==="erase"){const t=nb();t?Lp(t.kind,t.id):Zt(async()=>{await wa(Ta())})}else if(Le==="translate"&&Cs())Ea(Cs());else{const t=Nd();t?GS(t,{toggle:n.shiftKey}):As(Ta(),{toggle:n.shiftKey})}}});Ot.domElement.addEventListener("pointercancel",()=>{us=null,Va()});function Ns({reference:n=tt}={}){const e=new qn;if(Ht.size||oi.size?[..._o(),...Ld()].forEach(s=>e.expandByObject(s)):n&&re.nodes.length?re.nodes.forEach(s=>e.expandByPoint(new w(s.position.x,s.position.y,s.position.z))):(Mt.forEach(s=>e.expandByObject(s)),e.expandByObject(Ft)),e.isEmpty()){Tt.target.set(0,.2,0),Be.position.set(2.5,2.2,3);return}const t=e.getCenter(new w),i=Be.isPerspectiveCamera?Be.fov:45,r=Math.max(.4,e.getSize(new w).length()/Math.sin(i*Math.PI/360)*(n?.72:1));Be.position.copy(t).add(new w(1,.8,1).normalize().multiplyScalar(r)),Tt.target.copy(t),Tt.update()}N("#fit-btn").onclick=Ns;for(const n of document.querySelectorAll(".view-controls [data-view]"))n.remove();const hb={orientation:"XYZ 视角指示器",right:"右视图 +X",left:"左视图 −X",top:"顶视图 +Y",bottom:"底视图 −Y",front:"前视图 +Z",back:"后视图 −Z",iso:"等距"},Xa=MS(yn,()=>Be,n=>{if(qe||nt.dragging)return;const e=Tt.enableDamping;Tt.enableDamping=!1,Tt.update(),xS(Be,Tt,n),Tt.enableDamping=e,Lt()},n=>Ae(hb[n]));Xa.footer.append(N("#fit-btn"));function zd(n){tt=!!n,jt.background.set(ne.backgroundColor),Hr.visible=!tt&&Ri&&Dr,nt.getHelper().visible=!tt;for(const e of Ft.children)e.userData.topology==="link"&&(e.visible=!tt);Ir.visible=!1,Ur.visible=!1,Nr.hide(),Vr(),co.setVisible(!tt&&ne.edgeLengthsVisible),Xa.root.hidden=tt,N(".view-controls").hidden=tt,N(".top-tool-section").hidden=tt,sr.hidden=tt||Le!=="paint",pi.hidden=tt||Le!=="connect",or.hidden=tt||Le!=="hide",N(".hud").hidden=tt,Ei.hidden=tt,wi.hidden=tt,N("#native-reference-preview-btn").setAttribute("aria-pressed",String(tt)),it(N("#native-reference-preview-btn"),tt?"退出参考预览":"参考预览"),nr(),Is(),tt&&Ns({reference:!0})}hi.onclick=()=>{qe||!Mt.length||(zd(!tt),Fe(tt?"已开启参考预览：编辑辅助已隐藏，可对照 vehicle.png；相机、光照和游戏材质尚未验证":"已退出参考预览"))};const ja=document.createElement("div");ja.innerHTML='<div class="property"><label for="grid-color" data-i18n="网格颜色"></label><input id="grid-color" type="color"></div><div class="property"><label for="grid-opacity" data-i18n="网格透明度"></label><input id="grid-opacity" type="range" min="0" max="1" step="0.05"></div><div class="property"><label for="grid-style" data-i18n="网格线型"></label><select id="grid-style"><option value="solid" data-i18n="实线"></option><option value="dashed" data-i18n="虚线"></option></select></div><h2 data-i18n="节点显示"></h2><div class="property"><label for="node-color" data-i18n="节点颜色"></label><input id="node-color" type="color"></div><div class="property"><label for="node-size" data-i18n="节点大小"></label><input id="node-size" type="range" min="0.02" max="0.25" step="0.005"><output id="node-size-value"></output></div><div class="property"><label for="node-opacity" data-i18n="节点透明度"></label><input id="node-opacity" type="range" min="0" max="1" step="0.05"></div><h2 data-i18n="结构显示"></h2><div class="property"><label for="edge-lengths-visible" data-i18n="显示梁 XYZ 长度（格）"></label><input id="edge-lengths-visible" type="checkbox"></div><div class="property"><label for="edge-outlines-visible" data-i18n="显示梁描边"></label><input id="edge-outlines-visible" type="checkbox"></div><h2 data-i18n="涂色"></h2><div class="property"><label for="paint-color" data-i18n="颜色（Hex RGB）"></label><input id="paint-color" type="color" value="#bd2636"><input id="paint-color-hex" type="text" value="#bd2636" maxlength="7" spellcheck="false"><output id="paint-color-preview" class="paint-color-preview"></output></div><div class="property"><label for="paint-side" data-i18n="面板涂色面"></label><select id="paint-side"><option value="front" data-i18n="前面"></option><option value="back" data-i18n="背面"></option></select></div>';const Bd=document.createElement("div");Bd.innerHTML='<h2 data-i18n="视图与光照"></h2><div class="property"><label for="background-color" data-i18n="背景颜色"></label><input id="background-color" type="color"></div><div class="property"><label for="orthographic-view" data-i18n="正交镜头"></label><input id="orthographic-view" type="checkbox"></div><div class="property"><label for="light-azimuth" data-i18n="光照方位角"></label><input id="light-azimuth" type="range" min="-180" max="180" step="1"><output id="light-azimuth-value"></output></div><div class="property"><label for="light-elevation" data-i18n="光照高度角"></label><input id="light-elevation" type="range" min="5" max="90" step="1"><output id="light-elevation-value"></output></div><div class="property"><label for="light-intensity" data-i18n="光照强度"></label><input id="light-intensity" type="range" min="0" max="8" step="0.1"><output id="light-intensity-value"></output></div><div class="property"><label for="shadow-strength" data-i18n="阴影强度"></label><input id="shadow-strength" type="range" min="0" max="1" step="0.05"><output id="shadow-strength-value"></output></div><div class="property"><label for="light-softness" data-i18n="光照柔和度"></label><input id="light-softness" type="range" min="0" max="8" step="0.25"><output id="light-softness-value"></output></div>';const Np=document.createElement("div"),kd=document.createElement("div");kd.className="property";const Ya=document.createElement("label");Ya.htmlFor="camera-light-enabled";Ya.dataset.i18n="镜头辅助灯";it(Ya,"镜头辅助灯");const Hd=document.createElement("input");Hd.id="camera-light-enabled";Hd.type="checkbox";kd.append(Ya,Hd);const Vd=document.createElement("div");Vd.className="property";const qa=document.createElement("label");qa.htmlFor="camera-light-intensity";qa.dataset.i18n="镜头辅助灯强度";it(qa,"镜头辅助灯强度");const Us=document.createElement("input");Us.id="camera-light-intensity";Us.type="range";Us.min="0";Us.max="8";Us.step=".1";const Up=document.createElement("output");Up.id="camera-light-intensity-value";Vd.append(qa,Us,Up);Np.append(kd,Vd);Bd.prepend(Np);ja.append(Bd);N("#grid-btn").before(ja);hn(ja);N("#grid-color").value=ne.gridColor;N("#grid-opacity").value=ne.gridOpacity;N("#grid-style").value=ne.gridStyle;N("#node-color").value=ne.nodeColor;N("#node-size").value=ne.nodeSize;N("#node-opacity").value=ne.nodeOpacity;N("#edge-lengths-visible").checked=ne.edgeLengthsVisible;N("#edge-outlines-visible").checked=ne.edgeOutlinesVisible;N("#background-color").value=ne.backgroundColor;N("#orthographic-view").checked=ne.orthographic;N("#camera-light-enabled").checked=ne.cameraLightEnabled;N("#camera-light-intensity").value=ne.cameraLightIntensity;N("#light-azimuth").value=ne.lightAzimuth;N("#light-elevation").value=ne.lightElevation;N("#light-intensity").value=ne.lightIntensity;N("#shadow-strength").value=ne.shadowStrength;N("#light-softness").value=ne.lightSoftness;Hr.visible=Ri;function Op(){const n=$i({version:1,gridColor:N("#grid-color").value,gridOpacity:Number(N("#grid-opacity").value),gridStyle:N("#grid-style").value});yS(Hr,n),Lt()}Op();for(const n of["grid-color","grid-opacity","grid-style"])N("#"+n).addEventListener("input",Op);function Fp(){const n=$i({version:1,nodeColor:N("#node-color").value,nodeSize:Number(N("#node-size").value),nodeOpacity:Number(N("#node-opacity").value)});ne.nodeColor=n.nodeColor,ne.nodeSize=n.nodeSize,ne.nodeOpacity=n.nodeOpacity,ri.node.color.set(n.nodeColor);for(const e of[ri.node,ri.nodeSelected])e.opacity=n.nodeOpacity,e.transparent=n.nodeOpacity<1,e.needsUpdate=!0;N("#node-size-value").textContent=n.nodeSize.toFixed(3),Vr(),nr(),Lt()}Fp();for(const n of["node-color","node-size","node-opacity"])N("#"+n).addEventListener("input",Fp);function Gd(){const n=$i({version:1,backgroundColor:N("#background-color").value,lightAzimuth:Number(N("#light-azimuth").value),lightElevation:Number(N("#light-elevation").value),lightIntensity:Number(N("#light-intensity").value),shadowStrength:Number(N("#shadow-strength").value),lightSoftness:Number(N("#light-softness").value),cameraLightEnabled:N("#camera-light-enabled").checked,cameraLightIntensity:Number(N("#camera-light-intensity").value),orthographic:N("#orthographic-view").checked});Object.assign(ne,{backgroundColor:n.backgroundColor,lightAzimuth:n.lightAzimuth,lightElevation:n.lightElevation,lightIntensity:n.lightIntensity,shadowStrength:n.shadowStrength,lightSoftness:n.lightSoftness,cameraLightEnabled:n.cameraLightEnabled,cameraLightIntensity:n.cameraLightIntensity,orthographic:n.orthographic}),jt.background.set(ne.backgroundColor),pp(),vb(ne.orthographic),N("#light-azimuth-value").textContent=n.lightAzimuth.toFixed(0)+"°",N("#light-elevation-value").textContent=n.lightElevation.toFixed(0)+"°",N("#light-intensity-value").textContent=n.lightIntensity.toFixed(1),N("#shadow-strength-value").textContent=n.shadowStrength.toFixed(2),N("#light-softness-value").textContent=n.lightSoftness.toFixed(2),N("#camera-light-intensity-value").textContent=n.cameraLightIntensity.toFixed(1),Lt()}for(const n of["background-color","light-azimuth","light-elevation","light-intensity","shadow-strength","light-softness","camera-light-enabled","camera-light-intensity"])N("#"+n).addEventListener("input",Gd);N("#orthographic-view").addEventListener("change",Gd);Gd();function fb(){ne.edgeLengthsVisible=$i({version:1,edgeLengthsVisible:N("#edge-lengths-visible").checked}).edgeLengthsVisible,co.setVisible(!tt&&ne.edgeLengthsVisible),Lt()}N("#edge-lengths-visible").addEventListener("change",fb);function pb(){ne.edgeOutlinesVisible=$i({version:1,edgeOutlinesVisible:N("#edge-outlines-visible").checked}).edgeOutlinesVisible,YM(Ir,ne.edgeOutlinesVisible),Ha(ka(re,new Map(nn().map(n=>[n.id,n.position])))),Lt()}N("#edge-outlines-visible").addEventListener("change",pb);function $a(n=N("#paint-color-hex").value){return typeof n=="string"&&/^#[\da-f]{6}$/i.test(n)?n.toLowerCase():null}function zp(){const n=$a(),e=N("#paint-color-preview");e.textContent=n||"—",e.style.backgroundColor=n||"transparent"}function xo(n){const e=$a(n);return e?(N("#paint-color").value=e,N("#paint-color-hex").value=e,N("#paint-toolbar-color").value=e,N("#paint-toolbar-hex").value=e,zp(),!0):!1}function Wd(){const n=N("#paint-quick-colors");n.replaceChildren();for(const e of ne.paintQuickColors){const t=document.createElement("span");t.className="quick-color-item";const i=document.createElement("button");i.type="button",i.className="quick-color",i.textContent=e,i.style.backgroundColor=e,i.setAttribute("aria-label",`${Ae("颜色（Hex RGB）")} ${e}`),i.title=e,i.onclick=()=>xo(e);const r=document.createElement("button");r.type="button",r.className="quick-color-remove",r.textContent="×",r.setAttribute("aria-label",`${Ae("删除快捷颜色")} ${e}`),r.title=`${Ae("删除快捷颜色")} ${e}`,r.onclick=()=>{ne.paintQuickColors=ne.paintQuickColors.filter(s=>s!==e),Wd(),Lt()},t.append(i,r),n.append(t)}}function Xd(){const n=N("#connection-kind").value;for(const e of pi.querySelectorAll("[data-kind]"))e.classList.toggle("active",e.dataset.kind===n);nr()}N("#paint-color").addEventListener("input",n=>xo(n.target.value));N("#paint-toolbar-color").addEventListener("input",n=>xo(n.target.value));N("#paint-color-hex").addEventListener("change",n=>xo(n.target.value));N("#paint-toolbar-hex").addEventListener("change",n=>xo(n.target.value));N("#save-paint-quick-color").onclick=()=>{const n=$a();n&&(ne.paintQuickColors=[...new Set([...ne.paintQuickColors,n])].slice(-12),Wd(),Lt())};N("#connection-kind").addEventListener("change",Xd);N("#save-transparency-group").onclick=cb;Wd();Xd();zp();function Bp(){it(N("#grid-btn"),Ri?"隐藏网格":"显示网格"),N("#grid-btn").setAttribute("aria-pressed",String(Ri))}Bp();N("#grid-btn").onclick=()=>{Ri=!Ri,Hr.visible=!tt&&Ri&&Dr,Bp(),Lt()};const Zi=document.createElement("button");Zi.id="nodes-btn";it(Zi,Tn?"隐藏节点":"显示节点");Zi.setAttribute("aria-pressed",String(Tn));Zi.dataset.i18nTitle="仅切换逻辑节点辅助标记，不隐藏梁、不改变工程";N(".view-controls").append(Zi);Zi.onclick=()=>{Tn=!Tn,Tn||(tr(),ci=[]),Vr(),it(Zi,Tn?"隐藏节点":"显示节点"),Zi.setAttribute("aria-pressed",String(Tn)),Fe(Tn?"已显示逻辑节点辅助标记":"节点已隐藏；仍可直接建梁并吸附逻辑端点"),Lt()};const cr=document.createElement("button");cr.id="axis-snap-btn";it(cr,"轴向吸附");cr.dataset.i18nTitle="仅建梁：自动吸附单一世界轴（A 切换）";cr.setAttribute("aria-keyshortcuts","A");cr.setAttribute("aria-pressed",String(vs));N(".view-controls").append(cr);function kp(){qe||(vs=!vs,cr.setAttribute("aria-pressed",String(vs)),Fd(),Lt())}cr.onclick=kp;const jd=document.createElement("p");jd.className="status construction-help";it(jd,"梁：两击完成，Esc 取消，Alt 点击分割。所有节点、组件和端点均对齐世界 XYZ 整数格；1 格 = 8 cm。截面边长为 1 格；世界轴向梁的面与 XYZ 平面平行。XYZ 标尺仅显示整数格与厘米。A 切换轴向吸附；节点可隐藏。");N("#grid-btn").after(jd);const Hc=Sp();Hc&&(Hc.dataset.i18nTitle="载具总尺寸按组件和结构节点的包围范围计算；1 格 = 8 cm",hn(Hc));N("#component-search").oninput=()=>{Gr(),Lt()};N("#category-filter").onchange=()=>{Gr(),Lt()};N("#show-building-furniture").onchange=()=>{ne.showBuildingFurniture=N("#show-building-furniture").checked,Wa(),Gr(),Lt()};N("#undo-btn").onclick=Tp;N("#redo-btn").onclick=jl;N("#new-btn").onclick=()=>{!qe&&(!Mt.length||confirm(Ae("清空当前工程？此操作可以撤销。")))&&Zt(async()=>{await kn([],{nodes:[],edges:[],plates:[],links:[]},[]),un()})};function Aa(n,e,t){const i=URL.createObjectURL(new Blob([n],{type:t})),r=document.createElement("a");r.href=i,r.download=e,document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}function yo(){return Rn=Mp(),Es(Ia(nn(),re,Rn),Xt.index)}N("#project-save-btn").onclick=()=>Aa(JSON.stringify(yo(),null,2),"anymaker-project.json","application/json");N("#export-btn").onclick=()=>{qe||(Aa(UM(yo()),"anymaker-intermediate.xml","application/xml"),Fe("已导出中间 XML；不能作为已验证游戏存档使用"))};N("#file-input").onchange=n=>{const e=n.target.files[0];n.target.value="",e&&Zt(async()=>{if(e.size>10*1024*1024)throw new Error("工程文件超过 10 MiB");const t=jf(JSON.parse(await e.text()),Xt.index);await kn(t.objects,t.topology||{nodes:[],edges:[],plates:[],links:[]},t.visibilityGroups||[]),un(),Ns(),Fe("工程已加载")})};N("#mesh-files-btn").onclick=()=>N("#mesh-input").click();N("#mesh-input").onchange=n=>{const e=[...n.target.files];n.target.value="",e.length&&Zt(async()=>{const t=Ed.register(e);it(N("#asset-status"),"本地已登记 {count} 个 Mesh。按组件请求解码，不上传。材质、动态装配尚未还原。",{count:t}),await kn(nn()),Ns(),Fe("模型库已登记；选择组件并在视口点击放置")})};function mb(n){if(n.length!==2)throw new Error("请同时选择一份 .data 和一份 .meta 文件");const e=Object.create(null);for(const t of n){if(!t||t.size>20*1024*1024)throw new Error("文件超过 20 MiB");const i=/^(.+)\.(data|meta)$/i.exec(t.name);if(!i||e[i[2].toLowerCase()])throw new Error("请选择唯一的一份 .data 和一份 .meta 文件");e[i[2].toLowerCase()]={file:t,baseName:i[1]}}if(!e.data||!e.meta||e.data.baseName.toLowerCase()!==e.meta.baseName.toLowerCase())throw new Error(".data 与 .meta 必须使用相同文件名");return e}function Hp(){Cd(!0),N("#resource-drawer").open=!0,N("#native-input").click()}N("#library-btn").onclick=Hp;N("#native-btn").onclick=Hp;N("#native-input").onchange=async n=>{const e=[...n.target.files];if(n.target.value="",!!e.length){_n=null,Js=null,rr.disabled=!0,hi.disabled=!0;try{const t=mb(e),[i,r]=await Promise.all([t.data.file.text(),t.meta.file.text()]),s=JSON.parse(i),o=JSON.parse(r);_n=sp(s,o),_n.extras.native.fileBaseName=t.data.baseName;const a=dS(s,o);if(a.data.length||a.meta.length)throw new Error("原生配套文件的无编辑 round-trip 校验失败");const l=cS(_n);N("#native-summary").dataset.domainStats=JSON.stringify(l),hi.disabled=!1;const c=s.vehicles?.vehicles;if(!Array.isArray(c))throw new Error("没有 vehicles.vehicles 数组");const u=c.map(h=>({id:h.id,nodes:h.nodes?.length||0,edges:h.edges?.length||0,plates:h.plates?.length||0,grids:h.grids?.length||0,components:(h.grids||[]).reduce((p,g)=>p+(g.components?.length||0),0)})),d=u.reduce((h,p)=>p.components>h.components?p:h,u[0]);await gb([String(d.id)])&&it(N("#native-summary"),"已导入 {dataName} / {metaName}：{vehicle}。",()=>({dataName:t.data.file.name,metaName:t.meta.file.name,vehicle:Ae("载具 {id}：{nodes} 节点 / {edges} 梁 / {plates} 面板 / {grids} 网格 / {components} 组件",d)}))}catch(t){it(N("#native-summary"),"无法导入原生文件：{error}",()=>({error:Ae(t instanceof Error?t.message:String(t))}))}}};async function gb(n){return Fe("正在导入配套原生载具"),!_n||qe?(Fe(_n?"当前操作仍在进行":"原生模型尚未加载"),!1):Zt(async()=>{const e=Es(mM(_n,{vehicleIds:n}),Xt.index);await kn(e.objects,e.topology||zf(_n,{vehicleIds:n}),[]),Js=yo(),rr.disabled=!1,un(),zd(!0),Fe("已将配套 .data / .meta 的组件、节点、梁和面板导入当前场景；连接仍保留在领域模型中")})}const os=(n,e)=>JSON.stringify(n)===JSON.stringify(e);function _b(){if(!_n||!Js)throw new Error("请先导入配套 .data / .meta 到当前场景后再保存载具");const n=yo(),e=new Map(Js.objects.map(c=>[c.id,c])),t=new Map(n.objects.map(c=>[c.id,c]));if(t.size!==e.size||[...e.keys()].some(c=>!t.has(c)))throw new Error("原生保存暂不支持新增或删除组件");const i=new Map;for(const c of _n.vehicles)for(const u of c.grids)for(const d of u.components)i.set(`${c.id}:${u.id}:${d.id}`,{vehicle:c,grid:u,component:d});for(const[c,u]of e){const d=t.get(c),h=i.get(c);if(!h)throw new Error(Ae("组件 {id} 没有原生映射",{id:c}));if(u.type!==d.type||u.gridId!==d.gridId||!os(u.rotation,d.rotation)||!os(u.scale,d.scale)||!os(u.colors,d.colors)||u.hidden!==d.hidden||!os(u.mirror,d.mirror)||!os(u.nativeExtension,d.nativeExtension))throw new Error("原生保存暂不支持组件旋转、缩放、网格归属或属性修改");const p=h.vehicle.extras.native.rawVehicle.grids?.[h.grid.extras.native.index]?.components?.find(m=>String(m.id)===h.component.id);if(!p)throw new Error(Ae("组件 {id} 的原生记录丢失",{id:c}));const g=Array.isArray(p.pos)?p.pos:[0,0,0],_=yh(h.grid,Object.fromEntries(["x","y","z"].map(m=>[m,d.position[m]-u.position[m]])));h.component.transform.position=Object.fromEntries(["x","y","z"].map((m,f)=>[m,Number(g[f]||0)+_[m]]))}const r=Js.topology||{nodes:[],edges:[],plates:[],links:[]},s=n.topology||{nodes:[],edges:[],plates:[],links:[]};for(const c of["edges","plates","links"])if(!os(r[c]||[],s[c]||[]))throw new Error("原生保存暂不支持梁、面板或连接修改");const o=new Map((r.nodes||[]).map(c=>[c.id,c])),a=new Map((s.nodes||[]).map(c=>[c.id,c]));if(a.size!==o.size||[...o.keys()].some(c=>!a.has(c)))throw new Error("原生保存暂不支持新增、删除或合并节点");const l=new Map;for(const c of _n.vehicles)for(const u of c.grids)for(const d of u.nodes)l.set(`${u.id}:${d.id}`,{vehicle:c,grid:u,node:d});for(const[c,u]of o){const d=a.get(c),h=l.get(c);if(!h||u.gridId!==d.gridId)throw new Error(Ae("节点 {id} 没有原生映射",{id:c}));const p=h.vehicle.extras.native.rawVehicle.nodes?.find(m=>String(m.id)===h.node.id);if(!p)throw new Error(Ae("节点 {id} 的原生记录丢失",{id:c}));const g=Array.isArray(p.pos)?p.pos:[0,0,0],_=yh(h.grid,Object.fromEntries(["x","y","z"].map(m=>[m,d.position[m]-u.position[m]])));h.node.position=Object.fromEntries(["x","y","z"].map((m,f)=>[m,Number(g[f]||0)+_[m]]))}}function Vp(){if(!qe)try{_b();const n=lS(_n).value,e=op(_n),t=_n.extras.native.fileBaseName||"anymaker-native";Aa(JSON.stringify(n,null,2),`${t}.data`,"application/json"),Aa(JSON.stringify(e.meta,null,2),`${t}.meta`,"application/json"),Fe("已保存原生 .data / .meta 配套载具；未映射的编辑会被阻止导出")}catch(n){On("原生导出失败：{error}",n)}}N("#save-btn").onclick=Vp;rr.onclick=Vp;window.addEventListener("keydown",n=>{if(n.key==="Tab"&&n.target===yn){n.preventDefault(),Ad(!Qi.hidden,{focusToggle:!0});return}if(n.target instanceof HTMLElement&&(n.target.matches("input,textarea,select")||n.target.isContentEditable))return;if(n.key==="Escape"&&!qe){(cn||ci.length||gn)&&Fe("已取消当前拓扑操作"),Dd(),As(null),Ui("select");return}if(n.target instanceof HTMLElement&&n.target.matches('button,summary,[role="separator"]')||n.target!==document.body&&n.target!==yn&&n.target!==Ot.domElement||qe)return;const t=n.key.toLowerCase();if(n.ctrlKey||n.metaKey){t==="z"?(n.preventDefault(),n.shiftKey?jl():Tp()):t==="y"&&(n.preventDefault(),jl());return}if(t==="a"&&!n.altKey&&!n.repeat){n.preventDefault(),kp();return}const i=up.find(r=>r[2].toLowerCase()===t);i&&Ui(i[0]),(t==="delete"||t==="backspace")&&(n.preventDefault(),gn?Lp("node",gn):Zt(async()=>{await wa(Ct)})),t==="enter"&&["plate","glass"].includes(Le)&&(n.preventDefault(),lb(Le)),t==="f"&&Ns()});function Gp(){const n=Math.max(1,yn.clientWidth),e=Math.max(1,yn.clientHeight);if(Be.isOrthographicCamera){const t=Math.max(.5,Be.position.distanceTo(Tt.target)),i=Math.max(.2,t*.65);Be.left=-i*n/e,Be.right=i*n/e,Be.top=i,Be.bottom=-i}else Be.aspect=n/e;Be.updateProjectionMatrix()}function vb(n){const e=n?Pd:Rd;Be!==e&&(e.position.copy(Be.position),e.quaternion.copy(Be.quaternion),e.up.copy(Be.up),Be=e,LS(Be),Tt.object=Be,nt.camera=Be,Gp(),Tt.update(),Lt())}const Yd=document.createElement("div");Yd.className="badge local-backup";const uo=document.createElement("span");uo.id="autosave-status";uo.setAttribute("role","status");const Os=document.createElement("button");Os.id="resume-autosave";Os.hidden=!0;it(Os,"以当前工程继续自动保存");Yd.append(uo,Os);N(".hud").append(Yd);const qd=document.createElement("p");qd.className="status";it(qd,"本地存储只属于当前浏览器和站点；清理站点数据会删除备份，请定期下载工程。");N("#grid-settings").append(qd);function xb({state:n,savedAt:e,detail:t}){uo.dataset.state=n,it(uo,{ready:"自动保存：每分钟",restored:"已恢复本地工程",recovered:"已从上一份有效备份恢复",saved:"已自动保存 {time}",error:"本地恢复失败：{detail}","write-error":"本地保存失败，请下载工程：{detail}",conflict:"另一标签页已保存，自动保存已暂停"}[n],()=>({detail:t,time:e?new Date(e).toLocaleTimeString(Ji()==="zh"?"zh-CN":"en-US"):""})),Os.hidden=!["error","conflict"].includes(n)}Os.onclick=()=>{!qe&&confirm(Ae("用当前工程覆盖本地恢复记录并继续自动保存？"))&&bd?.resume()};function yb(){return{version:1,language:Ji(),leftWidth:Pi,leftCollapsed:Qi.hidden,rightOpen:!kr.hidden,gridColor:N("#grid-color").value,gridOpacity:Number(N("#grid-opacity").value),gridStyle:N("#grid-style").value,gridVisible:Ri,nodesVisible:Tn,nodeColor:N("#node-color").value,nodeSize:Number(N("#node-size").value),nodeOpacity:Number(N("#node-opacity").value),edgeAxisSnap:vs,edgeLengthsVisible:ne.edgeLengthsVisible,edgeOutlinesVisible:ne.edgeOutlinesVisible,tool:Le,selectedType:An,backgroundColor:ne.backgroundColor,lightAzimuth:ne.lightAzimuth,lightElevation:ne.lightElevation,lightIntensity:ne.lightIntensity,shadowStrength:ne.shadowStrength,lightSoftness:ne.lightSoftness,cameraLightEnabled:ne.cameraLightEnabled,cameraLightIntensity:ne.cameraLightIntensity,paintQuickColors:ne.paintQuickColors,orthographic:ne.orthographic,showBuildingFurniture:N("#show-building-furniture").checked,query:N("#component-search").value,category:N("#category-filter").value,drawers:{catalog:N("#catalog-drawer").open,inspector:N(".inspector-drawer").open,resources:N("#resource-drawer").open,history:ar.open},camera:{position:Be.position.toArray(),target:Tt.target.toArray()}}}function Za(){if(!Sd)return;clearTimeout(Hl);const n=Md.saveSettings(yb());n.ok||Fe("设置保存失败：{detail}",{detail:n.error.message})}function Lt(){Sd&&(clearTimeout(Hl),Hl=setTimeout(Za,180))}Tt.addEventListener("change",()=>{Lt(),!qe&&go&&Fd()});for(const n of[N("#catalog-drawer"),N(".inspector-drawer"),N("#resource-drawer"),ar])n.addEventListener("toggle",Lt);window.addEventListener("pagehide",Za);document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Za()});function Wp(n){const e=Qi.scrollTop,t=N("#inspector-content details")?.open;np(n),document.documentElement.lang=Ji()==="zh"?"zh-CN":"en",N("#language-select").value=Ji(),hn(document),Wa(),Gr(),fi(),ir(),t&&N("#inspector-content details")&&(N("#inspector-content details").open=!0),Qi.scrollTop=e,Xa.relabel(),bd?.refresh(),Za()}N("#language-select").addEventListener("change",n=>Wp(n.target.value));const $d=()=>{Gp(),Ot.setSize(yn.clientWidth,yn.clientHeight,!1),!qe&&go&&Fd()};new ResizeObserver($d).observe(yn);Ad(ne.leftCollapsed);Cd(ne.rightOpen);N("#catalog-drawer").open=ne.drawers.catalog;N(".inspector-drawer").open=ne.drawers.inspector;N("#resource-drawer").open=ne.drawers.resources;ar.open=ne.drawers.history;Wp(Ji());VS();ir();$d();async function Mb(){await tb(),N("#component-search").value=ne.query,N("#show-building-furniture").checked=ne.showBuildingFurniture,Wa(),N("#category-filter").value=[...N("#category-filter").options].some(n=>n.value===ne.category)?ne.category:"",Xt.has(ne.selectedType)&&(An=ne.selectedType),Gr(),bd=await vS({store:Md,validate:n=>jf(n,Xt.index),restore:async n=>{await kn(n.objects,n.topology||{nodes:[],edges:[],plates:[],links:[]},n.visibilityGroups||[]),un()},snapshot:()=>{const n=Nt.entries[Nt.cursor];return Ia(n.objects,n.topology,n.visibilityGroups)},canSave:()=>!qe&&!nt.dragging,notify:xb}),ne.camera?(Be.position.fromArray(ne.camera.position),Tt.target.fromArray(ne.camera.target),Tt.update()):(Mt.length||re.nodes.length)&&Ns(),qe=!1,Ui(ne.tool),ir(),Sd=!0,yn.dataset.ready="true",kl.error&&Fe("设置保存失败：{detail}",{detail:kl.error.message})}Mb().catch(n=>On("组件目录加载失败：{error}",n));Ot.setAnimationLoop(()=>{Tt.update(),OS(),Xa.update(),Nr.update(),co.update(),Ot.render(jt,Be)});
//# sourceMappingURL=index-Doo4wvL-.js.map
