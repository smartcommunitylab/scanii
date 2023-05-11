/*!
 * Bootstrap v5.3.0-alpha1 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t(require("@popperjs/core")))
    : "function" == typeof define && define.amd
    ? define(["@popperjs/core"], t)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).bootstrap =
        t(e.Popper));
})(this, function (e) {
  "use strict";
  const t = (function (e) {
      const t = Object.create(null, {
        [Symbol.toStringTag]: { value: "Module" },
      });
      if (e)
        for (const n in e)
          if ("default" !== n) {
            const i = Object.getOwnPropertyDescriptor(e, n);
            Object.defineProperty(
              t,
              n,
              i.get ? i : { enumerable: !0, get: () => e[n] }
            );
          }
      return (t.default = e), Object.freeze(t);
    })(e),
    n = "transitionend",
    i = (e) => (
      e &&
        window.CSS &&
        window.CSS.escape &&
        (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
      e
    ),
    s = (e) => {
      e.dispatchEvent(new Event(n));
    },
    r = (e) =>
      !(!e || "object" != typeof e) &&
      (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
    o = (e) =>
      r(e)
        ? e.jquery
          ? e[0]
          : e
        : "string" == typeof e && e.length > 0
        ? document.querySelector(i(e))
        : null,
    a = (e) => {
      if (!r(e) || 0 === e.getClientRects().length) return !1;
      const t =
          "visible" === getComputedStyle(e).getPropertyValue("visibility"),
        n = e.closest("details:not([open])");
      if (!n) return t;
      if (n !== e) {
        const t = e.closest("summary");
        if (t && t.parentNode !== n) return !1;
        if (null === t) return !1;
      }
      return t;
    },
    l = (e) =>
      !e ||
      e.nodeType !== Node.ELEMENT_NODE ||
      !!e.classList.contains("disabled") ||
      (void 0 !== e.disabled
        ? e.disabled
        : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
    c = (e) => {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof e.getRootNode) {
        const t = e.getRootNode();
        return t instanceof ShadowRoot ? t : null;
      }
      return e instanceof ShadowRoot
        ? e
        : e.parentNode
        ? c(e.parentNode)
        : null;
    },
    u = () => {},
    h = (e) => {
      e.offsetHeight;
    },
    d = () =>
      window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
        ? window.jQuery
        : null,
    f = [],
    p = () => "rtl" === document.documentElement.dir,
    g = (e) => {
      var t;
      (t = () => {
        const t = d();
        if (t) {
          const n = e.NAME,
            i = t.fn[n];
          (t.fn[n] = e.jQueryInterface),
            (t.fn[n].Constructor = e),
            (t.fn[n].noConflict = () => ((t.fn[n] = i), e.jQueryInterface));
        }
      }),
        "loading" === document.readyState
          ? (f.length ||
              document.addEventListener("DOMContentLoaded", () => {
                for (const e of f) e();
              }),
            f.push(t))
          : t();
    },
    _ = (e, t = [], n = e) => ("function" == typeof e ? e(...t) : n),
    m = (e, t, i = !0) => {
      if (!i) return void _(e);
      const r =
        ((e) => {
          if (!e) return 0;
          let { transitionDuration: t, transitionDelay: n } =
            window.getComputedStyle(e);
          const i = Number.parseFloat(t),
            s = Number.parseFloat(n);
          return i || s
            ? ((t = t.split(",")[0]),
              (n = n.split(",")[0]),
              1e3 * (Number.parseFloat(t) + Number.parseFloat(n)))
            : 0;
        })(t) + 5;
      let o = !1;
      const a = ({ target: i }) => {
        i === t && ((o = !0), t.removeEventListener(n, a), _(e));
      };
      t.addEventListener(n, a),
        setTimeout(() => {
          o || s(t);
        }, r);
    },
    v = (e, t, n, i) => {
      const s = e.length;
      let r = e.indexOf(t);
      return -1 === r
        ? !n && i
          ? e[s - 1]
          : e[0]
        : ((r += n ? 1 : -1),
          i && (r = (r + s) % s),
          e[Math.max(0, Math.min(r, s - 1))]);
    },
    y = /[^.]*(?=\..*)\.|.*/,
    b = /\..*/,
    w = /::\d+$/,
    x = {};
  let T = 1;
  const C = { mouseenter: "mouseover", mouseleave: "mouseout" },
    k = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function E(e, t) {
    return (t && `${t}::${T++}`) || e.uidEvent || T++;
  }
  function A(e) {
    const t = E(e);
    return (e.uidEvent = t), (x[t] = x[t] || {}), x[t];
  }
  function S(e, t, n = null) {
    return Object.values(e).find(
      (e) => e.callable === t && e.delegationSelector === n
    );
  }
  function N(e, t, n) {
    const i = "string" == typeof t,
      s = i ? n : t || n;
    let r = O(e);
    return k.has(r) || (r = e), [i, s, r];
  }
  function D(e, t, n, i, s) {
    if ("string" != typeof t || !e) return;
    let [r, o, a] = N(t, n, i);
    if (t in C) {
      const e = (e) =>
        function (t) {
          if (
            !t.relatedTarget ||
            (t.relatedTarget !== t.delegateTarget &&
              !t.delegateTarget.contains(t.relatedTarget))
          )
            return e.call(this, t);
        };
      o = e(o);
    }
    const l = A(e),
      c = l[a] || (l[a] = {}),
      u = S(c, o, r ? n : null);
    if (u) return void (u.oneOff = u.oneOff && s);
    const h = E(o, t.replace(y, "")),
      d = r
        ? (function (e, t, n) {
            return function i(s) {
              const r = e.querySelectorAll(t);
              for (let { target: o } = s; o && o !== this; o = o.parentNode)
                for (const a of r)
                  if (a === o)
                    return (
                      q(s, { delegateTarget: o }),
                      i.oneOff && I.off(e, s.type, t, n),
                      n.apply(o, [s])
                    );
            };
          })(e, n, o)
        : (function (e, t) {
            return function n(i) {
              return (
                q(i, { delegateTarget: e }),
                n.oneOff && I.off(e, i.type, t),
                t.apply(e, [i])
              );
            };
          })(e, o);
    (d.delegationSelector = r ? n : null),
      (d.callable = o),
      (d.oneOff = s),
      (d.uidEvent = h),
      (c[h] = d),
      e.addEventListener(a, d, r);
  }
  function L(e, t, n, i, s) {
    const r = S(t[n], i, s);
    r && (e.removeEventListener(n, r, Boolean(s)), delete t[n][r.uidEvent]);
  }
  function j(e, t, n, i) {
    const s = t[n] || {};
    for (const [r, o] of Object.entries(s))
      r.includes(i) && L(e, t, n, o.callable, o.delegationSelector);
  }
  function O(e) {
    return (e = e.replace(b, "")), C[e] || e;
  }
  const I = {
    on(e, t, n, i) {
      D(e, t, n, i, !1);
    },
    one(e, t, n, i) {
      D(e, t, n, i, !0);
    },
    off(e, t, n, i) {
      if ("string" != typeof t || !e) return;
      const [s, r, o] = N(t, n, i),
        a = o !== t,
        l = A(e),
        c = l[o] || {},
        u = t.startsWith(".");
      if (void 0 === r) {
        if (u) for (const n of Object.keys(l)) j(e, l, n, t.slice(1));
        for (const [n, i] of Object.entries(c)) {
          const s = n.replace(w, "");
          (a && !t.includes(s)) || L(e, l, o, i.callable, i.delegationSelector);
        }
      } else {
        if (!Object.keys(c).length) return;
        L(e, l, o, r, s ? n : null);
      }
    },
    trigger(e, t, n) {
      if ("string" != typeof t || !e) return null;
      const i = d();
      let s = null,
        r = !0,
        o = !0,
        a = !1;
      t !== O(t) &&
        i &&
        ((s = i.Event(t, n)),
        i(e).trigger(s),
        (r = !s.isPropagationStopped()),
        (o = !s.isImmediatePropagationStopped()),
        (a = s.isDefaultPrevented()));
      let l = new Event(t, { bubbles: r, cancelable: !0 });
      return (
        (l = q(l, n)),
        a && l.preventDefault(),
        o && e.dispatchEvent(l),
        l.defaultPrevented && s && s.preventDefault(),
        l
      );
    },
  };
  function q(e, t = {}) {
    for (const [n, i] of Object.entries(t))
      try {
        e[n] = i;
      } catch (t) {
        Object.defineProperty(e, n, { configurable: !0, get: () => i });
      }
    return e;
  }
  const M = new Map(),
    P = {
      set(e, t, n) {
        M.has(e) || M.set(e, new Map());
        const i = M.get(e);
        i.has(t) || 0 === i.size
          ? i.set(t, n)
          : console.error(
              `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                Array.from(i.keys())[0]
              }.`
            );
      },
      get: (e, t) => (M.has(e) && M.get(e).get(t)) || null,
      remove(e, t) {
        if (!M.has(e)) return;
        const n = M.get(e);
        n.delete(t), 0 === n.size && M.delete(e);
      },
    };
  function H(e) {
    if ("true" === e) return !0;
    if ("false" === e) return !1;
    if (e === Number(e).toString()) return Number(e);
    if ("" === e || "null" === e) return null;
    if ("string" != typeof e) return e;
    try {
      return JSON.parse(decodeURIComponent(e));
    } catch (t) {
      return e;
    }
  }
  function F(e) {
    return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
  }
  const W = {
    setDataAttribute(e, t, n) {
      e.setAttribute(`data-bs-${F(t)}`, n);
    },
    removeDataAttribute(e, t) {
      e.removeAttribute(`data-bs-${F(t)}`);
    },
    getDataAttributes(e) {
      if (!e) return {};
      const t = {},
        n = Object.keys(e.dataset).filter(
          (e) => e.startsWith("bs") && !e.startsWith("bsConfig")
        );
      for (const i of n) {
        let n = i.replace(/^bs/, "");
        (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
          (t[n] = H(e.dataset[i]));
      }
      return t;
    },
    getDataAttribute: (e, t) => H(e.getAttribute(`data-bs-${F(t)}`)),
  };
  class $ {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!'
      );
    }
    _getConfig(e) {
      return (
        (e = this._mergeConfigObj(e)),
        (e = this._configAfterMerge(e)),
        this._typeCheckConfig(e),
        e
      );
    }
    _configAfterMerge(e) {
      return e;
    }
    _mergeConfigObj(e, t) {
      const n = r(t) ? W.getDataAttribute(t, "config") : {};
      return {
        ...this.constructor.Default,
        ...("object" == typeof n ? n : {}),
        ...(r(t) ? W.getDataAttributes(t) : {}),
        ...("object" == typeof e ? e : {}),
      };
    }
    _typeCheckConfig(e, t = this.constructor.DefaultType) {
      for (const [i, s] of Object.entries(t)) {
        const t = e[i],
          o = r(t)
            ? "element"
            : null == (n = t)
            ? `${n}`
            : Object.prototype.toString
                .call(n)
                .match(/\s([a-z]+)/i)[1]
                .toLowerCase();
        if (!new RegExp(s).test(o))
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${o}" but expected type "${s}".`
          );
      }
      var n;
    }
  }
  class R extends $ {
    constructor(e, t) {
      super(),
        (e = o(e)) &&
          ((this._element = e),
          (this._config = this._getConfig(t)),
          P.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      P.remove(this._element, this.constructor.DATA_KEY),
        I.off(this._element, this.constructor.EVENT_KEY);
      for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
    }
    _queueCallback(e, t, n = !0) {
      m(e, t, n);
    }
    _getConfig(e) {
      return (
        (e = this._mergeConfigObj(e, this._element)),
        (e = this._configAfterMerge(e)),
        this._typeCheckConfig(e),
        e
      );
    }
    static getInstance(e) {
      return P.get(o(e), this.DATA_KEY);
    }
    static getOrCreateInstance(e, t = {}) {
      return (
        this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
      );
    }
    static get VERSION() {
      return "5.3.0-alpha1";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(e) {
      return `${e}${this.EVENT_KEY}`;
    }
  }
  const B = (e) => {
      let t = e.getAttribute("data-bs-target");
      if (!t || "#" === t) {
        let n = e.getAttribute("href");
        if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
        n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`),
          (t = n && "#" !== n ? n.trim() : null);
      }
      return i(t);
    },
    z = {
      find: (e, t = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(t, e)),
      findOne: (e, t = document.documentElement) =>
        Element.prototype.querySelector.call(t, e),
      children: (e, t) => [].concat(...e.children).filter((e) => e.matches(t)),
      parents(e, t) {
        const n = [];
        let i = e.parentNode.closest(t);
        for (; i; ) n.push(i), (i = i.parentNode.closest(t));
        return n;
      },
      prev(e, t) {
        let n = e.previousElementSibling;
        for (; n; ) {
          if (n.matches(t)) return [n];
          n = n.previousElementSibling;
        }
        return [];
      },
      next(e, t) {
        let n = e.nextElementSibling;
        for (; n; ) {
          if (n.matches(t)) return [n];
          n = n.nextElementSibling;
        }
        return [];
      },
      focusableChildren(e) {
        const t = [
          "a",
          "button",
          "input",
          "textarea",
          "select",
          "details",
          "[tabindex]",
          '[contenteditable="true"]',
        ]
          .map((e) => `${e}:not([tabindex^="-"])`)
          .join(",");
        return this.find(t, e).filter((e) => !l(e) && a(e));
      },
      getSelectorFromElement(e) {
        const t = B(e);
        return t && z.findOne(t) ? t : null;
      },
      getElementFromSelector(e) {
        const t = B(e);
        return t ? z.findOne(t) : null;
      },
      getMultipleElementsFromSelector(e) {
        const t = B(e);
        return t ? z.find(t) : [];
      },
    },
    U = (e, t = "hide") => {
      const n = `click.dismiss${e.EVENT_KEY}`,
        i = e.NAME;
      I.on(document, n, `[data-bs-dismiss="${i}"]`, function (n) {
        if (
          (["A", "AREA"].includes(this.tagName) && n.preventDefault(), l(this))
        )
          return;
        const s = z.getElementFromSelector(this) || this.closest(`.${i}`);
        e.getOrCreateInstance(s)[t]();
      });
    };
  class X extends R {
    static get NAME() {
      return "alert";
    }
    close() {
      if (I.trigger(this._element, "close.bs.alert").defaultPrevented) return;
      this._element.classList.remove("show");
      const e = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, e);
    }
    _destroyElement() {
      this._element.remove(),
        I.trigger(this._element, "closed.bs.alert"),
        this.dispose();
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = X.getOrCreateInstance(this);
        if ("string" == typeof e) {
          if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
            throw new TypeError(`No method named "${e}"`);
          t[e](this);
        }
      });
    }
  }
  U(X, "close"), g(X);
  const V = '[data-bs-toggle="button"]';
  class Q extends R {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active")
      );
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Q.getOrCreateInstance(this);
        "toggle" === e && t[e]();
      });
    }
  }
  I.on(document, "click.bs.button.data-api", V, (e) => {
    e.preventDefault();
    const t = e.target.closest(V);
    Q.getOrCreateInstance(t).toggle();
  }),
    g(Q);
  const K = { endCallback: null, leftCallback: null, rightCallback: null },
    Y = {
      endCallback: "(function|null)",
      leftCallback: "(function|null)",
      rightCallback: "(function|null)",
    };
  class G extends $ {
    constructor(e, t) {
      super(),
        (this._element = e),
        e &&
          G.isSupported() &&
          ((this._config = this._getConfig(t)),
          (this._deltaX = 0),
          (this._supportPointerEvents = Boolean(window.PointerEvent)),
          this._initEvents());
    }
    static get Default() {
      return K;
    }
    static get DefaultType() {
      return Y;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      I.off(this._element, ".bs.swipe");
    }
    _start(e) {
      this._supportPointerEvents
        ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
        : (this._deltaX = e.touches[0].clientX);
    }
    _end(e) {
      this._eventIsPointerPenTouch(e) &&
        (this._deltaX = e.clientX - this._deltaX),
        this._handleSwipe(),
        _(this._config.endCallback);
    }
    _move(e) {
      this._deltaX =
        e.touches && e.touches.length > 1
          ? 0
          : e.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const e = Math.abs(this._deltaX);
      if (e <= 40) return;
      const t = e / this._deltaX;
      (this._deltaX = 0),
        t && _(t > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents
        ? (I.on(this._element, "pointerdown.bs.swipe", (e) => this._start(e)),
          I.on(this._element, "pointerup.bs.swipe", (e) => this._end(e)),
          this._element.classList.add("pointer-event"))
        : (I.on(this._element, "touchstart.bs.swipe", (e) => this._start(e)),
          I.on(this._element, "touchmove.bs.swipe", (e) => this._move(e)),
          I.on(this._element, "touchend.bs.swipe", (e) => this._end(e)));
    }
    _eventIsPointerPenTouch(e) {
      return (
        this._supportPointerEvents &&
        ("pen" === e.pointerType || "touch" === e.pointerType)
      );
    }
    static isSupported() {
      return (
        "ontouchstart" in document.documentElement ||
        navigator.maxTouchPoints > 0
      );
    }
  }
  const J = "next",
    Z = "prev",
    ee = "left",
    te = "right",
    ne = "slid.bs.carousel",
    ie = "carousel",
    se = "active",
    re = { ArrowLeft: te, ArrowRight: ee },
    oe = {
      interval: 5e3,
      keyboard: !0,
      pause: "hover",
      ride: !1,
      touch: !0,
      wrap: !0,
    },
    ae = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      pause: "(string|boolean)",
      ride: "(boolean|string)",
      touch: "boolean",
      wrap: "boolean",
    };
  class le extends R {
    constructor(e, t) {
      super(e, t),
        (this._interval = null),
        (this._activeElement = null),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this._swipeHelper = null),
        (this._indicatorsElement = z.findOne(
          ".carousel-indicators",
          this._element
        )),
        this._addEventListeners(),
        this._config.ride === ie && this.cycle();
    }
    static get Default() {
      return oe;
    }
    static get DefaultType() {
      return ae;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(J);
    }
    nextWhenVisible() {
      !document.hidden && a(this._element) && this.next();
    }
    prev() {
      this._slide(Z);
    }
    pause() {
      this._isSliding && s(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(),
        this._updateInterval(),
        (this._interval = setInterval(
          () => this.nextWhenVisible(),
          this._config.interval
        ));
    }
    _maybeEnableCycle() {
      this._config.ride &&
        (this._isSliding
          ? I.one(this._element, ne, () => this.cycle())
          : this.cycle());
    }
    to(e) {
      const t = this._getItems();
      if (e > t.length - 1 || e < 0) return;
      if (this._isSliding)
        return void I.one(this._element, ne, () => this.to(e));
      const n = this._getItemIndex(this._getActive());
      if (n === e) return;
      const i = e > n ? J : Z;
      this._slide(i, t[e]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(e) {
      return (e.defaultInterval = e.interval), e;
    }
    _addEventListeners() {
      this._config.keyboard &&
        I.on(this._element, "keydown.bs.carousel", (e) => this._keydown(e)),
        "hover" === this._config.pause &&
          (I.on(this._element, "mouseenter.bs.carousel", () => this.pause()),
          I.on(this._element, "mouseleave.bs.carousel", () =>
            this._maybeEnableCycle()
          )),
        this._config.touch && G.isSupported() && this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const e of z.find(".carousel-item img", this._element))
        I.on(e, "dragstart.bs.carousel", (e) => e.preventDefault());
      const e = {
        leftCallback: () => this._slide(this._directionToOrder(ee)),
        rightCallback: () => this._slide(this._directionToOrder(te)),
        endCallback: () => {
          "hover" === this._config.pause &&
            (this.pause(),
            this.touchTimeout && clearTimeout(this.touchTimeout),
            (this.touchTimeout = setTimeout(
              () => this._maybeEnableCycle(),
              500 + this._config.interval
            )));
        },
      };
      this._swipeHelper = new G(this._element, e);
    }
    _keydown(e) {
      if (/input|textarea/i.test(e.target.tagName)) return;
      const t = re[e.key];
      t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
    }
    _getItemIndex(e) {
      return this._getItems().indexOf(e);
    }
    _setActiveIndicatorElement(e) {
      if (!this._indicatorsElement) return;
      const t = z.findOne(".active", this._indicatorsElement);
      t.classList.remove(se), t.removeAttribute("aria-current");
      const n = z.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
      n && (n.classList.add(se), n.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const e = this._activeElement || this._getActive();
      if (!e) return;
      const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
      this._config.interval = t || this._config.defaultInterval;
    }
    _slide(e, t = null) {
      if (this._isSliding) return;
      const n = this._getActive(),
        i = e === J,
        s = t || v(this._getItems(), n, i, this._config.wrap);
      if (s === n) return;
      const r = this._getItemIndex(s),
        o = (t) =>
          I.trigger(this._element, t, {
            relatedTarget: s,
            direction: this._orderToDirection(e),
            from: this._getItemIndex(n),
            to: r,
          });
      if (o("slide.bs.carousel").defaultPrevented) return;
      if (!n || !s) return;
      const a = Boolean(this._interval);
      this.pause(),
        (this._isSliding = !0),
        this._setActiveIndicatorElement(r),
        (this._activeElement = s);
      const l = i ? "carousel-item-start" : "carousel-item-end",
        c = i ? "carousel-item-next" : "carousel-item-prev";
      s.classList.add(c),
        h(s),
        n.classList.add(l),
        s.classList.add(l),
        this._queueCallback(
          () => {
            s.classList.remove(l, c),
              s.classList.add(se),
              n.classList.remove(se, c, l),
              (this._isSliding = !1),
              o(ne);
          },
          n,
          this._isAnimated()
        ),
        a && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return z.findOne(".active.carousel-item", this._element);
    }
    _getItems() {
      return z.find(".carousel-item", this._element);
    }
    _clearInterval() {
      this._interval &&
        (clearInterval(this._interval), (this._interval = null));
    }
    _directionToOrder(e) {
      return p() ? (e === ee ? Z : J) : e === ee ? J : Z;
    }
    _orderToDirection(e) {
      return p() ? (e === Z ? ee : te) : e === Z ? te : ee;
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = le.getOrCreateInstance(this, e);
        if ("number" != typeof e) {
          if ("string" == typeof e) {
            if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
              throw new TypeError(`No method named "${e}"`);
            t[e]();
          }
        } else t.to(e);
      });
    }
  }
  I.on(
    document,
    "click.bs.carousel.data-api",
    "[data-bs-slide], [data-bs-slide-to]",
    function (e) {
      const t = z.getElementFromSelector(this);
      if (!t || !t.classList.contains(ie)) return;
      e.preventDefault();
      const n = le.getOrCreateInstance(t),
        i = this.getAttribute("data-bs-slide-to");
      return i
        ? (n.to(i), void n._maybeEnableCycle())
        : "next" === W.getDataAttribute(this, "slide")
        ? (n.next(), void n._maybeEnableCycle())
        : (n.prev(), void n._maybeEnableCycle());
    }
  ),
    I.on(window, "load.bs.carousel.data-api", () => {
      const e = z.find('[data-bs-ride="carousel"]');
      for (const t of e) le.getOrCreateInstance(t);
    }),
    g(le);
  const ce = "show",
    ue = "collapse",
    he = "collapsing",
    de = '[data-bs-toggle="collapse"]',
    fe = { parent: null, toggle: !0 },
    pe = { parent: "(null|element)", toggle: "boolean" };
  class ge extends R {
    constructor(e, t) {
      super(e, t), (this._isTransitioning = !1), (this._triggerArray = []);
      const n = z.find(de);
      for (const e of n) {
        const t = z.getSelectorFromElement(e),
          n = z.find(t).filter((e) => e === this._element);
        null !== t && n.length && this._triggerArray.push(e);
      }
      this._initializeChildren(),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return fe;
    }
    static get DefaultType() {
      return pe;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let e = [];
      if (
        (this._config.parent &&
          (e = this._getFirstLevelChildren(
            ".collapse.show, .collapse.collapsing"
          )
            .filter((e) => e !== this._element)
            .map((e) => ge.getOrCreateInstance(e, { toggle: !1 }))),
        e.length && e[0]._isTransitioning)
      )
        return;
      if (I.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
      for (const t of e) t.hide();
      const t = this._getDimension();
      this._element.classList.remove(ue),
        this._element.classList.add(he),
        (this._element.style[t] = 0),
        this._addAriaAndCollapsedClass(this._triggerArray, !0),
        (this._isTransitioning = !0);
      const n = `scroll${t[0].toUpperCase() + t.slice(1)}`;
      this._queueCallback(
        () => {
          (this._isTransitioning = !1),
            this._element.classList.remove(he),
            this._element.classList.add(ue, ce),
            (this._element.style[t] = ""),
            I.trigger(this._element, "shown.bs.collapse");
        },
        this._element,
        !0
      ),
        (this._element.style[t] = `${this._element[n]}px`);
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) return;
      if (I.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
      const e = this._getDimension();
      (this._element.style[e] = `${
        this._element.getBoundingClientRect()[e]
      }px`),
        h(this._element),
        this._element.classList.add(he),
        this._element.classList.remove(ue, ce);
      for (const e of this._triggerArray) {
        const t = z.getElementFromSelector(e);
        t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
      }
      (this._isTransitioning = !0),
        (this._element.style[e] = ""),
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(he),
              this._element.classList.add(ue),
              I.trigger(this._element, "hidden.bs.collapse");
          },
          this._element,
          !0
        );
    }
    _isShown(e = this._element) {
      return e.classList.contains(ce);
    }
    _configAfterMerge(e) {
      return (e.toggle = Boolean(e.toggle)), (e.parent = o(e.parent)), e;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal")
        ? "width"
        : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const e = this._getFirstLevelChildren(de);
      for (const t of e) {
        const e = z.getElementFromSelector(t);
        e && this._addAriaAndCollapsedClass([t], this._isShown(e));
      }
    }
    _getFirstLevelChildren(e) {
      const t = z.find(":scope .collapse .collapse", this._config.parent);
      return z.find(e, this._config.parent).filter((e) => !t.includes(e));
    }
    _addAriaAndCollapsedClass(e, t) {
      if (e.length)
        for (const n of e)
          n.classList.toggle("collapsed", !t),
            n.setAttribute("aria-expanded", t);
    }
    static jQueryInterface(e) {
      const t = {};
      return (
        "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1),
        this.each(function () {
          const n = ge.getOrCreateInstance(this, t);
          if ("string" == typeof e) {
            if (void 0 === n[e]) throw new TypeError(`No method named "${e}"`);
            n[e]();
          }
        })
      );
    }
  }
  I.on(document, "click.bs.collapse.data-api", de, function (e) {
    ("A" === e.target.tagName ||
      (e.delegateTarget && "A" === e.delegateTarget.tagName)) &&
      e.preventDefault();
    for (const e of z.getMultipleElementsFromSelector(this))
      ge.getOrCreateInstance(e, { toggle: !1 }).toggle();
  }),
    g(ge);
  const _e = "dropdown",
    me = "ArrowUp",
    ve = "ArrowDown",
    ye = "click.bs.dropdown.data-api",
    be = "keydown.bs.dropdown.data-api",
    we = "show",
    xe = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Te = `${xe}.show`,
    Ce = ".dropdown-menu",
    ke = p() ? "top-end" : "top-start",
    Ee = p() ? "top-start" : "top-end",
    Ae = p() ? "bottom-end" : "bottom-start",
    Se = p() ? "bottom-start" : "bottom-end",
    Ne = p() ? "left-start" : "right-start",
    De = p() ? "right-start" : "left-start",
    Le = {
      autoClose: !0,
      boundary: "clippingParents",
      display: "dynamic",
      offset: [0, 2],
      popperConfig: null,
      reference: "toggle",
    },
    je = {
      autoClose: "(boolean|string)",
      boundary: "(string|element)",
      display: "string",
      offset: "(array|string|function)",
      popperConfig: "(null|object|function)",
      reference: "(string|element|object)",
    };
  class Oe extends R {
    constructor(e, t) {
      super(e, t),
        (this._popper = null),
        (this._parent = this._element.parentNode),
        (this._menu =
          z.next(this._element, Ce)[0] ||
          z.prev(this._element, Ce)[0] ||
          z.findOne(Ce, this._parent)),
        (this._inNavbar = this._detectNavbar());
    }
    static get Default() {
      return Le;
    }
    static get DefaultType() {
      return je;
    }
    static get NAME() {
      return _e;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (l(this._element) || this._isShown()) return;
      const e = { relatedTarget: this._element };
      if (!I.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
        if (
          (this._createPopper(),
          "ontouchstart" in document.documentElement &&
            !this._parent.closest(".navbar-nav"))
        )
          for (const e of [].concat(...document.body.children))
            I.on(e, "mouseover", u);
        this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.add(we),
          this._element.classList.add(we),
          I.trigger(this._element, "shown.bs.dropdown", e);
      }
    }
    hide() {
      if (l(this._element) || !this._isShown()) return;
      const e = { relatedTarget: this._element };
      this._completeHide(e);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _completeHide(e) {
      if (!I.trigger(this._element, "hide.bs.dropdown", e).defaultPrevented) {
        if ("ontouchstart" in document.documentElement)
          for (const e of [].concat(...document.body.children))
            I.off(e, "mouseover", u);
        this._popper && this._popper.destroy(),
          this._menu.classList.remove(we),
          this._element.classList.remove(we),
          this._element.setAttribute("aria-expanded", "false"),
          W.removeDataAttribute(this._menu, "popper"),
          I.trigger(this._element, "hidden.bs.dropdown", e);
      }
    }
    _getConfig(e) {
      if (
        "object" == typeof (e = super._getConfig(e)).reference &&
        !r(e.reference) &&
        "function" != typeof e.reference.getBoundingClientRect
      )
        throw new TypeError(
          `${_e.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
        );
      return e;
    }
    _createPopper() {
      if (void 0 === t)
        throw new TypeError(
          "Bootstrap's dropdowns require Popper (https://popper.js.org)"
        );
      let e = this._element;
      "parent" === this._config.reference
        ? (e = this._parent)
        : r(this._config.reference)
        ? (e = o(this._config.reference))
        : "object" == typeof this._config.reference &&
          (e = this._config.reference);
      const n = this._getPopperConfig();
      this._popper = t.createPopper(e, this._menu, n);
    }
    _isShown() {
      return this._menu.classList.contains(we);
    }
    _getPlacement() {
      const e = this._parent;
      if (e.classList.contains("dropend")) return Ne;
      if (e.classList.contains("dropstart")) return De;
      if (e.classList.contains("dropup-center")) return "top";
      if (e.classList.contains("dropdown-center")) return "bottom";
      const t =
        "end" ===
        getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return e.classList.contains("dropup") ? (t ? Ee : ke) : t ? Se : Ae;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: e } = this._config;
      return "string" == typeof e
        ? e.split(",").map((e) => Number.parseInt(e, 10))
        : "function" == typeof e
        ? (t) => e(t, this._element)
        : e;
    }
    _getPopperConfig() {
      const e = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        (this._inNavbar || "static" === this._config.display) &&
          (W.setDataAttribute(this._menu, "popper", "static"),
          (e.modifiers = [{ name: "applyStyles", enabled: !1 }])),
        { ...e, ..._(this._config.popperConfig, [e]) }
      );
    }
    _selectMenuItem({ key: e, target: t }) {
      const n = z
        .find(
          ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
          this._menu
        )
        .filter((e) => a(e));
      n.length && v(n, t, e === ve, !n.includes(t)).focus();
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Oe.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
    static clearMenus(e) {
      if (2 === e.button || ("keyup" === e.type && "Tab" !== e.key)) return;
      const t = z.find(Te);
      for (const n of t) {
        const t = Oe.getInstance(n);
        if (!t || !1 === t._config.autoClose) continue;
        const i = e.composedPath(),
          s = i.includes(t._menu);
        if (
          i.includes(t._element) ||
          ("inside" === t._config.autoClose && !s) ||
          ("outside" === t._config.autoClose && s)
        )
          continue;
        if (
          t._menu.contains(e.target) &&
          (("keyup" === e.type && "Tab" === e.key) ||
            /input|select|option|textarea|form/i.test(e.target.tagName))
        )
          continue;
        const r = { relatedTarget: t._element };
        "click" === e.type && (r.clickEvent = e), t._completeHide(r);
      }
    }
    static dataApiKeydownHandler(e) {
      const t = /input|textarea/i.test(e.target.tagName),
        n = "Escape" === e.key,
        i = [me, ve].includes(e.key);
      if (!i && !n) return;
      if (t && !n) return;
      e.preventDefault();
      const s = this.matches(xe)
          ? this
          : z.prev(this, xe)[0] ||
            z.next(this, xe)[0] ||
            z.findOne(xe, e.delegateTarget.parentNode),
        r = Oe.getOrCreateInstance(s);
      if (i) return e.stopPropagation(), r.show(), void r._selectMenuItem(e);
      r._isShown() && (e.stopPropagation(), r.hide(), s.focus());
    }
  }
  I.on(document, be, xe, Oe.dataApiKeydownHandler),
    I.on(document, be, Ce, Oe.dataApiKeydownHandler),
    I.on(document, ye, Oe.clearMenus),
    I.on(document, "keyup.bs.dropdown.data-api", Oe.clearMenus),
    I.on(document, ye, xe, function (e) {
      e.preventDefault(), Oe.getOrCreateInstance(this).toggle();
    }),
    g(Oe);
  const Ie = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    qe = ".sticky-top",
    Me = "padding-right",
    Pe = "margin-right";
  class He {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const e = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - e);
    }
    hide() {
      const e = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, Me, (t) => t + e),
        this._setElementAttributes(Ie, Me, (t) => t + e),
        this._setElementAttributes(qe, Pe, (t) => t - e);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, Me),
        this._resetElementAttributes(Ie, Me),
        this._resetElementAttributes(qe, Pe);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"),
        (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(e, t, n) {
      const i = this.getWidth();
      this._applyManipulationCallback(e, (e) => {
        if (e !== this._element && window.innerWidth > e.clientWidth + i)
          return;
        this._saveInitialAttribute(e, t);
        const s = window.getComputedStyle(e).getPropertyValue(t);
        e.style.setProperty(t, `${n(Number.parseFloat(s))}px`);
      });
    }
    _saveInitialAttribute(e, t) {
      const n = e.style.getPropertyValue(t);
      n && W.setDataAttribute(e, t, n);
    }
    _resetElementAttributes(e, t) {
      this._applyManipulationCallback(e, (e) => {
        const n = W.getDataAttribute(e, t);
        null !== n
          ? (W.removeDataAttribute(e, t), e.style.setProperty(t, n))
          : e.style.removeProperty(t);
      });
    }
    _applyManipulationCallback(e, t) {
      if (r(e)) t(e);
      else for (const n of z.find(e, this._element)) t(n);
    }
  }
  const Fe = "show",
    We = "mousedown.bs.backdrop",
    $e = {
      className: "modal-backdrop",
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: "body",
    },
    Re = {
      className: "string",
      clickCallback: "(function|null)",
      isAnimated: "boolean",
      isVisible: "boolean",
      rootElement: "(element|string)",
    };
  class Be extends $ {
    constructor(e) {
      super(),
        (this._config = this._getConfig(e)),
        (this._isAppended = !1),
        (this._element = null);
    }
    static get Default() {
      return $e;
    }
    static get DefaultType() {
      return Re;
    }
    static get NAME() {
      return "backdrop";
    }
    show(e) {
      if (!this._config.isVisible) return void _(e);
      this._append();
      const t = this._getElement();
      this._config.isAnimated && h(t),
        t.classList.add(Fe),
        this._emulateAnimation(() => {
          _(e);
        });
    }
    hide(e) {
      this._config.isVisible
        ? (this._getElement().classList.remove(Fe),
          this._emulateAnimation(() => {
            this.dispose(), _(e);
          }))
        : _(e);
    }
    dispose() {
      this._isAppended &&
        (I.off(this._element, We),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _getElement() {
      if (!this._element) {
        const e = document.createElement("div");
        (e.className = this._config.className),
          this._config.isAnimated && e.classList.add("fade"),
          (this._element = e);
      }
      return this._element;
    }
    _configAfterMerge(e) {
      return (e.rootElement = o(e.rootElement)), e;
    }
    _append() {
      if (this._isAppended) return;
      const e = this._getElement();
      this._config.rootElement.append(e),
        I.on(e, We, () => {
          _(this._config.clickCallback);
        }),
        (this._isAppended = !0);
    }
    _emulateAnimation(e) {
      m(e, this._getElement(), this._config.isAnimated);
    }
  }
  const ze = ".bs.focustrap",
    Ue = "backward",
    Xe = { autofocus: !0, trapElement: null },
    Ve = { autofocus: "boolean", trapElement: "element" };
  class Qe extends $ {
    constructor(e) {
      super(),
        (this._config = this._getConfig(e)),
        (this._isActive = !1),
        (this._lastTabNavDirection = null);
    }
    static get Default() {
      return Xe;
    }
    static get DefaultType() {
      return Ve;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive ||
        (this._config.autofocus && this._config.trapElement.focus(),
        I.off(document, ze),
        I.on(document, "focusin.bs.focustrap", (e) => this._handleFocusin(e)),
        I.on(document, "keydown.tab.bs.focustrap", (e) =>
          this._handleKeydown(e)
        ),
        (this._isActive = !0));
    }
    deactivate() {
      this._isActive && ((this._isActive = !1), I.off(document, ze));
    }
    _handleFocusin(e) {
      const { trapElement: t } = this._config;
      if (e.target === document || e.target === t || t.contains(e.target))
        return;
      const n = z.focusableChildren(t);
      0 === n.length
        ? t.focus()
        : this._lastTabNavDirection === Ue
        ? n[n.length - 1].focus()
        : n[0].focus();
    }
    _handleKeydown(e) {
      "Tab" === e.key &&
        (this._lastTabNavDirection = e.shiftKey ? Ue : "forward");
    }
  }
  const Ke = "hidden.bs.modal",
    Ye = "show.bs.modal",
    Ge = "modal-open",
    Je = "show",
    Ze = "modal-static",
    et = { backdrop: !0, focus: !0, keyboard: !0 },
    tt = {
      backdrop: "(boolean|string)",
      focus: "boolean",
      keyboard: "boolean",
    };
  class nt extends R {
    constructor(e, t) {
      super(e, t),
        (this._dialog = z.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        (this._isShown = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new He()),
        this._addEventListeners();
    }
    static get Default() {
      return et;
    }
    static get DefaultType() {
      return tt;
    }
    static get NAME() {
      return "modal";
    }
    toggle(e) {
      return this._isShown ? this.hide() : this.show(e);
    }
    show(e) {
      this._isShown ||
        this._isTransitioning ||
        I.trigger(this._element, Ye, { relatedTarget: e }).defaultPrevented ||
        ((this._isShown = !0),
        (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add(Ge),
        this._adjustDialog(),
        this._backdrop.show(() => this._showElement(e)));
    }
    hide() {
      this._isShown &&
        !this._isTransitioning &&
        (I.trigger(this._element, "hide.bs.modal").defaultPrevented ||
          ((this._isShown = !1),
          (this._isTransitioning = !0),
          this._focustrap.deactivate(),
          this._element.classList.remove(Je),
          this._queueCallback(
            () => this._hideModal(),
            this._element,
            this._isAnimated()
          )));
    }
    dispose() {
      for (const e of [window, this._dialog]) I.off(e, ".bs.modal");
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Be({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated(),
      });
    }
    _initializeFocusTrap() {
      return new Qe({ trapElement: this._element });
    }
    _showElement(e) {
      document.body.contains(this._element) ||
        document.body.append(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0);
      const t = z.findOne(".modal-body", this._dialog);
      t && (t.scrollTop = 0),
        h(this._element),
        this._element.classList.add(Je),
        this._queueCallback(
          () => {
            this._config.focus && this._focustrap.activate(),
              (this._isTransitioning = !1),
              I.trigger(this._element, "shown.bs.modal", { relatedTarget: e });
          },
          this._dialog,
          this._isAnimated()
        );
    }
    _addEventListeners() {
      I.on(this._element, "keydown.dismiss.bs.modal", (e) => {
        if ("Escape" === e.key)
          return this._config.keyboard
            ? (e.preventDefault(), void this.hide())
            : void this._triggerBackdropTransition();
      }),
        I.on(window, "resize.bs.modal", () => {
          this._isShown && !this._isTransitioning && this._adjustDialog();
        }),
        I.on(this._element, "mousedown.dismiss.bs.modal", (e) => {
          I.one(this._element, "click.dismiss.bs.modal", (t) => {
            this._element === e.target &&
              this._element === t.target &&
              ("static" !== this._config.backdrop
                ? this._config.backdrop && this.hide()
                : this._triggerBackdropTransition());
          });
        });
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove(Ge),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            I.trigger(this._element, Ke);
        });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (I.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented)
        return;
      const e =
          this._element.scrollHeight > document.documentElement.clientHeight,
        t = this._element.style.overflowY;
      "hidden" === t ||
        this._element.classList.contains(Ze) ||
        (e || (this._element.style.overflowY = "hidden"),
        this._element.classList.add(Ze),
        this._queueCallback(() => {
          this._element.classList.remove(Ze),
            this._queueCallback(() => {
              this._element.style.overflowY = t;
            }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const e =
          this._element.scrollHeight > document.documentElement.clientHeight,
        t = this._scrollBar.getWidth(),
        n = t > 0;
      if (n && !e) {
        const e = p() ? "paddingLeft" : "paddingRight";
        this._element.style[e] = `${t}px`;
      }
      if (!n && e) {
        const e = p() ? "paddingRight" : "paddingLeft";
        this._element.style[e] = `${t}px`;
      }
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(e, t) {
      return this.each(function () {
        const n = nt.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === n[e]) throw new TypeError(`No method named "${e}"`);
          n[e](t);
        }
      });
    }
  }
  I.on(
    document,
    "click.bs.modal.data-api",
    '[data-bs-toggle="modal"]',
    function (e) {
      const t = z.getElementFromSelector(this);
      ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
        I.one(t, Ye, (e) => {
          e.defaultPrevented ||
            I.one(t, Ke, () => {
              a(this) && this.focus();
            });
        });
      const n = z.findOne(".modal.show");
      n && nt.getInstance(n).hide(), nt.getOrCreateInstance(t).toggle(this);
    }
  ),
    U(nt),
    g(nt);
  const it = "show",
    st = "showing",
    rt = "hiding",
    ot = ".offcanvas.show",
    at = "hidePrevented.bs.offcanvas",
    lt = "hidden.bs.offcanvas",
    ct = { backdrop: !0, keyboard: !0, scroll: !1 },
    ut = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      scroll: "boolean",
    };
  class ht extends R {
    constructor(e, t) {
      super(e, t),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        this._addEventListeners();
    }
    static get Default() {
      return ct;
    }
    static get DefaultType() {
      return ut;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(e) {
      return this._isShown ? this.hide() : this.show(e);
    }
    show(e) {
      this._isShown ||
        I.trigger(this._element, "show.bs.offcanvas", { relatedTarget: e })
          .defaultPrevented ||
        ((this._isShown = !0),
        this._backdrop.show(),
        this._config.scroll || new He().hide(),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add(st),
        this._queueCallback(
          () => {
            (this._config.scroll && !this._config.backdrop) ||
              this._focustrap.activate(),
              this._element.classList.add(it),
              this._element.classList.remove(st),
              I.trigger(this._element, "shown.bs.offcanvas", {
                relatedTarget: e,
              });
          },
          this._element,
          !0
        ));
    }
    hide() {
      this._isShown &&
        (I.trigger(this._element, "hide.bs.offcanvas").defaultPrevented ||
          (this._focustrap.deactivate(),
          this._element.blur(),
          (this._isShown = !1),
          this._element.classList.add(rt),
          this._backdrop.hide(),
          this._queueCallback(
            () => {
              this._element.classList.remove(it, rt),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                this._config.scroll || new He().reset(),
                I.trigger(this._element, lt);
            },
            this._element,
            !0
          )));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const e = Boolean(this._config.backdrop);
      return new Be({
        className: "offcanvas-backdrop",
        isVisible: e,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: e
          ? () => {
              "static" !== this._config.backdrop
                ? this.hide()
                : I.trigger(this._element, at);
            }
          : null,
      });
    }
    _initializeFocusTrap() {
      return new Qe({ trapElement: this._element });
    }
    _addEventListeners() {
      I.on(this._element, "keydown.dismiss.bs.offcanvas", (e) => {
        "Escape" === e.key &&
          (this._config.keyboard ? this.hide() : I.trigger(this._element, at));
      });
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = ht.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
            throw new TypeError(`No method named "${e}"`);
          t[e](this);
        }
      });
    }
  }
  I.on(
    document,
    "click.bs.offcanvas.data-api",
    '[data-bs-toggle="offcanvas"]',
    function (e) {
      const t = z.getElementFromSelector(this);
      if ((["A", "AREA"].includes(this.tagName) && e.preventDefault(), l(this)))
        return;
      I.one(t, lt, () => {
        a(this) && this.focus();
      });
      const n = z.findOne(ot);
      n && n !== t && ht.getInstance(n).hide(),
        ht.getOrCreateInstance(t).toggle(this);
    }
  ),
    I.on(window, "load.bs.offcanvas.data-api", () => {
      for (const e of z.find(ot)) ht.getOrCreateInstance(e).show();
    }),
    I.on(window, "resize.bs.offcanvas", () => {
      for (const e of z.find("[aria-modal][class*=show][class*=offcanvas-]"))
        "fixed" !== getComputedStyle(e).position &&
          ht.getOrCreateInstance(e).hide();
    }),
    U(ht),
    g(ht);
  const dt = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    ft = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
    pt =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    gt = (e, t) => {
      const n = e.nodeName.toLowerCase();
      return t.includes(n)
        ? !dt.has(n) || Boolean(ft.test(e.nodeValue) || pt.test(e.nodeValue))
        : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
    },
    _t = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    mt = {
      allowList: _t,
      content: {},
      extraClass: "",
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: "<div></div>",
    },
    vt = {
      allowList: "object",
      content: "object",
      extraClass: "(string|function)",
      html: "boolean",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      template: "string",
    },
    yt = {
      entry: "(string|element|function|null)",
      selector: "(string|element)",
    };
  class bt extends $ {
    constructor(e) {
      super(), (this._config = this._getConfig(e));
    }
    static get Default() {
      return mt;
    }
    static get DefaultType() {
      return vt;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content)
        .map((e) => this._resolvePossibleFunction(e))
        .filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(e) {
      return (
        this._checkContent(e),
        (this._config.content = { ...this._config.content, ...e }),
        this
      );
    }
    toHtml() {
      const e = document.createElement("div");
      e.innerHTML = this._maybeSanitize(this._config.template);
      for (const [t, n] of Object.entries(this._config.content))
        this._setContent(e, n, t);
      const t = e.children[0],
        n = this._resolvePossibleFunction(this._config.extraClass);
      return n && t.classList.add(...n.split(" ")), t;
    }
    _typeCheckConfig(e) {
      super._typeCheckConfig(e), this._checkContent(e.content);
    }
    _checkContent(e) {
      for (const [t, n] of Object.entries(e))
        super._typeCheckConfig({ selector: t, entry: n }, yt);
    }
    _setContent(e, t, n) {
      const i = z.findOne(n, e);
      i &&
        ((t = this._resolvePossibleFunction(t))
          ? r(t)
            ? this._putElementInTemplate(o(t), i)
            : this._config.html
            ? (i.innerHTML = this._maybeSanitize(t))
            : (i.textContent = t)
          : i.remove());
    }
    _maybeSanitize(e) {
      return this._config.sanitize
        ? (function (e, t, n) {
            if (!e.length) return e;
            if (n && "function" == typeof n) return n(e);
            const i = new window.DOMParser().parseFromString(e, "text/html"),
              s = [].concat(...i.body.querySelectorAll("*"));
            for (const e of s) {
              const n = e.nodeName.toLowerCase();
              if (!Object.keys(t).includes(n)) {
                e.remove();
                continue;
              }
              const i = [].concat(...e.attributes),
                s = [].concat(t["*"] || [], t[n] || []);
              for (const t of i) gt(t, s) || e.removeAttribute(t.nodeName);
            }
            return i.body.innerHTML;
          })(e, this._config.allowList, this._config.sanitizeFn)
        : e;
    }
    _resolvePossibleFunction(e) {
      return _(e, [this]);
    }
    _putElementInTemplate(e, t) {
      if (this._config.html) return (t.innerHTML = ""), void t.append(e);
      t.textContent = e.textContent;
    }
  }
  const wt = new Set(["sanitize", "allowList", "sanitizeFn"]),
    xt = "fade",
    Tt = "show",
    Ct = ".modal",
    kt = "hide.bs.modal",
    Et = "hover",
    At = "focus",
    St = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: p() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: p() ? "right" : "left",
    },
    Nt = {
      allowList: _t,
      animation: !0,
      boundary: "clippingParents",
      container: !1,
      customClass: "",
      delay: 0,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      html: !1,
      offset: [0, 0],
      placement: "top",
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: "",
      trigger: "hover focus",
    },
    Dt = {
      allowList: "object",
      animation: "boolean",
      boundary: "(string|element)",
      container: "(string|element|boolean)",
      customClass: "(string|function)",
      delay: "(number|object)",
      fallbackPlacements: "array",
      html: "boolean",
      offset: "(array|string|function)",
      placement: "(string|function)",
      popperConfig: "(null|object|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      selector: "(string|boolean)",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
    };
  class Lt extends R {
    constructor(e, n) {
      if (void 0 === t)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(e, n),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._isHovered = null),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._templateFactory = null),
        (this._newContent = null),
        (this.tip = null),
        this._setListeners(),
        this._config.selector || this._fixTitle();
    }
    static get Default() {
      return Nt;
    }
    static get DefaultType() {
      return Dt;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled &&
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout),
        I.off(this._element.closest(Ct), kt, this._hideModalHandler),
        this._element.getAttribute("data-bs-original-title") &&
          this._element.setAttribute(
            "title",
            this._element.getAttribute("data-bs-original-title")
          ),
        this._disposePopper(),
        super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const e = I.trigger(this._element, this.constructor.eventName("show")),
        t = (
          c(this._element) || this._element.ownerDocument.documentElement
        ).contains(this._element);
      if (e.defaultPrevented || !t) return;
      this._disposePopper();
      const n = this._getTipElement();
      this._element.setAttribute("aria-describedby", n.getAttribute("id"));
      const { container: i } = this._config;
      if (
        (this._element.ownerDocument.documentElement.contains(this.tip) ||
          (i.append(n),
          I.trigger(this._element, this.constructor.eventName("inserted"))),
        (this._popper = this._createPopper(n)),
        n.classList.add(Tt),
        "ontouchstart" in document.documentElement)
      )
        for (const e of [].concat(...document.body.children))
          I.on(e, "mouseover", u);
      this._queueCallback(
        () => {
          I.trigger(this._element, this.constructor.eventName("shown")),
            !1 === this._isHovered && this._leave(),
            (this._isHovered = !1);
        },
        this.tip,
        this._isAnimated()
      );
    }
    hide() {
      if (
        this._isShown() &&
        !I.trigger(this._element, this.constructor.eventName("hide"))
          .defaultPrevented
      ) {
        if (
          (this._getTipElement().classList.remove(Tt),
          "ontouchstart" in document.documentElement)
        )
          for (const e of [].concat(...document.body.children))
            I.off(e, "mouseover", u);
        (this._activeTrigger.click = !1),
          (this._activeTrigger.focus = !1),
          (this._activeTrigger.hover = !1),
          (this._isHovered = null),
          this._queueCallback(
            () => {
              this._isWithActiveTrigger() ||
                (this._isHovered || this._disposePopper(),
                this._element.removeAttribute("aria-describedby"),
                I.trigger(this._element, this.constructor.eventName("hidden")));
            },
            this.tip,
            this._isAnimated()
          );
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      return (
        this.tip ||
          (this.tip = this._createTipElement(
            this._newContent || this._getContentForTemplate()
          )),
        this.tip
      );
    }
    _createTipElement(e) {
      const t = this._getTemplateFactory(e).toHtml();
      if (!t) return null;
      t.classList.remove(xt, Tt),
        t.classList.add(`bs-${this.constructor.NAME}-auto`);
      const n = ((e) => {
        do {
          e += Math.floor(1e6 * Math.random());
        } while (document.getElementById(e));
        return e;
      })(this.constructor.NAME).toString();
      return (
        t.setAttribute("id", n), this._isAnimated() && t.classList.add(xt), t
      );
    }
    setContent(e) {
      (this._newContent = e),
        this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(e) {
      return (
        this._templateFactory
          ? this._templateFactory.changeContent(e)
          : (this._templateFactory = new bt({
              ...this._config,
              content: e,
              extraClass: this._resolvePossibleFunction(
                this._config.customClass
              ),
            })),
        this._templateFactory
      );
    }
    _getContentForTemplate() {
      return { ".tooltip-inner": this._getTitle() };
    }
    _getTitle() {
      return (
        this._resolvePossibleFunction(this._config.title) ||
        this._element.getAttribute("data-bs-original-title")
      );
    }
    _initializeOnDelegatedTarget(e) {
      return this.constructor.getOrCreateInstance(
        e.delegateTarget,
        this._getDelegateConfig()
      );
    }
    _isAnimated() {
      return (
        this._config.animation || (this.tip && this.tip.classList.contains(xt))
      );
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(Tt);
    }
    _createPopper(e) {
      const n = _(this._config.placement, [this, e, this._element]),
        i = St[n.toUpperCase()];
      return t.createPopper(this._element, e, this._getPopperConfig(i));
    }
    _getOffset() {
      const { offset: e } = this._config;
      return "string" == typeof e
        ? e.split(",").map((e) => Number.parseInt(e, 10))
        : "function" == typeof e
        ? (t) => e(t, this._element)
        : e;
    }
    _resolvePossibleFunction(e) {
      return _(e, [this._element]);
    }
    _getPopperConfig(e) {
      const t = {
        placement: e,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "preSetPlacement",
            enabled: !0,
            phase: "beforeMain",
            fn: (e) => {
              this._getTipElement().setAttribute(
                "data-popper-placement",
                e.state.placement
              );
            },
          },
        ],
      };
      return { ...t, ..._(this._config.popperConfig, [t]) };
    }
    _setListeners() {
      const e = this._config.trigger.split(" ");
      for (const t of e)
        if ("click" === t)
          I.on(
            this._element,
            this.constructor.eventName("click"),
            this._config.selector,
            (e) => {
              this._initializeOnDelegatedTarget(e).toggle();
            }
          );
        else if ("manual" !== t) {
          const e =
              t === Et
                ? this.constructor.eventName("mouseenter")
                : this.constructor.eventName("focusin"),
            n =
              t === Et
                ? this.constructor.eventName("mouseleave")
                : this.constructor.eventName("focusout");
          I.on(this._element, e, this._config.selector, (e) => {
            const t = this._initializeOnDelegatedTarget(e);
            (t._activeTrigger["focusin" === e.type ? At : Et] = !0), t._enter();
          }),
            I.on(this._element, n, this._config.selector, (e) => {
              const t = this._initializeOnDelegatedTarget(e);
              (t._activeTrigger["focusout" === e.type ? At : Et] =
                t._element.contains(e.relatedTarget)),
                t._leave();
            });
        }
      (this._hideModalHandler = () => {
        this._element && this.hide();
      }),
        I.on(this._element.closest(Ct), kt, this._hideModalHandler);
    }
    _fixTitle() {
      const e = this._element.getAttribute("title");
      e &&
        (this._element.getAttribute("aria-label") ||
          this._element.textContent.trim() ||
          this._element.setAttribute("aria-label", e),
        this._element.setAttribute("data-bs-original-title", e),
        this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered
        ? (this._isHovered = !0)
        : ((this._isHovered = !0),
          this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() ||
        ((this._isHovered = !1),
        this._setTimeout(() => {
          this._isHovered || this.hide();
        }, this._config.delay.hide));
    }
    _setTimeout(e, t) {
      clearTimeout(this._timeout), (this._timeout = setTimeout(e, t));
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0);
    }
    _getConfig(e) {
      const t = W.getDataAttributes(this._element);
      for (const e of Object.keys(t)) wt.has(e) && delete t[e];
      return (
        (e = { ...t, ...("object" == typeof e && e ? e : {}) }),
        (e = this._mergeConfigObj(e)),
        (e = this._configAfterMerge(e)),
        this._typeCheckConfig(e),
        e
      );
    }
    _configAfterMerge(e) {
      return (
        (e.container = !1 === e.container ? document.body : o(e.container)),
        "number" == typeof e.delay &&
          (e.delay = { show: e.delay, hide: e.delay }),
        "number" == typeof e.title && (e.title = e.title.toString()),
        "number" == typeof e.content && (e.content = e.content.toString()),
        e
      );
    }
    _getDelegateConfig() {
      const e = {};
      for (const [t, n] of Object.entries(this._config))
        this.constructor.Default[t] !== n && (e[t] = n);
      return (e.selector = !1), (e.trigger = "manual"), e;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), (this._popper = null)),
        this.tip && (this.tip.remove(), (this.tip = null));
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Lt.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  g(Lt);
  const jt = {
      ...Lt.Default,
      content: "",
      offset: [0, 8],
      placement: "right",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: "click",
    },
    Ot = { ...Lt.DefaultType, content: "(null|string|element|function)" };
  class It extends Lt {
    static get Default() {
      return jt;
    }
    static get DefaultType() {
      return Ot;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return {
        ".popover-header": this._getTitle(),
        ".popover-body": this._getContent(),
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = It.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  g(It);
  const qt = "click.bs.scrollspy",
    Mt = "active",
    Pt = "[href]",
    Ht = {
      offset: null,
      rootMargin: "0px 0px -25%",
      smoothScroll: !1,
      target: null,
      threshold: [0.1, 0.5, 1],
    },
    Ft = {
      offset: "(number|null)",
      rootMargin: "string",
      smoothScroll: "boolean",
      target: "element",
      threshold: "array",
    };
  class Wt extends R {
    constructor(e, t) {
      super(e, t),
        (this._targetLinks = new Map()),
        (this._observableSections = new Map()),
        (this._rootElement =
          "visible" === getComputedStyle(this._element).overflowY
            ? null
            : this._element),
        (this._activeTarget = null),
        (this._observer = null),
        (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
        this.refresh();
    }
    static get Default() {
      return Ht;
    }
    static get DefaultType() {
      return Ft;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(),
        this._maybeEnableSmoothScroll(),
        this._observer
          ? this._observer.disconnect()
          : (this._observer = this._getNewObserver());
      for (const e of this._observableSections.values())
        this._observer.observe(e);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(e) {
      return (
        (e.target = o(e.target) || document.body),
        (e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin),
        "string" == typeof e.threshold &&
          (e.threshold = e.threshold
            .split(",")
            .map((e) => Number.parseFloat(e))),
        e
      );
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll &&
        (I.off(this._config.target, qt),
        I.on(this._config.target, qt, Pt, (e) => {
          const t = this._observableSections.get(e.target.hash);
          if (t) {
            e.preventDefault();
            const n = this._rootElement || window,
              i = t.offsetTop - this._element.offsetTop;
            if (n.scrollTo)
              return void n.scrollTo({ top: i, behavior: "smooth" });
            n.scrollTop = i;
          }
        }));
    }
    _getNewObserver() {
      const e = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin,
      };
      return new IntersectionObserver((e) => this._observerCallback(e), e);
    }
    _observerCallback(e) {
      const t = (e) => this._targetLinks.get(`#${e.target.id}`),
        n = (e) => {
          (this._previousScrollData.visibleEntryTop = e.target.offsetTop),
            this._process(t(e));
        },
        i = (this._rootElement || document.documentElement).scrollTop,
        s = i >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = i;
      for (const r of e) {
        if (!r.isIntersecting) {
          (this._activeTarget = null), this._clearActiveClass(t(r));
          continue;
        }
        const e =
          r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (s && e) {
          if ((n(r), !i)) return;
        } else s || e || n(r);
      }
    }
    _initializeTargetsAndObservables() {
      (this._targetLinks = new Map()), (this._observableSections = new Map());
      const e = z.find(Pt, this._config.target);
      for (const t of e) {
        if (!t.hash || l(t)) continue;
        const e = z.findOne(t.hash, this._element);
        a(e) &&
          (this._targetLinks.set(t.hash, t),
          this._observableSections.set(t.hash, e));
      }
    }
    _process(e) {
      this._activeTarget !== e &&
        (this._clearActiveClass(this._config.target),
        (this._activeTarget = e),
        e.classList.add(Mt),
        this._activateParents(e),
        I.trigger(this._element, "activate.bs.scrollspy", {
          relatedTarget: e,
        }));
    }
    _activateParents(e) {
      if (e.classList.contains("dropdown-item"))
        z.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(Mt);
      else
        for (const t of z.parents(e, ".nav, .list-group"))
          for (const e of z.prev(
            t,
            ".nav-link, .nav-item > .nav-link, .list-group-item"
          ))
            e.classList.add(Mt);
    }
    _clearActiveClass(e) {
      e.classList.remove(Mt);
      const t = z.find("[href].active", e);
      for (const e of t) e.classList.remove(Mt);
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Wt.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
            throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  I.on(window, "load.bs.scrollspy.data-api", () => {
    for (const e of z.find('[data-bs-spy="scroll"]')) Wt.getOrCreateInstance(e);
  }),
    g(Wt);
  const $t = "ArrowLeft",
    Rt = "ArrowRight",
    Bt = "ArrowUp",
    zt = "ArrowDown",
    Ut = "active",
    Xt = "fade",
    Vt = "show",
    Qt =
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    Kt = `.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${Qt}`;
  class Yt extends R {
    constructor(e) {
      super(e),
        (this._parent = this._element.closest(
          '.list-group, .nav, [role="tablist"]'
        )),
        this._parent &&
          (this._setInitialAttributes(this._parent, this._getChildren()),
          I.on(this._element, "keydown.bs.tab", (e) => this._keydown(e)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const e = this._element;
      if (this._elemIsActive(e)) return;
      const t = this._getActiveElem(),
        n = t ? I.trigger(t, "hide.bs.tab", { relatedTarget: e }) : null;
      I.trigger(e, "show.bs.tab", { relatedTarget: t }).defaultPrevented ||
        (n && n.defaultPrevented) ||
        (this._deactivate(t, e), this._activate(e, t));
    }
    _activate(e, t) {
      e &&
        (e.classList.add(Ut),
        this._activate(z.getElementFromSelector(e)),
        this._queueCallback(
          () => {
            "tab" === e.getAttribute("role")
              ? (e.removeAttribute("tabindex"),
                e.setAttribute("aria-selected", !0),
                this._toggleDropDown(e, !0),
                I.trigger(e, "shown.bs.tab", { relatedTarget: t }))
              : e.classList.add(Vt);
          },
          e,
          e.classList.contains(Xt)
        ));
    }
    _deactivate(e, t) {
      e &&
        (e.classList.remove(Ut),
        e.blur(),
        this._deactivate(z.getElementFromSelector(e)),
        this._queueCallback(
          () => {
            "tab" === e.getAttribute("role")
              ? (e.setAttribute("aria-selected", !1),
                e.setAttribute("tabindex", "-1"),
                this._toggleDropDown(e, !1),
                I.trigger(e, "hidden.bs.tab", { relatedTarget: t }))
              : e.classList.remove(Vt);
          },
          e,
          e.classList.contains(Xt)
        ));
    }
    _keydown(e) {
      if (![$t, Rt, Bt, zt].includes(e.key)) return;
      e.stopPropagation(), e.preventDefault();
      const t = [Rt, zt].includes(e.key),
        n = v(
          this._getChildren().filter((e) => !l(e)),
          e.target,
          t,
          !0
        );
      n && (n.focus({ preventScroll: !0 }), Yt.getOrCreateInstance(n).show());
    }
    _getChildren() {
      return z.find(Kt, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((e) => this._elemIsActive(e)) || null;
    }
    _setInitialAttributes(e, t) {
      this._setAttributeIfNotExists(e, "role", "tablist");
      for (const e of t) this._setInitialAttributesOnChild(e);
    }
    _setInitialAttributesOnChild(e) {
      e = this._getInnerElement(e);
      const t = this._elemIsActive(e),
        n = this._getOuterElement(e);
      e.setAttribute("aria-selected", t),
        n !== e && this._setAttributeIfNotExists(n, "role", "presentation"),
        t || e.setAttribute("tabindex", "-1"),
        this._setAttributeIfNotExists(e, "role", "tab"),
        this._setInitialAttributesOnTargetPanel(e);
    }
    _setInitialAttributesOnTargetPanel(e) {
      const t = z.getElementFromSelector(e);
      t &&
        (this._setAttributeIfNotExists(t, "role", "tabpanel"),
        e.id &&
          this._setAttributeIfNotExists(t, "aria-labelledby", `#${e.id}`));
    }
    _toggleDropDown(e, t) {
      const n = this._getOuterElement(e);
      if (!n.classList.contains("dropdown")) return;
      const i = (e, i) => {
        const s = z.findOne(e, n);
        s && s.classList.toggle(i, t);
      };
      i(".dropdown-toggle", Ut),
        i(".dropdown-menu", Vt),
        n.setAttribute("aria-expanded", t);
    }
    _setAttributeIfNotExists(e, t, n) {
      e.hasAttribute(t) || e.setAttribute(t, n);
    }
    _elemIsActive(e) {
      return e.classList.contains(Ut);
    }
    _getInnerElement(e) {
      return e.matches(Kt) ? e : z.findOne(Kt, e);
    }
    _getOuterElement(e) {
      return e.closest(".nav-item, .list-group-item") || e;
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Yt.getOrCreateInstance(this);
        if ("string" == typeof e) {
          if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
            throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  I.on(document, "click.bs.tab", Qt, function (e) {
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
      l(this) || Yt.getOrCreateInstance(this).show();
  }),
    I.on(window, "load.bs.tab", () => {
      for (const e of z.find(
        '.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]'
      ))
        Yt.getOrCreateInstance(e);
    }),
    g(Yt);
  const Gt = "hide",
    Jt = "show",
    Zt = "showing",
    en = { animation: "boolean", autohide: "boolean", delay: "number" },
    tn = { animation: !0, autohide: !0, delay: 5e3 };
  class nn extends R {
    constructor(e, t) {
      super(e, t),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get Default() {
      return tn;
    }
    static get DefaultType() {
      return en;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      I.trigger(this._element, "show.bs.toast").defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade"),
        this._element.classList.remove(Gt),
        h(this._element),
        this._element.classList.add(Jt, Zt),
        this._queueCallback(
          () => {
            this._element.classList.remove(Zt),
              I.trigger(this._element, "shown.bs.toast"),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation
        ));
    }
    hide() {
      this.isShown() &&
        (I.trigger(this._element, "hide.bs.toast").defaultPrevented ||
          (this._element.classList.add(Zt),
          this._queueCallback(
            () => {
              this._element.classList.add(Gt),
                this._element.classList.remove(Zt, Jt),
                I.trigger(this._element, "hidden.bs.toast");
            },
            this._element,
            this._config.animation
          )));
    }
    dispose() {
      this._clearTimeout(),
        this.isShown() && this._element.classList.remove(Jt),
        super.dispose();
    }
    isShown() {
      return this._element.classList.contains(Jt);
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(e, t) {
      switch (e.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = t;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = t;
      }
      if (t) return void this._clearTimeout();
      const n = e.relatedTarget;
      this._element === n ||
        this._element.contains(n) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      I.on(this._element, "mouseover.bs.toast", (e) =>
        this._onInteraction(e, !0)
      ),
        I.on(this._element, "mouseout.bs.toast", (e) =>
          this._onInteraction(e, !1)
        ),
        I.on(this._element, "focusin.bs.toast", (e) =>
          this._onInteraction(e, !0)
        ),
        I.on(this._element, "focusout.bs.toast", (e) =>
          this._onInteraction(e, !1)
        );
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = nn.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
          t[e](this);
        }
      });
    }
  }
  return (
    U(nn),
    g(nn),
    {
      Alert: X,
      Button: Q,
      Carousel: le,
      Collapse: ge,
      Dropdown: Oe,
      Modal: nt,
      Offcanvas: ht,
      Popover: It,
      ScrollSpy: Wt,
      Tab: Yt,
      Toast: nn,
      Tooltip: Lt,
    }
  );
}),
  /*!
   * jQuery JavaScript Library v3.6.4
   * https://jquery.com/
   *
   * Includes Sizzle.js
   * https://sizzlejs.com/
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2023-03-08T15:28Z
   */
  (function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e.document
          ? t(e, !0)
          : function (e) {
              if (!e.document)
                throw new Error("jQuery requires a window with a document");
              return t(e);
            })
      : t(e);
  })("undefined" != typeof window ? window : this, function (e, t) {
    "use strict";
    var n = [],
      i = Object.getPrototypeOf,
      s = n.slice,
      r = n.flat
        ? function (e) {
            return n.flat.call(e);
          }
        : function (e) {
            return n.concat.apply([], e);
          },
      o = n.push,
      a = n.indexOf,
      l = {},
      c = l.toString,
      u = l.hasOwnProperty,
      h = u.toString,
      d = h.call(Object),
      f = {},
      p = function (e) {
        return (
          "function" == typeof e &&
          "number" != typeof e.nodeType &&
          "function" != typeof e.item
        );
      },
      g = function (e) {
        return null != e && e === e.window;
      },
      _ = e.document,
      m = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function v(e, t, n) {
      var i,
        s,
        r = (n = n || _).createElement("script");
      if (((r.text = e), t))
        for (i in m)
          (s = t[i] || (t.getAttribute && t.getAttribute(i))) &&
            r.setAttribute(i, s);
      n.head.appendChild(r).parentNode.removeChild(r);
    }
    function y(e) {
      return null == e
        ? e + ""
        : "object" == typeof e || "function" == typeof e
        ? l[c.call(e)] || "object"
        : typeof e;
    }
    var b = "3.6.4",
      w = function (e, t) {
        return new w.fn.init(e, t);
      };
    function x(e) {
      var t = !!e && "length" in e && e.length,
        n = y(e);
      return (
        !p(e) &&
        !g(e) &&
        ("array" === n ||
          0 === t ||
          ("number" == typeof t && t > 0 && t - 1 in e))
      );
    }
    (w.fn = w.prototype =
      {
        jquery: b,
        constructor: w,
        length: 0,
        toArray: function () {
          return s.call(this);
        },
        get: function (e) {
          return null == e
            ? s.call(this)
            : e < 0
            ? this[e + this.length]
            : this[e];
        },
        pushStack: function (e) {
          var t = w.merge(this.constructor(), e);
          return (t.prevObject = this), t;
        },
        each: function (e) {
          return w.each(this, e);
        },
        map: function (e) {
          return this.pushStack(
            w.map(this, function (t, n) {
              return e.call(t, n, t);
            })
          );
        },
        slice: function () {
          return this.pushStack(s.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        even: function () {
          return this.pushStack(
            w.grep(this, function (e, t) {
              return (t + 1) % 2;
            })
          );
        },
        odd: function () {
          return this.pushStack(
            w.grep(this, function (e, t) {
              return t % 2;
            })
          );
        },
        eq: function (e) {
          var t = this.length,
            n = +e + (e < 0 ? t : 0);
          return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: o,
        sort: n.sort,
        splice: n.splice,
      }),
      (w.extend = w.fn.extend =
        function () {
          var e,
            t,
            n,
            i,
            s,
            r,
            o = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
          for (
            "boolean" == typeof o && ((c = o), (o = arguments[a] || {}), a++),
              "object" == typeof o || p(o) || (o = {}),
              a === l && ((o = this), a--);
            a < l;
            a++
          )
            if (null != (e = arguments[a]))
              for (t in e)
                (i = e[t]),
                  "__proto__" !== t &&
                    o !== i &&
                    (c && i && (w.isPlainObject(i) || (s = Array.isArray(i)))
                      ? ((n = o[t]),
                        (r =
                          s && !Array.isArray(n)
                            ? []
                            : s || w.isPlainObject(n)
                            ? n
                            : {}),
                        (s = !1),
                        (o[t] = w.extend(c, r, i)))
                      : void 0 !== i && (o[t] = i));
          return o;
        }),
      w.extend({
        expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw new Error(e);
        },
        noop: function () {},
        isPlainObject: function (e) {
          var t, n;
          return (
            !(!e || "[object Object]" !== c.call(e)) &&
            (!(t = i(e)) ||
              ("function" ==
                typeof (n = u.call(t, "constructor") && t.constructor) &&
                h.call(n) === d))
          );
        },
        isEmptyObject: function (e) {
          var t;
          for (t in e) return !1;
          return !0;
        },
        globalEval: function (e, t, n) {
          v(e, { nonce: t && t.nonce }, n);
        },
        each: function (e, t) {
          var n,
            i = 0;
          if (x(e))
            for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
          else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
          return e;
        },
        makeArray: function (e, t) {
          var n = t || [];
          return (
            null != e &&
              (x(Object(e))
                ? w.merge(n, "string" == typeof e ? [e] : e)
                : o.call(n, e)),
            n
          );
        },
        inArray: function (e, t, n) {
          return null == t ? -1 : a.call(t, e, n);
        },
        merge: function (e, t) {
          for (var n = +t.length, i = 0, s = e.length; i < n; i++)
            e[s++] = t[i];
          return (e.length = s), e;
        },
        grep: function (e, t, n) {
          for (var i = [], s = 0, r = e.length, o = !n; s < r; s++)
            !t(e[s], s) !== o && i.push(e[s]);
          return i;
        },
        map: function (e, t, n) {
          var i,
            s,
            o = 0,
            a = [];
          if (x(e))
            for (i = e.length; o < i; o++)
              null != (s = t(e[o], o, n)) && a.push(s);
          else for (o in e) null != (s = t(e[o], o, n)) && a.push(s);
          return r(a);
        },
        guid: 1,
        support: f,
      }),
      "function" == typeof Symbol &&
        (w.fn[Symbol.iterator] = n[Symbol.iterator]),
      w.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (e, t) {
          l["[object " + t + "]"] = t.toLowerCase();
        }
      );
    var T =
      /*!
       * Sizzle CSS Selector Engine v2.3.10
       * https://sizzlejs.com/
       *
       * Copyright JS Foundation and other contributors
       * Released under the MIT license
       * https://js.foundation/
       *
       * Date: 2023-02-14
       */
      (function (e) {
        var t,
          n,
          i,
          s,
          r,
          o,
          a,
          l,
          c,
          u,
          h,
          d,
          f,
          p,
          g,
          _,
          m,
          v,
          y,
          b = "sizzle" + 1 * new Date(),
          w = e.document,
          x = 0,
          T = 0,
          C = le(),
          k = le(),
          E = le(),
          A = le(),
          S = function (e, t) {
            return e === t && (h = !0), 0;
          },
          N = {}.hasOwnProperty,
          D = [],
          L = D.pop,
          j = D.push,
          O = D.push,
          I = D.slice,
          q = function (e, t) {
            for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
            return -1;
          },
          M =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          P = "[\\x20\\t\\r\\n\\f]",
          H =
            "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
          F =
            "\\[[\\x20\\t\\r\\n\\f]*(" +
            H +
            ")(?:" +
            P +
            "*([*^$|!~]?=)" +
            P +
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
            H +
            "))|)" +
            P +
            "*\\]",
          W =
            ":(" +
            H +
            ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
            F +
            ")*)|.*)\\)|)",
          $ = new RegExp(P + "+", "g"),
          R = new RegExp(
            "^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$",
            "g"
          ),
          B = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"),
          z = new RegExp(
            "^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"
          ),
          U = new RegExp(P + "|>"),
          X = new RegExp(W),
          V = new RegExp("^" + H + "$"),
          Q = {
            ID: new RegExp("^#(" + H + ")"),
            CLASS: new RegExp("^\\.(" + H + ")"),
            TAG: new RegExp("^(" + H + "|[*])"),
            ATTR: new RegExp("^" + F),
            PSEUDO: new RegExp("^" + W),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + M + ")$", "i"),
            needsContext: new RegExp(
              "^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
              "i"
            ),
          },
          K = /HTML$/i,
          Y = /^(?:input|select|textarea|button)$/i,
          G = /^h\d$/i,
          J = /^[^{]+\{\s*\[native \w/,
          Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          ee = /[+~]/,
          te = new RegExp(
            "\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])",
            "g"
          ),
          ne = function (e, t) {
            var n = "0x" + e.slice(1) - 65536;
            return (
              t ||
              (n < 0
                ? String.fromCharCode(n + 65536)
                : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
            );
          },
          ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
          se = function (e, t) {
            return t
              ? "\0" === e
                ? "\ufffd"
                : e.slice(0, -1) +
                  "\\" +
                  e.charCodeAt(e.length - 1).toString(16) +
                  " "
              : "\\" + e;
          },
          re = function () {
            d();
          },
          oe = be(
            function (e) {
              return (
                !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
              );
            },
            { dir: "parentNode", next: "legend" }
          );
        try {
          O.apply((D = I.call(w.childNodes)), w.childNodes),
            D[w.childNodes.length].nodeType;
        } catch (e) {
          O = {
            apply: D.length
              ? function (e, t) {
                  j.apply(e, I.call(t));
                }
              : function (e, t) {
                  for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                  e.length = n - 1;
                },
          };
        }
        function ae(e, t, i, s) {
          var r,
            a,
            c,
            u,
            h,
            p,
            m,
            v = t && t.ownerDocument,
            w = t ? t.nodeType : 9;
          if (
            ((i = i || []),
            "string" != typeof e || !e || (1 !== w && 9 !== w && 11 !== w))
          )
            return i;
          if (!s && (d(t), (t = t || f), g)) {
            if (11 !== w && (h = Z.exec(e)))
              if ((r = h[1])) {
                if (9 === w) {
                  if (!(c = t.getElementById(r))) return i;
                  if (c.id === r) return i.push(c), i;
                } else if (
                  v &&
                  (c = v.getElementById(r)) &&
                  y(t, c) &&
                  c.id === r
                )
                  return i.push(c), i;
              } else {
                if (h[2]) return O.apply(i, t.getElementsByTagName(e)), i;
                if (
                  (r = h[3]) &&
                  n.getElementsByClassName &&
                  t.getElementsByClassName
                )
                  return O.apply(i, t.getElementsByClassName(r)), i;
              }
            if (
              n.qsa &&
              !A[e + " "] &&
              (!_ || !_.test(e)) &&
              (1 !== w || "object" !== t.nodeName.toLowerCase())
            ) {
              if (((m = e), (v = t), 1 === w && (U.test(e) || z.test(e)))) {
                for (
                  ((v = (ee.test(e) && me(t.parentNode)) || t) === t &&
                    n.scope) ||
                    ((u = t.getAttribute("id"))
                      ? (u = u.replace(ie, se))
                      : t.setAttribute("id", (u = b))),
                    a = (p = o(e)).length;
                  a--;

                )
                  p[a] = (u ? "#" + u : ":scope") + " " + ye(p[a]);
                m = p.join(",");
              }
              try {
                return O.apply(i, v.querySelectorAll(m)), i;
              } catch (t) {
                A(e, !0);
              } finally {
                u === b && t.removeAttribute("id");
              }
            }
          }
          return l(e.replace(R, "$1"), t, i, s);
        }
        function le() {
          var e = [];
          return function t(n, s) {
            return (
              e.push(n + " ") > i.cacheLength && delete t[e.shift()],
              (t[n + " "] = s)
            );
          };
        }
        function ce(e) {
          return (e[b] = !0), e;
        }
        function ue(e) {
          var t = f.createElement("fieldset");
          try {
            return !!e(t);
          } catch (e) {
            return !1;
          } finally {
            t.parentNode && t.parentNode.removeChild(t), (t = null);
          }
        }
        function he(e, t) {
          for (var n = e.split("|"), s = n.length; s--; )
            i.attrHandle[n[s]] = t;
        }
        function de(e, t) {
          var n = t && e,
            i =
              n &&
              1 === e.nodeType &&
              1 === t.nodeType &&
              e.sourceIndex - t.sourceIndex;
          if (i) return i;
          if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
          return e ? 1 : -1;
        }
        function fe(e) {
          return function (t) {
            return "input" === t.nodeName.toLowerCase() && t.type === e;
          };
        }
        function pe(e) {
          return function (t) {
            var n = t.nodeName.toLowerCase();
            return ("input" === n || "button" === n) && t.type === e;
          };
        }
        function ge(e) {
          return function (t) {
            return "form" in t
              ? t.parentNode && !1 === t.disabled
                ? "label" in t
                  ? "label" in t.parentNode
                    ? t.parentNode.disabled === e
                    : t.disabled === e
                  : t.isDisabled === e || (t.isDisabled !== !e && oe(t) === e)
                : t.disabled === e
              : "label" in t && t.disabled === e;
          };
        }
        function _e(e) {
          return ce(function (t) {
            return (
              (t = +t),
              ce(function (n, i) {
                for (var s, r = e([], n.length, t), o = r.length; o--; )
                  n[(s = r[o])] && (n[s] = !(i[s] = n[s]));
              })
            );
          });
        }
        function me(e) {
          return e && void 0 !== e.getElementsByTagName && e;
        }
        for (t in ((n = ae.support = {}),
        (r = ae.isXML =
          function (e) {
            var t = e && e.namespaceURI,
              n = e && (e.ownerDocument || e).documentElement;
            return !K.test(t || (n && n.nodeName) || "HTML");
          }),
        (d = ae.setDocument =
          function (e) {
            var t,
              s,
              o = e ? e.ownerDocument || e : w;
            return o != f && 9 === o.nodeType && o.documentElement
              ? ((p = (f = o).documentElement),
                (g = !r(f)),
                w != f &&
                  (s = f.defaultView) &&
                  s.top !== s &&
                  (s.addEventListener
                    ? s.addEventListener("unload", re, !1)
                    : s.attachEvent && s.attachEvent("onunload", re)),
                (n.scope = ue(function (e) {
                  return (
                    p.appendChild(e).appendChild(f.createElement("div")),
                    void 0 !== e.querySelectorAll &&
                      !e.querySelectorAll(":scope fieldset div").length
                  );
                })),
                (n.cssHas = ue(function () {
                  try {
                    return f.querySelector(":has(*,:jqfake)"), !1;
                  } catch (e) {
                    return !0;
                  }
                })),
                (n.attributes = ue(function (e) {
                  return (e.className = "i"), !e.getAttribute("className");
                })),
                (n.getElementsByTagName = ue(function (e) {
                  return (
                    e.appendChild(f.createComment("")),
                    !e.getElementsByTagName("*").length
                  );
                })),
                (n.getElementsByClassName = J.test(f.getElementsByClassName)),
                (n.getById = ue(function (e) {
                  return (
                    (p.appendChild(e).id = b),
                    !f.getElementsByName || !f.getElementsByName(b).length
                  );
                })),
                n.getById
                  ? ((i.filter.ID = function (e) {
                      var t = e.replace(te, ne);
                      return function (e) {
                        return e.getAttribute("id") === t;
                      };
                    }),
                    (i.find.ID = function (e, t) {
                      if (void 0 !== t.getElementById && g) {
                        var n = t.getElementById(e);
                        return n ? [n] : [];
                      }
                    }))
                  : ((i.filter.ID = function (e) {
                      var t = e.replace(te, ne);
                      return function (e) {
                        var n =
                          void 0 !== e.getAttributeNode &&
                          e.getAttributeNode("id");
                        return n && n.value === t;
                      };
                    }),
                    (i.find.ID = function (e, t) {
                      if (void 0 !== t.getElementById && g) {
                        var n,
                          i,
                          s,
                          r = t.getElementById(e);
                        if (r) {
                          if ((n = r.getAttributeNode("id")) && n.value === e)
                            return [r];
                          for (
                            s = t.getElementsByName(e), i = 0;
                            (r = s[i++]);

                          )
                            if ((n = r.getAttributeNode("id")) && n.value === e)
                              return [r];
                        }
                        return [];
                      }
                    })),
                (i.find.TAG = n.getElementsByTagName
                  ? function (e, t) {
                      return void 0 !== t.getElementsByTagName
                        ? t.getElementsByTagName(e)
                        : n.qsa
                        ? t.querySelectorAll(e)
                        : void 0;
                    }
                  : function (e, t) {
                      var n,
                        i = [],
                        s = 0,
                        r = t.getElementsByTagName(e);
                      if ("*" === e) {
                        for (; (n = r[s++]); ) 1 === n.nodeType && i.push(n);
                        return i;
                      }
                      return r;
                    }),
                (i.find.CLASS =
                  n.getElementsByClassName &&
                  function (e, t) {
                    if (void 0 !== t.getElementsByClassName && g)
                      return t.getElementsByClassName(e);
                  }),
                (m = []),
                (_ = []),
                (n.qsa = J.test(f.querySelectorAll)) &&
                  (ue(function (e) {
                    var t;
                    (p.appendChild(e).innerHTML =
                      "<a id='" +
                      b +
                      "'></a><select id='" +
                      b +
                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                      e.querySelectorAll("[msallowcapture^='']").length &&
                        _.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"),
                      e.querySelectorAll("[selected]").length ||
                        _.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|" + M + ")"),
                      e.querySelectorAll("[id~=" + b + "-]").length ||
                        _.push("~="),
                      (t = f.createElement("input")).setAttribute("name", ""),
                      e.appendChild(t),
                      e.querySelectorAll("[name='']").length ||
                        _.push(
                          "\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"
                        ),
                      e.querySelectorAll(":checked").length ||
                        _.push(":checked"),
                      e.querySelectorAll("a#" + b + "+*").length ||
                        _.push(".#.+[+~]"),
                      e.querySelectorAll("\\\f"),
                      _.push("[\\r\\n\\f]");
                  }),
                  ue(function (e) {
                    e.innerHTML =
                      "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = f.createElement("input");
                    t.setAttribute("type", "hidden"),
                      e.appendChild(t).setAttribute("name", "D"),
                      e.querySelectorAll("[name=d]").length &&
                        _.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="),
                      2 !== e.querySelectorAll(":enabled").length &&
                        _.push(":enabled", ":disabled"),
                      (p.appendChild(e).disabled = !0),
                      2 !== e.querySelectorAll(":disabled").length &&
                        _.push(":enabled", ":disabled"),
                      e.querySelectorAll("*,:x"),
                      _.push(",.*:");
                  })),
                (n.matchesSelector = J.test(
                  (v =
                    p.matches ||
                    p.webkitMatchesSelector ||
                    p.mozMatchesSelector ||
                    p.oMatchesSelector ||
                    p.msMatchesSelector)
                )) &&
                  ue(function (e) {
                    (n.disconnectedMatch = v.call(e, "*")),
                      v.call(e, "[s!='']:x"),
                      m.push("!=", W);
                  }),
                n.cssHas || _.push(":has"),
                (_ = _.length && new RegExp(_.join("|"))),
                (m = m.length && new RegExp(m.join("|"))),
                (t = J.test(p.compareDocumentPosition)),
                (y =
                  t || J.test(p.contains)
                    ? function (e, t) {
                        var n = (9 === e.nodeType && e.documentElement) || e,
                          i = t && t.parentNode;
                        return (
                          e === i ||
                          !(
                            !i ||
                            1 !== i.nodeType ||
                            !(n.contains
                              ? n.contains(i)
                              : e.compareDocumentPosition &&
                                16 & e.compareDocumentPosition(i))
                          )
                        );
                      }
                    : function (e, t) {
                        if (t)
                          for (; (t = t.parentNode); ) if (t === e) return !0;
                        return !1;
                      }),
                (S = t
                  ? function (e, t) {
                      if (e === t) return (h = !0), 0;
                      var i =
                        !e.compareDocumentPosition - !t.compareDocumentPosition;
                      return (
                        i ||
                        (1 &
                          (i =
                            (e.ownerDocument || e) == (t.ownerDocument || t)
                              ? e.compareDocumentPosition(t)
                              : 1) ||
                        (!n.sortDetached && t.compareDocumentPosition(e) === i)
                          ? e == f || (e.ownerDocument == w && y(w, e))
                            ? -1
                            : t == f || (t.ownerDocument == w && y(w, t))
                            ? 1
                            : u
                            ? q(u, e) - q(u, t)
                            : 0
                          : 4 & i
                          ? -1
                          : 1)
                      );
                    }
                  : function (e, t) {
                      if (e === t) return (h = !0), 0;
                      var n,
                        i = 0,
                        s = e.parentNode,
                        r = t.parentNode,
                        o = [e],
                        a = [t];
                      if (!s || !r)
                        return e == f
                          ? -1
                          : t == f
                          ? 1
                          : s
                          ? -1
                          : r
                          ? 1
                          : u
                          ? q(u, e) - q(u, t)
                          : 0;
                      if (s === r) return de(e, t);
                      for (n = e; (n = n.parentNode); ) o.unshift(n);
                      for (n = t; (n = n.parentNode); ) a.unshift(n);
                      for (; o[i] === a[i]; ) i++;
                      return i
                        ? de(o[i], a[i])
                        : o[i] == w
                        ? -1
                        : a[i] == w
                        ? 1
                        : 0;
                    }),
                f)
              : f;
          }),
        (ae.matches = function (e, t) {
          return ae(e, null, null, t);
        }),
        (ae.matchesSelector = function (e, t) {
          if (
            (d(e),
            n.matchesSelector &&
              g &&
              !A[t + " "] &&
              (!m || !m.test(t)) &&
              (!_ || !_.test(t)))
          )
            try {
              var i = v.call(e, t);
              if (
                i ||
                n.disconnectedMatch ||
                (e.document && 11 !== e.document.nodeType)
              )
                return i;
            } catch (e) {
              A(t, !0);
            }
          return ae(t, f, null, [e]).length > 0;
        }),
        (ae.contains = function (e, t) {
          return (e.ownerDocument || e) != f && d(e), y(e, t);
        }),
        (ae.attr = function (e, t) {
          (e.ownerDocument || e) != f && d(e);
          var s = i.attrHandle[t.toLowerCase()],
            r =
              s && N.call(i.attrHandle, t.toLowerCase()) ? s(e, t, !g) : void 0;
          return void 0 !== r
            ? r
            : n.attributes || !g
            ? e.getAttribute(t)
            : (r = e.getAttributeNode(t)) && r.specified
            ? r.value
            : null;
        }),
        (ae.escape = function (e) {
          return (e + "").replace(ie, se);
        }),
        (ae.error = function (e) {
          throw new Error("Syntax error, unrecognized expression: " + e);
        }),
        (ae.uniqueSort = function (e) {
          var t,
            i = [],
            s = 0,
            r = 0;
          if (
            ((h = !n.detectDuplicates),
            (u = !n.sortStable && e.slice(0)),
            e.sort(S),
            h)
          ) {
            for (; (t = e[r++]); ) t === e[r] && (s = i.push(r));
            for (; s--; ) e.splice(i[s], 1);
          }
          return (u = null), e;
        }),
        (s = ae.getText =
          function (e) {
            var t,
              n = "",
              i = 0,
              r = e.nodeType;
            if (r) {
              if (1 === r || 9 === r || 11 === r) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += s(e);
              } else if (3 === r || 4 === r) return e.nodeValue;
            } else for (; (t = e[i++]); ) n += s(t);
            return n;
          }),
        (i = ae.selectors =
          {
            cacheLength: 50,
            createPseudo: ce,
            match: Q,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (e) {
                return (
                  (e[1] = e[1].replace(te, ne)),
                  (e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne)),
                  "~=" === e[2] && (e[3] = " " + e[3] + " "),
                  e.slice(0, 4)
                );
              },
              CHILD: function (e) {
                return (
                  (e[1] = e[1].toLowerCase()),
                  "nth" === e[1].slice(0, 3)
                    ? (e[3] || ae.error(e[0]),
                      (e[4] = +(e[4]
                        ? e[5] + (e[6] || 1)
                        : 2 * ("even" === e[3] || "odd" === e[3]))),
                      (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                    : e[3] && ae.error(e[0]),
                  e
                );
              },
              PSEUDO: function (e) {
                var t,
                  n = !e[6] && e[2];
                return Q.CHILD.test(e[0])
                  ? null
                  : (e[3]
                      ? (e[2] = e[4] || e[5] || "")
                      : n &&
                        X.test(n) &&
                        (t = o(n, !0)) &&
                        (t = n.indexOf(")", n.length - t) - n.length) &&
                        ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                    e.slice(0, 3));
              },
            },
            filter: {
              TAG: function (e) {
                var t = e.replace(te, ne).toLowerCase();
                return "*" === e
                  ? function () {
                      return !0;
                    }
                  : function (e) {
                      return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
              },
              CLASS: function (e) {
                var t = C[e + " "];
                return (
                  t ||
                  ((t = new RegExp(
                    "(^|[\\x20\\t\\r\\n\\f])" + e + "(" + P + "|$)"
                  )) &&
                    C(e, function (e) {
                      return t.test(
                        ("string" == typeof e.className && e.className) ||
                          (void 0 !== e.getAttribute &&
                            e.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (e, t, n) {
                return function (i) {
                  var s = ae.attr(i, e);
                  return null == s
                    ? "!=" === t
                    : !t ||
                        ((s += ""),
                        "=" === t
                          ? s === n
                          : "!=" === t
                          ? s !== n
                          : "^=" === t
                          ? n && 0 === s.indexOf(n)
                          : "*=" === t
                          ? n && s.indexOf(n) > -1
                          : "$=" === t
                          ? n && s.slice(-n.length) === n
                          : "~=" === t
                          ? (" " + s.replace($, " ") + " ").indexOf(n) > -1
                          : "|=" === t &&
                            (s === n || s.slice(0, n.length + 1) === n + "-"));
                };
              },
              CHILD: function (e, t, n, i, s) {
                var r = "nth" !== e.slice(0, 3),
                  o = "last" !== e.slice(-4),
                  a = "of-type" === t;
                return 1 === i && 0 === s
                  ? function (e) {
                      return !!e.parentNode;
                    }
                  : function (t, n, l) {
                      var c,
                        u,
                        h,
                        d,
                        f,
                        p,
                        g = r !== o ? "nextSibling" : "previousSibling",
                        _ = t.parentNode,
                        m = a && t.nodeName.toLowerCase(),
                        v = !l && !a,
                        y = !1;
                      if (_) {
                        if (r) {
                          for (; g; ) {
                            for (d = t; (d = d[g]); )
                              if (
                                a
                                  ? d.nodeName.toLowerCase() === m
                                  : 1 === d.nodeType
                              )
                                return !1;
                            p = g = "only" === e && !p && "nextSibling";
                          }
                          return !0;
                        }
                        if (((p = [o ? _.firstChild : _.lastChild]), o && v)) {
                          for (
                            y =
                              (f =
                                (c =
                                  (u =
                                    (h = (d = _)[b] || (d[b] = {}))[
                                      d.uniqueID
                                    ] || (h[d.uniqueID] = {}))[e] || [])[0] ===
                                  x && c[1]) && c[2],
                              d = f && _.childNodes[f];
                            (d = (++f && d && d[g]) || (y = f = 0) || p.pop());

                          )
                            if (1 === d.nodeType && ++y && d === t) {
                              u[e] = [x, f, y];
                              break;
                            }
                        } else if (
                          (v &&
                            (y = f =
                              (c =
                                (u =
                                  (h = (d = t)[b] || (d[b] = {}))[d.uniqueID] ||
                                  (h[d.uniqueID] = {}))[e] || [])[0] === x &&
                              c[1]),
                          !1 === y)
                        )
                          for (
                            ;
                            (d =
                              (++f && d && d[g]) || (y = f = 0) || p.pop()) &&
                            ((a
                              ? d.nodeName.toLowerCase() !== m
                              : 1 !== d.nodeType) ||
                              !++y ||
                              (v &&
                                ((u =
                                  (h = d[b] || (d[b] = {}))[d.uniqueID] ||
                                  (h[d.uniqueID] = {}))[e] = [x, y]),
                              d !== t));

                          );
                        return (y -= s) === i || (y % i == 0 && y / i >= 0);
                      }
                    };
              },
              PSEUDO: function (e, t) {
                var n,
                  s =
                    i.pseudos[e] ||
                    i.setFilters[e.toLowerCase()] ||
                    ae.error("unsupported pseudo: " + e);
                return s[b]
                  ? s(t)
                  : s.length > 1
                  ? ((n = [e, e, "", t]),
                    i.setFilters.hasOwnProperty(e.toLowerCase())
                      ? ce(function (e, n) {
                          for (var i, r = s(e, t), o = r.length; o--; )
                            e[(i = q(e, r[o]))] = !(n[i] = r[o]);
                        })
                      : function (e) {
                          return s(e, 0, n);
                        })
                  : s;
              },
            },
            pseudos: {
              not: ce(function (e) {
                var t = [],
                  n = [],
                  i = a(e.replace(R, "$1"));
                return i[b]
                  ? ce(function (e, t, n, s) {
                      for (var r, o = i(e, null, s, []), a = e.length; a--; )
                        (r = o[a]) && (e[a] = !(t[a] = r));
                    })
                  : function (e, s, r) {
                      return (
                        (t[0] = e), i(t, null, r, n), (t[0] = null), !n.pop()
                      );
                    };
              }),
              has: ce(function (e) {
                return function (t) {
                  return ae(e, t).length > 0;
                };
              }),
              contains: ce(function (e) {
                return (
                  (e = e.replace(te, ne)),
                  function (t) {
                    return (t.textContent || s(t)).indexOf(e) > -1;
                  }
                );
              }),
              lang: ce(function (e) {
                return (
                  V.test(e || "") || ae.error("unsupported lang: " + e),
                  (e = e.replace(te, ne).toLowerCase()),
                  function (t) {
                    var n;
                    do {
                      if (
                        (n = g
                          ? t.lang
                          : t.getAttribute("xml:lang") ||
                            t.getAttribute("lang"))
                      )
                        return (
                          (n = n.toLowerCase()) === e ||
                          0 === n.indexOf(e + "-")
                        );
                    } while ((t = t.parentNode) && 1 === t.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (t) {
                var n = e.location && e.location.hash;
                return n && n.slice(1) === t.id;
              },
              root: function (e) {
                return e === p;
              },
              focus: function (e) {
                return (
                  e === f.activeElement &&
                  (!f.hasFocus || f.hasFocus()) &&
                  !!(e.type || e.href || ~e.tabIndex)
                );
              },
              enabled: ge(!1),
              disabled: ge(!0),
              checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return (
                  ("input" === t && !!e.checked) ||
                  ("option" === t && !!e.selected)
                );
              },
              selected: function (e) {
                return (
                  e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                );
              },
              empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)
                  if (e.nodeType < 6) return !1;
                return !0;
              },
              parent: function (e) {
                return !i.pseudos.empty(e);
              },
              header: function (e) {
                return G.test(e.nodeName);
              },
              input: function (e) {
                return Y.test(e.nodeName);
              },
              button: function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t && "button" === e.type) || "button" === t;
              },
              text: function (e) {
                var t;
                return (
                  "input" === e.nodeName.toLowerCase() &&
                  "text" === e.type &&
                  (null == (t = e.getAttribute("type")) ||
                    "text" === t.toLowerCase())
                );
              },
              first: _e(function () {
                return [0];
              }),
              last: _e(function (e, t) {
                return [t - 1];
              }),
              eq: _e(function (e, t, n) {
                return [n < 0 ? n + t : n];
              }),
              even: _e(function (e, t) {
                for (var n = 0; n < t; n += 2) e.push(n);
                return e;
              }),
              odd: _e(function (e, t) {
                for (var n = 1; n < t; n += 2) e.push(n);
                return e;
              }),
              lt: _e(function (e, t, n) {
                for (var i = n < 0 ? n + t : n > t ? t : n; --i >= 0; )
                  e.push(i);
                return e;
              }),
              gt: _e(function (e, t, n) {
                for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                return e;
              }),
            },
          }),
        (i.pseudos.nth = i.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
          i.pseudos[t] = fe(t);
        for (t in { submit: !0, reset: !0 }) i.pseudos[t] = pe(t);
        function ve() {}
        function ye(e) {
          for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
          return i;
        }
        function be(e, t, n) {
          var i = t.dir,
            s = t.next,
            r = s || i,
            o = n && "parentNode" === r,
            a = T++;
          return t.first
            ? function (t, n, s) {
                for (; (t = t[i]); )
                  if (1 === t.nodeType || o) return e(t, n, s);
                return !1;
              }
            : function (t, n, l) {
                var c,
                  u,
                  h,
                  d = [x, a];
                if (l) {
                  for (; (t = t[i]); )
                    if ((1 === t.nodeType || o) && e(t, n, l)) return !0;
                } else
                  for (; (t = t[i]); )
                    if (1 === t.nodeType || o)
                      if (
                        ((u =
                          (h = t[b] || (t[b] = {}))[t.uniqueID] ||
                          (h[t.uniqueID] = {})),
                        s && s === t.nodeName.toLowerCase())
                      )
                        t = t[i] || t;
                      else {
                        if ((c = u[r]) && c[0] === x && c[1] === a)
                          return (d[2] = c[2]);
                        if (((u[r] = d), (d[2] = e(t, n, l)))) return !0;
                      }
                return !1;
              };
        }
        function we(e) {
          return e.length > 1
            ? function (t, n, i) {
                for (var s = e.length; s--; ) if (!e[s](t, n, i)) return !1;
                return !0;
              }
            : e[0];
        }
        function xe(e, t, n, i, s) {
          for (var r, o = [], a = 0, l = e.length, c = null != t; a < l; a++)
            (r = e[a]) && ((n && !n(r, i, s)) || (o.push(r), c && t.push(a)));
          return o;
        }
        function Te(e, t, n, i, s, r) {
          return (
            i && !i[b] && (i = Te(i)),
            s && !s[b] && (s = Te(s, r)),
            ce(function (r, o, a, l) {
              var c,
                u,
                h,
                d = [],
                f = [],
                p = o.length,
                g =
                  r ||
                  (function (e, t, n) {
                    for (var i = 0, s = t.length; i < s; i++) ae(e, t[i], n);
                    return n;
                  })(t || "*", a.nodeType ? [a] : a, []),
                _ = !e || (!r && t) ? g : xe(g, d, e, a, l),
                m = n ? (s || (r ? e : p || i) ? [] : o) : _;
              if ((n && n(_, m, a, l), i))
                for (c = xe(m, f), i(c, [], a, l), u = c.length; u--; )
                  (h = c[u]) && (m[f[u]] = !(_[f[u]] = h));
              if (r) {
                if (s || e) {
                  if (s) {
                    for (c = [], u = m.length; u--; )
                      (h = m[u]) && c.push((_[u] = h));
                    s(null, (m = []), c, l);
                  }
                  for (u = m.length; u--; )
                    (h = m[u]) &&
                      (c = s ? q(r, h) : d[u]) > -1 &&
                      (r[c] = !(o[c] = h));
                }
              } else (m = xe(m === o ? m.splice(p, m.length) : m)), s ? s(null, o, m, l) : O.apply(o, m);
            })
          );
        }
        function Ce(e) {
          for (
            var t,
              n,
              s,
              r = e.length,
              o = i.relative[e[0].type],
              a = o || i.relative[" "],
              l = o ? 1 : 0,
              u = be(
                function (e) {
                  return e === t;
                },
                a,
                !0
              ),
              h = be(
                function (e) {
                  return q(t, e) > -1;
                },
                a,
                !0
              ),
              d = [
                function (e, n, i) {
                  var s =
                    (!o && (i || n !== c)) ||
                    ((t = n).nodeType ? u(e, n, i) : h(e, n, i));
                  return (t = null), s;
                },
              ];
            l < r;
            l++
          )
            if ((n = i.relative[e[l].type])) d = [be(we(d), n)];
            else {
              if ((n = i.filter[e[l].type].apply(null, e[l].matches))[b]) {
                for (s = ++l; s < r && !i.relative[e[s].type]; s++);
                return Te(
                  l > 1 && we(d),
                  l > 1 &&
                    ye(
                      e
                        .slice(0, l - 1)
                        .concat({ value: " " === e[l - 2].type ? "*" : "" })
                    ).replace(R, "$1"),
                  n,
                  l < s && Ce(e.slice(l, s)),
                  s < r && Ce((e = e.slice(s))),
                  s < r && ye(e)
                );
              }
              d.push(n);
            }
          return we(d);
        }
        return (
          (ve.prototype = i.filters = i.pseudos),
          (i.setFilters = new ve()),
          (o = ae.tokenize =
            function (e, t) {
              var n,
                s,
                r,
                o,
                a,
                l,
                c,
                u = k[e + " "];
              if (u) return t ? 0 : u.slice(0);
              for (a = e, l = [], c = i.preFilter; a; ) {
                for (o in ((n && !(s = B.exec(a))) ||
                  (s && (a = a.slice(s[0].length) || a), l.push((r = []))),
                (n = !1),
                (s = z.exec(a)) &&
                  ((n = s.shift()),
                  r.push({ value: n, type: s[0].replace(R, " ") }),
                  (a = a.slice(n.length))),
                i.filter))
                  !(s = Q[o].exec(a)) ||
                    (c[o] && !(s = c[o](s))) ||
                    ((n = s.shift()),
                    r.push({ value: n, type: o, matches: s }),
                    (a = a.slice(n.length)));
                if (!n) break;
              }
              return t ? a.length : a ? ae.error(e) : k(e, l).slice(0);
            }),
          (a = ae.compile =
            function (e, t) {
              var n,
                s = [],
                r = [],
                a = E[e + " "];
              if (!a) {
                for (t || (t = o(e)), n = t.length; n--; )
                  (a = Ce(t[n]))[b] ? s.push(a) : r.push(a);
                (a = E(
                  e,
                  (function (e, t) {
                    var n = t.length > 0,
                      s = e.length > 0,
                      r = function (r, o, a, l, u) {
                        var h,
                          p,
                          _,
                          m = 0,
                          v = "0",
                          y = r && [],
                          b = [],
                          w = c,
                          T = r || (s && i.find.TAG("*", u)),
                          C = (x += null == w ? 1 : Math.random() || 0.1),
                          k = T.length;
                        for (
                          u && (c = o == f || o || u);
                          v !== k && null != (h = T[v]);
                          v++
                        ) {
                          if (s && h) {
                            for (
                              p = 0,
                                o || h.ownerDocument == f || (d(h), (a = !g));
                              (_ = e[p++]);

                            )
                              if (_(h, o || f, a)) {
                                l.push(h);
                                break;
                              }
                            u && (x = C);
                          }
                          n && ((h = !_ && h) && m--, r && y.push(h));
                        }
                        if (((m += v), n && v !== m)) {
                          for (p = 0; (_ = t[p++]); ) _(y, b, o, a);
                          if (r) {
                            if (m > 0)
                              for (; v--; ) y[v] || b[v] || (b[v] = L.call(l));
                            b = xe(b);
                          }
                          O.apply(l, b),
                            u &&
                              !r &&
                              b.length > 0 &&
                              m + t.length > 1 &&
                              ae.uniqueSort(l);
                        }
                        return u && ((x = C), (c = w)), y;
                      };
                    return n ? ce(r) : r;
                  })(r, s)
                )),
                  (a.selector = e);
              }
              return a;
            }),
          (l = ae.select =
            function (e, t, n, s) {
              var r,
                l,
                c,
                u,
                h,
                d = "function" == typeof e && e,
                f = !s && o((e = d.selector || e));
              if (((n = n || []), 1 === f.length)) {
                if (
                  (l = f[0] = f[0].slice(0)).length > 2 &&
                  "ID" === (c = l[0]).type &&
                  9 === t.nodeType &&
                  g &&
                  i.relative[l[1].type]
                ) {
                  if (
                    !(t = (i.find.ID(c.matches[0].replace(te, ne), t) || [])[0])
                  )
                    return n;
                  d && (t = t.parentNode),
                    (e = e.slice(l.shift().value.length));
                }
                for (
                  r = Q.needsContext.test(e) ? 0 : l.length;
                  r-- && ((c = l[r]), !i.relative[(u = c.type)]);

                )
                  if (
                    (h = i.find[u]) &&
                    (s = h(
                      c.matches[0].replace(te, ne),
                      (ee.test(l[0].type) && me(t.parentNode)) || t
                    ))
                  ) {
                    if ((l.splice(r, 1), !(e = s.length && ye(l))))
                      return O.apply(n, s), n;
                    break;
                  }
              }
              return (
                (d || a(e, f))(
                  s,
                  t,
                  !g,
                  n,
                  !t || (ee.test(e) && me(t.parentNode)) || t
                ),
                n
              );
            }),
          (n.sortStable = b.split("").sort(S).join("") === b),
          (n.detectDuplicates = !!h),
          d(),
          (n.sortDetached = ue(function (e) {
            return 1 & e.compareDocumentPosition(f.createElement("fieldset"));
          })),
          ue(function (e) {
            return (
              (e.innerHTML = "<a href='#'></a>"),
              "#" === e.firstChild.getAttribute("href")
            );
          }) ||
            he("type|href|height|width", function (e, t, n) {
              if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
            }),
          (n.attributes &&
            ue(function (e) {
              return (
                (e.innerHTML = "<input/>"),
                e.firstChild.setAttribute("value", ""),
                "" === e.firstChild.getAttribute("value")
              );
            })) ||
            he("value", function (e, t, n) {
              if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue;
            }),
          ue(function (e) {
            return null == e.getAttribute("disabled");
          }) ||
            he(M, function (e, t, n) {
              var i;
              if (!n)
                return !0 === e[t]
                  ? t.toLowerCase()
                  : (i = e.getAttributeNode(t)) && i.specified
                  ? i.value
                  : null;
            }),
          ae
        );
      })(e);
    (w.find = T),
      (w.expr = T.selectors),
      (w.expr[":"] = w.expr.pseudos),
      (w.uniqueSort = w.unique = T.uniqueSort),
      (w.text = T.getText),
      (w.isXMLDoc = T.isXML),
      (w.contains = T.contains),
      (w.escapeSelector = T.escape);
    var C = function (e, t, n) {
        for (var i = [], s = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
          if (1 === e.nodeType) {
            if (s && w(e).is(n)) break;
            i.push(e);
          }
        return i;
      },
      k = function (e, t) {
        for (var n = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && n.push(e);
        return n;
      },
      E = w.expr.match.needsContext;
    function A(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }
    var S = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function N(e, t, n) {
      return p(t)
        ? w.grep(e, function (e, i) {
            return !!t.call(e, i, e) !== n;
          })
        : t.nodeType
        ? w.grep(e, function (e) {
            return (e === t) !== n;
          })
        : "string" != typeof t
        ? w.grep(e, function (e) {
            return a.call(t, e) > -1 !== n;
          })
        : w.filter(t, e, n);
    }
    (w.filter = function (e, t, n) {
      var i = t[0];
      return (
        n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === i.nodeType
          ? w.find.matchesSelector(i, e)
            ? [i]
            : []
          : w.find.matches(
              e,
              w.grep(t, function (e) {
                return 1 === e.nodeType;
              })
            )
      );
    }),
      w.fn.extend({
        find: function (e) {
          var t,
            n,
            i = this.length,
            s = this;
          if ("string" != typeof e)
            return this.pushStack(
              w(e).filter(function () {
                for (t = 0; t < i; t++) if (w.contains(s[t], this)) return !0;
              })
            );
          for (n = this.pushStack([]), t = 0; t < i; t++) w.find(e, s[t], n);
          return i > 1 ? w.uniqueSort(n) : n;
        },
        filter: function (e) {
          return this.pushStack(N(this, e || [], !1));
        },
        not: function (e) {
          return this.pushStack(N(this, e || [], !0));
        },
        is: function (e) {
          return !!N(
            this,
            "string" == typeof e && E.test(e) ? w(e) : e || [],
            !1
          ).length;
        },
      });
    var D,
      L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    ((w.fn.init = function (e, t, n) {
      var i, s;
      if (!e) return this;
      if (((n = n || D), "string" == typeof e)) {
        if (
          !(i =
            "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
              ? [null, e, null]
              : L.exec(e)) ||
          (!i[1] && t)
        )
          return !t || t.jquery
            ? (t || n).find(e)
            : this.constructor(t).find(e);
        if (i[1]) {
          if (
            ((t = t instanceof w ? t[0] : t),
            w.merge(
              this,
              w.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : _, !0)
            ),
            S.test(i[1]) && w.isPlainObject(t))
          )
            for (i in t) p(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
          return this;
        }
        return (
          (s = _.getElementById(i[2])) && ((this[0] = s), (this.length = 1)),
          this
        );
      }
      return e.nodeType
        ? ((this[0] = e), (this.length = 1), this)
        : p(e)
        ? void 0 !== n.ready
          ? n.ready(e)
          : e(w)
        : w.makeArray(e, this);
    }).prototype = w.fn),
      (D = w(_));
    var j = /^(?:parents|prev(?:Until|All))/,
      O = { children: !0, contents: !0, next: !0, prev: !0 };
    function I(e, t) {
      for (; (e = e[t]) && 1 !== e.nodeType; );
      return e;
    }
    w.fn.extend({
      has: function (e) {
        var t = w(e, this),
          n = t.length;
        return this.filter(function () {
          for (var e = 0; e < n; e++) if (w.contains(this, t[e])) return !0;
        });
      },
      closest: function (e, t) {
        var n,
          i = 0,
          s = this.length,
          r = [],
          o = "string" != typeof e && w(e);
        if (!E.test(e))
          for (; i < s; i++)
            for (n = this[i]; n && n !== t; n = n.parentNode)
              if (
                n.nodeType < 11 &&
                (o
                  ? o.index(n) > -1
                  : 1 === n.nodeType && w.find.matchesSelector(n, e))
              ) {
                r.push(n);
                break;
              }
        return this.pushStack(r.length > 1 ? w.uniqueSort(r) : r);
      },
      index: function (e) {
        return e
          ? "string" == typeof e
            ? a.call(w(e), this[0])
            : a.call(this, e.jquery ? e[0] : e)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (e, t) {
        return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))));
      },
      addBack: function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      },
    }),
      w.each(
        {
          parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
          },
          parents: function (e) {
            return C(e, "parentNode");
          },
          parentsUntil: function (e, t, n) {
            return C(e, "parentNode", n);
          },
          next: function (e) {
            return I(e, "nextSibling");
          },
          prev: function (e) {
            return I(e, "previousSibling");
          },
          nextAll: function (e) {
            return C(e, "nextSibling");
          },
          prevAll: function (e) {
            return C(e, "previousSibling");
          },
          nextUntil: function (e, t, n) {
            return C(e, "nextSibling", n);
          },
          prevUntil: function (e, t, n) {
            return C(e, "previousSibling", n);
          },
          siblings: function (e) {
            return k((e.parentNode || {}).firstChild, e);
          },
          children: function (e) {
            return k(e.firstChild);
          },
          contents: function (e) {
            return null != e.contentDocument && i(e.contentDocument)
              ? e.contentDocument
              : (A(e, "template") && (e = e.content || e),
                w.merge([], e.childNodes));
          },
        },
        function (e, t) {
          w.fn[e] = function (n, i) {
            var s = w.map(this, t, n);
            return (
              "Until" !== e.slice(-5) && (i = n),
              i && "string" == typeof i && (s = w.filter(i, s)),
              this.length > 1 &&
                (O[e] || w.uniqueSort(s), j.test(e) && s.reverse()),
              this.pushStack(s)
            );
          };
        }
      );
    var q = /[^\x20\t\r\n\f]+/g;
    function M(e) {
      return e;
    }
    function P(e) {
      throw e;
    }
    function H(e, t, n, i) {
      var s;
      try {
        e && p((s = e.promise))
          ? s.call(e).done(t).fail(n)
          : e && p((s = e.then))
          ? s.call(e, t, n)
          : t.apply(void 0, [e].slice(i));
      } catch (e) {
        n.apply(void 0, [e]);
      }
    }
    (w.Callbacks = function (e) {
      e =
        "string" == typeof e
          ? (function (e) {
              var t = {};
              return (
                w.each(e.match(q) || [], function (e, n) {
                  t[n] = !0;
                }),
                t
              );
            })(e)
          : w.extend({}, e);
      var t,
        n,
        i,
        s,
        r = [],
        o = [],
        a = -1,
        l = function () {
          for (s = s || e.once, i = t = !0; o.length; a = -1)
            for (n = o.shift(); ++a < r.length; )
              !1 === r[a].apply(n[0], n[1]) &&
                e.stopOnFalse &&
                ((a = r.length), (n = !1));
          e.memory || (n = !1), (t = !1), s && (r = n ? [] : "");
        },
        c = {
          add: function () {
            return (
              r &&
                (n && !t && ((a = r.length - 1), o.push(n)),
                (function t(n) {
                  w.each(n, function (n, i) {
                    p(i)
                      ? (e.unique && c.has(i)) || r.push(i)
                      : i && i.length && "string" !== y(i) && t(i);
                  });
                })(arguments),
                n && !t && l()),
              this
            );
          },
          remove: function () {
            return (
              w.each(arguments, function (e, t) {
                for (var n; (n = w.inArray(t, r, n)) > -1; )
                  r.splice(n, 1), n <= a && a--;
              }),
              this
            );
          },
          has: function (e) {
            return e ? w.inArray(e, r) > -1 : r.length > 0;
          },
          empty: function () {
            return r && (r = []), this;
          },
          disable: function () {
            return (s = o = []), (r = n = ""), this;
          },
          disabled: function () {
            return !r;
          },
          lock: function () {
            return (s = o = []), n || t || (r = n = ""), this;
          },
          locked: function () {
            return !!s;
          },
          fireWith: function (e, n) {
            return (
              s ||
                ((n = [e, (n = n || []).slice ? n.slice() : n]),
                o.push(n),
                t || l()),
              this
            );
          },
          fire: function () {
            return c.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!i;
          },
        };
      return c;
    }),
      w.extend({
        Deferred: function (t) {
          var n = [
              [
                "notify",
                "progress",
                w.Callbacks("memory"),
                w.Callbacks("memory"),
                2,
              ],
              [
                "resolve",
                "done",
                w.Callbacks("once memory"),
                w.Callbacks("once memory"),
                0,
                "resolved",
              ],
              [
                "reject",
                "fail",
                w.Callbacks("once memory"),
                w.Callbacks("once memory"),
                1,
                "rejected",
              ],
            ],
            i = "pending",
            s = {
              state: function () {
                return i;
              },
              always: function () {
                return r.done(arguments).fail(arguments), this;
              },
              catch: function (e) {
                return s.then(null, e);
              },
              pipe: function () {
                var e = arguments;
                return w
                  .Deferred(function (t) {
                    w.each(n, function (n, i) {
                      var s = p(e[i[4]]) && e[i[4]];
                      r[i[1]](function () {
                        var e = s && s.apply(this, arguments);
                        e && p(e.promise)
                          ? e
                              .promise()
                              .progress(t.notify)
                              .done(t.resolve)
                              .fail(t.reject)
                          : t[i[0] + "With"](this, s ? [e] : arguments);
                      });
                    }),
                      (e = null);
                  })
                  .promise();
              },
              then: function (t, i, s) {
                var r = 0;
                function o(t, n, i, s) {
                  return function () {
                    var a = this,
                      l = arguments,
                      c = function () {
                        var e, c;
                        if (!(t < r)) {
                          if ((e = i.apply(a, l)) === n.promise())
                            throw new TypeError("Thenable self-resolution");
                          (c =
                            e &&
                            ("object" == typeof e || "function" == typeof e) &&
                            e.then),
                            p(c)
                              ? s
                                ? c.call(e, o(r, n, M, s), o(r, n, P, s))
                                : (r++,
                                  c.call(
                                    e,
                                    o(r, n, M, s),
                                    o(r, n, P, s),
                                    o(r, n, M, n.notifyWith)
                                  ))
                              : (i !== M && ((a = void 0), (l = [e])),
                                (s || n.resolveWith)(a, l));
                        }
                      },
                      u = s
                        ? c
                        : function () {
                            try {
                              c();
                            } catch (e) {
                              w.Deferred.exceptionHook &&
                                w.Deferred.exceptionHook(e, u.stackTrace),
                                t + 1 >= r &&
                                  (i !== P && ((a = void 0), (l = [e])),
                                  n.rejectWith(a, l));
                            }
                          };
                    t
                      ? u()
                      : (w.Deferred.getStackHook &&
                          (u.stackTrace = w.Deferred.getStackHook()),
                        e.setTimeout(u));
                  };
                }
                return w
                  .Deferred(function (e) {
                    n[0][3].add(o(0, e, p(s) ? s : M, e.notifyWith)),
                      n[1][3].add(o(0, e, p(t) ? t : M)),
                      n[2][3].add(o(0, e, p(i) ? i : P));
                  })
                  .promise();
              },
              promise: function (e) {
                return null != e ? w.extend(e, s) : s;
              },
            },
            r = {};
          return (
            w.each(n, function (e, t) {
              var o = t[2],
                a = t[5];
              (s[t[1]] = o.add),
                a &&
                  o.add(
                    function () {
                      i = a;
                    },
                    n[3 - e][2].disable,
                    n[3 - e][3].disable,
                    n[0][2].lock,
                    n[0][3].lock
                  ),
                o.add(t[3].fire),
                (r[t[0]] = function () {
                  return (
                    r[t[0] + "With"](this === r ? void 0 : this, arguments),
                    this
                  );
                }),
                (r[t[0] + "With"] = o.fireWith);
            }),
            s.promise(r),
            t && t.call(r, r),
            r
          );
        },
        when: function (e) {
          var t = arguments.length,
            n = t,
            i = Array(n),
            r = s.call(arguments),
            o = w.Deferred(),
            a = function (e) {
              return function (n) {
                (i[e] = this),
                  (r[e] = arguments.length > 1 ? s.call(arguments) : n),
                  --t || o.resolveWith(i, r);
              };
            };
          if (
            t <= 1 &&
            (H(e, o.done(a(n)).resolve, o.reject, !t),
            "pending" === o.state() || p(r[n] && r[n].then))
          )
            return o.then();
          for (; n--; ) H(r[n], a(n), o.reject);
          return o.promise();
        },
      });
    var F = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (w.Deferred.exceptionHook = function (t, n) {
      e.console &&
        e.console.warn &&
        t &&
        F.test(t.name) &&
        e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
    }),
      (w.readyException = function (t) {
        e.setTimeout(function () {
          throw t;
        });
      });
    var W = w.Deferred();
    function $() {
      _.removeEventListener("DOMContentLoaded", $),
        e.removeEventListener("load", $),
        w.ready();
    }
    (w.fn.ready = function (e) {
      return (
        W.then(e).catch(function (e) {
          w.readyException(e);
        }),
        this
      );
    }),
      w.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (e) {
          (!0 === e ? --w.readyWait : w.isReady) ||
            ((w.isReady = !0),
            (!0 !== e && --w.readyWait > 0) || W.resolveWith(_, [w]));
        },
      }),
      (w.ready.then = W.then),
      "complete" === _.readyState ||
      ("loading" !== _.readyState && !_.documentElement.doScroll)
        ? e.setTimeout(w.ready)
        : (_.addEventListener("DOMContentLoaded", $),
          e.addEventListener("load", $));
    var R = function (e, t, n, i, s, r, o) {
        var a = 0,
          l = e.length,
          c = null == n;
        if ("object" === y(n))
          for (a in ((s = !0), n)) R(e, t, a, n[a], !0, r, o);
        else if (
          void 0 !== i &&
          ((s = !0),
          p(i) || (o = !0),
          c &&
            (o
              ? (t.call(e, i), (t = null))
              : ((c = t),
                (t = function (e, t, n) {
                  return c.call(w(e), n);
                }))),
          t)
        )
          for (; a < l; a++) t(e[a], n, o ? i : i.call(e[a], a, t(e[a], n)));
        return s ? e : c ? t.call(e) : l ? t(e[0], n) : r;
      },
      B = /^-ms-/,
      z = /-([a-z])/g;
    function U(e, t) {
      return t.toUpperCase();
    }
    function X(e) {
      return e.replace(B, "ms-").replace(z, U);
    }
    var V = function (e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    };
    function Q() {
      this.expando = w.expando + Q.uid++;
    }
    (Q.uid = 1),
      (Q.prototype = {
        cache: function (e) {
          var t = e[this.expando];
          return (
            t ||
              ((t = {}),
              V(e) &&
                (e.nodeType
                  ? (e[this.expando] = t)
                  : Object.defineProperty(e, this.expando, {
                      value: t,
                      configurable: !0,
                    }))),
            t
          );
        },
        set: function (e, t, n) {
          var i,
            s = this.cache(e);
          if ("string" == typeof t) s[X(t)] = n;
          else for (i in t) s[X(i)] = t[i];
          return s;
        },
        get: function (e, t) {
          return void 0 === t
            ? this.cache(e)
            : e[this.expando] && e[this.expando][X(t)];
        },
        access: function (e, t, n) {
          return void 0 === t || (t && "string" == typeof t && void 0 === n)
            ? this.get(e, t)
            : (this.set(e, t, n), void 0 !== n ? n : t);
        },
        remove: function (e, t) {
          var n,
            i = e[this.expando];
          if (void 0 !== i) {
            if (void 0 !== t) {
              n = (t = Array.isArray(t)
                ? t.map(X)
                : (t = X(t)) in i
                ? [t]
                : t.match(q) || []).length;
              for (; n--; ) delete i[t[n]];
            }
            (void 0 === t || w.isEmptyObject(i)) &&
              (e.nodeType
                ? (e[this.expando] = void 0)
                : delete e[this.expando]);
          }
        },
        hasData: function (e) {
          var t = e[this.expando];
          return void 0 !== t && !w.isEmptyObject(t);
        },
      });
    var K = new Q(),
      Y = new Q(),
      G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      J = /[A-Z]/g;
    function Z(e, t, n) {
      var i;
      if (void 0 === n && 1 === e.nodeType)
        if (
          ((i = "data-" + t.replace(J, "-$&").toLowerCase()),
          "string" == typeof (n = e.getAttribute(i)))
        ) {
          try {
            n = (function (e) {
              return (
                "true" === e ||
                ("false" !== e &&
                  ("null" === e
                    ? null
                    : e === +e + ""
                    ? +e
                    : G.test(e)
                    ? JSON.parse(e)
                    : e))
              );
            })(n);
          } catch (e) {}
          Y.set(e, t, n);
        } else n = void 0;
      return n;
    }
    w.extend({
      hasData: function (e) {
        return Y.hasData(e) || K.hasData(e);
      },
      data: function (e, t, n) {
        return Y.access(e, t, n);
      },
      removeData: function (e, t) {
        Y.remove(e, t);
      },
      _data: function (e, t, n) {
        return K.access(e, t, n);
      },
      _removeData: function (e, t) {
        K.remove(e, t);
      },
    }),
      w.fn.extend({
        data: function (e, t) {
          var n,
            i,
            s,
            r = this[0],
            o = r && r.attributes;
          if (void 0 === e) {
            if (
              this.length &&
              ((s = Y.get(r)), 1 === r.nodeType && !K.get(r, "hasDataAttrs"))
            ) {
              for (n = o.length; n--; )
                o[n] &&
                  0 === (i = o[n].name).indexOf("data-") &&
                  ((i = X(i.slice(5))), Z(r, i, s[i]));
              K.set(r, "hasDataAttrs", !0);
            }
            return s;
          }
          return "object" == typeof e
            ? this.each(function () {
                Y.set(this, e);
              })
            : R(
                this,
                function (t) {
                  var n;
                  if (r && void 0 === t)
                    return void 0 !== (n = Y.get(r, e)) ||
                      void 0 !== (n = Z(r, e))
                      ? n
                      : void 0;
                  this.each(function () {
                    Y.set(this, e, t);
                  });
                },
                null,
                t,
                arguments.length > 1,
                null,
                !0
              );
        },
        removeData: function (e) {
          return this.each(function () {
            Y.remove(this, e);
          });
        },
      }),
      w.extend({
        queue: function (e, t, n) {
          var i;
          if (e)
            return (
              (t = (t || "fx") + "queue"),
              (i = K.get(e, t)),
              n &&
                (!i || Array.isArray(n)
                  ? (i = K.access(e, t, w.makeArray(n)))
                  : i.push(n)),
              i || []
            );
        },
        dequeue: function (e, t) {
          t = t || "fx";
          var n = w.queue(e, t),
            i = n.length,
            s = n.shift(),
            r = w._queueHooks(e, t);
          "inprogress" === s && ((s = n.shift()), i--),
            s &&
              ("fx" === t && n.unshift("inprogress"),
              delete r.stop,
              s.call(
                e,
                function () {
                  w.dequeue(e, t);
                },
                r
              )),
            !i && r && r.empty.fire();
        },
        _queueHooks: function (e, t) {
          var n = t + "queueHooks";
          return (
            K.get(e, n) ||
            K.access(e, n, {
              empty: w.Callbacks("once memory").add(function () {
                K.remove(e, [t + "queue", n]);
              }),
            })
          );
        },
      }),
      w.fn.extend({
        queue: function (e, t) {
          var n = 2;
          return (
            "string" != typeof e && ((t = e), (e = "fx"), n--),
            arguments.length < n
              ? w.queue(this[0], e)
              : void 0 === t
              ? this
              : this.each(function () {
                  var n = w.queue(this, e, t);
                  w._queueHooks(this, e),
                    "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e);
                })
          );
        },
        dequeue: function (e) {
          return this.each(function () {
            w.dequeue(this, e);
          });
        },
        clearQueue: function (e) {
          return this.queue(e || "fx", []);
        },
        promise: function (e, t) {
          var n,
            i = 1,
            s = w.Deferred(),
            r = this,
            o = this.length,
            a = function () {
              --i || s.resolveWith(r, [r]);
            };
          for (
            "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
            o--;

          )
            (n = K.get(r[o], e + "queueHooks")) &&
              n.empty &&
              (i++, n.empty.add(a));
          return a(), s.promise(t);
        },
      });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
      ne = ["Top", "Right", "Bottom", "Left"],
      ie = _.documentElement,
      se = function (e) {
        return w.contains(e.ownerDocument, e);
      },
      re = { composed: !0 };
    ie.getRootNode &&
      (se = function (e) {
        return (
          w.contains(e.ownerDocument, e) ||
          e.getRootNode(re) === e.ownerDocument
        );
      });
    var oe = function (e, t) {
      return (
        "none" === (e = t || e).style.display ||
        ("" === e.style.display && se(e) && "none" === w.css(e, "display"))
      );
    };
    function ae(e, t, n, i) {
      var s,
        r,
        o = 20,
        a = i
          ? function () {
              return i.cur();
            }
          : function () {
              return w.css(e, t, "");
            },
        l = a(),
        c = (n && n[3]) || (w.cssNumber[t] ? "" : "px"),
        u =
          e.nodeType &&
          (w.cssNumber[t] || ("px" !== c && +l)) &&
          te.exec(w.css(e, t));
      if (u && u[3] !== c) {
        for (l /= 2, c = c || u[3], u = +l || 1; o--; )
          w.style(e, t, u + c),
            (1 - r) * (1 - (r = a() / l || 0.5)) <= 0 && (o = 0),
            (u /= r);
        (u *= 2), w.style(e, t, u + c), (n = n || []);
      }
      return (
        n &&
          ((u = +u || +l || 0),
          (s = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
          i && ((i.unit = c), (i.start = u), (i.end = s))),
        s
      );
    }
    var le = {};
    function ce(e) {
      var t,
        n = e.ownerDocument,
        i = e.nodeName,
        s = le[i];
      return (
        s ||
        ((t = n.body.appendChild(n.createElement(i))),
        (s = w.css(t, "display")),
        t.parentNode.removeChild(t),
        "none" === s && (s = "block"),
        (le[i] = s),
        s)
      );
    }
    function ue(e, t) {
      for (var n, i, s = [], r = 0, o = e.length; r < o; r++)
        (i = e[r]).style &&
          ((n = i.style.display),
          t
            ? ("none" === n &&
                ((s[r] = K.get(i, "display") || null),
                s[r] || (i.style.display = "")),
              "" === i.style.display && oe(i) && (s[r] = ce(i)))
            : "none" !== n && ((s[r] = "none"), K.set(i, "display", n)));
      for (r = 0; r < o; r++) null != s[r] && (e[r].style.display = s[r]);
      return e;
    }
    w.fn.extend({
      show: function () {
        return ue(this, !0);
      },
      hide: function () {
        return ue(this);
      },
      toggle: function (e) {
        return "boolean" == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
              oe(this) ? w(this).show() : w(this).hide();
            });
      },
    });
    var he,
      de,
      fe = /^(?:checkbox|radio)$/i,
      pe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      ge = /^$|^module$|\/(?:java|ecma)script/i;
    (he = _.createDocumentFragment().appendChild(_.createElement("div"))),
      (de = _.createElement("input")).setAttribute("type", "radio"),
      de.setAttribute("checked", "checked"),
      de.setAttribute("name", "t"),
      he.appendChild(de),
      (f.checkClone = he.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (he.innerHTML = "<textarea>x</textarea>"),
      (f.noCloneChecked = !!he.cloneNode(!0).lastChild.defaultValue),
      (he.innerHTML = "<option></option>"),
      (f.option = !!he.lastChild);
    var _e = {
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
    function me(e, t) {
      var n;
      return (
        (n =
          void 0 !== e.getElementsByTagName
            ? e.getElementsByTagName(t || "*")
            : void 0 !== e.querySelectorAll
            ? e.querySelectorAll(t || "*")
            : []),
        void 0 === t || (t && A(e, t)) ? w.merge([e], n) : n
      );
    }
    function ve(e, t) {
      for (var n = 0, i = e.length; n < i; n++)
        K.set(e[n], "globalEval", !t || K.get(t[n], "globalEval"));
    }
    (_e.tbody = _e.tfoot = _e.colgroup = _e.caption = _e.thead),
      (_e.th = _e.td),
      f.option ||
        (_e.optgroup = _e.option =
          [1, "<select multiple='multiple'>", "</select>"]);
    var ye = /<|&#?\w+;/;
    function be(e, t, n, i, s) {
      for (
        var r,
          o,
          a,
          l,
          c,
          u,
          h = t.createDocumentFragment(),
          d = [],
          f = 0,
          p = e.length;
        f < p;
        f++
      )
        if ((r = e[f]) || 0 === r)
          if ("object" === y(r)) w.merge(d, r.nodeType ? [r] : r);
          else if (ye.test(r)) {
            for (
              o = o || h.appendChild(t.createElement("div")),
                a = (pe.exec(r) || ["", ""])[1].toLowerCase(),
                l = _e[a] || _e._default,
                o.innerHTML = l[1] + w.htmlPrefilter(r) + l[2],
                u = l[0];
              u--;

            )
              o = o.lastChild;
            w.merge(d, o.childNodes), ((o = h.firstChild).textContent = "");
          } else d.push(t.createTextNode(r));
      for (h.textContent = "", f = 0; (r = d[f++]); )
        if (i && w.inArray(r, i) > -1) s && s.push(r);
        else if (
          ((c = se(r)), (o = me(h.appendChild(r), "script")), c && ve(o), n)
        )
          for (u = 0; (r = o[u++]); ) ge.test(r.type || "") && n.push(r);
      return h;
    }
    var we = /^([^.]*)(?:\.(.+)|)/;
    function xe() {
      return !0;
    }
    function Te() {
      return !1;
    }
    function Ce(e, t) {
      return (
        (e ===
          (function () {
            try {
              return _.activeElement;
            } catch (e) {}
          })()) ==
        ("focus" === t)
      );
    }
    function ke(e, t, n, i, s, r) {
      var o, a;
      if ("object" == typeof t) {
        for (a in ("string" != typeof n && ((i = i || n), (n = void 0)), t))
          ke(e, a, n, i, t[a], r);
        return e;
      }
      if (
        (null == i && null == s
          ? ((s = n), (i = n = void 0))
          : null == s &&
            ("string" == typeof n
              ? ((s = i), (i = void 0))
              : ((s = i), (i = n), (n = void 0))),
        !1 === s)
      )
        s = Te;
      else if (!s) return e;
      return (
        1 === r &&
          ((o = s),
          (s = function (e) {
            return w().off(e), o.apply(this, arguments);
          }),
          (s.guid = o.guid || (o.guid = w.guid++))),
        e.each(function () {
          w.event.add(this, t, s, i, n);
        })
      );
    }
    function Ee(e, t, n) {
      n
        ? (K.set(e, t, !1),
          w.event.add(e, t, {
            namespace: !1,
            handler: function (e) {
              var i,
                r,
                o = K.get(this, t);
              if (1 & e.isTrigger && this[t]) {
                if (o.length)
                  (w.event.special[t] || {}).delegateType &&
                    e.stopPropagation();
                else if (
                  ((o = s.call(arguments)),
                  K.set(this, t, o),
                  (i = n(this, t)),
                  this[t](),
                  o !== (r = K.get(this, t)) || i
                    ? K.set(this, t, !1)
                    : (r = {}),
                  o !== r)
                )
                  return (
                    e.stopImmediatePropagation(),
                    e.preventDefault(),
                    r && r.value
                  );
              } else
                o.length &&
                  (K.set(this, t, {
                    value: w.event.trigger(
                      w.extend(o[0], w.Event.prototype),
                      o.slice(1),
                      this
                    ),
                  }),
                  e.stopImmediatePropagation());
            },
          }))
        : void 0 === K.get(e, t) && w.event.add(e, t, xe);
    }
    (w.event = {
      global: {},
      add: function (e, t, n, i, s) {
        var r,
          o,
          a,
          l,
          c,
          u,
          h,
          d,
          f,
          p,
          g,
          _ = K.get(e);
        if (V(e))
          for (
            n.handler && ((n = (r = n).handler), (s = r.selector)),
              s && w.find.matchesSelector(ie, s),
              n.guid || (n.guid = w.guid++),
              (l = _.events) || (l = _.events = Object.create(null)),
              (o = _.handle) ||
                (o = _.handle =
                  function (t) {
                    return void 0 !== w && w.event.triggered !== t.type
                      ? w.event.dispatch.apply(e, arguments)
                      : void 0;
                  }),
              c = (t = (t || "").match(q) || [""]).length;
            c--;

          )
            (f = g = (a = we.exec(t[c]) || [])[1]),
              (p = (a[2] || "").split(".").sort()),
              f &&
                ((h = w.event.special[f] || {}),
                (f = (s ? h.delegateType : h.bindType) || f),
                (h = w.event.special[f] || {}),
                (u = w.extend(
                  {
                    type: f,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: s,
                    needsContext: s && w.expr.match.needsContext.test(s),
                    namespace: p.join("."),
                  },
                  r
                )),
                (d = l[f]) ||
                  (((d = l[f] = []).delegateCount = 0),
                  (h.setup && !1 !== h.setup.call(e, i, p, o)) ||
                    (e.addEventListener && e.addEventListener(f, o))),
                h.add &&
                  (h.add.call(e, u),
                  u.handler.guid || (u.handler.guid = n.guid)),
                s ? d.splice(d.delegateCount++, 0, u) : d.push(u),
                (w.event.global[f] = !0));
      },
      remove: function (e, t, n, i, s) {
        var r,
          o,
          a,
          l,
          c,
          u,
          h,
          d,
          f,
          p,
          g,
          _ = K.hasData(e) && K.get(e);
        if (_ && (l = _.events)) {
          for (c = (t = (t || "").match(q) || [""]).length; c--; )
            if (
              ((f = g = (a = we.exec(t[c]) || [])[1]),
              (p = (a[2] || "").split(".").sort()),
              f)
            ) {
              for (
                h = w.event.special[f] || {},
                  d = l[(f = (i ? h.delegateType : h.bindType) || f)] || [],
                  a =
                    a[2] &&
                    new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  o = r = d.length;
                r--;

              )
                (u = d[r]),
                  (!s && g !== u.origType) ||
                    (n && n.guid !== u.guid) ||
                    (a && !a.test(u.namespace)) ||
                    (i && i !== u.selector && ("**" !== i || !u.selector)) ||
                    (d.splice(r, 1),
                    u.selector && d.delegateCount--,
                    h.remove && h.remove.call(e, u));
              o &&
                !d.length &&
                ((h.teardown && !1 !== h.teardown.call(e, p, _.handle)) ||
                  w.removeEvent(e, f, _.handle),
                delete l[f]);
            } else for (f in l) w.event.remove(e, f + t[c], n, i, !0);
          w.isEmptyObject(l) && K.remove(e, "handle events");
        }
      },
      dispatch: function (e) {
        var t,
          n,
          i,
          s,
          r,
          o,
          a = new Array(arguments.length),
          l = w.event.fix(e),
          c = (K.get(this, "events") || Object.create(null))[l.type] || [],
          u = w.event.special[l.type] || {};
        for (a[0] = l, t = 1; t < arguments.length; t++) a[t] = arguments[t];
        if (
          ((l.delegateTarget = this),
          !u.preDispatch || !1 !== u.preDispatch.call(this, l))
        ) {
          for (
            o = w.event.handlers.call(this, l, c), t = 0;
            (s = o[t++]) && !l.isPropagationStopped();

          )
            for (
              l.currentTarget = s.elem, n = 0;
              (r = s.handlers[n++]) && !l.isImmediatePropagationStopped();

            )
              (l.rnamespace &&
                !1 !== r.namespace &&
                !l.rnamespace.test(r.namespace)) ||
                ((l.handleObj = r),
                (l.data = r.data),
                void 0 !==
                  (i = (
                    (w.event.special[r.origType] || {}).handle || r.handler
                  ).apply(s.elem, a)) &&
                  !1 === (l.result = i) &&
                  (l.preventDefault(), l.stopPropagation()));
          return u.postDispatch && u.postDispatch.call(this, l), l.result;
        }
      },
      handlers: function (e, t) {
        var n,
          i,
          s,
          r,
          o,
          a = [],
          l = t.delegateCount,
          c = e.target;
        if (l && c.nodeType && !("click" === e.type && e.button >= 1))
          for (; c !== this; c = c.parentNode || this)
            if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
              for (r = [], o = {}, n = 0; n < l; n++)
                void 0 === o[(s = (i = t[n]).selector + " ")] &&
                  (o[s] = i.needsContext
                    ? w(s, this).index(c) > -1
                    : w.find(s, this, null, [c]).length),
                  o[s] && r.push(i);
              r.length && a.push({ elem: c, handlers: r });
            }
        return (
          (c = this),
          l < t.length && a.push({ elem: c, handlers: t.slice(l) }),
          a
        );
      },
      addProp: function (e, t) {
        Object.defineProperty(w.Event.prototype, e, {
          enumerable: !0,
          configurable: !0,
          get: p(t)
            ? function () {
                if (this.originalEvent) return t(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[e];
              },
          set: function (t) {
            Object.defineProperty(this, e, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: t,
            });
          },
        });
      },
      fix: function (e) {
        return e[w.expando] ? e : new w.Event(e);
      },
      special: {
        load: { noBubble: !0 },
        click: {
          setup: function (e) {
            var t = this || e;
            return (
              fe.test(t.type) && t.click && A(t, "input") && Ee(t, "click", xe),
              !1
            );
          },
          trigger: function (e) {
            var t = this || e;
            return (
              fe.test(t.type) && t.click && A(t, "input") && Ee(t, "click"), !0
            );
          },
          _default: function (e) {
            var t = e.target;
            return (
              (fe.test(t.type) &&
                t.click &&
                A(t, "input") &&
                K.get(t, "click")) ||
              A(t, "a")
            );
          },
        },
        beforeunload: {
          postDispatch: function (e) {
            void 0 !== e.result &&
              e.originalEvent &&
              (e.originalEvent.returnValue = e.result);
          },
        },
      },
    }),
      (w.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
      }),
      (w.Event = function (e, t) {
        if (!(this instanceof w.Event)) return new w.Event(e, t);
        e && e.type
          ? ((this.originalEvent = e),
            (this.type = e.type),
            (this.isDefaultPrevented =
              e.defaultPrevented ||
              (void 0 === e.defaultPrevented && !1 === e.returnValue)
                ? xe
                : Te),
            (this.target =
              e.target && 3 === e.target.nodeType
                ? e.target.parentNode
                : e.target),
            (this.currentTarget = e.currentTarget),
            (this.relatedTarget = e.relatedTarget))
          : (this.type = e),
          t && w.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || Date.now()),
          (this[w.expando] = !0);
      }),
      (w.Event.prototype = {
        constructor: w.Event,
        isDefaultPrevented: Te,
        isPropagationStopped: Te,
        isImmediatePropagationStopped: Te,
        isSimulated: !1,
        preventDefault: function () {
          var e = this.originalEvent;
          (this.isDefaultPrevented = xe),
            e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function () {
          var e = this.originalEvent;
          (this.isPropagationStopped = xe),
            e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          (this.isImmediatePropagationStopped = xe),
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      w.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          code: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: !0,
        },
        w.event.addProp
      ),
      w.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        w.event.special[e] = {
          setup: function () {
            return Ee(this, e, Ce), !1;
          },
          trigger: function () {
            return Ee(this, e), !0;
          },
          _default: function (t) {
            return K.get(t.target, e);
          },
          delegateType: t,
        };
      }),
      w.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (e, t) {
          w.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
              var n,
                i = this,
                s = e.relatedTarget,
                r = e.handleObj;
              return (
                (s && (s === i || w.contains(i, s))) ||
                  ((e.type = r.origType),
                  (n = r.handler.apply(this, arguments)),
                  (e.type = t)),
                n
              );
            },
          };
        }
      ),
      w.fn.extend({
        on: function (e, t, n, i) {
          return ke(this, e, t, n, i);
        },
        one: function (e, t, n, i) {
          return ke(this, e, t, n, i, 1);
        },
        off: function (e, t, n) {
          var i, s;
          if (e && e.preventDefault && e.handleObj)
            return (
              (i = e.handleObj),
              w(e.delegateTarget).off(
                i.namespace ? i.origType + "." + i.namespace : i.origType,
                i.selector,
                i.handler
              ),
              this
            );
          if ("object" == typeof e) {
            for (s in e) this.off(s, t, e[s]);
            return this;
          }
          return (
            (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
            !1 === n && (n = Te),
            this.each(function () {
              w.event.remove(this, e, n, t);
            })
          );
        },
      });
    var Ae = /<script|<style|<link/i,
      Se = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ne = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function De(e, t) {
      return (
        (A(e, "table") &&
          A(11 !== t.nodeType ? t : t.firstChild, "tr") &&
          w(e).children("tbody")[0]) ||
        e
      );
    }
    function Le(e) {
      return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function je(e) {
      return (
        "true/" === (e.type || "").slice(0, 5)
          ? (e.type = e.type.slice(5))
          : e.removeAttribute("type"),
        e
      );
    }
    function Oe(e, t) {
      var n, i, s, r, o, a;
      if (1 === t.nodeType) {
        if (K.hasData(e) && (a = K.get(e).events))
          for (s in (K.remove(t, "handle events"), a))
            for (n = 0, i = a[s].length; n < i; n++) w.event.add(t, s, a[s][n]);
        Y.hasData(e) && ((r = Y.access(e)), (o = w.extend({}, r)), Y.set(t, o));
      }
    }
    function Ie(e, t) {
      var n = t.nodeName.toLowerCase();
      "input" === n && fe.test(e.type)
        ? (t.checked = e.checked)
        : ("input" !== n && "textarea" !== n) ||
          (t.defaultValue = e.defaultValue);
    }
    function qe(e, t, n, i) {
      t = r(t);
      var s,
        o,
        a,
        l,
        c,
        u,
        h = 0,
        d = e.length,
        g = d - 1,
        _ = t[0],
        m = p(_);
      if (m || (d > 1 && "string" == typeof _ && !f.checkClone && Se.test(_)))
        return e.each(function (s) {
          var r = e.eq(s);
          m && (t[0] = _.call(this, s, r.html())), qe(r, t, n, i);
        });
      if (
        d &&
        ((o = (s = be(t, e[0].ownerDocument, !1, e, i)).firstChild),
        1 === s.childNodes.length && (s = o),
        o || i)
      ) {
        for (l = (a = w.map(me(s, "script"), Le)).length; h < d; h++)
          (c = s),
            h !== g &&
              ((c = w.clone(c, !0, !0)), l && w.merge(a, me(c, "script"))),
            n.call(e[h], c, h);
        if (l)
          for (
            u = a[a.length - 1].ownerDocument, w.map(a, je), h = 0;
            h < l;
            h++
          )
            (c = a[h]),
              ge.test(c.type || "") &&
                !K.access(c, "globalEval") &&
                w.contains(u, c) &&
                (c.src && "module" !== (c.type || "").toLowerCase()
                  ? w._evalUrl &&
                    !c.noModule &&
                    w._evalUrl(
                      c.src,
                      { nonce: c.nonce || c.getAttribute("nonce") },
                      u
                    )
                  : v(c.textContent.replace(Ne, ""), c, u));
      }
      return e;
    }
    function Me(e, t, n) {
      for (var i, s = t ? w.filter(t, e) : e, r = 0; null != (i = s[r]); r++)
        n || 1 !== i.nodeType || w.cleanData(me(i)),
          i.parentNode &&
            (n && se(i) && ve(me(i, "script")), i.parentNode.removeChild(i));
      return e;
    }
    w.extend({
      htmlPrefilter: function (e) {
        return e;
      },
      clone: function (e, t, n) {
        var i,
          s,
          r,
          o,
          a = e.cloneNode(!0),
          l = se(e);
        if (
          !(
            f.noCloneChecked ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            w.isXMLDoc(e)
          )
        )
          for (o = me(a), i = 0, s = (r = me(e)).length; i < s; i++)
            Ie(r[i], o[i]);
        if (t)
          if (n)
            for (
              r = r || me(e), o = o || me(a), i = 0, s = r.length;
              i < s;
              i++
            )
              Oe(r[i], o[i]);
          else Oe(e, a);
        return (
          (o = me(a, "script")).length > 0 && ve(o, !l && me(e, "script")), a
        );
      },
      cleanData: function (e) {
        for (
          var t, n, i, s = w.event.special, r = 0;
          void 0 !== (n = e[r]);
          r++
        )
          if (V(n)) {
            if ((t = n[K.expando])) {
              if (t.events)
                for (i in t.events)
                  s[i] ? w.event.remove(n, i) : w.removeEvent(n, i, t.handle);
              n[K.expando] = void 0;
            }
            n[Y.expando] && (n[Y.expando] = void 0);
          }
      },
    }),
      w.fn.extend({
        detach: function (e) {
          return Me(this, e, !0);
        },
        remove: function (e) {
          return Me(this, e);
        },
        text: function (e) {
          return R(
            this,
            function (e) {
              return void 0 === e
                ? w.text(this)
                : this.empty().each(function () {
                    (1 !== this.nodeType &&
                      11 !== this.nodeType &&
                      9 !== this.nodeType) ||
                      (this.textContent = e);
                  });
            },
            null,
            e,
            arguments.length
          );
        },
        append: function () {
          return qe(this, arguments, function (e) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              De(this, e).appendChild(e);
          });
        },
        prepend: function () {
          return qe(this, arguments, function (e) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var t = De(this, e);
              t.insertBefore(e, t.firstChild);
            }
          });
        },
        before: function () {
          return qe(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this);
          });
        },
        after: function () {
          return qe(this, arguments, function (e) {
            this.parentNode &&
              this.parentNode.insertBefore(e, this.nextSibling);
          });
        },
        empty: function () {
          for (var e, t = 0; null != (e = this[t]); t++)
            1 === e.nodeType && (w.cleanData(me(e, !1)), (e.textContent = ""));
          return this;
        },
        clone: function (e, t) {
          return (
            (e = null != e && e),
            (t = null == t ? e : t),
            this.map(function () {
              return w.clone(this, e, t);
            })
          );
        },
        html: function (e) {
          return R(
            this,
            function (e) {
              var t = this[0] || {},
                n = 0,
                i = this.length;
              if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
              if (
                "string" == typeof e &&
                !Ae.test(e) &&
                !_e[(pe.exec(e) || ["", ""])[1].toLowerCase()]
              ) {
                e = w.htmlPrefilter(e);
                try {
                  for (; n < i; n++)
                    1 === (t = this[n] || {}).nodeType &&
                      (w.cleanData(me(t, !1)), (t.innerHTML = e));
                  t = 0;
                } catch (e) {}
              }
              t && this.empty().append(e);
            },
            null,
            e,
            arguments.length
          );
        },
        replaceWith: function () {
          var e = [];
          return qe(
            this,
            arguments,
            function (t) {
              var n = this.parentNode;
              w.inArray(this, e) < 0 &&
                (w.cleanData(me(this)), n && n.replaceChild(t, this));
            },
            e
          );
        },
      }),
      w.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (e, t) {
          w.fn[e] = function (e) {
            for (var n, i = [], s = w(e), r = s.length - 1, a = 0; a <= r; a++)
              (n = a === r ? this : this.clone(!0)),
                w(s[a])[t](n),
                o.apply(i, n.get());
            return this.pushStack(i);
          };
        }
      );
    var Pe = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
      He = /^--/,
      Fe = function (t) {
        var n = t.ownerDocument.defaultView;
        return (n && n.opener) || (n = e), n.getComputedStyle(t);
      },
      We = function (e, t, n) {
        var i,
          s,
          r = {};
        for (s in t) (r[s] = e.style[s]), (e.style[s] = t[s]);
        for (s in ((i = n.call(e)), t)) e.style[s] = r[s];
        return i;
      },
      $e = new RegExp(ne.join("|"), "i"),
      Re = new RegExp(
        "^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$",
        "g"
      );
    function Be(e, t, n) {
      var i,
        s,
        r,
        o,
        a = He.test(t),
        l = e.style;
      return (
        (n = n || Fe(e)) &&
          ((o = n.getPropertyValue(t) || n[t]),
          a && o && (o = o.replace(Re, "$1") || void 0),
          "" !== o || se(e) || (o = w.style(e, t)),
          !f.pixelBoxStyles() &&
            Pe.test(o) &&
            $e.test(t) &&
            ((i = l.width),
            (s = l.minWidth),
            (r = l.maxWidth),
            (l.minWidth = l.maxWidth = l.width = o),
            (o = n.width),
            (l.width = i),
            (l.minWidth = s),
            (l.maxWidth = r))),
        void 0 !== o ? o + "" : o
      );
    }
    function ze(e, t) {
      return {
        get: function () {
          if (!e()) return (this.get = t).apply(this, arguments);
          delete this.get;
        },
      };
    }
    !(function () {
      function t() {
        if (u) {
          (c.style.cssText =
            "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
            (u.style.cssText =
              "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
            ie.appendChild(c).appendChild(u);
          var t = e.getComputedStyle(u);
          (i = "1%" !== t.top),
            (l = 12 === n(t.marginLeft)),
            (u.style.right = "60%"),
            (o = 36 === n(t.right)),
            (s = 36 === n(t.width)),
            (u.style.position = "absolute"),
            (r = 12 === n(u.offsetWidth / 3)),
            ie.removeChild(c),
            (u = null);
        }
      }
      function n(e) {
        return Math.round(parseFloat(e));
      }
      var i,
        s,
        r,
        o,
        a,
        l,
        c = _.createElement("div"),
        u = _.createElement("div");
      u.style &&
        ((u.style.backgroundClip = "content-box"),
        (u.cloneNode(!0).style.backgroundClip = ""),
        (f.clearCloneStyle = "content-box" === u.style.backgroundClip),
        w.extend(f, {
          boxSizingReliable: function () {
            return t(), s;
          },
          pixelBoxStyles: function () {
            return t(), o;
          },
          pixelPosition: function () {
            return t(), i;
          },
          reliableMarginLeft: function () {
            return t(), l;
          },
          scrollboxSize: function () {
            return t(), r;
          },
          reliableTrDimensions: function () {
            var t, n, i, s;
            return (
              null == a &&
                ((t = _.createElement("table")),
                (n = _.createElement("tr")),
                (i = _.createElement("div")),
                (t.style.cssText =
                  "position:absolute;left:-11111px;border-collapse:separate"),
                (n.style.cssText = "border:1px solid"),
                (n.style.height = "1px"),
                (i.style.height = "9px"),
                (i.style.display = "block"),
                ie.appendChild(t).appendChild(n).appendChild(i),
                (s = e.getComputedStyle(n)),
                (a =
                  parseInt(s.height, 10) +
                    parseInt(s.borderTopWidth, 10) +
                    parseInt(s.borderBottomWidth, 10) ===
                  n.offsetHeight),
                ie.removeChild(t)),
              a
            );
          },
        }));
    })();
    var Ue = ["Webkit", "Moz", "ms"],
      Xe = _.createElement("div").style,
      Ve = {};
    function Qe(e) {
      var t = w.cssProps[e] || Ve[e];
      return (
        t ||
        (e in Xe
          ? e
          : (Ve[e] =
              (function (e) {
                for (
                  var t = e[0].toUpperCase() + e.slice(1), n = Ue.length;
                  n--;

                )
                  if ((e = Ue[n] + t) in Xe) return e;
              })(e) || e))
      );
    }
    var Ke = /^(none|table(?!-c[ea]).+)/,
      Ye = { position: "absolute", visibility: "hidden", display: "block" },
      Ge = { letterSpacing: "0", fontWeight: "400" };
    function Je(e, t, n) {
      var i = te.exec(t);
      return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
    }
    function Ze(e, t, n, i, s, r) {
      var o = "width" === t ? 1 : 0,
        a = 0,
        l = 0;
      if (n === (i ? "border" : "content")) return 0;
      for (; o < 4; o += 2)
        "margin" === n && (l += w.css(e, n + ne[o], !0, s)),
          i
            ? ("content" === n && (l -= w.css(e, "padding" + ne[o], !0, s)),
              "margin" !== n &&
                (l -= w.css(e, "border" + ne[o] + "Width", !0, s)))
            : ((l += w.css(e, "padding" + ne[o], !0, s)),
              "padding" !== n
                ? (l += w.css(e, "border" + ne[o] + "Width", !0, s))
                : (a += w.css(e, "border" + ne[o] + "Width", !0, s)));
      return (
        !i &&
          r >= 0 &&
          (l +=
            Math.max(
              0,
              Math.ceil(
                e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - 0.5
              )
            ) || 0),
        l
      );
    }
    function et(e, t, n) {
      var i = Fe(e),
        s =
          (!f.boxSizingReliable() || n) &&
          "border-box" === w.css(e, "boxSizing", !1, i),
        r = s,
        o = Be(e, t, i),
        a = "offset" + t[0].toUpperCase() + t.slice(1);
      if (Pe.test(o)) {
        if (!n) return o;
        o = "auto";
      }
      return (
        ((!f.boxSizingReliable() && s) ||
          (!f.reliableTrDimensions() && A(e, "tr")) ||
          "auto" === o ||
          (!parseFloat(o) && "inline" === w.css(e, "display", !1, i))) &&
          e.getClientRects().length &&
          ((s = "border-box" === w.css(e, "boxSizing", !1, i)),
          (r = a in e) && (o = e[a])),
        (o = parseFloat(o) || 0) +
          Ze(e, t, n || (s ? "border" : "content"), r, i, o) +
          "px"
      );
    }
    function tt(e, t, n, i, s) {
      return new tt.prototype.init(e, t, n, i, s);
    }
    w.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var n = Be(e, "opacity");
              return "" === n ? "1" : n;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: {},
      style: function (e, t, n, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var s,
            r,
            o,
            a = X(t),
            l = He.test(t),
            c = e.style;
          if (
            (l || (t = Qe(a)),
            (o = w.cssHooks[t] || w.cssHooks[a]),
            void 0 === n)
          )
            return o && "get" in o && void 0 !== (s = o.get(e, !1, i))
              ? s
              : c[t];
          "string" === (r = typeof n) &&
            (s = te.exec(n)) &&
            s[1] &&
            ((n = ae(e, t, s)), (r = "number")),
            null != n &&
              n == n &&
              ("number" !== r ||
                l ||
                (n += (s && s[3]) || (w.cssNumber[a] ? "" : "px")),
              f.clearCloneStyle ||
                "" !== n ||
                0 !== t.indexOf("background") ||
                (c[t] = "inherit"),
              (o && "set" in o && void 0 === (n = o.set(e, n, i))) ||
                (l ? c.setProperty(t, n) : (c[t] = n)));
        }
      },
      css: function (e, t, n, i) {
        var s,
          r,
          o,
          a = X(t);
        return (
          He.test(t) || (t = Qe(a)),
          (o = w.cssHooks[t] || w.cssHooks[a]) &&
            "get" in o &&
            (s = o.get(e, !0, n)),
          void 0 === s && (s = Be(e, t, i)),
          "normal" === s && t in Ge && (s = Ge[t]),
          "" === n || n
            ? ((r = parseFloat(s)), !0 === n || isFinite(r) ? r || 0 : s)
            : s
        );
      },
    }),
      w.each(["height", "width"], function (e, t) {
        w.cssHooks[t] = {
          get: function (e, n, i) {
            if (n)
              return !Ke.test(w.css(e, "display")) ||
                (e.getClientRects().length && e.getBoundingClientRect().width)
                ? et(e, t, i)
                : We(e, Ye, function () {
                    return et(e, t, i);
                  });
          },
          set: function (e, n, i) {
            var s,
              r = Fe(e),
              o = !f.scrollboxSize() && "absolute" === r.position,
              a = (o || i) && "border-box" === w.css(e, "boxSizing", !1, r),
              l = i ? Ze(e, t, i, a, r) : 0;
            return (
              a &&
                o &&
                (l -= Math.ceil(
                  e["offset" + t[0].toUpperCase() + t.slice(1)] -
                    parseFloat(r[t]) -
                    Ze(e, t, "border", !1, r) -
                    0.5
                )),
              l &&
                (s = te.exec(n)) &&
                "px" !== (s[3] || "px") &&
                ((e.style[t] = n), (n = w.css(e, t))),
              Je(0, n, l)
            );
          },
        };
      }),
      (w.cssHooks.marginLeft = ze(f.reliableMarginLeft, function (e, t) {
        if (t)
          return (
            (parseFloat(Be(e, "marginLeft")) ||
              e.getBoundingClientRect().left -
                We(e, { marginLeft: 0 }, function () {
                  return e.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      w.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
        (w.cssHooks[e + t] = {
          expand: function (n) {
            for (
              var i = 0, s = {}, r = "string" == typeof n ? n.split(" ") : [n];
              i < 4;
              i++
            )
              s[e + ne[i] + t] = r[i] || r[i - 2] || r[0];
            return s;
          },
        }),
          "margin" !== e && (w.cssHooks[e + t].set = Je);
      }),
      w.fn.extend({
        css: function (e, t) {
          return R(
            this,
            function (e, t, n) {
              var i,
                s,
                r = {},
                o = 0;
              if (Array.isArray(t)) {
                for (i = Fe(e), s = t.length; o < s; o++)
                  r[t[o]] = w.css(e, t[o], !1, i);
                return r;
              }
              return void 0 !== n ? w.style(e, t, n) : w.css(e, t);
            },
            e,
            t,
            arguments.length > 1
          );
        },
      }),
      (w.Tween = tt),
      (tt.prototype = {
        constructor: tt,
        init: function (e, t, n, i, s, r) {
          (this.elem = e),
            (this.prop = n),
            (this.easing = s || w.easing._default),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = i),
            (this.unit = r || (w.cssNumber[n] ? "" : "px"));
        },
        cur: function () {
          var e = tt.propHooks[this.prop];
          return e && e.get ? e.get(this) : tt.propHooks._default.get(this);
        },
        run: function (e) {
          var t,
            n = tt.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = t =
                  w.easing[this.easing](
                    e,
                    this.options.duration * e,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = t = e),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : tt.propHooks._default.set(this),
            this
          );
        },
      }),
      (tt.prototype.init.prototype = tt.prototype),
      (tt.propHooks = {
        _default: {
          get: function (e) {
            var t;
            return 1 !== e.elem.nodeType ||
              (null != e.elem[e.prop] && null == e.elem.style[e.prop])
              ? e.elem[e.prop]
              : (t = w.css(e.elem, e.prop, "")) && "auto" !== t
              ? t
              : 0;
          },
          set: function (e) {
            w.fx.step[e.prop]
              ? w.fx.step[e.prop](e)
              : 1 !== e.elem.nodeType ||
                (!w.cssHooks[e.prop] && null == e.elem.style[Qe(e.prop)])
              ? (e.elem[e.prop] = e.now)
              : w.style(e.elem, e.prop, e.now + e.unit);
          },
        },
      }),
      (tt.propHooks.scrollTop = tt.propHooks.scrollLeft =
        {
          set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
          },
        }),
      (w.easing = {
        linear: function (e) {
          return e;
        },
        swing: function (e) {
          return 0.5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (w.fx = tt.prototype.init),
      (w.fx.step = {});
    var nt,
      it,
      st = /^(?:toggle|show|hide)$/,
      rt = /queueHooks$/;
    function ot() {
      it &&
        (!1 === _.hidden && e.requestAnimationFrame
          ? e.requestAnimationFrame(ot)
          : e.setTimeout(ot, w.fx.interval),
        w.fx.tick());
    }
    function at() {
      return (
        e.setTimeout(function () {
          nt = void 0;
        }),
        (nt = Date.now())
      );
    }
    function lt(e, t) {
      var n,
        i = 0,
        s = { height: e };
      for (t = t ? 1 : 0; i < 4; i += 2 - t)
        s["margin" + (n = ne[i])] = s["padding" + n] = e;
      return t && (s.opacity = s.width = e), s;
    }
    function ct(e, t, n) {
      for (
        var i,
          s = (ut.tweeners[t] || []).concat(ut.tweeners["*"]),
          r = 0,
          o = s.length;
        r < o;
        r++
      )
        if ((i = s[r].call(n, t, e))) return i;
    }
    function ut(e, t, n) {
      var i,
        s,
        r = 0,
        o = ut.prefilters.length,
        a = w.Deferred().always(function () {
          delete l.elem;
        }),
        l = function () {
          if (s) return !1;
          for (
            var t = nt || at(),
              n = Math.max(0, c.startTime + c.duration - t),
              i = 1 - (n / c.duration || 0),
              r = 0,
              o = c.tweens.length;
            r < o;
            r++
          )
            c.tweens[r].run(i);
          return (
            a.notifyWith(e, [c, i, n]),
            i < 1 && o
              ? n
              : (o || a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c]), !1)
          );
        },
        c = a.promise({
          elem: e,
          props: w.extend({}, t),
          opts: w.extend(
            !0,
            { specialEasing: {}, easing: w.easing._default },
            n
          ),
          originalProperties: t,
          originalOptions: n,
          startTime: nt || at(),
          duration: n.duration,
          tweens: [],
          createTween: function (t, n) {
            var i = w.Tween(
              e,
              c.opts,
              t,
              n,
              c.opts.specialEasing[t] || c.opts.easing
            );
            return c.tweens.push(i), i;
          },
          stop: function (t) {
            var n = 0,
              i = t ? c.tweens.length : 0;
            if (s) return this;
            for (s = !0; n < i; n++) c.tweens[n].run(1);
            return (
              t
                ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t]))
                : a.rejectWith(e, [c, t]),
              this
            );
          },
        }),
        u = c.props;
      for (
        !(function (e, t) {
          var n, i, s, r, o;
          for (n in e)
            if (
              ((s = t[(i = X(n))]),
              (r = e[n]),
              Array.isArray(r) && ((s = r[1]), (r = e[n] = r[0])),
              n !== i && ((e[i] = r), delete e[n]),
              (o = w.cssHooks[i]) && ("expand" in o))
            )
              for (n in ((r = o.expand(r)), delete e[i], r))
                (n in e) || ((e[n] = r[n]), (t[n] = s));
            else t[i] = s;
        })(u, c.opts.specialEasing);
        r < o;
        r++
      )
        if ((i = ut.prefilters[r].call(c, e, u, c.opts)))
          return (
            p(i.stop) &&
              (w._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)),
            i
          );
      return (
        w.map(u, ct, c),
        p(c.opts.start) && c.opts.start.call(e, c),
        c
          .progress(c.opts.progress)
          .done(c.opts.done, c.opts.complete)
          .fail(c.opts.fail)
          .always(c.opts.always),
        w.fx.timer(w.extend(l, { elem: e, anim: c, queue: c.opts.queue })),
        c
      );
    }
    (w.Animation = w.extend(ut, {
      tweeners: {
        "*": [
          function (e, t) {
            var n = this.createTween(e, t);
            return ae(n.elem, e, te.exec(t), n), n;
          },
        ],
      },
      tweener: function (e, t) {
        p(e) ? ((t = e), (e = ["*"])) : (e = e.match(q));
        for (var n, i = 0, s = e.length; i < s; i++)
          (n = e[i]),
            (ut.tweeners[n] = ut.tweeners[n] || []),
            ut.tweeners[n].unshift(t);
      },
      prefilters: [
        function (e, t, n) {
          var i,
            s,
            r,
            o,
            a,
            l,
            c,
            u,
            h = "width" in t || "height" in t,
            d = this,
            f = {},
            p = e.style,
            g = e.nodeType && oe(e),
            _ = K.get(e, "fxshow");
          for (i in (n.queue ||
            (null == (o = w._queueHooks(e, "fx")).unqueued &&
              ((o.unqueued = 0),
              (a = o.empty.fire),
              (o.empty.fire = function () {
                o.unqueued || a();
              })),
            o.unqueued++,
            d.always(function () {
              d.always(function () {
                o.unqueued--, w.queue(e, "fx").length || o.empty.fire();
              });
            })),
          t))
            if (((s = t[i]), st.test(s))) {
              if (
                (delete t[i],
                (r = r || "toggle" === s),
                s === (g ? "hide" : "show"))
              ) {
                if ("show" !== s || !_ || void 0 === _[i]) continue;
                g = !0;
              }
              f[i] = (_ && _[i]) || w.style(e, i);
            }
          if ((l = !w.isEmptyObject(t)) || !w.isEmptyObject(f))
            for (i in (h &&
              1 === e.nodeType &&
              ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
              null == (c = _ && _.display) && (c = K.get(e, "display")),
              "none" === (u = w.css(e, "display")) &&
                (c
                  ? (u = c)
                  : (ue([e], !0),
                    (c = e.style.display || c),
                    (u = w.css(e, "display")),
                    ue([e]))),
              ("inline" === u || ("inline-block" === u && null != c)) &&
                "none" === w.css(e, "float") &&
                (l ||
                  (d.done(function () {
                    p.display = c;
                  }),
                  null == c && ((u = p.display), (c = "none" === u ? "" : u))),
                (p.display = "inline-block"))),
            n.overflow &&
              ((p.overflow = "hidden"),
              d.always(function () {
                (p.overflow = n.overflow[0]),
                  (p.overflowX = n.overflow[1]),
                  (p.overflowY = n.overflow[2]);
              })),
            (l = !1),
            f))
              l ||
                (_
                  ? "hidden" in _ && (g = _.hidden)
                  : (_ = K.access(e, "fxshow", { display: c })),
                r && (_.hidden = !g),
                g && ue([e], !0),
                d.done(function () {
                  for (i in (g || ue([e]), K.remove(e, "fxshow"), f))
                    w.style(e, i, f[i]);
                })),
                (l = ct(g ? _[i] : 0, i, d)),
                i in _ ||
                  ((_[i] = l.start), g && ((l.end = l.start), (l.start = 0)));
        },
      ],
      prefilter: function (e, t) {
        t ? ut.prefilters.unshift(e) : ut.prefilters.push(e);
      },
    })),
      (w.speed = function (e, t, n) {
        var i =
          e && "object" == typeof e
            ? w.extend({}, e)
            : {
                complete: n || (!n && t) || (p(e) && e),
                duration: e,
                easing: (n && t) || (t && !p(t) && t),
              };
        return (
          w.fx.off
            ? (i.duration = 0)
            : "number" != typeof i.duration &&
              (i.duration in w.fx.speeds
                ? (i.duration = w.fx.speeds[i.duration])
                : (i.duration = w.fx.speeds._default)),
          (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
          (i.old = i.complete),
          (i.complete = function () {
            p(i.old) && i.old.call(this), i.queue && w.dequeue(this, i.queue);
          }),
          i
        );
      }),
      w.fn.extend({
        fadeTo: function (e, t, n, i) {
          return this.filter(oe)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: t }, e, n, i);
        },
        animate: function (e, t, n, i) {
          var s = w.isEmptyObject(e),
            r = w.speed(t, n, i),
            o = function () {
              var t = ut(this, w.extend({}, e), r);
              (s || K.get(this, "finish")) && t.stop(!0);
            };
          return (
            (o.finish = o),
            s || !1 === r.queue ? this.each(o) : this.queue(r.queue, o)
          );
        },
        stop: function (e, t, n) {
          var i = function (e) {
            var t = e.stop;
            delete e.stop, t(n);
          };
          return (
            "string" != typeof e && ((n = t), (t = e), (e = void 0)),
            t && this.queue(e || "fx", []),
            this.each(function () {
              var t = !0,
                s = null != e && e + "queueHooks",
                r = w.timers,
                o = K.get(this);
              if (s) o[s] && o[s].stop && i(o[s]);
              else for (s in o) o[s] && o[s].stop && rt.test(s) && i(o[s]);
              for (s = r.length; s--; )
                r[s].elem !== this ||
                  (null != e && r[s].queue !== e) ||
                  (r[s].anim.stop(n), (t = !1), r.splice(s, 1));
              (!t && n) || w.dequeue(this, e);
            })
          );
        },
        finish: function (e) {
          return (
            !1 !== e && (e = e || "fx"),
            this.each(function () {
              var t,
                n = K.get(this),
                i = n[e + "queue"],
                s = n[e + "queueHooks"],
                r = w.timers,
                o = i ? i.length : 0;
              for (
                n.finish = !0,
                  w.queue(this, e, []),
                  s && s.stop && s.stop.call(this, !0),
                  t = r.length;
                t--;

              )
                r[t].elem === this &&
                  r[t].queue === e &&
                  (r[t].anim.stop(!0), r.splice(t, 1));
              for (t = 0; t < o; t++)
                i[t] && i[t].finish && i[t].finish.call(this);
              delete n.finish;
            })
          );
        },
      }),
      w.each(["toggle", "show", "hide"], function (e, t) {
        var n = w.fn[t];
        w.fn[t] = function (e, i, s) {
          return null == e || "boolean" == typeof e
            ? n.apply(this, arguments)
            : this.animate(lt(t, !0), e, i, s);
        };
      }),
      w.each(
        {
          slideDown: lt("show"),
          slideUp: lt("hide"),
          slideToggle: lt("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (e, t) {
          w.fn[e] = function (e, n, i) {
            return this.animate(t, e, n, i);
          };
        }
      ),
      (w.timers = []),
      (w.fx.tick = function () {
        var e,
          t = 0,
          n = w.timers;
        for (nt = Date.now(); t < n.length; t++)
          (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || w.fx.stop(), (nt = void 0);
      }),
      (w.fx.timer = function (e) {
        w.timers.push(e), w.fx.start();
      }),
      (w.fx.interval = 13),
      (w.fx.start = function () {
        it || ((it = !0), ot());
      }),
      (w.fx.stop = function () {
        it = null;
      }),
      (w.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (w.fn.delay = function (t, n) {
        return (
          (t = (w.fx && w.fx.speeds[t]) || t),
          (n = n || "fx"),
          this.queue(n, function (n, i) {
            var s = e.setTimeout(n, t);
            i.stop = function () {
              e.clearTimeout(s);
            };
          })
        );
      }),
      (function () {
        var e = _.createElement("input"),
          t = _.createElement("select").appendChild(_.createElement("option"));
        (e.type = "checkbox"),
          (f.checkOn = "" !== e.value),
          (f.optSelected = t.selected),
          ((e = _.createElement("input")).value = "t"),
          (e.type = "radio"),
          (f.radioValue = "t" === e.value);
      })();
    var ht,
      dt = w.expr.attrHandle;
    w.fn.extend({
      attr: function (e, t) {
        return R(this, w.attr, e, t, arguments.length > 1);
      },
      removeAttr: function (e) {
        return this.each(function () {
          w.removeAttr(this, e);
        });
      },
    }),
      w.extend({
        attr: function (e, t, n) {
          var i,
            s,
            r = e.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return void 0 === e.getAttribute
              ? w.prop(e, t, n)
              : ((1 === r && w.isXMLDoc(e)) ||
                  (s =
                    w.attrHooks[t.toLowerCase()] ||
                    (w.expr.match.bool.test(t) ? ht : void 0)),
                void 0 !== n
                  ? null === n
                    ? void w.removeAttr(e, t)
                    : s && "set" in s && void 0 !== (i = s.set(e, n, t))
                    ? i
                    : (e.setAttribute(t, n + ""), n)
                  : s && "get" in s && null !== (i = s.get(e, t))
                  ? i
                  : null == (i = w.find.attr(e, t))
                  ? void 0
                  : i);
        },
        attrHooks: {
          type: {
            set: function (e, t) {
              if (!f.radioValue && "radio" === t && A(e, "input")) {
                var n = e.value;
                return e.setAttribute("type", t), n && (e.value = n), t;
              }
            },
          },
        },
        removeAttr: function (e, t) {
          var n,
            i = 0,
            s = t && t.match(q);
          if (s && 1 === e.nodeType)
            for (; (n = s[i++]); ) e.removeAttribute(n);
        },
      }),
      (ht = {
        set: function (e, t, n) {
          return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n;
        },
      }),
      w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = dt[t] || w.find.attr;
        dt[t] = function (e, t, i) {
          var s,
            r,
            o = t.toLowerCase();
          return (
            i ||
              ((r = dt[o]),
              (dt[o] = s),
              (s = null != n(e, t, i) ? o : null),
              (dt[o] = r)),
            s
          );
        };
      });
    var ft = /^(?:input|select|textarea|button)$/i,
      pt = /^(?:a|area)$/i;
    function gt(e) {
      return (e.match(q) || []).join(" ");
    }
    function _t(e) {
      return (e.getAttribute && e.getAttribute("class")) || "";
    }
    function mt(e) {
      return Array.isArray(e) ? e : ("string" == typeof e && e.match(q)) || [];
    }
    w.fn.extend({
      prop: function (e, t) {
        return R(this, w.prop, e, t, arguments.length > 1);
      },
      removeProp: function (e) {
        return this.each(function () {
          delete this[w.propFix[e] || e];
        });
      },
    }),
      w.extend({
        prop: function (e, t, n) {
          var i,
            s,
            r = e.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return (
              (1 === r && w.isXMLDoc(e)) ||
                ((t = w.propFix[t] || t), (s = w.propHooks[t])),
              void 0 !== n
                ? s && "set" in s && void 0 !== (i = s.set(e, n, t))
                  ? i
                  : (e[t] = n)
                : s && "get" in s && null !== (i = s.get(e, t))
                ? i
                : e[t]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (e) {
              var t = w.find.attr(e, "tabindex");
              return t
                ? parseInt(t, 10)
                : ft.test(e.nodeName) || (pt.test(e.nodeName) && e.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      f.optSelected ||
        (w.propHooks.selected = {
          get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
          },
          set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
          },
        }),
      w.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          w.propFix[this.toLowerCase()] = this;
        }
      ),
      w.fn.extend({
        addClass: function (e) {
          var t, n, i, s, r, o;
          return p(e)
            ? this.each(function (t) {
                w(this).addClass(e.call(this, t, _t(this)));
              })
            : (t = mt(e)).length
            ? this.each(function () {
                if (
                  ((i = _t(this)),
                  (n = 1 === this.nodeType && " " + gt(i) + " "))
                ) {
                  for (r = 0; r < t.length; r++)
                    (s = t[r]), n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                  (o = gt(n)), i !== o && this.setAttribute("class", o);
                }
              })
            : this;
        },
        removeClass: function (e) {
          var t, n, i, s, r, o;
          return p(e)
            ? this.each(function (t) {
                w(this).removeClass(e.call(this, t, _t(this)));
              })
            : arguments.length
            ? (t = mt(e)).length
              ? this.each(function () {
                  if (
                    ((i = _t(this)),
                    (n = 1 === this.nodeType && " " + gt(i) + " "))
                  ) {
                    for (r = 0; r < t.length; r++)
                      for (s = t[r]; n.indexOf(" " + s + " ") > -1; )
                        n = n.replace(" " + s + " ", " ");
                    (o = gt(n)), i !== o && this.setAttribute("class", o);
                  }
                })
              : this
            : this.attr("class", "");
        },
        toggleClass: function (e, t) {
          var n,
            i,
            s,
            r,
            o = typeof e,
            a = "string" === o || Array.isArray(e);
          return p(e)
            ? this.each(function (n) {
                w(this).toggleClass(e.call(this, n, _t(this), t), t);
              })
            : "boolean" == typeof t && a
            ? t
              ? this.addClass(e)
              : this.removeClass(e)
            : ((n = mt(e)),
              this.each(function () {
                if (a)
                  for (r = w(this), s = 0; s < n.length; s++)
                    (i = n[s]),
                      r.hasClass(i) ? r.removeClass(i) : r.addClass(i);
                else
                  (void 0 !== e && "boolean" !== o) ||
                    ((i = _t(this)) && K.set(this, "__className__", i),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        i || !1 === e ? "" : K.get(this, "__className__") || ""
                      ));
              }));
        },
        hasClass: function (e) {
          var t,
            n,
            i = 0;
          for (t = " " + e + " "; (n = this[i++]); )
            if (1 === n.nodeType && (" " + gt(_t(n)) + " ").indexOf(t) > -1)
              return !0;
          return !1;
        },
      });
    var vt = /\r/g;
    w.fn.extend({
      val: function (e) {
        var t,
          n,
          i,
          s = this[0];
        return arguments.length
          ? ((i = p(e)),
            this.each(function (n) {
              var s;
              1 === this.nodeType &&
                (null == (s = i ? e.call(this, n, w(this).val()) : e)
                  ? (s = "")
                  : "number" == typeof s
                  ? (s += "")
                  : Array.isArray(s) &&
                    (s = w.map(s, function (e) {
                      return null == e ? "" : e + "";
                    })),
                ((t =
                  w.valHooks[this.type] ||
                  w.valHooks[this.nodeName.toLowerCase()]) &&
                  "set" in t &&
                  void 0 !== t.set(this, s, "value")) ||
                  (this.value = s));
            }))
          : s
          ? (t = w.valHooks[s.type] || w.valHooks[s.nodeName.toLowerCase()]) &&
            "get" in t &&
            void 0 !== (n = t.get(s, "value"))
            ? n
            : "string" == typeof (n = s.value)
            ? n.replace(vt, "")
            : null == n
            ? ""
            : n
          : void 0;
      },
    }),
      w.extend({
        valHooks: {
          option: {
            get: function (e) {
              var t = w.find.attr(e, "value");
              return null != t ? t : gt(w.text(e));
            },
          },
          select: {
            get: function (e) {
              var t,
                n,
                i,
                s = e.options,
                r = e.selectedIndex,
                o = "select-one" === e.type,
                a = o ? null : [],
                l = o ? r + 1 : s.length;
              for (i = r < 0 ? l : o ? r : 0; i < l; i++)
                if (
                  ((n = s[i]).selected || i === r) &&
                  !n.disabled &&
                  (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))
                ) {
                  if (((t = w(n).val()), o)) return t;
                  a.push(t);
                }
              return a;
            },
            set: function (e, t) {
              for (
                var n, i, s = e.options, r = w.makeArray(t), o = s.length;
                o--;

              )
                ((i = s[o]).selected =
                  w.inArray(w.valHooks.option.get(i), r) > -1) && (n = !0);
              return n || (e.selectedIndex = -1), r;
            },
          },
        },
      }),
      w.each(["radio", "checkbox"], function () {
        (w.valHooks[this] = {
          set: function (e, t) {
            if (Array.isArray(t))
              return (e.checked = w.inArray(w(e).val(), t) > -1);
          },
        }),
          f.checkOn ||
            (w.valHooks[this].get = function (e) {
              return null === e.getAttribute("value") ? "on" : e.value;
            });
      }),
      (f.focusin = "onfocusin" in e);
    var yt = /^(?:focusinfocus|focusoutblur)$/,
      bt = function (e) {
        e.stopPropagation();
      };
    w.extend(w.event, {
      trigger: function (t, n, i, s) {
        var r,
          o,
          a,
          l,
          c,
          h,
          d,
          f,
          m = [i || _],
          v = u.call(t, "type") ? t.type : t,
          y = u.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((o = f = a = i = i || _),
          3 !== i.nodeType &&
            8 !== i.nodeType &&
            !yt.test(v + w.event.triggered) &&
            (v.indexOf(".") > -1 &&
              ((y = v.split(".")), (v = y.shift()), y.sort()),
            (c = v.indexOf(":") < 0 && "on" + v),
            ((t = t[w.expando]
              ? t
              : new w.Event(v, "object" == typeof t && t)).isTrigger = s
              ? 2
              : 3),
            (t.namespace = y.join(".")),
            (t.rnamespace = t.namespace
              ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = void 0),
            t.target || (t.target = i),
            (n = null == n ? [t] : w.makeArray(n, [t])),
            (d = w.event.special[v] || {}),
            s || !d.trigger || !1 !== d.trigger.apply(i, n)))
        ) {
          if (!s && !d.noBubble && !g(i)) {
            for (
              l = d.delegateType || v, yt.test(l + v) || (o = o.parentNode);
              o;
              o = o.parentNode
            )
              m.push(o), (a = o);
            a === (i.ownerDocument || _) &&
              m.push(a.defaultView || a.parentWindow || e);
          }
          for (r = 0; (o = m[r++]) && !t.isPropagationStopped(); )
            (f = o),
              (t.type = r > 1 ? l : d.bindType || v),
              (h =
                (K.get(o, "events") || Object.create(null))[t.type] &&
                K.get(o, "handle")) && h.apply(o, n),
              (h = c && o[c]) &&
                h.apply &&
                V(o) &&
                ((t.result = h.apply(o, n)),
                !1 === t.result && t.preventDefault());
          return (
            (t.type = v),
            s ||
              t.isDefaultPrevented() ||
              (d._default && !1 !== d._default.apply(m.pop(), n)) ||
              !V(i) ||
              (c &&
                p(i[v]) &&
                !g(i) &&
                ((a = i[c]) && (i[c] = null),
                (w.event.triggered = v),
                t.isPropagationStopped() && f.addEventListener(v, bt),
                i[v](),
                t.isPropagationStopped() && f.removeEventListener(v, bt),
                (w.event.triggered = void 0),
                a && (i[c] = a))),
            t.result
          );
        }
      },
      simulate: function (e, t, n) {
        var i = w.extend(new w.Event(), n, { type: e, isSimulated: !0 });
        w.event.trigger(i, null, t);
      },
    }),
      w.fn.extend({
        trigger: function (e, t) {
          return this.each(function () {
            w.event.trigger(e, t, this);
          });
        },
        triggerHandler: function (e, t) {
          var n = this[0];
          if (n) return w.event.trigger(e, t, n, !0);
        },
      }),
      f.focusin ||
        w.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
          var n = function (e) {
            w.event.simulate(t, e.target, w.event.fix(e));
          };
          w.event.special[t] = {
            setup: function () {
              var i = this.ownerDocument || this.document || this,
                s = K.access(i, t);
              s || i.addEventListener(e, n, !0), K.access(i, t, (s || 0) + 1);
            },
            teardown: function () {
              var i = this.ownerDocument || this.document || this,
                s = K.access(i, t) - 1;
              s
                ? K.access(i, t, s)
                : (i.removeEventListener(e, n, !0), K.remove(i, t));
            },
          };
        });
    var wt = e.location,
      xt = { guid: Date.now() },
      Tt = /\?/;
    w.parseXML = function (t) {
      var n, i;
      if (!t || "string" != typeof t) return null;
      try {
        n = new e.DOMParser().parseFromString(t, "text/xml");
      } catch (e) {}
      return (
        (i = n && n.getElementsByTagName("parsererror")[0]),
        (n && !i) ||
          w.error(
            "Invalid XML: " +
              (i
                ? w
                    .map(i.childNodes, function (e) {
                      return e.textContent;
                    })
                    .join("\n")
                : t)
          ),
        n
      );
    };
    var Ct = /\[\]$/,
      kt = /\r?\n/g,
      Et = /^(?:submit|button|image|reset|file)$/i,
      At = /^(?:input|select|textarea|keygen)/i;
    function St(e, t, n, i) {
      var s;
      if (Array.isArray(t))
        w.each(t, function (t, s) {
          n || Ct.test(e)
            ? i(e, s)
            : St(
                e + "[" + ("object" == typeof s && null != s ? t : "") + "]",
                s,
                n,
                i
              );
        });
      else if (n || "object" !== y(t)) i(e, t);
      else for (s in t) St(e + "[" + s + "]", t[s], n, i);
    }
    (w.param = function (e, t) {
      var n,
        i = [],
        s = function (e, t) {
          var n = p(t) ? t() : t;
          i[i.length] =
            encodeURIComponent(e) +
            "=" +
            encodeURIComponent(null == n ? "" : n);
        };
      if (null == e) return "";
      if (Array.isArray(e) || (e.jquery && !w.isPlainObject(e)))
        w.each(e, function () {
          s(this.name, this.value);
        });
      else for (n in e) St(n, e[n], t, s);
      return i.join("&");
    }),
      w.fn.extend({
        serialize: function () {
          return w.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var e = w.prop(this, "elements");
            return e ? w.makeArray(e) : this;
          })
            .filter(function () {
              var e = this.type;
              return (
                this.name &&
                !w(this).is(":disabled") &&
                At.test(this.nodeName) &&
                !Et.test(e) &&
                (this.checked || !fe.test(e))
              );
            })
            .map(function (e, t) {
              var n = w(this).val();
              return null == n
                ? null
                : Array.isArray(n)
                ? w.map(n, function (e) {
                    return { name: t.name, value: e.replace(kt, "\r\n") };
                  })
                : { name: t.name, value: n.replace(kt, "\r\n") };
            })
            .get();
        },
      });
    var Nt = /%20/g,
      Dt = /#.*$/,
      Lt = /([?&])_=[^&]*/,
      jt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Ot = /^(?:GET|HEAD)$/,
      It = /^\/\//,
      qt = {},
      Mt = {},
      Pt = "*/".concat("*"),
      Ht = _.createElement("a");
    function Ft(e) {
      return function (t, n) {
        "string" != typeof t && ((n = t), (t = "*"));
        var i,
          s = 0,
          r = t.toLowerCase().match(q) || [];
        if (p(n))
          for (; (i = r[s++]); )
            "+" === i[0]
              ? ((i = i.slice(1) || "*"), (e[i] = e[i] || []).unshift(n))
              : (e[i] = e[i] || []).push(n);
      };
    }
    function Wt(e, t, n, i) {
      var s = {},
        r = e === Mt;
      function o(a) {
        var l;
        return (
          (s[a] = !0),
          w.each(e[a] || [], function (e, a) {
            var c = a(t, n, i);
            return "string" != typeof c || r || s[c]
              ? r
                ? !(l = c)
                : void 0
              : (t.dataTypes.unshift(c), o(c), !1);
          }),
          l
        );
      }
      return o(t.dataTypes[0]) || (!s["*"] && o("*"));
    }
    function $t(e, t) {
      var n,
        i,
        s = w.ajaxSettings.flatOptions || {};
      for (n in t) void 0 !== t[n] && ((s[n] ? e : i || (i = {}))[n] = t[n]);
      return i && w.extend(!0, e, i), e;
    }
    (Ht.href = wt.href),
      w.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: wt.href,
          type: "GET",
          isLocal:
            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
              wt.protocol
            ),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": Pt,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": w.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (e, t) {
          return t ? $t($t(e, w.ajaxSettings), t) : $t(w.ajaxSettings, e);
        },
        ajaxPrefilter: Ft(qt),
        ajaxTransport: Ft(Mt),
        ajax: function (t, n) {
          "object" == typeof t && ((n = t), (t = void 0)), (n = n || {});
          var i,
            s,
            r,
            o,
            a,
            l,
            c,
            u,
            h,
            d,
            f = w.ajaxSetup({}, n),
            p = f.context || f,
            g = f.context && (p.nodeType || p.jquery) ? w(p) : w.event,
            m = w.Deferred(),
            v = w.Callbacks("once memory"),
            y = f.statusCode || {},
            b = {},
            x = {},
            T = "canceled",
            C = {
              readyState: 0,
              getResponseHeader: function (e) {
                var t;
                if (c) {
                  if (!o)
                    for (o = {}; (t = jt.exec(r)); )
                      o[t[1].toLowerCase() + " "] = (
                        o[t[1].toLowerCase() + " "] || []
                      ).concat(t[2]);
                  t = o[e.toLowerCase() + " "];
                }
                return null == t ? null : t.join(", ");
              },
              getAllResponseHeaders: function () {
                return c ? r : null;
              },
              setRequestHeader: function (e, t) {
                return (
                  null == c &&
                    ((e = x[e.toLowerCase()] = x[e.toLowerCase()] || e),
                    (b[e] = t)),
                  this
                );
              },
              overrideMimeType: function (e) {
                return null == c && (f.mimeType = e), this;
              },
              statusCode: function (e) {
                var t;
                if (e)
                  if (c) C.always(e[C.status]);
                  else for (t in e) y[t] = [y[t], e[t]];
                return this;
              },
              abort: function (e) {
                var t = e || T;
                return i && i.abort(t), k(0, t), this;
              },
            };
          if (
            (m.promise(C),
            (f.url = ((t || f.url || wt.href) + "").replace(
              It,
              wt.protocol + "//"
            )),
            (f.type = n.method || n.type || f.method || f.type),
            (f.dataTypes = (f.dataType || "*").toLowerCase().match(q) || [""]),
            null == f.crossDomain)
          ) {
            l = _.createElement("a");
            try {
              (l.href = f.url),
                (l.href = l.href),
                (f.crossDomain =
                  Ht.protocol + "//" + Ht.host != l.protocol + "//" + l.host);
            } catch (e) {
              f.crossDomain = !0;
            }
          }
          if (
            (f.data &&
              f.processData &&
              "string" != typeof f.data &&
              (f.data = w.param(f.data, f.traditional)),
            Wt(qt, f, n, C),
            c)
          )
            return C;
          for (h in ((u = w.event && f.global) &&
            0 == w.active++ &&
            w.event.trigger("ajaxStart"),
          (f.type = f.type.toUpperCase()),
          (f.hasContent = !Ot.test(f.type)),
          (s = f.url.replace(Dt, "")),
          f.hasContent
            ? f.data &&
              f.processData &&
              0 ===
                (f.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              (f.data = f.data.replace(Nt, "+"))
            : ((d = f.url.slice(s.length)),
              f.data &&
                (f.processData || "string" == typeof f.data) &&
                ((s += (Tt.test(s) ? "&" : "?") + f.data), delete f.data),
              !1 === f.cache &&
                ((s = s.replace(Lt, "$1")),
                (d = (Tt.test(s) ? "&" : "?") + "_=" + xt.guid++ + d)),
              (f.url = s + d)),
          f.ifModified &&
            (w.lastModified[s] &&
              C.setRequestHeader("If-Modified-Since", w.lastModified[s]),
            w.etag[s] && C.setRequestHeader("If-None-Match", w.etag[s])),
          ((f.data && f.hasContent && !1 !== f.contentType) || n.contentType) &&
            C.setRequestHeader("Content-Type", f.contentType),
          C.setRequestHeader(
            "Accept",
            f.dataTypes[0] && f.accepts[f.dataTypes[0]]
              ? f.accepts[f.dataTypes[0]] +
                  ("*" !== f.dataTypes[0] ? ", " + Pt + "; q=0.01" : "")
              : f.accepts["*"]
          ),
          f.headers))
            C.setRequestHeader(h, f.headers[h]);
          if (f.beforeSend && (!1 === f.beforeSend.call(p, C, f) || c))
            return C.abort();
          if (
            ((T = "abort"),
            v.add(f.complete),
            C.done(f.success),
            C.fail(f.error),
            (i = Wt(Mt, f, n, C)))
          ) {
            if (((C.readyState = 1), u && g.trigger("ajaxSend", [C, f]), c))
              return C;
            f.async &&
              f.timeout > 0 &&
              (a = e.setTimeout(function () {
                C.abort("timeout");
              }, f.timeout));
            try {
              (c = !1), i.send(b, k);
            } catch (e) {
              if (c) throw e;
              k(-1, e);
            }
          } else k(-1, "No Transport");
          function k(t, n, o, l) {
            var h,
              d,
              _,
              b,
              x,
              T = n;
            c ||
              ((c = !0),
              a && e.clearTimeout(a),
              (i = void 0),
              (r = l || ""),
              (C.readyState = t > 0 ? 4 : 0),
              (h = (t >= 200 && t < 300) || 304 === t),
              o &&
                (b = (function (e, t, n) {
                  for (
                    var i, s, r, o, a = e.contents, l = e.dataTypes;
                    "*" === l[0];

                  )
                    l.shift(),
                      void 0 === i &&
                        (i = e.mimeType || t.getResponseHeader("Content-Type"));
                  if (i)
                    for (s in a)
                      if (a[s] && a[s].test(i)) {
                        l.unshift(s);
                        break;
                      }
                  if (l[0] in n) r = l[0];
                  else {
                    for (s in n) {
                      if (!l[0] || e.converters[s + " " + l[0]]) {
                        r = s;
                        break;
                      }
                      o || (o = s);
                    }
                    r = r || o;
                  }
                  if (r) return r !== l[0] && l.unshift(r), n[r];
                })(f, C, o)),
              !h &&
                w.inArray("script", f.dataTypes) > -1 &&
                w.inArray("json", f.dataTypes) < 0 &&
                (f.converters["text script"] = function () {}),
              (b = (function (e, t, n, i) {
                var s,
                  r,
                  o,
                  a,
                  l,
                  c = {},
                  u = e.dataTypes.slice();
                if (u[1])
                  for (o in e.converters) c[o.toLowerCase()] = e.converters[o];
                for (r = u.shift(); r; )
                  if (
                    (e.responseFields[r] && (n[e.responseFields[r]] = t),
                    !l &&
                      i &&
                      e.dataFilter &&
                      (t = e.dataFilter(t, e.dataType)),
                    (l = r),
                    (r = u.shift()))
                  )
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                      if (!(o = c[l + " " + r] || c["* " + r]))
                        for (s in c)
                          if (
                            (a = s.split(" "))[1] === r &&
                            (o = c[l + " " + a[0]] || c["* " + a[0]])
                          ) {
                            !0 === o
                              ? (o = c[s])
                              : !0 !== c[s] && ((r = a[0]), u.unshift(a[1]));
                            break;
                          }
                      if (!0 !== o)
                        if (o && e.throws) t = o(t);
                        else
                          try {
                            t = o(t);
                          } catch (e) {
                            return {
                              state: "parsererror",
                              error: o
                                ? e
                                : "No conversion from " + l + " to " + r,
                            };
                          }
                    }
                return { state: "success", data: t };
              })(f, b, C, h)),
              h
                ? (f.ifModified &&
                    ((x = C.getResponseHeader("Last-Modified")) &&
                      (w.lastModified[s] = x),
                    (x = C.getResponseHeader("etag")) && (w.etag[s] = x)),
                  204 === t || "HEAD" === f.type
                    ? (T = "nocontent")
                    : 304 === t
                    ? (T = "notmodified")
                    : ((T = b.state), (d = b.data), (h = !(_ = b.error))))
                : ((_ = T), (!t && T) || ((T = "error"), t < 0 && (t = 0))),
              (C.status = t),
              (C.statusText = (n || T) + ""),
              h ? m.resolveWith(p, [d, T, C]) : m.rejectWith(p, [C, T, _]),
              C.statusCode(y),
              (y = void 0),
              u &&
                g.trigger(h ? "ajaxSuccess" : "ajaxError", [C, f, h ? d : _]),
              v.fireWith(p, [C, T]),
              u &&
                (g.trigger("ajaxComplete", [C, f]),
                --w.active || w.event.trigger("ajaxStop")));
          }
          return C;
        },
        getJSON: function (e, t, n) {
          return w.get(e, t, n, "json");
        },
        getScript: function (e, t) {
          return w.get(e, void 0, t, "script");
        },
      }),
      w.each(["get", "post"], function (e, t) {
        w[t] = function (e, n, i, s) {
          return (
            p(n) && ((s = s || i), (i = n), (n = void 0)),
            w.ajax(
              w.extend(
                { url: e, type: t, dataType: s, data: n, success: i },
                w.isPlainObject(e) && e
              )
            )
          );
        };
      }),
      w.ajaxPrefilter(function (e) {
        var t;
        for (t in e.headers)
          "content-type" === t.toLowerCase() &&
            (e.contentType = e.headers[t] || "");
      }),
      (w._evalUrl = function (e, t, n) {
        return w.ajax({
          url: e,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          converters: { "text script": function () {} },
          dataFilter: function (e) {
            w.globalEval(e, t, n);
          },
        });
      }),
      w.fn.extend({
        wrapAll: function (e) {
          var t;
          return (
            this[0] &&
              (p(e) && (e = e.call(this[0])),
              (t = w(e, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && t.insertBefore(this[0]),
              t
                .map(function () {
                  for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                  return e;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (e) {
          return p(e)
            ? this.each(function (t) {
                w(this).wrapInner(e.call(this, t));
              })
            : this.each(function () {
                var t = w(this),
                  n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
              });
        },
        wrap: function (e) {
          var t = p(e);
          return this.each(function (n) {
            w(this).wrapAll(t ? e.call(this, n) : e);
          });
        },
        unwrap: function (e) {
          return (
            this.parent(e)
              .not("body")
              .each(function () {
                w(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (w.expr.pseudos.hidden = function (e) {
        return !w.expr.pseudos.visible(e);
      }),
      (w.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }),
      (w.ajaxSettings.xhr = function () {
        try {
          return new e.XMLHttpRequest();
        } catch (e) {}
      });
    var Rt = { 0: 200, 1223: 204 },
      Bt = w.ajaxSettings.xhr();
    (f.cors = !!Bt && "withCredentials" in Bt),
      (f.ajax = Bt = !!Bt),
      w.ajaxTransport(function (t) {
        var n, i;
        if (f.cors || (Bt && !t.crossDomain))
          return {
            send: function (s, r) {
              var o,
                a = t.xhr();
              if (
                (a.open(t.type, t.url, t.async, t.username, t.password),
                t.xhrFields)
              )
                for (o in t.xhrFields) a[o] = t.xhrFields[o];
              for (o in (t.mimeType &&
                a.overrideMimeType &&
                a.overrideMimeType(t.mimeType),
              t.crossDomain ||
                s["X-Requested-With"] ||
                (s["X-Requested-With"] = "XMLHttpRequest"),
              s))
                a.setRequestHeader(o, s[o]);
              (n = function (e) {
                return function () {
                  n &&
                    ((n =
                      i =
                      a.onload =
                      a.onerror =
                      a.onabort =
                      a.ontimeout =
                      a.onreadystatechange =
                        null),
                    "abort" === e
                      ? a.abort()
                      : "error" === e
                      ? "number" != typeof a.status
                        ? r(0, "error")
                        : r(a.status, a.statusText)
                      : r(
                          Rt[a.status] || a.status,
                          a.statusText,
                          "text" !== (a.responseType || "text") ||
                            "string" != typeof a.responseText
                            ? { binary: a.response }
                            : { text: a.responseText },
                          a.getAllResponseHeaders()
                        ));
                };
              }),
                (a.onload = n()),
                (i = a.onerror = a.ontimeout = n("error")),
                void 0 !== a.onabort
                  ? (a.onabort = i)
                  : (a.onreadystatechange = function () {
                      4 === a.readyState &&
                        e.setTimeout(function () {
                          n && i();
                        });
                    }),
                (n = n("abort"));
              try {
                a.send((t.hasContent && t.data) || null);
              } catch (e) {
                if (n) throw e;
              }
            },
            abort: function () {
              n && n();
            },
          };
      }),
      w.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1);
      }),
      w.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (e) {
            return w.globalEval(e), e;
          },
        },
      }),
      w.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
      }),
      w.ajaxTransport("script", function (e) {
        var t, n;
        if (e.crossDomain || e.scriptAttrs)
          return {
            send: function (i, s) {
              (t = w("<script>")
                .attr(e.scriptAttrs || {})
                .prop({ charset: e.scriptCharset, src: e.url })
                .on(
                  "load error",
                  (n = function (e) {
                    t.remove(),
                      (n = null),
                      e && s("error" === e.type ? 404 : 200, e.type);
                  })
                )),
                _.head.appendChild(t[0]);
            },
            abort: function () {
              n && n();
            },
          };
      });
    var zt,
      Ut = [],
      Xt = /(=)\?(?=&|$)|\?\?/;
    w.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var e = Ut.pop() || w.expando + "_" + xt.guid++;
        return (this[e] = !0), e;
      },
    }),
      w.ajaxPrefilter("json jsonp", function (t, n, i) {
        var s,
          r,
          o,
          a =
            !1 !== t.jsonp &&
            (Xt.test(t.url)
              ? "url"
              : "string" == typeof t.data &&
                0 ===
                  (t.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                Xt.test(t.data) &&
                "data");
        if (a || "jsonp" === t.dataTypes[0])
          return (
            (s = t.jsonpCallback =
              p(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
            a
              ? (t[a] = t[a].replace(Xt, "$1" + s))
              : !1 !== t.jsonp &&
                (t.url += (Tt.test(t.url) ? "&" : "?") + t.jsonp + "=" + s),
            (t.converters["script json"] = function () {
              return o || w.error(s + " was not called"), o[0];
            }),
            (t.dataTypes[0] = "json"),
            (r = e[s]),
            (e[s] = function () {
              o = arguments;
            }),
            i.always(function () {
              void 0 === r ? w(e).removeProp(s) : (e[s] = r),
                t[s] && ((t.jsonpCallback = n.jsonpCallback), Ut.push(s)),
                o && p(r) && r(o[0]),
                (o = r = void 0);
            }),
            "script"
          );
      }),
      (f.createHTMLDocument =
        (((zt = _.implementation.createHTMLDocument("").body).innerHTML =
          "<form></form><form></form>"),
        2 === zt.childNodes.length)),
      (w.parseHTML = function (e, t, n) {
        return "string" != typeof e
          ? []
          : ("boolean" == typeof t && ((n = t), (t = !1)),
            t ||
              (f.createHTMLDocument
                ? (((i = (t =
                    _.implementation.createHTMLDocument("")).createElement(
                    "base"
                  )).href = _.location.href),
                  t.head.appendChild(i))
                : (t = _)),
            (r = !n && []),
            (s = S.exec(e))
              ? [t.createElement(s[1])]
              : ((s = be([e], t, r)),
                r && r.length && w(r).remove(),
                w.merge([], s.childNodes)));
        var i, s, r;
      }),
      (w.fn.load = function (e, t, n) {
        var i,
          s,
          r,
          o = this,
          a = e.indexOf(" ");
        return (
          a > -1 && ((i = gt(e.slice(a))), (e = e.slice(0, a))),
          p(t)
            ? ((n = t), (t = void 0))
            : t && "object" == typeof t && (s = "POST"),
          o.length > 0 &&
            w
              .ajax({ url: e, type: s || "GET", dataType: "html", data: t })
              .done(function (e) {
                (r = arguments),
                  o.html(i ? w("<div>").append(w.parseHTML(e)).find(i) : e);
              })
              .always(
                n &&
                  function (e, t) {
                    o.each(function () {
                      n.apply(this, r || [e.responseText, t, e]);
                    });
                  }
              ),
          this
        );
      }),
      (w.expr.pseudos.animated = function (e) {
        return w.grep(w.timers, function (t) {
          return e === t.elem;
        }).length;
      }),
      (w.offset = {
        setOffset: function (e, t, n) {
          var i,
            s,
            r,
            o,
            a,
            l,
            c = w.css(e, "position"),
            u = w(e),
            h = {};
          "static" === c && (e.style.position = "relative"),
            (a = u.offset()),
            (r = w.css(e, "top")),
            (l = w.css(e, "left")),
            ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1
              ? ((o = (i = u.position()).top), (s = i.left))
              : ((o = parseFloat(r) || 0), (s = parseFloat(l) || 0)),
            p(t) && (t = t.call(e, n, w.extend({}, a))),
            null != t.top && (h.top = t.top - a.top + o),
            null != t.left && (h.left = t.left - a.left + s),
            "using" in t ? t.using.call(e, h) : u.css(h);
        },
      }),
      w.fn.extend({
        offset: function (e) {
          if (arguments.length)
            return void 0 === e
              ? this
              : this.each(function (t) {
                  w.offset.setOffset(this, e, t);
                });
          var t,
            n,
            i = this[0];
          return i
            ? i.getClientRects().length
              ? ((t = i.getBoundingClientRect()),
                (n = i.ownerDocument.defaultView),
                { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset })
              : { top: 0, left: 0 }
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var e,
              t,
              n,
              i = this[0],
              s = { top: 0, left: 0 };
            if ("fixed" === w.css(i, "position")) t = i.getBoundingClientRect();
            else {
              for (
                t = this.offset(),
                  n = i.ownerDocument,
                  e = i.offsetParent || n.documentElement;
                e &&
                (e === n.body || e === n.documentElement) &&
                "static" === w.css(e, "position");

              )
                e = e.parentNode;
              e &&
                e !== i &&
                1 === e.nodeType &&
                (((s = w(e).offset()).top += w.css(e, "borderTopWidth", !0)),
                (s.left += w.css(e, "borderLeftWidth", !0)));
            }
            return {
              top: t.top - s.top - w.css(i, "marginTop", !0),
              left: t.left - s.left - w.css(i, "marginLeft", !0),
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var e = this.offsetParent;
              e && "static" === w.css(e, "position");

            )
              e = e.offsetParent;
            return e || ie;
          });
        },
      }),
      w.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (e, t) {
          var n = "pageYOffset" === t;
          w.fn[e] = function (i) {
            return R(
              this,
              function (e, i, s) {
                var r;
                if (
                  (g(e) ? (r = e) : 9 === e.nodeType && (r = e.defaultView),
                  void 0 === s)
                )
                  return r ? r[t] : e[i];
                r
                  ? r.scrollTo(n ? r.pageXOffset : s, n ? s : r.pageYOffset)
                  : (e[i] = s);
              },
              e,
              i,
              arguments.length
            );
          };
        }
      ),
      w.each(["top", "left"], function (e, t) {
        w.cssHooks[t] = ze(f.pixelPosition, function (e, n) {
          if (n)
            return (n = Be(e, t)), Pe.test(n) ? w(e).position()[t] + "px" : n;
        });
      }),
      w.each({ Height: "height", Width: "width" }, function (e, t) {
        w.each(
          { padding: "inner" + e, content: t, "": "outer" + e },
          function (n, i) {
            w.fn[i] = function (s, r) {
              var o = arguments.length && (n || "boolean" != typeof s),
                a = n || (!0 === s || !0 === r ? "margin" : "border");
              return R(
                this,
                function (t, n, s) {
                  var r;
                  return g(t)
                    ? 0 === i.indexOf("outer")
                      ? t["inner" + e]
                      : t.document.documentElement["client" + e]
                    : 9 === t.nodeType
                    ? ((r = t.documentElement),
                      Math.max(
                        t.body["scroll" + e],
                        r["scroll" + e],
                        t.body["offset" + e],
                        r["offset" + e],
                        r["client" + e]
                      ))
                    : void 0 === s
                    ? w.css(t, n, a)
                    : w.style(t, n, s, a);
                },
                t,
                o ? s : void 0,
                o
              );
            };
          }
        );
      }),
      w.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (e, t) {
          w.fn[t] = function (e) {
            return this.on(t, e);
          };
        }
      ),
      w.fn.extend({
        bind: function (e, t, n) {
          return this.on(e, null, t, n);
        },
        unbind: function (e, t) {
          return this.off(e, null, t);
        },
        delegate: function (e, t, n, i) {
          return this.on(t, e, n, i);
        },
        undelegate: function (e, t, n) {
          return 1 === arguments.length
            ? this.off(e, "**")
            : this.off(t, e || "**", n);
        },
        hover: function (e, t) {
          return this.mouseenter(e).mouseleave(t || e);
        },
      }),
      w.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (e, t) {
          w.fn[t] = function (e, n) {
            return arguments.length > 0
              ? this.on(t, null, e, n)
              : this.trigger(t);
          };
        }
      );
    var Vt = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    (w.proxy = function (e, t) {
      var n, i, r;
      if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), p(e)))
        return (
          (i = s.call(arguments, 2)),
          (r = function () {
            return e.apply(t || this, i.concat(s.call(arguments)));
          }),
          (r.guid = e.guid = e.guid || w.guid++),
          r
        );
    }),
      (w.holdReady = function (e) {
        e ? w.readyWait++ : w.ready(!0);
      }),
      (w.isArray = Array.isArray),
      (w.parseJSON = JSON.parse),
      (w.nodeName = A),
      (w.isFunction = p),
      (w.isWindow = g),
      (w.camelCase = X),
      (w.type = y),
      (w.now = Date.now),
      (w.isNumeric = function (e) {
        var t = w.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
      }),
      (w.trim = function (e) {
        return null == e ? "" : (e + "").replace(Vt, "$1");
      }),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return w;
        });
    var Qt = e.jQuery,
      Kt = e.$;
    return (
      (w.noConflict = function (t) {
        return (
          e.$ === w && (e.$ = Kt), t && e.jQuery === w && (e.jQuery = Qt), w
        );
      }),
      void 0 === t && (e.jQuery = e.$ = w),
      w
    );
  }),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("jquery")))
      : e(jQuery);
  })(function (e) {
    var t = Array.prototype.slice,
      n = Array.prototype.splice,
      i = {
        topSpacing: 0,
        bottomSpacing: 0,
        className: "is-sticky",
        wrapperClassName: "sticky-wrapper",
        center: !1,
        getWidthFrom: "",
        widthFromWrapper: !0,
        responsiveWidth: !1,
        zIndex: "auto",
      },
      s = e(window),
      r = e(document),
      o = [],
      a = s.height(),
      l = function () {
        for (
          var t = s.scrollTop(),
            n = r.height(),
            i = n - a,
            l = t > i ? i - t : 0,
            c = 0,
            u = o.length;
          c < u;
          c++
        ) {
          var h = o[c],
            d = h.stickyWrapper.offset().top - h.topSpacing - l;
          if (
            (h.stickyWrapper.css("height", h.stickyElement.outerHeight()),
            t <= d)
          )
            null !== h.currentTop &&
              (h.stickyElement.css({
                width: "",
                position: "",
                top: "",
                "z-index": "",
              }),
              h.stickyElement.parent().removeClass(h.className),
              h.stickyElement.trigger("sticky-end", [h]),
              (h.currentTop = null));
          else {
            var f,
              p =
                n -
                h.stickyElement.outerHeight() -
                h.topSpacing -
                h.bottomSpacing -
                t -
                l;
            if (
              (p < 0 ? (p += h.topSpacing) : (p = h.topSpacing),
              h.currentTop !== p)
            )
              h.getWidthFrom
                ? (f = e(h.getWidthFrom).width() || null)
                : h.widthFromWrapper && (f = h.stickyWrapper.width()),
                null == f && (f = h.stickyElement.width()),
                h.stickyElement
                  .css("width", f)
                  .css("position", "fixed")
                  .css("top", p)
                  .css("z-index", h.zIndex),
                h.stickyElement.parent().addClass(h.className),
                null === h.currentTop
                  ? h.stickyElement.trigger("sticky-start", [h])
                  : h.stickyElement.trigger("sticky-update", [h]),
                (h.currentTop === h.topSpacing && h.currentTop > p) ||
                (null === h.currentTop && p < h.topSpacing)
                  ? h.stickyElement.trigger("sticky-bottom-reached", [h])
                  : null !== h.currentTop &&
                    p === h.topSpacing &&
                    h.currentTop < p &&
                    h.stickyElement.trigger("sticky-bottom-unreached", [h]),
                (h.currentTop = p);
            var g = h.stickyWrapper.parent();
            h.stickyElement.offset().top + h.stickyElement.outerHeight() >=
              g.offset().top + g.outerHeight() &&
            h.stickyElement.offset().top <= h.topSpacing
              ? h.stickyElement
                  .css("position", "absolute")
                  .css("top", "")
                  .css("bottom", 0)
                  .css("z-index", "")
              : h.stickyElement
                  .css("position", "fixed")
                  .css("top", p)
                  .css("bottom", "")
                  .css("z-index", h.zIndex);
          }
        }
      },
      c = function () {
        a = s.height();
        for (var t = 0, n = o.length; t < n; t++) {
          var i = o[t],
            r = null;
          i.getWidthFrom
            ? i.responsiveWidth && (r = e(i.getWidthFrom).width())
            : i.widthFromWrapper && (r = i.stickyWrapper.width()),
            null != r && i.stickyElement.css("width", r);
        }
      },
      u = {
        init: function (t) {
          var n = e.extend({}, i, t);
          return this.each(function () {
            var t = e(this),
              s = t.attr("id"),
              r = s ? s + "-" + i.wrapperClassName : i.wrapperClassName,
              a = e("<div></div>").attr("id", r).addClass(n.wrapperClassName);
            t.wrapAll(a);
            var l = t.parent();
            n.center &&
              l.css({
                width: t.outerWidth(),
                marginLeft: "auto",
                marginRight: "auto",
              }),
              "right" === t.css("float") &&
                t.css({ float: "none" }).parent().css({ float: "right" }),
              (n.stickyElement = t),
              (n.stickyWrapper = l),
              (n.currentTop = null),
              o.push(n),
              u.setWrapperHeight(this),
              u.setupChangeListeners(this);
          });
        },
        setWrapperHeight: function (t) {
          var n = e(t),
            i = n.parent();
          i && i.css("height", n.outerHeight());
        },
        setupChangeListeners: function (e) {
          window.MutationObserver
            ? new window.MutationObserver(function (t) {
                (t[0].addedNodes.length || t[0].removedNodes.length) &&
                  u.setWrapperHeight(e);
              }).observe(e, { subtree: !0, childList: !0 })
            : (e.addEventListener(
                "DOMNodeInserted",
                function () {
                  u.setWrapperHeight(e);
                },
                !1
              ),
              e.addEventListener(
                "DOMNodeRemoved",
                function () {
                  u.setWrapperHeight(e);
                },
                !1
              ));
        },
        update: l,
        unstick: function (t) {
          return this.each(function () {
            for (var t = e(this), i = -1, s = o.length; s-- > 0; )
              o[s].stickyElement.get(0) === this && (n.call(o, s, 1), (i = s));
            -1 !== i &&
              (t.unwrap(),
              t.css({
                width: "",
                position: "",
                top: "",
                float: "",
                "z-index": "",
              }));
          });
        },
      };
    window.addEventListener
      ? (window.addEventListener("scroll", l, !1),
        window.addEventListener("resize", c, !1))
      : window.attachEvent &&
        (window.attachEvent("onscroll", l), window.attachEvent("onresize", c)),
      (e.fn.sticky = function (n) {
        return u[n]
          ? u[n].apply(this, t.call(arguments, 1))
          : "object" != typeof n && n
          ? void e.error("Method " + n + " does not exist on jQuery.sticky")
          : u.init.apply(this, arguments);
      }),
      (e.fn.unstick = function (n) {
        return u[n]
          ? u[n].apply(this, t.call(arguments, 1))
          : "object" != typeof n && n
          ? void e.error("Method " + n + " does not exist on jQuery.sticky")
          : u.unstick.apply(this, arguments);
      }),
      e(function () {
        setTimeout(l, 0);
      });
  }),
  (function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)
      module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
      ("undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this
      ).enquire = e();
    }
  })(function () {
    return (function e(t, n, i) {
      function s(o, a) {
        if (!n[o]) {
          if (!t[o]) {
            var l = "function" == typeof require && require;
            if (!a && l) return l(o, !0);
            if (r) return r(o, !0);
            var c = new Error("Cannot find module '" + o + "'");
            throw ((c.code = "MODULE_NOT_FOUND"), c);
          }
          var u = (n[o] = { exports: {} });
          t[o][0].call(
            u.exports,
            function (e) {
              var n = t[o][1][e];
              return s(n || e);
            },
            u,
            u.exports,
            e,
            t,
            n,
            i
          );
        }
        return n[o].exports;
      }
      for (
        var r = "function" == typeof require && require, o = 0;
        o < i.length;
        o++
      )
        s(i[o]);
      return s;
    })(
      {
        1: [
          function (e, t, n) {
            function i(e, t) {
              (this.query = e),
                (this.isUnconditional = t),
                (this.handlers = []),
                (this.mql = window.matchMedia(e));
              var n = this;
              (this.listener = function (e) {
                (n.mql = e.currentTarget || e), n.assess();
              }),
                this.mql.addListener(this.listener);
            }
            var s = e(3),
              r = e(4).each;
            (i.prototype = {
              constuctor: i,
              addHandler: function (e) {
                var t = new s(e);
                this.handlers.push(t), this.matches() && t.on();
              },
              removeHandler: function (e) {
                var t = this.handlers;
                r(t, function (n, i) {
                  if (n.equals(e)) return n.destroy(), !t.splice(i, 1);
                });
              },
              matches: function () {
                return this.mql.matches || this.isUnconditional;
              },
              clear: function () {
                r(this.handlers, function (e) {
                  e.destroy();
                }),
                  this.mql.removeListener(this.listener),
                  (this.handlers.length = 0);
              },
              assess: function () {
                var e = this.matches() ? "on" : "off";
                r(this.handlers, function (t) {
                  t[e]();
                });
              },
            }),
              (t.exports = i);
          },
          { 3: 3, 4: 4 },
        ],
        2: [
          function (e, t, n) {
            function i() {
              if (!window.matchMedia)
                throw new Error(
                  "matchMedia not present, legacy browsers require a polyfill"
                );
              (this.queries = {}),
                (this.browserIsIncapable =
                  !window.matchMedia("only all").matches);
            }
            var s = e(1),
              r = e(4),
              o = r.each,
              a = r.isFunction,
              l = r.isArray;
            (i.prototype = {
              constructor: i,
              register: function (e, t, n) {
                var i = this.queries,
                  r = n && this.browserIsIncapable;
                return (
                  i[e] || (i[e] = new s(e, r)),
                  a(t) && (t = { match: t }),
                  l(t) || (t = [t]),
                  o(t, function (t) {
                    a(t) && (t = { match: t }), i[e].addHandler(t);
                  }),
                  this
                );
              },
              unregister: function (e, t) {
                var n = this.queries[e];
                return (
                  n &&
                    (t
                      ? n.removeHandler(t)
                      : (n.clear(), delete this.queries[e])),
                  this
                );
              },
            }),
              (t.exports = i);
          },
          { 1: 1, 4: 4 },
        ],
        3: [
          function (e, t, n) {
            function i(e) {
              (this.options = e), !e.deferSetup && this.setup();
            }
            (i.prototype = {
              constructor: i,
              setup: function () {
                this.options.setup && this.options.setup(),
                  (this.initialised = !0);
              },
              on: function () {
                !this.initialised && this.setup(),
                  this.options.match && this.options.match();
              },
              off: function () {
                this.options.unmatch && this.options.unmatch();
              },
              destroy: function () {
                this.options.destroy ? this.options.destroy() : this.off();
              },
              equals: function (e) {
                return this.options === e || this.options.match === e;
              },
            }),
              (t.exports = i);
          },
          {},
        ],
        4: [
          function (e, t, n) {
            t.exports = {
              isFunction: function (e) {
                return "function" == typeof e;
              },
              isArray: function (e) {
                return "[object Array]" === Object.prototype.toString.apply(e);
              },
              each: function (e, t) {
                for (var n = 0, i = e.length; n < i && !1 !== t(e[n], n); n++);
              },
            };
          },
          {},
        ],
        5: [
          function (e, t, n) {
            var i = e(2);
            t.exports = new i();
          },
          { 2: 2 },
        ],
      },
      {},
      [5]
    )(5);
  }),
  function () {
    var e,
      t,
      n,
      i,
      s = {}.hasOwnProperty;
    ((i = (function () {
      function e() {
        (this.options_index = 0), (this.parsed = []);
      }
      return (
        (e.prototype.add_node = function (e) {
          return "OPTGROUP" === e.nodeName.toUpperCase()
            ? this.add_group(e)
            : this.add_option(e);
        }),
        (e.prototype.add_group = function (e) {
          var t, n, i, s, r, o;
          for (
            t = this.parsed.length,
              this.parsed.push({
                array_index: t,
                group: !0,
                label: e.label,
                title: e.title ? e.title : void 0,
                children: 0,
                disabled: e.disabled,
                classes: e.className,
              }),
              o = [],
              n = 0,
              i = (r = e.childNodes).length;
            n < i;
            n++
          )
            (s = r[n]), o.push(this.add_option(s, t, e.disabled));
          return o;
        }),
        (e.prototype.add_option = function (e, t, n) {
          if ("OPTION" === e.nodeName.toUpperCase())
            return (
              "" !== e.text
                ? (null != t && (this.parsed[t].children += 1),
                  this.parsed.push({
                    array_index: this.parsed.length,
                    options_index: this.options_index,
                    value: e.value,
                    text: e.text,
                    html: e.innerHTML,
                    title: e.title ? e.title : void 0,
                    selected: e.selected,
                    disabled: !0 === n ? n : e.disabled,
                    group_array_index: t,
                    group_label: null != t ? this.parsed[t].label : null,
                    classes: e.className,
                    style: e.style.cssText,
                  }))
                : this.parsed.push({
                    array_index: this.parsed.length,
                    options_index: this.options_index,
                    empty: !0,
                  }),
              (this.options_index += 1)
            );
        }),
        e
      );
    })()).select_to_array = function (e) {
      var t, n, s, r, o;
      for (r = new i(), n = 0, s = (o = e.childNodes).length; n < s; n++)
        (t = o[n]), r.add_node(t);
      return r.parsed;
    }),
      (t = (function () {
        function e(t, n) {
          var i, s;
          (this.form_field = t),
            (this.options = null != n ? n : {}),
            (this.label_click_handler =
              ((i = this.label_click_handler),
              (s = this),
              function () {
                return i.apply(s, arguments);
              })),
            e.browser_is_supported() &&
              ((this.is_multiple = this.form_field.multiple),
              this.set_default_text(),
              this.set_default_values(),
              this.setup(),
              this.set_up_html(),
              this.register_observers(),
              this.on_ready());
        }
        return (
          (e.prototype.set_default_values = function () {
            var e;
            return (
              (this.click_test_action =
                ((e = this),
                function (t) {
                  return e.test_active_click(t);
                })),
              (this.activate_action = (function (e) {
                return function (t) {
                  return e.activate_field(t);
                };
              })(this)),
              (this.active_field = !1),
              (this.mouse_on_container = !1),
              (this.results_showing = !1),
              (this.result_highlighted = null),
              (this.is_rtl =
                this.options.rtl ||
                /\bchosen-rtl\b/.test(this.form_field.className)),
              (this.allow_single_deselect =
                null != this.options.allow_single_deselect &&
                null != this.form_field.options[0] &&
                "" === this.form_field.options[0].text &&
                this.options.allow_single_deselect),
              (this.disable_search_threshold =
                this.options.disable_search_threshold || 0),
              (this.disable_search = this.options.disable_search || !1),
              (this.enable_split_word_search =
                null == this.options.enable_split_word_search ||
                this.options.enable_split_word_search),
              (this.group_search =
                null == this.options.group_search || this.options.group_search),
              (this.search_contains = this.options.search_contains || !1),
              (this.single_backstroke_delete =
                null == this.options.single_backstroke_delete ||
                this.options.single_backstroke_delete),
              (this.max_selected_options =
                this.options.max_selected_options || 1 / 0),
              (this.inherit_select_classes =
                this.options.inherit_select_classes || !1),
              (this.display_selected_options =
                null == this.options.display_selected_options ||
                this.options.display_selected_options),
              (this.display_disabled_options =
                null == this.options.display_disabled_options ||
                this.options.display_disabled_options),
              (this.include_group_label_in_selected =
                this.options.include_group_label_in_selected || !1),
              (this.max_shown_results =
                this.options.max_shown_results || Number.POSITIVE_INFINITY),
              (this.case_sensitive_search =
                this.options.case_sensitive_search || !1),
              (this.hide_results_on_select =
                null == this.options.hide_results_on_select ||
                this.options.hide_results_on_select)
            );
          }),
          (e.prototype.set_default_text = function () {
            return (
              this.form_field.getAttribute("data-placeholder")
                ? (this.default_text =
                    this.form_field.getAttribute("data-placeholder"))
                : this.is_multiple
                ? (this.default_text =
                    this.options.placeholder_text_multiple ||
                    this.options.placeholder_text ||
                    e.default_multiple_text)
                : (this.default_text =
                    this.options.placeholder_text_single ||
                    this.options.placeholder_text ||
                    e.default_single_text),
              (this.default_text = this.escape_html(this.default_text)),
              (this.results_none_found =
                this.form_field.getAttribute("data-no_results_text") ||
                this.options.no_results_text ||
                e.default_no_result_text)
            );
          }),
          (e.prototype.choice_label = function (e) {
            return this.include_group_label_in_selected && null != e.group_label
              ? "<b class='group-name'>" +
                  this.escape_html(e.group_label) +
                  "</b>" +
                  e.html
              : e.html;
          }),
          (e.prototype.mouse_enter = function () {
            return (this.mouse_on_container = !0);
          }),
          (e.prototype.mouse_leave = function () {
            return (this.mouse_on_container = !1);
          }),
          (e.prototype.input_focus = function (e) {
            if (this.is_multiple) {
              if (!this.active_field)
                return setTimeout(
                  ((t = this),
                  function () {
                    return t.container_mousedown();
                  }),
                  50
                );
            } else if (!this.active_field) return this.activate_field();
            var t;
          }),
          (e.prototype.input_blur = function (e) {
            if (!this.mouse_on_container)
              return (
                (this.active_field = !1),
                setTimeout(
                  ((t = this),
                  function () {
                    return t.blur_test();
                  }),
                  100
                )
              );
            var t;
          }),
          (e.prototype.label_click_handler = function (e) {
            return this.is_multiple
              ? this.container_mousedown(e)
              : this.activate_field();
          }),
          (e.prototype.results_option_build = function (e) {
            var t, n, i, s, r, o, a;
            for (
              t = "", a = 0, s = 0, r = (o = this.results_data).length;
              s < r &&
              ((i = ""),
              "" !==
                (i = (n = o[s]).group
                  ? this.result_add_group(n)
                  : this.result_add_option(n)) && (a++, (t += i)),
              (null != e ? e.first : void 0) &&
                (n.selected && this.is_multiple
                  ? this.choice_build(n)
                  : n.selected &&
                    !this.is_multiple &&
                    this.single_set_selected_text(this.choice_label(n))),
              !(a >= this.max_shown_results));
              s++
            );
            return t;
          }),
          (e.prototype.result_add_option = function (e) {
            var t, n;
            return e.search_match && this.include_option_in_results(e)
              ? ((t = []),
                e.disabled ||
                  (e.selected && this.is_multiple) ||
                  t.push("active-result"),
                !e.disabled ||
                  (e.selected && this.is_multiple) ||
                  t.push("disabled-result"),
                e.selected && t.push("result-selected"),
                null != e.group_array_index && t.push("group-option"),
                "" !== e.classes && t.push(e.classes),
                ((n = document.createElement("li")).className = t.join(" ")),
                e.style && (n.style.cssText = e.style),
                n.setAttribute("data-option-array-index", e.array_index),
                (n.innerHTML = e.highlighted_html || e.html),
                e.title && (n.title = e.title),
                this.outerHTML(n))
              : "";
          }),
          (e.prototype.result_add_group = function (e) {
            var t, n;
            return (e.search_match || e.group_match) && e.active_options > 0
              ? ((t = []).push("group-result"),
                e.classes && t.push(e.classes),
                ((n = document.createElement("li")).className = t.join(" ")),
                (n.innerHTML = e.highlighted_html || this.escape_html(e.label)),
                e.title && (n.title = e.title),
                this.outerHTML(n))
              : "";
          }),
          (e.prototype.results_update_field = function () {
            if (
              (this.set_default_text(),
              this.is_multiple || this.results_reset_cleanup(),
              this.result_clear_highlight(),
              this.results_build(),
              this.results_showing)
            )
              return this.winnow_results();
          }),
          (e.prototype.reset_single_select_options = function () {
            var e, t, n, i, s;
            for (s = [], e = 0, t = (n = this.results_data).length; e < t; e++)
              (i = n[e]).selected ? s.push((i.selected = !1)) : s.push(void 0);
            return s;
          }),
          (e.prototype.results_toggle = function () {
            return this.results_showing
              ? this.results_hide()
              : this.results_show();
          }),
          (e.prototype.results_search = function (e) {
            return this.results_showing
              ? this.winnow_results()
              : this.results_show();
          }),
          (e.prototype.winnow_results = function (e) {
            var t, n, i, s, r, o, a, l, c, u, h, d, f, p, g;
            for (
              this.no_results_clear(),
                u = 0,
                t = (a = this.get_search_text()).replace(
                  /[-[\]{}()*+?.,\\^$|#\s]/g,
                  "\\$&"
                ),
                c = this.get_search_regex(t),
                i = 0,
                s = (l = this.results_data).length;
              i < s;
              i++
            )
              ((r = l[i]).search_match = !1),
                (h = null),
                (d = null),
                (r.highlighted_html = ""),
                this.include_option_in_results(r) &&
                  (r.group && ((r.group_match = !1), (r.active_options = 0)),
                  null != r.group_array_index &&
                    this.results_data[r.group_array_index] &&
                    (0 ===
                      (h = this.results_data[r.group_array_index])
                        .active_options &&
                      h.search_match &&
                      (u += 1),
                    (h.active_options += 1)),
                  (g = r.group ? r.label : r.text),
                  (r.group && !this.group_search) ||
                    ((d = this.search_string_match(g, c)),
                    (r.search_match = null != d),
                    r.search_match && !r.group && (u += 1),
                    r.search_match
                      ? (a.length &&
                          ((f = d.index),
                          (o = g.slice(0, f)),
                          (n = g.slice(f, f + a.length)),
                          (p = g.slice(f + a.length)),
                          (r.highlighted_html =
                            this.escape_html(o) +
                            "<em>" +
                            this.escape_html(n) +
                            "</em>" +
                            this.escape_html(p))),
                        null != h && (h.group_match = !0))
                      : null != r.group_array_index &&
                        this.results_data[r.group_array_index].search_match &&
                        (r.search_match = !0)));
            return (
              this.result_clear_highlight(),
              u < 1 && a.length
                ? (this.update_results_content(""), this.no_results(a))
                : (this.update_results_content(this.results_option_build()),
                  (null != e ? e.skip_highlight : void 0)
                    ? void 0
                    : this.winnow_results_set_highlight())
            );
          }),
          (e.prototype.get_search_regex = function (e) {
            var t, n;
            return (
              (n = this.search_contains ? e : "(^|\\s|\\b)" + e + "[^\\s]*"),
              this.enable_split_word_search ||
                this.search_contains ||
                (n = "^" + n),
              (t = this.case_sensitive_search ? "" : "i"),
              new RegExp(n, t)
            );
          }),
          (e.prototype.search_string_match = function (e, t) {
            var n;
            return (
              (n = t.exec(e)),
              !this.search_contains &&
                (null != n ? n[1] : void 0) &&
                (n.index += 1),
              n
            );
          }),
          (e.prototype.choices_count = function () {
            var e, t, n;
            if (null != this.selected_option_count)
              return this.selected_option_count;
            for (
              this.selected_option_count = 0,
                e = 0,
                t = (n = this.form_field.options).length;
              e < t;
              e++
            )
              n[e].selected && (this.selected_option_count += 1);
            return this.selected_option_count;
          }),
          (e.prototype.choices_click = function (e) {
            if (
              (e.preventDefault(),
              this.activate_field(),
              !this.results_showing && !this.is_disabled)
            )
              return this.results_show();
          }),
          (e.prototype.keydown_checker = function (e) {
            var t, n;
            switch (
              ((n = null != (t = e.which) ? t : e.keyCode),
              this.search_field_scale(),
              8 !== n && this.pending_backstroke && this.clear_backstroke(),
              n)
            ) {
              case 8:
                this.backstroke_length = this.get_search_field_value().length;
                break;
              case 9:
                this.results_showing &&
                  !this.is_multiple &&
                  this.result_select(e),
                  (this.mouse_on_container = !1);
                break;
              case 13:
              case 27:
                this.results_showing && e.preventDefault();
                break;
              case 32:
                this.disable_search && e.preventDefault();
                break;
              case 38:
                e.preventDefault(), this.keyup_arrow();
                break;
              case 40:
                e.preventDefault(), this.keydown_arrow();
            }
          }),
          (e.prototype.keyup_checker = function (e) {
            var t, n;
            switch (
              ((n = null != (t = e.which) ? t : e.keyCode),
              this.search_field_scale(),
              n)
            ) {
              case 8:
                this.is_multiple &&
                this.backstroke_length < 1 &&
                this.choices_count() > 0
                  ? this.keydown_backstroke()
                  : this.pending_backstroke ||
                    (this.result_clear_highlight(), this.results_search());
                break;
              case 13:
                e.preventDefault(),
                  this.results_showing && this.result_select(e);
                break;
              case 27:
                this.results_showing && this.results_hide();
                break;
              case 9:
              case 16:
              case 17:
              case 18:
              case 38:
              case 40:
              case 91:
                break;
              default:
                this.results_search();
            }
          }),
          (e.prototype.clipboard_event_checker = function (e) {
            var t;
            if (!this.is_disabled)
              return setTimeout(
                ((t = this),
                function () {
                  return t.results_search();
                }),
                50
              );
          }),
          (e.prototype.container_width = function () {
            return null != this.options.width
              ? this.options.width
              : this.form_field.offsetWidth + "px";
          }),
          (e.prototype.include_option_in_results = function (e) {
            return (
              !(
                this.is_multiple &&
                !this.display_selected_options &&
                e.selected
              ) &&
              !(!this.display_disabled_options && e.disabled) &&
              !e.empty
            );
          }),
          (e.prototype.search_results_touchstart = function (e) {
            return (this.touch_started = !0), this.search_results_mouseover(e);
          }),
          (e.prototype.search_results_touchmove = function (e) {
            return (this.touch_started = !1), this.search_results_mouseout(e);
          }),
          (e.prototype.search_results_touchend = function (e) {
            if (this.touch_started) return this.search_results_mouseup(e);
          }),
          (e.prototype.outerHTML = function (e) {
            var t;
            return e.outerHTML
              ? e.outerHTML
              : ((t = document.createElement("div")).appendChild(e),
                t.innerHTML);
          }),
          (e.prototype.get_single_html = function () {
            return (
              '<a class="chosen-single chosen-default">\n  <span>' +
              this.default_text +
              '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
            );
          }),
          (e.prototype.get_multi_html = function () {
            return (
              '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' +
              this.default_text +
              '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
            );
          }),
          (e.prototype.get_no_results_html = function (e) {
            return (
              '<li class="no-results">\n  ' +
              this.results_none_found +
              " <span>" +
              this.escape_html(e) +
              "</span>\n</li>"
            );
          }),
          (e.browser_is_supported = function () {
            return "Microsoft Internet Explorer" === window.navigator.appName
              ? document.documentMode >= 8
              : !(
                  /iP(od|hone)/i.test(window.navigator.userAgent) ||
                  /IEMobile/i.test(window.navigator.userAgent) ||
                  /Windows Phone/i.test(window.navigator.userAgent) ||
                  /BlackBerry/i.test(window.navigator.userAgent) ||
                  /BB10/i.test(window.navigator.userAgent) ||
                  /Android.*Mobile/i.test(window.navigator.userAgent)
                );
          }),
          (e.default_multiple_text = "Select Some Options"),
          (e.default_single_text = "Select an Option"),
          (e.default_no_result_text = "No results match"),
          e
        );
      })()),
      (e = jQuery).fn.extend({
        chosen: function (i) {
          return t.browser_is_supported()
            ? this.each(function (t) {
                var s, r;
                (r = (s = e(this)).data("chosen")),
                  "destroy" !== i
                    ? r instanceof n || s.data("chosen", new n(this, i))
                    : r instanceof n && r.destroy();
              })
            : this;
        },
      }),
      (n = (function (t) {
        function n() {
          return n.__super__.constructor.apply(this, arguments);
        }
        return (
          (function (e, t) {
            for (var n in t) s.call(t, n) && (e[n] = t[n]);
            function i() {
              this.constructor = e;
            }
            (i.prototype = t.prototype),
              (e.prototype = new i()),
              (e.__super__ = t.prototype);
          })(n, t),
          (n.prototype.setup = function () {
            return (
              (this.form_field_jq = e(this.form_field)),
              (this.current_selectedIndex = this.form_field.selectedIndex)
            );
          }),
          (n.prototype.set_up_html = function () {
            var t, n;
            return (
              (t = ["chosen-container"]).push(
                "chosen-container-" + (this.is_multiple ? "multi" : "single")
              ),
              this.inherit_select_classes &&
                this.form_field.className &&
                t.push(this.form_field.className),
              this.is_rtl && t.push("chosen-rtl"),
              (n = { class: t.join(" "), title: this.form_field.title }),
              this.form_field.id.length &&
                (n.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"),
              (this.container = e("<div />", n)),
              this.container.width(this.container_width()),
              this.is_multiple
                ? this.container.html(this.get_multi_html())
                : this.container.html(this.get_single_html()),
              this.form_field_jq.hide().after(this.container),
              (this.dropdown = this.container.find("div.chosen-drop").first()),
              (this.search_field = this.container.find("input").first()),
              (this.search_results = this.container
                .find("ul.chosen-results")
                .first()),
              this.search_field_scale(),
              (this.search_no_results = this.container
                .find("li.no-results")
                .first()),
              this.is_multiple
                ? ((this.search_choices = this.container
                    .find("ul.chosen-choices")
                    .first()),
                  (this.search_container = this.container
                    .find("li.search-field")
                    .first()))
                : ((this.search_container = this.container
                    .find("div.chosen-search")
                    .first()),
                  (this.selected_item = this.container
                    .find(".chosen-single")
                    .first())),
              this.results_build(),
              this.set_tab_index(),
              this.set_label_behavior()
            );
          }),
          (n.prototype.on_ready = function () {
            return this.form_field_jq.trigger("chosen:ready", { chosen: this });
          }),
          (n.prototype.register_observers = function () {
            var e;
            return (
              this.container.on(
                "touchstart.chosen",
                ((e = this),
                function (t) {
                  e.container_mousedown(t);
                })
              ),
              this.container.on(
                "touchend.chosen",
                (function (e) {
                  return function (t) {
                    e.container_mouseup(t);
                  };
                })(this)
              ),
              this.container.on(
                "mousedown.chosen",
                (function (e) {
                  return function (t) {
                    e.container_mousedown(t);
                  };
                })(this)
              ),
              this.container.on(
                "mouseup.chosen",
                (function (e) {
                  return function (t) {
                    e.container_mouseup(t);
                  };
                })(this)
              ),
              this.container.on(
                "mouseenter.chosen",
                (function (e) {
                  return function (t) {
                    e.mouse_enter(t);
                  };
                })(this)
              ),
              this.container.on(
                "mouseleave.chosen",
                (function (e) {
                  return function (t) {
                    e.mouse_leave(t);
                  };
                })(this)
              ),
              this.search_results.on(
                "mouseup.chosen",
                (function (e) {
                  return function (t) {
                    e.search_results_mouseup(t);
                  };
                })(this)
              ),
              this.search_results.on(
                "mouseover.chosen",
                (function (e) {
                  return function (t) {
                    e.search_results_mouseover(t);
                  };
                })(this)
              ),
              this.search_results.on(
                "mouseout.chosen",
                (function (e) {
                  return function (t) {
                    e.search_results_mouseout(t);
                  };
                })(this)
              ),
              this.search_results.on(
                "mousewheel.chosen DOMMouseScroll.chosen",
                (function (e) {
                  return function (t) {
                    e.search_results_mousewheel(t);
                  };
                })(this)
              ),
              this.search_results.on(
                "touchstart.chosen",
                (function (e) {
                  return function (t) {
                    e.search_results_touchstart(t);
                  };
                })(this)
              ),
              this.search_results.on(
                "touchmove.chosen",
                (function (e) {
                  return function (t) {
                    e.search_results_touchmove(t);
                  };
                })(this)
              ),
              this.search_results.on(
                "touchend.chosen",
                (function (e) {
                  return function (t) {
                    e.search_results_touchend(t);
                  };
                })(this)
              ),
              this.form_field_jq.on(
                "chosen:updated.chosen",
                (function (e) {
                  return function (t) {
                    e.results_update_field(t);
                  };
                })(this)
              ),
              this.form_field_jq.on(
                "chosen:activate.chosen",
                (function (e) {
                  return function (t) {
                    e.activate_field(t);
                  };
                })(this)
              ),
              this.form_field_jq.on(
                "chosen:open.chosen",
                (function (e) {
                  return function (t) {
                    e.container_mousedown(t);
                  };
                })(this)
              ),
              this.form_field_jq.on(
                "chosen:close.chosen",
                (function (e) {
                  return function (t) {
                    e.close_field(t);
                  };
                })(this)
              ),
              this.search_field.on(
                "blur.chosen",
                (function (e) {
                  return function (t) {
                    e.input_blur(t);
                  };
                })(this)
              ),
              this.search_field.on(
                "keyup.chosen",
                (function (e) {
                  return function (t) {
                    e.keyup_checker(t);
                  };
                })(this)
              ),
              this.search_field.on(
                "keydown.chosen",
                (function (e) {
                  return function (t) {
                    e.keydown_checker(t);
                  };
                })(this)
              ),
              this.search_field.on(
                "focus.chosen",
                (function (e) {
                  return function (t) {
                    e.input_focus(t);
                  };
                })(this)
              ),
              this.search_field.on(
                "cut.chosen",
                (function (e) {
                  return function (t) {
                    e.clipboard_event_checker(t);
                  };
                })(this)
              ),
              this.search_field.on(
                "paste.chosen",
                (function (e) {
                  return function (t) {
                    e.clipboard_event_checker(t);
                  };
                })(this)
              ),
              this.is_multiple
                ? this.search_choices.on(
                    "click.chosen",
                    (function (e) {
                      return function (t) {
                        e.choices_click(t);
                      };
                    })(this)
                  )
                : this.container.on("click.chosen", function (e) {
                    e.preventDefault();
                  })
            );
          }),
          (n.prototype.destroy = function () {
            return (
              e(this.container[0].ownerDocument).off(
                "click.chosen",
                this.click_test_action
              ),
              this.form_field_label.length > 0 &&
                this.form_field_label.off("click.chosen"),
              this.search_field[0].tabIndex &&
                (this.form_field_jq[0].tabIndex =
                  this.search_field[0].tabIndex),
              this.container.remove(),
              this.form_field_jq.removeData("chosen"),
              this.form_field_jq.show()
            );
          }),
          (n.prototype.search_field_disabled = function () {
            return (
              (this.is_disabled =
                this.form_field.disabled ||
                this.form_field_jq.parents("fieldset").is(":disabled")),
              this.container.toggleClass("chosen-disabled", this.is_disabled),
              (this.search_field[0].disabled = this.is_disabled),
              this.is_multiple ||
                this.selected_item.off("focus.chosen", this.activate_field),
              this.is_disabled
                ? this.close_field()
                : this.is_multiple
                ? void 0
                : this.selected_item.on("focus.chosen", this.activate_field)
            );
          }),
          (n.prototype.container_mousedown = function (t) {
            var n;
            if (!this.is_disabled)
              return (
                !t ||
                  ("mousedown" !== (n = t.type) && "touchstart" !== n) ||
                  this.results_showing ||
                  t.preventDefault(),
                null != t && e(t.target).hasClass("search-choice-close")
                  ? void 0
                  : (this.active_field
                      ? this.is_multiple ||
                        !t ||
                        (e(t.target)[0] !== this.selected_item[0] &&
                          !e(t.target).parents("a.chosen-single").length) ||
                        (t.preventDefault(), this.results_toggle())
                      : (this.is_multiple && this.search_field.val(""),
                        e(this.container[0].ownerDocument).on(
                          "click.chosen",
                          this.click_test_action
                        ),
                        this.results_show()),
                    this.activate_field())
              );
          }),
          (n.prototype.container_mouseup = function (e) {
            if ("ABBR" === e.target.nodeName && !this.is_disabled)
              return this.results_reset(e);
          }),
          (n.prototype.search_results_mousewheel = function (e) {
            var t;
            if (
              (e.originalEvent &&
                (t =
                  e.originalEvent.deltaY ||
                  -e.originalEvent.wheelDelta ||
                  e.originalEvent.detail),
              null != t)
            )
              return (
                e.preventDefault(),
                "DOMMouseScroll" === e.type && (t *= 40),
                this.search_results.scrollTop(
                  t + this.search_results.scrollTop()
                )
              );
          }),
          (n.prototype.blur_test = function (e) {
            if (
              !this.active_field &&
              this.container.hasClass("chosen-container-active")
            )
              return this.close_field();
          }),
          (n.prototype.close_field = function () {
            return (
              e(this.container[0].ownerDocument).off(
                "click.chosen",
                this.click_test_action
              ),
              (this.active_field = !1),
              this.results_hide(),
              this.container.removeClass("chosen-container-active"),
              this.clear_backstroke(),
              this.show_search_field_default(),
              this.search_field_scale(),
              this.search_field.blur()
            );
          }),
          (n.prototype.activate_field = function () {
            if (!this.is_disabled)
              return (
                this.container.addClass("chosen-container-active"),
                (this.active_field = !0),
                this.search_field.val(this.search_field.val()),
                this.search_field.focus()
              );
          }),
          (n.prototype.test_active_click = function (t) {
            var n;
            return (n = e(t.target).closest(".chosen-container")).length &&
              this.container[0] === n[0]
              ? (this.active_field = !0)
              : this.close_field();
          }),
          (n.prototype.results_build = function () {
            return (
              (this.parsing = !0),
              (this.selected_option_count = null),
              (this.results_data = i.select_to_array(this.form_field)),
              this.is_multiple
                ? this.search_choices.find("li.search-choice").remove()
                : (this.single_set_selected_text(),
                  this.disable_search ||
                  this.form_field.options.length <=
                    this.disable_search_threshold
                    ? ((this.search_field[0].readOnly = !0),
                      this.container.addClass(
                        "chosen-container-single-nosearch"
                      ))
                    : ((this.search_field[0].readOnly = !1),
                      this.container.removeClass(
                        "chosen-container-single-nosearch"
                      ))),
              this.update_results_content(
                this.results_option_build({ first: !0 })
              ),
              this.search_field_disabled(),
              this.show_search_field_default(),
              this.search_field_scale(),
              (this.parsing = !1)
            );
          }),
          (n.prototype.result_do_highlight = function (e) {
            var t, n, i, s, r;
            if (e.length) {
              if (
                (this.result_clear_highlight(),
                (this.result_highlight = e),
                this.result_highlight.addClass("highlighted"),
                (s =
                  (i = parseInt(this.search_results.css("maxHeight"), 10)) +
                  (r = this.search_results.scrollTop())),
                (t =
                  (n =
                    this.result_highlight.position().top +
                    this.search_results.scrollTop()) +
                  this.result_highlight.outerHeight()) >= s)
              )
                return this.search_results.scrollTop(t - i > 0 ? t - i : 0);
              if (n < r) return this.search_results.scrollTop(n);
            }
          }),
          (n.prototype.result_clear_highlight = function () {
            return (
              this.result_highlight &&
                this.result_highlight.removeClass("highlighted"),
              (this.result_highlight = null)
            );
          }),
          (n.prototype.results_show = function () {
            return this.is_multiple &&
              this.max_selected_options <= this.choices_count()
              ? (this.form_field_jq.trigger("chosen:maxselected", {
                  chosen: this,
                }),
                !1)
              : (this.container.addClass("chosen-with-drop"),
                (this.results_showing = !0),
                this.search_field.focus(),
                this.search_field.val(this.get_search_field_value()),
                this.winnow_results(),
                this.form_field_jq.trigger("chosen:showing_dropdown", {
                  chosen: this,
                }));
          }),
          (n.prototype.update_results_content = function (e) {
            return this.search_results.html(e);
          }),
          (n.prototype.results_hide = function () {
            return (
              this.results_showing &&
                (this.result_clear_highlight(),
                this.container.removeClass("chosen-with-drop"),
                this.form_field_jq.trigger("chosen:hiding_dropdown", {
                  chosen: this,
                })),
              (this.results_showing = !1)
            );
          }),
          (n.prototype.set_tab_index = function (e) {
            var t;
            if (this.form_field.tabIndex)
              return (
                (t = this.form_field.tabIndex),
                (this.form_field.tabIndex = -1),
                (this.search_field[0].tabIndex = t)
              );
          }),
          (n.prototype.set_label_behavior = function () {
            if (
              ((this.form_field_label = this.form_field_jq.parents("label")),
              !this.form_field_label.length &&
                this.form_field.id.length &&
                (this.form_field_label = e(
                  "label[for='" + this.form_field.id + "']"
                )),
              this.form_field_label.length > 0)
            )
              return this.form_field_label.on(
                "click.chosen",
                this.label_click_handler
              );
          }),
          (n.prototype.show_search_field_default = function () {
            return this.is_multiple &&
              this.choices_count() < 1 &&
              !this.active_field
              ? (this.search_field.val(this.default_text),
                this.search_field.addClass("default"))
              : (this.search_field.val(""),
                this.search_field.removeClass("default"));
          }),
          (n.prototype.search_results_mouseup = function (t) {
            var n;
            if (
              (n = e(t.target).hasClass("active-result")
                ? e(t.target)
                : e(t.target).parents(".active-result").first()).length
            )
              return (
                (this.result_highlight = n),
                this.result_select(t),
                this.search_field.focus()
              );
          }),
          (n.prototype.search_results_mouseover = function (t) {
            var n;
            if (
              (n = e(t.target).hasClass("active-result")
                ? e(t.target)
                : e(t.target).parents(".active-result").first())
            )
              return this.result_do_highlight(n);
          }),
          (n.prototype.search_results_mouseout = function (t) {
            if (
              e(t.target).hasClass("active-result") ||
              e(t.target).parents(".active-result").first()
            )
              return this.result_clear_highlight();
          }),
          (n.prototype.choice_build = function (t) {
            var n, i, s;
            return (
              (n = e("<li />", { class: "search-choice" }).html(
                "<span>" + this.choice_label(t) + "</span>"
              )),
              t.disabled
                ? n.addClass("search-choice-disabled")
                : ((i = e("<a />", {
                    class: "search-choice-close",
                    "data-option-array-index": t.array_index,
                  })).on(
                    "click.chosen",
                    ((s = this),
                    function (e) {
                      return s.choice_destroy_link_click(e);
                    })
                  ),
                  n.append(i)),
              this.search_container.before(n)
            );
          }),
          (n.prototype.choice_destroy_link_click = function (t) {
            if ((t.preventDefault(), t.stopPropagation(), !this.is_disabled))
              return this.choice_destroy(e(t.target));
          }),
          (n.prototype.choice_destroy = function (e) {
            if (
              this.result_deselect(e[0].getAttribute("data-option-array-index"))
            )
              return (
                this.active_field
                  ? this.search_field.focus()
                  : this.show_search_field_default(),
                this.is_multiple &&
                  this.choices_count() > 0 &&
                  this.get_search_field_value().length < 1 &&
                  this.results_hide(),
                e.parents("li").first().remove(),
                this.search_field_scale()
              );
          }),
          (n.prototype.results_reset = function () {
            if (
              (this.reset_single_select_options(),
              (this.form_field.options[0].selected = !0),
              this.single_set_selected_text(),
              this.show_search_field_default(),
              this.results_reset_cleanup(),
              this.trigger_form_field_change(),
              this.active_field)
            )
              return this.results_hide();
          }),
          (n.prototype.results_reset_cleanup = function () {
            return (
              (this.current_selectedIndex = this.form_field.selectedIndex),
              this.selected_item.find("abbr").remove()
            );
          }),
          (n.prototype.result_select = function (e) {
            var t, n;
            if (this.result_highlight)
              return (
                (t = this.result_highlight),
                this.result_clear_highlight(),
                this.is_multiple &&
                this.max_selected_options <= this.choices_count()
                  ? (this.form_field_jq.trigger("chosen:maxselected", {
                      chosen: this,
                    }),
                    !1)
                  : (this.is_multiple
                      ? t.removeClass("active-result")
                      : this.reset_single_select_options(),
                    t.addClass("result-selected"),
                    ((n =
                      this.results_data[
                        t[0].getAttribute("data-option-array-index")
                      ]).selected = !0),
                    (this.form_field.options[n.options_index].selected = !0),
                    (this.selected_option_count = null),
                    this.is_multiple
                      ? this.choice_build(n)
                      : this.single_set_selected_text(this.choice_label(n)),
                    this.is_multiple &&
                    (!this.hide_results_on_select || e.metaKey || e.ctrlKey)
                      ? e.metaKey || e.ctrlKey
                        ? this.winnow_results({ skip_highlight: !0 })
                        : (this.search_field.val(""), this.winnow_results())
                      : (this.results_hide(), this.show_search_field_default()),
                    (this.is_multiple ||
                      this.form_field.selectedIndex !==
                        this.current_selectedIndex) &&
                      this.trigger_form_field_change({
                        selected:
                          this.form_field.options[n.options_index].value,
                      }),
                    (this.current_selectedIndex =
                      this.form_field.selectedIndex),
                    e.preventDefault(),
                    this.search_field_scale())
              );
          }),
          (n.prototype.single_set_selected_text = function (e) {
            return (
              null == e && (e = this.default_text),
              e === this.default_text
                ? this.selected_item.addClass("chosen-default")
                : (this.single_deselect_control_build(),
                  this.selected_item.removeClass("chosen-default")),
              this.selected_item.find("span").html(e)
            );
          }),
          (n.prototype.result_deselect = function (e) {
            var t;
            return (
              (t = this.results_data[e]),
              !this.form_field.options[t.options_index].disabled &&
                ((t.selected = !1),
                (this.form_field.options[t.options_index].selected = !1),
                (this.selected_option_count = null),
                this.result_clear_highlight(),
                this.results_showing && this.winnow_results(),
                this.trigger_form_field_change({
                  deselected: this.form_field.options[t.options_index].value,
                }),
                this.search_field_scale(),
                !0)
            );
          }),
          (n.prototype.single_deselect_control_build = function () {
            if (this.allow_single_deselect)
              return (
                this.selected_item.find("abbr").length ||
                  this.selected_item
                    .find("span")
                    .first()
                    .after('<abbr class="search-choice-close"></abbr>'),
                this.selected_item.addClass("chosen-single-with-deselect")
              );
          }),
          (n.prototype.get_search_field_value = function () {
            return this.search_field.val();
          }),
          (n.prototype.get_search_text = function () {
            return e.trim(this.get_search_field_value());
          }),
          (n.prototype.escape_html = function (t) {
            return e("<div/>").text(t).html();
          }),
          (n.prototype.winnow_results_set_highlight = function () {
            var e, t;
            if (
              null !=
              (e = (t = this.is_multiple
                ? []
                : this.search_results.find(".result-selected.active-result"))
                .length
                ? t.first()
                : this.search_results.find(".active-result").first())
            )
              return this.result_do_highlight(e);
          }),
          (n.prototype.no_results = function (e) {
            var t;
            return (
              (t = this.get_no_results_html(e)),
              this.search_results.append(t),
              this.form_field_jq.trigger("chosen:no_results", { chosen: this })
            );
          }),
          (n.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove();
          }),
          (n.prototype.keydown_arrow = function () {
            var e;
            return this.results_showing && this.result_highlight
              ? (e = this.result_highlight.nextAll("li.active-result").first())
                ? this.result_do_highlight(e)
                : void 0
              : this.results_show();
          }),
          (n.prototype.keyup_arrow = function () {
            var e;
            return this.results_showing || this.is_multiple
              ? this.result_highlight
                ? (e = this.result_highlight.prevAll("li.active-result")).length
                  ? this.result_do_highlight(e.first())
                  : (this.choices_count() > 0 && this.results_hide(),
                    this.result_clear_highlight())
                : void 0
              : this.results_show();
          }),
          (n.prototype.keydown_backstroke = function () {
            var e;
            return this.pending_backstroke
              ? (this.choice_destroy(this.pending_backstroke.find("a").first()),
                this.clear_backstroke())
              : (e = this.search_container.siblings("li.search-choice").last())
                  .length && !e.hasClass("search-choice-disabled")
              ? ((this.pending_backstroke = e),
                this.single_backstroke_delete
                  ? this.keydown_backstroke()
                  : this.pending_backstroke.addClass("search-choice-focus"))
              : void 0;
          }),
          (n.prototype.clear_backstroke = function () {
            return (
              this.pending_backstroke &&
                this.pending_backstroke.removeClass("search-choice-focus"),
              (this.pending_backstroke = null)
            );
          }),
          (n.prototype.search_field_scale = function () {
            var t, n, i, s, r, o, a;
            if (this.is_multiple) {
              for (
                r = {
                  position: "absolute",
                  left: "-1000px",
                  top: "-1000px",
                  display: "none",
                  whiteSpace: "pre",
                },
                  n = 0,
                  i = (o = [
                    "fontSize",
                    "fontStyle",
                    "fontWeight",
                    "fontFamily",
                    "lineHeight",
                    "textTransform",
                    "letterSpacing",
                  ]).length;
                n < i;
                n++
              )
                r[(s = o[n])] = this.search_field.css(s);
              return (
                (t = e("<div />").css(r)).text(this.get_search_field_value()),
                e("body").append(t),
                (a = t.width() + 25),
                t.remove(),
                this.container.is(":visible") &&
                  (a = Math.min(this.container.outerWidth() - 10, a)),
                this.search_field.width(a)
              );
            }
          }),
          (n.prototype.trigger_form_field_change = function (e) {
            return (
              this.form_field_jq.trigger("input", e),
              this.form_field_jq.trigger("change", e)
            );
          }),
          n
        );
      })(t));
  }.call(this);
