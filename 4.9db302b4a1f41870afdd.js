(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"02iP":function(n,l,t){"use strict";t.r(l);var e=t("CcnG"),u=t("n+qc"),a=function(){function n(n){this.userStore=n,this.fallbackAvatarUrl="https://media.licdn.com/dms/image/C5603AQG5zStVST5xkA/profile-displayphoto-shrink_200_200/0?e=1565827200&v=beta&t=eYwQoF0jwwduCEkPJrI-3nzEnsV16D0EzrTdvEYcnYI"}return n.prototype.addFile=function(){console.log(this.file.nativeElement),this.file.nativeElement.click()},n.prototype.isFileExtensionValid=function(n){return n.type.startsWith("image/")},n.prototype.onFileAdded=function(){var n=this.file.nativeElement.files[0];return console.log(n),this.isFileExtensionValid(n)?this.userStore.updateAvatar(n):console.log("extension not valid")},n.prototype.ngOnInit=function(){var n=this;this.userStoreSubscription=this.userStore.state$.subscribe(function(l){n.user=l})},n.prototype.ngOnDestroy=function(){this.userStoreSubscription.unsubscribe()},n}(),o=function(){},i=t("pMnS"),r=t("NhFT"),c=t("PT0D"),s=e.Qa({encapsulation:0,styles:[["[_nghost-%COMP%]{display:flex}.profile-avatar[_ngcontent-%COMP%]{display:inline-flex;order:1}.profile-avatar[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]{position:relative}.profile-avatar[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   .snack[_ngcontent-%COMP%]{border:2px solid transparent;font-size:.9rem;padding:.5rem;border-radius:1rem;position:absolute;background-color:rgba(47,79,79,.9);color:#fff;bottom:0;left:.5rem;transition:.2s ease-in}.profile-avatar[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   .snack[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem;margin-right:.25rem}.profile-avatar[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   .snack[_ngcontent-%COMP%]:active, .profile-avatar[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   .snack[_ngcontent-%COMP%]:hover{border-color:#fff;background-color:#2f4f4f}.profile-avatar[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   .snack[_ngcontent-%COMP%]:active   i[_ngcontent-%COMP%], .profile-avatar[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   .snack[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%]{color:#90ee90}"]],data:{}});function f(n){return e.lb(0,[e.hb(402653184,1,{file:0}),(n()(),e.Sa(1,0,null,null,8,"div",[["class","profile-avatar"]],null,null,null,null,null)),(n()(),e.Sa(2,0,null,null,6,"figure",[],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.addFile()&&e),e},null,null)),(n()(),e.Sa(3,0,null,null,1,"figcaption",[],null,null,null,null,null)),(n()(),e.jb(-1,null,["Profile picture"])),(n()(),e.Sa(5,0,null,null,1,"tu-avatar",[["height","150px"],["style","{ display: inline-flex  padding: .25rem}"]],null,null,null,r.b,r.a)),e.Ra(6,49152,null,0,c.a,[],{src:[0,"src"],height:[1,"height"],radius:[2,"radius"]},null),(n()(),e.Sa(7,0,null,null,1,"span",[["class","snack"]],null,null,null,null,null)),(n()(),e.Sa(8,0,null,null,0,"i",[["class","ion-md-cloud-upload"]],null,null,null,null,null)),(n()(),e.Sa(9,0,[[1,0],["file",1]],null,0,"input",[["style","display: none"],["type","file"]],null,[[null,"change"]],function(n,l,t){var e=!0;return"change"===l&&(e=!1!==n.component.onFileAdded()&&e),e},null,null)),(n()(),e.Sa(10,0,null,null,8,"form",[["action",""]],null,null,null,null,null)),(n()(),e.Sa(11,0,null,null,3,"div",[["class","form-group"]],null,null,null,null,null)),(n()(),e.Sa(12,0,null,null,0,"input",[["autofocus",""],["formControlName","name"],["placeholder","Insert your name"],["required",""],["type","text"]],null,null,null,null,null)),(n()(),e.Sa(13,0,null,null,1,"label",[],null,null,null,null,null)),(n()(),e.jb(-1,null,["Name"])),(n()(),e.Sa(15,0,null,null,3,"div",[["class","form-group"]],null,null,null,null,null)),(n()(),e.Sa(16,0,null,null,0,"input",[["formControlName","email"],["placeholder","Email"],["required",""],["type","email"]],null,null,null,null,null)),(n()(),e.Sa(17,0,null,null,1,"label",[],null,null,null,null,null)),(n()(),e.jb(-1,null,["Email"]))],function(n,l){var t=l.component;n(l,6,0,null==t.user?null:t.user.avatarUrl,"150px",0)},null)}var p=e.Oa("tu-profile",a,function(n){return e.lb(0,[(n()(),e.Sa(0,0,null,null,1,"tu-profile",[],null,null,null,f,s)),e.Ra(1,245760,null,0,a,[u.a],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),g=t("Ip0R"),d=t("gIcY"),b=t("ZYCi"),m=t("PCNd");t.d(l,"SettingsModuleNgFactory",function(){return v});var v=e.Pa(o,[],function(n){return e.Za([e.ab(512,e.k,e.Ea,[[8,[i.a,p]],[3,e.k],e.z]),e.ab(4608,g.m,g.l,[e.w,[2,g.t]]),e.ab(4608,d.d,d.d,[]),e.ab(4608,d.q,d.q,[]),e.ab(1073742336,g.c,g.c,[]),e.ab(1073742336,d.o,d.o,[]),e.ab(1073742336,d.l,d.l,[]),e.ab(1073742336,b.n,b.n,[[2,b.t],[2,b.k]]),e.ab(1073742336,m.a,m.a,[]),e.ab(1073742336,o,o,[]),e.ab(1024,b.i,function(){return[[{path:"profile",component:a}]]},[])])})}}]);