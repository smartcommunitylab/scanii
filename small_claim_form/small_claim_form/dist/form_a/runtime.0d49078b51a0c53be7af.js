(() => {
  "use strict";
  var e,
    v = {},
    g = {};
  function f(e) {
    var t = g[e];
    if (void 0 !== t) return t.exports;
    var a = (g[e] = { exports: {} });
    return v[e].call(a.exports, a, a.exports, f), a.exports;
  }
  (f.m = v),
    (e = []),
    (f.O = (t, a, r, b) => {
      if (!a) {
        var c = 1 / 0;
        for (d = 0; d < e.length; d++) {
          for (var [a, r, b] = e[d], o = !0, n = 0; n < a.length; n++)
            (!1 & b || c >= b) && Object.keys(f.O).every((p) => f.O[p](a[n]))
              ? a.splice(n--, 1)
              : ((o = !1), b < c && (c = b));
          if (o) {
            e.splice(d--, 1);
            var s = r();
            void 0 !== s && (t = s);
          }
        }
        return t;
      }
      b = b || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > b; d--) e[d] = e[d - 1];
      e[d] = [a, r, b];
    }),
    (f.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return f.d(t, { a: t }), t;
    }),
    (() => {
      var t,
        e = Object.getPrototypeOf
          ? (a) => Object.getPrototypeOf(a)
          : (a) => a.__proto__;
      f.t = function (a, r) {
        if (
          (1 & r && (a = this(a)),
          8 & r ||
            ("object" == typeof a &&
              a &&
              ((4 & r && a.__esModule) ||
                (16 & r && "function" == typeof a.then))))
        )
          return a;
        var b = Object.create(null);
        f.r(b);
        var d = {};
        t = t || [null, e({}), e([]), e(e)];
        for (
          var c = 2 & r && a;
          "object" == typeof c && !~t.indexOf(c);
          c = e(c)
        )
          Object.getOwnPropertyNames(c).forEach((o) => (d[o] = () => a[o]));
        return (d.default = () => a), f.d(b, d), b;
      };
    })(),
    (f.d = (e, t) => {
      for (var a in t)
        f.o(t, a) &&
          !f.o(e, a) &&
          Object.defineProperty(e, a, { enumerable: !0, get: t[a] });
    }),
    (f.f = {}),
    (f.e = (e) =>
      Promise.all(Object.keys(f.f).reduce((t, a) => (f.f[a](e, t), t), []))),
    (f.u = (e) =>
      "form_a/" +
      e +
      "." +
      {
        200: "3798d0919265c152ba0a",
        326: "5a1bb1e55402fb497e6d",
        396: "036ed554ed3401b9762f",
        455: "e80a85b5639eb748f407",
        465: "49f3b3cbbc4a8bd3287c",
        627: "e41110de34bd34a423ef",
        722: "a9059ee2ce65c43e474f",
        883: "98b119733f50c5101b47",
        1003: "a151266ca73fad4825f1",
        1254: "bd51d4787505ca8ce43d",
        1400: "8bbbdb2d15f06636392e",
        1640: "6d624e62fb8837eafb04",
        1642: "54ece527a392ea640343",
        1699: "31ffd15dd1f848cd97e5",
        1830: "3531bae00124c81c3d39",
        1874: "c71cf7bbee6426f1a661",
        1980: "3e6a909b3c24cb609f5a",
        2194: "a05a1361b9238eb505bf",
        2219: "ce33989d9c6c509ee04b",
        2277: "a550e9176cf36adac14c",
        2348: "2ab583d1be37ad481fcc",
        2353: "2a132b5e47a40641f2fc",
        2650: "6e59e7d85dff4fdd7658",
        2676: "677dd04c9938ecc55946",
        2946: "935a9fd424f786c08a40",
        2984: "d1e681b49ab3d3325952",
        3166: "c1e82daddc86feb9d5b1",
        3226: "44af69250abf6dffd39a",
        3250: "36b6ef4313df4730cad5",
        3358: "4810e0ac70935015fe27",
        3410: "71d7fd8c6c3c7fede689",
        3497: "54a4cb948f6e1472c534",
        3667: "4e1ef01f1a867ccf29a1",
        3871: "ff911616e57df4923f2d",
        3874: "62cf00828d2a10961089",
        4043: "3bd47211c0ae50acceef",
        4130: "1584441b84c7e9e361fd",
        4466: "2aa7182642b447619728",
        4613: "14a0aad85c472d969fdc",
        5109: "696602d41388a646e378",
        5127: "8e1ac6ab29678e908b3f",
        5248: "e2286a6b03c552987721",
        5307: "7a70bedaf7f8da01448e",
        5578: "54b60879918b25ae718f",
        5659: "2555ea1891e2d1b8fcd8",
        5810: "0b0877b28752e4cc7644",
        5871: "94bec1152f39f372546a",
        6153: "917114a3f102c73d5ce3",
        6213: "63687eba4591bcb68742",
        6633: "edac394d13bd0cac50e2",
        6690: "222424b425278e4ccaa7",
        6729: "73eec29c723daa7aaf9a",
        6757: "e05819696df50cd3cb1e",
        6852: "543a23776264870e32f5",
        6931: "f030434fb47ec31aa94a",
        7052: "08ba6472a994b8685e19",
        7082: "6ceba3600877afcb1da1",
        7368: "07105f5cef15e378b572",
        7642: "f879b0a3238c4a2ff143",
        7871: "ce1f8643d1b8acf4a8b2",
        8174: "14b0038cf62fe3a5354e",
        8213: "8ba95504e588f3d9f9ec",
        8315: "69a8206588c669925a95",
        8366: "7f03a5a8abef23432c6a",
        8487: "6ae0df905a317ca024e1",
        8562: "4cab5250a975a2d8448e",
        8721: "ba3d20539571a0374e2b",
        8767: "6187d2bf825fd7d41ee3",
        8818: "25015207daf60bd690ab",
        9113: "facb4df5e74b19bc9119",
        9248: "efb996e75333e0857954",
        9279: "8989daa0d2cc42cc2dbf",
        9369: "8089536e3b382a28cd26",
      }[e] +
      ".js"),
    (f.miniCssF = (e) => "styles.96845e9d72df967b777c.css"),
    (f.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = {},
        t = "scanii:";
      f.l = (a, r, b, d) => {
        if (e[a]) e[a].push(r);
        else {
          var c, o;
          if (void 0 !== b)
            for (
              var n = document.getElementsByTagName("script"), s = 0;
              s < n.length;
              s++
            ) {
              var i = n[s];
              if (
                i.getAttribute("src") == a ||
                i.getAttribute("data-webpack") == t + b
              ) {
                c = i;
                break;
              }
            }
          c ||
            ((o = !0),
            ((c = document.createElement("script")).charset = "utf-8"),
            (c.timeout = 120),
            f.nc && c.setAttribute("nonce", f.nc),
            c.setAttribute("data-webpack", t + b),
            (c.src = f.tu(a))),
            (e[a] = [r]);
          var u = (_, p) => {
              (c.onerror = c.onload = null), clearTimeout(l);
              var y = e[a];
              if (
                (delete e[a],
                c.parentNode && c.parentNode.removeChild(c),
                y && y.forEach((h) => h(p)),
                _)
              )
                return _(p);
            },
            l = setTimeout(
              u.bind(null, void 0, { type: "timeout", target: c }),
              12e4
            );
          (c.onerror = u.bind(null, c.onerror)),
            (c.onload = u.bind(null, c.onload)),
            o && document.head.appendChild(c);
        }
      };
    })(),
    (f.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      var e;
      f.tu = (t) => (
        void 0 === e &&
          ((e = { createScriptURL: (a) => a }),
          "undefined" != typeof trustedTypes &&
            trustedTypes.createPolicy &&
            (e = trustedTypes.createPolicy("angular#bundler", e))),
        e.createScriptURL(t)
      );
    })(),
    (f.p = ""),
    (() => {
      var e = { 3666: 0 };
      (f.f.j = (r, b) => {
        var d = f.o(e, r) ? e[r] : void 0;
        if (0 !== d)
          if (d) b.push(d[2]);
          else if (3666 != r) {
            var c = new Promise((i, u) => (d = e[r] = [i, u]));
            b.push((d[2] = c));
            var o = f.p + f.u(r),
              n = new Error();
            f.l(
              o,
              (i) => {
                if (f.o(e, r) && (0 !== (d = e[r]) && (e[r] = void 0), d)) {
                  var u = i && ("load" === i.type ? "missing" : i.type),
                    l = i && i.target && i.target.src;
                  (n.message =
                    "Loading chunk " + r + " failed.\n(" + u + ": " + l + ")"),
                    (n.name = "ChunkLoadError"),
                    (n.type = u),
                    (n.request = l),
                    d[1](n);
                }
              },
              "chunk-" + r,
              r
            );
          } else e[r] = 0;
      }),
        (f.O.j = (r) => 0 === e[r]);
      var t = (r, b) => {
          var n,
            s,
            [d, c, o] = b,
            i = 0;
          for (n in c) f.o(c, n) && (f.m[n] = c[n]);
          if (o) var u = o(f);
          for (r && r(b); i < d.length; i++)
            f.o(e, (s = d[i])) && e[s] && e[s][0](), (e[d[i]] = 0);
          return f.O(u);
        },
        a = (self.webpackChunkscanii = self.webpackChunkscanii || []);
      a.forEach(t.bind(null, 0)), (a.push = t.bind(null, a.push.bind(a)));
    })();
})();
