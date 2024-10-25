"use strict";(self.webpackChunkestoque_react=self.webpackChunkestoque_react||[]).push([[116],{116:(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});var a=o(43),r=o(762),i=(o(557),o(579));const n=a.memo((()=>{const[e,t]=(0,a.useState)(""),[o,n]=(0,a.useState)(""),[l,s]=(0,a.useState)(""),[c,d]=(0,a.useState)(""),[u,p]=(0,a.useState)(""),[m,h]=(0,a.useState)(""),[x,j]=(0,a.useState)(""),[v,g]=(0,a.useState)(""),[S,f]=(0,a.useState)([]),[C,b]=(0,a.useState)(null),[N,y]=(0,a.useState)(""),[q,A]=(0,a.useState)({}),[O,M]=(0,a.useState)(!1);(0,a.useEffect)((()=>{const e=localStorage.getItem("medicamentos");e&&f(JSON.parse(e))}),[]);const E=()=>{t(""),n(""),s(""),d(""),p(""),h(""),j(""),g(""),b(null)},L=e=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e),I=()=>{const t={};return e||(t.nome="O nome \xe9 obrigat\xf3rio."),o||(t.laboratorio="O laborat\xf3rio \xe9 obrigat\xf3rio."),l||(t.tipoServico="Selecione um tipo de servi\xe7o."),c||(t.tipoMedicamento="Selecione um tipo de medicamento."),u||(t.lote="O lote \xe9 obrigat\xf3rio."),(!m||m<=0)&&(t.quantidade="A quantidade deve ser maior que zero."),x||(t.dataValidade="A data de validade \xe9 obrigat\xf3ria."),(!v||v<=0)&&(t.valor="O valor deve ser maior que zero."),A(t),0===Object.keys(t).length};return(0,i.jsxs)("div",{children:[O&&(0,i.jsx)("div",{className:"loading-indicator",children:"Carregando..."}),(0,i.jsxs)("form",{onSubmit:t=>{if(t.preventDefault(),!I())return;const a={nome:e.toUpperCase(),laboratorio:o.toUpperCase(),tipoServico:l.toUpperCase(),tipoMedicamento:c.toUpperCase(),lotes:[{lote:u.toUpperCase(),quantidade:m,dataValidade:x,valor:parseFloat(v.replace(/\./g,"").replace(",","."))}]},r=null!==C?S.map(((e,t)=>t===C?a:e)):[...S,a];f(r),localStorage.setItem("medicamentos",JSON.stringify(r)),E()},children:[(0,i.jsx)("input",{type:"text",placeholder:"Nome",value:e,onChange:e=>t(e.target.value),required:!0}),q.nome&&(0,i.jsx)("span",{className:"error",children:q.nome}),(0,i.jsx)("input",{type:"text",placeholder:"Laborat\xf3rio",value:o,onChange:e=>n(e.target.value),required:!0}),q.laboratorio&&(0,i.jsx)("span",{className:"error",children:q.laboratorio}),(0,i.jsxs)("select",{value:l,onChange:e=>s(e.target.value),required:!0,children:[(0,i.jsx)("option",{value:"",children:"Selecione um tipo de servi\xe7o..."}),(0,i.jsx)("option",{value:"ANEMIA FALCIFORME",children:"ANEMIA FALCIFORME"}),(0,i.jsx)("option",{value:"ANTIMICROBIANOS",children:"ANTIMICROBIANOS"})]}),q.tipoServico&&(0,i.jsx)("span",{className:"error",children:q.tipoServico}),(0,i.jsxs)("select",{value:c,onChange:e=>d(e.target.value),required:!0,children:[(0,i.jsx)("option",{value:"",children:"Selecione um tipo de medicamento..."}),(0,i.jsx)("option",{value:"ADESIVO",children:"ADESIVO"}),(0,i.jsx)("option",{value:"AMPOLA",children:"AMPOLA"})]}),q.tipoMedicamento&&(0,i.jsx)("span",{className:"error",children:q.tipoMedicamento}),(0,i.jsx)("input",{type:"text",placeholder:"Lote",value:u,onChange:e=>p(e.target.value),required:!0}),q.lote&&(0,i.jsx)("span",{className:"error",children:q.lote}),(0,i.jsx)("input",{type:"number",placeholder:"Quantidade",value:m,onChange:e=>h(e.target.value),required:!0}),q.quantidade&&(0,i.jsx)("span",{className:"error",children:q.quantidade}),(0,i.jsx)("input",{type:"date",placeholder:"Data de Validade",value:x,onChange:e=>j(e.target.value),required:!0}),q.dataValidade&&(0,i.jsx)("span",{className:"error",children:q.dataValidade}),(0,i.jsx)("input",{type:"text",placeholder:"Valor",value:L(v/100),onChange:e=>{const t=e.target.value.replace(/\D/g,""),o=L(t/100);g(t),e.target.value=o},required:!0}),q.valor&&(0,i.jsx)("span",{className:"error",children:q.valor}),(0,i.jsx)("button",{type:"submit",children:null!==C?"Atualizar Medicamento":"Adicionar Medicamento"})]}),(0,i.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"20px"},children:[(0,i.jsx)("input",{type:"text",placeholder:"Buscar Medicamento",value:N,onChange:e=>y(e.target.value),className:"search-input"}),(0,i.jsx)("button",{className:"search-button",onClick:()=>{},children:"Buscar"})]}),(0,i.jsxs)("div",{className:"export-buttons",children:[(0,i.jsx)("button",{onClick:()=>{M(!0);const e=JSON.stringify(S,null,2),t=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(t),a=document.createElement("a");a.href=o,a.download="medicamentos.json",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(o),M(!1)},children:"Exportar Medicamentos"}),(0,i.jsx)("input",{type:"file",accept:".json",onChange:e=>{const t=e.target.files[0];if(!t)return void alert("Por favor, selecione um arquivo.");M(!0);const o=new FileReader;o.onload=e=>{try{const t=JSON.parse(e.target.result);f(t)}catch(t){alert("Erro ao importar JSON. Verifique o formato do arquivo.")}finally{M(!1)}},o.readAsText(t)},style:{display:"none"},id:"file-input"}),(0,i.jsx)("button",{onClick:()=>document.getElementById("file-input").click(),className:"import-button",children:"Importar Medicamentos"}),(0,i.jsx)("button",{onClick:()=>{const e=JSON.parse(localStorage.getItem("medicamentos"))||[],t=new r.default,o=20,a=30,i=25,n=30,l=20,s=30,c=40;let d=20;const u=t.internal.pageSize.getWidth();t.setFontSize(10),t.text("Controle de Estoque de Medicamentos",u/2,d,{align:"center"}),d+=6,t.setFontSize(9),t.text(`Data: ${(new Date).toLocaleDateString()}`,u/2,d,{align:"center"}),d+=10,e.forEach((e=>{t.setFontSize(10);const r=d;t.setFillColor(220,220,220),t.rect(0,r,u,8,"F"),t.setTextColor(0);const p=e.nome||"";t.text(p,10,r+5),d+=11,t.setFontSize(7);let m=0,h=0;e.lotes.forEach((r=>{let u=10;const p=r.lote||"",x=r.dataValidade||"",j=e.tipoServico||"",v=e.tipoMedicamento||"",g=Number(r.quantidade)||0,S=Number(r.valor)||0,f=e.laboratorio||"";if(p){t.splitTextToSize(p,o).forEach(((e,a)=>{const r=u+o/2;t.text(e,r,d+5*a,{align:"center"})}))}if(u+=o,x){t.splitTextToSize(x,a).forEach(((e,o)=>{const r=u+a/2;t.text(e,r,d+5*o,{align:"center"})}))}if(u+=a,j){t.splitTextToSize(j,i).forEach(((e,o)=>{const a=u+i/2;t.text(e,a,d+5*o,{align:"center"})}))}if(u+=i,v){t.splitTextToSize(v,n).forEach(((e,o)=>{const a=u+n/2;t.text(e,a,d+5*o,{align:"center"})}))}u+=n;const C=u+l/2;t.text(g.toString(),C,d),m+=g,u+=l;const b=u+s/2;if(t.text(L(S),b,d),h+=S,u+=s,f){t.splitTextToSize(f,c).forEach(((e,o)=>{const a=u+c/2;t.text(e,a,d+5*o,{align:"center"})}))}d+=3,d+=3})),d+=3;const x=10+o+a+i+5;t.setFontSize(7);const j="Total:",v=t.getTextWidth(j);t.text(j,x+i/2-v/2,d);const g=x+(i+10);t.text(`${m}`,g,d);const S=x+(i+35);t.text(`${L(h)}`,S,d),d+=5})),t.save("estoque_medicamentos.pdf")},children:"Exportar PDF"})," "]}),(0,i.jsx)("div",{id:"estoque",children:(0,i.jsxs)("table",{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"Nome"}),(0,i.jsx)("th",{children:"Laborat\xf3rio"}),(0,i.jsx)("th",{children:"Tipo de Servi\xe7o"}),(0,i.jsx)("th",{children:"Tipo de Medicamento"}),(0,i.jsx)("th",{children:"Lote"}),(0,i.jsx)("th",{children:"Quantidade"}),(0,i.jsx)("th",{children:"Data de Validade"}),(0,i.jsx)("th",{children:"Valor"}),(0,i.jsx)("th",{children:"A\xe7\xf5es"})]})}),(0,i.jsx)("tbody",{children:S&&S.length>0?S.filter((e=>e.nome.toLowerCase().includes(N.toLowerCase())||e.laboratorio.toLowerCase().includes(N.toLowerCase())||e.tipoServico.toLowerCase().includes(N.toLowerCase())||e.tipoMedicamento.toLowerCase().includes(N.toLowerCase()))).map(((e,o)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:e.nome}),(0,i.jsx)("td",{children:e.laboratorio||"N/A"}),(0,i.jsx)("td",{children:e.tipoServico||"N/A"}),(0,i.jsx)("td",{children:e.tipoMedicamento||"N/A"}),(0,i.jsx)("td",{children:e.lotes.map((e=>e.lote)).join(", ")}),(0,i.jsx)("td",{children:e.lotes.map((e=>e.quantidade)).join(", ")}),(0,i.jsx)("td",{children:e.lotes.map((e=>e.dataValidade)).join(", ")}),(0,i.jsx)("td",{children:e.lotes.map((e=>L(e.valor))).join(", ")}),(0,i.jsxs)("td",{children:[(0,i.jsx)("button",{onClick:()=>(e=>{const o=S[e];t(o.nome),n(o.laboratorio),s(o.tipoServico),d(o.tipoMedicamento),p(o.lotes[0].lote),h(o.lotes[0].quantidade),j(o.lotes[0].dataValidade),g(L(o.lotes[0].valor)),b(e)})(o),children:"Editar"}),(0,i.jsx)("button",{onClick:()=>(e=>{if(window.confirm("Tem certeza que deseja excluir este medicamento?")){const t=S.filter(((t,o)=>o!==e));f(t),localStorage.setItem("medicamentos",JSON.stringify(t))}})(o),children:"Excluir"})]})]},o))):(0,i.jsx)("tr",{children:(0,i.jsx)("td",{colSpan:"9",children:"Nenhum medicamento encontrado."})})})]})})]})}))}}]);
//# sourceMappingURL=116.d5176211.chunk.js.map