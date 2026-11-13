/* Instituto Saúde em Equilíbrio — interações leves, sem dependências */
(function () {
  "use strict";
  var raiz = document.documentElement;
  raiz.classList.add("js");

  /* Modo revisão: abrir com ?revisao mostra as marcações PENDENTE. ?revisao=0 desliga. */
  try {
    var q = new URLSearchParams(location.search);
    if (q.has("revisao")) sessionStorage.setItem("revisao", q.get("revisao") === "0" ? "" : "1");
    if (sessionStorage.getItem("revisao")) raiz.classList.add("revisao");
  } catch (e) { if (/[?&]revisao(?!=0)/.test(location.search)) raiz.classList.add("revisao"); }

  /* ---------- Menu recolhível ---------- */
  var botao = document.querySelector(".menu-botao");
  var menu = document.getElementById("menu-principal");
  function fecharMenu() {
    if (!botao || !menu) return;
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
    menu.classList.remove("aberto");
  }
  if (botao && menu) {
    botao.addEventListener("click", function () {
      var aberto = botao.getAttribute("aria-expanded") === "true";
      botao.setAttribute("aria-expanded", String(!aberto));
      botao.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
      menu.classList.toggle("aberto", !aberto);
      if (!aberto) { var primeiro = menu.querySelector("a"); if (primeiro) primeiro.focus(); }
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) fecharMenu(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("aberto")) { fecharMenu(); botao.focus(); }
    });
    window.matchMedia("(min-width: 1081px)").addEventListener("change", function (m) { if (m.matches) fecharMenu(); });
  }

  /* ---------- Sombra do cabeçalho ao rolar ---------- */
  var topo = document.querySelector(".topo");
  if (topo) {
    var marcar = function () { topo.classList.toggle("rolou", window.scrollY > 8); };
    marcar();
    window.addEventListener("scroll", marcar, { passive: true });
  }

  /* ---------- Item ativo no menu (só na página inicial) ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu__lista a[href^="#"]'));
  if (links.length && "IntersectionObserver" in window) {
    var porId = {};
    links.forEach(function (a) { porId[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting && porId[en.target.id]) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          porId[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(porId).forEach(function (id) { var s = document.getElementById(id); if (s) obs.observe(s); });
  }

  /* ---------- Revelação suave ---------- */
  var revelar = document.querySelectorAll(".revelar");
  if (revelar.length && "IntersectionObserver" in window) {
    var obsR = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visivel"); obsR.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revelar.forEach(function (el) { obsR.observe(el); });
  } else {
    revelar.forEach(function (el) { el.classList.add("visivel"); });
  }

  /* ---------- Copiar chave Pix ---------- */
  document.querySelectorAll("[data-copiar]").forEach(function (btn) {
    var valor = btn.getAttribute("data-copiar");
    var aviso = document.getElementById(btn.getAttribute("aria-controls"));
    if (!valor) { btn.disabled = true; return; }
    btn.addEventListener("click", function () {
      var ok = function () { if (aviso) { aviso.textContent = "Chave Pix copiada. Obrigado pelo seu apoio!"; setTimeout(function () { aviso.textContent = ""; }, 5000); } };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(valor).then(ok, function () { copiarFallback(valor) && ok(); });
      } else if (copiarFallback(valor)) { ok(); }
    });
  });
  function copiarFallback(texto) {
    var t = document.createElement("textarea");
    t.value = texto; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    var ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(t); return ok;
  }

  /* ---------- Filtros da página de transparência ---------- */
  var filtros = document.querySelectorAll(".filtro");
  if (filtros.length) {
    filtros.forEach(function (f) {
      f.addEventListener("click", function () {
        var cat = f.getAttribute("data-filtro");
        filtros.forEach(function (o) { o.setAttribute("aria-pressed", String(o === f)); });
        document.querySelectorAll(".doc").forEach(function (d) {
          d.hidden = !(cat === "todos" || d.getAttribute("data-cat") === cat);
        });
        document.querySelectorAll(".ano").forEach(function (a) {
          a.hidden = !a.querySelector(".doc:not([hidden])");
        });
        var status = document.getElementById("filtro-status");
        if (status) status.textContent = cat === "todos" ? "Mostrando todos os documentos." : "Mostrando: " + f.textContent.trim() + ".";
      });
    });
  }

  /* ---------- Ano no rodapé ---------- */
  // Carrossel "O que fazemos": setas rolam um cartão e se desativam nas pontas
  document.querySelectorAll(".trilho").forEach(function (trilho) {
    var ant = document.querySelector('[data-carrossel="anterior"][aria-controls="' + trilho.id + '"]');
    var prox = document.querySelector('[data-carrossel="proximo"][aria-controls="' + trilho.id + '"]');
    if (!ant || !prox) return;
    function passo() {
      var c = trilho.children[0], d = trilho.children[1];
      return c ? (d ? d.offsetLeft - c.offsetLeft : c.offsetWidth) : trilho.clientWidth;
    }
    function atualizar() {
      var max = trilho.scrollWidth - trilho.clientWidth;
      ant.disabled = trilho.scrollLeft <= 2;
      prox.disabled = trilho.scrollLeft >= max - 2;
    }
    ant.addEventListener("click", function () { trilho.scrollBy({ left: -passo(), behavior: "smooth" }); });
    prox.addEventListener("click", function () { trilho.scrollBy({ left: passo(), behavior: "smooth" }); });
    trilho.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    atualizar();

    // Clicar e arrastar com o mouse (no toque, a rolagem nativa já faz isso)
    var arrastando = false, moveu = false, x0 = 0, s0 = 0, ultX = 0, ultT = 0, vel = 0;
    trilho.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      arrastando = true; moveu = false;
      x0 = ultX = e.clientX; s0 = trilho.scrollLeft; ultT = performance.now(); vel = 0;
      trilho.classList.add("arrastando");
      trilho.setPointerCapture(e.pointerId);
    });
    trilho.addEventListener("pointermove", function (e) {
      if (!arrastando) return;
      var dx = e.clientX - x0;
      if (Math.abs(dx) > 4) moveu = true;
      trilho.scrollLeft = s0 - dx;
      var agora = performance.now();
      if (agora > ultT) vel = (e.clientX - ultX) / (agora - ultT);
      ultX = e.clientX; ultT = agora;
    });
    function soltar(e) {
      if (!arrastando) return;
      arrastando = false;
      if (trilho.hasPointerCapture(e.pointerId)) trilho.releasePointerCapture(e.pointerId);
      // Encaixa no cartão mais próximo, com um empurrão na direção do gesto
      var p = passo(), alvo = trilho.scrollLeft - vel * 180;
      var destino = Math.round(alvo / p) * p;
      trilho.classList.remove("arrastando");
      trilho.scrollTo({ left: destino, behavior: "smooth" });
    }
    trilho.addEventListener("pointerup", soltar);
    trilho.addEventListener("pointercancel", soltar);
    // Depois de arrastar, não conta como clique; e evita arrastar imagens/textos
    trilho.addEventListener("click", function (e) { if (moveu) { e.preventDefault(); e.stopPropagation(); moveu = false; } }, true);
    trilho.addEventListener("dragstart", function (e) { e.preventDefault(); });
  });

  document.querySelectorAll("[data-ano]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
