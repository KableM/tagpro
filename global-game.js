//noinspection
(function (window, undefined) {
    function isArraylike(e) {
        var t = e.length,
            n = jQuery.type(e);
        return jQuery.isWindow(e) ? false : e.nodeType === 1 && t ? true : n === "array" || n !== "function" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in e)
    }
    function createOptions(e) {
        var t = optionsCache[e] = {};
        return jQuery.each(e.match(core_rnotwhite) || [], function (e, n) {
            t[n] = true
        }), t
    }
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function () {
                return {}
            }
        }), this.expando = jQuery.expando + Math.random()
    }
    function dataAttr(e, t, n) {
        var r;
        if (n === undefined && e.nodeType === 1) {
            r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase(), n = e.getAttribute(r);
            if (typeof n == "string") {
                try {
                    n = n === "true" ? true : n === "false" ? false : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? JSON.parse(n) : n
                } catch (i) {}
                data_user.set(e, t, n)
            } else n = undefined
        }
        return n
    }
    function returnTrue() {
        return true
    }
    function returnFalse() {
        return false
    }
    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (e) {}
    }
    function sibling(e, t) {
        while ((e = e[t]) && e.nodeType !== 1);
        return e
    }
    function winnow(e, t, n) {
        if (jQuery.isFunction(t)) return jQuery.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return jQuery.grep(e, function (e) {
            return e === t !== n
        });
        if (typeof t == "string") {
            if (isSimple.test(t)) return jQuery.filter(t, e, n);
            t = jQuery.filter(t, e)
        }
        return jQuery.grep(e, function (e) {
            return core_indexOf.call(t, e) >= 0 !== n
        })
    }
    function manipulationTarget(e, t) {
        return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType === 1 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function disableScript(e) {
        return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
    }
    function restoreScript(e) {
        var t = rscriptTypeMasked.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }
    function setGlobalEval(e, t) {
        var n = e.length,
            r = 0;
        for (; r < n; r++) data_priv.set(e[r], "globalEval", !t || data_priv.get(t[r], "globalEval"))
    }
    function cloneCopyEvent(e, t) {
        var n, r, i, s, o, u, a, f;
        if (t.nodeType !== 1) return;
        if (data_priv.hasData(e)) {
            s = data_priv.access(e), o = data_priv.set(t, s), f = s.events;
            if (f) {
                delete o.handle, o.events = {};
                for (i in f) for (n = 0, r = f[i].length; n < r; n++) jQuery.event.add(t, i, f[i][n])
            }
        }
        data_user.hasData(e) && (u = data_user.access(e), a = jQuery.extend({}, u), data_user.set(t, a))
    }
    function getAll(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
    }
    function fixInput(e, t) {
        var n = t.nodeName.toLowerCase();
        if (n === "input" && manipulation_rcheckableType.test(e.type)) t.checked = e.checked;
        else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
    }
    function vendorPropName(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = cssPrefixes.length;
        while (i--) {
            t = cssPrefixes[i] + n;
            if (t in e) return t
        }
        return r
    }
    function isHidden(e, t) {
        return e = t || e, jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
    }
    function getStyles(e) {
        return window.getComputedStyle(e, null)
    }
    function showHide(e, t) {
        var n, r, i, s = [],
            o = 0,
            u = e.length;
        for (; o < u; o++) {
            r = e[o];
            if (!r.style) continue;
            s[o] = data_priv.get(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && isHidden(r) && (s[o] = data_priv.access(r, "olddisplay", css_defaultDisplay(r.nodeName)))) : s[o] || (i = isHidden(r), (n && n !== "none" || !i) && data_priv.set(r, "olddisplay", i ? n : jQuery.css(r, "display")))
        }
        for (o = 0; o < u; o++) {
            r = e[o];
            if (!r.style) continue;
            if (!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
        }
        return e
    }
    function setPositiveNumber(e, t, n) {
        var r = rnumsplit.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function augmentWidthOrHeight(e, t, n, r, i) {
        var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            o = 0;
        for (; s < 4; s += 2) n === "margin" && (o += jQuery.css(e, n + cssExpand[s], true, i)), r ? (n === "content" && (o -= jQuery.css(e, "padding" + cssExpand[s], true, i)), n !== "margin" && (o -= jQuery.css(e, "border" + cssExpand[s] + "Width", true, i))) : (o += jQuery.css(e, "padding" + cssExpand[s], true, i), n !== "padding" && (o += jQuery.css(e, "border" + cssExpand[s] + "Width", true, i)));
        return o
    }
    function getWidthOrHeight(e, t, n) {
        var r = true,
            i = t === "width" ? e.offsetWidth : e.offsetHeight,
            s = getStyles(e),
            o = jQuery.support.boxSizing && jQuery.css(e, "boxSizing", false, s) === "border-box";
        if (i <= 0 || i == null) {
            i = curCSS(e, t, s);
            if (i < 0 || i == null) i = e.style[t];
            if (rnumnonpx.test(i)) return i;
            r = o && (jQuery.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }
    function css_defaultDisplay(e) {
        var t = document,
            n = elemdisplay[e];
        if (!n) {
            n = actualDisplay(e, t);
            if (n === "none" || !n) iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (iframe[0].contentWindow || iframe[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = actualDisplay(e, t), iframe.detach();
            elemdisplay[e] = n
        }
        return n
    }
    function actualDisplay(e, t) {
        var n = jQuery(t.createElement(e)).appendTo(t.body),
            r = jQuery.css(n[0], "display");
        return n.remove(), r
    }
    function buildParams(e, t, n, r) {
        var i;
        if (jQuery.isArray(t)) jQuery.each(t, function (t, i) {
            n || rbracket.test(e) ? r(e, i) : buildParams(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        });
        else if (!n && jQuery.type(t) === "object") for (i in t) buildParams(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }
    function addToPrefiltersOrTransports(e) {
        return function (t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i = 0,
                s = t.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(n)) while (r = s[i++]) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function inspectPrefiltersOrTransports(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = true, jQuery.each(e[u] || [], function (e, u) {
                var f = u(t, n, r);
                if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), false;
                if (s) return !(a = f)
            }), a
        }
        var i = {},
            s = e === transports;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }
    function ajaxExtend(e, t) {
        var n, r, i = jQuery.ajaxSettings.flatOptions || {};
        for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && jQuery.extend(true, e, r), e
    }
    function ajaxHandleResponses(e, t, n) {
        var r, i, s, o, u = e.contents,
            a = e.dataTypes;
        while (a[0] === "*") a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r) for (i in u) if (u[i] && u[i].test(r)) {
            a.unshift(i);
            break
        }
        if (a[0] in n) s = a[0];
        else {
            for (i in n) {
                if (!a[0] || e.converters[i + " " + a[0]]) {
                    s = i;
                    break
                }
                o || (o = i)
            }
            s = s || o
        }
        if (s) return s !== a[0] && a.unshift(s), n[s]
    }
    function ajaxConvert(e, t, n, r) {
        var i, s, o, u, a, f = {},
            l = e.dataTypes.slice();
        if (l[1]) for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s) {
            e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
            if (s) if (s === "*") s = a;
            else if (a !== "*" && a !== s) {
                o = f[a + " " + s] || f["* " + s];
                if (!o) for (i in f) {
                    u = i.split(" ");
                    if (u[1] === s) {
                        o = f[a + " " + u[0]] || f["* " + u[0]];
                        if (o) {
                            o === true ? o = f[i] : f[i] !== true && (s = u[0], l.unshift(u[1]));
                            break
                        }
                    }
                }
                if (o !== true) if (o && e["throws"]) t = o(t);
                else try {
                        t = o(t)
                    } catch (c) {
                        return {
                            state: "parsererror",
                            error: o ? c : "No conversion from " + a + " to " + s
                        }
                    }
            }
        }
        return {
            state: "success",
            data: t
        }
    }
    function createFxNow() {
        return setTimeout(function () {
            fxNow = undefined
        }), fxNow = jQuery.now()
    }
    function createTween(e, t, n) {
        var r, i = (tweeners[t] || []).concat(tweeners["*"]),
            s = 0,
            o = i.length;
        for (; s < o; s++) if (r = i[s].call(n, t, e)) return r
    }
    function Animation(e, t, n) {
        var r, i, s = 0,
            o = animationPrefilters.length,
            u = jQuery.Deferred().always(function () {
                delete a.elem
            }),
            a = function () {
                if (i) return false;
                var t = fxNow || createFxNow(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = n / f.duration || 0,
                    s = 1 - r,
                    o = 0,
                    a = f.tweens.length;
                for (; o < a; o++) f.tweens[o].run(s);
                return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), false)
            },
            f = u.promise({
                elem: e,
                props: jQuery.extend({}, t),
                opts: jQuery.extend(true, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: fxNow || createFxNow(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                    var r = jQuery.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(r), r
                },
                stop: function (t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    if (i) return this;
                    i = true;
                    for (; n < r; n++) f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                }
            }),
            l = f.props;
        propFilter(l, f.opts.specialEasing);
        for (; s < o; s++) {
            r = animationPrefilters[s].call(f, e, l, f.opts);
            if (r) return r
        }
        return jQuery.map(l, createTween, f), jQuery.isFunction(f.opts.start) && f.opts.start.call(e, f), jQuery.fx.timer(jQuery.extend(a, {
            elem: e,
            anim: f,
            queue: f.opts.queue
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }
    function propFilter(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = jQuery.camelCase(n), i = t[r], s = e[n], jQuery.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = jQuery.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }
    function defaultPrefilter(e, t, n) {
        var r, i, s, o, u, a, f = this,
            l = {},
            c = e.style,
            h = e.nodeType && isHidden(e),
            p = data_priv.get(e, "fxshow");
        n.queue || (u = jQuery._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function () {
            u.unqueued || a()
        }), u.unqueued++, f.always(function () {
            f.always(function () {
                u.unqueued--, jQuery.queue(e, "fx").length || u.empty.fire()
            })
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [c.overflow, c.overflowX, c.overflowY], jQuery.css(e, "display") === "inline" && jQuery.css(e, "float") === "none" && (c.display = "inline-block")), n.overflow && (c.overflow = "hidden", f.always(function () {
            c.overflow = n.overflow[0], c.overflowX = n.overflow[1], c.overflowY = n.overflow[2]
        }));
        for (r in t) {
            i = t[r];
            if (rfxtypes.exec(i)) {
                delete t[r], s = s || i === "toggle";
                if (i === (h ? "hide" : "show")) {
                    if (i !== "show" || !p || p[r] === undefined) continue;
                    h = true
                }
                l[r] = p && p[r] || jQuery.style(e, r)
            }
        }
        if (!jQuery.isEmptyObject(l)) {
            p ? "hidden" in p && (h = p.hidden) : p = data_priv.access(e, "fxshow", {}), s && (p.hidden = !h), h ? jQuery(e).show() : f.done(function () {
                jQuery(e).hide()
            }), f.done(function () {
                var t;
                data_priv.remove(e, "fxshow");
                for (t in l) jQuery.style(e, t, l[t])
            });
            for (r in l) o = createTween(h ? p[r] : 0, r, f), r in p || (p[r] = o.start, h && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
        }
    }
    function Tween(e, t, n, r, i) {
        return new Tween.prototype.init(e, t, n, r, i)
    }
    function genFx(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) n = cssExpand[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }
    function getWindow(e) {
        return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
    }
    var rootjQuery, readyList, core_strundefined = typeof undefined,
        location = window.location,
        document = window.document,
        docElem = document.documentElement,
        _jQuery = window.jQuery,
        _$ = window.$,
        class2type = {},
        core_deletedIds = [],
        core_version = "2.0.3",
        core_concat = core_deletedIds.concat,
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim,
        jQuery = function (e, t) {
            return new jQuery.fn.init(e, t, rootjQuery)
        },
        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        core_rnotwhite = /\S+/g,
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function (e, t) {
            return t.toUpperCase()
        },
        completed = function () {
            document.removeEventListener("DOMContentLoaded", completed, false), window.removeEventListener("load", completed, false), jQuery.ready()
        };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function (e, t, n) {
            var r, i;
            if (!e) return this;
            if (typeof e == "string") {
                e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? r = [null, e, null] : r = rquickExpr.exec(e);
                if (r && (r[1] || !t)) {
                    if (r[1]) {
                        t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : document, true));
                        if (rsingleTag.test(r[1]) && jQuery.isPlainObject(t)) for (r in t) jQuery.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    }
                    return i = document.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = document, this.selector = e, this
                }
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e)
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : jQuery.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), jQuery.makeArray(e, this))
        },
        selector: "",
        length: 0,
        toArray: function () {
            return core_slice.call(this)
        },
        get: function (e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function (e) {
            var t = jQuery.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function (e, t) {
            return jQuery.each(this, e, t)
        },
        ready: function (e) {
            return jQuery.ready.promise().done(e), this
        },
        slice: function () {
            return this.pushStack(core_slice.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        map: function (e) {
            return this.pushStack(jQuery.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    }, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function () {
        var e, t, n, r, i, s, o = arguments[0] || {},
            u = 1,
            a = arguments.length,
            f = false;
        typeof o == "boolean" && (f = o, o = arguments[1] || {}, u = 2), typeof o != "object" && !jQuery.isFunction(o) && (o = {}), a === u && (o = this, --u);
        for (; u < a; u++) if ((e = arguments[u]) != null) for (t in e) {
            n = o[t], r = e[t];
            if (o === r) continue;
            f && r && (jQuery.isPlainObject(r) || (i = jQuery.isArray(r))) ? (i ? (i = false, s = n && jQuery.isArray(n) ? n : []) : s = n && jQuery.isPlainObject(n) ? n : {}, o[t] = jQuery.extend(f, s, r)) : r !== undefined && (o[t] = r)
        }
        return o
    }, jQuery.extend({
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noConflict: function (e) {
            return window.$ === jQuery && (window.$ = _$), e && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
        },
        isReady: false,
        readyWait: 1,
        holdReady: function (e) {
            e ? jQuery.readyWait++ : jQuery.ready(true)
        },
        ready: function (e) {
            if (e === true ? --jQuery.readyWait : jQuery.isReady) return;
            jQuery.isReady = true;
            if (e !== true && --jQuery.readyWait > 0) return;
            readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready")
        },
        isFunction: function (e) {
            return jQuery.type(e) === "function"
        },
        isArray: Array.isArray,
        isWindow: function (e) {
            return e != null && e === e.window
        },
        isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function (e) {
            return e == null ? String(e) : typeof e == "object" || typeof e == "function" ? class2type[core_toString.call(e)] || "object" : typeof e
        },
        isPlainObject: function (e) {
            if (jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e)) return false;
            try {
                if (e.constructor && !core_hasOwn.call(e.constructor.prototype, "isPrototypeOf")) return false
            } catch (t) {
                return false
            }
            return true
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) return false;
            return true
        },
        error: function (e) {
            throw new Error(e)
        },
        parseHTML: function (e, t, n) {
            if (!e || typeof e != "string") return null;
            typeof t == "boolean" && (n = t, t = false), t = t || document;
            var r = rsingleTag.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = jQuery.buildFragment([e], t, i), i && jQuery(i).remove(), jQuery.merge([], r.childNodes))
        },
        parseJSON: JSON.parse,
        parseXML: function (e) {
            var t, n;
            if (!e || typeof e != "string") return null;
            try {
                n = new DOMParser, t = n.parseFromString(e, "text/xml")
            } catch (r) {
                t = undefined
            }
            return (!t || t.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + e), t
        },
        noop: function () {},
        globalEval: function (code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
        },
        camelCase: function (e) {
            return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function (e, t, n) {
            var r, i = 0,
                s = e.length,
                o = isArraylike(e);
            if (n) if (o) for (; i < s; i++) {
                r = t.apply(e[i], n);
                if (r === false) break
            } else for (i in e) {
                r = t.apply(e[i], n);
                if (r === false) break
            } else if (o) for (; i < s; i++) {
                r = t.call(e[i], i, e[i]);
                if (r === false) break
            } else for (i in e) {
                r = t.call(e[i], i, e[i]);
                if (r === false) break
            }
            return e
        },
        trim: function (e) {
            return e == null ? "" : core_trim.call(e)
        },
        makeArray: function (e, t) {
            var n = t || [];
            return e != null && (isArraylike(Object(e)) ? jQuery.merge(n, typeof e == "string" ? [e] : e) : core_push.call(n, e)), n
        },
        inArray: function (e, t, n) {
            return t == null ? -1 : core_indexOf.call(t, e, n)
        },
        merge: function (e, t) {
            var n = t.length,
                r = e.length,
                i = 0;
            if (typeof n == "number") for (; i < n; i++) e[r++] = t[i];
            else while (t[i] !== undefined) e[r++] = t[i++];
            return e.length = r, e
        },
        grep: function (e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length;
            n = !! n;
            for (; s < o; s++) r = !! t(e[s], s), n !== r && i.push(e[s]);
            return i
        },
        map: function (e, t, n) {
            var r, i = 0,
                s = e.length,
                o = isArraylike(e),
                u = [];
            if (o) for (; i < s; i++) r = t(e[i], i, n), r != null && (u[u.length] = r);
            else for (i in e) r = t(e[i], i, n), r != null && (u[u.length] = r);
            return core_concat.apply([], u)
        },
        guid: 1,
        proxy: function (e, t) {
            var n, r, i;
            return typeof t == "string" && (n = e[t], t = e, e = n), jQuery.isFunction(e) ? (r = core_slice.call(arguments, 2), i = function () {
                return e.apply(t || this, r.concat(core_slice.call(arguments)))
            }, i.guid = e.guid = e.guid || jQuery.guid++, i) : undefined
        },
        access: function (e, t, n, r, i, s, o) {
            var u = 0,
                a = e.length,
                f = n == null;
            if (jQuery.type(n) === "object") {
                i = true;
                for (u in n) jQuery.access(e, t, u, n[u], true, s, o)
            } else if (r !== undefined) {
                i = true, jQuery.isFunction(r) || (o = true), f && (o ? (t.call(e, r), t = null) : (f = t, t = function (e, t, n) {
                    return f.call(jQuery(e), n)
                }));
                if (t) for (; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
            }
            return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
        },
        now: Date.now,
        swap: function (e, t, n, r) {
            var i, s, o = {};
            for (s in t) o[s] = e.style[s], e.style[s] = t[s];
            i = n.apply(e, r || []);
            for (s in t) e.style[s] = o[s];
            return i
        }
    }), jQuery.ready.promise = function (e) {
        return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, false), window.addEventListener("load", completed, false))), readyList.promise(e)
    }, jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        class2type["[object " + t + "]"] = t.toLowerCase()
    }), rootjQuery = jQuery(document), function (e, t) {
        function st(e, t, n, i) {
            var s, o, u, a, f, l, p, m, g, E;
            (t ? t.ownerDocument || t : w) !== h && c(t), t = t || h, n = n || [];
            if (!e || typeof e != "string") return n;
            if ((a = t.nodeType) !== 1 && a !== 9) return [];
            if (d && !i) {
                if (s = Y.exec(e)) if (u = s[1]) {
                    if (a === 9) {
                        o = t.getElementById(u);
                        if (!o || !o.parentNode) return n;
                        if (o.id === u) return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(u)) && y(t, o) && o.id === u) return n.push(o), n
                } else {
                    if (s[2]) return P.apply(n, t.getElementsByTagName(e)), n;
                    if ((u = s[3]) && r.getElementsByClassName && t.getElementsByClassName) return P.apply(n, t.getElementsByClassName(u)), n
                }
                if (r.qsa && (!v || !v.test(e))) {
                    m = p = b, g = t, E = a === 9 && e;
                    if (a === 1 && t.nodeName.toLowerCase() !== "object") {
                        l = vt(e), (p = t.getAttribute("id")) ? m = p.replace(tt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", f = l.length;
                        while (f--) l[f] = m + mt(l[f]);
                        g = V.test(e) && t.parentNode || t, E = l.join(",")
                    }
                    if (E) try {
                        return P.apply(n, g.querySelectorAll(E)), n
                    } catch (S) {} finally {
                        p || t.removeAttribute("id")
                    }
                }
            }
            return Tt(e.replace(z, "$1"), t, n, i)
        }
        function ot() {
            function t(n, r) {
                return e.push(n += " ") > s.cacheLength && delete t[e.shift()], t[n] = r
            }
            var e = [];
            return t
        }
        function ut(e) {
            return e[b] = true, e
        }
        function at(e) {
            var t = h.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return false
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }
        function ft(e, t) {
            var n = e.split("|"),
                r = e.length;
            while (r--) s.attrHandle[n[r]] = t
        }
        function lt(e, t) {
            var n = t && e,
                r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || A) - (~e.sourceIndex || A);
            if (r) return r;
            if (n) while (n = n.nextSibling) if (n === t) return -1;
            return e ? 1 : -1
        }
        function ct(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }
        function ht(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return (n === "input" || n === "button") && t.type === e
            }
        }
        function pt(e) {
            return ut(function (t) {
                return t = +t, ut(function (n, r) {
                    var i, s = e([], n.length, t),
                        o = s.length;
                    while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function dt() {}
        function vt(e, t) {
            var n, r, i, o, u, a, f, l = T[e + " "];
            if (l) return t ? 0 : l.slice(0);
            u = e, a = [], f = s.preFilter;
            while (u) {
                if (!n || (r = W.exec(u))) r && (u = u.slice(r[0].length) || u), a.push(i = []);
                n = false;
                if (r = X.exec(u)) n = r.shift(), i.push({
                    value: n,
                    type: r[0].replace(z, " ")
                }), u = u.slice(n.length);
                for (o in s.filter)(r = Q[o].exec(u)) && (!f[o] || (r = f[o](r))) && (n = r.shift(), i.push({
                    value: n,
                    type: o,
                    matches: r
                }), u = u.slice(n.length));
                if (!n) break
            }
            return t ? u.length : u ? st.error(e) : T(e, a).slice(0)
        }
        function mt(e) {
            var t = 0,
                n = e.length,
                r = "";
            for (; t < n; t++) r += e[t].value;
            return r
        }
        function gt(e, t, n) {
            var r = t.dir,
                s = n && r === "parentNode",
                o = S++;
            return t.first ?
                function (t, n, i) {
                    while (t = t[r]) if (t.nodeType === 1 || s) return e(t, n, i)
                } : function (t, n, u) {
                var a, f, l, c = E + " " + o;
                if (u) {
                    while (t = t[r]) if (t.nodeType === 1 || s) if (e(t, n, u)) return true
                } else while (t = t[r]) if (t.nodeType === 1 || s) {
                    l = t[b] || (t[b] = {});
                    if ((f = l[r]) && f[0] === c) {
                        if ((a = f[1]) === true || a === i) return a === true
                    } else {
                        f = l[r] = [c], f[1] = e(t, n, u) || i;
                        if (f[1] === true) return true
                    }
                }
            }
        }
        function yt(e) {
            return e.length > 1 ?
                function (t, n, r) {
                    var i = e.length;
                    while (i--) if (!e[i](t, n, r)) return false;
                    return true
                } : e[0]
        }
        function bt(e, t, n, r, i) {
            var s, o = [],
                u = 0,
                a = e.length,
                f = t != null;
            for (; u < a; u++) if (s = e[u]) if (!n || n(s, r, i)) o.push(s), f && t.push(u);
            return o
        }
        function wt(e, t, n, r, i, s) {
            return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i, s)), ut(function (s, o, u, a) {
                var f, l, c, h = [],
                    p = [],
                    d = o.length,
                    v = s || xt(t || "*", u.nodeType ? [u] : u, []),
                    m = e && (s || !t) ? bt(v, h, e, u, a) : v,
                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    f = bt(g, p), r(f, [], u, a), l = f.length;
                    while (l--) if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? B.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = bt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : P.apply(o, g)
            })
        }
        function Et(e) {
            var t, n, r, i = e.length,
                o = s.relative[e[0].type],
                u = o || s.relative[" "],
                a = o ? 1 : 0,
                l = gt(function (e) {
                    return e === t
                }, u, true),
                c = gt(function (e) {
                    return B.call(t, e) > -1
                }, u, true),
                h = [function (e, n, r) {
                    return !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                }];
            for (; a < i; a++) if (n = s.relative[e[a].type]) h = [gt(yt(h), n)];
            else {
                n = s.filter[e[a].type].apply(null, e[a].matches);
                if (n[b]) {
                    r = ++a;
                    for (; r < i; r++) if (s.relative[e[r].type]) break;
                    return wt(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({
                        value: e[a - 2].type === " " ? "*" : ""
                    })).replace(z, "$1"), n, a < r && Et(e.slice(a, r)), r < i && Et(e = e.slice(r)), r < i && mt(e))
                }
                h.push(n)
            }
            return yt(h)
        }
        function St(e, t) {
            var n = 0,
                r = t.length > 0,
                o = e.length > 0,
                u = function (u, a, l, c, p) {
                    var d, v, m, g = [],
                        y = 0,
                        b = "0",
                        w = u && [],
                        S = p != null,
                        x = f,
                        T = u || o && s.find.TAG("*", p && a.parentNode || a),
                        N = E += x == null ? 1 : Math.random() || .1;
                    S && (f = a !== h && a, i = n);
                    for (;
                        (d = T[b]) != null; b++) {
                        if (o && d) {
                            v = 0;
                            while (m = e[v++]) if (m(d, a, l)) {
                                c.push(d);
                                break
                            }
                            S && (E = N, i = ++n)
                        }
                        r && ((d = !m && d) && y--, u && w.push(d))
                    }
                    y += b;
                    if (r && b !== y) {
                        v = 0;
                        while (m = t[v++]) m(w, g, a, l);
                        if (u) {
                            if (y > 0) while (b--)!w[b] && !g[b] && (g[b] = _.call(c));
                            g = bt(g)
                        }
                        P.apply(c, g), S && !u && g.length > 0 && y + t.length > 1 && st.uniqueSort(c)
                    }
                    return S && (E = N, f = x), w
                };
            return r ? ut(u) : u
        }
        function xt(e, t, n) {
            var r = 0,
                i = t.length;
            for (; r < i; r++) st(e, t[r], n);
            return n
        }
        function Tt(e, t, n, i) {
            var o, u, f, l, c, h = vt(e);
            if (!i && h.length === 1) {
                u = h[0] = h[0].slice(0);
                if (u.length > 2 && (f = u[0]).type === "ID" && r.getById && t.nodeType === 9 && d && s.relative[u[1].type]) {
                    t = (s.find.ID(f.matches[0].replace(nt, rt), t) || [])[0];
                    if (!t) return n;
                    e = e.slice(u.shift().value.length)
                }
                o = Q.needsContext.test(e) ? 0 : u.length;
                while (o--) {
                    f = u[o];
                    if (s.relative[l = f.type]) break;
                    if (c = s.find[l]) if (i = c(f.matches[0].replace(nt, rt), V.test(u[0].type) && t.parentNode || t)) {
                        u.splice(o, 1), e = i.length && mt(u);
                        if (!e) return P.apply(n, i), n;
                        break
                    }
                }
            }
            return a(e, h)(i, t, !d, n, V.test(e)), n
        }
        var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b = "sizzle" + -(new Date),
            w = e.document,
            E = 0,
            S = 0,
            x = ot(),
            T = ot(),
            N = ot(),
            C = false,
            k = function (e, t) {
                return e === t ? (C = true, 0) : 0
            },
            L = typeof t,
            A = 1 << 31,
            O = {}.hasOwnProperty,
            M = [],
            _ = M.pop,
            D = M.push,
            P = M.push,
            H = M.slice,
            B = M.indexOf ||
                function (e) {
                    var t = 0,
                        n = this.length;
                    for (; t < n; t++) if (this[t] === e) return t;
                    return -1
                }, j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", F = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", q = I.replace("w", "w#"), R = "\\[" + F + "*(" + I + ")" + F + "*(?:([*^$|!~]?=)" + F + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + q + ")|)|)" + F + "*\\]", U = ":(" + I + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + R.replace(3, 8) + ")*)|.*)\\)|)", z = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"), W = new RegExp("^" + F + "*," + F + "*"), X = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"), V = new RegExp(F + "*[+~]"), $ = new RegExp("=" + F + "*([^\\]'\"]*)" + F + "*\\]", "g"), J = new RegExp(U), K = new RegExp("^" + q + "$"), Q = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + R),
                PSEUDO: new RegExp("^" + U),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + j + ")$", "i"),
                needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
            }, G = /^[^{]+\{\s*\[native \w/, Y = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Z = /^(?:input|select|textarea|button)$/i, et = /^h\d$/i, tt = /'|\\/g, nt = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"), rt = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
            };
        try {
            P.apply(M = H.call(w.childNodes), w.childNodes), M[w.childNodes.length].nodeType
        } catch (it) {
            P = {
                apply: M.length ?
                    function (e, t) {
                        D.apply(e, H.call(t))
                    } : function (e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }
        u = st.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : false
        }, r = st.support = {}, c = st.setDocument = function (e) {
            var t = e ? e.ownerDocument || e : w,
                n = t.defaultView;
            if (t === h || t.nodeType !== 9 || !t.documentElement) return h;
            h = t, p = t.documentElement, d = !u(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function () {
                c()
            }), r.attributes = at(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), r.getElementsByTagName = at(function (e) {
                return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
            }), r.getElementsByClassName = at(function (e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", e.getElementsByClassName("i").length === 2
            }), r.getById = at(function (e) {
                return p.appendChild(e).id = b, !t.getElementsByName || !t.getElementsByName(b).length
            }), r.getById ? (s.find.ID = function (e, t) {
                if (typeof t.getElementById !== L && d) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, s.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete s.find.ID, s.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), s.find.TAG = r.getElementsByTagName ?
                function (e, t) {
                    if (typeof t.getElementsByTagName !== L) return t.getElementsByTagName(e)
                } : function (e, t) {
                var n, r = [],
                    i = 0,
                    s = t.getElementsByTagName(e);
                if (e === "*") {
                    while (n = s[i++]) n.nodeType === 1 && r.push(n);
                    return r
                }
                return s
            }, s.find.CLASS = r.getElementsByClassName &&
                function (e, t) {
                    if (typeof t.getElementsByClassName !== L && d) return t.getElementsByClassName(e)
                }, m = [], v = [];
            if (r.qsa = G.test(t.querySelectorAll)) at(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || v.push("\\[" + F + "*(?:value|" + j + ")"), e.querySelectorAll(":checked").length || v.push(":checked")
            }), at(function (e) {
                var n = t.createElement("input");
                n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && v.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
            });
            return (r.matchesSelector = G.test(g = p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && at(function (e) {
                r.disconnectedMatch = g.call(e, "div"), g.call(e, "[s!='']:x"), m.push("!=", U)
            }), v = v.length && new RegExp(v.join("|")), m = m.length && new RegExp(m.join("|")), y = G.test(p.contains) || p.compareDocumentPosition ?
                function (e, t) {
                    var n = e.nodeType === 9 ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !! r && r.nodeType === 1 && !! (n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
                } : function (e, t) {
                if (t) while (t = t.parentNode) if (t === e) return true;
                return false
            }, k = p.compareDocumentPosition ?
                function (e, n) {
                    if (e === n) return C = true, 0;
                    var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                    if (i) return i & 1 || !r.sortDetached && n.compareDocumentPosition(e) === i ? e === t || y(w, e) ? -1 : n === t || y(w, n) ? 1 : l ? B.call(l, e) - B.call(l, n) : 0 : i & 4 ? -1 : 1;
                    return e.compareDocumentPosition ? -1 : 1
                } : function (e, n) {
                var r, i = 0,
                    s = e.parentNode,
                    o = n.parentNode,
                    u = [e],
                    a = [n];
                if (e === n) return C = true, 0;
                if (!s || !o) return e === t ? -1 : n === t ? 1 : s ? -1 : o ? 1 : l ? B.call(l, e) - B.call(l, n) : 0;
                if (s === o) return lt(e, n);
                r = e;
                while (r = r.parentNode) u.unshift(r);
                r = n;
                while (r = r.parentNode) a.unshift(r);
                while (u[i] === a[i]) i++;
                return i ? lt(u[i], a[i]) : u[i] === w ? -1 : a[i] === w ? 1 : 0
            }, t
        }, st.matches = function (e, t) {
            return st(e, null, null, t)
        }, st.matchesSelector = function (e, t) {
            (e.ownerDocument || e) !== h && c(e), t = t.replace($, "='$1']");
            if (r.matchesSelector && d && (!m || !m.test(t)) && (!v || !v.test(t))) try {
                var n = g.call(e, t);
                if (n || r.disconnectedMatch || e.document && e.document.nodeType !== 11) return n
            } catch (i) {}
            return st(t, h, null, [e]).length > 0
        }, st.contains = function (e, t) {
            return (e.ownerDocument || e) !== h && c(e), y(e, t)
        }, st.attr = function (e, n) {
            (e.ownerDocument || e) !== h && c(e);
            var i = s.attrHandle[n.toLowerCase()],
                o = i && O.call(s.attrHandle, n.toLowerCase()) ? i(e, n, !d) : t;
            return o === t ? r.attributes || !d ? e.getAttribute(n) : (o = e.getAttributeNode(n)) && o.specified ? o.value : null : o
        }, st.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, st.uniqueSort = function (e) {
            var t, n = [],
                i = 0,
                s = 0;
            C = !r.detectDuplicates, l = !r.sortStable && e.slice(0), e.sort(k);
            if (C) {
                while (t = e[s++]) t === e[s] && (i = n.push(s));
                while (i--) e.splice(n[i], 1)
            }
            return e
        }, o = st.getText = function (e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (!i) for (; t = e[r]; r++) n += o(t);
            else if (i === 1 || i === 9 || i === 11) {
                if (typeof e.textContent == "string") return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
            } else if (i === 3 || i === 4) return e.nodeValue;
            return n
        }, s = st.selectors = {
            cacheLength: 50,
            createPseudo: ut,
            match: Q,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(nt, rt), e[3] = (e[4] || e[5] || "").replace(nt, rt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && st.error(e[0]), e
                },
                PSEUDO: function (e) {
                    var n, r = !e[5] && e[2];
                    return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = vt(r, true)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(nt, rt).toLowerCase();
                    return e === "*" ?
                        function () {
                            return true
                        } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function (e) {
                    var t = x[e + " "];
                    return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && x(e, function (e) {
                        return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
                    })
                },
                ATTR: function (e, t, n) {
                    return function (r) {
                        var i = st.attr(r, e);
                        return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : false) : true
                    }
                },
                CHILD: function (e, t, n, r, i) {
                    var s = e.slice(0, 3) !== "nth",
                        o = e.slice(-4) !== "last",
                        u = t === "of-type";
                    return r === 1 && i === 0 ?
                        function (e) {
                            return !!e.parentNode
                        } : function (t, n, a) {
                        var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            g = u && t.nodeName.toLowerCase(),
                            y = !a && !u;
                        if (m) {
                            if (s) {
                                while (v) {
                                    c = t;
                                    while (c = c[v]) if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return false;
                                    d = v = e === "only" && !d && "nextSibling"
                                }
                                return true
                            }
                            d = [o ? m.firstChild : m.lastChild];
                            if (o && y) {
                                l = m[b] || (m[b] = {}), f = l[e] || [], p = f[0] === E && f[1], h = f[0] === E && f[2], c = p && m.childNodes[p];
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop()) if (c.nodeType === 1 && ++h && c === t) {
                                    l[e] = [E, p, h];
                                    break
                                }
                            } else if (y && (f = (t[b] || (t[b] = {}))[e]) && f[0] === E) h = f[1];
                            else while (c = ++p && c && c[v] || (h = p = 0) || d.pop()) if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                                    y && ((c[b] || (c[b] = {}))[e] = [E, h]);
                                    if (c === t) break
                                }
                            return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                },
                PSEUDO: function (e, t) {
                    var n, r = s.pseudos[e] || s.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
                    return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t], s.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function (e, n) {
                        var i, s = r(e, t),
                            o = s.length;
                        while (o--) i = B.call(e, s[o]), e[i] = !(n[i] = s[o])
                    }) : function (e) {
                        return r(e, 0, n)
                    }) : r
                }
            },
            pseudos: {
                not: ut(function (e) {
                    var t = [],
                        n = [],
                        r = a(e.replace(z, "$1"));
                    return r[b] ? ut(function (e, t, n, i) {
                        var s, o = r(e, null, i, []),
                            u = e.length;
                        while (u--) if (s = o[u]) e[u] = !(t[u] = s)
                    }) : function (e, i, s) {
                        return t[0] = e, r(t, null, s, n), !n.pop()
                    }
                }),
                has: ut(function (e) {
                    return function (t) {
                        return st(e, t).length > 0
                    }
                }),
                contains: ut(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || o(t)).indexOf(e) > -1
                    }
                }),
                lang: ut(function (e) {
                    return K.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(), function (t) {
                        var n;
                        do
                            if (n = d ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0;
                        while ((t = t.parentNode) && t.nodeType === 1);
                        return false
                    }
                }),
                target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function (e) {
                    return e === p
                },
                focus: function (e) {
                    return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
                },
                enabled: function (e) {
                    return e.disabled === false
                },
                disabled: function (e) {
                    return e.disabled === true
                },
                checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !! e.checked || t === "option" && !! e.selected
                },
                selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === true
                },
                empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || e.nodeType === 3 || e.nodeType === 4) return false;
                    return true
                },
                parent: function (e) {
                    return !s.pseudos.empty(e)
                },
                header: function (e) {
                    return et.test(e.nodeName)
                },
                input: function (e) {
                    return Z.test(e.nodeName)
                },
                button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button"
                },
                text: function (e) {
                    var t;
                    return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === e.type)
                },
                first: pt(function () {
                    return [0]
                }),
                last: pt(function (e, t) {
                    return [t - 1]
                }),
                eq: pt(function (e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: pt(function (e, t) {
                    var n = 0;
                    for (; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: pt(function (e, t) {
                    var n = 1;
                    for (; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: pt(function (e, t, n) {
                    var r = n < 0 ? n + t : n;
                    for (; --r >= 0;) e.push(r);
                    return e
                }),
                gt: pt(function (e, t, n) {
                    var r = n < 0 ? n + t : n;
                    for (; ++r < t;) e.push(r);
                    return e
                })
            }
        }, s.pseudos.nth = s.pseudos.eq;
        for (n in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) s.pseudos[n] = ct(n);
        for (n in {
            submit: true,
            reset: true
        }) s.pseudos[n] = ht(n);
        dt.prototype = s.filters = s.pseudos, s.setFilters = new dt, a = st.compile = function (e, t) {
            var n, r = [],
                i = [],
                s = N[e + " "];
            if (!s) {
                t || (t = vt(e)), n = t.length;
                while (n--) s = Et(t[n]), s[b] ? r.push(s) : i.push(s);
                s = N(e, St(i, r))
            }
            return s
        }, r.sortStable = b.split("").sort(k).join("") === b, r.detectDuplicates = C, c(), r.sortDetached = at(function (e) {
            return e.compareDocumentPosition(h.createElement("div")) & 1
        }), at(function (e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
        }) || ft("type|href|height|width", function (e, t, n) {
            if (!n) return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
        }), (!r.attributes || !at(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
        })) && ft("value", function (e, t, n) {
            if (!n && e.nodeName.toLowerCase() === "input") return e.defaultValue
        }), at(function (e) {
            return e.getAttribute("disabled") == null
        }) || ft(j, function (e, t, n) {
            var r;
            if (!n) return (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === true ? t.toLowerCase() : null
        }), jQuery.find = st, jQuery.expr = st.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = st.uniqueSort, jQuery.text = st.getText, jQuery.isXMLDoc = st.isXML, jQuery.contains = st.contains
    }(window);
    var optionsCache = {};
    jQuery.Callbacks = function (e) {
        e = typeof e == "string" ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
        var t, n, r, i, s, o, u = [],
            a = !e.once && [],
            f = function (c) {
                t = e.memory && c, n = true, o = i || 0, i = 0, s = u.length, r = true;
                for (; u && o < s; o++) if (u[o].apply(c[0], c[1]) === false && e.stopOnFalse) {
                    t = false;
                    break
                }
                r = false, u && (a ? a.length && f(a.shift()) : t ? u = [] : l.disable())
            },
            l = {
                add: function () {
                    if (u) {
                        var n = u.length;
                        (function o(t) {
                            jQuery.each(t, function (t, n) {
                                var r = jQuery.type(n);
                                r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && o(n)
                            })
                        })(arguments), r ? s = u.length : t && (i = n, f(t))
                    }
                    return this
                },
                remove: function () {
                    return u && jQuery.each(arguments, function (e, t) {
                        var n;
                        while ((n = jQuery.inArray(t, u, n)) > -1) u.splice(n, 1), r && (n <= s && s--, n <= o && o--)
                    }), this
                },
                has: function (e) {
                    return e ? jQuery.inArray(e, u) > -1 : !! u && !! u.length
                },
                empty: function () {
                    return u = [], s = 0, this
                },
                disable: function () {
                    return u = a = t = undefined, this
                },
                disabled: function () {
                    return !u
                },
                lock: function () {
                    return a = undefined, t || l.disable(), this
                },
                locked: function () {
                    return !a
                },
                fireWith: function (e, t) {
                    return u && (!n || a) && (t = t || [], t = [e, t.slice ? t.slice() : t], r ? a.push(t) : f(t)), this
                },
                fire: function () {
                    return l.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!n
                }
            };
        return l
    }, jQuery.extend({
        Deferred: function (e) {
            var t = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function () {
                        return n
                    },
                    always: function () {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var e = arguments;
                        return jQuery.Deferred(function (n) {
                            jQuery.each(t, function (t, s) {
                                var o = s[0],
                                    u = jQuery.isFunction(e[t]) && e[t];
                                i[s[1]](function () {
                                    var e = u && u.apply(this, arguments);
                                    e && jQuery.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === r ? n.promise() : this, u ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function (e) {
                        return e != null ? jQuery.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, jQuery.each(t, function (e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function () {
                    n = u
                }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function () {
                    return i[s[0] + "With"](this === i ? r : this, arguments), this
                }, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function (e) {
            var t = 0,
                n = core_slice.call(arguments),
                r = n.length,
                i = r !== 1 || e && jQuery.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : jQuery.Deferred(),
                o = function (e, t, n) {
                    return function (r) {
                        t[e] = this, n[e] = arguments.length > 1 ? core_slice.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                    }
                },
                u, a, f;
            if (r > 1) {
                u = new Array(r), a = new Array(r), f = new Array(r);
                for (; t < r; t++) n[t] && jQuery.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
            }
            return i || s.resolveWith(f, n), s.promise()
        }
    }), jQuery.support = function (e) {
        var t = document.createElement("input"),
            n = document.createDocumentFragment(),
            r = document.createElement("div"),
            i = document.createElement("select"),
            s = i.appendChild(document.createElement("option"));
        return t.type ? (t.type = "checkbox", e.checkOn = t.value !== "", e.optSelected = s.selected, e.reliableMarginRight = true, e.boxSizingReliable = true, e.pixelPosition = false, t.checked = true, e.noCloneChecked = t.cloneNode(true).checked, i.disabled = true, e.optDisabled = !s.disabled, t = document.createElement("input"), t.value = "t", t.type = "radio", e.radioValue = t.value === "t", t.setAttribute("checked", "t"), t.setAttribute("name", "t"), n.appendChild(t), e.checkClone = n.cloneNode(true).cloneNode(true).lastChild.checked, e.focusinBubbles = "onfocusin" in window, r.style.backgroundClip = "content-box", r.cloneNode(true).style.backgroundClip = "", e.clearCloneStyle = r.style.backgroundClip === "content-box", jQuery(function () {
            var t, n, i = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                s = document.getElementsByTagName("body")[0];
            if (!s) return;
            t = document.createElement("div"), t.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(t).appendChild(r), r.innerHTML = "", r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", jQuery.swap(s, s.style.zoom != null ? {
                zoom: 1
            } : {}, function () {
                e.boxSizing = r.offsetWidth === 4
            }), window.getComputedStyle && (e.pixelPosition = (window.getComputedStyle(r, null) || {}).top !== "1%", e.boxSizingReliable = (window.getComputedStyle(r, null) || {
                width: "4px"
            }).width === "4px", n = r.appendChild(document.createElement("div")), n.style.cssText = r.style.cssText = i, n.style.marginRight = n.style.width = "0", r.style.width = "1px", e.reliableMarginRight = !parseFloat((window.getComputedStyle(n, null) || {}).marginRight)), s.removeChild(t)
        }), e) : e
    }({});
    var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;
    Data.uid = 1, Data.accepts = function (e) {
        return e.nodeType ? e.nodeType === 1 || e.nodeType === 9 : true
    }, Data.prototype = {
        key: function (e) {
            if (!Data.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = Data.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, jQuery.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function (e, t, n) {
            var r, i = this.key(e),
                s = this.cache[i];
            if (typeof t == "string") s[t] = n;
            else if (jQuery.isEmptyObject(s)) jQuery.extend(this.cache[i], t);
            else for (r in t) s[r] = t[r];
            return s
        },
        get: function (e, t) {
            var n = this.cache[this.key(e)];
            return t === undefined ? n : n[t]
        },
        access: function (e, t, n) {
            var r;
            return t === undefined || t && typeof t == "string" && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, jQuery.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
        },
        remove: function (e, t) {
            var n, r, i, s = this.key(e),
                o = this.cache[s];
            if (t === undefined) this.cache[s] = {};
            else {
                jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : (i = jQuery.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(core_rnotwhite) || [])), n = r.length;
                while (n--) delete o[r[n]]
            }
        },
        hasData: function (e) {
            return !jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function (e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    }, data_user = new Data, data_priv = new Data, jQuery.extend({
        acceptData: Data.accepts,
        hasData: function (e) {
            return data_user.hasData(e) || data_priv.hasData(e)
        },
        data: function (e, t, n) {
            return data_user.access(e, t, n)
        },
        removeData: function (e, t) {
            data_user.remove(e, t)
        },
        _data: function (e, t, n) {
            return data_priv.access(e, t, n)
        },
        _removeData: function (e, t) {
            data_priv.remove(e, t)
        }
    }), jQuery.fn.extend({
        data: function (e, t) {
            var n, r, i = this[0],
                s = 0,
                o = null;
            if (e === undefined) {
                if (this.length) {
                    o = data_user.get(i);
                    if (i.nodeType === 1 && !data_priv.get(i, "hasDataAttrs")) {
                        n = i.attributes;
                        for (; s < n.length; s++) r = n[s].name, r.indexOf("data-") === 0 && (r = jQuery.camelCase(r.slice(5)), dataAttr(i, r, o[r]));
                        data_priv.set(i, "hasDataAttrs", true)
                    }
                }
                return o
            }
            return typeof e == "object" ? this.each(function () {
                data_user.set(this, e)
            }) : jQuery.access(this, function (t) {
                var n, r = jQuery.camelCase(e);
                if (i && t === undefined) {
                    n = data_user.get(i, e);
                    if (n !== undefined) return n;
                    n = data_user.get(i, r);
                    if (n !== undefined) return n;
                    n = dataAttr(i, r, undefined);
                    if (n !== undefined) return n;
                    return
                }
                this.each(function () {
                    var n = data_user.get(this, r);
                    data_user.set(this, r, t), e.indexOf("-") !== -1 && n !== undefined && data_user.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, true)
        },
        removeData: function (e) {
            return this.each(function () {
                data_user.remove(this, e)
            })
        }
    }), jQuery.extend({
        queue: function (e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = data_priv.get(e, t), n && (!r || jQuery.isArray(n) ? r = data_priv.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = jQuery.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = jQuery._queueHooks(e, t),
                o = function () {
                    jQuery.dequeue(e, t)
                };
            i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        },
        _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return data_priv.get(e, n) || data_priv.access(e, n, {
                empty: jQuery.Callbacks("once memory").add(function () {
                    data_priv.remove(e, [t + "queue", n])
                })
            })
        }
    }), jQuery.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : t === undefined ? this : this.each(function () {
                var n = jQuery.queue(this, e, t);
                jQuery._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && jQuery.dequeue(this, e)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                jQuery.dequeue(this, e)
            })
        },
        delay: function (e, t) {
            return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, t) {
            var n, r = 1,
                i = jQuery.Deferred(),
                s = this,
                o = this.length,
                u = function () {
                    --r || i.resolveWith(s, [s])
                };
            typeof e != "string" && (t = e, e = undefined), e = e || "fx";
            while (o--) n = data_priv.get(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
            return u(), i.promise(t)
        }
    });
    var nodeHook, boolHook, rclass = /[\t\r\n\f]/g,
        rreturn = /\r/g,
        rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        attr: function (e, t) {
            return jQuery.access(this, jQuery.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                jQuery.removeAttr(this, e)
            })
        },
        prop: function (e, t) {
            return jQuery.access(this, jQuery.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return this.each(function () {
                delete this[jQuery.propFix[e] || e]
            })
        },
        addClass: function (e) {
            var t, n, r, i, s, o = 0,
                u = this.length,
                a = typeof e == "string" && e;
            if (jQuery.isFunction(e)) return this.each(function (t) {
                jQuery(this).addClass(e.call(this, t, this.className))
            });
            if (a) {
                t = (e || "").match(core_rnotwhite) || [];
                for (; o < u; o++) {
                    n = this[o], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ");
                    if (r) {
                        s = 0;
                        while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        n.className = jQuery.trim(r)
                    }
                }
            }
            return this
        },
        removeClass: function (e) {
            var t, n, r, i, s, o = 0,
                u = this.length,
                a = arguments.length === 0 || typeof e == "string" && e;
            if (jQuery.isFunction(e)) return this.each(function (t) {
                jQuery(this).removeClass(e.call(this, t, this.className))
            });
            if (a) {
                t = (e || "").match(core_rnotwhite) || [];
                for (; o < u; o++) {
                    n = this[o], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : "");
                    if (r) {
                        s = 0;
                        while (i = t[s++]) while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                        n.className = e ? jQuery.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e;
            return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : jQuery.isFunction(e) ? this.each(function (n) {
                jQuery(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function () {
                if (n === "string") {
                    var t, r = 0,
                        i = jQuery(this),
                        s = e.match(core_rnotwhite) || [];
                    while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                } else if (n === core_strundefined || n === "boolean") this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || e === false ? "" : data_priv.get(this, "__className__") || ""
            })
        },
        hasClass: function (e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++) if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(rclass, " ").indexOf(t) >= 0) return true;
            return false
        },
        val: function (e) {
            var t, n, r, i = this[0];
            if (!arguments.length) {
                if (i) return t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(rreturn, "") : n == null ? "" : n);
                return
            }
            return r = jQuery.isFunction(e), this.each(function (n) {
                var i;
                if (this.nodeType !== 1) return;
                r ? i = e.call(this, n, jQuery(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : jQuery.isArray(i) && (i = jQuery.map(i, function (e) {
                    return e == null ? "" : e + ""
                })), t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
            })
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        s = e.type === "select-one" || i < 0,
                        o = s ? null : [],
                        u = s ? i + 1 : r.length,
                        a = i < 0 ? u : s ? i : 0;
                    for (; a < u; a++) {
                        n = r[a];
                        if ((n.selected || a === i) && (jQuery.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
                            t = jQuery(n).val();
                            if (s) return t;
                            o.push(t)
                        }
                    }
                    return o
                },
                set: function (e, t) {
                    var n, r, i = e.options,
                        s = jQuery.makeArray(t),
                        o = i.length;
                    while (o--) {
                        r = i[o];
                        if (r.selected = jQuery.inArray(jQuery(r).val(), s) >= 0) n = true
                    }
                    return n || (e.selectedIndex = -1), s
                }
            }
        },
        attr: function (e, t, n) {
            var r, i, s = e.nodeType;
            if (!e || s === 3 || s === 8 || s === 2) return;
            if (typeof e.getAttribute === core_strundefined) return jQuery.prop(e, t, n);
            if (s !== 1 || !jQuery.isXMLDoc(e)) t = t.toLowerCase(), r = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? boolHook : nodeHook);
            if (n === undefined) return r && "get" in r && (i = r.get(e, t)) !== null ? i : (i = jQuery.find.attr(e, t), i == null ? undefined : i);
            if (n !== null) return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
            jQuery.removeAttr(e, t)
        },
        removeAttr: function (e, t) {
            var n, r, i = 0,
                s = t && t.match(core_rnotwhite);
            if (s && e.nodeType === 1) while (n = s[i++]) r = jQuery.propFix[n] || n, jQuery.expr.match.bool.test(n) && (e[r] = false), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (!jQuery.support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function (e, t, n) {
            var r, i, s, o = e.nodeType;
            if (!e || o === 3 || o === 8 || o === 2) return;
            return s = o !== 1 || !jQuery.isXMLDoc(e), s && (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), boolHook = {
        set: function (e, t, n) {
            return t === false ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = jQuery.expr.attrHandle[t] || jQuery.find.attr;
        jQuery.expr.attrHandle[t] = function (e, t, r) {
            var i = jQuery.expr.attrHandle[t],
                s = r ? undefined : (jQuery.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
            return jQuery.expr.attrHandle[t] = i, s
        }
    }), jQuery.support.optSelected || (jQuery.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        jQuery.propFix[this.toLowerCase()] = this
    }), jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {
            set: function (e, t) {
                if (jQuery.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
            }
        }, jQuery.support.checkOn || (jQuery.valHooks[this].get = function (e) {
            return e.getAttribute("value") === null ? "on" : e.value
        })
    });
    var rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function (e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.get(e);
            if (!m) return;
            n.handler && (s = n, n = s.handler, i = s.selector), n.guid || (n.guid = jQuery.guid++), (a = m.events) || (a = m.events = {}), (o = m.handle) || (o = m.handle = function (e) {
                return typeof jQuery === core_strundefined || !! e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(o.elem, arguments)
            }, o.elem = e), t = (t || "").match(core_rnotwhite) || [""], f = t.length;
            while (f--) {
                u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                if (!p) continue;
                c = jQuery.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, c = jQuery.event.special[p] || {}, l = jQuery.extend({
                    type: p,
                    origType: v,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && jQuery.expr.match.needsContext.test(i),
                    namespace: d.join(".")
                }, s), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, (!c.setup || c.setup.call(e, r, d, o) === false) && e.addEventListener && e.addEventListener(p, o, false)), c.add && (c.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), jQuery.event.global[p] = true
            }
            e = null
        },
        remove: function (e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.hasData(e) && data_priv.get(e);
            if (!m || !(a = m.events)) return;
            t = (t || "").match(core_rnotwhite) || [""], f = t.length;
            while (f--) {
                u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                if (!p) {
                    for (p in a) jQuery.event.remove(e, p + t[f], n, r, true);
                    continue
                }
                c = jQuery.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = a[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = h.length;
                while (s--) l = h[s], (i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector) && (h.splice(s, 1), l.selector && h.delegateCount--, c.remove && c.remove.call(e, l));
                o && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === false) && jQuery.removeEvent(e, p, m.handle), delete a[p])
            }
            jQuery.isEmptyObject(a) && (delete m.handle, data_priv.remove(e, "events"))
        },
        trigger: function (e, t, n, r) {
            var i, s, o, u, a, f, l, c = [n || document],
                h = core_hasOwn.call(e, "type") ? e.type : e,
                p = core_hasOwn.call(e, "namespace") ? e.namespace.split(".") : [];
            s = o = n = n || document;
            if (n.nodeType === 3 || n.nodeType === 8) return;
            if (rfocusMorph.test(h + jQuery.event.triggered)) return;
            h.indexOf(".") >= 0 && (p = h.split("."), h = p.shift(), p.sort()), a = h.indexOf(":") < 0 && "on" + h, e = e[jQuery.expando] ? e : new jQuery.Event(h, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = t == null ? [e] : jQuery.makeArray(t, [e]), l = jQuery.event.special[h] || {};
            if (!r && l.trigger && l.trigger.apply(n, t) === false) return;
            if (!r && !l.noBubble && !jQuery.isWindow(n)) {
                u = l.delegateType || h, rfocusMorph.test(u + h) || (s = s.parentNode);
                for (; s; s = s.parentNode) c.push(s), o = s;
                o === (n.ownerDocument || document) && c.push(o.defaultView || o.parentWindow || window)
            }
            i = 0;
            while ((s = c[i++]) && !e.isPropagationStopped()) e.type = i > 1 ? u : l.bindType || h, f = (data_priv.get(s, "events") || {})[e.type] && data_priv.get(s, "handle"), f && f.apply(s, t), f = a && s[a], f && jQuery.acceptData(s) && f.apply && f.apply(s, t) === false && e.preventDefault();
            return e.type = h, !r && !e.isDefaultPrevented() && (!l._default || l._default.apply(c.pop(), t) === false) && jQuery.acceptData(n) && a && jQuery.isFunction(n[h]) && !jQuery.isWindow(n) && (o = n[a], o && (n[a] = null), jQuery.event.triggered = h, n[h](), jQuery.event.triggered = undefined, o && (n[a] = o)), e.result
        },
        dispatch: function (e) {
            e = jQuery.event.fix(e);
            var t, n, r, i, s, o = [],
                u = core_slice.call(arguments),
                a = (data_priv.get(this, "events") || {})[e.type] || [],
                f = jQuery.event.special[e.type] || {};
            u[0] = e, e.delegateTarget = this;
            if (f.preDispatch && f.preDispatch.call(this, e) === false) return;
            o = jQuery.event.handlers.call(this, e, a), t = 0;
            while ((i = o[t++]) && !e.isPropagationStopped()) {
                e.currentTarget = i.elem, n = 0;
                while ((s = i.handlers[n++]) && !e.isImmediatePropagationStopped()) if (!e.namespace_re || e.namespace_re.test(s.namespace)) e.handleObj = s, e.data = s.data, r = ((jQuery.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u), r !== undefined && (e.result = r) === false && (e.preventDefault(), e.stopPropagation())
            }
            return f.postDispatch && f.postDispatch.call(this, e), e.result
        },
        handlers: function (e, t) {
            var n, r, i, s, o = [],
                u = t.delegateCount,
                a = e.target;
            if (u && a.nodeType && (!e.button || e.type !== "click")) for (; a !== this; a = a.parentNode || this) if (a.disabled !== true || e.type !== "click") {
                r = [];
                for (n = 0; n < u; n++) s = t[n], i = s.selector + " ", r[i] === undefined && (r[i] = s.needsContext ? jQuery(i, this).index(a) >= 0 : jQuery.find(i, this, null, [a]).length), r[i] && r.push(s);
                r.length && o.push({
                    elem: a,
                    handlers: r
                })
            }
            return u < t.length && o.push({
                elem: this,
                handlers: t.slice(u)
            }), o
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, s = t.button;
                return e.pageX == null && t.clientX != null && (n = e.target.ownerDocument || document, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[jQuery.expando]) return e;
            var t, n, r, i = e.type,
                s = e,
                o = this.fixHooks[i];
            o || (this.fixHooks[i] = o = rmouseEvent.test(i) ? this.mouseHooks : rkeyEvent.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new jQuery.Event(s), t = r.length;
            while (t--) n = r[t], e[n] = s[n];
            return e.target || (e.target = document), e.target.nodeType === 3 && (e.target = e.target.parentNode), o.filter ? o.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function () {
                    if (this !== safeActiveElement() && this.focus) return this.focus(), false
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === safeActiveElement() && this.blur) return this.blur(), false
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) return this.click(), false
                },
                _default: function (e) {
                    return jQuery.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (e) {
                    e.result !== undefined && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = jQuery.extend(new jQuery.Event, n, {
                type: e,
                isSimulated: true,
                originalEvent: {}
            });
            r ? jQuery.event.trigger(i, null, t) : jQuery.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, jQuery.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, false)
    }, jQuery.Event = function (e, t) {
        if (!(this instanceof jQuery.Event)) return new jQuery.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? returnTrue : returnFalse) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || jQuery.now(), this[jQuery.expando] = true
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = returnTrue, this.stopPropagation()
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (e, t) {
        jQuery.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleOj;
                if (!i || i !== r && !jQuery.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                return n
            }
        }
    }), jQuery.support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, t) {
        var n = 0,
            r = function (e) {
                jQuery.event.simulate(t, e.target, jQuery.event.fix(e), true)
            };
        jQuery.event.special[t] = {
            setup: function () {
                n++ === 0 && document.addEventListener(e, r, true)
            },
            teardown: function () {
                --n === 0 && document.removeEventListener(e, r, true)
            }
        }
    }), jQuery.fn.extend({
        on: function (e, t, n, r, i) {
            var s, o;
            if (typeof e == "object") {
                typeof t != "string" && (n = n || t, t = undefined);
                for (o in e) this.on(o, t, n, e[o], i);
                return this
            }
            n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
            if (r === false) r = returnFalse;
            else if (!r) return this;
            return i === 1 && (s = r, r = function (e) {
                return jQuery().off(e), s.apply(this, arguments)
            }, r.guid = s.guid || (s.guid = jQuery.guid++)), this.each(function () {
                jQuery.event.add(this, e, r, n, t)
            })
        },
        one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function (e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if (typeof e == "object") {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            if (t === false || typeof t == "function") n = t, t = undefined;
            return n === false && (n = returnFalse), this.each(function () {
                jQuery.event.remove(this, e, n, t)
            })
        },
        trigger: function (e, t) {
            return this.each(function () {
                jQuery.event.trigger(e, t, this)
            })
        },
        triggerHandler: function (e, t) {
            var n = this[0];
            if (n) return jQuery.event.trigger(e, t, n, true)
        }
    });
    var isSimple = /^.[^:#\[\.,]*$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        rneedsContext = jQuery.expr.match.needsContext,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        find: function (e) {
            var t, n = [],
                r = this,
                i = r.length;
            if (typeof e != "string") return this.pushStack(jQuery(e).filter(function () {
                for (t = 0; t < i; t++) if (jQuery.contains(r[t], this)) return true
            }));
            for (t = 0; t < i; t++) jQuery.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? jQuery.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        has: function (e) {
            var t = jQuery(e, this),
                n = t.length;
            return this.filter(function () {
                var e = 0;
                for (; e < n; e++) if (jQuery.contains(this, t[e])) return true
            })
        },
        not: function (e) {
            return this.pushStack(winnow(this, e || [], true))
        },
        filter: function (e) {
            return this.pushStack(winnow(this, e || [], false))
        },
        is: function (e) {
            return !!winnow(this, typeof e == "string" && rneedsContext.test(e) ? jQuery(e) : e || [], false).length
        },
        closest: function (e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = rneedsContext.test(e) || typeof e != "string" ? jQuery(e, t || this.context) : 0;
            for (; r < i; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
                n = s.push(n);
                break
            }
            return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
        },
        index: function (e) {
            return e ? typeof e == "string" ? core_indexOf.call(jQuery(e), this[0]) : core_indexOf.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            var n = typeof e == "string" ? jQuery(e, t) : jQuery.makeArray(e && e.nodeType ? [e] : e),
                r = jQuery.merge(this.get(), n);
            return this.pushStack(jQuery.unique(r))
        },
        addBack: function (e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }), jQuery.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function (e) {
            return jQuery.dir(e, "parentNode")
        },
        parentsUntil: function (e, t, n) {
            return jQuery.dir(e, "parentNode", n)
        },
        next: function (e) {
            return sibling(e, "nextSibling")
        },
        prev: function (e) {
            return sibling(e, "previousSibling")
        },
        nextAll: function (e) {
            return jQuery.dir(e, "nextSibling")
        },
        prevAll: function (e) {
            return jQuery.dir(e, "previousSibling")
        },
        nextUntil: function (e, t, n) {
            return jQuery.dir(e, "nextSibling", n)
        },
        prevUntil: function (e, t, n) {
            return jQuery.dir(e, "previousSibling", n)
        },
        siblings: function (e) {
            return jQuery.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
            return jQuery.sibling(e.firstChild)
        },
        contents: function (e) {
            return e.contentDocument || jQuery.merge([], e.childNodes)
        }
    }, function (e, t) {
        jQuery.fn[e] = function (n, r) {
            var i = jQuery.map(this, t, n);
            return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = jQuery.filter(r, i)), this.length > 1 && (guaranteedUnique[e] || jQuery.unique(i), rparentsprev.test(e) && i.reverse()), this.pushStack(i)
        }
    }), jQuery.extend({
        filter: function (e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function (e) {
                return e.nodeType === 1
            }))
        },
        dir: function (e, t, n) {
            var r = [],
                i = n !== undefined;
            while ((e = e[t]) && e.nodeType !== 9) if (e.nodeType === 1) {
                if (i && jQuery(e).is(n)) break;
                r.push(e)
            }
            return r
        },
        sibling: function (e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.fn.extend({
        text: function (e) {
            return jQuery.access(this, function (e) {
                return e === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function () {
            return this.domManip(arguments, function (e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = manipulationTarget(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, function (e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = manipulationTarget(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function (e, t) {
            var n, r = e ? jQuery.filter(e, this) : this,
                i = 0;
            for (;
                (n = r[i]) != null; i++)!t && n.nodeType === 1 && jQuery.cleanData(getAll(n)), n.parentNode && (t && jQuery.contains(n.ownerDocument, n) && setGlobalEval(getAll(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function () {
            var e, t = 0;
            for (;
                (e = this[t]) != null; t++) e.nodeType === 1 && (jQuery.cleanData(getAll(e, false)), e.textContent = "");
            return this
        },
        clone: function (e, t) {
            return e = e == null ? false : e, t = t == null ? e : t, this.map(function () {
                return jQuery.clone(this, e, t)
            })
        },
        html: function (e) {
            return jQuery.access(this, function (e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && t.nodeType === 1) return t.innerHTML;
                if (typeof e == "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (jQuery.cleanData(getAll(t, false)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function () {
            var e = jQuery.map(this, function (e) {
                    return [e.nextSibling, e.parentNode]
                }),
                t = 0;
            return this.domManip(arguments, function (n) {
                var r = e[t++],
                    s = e[t++];
                s && (r && r.parentNode !== s && (r = this.nextSibling), jQuery(this).remove(), s.insertBefore(n, r))
            }, true), t ? this : this.remove()
        },
        detach: function (e) {
            return this.remove(e, true)
        },
        domManip: function (e, t, n) {
            e = core_concat.apply([], e);
            var r, i, s, o, u, a, f = 0,
                l = this.length,
                c = this,
                h = l - 1,
                p = e[0],
                d = jQuery.isFunction(p);
            if (d || !(l <= 1 || typeof p != "string" || jQuery.support.checkClone || !rchecked.test(p))) return this.each(function (r) {
                var i = c.eq(r);
                d && (e[0] = p.call(this, r, i.html())), i.domManip(e, t, n)
            });
            if (l) {
                r = jQuery.buildFragment(e, this[0].ownerDocument, false, !n && this), i = r.firstChild, r.childNodes.length === 1 && (r = i);
                if (i) {
                    s = jQuery.map(getAll(r, "script"), disableScript), o = s.length;
                    for (; f < l; f++) u = r, f !== h && (u = jQuery.clone(u, true, true), o && jQuery.merge(s, getAll(u, "script"))), t.call(this[f], u, f);
                    if (o) {
                        a = s[s.length - 1].ownerDocument, jQuery.map(s, restoreScript);
                        for (f = 0; f < o; f++) u = s[f], rscriptType.test(u.type || "") && !data_priv.access(u, "globalEval") && jQuery.contains(a, u) && (u.src ? jQuery._evalUrl(u.src) : jQuery.globalEval(u.textContent.replace(rcleanScript, "")))
                    }
                }
            }
            return this
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        jQuery.fn[e] = function (e) {
            var n, r = [],
                i = jQuery(e),
                s = i.length - 1,
                o = 0;
            for (; o <= s; o++) n = o === s ? this : this.clone(true), jQuery(i[o])[t](n), core_push.apply(r, n.get());
            return this.pushStack(r)
        }
    }), jQuery.extend({
        clone: function (e, t, n) {
            var r, i, s, o, u = e.cloneNode(true),
                a = jQuery.contains(e.ownerDocument, e);
            if (!jQuery.support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
                o = getAll(u), s = getAll(e);
                for (r = 0, i = s.length; r < i; r++) fixInput(s[r], o[r])
            }
            if (t) if (n) {
                s = s || getAll(e), o = o || getAll(u);
                for (r = 0, i = s.length; r < i; r++) cloneCopyEvent(s[r], o[r])
            } else cloneCopyEvent(e, u);
            return o = getAll(u, "script"), o.length > 0 && setGlobalEval(o, !a && getAll(e, "script")), u
        },
        buildFragment: function (e, t, n, r) {
            var i, s, o, u, a, f, l = 0,
                c = e.length,
                h = t.createDocumentFragment(),
                p = [];
            for (; l < c; l++) {
                i = e[l];
                if (i || i === 0) if (jQuery.type(i) === "object") jQuery.merge(p, i.nodeType ? [i] : i);
                else if (!rhtml.test(i)) p.push(t.createTextNode(i));
                else {
                    s = s || h.appendChild(t.createElement("div")), o = (rtagName.exec(i) || ["", ""])[1].toLowerCase(), u = wrapMap[o] || wrapMap._default, s.innerHTML = u[1] + i.replace(rxhtmlTag, "<$1></$2>") + u[2], f = u[0];
                    while (f--) s = s.lastChild;
                    jQuery.merge(p, s.childNodes), s = h.firstChild, s.textContent = ""
                }
            }
            h.textContent = "", l = 0;
            while (i = p[l++]) {
                if (r && jQuery.inArray(i, r) !== -1) continue;
                a = jQuery.contains(i.ownerDocument, i), s = getAll(h.appendChild(i), "script"), a && setGlobalEval(s);
                if (n) {
                    f = 0;
                    while (i = s[f++]) rscriptType.test(i.type || "") && n.push(i)
                }
            }
            return h
        },
        cleanData: function (e) {
            var t, n, r, i, s, o, u = jQuery.event.special,
                a = 0;
            for (;
                (n = e[a]) !== undefined; a++) {
                if (Data.accepts(n)) {
                    s = n[data_priv.expando];
                    if (s && (t = data_priv.cache[s])) {
                        r = Object.keys(t.events || {});
                        if (r.length) for (o = 0;
                                           (i = r[o]) !== undefined; o++) u[i] ? jQuery.event.remove(n, i) : jQuery.removeEvent(n, i, t.handle);
                        data_priv.cache[s] && delete data_priv.cache[s]
                    }
                }
                delete data_user.cache[n[data_user.expando]]
            }
        },
        _evalUrl: function (e) {
            return jQuery.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: false,
                global: false,
                "throws": true
            })
        }
    }), jQuery.fn.extend({
        wrapAll: function (e) {
            var t;
            return jQuery.isFunction(e) ? this.each(function (t) {
                jQuery(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = jQuery(e, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function (e) {
            return jQuery.isFunction(e) ? this.each(function (t) {
                jQuery(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = jQuery(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function (e) {
            var t = jQuery.isFunction(e);
            return this.each(function (n) {
                jQuery(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
        elemdisplay = {
            BODY: "block"
        },
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.fn.extend({
        css: function (e, t) {
            return jQuery.access(this, function (e, t, n) {
                var r, i, s = {},
                    o = 0;
                if (jQuery.isArray(t)) {
                    r = getStyles(e), i = t.length;
                    for (; o < i; o++) s[t[o]] = jQuery.css(e, t[o], false, r);
                    return s
                }
                return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function () {
            return showHide(this, true)
        },
        hide: function () {
            return showHide(this)
        },
        toggle: function (e) {
            return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function () {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }), jQuery.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = curCSS(e, "opacity");
                        return n === "" ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function (e, t, n, r) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var i, s, o, u = jQuery.camelCase(t),
                a = e.style;
            t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
            if (n === undefined) return o && "get" in o && (i = o.get(e, false, r)) !== undefined ? i : a[t];
            s = typeof n, s === "string" && (i = rrelNum.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t)), s = "number");
            if (n == null || s === "number" && isNaN(n)) return;
            s === "number" && !jQuery.cssNumber[u] && (n += "px"), !jQuery.support.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
            if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) a[t] = n
        },
        css: function (e, t, n, r) {
            var i, s, o, u = jQuery.camelCase(t);
            return t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u], o && "get" in o && (i = o.get(e, true, n)), i === undefined && (i = curCSS(e, t, r)), i === "normal" && t in cssNormalTransform && (i = cssNormalTransform[t]), n === "" || n ? (s = parseFloat(i), n === true || jQuery.isNumeric(s) ? s || 0 : i) : i
        }
    }), curCSS = function (e, t, n) {
        var r, i, s, o = n || getStyles(e),
            u = o ? o.getPropertyValue(t) || o[t] : undefined,
            a = e.style;
        return o && (u === "" && !jQuery.contains(e.ownerDocument, e) && (u = jQuery.style(e, t)), rnumnonpx.test(u) && rmargin.test(t) && (r = a.width, i = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = u, u = o.width, a.width = r, a.minWidth = i, a.maxWidth = s)), u
    }, jQuery.each(["height", "width"], function (e, t) {
        jQuery.cssHooks[t] = {
            get: function (e, n, r) {
                if (n) return e.offsetWidth === 0 && rdisplayswap.test(jQuery.css(e, "display")) ? jQuery.swap(e, cssShow, function () {
                    return getWidthOrHeight(e, t, r)
                }) : getWidthOrHeight(e, t, r)
            },
            set: function (e, n, r) {
                var i = r && getStyles(e);
                return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.support.boxSizing && jQuery.css(e, "boxSizing", false, i) === "border-box", i) : 0)
            }
        }
    }), jQuery(function () {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
            get: function (e, t) {
                if (t) return jQuery.swap(e, {
                    display: "inline-block"
                }, curCSS, [e, "marginRight"])
            }
        }), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"], function (e, t) {
            jQuery.cssHooks[t] = {
                get: function (e, n) {
                    if (n) return n = curCSS(e, t), rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
                }
            }
        })
    }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, jQuery.expr.filters.visible = function (e) {
        return !jQuery.expr.filters.hidden(e)
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (e, t) {
        jQuery.cssHooks[e + t] = {
            expand: function (n) {
                var r = 0,
                    i = {},
                    s = typeof n == "string" ? n.split(" ") : [n];
                for (; r < 4; r++) i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0];
                return i
            }
        }, rmargin.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var e = jQuery.prop(this, "elements");
                return e ? jQuery.makeArray(e) : this
            }).filter(function () {
                    var e = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !manipulation_rcheckableType.test(e))
                }).map(function (e, t) {
                    var n = jQuery(this).val();
                    return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function (e) {
                        return {
                            name: t.name,
                            value: e.replace(rCRLF, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(rCRLF, "\r\n")
                    }
                }).get()
        }
    }), jQuery.param = function (e, t) {
        var n, r = [],
            i = function (e, t) {
                t = jQuery.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        t === undefined && (t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional);
        if (jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, function () {
            i(this.name, this.value)
        });
        else for (n in e) buildParams(n, e[n], t, i);
        return r.join("&").replace(r20, "+")
    }, jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        jQuery.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), jQuery.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function (e, t) {
            return this.off(e, null, t)
        },
        delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function (e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
        ajax_rquery = /\?/,
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        _load = jQuery.fn.load,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function (e, t, n) {
        if (typeof e != "string" && _load) return _load.apply(this, arguments);
        var r, i, s, o = this,
            u = e.indexOf(" ");
        return u >= 0 && (r = e.slice(u), e = e.slice(0, u)), jQuery.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && jQuery.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function (e) {
                s = arguments, o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
            }).complete(n &&
                function (e, t) {
                    o.each(n, s || [e.responseText, t, e])
                }), this
    }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        jQuery.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function (e, t) {
            return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function (e, t) {
            function S(e, t, s, u) {
                var f, m, g, b, E, S = t;
                if (y === 2) return;
                y = 2, o && clearTimeout(o), n = undefined, i = u || "", w.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, s && (b = ajaxHandleResponses(l, w, s)), b = ajaxConvert(l, b, w, f);
                if (f) l.ifModified && (E = w.getResponseHeader("Last-Modified"), E && (jQuery.lastModified[r] = E), E = w.getResponseHeader("etag"), E && (jQuery.etag[r] = E)), e === 204 || l.type === "HEAD" ? S = "nocontent" : e === 304 ? S = "notmodified" : (S = b.state, m = b.data, g = b.error, f = !g);
                else {
                    g = S;
                    if (e || !S) S = "error", e < 0 && (e = 0)
                }
                w.status = e, w.statusText = (t || S) + "", f ? p.resolveWith(c, [m, S, w]) : p.rejectWith(c, [w, S, g]), w.statusCode(v), v = undefined, a && h.trigger(f ? "ajaxSuccess" : "ajaxError", [w, l, f ? m : g]), d.fireWith(c, [w, S]), a && (h.trigger("ajaxComplete", [w, l]), --jQuery.active || jQuery.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (t = e, e = undefined), t = t || {};
            var n, r, i, s, o, u, a, f, l = jQuery.ajaxSetup({}, t),
                c = l.context || l,
                h = l.context && (c.nodeType || c.jquery) ? jQuery(c) : jQuery.event,
                p = jQuery.Deferred(),
                d = jQuery.Callbacks("once memory"),
                v = l.statusCode || {},
                m = {},
                g = {},
                y = 0,
                b = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (y === 2) {
                            if (!s) {
                                s = {};
                                while (t = rheaders.exec(i)) s[t[1].toLowerCase()] = t[2]
                            }
                            t = s[e.toLowerCase()]
                        }
                        return t == null ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return y === 2 ? i : null
                    },
                    setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return y || (e = g[n] = g[n] || e, m[e] = t), this
                    },
                    overrideMimeType: function (e) {
                        return y || (l.mimeType = e), this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e) if (y < 2) for (t in e) v[t] = [v[t], e[t]];
                        else w.always(e[w.status]);
                        return this
                    },
                    abort: function (e) {
                        var t = e || b;
                        return n && n.abort(t), S(0, t), this
                    }
                };
            p.promise(w).complete = d.add, w.success = w.done, w.error = w.fail, l.url = ((e || l.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(core_rnotwhite) || [""], l.crossDomain == null && (u = rurl.exec(l.url.toLowerCase()), l.crossDomain = !(!u || u[1] === ajaxLocParts[1] && u[2] === ajaxLocParts[2] && (u[3] || (u[1] === "http:" ? "80" : "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = jQuery.param(l.data, l.traditional)), inspectPrefiltersOrTransports(prefilters, l, t, w);
            if (y === 2) return w;
            a = l.global, a && jQuery.active++ === 0 && jQuery.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !rnoContent.test(l.type), r = l.url, l.hasContent || (l.data && (r = l.url += (ajax_rquery.test(r) ? "&" : "?") + l.data, delete l.data), l.cache === false && (l.url = rts.test(r) ? r.replace(rts, "$1_=" + ajax_nonce++) : r + (ajax_rquery.test(r) ? "&" : "?") + "_=" + ajax_nonce++)), l.ifModified && (jQuery.lastModified[r] && w.setRequestHeader("If-Modified-Since", jQuery.lastModified[r]), jQuery.etag[r] && w.setRequestHeader("If-None-Match", jQuery.etag[r])), (l.data && l.hasContent && l.contentType !== false || t.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : l.accepts["*"]);
            for (f in l.headers) w.setRequestHeader(f, l.headers[f]);
            if (!l.beforeSend || l.beforeSend.call(c, w, l) !== false && y !== 2) {
                b = "abort";
                for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[f](l[f]);
                n = inspectPrefiltersOrTransports(transports, l, t, w);
                if (!n) S(-1, "No Transport");
                else {
                    w.readyState = 1, a && h.trigger("ajaxSend", [w, l]), l.async && l.timeout > 0 && (o = setTimeout(function () {
                        w.abort("timeout")
                    }, l.timeout));
                    try {
                        y = 1, n.send(m, S)
                    } catch (E) {
                        if (!(y < 2)) throw E;
                        S(-1, E)
                    }
                }
                return w
            }
            return w.abort()
        },
        getJSON: function (e, t, n) {
            return jQuery.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return jQuery.get(e, undefined, t, "script")
        }
    }), jQuery.each(["get", "post"], function (e, t) {
        jQuery[t] = function (e, n, r, i) {
            return jQuery.isFunction(n) && (i = i || r, r = n, n = undefined), jQuery.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (e) {
                return jQuery.globalEval(e), e
            }
        }
    }), jQuery.ajaxPrefilter("script", function (e) {
        e.cache === undefined && (e.cache = false), e.crossDomain && (e.type = "GET")
    }), jQuery.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function (r, i) {
                    t = jQuery("<script>").prop({
                        async: true,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function (e) {
                            t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type)
                        }), document.head.appendChild(t[0])
                },
                abort: function () {
                    n && n()
                }
            }
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
            return this[e] = true, e
        }
    }), jQuery.ajaxPrefilter("json jsonp", function (e, t, n) {
        var r, i, s, o = e.jsonp !== false && (rjsonp.test(e.url) ? "url" : typeof e.data == "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
        if (o || e.dataTypes[0] === "jsonp") return r = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(rjsonp, "$1" + r) : e.jsonp !== false && (e.url += (ajax_rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
            return s || jQuery.error(r + " was not called"), s[0]
        }, e.dataTypes[0] = "json", i = window[r], window[r] = function () {
            s = arguments
        }, n.always(function () {
            window[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, oldCallbacks.push(r)), s && jQuery.isFunction(i) && i(s[0]), s = i = undefined
        }), "script"
    }), jQuery.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var xhrSupported = jQuery.ajaxSettings.xhr(),
        xhrSuccessStatus = {
            0: 200,
            1223: 204
        },
        xhrId = 0,
        xhrCallbacks = {};
    window.ActiveXObject && jQuery(window).on("unload", function () {
        for (var e in xhrCallbacks) xhrCallbacks[e]();
        xhrCallbacks = undefined
    }), jQuery.support.cors = !! xhrSupported && "withCredentials" in xhrSupported, jQuery.support.ajax = xhrSupported = !! xhrSupported, jQuery.ajaxTransport(function (e) {
        var t;
        if (jQuery.support.cors || xhrSupported && !e.crossDomain) return {
            send: function (n, r) {
                var i, s, o = e.xhr();
                o.open(e.type, e.url, e.async, e.username, e.password);
                if (e.xhrFields) for (i in e.xhrFields) o[i] = e.xhrFields[i];
                e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) o.setRequestHeader(i, n[i]);
                t = function (e) {
                    return function () {
                        t && (delete xhrCallbacks[s], t = o.onload = o.onerror = null, e === "abort" ? o.abort() : e === "error" ? r(o.status || 404, o.statusText) : r(xhrSuccessStatus[o.status] || o.status, o.statusText, typeof o.responseText == "string" ? {
                            text: o.responseText
                        } : undefined, o.getAllResponseHeaders()))
                    }
                }, o.onload = t(), o.onerror = t("error"), t = xhrCallbacks[s = xhrId++] = t("abort"), o.send(e.hasContent && e.data || null)
            },
            abort: function () {
                t && t()
            }
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function (e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = rfxnum.exec(t),
                    s = i && i[3] || (jQuery.cssNumber[e] ? "" : "px"),
                    o = (jQuery.cssNumber[e] || s !== "px" && +r) && rfxnum.exec(jQuery.css(n.elem, e)),
                    u = 1,
                    a = 20;
                if (o && o[3] !== s) {
                    s = s || o[3], i = i || [], o = +r || 1;
                    do u = u || ".5", o /= u, jQuery.style(n.elem, e, o + s);
                    while (u !== (u = n.cur() / r) && u !== 1 && --a)
                }
                return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function (e, t) {
            jQuery.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; r < i; r++) n = e[r], tweeners[n] = tweeners[n] || [], tweeners[n].unshift(t)
        },
        prefilter: function (e, t) {
            t ? animationPrefilters.unshift(e) : animationPrefilters.push(e)
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function (e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
        },
        cur: function () {
            var e = Tween.propHooks[this.prop];
            return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
        },
        run: function (e) {
            var t, n = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Tween.propHooks._default.set(this), this
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return e.elem[e.prop] == null || !! e.elem.style && e.elem.style[e.prop] != null ? (t = jQuery.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
            },
            set: function (e) {
                jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop]) ? jQuery.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, jQuery.each(["toggle", "show", "hide"], function (e, t) {
        var n = jQuery.fn[t];
        jQuery.fn[t] = function (e, r, i) {
            return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, true), e, r, i)
        }
    }), jQuery.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function (e, t, n, r) {
            var i = jQuery.isEmptyObject(e),
                s = jQuery.speed(t, n, r),
                o = function () {
                    var t = Animation(this, jQuery.extend({}, e), s);
                    (i || data_priv.get(this, "finish")) && t.stop(true)
                };
            return o.finish = o, i || s.queue === false ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function (e, t, n) {
            var r = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== false && this.queue(e || "fx", []), this.each(function () {
                var t = true,
                    i = e != null && e + "queueHooks",
                    s = jQuery.timers,
                    o = data_priv.get(this);
                if (i) o[i] && o[i].stop && r(o[i]);
                else for (i in o) o[i] && o[i].stop && rrun.test(i) && r(o[i]);
                for (i = s.length; i--;) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = false, s.splice(i, 1));
                (t || !n) && jQuery.dequeue(this, e)
            })
        },
        finish: function (e) {
            return e !== false && (e = e || "fx"), this.each(function () {
                var t, n = data_priv.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    s = jQuery.timers,
                    o = r ? r.length : 0;
                n.finish = true, jQuery.queue(this, e, []), i && i.stop && i.stop.call(this, true);
                for (t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(true), s.splice(t, 1));
                for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, t) {
        jQuery.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), jQuery.speed = function (e, t, n) {
        var r = e && typeof e == "object" ? jQuery.extend({}, e) : {
            complete: n || !n && t || jQuery.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !jQuery.isFunction(t) && t
        };
        r.duration = jQuery.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default;
        if (r.queue == null || r.queue === true) r.queue = "fx";
        return r.old = r.complete, r.complete = function () {
            jQuery.isFunction(r.old) && r.old.call(this), r.queue && jQuery.dequeue(this, r.queue)
        }, r
    }, jQuery.easing = {
        linear: function (e) {
            return e
        },
        swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function () {
        var e, t = jQuery.timers,
            n = 0;
        fxNow = jQuery.now();
        for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
        t.length || jQuery.fx.stop(), fxNow = undefined
    }, jQuery.fx.timer = function (e) {
        e() && jQuery.timers.push(e) && jQuery.fx.start()
    }, jQuery.fx.interval = 13, jQuery.fx.start = function () {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }, jQuery.fx.stop = function () {
        clearInterval(timerId), timerId = null
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function (e) {
        return jQuery.grep(jQuery.timers, function (t) {
            return e === t.elem
        }).length
    }), jQuery.fn.offset = function (e) {
        if (arguments.length) return e === undefined ? this : this.each(function (t) {
            jQuery.offset.setOffset(this, e, t)
        });
        var t, n, r = this[0],
            i = {
                top: 0,
                left: 0
            },
            s = r && r.ownerDocument;
        if (!s) return;
        return t = s.documentElement, jQuery.contains(t, r) ? (typeof r.getBoundingClientRect !== core_strundefined && (i = r.getBoundingClientRect()), n = getWindow(s), {
            top: i.top + n.pageYOffset - t.clientTop,
            left: i.left + n.pageXOffset - t.clientLeft
        }) : i
    }, jQuery.offset = {
        setOffset: function (e, t, n) {
            var r, i, s, o, u, a, f, l = jQuery.css(e, "position"),
                c = jQuery(e),
                h = {};
            l === "static" && (e.style.position = "relative"), u = c.offset(), s = jQuery.css(e, "top"), a = jQuery.css(e, "left"), f = (l === "absolute" || l === "fixed") && (s + a).indexOf("auto") > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), jQuery.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (h.top = t.top - u.top + o), t.left != null && (h.left = t.left - u.left + i), "using" in t ? t.using.call(e, h) : c.css(h)
        }
    }, jQuery.fn.extend({
        position: function () {
            if (!this[0]) return;
            var e, t, n = this[0],
                r = {
                    top: 0,
                    left: 0
                };
            return jQuery.css(n, "position") === "fixed" ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), jQuery.nodeName(e[0], "html") || (r = e.offset()), r.top += jQuery.css(e[0], "borderTopWidth", true), r.left += jQuery.css(e[0], "borderLeftWidth", true)), {
                top: t.top - r.top - jQuery.css(n, "marginTop", true),
                left: t.left - r.left - jQuery.css(n, "marginLeft", true)
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || docElem;
                while (e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static") e = e.offsetParent;
                return e || docElem
            })
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (e, t) {
        var n = "pageYOffset" === t;
        jQuery.fn[e] = function (r) {
            return jQuery.access(this, function (e, r, i) {
                var s = getWindow(e);
                if (i === undefined) return s ? s[t] : e[r];
                s ? s.scrollTo(n ? window.pageXOffset : i, n ? i : window.pageYOffset) : e[r] = i
            }, e, r, arguments.length, null)
        }
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function (e, t) {
        jQuery.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function (n, r) {
            jQuery.fn[r] = function (r, i) {
                var s = arguments.length && (n || typeof r != "boolean"),
                    o = n || (r === true || i === true ? "margin" : "border");
                return jQuery.access(this, function (t, n, r) {
                    var i;
                    return jQuery.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? jQuery.css(t, n, o) : jQuery.style(t, n, r, o)
                }, t, s ? r : undefined, s, null)
            }
        })
    }), jQuery.fn.size = function () {
        return this.length
    }, jQuery.fn.andSelf = jQuery.fn.addBack, typeof module == "object" && module && typeof module.exports == "object" ? module.exports = jQuery : typeof define == "function" && define.amd && define("jquery", [], function () {
        return jQuery
    }), typeof window == "object" && typeof window.document == "object" && (window.jQuery = window.$ = jQuery)
})(window), window.Modernizr = function (e, t, n) {
    function x(e) {
        f.cssText = e
    }
    function T(e, t) {
        return x(prefixes.join(e + ";") + (t || ""))
    }
    function N(e, t) {
        return typeof e === t
    }
    function C(e, t) {
        return !!~ ("" + e).indexOf(t)
    }
    function k(e, t, r) {
        for (var i in e) {
            var s = t[e[i]];
            if (s !== n) return r === false ? e[i] : N(s, "function") ? s.bind(r || t) : s
        }
        return false
    }
    var r = "2.6.2",
        i = {},
        s = true,
        o = t.documentElement,
        u = "modernizr",
        a = t.createElement(u),
        f = a.style,
        l, c = {}.toString,
        h = "Webkit Moz O ms",
        p = h.split(" "),
        d = h.toLowerCase().split(" "),
        v = {},
        m = {},
        g = {},
        y = [],
        b = y.slice,
        w, E = {}.hasOwnProperty,
        S;
    !N(E, "undefined") && !N(E.call, "undefined") ? S = function (e, t) {
        return E.call(e, t)
    } : S = function (e, t) {
        return t in e && N(e.constructor.prototype[t], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (t) {
        var n = this;
        if (typeof n != "function") throw new TypeError;
        var r = b.call(arguments, 1),
            i = function () {
                if (this instanceof i) {
                    var e = function () {};
                    e.prototype = n.prototype;
                    var s = new e,
                        o = n.apply(s, r.concat(b.call(arguments)));
                    return Object(o) === o ? o : s
                }
                return n.apply(t, r.concat(b.call(arguments)))
            };
        return i
    }), v.canvas = function () {
        var e = t.createElement("canvas");
        return !!e.getContext && !! e.getContext("2d")
    }, v.websockets = function () {
        return "WebSocket" in e || "MozWebSocket" in e
    };
    for (var L in v) S(v, L) && (w = L.toLowerCase(), i[w] = v[L](), y.push((i[w] ? "" : "no-") + w));
    return i.addTest = function (e, t) {
        if (typeof e == "object") for (var r in e) S(e, r) && i.addTest(r, e[r]);
        else {
            e = e.toLowerCase();
            if (i[e] !== n) return i;
            t = typeof t == "function" ? t() : t, typeof s != "undefined" && s && (o.className += " " + (t ? "" : "no-") + e), i[e] = t
        }
        return i
    }, x(""), a = l = null, function (e, t) {
        function l(e, t) {
            var n = e.createElement("p"),
                r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
        }
        function c() {
            var e = g.elements;
            return typeof e == "string" ? e.split(" ") : e
        }
        function h(e) {
            var t = a[e[o]];
            return t || (t = {}, u++, e[o] = u, a[u] = t), t
        }
        function p(e, n, s) {
            n || (n = t);
            if (f) return n.createElement(e);
            s || (s = h(n));
            var o;
            return s.cache[e] ? o = s.cache[e].cloneNode() : i.test(e) ? o = (s.cache[e] = s.createElem(e)).cloneNode() : o = s.createElem(e), o.canHaveChildren && !r.test(e) ? s.frag.appendChild(o) : o
        }
        function d(e, n) {
            e || (e = t);
            if (f) return e.createDocumentFragment();
            n = n || h(e);
            var r = n.frag.cloneNode(),
                i = 0,
                s = c(),
                o = s.length;
            for (; i < o; i++) r.createElement(s[i]);
            return r
        }
        function v(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
                return g.shivMethods ? p(n, e, t) : t.createElem(n)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + c().join().replace(/\w+/g, function (e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(g, t.frag)
        }
        function m(e) {
            e || (e = t);
            var n = h(e);
            return g.shivCSS && !s && !n.hasCSS && (n.hasCSS = !! l(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), f || v(e, n), e
        }
        var n = e.html5 || {},
            r = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            i = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            s, o = "_html5shiv",
            u = 0,
            a = {},
            f;
        (function () {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", s = "hidden" in e, f = e.childNodes.length == 1 ||
                    function () {
                        t.createElement("a");
                        var e = t.createDocumentFragment();
                        return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined"
                    }()
            } catch (n) {
                s = true, f = true
            }
        })();
        var g = {
            elements: n.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: n.shivCSS !== false,
            supportsUnknownElements: f,
            shivMethods: n.shivMethods !== false,
            type: "default",
            shivDocument: m,
            createElement: p,
            createDocumentFragment: d
        };
        e.html5 = g, m(t)
    }(this, t), i._version = r, i._domPrefixes = d, i._cssomPrefixes = p, o.className = o.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (s ? " js " + y.join(" ") : ""), i
}(this, this.document), function (e, t, n) {
    function r(e) {
        return "[object Function]" == d.call(e)
    }
    function i(e) {
        return "string" == typeof e
    }
    function s() {}
    function o(e) {
        return !e || "loaded" == e || "complete" == e || "uninitialized" == e
    }
    function u() {
        var e = v.shift();
        m = 1, e ? e.t ? h(function () {
            ("c" == e.t ? k.injectCss : k.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
        }, 0) : (e(), u()) : m = 0
    }
    function a(e, n, r, i, s, a, f) {
        function l(t) {
            if (!d && o(c.readyState) && (w.r = d = 1, !m && u(), c.onload = c.onreadystatechange = null, t)) {
                "img" != e && h(function () {
                    b.removeChild(c)
                }, 50);
                for (var r in T[n]) T[n].hasOwnProperty(r) && T[n][r].onload()
            }
        }
        var f = f || k.errorTimeout,
            c = t.createElement(e),
            d = 0,
            g = 0,
            w = {
                t: r,
                s: n,
                e: s,
                a: a,
                x: f
            };
        1 === T[n] && (g = 1, T[n] = []), "object" == e ? c.data = n : (c.src = n, c.type = e), c.width = c.height = "0", c.onerror = c.onload = c.onreadystatechange = function () {
            l.call(this, g)
        }, v.splice(i, 0, w), "img" != e && (g || 2 === T[n] ? (b.insertBefore(c, y ? null : p), h(l, f)) : T[n].push(c))
    }
    function f(e, t, n, r, s) {
        return m = 0, t = t || "j", i(e) ? a("c" == t ? E : w, e, t, this.i++, n, r, s) : (v.splice(this.i++, 0, e), 1 == v.length && u()), this
    }
    function l() {
        var e = k;
        return e.loader = {
            load: f,
            i: 0
        }, e
    }
    var c = t.documentElement,
        h = e.setTimeout,
        p = t.getElementsByTagName("script")[0],
        d = {}.toString,
        v = [],
        m = 0,
        g = "MozAppearance" in c.style,
        y = g && !! t.createRange().compareNode,
        b = y ? c : p.parentNode,
        c = e.opera && "[object Opera]" == d.call(e.opera),
        c = !! t.attachEvent && !c,
        w = g ? "object" : c ? "script" : "img",
        E = c ? "script" : w,
        S = Array.isArray ||
            function (e) {
                return "[object Array]" == d.call(e)
            }, x = [], T = {}, N = {
            timeout: function (e, t) {
                return t.length && (e.timeout = t[0]), e
            }
        }, C, k;
    k = function (e) {
        function t(e) {
            var e = e.split("!"),
                t = x.length,
                n = e.pop(),
                r = e.length,
                n = {
                    url: n,
                    origUrl: n,
                    prefixes: e
                },
                i, s, o;
            for (s = 0; s < r; s++) o = e[s].split("="), (i = N[o.shift()]) && (n = i(n, o));
            for (s = 0; s < t; s++) n = x[s](n);
            return n
        }
        function o(e, i, s, o, u) {
            var a = t(e),
                f = a.autoCallback;
            a.url.split(".").pop().split("?").shift(), a.bypass || (i && (i = r(i) ? i : i[e] || i[o] || i[e.split("/").pop().split("?")[0]]), a.instead ? a.instead(e, i, s, o, u) : (T[a.url] ? a.noexec = true : T[a.url] = 1, s.load(a.url, a.forceCSS || !a.forceJS && "css" == a.url.split(".").pop().split("?").shift() ? "c" : n, a.noexec, a.attrs, a.timeout), (r(i) || r(f)) && s.load(function () {
                l(), i && i(a.origUrl, u, o), f && f(a.origUrl, u, o), T[a.url] = 2
            })))
        }
        function u(e, t) {
            function n(e, n) {
                if (e) {
                    if (i(e)) n || (f = function () {
                        var e = [].slice.call(arguments);
                        l.apply(this, e), c()
                    }), o(e, f, t, 0, u);
                    else if (Object(e) === e) for (p in h = function () {
                        var t = 0,
                            n;
                        for (n in e) e.hasOwnProperty(n) && t++;
                        return t
                    }(), e) e.hasOwnProperty(p) && (!n && !--h && (r(f) ? f = function () {
                        var e = [].slice.call(arguments);
                        l.apply(this, e), c()
                    } : f[p] = function (e) {
                        return function () {
                            var t = [].slice.call(arguments);
                            e && e.apply(this, t), c()
                        }
                    }(l[p])), o(e[p], f, t, p, u))
                } else!n && c()
            }
            var u = !! e.test,
                a = e.load || e.both,
                f = e.callback || s,
                l = f,
                c = e.complete || s,
                h, p;
            n(u ? e.yep : e.nope, !! a), a && n(a)
        }
        var a, f, c = this.yepnope.loader;
        if (i(e)) o(e, 0, c, 0);
        else if (S(e)) for (a = 0; a < e.length; a++) f = e[a], i(f) ? o(f, 0, c, 0) : S(f) ? k(f) : Object(f) === f && u(f, c);
        else Object(e) === e && u(e, c)
    }, k.addPrefix = function (e, t) {
        N[e] = t
    }, k.addFilter = function (e) {
        x.push(e)
    }, k.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", C = function () {
        t.removeEventListener("DOMContentLoaded", C, 0), t.readyState = "complete"
    }, 0)), e.yepnope = l(), e.yepnope.executeStack = u, e.yepnope.injectJs = function (e, n, r, i, a, f) {
        var l = t.createElement("script"),
            c, d, i = i || k.errorTimeout;
        l.src = e;
        for (d in r) l.setAttribute(d, r[d]);
        n = f ? u : n || s, l.onreadystatechange = l.onload = function () {
            !c && o(l.readyState) && (c = 1, n(), l.onload = l.onreadystatechange = null)
        }, h(function () {
            c || (c = 1, n(1))
        }, i), a ? l.onload() : p.parentNode.insertBefore(l, p)
    }, e.yepnope.injectCss = function (e, n, r, i, o, a) {
        var i = t.createElement("link"),
            f, n = a ? u : n || s;
        i.href = e, i.rel = "stylesheet", i.type = "text/css";
        for (f in r) i.setAttribute(f, r[f]);
        o || (p.parentNode.insertBefore(i, p), h(n, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, Modernizr.addTest("cookies", function () {
    if (navigator.cookieEnabled) return true;
    document.cookie = "cookietest=1";
    var e = document.cookie.indexOf("cookietest=") != -1;
    return document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", e
}), tagpro = {
    version: "2.0.0",
    socket: null,
    players: null,
    chat: null,
    playerId: null,
    score: null,
    state: null,
    sound: null,
    zoom: 1,
    serverPort: null,
    serverHost: null,
    socketPort: null,
    socketHost: null,
    settings: {
        ui: {
            allChat: true,
            teamChat: true,
            groupChat: true,
            systemChat: true,
            spectatorInfo: true,
            performanceInfo: true,
            names: true,
            degrees: true,
            matchState: true
        }
    },
    ping: {
        current: 0,
        history: [],
        avg: 0
    },
    host: document.location.host,
    gameEndsAt: null,
    disableControls: 0,
    spectator: false,
    spectators: 0,
    movement: [],
    joinGame: function (e) {
        location.href = e
    },
    api: {
        redrawBackground: null
    },
    events: {
        register: function (e) {
            for (var t in e) tagpro.events[t] || (tagpro.events[t] = []), eventFunc = {}, eventFunc[t] = e[t], tagpro.events[t].push(eventFunc)
        }
    },
    resourcesLoaded: false,
    _readyCallbacks: [],
    ready: function (e) {
        if (tagpro.resourcesLoaded) {
            e();
            return
        }
        tagpro._readyCallbacks.push(e)
    }
}, $(document).ready(function () {
    var e = $("#loadingMessage"),
        t = $("#assets img"),
        n = 0;
    t.load(function () {
        var e = $(this);
        if (e.data("loaded")) return;
        e.data("loaded", true), n++, n >= t.length && (tagpro.resourcesLoaded = true, tagpro._readyCallbacks.forEach(function (e) {
            try {
                e()
            } catch (t) {
                console.error(t)
            }
        }), tagpro._readyCallbacks = [])
    }), t.each(function () {
        $(this).attr("src", $(this).attr("src"))
    }), setTimeout(function () {
        if (tagpro.resourcesLoaded) return;
        t.not("[data-load]").each(function () {
            e.append($("<div></div>").css({
                "font-weight": "normal",
                "font-size": "50%"
            }).text($(this).attr("id") + "..."))
        })
    }, 1e4)
}), $(document).keydown(function (e) {
    if (e.keyCode != 8) return;
    var t = e.target.nodeName.toLowerCase();
    if (t == "input" || t == "textarea") return;
    e.preventDefault()
}), tagpro.helpers = {
    pad: function (e, t) {
        e = e.toString(), t = t.toString();
        var n = t + e,
            r = t.length > e.length ? t.length : e.length;
        return n.substr(n.length - r)
    },
    timeFromSeconds: function (e, t) {
        t == undefined && (t = false);
        var n = tagpro.helpers.pad;
        e = parseFloat(e);
        var r = parseInt(e / 3600),
            i = parseInt(e / 60) % 60,
            s = e % 60,
            o = n(i, "00") + ":" + n(s, "00");
        if (!t || r > 0) o = n(r, "00") + ":" + o;
        return o
    }
}, exports = {}, function (e) {
    typeof define == "function" && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery)
}(function (e) {
    function n(e) {
        return e
    }
    function r(e) {
        return decodeURIComponent(e.replace(t, " "))
    }
    function i(e) {
        e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return s.json ? JSON.parse(e) : e
        } catch (t) {}
    }
    var t = /\+/g,
        s = e.cookie = function (t, o, u) {
            if (o !== undefined) {
                u = e.extend({}, s.defaults, u);
                if (typeof u.expires == "number") {
                    var a = u.expires,
                        f = u.expires = new Date;
                    f.setDate(f.getDate() + a)
                }
                return o = s.json ? JSON.stringify(o) : String(o), document.cookie = [encodeURIComponent(t), "=", s.raw ? o : encodeURIComponent(o), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
            }
            var l = s.raw ? n : r,
                c = document.cookie.split("; "),
                h = t ? undefined : {};
            for (var p = 0, d = c.length; p < d; p++) {
                var v = c[p].split("="),
                    m = l(v.shift()),
                    g = l(v.join("="));
                if (t && t === m) {
                    h = i(g);
                    break
                }
                t || (h[m] = i(g))
            }
            return h
        };
    s.defaults = {}, e.removeCookie = function (t, n) {
        return e.cookie(t) !== undefined ? (e.cookie(t, "", e.extend(n, {
            expires: -1
        })), true) : false
    }
}), function (e) {
    tagpro.sound = undefined, tagpro.music = undefined;
    var t = function (t, n) {
            e.cookie(t, n, {
                expires: 365
            }), tagpro[t] = n
        },
        n = function () {
            var t = e("audio#music");
            t.length && t.get(0).play && (tagpro.music ? t.get(0).play() : t.get(0).pause()), tagpro.sound || e("audio").not(" #music").each(function () {
                this.play && (this.pause(), this.readyState == 4 && (this.currentTime = 0))
            })
        };
    e(window).ready(function () {
        tagpro.sound = e.cookie("sound"), tagpro.music = e.cookie("music"), tagpro.sound == undefined ? t("sound", true) : tagpro.sound = tagpro.sound == "true", tagpro.music == undefined ? t("music", false) : tagpro.music = tagpro.music == "true"
    }), e.fn.soundControl = function () {
        var r = e(this),
            i = e(this).find("#soundEffects"),
            s = e(this).find("#soundMusic"),
            o = function () {
                tagpro.sound ? i.removeClass("off") : i.addClass("off"), tagpro.music ? s.removeClass("off") : s.addClass("off")
            };
        i.click(function (e) {
            e.preventDefault(), t("sound", !tagpro.sound), o(), n()
        }), s.click(function (e) {
            e.preventDefault(), t("music", !tagpro.music), o(), n()
        }), o(), n()
    }, e(document).ready(function () {
        e("div#sound").soundControl()
    })
}(jQuery), $(document).ready(function () {
    if ($("html").hasClass("no-websockets")) {
        location.href = "http://" + tagpro.serverHost + "/browser";
        return
    }
    if ($("html").hasClass("no-cookies")) {
        location.href = "http://" + tagpro.serverHost + "/cookies";
        return
    }
});
var Sprite = function (e, t, n, r) {
    var i = {};
    this.createAnimation = function (e, t, n) {
        return i[e] = new Sprite.Animation(t, n), i[e]
    }, this.createInstance = function (s) {
        return {
            start: (new Date).getTime(),
            animation: s,
            draw: function (n, r, s) {
                var o = i[this.animation],
                    u = Math.floor(((new Date).getTime() - this.start) % (o.frames.length * o.time) / o.time);
                n.drawImage(e, o.frames[u] * 40, o.y * 40, t, t, r, s, t, t)
            },
            drawFloor: n || false,
            redrawFloor: r || false
        }
    }
};
Sprite.Animation = function (e, t) {
    this.y = e, this.time = t, this.frames = [], this.createFrame = function (e) {
        this.frames.push(e)
    }
}, tagpro.createSocket = function () {
    var e = io.connect(tagpro.gameSocket || document.location.href + "?r=" + Math.round(Math.random() * 1e7), {
        reconnect: false
    });
    return {
        on: function (t, n) {
            e.on(t, n)
        },
        emit: function (t, n) {
            e.emit(t, n)
        }
    }
}, tagpro.group = {
    socket: null
}, $(document).ready(function () {
    function n() {
        setTimeout(n, 3e4);
        if (!t.socket.connected) return;
        t.emit("touch", t.playerLocation)
    }
    var e = $("#groupId").val();
    if (!e || e == "null") return;
    var t = io.connect("http://" + tagpro.socketHost + "/groups/" + e + "?r=" + Math.round(Math.random() * 1e7));
    t.playerLocation = null, tagpro.group.socket = t, setTimeout(n, 3e3)
}), tagpro.ready(function () {
    function d(e, t, n) {
        var r = Math.abs(n);
        if (e.lastSync[t] == undefined || r > e.lastSync[t]) e[t] = n > 0, e.lastSync[t] = r
    }
    function v(e) {
        function t(e) {
            var t = [0, 0, 0, 0],
                n = [1, 1, 1, 1],
                r = [3, 0, 4, 2];
            if (e == "1") return n;
            if (Math.floor(e) == "1") {
                for (offset = Number((e + "").substr(-1)) - 1; offset > 0; offset--) r.unshift(r.pop());
                return r
            }
            return t
        }
        function n(e, t) {
            return quadArray = [0, 0, 0, 0], baseMap[e] && (baseMap[e][t] && (quadArray[0] = baseMap[e][t][0]), baseMap[e][t - 1] && (quadArray[3] = baseMap[e][t - 1][3])), baseMap[e - 1] && (baseMap[e - 1][t] && (quadArray[1] = baseMap[e - 1][t][1]), baseMap[e - 1][t - 1] && (quadArray[2] = baseMap[e - 1][t - 1][2])), quadArray
        }
        function r(e, t, n) {
            subMap[e] && (subMap[e][t] && (subMap[e][t][0] = n[0]), subMap[e][t - 1] && (subMap[e][t - 1][3] = n[3])), subMap[e - 1] && (subMap[e - 1][t] && (subMap[e - 1][t][1] = n[1]), subMap[e - 1][t - 1] && (subMap[e - 1][t - 1][2] = n[2]))
        }
        function s(e, t) {
            function v(e, t) {
                e || (o.push(s), u = !u), s += t
            }
            var i = n(e, t),
                s = 0,
                o = [],
                u = (i[3] == 1 || i[3] == 2 || i[3] == 3) && (i[0] == 1 || i[0] == 2 || i[0] == 4),
                a = u;
            if (i[0] + i[1] + i[2] + i[3] == 0) return r(e, t, i);
            if (!(i[0] != 1 && i[0] != 2 || i[1] != 1 && i[1] != 2 || i[2] != 1 && i[2] != 2 || i[3] != 1 && i[3] != 2)) {
                for (k = 0; k < 4; k++) {
                    var f = i[k] == 2 ? "d" : "";
                    i[k] = "1." + (k + 1) + "00" + f
                }
                return r(e, t, i)
            }
            for (k = 0; k < 4; k++) {
                var c = i[k];
                c == 0 ? v(!u, 2) : c == 1 || c == 2 ? v(u, 2) : c == 3 ? (v(!u, 1), v(u, 1)) : c == 4 && (v(u, 1), v(!u, 1))
            }
            a ? o.push(o.shift()) : u && o.push(0);
            for (k = 0; k < o.length; k += 2) for (l = 0; l < 4; l++) {
                var h = (o[k] + 6 * l) % 8,
                    p = (o[k + 1] + 6 * l) % 8;
                if (h < p && (h < 2 || p == 2 || p == 1) || h > p && (p > 0 || h < 2)) {
                    var d = i[l] == 2 ? "d" : "";
                    i[l] = "1." + (l + 1) + o[k] + o[k + 1] + d
                }
            }
            r(e, t, i)
        }
        baseMap = [], subMap = [];
        for (i = 0; i < e.length; i++) {
            baseMap[i] = [], subMap[i] = [];
            for (j = 0; j < e[0].length; j++) baseMap[i][j] = t(e[i][j]), subMap[i][j] = []
        }
        for (i = 0; i <= e.length; i++) for (j = 0; j <= e[0].length; j++) s(i, j);
        return subMap
    }
    function m(e) {
        function s(r, i) {
            var s = true,
                o, u = [r, i],
                a = [],
                f = {};
            while (u.length > 0) {
                var l = u.shift(),
                    c = u.shift();
                if (f[l + "," + c]) continue;
                f[l + "," + c] = true;
                var h = e[l] && e[l][c] || 0;
                if (t.indexOf(h) != -1) o !== undefined && o != h ? o = 2 : o = h;
                else {
                    var p = tagpro.tiles[e[l][c]];
                    if (p && p.drawFloor) {
                        p.redrawFloor && (s = false);
                        var d = Array.isArray(p.drawFloor) ? p.drawFloor : [{
                            x: -1,
                            y: 0
                        }, {
                            x: 1,
                            y: 0
                        }, {
                            x: 0,
                            y: 1
                        }, {
                            x: 0,
                            y: -1
                        }];
                        d.forEach(function (t) {
                            var n = l + t.x,
                                r = c + t.y;
                            if (e[n] && e[n][r] && tagpro.tiles[e[n][r]] && Array.isArray(tagpro.tiles[e[n][r]].drawFloor) && !tagpro.tiles[e[n][r]].drawFloor.some(function (e) {
                                return e.x == -t.x && e.y == -t.y
                            })) return;
                            u.push(n), u.push(r)
                        }), a.push(l), a.push(c)
                    }
                }
            }
            if (o === undefined || !o && !s) o = 2;
            while (a.length > 0) {
                var l = a.shift(),
                    c = a.shift();
                n[l][c] = o
            }
        }
        var t = [0, 2, 11, 12, 17, 18],
            n = [];
        for (var r = 0; r < e.length; r++) {
            n[r] = [];
            for (var i = 0; i < e[0].length; i++) n[r][i] = -1
        }
        for (var r = 0; r < e.length; r++) for (var i = 0; i < e[0].length; i++) n[r][i] == -1 && tagpro.tiles[e[r][i]] && tagpro.tiles[e[r][i]].drawFloor && s(r, i);
        return n
    }
    function E(e) {
        zoomCursor = e ? zoomCursor + 1 : zoomCursor - 1, zoomCursor >= zoomValues.length && (zoomCursor = zoomValues.length - 1), zoomCursor < 0 && (zoomCursor = 0), tagpro.zoom = zoomValues[zoomCursor]
    }
    function S(e) {
        e.which == 81 && t.emit("next"), e.which == 87 && t.emit("prev"), e.which == 65 && t.emit("redflagcarrier"), e.which == 83 && t.emit("blueflagcarrier"), (e.which == 187 || e.which == 107) && E(false), (e.which == 189 || e.which == 109) && E(true);
        if (e.which == 67) if (tagpro.viewPort.followPlayer) {
            var n = tagpro.map.length || 0,
                r = 0;
            tagpro.map[0] && (r = tagpro.map[0].length), tagpro.viewPort.followPlayer = false, tagpro.viewPort.source = {
                x: Math.floor(n / 2) * 40,
                y: Math.floor(r / 2) * 40
            }
        } else tagpro.viewPort.followPlayer = true;
        e.which == 32 && t.emit("join")
    }
    var e = false,
        t = tagpro.createSocket(),
        n = {},
        r = {},
        s = null,
        o = $("canvas"),
        u = o.get(0),
        a = u.getContext("2d"),
        f = null,
        c = 0,
        c = 0,
        h = 1,
        p = "";
    tagpro.socket = t, tagpro.players = n, tagpro.objects = r, tagpro.chat = {}, tagpro.playerId = null, tagpro.score = {}, tagpro.state = 1, tagpro.group.socket && (tagpro.group.socket.playerLocation = "game"), t.on("id", function (e) {
        f = e, tagpro.playerId = f, tagpro.viewPort.followPlayer = true
    }), t.on("settings", function (e) {
        tagpro.settings = e;
        for (var t in n) {
            var r = n[t];
            r.cache && r.cache.update && r.cache.update()
        }
    }), t.on("spectator", function (e) {
        tagpro.spectator = e, tagpro.spectator || (tagpro.zoom = 1)
    }), t.on("spectators", function (e) {
        tagpro.spectators = e
    }), setTimeout(function () {
        f == null && (location.href = "http://" + tagpro.serverHost)
    }, 1e4), t.on("p", function (e) {
        var t = e.t || null;
        e = e.u || e;
        for (var r = 0, i = e.length; r != i; r++) {
            var s = e[r],
                o = n[s.id];
            o || (o = s, tagpro.ui.createPlayerCache(o), n[o.id] = o, o.lastSync = {}, o.pressing = {});
            var u = false,
                a = false;
            for (var f in s) {
                if (f == "up" || f == "down" || f == "left" || f == "right") {
                    d(o, f, s[f]);
                    continue
                }
                if (!(t == null || o.lastSync[f] == undefined || t > o.lastSync[f])) continue;
                o[f] = s[f], t && (o.lastSync[f] = t);
                if (f == "rx" || f == "ry" || f == "lx" || f == "ly" || f == "a" || f == "den" || f == "dead" || f == "draw") u = true;
                if (f == "dead" || f == "draw" || f == "directSet") a = true;
                (f == "name" || f == "auth" || f == "degree") && o.cache.update()
            }(a || u) && tagpro.world.syncPlayer(o, a)
        }
    }), t.on("object", function (e) {
        r[e.id] || (r[e.id] = e);
        var t = r[e.id],
            n = false,
            i = false;
        for (var s in e) {
            t[s] = e[s];
            if (s == "rx" || s == "ry" || s == "lx" || s == "ly" || s == "a" || s == "draw") n = true;
            s == "draw" && (i = true)
        }
        n && tagpro.world.syncObject(t, i)
    }), t.on("playerLeft", function (e) {
        if (h == 2) return;
        tagpro.world.destoryPlayer(e), delete n[e]
    }), t.on("map", function (e) {
        s = e.tiles, tagpro.map = s, tagpro.wallMap = v(s), tagpro.floorMap = m(s), tagpro.map.splats = e.splats, e.info && $("div#mapInfo").removeClass("hide").text("Map: " + (e.info.name || "Untitled") + " by " + (e.info.author || "Unknown"))
    }), t.on("time", function (e) {
        tagpro.gameEndsAt = new Date((new Date).getTime() + e.time), tagpro.state = e.state || 1
    }), tagpro.playSound = function (e, t) {
        if (!tagpro.sound) return;
        var n = $("audio#" + e).get(0);
        n && n.play && (n.volume = t || 1, t == 0 ? (n.pause(), n.currentTime = 0) : n.play())
    }, t.on("sound", function (e) {
        if (tagpro.viewPort.followPlayer) tagpro.playSound(e.s, e.v);
        else switch (e.s) {
            case "cheering":
            case "sigh":
                tagpro.playSound("cheering", 1);
                break;
            case "drop":
            case "friendlydrop":
                tagpro.playSound("friendlydrop", 1);
                break;
            case "alert":
            case "friendlyalert":
                tagpro.playSound("friendlyalert", .5);
                break;
            default:
        }
    }), t.on("score", function (e) {
        tagpro.score = e
    });
    var g = false;
    t.on("full", function () {
        g = true, location.href = "http://" + tagpro.serverHost + "/games/find?r=" + (new Date).getTime()
    }), t.on("private", function () {
        g = true, location.href = "http://" + tagpro.serverHost + "/"
    }), t.on("banned", function () {
        g = true, location.href = "http://" + tagpro.serverHost + "/banned"
    }), t.on("duplicate", function () {
        g = true, location.href = "http://" + tagpro.serverHost + "/"
    }), t.on("joinWorld", function (e) {
        g = true, location.href = "http://" + location.hostname + ":" + e + "/?alert=true"
    }), t.on("disconnect", function () {
        if (tagpro.group.socket && tagpro.group.socket.redirecting) return;
        h != 2 && !g && (y ? location.href = "http://" + tagpro.serverHost + "/groups/" + y : location.href = "http://" + tagpro.serverHost + "/")
    }), t.on("end", function (e) {
        h = 2, tagpro.state = 2, p = e.winner, tagpro.winner = e.winner, tagpro.showOptions(), $("div.news").fadeIn(), setTimeout(function () {
            e.groupId ? location.href = "http://" + tagpro.serverHost + "/groups/" + e.groupId : location.href = "http://" + tagpro.serverHost + "/games/find?r=" + (new Date).getTime()
        }, 2e4)
    });
    var y = null;
    t.on("groupId", function (e) {
        if (!e) return;
        y = e, $("#exit").attr("href", "http://" + tagpro.serverHost + "/groups/" + y)
    }), o.mousedown("mousedown", function (e) {
        tagpro.chat.kick(e) && tagpro.kick.clickBall(e)
    });
    var b = [37, 38, 39, 40, 87, 119, 65, 97, 83, 115, 68, 100],
        w = 1;
    $(document).keydown(function (e) {
        if (tagpro.disableControls) return;
        if (tagpro.spectator) return S(e);
        if (b.indexOf(e.keyCode) > -1) {
            var r = n[f];
            e.preventDefault();
            var i = null;
            switch (e.keyCode) {
                case 37:
                case 65:
                case 97:
                    i = "left";
                    break;
                case 38:
                case 87:
                case 119:
                    i = "up";
                    break;
                case 39:
                case 68:
                case 100:
                    i = "right";
                    break;
                case 40:
                case 83:
                case 115:
                    i = "down"
            }
            if (i && !r.pressing[i]) {
                var s = w++;
                r.pressing[i] = true, t.emit("keydown", {
                    k: i,
                    t: s
                }), tagpro.ping.avg && setTimeout(function () {
                    d(r, i, s)
                }, tagpro.ping.avg / 2)
            }
        }
    }), $(document).keyup(function (e) {
        if (tagpro.disableControls || tagpro.spectator) return;
        if (b.indexOf(e.keyCode) > -1) {
            var r = n[f],
                i = null;
            switch (e.keyCode) {
                case 37:
                case 65:
                case 97:
                    i = "left";
                    break;
                case 38:
                case 87:
                case 119:
                    i = "up";
                    break;
                case 39:
                case 68:
                case 100:
                    i = "right";
                    break;
                case 40:
                case 83:
                case 115:
                    i = "down"
            }
            if (i) {
                var s = w++;
                r.pressing[i] = false, t.emit("keyup", {
                    k: i,
                    t: s
                }), tagpro.ping.avg && setTimeout(function () {
                    d(r, i, -s)
                }, tagpro.ping.avg / 2)
            }
        }
    }), zoomValues = [1, 20 / 15, 20 / 12, 2, 2.5, 20 / 6, 4], zoomCursor = 0;
    var x = false;
    tagpro.showOptions = function () {
        if (x) return;
        x = true;
        var e = $("div#options");
        e.find("#name").val(tagpro.players[tagpro.playerId].name), e.css({
            left: $(document.body).width() / 2 - e.width() / 2,
            top: $(document.body).height() / 2 - e.height() / 2
        });
        var t = function () {
            var r = e.find("tbody.stats"),
                i = r.find("tr.template"),
                s = [];
            r.find("tr").not(".template").remove();
            for (var o in n) s.push(n[o]);
            s.sort(function (e, t) {
                return t.score - e.score
            }), tagpro.events.sortPlayers && tagpro.events.sortPlayers.forEach(function (e) {
                e.sortPlayers(s)
            }), s.forEach(function (e) {
                var t = i.clone().removeClass("template").appendTo(r).find("td");
                t.eq(0).find(".scoreName").text(e.name).css("color", e.team == 1 ? "#FFB5BD" : "#CFCFFF").end().find(".scoreAuth").html(e.auth ? "&#x2713;" : "").end(), t.eq(1).text(e.score), t.eq(2).text(e["s-tags"]), t.eq(3).text(e["s-pops"]), t.eq(4).text(e["s-grabs"]), t.eq(5).text(e["s-drops"]), t.eq(6).text(tagpro.helpers.timeFromSeconds(e["s-hold"], true)), t.eq(7).text(e["s-captures"]), t.eq(8).text(tagpro.helpers.timeFromSeconds(e["s-prevent"], true)), t.eq(9).text(e["s-returns"]), t.eq(10).text(e["s-support"]), t.eq(11).text(e["points"] == null ? "-" : e.points), t.find("a.kick").attr("href", e.id)
            }), x && setTimeout(t, 1e3), tagpro.events.modifyScoreUI && tagpro.events.modifyScoreUI.forEach(function (e) {
                e.modifyScoreUI($("#options > table:first"))
            })
        };
        x && t(), e.show()
    };
    var T = $("div#kick");
    $("#switchButton").click(function (e) {
        e.preventDefault(), t.emit("switch")
    }), $(window).keydown(function (e) {
        e.which == 27 && e.preventDefault()
    }), $(document).keyup(function (e) {
        e.preventDefault();
        if ([27].indexOf(e.keyCode) > -1) {
            if (!x) {
                tagpro.showOptions();
                return
            }
            x = false, $("div#options").hide(), $("#name").blur()
        }
    });
    var N = function () {
        t.emit("name", $(this).val()), tagpro.group.socket && tagpro.group.socket.emit("name", $(this).val())
    };
    $("#name").keyup(N).change(N).focus(function () {
        tagpro.disableControls = true
    }).blur(function () {
            tagpro.disableControls = false
        }), $("select#preferredServer").change(function () {
        t.emit("preferredServer", $(this).val())
    }), t.on("preferredServer", function (e) {
        $("select#preferredServer").val(e)
    });
    var C = $("div#sendToPreferred"),
        L = null;
    t.on("sendPreferred", function (e) {
        C.find("span#preferredServer").text(e.name).end().css({
            left: $(document.body).width() / 2 - T.width() / 2,
            top: $(document.body).height() / 2 - T.height() / 2
        }).show();
        var t = 8,
            n = $("span#countdown"),
            r = function () {
                t--, n.text(t), t > 0 ? L = setTimeout(r, 1e3) : document.location = e.url + "games/find/?preferred=true"
            };
        r()
    }), $("a#sendToPreferredCancel").click(function (e) {
        e.preventDefault(), C.hide(), clearTimeout(L), $("select#preferredServer").val(""), t.emit("preferredServer", "")
    });
    var A = $("audio#music").get(0);
    A.volume = .5;
    if (e) {
        var O = [];
        setInterval(function () {
            if (f == null) return;
            O.forEach(function (e) {
                var t = $.Event("keyup");
                t.keyCode = e, $(document).trigger(t)
            }), O = [], O.push([37, 39][Math.floor(Math.random() * 2)]), O.push([38, 40][Math.floor(Math.random() * 2)]), O.forEach(function (e) {
                var t = $.Event("keydown");
                t.keyCode = e, $(document).trigger(t)
            })
        }, 3e3)
    }
    var M = [],
        _ = 0,
        D = 0,
        P = 0;
    setInterval(function () {
        var e = (new Date).getTime(),
            n = {
                sent: e,
                id: _++,
                time: null,
                lost: false
            };
        M.push(n), t.emit("p", {
            id: n.id,
            c: tagpro.ping.avg
        }), D++, M.length > 5 && M.shift();
        var r = 0,
            i = 0;
        M.forEach(function (t) {
            if (t.lost) return;
            if (t.time >= 1e3 || t.time == null && e - t.sent >= 1e3) {
                t.lost = true, P++;
                return
            }
            t.time != null && (r++, i += t.time)
        }), tagpro.ping.avg = Math.round(i / r) || 0, tagpro.ping.current = tagpro.ping.avg, tagpro.ping.loss = P / D
    }, 2e3), t.on("pr", function (e) {
        var t = (new Date).getTime(),
            n = M.filter(function (t) {
                return t.id == e && !t.lost
            });
        if (!n || !n.length) return;
        n = n[0], n.time = t - n.sent
    }), window.addEventListener("beforeunload", function () {
        g = true
    })
}), tagpro.ready(function () {
    function o() {
        if (!tagpro.ui.enabled) return;
        i.clearRect(0, 0, n.width, n.height);
        if (tagpro.settings.ui.matchState) {
            if (tagpro.gameEndsAt) {
                var e = tagpro.gameEndsAt - (new Date).getTime(),
                    t = "00" + Math.floor(e / 6e4),
                    o = "00" + Math.floor(e % 6e4 / 1e3),
                    u = t.substr(t.length - 2, 2) + ":" + o.substr(o.length - 2, 2);
                tagpro.state == 2 && (u = s), tagpro.ui.timer(i, r, n, u), s = u, u == "00:03" && (tagpro.state != 2 && tagpro.playSound("countdown", 1), tagpro.state == 3 && setTimeout(function () {
                    tagpro.playSound("cheering", 1)
                }, 3e3))
            }
            tagpro.ui.scores(i, r, n), tagpro.ui.flags(i, r, n)
        }
        tagpro.spectator && tagpro.settings.ui.spectatorInfo && tagpro.ui.spectatorInfo(i, r, n), tagpro.spectators && tagpro.settings.ui.spectatorInfo && tagpro.ui.spectators(i, r, n), i.textAlign = "left", tagpro.chat.update(i);
        if (tagpro.settings.ui.performanceInfo) {
            var a = Math.floor((tagpro.ping.loss || 0) * 100);
            tagpro.ui.performanceInfo(i, r, n, a)
        }
        tagpro.state == 2 ? tagpro.winner == "red" ? tagpro.ui.largeAlert(i, r, n, "Red Team Wins!", "#ff0000") : tagpro.winner == "blue" ? tagpro.ui.largeAlert(i, r, n, "Blue Team Wins!", "#0000ff") : tagpro.ui.largeAlert(i, r, n, "It's a tie!") : tagpro.state == 3 && tagpro.ui.largeAlert(i, r, n, "Match Begins Soon...")
    }
    var e = $("canvas"),
        t = $("<canvas></canvas>"),
        n = {
            width: 0,
            height: 0
        },
        r = {
            x: 0,
            y: 0
        },
        i = t.get(0).getContext("2d");
    tagpro.ui = {
        redFlagTaken: false,
        blueFlagTaken: false,
        yellowFlagTakenByRed: false,
        yellowFlagTakenByBlue: false,
        enabled: false
    }, tagpro.ui.resize = function () {
        n.width = e.width(), n.height = e.height(), r.x = n.width / 2, r.y = n.height / 2, t.attr("width", n.width).attr("height", n.height)
    }, tagpro.ui.draw = function (e) {
        e.drawImage(t.get(0), 0, 0)
    }, tagpro.ui.createPlayerCache = function (e) {
        e.cache = {
            canvas: $("<canvas></canvas>").attr("width", 125).attr("height", 35).get(0)
        }, e.degreeCache = {
            canvas: $("<canvas></canvas>").attr("width", 45).attr("height", 35).get(0)
        }, e.cache.context = e.cache.canvas.getContext("2d"), e.degreeCache.context = e.degreeCache.canvas.getContext("2d"), e.cache.update = function () {
            e.cache.context.clearRect(0, 0, 125, 35), e.degreeCache.context.clearRect(0, 0, 45, 35);
            var t = e.auth ? "#BFFF00" : "#ffffff";
            tagpro.settings.ui.names && tagpro.prettyText(e.name, 15, 15, t, false, false, e.cache.context), e.degree && tagpro.settings.ui.degrees && tagpro.prettyText(e.degree + "Â°", 20, 15, "#ffffff", false, false, e.degreeCache.context)
        }, e.cache.update()
    }, tagpro.ui.scores = function (e, t, n) {
        e.save(), e.textAlign = "center", e.fillStyle = "rgba(255, 0, 0, .5)", e.font = "bold 40pt Arial", e.fillText(tagpro.score.r, t.x - 120, n.height - 50), e.fillStyle = "rgba(0, 0, 255, .5)", e.fillText(tagpro.score.b, t.x + 120, n.height - 50), e.restore()
    }, tagpro.ui.flags = function (e, t, n) {
        tagpro.ui.redFlagTaken && (e.globalAlpha = .75, tagpro.tiles.draw(e, "redflag", {
            x: t.x + 80,
            y: n.height - 50
        }, 30, 30)), tagpro.ui.blueFlagTaken && (e.globalAlpha = .75, tagpro.tiles.draw(e, "blueflag", {
            x: t.x - 120,
            y: n.height - 50
        }, 30, 30)), tagpro.ui.yellowFlagTakenByRed && (e.globalAlpha = .75, tagpro.tiles.draw(e, "yellowflag", {
            x: t.x - 160,
            y: n.height - 50
        }, 30, 30)), tagpro.ui.yellowFlagTakenByBlue && (e.globalAlpha = .75, tagpro.tiles.draw(e, "yellowflag", {
            x: t.x + 120,
            y: n.height - 50
        }, 30, 30)), e.globalAlpha = 1
    }, tagpro.ui.timer = function (e, t, n, r) {
        e.save(), e.textAlign = "center", e.fillStyle = "rgba(255, 255, 255, 1)", e.strokeStyle = "#000000", e.lineWidth = 4, e.font = "bold 30pt Arial", e.strokeText(r, t.x, n.height - 25), e.fillText(r, t.x, n.height - 25), e.globalCompositeOperation = "destination-out", e.globalAlpha = .4, e.fillRect(0, 0, n.width, n.height), e.restore()
    }, tagpro.ui.spectatorInfo = function (e, t, n) {
        e.save(), e.textAlign = "center", e.fillStyle = "rgba(255, 255, 255, .6)", e.font = "bold 14pt Arial", e.fillText("You are spectating", t.x, 20), e.font = "bold 10pt Arial", e.fillText("auto-join is " + (tagpro.spectator == "waiting" ? "on" : "off"), t.x, 35), e.restore()
    }, tagpro.ui.spectators = function (e, t, n) {
        e.save(), e.textAlign = "center", e.fillStyle = "rgba(255, 255, 255, .6)", e.font = "bold 10pt Arial", e.fillText(tagpro.spectators + " spectators", t.x, n.height - 10), e.restore()
    }, tagpro.ui.performanceInfo = function (e, t, n, r) {
        tagpro.prettyText("FPS: " + tagpro.fps + ", Ping: " + tagpro.ping.avg + (r ? ", Loss: " + r + "%" : ""), 10, 10)
    }, tagpro.ui.largeAlert = function (e, t, n, r, i) {
        e.save(), e.textAlign = "center", e.font = "bold 48pt Arial", e.fillStyle = i || "#ffffff", e.strokeStyle = "#000000", e.fillText(r, t.x, 100), e.strokeText(r, t.x, 100), e.restore()
    }, tagpro.prettyText = function (text, x, y, fill, returnWidth, center, context) {
        context = context || i;
        context.font = "bold 8pt Arial";
        var a = null;
        if (returnWidth || center) {
            a = context.measureText(text).width;
        }
        if (center) {
            (x -= Math.round(a / 2));
        }
        context.save();
        context.fillStyle = fill || "#ffffff";
        context.strokeStyle = "#000000";
        context.shadowColor = "#000000";
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.lineWidth = 2;
        context.shadowBlur = 10;
        context.strokeText(text, x, y);
        context.shadowBlur = 0;
        context.fillText(text, x, y);
        context.restore();
        if (returnWidth) return a;
    };
    var s = "";
    setInterval(function () {
        o()
    }, 1e3)
}), tagpro.ready(function () {
    var e = $("div#kick"),
        t = $("canvas");
    tagpro.kick = {
        player: function (t) {
            e.find("#kickPlayer").text(" " + t.name).end().find("#kickSelect").attr("data-id", t.id).prop("selectedIndex", 0).end().css({
                left: $(document.body).width() / 2 - e.width() / 2,
                top: $(document.body).height() / 2 - e.height() / 2
            }).show()
        },
        clickBall: function (e) {
            var n, r = e.pageX - t.offset().left,
                i = e.pageY - t.offset().top,
                s = 40,
                o = null,
                u = -1;
            for (var a in tagpro.players) {
                var f = tagpro.players[a],
                    l = tagpro.helpers.toLockedPos({
                        x: f.x,
                        y: f.y
                    }),
                    c = l.x + 30,
                    h = l.y + 30,
                    p = Math.pow(c - r, 2) + Math.pow(h - i, 2);
                if (o === null || p < u) o = f, u = p
            }
            o && u < Math.pow(s, 2) && tagpro.kick.player(o)
        }
    }, $("tbody.stats").on("click", "a.kick", function (e) {
        e.preventDefault();
        var t = tagpro.players[parseInt($(this).attr("href"))];
        tagpro.kick.player(t)
    }), $("#kickSelect").change(function (t) {
        t.preventDefault(), e.hide(), tagpro.socket.emit("kick", {
            playerId: parseInt($(this).attr("data-id")),
            reason: parseInt($(this).val())
        })
    }), $("#kickCancelButton").click(function (t) {
        t.preventDefault(), e.hide()
    })
}), tagpro.ready(function () {
    function c(e) {
        var t = tagpro.settings.ui || {
            allChat: true,
            teamChat: true,
            groupChat: true,
            systemChat: true
        };
        if (!t.allChat && e.to == "all" && e.from) return;
        if (!t.teamChat && e.to == "team") return;
        if (!t.groupChat && e.to == "group") return;
        if (!t.systemChat && e.to == "all" && !e.from) return;
        e.removeAt = (new Date).getTime() + 3e4, a.push(e), a.length > 10 && a.shift()
    }
    function h(i, s) {
        e = true, tagpro.disableControls = true, t = i, n = s, r.val("").show().focus()
    }
    function p() {
        var e = r.val();
        if (e.length > 70 || e == "") {
            d();
            return
        }
        n ? tagpro.group.socket && tagpro.group.socket.emit("chat", e) : u.emit("chat", {
            toAll: !t,
            message: e
        }), d()
    }
    function d() {
        e = false, tagpro.disableControls = false, r.hide()
    }
    var e = false,
        t = false,
        n = false,
        r = $("input#chat"),
        i = $("canvas"),
        s = i.offset(),
        o = i.get(0).height,
        u = tagpro.socket,
        a = [],
        f = [],
        l = $("div#kick");
    $(document).keydown(function (t) {
        if ((t.keyCode == 13 || t.keyCode == 222 || t.keyCode == 84 || t.keyCode == 186 || t.keyCode == 71 || t.keyCode == 103 || t.keyCode == 116 && t.originalEvent.keyIdentifier != "F5") && !e) {
            if ($("#name").is(":focus")) return;
            h(t.keyCode == 222 || t.keyCode == 84 || t.keyCode == 116, t.keyCode == 186 || t.keyCode == 71 || t.keyCode == 103), t.preventDefault()
        } else t.keyCode == 13 && e && p()
    }), u.on("chat", c), tagpro.group.socket && tagpro.group.socket.on("chat", c), r.keydown(function (e) {
        [37, 38, 39, 40].indexOf(e.keyCode) >= 0 && e.preventDefault(), e.keyCode == 27 && d()
    }), tagpro.chat = {
        update: function (e) {
            var t = (new Date).getTime();
            a.forEach(function (e) {
                t > e.removeAt && a.shift()
            }), f = [], a.forEach(function (e, t) {
                var n = null,
                    r = null;
                typeof e.from == "number" ? n = tagpro.players[e.from] : typeof e.from == "string" && (n = {
                    name: e.from,
                    auth: false
                });
                var i = o - 175 + 12 * t,
                    s = 0;
                n && (n.team ? r = n.team == 1 ? "#FFB5BD" : "#CFCFFF" : e.to == "group" && (r = "#E7E700"), n.auth && (s += tagpro.prettyText("âœ“ ", 10, i, "#BFFF00", true)), s += tagpro.prettyText((n.name || "Some Ball") + ": ", 10 + s, i, r, true), f.push({
                    player: n,
                    xLeft: 10,
                    yTop: i,
                    xRight: 10 + s,
                    yBottom: i + 12
                })), e.to == "all" && (r = e.c || null), e.to == "group" && !e.from && (r = "#E7E700"), s += tagpro.prettyText(e.message, 10 + s, i, r, true)
            })
        }
    }, tagpro.chat.resize = function () {
        s = i.offset(), o = i.get(0).height, r.css({
            left: s.left + 20,
            top: s.top + o - 50
        })
    }, tagpro.chat.kick = function (e) {
        var t, n, r;
        n = e.pageX - i.offset().left, r = e.pageY - i.offset().top;
        for (t = 0; t < f.length; t++) {
            line = f[t];
            if (line.xLeft <= n && n <= line.xRight && line.yTop <= r && r <= line.yBottom) {
                var s = line.player;
                return tagpro.kick.player(s), false
            }
        }
        return true
    }
}), tagpro.ready(function () {
    function e(e, t, n) {
        var r = new Sprite($(e).get(0), 40, t, n),
            i = r.createAnimation("on", 0, 150);
        return i.createFrame(0), i.createFrame(1), i.createFrame(2), i.createFrame(3), i = r.createAnimation("off", 0, 1e3), i.createFrame(4), r
    }
    var t = e("img#speedpad", true, true),
        n = e("img#speedpadred", true, true),
        r = e("img#speedpadblue", true, true),
        i = e("img#portal", true, true);
    tagpro.tiles = {
        1: {},
        1.1: {
            drawFloor: [{
                x: 1,
                y: 0
            }, {
                x: 0,
                y: -1
            }]
        },
        1.2: {
            drawFloor: [{
                x: 1,
                y: 0
            }, {
                x: 0,
                y: 1
            }]
        },
        1.3: {
            drawFloor: [{
                x: -1,
                y: 0
            }, {
                x: 0,
                y: 1
            }]
        },
        1.4: {
            drawFloor: [{
                x: -1,
                y: 0
            }, {
                x: 0,
                y: -1
            }]
        },
        2: {
            x: 13,
            y: 4
        },
        16: {
            x: 13,
            y: 1,
            drawFloor: true,
            redrawFloor: true,
            isFlag: true
        },
        yellowflag: {
            x: 13,
            y: 1,
            isFlag: true
        },
        16.1: {
            x: 13,
            y: 2,
            drawFloor: true,
            redrawFloor: true
        },
        3: {
            x: 14,
            y: 1,
            drawFloor: true,
            redrawFloor: true,
            isFlag: true
        },
        redflag: {
            x: 14,
            y: 1,
            isFlag: true
        },
        3.1: {
            x: 14,
            y: 2,
            drawFloor: true,
            redrawFloor: true
        },
        4: {
            x: 15,
            y: 1,
            drawFloor: true,
            redrawFloor: true,
            isFlag: true
        },
        blueflag: {
            x: 15,
            y: 1,
            isFlag: true
        },
        4.1: {
            x: 15,
            y: 2,
            drawFloor: true,
            redrawFloor: true
        },
        5: t.createInstance("on"),
        5.1: t.createInstance("off"),
        14: n.createInstance("on"),
        14.1: n.createInstance("off"),
        15: r.createInstance("on"),
        15.1: r.createInstance("off"),
        6: {
            x: 12,
            y: 8,
            drawFloor: true,
            redrawFloor: true
        },
        6.1: {
            x: 12,
            y: 4,
            drawFloor: true,
            redrawFloor: true
        },
        grip: {
            x: 12,
            y: 4
        },
        6.2: {
            x: 12,
            y: 5,
            drawFloor: true,
            redrawFloor: true
        },
        bomb: {
            x: 12,
            y: 5
        },
        6.3: {
            x: 12,
            y: 6,
            drawFloor: true,
            redrawFloor: true
        },
        tagpro: {
            x: 12,
            y: 6
        },
        6.4: {
            x: 12,
            y: 7,
            drawFloor: true,
            redrawFloor: true
        },
        speed: {
            x: 12,
            y: 7
        },
        17: {
            x: 14,
            y: 5
        },
        18: {
            x: 15,
            y: 5
        },
        7: {
            x: 12,
            y: 0,
            drawFloor: true,
            redrawFloor: false
        },
        redball: {
            x: 14,
            y: 0
        },
        blueball: {
            x: 15,
            y: 0
        },
        8: {
            x: 13,
            y: 6,
            drawFloor: true,
            redrawFloor: false
        },
        9: {
            x: 12,
            y: 3
        },
        9.1: {
            x: 13,
            y: 3
        },
        9.2: {
            x: 14,
            y: 3
        },
        9.3: {
            x: 15,
            y: 3
        },
        10: {
            x: 12,
            y: 1,
            drawFloor: true,
            redrawFloor: true
        },
        10.1: {
            x: 12,
            y: 2,
            drawFloor: true,
            redrawFloor: true
        },
        11: {
            x: 14,
            y: 4
        },
        12: {
            x: 15,
            y: 4
        },
        marsball: {
            x: 12,
            y: 9,
            size: 80
        },
        13: i.createInstance("on"),
        13.1: i.createInstance("off"),
        "1.310": {
            x: 10.5,
            y: 7.5,
            size: 20
        },
        "1.410": {
            x: 11,
            y: 7.5,
            size: 20
        },
        "1.110": {
            x: 11,
            y: 8,
            size: 20
        },
        "1.210": {
            x: 10.5,
            y: 8,
            size: 20
        },
        "1.310d": {
            x: .5,
            y: 3.5,
            size: 20
        },
        "1.410d": {
            x: 1,
            y: 3.5,
            size: 20
        },
        "1.210d": {
            x: .5,
            y: 4,
            size: 20
        },
        1.321: {
            x: 4.5,
            y: 9.5,
            size: 20
        },
        1.421: {
            x: 5,
            y: 9.5,
            size: 20
        },
        1.121: {
            x: 5,
            y: 10,
            size: 20
        },
        1.221: {
            x: 4.5,
            y: 10,
            size: 20
        },
        "1.321d": {
            x: 1.5,
            y: 2.5,
            size: 20
        },
        "1.421d": {
            x: 2,
            y: 2.5,
            size: 20
        },
        "1.221d": {
            x: 1.5,
            y: 3,
            size: 20
        },
        1.332: {
            x: 6.5,
            y: 9.5,
            size: 20
        },
        1.432: {
            x: 7,
            y: 9.5,
            size: 20
        },
        1.132: {
            x: 7,
            y: 10,
            size: 20
        },
        1.232: {
            x: 6.5,
            y: 10,
            size: 20
        },
        "1.332d": {
            x: 9.5,
            y: 2.5,
            size: 20
        },
        "1.432d": {
            x: 10,
            y: 2.5,
            size: 20
        },
        "1.132d": {
            x: 10,
            y: 3,
            size: 20
        },
        1.343: {
            x: .5,
            y: 7.5,
            size: 20
        },
        1.443: {
            x: 1,
            y: 7.5,
            size: 20
        },
        1.143: {
            x: 1,
            y: 8,
            size: 20
        },
        1.243: {
            x: .5,
            y: 8,
            size: 20
        },
        "1.343d": {
            x: 10.5,
            y: 3.5,
            size: 20
        },
        "1.443d": {
            x: 11,
            y: 3.5,
            size: 20
        },
        "1.143d": {
            x: 11,
            y: 4,
            size: 20
        },
        1.354: {
            x: 1.5,
            y: 6.5,
            size: 20
        },
        1.454: {
            x: 2,
            y: 6.5,
            size: 20
        },
        1.154: {
            x: 2,
            y: 7,
            size: 20
        },
        1.254: {
            x: 1.5,
            y: 7,
            size: 20
        },
        "1.454d": {
            x: 9,
            y: 1.5,
            size: 20
        },
        "1.154d": {
            x: 9,
            y: 2,
            size: 20
        },
        "1.254d": {
            x: 8.5,
            y: 2,
            size: 20
        },
        1.365: {
            x: 6.5,
            y: 8.5,
            size: 20
        },
        1.465: {
            x: 7,
            y: 8.5,
            size: 20
        },
        1.165: {
            x: 7,
            y: 9,
            size: 20
        },
        1.265: {
            x: 6.5,
            y: 9,
            size: 20
        },
        "1.465d": {
            x: 11,
            y: 1.5,
            size: 20
        },
        "1.165d": {
            x: 11,
            y: 2,
            size: 20
        },
        "1.265d": {
            x: 10.5,
            y: 2,
            size: 20
        },
        1.376: {
            x: 4.5,
            y: 8.5,
            size: 20
        },
        1.476: {
            x: 5,
            y: 8.5,
            size: 20
        },
        1.176: {
            x: 5,
            y: 9,
            size: 20
        },
        1.276: {
            x: 4.5,
            y: 9,
            size: 20
        },
        "1.376d": {
            x: .5,
            y: 1.5,
            size: 20
        },
        "1.176d": {
            x: 1,
            y: 2,
            size: 20
        },
        "1.276d": {
            x: .5,
            y: 2,
            size: 20
        },
        1.307: {
            x: 9.5,
            y: 6.5,
            size: 20
        },
        1.407: {
            x: 10,
            y: 6.5,
            size: 20
        },
        1.107: {
            x: 10,
            y: 7,
            size: 20
        },
        1.207: {
            x: 9.5,
            y: 7,
            size: 20
        },
        "1.307d": {
            x: 2.5,
            y: 1.5,
            size: 20
        },
        "1.107d": {
            x: 3,
            y: 2,
            size: 20
        },
        "1.207d": {
            x: 2.5,
            y: 2,
            size: 20
        },
        "1.320": {
            x: 1.5,
            y: 7.5,
            size: 20
        },
        "1.420": {
            x: 2,
            y: 7.5,
            size: 20
        },
        "1.220": {
            x: 1.5,
            y: 8,
            size: 20
        },
        "1.320d": {
            x: 10.5,
            y: .5,
            size: 20
        },
        "1.420d": {
            x: 11,
            y: .5,
            size: 20
        },
        "1.220d": {
            x: 10.5,
            y: 1,
            size: 20
        },
        1.331: {
            x: 5.5,
            y: 6.5,
            size: 20
        },
        1.431: {
            x: 6,
            y: 6.5,
            size: 20
        },
        1.131: {
            x: 6,
            y: 7,
            size: 20
        },
        1.231: {
            x: 5.5,
            y: 7,
            size: 20
        },
        "1.331d": {
            x: 5.5,
            y: .5,
            size: 20
        },
        "1.431d": {
            x: 6,
            y: .5,
            size: 20
        },
        1.342: {
            x: 9.5,
            y: 7.5,
            size: 20
        },
        1.442: {
            x: 10,
            y: 7.5,
            size: 20
        },
        1.142: {
            x: 10,
            y: 8,
            size: 20
        },
        "1.342d": {
            x: .5,
            y: .5,
            size: 20
        },
        "1.442d": {
            x: 1,
            y: .5,
            size: 20
        },
        "1.142d": {
            x: 1,
            y: 1,
            size: 20
        },
        1.353: {
            x: 4.5,
            y: 5.5,
            size: 20
        },
        1.453: {
            x: 5,
            y: 5.5,
            size: 20
        },
        1.153: {
            x: 5,
            y: 6,
            size: 20
        },
        1.253: {
            x: 4.5,
            y: 6,
            size: 20
        },
        "1.453d": {
            x: 7,
            y: 1.5,
            size: 20
        },
        "1.153d": {
            x: 7,
            y: 2,
            size: 20
        },
        1.464: {
            x: 4,
            y: 9.5,
            size: 20
        },
        1.164: {
            x: 4,
            y: 10,
            size: 20
        },
        1.264: {
            x: 3.5,
            y: 10,
            size: 20
        },
        "1.464d": {
            x: 2,
            y: 3.5,
            size: 20
        },
        "1.164d": {
            x: 2,
            y: 4,
            size: 20
        },
        "1.264d": {
            x: 1.5,
            y: 4,
            size: 20
        },
        1.375: {
            x: 5.5,
            y: 2.5,
            size: 20
        },
        1.475: {
            x: 6,
            y: 2.5,
            size: 20
        },
        1.175: {
            x: 6,
            y: 4,
            size: 20
        },
        1.275: {
            x: 5.5,
            y: 4,
            size: 20
        },
        "1.175d": {
            x: 6,
            y: 3,
            size: 20
        },
        "1.275d": {
            x: 5.5,
            y: 3,
            size: 20
        },
        1.306: {
            x: 7.5,
            y: 9.5,
            size: 20
        },
        1.106: {
            x: 8,
            y: 10,
            size: 20
        },
        1.206: {
            x: 7.5,
            y: 10,
            size: 20
        },
        "1.306d": {
            x: 9.5,
            y: 3.5,
            size: 20
        },
        "1.106d": {
            x: 10,
            y: 4,
            size: 20
        },
        "1.206d": {
            x: 9.5,
            y: 4,
            size: 20
        },
        1.317: {
            x: 6.5,
            y: 5.5,
            size: 20
        },
        1.417: {
            x: 7,
            y: 5.5,
            size: 20
        },
        1.117: {
            x: 7,
            y: 6,
            size: 20
        },
        1.217: {
            x: 6.5,
            y: 6,
            size: 20
        },
        "1.317d": {
            x: 4.5,
            y: 1.5,
            size: 20
        },
        "1.217d": {
            x: 4.5,
            y: 2,
            size: 20
        },
        1.327: {
            x: 7.5,
            y: 8.5,
            size: 20
        },
        1.427: {
            x: 8,
            y: 8.5,
            size: 20
        },
        1.101: {
            x: 4,
            y: 5,
            size: 20
        },
        1.227: {
            x: 7.5,
            y: 9,
            size: 20
        },
        "1.327d": {
            x: 8.5,
            y: 3.5,
            size: 20
        },
        "1.227d": {
            x: 8.5,
            y: 4,
            size: 20
        },
        "1.330": {
            x: 8.5,
            y: 7.5,
            size: 20
        },
        "1.430": {
            x: 9,
            y: 7.5,
            size: 20
        },
        1.112: {
            x: 2,
            y: 0,
            size: 20
        },
        "1.230": {
            x: 8.5,
            y: 8,
            size: 20
        },
        "1.330d": {
            x: 3.5,
            y: .5,
            size: 20
        },
        "1.430d": {
            x: 4,
            y: .5,
            size: 20
        },
        1.341: {
            x: 2.5,
            y: 7.5,
            size: 20
        },
        1.441: {
            x: 3,
            y: 7.5,
            size: 20
        },
        1.141: {
            x: 3,
            y: 8,
            size: 20
        },
        1.223: {
            x: 9.5,
            y: 0,
            size: 20
        },
        "1.341d": {
            x: 7.5,
            y: .5,
            size: 20
        },
        "1.441d": {
            x: 8,
            y: .5,
            size: 20
        },
        1.352: {
            x: 3.5,
            y: 8.5,
            size: 20
        },
        1.452: {
            x: 4,
            y: 8.5,
            size: 20
        },
        1.152: {
            x: 4,
            y: 9,
            size: 20
        },
        1.234: {
            x: 7.5,
            y: 5,
            size: 20
        },
        "1.452d": {
            x: 3,
            y: 3.5,
            size: 20
        },
        "1.152d": {
            x: 3,
            y: 4,
            size: 20
        },
        1.345: {
            x: 7.5,
            y: 6.5,
            size: 20
        },
        1.463: {
            x: 10,
            y: 8.5,
            size: 20
        },
        1.163: {
            x: 10,
            y: 9,
            size: 20
        },
        1.263: {
            x: 9.5,
            y: 9,
            size: 20
        },
        "1.463d": {
            x: 2,
            y: .5,
            size: 20
        },
        "1.163d": {
            x: 2,
            y: 1,
            size: 20
        },
        1.356: {
            x: 6.5,
            y: 7.5,
            size: 20
        },
        1.474: {
            x: 9,
            y: 9.5,
            size: 20
        },
        1.174: {
            x: 9,
            y: 10,
            size: 20
        },
        1.274: {
            x: 8.5,
            y: 10,
            size: 20
        },
        "1.174d": {
            x: 10,
            y: 5,
            size: 20
        },
        "1.274d": {
            x: 9.5,
            y: 5,
            size: 20
        },
        1.305: {
            x: 2.5,
            y: 9.5,
            size: 20
        },
        1.467: {
            x: 5,
            y: 7.5,
            size: 20
        },
        1.105: {
            x: 3,
            y: 10,
            size: 20
        },
        1.205: {
            x: 2.5,
            y: 10,
            size: 20
        },
        "1.105d": {
            x: 2,
            y: 5,
            size: 20
        },
        "1.205d": {
            x: 1.5,
            y: 5,
            size: 20
        },
        1.316: {
            x: 1.5,
            y: 8.5,
            size: 20
        },
        "1.470": {
            x: 4,
            y: 6.5,
            size: 20
        },
        1.116: {
            x: 2,
            y: 9,
            size: 20
        },
        1.216: {
            x: 1.5,
            y: 9,
            size: 20
        },
        "1.316d": {
            x: 9.5,
            y: .5,
            size: 20
        },
        "1.216d": {
            x: 9.5,
            y: 1,
            size: 20
        },
        1.337: {
            x: 10.5,
            y: 9.5,
            size: 20
        },
        1.437: {
            x: 11,
            y: 9.5,
            size: 20
        },
        1.102: {
            x: 0,
            y: 7,
            size: 20
        },
        1.237: {
            x: 10.5,
            y: 10,
            size: 20
        },
        "1.337d": {
            x: 10.5,
            y: 4.5,
            size: 20
        },
        "1.102d": {
            x: 0,
            y: 0,
            size: 20
        },
        "1.340": {
            x: 8.5,
            y: 10.5,
            size: 20
        },
        "1.440": {
            x: 9,
            y: 10.5,
            size: 20
        },
        1.113: {
            x: 6,
            y: 8,
            size: 20
        },
        1.213: {
            x: 5.5,
            y: 8,
            size: 20
        },
        "1.340d": {
            x: 3.5,
            y: 2.5,
            size: 20
        },
        "1.440d": {
            x: 8,
            y: 2.5,
            size: 20
        },
        1.351: {
            x: .5,
            y: 9.5,
            size: 20
        },
        1.451: {
            x: 1,
            y: 9.5,
            size: 20
        },
        1.151: {
            x: 1,
            y: 10,
            size: 20
        },
        1.224: {
            x: 11.5,
            y: 7,
            size: 20
        },
        "1.224d": {
            x: 11.5,
            y: 0,
            size: 20
        },
        "1.451d": {
            x: 1,
            y: 4.5,
            size: 20
        },
        1.335: {
            x: 11.5,
            y: 8.5,
            size: 20
        },
        1.462: {
            x: 0,
            y: 5.5,
            size: 20
        },
        1.162: {
            x: 0,
            y: 5,
            size: 20
        },
        1.235: {
            x: 11.5,
            y: 9,
            size: 20
        },
        "1.462d": {
            x: 0,
            y: 4.5,
            size: 20
        },
        "1.162d": {
            x: 0,
            y: 6,
            size: 20
        },
        1.346: {
            x: 11.5,
            y: 7.5,
            size: 20
        },
        1.473: {
            x: 8,
            y: 6.5,
            size: 20
        },
        1.173: {
            x: 8,
            y: 7,
            size: 20
        },
        1.273: {
            x: 7.5,
            y: 7,
            size: 20
        },
        "1.346d": {
            x: 2.5,
            y: 4.5,
            size: 20
        },
        "1.173d": {
            x: 9,
            y: 3,
            size: 20
        },
        1.357: {
            x: 5.5,
            y: 10.5,
            size: 20
        },
        1.457: {
            x: 6,
            y: 10.5,
            size: 20
        },
        1.104: {
            x: 6,
            y: 5,
            size: 20
        },
        1.204: {
            x: 5.5,
            y: 5,
            size: 20
        },
        "1.104d": {
            x: 7,
            y: 5,
            size: 20
        },
        "1.204d": {
            x: 4.5,
            y: 5,
            size: 20
        },
        1.315: {
            x: 3.5,
            y: 6.5,
            size: 20
        },
        "1.460": {
            x: 0,
            y: 7.5,
            size: 20
        },
        1.115: {
            x: 4,
            y: 7,
            size: 20
        },
        1.215: {
            x: 3.5,
            y: 7,
            size: 20
        },
        "1.460d": {
            x: 9,
            y: 4.5,
            size: 20
        },
        "1.215d": {
            x: 2.5,
            y: 3,
            size: 20
        },
        1.326: {
            x: 11.5,
            y: 5.5,
            size: 20
        },
        1.471: {
            x: 0,
            y: 8.5,
            size: 20
        },
        1.171: {
            x: 0,
            y: 9,
            size: 20
        },
        1.226: {
            x: 11.5,
            y: 5,
            size: 20
        },
        "1.326d": {
            x: 11.5,
            y: 4.5,
            size: 20
        },
        "1.226d": {
            x: 11.5,
            y: 6,
            size: 20
        },
        1.347: {
            x: 9.5,
            y: 10.5,
            size: 20
        },
        1.447: {
            x: 10,
            y: 10.5,
            size: 20
        },
        1.103: {
            x: 9,
            y: 6,
            size: 20
        },
        1.203: {
            x: 8.5,
            y: 6,
            size: 20
        },
        "1.347d": {
            x: 3.5,
            y: 1.5,
            size: 20
        },
        "1.103d": {
            x: 4,
            y: 1,
            size: 20
        },
        "1.350": {
            x: 1.5,
            y: 10.5,
            size: 20
        },
        "1.450": {
            x: 2,
            y: 10.5,
            size: 20
        },
        1.114: {
            x: 3,
            y: 6,
            size: 20
        },
        1.214: {
            x: 2.5,
            y: 6,
            size: 20
        },
        "1.214d": {
            x: 7.5,
            y: 1,
            size: 20
        },
        "1.450d": {
            x: 8,
            y: 1.5,
            size: 20
        },
        1.325: {
            x: 4.5,
            y: 7.5,
            size: 20
        },
        1.461: {
            x: 4,
            y: 3.5,
            size: 20
        },
        1.161: {
            x: 4,
            y: 4,
            size: 20
        },
        1.225: {
            x: 4.5,
            y: 8,
            size: 20
        },
        "1.225d": {
            x: 8.5,
            y: 5,
            size: 20
        },
        "1.461d": {
            x: 8,
            y: 4.5,
            size: 20
        },
        1.336: {
            x: 7.5,
            y: 3.5,
            size: 20
        },
        1.472: {
            x: 7,
            y: 7.5,
            size: 20
        },
        1.172: {
            x: 7,
            y: 8,
            size: 20
        },
        1.236: {
            x: 7.5,
            y: 4,
            size: 20
        },
        "1.336d": {
            x: 3.5,
            y: 4.5,
            size: 20
        },
        "1.172d": {
            x: 3,
            y: 5,
            size: 20
        },
        "1.300": {
            x: 5.5,
            y: 5.5,
            size: 20
        },
        "1.400": {
            x: 6,
            y: 5.5,
            size: 20
        },
        "1.100": {
            x: 6,
            y: 6,
            size: 20
        },
        "1.200": {
            x: 5.5,
            y: 6,
            size: 20
        },
        "1.300d": {
            x: 5.5,
            y: 8.5,
            size: 20
        },
        "1.400d": {
            x: 6,
            y: 8.5,
            size: 20
        },
        "1.100d": {
            x: 6,
            y: 10,
            size: 20
        },
        "1.200d": {
            x: 5.5,
            y: 10,
            size: 20
        }
    }, tagpro.tiles.image = $("img#tiles").get(0);
    var s = [],
        o = [];
    tagpro.tiles.drawNext = function () {
        while (o.length) o.pop()()
    }, this.firstLoad = false, tagpro.tiles.drawWithZoom = function (e, t, n, r, i, s) {
        return tagpro.tiles.draw(e, t, n, r, i, s, true)
    }, tagpro.tiles.draw = function (e, t, n, r, i, u, a) {
        a = a || false;
        var f = tagpro.tiles[t];
        if (!f) return;
        r = r || 40, i = i || 40;
        if (f.draw) {
            var l = n.x + "," + n.y,
                c = s[l];
            c ? c.tile = f : s[l] = {
                tile: f,
                context: e,
                pos: {
                    x: n.x,
                    y: n.y
                }
            }
        } else {
            var h = f.spread || 0,
                p = (f.size || r) * (a ? 1 / tagpro.zoom : 1),
                d = (f.size || i) * (a ? 1 / tagpro.zoom : 1),
                v = function () {
                    u != undefined && (e.globalAlpha = u), f.isFlag && tagpro.events.drawFlag ? tagpro.events.drawFlag.forEach(function (t) {
                        t.drawFlag(e, n, p, d)
                    }) : e.drawImage(tagpro.tiles.image, f.x * 40 - h, f.y * 40 - h, (f.size || 40) + h * 2, (f.size || 40) + h * 2, n.x - h, n.y - h, p + h * 2, d + h * 2), e.globalAlpha = 1
                };
            h ? (o.push(v), n = {
                x: n.x,
                y: n.y
            }) : v()
        }
    }, tagpro.tiles.drawLayers = function (e, t, n, r) {
        tagpro.floorMap[t][n] && (tagpro.tiles.firstLoad || tagpro.tiles[tagpro.map[t][n]] && tagpro.tiles[tagpro.map[t][n]].redrawFloor) && tagpro.tiles.draw(e, tagpro.floorMap[t][n], r), Math.floor(tagpro.map[t][n]) == 1 ? (tagpro.tiles.draw(e, tagpro.wallMap[t][n][0], r, 20, 20), tagpro.tiles.draw(e, tagpro.wallMap[t][n][1], {
            x: r.x + 20,
            y: r.y
        }, 20, 20), tagpro.tiles.draw(e, tagpro.wallMap[t][n][2], {
            x: r.x + 20,
            y: r.y + 20
        }, 20, 20), tagpro.tiles.draw(e, tagpro.wallMap[t][n][3], {
            x: r.x,
            y: r.y + 20
        }, 20, 20)) : tagpro.tiles.draw(e, tagpro.map[t][n], r)
    }, tagpro.tiles.update = function () {
        for (var e in s) {
            var t = s[e];
            t.tile.draw(t.context, t.pos.x, t.pos.y)
        }
    }
}), tagpro.ready(function () {
    var e = $("#flair").get(0);
    tagpro.flair = new function () {
        this.draw = function (t, n, r) {
            t.drawImage(e, r.x * 16, r.y * 16, 16, 16, n.x + 12, n.y - 17, 16, 16)
        }
    }
}), tagpro.ready(function () {
    function l() {
        var n = $("html"),
            i = n.width(),
            s = n.height();
        i > e && (i = e), s > t && (s = t);
        var o = Math.round(i * t / e),
            f = 0;
        o > s ? (f = Math.round(s * e / t), o = s) : f = i, r.attr("width", f).attr("height", o).css({
            "margin-left": (n.width() - f) / 2,
            "margin-top": (n.height() - o) / 2
        }), u.width = f, u.height = o, a.x = Math.round(u.width / 2), a.y = Math.round(u.height / 2), tagpro.ui.resize(), tagpro.chat.resize()
    }
    function p() {
        if (!tagpro.map || !$("img#tiles").width()) {
            setTimeout(p, 0);
            return
        }
        h = tagpro.map, i.attr("width", h.length * n).attr("height", h[0].length * n);
        var e = {
            x: 0,
            y: 0
        };
        try {
            tagpro.tiles.firstLoad = true;
            for (var t = 0, s = h.length; t != s; t++) {
                e.x = t * n;
                for (var o = 0, u = h[0].length; o != u; o++) e.y = o * n, tagpro.tiles.drawLayers(c, t, o, e)
            }
            tagpro.tiles.firstLoad = false, tagpro.tiles.drawNext();
            if (h.splats) for (var a = 0, l = h.splats.length; a != l; a++) v(h.splats[a])
        } catch (d) {
            console.error("error drawing background. retrying..."), setTimeout(p, 0);
            return
        }
        delete h.splats, f = true, tagpro.ui.enabled = true, setTimeout(function () {
            $("#loadingMessage").fadeOut(100), r.fadeIn(250, function () {
                tagpro.chat.resize()
            })
        })
    }
    function y() {
        g.frames++;
        if (g.frames % 60 == 0) {
            var e = (new Date).getTime(),
                t = (e - g.start) / 1e3,
                n = g.frames - g.lastCheck;
            g.lastCheck = g.frames, g.last = Math.round(n / t), g.start = (new Date).getTime()
        }
        tagpro.fps = g.last
    }
    // add splat /bomb explosion
    function w(player, startRadius, endRadius, i) {
        startRadius = startRadius || 40, endRadius = endRadius || 120;
        var s = {
            x: player.x + n / 2,
            y: player.y + n / 2,
            team: player.t == 1 ? "redball" : "blueball",
            length: Math.round((tagpro.fps || 60) / 10),
            frame: 0,
            update: function () {
                this.frame++;
                var e = startRadius + (endRadius - startRadius) * (this.frame / this.length),
                    n = 1 - this.frame / this.length;
                if (i) {
                    var s = x({
                        x: this.x,
                        y: this.y
                    });
                    o.fillStyle = i, o.globalAlpha = n, o.beginPath(), o.arc(s.x, s.y, Math.round(e / tagpro.zoom), 0, Math.PI * 2, true), o.closePath(), o.fill(), o.globalAlpha = 1
                } else {
                    var s = x({
                        x: this.x - e / 2,
                        y: this.y - e / 2
                    });
                    tagpro.tiles.drawWithZoom(o, this.team, s, e, e, n)
                }
                this.frame >= this.length && b.splice(b.indexOf(this), 1)
            }
        };
        b.push(s)
    }
    function S() {
        var e = n / 2;
        E.left = Math.round(tagpro.viewPort.source.x / tagpro.zoom) * tagpro.zoom - a.x * tagpro.zoom + e,
            E.top = Math.round(tagpro.viewPort.source.y / tagpro.zoom) * tagpro.zoom - a.y * tagpro.zoom + e,
            E.right = Math.round(tagpro.viewPort.source.x / tagpro.zoom) * tagpro.zoom + a.x * tagpro.zoom + e,
            E.bottom = Math.round(tagpro.viewPort.source.y / tagpro.zoom) * tagpro.zoom + a.y * tagpro.zoom + e,
            E.leftClip = 0, E.topClip = 0, E.rightClip = 0, E.bottomClip = 0,
            E.left < 0 && (E.leftClip = -E.left),
            E.top < 0 && (E.topClip = -E.top),
            E.right > c.canvas.width && (E.rightClip = E.right - c.canvas.width),
            E.bottom > c.canvas.height && (E.bottomClip = E.bottom - c.canvas.height)
    }
    function x(e) {
        return {
            x: Math.round(e.x * (1 / tagpro.zoom)) - Math.round(E.left * (1 / tagpro.zoom)),
            y: Math.round(e.y * (1 / tagpro.zoom)) - Math.round(E.top * (1 / tagpro.zoom))
        }
    }
    function T(e) {
        return e.x < -n || e.x > u.width ? false : e.y < -n || e.y > u.height ? false : true
    }
    function drawMarsBall() {
        for (var e in tagpro.objects) {
            var t = tagpro.objects[e];
            tagpro.spectator && (t.draw = true);
            if (!t.draw) continue;
            var n = x({
                x: t.x - 20,
                y: t.y - 20
            });
            o.fillStyle = "orange";
            o.beginPath();
            tagpro.tiles.drawWithZoom(o, "marsball", n);
            o.closePath();
            o.fill();
        }
    }
    function drawPlayers() {
        var e = (new Date).getTime();
        tagpro.ui.blueFlagTaken = false;
        tagpro.ui.redFlagTaken = false;
        tagpro.ui.yellowFlagTakenByRed = false;
        tagpro.ui.yellowFlagTakenByBlue = false;
        // draw respawning player
        N.forEach(function (e) {
            var t = x(e);
            if (!T(t)) return false;
            if (tagpro.events.drawDeadPlayer) {
                tagpro.events.drawDeadPlayer.forEach(function (r) {
                    r.drawDeadPlayer(e, o, t, n)
                });
            } else {
                o.globalAlpha = .25;
                tagpro.tiles.drawWithZoom(o, e.t == 1 ? "redball" : "blueball", t);
            }
        });
        for (var t in tagpro.players) {
            var r = tagpro.players[t];
            if (r.dead) continue;
            r.flag && (tagpro.ui.blueFlagTaken = tagpro.ui.blueFlagTaken || r.flag == 2, tagpro.ui.redFlagTaken = tagpro.ui.redFlagTaken || r.flag == 1, tagpro.ui.yellowFlagTakenByRed = tagpro.ui.yellowFlagTakenByRed || r.team == 1 && r.flag == 3, tagpro.ui.yellowFlagTakenByBlue = tagpro.ui.yellowFlagTakenByBlue || r.team == 2 && r.flag == 3), tagpro.spectator && (r.draw = true);
            if (!tagpro.spectator && !r.draw) continue;
            var i = {
                x: r.x,
                y: r.y
            };
            i = x(i);
            if (!T(i)) continue;
            if (tagpro.events.drawPlayer) {
                tagpro.events.drawPlayer.forEach(function (e) {
                    e.drawPlayer(r, o, i, n)
                });
            } else {
                tagpro.tiles.drawWithZoom(o, r.team == 1 ? "redball" : "blueball", i); r.bomb && Math.round(Math.random() * 4) == 1 && (o.fillStyle = "rgba(255, 255, 0, .50)", o.beginPath(), o.arc(i.x + n / 2 * (1 / tagpro.zoom), i.y + n / 2 * (1 / tagpro.zoom), 20 * (1 / tagpro.zoom), 0, Math.PI * 2, true), o.closePath(), o.fill()), r.tagpro && (o.strokeStyle = "#00FF00", o.fillStyle = "rgba(0, 255, 0, .25)", o.lineWidth = 3 * (1 / tagpro.zoom), o.beginPath(), o.arc(i.x + n / 2 * (1 / tagpro.zoom), i.y + n / 2 * (1 / tagpro.zoom), 20 * (1 / tagpro.zoom), 0, Math.PI * 2, true), o.closePath(), r.bomb || o.fill(), o.stroke());
            }
            if (r.flag) {
                var s;
                r.flag == 1 ? s = "redflag" : r.flag == 2 ? s = "blueflag" : r.flag == 3 && (s = "yellowflag"), tagpro.tiles.drawWithZoom(o, s, {
                    x: i.x + Math.round(13 * (1 / tagpro.zoom)),
                    y: i.y - Math.round(32 * (1 / tagpro.zoom))
                })
            }
            r.speed && tagpro.tiles.drawWithZoom(o, "speed", {
                x: i.x,
                y: i.y
            }, 15, 15), r.grip && tagpro.tiles.drawWithZoom(o, "grip", {
                x: i.x,
                y: i.y + Math.round(25 * (1 / tagpro.zoom))
            }, 15, 15)
        }
        for (var t in tagpro.players) {
            var r = tagpro.players[t];
            if (r.dead || !r.name || !r.draw) continue;
            var i = x({
                x: r.x,
                y: r.y
            });
            tagpro.zoom <= 1.5 && o.drawImage(r.degreeCache.canvas, i.x + 20 * (1 / tagpro.zoom), i.y - Math.round(8 * (1 / tagpro.zoom)));
            tagpro.zoom <= 4 && o.drawImage(r.cache.canvas, i.x + Math.round(18 * (1 / tagpro.zoom)), i.y - 20 * (1 / tagpro.zoom));
            r.flair && tagpro.zoom <= 1 && tagpro.flair.draw(o, i, r.flair);
        }
    }
    function A() {
        while (L.length) {
            var e = L.pop(),
                t = x({
                    x: e.x,
                    y: e.y
                });
            if (!T(t)) continue;
            o.fillStyle = e.c == 1 ? "#FF0000" : "#0000FF", o.beginPath(), o.arc(t.x, t.y, 6, 0, Math.PI * 2, true), o.closePath(), o.fill()
        }
    }
    function O() {
        tagpro.ui.draw(o)
    }
    function D() {
        M(D);
        tagpro.viewPort.followPlayer && (tagpro.viewPort.source = tagpro.players[tagpro.playerId]);
        if (!f || !tagpro.viewPort.source) return;
        tagpro.world.update();
        o.clearRect(0, 0, u.width, u.height);
        S();
        tagpro.tiles.update();
        if (tagpro.viewPort.source.x == -1e3) return;
        o.drawImage(
            c.canvas,
            E.left + E.leftClip,
            E.top + E.topClip,
            E.right - E.rightClip - (E.left + E.leftClip),
            E.bottom - E.bottomClip - (E.top + E.topClip),
            E.leftClip * (1 / tagpro.zoom), E.topClip * (1 / tagpro.zoom),
            (E.right - E.rightClip - (E.left + E.leftClip)) * (1 / tagpro.zoom),
            (E.bottom - E.bottomClip - (E.top + E.topClip)) * (1 / tagpro.zoom)
        );
        drawMarsBall();
        drawPlayers();
        y();
        A();
        b.forEach(function (e) {
            e.update()
        });
        O()
    }
    var e = 1280,
        t = 800,
        n = 40,
        r = $("canvas"),
        i = $("<canvas>"),
        s = null,
        o = r[0].getContext("2d"),
        u = {
            width: 0,
            height: 0
        },
        a = {
            x: 0,
            y: 0
        },
        f = false;
    $(window).resize(function () {
        s && clearTimeout(s), s = setTimeout(function () {
            s = null, l()
        }, 1e3)
    }), l();
    var c = i[0].getContext("2d"),
        h = null;
    tagpro.api.backgroundContext = c, tagpro.api.redrawBackground = p, tagpro.socket.on("mapupdate", function (e) {
        if (!h) return;
        Array.isArray(e) || (e = [e]);
        for (var t = 0, r = e.length; t != r; t++) {
            var i = e[t];
            h[i.x][i.y] = i.v, tagpro.tiles.drawLayers(c, i.x, i.y, {
                x: i.x * n,
                y: i.y * n
            }), tagpro.tiles.drawNext()
        }
    });
    var d = $("img#splats").get(0),
        v = function (e) {
            if (!h) return;
            if (f) {
                if (tagpro.events.ballPopColor) {
                    tagpro.events.ballPopColor.forEach(function (t) {
                        w(e, 40, 120, t.ballPopColor(e))
                    });
                } else {
                    w(e);
                }
            }
            if (!tagpro.events.drawSplat) {
                var t = e.t == 1 ? 0 : 120,
                    r = Math.floor(Math.random() * 7) * 120;
                c.drawImage(d, r, t, 120, 120, e.x - n / 2, e.y - n / 2, 90, 90);
                for (var i = Math.floor(e.x / n) - 1; i != Math.ceil(e.x / n) + 2; i++) for (var s = Math.floor(e.y / n) - 1; s != Math.ceil(e.y / n) + 2; s++) {
                    if (i < 0 || s < 0) continue;
                    if (i >= h.length || s >= h[0].length) continue;
                    var o = parseInt(h[i][s]);
                    o != 2 && o != 11 && o != 12 && o != 17 && o != 18 && tagpro.tiles.drawLayers(c, i, s, {
                        x: i * 40,
                        y: s * 40
                    })
                }
            } else tagpro.events.drawSplat.forEach(function (t) {
                t.drawSplat(c, {
                    x: e.x - n / 2,
                    y: e.y - n / 2
                }, h)
            })
        };
    tagpro.socket.on("splat", function (e) {
        v(e)
    }), p();
    var m = i[0],
        g = {
            frames: 0,
            start: (new Date).getTime(),
            last: 0,
            lastCheck: 0
        },
        b = [];
    tagpro.socket.on("bomb", function (e) {
        var t = e.type || 1,
            n = 200,
            r = "#FFFF00";
        if (t == 2) {
            n = 280, r = "#FF8000"
        }
        if (t == 3) {
            n = 160, r = "#FFFFFF"
        }
        w(e, 40, n, r);
    });
    var E = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        leftClip: 0,
        topClip: 0,
        rightClip: 0,
        bottomClip: 0
    };
    tagpro.viewPort = {
        followPlayer: true,
        source: {
            x: 0,
            y: 0
        }
    }, tagpro.helpers.toLockedPos = x;
    var N = [];
    tagpro.socket.on("spawn", function (e) {
        N.push(e), setTimeout(function () {
            N.splice(N.indexOf(e), 1)
        }, 3e3)
    });
    var L = [],
        M = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function (e, t) {
                    window.setTimeout(e, Math.floor(1e3 / 60))
                }
        }(),
        _ = 0;
    M(D)
}), $(document).ready(function () {
    var e = $("#loadingMessage"),
        t = $("html").height(),
        n = e.height();
    e.css({
        top: t / 2 - n / 2
    })
});
var Box2D = {};
(function (e, t) {
    function n() {}!Object.defineProperty && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function && (Object.defineProperty = function (e, t, n) {
        n.get instanceof Function && e.__defineGetter__(t, n.get), n.set instanceof Function && e.__defineSetter__(t, n.set)
    }), e.inherit = function (e, t) {
        var r = e;
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = r
    }, e.generateCallback = function (t, n) {
        return function () {
            n.apply(t, arguments)
        }
    }, e.NVector = function (n) {
        n === t && (n = 0);
        var r = new Array(n || 0);
        for (var i = 0; i < n; ++i) r[i] = 0;
        return r
    }, e.is = function (n, r) {
        return n === null ? false : r instanceof Function && n instanceof r ? true : n.constructor.__implements != t && n.constructor.__implements[r] ? true : false
    }, e.parseUInt = function (e) {
        return Math.abs(parseInt(e))
    }
})(Box2D);
var Vector = Array,
    Vector_a2j_Number = Box2D.NVector;
typeof Box2D == "undefined" && (Box2D = {}), typeof Box2D.Collision == "undefined" && (Box2D.Collision = {}), typeof Box2D.Collision.Shapes == "undefined" && (Box2D.Collision.Shapes = {}), typeof Box2D.Common == "undefined" && (Box2D.Common = {}), typeof Box2D.Common.Math == "undefined" && (Box2D.Common.Math = {}), typeof Box2D.Dynamics == "undefined" && (Box2D.Dynamics = {}), typeof Box2D.Dynamics.Contacts == "undefined" && (Box2D.Dynamics.Contacts = {}), typeof Box2D.Dynamics.Controllers == "undefined" && (Box2D.Dynamics.Controllers = {}), typeof Box2D.Dynamics.Joints == "undefined" && (Box2D.Dynamics.Joints = {}), function () {
    function e() {
        e.b2AABB.apply(this, arguments)
    }
    function t() {
        t.b2Bound.apply(this, arguments)
    }
    function n() {
        n.b2BoundValues.apply(this, arguments), this.constructor === n && this.b2BoundValues.apply(this, arguments)
    }
    function r() {
        r.b2Collision.apply(this, arguments)
    }
    function i() {
        i.b2ContactID.apply(this, arguments), this.constructor === i && this.b2ContactID.apply(this, arguments)
    }
    function s() {
        s.b2ContactPoint.apply(this, arguments)
    }
    function o() {
        o.b2Distance.apply(this, arguments)
    }
    function u() {
        u.b2DistanceInput.apply(this, arguments)
    }
    function a() {
        a.b2DistanceOutput.apply(this, arguments)
    }
    function f() {
        f.b2DistanceProxy.apply(this, arguments)
    }
    function l() {
        l.b2DynamicTree.apply(this, arguments), this.constructor === l && this.b2DynamicTree.apply(this, arguments)
    }
    function c() {
        c.b2DynamicTreeBroadPhase.apply(this, arguments)
    }
    function h() {
        h.b2DynamicTreeNode.apply(this, arguments)
    }
    function p() {
        p.b2DynamicTreePair.apply(this, arguments)
    }
    function d() {
        d.b2Manifold.apply(this, arguments), this.constructor === d && this.b2Manifold.apply(this, arguments)
    }
    function v() {
        v.b2ManifoldPoint.apply(this, arguments), this.constructor === v && this.b2ManifoldPoint.apply(this, arguments)
    }
    function m() {
        m.b2Point.apply(this, arguments)
    }
    function g() {
        g.b2RayCastInput.apply(this, arguments), this.constructor === g && this.b2RayCastInput.apply(this, arguments)
    }
    function y() {
        y.b2RayCastOutput.apply(this, arguments)
    }
    function b() {
        b.b2Segment.apply(this, arguments)
    }
    function w() {
        w.b2SeparationFunction.apply(this, arguments)
    }
    function E() {
        E.b2Simplex.apply(this, arguments), this.constructor === E && this.b2Simplex.apply(this, arguments)
    }
    function S() {
        S.b2SimplexCache.apply(this, arguments)
    }
    function x() {
        x.b2SimplexVertex.apply(this, arguments)
    }
    function T() {
        T.b2TimeOfImpact.apply(this, arguments)
    }
    function N() {
        N.b2TOIInput.apply(this, arguments)
    }
    function C() {
        C.b2WorldManifold.apply(this, arguments), this.constructor === C && this.b2WorldManifold.apply(this, arguments)
    }
    function k() {
        k.ClipVertex.apply(this, arguments)
    }
    function L() {
        L.Features.apply(this, arguments)
    }
    function A() {
        A.b2CircleShape.apply(this, arguments), this.constructor === A && this.b2CircleShape.apply(this, arguments)
    }
    function O() {
        O.b2EdgeChainDef.apply(this, arguments), this.constructor === O && this.b2EdgeChainDef.apply(this, arguments)
    }
    function M() {
        M.b2EdgeShape.apply(this, arguments), this.constructor === M && this.b2EdgeShape.apply(this, arguments)
    }
    function _() {
        _.b2MassData.apply(this, arguments)
    }
    function D() {
        D.b2PolygonShape.apply(this, arguments), this.constructor === D && this.b2PolygonShape.apply(this, arguments)
    }
    function P() {
        P.b2Shape.apply(this, arguments), this.constructor === P && this.b2Shape.apply(this, arguments)
    }
    function H() {
        H.b2Color.apply(this, arguments), this.constructor === H && this.b2Color.apply(this, arguments)
    }
    function B() {
        B.b2Settings.apply(this, arguments)
    }
    function j() {
        j.b2Mat22.apply(this, arguments), this.constructor === j && this.b2Mat22.apply(this, arguments)
    }
    function F() {
        F.b2Mat33.apply(this, arguments), this.constructor === F && this.b2Mat33.apply(this, arguments)
    }
    function I() {
        I.b2Math.apply(this, arguments)
    }
    function q() {
        q.b2Sweep.apply(this, arguments)
    }
    function R() {
        R.b2Transform.apply(this, arguments), this.constructor === R && this.b2Transform.apply(this, arguments)
    }
    function U() {
        U.b2Vec2.apply(this, arguments), this.constructor === U && this.b2Vec2.apply(this, arguments)
    }
    function z() {
        z.b2Vec3.apply(this, arguments), this.constructor === z && this.b2Vec3.apply(this, arguments)
    }
    function W() {
        W.b2Body.apply(this, arguments), this.constructor === W && this.b2Body.apply(this, arguments)
    }
    function X() {
        X.b2BodyDef.apply(this, arguments), this.constructor === X && this.b2BodyDef.apply(this, arguments)
    }
    function V() {
        V.b2ContactFilter.apply(this, arguments)
    }
    function $() {
        $.b2ContactImpulse.apply(this, arguments)
    }
    function J() {
        J.b2ContactListener.apply(this, arguments)
    }
    function K() {
        K.b2ContactManager.apply(this, arguments), this.constructor === K && this.b2ContactManager.apply(this, arguments)
    }
    function Q() {
        Q.b2DebugDraw.apply(this, arguments), this.constructor === Q && this.b2DebugDraw.apply(this, arguments)
    }
    function G() {
        G.b2DestructionListener.apply(this, arguments)
    }
    function Y() {
        Y.b2FilterData.apply(this, arguments)
    }
    function Z() {
        Z.b2Fixture.apply(this, arguments), this.constructor === Z && this.b2Fixture.apply(this, arguments)
    }
    function et() {
        et.b2FixtureDef.apply(this, arguments), this.constructor === et && this.b2FixtureDef.apply(this, arguments)
    }
    function tt() {
        tt.b2Island.apply(this, arguments), this.constructor === tt && this.b2Island.apply(this, arguments)
    }
    function nt() {
        nt.b2TimeStep.apply(this, arguments)
    }
    function rt() {
        rt.b2World.apply(this, arguments), this.constructor === rt && this.b2World.apply(this, arguments)
    }
    function it() {
        it.b2CircleContact.apply(this, arguments)
    }
    function st() {
        st.b2Contact.apply(this, arguments), this.constructor === st && this.b2Contact.apply(this, arguments)
    }
    function ot() {
        ot.b2ContactConstraint.apply(this, arguments), this.constructor === ot && this.b2ContactConstraint.apply(this, arguments)
    }
    function ut() {
        ut.b2ContactConstraintPoint.apply(this, arguments)
    }
    function at() {
        at.b2ContactEdge.apply(this, arguments)
    }
    function ft() {
        ft.b2ContactFactory.apply(this, arguments), this.constructor === ft && this.b2ContactFactory.apply(this, arguments)
    }
    function lt() {
        lt.b2ContactRegister.apply(this, arguments)
    }
    function ct() {
        ct.b2ContactResult.apply(this, arguments)
    }
    function ht() {
        ht.b2ContactSolver.apply(this, arguments), this.constructor === ht && this.b2ContactSolver.apply(this, arguments)
    }
    function pt() {
        pt.b2EdgeAndCircleContact.apply(this, arguments)
    }
    function dt() {
        dt.b2NullContact.apply(this, arguments), this.constructor === dt && this.b2NullContact.apply(this, arguments)
    }
    function vt() {
        vt.b2PolyAndCircleContact.apply(this, arguments)
    }
    function mt() {
        mt.b2PolyAndEdgeContact.apply(this, arguments)
    }
    function gt() {
        gt.b2PolygonContact.apply(this, arguments)
    }
    function yt() {
        yt.b2PositionSolverManifold.apply(this, arguments), this.constructor === yt && this.b2PositionSolverManifold.apply(this, arguments)
    }
    function bt() {
        bt.b2BuoyancyController.apply(this, arguments)
    }
    function wt() {
        wt.b2ConstantAccelController.apply(this, arguments)
    }
    function Et() {
        Et.b2ConstantForceController.apply(this, arguments)
    }
    function St() {
        St.b2Controller.apply(this, arguments)
    }
    function xt() {
        xt.b2ControllerEdge.apply(this, arguments)
    }
    function Tt() {
        Tt.b2GravityController.apply(this, arguments)
    }
    function Nt() {
        Nt.b2TensorDampingController.apply(this, arguments)
    }
    function Ct() {
        Ct.b2DistanceJoint.apply(this, arguments), this.constructor === Ct && this.b2DistanceJoint.apply(this, arguments)
    }
    function kt() {
        kt.b2DistanceJointDef.apply(this, arguments), this.constructor === kt && this.b2DistanceJointDef.apply(this, arguments)
    }
    function Lt() {
        Lt.b2FrictionJoint.apply(this, arguments), this.constructor === Lt && this.b2FrictionJoint.apply(this, arguments)
    }
    function At() {
        At.b2FrictionJointDef.apply(this, arguments), this.constructor === At && this.b2FrictionJointDef.apply(this, arguments)
    }
    function Ot() {
        Ot.b2GearJoint.apply(this, arguments), this.constructor === Ot && this.b2GearJoint.apply(this, arguments)
    }
    function Mt() {
        Mt.b2GearJointDef.apply(this, arguments), this.constructor === Mt && this.b2GearJointDef.apply(this, arguments)
    }
    function _t() {
        _t.b2Jacobian.apply(this, arguments)
    }
    function Dt() {
        Dt.b2Joint.apply(this, arguments), this.constructor === Dt && this.b2Joint.apply(this, arguments)
    }
    function Pt() {
        Pt.b2JointDef.apply(this, arguments), this.constructor === Pt && this.b2JointDef.apply(this, arguments)
    }
    function Ht() {
        Ht.b2JointEdge.apply(this, arguments)
    }
    function Bt() {
        Bt.b2LineJoint.apply(this, arguments), this.constructor === Bt && this.b2LineJoint.apply(this, arguments)
    }
    function jt() {
        jt.b2LineJointDef.apply(this, arguments), this.constructor === jt && this.b2LineJointDef.apply(this, arguments)
    }
    function Ft() {
        Ft.b2MouseJoint.apply(this, arguments), this.constructor === Ft && this.b2MouseJoint.apply(this, arguments)
    }
    function It() {
        It.b2MouseJointDef.apply(this, arguments), this.constructor === It && this.b2MouseJointDef.apply(this, arguments)
    }
    function qt() {
        qt.b2PrismaticJoint.apply(this, arguments), this.constructor === qt && this.b2PrismaticJoint.apply(this, arguments)
    }
    function Rt() {
        Rt.b2PrismaticJointDef.apply(this, arguments), this.constructor === Rt && this.b2PrismaticJointDef.apply(this, arguments)
    }
    function Ut() {
        Ut.b2PulleyJoint.apply(this, arguments), this.constructor === Ut && this.b2PulleyJoint.apply(this, arguments)
    }
    function zt() {
        zt.b2PulleyJointDef.apply(this, arguments), this.constructor === zt && this.b2PulleyJointDef.apply(this, arguments)
    }
    function Wt() {
        Wt.b2RevoluteJoint.apply(this, arguments), this.constructor === Wt && this.b2RevoluteJoint.apply(this, arguments)
    }
    function Xt() {
        Xt.b2RevoluteJointDef.apply(this, arguments), this.constructor === Xt && this.b2RevoluteJointDef.apply(this, arguments)
    }
    function Vt() {
        Vt.b2WeldJoint.apply(this, arguments), this.constructor === Vt && this.b2WeldJoint.apply(this, arguments)
    }
    function $t() {
        $t.b2WeldJointDef.apply(this, arguments), this.constructor === $t && this.b2WeldJointDef.apply(this, arguments)
    }
    Box2D.Collision.IBroadPhase = "Box2D.Collision.IBroadPhase", Box2D.Collision.b2AABB = e, Box2D.Collision.b2Bound = t, Box2D.Collision.b2BoundValues = n, Box2D.Collision.b2Collision = r, Box2D.Collision.b2ContactID = i, Box2D.Collision.b2ContactPoint = s, Box2D.Collision.b2Distance = o, Box2D.Collision.b2DistanceInput = u, Box2D.Collision.b2DistanceOutput = a, Box2D.Collision.b2DistanceProxy = f, Box2D.Collision.b2DynamicTree = l, Box2D.Collision.b2DynamicTreeBroadPhase = c, Box2D.Collision.b2DynamicTreeNode = h, Box2D.Collision.b2DynamicTreePair = p, Box2D.Collision.b2Manifold = d, Box2D.Collision.b2ManifoldPoint = v, Box2D.Collision.b2Point = m, Box2D.Collision.b2RayCastInput = g, Box2D.Collision.b2RayCastOutput = y, Box2D.Collision.b2Segment = b, Box2D.Collision.b2SeparationFunction = w, Box2D.Collision.b2Simplex = E, Box2D.Collision.b2SimplexCache = S, Box2D.Collision.b2SimplexVertex = x, Box2D.Collision.b2TimeOfImpact = T, Box2D.Collision.b2TOIInput = N, Box2D.Collision.b2WorldManifold = C, Box2D.Collision.ClipVertex = k, Box2D.Collision.Features = L, Box2D.Collision.Shapes.b2CircleShape = A, Box2D.Collision.Shapes.b2EdgeChainDef = O, Box2D.Collision.Shapes.b2EdgeShape = M, Box2D.Collision.Shapes.b2MassData = _, Box2D.Collision.Shapes.b2PolygonShape = D, Box2D.Collision.Shapes.b2Shape = P, Box2D.Common.b2internal = "Box2D.Common.b2internal", Box2D.Common.b2Color = H, Box2D.Common.b2Settings = B, Box2D.Common.Math.b2Mat22 = j, Box2D.Common.Math.b2Mat33 = F, Box2D.Common.Math.b2Math = I, Box2D.Common.Math.b2Sweep = q, Box2D.Common.Math.b2Transform = R, Box2D.Common.Math.b2Vec2 = U, Box2D.Common.Math.b2Vec3 = z, Box2D.Dynamics.b2Body = W, Box2D.Dynamics.b2BodyDef = X, Box2D.Dynamics.b2ContactFilter = V, Box2D.Dynamics.b2ContactImpulse = $, Box2D.Dynamics.b2ContactListener = J, Box2D.Dynamics.b2ContactManager = K, Box2D.Dynamics.b2DebugDraw = Q, Box2D.Dynamics.b2DestructionListener = G, Box2D.Dynamics.b2FilterData = Y, Box2D.Dynamics.b2Fixture = Z, Box2D.Dynamics.b2FixtureDef = et, Box2D.Dynamics.b2Island = tt, Box2D.Dynamics.b2TimeStep = nt, Box2D.Dynamics.b2World = rt, Box2D.Dynamics.Contacts.b2CircleContact = it, Box2D.Dynamics.Contacts.b2Contact = st, Box2D.Dynamics.Contacts.b2ContactConstraint = ot, Box2D.Dynamics.Contacts.b2ContactConstraintPoint = ut, Box2D.Dynamics.Contacts.b2ContactEdge = at, Box2D.Dynamics.Contacts.b2ContactFactory = ft, Box2D.Dynamics.Contacts.b2ContactRegister = lt, Box2D.Dynamics.Contacts.b2ContactResult = ct, Box2D.Dynamics.Contacts.b2ContactSolver = ht, Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = pt, Box2D.Dynamics.Contacts.b2NullContact = dt, Box2D.Dynamics.Contacts.b2PolyAndCircleContact = vt, Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = mt, Box2D.Dynamics.Contacts.b2PolygonContact = gt, Box2D.Dynamics.Contacts.b2PositionSolverManifold = yt, Box2D.Dynamics.Controllers.b2BuoyancyController = bt, Box2D.Dynamics.Controllers.b2ConstantAccelController = wt, Box2D.Dynamics.Controllers.b2ConstantForceController = Et, Box2D.Dynamics.Controllers.b2Controller = St, Box2D.Dynamics.Controllers.b2ControllerEdge = xt, Box2D.Dynamics.Controllers.b2GravityController = Tt, Box2D.Dynamics.Controllers.b2TensorDampingController = Nt, Box2D.Dynamics.Joints.b2DistanceJoint = Ct, Box2D.Dynamics.Joints.b2DistanceJointDef = kt, Box2D.Dynamics.Joints.b2FrictionJoint = Lt, Box2D.Dynamics.Joints.b2FrictionJointDef = At, Box2D.Dynamics.Joints.b2GearJoint = Ot, Box2D.Dynamics.Joints.b2GearJointDef = Mt, Box2D.Dynamics.Joints.b2Jacobian = _t, Box2D.Dynamics.Joints.b2Joint = Dt, Box2D.Dynamics.Joints.b2JointDef = Pt, Box2D.Dynamics.Joints.b2JointEdge = Ht, Box2D.Dynamics.Joints.b2LineJoint = Bt, Box2D.Dynamics.Joints.b2LineJointDef = jt, Box2D.Dynamics.Joints.b2MouseJoint = Ft, Box2D.Dynamics.Joints.b2MouseJointDef = It, Box2D.Dynamics.Joints.b2PrismaticJoint = qt, Box2D.Dynamics.Joints.b2PrismaticJointDef = Rt, Box2D.Dynamics.Joints.b2PulleyJoint = Ut, Box2D.Dynamics.Joints.b2PulleyJointDef = zt, Box2D.Dynamics.Joints.b2RevoluteJoint = Wt, Box2D.Dynamics.Joints.b2RevoluteJointDef = Xt, Box2D.Dynamics.Joints.b2WeldJoint = Vt, Box2D.Dynamics.Joints.b2WeldJointDef = $t
}(), Box2D.postDefs = [], function () {
    var e = Box2D.Collision.Shapes.b2CircleShape,
        t = Box2D.Collision.Shapes.b2EdgeChainDef,
        n = Box2D.Collision.Shapes.b2EdgeShape,
        r = Box2D.Collision.Shapes.b2MassData,
        i = Box2D.Collision.Shapes.b2PolygonShape,
        s = Box2D.Collision.Shapes.b2Shape,
        o = Box2D.Common.b2Color,
        u = Box2D.Common.b2internal,
        a = Box2D.Common.b2Settings,
        f = Box2D.Common.Math.b2Mat22,
        l = Box2D.Common.Math.b2Mat33,
        c = Box2D.Common.Math.b2Math,
        h = Box2D.Common.Math.b2Sweep,
        p = Box2D.Common.Math.b2Transform,
        d = Box2D.Common.Math.b2Vec2,
        v = Box2D.Common.Math.b2Vec3,
        m = Box2D.Collision.b2AABB,
        g = Box2D.Collision.b2Bound,
        y = Box2D.Collision.b2BoundValues,
        b = Box2D.Collision.b2Collision,
        w = Box2D.Collision.b2ContactID,
        E = Box2D.Collision.b2ContactPoint,
        S = Box2D.Collision.b2Distance,
        x = Box2D.Collision.b2DistanceInput,
        T = Box2D.Collision.b2DistanceOutput,
        N = Box2D.Collision.b2DistanceProxy,
        C = Box2D.Collision.b2DynamicTree,
        k = Box2D.Collision.b2DynamicTreeBroadPhase,
        L = Box2D.Collision.b2DynamicTreeNode,
        A = Box2D.Collision.b2DynamicTreePair,
        O = Box2D.Collision.b2Manifold,
        M = Box2D.Collision.b2ManifoldPoint,
        _ = Box2D.Collision.b2Point,
        D = Box2D.Collision.b2RayCastInput,
        P = Box2D.Collision.b2RayCastOutput,
        H = Box2D.Collision.b2Segment,
        B = Box2D.Collision.b2SeparationFunction,
        j = Box2D.Collision.b2Simplex,
        F = Box2D.Collision.b2SimplexCache,
        I = Box2D.Collision.b2SimplexVertex,
        q = Box2D.Collision.b2TimeOfImpact,
        R = Box2D.Collision.b2TOIInput,
        U = Box2D.Collision.b2WorldManifold,
        z = Box2D.Collision.ClipVertex,
        W = Box2D.Collision.Features,
        X = Box2D.Collision.IBroadPhase;
    m.b2AABB = function () {
        this.lowerBound = new d, this.upperBound = new d
    }, m.prototype.IsValid = function () {
        var e = this.upperBound.x - this.lowerBound.x,
            t = this.upperBound.y - this.lowerBound.y,
            n = e >= 0 && t >= 0;
        return n = n && this.lowerBound.IsValid() && this.upperBound.IsValid(), n
    }, m.prototype.GetCenter = function () {
        return new d((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
    }, m.prototype.GetExtents = function () {
        return new d((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
    }, m.prototype.Contains = function (e) {
        var t = true;
        return t = t && this.lowerBound.x <= e.lowerBound.x, t = t && this.lowerBound.y <= e.lowerBound.y, t = t && e.upperBound.x <= this.upperBound.x, t = t && e.upperBound.y <= this.upperBound.y, t
    }, m.prototype.RayCast = function (e, t) {
        var n = -Number.MAX_VALUE,
            r = Number.MAX_VALUE,
            i = t.p1.x,
            s = t.p1.y,
            o = t.p2.x - t.p1.x,
            u = t.p2.y - t.p1.y,
            a = Math.abs(o),
            f = Math.abs(u),
            l = e.normal,
            c = 0,
            h = 0,
            p = 0,
            d = 0,
            v = 0;
        if (a < Number.MIN_VALUE) {
            if (i < this.lowerBound.x || this.upperBound.x < i) return false
        } else {
            c = 1 / o, h = (this.lowerBound.x - i) * c, p = (this.upperBound.x - i) * c, v = -1, h > p && (d = h, h = p, p = d, v = 1), h > n && (l.x = v, l.y = 0, n = h), r = Math.min(r, p);
            if (n > r) return false
        }
        if (f < Number.MIN_VALUE) {
            if (s < this.lowerBound.y || this.upperBound.y < s) return false
        } else {
            c = 1 / u, h = (this.lowerBound.y - s) * c, p = (this.upperBound.y - s) * c, v = -1, h > p && (d = h, h = p, p = d, v = 1), h > n && (l.y = v, l.x = 0, n = h), r = Math.min(r, p);
            if (n > r) return false
        }
        return e.fraction = n, true
    }, m.prototype.TestOverlap = function (e) {
        var t = e.lowerBound.x - this.upperBound.x,
            n = e.lowerBound.y - this.upperBound.y,
            r = this.lowerBound.x - e.upperBound.x,
            i = this.lowerBound.y - e.upperBound.y;
        return t > 0 || n > 0 ? false : r > 0 || i > 0 ? false : true
    }, m.Combine = function (e, t) {
        var n = new m;
        return n.Combine(e, t), n
    }, m.prototype.Combine = function (e, t) {
        this.lowerBound.x = Math.min(e.lowerBound.x, t.lowerBound.x), this.lowerBound.y = Math.min(e.lowerBound.y, t.lowerBound.y), this.upperBound.x = Math.max(e.upperBound.x, t.upperBound.x), this.upperBound.y = Math.max(e.upperBound.y, t.upperBound.y)
    }, g.b2Bound = function () {}, g.prototype.IsLower = function () {
        return (this.value & 1) == 0
    }, g.prototype.IsUpper = function () {
        return (this.value & 1) == 1
    }, g.prototype.Swap = function (e) {
        var t = this.value,
            n = this.proxy,
            r = this.stabbingCount;
        this.value = e.value, this.proxy = e.proxy, this.stabbingCount = e.stabbingCount, e.value = t, e.proxy = n, e.stabbingCount = r
    }, y.b2BoundValues = function () {}, y.prototype.b2BoundValues = function () {
        this.lowerValues = new Vector_a2j_Number, this.lowerValues[0] = 0, this.lowerValues[1] = 0, this.upperValues = new Vector_a2j_Number, this.upperValues[0] = 0, this.upperValues[1] = 0
    }, b.b2Collision = function () {}, b.ClipSegmentToLine = function (e, t, n, r) {
        r === undefined && (r = 0);
        var i, s = 0;
        i = t[0];
        var o = i.v;
        i = t[1];
        var u = i.v,
            a = n.x * o.x + n.y * o.y - r,
            f = n.x * u.x + n.y * u.y - r;
        a <= 0 && e[s++].Set(t[0]), f <= 0 && e[s++].Set(t[1]);
        if (a * f < 0) {
            var l = a / (a - f);
            i = e[s];
            var c = i.v;
            c.x = o.x + l * (u.x - o.x), c.y = o.y + l * (u.y - o.y), i = e[s];
            var h;
            a > 0 ? (h = t[0], i.id = h.id) : (h = t[1], i.id = h.id), ++s
        }
        return s
    }, b.EdgeSeparation = function (e, t, n, r, i) {
        n === undefined && (n = 0);
        var s = parseInt(e.m_vertexCount),
            o = e.m_vertices,
            u = e.m_normals,
            a = parseInt(r.m_vertexCount),
            f = r.m_vertices,
            l, c;
        l = t.R, c = u[n];
        var h = l.col1.x * c.x + l.col2.x * c.y,
            p = l.col1.y * c.x + l.col2.y * c.y;
        l = i.R;
        var d = l.col1.x * h + l.col1.y * p,
            v = l.col2.x * h + l.col2.y * p,
            m = 0,
            g = Number.MAX_VALUE;
        for (var y = 0; y < a; ++y) {
            c = f[y];
            var b = c.x * d + c.y * v;
            b < g && (g = b, m = y)
        }
        c = o[n], l = t.R;
        var w = t.position.x + (l.col1.x * c.x + l.col2.x * c.y),
            E = t.position.y + (l.col1.y * c.x + l.col2.y * c.y);
        c = f[m], l = i.R;
        var S = i.position.x + (l.col1.x * c.x + l.col2.x * c.y),
            x = i.position.y + (l.col1.y * c.x + l.col2.y * c.y);
        S -= w, x -= E;
        var T = S * h + x * p;
        return T
    }, b.FindMaxSeparation = function (e, t, n, r, i) {
        var s = parseInt(t.m_vertexCount),
            o = t.m_normals,
            u, a;
        a = i.R, u = r.m_centroid;
        var f = i.position.x + (a.col1.x * u.x + a.col2.x * u.y),
            l = i.position.y + (a.col1.y * u.x + a.col2.y * u.y);
        a = n.R, u = t.m_centroid, f -= n.position.x + (a.col1.x * u.x + a.col2.x * u.y), l -= n.position.y + (a.col1.y * u.x + a.col2.y * u.y);
        var c = f * n.R.col1.x + l * n.R.col1.y,
            h = f * n.R.col2.x + l * n.R.col2.y,
            p = 0,
            d = -Number.MAX_VALUE;
        for (var v = 0; v < s; ++v) {
            u = o[v];
            var m = u.x * c + u.y * h;
            m > d && (d = m, p = v)
        }
        var g = b.EdgeSeparation(t, n, p, r, i),
            y = parseInt(p - 1 >= 0 ? p - 1 : s - 1),
            w = b.EdgeSeparation(t, n, y, r, i),
            E = parseInt(p + 1 < s ? p + 1 : 0),
            S = b.EdgeSeparation(t, n, E, r, i),
            x = 0,
            T = 0,
            N = 0;
        if (w > g && w > S) N = -1, x = y, T = w;
        else {
            if (!(S > g)) return e[0] = p, g;
            N = 1, x = E, T = S
        }
        for (;;) {
            N == -1 ? p = x - 1 >= 0 ? x - 1 : s - 1 : p = x + 1 < s ? x + 1 : 0, g = b.EdgeSeparation(t, n, p, r, i);
            if (!(g > T)) break;
            x = p, T = g
        }
        return e[0] = x, T
    }, b.FindIncidentEdge = function (e, t, n, r, i, s) {
        r === undefined && (r = 0);
        var o = parseInt(t.m_vertexCount),
            u = t.m_normals,
            a = parseInt(i.m_vertexCount),
            f = i.m_vertices,
            l = i.m_normals,
            c, h;
        c = n.R, h = u[r];
        var p = c.col1.x * h.x + c.col2.x * h.y,
            d = c.col1.y * h.x + c.col2.y * h.y;
        c = s.R;
        var v = c.col1.x * p + c.col1.y * d;
        d = c.col2.x * p + c.col2.y * d, p = v;
        var m = 0,
            g = Number.MAX_VALUE;
        for (var y = 0; y < a; ++y) {
            h = l[y];
            var b = p * h.x + d * h.y;
            b < g && (g = b, m = y)
        }
        var w, E = parseInt(m),
            S = parseInt(E + 1 < a ? E + 1 : 0);
        w = e[0], h = f[E], c = s.R, w.v.x = s.position.x + (c.col1.x * h.x + c.col2.x * h.y), w.v.y = s.position.y + (c.col1.y * h.x + c.col2.y * h.y), w.id.features.referenceEdge = r, w.id.features.incidentEdge = E, w.id.features.incidentVertex = 0, w = e[1], h = f[S], c = s.R, w.v.x = s.position.x + (c.col1.x * h.x + c.col2.x * h.y), w.v.y = s.position.y + (c.col1.y * h.x + c.col2.y * h.y), w.id.features.referenceEdge = r, w.id.features.incidentEdge = S, w.id.features.incidentVertex = 1
    }, b.MakeClipPointVector = function () {
        var e = new Vector(2);
        return e[0] = new z, e[1] = new z, e
    }, b.CollidePolygons = function (e, t, n, r, i) {
        var s;
        e.m_pointCount = 0;
        var o = t.m_radius + r.m_radius,
            u = 0;
        b.s_edgeAO[0] = u;
        var f = b.FindMaxSeparation(b.s_edgeAO, t, n, r, i);
        u = b.s_edgeAO[0];
        if (f > o) return;
        var l = 0;
        b.s_edgeBO[0] = l;
        var c = b.FindMaxSeparation(b.s_edgeBO, r, i, t, n);
        l = b.s_edgeBO[0];
        if (c > o) return;
        var h, p, d, v, m = 0,
            g = 0,
            y = .98,
            w = .001,
            E;
        c > y * f + w ? (h = r, p = t, d = i, v = n, m = l, e.m_type = O.e_faceB, g = 1) : (h = t, p = r, d = n, v = i, m = u, e.m_type = O.e_faceA, g = 0);
        var S = b.s_incidentEdge;
        b.FindIncidentEdge(S, h, d, m, p, v);
        var x = parseInt(h.m_vertexCount),
            T = h.m_vertices,
            N = T[m],
            C;
        m + 1 < x ? C = T[parseInt(m + 1)] : C = T[0];
        var k = b.s_localTangent;
        k.Set(C.x - N.x, C.y - N.y), k.Normalize();
        var L = b.s_localNormal;
        L.x = k.y, L.y = -k.x;
        var A = b.s_planePoint;
        A.Set(.5 * (N.x + C.x), .5 * (N.y + C.y));
        var M = b.s_tangent;
        E = d.R, M.x = E.col1.x * k.x + E.col2.x * k.y, M.y = E.col1.y * k.x + E.col2.y * k.y;
        var _ = b.s_tangent2;
        _.x = -M.x, _.y = -M.y;
        var D = b.s_normal;
        D.x = M.y, D.y = -M.x;
        var P = b.s_v11,
            H = b.s_v12;
        P.x = d.position.x + (E.col1.x * N.x + E.col2.x * N.y), P.y = d.position.y + (E.col1.y * N.x + E.col2.y * N.y), H.x = d.position.x + (E.col1.x * C.x + E.col2.x * C.y), H.y = d.position.y + (E.col1.y * C.x + E.col2.y * C.y);
        var B = D.x * P.x + D.y * P.y,
            j = -M.x * P.x - M.y * P.y + o,
            F = M.x * H.x + M.y * H.y + o,
            I = b.s_clipPoints1,
            q = b.s_clipPoints2,
            R = 0;
        R = b.ClipSegmentToLine(I, S, _, j);
        if (R < 2) return;
        R = b.ClipSegmentToLine(q, I, M, F);
        if (R < 2) return;
        e.m_localPlaneNormal.SetV(L), e.m_localPoint.SetV(A);
        var U = 0;
        for (var z = 0; z < a.b2_maxManifoldPoints; ++z) {
            s = q[z];
            var W = D.x * s.v.x + D.y * s.v.y - B;
            if (W <= o) {
                var X = e.m_points[U];
                E = v.R;
                var V = s.v.x - v.position.x,
                    $ = s.v.y - v.position.y;
                X.m_localPoint.x = V * E.col1.x + $ * E.col1.y, X.m_localPoint.y = V * E.col2.x + $ * E.col2.y, X.m_id.Set(s.id), X.m_id.features.flip = g, ++U
            }
        }
        e.m_pointCount = U
    }, b.CollideCircles = function (e, t, n, r, i) {
        e.m_pointCount = 0;
        var s, o;
        s = n.R, o = t.m_p;
        var u = n.position.x + (s.col1.x * o.x + s.col2.x * o.y),
            a = n.position.y + (s.col1.y * o.x + s.col2.y * o.y);
        s = i.R, o = r.m_p;
        var f = i.position.x + (s.col1.x * o.x + s.col2.x * o.y),
            l = i.position.y + (s.col1.y * o.x + s.col2.y * o.y),
            c = f - u,
            h = l - a,
            p = c * c + h * h,
            d = t.m_radius + r.m_radius;
        if (p > d * d) return;
        e.m_type = O.e_circles, e.m_localPoint.SetV(t.m_p), e.m_localPlaneNormal.SetZero(), e.m_pointCount = 1, e.m_points[0].m_localPoint.SetV(r.m_p), e.m_points[0].m_id.key = 0
    }, b.CollidePolygonAndCircle = function (e, t, n, r, i) {
        e.m_pointCount = 0;
        var s, o = 0,
            u = 0,
            a = 0,
            f = 0,
            l, c;
        c = i.R, l = r.m_p;
        var h = i.position.x + (c.col1.x * l.x + c.col2.x * l.y),
            p = i.position.y + (c.col1.y * l.x + c.col2.y * l.y);
        o = h - n.position.x, u = p - n.position.y, c = n.R;
        var d = o * c.col1.x + u * c.col1.y,
            v = o * c.col2.x + u * c.col2.y,
            m = 0,
            g = 0,
            y = -Number.MAX_VALUE,
            b = t.m_radius + r.m_radius,
            w = parseInt(t.m_vertexCount),
            E = t.m_vertices,
            S = t.m_normals;
        for (var x = 0; x < w; ++x) {
            l = E[x], o = d - l.x, u = v - l.y, l = S[x];
            var T = l.x * o + l.y * u;
            if (T > b) return;
            T > y && (y = T, g = x)
        }
        var N = parseInt(g),
            C = parseInt(N + 1 < w ? N + 1 : 0),
            k = E[N],
            L = E[C];
        if (y < Number.MIN_VALUE) {
            e.m_pointCount = 1, e.m_type = O.e_faceA, e.m_localPlaneNormal.SetV(S[g]), e.m_localPoint.x = .5 * (k.x + L.x), e.m_localPoint.y = .5 * (k.y + L.y), e.m_points[0].m_localPoint.SetV(r.m_p), e.m_points[0].m_id.key = 0;
            return
        }
        var A = (d - k.x) * (L.x - k.x) + (v - k.y) * (L.y - k.y),
            M = (d - L.x) * (k.x - L.x) + (v - L.y) * (k.y - L.y);
        if (A <= 0) {
            if ((d - k.x) * (d - k.x) + (v - k.y) * (v - k.y) > b * b) return;
            e.m_pointCount = 1, e.m_type = O.e_faceA, e.m_localPlaneNormal.x = d - k.x, e.m_localPlaneNormal.y = v - k.y, e.m_localPlaneNormal.Normalize(), e.m_localPoint.SetV(k), e.m_points[0].m_localPoint.SetV(r.m_p), e.m_points[0].m_id.key = 0
        } else if (M <= 0) {
            if ((d - L.x) * (d - L.x) + (v - L.y) * (v - L.y) > b * b) return;
            e.m_pointCount = 1, e.m_type = O.e_faceA, e.m_localPlaneNormal.x = d - L.x, e.m_localPlaneNormal.y = v - L.y, e.m_localPlaneNormal.Normalize(), e.m_localPoint.SetV(L), e.m_points[0].m_localPoint.SetV(r.m_p), e.m_points[0].m_id.key = 0
        } else {
            var _ = .5 * (k.x + L.x),
                D = .5 * (k.y + L.y);
            y = (d - _) * S[N].x + (v - D) * S[N].y;
            if (y > b) return;
            e.m_pointCount = 1, e.m_type = O.e_faceA, e.m_localPlaneNormal.x = S[N].x, e.m_localPlaneNormal.y = S[N].y, e.m_localPlaneNormal.Normalize(), e.m_localPoint.Set(_, D), e.m_points[0].m_localPoint.SetV(r.m_p), e.m_points[0].m_id.key = 0
        }
    }, b.TestOverlap = function (e, t) {
        var n = t.lowerBound,
            r = e.upperBound,
            i = n.x - r.x,
            s = n.y - r.y;
        n = e.lowerBound, r = t.upperBound;
        var o = n.x - r.x,
            u = n.y - r.y;
        return i > 0 || s > 0 ? false : o > 0 || u > 0 ? false : true
    }, Box2D.postDefs.push(function () {
        Box2D.Collision.b2Collision.s_incidentEdge = b.MakeClipPointVector(), Box2D.Collision.b2Collision.s_clipPoints1 = b.MakeClipPointVector(), Box2D.Collision.b2Collision.s_clipPoints2 = b.MakeClipPointVector(), Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1), Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1), Box2D.Collision.b2Collision.s_localTangent = new d, Box2D.Collision.b2Collision.s_localNormal = new d, Box2D.Collision.b2Collision.s_planePoint = new d, Box2D.Collision.b2Collision.s_normal = new d, Box2D.Collision.b2Collision.s_tangent = new d, Box2D.Collision.b2Collision.s_tangent2 = new d, Box2D.Collision.b2Collision.s_v11 = new d, Box2D.Collision.b2Collision.s_v12 = new d, Box2D.Collision.b2Collision.b2CollidePolyTempVec = new d, Box2D.Collision.b2Collision.b2_nullFeature = 255
    }), w.b2ContactID = function () {
        this.features = new W
    }, w.prototype.b2ContactID = function () {
        this.features._m_id = this
    }, w.prototype.Set = function (e) {
        this.key = e._key
    }, w.prototype.Copy = function () {
        var e = new w;
        return e.key = this.key, e
    }, Object.defineProperty(w.prototype, "key", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this._key
        }
    }), Object.defineProperty(w.prototype, "key", {
        enumerable: false,
        configurable: true,
        set: function (e) {
            e === undefined && (e = 0), this._key = e, this.features._referenceEdge = this._key & 255, this.features._incidentEdge = (this._key & 65280) >> 8 & 255, this.features._incidentVertex = (this._key & 16711680) >> 16 & 255, this.features._flip = (this._key & 4278190080) >> 24 & 255
        }
    }), E.b2ContactPoint = function () {
        this.position = new d, this.velocity = new d, this.normal = new d, this.id = new w
    }, S.b2Distance = function () {}, S.Distance = function (e, t, n) {
        ++S.b2_gjkCalls;
        var r = n.proxyA,
            i = n.proxyB,
            s = n.transformA,
            o = n.transformB,
            u = S.s_simplex;
        u.ReadCache(t, r, s, i, o);
        var f = u.m_vertices,
            l = 20,
            h = S.s_saveA,
            p = S.s_saveB,
            v = 0,
            m = u.GetClosestPoint(),
            g = m.LengthSquared(),
            y = g,
            b = 0,
            w, E = 0;
        while (E < l) {
            v = u.m_count;
            for (b = 0; b < v; b++) h[b] = f[b].indexA, p[b] = f[b].indexB;
            switch (u.m_count) {
                case 1:
                    break;
                case 2:
                    u.Solve2();
                    break;
                case 3:
                    u.Solve3();
                    break;
                default:
                    a.b2Assert(false)
            }
            if (u.m_count == 3) break;
            w = u.GetClosestPoint(), y = w.LengthSquared(), y > g, g = y;
            var x = u.GetSearchDirection();
            if (x.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) break;
            var T = f[u.m_count];
            T.indexA = r.GetSupport(c.MulTMV(s.R, x.GetNegative())), T.wA = c.MulX(s, r.GetVertex(T.indexA)), T.indexB = i.GetSupport(c.MulTMV(o.R, x)), T.wB = c.MulX(o, i.GetVertex(T.indexB)), T.w = c.SubtractVV(T.wB, T.wA), ++E, ++S.b2_gjkIters;
            var N = false;
            for (b = 0; b < v; b++) if (T.indexA == h[b] && T.indexB == p[b]) {
                N = true;
                break
            }
            if (N) break;
            ++u.m_count
        }
        S.b2_gjkMaxIters = c.Max(S.b2_gjkMaxIters, E), u.GetWitnessPoints(e.pointA, e.pointB), e.distance = c.SubtractVV(e.pointA, e.pointB).Length(), e.iterations = E, u.WriteCache(t);
        if (n.useRadii) {
            var C = r.m_radius,
                k = i.m_radius;
            if (e.distance > C + k && e.distance > Number.MIN_VALUE) {
                e.distance -= C + k;
                var L = c.SubtractVV(e.pointB, e.pointA);
                L.Normalize(), e.pointA.x += C * L.x, e.pointA.y += C * L.y, e.pointB.x -= k * L.x, e.pointB.y -= k * L.y
            } else w = new d, w.x = .5 * (e.pointA.x + e.pointB.x), w.y = .5 * (e.pointA.y + e.pointB.y), e.pointA.x = e.pointB.x = w.x, e.pointA.y = e.pointB.y = w.y, e.distance = 0
        }
    }, Box2D.postDefs.push(function () {
        Box2D.Collision.b2Distance.s_simplex = new j, Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3), Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3)
    }), x.b2DistanceInput = function () {}, T.b2DistanceOutput = function () {
        this.pointA = new d, this.pointB = new d
    }, N.b2DistanceProxy = function () {}, N.prototype.Set = function (t) {
        switch (t.GetType()) {
            case s.e_circleShape:
                var n = t instanceof e ? t : null;
                this.m_vertices = new Vector(1, true), this.m_vertices[0] = n.m_p, this.m_count = 1, this.m_radius = n.m_radius;
                break;
            case s.e_polygonShape:
                var r = t instanceof i ? t : null;
                this.m_vertices = r.m_vertices, this.m_count = r.m_vertexCount, this.m_radius = r.m_radius;
                break;
            default:
                a.b2Assert(false)
        }
    }, N.prototype.GetSupport = function (e) {
        var t = 0,
            n = this.m_vertices[0].x * e.x + this.m_vertices[0].y * e.y;
        for (var r = 1; r < this.m_count; ++r) {
            var i = this.m_vertices[r].x * e.x + this.m_vertices[r].y * e.y;
            i > n && (t = r, n = i)
        }
        return t
    }, N.prototype.GetSupportVertex = function (e) {
        var t = 0,
            n = this.m_vertices[0].x * e.x + this.m_vertices[0].y * e.y;
        for (var r = 1; r < this.m_count; ++r) {
            var i = this.m_vertices[r].x * e.x + this.m_vertices[r].y * e.y;
            i > n && (t = r, n = i)
        }
        return this.m_vertices[t]
    }, N.prototype.GetVertexCount = function () {
        return this.m_count
    }, N.prototype.GetVertex = function (e) {
        return e === undefined && (e = 0), a.b2Assert(0 <= e && e < this.m_count), this.m_vertices[e]
    }, C.b2DynamicTree = function () {}, C.prototype.b2DynamicTree = function () {
        this.m_root = null, this.m_freeList = null, this.m_path = 0, this.m_insertionCount = 0
    }, C.prototype.CreateProxy = function (e, t) {
        var n = this.AllocateNode(),
            r = a.b2_aabbExtension,
            i = a.b2_aabbExtension;
        return n.aabb.lowerBound.x = e.lowerBound.x - r, n.aabb.lowerBound.y = e.lowerBound.y - i, n.aabb.upperBound.x = e.upperBound.x + r, n.aabb.upperBound.y = e.upperBound.y + i, n.userData = t, this.InsertLeaf(n), n
    }, C.prototype.DestroyProxy = function (e) {
        this.RemoveLeaf(e), this.FreeNode(e)
    }, C.prototype.MoveProxy = function (e, t, n) {
        a.b2Assert(e.IsLeaf());
        if (e.aabb.Contains(t)) return false;
        this.RemoveLeaf(e);
        var r = a.b2_aabbExtension + a.b2_aabbMultiplier * (n.x > 0 ? n.x : -n.x),
            i = a.b2_aabbExtension + a.b2_aabbMultiplier * (n.y > 0 ? n.y : -n.y);
        return e.aabb.lowerBound.x = t.lowerBound.x - r, e.aabb.lowerBound.y = t.lowerBound.y - i, e.aabb.upperBound.x = t.upperBound.x + r, e.aabb.upperBound.y = t.upperBound.y + i, this.InsertLeaf(e), true
    }, C.prototype.Rebalance = function (e) {
        e === undefined && (e = 0);
        if (this.m_root == null) return;
        for (var t = 0; t < e; t++) {
            var n = this.m_root,
                r = 0;
            while (n.IsLeaf() == 0) n = this.m_path >> r & 1 ? n.child2 : n.child1, r = r + 1 & 31;
            ++this.m_path, this.RemoveLeaf(n), this.InsertLeaf(n)
        }
    }, C.prototype.GetFatAABB = function (e) {
        return e.aabb
    }, C.prototype.GetUserData = function (e) {
        return e.userData
    }, C.prototype.Query = function (e, t) {
        if (this.m_root == null) return;
        var n = new Vector,
            r = 0;
        n[r++] = this.m_root;
        while (r > 0) {
            var i = n[--r];
            if (i.aabb.TestOverlap(t)) if (i.IsLeaf()) {
                var s = e(i);
                if (!s) return
            } else n[r++] = i.child1, n[r++] = i.child2
        }
    }, C.prototype.RayCast = function (e, t) {
        if (this.m_root == null) return;
        var n = t.p1,
            r = t.p2,
            i = c.SubtractVV(n, r);
        i.Normalize();
        var s = c.CrossFV(1, i),
            o = c.AbsV(s),
            u = t.maxFraction,
            a = new m,
            f = 0,
            l = 0;
        f = n.x + u * (r.x - n.x), l = n.y + u * (r.y - n.y), a.lowerBound.x = Math.min(n.x, f), a.lowerBound.y = Math.min(n.y, l), a.upperBound.x = Math.max(n.x, f), a.upperBound.y = Math.max(n.y, l);
        var h = new Vector,
            p = 0;
        h[p++] = this.m_root;
        while (p > 0) {
            var d = h[--p];
            if (d.aabb.TestOverlap(a) == 0) continue;
            var v = d.aabb.GetCenter(),
                g = d.aabb.GetExtents(),
                y = Math.abs(s.x * (n.x - v.x) + s.y * (n.y - v.y)) - o.x * g.x - o.y * g.y;
            if (y > 0) continue;
            if (d.IsLeaf()) {
                var b = new D;
                b.p1 = t.p1, b.p2 = t.p2, b.maxFraction = t.maxFraction, u = e(b, d);
                if (u == 0) return;
                u > 0 && (f = n.x + u * (r.x - n.x), l = n.y + u * (r.y - n.y), a.lowerBound.x = Math.min(n.x, f), a.lowerBound.y = Math.min(n.y, l), a.upperBound.x = Math.max(n.x, f), a.upperBound.y = Math.max(n.y, l))
            } else h[p++] = d.child1, h[p++] = d.child2
        }
    }, C.prototype.AllocateNode = function () {
        if (this.m_freeList) {
            var e = this.m_freeList;
            return this.m_freeList = e.parent, e.parent = null, e.child1 = null, e.child2 = null, e
        }
        return new L
    }, C.prototype.FreeNode = function (e) {
        e.parent = this.m_freeList, this.m_freeList = e
    }, C.prototype.InsertLeaf = function (e) {
        ++this.m_insertionCount;
        if (this.m_root == null) {
            this.m_root = e, this.m_root.parent = null;
            return
        }
        var t = e.aabb.GetCenter(),
            n = this.m_root;
        if (n.IsLeaf() == 0) do {
            var r = n.child1,
                i = n.child2,
                s = Math.abs((r.aabb.lowerBound.x + r.aabb.upperBound.x) / 2 - t.x) + Math.abs((r.aabb.lowerBound.y + r.aabb.upperBound.y) / 2 - t.y),
                o = Math.abs((i.aabb.lowerBound.x + i.aabb.upperBound.x) / 2 - t.x) + Math.abs((i.aabb.lowerBound.y + i.aabb.upperBound.y) / 2 - t.y);
            s < o ? n = r : n = i
        } while (n.IsLeaf() == 0);
        var u = n.parent,
            a = this.AllocateNode();
        a.parent = u, a.userData = null, a.aabb.Combine(e.aabb, n.aabb);
        if (u) {
            n.parent.child1 == n ? u.child1 = a : u.child2 = a, a.child1 = n, a.child2 = e, n.parent = a, e.parent = a;
            do {
                if (u.aabb.Contains(a.aabb)) break;
                u.aabb.Combine(u.child1.aabb, u.child2.aabb), a = u, u = u.parent
            } while (u)
        } else a.child1 = n, a.child2 = e, n.parent = a, e.parent = a, this.m_root = a
    }, C.prototype.RemoveLeaf = function (e) {
        if (e == this.m_root) {
            this.m_root = null;
            return
        }
        var t = e.parent,
            n = t.parent,
            r;
        t.child1 == e ? r = t.child2 : r = t.child1;
        if (n) {
            n.child1 == t ? n.child1 = r : n.child2 = r, r.parent = n, this.FreeNode(t);
            while (n) {
                var i = n.aabb;
                n.aabb = m.Combine(n.child1.aabb, n.child2.aabb);
                if (i.Contains(n.aabb)) break;
                n = n.parent
            }
        } else this.m_root = r, r.parent = null, this.FreeNode(t)
    }, k.b2DynamicTreeBroadPhase = function () {
        this.m_tree = new C, this.m_moveBuffer = new Vector, this.m_pairBuffer = new Vector, this.m_pairCount = 0
    }, k.prototype.CreateProxy = function (e, t) {
        var n = this.m_tree.CreateProxy(e, t);
        return ++this.m_proxyCount, this.BufferMove(n), n
    }, k.prototype.DestroyProxy = function (e) {
        this.UnBufferMove(e), --this.m_proxyCount, this.m_tree.DestroyProxy(e)
    }, k.prototype.MoveProxy = function (e, t, n) {
        var r = this.m_tree.MoveProxy(e, t, n);
        r && this.BufferMove(e)
    }, k.prototype.TestOverlap = function (e, t) {
        var n = this.m_tree.GetFatAABB(e),
            r = this.m_tree.GetFatAABB(t);
        return n.TestOverlap(r)
    }, k.prototype.GetUserData = function (e) {
        return this.m_tree.GetUserData(e)
    }, k.prototype.GetFatAABB = function (e) {
        return this.m_tree.GetFatAABB(e)
    }, k.prototype.GetProxyCount = function () {
        return this.m_proxyCount
    }, k.prototype.UpdatePairs = function (e) {
        var t = this;
        t.m_pairCount = 0;
        var n = 0,
            r;
        for (n = 0; n < t.m_moveBuffer.length; ++n) {
            r = t.m_moveBuffer[n];

            function i(e) {
                if (e == r) return true;
                t.m_pairCount == t.m_pairBuffer.length && (t.m_pairBuffer[t.m_pairCount] = new A);
                var n = t.m_pairBuffer[t.m_pairCount];
                return n.proxyA = e < r ? e : r, n.proxyB = e >= r ? e : r, ++t.m_pairCount, true
            }
            var s = t.m_tree.GetFatAABB(r);
            t.m_tree.Query(i, s)
        }
        t.m_moveBuffer.length = 0;
        for (var n = 0; n < t.m_pairCount;) {
            var o = t.m_pairBuffer[n],
                u = t.m_tree.GetUserData(o.proxyA),
                a = t.m_tree.GetUserData(o.proxyB);
            e(u, a), ++n;
            while (n < t.m_pairCount) {
                var f = t.m_pairBuffer[n];
                if (f.proxyA != o.proxyA || f.proxyB != o.proxyB) break;
                ++n
            }
        }
    }, k.prototype.Query = function (e, t) {
        this.m_tree.Query(e, t)
    }, k.prototype.RayCast = function (e, t) {
        this.m_tree.RayCast(e, t)
    }, k.prototype.Validate = function () {}, k.prototype.Rebalance = function (e) {
        e === undefined && (e = 0), this.m_tree.Rebalance(e)
    }, k.prototype.BufferMove = function (e) {
        this.m_moveBuffer[this.m_moveBuffer.length] = e
    }, k.prototype.UnBufferMove = function (e) {
        var t = parseInt(this.m_moveBuffer.indexOf(e));
        this.m_moveBuffer.splice(t, 1)
    }, k.prototype.ComparePairs = function (e, t) {
        return 0
    }, k.__implements = {}, k.__implements[X] = true, L.b2DynamicTreeNode = function () {
        this.aabb = new m
    }, L.prototype.IsLeaf = function () {
        return this.child1 == null
    }, A.b2DynamicTreePair = function () {}, O.b2Manifold = function () {
        this.m_pointCount = 0
    }, O.prototype.b2Manifold = function () {
        this.m_points = new Vector(a.b2_maxManifoldPoints);
        for (var e = 0; e < a.b2_maxManifoldPoints; e++) this.m_points[e] = new M;
        this.m_localPlaneNormal = new d, this.m_localPoint = new d
    }, O.prototype.Reset = function () {
        for (var e = 0; e < a.b2_maxManifoldPoints; e++)(this.m_points[e] instanceof M ? this.m_points[e] : null).Reset();
        this.m_localPlaneNormal.SetZero(), this.m_localPoint.SetZero(), this.m_type = 0, this.m_pointCount = 0
    }, O.prototype.Set = function (e) {
        this.m_pointCount = e.m_pointCount;
        for (var t = 0; t < a.b2_maxManifoldPoints; t++)(this.m_points[t] instanceof M ? this.m_points[t] : null).Set(e.m_points[t]);
        this.m_localPlaneNormal.SetV(e.m_localPlaneNormal), this.m_localPoint.SetV(e.m_localPoint), this.m_type = e.m_type
    }, O.prototype.Copy = function () {
        var e = new O;
        return e.Set(this), e
    }, Box2D.postDefs.push(function () {
        Box2D.Collision.b2Manifold.e_circles = 1, Box2D.Collision.b2Manifold.e_faceA = 2, Box2D.Collision.b2Manifold.e_faceB = 4
    }), M.b2ManifoldPoint = function () {
        this.m_localPoint = new d, this.m_id = new w
    }, M.prototype.b2ManifoldPoint = function () {
        this.Reset()
    }, M.prototype.Reset = function () {
        this.m_localPoint.SetZero(), this.m_normalImpulse = 0, this.m_tangentImpulse = 0, this.m_id.key = 0
    }, M.prototype.Set = function (e) {
        this.m_localPoint.SetV(e.m_localPoint), this.m_normalImpulse = e.m_normalImpulse, this.m_tangentImpulse = e.m_tangentImpulse, this.m_id.Set(e.m_id)
    }, _.b2Point = function () {
        this.p = new d
    }, _.prototype.Support = function (e, t, n) {
        return t === undefined && (t = 0), n === undefined && (n = 0), this.p
    }, _.prototype.GetFirstVertex = function (e) {
        return this.p
    }, D.b2RayCastInput = function () {
        this.p1 = new d, this.p2 = new d
    }, D.prototype.b2RayCastInput = function (e, t, n) {
        e === undefined && (e = null), t === undefined && (t = null), n === undefined && (n = 1), e && this.p1.SetV(e), t && this.p2.SetV(t), this.maxFraction = n
    }, P.b2RayCastOutput = function () {
        this.normal = new d
    }, H.b2Segment = function () {
        this.p1 = new d, this.p2 = new d
    }, H.prototype.TestSegment = function (e, t, n, r) {
        r === undefined && (r = 0);
        var i = n.p1,
            s = n.p2.x - i.x,
            o = n.p2.y - i.y,
            u = this.p2.x - this.p1.x,
            a = this.p2.y - this.p1.y,
            f = a,
            l = -u,
            c = 100 * Number.MIN_VALUE,
            h = -(s * f + o * l);
        if (h > c) {
            var p = i.x - this.p1.x,
                d = i.y - this.p1.y,
                v = p * f + d * l;
            if (0 <= v && v <= r * h) {
                var m = -s * d + o * p;
                if (-c * h <= m && m <= h * (1 + c)) {
                    v /= h;
                    var g = Math.sqrt(f * f + l * l);
                    return f /= g, l /= g, e[0] = v, t.Set(f, l), true
                }
            }
        }
        return false
    }, H.prototype.Extend = function (e) {
        this.ExtendForward(e), this.ExtendBackward(e)
    }, H.prototype.ExtendForward = function (e) {
        var t = this.p2.x - this.p1.x,
            n = this.p2.y - this.p1.y,
            r = Math.min(t > 0 ? (e.upperBound.x - this.p1.x) / t : t < 0 ? (e.lowerBound.x - this.p1.x) / t : Number.POSITIVE_INFINITY, n > 0 ? (e.upperBound.y - this.p1.y) / n : n < 0 ? (e.lowerBound.y - this.p1.y) / n : Number.POSITIVE_INFINITY);
        this.p2.x = this.p1.x + t * r, this.p2.y = this.p1.y + n * r
    }, H.prototype.ExtendBackward = function (e) {
        var t = -this.p2.x + this.p1.x,
            n = -this.p2.y + this.p1.y,
            r = Math.min(t > 0 ? (e.upperBound.x - this.p2.x) / t : t < 0 ? (e.lowerBound.x - this.p2.x) / t : Number.POSITIVE_INFINITY, n > 0 ? (e.upperBound.y - this.p2.y) / n : n < 0 ? (e.lowerBound.y - this.p2.y) / n : Number.POSITIVE_INFINITY);
        this.p1.x = this.p2.x + t * r, this.p1.y = this.p2.y + n * r
    }, B.b2SeparationFunction = function () {
        this.m_localPoint = new d, this.m_axis = new d
    }, B.prototype.Initialize = function (e, t, n, r, i) {
        this.m_proxyA = t, this.m_proxyB = r;
        var s = parseInt(e.count);
        a.b2Assert(0 < s && s < 3);
        var o, u, f, l, h, p, v = 0,
            m = 0,
            g = 0,
            y = 0,
            b = 0,
            w = 0,
            E, S, x = 0,
            T = 0;
        if (s == 1) this.m_type = B.e_points, o = this.m_proxyA.GetVertex(e.indexA[0]), l = this.m_proxyB.GetVertex(e.indexB[0]), S = o, E = n.R, v = n.position.x + (E.col1.x * S.x + E.col2.x * S.y), m = n.position.y + (E.col1.y * S.x + E.col2.y * S.y), S = l, E = i.R, g = i.position.x + (E.col1.x * S.x + E.col2.x * S.y), y = i.position.y + (E.col1.y * S.x + E.col2.y * S.y), this.m_axis.x = g - v, this.m_axis.y = y - m, this.m_axis.Normalize();
        else if (e.indexB[0] == e.indexB[1]) this.m_type = B.e_faceA, u = this.m_proxyA.GetVertex(e.indexA[0]), f = this.m_proxyA.GetVertex(e.indexA[1]), l = this.m_proxyB.GetVertex(e.indexB[0]), this.m_localPoint.x = .5 * (u.x + f.x), this.m_localPoint.y = .5 * (u.y + f.y), this.m_axis = c.CrossVF(c.SubtractVV(f, u), 1), this.m_axis.Normalize(), S = this.m_axis, E = n.R, b = E.col1.x * S.x + E.col2.x * S.y, w = E.col1.y * S.x + E.col2.y * S.y, S = this.m_localPoint, E = n.R, v = n.position.x + (E.col1.x * S.x + E.col2.x * S.y), m = n.position.y + (E.col1.y * S.x + E.col2.y * S.y), S = l, E = i.R, g = i.position.x + (E.col1.x * S.x + E.col2.x * S.y), y = i.position.y + (E.col1.y * S.x + E.col2.y * S.y), x = (g - v) * b + (y - m) * w, x < 0 && this.m_axis.NegativeSelf();
        else if (e.indexA[0] == e.indexA[0]) this.m_type = B.e_faceB, h = this.m_proxyB.GetVertex(e.indexB[0]), p = this.m_proxyB.GetVertex(e.indexB[1]), o = this.m_proxyA.GetVertex(e.indexA[0]), this.m_localPoint.x = .5 * (h.x + p.x), this.m_localPoint.y = .5 * (h.y + p.y), this.m_axis = c.CrossVF(c.SubtractVV(p, h), 1), this.m_axis.Normalize(), S = this.m_axis, E = i.R, b = E.col1.x * S.x + E.col2.x * S.y, w = E.col1.y * S.x + E.col2.y * S.y, S = this.m_localPoint, E = i.R, g = i.position.x + (E.col1.x * S.x + E.col2.x * S.y), y = i.position.y + (E.col1.y * S.x + E.col2.y * S.y), S = o, E = n.R, v = n.position.x + (E.col1.x * S.x + E.col2.x * S.y), m = n.position.y + (E.col1.y * S.x + E.col2.y * S.y), x = (v - g) * b + (m - y) * w, x < 0 && this.m_axis.NegativeSelf();
        else {
            u = this.m_proxyA.GetVertex(e.indexA[0]), f = this.m_proxyA.GetVertex(e.indexA[1]), h = this.m_proxyB.GetVertex(e.indexB[0]), p = this.m_proxyB.GetVertex(e.indexB[1]);
            var N = c.MulX(n, o),
                C = c.MulMV(n.R, c.SubtractVV(f, u)),
                k = c.MulX(i, l),
                L = c.MulMV(i.R, c.SubtractVV(p, h)),
                A = C.x * C.x + C.y * C.y,
                O = L.x * L.x + L.y * L.y,
                M = c.SubtractVV(L, C),
                _ = C.x * M.x + C.y * M.y,
                D = L.x * M.x + L.y * M.y,
                P = C.x * L.x + C.y * L.y,
                H = A * O - P * P;
            x = 0, H != 0 && (x = c.Clamp((P * D - _ * O) / H, 0, 1));
            var j = (P * x + D) / O;
            j < 0 && (j = 0, x = c.Clamp((P - _) / A, 0, 1)), o = new d, o.x = u.x + x * (f.x - u.x), o.y = u.y + x * (f.y - u.y), l = new d, l.x = h.x + x * (p.x - h.x), l.y = h.y + x * (p.y - h.y), x == 0 || x == 1 ? (this.m_type = B.e_faceB, this.m_axis = c.CrossVF(c.SubtractVV(p, h), 1), this.m_axis.Normalize(), this.m_localPoint = l, S = this.m_axis, E = i.R, b = E.col1.x * S.x + E.col2.x * S.y, w = E.col1.y * S.x + E.col2.y * S.y, S = this.m_localPoint, E = i.R, g = i.position.x + (E.col1.x * S.x + E.col2.x * S.y), y = i.position.y + (E.col1.y * S.x + E.col2.y * S.y), S = o, E = n.R, v = n.position.x + (E.col1.x * S.x + E.col2.x * S.y), m = n.position.y + (E.col1.y * S.x + E.col2.y * S.y), T = (v - g) * b + (m - y) * w, x < 0 && this.m_axis.NegativeSelf()) : (this.m_type = B.e_faceA, this.m_axis = c.CrossVF(c.SubtractVV(f, u), 1), this.m_localPoint = o, S = this.m_axis, E = n.R, b = E.col1.x * S.x + E.col2.x * S.y, w = E.col1.y * S.x + E.col2.y * S.y, S = this.m_localPoint, E = n.R, v = n.position.x + (E.col1.x * S.x + E.col2.x * S.y), m = n.position.y + (E.col1.y * S.x + E.col2.y * S.y), S = l, E = i.R, g = i.position.x + (E.col1.x * S.x + E.col2.x * S.y), y = i.position.y + (E.col1.y * S.x + E.col2.y * S.y), T = (g - v) * b + (y - m) * w, x < 0 && this.m_axis.NegativeSelf())
        }
    }, B.prototype.Evaluate = function (e, t) {
        var n, r, i, s, o, u, f = 0,
            l;
        switch (this.m_type) {
            case B.e_points:
                return n = c.MulTMV(e.R, this.m_axis), r = c.MulTMV(t.R, this.m_axis.GetNegative()), i = this.m_proxyA.GetSupportVertex(n), s = this.m_proxyB.GetSupportVertex(r), o = c.MulX(e, i), u = c.MulX(t, s), f = (u.x - o.x) * this.m_axis.x + (u.y - o.y) * this.m_axis.y, f;
            case B.e_faceA:
                return l = c.MulMV(e.R, this.m_axis), o = c.MulX(e, this.m_localPoint), r = c.MulTMV(t.R, l.GetNegative()), s = this.m_proxyB.GetSupportVertex(r), u = c.MulX(t, s), f = (u.x - o.x) * l.x + (u.y - o.y) * l.y, f;
            case B.e_faceB:
                return l = c.MulMV(t.R, this.m_axis), u = c.MulX(t, this.m_localPoint), n = c.MulTMV(e.R, l.GetNegative()), i = this.m_proxyA.GetSupportVertex(n), o = c.MulX(e, i), f = (o.x - u.x) * l.x + (o.y - u.y) * l.y, f;
            default:
                return a.b2Assert(false), 0
        }
    }, Box2D.postDefs.push(function () {
        Box2D.Collision.b2SeparationFunction.e_points = 1, Box2D.Collision.b2SeparationFunction.e_faceA = 2, Box2D.Collision.b2SeparationFunction.e_faceB = 4
    }), j.b2Simplex = function () {
        this.m_v1 = new I, this.m_v2 = new I, this.m_v3 = new I, this.m_vertices = new Vector(3)
    }, j.prototype.b2Simplex = function () {
        this.m_vertices[0] = this.m_v1, this.m_vertices[1] = this.m_v2, this.m_vertices[2] = this.m_v3
    }, j.prototype.ReadCache = function (e, t, n, r, i) {
        a.b2Assert(0 <= e.count && e.count <= 3);
        var s, o;
        this.m_count = e.count;
        var u = this.m_vertices;
        for (var f = 0; f < this.m_count; f++) {
            var l = u[f];
            l.indexA = e.indexA[f], l.indexB = e.indexB[f], s = t.GetVertex(l.indexA), o = r.GetVertex(l.indexB), l.wA = c.MulX(n, s), l.wB = c.MulX(i, o), l.w = c.SubtractVV(l.wB, l.wA), l.a = 0
        }
        if (this.m_count > 1) {
            var h = e.metric,
                p = this.GetMetric();
            if (p < .5 * h || 2 * h < p || p < Number.MIN_VALUE) this.m_count = 0
        }
        this.m_count == 0 && (l = u[0], l.indexA = 0, l.indexB = 0, s = t.GetVertex(0), o = r.GetVertex(0), l.wA = c.MulX(n, s), l.wB = c.MulX(i, o), l.w = c.SubtractVV(l.wB, l.wA), this.m_count = 1)
    }, j.prototype.WriteCache = function (e) {
        e.metric = this.GetMetric(), e.count = Box2D.parseUInt(this.m_count);
        var t = this.m_vertices;
        for (var n = 0; n < this.m_count; n++) e.indexA[n] = Box2D.parseUInt(t[n].indexA), e.indexB[n] = Box2D.parseUInt(t[n].indexB)
    }, j.prototype.GetSearchDirection = function () {
        switch (this.m_count) {
            case 1:
                return this.m_v1.w.GetNegative();
            case 2:
                var e = c.SubtractVV(this.m_v2.w, this.m_v1.w),
                    t = c.CrossVV(e, this.m_v1.w.GetNegative());
                return t > 0 ? c.CrossFV(1, e) : c.CrossVF(e, 1);
            default:
                return a.b2Assert(false), new d
        }
    }, j.prototype.GetClosestPoint = function () {
        switch (this.m_count) {
            case 0:
                return a.b2Assert(false), new d;
            case 1:
                return this.m_v1.w;
            case 2:
                return new d(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
            default:
                return a.b2Assert(false), new d
        }
    }, j.prototype.GetWitnessPoints = function (e, t) {
        switch (this.m_count) {
            case 0:
                a.b2Assert(false);
                break;
            case 1:
                e.SetV(this.m_v1.wA), t.SetV(this.m_v1.wB);
                break;
            case 2:
                e.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x, e.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y, t.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x, t.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                break;
            case 3:
                t.x = e.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x, t.y = e.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
                break;
            default:
                a.b2Assert(false)
        }
    }, j.prototype.GetMetric = function () {
        switch (this.m_count) {
            case 0:
                return a.b2Assert(false), 0;
            case 1:
                return 0;
            case 2:
                return c.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
            case 3:
                return c.CrossVV(c.SubtractVV(this.m_v2.w, this.m_v1.w), c.SubtractVV(this.m_v3.w, this.m_v1.w));
            default:
                return a.b2Assert(false), 0
        }
    }, j.prototype.Solve2 = function () {
        var e = this.m_v1.w,
            t = this.m_v2.w,
            n = c.SubtractVV(t, e),
            r = -(e.x * n.x + e.y * n.y);
        if (r <= 0) {
            this.m_v1.a = 1, this.m_count = 1;
            return
        }
        var i = t.x * n.x + t.y * n.y;
        if (i <= 0) {
            this.m_v2.a = 1, this.m_count = 1, this.m_v1.Set(this.m_v2);
            return
        }
        var s = 1 / (i + r);
        this.m_v1.a = i * s, this.m_v2.a = r * s, this.m_count = 2
    }, j.prototype.Solve3 = function () {
        var e = this.m_v1.w,
            t = this.m_v2.w,
            n = this.m_v3.w,
            r = c.SubtractVV(t, e),
            i = c.Dot(e, r),
            s = c.Dot(t, r),
            o = s,
            u = -i,
            a = c.SubtractVV(n, e),
            f = c.Dot(e, a),
            l = c.Dot(n, a),
            h = l,
            p = -f,
            d = c.SubtractVV(n, t),
            v = c.Dot(t, d),
            m = c.Dot(n, d),
            g = m,
            y = -v,
            b = c.CrossVV(r, a),
            w = b * c.CrossVV(t, n),
            E = b * c.CrossVV(n, e),
            S = b * c.CrossVV(e, t);
        if (u <= 0 && p <= 0) {
            this.m_v1.a = 1, this.m_count = 1;
            return
        }
        if (o > 0 && u > 0 && S <= 0) {
            var x = 1 / (o + u);
            this.m_v1.a = o * x, this.m_v2.a = u * x, this.m_count = 2;
            return
        }
        if (h > 0 && p > 0 && E <= 0) {
            var T = 1 / (h + p);
            this.m_v1.a = h * T, this.m_v3.a = p * T, this.m_count = 2, this.m_v2.Set(this.m_v3);
            return
        }
        if (o <= 0 && y <= 0) {
            this.m_v2.a = 1, this.m_count = 1, this.m_v1.Set(this.m_v2);
            return
        }
        if (h <= 0 && g <= 0) {
            this.m_v3.a = 1, this.m_count = 1, this.m_v1.Set(this.m_v3);
            return
        }
        if (g > 0 && y > 0 && w <= 0) {
            var N = 1 / (g + y);
            this.m_v2.a = g * N, this.m_v3.a = y * N, this.m_count = 2, this.m_v1.Set(this.m_v3);
            return
        }
        var C = 1 / (w + E + S);
        this.m_v1.a = w * C, this.m_v2.a = E * C, this.m_v3.a = S * C, this.m_count = 3
    }, F.b2SimplexCache = function () {
        this.indexA = new Vector_a2j_Number(3), this.indexB = new Vector_a2j_Number(3)
    }, I.b2SimplexVertex = function () {}, I.prototype.Set = function (e) {
        this.wA.SetV(e.wA), this.wB.SetV(e.wB), this.w.SetV(e.w), this.a = e.a, this.indexA = e.indexA, this.indexB = e.indexB
    }, q.b2TimeOfImpact = function () {}, q.TimeOfImpact = function (e) {
        ++q.b2_toiCalls;
        var t = e.proxyA,
            n = e.proxyB,
            r = e.sweepA,
            i = e.sweepB;
        a.b2Assert(r.t0 == i.t0), a.b2Assert(1 - r.t0 > Number.MIN_VALUE);
        var s = t.m_radius + n.m_radius,
            o = e.tolerance,
            u = 0,
            f = 1e3,
            l = 0,
            h = 0;
        q.s_cache.count = 0, q.s_distanceInput.useRadii = false;
        for (;;) {
            r.GetTransform(q.s_xfA, u), i.GetTransform(q.s_xfB, u), q.s_distanceInput.proxyA = t, q.s_distanceInput.proxyB = n, q.s_distanceInput.transformA = q.s_xfA, q.s_distanceInput.transformB = q.s_xfB, S.Distance(q.s_distanceOutput, q.s_cache, q.s_distanceInput);
            if (q.s_distanceOutput.distance <= 0) {
                u = 1;
                break
            }
            q.s_fcn.Initialize(q.s_cache, t, q.s_xfA, n, q.s_xfB);
            var p = q.s_fcn.Evaluate(q.s_xfA, q.s_xfB);
            if (p <= 0) {
                u = 1;
                break
            }
            l == 0 && (p > s ? h = c.Max(s - o, .75 * s) : h = c.Max(p - o, .02 * s));
            if (p - h < .5 * o) {
                if (l == 0) {
                    u = 1;
                    break
                }
                break
            }
            var d = u,
                v = u,
                m = 1,
                g = p;
            r.GetTransform(q.s_xfA, m), i.GetTransform(q.s_xfB, m);
            var y = q.s_fcn.Evaluate(q.s_xfA, q.s_xfB);
            if (y >= h) {
                u = 1;
                break
            }
            var b = 0;
            for (;;) {
                var w = 0;
                b & 1 ? w = v + (h - g) * (m - v) / (y - g) : w = .5 * (v + m), r.GetTransform(q.s_xfA, w), i.GetTransform(q.s_xfB, w);
                var E = q.s_fcn.Evaluate(q.s_xfA, q.s_xfB);
                if (c.Abs(E - h) < .025 * o) {
                    d = w;
                    break
                }
                E > h ? (v = w, g = E) : (m = w, y = E), ++b, ++q.b2_toiRootIters;
                if (b == 50) break
            }
            q.b2_toiMaxRootIters = c.Max(q.b2_toiMaxRootIters, b);
            if (d < (1 + 100 * Number.MIN_VALUE) * u) break;
            u = d, l++, ++q.b2_toiIters;
            if (l == f) break
        }
        return q.b2_toiMaxIters = c.Max(q.b2_toiMaxIters, l), u
    }, Box2D.postDefs.push(function () {
        Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0, Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0, Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0, Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0, Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0, Box2D.Collision.b2TimeOfImpact.s_cache = new F, Box2D.Collision.b2TimeOfImpact.s_distanceInput = new x, Box2D.Collision.b2TimeOfImpact.s_xfA = new p, Box2D.Collision.b2TimeOfImpact.s_xfB = new p, Box2D.Collision.b2TimeOfImpact.s_fcn = new B, Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new T
    }), R.b2TOIInput = function () {
        this.proxyA = new N, this.proxyB = new N, this.sweepA = new h, this.sweepB = new h
    }, U.b2WorldManifold = function () {
        this.m_normal = new d
    }, U.prototype.b2WorldManifold = function () {
        this.m_points = new Vector(a.b2_maxManifoldPoints);
        for (var e = 0; e < a.b2_maxManifoldPoints; e++) this.m_points[e] = new d
    }, U.prototype.Initialize = function (e, t, n, r, i) {
        n === undefined && (n = 0), i === undefined && (i = 0);
        if (e.m_pointCount == 0) return;
        var s = 0,
            o, u, a = 0,
            f = 0,
            l = 0,
            c = 0,
            h = 0,
            p = 0;
        switch (e.m_type) {
            case O.e_circles:
                u = t.R, o = e.m_localPoint;
                var d = t.position.x + u.col1.x * o.x + u.col2.x * o.y,
                    v = t.position.y + u.col1.y * o.x + u.col2.y * o.y;
                u = r.R, o = e.m_points[0].m_localPoint;
                var m = r.position.x + u.col1.x * o.x + u.col2.x * o.y,
                    g = r.position.y + u.col1.y * o.x + u.col2.y * o.y,
                    y = m - d,
                    b = g - v,
                    w = y * y + b * b;
                if (w > Number.MIN_VALUE * Number.MIN_VALUE) {
                    var E = Math.sqrt(w);
                    this.m_normal.x = y / E, this.m_normal.y = b / E
                } else this.m_normal.x = 1, this.m_normal.y = 0;
                var S = d + n * this.m_normal.x,
                    x = v + n * this.m_normal.y,
                    T = m - i * this.m_normal.x,
                    N = g - i * this.m_normal.y;
                this.m_points[0].x = .5 * (S + T), this.m_points[0].y = .5 * (x + N);
                break;
            case O.e_faceA:
                u = t.R, o = e.m_localPlaneNormal, a = u.col1.x * o.x + u.col2.x * o.y, f = u.col1.y * o.x + u.col2.y * o.y, u = t.R, o = e.m_localPoint, l = t.position.x + u.col1.x * o.x + u.col2.x * o.y, c = t.position.y + u.col1.y * o.x + u.col2.y * o.y, this.m_normal.x = a, this.m_normal.y = f;
                for (s = 0; s < e.m_pointCount; s++) u = r.R, o = e.m_points[s].m_localPoint, h = r.position.x + u.col1.x * o.x + u.col2.x * o.y, p = r.position.y + u.col1.y * o.x + u.col2.y * o.y, this.m_points[s].x = h + .5 * (n - (h - l) * a - (p - c) * f - i) * a, this.m_points[s].y = p + .5 * (n - (h - l) * a - (p - c) * f - i) * f;
                break;
            case O.e_faceB:
                u = r.R, o = e.m_localPlaneNormal, a = u.col1.x * o.x + u.col2.x * o.y, f = u.col1.y * o.x + u.col2.y * o.y, u = r.R, o = e.m_localPoint, l = r.position.x + u.col1.x * o.x + u.col2.x * o.y, c = r.position.y + u.col1.y * o.x + u.col2.y * o.y, this.m_normal.x = -a, this.m_normal.y = -f;
                for (s = 0; s < e.m_pointCount; s++) u = t.R, o = e.m_points[s].m_localPoint, h = t.position.x + u.col1.x * o.x + u.col2.x * o.y, p = t.position.y + u.col1.y * o.x + u.col2.y * o.y, this.m_points[s].x = h + .5 * (i - (h - l) * a - (p - c) * f - n) * a, this.m_points[s].y = p + .5 * (i - (h - l) * a - (p - c) * f - n) * f
        }
    }, z.ClipVertex = function () {
        this.v = new d, this.id = new w
    }, z.prototype.Set = function (e) {
        this.v.SetV(e.v), this.id.Set(e.id)
    }, W.Features = function () {}, Object.defineProperty(W.prototype, "referenceEdge", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this._referenceEdge
        }
    }), Object.defineProperty(W.prototype, "referenceEdge", {
        enumerable: false,
        configurable: true,
        set: function (e) {
            e === undefined && (e = 0), this._referenceEdge = e, this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
        }
    }), Object.defineProperty(W.prototype, "incidentEdge", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this._incidentEdge
        }
    }), Object.defineProperty(W.prototype, "incidentEdge", {
        enumerable: false,
        configurable: true,
        set: function (e) {
            e === undefined && (e = 0), this._incidentEdge = e, this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
        }
    }), Object.defineProperty(W.prototype, "incidentVertex", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this._incidentVertex
        }
    }), Object.defineProperty(W.prototype, "incidentVertex", {
        enumerable: false,
        configurable: true,
        set: function (e) {
            e === undefined && (e = 0), this._incidentVertex = e, this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
        }
    }), Object.defineProperty(W.prototype, "flip", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this._flip
        }
    }), Object.defineProperty(W.prototype, "flip", {
        enumerable: false,
        configurable: true,
        set: function (e) {
            e === undefined && (e = 0), this._flip = e, this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
        }
    })
}(), function () {
    var e = Box2D.Common.b2Color,
        t = Box2D.Common.b2internal,
        n = Box2D.Common.b2Settings,
        r = Box2D.Collision.Shapes.b2CircleShape,
        i = Box2D.Collision.Shapes.b2EdgeChainDef,
        s = Box2D.Collision.Shapes.b2EdgeShape,
        o = Box2D.Collision.Shapes.b2MassData,
        u = Box2D.Collision.Shapes.b2PolygonShape,
        a = Box2D.Collision.Shapes.b2Shape,
        f = Box2D.Common.Math.b2Mat22,
        l = Box2D.Common.Math.b2Mat33,
        c = Box2D.Common.Math.b2Math,
        h = Box2D.Common.Math.b2Sweep,
        p = Box2D.Common.Math.b2Transform,
        d = Box2D.Common.Math.b2Vec2,
        v = Box2D.Common.Math.b2Vec3,
        m = Box2D.Dynamics.b2Body,
        g = Box2D.Dynamics.b2BodyDef,
        y = Box2D.Dynamics.b2ContactFilter,
        b = Box2D.Dynamics.b2ContactImpulse,
        w = Box2D.Dynamics.b2ContactListener,
        E = Box2D.Dynamics.b2ContactManager,
        S = Box2D.Dynamics.b2DebugDraw,
        x = Box2D.Dynamics.b2DestructionListener,
        T = Box2D.Dynamics.b2FilterData,
        N = Box2D.Dynamics.b2Fixture,
        C = Box2D.Dynamics.b2FixtureDef,
        k = Box2D.Dynamics.b2Island,
        L = Box2D.Dynamics.b2TimeStep,
        A = Box2D.Dynamics.b2World,
        O = Box2D.Collision.b2AABB,
        M = Box2D.Collision.b2Bound,
        _ = Box2D.Collision.b2BoundValues,
        D = Box2D.Collision.b2Collision,
        P = Box2D.Collision.b2ContactID,
        H = Box2D.Collision.b2ContactPoint,
        B = Box2D.Collision.b2Distance,
        j = Box2D.Collision.b2DistanceInput,
        F = Box2D.Collision.b2DistanceOutput,
        I = Box2D.Collision.b2DistanceProxy,
        q = Box2D.Collision.b2DynamicTree,
        R = Box2D.Collision.b2DynamicTreeBroadPhase,
        U = Box2D.Collision.b2DynamicTreeNode,
        z = Box2D.Collision.b2DynamicTreePair,
        W = Box2D.Collision.b2Manifold,
        X = Box2D.Collision.b2ManifoldPoint,
        V = Box2D.Collision.b2Point,
        $ = Box2D.Collision.b2RayCastInput,
        J = Box2D.Collision.b2RayCastOutput,
        K = Box2D.Collision.b2Segment,
        Q = Box2D.Collision.b2SeparationFunction,
        G = Box2D.Collision.b2Simplex,
        Y = Box2D.Collision.b2SimplexCache,
        Z = Box2D.Collision.b2SimplexVertex,
        et = Box2D.Collision.b2TimeOfImpact,
        tt = Box2D.Collision.b2TOIInput,
        nt = Box2D.Collision.b2WorldManifold,
        rt = Box2D.Collision.ClipVertex,
        it = Box2D.Collision.Features,
        st = Box2D.Collision.IBroadPhase;
    Box2D.inherit(r, Box2D.Collision.Shapes.b2Shape), r.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype, r.b2CircleShape = function () {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments), this.m_p = new d
    }, r.prototype.Copy = function () {
        var e = new r;
        return e.Set(this), e
    }, r.prototype.Set = function (e) {
        this.__super.Set.call(this, e);
        if (Box2D.is(e, r)) {
            var t = e instanceof r ? e : null;
            this.m_p.SetV(t.m_p)
        }
    }, r.prototype.TestPoint = function (e, t) {
        var n = e.R,
            r = e.position.x + (n.col1.x * this.m_p.x + n.col2.x * this.m_p.y),
            i = e.position.y + (n.col1.y * this.m_p.x + n.col2.y * this.m_p.y);
        return r = t.x - r, i = t.y - i, r * r + i * i <= this.m_radius * this.m_radius
    }, r.prototype.RayCast = function (e, t, n) {
        var r = n.R,
            i = n.position.x + (r.col1.x * this.m_p.x + r.col2.x * this.m_p.y),
            s = n.position.y + (r.col1.y * this.m_p.x + r.col2.y * this.m_p.y),
            o = t.p1.x - i,
            u = t.p1.y - s,
            a = o * o + u * u - this.m_radius * this.m_radius,
            f = t.p2.x - t.p1.x,
            l = t.p2.y - t.p1.y,
            c = o * f + u * l,
            h = f * f + l * l,
            p = c * c - h * a;
        if (p < 0 || h < Number.MIN_VALUE) return false;
        var d = -(c + Math.sqrt(p));
        return 0 <= d && d <= t.maxFraction * h ? (d /= h, e.fraction = d, e.normal.x = o + d * f, e.normal.y = u + d * l, e.normal.Normalize(), true) : false
    }, r.prototype.ComputeAABB = function (e, t) {
        var n = t.R,
            r = t.position.x + (n.col1.x * this.m_p.x + n.col2.x * this.m_p.y),
            i = t.position.y + (n.col1.y * this.m_p.x + n.col2.y * this.m_p.y);
        e.lowerBound.Set(r - this.m_radius, i - this.m_radius), e.upperBound.Set(r + this.m_radius, i + this.m_radius)
    }, r.prototype.ComputeMass = function (e, t) {
        t === undefined && (t = 0), e.mass = t * n.b2_pi * this.m_radius * this.m_radius, e.center.SetV(this.m_p), e.I = e.mass * (.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
    }, r.prototype.ComputeSubmergedArea = function (e, t, n, r) {
        t === undefined && (t = 0);
        var i = c.MulX(n, this.m_p),
            s = -(c.Dot(e, i) - t);
        if (s < -this.m_radius + Number.MIN_VALUE) return 0;
        if (s > this.m_radius) return r.SetV(i), Math.PI * this.m_radius * this.m_radius;
        var o = this.m_radius * this.m_radius,
            u = s * s,
            a = o * (Math.asin(s / this.m_radius) + Math.PI / 2) + s * Math.sqrt(o - u),
            f = -2 / 3 * Math.pow(o - u, 1.5) / a;
        return r.x = i.x + e.x * f, r.y = i.y + e.y * f, a
    }, r.prototype.GetLocalPosition = function () {
        return this.m_p
    }, r.prototype.SetLocalPosition = function (e) {
        this.m_p.SetV(e)
    }, r.prototype.GetRadius = function () {
        return this.m_radius
    }, r.prototype.SetRadius = function (e) {
        e === undefined && (e = 0), this.m_radius = e
    }, r.prototype.b2CircleShape = function (e) {
        e === undefined && (e = 0), this.__super.b2Shape.call(this), this.m_type = a.e_circleShape, this.m_radius = e
    }, i.b2EdgeChainDef = function () {}, i.prototype.b2EdgeChainDef = function () {
        this.vertexCount = 0, this.isALoop = true, this.vertices = []
    }, Box2D.inherit(s, Box2D.Collision.Shapes.b2Shape), s.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype, s.b2EdgeShape = function () {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments), this.s_supportVec = new d, this.m_v1 = new d, this.m_v2 = new d, this.m_coreV1 = new d, this.m_coreV2 = new d, this.m_normal = new d, this.m_direction = new d, this.m_cornerDir1 = new d, this.m_cornerDir2 = new d
    }, s.prototype.TestPoint = function (e, t) {
        return false
    }, s.prototype.RayCast = function (e, t, n) {
        var r, i = t.p2.x - t.p1.x,
            s = t.p2.y - t.p1.y;
        r = n.R;
        var o = n.position.x + (r.col1.x * this.m_v1.x + r.col2.x * this.m_v1.y),
            u = n.position.y + (r.col1.y * this.m_v1.x + r.col2.y * this.m_v1.y),
            a = n.position.y + (r.col1.y * this.m_v2.x + r.col2.y * this.m_v2.y) - u,
            f = -(n.position.x + (r.col1.x * this.m_v2.x + r.col2.x * this.m_v2.y) - o),
            l = 100 * Number.MIN_VALUE,
            c = -(i * a + s * f);
        if (c > l) {
            var h = t.p1.x - o,
                p = t.p1.y - u,
                d = h * a + p * f;
            if (0 <= d && d <= t.maxFraction * c) {
                var v = -i * p + s * h;
                if (-l * c <= v && v <= c * (1 + l)) {
                    d /= c, e.fraction = d;
                    var m = Math.sqrt(a * a + f * f);
                    return e.normal.x = a / m, e.normal.y = f / m, true
                }
            }
        }
        return false
    }, s.prototype.ComputeAABB = function (e, t) {
        var n = t.R,
            r = t.position.x + (n.col1.x * this.m_v1.x + n.col2.x * this.m_v1.y),
            i = t.position.y + (n.col1.y * this.m_v1.x + n.col2.y * this.m_v1.y),
            s = t.position.x + (n.col1.x * this.m_v2.x + n.col2.x * this.m_v2.y),
            o = t.position.y + (n.col1.y * this.m_v2.x + n.col2.y * this.m_v2.y);
        r < s ? (e.lowerBound.x = r, e.upperBound.x = s) : (e.lowerBound.x = s, e.upperBound.x = r), i < o ? (e.lowerBound.y = i, e.upperBound.y = o) : (e.lowerBound.y = o, e.upperBound.y = i)
    }, s.prototype.ComputeMass = function (e, t) {
        t === undefined && (t = 0), e.mass = 0, e.center.SetV(this.m_v1), e.I = 0
    }, s.prototype.ComputeSubmergedArea = function (e, t, n, r) {
        t === undefined && (t = 0);
        var i = new d(e.x * t, e.y * t),
            s = c.MulX(n, this.m_v1),
            o = c.MulX(n, this.m_v2),
            u = c.Dot(e, s) - t,
            a = c.Dot(e, o) - t;
        if (u > 0) {
            if (a > 0) return 0;
            s.x = -a / (u - a) * s.x + u / (u - a) * o.x, s.y = -a / (u - a) * s.y + u / (u - a) * o.y
        } else a > 0 && (o.x = -a / (u - a) * s.x + u / (u - a) * o.x, o.y = -a / (u - a) * s.y + u / (u - a) * o.y);
        return r.x = (i.x + s.x + o.x) / 3, r.y = (i.y + s.y + o.y) / 3, .5 * ((s.x - i.x) * (o.y - i.y) - (s.y - i.y) * (o.x - i.x))
    }, s.prototype.GetLength = function () {
        return this.m_length
    }, s.prototype.GetVertex1 = function () {
        return this.m_v1
    }, s.prototype.GetVertex2 = function () {
        return this.m_v2
    }, s.prototype.GetCoreVertex1 = function () {
        return this.m_coreV1
    }, s.prototype.GetCoreVertex2 = function () {
        return this.m_coreV2
    }, s.prototype.GetNormalVector = function () {
        return this.m_normal
    }, s.prototype.GetDirectionVector = function () {
        return this.m_direction
    }, s.prototype.GetCorner1Vector = function () {
        return this.m_cornerDir1
    }, s.prototype.GetCorner2Vector = function () {
        return this.m_cornerDir2
    }, s.prototype.Corner1IsConvex = function () {
        return this.m_cornerConvex1
    }, s.prototype.Corner2IsConvex = function () {
        return this.m_cornerConvex2
    }, s.prototype.GetFirstVertex = function (e) {
        var t = e.R;
        return new d(e.position.x + (t.col1.x * this.m_coreV1.x + t.col2.x * this.m_coreV1.y), e.position.y + (t.col1.y * this.m_coreV1.x + t.col2.y * this.m_coreV1.y))
    }, s.prototype.GetNextEdge = function () {
        return this.m_nextEdge
    }, s.prototype.GetPrevEdge = function () {
        return this.m_prevEdge
    }, s.prototype.Support = function (e, t, n) {
        t === undefined && (t = 0), n === undefined && (n = 0);
        var r = e.R,
            i = e.position.x + (r.col1.x * this.m_coreV1.x + r.col2.x * this.m_coreV1.y),
            s = e.position.y + (r.col1.y * this.m_coreV1.x + r.col2.y * this.m_coreV1.y),
            o = e.position.x + (r.col1.x * this.m_coreV2.x + r.col2.x * this.m_coreV2.y),
            u = e.position.y + (r.col1.y * this.m_coreV2.x + r.col2.y * this.m_coreV2.y);
        return i * t + s * n > o * t + u * n ? (this.s_supportVec.x = i, this.s_supportVec.y = s) : (this.s_supportVec.x = o, this.s_supportVec.y = u), this.s_supportVec
    }, s.prototype.b2EdgeShape = function (e, t) {
        this.__super.b2Shape.call(this), this.m_type = a.e_edgeShape, this.m_prevEdge = null, this.m_nextEdge = null, this.m_v1 = e, this.m_v2 = t, this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y), this.m_length = this.m_direction.Normalize(), this.m_normal.Set(this.m_direction.y, -this.m_direction.x), this.m_coreV1.Set(-n.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -n.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y), this.m_coreV2.Set(-n.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -n.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y), this.m_cornerDir1 = this.m_normal, this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
    }, s.prototype.SetPrevEdge = function (e, t, n, r) {
        this.m_prevEdge = e, this.m_coreV1 = t, this.m_cornerDir1 = n, this.m_cornerConvex1 = r
    }, s.prototype.SetNextEdge = function (e, t, n, r) {
        this.m_nextEdge = e, this.m_coreV2 = t, this.m_cornerDir2 = n, this.m_cornerConvex2 = r
    }, o.b2MassData = function () {
        this.mass = 0, this.center = new d(0, 0), this.I = 0
    }, Box2D.inherit(u, Box2D.Collision.Shapes.b2Shape), u.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype, u.b2PolygonShape = function () {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
    }, u.prototype.Copy = function () {
        var e = new u;
        return e.Set(this), e
    }, u.prototype.Set = function (e) {
        this.__super.Set.call(this, e);
        if (Box2D.is(e, u)) {
            var t = e instanceof u ? e : null;
            this.m_centroid.SetV(t.m_centroid), this.m_vertexCount = t.m_vertexCount, this.Reserve(this.m_vertexCount);
            for (var n = 0; n < this.m_vertexCount; n++) this.m_vertices[n].SetV(t.m_vertices[n]), this.m_normals[n].SetV(t.m_normals[n])
        }
    }, u.prototype.SetAsArray = function (e, t) {
        t === undefined && (t = 0);
        var n = new Vector,
            r = 0,
            i;
        for (r = 0; r < e.length; ++r) i = e[r], n.push(i);
        this.SetAsVector(n, t)
    }, u.AsArray = function (e, t) {
        t === undefined && (t = 0);
        var n = new u;
        return n.SetAsArray(e, t), n
    }, u.prototype.SetAsVector = function (e, t) {
        t === undefined && (t = 0), t == 0 && (t = e.length), n.b2Assert(2 <= t), this.m_vertexCount = t, this.Reserve(t);
        var r = 0;
        for (r = 0; r < this.m_vertexCount; r++) this.m_vertices[r].SetV(e[r]);
        for (r = 0; r < this.m_vertexCount; ++r) {
            var i = parseInt(r),
                s = parseInt(r + 1 < this.m_vertexCount ? r + 1 : 0),
                o = c.SubtractVV(this.m_vertices[s], this.m_vertices[i]);
            n.b2Assert(o.LengthSquared() > Number.MIN_VALUE), this.m_normals[r].SetV(c.CrossVF(o, 1)), this.m_normals[r].Normalize()
        }
        this.m_centroid = u.ComputeCentroid(this.m_vertices, this.m_vertexCount)
    }, u.AsVector = function (e, t) {
        t === undefined && (t = 0);
        var n = new u;
        return n.SetAsVector(e, t), n
    }, u.prototype.SetAsBox = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0), this.m_vertexCount = 4, this.Reserve(4), this.m_vertices[0].Set(-e, -t), this.m_vertices[1].Set(e, -t), this.m_vertices[2].Set(e, t), this.m_vertices[3].Set(-e, t), this.m_normals[0].Set(0, -1), this.m_normals[1].Set(1, 0), this.m_normals[2].Set(0, 1), this.m_normals[3].Set(-1, 0), this.m_centroid.SetZero()
    }, u.AsBox = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0);
        var n = new u;
        return n.SetAsBox(e, t), n
    }, u.prototype.SetAsOrientedBox = function (e, t, n, r) {
        e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = null), r === undefined && (r = 0), this.m_vertexCount = 4, this.Reserve(4), this.m_vertices[0].Set(-e, -t), this.m_vertices[1].Set(e, -t), this.m_vertices[2].Set(e, t), this.m_vertices[3].Set(-e, t), this.m_normals[0].Set(0, -1), this.m_normals[1].Set(1, 0), this.m_normals[2].Set(0, 1), this.m_normals[3].Set(-1, 0), this.m_centroid = n;
        var i = new p;
        i.position = n, i.R.Set(r);
        for (var s = 0; s < this.m_vertexCount; ++s) this.m_vertices[s] = c.MulX(i, this.m_vertices[s]), this.m_normals[s] = c.MulMV(i.R, this.m_normals[s])
    }, u.AsOrientedBox = function (e, t, n, r) {
        e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = null), r === undefined && (r = 0);
        var i = new u;
        return i.SetAsOrientedBox(e, t, n, r), i
    }, u.prototype.SetAsEdge = function (e, t) {
        this.m_vertexCount = 2, this.Reserve(2), this.m_vertices[0].SetV(e), this.m_vertices[1].SetV(t), this.m_centroid.x = .5 * (e.x + t.x), this.m_centroid.y = .5 * (e.y + t.y), this.m_normals[0] = c.CrossVF(c.SubtractVV(t, e), 1), this.m_normals[0].Normalize(), this.m_normals[1].x = -this.m_normals[0].x, this.m_normals[1].y = -this.m_normals[0].y
    }, u.AsEdge = function (e, t) {
        var n = new u;
        return n.SetAsEdge(e, t), n
    }, u.prototype.TestPoint = function (e, t) {
        var n, r = e.R,
            i = t.x - e.position.x,
            s = t.y - e.position.y,
            o = i * r.col1.x + s * r.col1.y,
            u = i * r.col2.x + s * r.col2.y;
        for (var a = 0; a < this.m_vertexCount; ++a) {
            n = this.m_vertices[a], i = o - n.x, s = u - n.y, n = this.m_normals[a];
            var f = n.x * i + n.y * s;
            if (f > 0) return false
        }
        return true
    }, u.prototype.RayCast = function (e, t, n) {
        var r = 0,
            i = t.maxFraction,
            s = 0,
            o = 0,
            u, a;
        s = t.p1.x - n.position.x, o = t.p1.y - n.position.y, u = n.R;
        var f = s * u.col1.x + o * u.col1.y,
            l = s * u.col2.x + o * u.col2.y;
        s = t.p2.x - n.position.x, o = t.p2.y - n.position.y, u = n.R;
        var c = s * u.col1.x + o * u.col1.y,
            h = s * u.col2.x + o * u.col2.y,
            p = c - f,
            d = h - l,
            v = parseInt(-1);
        for (var m = 0; m < this.m_vertexCount; ++m) {
            a = this.m_vertices[m], s = a.x - f, o = a.y - l, a = this.m_normals[m];
            var g = a.x * s + a.y * o,
                y = a.x * p + a.y * d;
            if (y == 0) {
                if (g < 0) return false
            } else y < 0 && g < r * y ? (r = g / y, v = m) : y > 0 && g < i * y && (i = g / y);
            if (i < r - Number.MIN_VALUE) return false
        }
        return v >= 0 ? (e.fraction = r, u = n.R, a = this.m_normals[v], e.normal.x = u.col1.x * a.x + u.col2.x * a.y, e.normal.y = u.col1.y * a.x + u.col2.y * a.y, true) : false
    }, u.prototype.ComputeAABB = function (e, t) {
        var n = t.R,
            r = this.m_vertices[0],
            i = t.position.x + (n.col1.x * r.x + n.col2.x * r.y),
            s = t.position.y + (n.col1.y * r.x + n.col2.y * r.y),
            o = i,
            u = s;
        for (var a = 1; a < this.m_vertexCount; ++a) {
            r = this.m_vertices[a];
            var f = t.position.x + (n.col1.x * r.x + n.col2.x * r.y),
                l = t.position.y + (n.col1.y * r.x + n.col2.y * r.y);
            i = i < f ? i : f, s = s < l ? s : l, o = o > f ? o : f, u = u > l ? u : l
        }
        e.lowerBound.x = i - this.m_radius, e.lowerBound.y = s - this.m_radius, e.upperBound.x = o + this.m_radius, e.upperBound.y = u + this.m_radius
    }, u.prototype.ComputeMass = function (e, t) {
        t === undefined && (t = 0);
        if (this.m_vertexCount == 2) {
            e.center.x = .5 * (this.m_vertices[0].x + this.m_vertices[1].x), e.center.y = .5 * (this.m_vertices[0].y + this.m_vertices[1].y), e.mass = 0, e.I = 0;
            return
        }
        var n = 0,
            r = 0,
            i = 0,
            s = 0,
            o = 0,
            u = 0,
            a = 1 / 3;
        for (var f = 0; f < this.m_vertexCount; ++f) {
            var l = this.m_vertices[f],
                c = f + 1 < this.m_vertexCount ? this.m_vertices[parseInt(f + 1)] : this.m_vertices[0],
                h = l.x - o,
                p = l.y - u,
                d = c.x - o,
                v = c.y - u,
                m = h * v - p * d,
                g = .5 * m;
            i += g, n += g * a * (o + l.x + c.x), r += g * a * (u + l.y + c.y);
            var y = o,
                b = u,
                w = h,
                E = p,
                S = d,
                x = v,
                T = a * (.25 * (w * w + S * w + S * S) + (y * w + y * S)) + .5 * y * y,
                N = a * (.25 * (E * E + x * E + x * x) + (b * E + b * x)) + .5 * b * b;
            s += m * (T + N)
        }
        e.mass = t * i, n *= 1 / i, r *= 1 / i, e.center.Set(n, r), e.I = t * s
    }, u.prototype.ComputeSubmergedArea = function (e, t, n, r) {
        t === undefined && (t = 0);
        var i = c.MulTMV(n.R, e),
            s = t - c.Dot(e, n.position),
            u = new Vector_a2j_Number,
            a = 0,
            f = parseInt(-1),
            l = parseInt(-1),
            h = false,
            p = 0;
        for (p = 0; p < this.m_vertexCount; ++p) {
            u[p] = c.Dot(i, this.m_vertices[p]) - s;
            var v = u[p] < -Number.MIN_VALUE;
            p > 0 && (v ? h || (f = p - 1, a++) : h && (l = p - 1, a++)), h = v
        }
        switch (a) {
            case 0:
                if (h) {
                    var m = new o;
                    return this.ComputeMass(m, 1), r.SetV(c.MulX(n, m.center)), m.mass
                }
                return 0;
            case 1:
                f == -1 ? f = this.m_vertexCount - 1 : l = this.m_vertexCount - 1
        }
        var g = parseInt((f + 1) % this.m_vertexCount),
            y = parseInt((l + 1) % this.m_vertexCount),
            b = (0 - u[f]) / (u[g] - u[f]),
            w = (0 - u[l]) / (u[y] - u[l]),
            E = new d(this.m_vertices[f].x * (1 - b) + this.m_vertices[g].x * b, this.m_vertices[f].y * (1 - b) + this.m_vertices[g].y * b),
            S = new d(this.m_vertices[l].x * (1 - w) + this.m_vertices[y].x * w, this.m_vertices[l].y * (1 - w) + this.m_vertices[y].y * w),
            x = 0,
            T = new d,
            N = this.m_vertices[g],
            C;
        p = g;
        while (p != y) {
            p = (p + 1) % this.m_vertexCount, p == y ? C = S : C = this.m_vertices[p];
            var k = .5 * ((N.x - E.x) * (C.y - E.y) - (N.y - E.y) * (C.x - E.x));
            x += k, T.x += k * (E.x + N.x + C.x) / 3, T.y += k * (E.y + N.y + C.y) / 3, N = C
        }
        return T.Multiply(1 / x), r.SetV(c.MulX(n, T)), x
    }, u.prototype.GetVertexCount = function () {
        return this.m_vertexCount
    }, u.prototype.GetVertices = function () {
        return this.m_vertices
    }, u.prototype.GetNormals = function () {
        return this.m_normals
    }, u.prototype.GetSupport = function (e) {
        var t = 0,
            n = this.m_vertices[0].x * e.x + this.m_vertices[0].y * e.y;
        for (var r = 1; r < this.m_vertexCount; ++r) {
            var i = this.m_vertices[r].x * e.x + this.m_vertices[r].y * e.y;
            i > n && (t = r, n = i)
        }
        return t
    }, u.prototype.GetSupportVertex = function (e) {
        var t = 0,
            n = this.m_vertices[0].x * e.x + this.m_vertices[0].y * e.y;
        for (var r = 1; r < this.m_vertexCount; ++r) {
            var i = this.m_vertices[r].x * e.x + this.m_vertices[r].y * e.y;
            i > n && (t = r, n = i)
        }
        return this.m_vertices[t]
    }, u.prototype.Validate = function () {
        return false
    }, u.prototype.b2PolygonShape = function () {
        this.__super.b2Shape.call(this), this.m_type = a.e_polygonShape, this.m_centroid = new d, this.m_vertices = new Vector, this.m_normals = new Vector
    }, u.prototype.Reserve = function (e) {
        e === undefined && (e = 0);
        for (var t = parseInt(this.m_vertices.length); t < e; t++) this.m_vertices[t] = new d, this.m_normals[t] = new d
    }, u.ComputeCentroid = function (e, t) {
        t === undefined && (t = 0);
        var n = new d,
            r = 0,
            i = 0,
            s = 0,
            o = 1 / 3;
        for (var u = 0; u < t; ++u) {
            var a = e[u],
                f = u + 1 < t ? e[parseInt(u + 1)] : e[0],
                l = a.x - i,
                c = a.y - s,
                h = f.x - i,
                p = f.y - s,
                v = l * p - c * h,
                m = .5 * v;
            r += m, n.x += m * o * (i + a.x + f.x), n.y += m * o * (s + a.y + f.y)
        }
        return n.x *= 1 / r, n.y *= 1 / r, n
    }, u.ComputeOBB = function (e, t, n) {
        n === undefined && (n = 0);
        var r = 0,
            i = new Vector(n + 1);
        for (r = 0; r < n; ++r) i[r] = t[r];
        i[n] = i[0];
        var s = Number.MAX_VALUE;
        for (r = 1; r <= n; ++r) {
            var o = i[parseInt(r - 1)],
                u = i[r].x - o.x,
                a = i[r].y - o.y,
                f = Math.sqrt(u * u + a * a);
            u /= f, a /= f;
            var l = -a,
                c = u,
                h = Number.MAX_VALUE,
                p = Number.MAX_VALUE,
                d = -Number.MAX_VALUE,
                v = -Number.MAX_VALUE;
            for (var m = 0; m < n; ++m) {
                var g = i[m].x - o.x,
                    y = i[m].y - o.y,
                    b = u * g + a * y,
                    w = l * g + c * y;
                b < h && (h = b), w < p && (p = w), b > d && (d = b), w > v && (v = w)
            }
            var E = (d - h) * (v - p);
            if (E < .95 * s) {
                s = E, e.R.col1.x = u, e.R.col1.y = a, e.R.col2.x = l, e.R.col2.y = c;
                var S = .5 * (h + d),
                    x = .5 * (p + v),
                    T = e.R;
                e.center.x = o.x + (T.col1.x * S + T.col2.x * x), e.center.y = o.y + (T.col1.y * S + T.col2.y * x), e.extents.x = .5 * (d - h), e.extents.y = .5 * (v - p)
            }
        }
    }, Box2D.postDefs.push(function () {
        Box2D.Collision.Shapes.b2PolygonShape.s_mat = new f
    }), a.b2Shape = function () {}, a.prototype.Copy = function () {
        return null
    }, a.prototype.Set = function (e) {
        this.m_radius = e.m_radius
    }, a.prototype.GetType = function () {
        return this.m_type
    }, a.prototype.TestPoint = function (e, t) {
        return false
    }, a.prototype.RayCast = function (e, t, n) {
        return false
    }, a.prototype.ComputeAABB = function (e, t) {}, a.prototype.ComputeMass = function (e, t) {
        t === undefined && (t = 0)
    }, a.prototype.ComputeSubmergedArea = function (e, t, n, r) {
        return t === undefined && (t = 0), 0
    }, a.TestOverlap = function (e, t, n, r) {
        var i = new j;
        i.proxyA = new I, i.proxyA.Set(e), i.proxyB = new I, i.proxyB.Set(n), i.transformA = t, i.transformB = r, i.useRadii = true;
        var s = new Y;
        s.count = 0;
        var o = new F;
        return B.Distance(o, s, i), o.distance < 10 * Number.MIN_VALUE
    }, a.prototype.b2Shape = function () {
        this.m_type = a.e_unknownShape, this.m_radius = n.b2_linearSlop
    }, Box2D.postDefs.push(function () {
        Box2D.Collision.Shapes.b2Shape.e_unknownShape = parseInt(-1), Box2D.Collision.Shapes.b2Shape.e_circleShape = 0, Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1, Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2, Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3, Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1, Box2D.Collision.Shapes.b2Shape.e_missCollide = 0, Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = parseInt(-1)
    })
}(), function () {
    var e = Box2D.Common.b2Color,
        t = Box2D.Common.b2internal,
        n = Box2D.Common.b2Settings,
        r = Box2D.Common.Math.b2Mat22,
        i = Box2D.Common.Math.b2Mat33,
        s = Box2D.Common.Math.b2Math,
        o = Box2D.Common.Math.b2Sweep,
        u = Box2D.Common.Math.b2Transform,
        a = Box2D.Common.Math.b2Vec2,
        f = Box2D.Common.Math.b2Vec3;
    e.b2Color = function () {
        this._r = 0, this._g = 0, this._b = 0
    }, e.prototype.b2Color = function (e, t, n) {
        e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = 0), this._r = Box2D.parseUInt(255 * s.Clamp(e, 0, 1)), this._g = Box2D.parseUInt(255 * s.Clamp(t, 0, 1)), this._b = Box2D.parseUInt(255 * s.Clamp(n, 0, 1))
    }, e.prototype.Set = function (e, t, n) {
        e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = 0), this._r = Box2D.parseUInt(255 * s.Clamp(e, 0, 1)), this._g = Box2D.parseUInt(255 * s.Clamp(t, 0, 1)), this._b = Box2D.parseUInt(255 * s.Clamp(n, 0, 1))
    }, Object.defineProperty(e.prototype, "r", {
        enumerable: false,
        configurable: true,
        set: function (e) {
            e === undefined && (e = 0), this._r = Box2D.parseUInt(255 * s.Clamp(e, 0, 1))
        }
    }), Object.defineProperty(e.prototype, "g", {
        enumerable: false,
        configurable: true,
        set: function (e) {
            e === undefined && (e = 0), this._g = Box2D.parseUInt(255 * s.Clamp(e, 0, 1))
        }
    }), Object.defineProperty(e.prototype, "b", {
        enumerable: false,
        configurable: true,
        set: function (e) {
            e === undefined && (e = 0), this._b = Box2D.parseUInt(255 * s.Clamp(e, 0, 1))
        }
    }), Object.defineProperty(e.prototype, "color", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this._r << 16 | this._g << 8 | this._b
        }
    }), n.b2Settings = function () {}, n.b2MixFriction = function (e, t) {
        return e === undefined && (e = 0), t === undefined && (t = 0), Math.sqrt(e * t)
    }, n.b2MixRestitution = function (e, t) {
        return e === undefined && (e = 0), t === undefined && (t = 0), e > t ? e : t
    }, n.b2Assert = function (e) {
        if (!e) throw "Assertion Failed"
    }, Box2D.postDefs.push(function () {
        Box2D.Common.b2Settings.VERSION = "2.1alpha", Box2D.Common.b2Settings.USHRT_MAX = 65535, Box2D.Common.b2Settings.b2_pi = Math.PI, Box2D.Common.b2Settings.b2_maxManifoldPoints = 2, Box2D.Common.b2Settings.b2_aabbExtension = .1, Box2D.Common.b2Settings.b2_aabbMultiplier = 2, Box2D.Common.b2Settings.b2_polygonRadius = 2 * n.b2_linearSlop, Box2D.Common.b2Settings.b2_linearSlop = .005, Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * n.b2_pi, Box2D.Common.b2Settings.b2_toiSlop = 8 * n.b2_linearSlop, Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32, Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32, Box2D.Common.b2Settings.b2_velocityThreshold = 1, Box2D.Common.b2Settings.b2_maxLinearCorrection = .2, Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * n.b2_pi, Box2D.Common.b2Settings.b2_maxTranslation = 2, Box2D.Common.b2Settings.b2_maxTranslationSquared = n.b2_maxTranslation * n.b2_maxTranslation, Box2D.Common.b2Settings.b2_maxRotation = .5 * n.b2_pi, Box2D.Common.b2Settings.b2_maxRotationSquared = n.b2_maxRotation * n.b2_maxRotation, Box2D.Common.b2Settings.b2_contactBaumgarte = .2, Box2D.Common.b2Settings.b2_timeToSleep = .5, Box2D.Common.b2Settings.b2_linearSleepTolerance = .01, Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * n.b2_pi
    })
}(), function () {
    var e = Box2D.Collision.b2AABB,
        t = Box2D.Common.b2Color,
        n = Box2D.Common.b2internal,
        r = Box2D.Common.b2Settings,
        i = Box2D.Common.Math.b2Mat22,
        s = Box2D.Common.Math.b2Mat33,
        o = Box2D.Common.Math.b2Math,
        u = Box2D.Common.Math.b2Sweep,
        a = Box2D.Common.Math.b2Transform,
        f = Box2D.Common.Math.b2Vec2,
        l = Box2D.Common.Math.b2Vec3;
    i.b2Mat22 = function () {
        this.col1 = new f, this.col2 = new f
    }, i.prototype.b2Mat22 = function () {
        this.SetIdentity()
    }, i.FromAngle = function (e) {
        e === undefined && (e = 0);
        var t = new i;
        return t.Set(e), t
    }, i.FromVV = function (e, t) {
        var n = new i;
        return n.SetVV(e, t), n
    }, i.prototype.Set = function (e) {
        e === undefined && (e = 0);
        var t = Math.cos(e),
            n = Math.sin(e);
        this.col1.x = t, this.col2.x = -n, this.col1.y = n, this.col2.y = t
    }, i.prototype.SetVV = function (e, t) {
        this.col1.SetV(e), this.col2.SetV(t)
    }, i.prototype.Copy = function () {
        var e = new i;
        return e.SetM(this), e
    }, i.prototype.SetM = function (e) {
        this.col1.SetV(e.col1), this.col2.SetV(e.col2)
    }, i.prototype.AddM = function (e) {
        this.col1.x += e.col1.x, this.col1.y += e.col1.y, this.col2.x += e.col2.x, this.col2.y += e.col2.y
    }, i.prototype.SetIdentity = function () {
        this.col1.x = 1, this.col2.x = 0, this.col1.y = 0, this.col2.y = 1
    }, i.prototype.SetZero = function () {
        this.col1.x = 0, this.col2.x = 0, this.col1.y = 0, this.col2.y = 0
    }, i.prototype.GetAngle = function () {
        return Math.atan2(this.col1.y, this.col1.x)
    }, i.prototype.GetInverse = function (e) {
        var t = this.col1.x,
            n = this.col2.x,
            r = this.col1.y,
            i = this.col2.y,
            s = t * i - n * r;
        return s != 0 && (s = 1 / s), e.col1.x = s * i, e.col2.x = -s * n, e.col1.y = -s * r, e.col2.y = s * t, e
    }, i.prototype.Solve = function (e, t, n) {
        t === undefined && (t = 0), n === undefined && (n = 0);
        var r = this.col1.x,
            i = this.col2.x,
            s = this.col1.y,
            o = this.col2.y,
            u = r * o - i * s;
        return u != 0 && (u = 1 / u), e.x = u * (o * t - i * n), e.y = u * (r * n - s * t), e
    }, i.prototype.Abs = function () {
        this.col1.Abs(), this.col2.Abs()
    }, s.b2Mat33 = function () {
        this.col1 = new l, this.col2 = new l, this.col3 = new l
    }, s.prototype.b2Mat33 = function (e, t, n) {
        e === undefined && (e = null), t === undefined && (t = null), n === undefined && (n = null), !e && !t && !n ? (this.col1.SetZero(), this.col2.SetZero(), this.col3.SetZero()) : (this.col1.SetV(e), this.col2.SetV(t), this.col3.SetV(n))
    }, s.prototype.SetVVV = function (e, t, n) {
        this.col1.SetV(e), this.col2.SetV(t), this.col3.SetV(n)
    }, s.prototype.Copy = function () {
        return new s(this.col1, this.col2, this.col3)
    }, s.prototype.SetM = function (e) {
        this.col1.SetV(e.col1), this.col2.SetV(e.col2), this.col3.SetV(e.col3)
    }, s.prototype.AddM = function (e) {
        this.col1.x += e.col1.x, this.col1.y += e.col1.y, this.col1.z += e.col1.z, this.col2.x += e.col2.x, this.col2.y += e.col2.y, this.col2.z += e.col2.z, this.col3.x += e.col3.x, this.col3.y += e.col3.y, this.col3.z += e.col3.z
    }, s.prototype.SetIdentity = function () {
        this.col1.x = 1, this.col2.x = 0, this.col3.x = 0, this.col1.y = 0, this.col2.y = 1, this.col3.y = 0, this.col1.z = 0, this.col2.z = 0, this.col3.z = 1
    }, s.prototype.SetZero = function () {
        this.col1.x = 0, this.col2.x = 0, this.col3.x = 0, this.col1.y = 0, this.col2.y = 0, this.col3.y = 0, this.col1.z = 0, this.col2.z = 0, this.col3.z = 0
    }, s.prototype.Solve22 = function (e, t, n) {
        t === undefined && (t = 0), n === undefined && (n = 0);
        var r = this.col1.x,
            i = this.col2.x,
            s = this.col1.y,
            o = this.col2.y,
            u = r * o - i * s;
        return u != 0 && (u = 1 / u), e.x = u * (o * t - i * n), e.y = u * (r * n - s * t), e
    }, s.prototype.Solve33 = function (e, t, n, r) {
        t === undefined && (t = 0), n === undefined && (n = 0), r === undefined && (r = 0);
        var i = this.col1.x,
            s = this.col1.y,
            o = this.col1.z,
            u = this.col2.x,
            a = this.col2.y,
            f = this.col2.z,
            l = this.col3.x,
            c = this.col3.y,
            h = this.col3.z,
            p = i * (a * h - f * c) + s * (f * l - u * h) + o * (u * c - a * l);
        return p != 0 && (p = 1 / p), e.x = p * (t * (a * h - f * c) + n * (f * l - u * h) + r * (u * c - a * l)), e.y = p * (i * (n * h - r * c) + s * (r * l - t * h) + o * (t * c - n * l)), e.z = p * (i * (a * r - f * n) + s * (f * t - u * r) + o * (u * n - a * t)), e
    }, o.b2Math = function () {}, o.IsValid = function (e) {
        return e === undefined && (e = 0), isFinite(e)
    }, o.Dot = function (e, t) {
        return e.x * t.x + e.y * t.y
    }, o.CrossVV = function (e, t) {
        return e.x * t.y - e.y * t.x
    }, o.CrossVF = function (e, t) {
        t === undefined && (t = 0);
        var n = new f(t * e.y, -t * e.x);
        return n
    }, o.CrossFV = function (e, t) {
        e === undefined && (e = 0);
        var n = new f(-e * t.y, e * t.x);
        return n
    }, o.MulMV = function (e, t) {
        var n = new f(e.col1.x * t.x + e.col2.x * t.y, e.col1.y * t.x + e.col2.y * t.y);
        return n
    }, o.MulTMV = function (e, t) {
        var n = new f(o.Dot(t, e.col1), o.Dot(t, e.col2));
        return n
    }, o.MulX = function (e, t) {
        var n = o.MulMV(e.R, t);
        return n.x += e.position.x, n.y += e.position.y, n
    }, o.MulXT = function (e, t) {
        var n = o.SubtractVV(t, e.position),
            r = n.x * e.R.col1.x + n.y * e.R.col1.y;
        return n.y = n.x * e.R.col2.x + n.y * e.R.col2.y, n.x = r, n
    }, o.AddVV = function (e, t) {
        var n = new f(e.x + t.x, e.y + t.y);
        return n
    }, o.SubtractVV = function (e, t) {
        var n = new f(e.x - t.x, e.y - t.y);
        return n
    }, o.Distance = function (e, t) {
        var n = e.x - t.x,
            r = e.y - t.y;
        return Math.sqrt(n * n + r * r)
    }, o.DistanceSquared = function (e, t) {
        var n = e.x - t.x,
            r = e.y - t.y;
        return n * n + r * r
    }, o.MulFV = function (e, t) {
        e === undefined && (e = 0);
        var n = new f(e * t.x, e * t.y);
        return n
    }, o.AddMM = function (e, t) {
        var n = i.FromVV(o.AddVV(e.col1, t.col1), o.AddVV(e.col2, t.col2));
        return n
    }, o.MulMM = function (e, t) {
        var n = i.FromVV(o.MulMV(e, t.col1), o.MulMV(e, t.col2));
        return n
    }, o.MulTMM = function (e, t) {
        var n = new f(o.Dot(e.col1, t.col1), o.Dot(e.col2, t.col1)),
            r = new f(o.Dot(e.col1, t.col2), o.Dot(e.col2, t.col2)),
            s = i.FromVV(n, r);
        return s
    }, o.Abs = function (e) {
        return e === undefined && (e = 0), e > 0 ? e : -e
    }, o.AbsV = function (e) {
        var t = new f(o.Abs(e.x), o.Abs(e.y));
        return t
    }, o.AbsM = function (e) {
        var t = i.FromVV(o.AbsV(e.col1), o.AbsV(e.col2));
        return t
    }, o.Min = function (e, t) {
        return e === undefined && (e = 0), t === undefined && (t = 0), e < t ? e : t
    }, o.MinV = function (e, t) {
        var n = new f(o.Min(e.x, t.x), o.Min(e.y, t.y));
        return n
    }, o.Max = function (e, t) {
        return e === undefined && (e = 0), t === undefined && (t = 0), e > t ? e : t
    }, o.MaxV = function (e, t) {
        var n = new f(o.Max(e.x, t.x), o.Max(e.y, t.y));
        return n
    }, o.Clamp = function (e, t, n) {
        return e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = 0), e < t ? t : e > n ? n : e
    }, o.ClampV = function (e, t, n) {
        return o.MaxV(t, o.MinV(e, n))
    }, o.Swap = function (e, t) {
        var n = e[0];
        e[0] = t[0], t[0] = n
    }, o.Random = function () {
        return Math.random() * 2 - 1
    }, o.RandomRange = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0);
        var n = Math.random();
        return n = (t - e) * n + e, n
    }, o.NextPowerOfTwo = function (e) {
        return e === undefined && (e = 0), e |= e >> 1 & 2147483647, e |= e >> 2 & 1073741823, e |= e >> 4 & 268435455, e |= e >> 8 & 16777215, e |= e >> 16 & 65535, e + 1
    }, o.IsPowerOfTwo = function (e) {
        e === undefined && (e = 0);
        var t = e > 0 && (e & e - 1) == 0;
        return t
    }, Box2D.postDefs.push(function () {
        Box2D.Common.Math.b2Math.b2Vec2_zero = new f(0, 0), Box2D.Common.Math.b2Math.b2Mat22_identity = i.FromVV(new f(1, 0), new f(0, 1)), Box2D.Common.Math.b2Math.b2Transform_identity = new a(o.b2Vec2_zero, o.b2Mat22_identity)
    }), u.b2Sweep = function () {
        this.localCenter = new f, this.c0 = new f, this.c = new f
    }, u.prototype.Set = function (e) {
        this.localCenter.SetV(e.localCenter), this.c0.SetV(e.c0), this.c.SetV(e.c), this.a0 = e.a0, this.a = e.a, this.t0 = e.t0
    }, u.prototype.Copy = function () {
        var e = new u;
        return e.localCenter.SetV(this.localCenter), e.c0.SetV(this.c0), e.c.SetV(this.c), e.a0 = this.a0, e.a = this.a, e.t0 = this.t0, e
    }, u.prototype.GetTransform = function (e, t) {
        t === undefined && (t = 0), e.position.x = (1 - t) * this.c0.x + t * this.c.x, e.position.y = (1 - t) * this.c0.y + t * this.c.y;
        var n = (1 - t) * this.a0 + t * this.a;
        e.R.Set(n);
        var r = e.R;
        e.position.x -= r.col1.x * this.localCenter.x + r.col2.x * this.localCenter.y, e.position.y -= r.col1.y * this.localCenter.x + r.col2.y * this.localCenter.y
    }, u.prototype.Advance = function (e) {
        e === undefined && (e = 0);
        if (this.t0 < e && 1 - this.t0 > Number.MIN_VALUE) {
            var t = (e - this.t0) / (1 - this.t0);
            this.c0.x = (1 - t) * this.c0.x + t * this.c.x, this.c0.y = (1 - t) * this.c0.y + t * this.c.y, this.a0 = (1 - t) * this.a0 + t * this.a, this.t0 = e
        }
    }, a.b2Transform = function () {
        this.position = new f, this.R = new i
    }, a.prototype.b2Transform = function (e, t) {
        e === undefined && (e = null), t === undefined && (t = null), e && (this.position.SetV(e), this.R.SetM(t))
    }, a.prototype.Initialize = function (e, t) {
        this.position.SetV(e), this.R.SetM(t)
    }, a.prototype.SetIdentity = function () {
        this.position.SetZero(), this.R.SetIdentity()
    }, a.prototype.Set = function (e) {
        this.position.SetV(e.position), this.R.SetM(e.R)
    }, a.prototype.GetAngle = function () {
        return Math.atan2(this.R.col1.y, this.R.col1.x)
    }, f.b2Vec2 = function () {}, f.prototype.b2Vec2 = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0), this.x = e, this.y = t
    }, f.prototype.SetZero = function () {
        this.x = 0, this.y = 0
    }, f.prototype.Set = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0), this.x = e, this.y = t
    }, f.prototype.SetV = function (e) {
        this.x = e.x, this.y = e.y
    }, f.prototype.GetNegative = function () {
        return new f(-this.x, -this.y)
    }, f.prototype.NegativeSelf = function () {
        this.x = -this.x, this.y = -this.y
    }, f.Make = function (e, t) {
        return e === undefined && (e = 0), t === undefined && (t = 0), new f(e, t)
    }, f.prototype.Copy = function () {
        return new f(this.x, this.y)
    }, f.prototype.Add = function (e) {
        this.x += e.x, this.y += e.y
    }, f.prototype.Subtract = function (e) {
        this.x -= e.x, this.y -= e.y
    }, f.prototype.Multiply = function (e) {
        e === undefined && (e = 0), this.x *= e, this.y *= e
    }, f.prototype.MulM = function (e) {
        var t = this.x;
        this.x = e.col1.x * t + e.col2.x * this.y, this.y = e.col1.y * t + e.col2.y * this.y
    }, f.prototype.MulTM = function (e) {
        var t = o.Dot(this, e.col1);
        this.y = o.Dot(this, e.col2), this.x = t
    }, f.prototype.CrossVF = function (e) {
        e === undefined && (e = 0);
        var t = this.x;
        this.x = e * this.y, this.y = -e * t
    }, f.prototype.CrossFV = function (e) {
        e === undefined && (e = 0);
        var t = this.x;
        this.x = -e * this.y, this.y = e * t
    }, f.prototype.MinV = function (e) {
        this.x = this.x < e.x ? this.x : e.x, this.y = this.y < e.y ? this.y : e.y
    }, f.prototype.MaxV = function (e) {
        this.x = this.x > e.x ? this.x : e.x, this.y = this.y > e.y ? this.y : e.y
    }, f.prototype.Abs = function () {
        this.x < 0 && (this.x = -this.x), this.y < 0 && (this.y = -this.y)
    }, f.prototype.Length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }, f.prototype.LengthSquared = function () {
        return this.x * this.x + this.y * this.y
    }, f.prototype.Normalize = function () {
        var e = Math.sqrt(this.x * this.x + this.y * this.y);
        if (e < Number.MIN_VALUE) return 0;
        var t = 1 / e;
        return this.x *= t, this.y *= t, e
    }, f.prototype.IsValid = function () {
        return o.IsValid(this.x) && o.IsValid(this.y)
    }, l.b2Vec3 = function () {}, l.prototype.b2Vec3 = function (e, t, n) {
        e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = 0), this.x = e, this.y = t, this.z = n
    }, l.prototype.SetZero = function () {
        this.x = this.y = this.z = 0
    }, l.prototype.Set = function (e, t, n) {
        e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = 0), this.x = e, this.y = t, this.z = n
    }, l.prototype.SetV = function (e) {
        this.x = e.x, this.y = e.y, this.z = e.z
    }, l.prototype.GetNegative = function () {
        return new l(-this.x, -this.y, -this.z)
    }, l.prototype.NegativeSelf = function () {
        this.x = -this.x, this.y = -this.y, this.z = -this.z
    }, l.prototype.Copy = function () {
        return new l(this.x, this.y, this.z)
    }, l.prototype.Add = function (e) {
        this.x += e.x, this.y += e.y, this.z += e.z
    }, l.prototype.Subtract = function (e) {
        this.x -= e.x, this.y -= e.y, this.z -= e.z
    }, l.prototype.Multiply = function (e) {
        e === undefined && (e = 0), this.x *= e, this.y *= e, this.z *= e
    }
}(), function () {
    var e = Box2D.Dynamics.Controllers.b2ControllerEdge,
        t = Box2D.Common.Math.b2Mat22,
        n = Box2D.Common.Math.b2Mat33,
        r = Box2D.Common.Math.b2Math,
        i = Box2D.Common.Math.b2Sweep,
        s = Box2D.Common.Math.b2Transform,
        o = Box2D.Common.Math.b2Vec2,
        u = Box2D.Common.Math.b2Vec3,
        a = Box2D.Common.b2Color,
        f = Box2D.Common.b2internal,
        l = Box2D.Common.b2Settings,
        c = Box2D.Collision.b2AABB,
        h = Box2D.Collision.b2Bound,
        p = Box2D.Collision.b2BoundValues,
        d = Box2D.Collision.b2Collision,
        v = Box2D.Collision.b2ContactID,
        m = Box2D.Collision.b2ContactPoint,
        g = Box2D.Collision.b2Distance,
        y = Box2D.Collision.b2DistanceInput,
        b = Box2D.Collision.b2DistanceOutput,
        w = Box2D.Collision.b2DistanceProxy,
        E = Box2D.Collision.b2DynamicTree,
        S = Box2D.Collision.b2DynamicTreeBroadPhase,
        x = Box2D.Collision.b2DynamicTreeNode,
        T = Box2D.Collision.b2DynamicTreePair,
        N = Box2D.Collision.b2Manifold,
        C = Box2D.Collision.b2ManifoldPoint,
        k = Box2D.Collision.b2Point,
        L = Box2D.Collision.b2RayCastInput,
        A = Box2D.Collision.b2RayCastOutput,
        O = Box2D.Collision.b2Segment,
        M = Box2D.Collision.b2SeparationFunction,
        _ = Box2D.Collision.b2Simplex,
        D = Box2D.Collision.b2SimplexCache,
        P = Box2D.Collision.b2SimplexVertex,
        H = Box2D.Collision.b2TimeOfImpact,
        B = Box2D.Collision.b2TOIInput,
        j = Box2D.Collision.b2WorldManifold,
        F = Box2D.Collision.ClipVertex,
        I = Box2D.Collision.Features,
        q = Box2D.Collision.IBroadPhase,
        R = Box2D.Collision.Shapes.b2CircleShape,
        U = Box2D.Collision.Shapes.b2EdgeChainDef,
        z = Box2D.Collision.Shapes.b2EdgeShape,
        W = Box2D.Collision.Shapes.b2MassData,
        X = Box2D.Collision.Shapes.b2PolygonShape,
        V = Box2D.Collision.Shapes.b2Shape,
        $ = Box2D.Dynamics.b2Body,
        J = Box2D.Dynamics.b2BodyDef,
        K = Box2D.Dynamics.b2ContactFilter,
        Q = Box2D.Dynamics.b2ContactImpulse,
        G = Box2D.Dynamics.b2ContactListener,
        Y = Box2D.Dynamics.b2ContactManager,
        Z = Box2D.Dynamics.b2DebugDraw,
        et = Box2D.Dynamics.b2DestructionListener,
        tt = Box2D.Dynamics.b2FilterData,
        nt = Box2D.Dynamics.b2Fixture,
        rt = Box2D.Dynamics.b2FixtureDef,
        it = Box2D.Dynamics.b2Island,
        st = Box2D.Dynamics.b2TimeStep,
        ot = Box2D.Dynamics.b2World,
        ut = Box2D.Dynamics.Contacts.b2CircleContact,
        at = Box2D.Dynamics.Contacts.b2Contact,
        ft = Box2D.Dynamics.Contacts.b2ContactConstraint,
        lt = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
        ct = Box2D.Dynamics.Contacts.b2ContactEdge,
        ht = Box2D.Dynamics.Contacts.b2ContactFactory,
        pt = Box2D.Dynamics.Contacts.b2ContactRegister,
        dt = Box2D.Dynamics.Contacts.b2ContactResult,
        vt = Box2D.Dynamics.Contacts.b2ContactSolver,
        mt = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
        gt = Box2D.Dynamics.Contacts.b2NullContact,
        yt = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
        bt = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
        wt = Box2D.Dynamics.Contacts.b2PolygonContact,
        Et = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
        St = Box2D.Dynamics.Controllers.b2Controller,
        xt = Box2D.Dynamics.Joints.b2DistanceJoint,
        Tt = Box2D.Dynamics.Joints.b2DistanceJointDef,
        Nt = Box2D.Dynamics.Joints.b2FrictionJoint,
        Ct = Box2D.Dynamics.Joints.b2FrictionJointDef,
        kt = Box2D.Dynamics.Joints.b2GearJoint,
        Lt = Box2D.Dynamics.Joints.b2GearJointDef,
        At = Box2D.Dynamics.Joints.b2Jacobian,
        Ot = Box2D.Dynamics.Joints.b2Joint,
        Mt = Box2D.Dynamics.Joints.b2JointDef,
        _t = Box2D.Dynamics.Joints.b2JointEdge,
        Dt = Box2D.Dynamics.Joints.b2LineJoint,
        Pt = Box2D.Dynamics.Joints.b2LineJointDef,
        Ht = Box2D.Dynamics.Joints.b2MouseJoint,
        Bt = Box2D.Dynamics.Joints.b2MouseJointDef,
        jt = Box2D.Dynamics.Joints.b2PrismaticJoint,
        Ft = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        It = Box2D.Dynamics.Joints.b2PulleyJoint,
        qt = Box2D.Dynamics.Joints.b2PulleyJointDef,
        Rt = Box2D.Dynamics.Joints.b2RevoluteJoint,
        Ut = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        zt = Box2D.Dynamics.Joints.b2WeldJoint,
        Wt = Box2D.Dynamics.Joints.b2WeldJointDef;
    $.b2Body = function () {
        this.m_xf = new s, this.m_sweep = new i, this.m_linearVelocity = new o, this.m_force = new o
    }, $.prototype.connectEdges = function (e, t, n) {
        n === undefined && (n = 0);
        var i = Math.atan2(t.GetDirectionVector().y, t.GetDirectionVector().x),
            s = Math.tan((i - n) * .5),
            o = r.MulFV(s, t.GetDirectionVector());
        o = r.SubtractVV(o, t.GetNormalVector()), o = r.MulFV(l.b2_toiSlop, o), o = r.AddVV(o, t.GetVertex1());
        var u = r.AddVV(e.GetDirectionVector(), t.GetDirectionVector());
        u.Normalize();
        var a = r.Dot(e.GetDirectionVector(), t.GetNormalVector()) > 0;
        return e.SetNextEdge(t, o, u, a), t.SetPrevEdge(e, o, u, a), i
    }, $.prototype.CreateFixture = function (e) {
        if (this.m_world.IsLocked() == 1) return null;
        var t = new nt;
        t.Create(this, this.m_xf, e);
        if (this.m_flags & $.e_activeFlag) {
            var n = this.m_world.m_contactManager.m_broadPhase;
            t.CreateProxy(n, this.m_xf)
        }
        return t.m_next = this.m_fixtureList, this.m_fixtureList = t, ++this.m_fixtureCount, t.m_body = this, t.m_density > 0 && this.ResetMassData(), this.m_world.m_flags |= ot.e_newFixture, t
    }, $.prototype.CreateFixture2 = function (e, t) {
        t === undefined && (t = 0);
        var n = new rt;
        return n.shape = e, n.density = t, this.CreateFixture(n)
    }, $.prototype.DestroyFixture = function (e) {
        if (this.m_world.IsLocked() == 1) return;
        var t = this.m_fixtureList,
            n = null,
            r = false;
        while (t != null) {
            if (t == e) {
                n ? n.m_next = e.m_next : this.m_fixtureList = e.m_next, r = true;
                break
            }
            n = t, t = t.m_next
        }
        var i = this.m_contactList;
        while (i) {
            var s = i.contact;
            i = i.next;
            var o = s.GetFixtureA(),
                u = s.GetFixtureB();
            (e == o || e == u) && this.m_world.m_contactManager.Destroy(s)
        }
        if (this.m_flags & $.e_activeFlag) {
            var a = this.m_world.m_contactManager.m_broadPhase;
            e.DestroyProxy(a)
        }
        e.Destroy(), e.m_body = null, e.m_next = null, --this.m_fixtureCount, this.ResetMassData()
    }, $.prototype.SetPositionAndAngle = function (e, t) {
        t === undefined && (t = 0);
        var n;
        if (this.m_world.IsLocked() == 1) return;
        this.m_xf.R.Set(t), this.m_xf.position.SetV(e);
        var r = this.m_xf.R,
            i = this.m_sweep.localCenter;
        this.m_sweep.c.x = r.col1.x * i.x + r.col2.x * i.y, this.m_sweep.c.y = r.col1.y * i.x + r.col2.y * i.y, this.m_sweep.c.x += this.m_xf.position.x, this.m_sweep.c.y += this.m_xf.position.y, this.m_sweep.c0.SetV(this.m_sweep.c), this.m_sweep.a0 = this.m_sweep.a = t;
        var s = this.m_world.m_contactManager.m_broadPhase;
        for (n = this.m_fixtureList; n; n = n.m_next) n.Synchronize(s, this.m_xf, this.m_xf);
        this.m_world.m_contactManager.FindNewContacts()
    }, $.prototype.SetTransform = function (e) {
        this.SetPositionAndAngle(e.position, e.GetAngle())
    }, $.prototype.GetTransform = function () {
        return this.m_xf
    }, $.prototype.GetPosition = function () {
        return this.m_xf.position
    }, $.prototype.SetPosition = function (e) {
        this.SetPositionAndAngle(e, this.GetAngle())
    }, $.prototype.GetAngle = function () {
        return this.m_sweep.a
    }, $.prototype.SetAngle = function (e) {
        e === undefined && (e = 0), this.SetPositionAndAngle(this.GetPosition(), e)
    }, $.prototype.GetWorldCenter = function () {
        return this.m_sweep.c
    }, $.prototype.GetLocalCenter = function () {
        return this.m_sweep.localCenter
    }, $.prototype.SetLinearVelocity = function (e) {
        if (this.m_type == $.b2_staticBody) return;
        this.m_linearVelocity.SetV(e)
    }, $.prototype.GetLinearVelocity = function () {
        return this.m_linearVelocity
    }, $.prototype.SetAngularVelocity = function (e) {
        e === undefined && (e = 0);
        if (this.m_type == $.b2_staticBody) return;
        this.m_angularVelocity = e
    }, $.prototype.GetAngularVelocity = function () {
        return this.m_angularVelocity
    }, $.prototype.GetDefinition = function () {
        var e = new J;
        return e.type = this.GetType(), e.allowSleep = (this.m_flags & $.e_allowSleepFlag) == $.e_allowSleepFlag, e.angle = this.GetAngle(), e.angularDamping = this.m_angularDamping, e.angularVelocity = this.m_angularVelocity, e.fixedRotation = (this.m_flags & $.e_fixedRotationFlag) == $.e_fixedRotationFlag, e.bullet = (this.m_flags & $.e_bulletFlag) == $.e_bulletFlag, e.awake = (this.m_flags & $.e_awakeFlag) == $.e_awakeFlag, e.linearDamping = this.m_linearDamping, e.linearVelocity.SetV(this.GetLinearVelocity()), e.position = this.GetPosition(), e.userData = this.GetUserData(), e
    }, $.prototype.ApplyForce = function (e, t) {
        if (this.m_type != $.b2_dynamicBody) return;
        this.IsAwake() == 0 && this.SetAwake(true), this.m_force.x += e.x, this.m_force.y += e.y, this.m_torque += (t.x - this.m_sweep.c.x) * e.y - (t.y - this.m_sweep.c.y) * e.x
    }, $.prototype.ApplyTorque = function (e) {
        e === undefined && (e = 0);
        if (this.m_type != $.b2_dynamicBody) return;
        this.IsAwake() == 0 && this.SetAwake(true), this.m_torque += e
    }, $.prototype.ApplyImpulse = function (e, t) {
        if (this.m_type != $.b2_dynamicBody) return;
        this.IsAwake() == 0 && this.SetAwake(true), this.m_linearVelocity.x += this.m_invMass * e.x, this.m_linearVelocity.y += this.m_invMass * e.y, this.m_angularVelocity += this.m_invI * ((t.x - this.m_sweep.c.x) * e.y - (t.y - this.m_sweep.c.y) * e.x)
    }, $.prototype.Split = function (e) {
        var t = this.GetLinearVelocity().Copy(),
            n = this.GetAngularVelocity(),
            i = this.GetWorldCenter(),
            s = this,
            o = this.m_world.CreateBody(this.GetDefinition()),
            u;
        for (var a = s.m_fixtureList; a;) if (e(a)) {
            var f = a.m_next;
            u ? u.m_next = f : s.m_fixtureList = f, s.m_fixtureCount--, a.m_next = o.m_fixtureList, o.m_fixtureList = a, o.m_fixtureCount++, a.m_body = o, a = f
        } else u = a, a = a.m_next;
        s.ResetMassData(), o.ResetMassData();
        var l = s.GetWorldCenter(),
            c = o.GetWorldCenter(),
            h = r.AddVV(t, r.CrossFV(n, r.SubtractVV(l, i))),
            p = r.AddVV(t, r.CrossFV(n, r.SubtractVV(c, i)));
        return s.SetLinearVelocity(h), o.SetLinearVelocity(p), s.SetAngularVelocity(n), o.SetAngularVelocity(n), s.SynchronizeFixtures(), o.SynchronizeFixtures(), o
    }, $.prototype.Merge = function (e) {
        var t;
        for (t = e.m_fixtureList; t;) {
            var n = t.m_next;
            e.m_fixtureCount--, t.m_next = this.m_fixtureList, this.m_fixtureList = t, this.m_fixtureCount++, t.m_body = i, t = n
        }
        r.m_fixtureCount = 0;
        var r = this,
            i = e,
            s = r.GetWorldCenter(),
            o = i.GetWorldCenter(),
            u = r.GetLinearVelocity().Copy(),
            a = i.GetLinearVelocity().Copy(),
            f = r.GetAngularVelocity(),
            l = i.GetAngularVelocity();
        r.ResetMassData(), this.SynchronizeFixtures()
    }, $.prototype.GetMass = function () {
        return this.m_mass
    }, $.prototype.GetInertia = function () {
        return this.m_I
    }, $.prototype.GetMassData = function (e) {
        e.mass = this.m_mass, e.I = this.m_I, e.center.SetV(this.m_sweep.localCenter)
    }, $.prototype.SetMassData = function (e) {
        l.b2Assert(this.m_world.IsLocked() == 0);
        if (this.m_world.IsLocked() == 1) return;
        if (this.m_type != $.b2_dynamicBody) return;
        this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_mass = e.mass, this.m_mass <= 0 && (this.m_mass = 1), this.m_invMass = 1 / this.m_mass, e.I > 0 && (this.m_flags & $.e_fixedRotationFlag) == 0 && (this.m_I = e.I - this.m_mass * (e.center.x * e.center.x + e.center.y * e.center.y), this.m_invI = 1 / this.m_I);
        var t = this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(e.center), this.m_sweep.c0.SetV(r.MulX(this.m_xf, this.m_sweep.localCenter)), this.m_sweep.c.SetV(this.m_sweep.c0), this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - t.y), this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - t.x)
    }, $.prototype.ResetMassData = function () {
        this.m_mass = 0, this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_sweep.localCenter.SetZero();
        if (this.m_type == $.b2_staticBody || this.m_type == $.b2_kinematicBody) return;
        var e = o.Make(0, 0);
        for (var t = this.m_fixtureList; t; t = t.m_next) {
            if (t.m_density == 0) continue;
            var n = t.GetMassData();
            this.m_mass += n.mass, e.x += n.center.x * n.mass, e.y += n.center.y * n.mass, this.m_I += n.I
        }
        this.m_mass > 0 ? (this.m_invMass = 1 / this.m_mass, e.x *= this.m_invMass, e.y *= this.m_invMass) : (this.m_mass = 1, this.m_invMass = 1), this.m_I > 0 && (this.m_flags & $.e_fixedRotationFlag) == 0 ? (this.m_I -= this.m_mass * (e.x * e.x + e.y * e.y), this.m_I *= this.m_inertiaScale, l.b2Assert(this.m_I > 0), this.m_invI = 1 / this.m_I) : (this.m_I = 0, this.m_invI = 0);
        var i = this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(e), this.m_sweep.c0.SetV(r.MulX(this.m_xf, this.m_sweep.localCenter)), this.m_sweep.c.SetV(this.m_sweep.c0), this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - i.y), this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - i.x)
    }, $.prototype.GetWorldPoint = function (e) {
        var t = this.m_xf.R,
            n = new o(t.col1.x * e.x + t.col2.x * e.y, t.col1.y * e.x + t.col2.y * e.y);
        return n.x += this.m_xf.position.x, n.y += this.m_xf.position.y, n
    }, $.prototype.GetWorldVector = function (e) {
        return r.MulMV(this.m_xf.R, e)
    }, $.prototype.GetLocalPoint = function (e) {
        return r.MulXT(this.m_xf, e)
    }, $.prototype.GetLocalVector = function (e) {
        return r.MulTMV(this.m_xf.R, e)
    }, $.prototype.GetLinearVelocityFromWorldPoint = function (e) {
        return new o(this.m_linearVelocity.x - this.m_angularVelocity * (e.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (e.x - this.m_sweep.c.x))
    }, $.prototype.GetLinearVelocityFromLocalPoint = function (e) {
        var t = this.m_xf.R,
            n = new o(t.col1.x * e.x + t.col2.x * e.y, t.col1.y * e.x + t.col2.y * e.y);
        return n.x += this.m_xf.position.x, n.y += this.m_xf.position.y, new o(this.m_linearVelocity.x - this.m_angularVelocity * (n.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (n.x - this.m_sweep.c.x))
    }, $.prototype.GetLinearDamping = function () {
        return this.m_linearDamping
    }, $.prototype.SetLinearDamping = function (e) {
        e === undefined && (e = 0), this.m_linearDamping = e
    }, $.prototype.GetAngularDamping = function () {
        return this.m_angularDamping
    }, $.prototype.SetAngularDamping = function (e) {
        e === undefined && (e = 0), this.m_angularDamping = e
    }, $.prototype.SetType = function (e) {
        e === undefined && (e = 0);
        if (this.m_type == e) return;
        this.m_type = e, this.ResetMassData(), this.m_type == $.b2_staticBody && (this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0), this.SetAwake(true), this.m_force.SetZero(), this.m_torque = 0;
        for (var t = this.m_contactList; t; t = t.next) t.contact.FlagForFiltering()
    }, $.prototype.GetType = function () {
        return this.m_type
    }, $.prototype.SetBullet = function (e) {
        e ? this.m_flags |= $.e_bulletFlag : this.m_flags &= ~$.e_bulletFlag
    }, $.prototype.IsBullet = function () {
        return (this.m_flags & $.e_bulletFlag) == $.e_bulletFlag
    }, $.prototype.SetSleepingAllowed = function (e) {
        e ? this.m_flags |= $.e_allowSleepFlag : (this.m_flags &= ~$.e_allowSleepFlag, this.SetAwake(true))
    }, $.prototype.SetAwake = function (e) {
        e ? (this.m_flags |= $.e_awakeFlag, this.m_sleepTime = 0) : (this.m_flags &= ~$.e_awakeFlag, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0)
    }, $.prototype.IsAwake = function () {
        return (this.m_flags & $.e_awakeFlag) == $.e_awakeFlag
    }, $.prototype.SetFixedRotation = function (e) {
        e ? this.m_flags |= $.e_fixedRotationFlag : this.m_flags &= ~$.e_fixedRotationFlag, this.ResetMassData()
    }, $.prototype.IsFixedRotation = function () {
        return (this.m_flags & $.e_fixedRotationFlag) == $.e_fixedRotationFlag
    }, $.prototype.SetActive = function (e) {
        if (e == this.IsActive()) return;
        var t, n;
        if (e) {
            this.m_flags |= $.e_activeFlag, t = this.m_world.m_contactManager.m_broadPhase;
            for (n = this.m_fixtureList; n; n = n.m_next) n.CreateProxy(t, this.m_xf)
        } else {
            this.m_flags &= ~$.e_activeFlag, t = this.m_world.m_contactManager.m_broadPhase;
            for (n = this.m_fixtureList; n; n = n.m_next) n.DestroyProxy(t);
            var r = this.m_contactList;
            while (r) {
                var i = r;
                r = r.next, this.m_world.m_contactManager.Destroy(i.contact)
            }
            this.m_contactList = null
        }
    }, $.prototype.IsActive = function () {
        return (this.m_flags & $.e_activeFlag) == $.e_activeFlag
    }, $.prototype.IsSleepingAllowed = function () {
        return (this.m_flags & $.e_allowSleepFlag) == $.e_allowSleepFlag
    }, $.prototype.GetFixtureList = function () {
        return this.m_fixtureList
    }, $.prototype.GetJointList = function () {
        return this.m_jointList
    }, $.prototype.GetControllerList = function () {
        return this.m_controllerList
    }, $.prototype.GetContactList = function () {
        return this.m_contactList
    }, $.prototype.GetNext = function () {
        return this.m_next
    }, $.prototype.GetUserData = function () {
        return this.m_userData
    }, $.prototype.SetUserData = function (e) {
        this.m_userData = e
    }, $.prototype.GetWorld = function () {
        return this.m_world
    }, $.prototype.b2Body = function (e, t) {
        this.m_flags = 0, e.bullet && (this.m_flags |= $.e_bulletFlag), e.fixedRotation && (this.m_flags |= $.e_fixedRotationFlag), e.allowSleep && (this.m_flags |= $.e_allowSleepFlag), e.awake && (this.m_flags |= $.e_awakeFlag), e.active && (this.m_flags |= $.e_activeFlag), this.m_world = t, this.m_xf.position.SetV(e.position), this.m_xf.R.Set(e.angle), this.m_sweep.localCenter.SetZero(), this.m_sweep.t0 = 1, this.m_sweep.a0 = this.m_sweep.a = e.angle;
        var n = this.m_xf.R,
            r = this.m_sweep.localCenter;
        this.m_sweep.c.x = n.col1.x * r.x + n.col2.x * r.y, this.m_sweep.c.y = n.col1.y * r.x + n.col2.y * r.y, this.m_sweep.c.x += this.m_xf.position.x, this.m_sweep.c.y += this.m_xf.position.y, this.m_sweep.c0.SetV(this.m_sweep.c), this.m_jointList = null, this.m_controllerList = null, this.m_contactList = null, this.m_controllerCount = 0, this.m_prev = null, this.m_next = null, this.m_linearVelocity.SetV(e.linearVelocity), this.m_angularVelocity = e.angularVelocity, this.m_linearDamping = e.linearDamping, this.m_angularDamping = e.angularDamping, this.m_force.Set(0, 0), this.m_torque = 0, this.m_sleepTime = 0, this.m_type = e.type, this.m_type == $.b2_dynamicBody ? (this.m_mass = 1, this.m_invMass = 1) : (this.m_mass = 0, this.m_invMass = 0), this.m_I = 0, this.m_invI = 0, this.m_inertiaScale = e.inertiaScale, this.m_userData = e.userData, this.m_fixtureList = null, this.m_fixtureCount = 0
    }, $.prototype.SynchronizeFixtures = function () {
        var e = $.s_xf1;
        e.R.Set(this.m_sweep.a0);
        var t = e.R,
            n = this.m_sweep.localCenter;
        e.position.x = this.m_sweep.c0.x - (t.col1.x * n.x + t.col2.x * n.y), e.position.y = this.m_sweep.c0.y - (t.col1.y * n.x + t.col2.y * n.y);
        var r, i = this.m_world.m_contactManager.m_broadPhase;
        for (r = this.m_fixtureList; r; r = r.m_next) r.Synchronize(i, e, this.m_xf)
    }, $.prototype.SynchronizeTransform = function () {
        this.m_xf.R.Set(this.m_sweep.a);
        var e = this.m_xf.R,
            t = this.m_sweep.localCenter;
        this.m_xf.position.x = this.m_sweep.c.x - (e.col1.x * t.x + e.col2.x * t.y), this.m_xf.position.y = this.m_sweep.c.y - (e.col1.y * t.x + e.col2.y * t.y)
    }, $.prototype.ShouldCollide = function (e) {
        if (this.m_type != $.b2_dynamicBody && e.m_type != $.b2_dynamicBody) return false;
        for (var t = this.m_jointList; t; t = t.next) if (t.other == e && t.joint.m_collideConnected == 0) return false;
        return true
    }, $.prototype.Advance = function (e) {
        e === undefined && (e = 0), this.m_sweep.Advance(e), this.m_sweep.c.SetV(this.m_sweep.c0), this.m_sweep.a = this.m_sweep.a0, this.SynchronizeTransform()
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.b2Body.s_xf1 = new s, Box2D.Dynamics.b2Body.e_islandFlag = 1, Box2D.Dynamics.b2Body.e_awakeFlag = 2, Box2D.Dynamics.b2Body.e_allowSleepFlag = 4, Box2D.Dynamics.b2Body.e_bulletFlag = 8, Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16, Box2D.Dynamics.b2Body.e_activeFlag = 32, Box2D.Dynamics.b2Body.b2_staticBody = 0, Box2D.Dynamics.b2Body.b2_kinematicBody = 1, Box2D.Dynamics.b2Body.b2_dynamicBody = 2
    }), J.b2BodyDef = function () {
        this.position = new o, this.linearVelocity = new o
    }, J.prototype.b2BodyDef = function () {
        this.userData = null, this.position.Set(0, 0), this.angle = 0, this.linearVelocity.Set(0, 0), this.angularVelocity = 0, this.linearDamping = 0, this.angularDamping = 0, this.allowSleep = true, this.awake = true, this.fixedRotation = false, this.bullet = false, this.type = $.b2_staticBody, this.active = true, this.inertiaScale = 1
    }, K.b2ContactFilter = function () {}, K.prototype.ShouldCollide = function (e, t) {
        var n = e.GetFilterData(),
            r = t.GetFilterData();
        if (n.groupIndex == r.groupIndex && n.groupIndex != 0) return n.groupIndex > 0;
        var i = (n.maskBits & r.categoryBits) != 0 && (n.categoryBits & r.maskBits) != 0;
        return i
    }, K.prototype.RayCollide = function (e, t) {
        return e ? this.ShouldCollide(e instanceof nt ? e : null, t) : true
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new K
    }), Q.b2ContactImpulse = function () {
        this.normalImpulses = new Vector_a2j_Number(l.b2_maxManifoldPoints), this.tangentImpulses = new Vector_a2j_Number(l.b2_maxManifoldPoints)
    }, G.b2ContactListener = function () {}, G.prototype.BeginContact = function (e) {}, G.prototype.EndContact = function (e) {}, G.prototype.PreSolve = function (e, t) {}, G.prototype.PostSolve = function (e, t) {}, Box2D.postDefs.push(function () {
        Box2D.Dynamics.b2ContactListener.b2_defaultListener = new G
    }), Y.b2ContactManager = function () {}, Y.prototype.b2ContactManager = function () {
        this.m_world = null, this.m_contactCount = 0, this.m_contactFilter = K.b2_defaultFilter, this.m_contactListener = G.b2_defaultListener, this.m_contactFactory = new ht(this.m_allocator), this.m_broadPhase = new S
    }, Y.prototype.AddPair = function (e, t) {
        var n = e instanceof nt ? e : null,
            r = t instanceof nt ? t : null,
            i = n.GetBody(),
            s = r.GetBody();
        if (i == s) return;
        var o = s.GetContactList();
        while (o) {
            if (o.other == i) {
                var u = o.contact.GetFixtureA(),
                    a = o.contact.GetFixtureB();
                if (u == n && a == r) return;
                if (u == r && a == n) return
            }
            o = o.next
        }
        if (s.ShouldCollide(i) == 0) return;
        if (this.m_contactFilter.ShouldCollide(n, r) == 0) return;
        var f = this.m_contactFactory.Create(n, r);
        n = f.GetFixtureA(), r = f.GetFixtureB(), i = n.m_body, s = r.m_body, f.m_prev = null, f.m_next = this.m_world.m_contactList, this.m_world.m_contactList != null && (this.m_world.m_contactList.m_prev = f), this.m_world.m_contactList = f, f.m_nodeA.contact = f, f.m_nodeA.other = s, f.m_nodeA.prev = null, f.m_nodeA.next = i.m_contactList, i.m_contactList != null && (i.m_contactList.prev = f.m_nodeA), i.m_contactList = f.m_nodeA, f.m_nodeB.contact = f, f.m_nodeB.other = i, f.m_nodeB.prev = null, f.m_nodeB.next = s.m_contactList, s.m_contactList != null && (s.m_contactList.prev = f.m_nodeB), s.m_contactList = f.m_nodeB, ++this.m_world.m_contactCount;
        return
    }, Y.prototype.FindNewContacts = function () {
        this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
    }, Y.prototype.Destroy = function (e) {
        var t = e.GetFixtureA(),
            n = e.GetFixtureB(),
            r = t.GetBody(),
            i = n.GetBody();
        e.IsTouching() && this.m_contactListener.EndContact(e), e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), e == this.m_world.m_contactList && (this.m_world.m_contactList = e.m_next), e.m_nodeA.prev && (e.m_nodeA.prev.next = e.m_nodeA.next), e.m_nodeA.next && (e.m_nodeA.next.prev = e.m_nodeA.prev), e.m_nodeA == r.m_contactList && (r.m_contactList = e.m_nodeA.next), e.m_nodeB.prev && (e.m_nodeB.prev.next = e.m_nodeB.next), e.m_nodeB.next && (e.m_nodeB.next.prev = e.m_nodeB.prev), e.m_nodeB == i.m_contactList && (i.m_contactList = e.m_nodeB.next), this.m_contactFactory.Destroy(e), --this.m_contactCount
    }, Y.prototype.Collide = function () {
        var e = this.m_world.m_contactList;
        while (e) {
            var t = e.GetFixtureA(),
                n = e.GetFixtureB(),
                r = t.GetBody(),
                i = n.GetBody();
            if (r.IsAwake() == 0 && i.IsAwake() == 0) {
                e = e.GetNext();
                continue
            }
            if (e.m_flags & at.e_filterFlag) {
                if (i.ShouldCollide(r) == 0) {
                    var s = e;
                    e = s.GetNext(), this.Destroy(s);
                    continue
                }
                if (this.m_contactFilter.ShouldCollide(t, n) == 0) {
                    s = e, e = s.GetNext(), this.Destroy(s);
                    continue
                }
                e.m_flags &= ~at.e_filterFlag
            }
            var o = t.m_proxy,
                u = n.m_proxy,
                a = this.m_broadPhase.TestOverlap(o, u);
            if (a == 0) {
                s = e, e = s.GetNext(), this.Destroy(s);
                continue
            }
            e.Update(this.m_contactListener), e = e.GetNext()
        }
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.b2ContactManager.s_evalCP = new m
    }), Z.b2DebugDraw = function () {}, Z.prototype.b2DebugDraw = function () {}, Z.prototype.SetFlags = function (e) {
        e === undefined && (e = 0)
    }, Z.prototype.GetFlags = function () {}, Z.prototype.AppendFlags = function (e) {
        e === undefined && (e = 0)
    }, Z.prototype.ClearFlags = function (e) {
        e === undefined && (e = 0)
    }, Z.prototype.SetSprite = function (e) {}, Z.prototype.GetSprite = function () {}, Z.prototype.SetDrawScale = function (e) {
        e === undefined && (e = 0)
    }, Z.prototype.GetDrawScale = function () {}, Z.prototype.SetLineThickness = function (e) {
        e === undefined && (e = 0)
    }, Z.prototype.GetLineThickness = function () {}, Z.prototype.SetAlpha = function (e) {
        e === undefined && (e = 0)
    }, Z.prototype.GetAlpha = function () {}, Z.prototype.SetFillAlpha = function (e) {
        e === undefined && (e = 0)
    }, Z.prototype.GetFillAlpha = function () {}, Z.prototype.SetXFormScale = function (e) {
        e === undefined && (e = 0)
    }, Z.prototype.GetXFormScale = function () {}, Z.prototype.DrawPolygon = function (e, t, n) {
        t === undefined && (t = 0)
    }, Z.prototype.DrawSolidPolygon = function (e, t, n) {
        t === undefined && (t = 0)
    }, Z.prototype.DrawCircle = function (e, t, n) {
        t === undefined && (t = 0)
    }, Z.prototype.DrawSolidCircle = function (e, t, n, r) {
        t === undefined && (t = 0)
    }, Z.prototype.DrawSegment = function (e, t, n) {}, Z.prototype.DrawTransform = function (e) {}, Box2D.postDefs.push(function () {
        Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1, Box2D.Dynamics.b2DebugDraw.e_jointBit = 2, Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4, Box2D.Dynamics.b2DebugDraw.e_pairBit = 8, Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16, Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32
    }), et.b2DestructionListener = function () {}, et.prototype.SayGoodbyeJoint = function (e) {}, et.prototype.SayGoodbyeFixture = function (e) {}, tt.b2FilterData = function () {
        this.categoryBits = 1, this.maskBits = 65535, this.groupIndex = 0
    }, tt.prototype.Copy = function () {
        var e = new tt;
        return e.categoryBits = this.categoryBits, e.maskBits = this.maskBits, e.groupIndex = this.groupIndex, e
    }, nt.b2Fixture = function () {
        this.m_filter = new tt
    }, nt.prototype.GetType = function () {
        return this.m_shape.GetType()
    }, nt.prototype.GetShape = function () {
        return this.m_shape
    }, nt.prototype.SetSensor = function (e) {
        if (this.m_isSensor == e) return;
        this.m_isSensor = e;
        if (this.m_body == null) return;
        var t = this.m_body.GetContactList();
        while (t) {
            var n = t.contact,
                r = n.GetFixtureA(),
                i = n.GetFixtureB();
            (r == this || i == this) && n.SetSensor(r.IsSensor() || i.IsSensor()), t = t.next
        }
    }, nt.prototype.IsSensor = function () {
        return this.m_isSensor
    }, nt.prototype.SetFilterData = function (e) {
        this.m_filter = e.Copy();
        if (this.m_body) return;
        var t = this.m_body.GetContactList();
        while (t) {
            var n = t.contact,
                r = n.GetFixtureA(),
                i = n.GetFixtureB();
            (r == this || i == this) && n.FlagForFiltering(), t = t.next
        }
    }, nt.prototype.GetFilterData = function () {
        return this.m_filter.Copy()
    }, nt.prototype.GetBody = function () {
        return this.m_body
    }, nt.prototype.GetNext = function () {
        return this.m_next
    }, nt.prototype.GetUserData = function () {
        return this.m_userData
    }, nt.prototype.SetUserData = function (e) {
        this.m_userData = e
    }, nt.prototype.TestPoint = function (e) {
        return this.m_shape.TestPoint(this.m_body.GetTransform(), e)
    }, nt.prototype.RayCast = function (e, t) {
        return this.m_shape.RayCast(e, t, this.m_body.GetTransform())
    }, nt.prototype.GetMassData = function (e) {
        return e === undefined && (e = null), e == null && (e = new W), this.m_shape.ComputeMass(e, this.m_density), e
    }, nt.prototype.SetDensity = function (e) {
        e === undefined && (e = 0), this.m_density = e
    }, nt.prototype.GetDensity = function () {
        return this.m_density
    }, nt.prototype.GetFriction = function () {
        return this.m_friction
    }, nt.prototype.SetFriction = function (e) {
        e === undefined && (e = 0), this.m_friction = e
    }, nt.prototype.GetRestitution = function () {
        return this.m_restitution
    }, nt.prototype.SetRestitution = function (e) {
        e === undefined && (e = 0), this.m_restitution = e
    }, nt.prototype.GetAABB = function () {
        return this.m_aabb
    }, nt.prototype.b2Fixture = function () {
        this.m_aabb = new c, this.m_userData = null, this.m_body = null, this.m_next = null, this.m_shape = null, this.m_density = 0, this.m_friction = 0, this.m_restitution = 0
    }, nt.prototype.Create = function (e, t, n) {
        this.m_userData = n.userData, this.m_friction = n.friction, this.m_restitution = n.restitution, this.m_body = e, this.m_next = null, this.m_filter = n.filter.Copy(), this.m_isSensor = n.isSensor, this.m_shape = n.shape.Copy(), this.m_density = n.density
    }, nt.prototype.Destroy = function () {
        this.m_shape = null
    }, nt.prototype.CreateProxy = function (e, t) {
        this.m_shape.ComputeAABB(this.m_aabb, t), this.m_proxy = e.CreateProxy(this.m_aabb, this)
    }, nt.prototype.DestroyProxy = function (e) {
        if (this.m_proxy == null) return;
        e.DestroyProxy(this.m_proxy), this.m_proxy = null
    }, nt.prototype.Synchronize = function (e, t, n) {
        if (!this.m_proxy) return;
        var i = new c,
            s = new c;
        this.m_shape.ComputeAABB(i, t), this.m_shape.ComputeAABB(s, n), this.m_aabb.Combine(i, s);
        var o = r.SubtractVV(n.position, t.position);
        e.MoveProxy(this.m_proxy, this.m_aabb, o)
    }, rt.b2FixtureDef = function () {
        this.filter = new tt
    }, rt.prototype.b2FixtureDef = function () {
        this.shape = null, this.userData = null, this.friction = .2, this.restitution = 0, this.density = 0, this.filter.categoryBits = 1, this.filter.maskBits = 65535, this.filter.groupIndex = 0, this.isSensor = false
    }, it.b2Island = function () {}, it.prototype.b2Island = function () {
        this.m_bodies = new Vector, this.m_contacts = new Vector, this.m_joints = new Vector
    }, it.prototype.Initialize = function (e, t, n, r, i, s) {
        e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = 0);
        var o = 0;
        this.m_bodyCapacity = e, this.m_contactCapacity = t, this.m_jointCapacity = n, this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0, this.m_allocator = r, this.m_listener = i, this.m_contactSolver = s;
        for (o = this.m_bodies.length; o < e; o++) this.m_bodies[o] = null;
        for (o = this.m_contacts.length; o < t; o++) this.m_contacts[o] = null;
        for (o = this.m_joints.length; o < n; o++) this.m_joints[o] = null
    }, it.prototype.Clear = function () {
        this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0
    }, it.prototype.Solve = function (e, t, n) {
        var i = 0,
            s = 0,
            o, u;
        for (i = 0; i < this.m_bodyCount; ++i) {
            o = this.m_bodies[i];
            if (o.GetType() != $.b2_dynamicBody) continue;
            o.m_linearVelocity.x += e.dt * (t.x + o.m_invMass * o.m_force.x), o.m_linearVelocity.y += e.dt * (t.y + o.m_invMass * o.m_force.y), o.m_angularVelocity += e.dt * o.m_invI * o.m_torque, o.m_linearVelocity.Multiply(r.Clamp(1 - e.dt * o.m_linearDamping, 0, 1)), o.m_angularVelocity *= r.Clamp(1 - e.dt * o.m_angularDamping, 0, 1)
        }
        this.m_contactSolver.Initialize(e, this.m_contacts, this.m_contactCount, this.m_allocator);
        var a = this.m_contactSolver;
        a.InitVelocityConstraints(e);
        for (i = 0; i < this.m_jointCount; ++i) u = this.m_joints[i], u.InitVelocityConstraints(e);
        for (i = 0; i < e.velocityIterations; ++i) {
            for (s = 0; s < this.m_jointCount; ++s) u = this.m_joints[s], u.SolveVelocityConstraints(e);
            a.SolveVelocityConstraints()
        }
        for (i = 0; i < this.m_jointCount; ++i) u = this.m_joints[i], u.FinalizeVelocityConstraints();
        a.FinalizeVelocityConstraints();
        for (i = 0; i < this.m_bodyCount; ++i) {
            o = this.m_bodies[i];
            if (o.GetType() == $.b2_staticBody) continue;
            var f = e.dt * o.m_linearVelocity.x,
                c = e.dt * o.m_linearVelocity.y;
            f * f + c * c > l.b2_maxTranslationSquared && (o.m_linearVelocity.Normalize(), o.m_linearVelocity.x *= l.b2_maxTranslation * e.inv_dt, o.m_linearVelocity.y *= l.b2_maxTranslation * e.inv_dt);
            var h = e.dt * o.m_angularVelocity;
            h * h > l.b2_maxRotationSquared && (o.m_angularVelocity < 0 ? o.m_angularVelocity = -l.b2_maxRotation * e.inv_dt : o.m_angularVelocity = l.b2_maxRotation * e.inv_dt), o.m_sweep.c0.SetV(o.m_sweep.c), o.m_sweep.a0 = o.m_sweep.a, o.m_sweep.c.x += e.dt * o.m_linearVelocity.x, o.m_sweep.c.y += e.dt * o.m_linearVelocity.y, o.m_sweep.a += e.dt * o.m_angularVelocity, o.SynchronizeTransform()
        }
        for (i = 0; i < e.positionIterations; ++i) {
            var p = a.SolvePositionConstraints(l.b2_contactBaumgarte),
                d = true;
            for (s = 0; s < this.m_jointCount; ++s) {
                u = this.m_joints[s];
                var v = u.SolvePositionConstraints(l.b2_contactBaumgarte);
                d = d && v
            }
            if (p && d) break
        }
        this.Report(a.m_constraints);
        if (n) {
            var m = Number.MAX_VALUE,
                g = l.b2_linearSleepTolerance * l.b2_linearSleepTolerance,
                y = l.b2_angularSleepTolerance * l.b2_angularSleepTolerance;
            for (i = 0; i < this.m_bodyCount; ++i) {
                o = this.m_bodies[i];
                if (o.GetType() == $.b2_staticBody) continue;
                (o.m_flags & $.e_allowSleepFlag) == 0 && (o.m_sleepTime = 0, m = 0), (o.m_flags & $.e_allowSleepFlag) == 0 || o.m_angularVelocity * o.m_angularVelocity > y || r.Dot(o.m_linearVelocity, o.m_linearVelocity) > g ? (o.m_sleepTime = 0, m = 0) : (o.m_sleepTime += e.dt, m = r.Min(m, o.m_sleepTime))
            }
            if (m >= l.b2_timeToSleep) for (i = 0; i < this.m_bodyCount; ++i) o = this.m_bodies[i], o.SetAwake(false)
        }
    }, it.prototype.SolveTOI = function (e) {
        var t = 0,
            n = 0;
        this.m_contactSolver.Initialize(e, this.m_contacts, this.m_contactCount, this.m_allocator);
        var r = this.m_contactSolver;
        for (t = 0; t < this.m_jointCount; ++t) this.m_joints[t].InitVelocityConstraints(e);
        for (t = 0; t < e.velocityIterations; ++t) {
            r.SolveVelocityConstraints();
            for (n = 0; n < this.m_jointCount; ++n) this.m_joints[n].SolveVelocityConstraints(e)
        }
        for (t = 0; t < this.m_bodyCount; ++t) {
            var i = this.m_bodies[t];
            if (i.GetType() == $.b2_staticBody) continue;
            var s = e.dt * i.m_linearVelocity.x,
                o = e.dt * i.m_linearVelocity.y;
            s * s + o * o > l.b2_maxTranslationSquared && (i.m_linearVelocity.Normalize(), i.m_linearVelocity.x *= l.b2_maxTranslation * e.inv_dt, i.m_linearVelocity.y *= l.b2_maxTranslation * e.inv_dt);
            var u = e.dt * i.m_angularVelocity;
            u * u > l.b2_maxRotationSquared && (i.m_angularVelocity < 0 ? i.m_angularVelocity = -l.b2_maxRotation * e.inv_dt : i.m_angularVelocity = l.b2_maxRotation * e.inv_dt), i.m_sweep.c0.SetV(i.m_sweep.c), i.m_sweep.a0 = i.m_sweep.a, i.m_sweep.c.x += e.dt * i.m_linearVelocity.x, i.m_sweep.c.y += e.dt * i.m_linearVelocity.y, i.m_sweep.a += e.dt * i.m_angularVelocity, i.SynchronizeTransform()
        }
        var a = .75;
        for (t = 0; t < e.positionIterations; ++t) {
            var f = r.SolvePositionConstraints(a),
                c = true;
            for (n = 0; n < this.m_jointCount; ++n) {
                var h = this.m_joints[n].SolvePositionConstraints(l.b2_contactBaumgarte);
                c = c && h
            }
            if (f && c) break
        }
        this.Report(r.m_constraints)
    }, it.prototype.Report = function (e) {
        if (this.m_listener == null) return;
        for (var t = 0; t < this.m_contactCount; ++t) {
            var n = this.m_contacts[t],
                r = e[t];
            for (var i = 0; i < r.pointCount; ++i) it.s_impulse.normalImpulses[i] = r.points[i].normalImpulse, it.s_impulse.tangentImpulses[i] = r.points[i].tangentImpulse;
            this.m_listener.PostSolve(n, it.s_impulse)
        }
    }, it.prototype.AddBody = function (e) {
        e.m_islandIndex = this.m_bodyCount, this.m_bodies[this.m_bodyCount++] = e
    }, it.prototype.AddContact = function (e) {
        this.m_contacts[this.m_contactCount++] = e
    }, it.prototype.AddJoint = function (e) {
        this.m_joints[this.m_jointCount++] = e
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.b2Island.s_impulse = new Q
    }), st.b2TimeStep = function () {}, st.prototype.Set = function (e) {
        this.dt = e.dt, this.inv_dt = e.inv_dt, this.positionIterations = e.positionIterations, this.velocityIterations = e.velocityIterations, this.warmStarting = e.warmStarting
    }, ot.b2World = function () {
        this.s_stack = new Vector, this.m_contactManager = new Y, this.m_contactSolver = new vt, this.m_island = new it
    }, ot.prototype.b2World = function (e, t) {
        this.m_destructionListener = null, this.m_debugDraw = null, this.m_bodyList = null, this.m_contactList = null, this.m_jointList = null, this.m_controllerList = null, this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0, this.m_controllerCount = 0, ot.m_warmStarting = true, ot.m_continuousPhysics = true, this.m_allowSleep = t, this.m_gravity = e, this.m_inv_dt0 = 0, this.m_contactManager.m_world = this;
        var n = new J;
        this.m_groundBody = this.CreateBody(n)
    }, ot.prototype.SetDestructionListener = function (e) {
        this.m_destructionListener = e
    }, ot.prototype.SetContactFilter = function (e) {
        this.m_contactManager.m_contactFilter = e
    }, ot.prototype.SetContactListener = function (e) {
        this.m_contactManager.m_contactListener = e
    }, ot.prototype.SetDebugDraw = function (e) {
        this.m_debugDraw = e
    }, ot.prototype.SetBroadPhase = function (e) {
        var t = this.m_contactManager.m_broadPhase;
        this.m_contactManager.m_broadPhase = e;
        for (var n = this.m_bodyList; n; n = n.m_next) for (var r = n.m_fixtureList; r; r = r.m_next) r.m_proxy = e.CreateProxy(t.GetFatAABB(r.m_proxy), r)
    }, ot.prototype.Validate = function () {
        this.m_contactManager.m_broadPhase.Validate()
    }, ot.prototype.GetProxyCount = function () {
        return this.m_contactManager.m_broadPhase.GetProxyCount()
    }, ot.prototype.CreateBody = function (e) {
        if (this.IsLocked() == 1) return null;
        var t = new $(e, this);
        return t.m_prev = null, t.m_next = this.m_bodyList, this.m_bodyList && (this.m_bodyList.m_prev = t), this.m_bodyList = t, ++this.m_bodyCount, t
    }, ot.prototype.DestroyBody = function (e) {
        if (this.IsLocked() == 1) return;
        var t = e.m_jointList;
        while (t) {
            var n = t;
            t = t.next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(n.joint), this.DestroyJoint(n.joint)
        }
        var r = e.m_controllerList;
        while (r) {
            var i = r;
            r = r.nextController, i.controller.RemoveBody(e)
        }
        var s = e.m_contactList;
        while (s) {
            var o = s;
            s = s.next, this.m_contactManager.Destroy(o.contact)
        }
        e.m_contactList = null;
        var u = e.m_fixtureList;
        while (u) {
            var a = u;
            u = u.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(a), a.DestroyProxy(this.m_contactManager.m_broadPhase), a.Destroy()
        }
        e.m_fixtureList = null, e.m_fixtureCount = 0, e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), e == this.m_bodyList && (this.m_bodyList = e.m_next), --this.m_bodyCount
    }, ot.prototype.CreateJoint = function (e) {
        var t = Ot.Create(e, null);
        t.m_prev = null, t.m_next = this.m_jointList, this.m_jointList && (this.m_jointList.m_prev = t), this.m_jointList = t, ++this.m_jointCount, t.m_edgeA.joint = t, t.m_edgeA.other = t.m_bodyB, t.m_edgeA.prev = null, t.m_edgeA.next = t.m_bodyA.m_jointList, t.m_bodyA.m_jointList && (t.m_bodyA.m_jointList.prev = t.m_edgeA), t.m_bodyA.m_jointList = t.m_edgeA, t.m_edgeB.joint = t, t.m_edgeB.other = t.m_bodyA, t.m_edgeB.prev = null, t.m_edgeB.next = t.m_bodyB.m_jointList, t.m_bodyB.m_jointList && (t.m_bodyB.m_jointList.prev = t.m_edgeB), t.m_bodyB.m_jointList = t.m_edgeB;
        var n = e.bodyA,
            r = e.bodyB;
        if (e.collideConnected == 0) {
            var i = r.GetContactList();
            while (i) i.other == n && i.contact.FlagForFiltering(), i = i.next
        }
        return t
    }, ot.prototype.DestroyJoint = function (e) {
        var t = e.m_collideConnected;
        e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), e == this.m_jointList && (this.m_jointList = e.m_next);
        var n = e.m_bodyA,
            r = e.m_bodyB;
        n.SetAwake(true), r.SetAwake(true), e.m_edgeA.prev && (e.m_edgeA.prev.next = e.m_edgeA.next), e.m_edgeA.next && (e.m_edgeA.next.prev = e.m_edgeA.prev), e.m_edgeA == n.m_jointList && (n.m_jointList = e.m_edgeA.next), e.m_edgeA.prev = null, e.m_edgeA.next = null, e.m_edgeB.prev && (e.m_edgeB.prev.next = e.m_edgeB.next), e.m_edgeB.next && (e.m_edgeB.next.prev = e.m_edgeB.prev), e.m_edgeB == r.m_jointList && (r.m_jointList = e.m_edgeB.next), e.m_edgeB.prev = null, e.m_edgeB.next = null, Ot.Destroy(e, null), --this.m_jointCount;
        if (t == 0) {
            var i = r.GetContactList();
            while (i) i.other == n && i.contact.FlagForFiltering(), i = i.next
        }
    }, ot.prototype.AddController = function (e) {
        return e.m_next = this.m_controllerList, e.m_prev = null, this.m_controllerList = e, e.m_world = this, this.m_controllerCount++, e
    }, ot.prototype.RemoveController = function (e) {
        e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), this.m_controllerList == e && (this.m_controllerList = e.m_next), this.m_controllerCount--
    }, ot.prototype.CreateController = function (e) {
        if (e.m_world != this) throw new Error("Controller can only be a member of one world");
        return e.m_next = this.m_controllerList, e.m_prev = null, this.m_controllerList && (this.m_controllerList.m_prev = e), this.m_controllerList = e, ++this.m_controllerCount, e.m_world = this, e
    }, ot.prototype.DestroyController = function (e) {
        e.Clear(), e.m_next && (e.m_next.m_prev = e.m_prev), e.m_prev && (e.m_prev.m_next = e.m_next), e == this.m_controllerList && (this.m_controllerList = e.m_next), --this.m_controllerCount
    }, ot.prototype.SetWarmStarting = function (e) {
        ot.m_warmStarting = e
    }, ot.prototype.SetContinuousPhysics = function (e) {
        ot.m_continuousPhysics = e
    }, ot.prototype.GetBodyCount = function () {
        return this.m_bodyCount
    }, ot.prototype.GetJointCount = function () {
        return this.m_jointCount
    }, ot.prototype.GetContactCount = function () {
        return this.m_contactCount
    }, ot.prototype.SetGravity = function (e) {
        this.m_gravity = e
    }, ot.prototype.GetGravity = function () {
        return this.m_gravity
    }, ot.prototype.GetGroundBody = function () {
        return this.m_groundBody
    }, ot.prototype.Step = function (e, t, n) {
        e === undefined && (e = 0), t === undefined && (t = 0), n === undefined && (n = 0), this.m_flags & ot.e_newFixture && (this.m_contactManager.FindNewContacts(), this.m_flags &= ~ot.e_newFixture), this.m_flags |= ot.e_locked;
        var r = ot.s_timestep2;
        r.dt = e, r.velocityIterations = t, r.positionIterations = n, e > 0 ? r.inv_dt = 1 / e : r.inv_dt = 0, r.dtRatio = this.m_inv_dt0 * e, r.warmStarting = ot.m_warmStarting, this.m_contactManager.Collide(), r.dt > 0 && this.Solve(r), ot.m_continuousPhysics && r.dt > 0 && this.SolveTOI(r), r.dt > 0 && (this.m_inv_dt0 = r.inv_dt), this.m_flags &= ~ot.e_locked
    }, ot.prototype.ClearForces = function () {
        for (var e = this.m_bodyList; e; e = e.m_next) e.m_force.SetZero(), e.m_torque = 0
    }, ot.prototype.DrawDebugData = function () {
        if (this.m_debugDraw == null) return;
        this.m_debugDraw.m_sprite.graphics.clear();
        var e = this.m_debugDraw.GetFlags(),
            t = 0,
            n, r, i, s, u, f = new o,
            l = new o,
            h = new o,
            p, d = new c,
            v = new c,
            m = [new o, new o, new o, new o],
            g = new a(0, 0, 0);
        if (e & Z.e_shapeBit) for (n = this.m_bodyList; n; n = n.m_next) {
            p = n.m_xf;
            for (r = n.GetFixtureList(); r; r = r.m_next) i = r.GetShape(), n.IsActive() == 0 ? (g.Set(.5, .5, .3), this.DrawShape(i, p, g)) : n.GetType() == $.b2_staticBody ? (g.Set(.5, .9, .5), this.DrawShape(i, p, g)) : n.GetType() == $.b2_kinematicBody ? (g.Set(.5, .5, .9), this.DrawShape(i, p, g)) : n.IsAwake() == 0 ? (g.Set(.6, .6, .6), this.DrawShape(i, p, g)) : (g.Set(.9, .7, .7), this.DrawShape(i, p, g))
        }
        if (e & Z.e_jointBit) for (s = this.m_jointList; s; s = s.m_next) this.DrawJoint(s);
        if (e & Z.e_controllerBit) for (var y = this.m_controllerList; y; y = y.m_next) y.Draw(this.m_debugDraw);
        if (e & Z.e_pairBit) {
            g.Set(.3, .9, .9);
            for (var b = this.m_contactManager.m_contactList; b; b = b.GetNext()) {
                var w = b.GetFixtureA(),
                    E = b.GetFixtureB(),
                    S = w.GetAABB().GetCenter(),
                    x = E.GetAABB().GetCenter();
                this.m_debugDraw.DrawSegment(S, x, g)
            }
        }
        if (e & Z.e_aabbBit) {
            u = this.m_contactManager.m_broadPhase, m = [new o, new o, new o, new o];
            for (n = this.m_bodyList; n; n = n.GetNext()) {
                if (n.IsActive() == 0) continue;
                for (r = n.GetFixtureList(); r; r = r.GetNext()) {
                    var T = u.GetFatAABB(r.m_proxy);
                    m[0].Set(T.lowerBound.x, T.lowerBound.y), m[1].Set(T.upperBound.x, T.lowerBound.y), m[2].Set(T.upperBound.x, T.upperBound.y), m[3].Set(T.lowerBound.x, T.upperBound.y), this.m_debugDraw.DrawPolygon(m, 4, g)
                }
            }
        }
        if (e & Z.e_centerOfMassBit) for (n = this.m_bodyList; n; n = n.m_next) p = ot.s_xf, p.R = n.m_xf.R, p.position = n.GetWorldCenter(), this.m_debugDraw.DrawTransform(p)
    }, ot.prototype.QueryAABB = function (e, t) {
        function i(t) {
            return e(r.GetUserData(t))
        }
        var n = this,
            r = n.m_contactManager.m_broadPhase;
        r.Query(i, t)
    }, ot.prototype.QueryShape = function (e, t, n) {
        function o(r) {
            var s = i.GetUserData(r) instanceof nt ? i.GetUserData(r) : null;
            return V.TestOverlap(t, n, s.GetShape(), s.GetBody().GetTransform()) ? e(s) : true
        }
        var r = this;
        n === undefined && (n = null), n == null && (n = new s, n.SetIdentity());
        var i = r.m_contactManager.m_broadPhase,
            u = new c;
        t.ComputeAABB(u, n), i.Query(o, u)
    }, ot.prototype.QueryPoint = function (e, t) {
        function i(n) {
            var i = r.GetUserData(n) instanceof nt ? r.GetUserData(n) : null;
            return i.TestPoint(t) ? e(i) : true
        }
        var n = this,
            r = n.m_contactManager.m_broadPhase,
            s = new c;
        s.lowerBound.Set(t.x - l.b2_linearSlop, t.y - l.b2_linearSlop), s.upperBound.Set(t.x + l.b2_linearSlop, t.y + l.b2_linearSlop), r.Query(i, s)
    }, ot.prototype.RayCast = function (e, t, n) {
        function u(r, u) {
            var a = i.GetUserData(u),
                f = a instanceof nt ? a : null,
                l = f.RayCast(s, r);
            if (l) {
                var c = s.fraction,
                    h = new o((1 - c) * t.x + c * n.x, (1 - c) * t.y + c * n.y);
                return e(f, h, s.normal, c)
            }
            return r.maxFraction
        }
        var r = this,
            i = r.m_contactManager.m_broadPhase,
            s = new A,
            a = new L(t, n);
        i.RayCast(u, a)
    }, ot.prototype.RayCastOne = function (e, t) {
        function i(e, t, n, i) {
            return i === undefined && (i = 0), r = e, i
        }
        var n = this,
            r;
        return n.RayCast(i, e, t), r
    }, ot.prototype.RayCastAll = function (e, t) {
        function i(e, t, n, i) {
            return i === undefined && (i = 0), r[r.length] = e, 1
        }
        var n = this,
            r = new Vector;
        return n.RayCast(i, e, t), r
    }, ot.prototype.GetBodyList = function () {
        return this.m_bodyList
    }, ot.prototype.GetJointList = function () {
        return this.m_jointList
    }, ot.prototype.GetContactList = function () {
        return this.m_contactList
    }, ot.prototype.IsLocked = function () {
        return (this.m_flags & ot.e_locked) > 0
    }, ot.prototype.Solve = function (e) {
        var t;
        for (var n = this.m_controllerList; n; n = n.m_next) n.Step(e);
        var r = this.m_island;
        r.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        for (t = this.m_bodyList; t; t = t.m_next) t.m_flags &= ~$.e_islandFlag;
        for (var i = this.m_contactList; i; i = i.m_next) i.m_flags &= ~at.e_islandFlag;
        for (var s = this.m_jointList; s; s = s.m_next) s.m_islandFlag = false;
        var o = parseInt(this.m_bodyCount),
            u = this.s_stack;
        for (var a = this.m_bodyList; a; a = a.m_next) {
            if (a.m_flags & $.e_islandFlag) continue;
            if (a.IsAwake() == 0 || a.IsActive() == 0) continue;
            if (a.GetType() == $.b2_staticBody) continue;
            r.Clear();
            var f = 0;
            u[f++] = a, a.m_flags |= $.e_islandFlag;
            while (f > 0) {
                t = u[--f], r.AddBody(t), t.IsAwake() == 0 && t.SetAwake(true);
                if (t.GetType() == $.b2_staticBody) continue;
                var l;
                for (var c = t.m_contactList; c; c = c.next) {
                    if (c.contact.m_flags & at.e_islandFlag) continue;
                    if (c.contact.IsSensor() == 1 || c.contact.IsEnabled() == 0 || c.contact.IsTouching() == 0) continue;
                    r.AddContact(c.contact), c.contact.m_flags |= at.e_islandFlag, l = c.other;
                    if (l.m_flags & $.e_islandFlag) continue;
                    u[f++] = l, l.m_flags |= $.e_islandFlag
                }
                for (var h = t.m_jointList; h; h = h.next) {
                    if (h.joint.m_islandFlag == 1) continue;
                    l = h.other;
                    if (l.IsActive() == 0) continue;
                    r.AddJoint(h.joint), h.joint.m_islandFlag = true;
                    if (l.m_flags & $.e_islandFlag) continue;
                    u[f++] = l, l.m_flags |= $.e_islandFlag
                }
            }
            r.Solve(e, this.m_gravity, this.m_allowSleep);
            for (var p = 0; p < r.m_bodyCount; ++p) t = r.m_bodies[p], t.GetType() == $.b2_staticBody && (t.m_flags &= ~$.e_islandFlag)
        }
        for (p = 0; p < u.length; ++p) {
            if (!u[p]) break;
            u[p] = null
        }
        for (t = this.m_bodyList; t; t = t.m_next) {
            if (t.IsAwake() == 0 || t.IsActive() == 0) continue;
            if (t.GetType() == $.b2_staticBody) continue;
            t.SynchronizeFixtures()
        }
        this.m_contactManager.FindNewContacts()
    }, ot.prototype.SolveTOI = function (e) {
        var t, n, r, i, s, o, u, a = this.m_island;
        a.Initialize(this.m_bodyCount, l.b2_maxTOIContactsPerIsland, l.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        var f = ot.s_queue;
        for (t = this.m_bodyList; t; t = t.m_next) t.m_flags &= ~$.e_islandFlag, t.m_sweep.t0 = 0;
        var c;
        for (c = this.m_contactList; c; c = c.m_next) c.m_flags &= ~ (at.e_toiFlag | at.e_islandFlag);
        for (u = this.m_jointList; u; u = u.m_next) u.m_islandFlag = false;
        for (;;) {
            var h = null,
                p = 1;
            for (c = this.m_contactList; c; c = c.m_next) {
                if (c.IsSensor() == 1 || c.IsEnabled() == 0 || c.IsContinuous() == 0) continue;
                var d = 1;
                if (c.m_flags & at.e_toiFlag) d = c.m_toi;
                else {
                    n = c.m_fixtureA, r = c.m_fixtureB, i = n.m_body, s = r.m_body;
                    if (!(i.GetType() == $.b2_dynamicBody && i.IsAwake() != 0 || s.GetType() == $.b2_dynamicBody && s.IsAwake() != 0)) continue;
                    var v = i.m_sweep.t0;
                    i.m_sweep.t0 < s.m_sweep.t0 ? (v = s.m_sweep.t0, i.m_sweep.Advance(v)) : s.m_sweep.t0 < i.m_sweep.t0 && (v = i.m_sweep.t0, s.m_sweep.Advance(v)), d = c.ComputeTOI(i.m_sweep, s.m_sweep), l.b2Assert(0 <= d && d <= 1), d > 0 && d < 1 && (d = (1 - d) * v + d, d > 1 && (d = 1)), c.m_toi = d, c.m_flags |= at.e_toiFlag
                }
                Number.MIN_VALUE < d && d < p && (h = c, p = d)
            }
            if (h == null || 1 - 100 * Number.MIN_VALUE < p) break;
            n = h.m_fixtureA, r = h.m_fixtureB, i = n.m_body, s = r.m_body, ot.s_backupA.Set(i.m_sweep), ot.s_backupB.Set(s.m_sweep), i.Advance(p), s.Advance(p), h.Update(this.m_contactManager.m_contactListener), h.m_flags &= ~at.e_toiFlag;
            if (h.IsSensor() == 1 || h.IsEnabled() == 0) {
                i.m_sweep.Set(ot.s_backupA), s.m_sweep.Set(ot.s_backupB), i.SynchronizeTransform(), s.SynchronizeTransform();
                continue
            }
            if (h.IsTouching() == 0) continue;
            var m = i;
            m.GetType() != $.b2_dynamicBody && (m = s), a.Clear();
            var g = 0,
                y = 0;
            f[g + y++] = m, m.m_flags |= $.e_islandFlag;
            while (y > 0) {
                t = f[g++], --y, a.AddBody(t), t.IsAwake() == 0 && t.SetAwake(true);
                if (t.GetType() != $.b2_dynamicBody) continue;
                for (o = t.m_contactList; o; o = o.next) {
                    if (a.m_contactCount == a.m_contactCapacity) break;
                    if (o.contact.m_flags & at.e_islandFlag) continue;
                    if (o.contact.IsSensor() == 1 || o.contact.IsEnabled() == 0 || o.contact.IsTouching() == 0) continue;
                    a.AddContact(o.contact), o.contact.m_flags |= at.e_islandFlag;
                    var b = o.other;
                    if (b.m_flags & $.e_islandFlag) continue;
                    b.GetType() != $.b2_staticBody && (b.Advance(p), b.SetAwake(true)), f[g + y] = b, ++y, b.m_flags |= $.e_islandFlag
                }
                for (var w = t.m_jointList; w; w = w.next) {
                    if (a.m_jointCount == a.m_jointCapacity) continue;
                    if (w.joint.m_islandFlag == 1) continue;
                    b = w.other;
                    if (b.IsActive() == 0) continue;
                    a.AddJoint(w.joint), w.joint.m_islandFlag = true;
                    if (b.m_flags & $.e_islandFlag) continue;
                    b.GetType() != $.b2_staticBody && (b.Advance(p), b.SetAwake(true)), f[g + y] = b, ++y, b.m_flags |= $.e_islandFlag
                }
            }
            var E = ot.s_timestep;
            E.warmStarting = false, E.dt = (1 - p) * e.dt, E.inv_dt = 1 / E.dt, E.dtRatio = 0, E.velocityIterations = e.velocityIterations, E.positionIterations = e.positionIterations, a.SolveTOI(E);
            var S = 0;
            for (S = 0; S < a.m_bodyCount; ++S) {
                t = a.m_bodies[S], t.m_flags &= ~$.e_islandFlag;
                if (t.IsAwake() == 0) continue;
                if (t.GetType() != $.b2_dynamicBody) continue;
                t.SynchronizeFixtures();
                for (o = t.m_contactList; o; o = o.next) o.contact.m_flags &= ~at.e_toiFlag
            }
            for (S = 0; S < a.m_contactCount; ++S) c = a.m_contacts[S], c.m_flags &= ~ (at.e_toiFlag | at.e_islandFlag);
            for (S = 0; S < a.m_jointCount; ++S) u = a.m_joints[S], u.m_islandFlag = false;
            this.m_contactManager.FindNewContacts()
        }
    }, ot.prototype.DrawJoint = function (e) {
        var t = e.GetBodyA(),
            n = e.GetBodyB(),
            r = t.m_xf,
            i = n.m_xf,
            s = r.position,
            o = i.position,
            u = e.GetAnchorA(),
            a = e.GetAnchorB(),
            f = ot.s_jointColor;
        switch (e.m_type) {
            case Ot.e_distanceJoint:
                this.m_debugDraw.DrawSegment(u, a, f);
                break;
            case Ot.e_pulleyJoint:
                var l = e instanceof It ? e : null,
                    c = l.GetGroundAnchorA(),
                    h = l.GetGroundAnchorB();
                this.m_debugDraw.DrawSegment(c, u, f), this.m_debugDraw.DrawSegment(h, a, f), this.m_debugDraw.DrawSegment(c, h, f);
                break;
            case Ot.e_mouseJoint:
                this.m_debugDraw.DrawSegment(u, a, f);
                break;
            default:
                t != this.m_groundBody && this.m_debugDraw.DrawSegment(s, u, f), this.m_debugDraw.DrawSegment(u, a, f), n != this.m_groundBody && this.m_debugDraw.DrawSegment(o, a, f)
        }
    }, ot.prototype.DrawShape = function (e, t, n) {
        switch (e.m_type) {
            case V.e_circleShape:
                var i = e instanceof R ? e : null,
                    s = r.MulX(t, i.m_p),
                    o = i.m_radius,
                    u = t.R.col1;
                this.m_debugDraw.DrawSolidCircle(s, o, u, n);
                break;
            case V.e_polygonShape:
                var a = 0,
                    f = e instanceof X ? e : null,
                    l = parseInt(f.GetVertexCount()),
                    c = f.GetVertices(),
                    h = new Vector(l);
                for (a = 0; a < l; ++a) h[a] = r.MulX(t, c[a]);
                this.m_debugDraw.DrawSolidPolygon(h, l, n);
                break;
            case V.e_edgeShape:
                var p = e instanceof z ? e : null;
                this.m_debugDraw.DrawSegment(r.MulX(t, p.GetVertex1()), r.MulX(t, p.GetVertex2()), n)
        }
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.b2World.s_timestep2 = new st, Box2D.Dynamics.b2World.s_xf = new s, Box2D.Dynamics.b2World.s_backupA = new i, Box2D.Dynamics.b2World.s_backupB = new i, Box2D.Dynamics.b2World.s_timestep = new st, Box2D.Dynamics.b2World.s_queue = new Vector, Box2D.Dynamics.b2World.s_jointColor = new a(.5, .8, .8), Box2D.Dynamics.b2World.e_newFixture = 1, Box2D.Dynamics.b2World.e_locked = 2
    })
}(), function () {
    var e = Box2D.Collision.Shapes.b2CircleShape,
        t = Box2D.Collision.Shapes.b2EdgeChainDef,
        n = Box2D.Collision.Shapes.b2EdgeShape,
        r = Box2D.Collision.Shapes.b2MassData,
        i = Box2D.Collision.Shapes.b2PolygonShape,
        s = Box2D.Collision.Shapes.b2Shape,
        o = Box2D.Dynamics.Contacts.b2CircleContact,
        u = Box2D.Dynamics.Contacts.b2Contact,
        a = Box2D.Dynamics.Contacts.b2ContactConstraint,
        f = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
        l = Box2D.Dynamics.Contacts.b2ContactEdge,
        c = Box2D.Dynamics.Contacts.b2ContactFactory,
        h = Box2D.Dynamics.Contacts.b2ContactRegister,
        p = Box2D.Dynamics.Contacts.b2ContactResult,
        d = Box2D.Dynamics.Contacts.b2ContactSolver,
        v = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
        m = Box2D.Dynamics.Contacts.b2NullContact,
        g = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
        y = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
        b = Box2D.Dynamics.Contacts.b2PolygonContact,
        w = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
        E = Box2D.Dynamics.b2Body,
        S = Box2D.Dynamics.b2BodyDef,
        x = Box2D.Dynamics.b2ContactFilter,
        T = Box2D.Dynamics.b2ContactImpulse,
        N = Box2D.Dynamics.b2ContactListener,
        C = Box2D.Dynamics.b2ContactManager,
        k = Box2D.Dynamics.b2DebugDraw,
        L = Box2D.Dynamics.b2DestructionListener,
        A = Box2D.Dynamics.b2FilterData,
        O = Box2D.Dynamics.b2Fixture,
        M = Box2D.Dynamics.b2FixtureDef,
        _ = Box2D.Dynamics.b2Island,
        D = Box2D.Dynamics.b2TimeStep,
        P = Box2D.Dynamics.b2World,
        H = Box2D.Common.b2Color,
        B = Box2D.Common.b2internal,
        j = Box2D.Common.b2Settings,
        F = Box2D.Common.Math.b2Mat22,
        I = Box2D.Common.Math.b2Mat33,
        q = Box2D.Common.Math.b2Math,
        R = Box2D.Common.Math.b2Sweep,
        U = Box2D.Common.Math.b2Transform,
        z = Box2D.Common.Math.b2Vec2,
        W = Box2D.Common.Math.b2Vec3,
        X = Box2D.Collision.b2AABB,
        V = Box2D.Collision.b2Bound,
        $ = Box2D.Collision.b2BoundValues,
        J = Box2D.Collision.b2Collision,
        K = Box2D.Collision.b2ContactID,
        Q = Box2D.Collision.b2ContactPoint,
        G = Box2D.Collision.b2Distance,
        Y = Box2D.Collision.b2DistanceInput,
        Z = Box2D.Collision.b2DistanceOutput,
        et = Box2D.Collision.b2DistanceProxy,
        tt = Box2D.Collision.b2DynamicTree,
        nt = Box2D.Collision.b2DynamicTreeBroadPhase,
        rt = Box2D.Collision.b2DynamicTreeNode,
        it = Box2D.Collision.b2DynamicTreePair,
        st = Box2D.Collision.b2Manifold,
        ot = Box2D.Collision.b2ManifoldPoint,
        ut = Box2D.Collision.b2Point,
        at = Box2D.Collision.b2RayCastInput,
        ft = Box2D.Collision.b2RayCastOutput,
        lt = Box2D.Collision.b2Segment,
        ct = Box2D.Collision.b2SeparationFunction,
        ht = Box2D.Collision.b2Simplex,
        pt = Box2D.Collision.b2SimplexCache,
        dt = Box2D.Collision.b2SimplexVertex,
        vt = Box2D.Collision.b2TimeOfImpact,
        mt = Box2D.Collision.b2TOIInput,
        gt = Box2D.Collision.b2WorldManifold,
        yt = Box2D.Collision.ClipVertex,
        bt = Box2D.Collision.Features,
        wt = Box2D.Collision.IBroadPhase;
    Box2D.inherit(o, Box2D.Dynamics.Contacts.b2Contact), o.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, o.b2CircleContact = function () {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    }, o.Create = function (e) {
        return new o
    }, o.Destroy = function (e, t) {}, o.prototype.Reset = function (e, t) {
        this.__super.Reset.call(this, e, t)
    }, o.prototype.Evaluate = function () {
        var t = this.m_fixtureA.GetBody(),
            n = this.m_fixtureB.GetBody();
        J.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof e ? this.m_fixtureA.GetShape() : null, t.m_xf, this.m_fixtureB.GetShape() instanceof e ? this.m_fixtureB.GetShape() : null, n.m_xf)
    }, u.b2Contact = function () {
        this.m_nodeA = new l, this.m_nodeB = new l, this.m_manifold = new st, this.m_oldManifold = new st
    }, u.prototype.GetManifold = function () {
        return this.m_manifold
    }, u.prototype.GetWorldManifold = function (e) {
        var t = this.m_fixtureA.GetBody(),
            n = this.m_fixtureB.GetBody(),
            r = this.m_fixtureA.GetShape(),
            i = this.m_fixtureB.GetShape();
        e.Initialize(this.m_manifold, t.GetTransform(), r.m_radius, n.GetTransform(), i.m_radius)
    }, u.prototype.IsTouching = function () {
        return (this.m_flags & u.e_touchingFlag) == u.e_touchingFlag
    }, u.prototype.IsContinuous = function () {
        return (this.m_flags & u.e_continuousFlag) == u.e_continuousFlag
    }, u.prototype.SetSensor = function (e) {
        e ? this.m_flags |= u.e_sensorFlag : this.m_flags &= ~u.e_sensorFlag
    }, u.prototype.IsSensor = function () {
        return (this.m_flags & u.e_sensorFlag) == u.e_sensorFlag
    }, u.prototype.SetEnabled = function (e) {
        e ? this.m_flags |= u.e_enabledFlag : this.m_flags &= ~u.e_enabledFlag
    }, u.prototype.IsEnabled = function () {
        return (this.m_flags & u.e_enabledFlag) == u.e_enabledFlag
    }, u.prototype.GetNext = function () {
        return this.m_next
    }, u.prototype.GetFixtureA = function () {
        return this.m_fixtureA
    }, u.prototype.GetFixtureB = function () {
        return this.m_fixtureB
    }, u.prototype.FlagForFiltering = function () {
        this.m_flags |= u.e_filterFlag
    }, u.prototype.b2Contact = function () {}, u.prototype.Reset = function (e, t) {
        e === undefined && (e = null), t === undefined && (t = null), this.m_flags = u.e_enabledFlag;
        if (!e || !t) {
            this.m_fixtureA = null, this.m_fixtureB = null;
            return
        }
        if (e.IsSensor() || t.IsSensor()) this.m_flags |= u.e_sensorFlag;
        var n = e.GetBody(),
            r = t.GetBody();
        if (n.GetType() != E.b2_dynamicBody || n.IsBullet() || r.GetType() != E.b2_dynamicBody || r.IsBullet()) this.m_flags |= u.e_continuousFlag;
        this.m_fixtureA = e, this.m_fixtureB = t, this.m_manifold.m_pointCount = 0, this.m_prev = null, this.m_next = null, this.m_nodeA.contact = null, this.m_nodeA.prev = null, this.m_nodeA.next = null, this.m_nodeA.other = null, this.m_nodeB.contact = null, this.m_nodeB.prev = null, this.m_nodeB.next = null, this.m_nodeB.other = null
    }, u.prototype.Update = function (e) {
        var t = this.m_oldManifold;
        this.m_oldManifold = this.m_manifold, this.m_manifold = t, this.m_flags |= u.e_enabledFlag;
        var n = false,
            r = (this.m_flags & u.e_touchingFlag) == u.e_touchingFlag,
            i = this.m_fixtureA.m_body,
            o = this.m_fixtureB.m_body,
            a = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
        if (this.m_flags & u.e_sensorFlag) {
            if (a) {
                var f = this.m_fixtureA.GetShape(),
                    l = this.m_fixtureB.GetShape(),
                    c = i.GetTransform(),
                    h = o.GetTransform();
                n = s.TestOverlap(f, c, l, h)
            }
            this.m_manifold.m_pointCount = 0
        } else {
            i.GetType() != E.b2_dynamicBody || i.IsBullet() || o.GetType() != E.b2_dynamicBody || o.IsBullet() ? this.m_flags |= u.e_continuousFlag : this.m_flags &= ~u.e_continuousFlag;
            if (a) {
                this.Evaluate(), n = this.m_manifold.m_pointCount > 0;
                for (var p = 0; p < this.m_manifold.m_pointCount; ++p) {
                    var d = this.m_manifold.m_points[p];
                    d.m_normalImpulse = 0, d.m_tangentImpulse = 0;
                    var v = d.m_id;
                    for (var m = 0; m < this.m_oldManifold.m_pointCount; ++m) {
                        var g = this.m_oldManifold.m_points[m];
                        if (g.m_id.key == v.key) {
                            d.m_normalImpulse = g.m_normalImpulse, d.m_tangentImpulse = g.m_tangentImpulse;
                            break
                        }
                    }
                }
            } else this.m_manifold.m_pointCount = 0;
            n != r && (i.SetAwake(true), o.SetAwake(true))
        }
        n ? this.m_flags |= u.e_touchingFlag : this.m_flags &= ~u.e_touchingFlag, r == 0 && n == 1 && e.BeginContact(this), r == 1 && n == 0 && e.EndContact(this), (this.m_flags & u.e_sensorFlag) == 0 && e.PreSolve(this, this.m_oldManifold)
    }, u.prototype.Evaluate = function () {}, u.prototype.ComputeTOI = function (e, t) {
        return u.s_input.proxyA.Set(this.m_fixtureA.GetShape()), u.s_input.proxyB.Set(this.m_fixtureB.GetShape()), u.s_input.sweepA = e, u.s_input.sweepB = t, u.s_input.tolerance = j.b2_linearSlop, vt.TimeOfImpact(u.s_input)
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1, Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2, Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4, Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8, Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16, Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32, Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 64, Box2D.Dynamics.Contacts.b2Contact.s_input = new mt
    }), a.b2ContactConstraint = function () {
        this.localPlaneNormal = new z, this.localPoint = new z, this.normal = new z, this.normalMass = new F, this.K = new F
    }, a.prototype.b2ContactConstraint = function () {
        this.points = new Vector(j.b2_maxManifoldPoints);
        for (var e = 0; e < j.b2_maxManifoldPoints; e++) this.points[e] = new f
    }, f.b2ContactConstraintPoint = function () {
        this.localPoint = new z, this.rA = new z, this.rB = new z
    }, l.b2ContactEdge = function () {}, c.b2ContactFactory = function () {}, c.prototype.b2ContactFactory = function (e) {
        this.m_allocator = e, this.InitializeRegisters()
    }, c.prototype.AddType = function (e, t, n, r) {
        n === undefined && (n = 0), r === undefined && (r = 0), this.m_registers[n][r].createFcn = e, this.m_registers[n][r].destroyFcn = t, this.m_registers[n][r].primary = true, n != r && (this.m_registers[r][n].createFcn = e, this.m_registers[r][n].destroyFcn = t, this.m_registers[r][n].primary = false)
    }, c.prototype.InitializeRegisters = function () {
        this.m_registers = new Vector(s.e_shapeTypeCount);
        for (var e = 0; e < s.e_shapeTypeCount; e++) {
            this.m_registers[e] = new Vector(s.e_shapeTypeCount);
            for (var t = 0; t < s.e_shapeTypeCount; t++) this.m_registers[e][t] = new h
        }
        this.AddType(o.Create, o.Destroy, s.e_circleShape, s.e_circleShape), this.AddType(g.Create, g.Destroy, s.e_polygonShape, s.e_circleShape), this.AddType(b.Create, b.Destroy, s.e_polygonShape, s.e_polygonShape), this.AddType(v.Create, v.Destroy, s.e_edgeShape, s.e_circleShape), this.AddType(y.Create, y.Destroy, s.e_polygonShape, s.e_edgeShape)
    }, c.prototype.Create = function (e, t) {
        var n = parseInt(e.GetType()),
            r = parseInt(t.GetType()),
            i = this.m_registers[n][r],
            s;
        if (i.pool) return s = i.pool, i.pool = s.m_next, i.poolCount--, s.Reset(e, t), s;
        var o = i.createFcn;
        return o != null ? i.primary ? (s = o(this.m_allocator), s.Reset(e, t), s) : (s = o(this.m_allocator), s.Reset(t, e), s) : null
    }, c.prototype.Destroy = function (e) {
        e.m_manifold.m_pointCount > 0 && (e.m_fixtureA.m_body.SetAwake(true), e.m_fixtureB.m_body.SetAwake(true));
        var t = parseInt(e.m_fixtureA.GetType()),
            n = parseInt(e.m_fixtureB.GetType()),
            r = this.m_registers[t][n];
        r.poolCount++, e.m_next = r.pool, r.pool = e;
        var i = r.destroyFcn;
        i(e, this.m_allocator)
    }, h.b2ContactRegister = function () {}, p.b2ContactResult = function () {
        this.position = new z, this.normal = new z, this.id = new K
    }, d.b2ContactSolver = function () {
        this.m_step = new D, this.m_constraints = new Vector
    }, d.prototype.b2ContactSolver = function () {}, d.prototype.Initialize = function (e, t, n, r) {
        n === undefined && (n = 0);
        var i;
        this.m_step.Set(e), this.m_allocator = r;
        var s = 0,
            o, u;
        this.m_constraintCount = n;
        while (this.m_constraints.length < this.m_constraintCount) this.m_constraints[this.m_constraints.length] = new a;
        for (s = 0; s < n; ++s) {
            i = t[s];
            var f = i.m_fixtureA,
                l = i.m_fixtureB,
                c = f.m_shape,
                h = l.m_shape,
                p = c.m_radius,
                v = h.m_radius,
                m = f.m_body,
                g = l.m_body,
                y = i.GetManifold(),
                b = j.b2MixFriction(f.GetFriction(), l.GetFriction()),
                w = j.b2MixRestitution(f.GetRestitution(), l.GetRestitution()),
                E = m.m_linearVelocity.x,
                S = m.m_linearVelocity.y,
                x = g.m_linearVelocity.x,
                T = g.m_linearVelocity.y,
                N = m.m_angularVelocity,
                C = g.m_angularVelocity;
            j.b2Assert(y.m_pointCount > 0), d.s_worldManifold.Initialize(y, m.m_xf, p, g.m_xf, v);
            var k = d.s_worldManifold.m_normal.x,
                L = d.s_worldManifold.m_normal.y,
                A = this.m_constraints[s];
            A.bodyA = m, A.bodyB = g, A.manifold = y, A.normal.x = k, A.normal.y = L, A.pointCount = y.m_pointCount, A.friction = b, A.restitution = w, A.localPlaneNormal.x = y.m_localPlaneNormal.x, A.localPlaneNormal.y = y.m_localPlaneNormal.y, A.localPoint.x = y.m_localPoint.x, A.localPoint.y = y.m_localPoint.y, A.radius = p + v, A.type = y.m_type;
            for (var O = 0; O < A.pointCount; ++O) {
                var M = y.m_points[O],
                    _ = A.points[O];
                _.normalImpulse = M.m_normalImpulse, _.tangentImpulse = M.m_tangentImpulse, _.localPoint.SetV(M.m_localPoint);
                var D = _.rA.x = d.s_worldManifold.m_points[O].x - m.m_sweep.c.x,
                    P = _.rA.y = d.s_worldManifold.m_points[O].y - m.m_sweep.c.y,
                    H = _.rB.x = d.s_worldManifold.m_points[O].x - g.m_sweep.c.x,
                    B = _.rB.y = d.s_worldManifold.m_points[O].y - g.m_sweep.c.y,
                    F = D * L - P * k,
                    I = H * L - B * k;
                F *= F, I *= I;
                var q = m.m_invMass + g.m_invMass + m.m_invI * F + g.m_invI * I;
                _.normalMass = 1 / q;
                var R = m.m_mass * m.m_invMass + g.m_mass * g.m_invMass;
                R += m.m_mass * m.m_invI * F + g.m_mass * g.m_invI * I, _.equalizedMass = 1 / R;
                var U = L,
                    z = -k,
                    W = D * z - P * U,
                    X = H * z - B * U;
                W *= W, X *= X;
                var V = m.m_invMass + g.m_invMass + m.m_invI * W + g.m_invI * X;
                _.tangentMass = 1 / V, _.velocityBias = 0;
                var $ = x + -C * B - E - -N * P,
                    J = T + C * H - S - N * D,
                    K = A.normal.x * $ + A.normal.y * J;
                K < -j.b2_velocityThreshold && (_.velocityBias += -A.restitution * K)
            }
            if (A.pointCount == 2) {
                var Q = A.points[0],
                    G = A.points[1],
                    Y = m.m_invMass,
                    Z = m.m_invI,
                    et = g.m_invMass,
                    tt = g.m_invI,
                    nt = Q.rA.x * L - Q.rA.y * k,
                    rt = Q.rB.x * L - Q.rB.y * k,
                    it = G.rA.x * L - G.rA.y * k,
                    st = G.rB.x * L - G.rB.y * k,
                    ot = Y + et + Z * nt * nt + tt * rt * rt,
                    ut = Y + et + Z * it * it + tt * st * st,
                    at = Y + et + Z * nt * it + tt * rt * st,
                    ft = 100;
                ot * ot < ft * (ot * ut - at * at) ? (A.K.col1.Set(ot, at), A.K.col2.Set(at, ut), A.K.GetInverse(A.normalMass)) : A.pointCount = 1
            }
        }
    }, d.prototype.InitVelocityConstraints = function (e) {
        var t, n, r;
        for (var i = 0; i < this.m_constraintCount; ++i) {
            var s = this.m_constraints[i],
                o = s.bodyA,
                u = s.bodyB,
                a = o.m_invMass,
                f = o.m_invI,
                l = u.m_invMass,
                c = u.m_invI,
                h = s.normal.x,
                p = s.normal.y,
                d = p,
                v = -h,
                m = 0,
                g = 0,
                y = 0;
            if (e.warmStarting) {
                y = s.pointCount;
                for (g = 0; g < y; ++g) {
                    var b = s.points[g];
                    b.normalImpulse *= e.dtRatio, b.tangentImpulse *= e.dtRatio;
                    var w = b.normalImpulse * h + b.tangentImpulse * d,
                        E = b.normalImpulse * p + b.tangentImpulse * v;
                    o.m_angularVelocity -= f * (b.rA.x * E - b.rA.y * w), o.m_linearVelocity.x -= a * w, o.m_linearVelocity.y -= a * E, u.m_angularVelocity += c * (b.rB.x * E - b.rB.y * w), u.m_linearVelocity.x += l * w, u.m_linearVelocity.y += l * E
                }
            } else {
                y = s.pointCount;
                for (g = 0; g < y; ++g) {
                    var S = s.points[g];
                    S.normalImpulse = 0, S.tangentImpulse = 0
                }
            }
        }
    }, d.prototype.SolveVelocityConstraints = function () {
        var e = 0,
            t, n = 0,
            r = 0,
            i = 0,
            s = 0,
            o = 0,
            u = 0,
            a = 0,
            f = 0,
            l = 0,
            c = 0,
            h = 0,
            p = 0,
            d = 0,
            v = 0,
            m = 0,
            g = 0,
            y = 0,
            b = 0,
            w = 0,
            E, S;
        for (var x = 0; x < this.m_constraintCount; ++x) {
            var T = this.m_constraints[x],
                N = T.bodyA,
                C = T.bodyB,
                k = N.m_angularVelocity,
                L = C.m_angularVelocity,
                A = N.m_linearVelocity,
                O = C.m_linearVelocity,
                M = N.m_invMass,
                _ = N.m_invI,
                D = C.m_invMass,
                P = C.m_invI,
                H = T.normal.x,
                B = T.normal.y,
                j = B,
                F = -H,
                I = T.friction,
                R = 0;
            for (e = 0; e < T.pointCount; e++) t = T.points[e], o = O.x - L * t.rB.y - A.x + k * t.rA.y, u = O.y + L * t.rB.x - A.y - k * t.rA.x, f = o * j + u * F, l = t.tangentMass * -f, c = I * t.normalImpulse, h = q.Clamp(t.tangentImpulse + l, -c, c), l = h - t.tangentImpulse, p = l * j, d = l * F, A.x -= M * p, A.y -= M * d, k -= _ * (t.rA.x * d - t.rA.y * p), O.x += D * p, O.y += D * d, L += P * (t.rB.x * d - t.rB.y * p), t.tangentImpulse = h;
            var U = parseInt(T.pointCount);
            if (T.pointCount == 1) t = T.points[0], o = O.x + -L * t.rB.y - A.x - -k * t.rA.y, u = O.y + L * t.rB.x - A.y - k * t.rA.x, a = o * H + u * B, l = -t.normalMass * (a - t.velocityBias), h = t.normalImpulse + l, h = h > 0 ? h : 0, l = h - t.normalImpulse, p = l * H, d = l * B, A.x -= M * p, A.y -= M * d, k -= _ * (t.rA.x * d - t.rA.y * p), O.x += D * p, O.y += D * d, L += P * (t.rB.x * d - t.rB.y * p), t.normalImpulse = h;
            else {
                var z = T.points[0],
                    W = T.points[1],
                    X = z.normalImpulse,
                    V = W.normalImpulse,
                    $ = O.x - L * z.rB.y - A.x + k * z.rA.y,
                    J = O.y + L * z.rB.x - A.y - k * z.rA.x,
                    K = O.x - L * W.rB.y - A.x + k * W.rA.y,
                    Q = O.y + L * W.rB.x - A.y - k * W.rA.x,
                    G = $ * H + J * B,
                    Y = K * H + Q * B,
                    Z = G - z.velocityBias,
                    et = Y - W.velocityBias;
                E = T.K, Z -= E.col1.x * X + E.col2.x * V, et -= E.col1.y * X + E.col2.y * V;
                var tt = .001;
                for (;;) {
                    E = T.normalMass;
                    var nt = -(E.col1.x * Z + E.col2.x * et),
                        rt = -(E.col1.y * Z + E.col2.y * et);
                    if (nt >= 0 && rt >= 0) {
                        v = nt - X, m = rt - V, g = v * H, y = v * B, b = m * H, w = m * B, A.x -= M * (g + b), A.y -= M * (y + w), k -= _ * (z.rA.x * y - z.rA.y * g + W.rA.x * w - W.rA.y * b), O.x += D * (g + b), O.y += D * (y + w), L += P * (z.rB.x * y - z.rB.y * g + W.rB.x * w - W.rB.y * b), z.normalImpulse = nt, W.normalImpulse = rt;
                        break
                    }
                    nt = -z.normalMass * Z, rt = 0, G = 0, Y = T.K.col1.y * nt + et;
                    if (nt >= 0 && Y >= 0) {
                        v = nt - X, m = rt - V, g = v * H, y = v * B, b = m * H, w = m * B, A.x -= M * (g + b), A.y -= M * (y + w), k -= _ * (z.rA.x * y - z.rA.y * g + W.rA.x * w - W.rA.y * b), O.x += D * (g + b), O.y += D * (y + w), L += P * (z.rB.x * y - z.rB.y * g + W.rB.x * w - W.rB.y * b), z.normalImpulse = nt, W.normalImpulse = rt;
                        break
                    }
                    nt = 0, rt = -W.normalMass * et, G = T.K.col2.x * rt + Z, Y = 0;
                    if (rt >= 0 && G >= 0) {
                        v = nt - X, m = rt - V, g = v * H, y = v * B, b = m * H, w = m * B, A.x -= M * (g + b), A.y -= M * (y + w), k -= _ * (z.rA.x * y - z.rA.y * g + W.rA.x * w - W.rA.y * b), O.x += D * (g + b), O.y += D * (y + w), L += P * (z.rB.x * y - z.rB.y * g + W.rB.x * w - W.rB.y * b), z.normalImpulse = nt, W.normalImpulse = rt;
                        break
                    }
                    nt = 0, rt = 0, G = Z, Y = et;
                    if (G >= 0 && Y >= 0) {
                        v = nt - X, m = rt - V, g = v * H, y = v * B, b = m * H, w = m * B, A.x -= M * (g + b), A.y -= M * (y + w), k -= _ * (z.rA.x * y - z.rA.y * g + W.rA.x * w - W.rA.y * b), O.x += D * (g + b), O.y += D * (y + w), L += P * (z.rB.x * y - z.rB.y * g + W.rB.x * w - W.rB.y * b), z.normalImpulse = nt, W.normalImpulse = rt;
                        break
                    }
                    break
                }
            }
            N.m_angularVelocity = k, C.m_angularVelocity = L
        }
    }, d.prototype.FinalizeVelocityConstraints = function () {
        for (var e = 0; e < this.m_constraintCount; ++e) {
            var t = this.m_constraints[e],
                n = t.manifold;
            for (var r = 0; r < t.pointCount; ++r) {
                var i = n.m_points[r],
                    s = t.points[r];
                i.m_normalImpulse = s.normalImpulse, i.m_tangentImpulse = s.tangentImpulse
            }
        }
    }, d.prototype.SolvePositionConstraints = function (e) {
        e === undefined && (e = 0);
        var t = 0;
        for (var n = 0; n < this.m_constraintCount; n++) {
            var r = this.m_constraints[n],
                i = r.bodyA,
                s = r.bodyB,
                o = i.m_mass * i.m_invMass,
                u = i.m_mass * i.m_invI,
                a = s.m_mass * s.m_invMass,
                f = s.m_mass * s.m_invI;
            d.s_psm.Initialize(r);
            var l = d.s_psm.m_normal;
            for (var c = 0; c < r.pointCount; c++) {
                var h = r.points[c],
                    p = d.s_psm.m_points[c],
                    v = d.s_psm.m_separations[c],
                    m = p.x - i.m_sweep.c.x,
                    g = p.y - i.m_sweep.c.y,
                    y = p.x - s.m_sweep.c.x,
                    b = p.y - s.m_sweep.c.y;
                t = t < v ? t : v;
                var w = q.Clamp(e * (v + j.b2_linearSlop), -j.b2_maxLinearCorrection, 0),
                    E = -h.equalizedMass * w,
                    S = E * l.x,
                    x = E * l.y;
                i.m_sweep.c.x -= o * S, i.m_sweep.c.y -= o * x, i.m_sweep.a -= u * (m * x - g * S), i.SynchronizeTransform(), s.m_sweep.c.x += a * S, s.m_sweep.c.y += a * x, s.m_sweep.a += f * (y * x - b * S), s.SynchronizeTransform()
            }
        }
        return t > -1.5 * j.b2_linearSlop
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new gt, Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new w
    }), Box2D.inherit(v, Box2D.Dynamics.Contacts.b2Contact), v.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, v.b2EdgeAndCircleContact = function () {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    }, v.Create = function (e) {
        return new v
    }, v.Destroy = function (e, t) {}, v.prototype.Reset = function (e, t) {
        this.__super.Reset.call(this, e, t)
    }, v.prototype.Evaluate = function () {
        var t = this.m_fixtureA.GetBody(),
            r = this.m_fixtureB.GetBody();
        this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof n ? this.m_fixtureA.GetShape() : null, t.m_xf, this.m_fixtureB.GetShape() instanceof e ? this.m_fixtureB.GetShape() : null, r.m_xf)
    }, v.prototype.b2CollideEdgeAndCircle = function (e, t, n, r, i) {}, Box2D.inherit(m, Box2D.Dynamics.Contacts.b2Contact), m.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, m.b2NullContact = function () {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    }, m.prototype.b2NullContact = function () {
        this.__super.b2Contact.call(this)
    }, m.prototype.Evaluate = function () {}, Box2D.inherit(g, Box2D.Dynamics.Contacts.b2Contact), g.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, g.b2PolyAndCircleContact = function () {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    }, g.Create = function (e) {
        return new g
    }, g.Destroy = function (e, t) {}, g.prototype.Reset = function (e, t) {
        this.__super.Reset.call(this, e, t), j.b2Assert(e.GetType() == s.e_polygonShape), j.b2Assert(t.GetType() == s.e_circleShape)
    }, g.prototype.Evaluate = function () {
        var t = this.m_fixtureA.m_body,
            n = this.m_fixtureB.m_body;
        J.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof i ? this.m_fixtureA.GetShape() : null, t.m_xf, this.m_fixtureB.GetShape() instanceof e ? this.m_fixtureB.GetShape() : null, n.m_xf)
    }, Box2D.inherit(y, Box2D.Dynamics.Contacts.b2Contact), y.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, y.b2PolyAndEdgeContact = function () {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    }, y.Create = function (e) {
        return new y
    }, y.Destroy = function (e, t) {}, y.prototype.Reset = function (e, t) {
        this.__super.Reset.call(this, e, t), j.b2Assert(e.GetType() == s.e_polygonShape), j.b2Assert(t.GetType() == s.e_edgeShape)
    }, y.prototype.Evaluate = function () {
        var e = this.m_fixtureA.GetBody(),
            t = this.m_fixtureB.GetBody();
        this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof i ? this.m_fixtureA.GetShape() : null, e.m_xf, this.m_fixtureB.GetShape() instanceof n ? this.m_fixtureB.GetShape() : null, t.m_xf)
    }, y.prototype.b2CollidePolyAndEdge = function (e, t, n, r, i) {}, Box2D.inherit(b, Box2D.Dynamics.Contacts.b2Contact), b.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype, b.b2PolygonContact = function () {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    }, b.Create = function (e) {
        return new b
    }, b.Destroy = function (e, t) {}, b.prototype.Reset = function (e, t) {
        this.__super.Reset.call(this, e, t)
    }, b.prototype.Evaluate = function () {
        var e = this.m_fixtureA.GetBody(),
            t = this.m_fixtureB.GetBody();
        J.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof i ? this.m_fixtureA.GetShape() : null, e.m_xf, this.m_fixtureB.GetShape() instanceof i ? this.m_fixtureB.GetShape() : null, t.m_xf)
    }, w.b2PositionSolverManifold = function () {}, w.prototype.b2PositionSolverManifold = function () {
        this.m_normal = new z, this.m_separations = new Vector_a2j_Number(j.b2_maxManifoldPoints), this.m_points = new Vector(j.b2_maxManifoldPoints);
        for (var e = 0; e < j.b2_maxManifoldPoints; e++) this.m_points[e] = new z
    }, w.prototype.Initialize = function (e) {
        j.b2Assert(e.pointCount > 0);
        var t = 0,
            n = 0,
            r = 0,
            i, s, o = 0,
            u = 0;
        switch (e.type) {
            case st.e_circles:
                i = e.bodyA.m_xf.R, s = e.localPoint;
                var a = e.bodyA.m_xf.position.x + (i.col1.x * s.x + i.col2.x * s.y),
                    f = e.bodyA.m_xf.position.y + (i.col1.y * s.x + i.col2.y * s.y);
                i = e.bodyB.m_xf.R, s = e.points[0].localPoint;
                var l = e.bodyB.m_xf.position.x + (i.col1.x * s.x + i.col2.x * s.y),
                    c = e.bodyB.m_xf.position.y + (i.col1.y * s.x + i.col2.y * s.y),
                    h = l - a,
                    p = c - f,
                    d = h * h + p * p;
                if (d > Number.MIN_VALUE * Number.MIN_VALUE) {
                    var v = Math.sqrt(d);
                    this.m_normal.x = h / v, this.m_normal.y = p / v
                } else this.m_normal.x = 1, this.m_normal.y = 0;
                this.m_points[0].x = .5 * (a + l), this.m_points[0].y = .5 * (f + c), this.m_separations[0] = h * this.m_normal.x + p * this.m_normal.y - e.radius;
                break;
            case st.e_faceA:
                i = e.bodyA.m_xf.R, s = e.localPlaneNormal, this.m_normal.x = i.col1.x * s.x + i.col2.x * s.y, this.m_normal.y = i.col1.y * s.x + i.col2.y * s.y, i = e.bodyA.m_xf.R, s = e.localPoint, o = e.bodyA.m_xf.position.x + (i.col1.x * s.x + i.col2.x * s.y), u = e.bodyA.m_xf.position.y + (i.col1.y * s.x + i.col2.y * s.y), i = e.bodyB.m_xf.R;
                for (t = 0; t < e.pointCount; ++t) s = e.points[t].localPoint, n = e.bodyB.m_xf.position.x + (i.col1.x * s.x + i.col2.x * s.y), r = e.bodyB.m_xf.position.y + (i.col1.y * s.x + i.col2.y * s.y), this.m_separations[t] = (n - o) * this.m_normal.x + (r - u) * this.m_normal.y - e.radius, this.m_points[t].x = n, this.m_points[t].y = r;
                break;
            case st.e_faceB:
                i = e.bodyB.m_xf.R, s = e.localPlaneNormal, this.m_normal.x = i.col1.x * s.x + i.col2.x * s.y, this.m_normal.y = i.col1.y * s.x + i.col2.y * s.y, i = e.bodyB.m_xf.R, s = e.localPoint, o = e.bodyB.m_xf.position.x + (i.col1.x * s.x + i.col2.x * s.y), u = e.bodyB.m_xf.position.y + (i.col1.y * s.x + i.col2.y * s.y), i = e.bodyA.m_xf.R;
                for (t = 0; t < e.pointCount; ++t) s = e.points[t].localPoint, n = e.bodyA.m_xf.position.x + (i.col1.x * s.x + i.col2.x * s.y), r = e.bodyA.m_xf.position.y + (i.col1.y * s.x + i.col2.y * s.y), this.m_separations[t] = (n - o) * this.m_normal.x + (r - u) * this.m_normal.y - e.radius, this.m_points[t].Set(n, r);
                this.m_normal.x *= -1, this.m_normal.y *= -1
        }
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new z, Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new z
    })
}(), function () {
    var e = Box2D.Dynamics.b2Body,
        t = Box2D.Dynamics.b2BodyDef,
        n = Box2D.Dynamics.b2ContactFilter,
        r = Box2D.Dynamics.b2ContactImpulse,
        i = Box2D.Dynamics.b2ContactListener,
        s = Box2D.Dynamics.b2ContactManager,
        o = Box2D.Dynamics.b2DebugDraw,
        u = Box2D.Dynamics.b2DestructionListener,
        a = Box2D.Dynamics.b2FilterData,
        f = Box2D.Dynamics.b2Fixture,
        l = Box2D.Dynamics.b2FixtureDef,
        c = Box2D.Dynamics.b2Island,
        h = Box2D.Dynamics.b2TimeStep,
        p = Box2D.Dynamics.b2World,
        d = Box2D.Common.Math.b2Mat22,
        v = Box2D.Common.Math.b2Mat33,
        m = Box2D.Common.Math.b2Math,
        g = Box2D.Common.Math.b2Sweep,
        y = Box2D.Common.Math.b2Transform,
        b = Box2D.Common.Math.b2Vec2,
        w = Box2D.Common.Math.b2Vec3,
        E = Box2D.Common.b2Color,
        S = Box2D.Common.b2internal,
        x = Box2D.Common.b2Settings,
        T = Box2D.Collision.Shapes.b2CircleShape,
        N = Box2D.Collision.Shapes.b2EdgeChainDef,
        C = Box2D.Collision.Shapes.b2EdgeShape,
        k = Box2D.Collision.Shapes.b2MassData,
        L = Box2D.Collision.Shapes.b2PolygonShape,
        A = Box2D.Collision.Shapes.b2Shape,
        O = Box2D.Dynamics.Controllers.b2BuoyancyController,
        M = Box2D.Dynamics.Controllers.b2ConstantAccelController,
        _ = Box2D.Dynamics.Controllers.b2ConstantForceController,
        D = Box2D.Dynamics.Controllers.b2Controller,
        P = Box2D.Dynamics.Controllers.b2ControllerEdge,
        H = Box2D.Dynamics.Controllers.b2GravityController,
        B = Box2D.Dynamics.Controllers.b2TensorDampingController;
    Box2D.inherit(O, Box2D.Dynamics.Controllers.b2Controller), O.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, O.b2BuoyancyController = function () {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.normal = new b(0, -1), this.offset = 0, this.density = 0, this.velocity = new b(0, 0), this.linearDrag = 2, this.angularDrag = 1, this.useDensity = false, this.useWorldGravity = true, this.gravity = null
    }, O.prototype.Step = function (e) {
        if (!this.m_bodyList) return;
        this.useWorldGravity && (this.gravity = this.GetWorld().GetGravity().Copy());
        for (var t = this.m_bodyList; t; t = t.nextBody) {
            var n = t.body;
            if (n.IsAwake() == 0) continue;
            var r = new b,
                i = new b,
                s = 0,
                o = 0;
            for (var u = n.GetFixtureList(); u; u = u.GetNext()) {
                var a = new b,
                    f = u.GetShape().ComputeSubmergedArea(this.normal, this.offset, n.GetTransform(), a);
                s += f, r.x += f * a.x, r.y += f * a.y;
                var l = 0;
                this.useDensity ? l = 1 : l = 1, o += f * l, i.x += f * a.x * l, i.y += f * a.y * l
            }
            r.x /= s, r.y /= s, i.x /= o, i.y /= o;
            if (s < Number.MIN_VALUE) continue;
            var c = this.gravity.GetNegative();
            c.Multiply(this.density * s), n.ApplyForce(c, i);
            var h = n.GetLinearVelocityFromWorldPoint(r);
            h.Subtract(this.velocity), h.Multiply(-this.linearDrag * s), n.ApplyForce(h, r), n.ApplyTorque(-n.GetInertia() / n.GetMass() * s * n.GetAngularVelocity() * this.angularDrag)
        }
    }, O.prototype.Draw = function (e) {
        var t = 1e3,
            n = new b,
            r = new b;
        n.x = this.normal.x * this.offset + this.normal.y * t, n.y = this.normal.y * this.offset - this.normal.x * t, r.x = this.normal.x * this.offset - this.normal.y * t, r.y = this.normal.y * this.offset + this.normal.x * t;
        var i = new E(0, 0, 1);
        e.DrawSegment(n, r, i)
    }, Box2D.inherit(M, Box2D.Dynamics.Controllers.b2Controller), M.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, M.b2ConstantAccelController = function () {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.A = new b(0, 0)
    }, M.prototype.Step = function (e) {
        var t = new b(this.A.x * e.dt, this.A.y * e.dt);
        for (var n = this.m_bodyList; n; n = n.nextBody) {
            var r = n.body;
            if (!r.IsAwake()) continue;
            r.SetLinearVelocity(new b(r.GetLinearVelocity().x + t.x, r.GetLinearVelocity().y + t.y))
        }
    }, Box2D.inherit(_, Box2D.Dynamics.Controllers.b2Controller), _.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, _.b2ConstantForceController = function () {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.F = new b(0, 0)
    }, _.prototype.Step = function (e) {
        for (var t = this.m_bodyList; t; t = t.nextBody) {
            var n = t.body;
            if (!n.IsAwake()) continue;
            n.ApplyForce(this.F, n.GetWorldCenter())
        }
    }, D.b2Controller = function () {}, D.prototype.Step = function (e) {}, D.prototype.Draw = function (e) {}, D.prototype.AddBody = function (e) {
        var t = new P;
        t.controller = this, t.body = e, t.nextBody = this.m_bodyList, t.prevBody = null, this.m_bodyList = t, t.nextBody && (t.nextBody.prevBody = t), this.m_bodyCount++, t.nextController = e.m_controllerList, t.prevController = null, e.m_controllerList = t, t.nextController && (t.nextController.prevController = t), e.m_controllerCount++
    }, D.prototype.RemoveBody = function (e) {
        var t = e.m_controllerList;
        while (t && t.controller != this) t = t.nextController;
        t.prevBody && (t.prevBody.nextBody = t.nextBody), t.nextBody && (t.nextBody.prevBody = t.prevBody), t.nextController && (t.nextController.prevController = t.prevController), t.prevController && (t.prevController.nextController = t.nextController), this.m_bodyList == t && (this.m_bodyList = t.nextBody), e.m_controllerList == t && (e.m_controllerList = t.nextController), e.m_controllerCount--, this.m_bodyCount--
    }, D.prototype.Clear = function () {
        while (this.m_bodyList) this.RemoveBody(this.m_bodyList.body)
    }, D.prototype.GetNext = function () {
        return this.m_next
    }, D.prototype.GetWorld = function () {
        return this.m_world
    }, D.prototype.GetBodyList = function () {
        return this.m_bodyList
    }, P.b2ControllerEdge = function () {}, Box2D.inherit(H, Box2D.Dynamics.Controllers.b2Controller), H.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, H.b2GravityController = function () {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.G = 1, this.invSqr = true
    }, H.prototype.Step = function (e) {
        var t = null,
            n = null,
            r = null,
            i = 0,
            s = null,
            o = null,
            u = null,
            a = 0,
            f = 0,
            l = 0,
            c = null;
        if (this.invSqr) for (t = this.m_bodyList; t; t = t.nextBody) {
            n = t.body, r = n.GetWorldCenter(), i = n.GetMass();
            for (s = this.m_bodyList; s != t; s = s.nextBody) {
                o = s.body, u = o.GetWorldCenter(), a = u.x - r.x, f = u.y - r.y, l = a * a + f * f;
                if (l < Number.MIN_VALUE) continue;
                c = new b(a, f), c.Multiply(this.G / l / Math.sqrt(l) * i * o.GetMass()), n.IsAwake() && n.ApplyForce(c, r), c.Multiply(-1), o.IsAwake() && o.ApplyForce(c, u)
            }
        } else for (t = this.m_bodyList; t; t = t.nextBody) {
            n = t.body, r = n.GetWorldCenter(), i = n.GetMass();
            for (s = this.m_bodyList; s != t; s = s.nextBody) {
                o = s.body, u = o.GetWorldCenter(), a = u.x - r.x, f = u.y - r.y, l = a * a + f * f;
                if (l < Number.MIN_VALUE) continue;
                c = new b(a, f), c.Multiply(this.G / l * i * o.GetMass()), n.IsAwake() && n.ApplyForce(c, r), c.Multiply(-1), o.IsAwake() && o.ApplyForce(c, u)
            }
        }
    }, Box2D.inherit(B, Box2D.Dynamics.Controllers.b2Controller), B.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype, B.b2TensorDampingController = function () {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments), this.T = new d, this.maxTimestep = 0
    }, B.prototype.SetAxisAligned = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0), this.T.col1.x = -e, this.T.col1.y = 0, this.T.col2.x = 0, this.T.col2.y = -t, e > 0 || t > 0 ? this.maxTimestep = 1 / Math.max(e, t) : this.maxTimestep = 0
    }, B.prototype.Step = function (e) {
        var t = e.dt;
        if (t <= Number.MIN_VALUE) return;
        t > this.maxTimestep && this.maxTimestep > 0 && (t = this.maxTimestep);
        for (var n = this.m_bodyList; n; n = n.nextBody) {
            var r = n.body;
            if (!r.IsAwake()) continue;
            var i = r.GetWorldVector(m.MulMV(this.T, r.GetLocalVector(r.GetLinearVelocity())));
            r.SetLinearVelocity(new b(r.GetLinearVelocity().x + i.x * t, r.GetLinearVelocity().y + i.y * t))
        }
    }
}(), function () {
    var e = Box2D.Common.b2Color,
        t = Box2D.Common.b2internal,
        n = Box2D.Common.b2Settings,
        r = Box2D.Common.Math.b2Mat22,
        i = Box2D.Common.Math.b2Mat33,
        s = Box2D.Common.Math.b2Math,
        o = Box2D.Common.Math.b2Sweep,
        u = Box2D.Common.Math.b2Transform,
        a = Box2D.Common.Math.b2Vec2,
        f = Box2D.Common.Math.b2Vec3,
        l = Box2D.Dynamics.Joints.b2DistanceJoint,
        c = Box2D.Dynamics.Joints.b2DistanceJointDef,
        h = Box2D.Dynamics.Joints.b2FrictionJoint,
        p = Box2D.Dynamics.Joints.b2FrictionJointDef,
        d = Box2D.Dynamics.Joints.b2GearJoint,
        v = Box2D.Dynamics.Joints.b2GearJointDef,
        m = Box2D.Dynamics.Joints.b2Jacobian,
        g = Box2D.Dynamics.Joints.b2Joint,
        y = Box2D.Dynamics.Joints.b2JointDef,
        b = Box2D.Dynamics.Joints.b2JointEdge,
        w = Box2D.Dynamics.Joints.b2LineJoint,
        E = Box2D.Dynamics.Joints.b2LineJointDef,
        S = Box2D.Dynamics.Joints.b2MouseJoint,
        x = Box2D.Dynamics.Joints.b2MouseJointDef,
        T = Box2D.Dynamics.Joints.b2PrismaticJoint,
        N = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        C = Box2D.Dynamics.Joints.b2PulleyJoint,
        k = Box2D.Dynamics.Joints.b2PulleyJointDef,
        L = Box2D.Dynamics.Joints.b2RevoluteJoint,
        A = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        O = Box2D.Dynamics.Joints.b2WeldJoint,
        M = Box2D.Dynamics.Joints.b2WeldJointDef,
        _ = Box2D.Dynamics.b2Body,
        D = Box2D.Dynamics.b2BodyDef,
        P = Box2D.Dynamics.b2ContactFilter,
        H = Box2D.Dynamics.b2ContactImpulse,
        B = Box2D.Dynamics.b2ContactListener,
        j = Box2D.Dynamics.b2ContactManager,
        F = Box2D.Dynamics.b2DebugDraw,
        I = Box2D.Dynamics.b2DestructionListener,
        q = Box2D.Dynamics.b2FilterData,
        R = Box2D.Dynamics.b2Fixture,
        U = Box2D.Dynamics.b2FixtureDef,
        z = Box2D.Dynamics.b2Island,
        W = Box2D.Dynamics.b2TimeStep,
        X = Box2D.Dynamics.b2World;
    Box2D.inherit(l, Box2D.Dynamics.Joints.b2Joint), l.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, l.b2DistanceJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchor1 = new a, this.m_localAnchor2 = new a, this.m_u = new a
    }, l.prototype.GetAnchorA = function () {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    }, l.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    }, l.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * this.m_impulse * this.m_u.x, e * this.m_impulse * this.m_u.y)
    }, l.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), 0
    }, l.prototype.GetLength = function () {
        return this.m_length
    }, l.prototype.SetLength = function (e) {
        e === undefined && (e = 0), this.m_length = e
    }, l.prototype.GetFrequency = function () {
        return this.m_frequencyHz
    }, l.prototype.SetFrequency = function (e) {
        e === undefined && (e = 0), this.m_frequencyHz = e
    }, l.prototype.GetDampingRatio = function () {
        return this.m_dampingRatio
    }, l.prototype.SetDampingRatio = function (e) {
        e === undefined && (e = 0), this.m_dampingRatio = e
    }, l.prototype.b2DistanceJoint = function (e) {
        this.__super.b2Joint.call(this, e);
        var t, n = 0,
            r = 0;
        this.m_localAnchor1.SetV(e.localAnchorA), this.m_localAnchor2.SetV(e.localAnchorB), this.m_length = e.length, this.m_frequencyHz = e.frequencyHz, this.m_dampingRatio = e.dampingRatio, this.m_impulse = 0, this.m_gamma = 0, this.m_bias = 0
    }, l.prototype.InitVelocityConstraints = function (e) {
        var t, r = 0,
            i = this.m_bodyA,
            s = this.m_bodyB;
        t = i.m_xf.R;
        var o = this.m_localAnchor1.x - i.m_sweep.localCenter.x,
            u = this.m_localAnchor1.y - i.m_sweep.localCenter.y;
        r = t.col1.x * o + t.col2.x * u, u = t.col1.y * o + t.col2.y * u, o = r, t = s.m_xf.R;
        var a = this.m_localAnchor2.x - s.m_sweep.localCenter.x,
            f = this.m_localAnchor2.y - s.m_sweep.localCenter.y;
        r = t.col1.x * a + t.col2.x * f, f = t.col1.y * a + t.col2.y * f, a = r, this.m_u.x = s.m_sweep.c.x + a - i.m_sweep.c.x - o, this.m_u.y = s.m_sweep.c.y + f - i.m_sweep.c.y - u;
        var l = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
        l > n.b2_linearSlop ? this.m_u.Multiply(1 / l) : this.m_u.SetZero();
        var c = o * this.m_u.y - u * this.m_u.x,
            h = a * this.m_u.y - f * this.m_u.x,
            p = i.m_invMass + i.m_invI * c * c + s.m_invMass + s.m_invI * h * h;
        this.m_mass = p != 0 ? 1 / p : 0;
        if (this.m_frequencyHz > 0) {
            var d = l - this.m_length,
                v = 2 * Math.PI * this.m_frequencyHz,
                m = 2 * this.m_mass * this.m_dampingRatio * v,
                g = this.m_mass * v * v;
            this.m_gamma = e.dt * (m + e.dt * g), this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0, this.m_bias = d * e.dt * g * this.m_gamma, this.m_mass = p + this.m_gamma, this.m_mass = this.m_mass != 0 ? 1 / this.m_mass : 0
        }
        if (e.warmStarting) {
            this.m_impulse *= e.dtRatio;
            var y = this.m_impulse * this.m_u.x,
                b = this.m_impulse * this.m_u.y;
            i.m_linearVelocity.x -= i.m_invMass * y, i.m_linearVelocity.y -= i.m_invMass * b, i.m_angularVelocity -= i.m_invI * (o * b - u * y), s.m_linearVelocity.x += s.m_invMass * y, s.m_linearVelocity.y += s.m_invMass * b, s.m_angularVelocity += s.m_invI * (a * b - f * y)
        } else this.m_impulse = 0
    }, l.prototype.SolveVelocityConstraints = function (e) {
        var t, n = this.m_bodyA,
            r = this.m_bodyB;
        t = n.m_xf.R;
        var i = this.m_localAnchor1.x - n.m_sweep.localCenter.x,
            s = this.m_localAnchor1.y - n.m_sweep.localCenter.y,
            o = t.col1.x * i + t.col2.x * s;
        s = t.col1.y * i + t.col2.y * s, i = o, t = r.m_xf.R;
        var u = this.m_localAnchor2.x - r.m_sweep.localCenter.x,
            a = this.m_localAnchor2.y - r.m_sweep.localCenter.y;
        o = t.col1.x * u + t.col2.x * a, a = t.col1.y * u + t.col2.y * a, u = o;
        var f = n.m_linearVelocity.x + -n.m_angularVelocity * s,
            l = n.m_linearVelocity.y + n.m_angularVelocity * i,
            c = r.m_linearVelocity.x + -r.m_angularVelocity * a,
            h = r.m_linearVelocity.y + r.m_angularVelocity * u,
            p = this.m_u.x * (c - f) + this.m_u.y * (h - l),
            d = -this.m_mass * (p + this.m_bias + this.m_gamma * this.m_impulse);
        this.m_impulse += d;
        var v = d * this.m_u.x,
            m = d * this.m_u.y;
        n.m_linearVelocity.x -= n.m_invMass * v, n.m_linearVelocity.y -= n.m_invMass * m, n.m_angularVelocity -= n.m_invI * (i * m - s * v), r.m_linearVelocity.x += r.m_invMass * v, r.m_linearVelocity.y += r.m_invMass * m, r.m_angularVelocity += r.m_invI * (u * m - a * v)
    }, l.prototype.SolvePositionConstraints = function (e) {
        e === undefined && (e = 0);
        var t;
        if (this.m_frequencyHz > 0) return true;
        var r = this.m_bodyA,
            i = this.m_bodyB;
        t = r.m_xf.R;
        var o = this.m_localAnchor1.x - r.m_sweep.localCenter.x,
            u = this.m_localAnchor1.y - r.m_sweep.localCenter.y,
            a = t.col1.x * o + t.col2.x * u;
        u = t.col1.y * o + t.col2.y * u, o = a, t = i.m_xf.R;
        var f = this.m_localAnchor2.x - i.m_sweep.localCenter.x,
            l = this.m_localAnchor2.y - i.m_sweep.localCenter.y;
        a = t.col1.x * f + t.col2.x * l, l = t.col1.y * f + t.col2.y * l, f = a;
        var c = i.m_sweep.c.x + f - r.m_sweep.c.x - o,
            h = i.m_sweep.c.y + l - r.m_sweep.c.y - u,
            p = Math.sqrt(c * c + h * h);
        c /= p, h /= p;
        var d = p - this.m_length;
        d = s.Clamp(d, -n.b2_maxLinearCorrection, n.b2_maxLinearCorrection);
        var v = -this.m_mass * d;
        this.m_u.Set(c, h);
        var m = v * this.m_u.x,
            g = v * this.m_u.y;
        return r.m_sweep.c.x -= r.m_invMass * m, r.m_sweep.c.y -= r.m_invMass * g, r.m_sweep.a -= r.m_invI * (o * g - u * m), i.m_sweep.c.x += i.m_invMass * m, i.m_sweep.c.y += i.m_invMass * g, i.m_sweep.a += i.m_invI * (f * g - l * m), r.SynchronizeTransform(), i.SynchronizeTransform(), s.Abs(d) < n.b2_linearSlop
    }, Box2D.inherit(c, Box2D.Dynamics.Joints.b2JointDef), c.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, c.b2DistanceJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new a, this.localAnchorB = new a
    }, c.prototype.b2DistanceJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_distanceJoint, this.length = 1, this.frequencyHz = 0, this.dampingRatio = 0
    }, c.prototype.Initialize = function (e, t, n, r) {
        this.bodyA = e, this.bodyB = t, this.localAnchorA.SetV(this.bodyA.GetLocalPoint(n)), this.localAnchorB.SetV(this.bodyB.GetLocalPoint(r));
        var i = r.x - n.x,
            s = r.y - n.y;
        this.length = Math.sqrt(i * i + s * s), this.frequencyHz = 0, this.dampingRatio = 0
    }, Box2D.inherit(h, Box2D.Dynamics.Joints.b2Joint), h.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, h.b2FrictionJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchorA = new a, this.m_localAnchorB = new a, this.m_linearMass = new r, this.m_linearImpulse = new a
    }, h.prototype.GetAnchorA = function () {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    }, h.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    }, h.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * this.m_linearImpulse.x, e * this.m_linearImpulse.y)
    }, h.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), e * this.m_angularImpulse
    }, h.prototype.SetMaxForce = function (e) {
        e === undefined && (e = 0), this.m_maxForce = e
    }, h.prototype.GetMaxForce = function () {
        return this.m_maxForce
    }, h.prototype.SetMaxTorque = function (e) {
        e === undefined && (e = 0), this.m_maxTorque = e
    }, h.prototype.GetMaxTorque = function () {
        return this.m_maxTorque
    }, h.prototype.b2FrictionJoint = function (e) {
        this.__super.b2Joint.call(this, e), this.m_localAnchorA.SetV(e.localAnchorA), this.m_localAnchorB.SetV(e.localAnchorB), this.m_linearMass.SetZero(), this.m_angularMass = 0, this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0, this.m_maxForce = e.maxForce, this.m_maxTorque = e.maxTorque
    }, h.prototype.InitVelocityConstraints = function (e) {
        var t, n = 0,
            i = this.m_bodyA,
            s = this.m_bodyB;
        t = i.m_xf.R;
        var o = this.m_localAnchorA.x - i.m_sweep.localCenter.x,
            u = this.m_localAnchorA.y - i.m_sweep.localCenter.y;
        n = t.col1.x * o + t.col2.x * u, u = t.col1.y * o + t.col2.y * u, o = n, t = s.m_xf.R;
        var a = this.m_localAnchorB.x - s.m_sweep.localCenter.x,
            f = this.m_localAnchorB.y - s.m_sweep.localCenter.y;
        n = t.col1.x * a + t.col2.x * f, f = t.col1.y * a + t.col2.y * f, a = n;
        var l = i.m_invMass,
            c = s.m_invMass,
            h = i.m_invI,
            p = s.m_invI,
            d = new r;
        d.col1.x = l + c, d.col2.x = 0, d.col1.y = 0, d.col2.y = l + c, d.col1.x += h * u * u, d.col2.x += -h * o * u, d.col1.y += -h * o * u, d.col2.y += h * o * o, d.col1.x += p * f * f, d.col2.x += -p * a * f, d.col1.y += -p * a * f, d.col2.y += p * a * a, d.GetInverse(this.m_linearMass), this.m_angularMass = h + p, this.m_angularMass > 0 && (this.m_angularMass = 1 / this.m_angularMass);
        if (e.warmStarting) {
            this.m_linearImpulse.x *= e.dtRatio, this.m_linearImpulse.y *= e.dtRatio, this.m_angularImpulse *= e.dtRatio;
            var v = this.m_linearImpulse;
            i.m_linearVelocity.x -= l * v.x, i.m_linearVelocity.y -= l * v.y, i.m_angularVelocity -= h * (o * v.y - u * v.x + this.m_angularImpulse), s.m_linearVelocity.x += c * v.x, s.m_linearVelocity.y += c * v.y, s.m_angularVelocity += p * (a * v.y - f * v.x + this.m_angularImpulse)
        } else this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0
    }, h.prototype.SolveVelocityConstraints = function (e) {
        var t, n = 0,
            r = this.m_bodyA,
            i = this.m_bodyB,
            o = r.m_linearVelocity,
            u = r.m_angularVelocity,
            f = i.m_linearVelocity,
            l = i.m_angularVelocity,
            c = r.m_invMass,
            h = i.m_invMass,
            p = r.m_invI,
            d = i.m_invI;
        t = r.m_xf.R;
        var v = this.m_localAnchorA.x - r.m_sweep.localCenter.x,
            m = this.m_localAnchorA.y - r.m_sweep.localCenter.y;
        n = t.col1.x * v + t.col2.x * m, m = t.col1.y * v + t.col2.y * m, v = n, t = i.m_xf.R;
        var g = this.m_localAnchorB.x - i.m_sweep.localCenter.x,
            y = this.m_localAnchorB.y - i.m_sweep.localCenter.y;
        n = t.col1.x * g + t.col2.x * y, y = t.col1.y * g + t.col2.y * y, g = n;
        var b = 0,
            w = l - u,
            E = -this.m_angularMass * w,
            S = this.m_angularImpulse;
        b = e.dt * this.m_maxTorque, this.m_angularImpulse = s.Clamp(this.m_angularImpulse + E, -b, b), E = this.m_angularImpulse - S, u -= p * E, l += d * E;
        var x = f.x - l * y - o.x + u * m,
            T = f.y + l * g - o.y - u * v,
            N = s.MulMV(this.m_linearMass, new a(-x, -T)),
            C = this.m_linearImpulse.Copy();
        this.m_linearImpulse.Add(N), b = e.dt * this.m_maxForce, this.m_linearImpulse.LengthSquared() > b * b && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(b)), N = s.SubtractVV(this.m_linearImpulse, C), o.x -= c * N.x, o.y -= c * N.y, u -= p * (v * N.y - m * N.x), f.x += h * N.x, f.y += h * N.y, l += d * (g * N.y - y * N.x), r.m_angularVelocity = u, i.m_angularVelocity = l
    }, h.prototype.SolvePositionConstraints = function (e) {
        return e === undefined && (e = 0), true
    }, Box2D.inherit(p, Box2D.Dynamics.Joints.b2JointDef), p.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, p.b2FrictionJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new a, this.localAnchorB = new a
    }, p.prototype.b2FrictionJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_frictionJoint, this.maxForce = 0, this.maxTorque = 0
    }, p.prototype.Initialize = function (e, t, n) {
        this.bodyA = e, this.bodyB = t, this.localAnchorA.SetV(this.bodyA.GetLocalPoint(n)), this.localAnchorB.SetV(this.bodyB.GetLocalPoint(n))
    }, Box2D.inherit(d, Box2D.Dynamics.Joints.b2Joint), d.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, d.b2GearJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_groundAnchor1 = new a, this.m_groundAnchor2 = new a, this.m_localAnchor1 = new a, this.m_localAnchor2 = new a, this.m_J = new m
    }, d.prototype.GetAnchorA = function () {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    }, d.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    }, d.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * this.m_impulse * this.m_J.linearB.x, e * this.m_impulse * this.m_J.linearB.y)
    }, d.prototype.GetReactionTorque = function (e) {
        e === undefined && (e = 0);
        var t = this.m_bodyB.m_xf.R,
            n = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x,
            r = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y,
            i = t.col1.x * n + t.col2.x * r;
        r = t.col1.y * n + t.col2.y * r, n = i;
        var s = this.m_impulse * this.m_J.linearB.x,
            o = this.m_impulse * this.m_J.linearB.y;
        return e * (this.m_impulse * this.m_J.angularB - n * o + r * s)
    }, d.prototype.GetRatio = function () {
        return this.m_ratio
    }, d.prototype.SetRatio = function (e) {
        e === undefined && (e = 0), this.m_ratio = e
    }, d.prototype.b2GearJoint = function (e) {
        this.__super.b2Joint.call(this, e);
        var t = parseInt(e.joint1.m_type),
            n = parseInt(e.joint2.m_type);
        this.m_revolute1 = null, this.m_prismatic1 = null, this.m_revolute2 = null, this.m_prismatic2 = null;
        var r = 0,
            i = 0;
        this.m_ground1 = e.joint1.GetBodyA(), this.m_bodyA = e.joint1.GetBodyB(), t == g.e_revoluteJoint ? (this.m_revolute1 = e.joint1 instanceof L ? e.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), r = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = e.joint1 instanceof T ? e.joint1 : null, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), r = this.m_prismatic1.GetJointTranslation()), this.m_ground2 = e.joint2.GetBodyA(), this.m_bodyB = e.joint2.GetBodyB(), n == g.e_revoluteJoint ? (this.m_revolute2 = e.joint2 instanceof L ? e.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), i = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = e.joint2 instanceof T ? e.joint2 : null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), i = this.m_prismatic2.GetJointTranslation()), this.m_ratio = e.ratio, this.m_constant = r + this.m_ratio * i, this.m_impulse = 0
    }, d.prototype.InitVelocityConstraints = function (e) {
        var t = this.m_ground1,
            n = this.m_ground2,
            r = this.m_bodyA,
            i = this.m_bodyB,
            s = 0,
            o = 0,
            u = 0,
            a = 0,
            f, l, c = 0,
            h = 0,
            p = 0;
        this.m_J.SetZero(), this.m_revolute1 ? (this.m_J.angularA = -1, p += r.m_invI) : (f = t.m_xf.R, l = this.m_prismatic1.m_localXAxis1, s = f.col1.x * l.x + f.col2.x * l.y, o = f.col1.y * l.x + f.col2.y * l.y, f = r.m_xf.R, u = this.m_localAnchor1.x - r.m_sweep.localCenter.x, a = this.m_localAnchor1.y - r.m_sweep.localCenter.y, h = f.col1.x * u + f.col2.x * a, a = f.col1.y * u + f.col2.y * a, u = h, c = u * o - a * s, this.m_J.linearA.Set(-s, -o), this.m_J.angularA = -c, p += r.m_invMass + r.m_invI * c * c), this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, p += this.m_ratio * this.m_ratio * i.m_invI) : (f = n.m_xf.R, l = this.m_prismatic2.m_localXAxis1, s = f.col1.x * l.x + f.col2.x * l.y, o = f.col1.y * l.x + f.col2.y * l.y, f = i.m_xf.R, u = this.m_localAnchor2.x - i.m_sweep.localCenter.x, a = this.m_localAnchor2.y - i.m_sweep.localCenter.y, h = f.col1.x * u + f.col2.x * a, a = f.col1.y * u + f.col2.y * a, u = h, c = u * o - a * s, this.m_J.linearB.Set(-this.m_ratio * s, -this.m_ratio * o), this.m_J.angularB = -this.m_ratio * c, p += this.m_ratio * this.m_ratio * (i.m_invMass + i.m_invI * c * c)), this.m_mass = p > 0 ? 1 / p : 0, e.warmStarting ? (r.m_linearVelocity.x += r.m_invMass * this.m_impulse * this.m_J.linearA.x, r.m_linearVelocity.y += r.m_invMass * this.m_impulse * this.m_J.linearA.y, r.m_angularVelocity += r.m_invI * this.m_impulse * this.m_J.angularA, i.m_linearVelocity.x += i.m_invMass * this.m_impulse * this.m_J.linearB.x, i.m_linearVelocity.y += i.m_invMass * this.m_impulse * this.m_J.linearB.y, i.m_angularVelocity += i.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
    }, d.prototype.SolveVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            n = this.m_bodyB,
            r = this.m_J.Compute(t.m_linearVelocity, t.m_angularVelocity, n.m_linearVelocity, n.m_angularVelocity),
            i = -this.m_mass * r;
        this.m_impulse += i, t.m_linearVelocity.x += t.m_invMass * i * this.m_J.linearA.x, t.m_linearVelocity.y += t.m_invMass * i * this.m_J.linearA.y, t.m_angularVelocity += t.m_invI * i * this.m_J.angularA, n.m_linearVelocity.x += n.m_invMass * i * this.m_J.linearB.x, n.m_linearVelocity.y += n.m_invMass * i * this.m_J.linearB.y, n.m_angularVelocity += n.m_invI * i * this.m_J.angularB
    }, d.prototype.SolvePositionConstraints = function (e) {
        e === undefined && (e = 0);
        var t = 0,
            r = this.m_bodyA,
            i = this.m_bodyB,
            s = 0,
            o = 0;
        this.m_revolute1 ? s = this.m_revolute1.GetJointAngle() : s = this.m_prismatic1.GetJointTranslation(), this.m_revolute2 ? o = this.m_revolute2.GetJointAngle() : o = this.m_prismatic2.GetJointTranslation();
        var u = this.m_constant - (s + this.m_ratio * o),
            a = -this.m_mass * u;
        return r.m_sweep.c.x += r.m_invMass * a * this.m_J.linearA.x, r.m_sweep.c.y += r.m_invMass * a * this.m_J.linearA.y, r.m_sweep.a += r.m_invI * a * this.m_J.angularA, i.m_sweep.c.x += i.m_invMass * a * this.m_J.linearB.x, i.m_sweep.c.y += i.m_invMass * a * this.m_J.linearB.y, i.m_sweep.a += i.m_invI * a * this.m_J.angularB, r.SynchronizeTransform(), i.SynchronizeTransform(), t < n.b2_linearSlop
    }, Box2D.inherit(v, Box2D.Dynamics.Joints.b2JointDef), v.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, v.b2GearJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
    }, v.prototype.b2GearJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_gearJoint, this.joint1 = null, this.joint2 = null, this.ratio = 1
    }, m.b2Jacobian = function () {
        this.linearA = new a, this.linearB = new a
    }, m.prototype.SetZero = function () {
        this.linearA.SetZero(), this.angularA = 0, this.linearB.SetZero(), this.angularB = 0
    }, m.prototype.Set = function (e, t, n, r) {
        t === undefined && (t = 0), r === undefined && (r = 0), this.linearA.SetV(e), this.angularA = t, this.linearB.SetV(n), this.angularB = r
    }, m.prototype.Compute = function (e, t, n, r) {
        return t === undefined && (t = 0), r === undefined && (r = 0), this.linearA.x * e.x + this.linearA.y * e.y + this.angularA * t + (this.linearB.x * n.x + this.linearB.y * n.y) + this.angularB * r
    }, g.b2Joint = function () {
        this.m_edgeA = new b, this.m_edgeB = new b, this.m_localCenterA = new a, this.m_localCenterB = new a
    }, g.prototype.GetType = function () {
        return this.m_type
    }, g.prototype.GetAnchorA = function () {
        return null
    }, g.prototype.GetAnchorB = function () {
        return null
    }, g.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), null
    }, g.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), 0
    }, g.prototype.GetBodyA = function () {
        return this.m_bodyA
    }, g.prototype.GetBodyB = function () {
        return this.m_bodyB
    }, g.prototype.GetNext = function () {
        return this.m_next
    }, g.prototype.GetUserData = function () {
        return this.m_userData
    }, g.prototype.SetUserData = function (e) {
        this.m_userData = e
    }, g.prototype.IsActive = function () {
        return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
    }, g.Create = function (e, t) {
        var n = null;
        switch (e.type) {
            case g.e_distanceJoint:
                n = new l(e instanceof c ? e : null);
                break;
            case g.e_mouseJoint:
                n = new S(e instanceof x ? e : null);
                break;
            case g.e_prismaticJoint:
                n = new T(e instanceof N ? e : null);
                break;
            case g.e_revoluteJoint:
                n = new L(e instanceof A ? e : null);
                break;
            case g.e_pulleyJoint:
                n = new C(e instanceof k ? e : null);
                break;
            case g.e_gearJoint:
                n = new d(e instanceof v ? e : null);
                break;
            case g.e_lineJoint:
                n = new w(e instanceof E ? e : null);
                break;
            case g.e_weldJoint:
                n = new O(e instanceof M ? e : null);
                break;
            case g.e_frictionJoint:
                n = new h(e instanceof p ? e : null);
                break;
            default:
        }
        return n
    }, g.Destroy = function (e, t) {}, g.prototype.b2Joint = function (e) {
        n.b2Assert(e.bodyA != e.bodyB), this.m_type = e.type, this.m_prev = null, this.m_next = null, this.m_bodyA = e.bodyA, this.m_bodyB = e.bodyB, this.m_collideConnected = e.collideConnected, this.m_islandFlag = false, this.m_userData = e.userData
    }, g.prototype.InitVelocityConstraints = function (e) {}, g.prototype.SolveVelocityConstraints = function (e) {}, g.prototype.FinalizeVelocityConstraints = function () {}, g.prototype.SolvePositionConstraints = function (e) {
        return e === undefined && (e = 0), false
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0, Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1, Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2, Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3, Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4, Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5, Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6, Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7, Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8, Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9, Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0, Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1, Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2, Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3
    }), y.b2JointDef = function () {}, y.prototype.b2JointDef = function () {
        this.type = g.e_unknownJoint, this.userData = null, this.bodyA = null, this.bodyB = null, this.collideConnected = false
    }, b.b2JointEdge = function () {}, Box2D.inherit(w, Box2D.Dynamics.Joints.b2Joint), w.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, w.b2LineJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchor1 = new a, this.m_localAnchor2 = new a, this.m_localXAxis1 = new a, this.m_localYAxis1 = new a, this.m_axis = new a, this.m_perp = new a, this.m_K = new r, this.m_impulse = new a
    }, w.prototype.GetAnchorA = function () {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    }, w.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    }, w.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), e * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
    }, w.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), e * this.m_impulse.y
    }, w.prototype.GetJointTranslation = function () {
        var e = this.m_bodyA,
            t = this.m_bodyB,
            n, r = e.GetWorldPoint(this.m_localAnchor1),
            i = t.GetWorldPoint(this.m_localAnchor2),
            s = i.x - r.x,
            o = i.y - r.y,
            u = e.GetWorldVector(this.m_localXAxis1),
            a = u.x * s + u.y * o;
        return a
    }, w.prototype.GetJointSpeed = function () {
        var e = this.m_bodyA,
            t = this.m_bodyB,
            n;
        n = e.m_xf.R;
        var r = this.m_localAnchor1.x - e.m_sweep.localCenter.x,
            i = this.m_localAnchor1.y - e.m_sweep.localCenter.y,
            s = n.col1.x * r + n.col2.x * i;
        i = n.col1.y * r + n.col2.y * i, r = s, n = t.m_xf.R;
        var o = this.m_localAnchor2.x - t.m_sweep.localCenter.x,
            u = this.m_localAnchor2.y - t.m_sweep.localCenter.y;
        s = n.col1.x * o + n.col2.x * u, u = n.col1.y * o + n.col2.y * u, o = s;
        var a = e.m_sweep.c.x + r,
            f = e.m_sweep.c.y + i,
            l = t.m_sweep.c.x + o,
            c = t.m_sweep.c.y + u,
            h = l - a,
            p = c - f,
            d = e.GetWorldVector(this.m_localXAxis1),
            v = e.m_linearVelocity,
            m = t.m_linearVelocity,
            g = e.m_angularVelocity,
            y = t.m_angularVelocity,
            b = h * -g * d.y + p * g * d.x + (d.x * (m.x + -y * u - v.x - -g * i) + d.y * (m.y + y * o - v.y - g * r));
        return b
    }, w.prototype.IsLimitEnabled = function () {
        return this.m_enableLimit
    }, w.prototype.EnableLimit = function (e) {
        this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_enableLimit = e
    }, w.prototype.GetLowerLimit = function () {
        return this.m_lowerTranslation
    }, w.prototype.GetUpperLimit = function () {
        return this.m_upperTranslation
    }, w.prototype.SetLimits = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0), this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_lowerTranslation = e, this.m_upperTranslation = t
    }, w.prototype.IsMotorEnabled = function () {
        return this.m_enableMotor
    }, w.prototype.EnableMotor = function (e) {
        this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_enableMotor = e
    }, w.prototype.SetMotorSpeed = function (e) {
        e === undefined && (e = 0), this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_motorSpeed = e
    }, w.prototype.GetMotorSpeed = function () {
        return this.m_motorSpeed
    }, w.prototype.SetMaxMotorForce = function (e) {
        e === undefined && (e = 0), this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_maxMotorForce = e
    }, w.prototype.GetMaxMotorForce = function () {
        return this.m_maxMotorForce
    }, w.prototype.GetMotorForce = function () {
        return this.m_motorImpulse
    }, w.prototype.b2LineJoint = function (e) {
        this.__super.b2Joint.call(this, e);
        var t, n = 0,
            r = 0;
        this.m_localAnchor1.SetV(e.localAnchorA), this.m_localAnchor2.SetV(e.localAnchorB), this.m_localXAxis1.SetV(e.localAxisA), this.m_localYAxis1.x = -this.m_localXAxis1.y, this.m_localYAxis1.y = this.m_localXAxis1.x, this.m_impulse.SetZero(), this.m_motorMass = 0, this.m_motorImpulse = 0, this.m_lowerTranslation = e.lowerTranslation, this.m_upperTranslation = e.upperTranslation, this.m_maxMotorForce = e.maxMotorForce, this.m_motorSpeed = e.motorSpeed, this.m_enableLimit = e.enableLimit, this.m_enableMotor = e.enableMotor, this.m_limitState = g.e_inactiveLimit, this.m_axis.SetZero(), this.m_perp.SetZero()
    }, w.prototype.InitVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            r = this.m_bodyB,
            i, o = 0;
        this.m_localCenterA.SetV(t.GetLocalCenter()), this.m_localCenterB.SetV(r.GetLocalCenter());
        var u = t.GetTransform(),
            a = r.GetTransform();
        i = t.m_xf.R;
        var f = this.m_localAnchor1.x - this.m_localCenterA.x,
            l = this.m_localAnchor1.y - this.m_localCenterA.y;
        o = i.col1.x * f + i.col2.x * l, l = i.col1.y * f + i.col2.y * l, f = o, i = r.m_xf.R;
        var c = this.m_localAnchor2.x - this.m_localCenterB.x,
            h = this.m_localAnchor2.y - this.m_localCenterB.y;
        o = i.col1.x * c + i.col2.x * h, h = i.col1.y * c + i.col2.y * h, c = o;
        var p = r.m_sweep.c.x + c - t.m_sweep.c.x - f,
            d = r.m_sweep.c.y + h - t.m_sweep.c.y - l;
        this.m_invMassA = t.m_invMass, this.m_invMassB = r.m_invMass, this.m_invIA = t.m_invI, this.m_invIB = r.m_invI, this.m_axis.SetV(s.MulMV(u.R, this.m_localXAxis1)), this.m_a1 = (p + f) * this.m_axis.y - (d + l) * this.m_axis.x, this.m_a2 = c * this.m_axis.y - h * this.m_axis.x, this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2, this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0, this.m_perp.SetV(s.MulMV(u.R, this.m_localYAxis1)), this.m_s1 = (p + f) * this.m_perp.y - (d + l) * this.m_perp.x, this.m_s2 = c * this.m_perp.y - h * this.m_perp.x;
        var v = this.m_invMassA,
            m = this.m_invMassB,
            y = this.m_invIA,
            b = this.m_invIB;
        this.m_K.col1.x = v + m + y * this.m_s1 * this.m_s1 + b * this.m_s2 * this.m_s2, this.m_K.col1.y = y * this.m_s1 * this.m_a1 + b * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = v + m + y * this.m_a1 * this.m_a1 + b * this.m_a2 * this.m_a2;
        if (this.m_enableLimit) {
            var w = this.m_axis.x * p + this.m_axis.y * d;
            s.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * n.b2_linearSlop ? this.m_limitState = g.e_equalLimits : w <= this.m_lowerTranslation ? this.m_limitState != g.e_atLowerLimit && (this.m_limitState = g.e_atLowerLimit, this.m_impulse.y = 0) : w >= this.m_upperTranslation ? this.m_limitState != g.e_atUpperLimit && (this.m_limitState = g.e_atUpperLimit, this.m_impulse.y = 0) : (this.m_limitState = g.e_inactiveLimit, this.m_impulse.y = 0)
        } else this.m_limitState = g.e_inactiveLimit;
        this.m_enableMotor == 0 && (this.m_motorImpulse = 0);
        if (e.warmStarting) {
            this.m_impulse.x *= e.dtRatio, this.m_impulse.y *= e.dtRatio, this.m_motorImpulse *= e.dtRatio;
            var E = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x,
                S = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y,
                x = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1,
                T = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
            t.m_linearVelocity.x -= this.m_invMassA * E, t.m_linearVelocity.y -= this.m_invMassA * S, t.m_angularVelocity -= this.m_invIA * x, r.m_linearVelocity.x += this.m_invMassB * E, r.m_linearVelocity.y += this.m_invMassB * S, r.m_angularVelocity += this.m_invIB * T
        } else this.m_impulse.SetZero(), this.m_motorImpulse = 0
    }, w.prototype.SolveVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            n = this.m_bodyB,
            r = t.m_linearVelocity,
            i = t.m_angularVelocity,
            o = n.m_linearVelocity,
            u = n.m_angularVelocity,
            f = 0,
            l = 0,
            c = 0,
            h = 0;
        if (this.m_enableMotor && this.m_limitState != g.e_equalLimits) {
            var p = this.m_axis.x * (o.x - r.x) + this.m_axis.y * (o.y - r.y) + this.m_a2 * u - this.m_a1 * i,
                d = this.m_motorMass * (this.m_motorSpeed - p),
                v = this.m_motorImpulse,
                m = e.dt * this.m_maxMotorForce;
            this.m_motorImpulse = s.Clamp(this.m_motorImpulse + d, -m, m), d = this.m_motorImpulse - v, f = d * this.m_axis.x, l = d * this.m_axis.y, c = d * this.m_a1, h = d * this.m_a2, r.x -= this.m_invMassA * f, r.y -= this.m_invMassA * l, i -= this.m_invIA * c, o.x += this.m_invMassB * f, o.y += this.m_invMassB * l, u += this.m_invIB * h
        }
        var y = this.m_perp.x * (o.x - r.x) + this.m_perp.y * (o.y - r.y) + this.m_s2 * u - this.m_s1 * i;
        if (this.m_enableLimit && this.m_limitState != g.e_inactiveLimit) {
            var b = this.m_axis.x * (o.x - r.x) + this.m_axis.y * (o.y - r.y) + this.m_a2 * u - this.m_a1 * i,
                w = this.m_impulse.Copy(),
                E = this.m_K.Solve(new a, -y, -b);
            this.m_impulse.Add(E), this.m_limitState == g.e_atLowerLimit ? this.m_impulse.y = s.Max(this.m_impulse.y, 0) : this.m_limitState == g.e_atUpperLimit && (this.m_impulse.y = s.Min(this.m_impulse.y, 0));
            var S = -y - (this.m_impulse.y - w.y) * this.m_K.col2.x,
                x = 0;
            this.m_K.col1.x != 0 ? x = S / this.m_K.col1.x + w.x : x = w.x, this.m_impulse.x = x, E.x = this.m_impulse.x - w.x, E.y = this.m_impulse.y - w.y, f = E.x * this.m_perp.x + E.y * this.m_axis.x, l = E.x * this.m_perp.y + E.y * this.m_axis.y, c = E.x * this.m_s1 + E.y * this.m_a1, h = E.x * this.m_s2 + E.y * this.m_a2, r.x -= this.m_invMassA * f, r.y -= this.m_invMassA * l, i -= this.m_invIA * c, o.x += this.m_invMassB * f, o.y += this.m_invMassB * l, u += this.m_invIB * h
        } else {
            var T = 0;
            this.m_K.col1.x != 0 ? T = -y / this.m_K.col1.x : T = 0, this.m_impulse.x += T, f = T * this.m_perp.x, l = T * this.m_perp.y, c = T * this.m_s1, h = T * this.m_s2, r.x -= this.m_invMassA * f, r.y -= this.m_invMassA * l, i -= this.m_invIA * c, o.x += this.m_invMassB * f, o.y += this.m_invMassB * l, u += this.m_invIB * h
        }
        t.m_linearVelocity.SetV(r), t.m_angularVelocity = i, n.m_linearVelocity.SetV(o), n.m_angularVelocity = u
    }, w.prototype.SolvePositionConstraints = function (e) {
        e === undefined && (e = 0);
        var t = 0,
            i = 0,
            o = this.m_bodyA,
            u = this.m_bodyB,
            f = o.m_sweep.c,
            l = o.m_sweep.a,
            c = u.m_sweep.c,
            h = u.m_sweep.a,
            p, d = 0,
            v = 0,
            m = 0,
            g = 0,
            y = 0,
            b = 0,
            w = 0,
            E = false,
            S = 0,
            x = r.FromAngle(l),
            T = r.FromAngle(h);
        p = x;
        var N = this.m_localAnchor1.x - this.m_localCenterA.x,
            C = this.m_localAnchor1.y - this.m_localCenterA.y;
        d = p.col1.x * N + p.col2.x * C, C = p.col1.y * N + p.col2.y * C, N = d, p = T;
        var k = this.m_localAnchor2.x - this.m_localCenterB.x,
            L = this.m_localAnchor2.y - this.m_localCenterB.y;
        d = p.col1.x * k + p.col2.x * L, L = p.col1.y * k + p.col2.y * L, k = d;
        var A = c.x + k - f.x - N,
            O = c.y + L - f.y - C;
        if (this.m_enableLimit) {
            this.m_axis = s.MulMV(x, this.m_localXAxis1), this.m_a1 = (A + N) * this.m_axis.y - (O + C) * this.m_axis.x, this.m_a2 = k * this.m_axis.y - L * this.m_axis.x;
            var M = this.m_axis.x * A + this.m_axis.y * O;
            s.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * n.b2_linearSlop ? (S = s.Clamp(M, -n.b2_maxLinearCorrection, n.b2_maxLinearCorrection), b = s.Abs(M), E = true) : M <= this.m_lowerTranslation ? (S = s.Clamp(M - this.m_lowerTranslation + n.b2_linearSlop, -n.b2_maxLinearCorrection, 0), b = this.m_lowerTranslation - M, E = true) : M >= this.m_upperTranslation && (S = s.Clamp(M - this.m_upperTranslation + n.b2_linearSlop, 0, n.b2_maxLinearCorrection), b = M - this.m_upperTranslation, E = true)
        }
        this.m_perp = s.MulMV(x, this.m_localYAxis1), this.m_s1 = (A + N) * this.m_perp.y - (O + C) * this.m_perp.x, this.m_s2 = k * this.m_perp.y - L * this.m_perp.x;
        var _ = new a,
            D = this.m_perp.x * A + this.m_perp.y * O;
        b = s.Max(b, s.Abs(D)), w = 0;
        if (E) v = this.m_invMassA, m = this.m_invMassB, g = this.m_invIA, y = this.m_invIB, this.m_K.col1.x = v + m + g * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2, this.m_K.col1.y = g * this.m_s1 * this.m_a1 + y * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = v + m + g * this.m_a1 * this.m_a1 + y * this.m_a2 * this.m_a2, this.m_K.Solve(_, -D, -S);
        else {
            v = this.m_invMassA, m = this.m_invMassB, g = this.m_invIA, y = this.m_invIB;
            var P = v + m + g * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2,
                H = 0;
            P != 0 ? H = -D / P : H = 0, _.x = H, _.y = 0
        }
        var B = _.x * this.m_perp.x + _.y * this.m_axis.x,
            j = _.x * this.m_perp.y + _.y * this.m_axis.y,
            F = _.x * this.m_s1 + _.y * this.m_a1,
            I = _.x * this.m_s2 + _.y * this.m_a2;
        return f.x -= this.m_invMassA * B, f.y -= this.m_invMassA * j, l -= this.m_invIA * F, c.x += this.m_invMassB * B, c.y += this.m_invMassB * j, h += this.m_invIB * I, o.m_sweep.a = l, u.m_sweep.a = h, o.SynchronizeTransform(), u.SynchronizeTransform(), b <= n.b2_linearSlop && w <= n.b2_angularSlop
    }, Box2D.inherit(E, Box2D.Dynamics.Joints.b2JointDef), E.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, E.b2LineJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new a, this.localAnchorB = new a, this.localAxisA = new a
    }, E.prototype.b2LineJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_lineJoint, this.localAxisA.Set(1, 0), this.enableLimit = false, this.lowerTranslation = 0, this.upperTranslation = 0, this.enableMotor = false, this.maxMotorForce = 0, this.motorSpeed = 0
    }, E.prototype.Initialize = function (e, t, n, r) {
        this.bodyA = e, this.bodyB = t, this.localAnchorA = this.bodyA.GetLocalPoint(n), this.localAnchorB = this.bodyB.GetLocalPoint(n), this.localAxisA = this.bodyA.GetLocalVector(r)
    }, Box2D.inherit(S, Box2D.Dynamics.Joints.b2Joint), S.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, S.b2MouseJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.K = new r, this.K1 = new r, this.K2 = new r, this.m_localAnchor = new a, this.m_target = new a, this.m_impulse = new a, this.m_mass = new r, this.m_C = new a
    }, S.prototype.GetAnchorA = function () {
        return this.m_target
    }, S.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
    }, S.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * this.m_impulse.x, e * this.m_impulse.y)
    }, S.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), 0
    }, S.prototype.GetTarget = function () {
        return this.m_target
    }, S.prototype.SetTarget = function (e) {
        this.m_bodyB.IsAwake() == 0 && this.m_bodyB.SetAwake(true), this.m_target = e
    }, S.prototype.GetMaxForce = function () {
        return this.m_maxForce
    }, S.prototype.SetMaxForce = function (e) {
        e === undefined && (e = 0), this.m_maxForce = e
    }, S.prototype.GetFrequency = function () {
        return this.m_frequencyHz
    }, S.prototype.SetFrequency = function (e) {
        e === undefined && (e = 0), this.m_frequencyHz = e
    }, S.prototype.GetDampingRatio = function () {
        return this.m_dampingRatio
    }, S.prototype.SetDampingRatio = function (e) {
        e === undefined && (e = 0), this.m_dampingRatio = e
    }, S.prototype.b2MouseJoint = function (e) {
        this.__super.b2Joint.call(this, e), this.m_target.SetV(e.target);
        var t = this.m_target.x - this.m_bodyB.m_xf.position.x,
            n = this.m_target.y - this.m_bodyB.m_xf.position.y,
            r = this.m_bodyB.m_xf.R;
        this.m_localAnchor.x = t * r.col1.x + n * r.col1.y, this.m_localAnchor.y = t * r.col2.x + n * r.col2.y, this.m_maxForce = e.maxForce, this.m_impulse.SetZero(), this.m_frequencyHz = e.frequencyHz, this.m_dampingRatio = e.dampingRatio, this.m_beta = 0, this.m_gamma = 0
    }, S.prototype.InitVelocityConstraints = function (e) {
        var t = this.m_bodyB,
            n = t.GetMass(),
            r = 2 * Math.PI * this.m_frequencyHz,
            i = 2 * n * this.m_dampingRatio * r,
            s = n * r * r;
        this.m_gamma = e.dt * (i + e.dt * s), this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0, this.m_beta = e.dt * s * this.m_gamma;
        var o;
        o = t.m_xf.R;
        var u = this.m_localAnchor.x - t.m_sweep.localCenter.x,
            a = this.m_localAnchor.y - t.m_sweep.localCenter.y,
            f = o.col1.x * u + o.col2.x * a;
        a = o.col1.y * u + o.col2.y * a, u = f;
        var l = t.m_invMass,
            c = t.m_invI;
        this.K1.col1.x = l, this.K1.col2.x = 0, this.K1.col1.y = 0, this.K1.col2.y = l, this.K2.col1.x = c * a * a, this.K2.col2.x = -c * u * a, this.K2.col1.y = -c * u * a, this.K2.col2.y = c * u * u, this.K.SetM(this.K1), this.K.AddM(this.K2), this.K.col1.x += this.m_gamma, this.K.col2.y += this.m_gamma, this.K.GetInverse(this.m_mass), this.m_C.x = t.m_sweep.c.x + u - this.m_target.x, this.m_C.y = t.m_sweep.c.y + a - this.m_target.y, t.m_angularVelocity *= .98, this.m_impulse.x *= e.dtRatio, this.m_impulse.y *= e.dtRatio, t.m_linearVelocity.x += l * this.m_impulse.x, t.m_linearVelocity.y += l * this.m_impulse.y, t.m_angularVelocity += c * (u * this.m_impulse.y - a * this.m_impulse.x)
    }, S.prototype.SolveVelocityConstraints = function (e) {
        var t = this.m_bodyB,
            n, r = 0,
            i = 0;
        n = t.m_xf.R;
        var s = this.m_localAnchor.x - t.m_sweep.localCenter.x,
            o = this.m_localAnchor.y - t.m_sweep.localCenter.y;
        r = n.col1.x * s + n.col2.x * o, o = n.col1.y * s + n.col2.y * o, s = r;
        var u = t.m_linearVelocity.x + -t.m_angularVelocity * o,
            a = t.m_linearVelocity.y + t.m_angularVelocity * s;
        n = this.m_mass, r = u + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x, i = a + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
        var f = -(n.col1.x * r + n.col2.x * i),
            l = -(n.col1.y * r + n.col2.y * i),
            c = this.m_impulse.x,
            h = this.m_impulse.y;
        this.m_impulse.x += f, this.m_impulse.y += l;
        var p = e.dt * this.m_maxForce;
        this.m_impulse.LengthSquared() > p * p && this.m_impulse.Multiply(p / this.m_impulse.Length()), f = this.m_impulse.x - c, l = this.m_impulse.y - h, t.m_linearVelocity.x += t.m_invMass * f, t.m_linearVelocity.y += t.m_invMass * l, t.m_angularVelocity += t.m_invI * (s * l - o * f)
    }, S.prototype.SolvePositionConstraints = function (e) {
        return e === undefined && (e = 0), true
    }, Box2D.inherit(x, Box2D.Dynamics.Joints.b2JointDef), x.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, x.b2MouseJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.target = new a
    }, x.prototype.b2MouseJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_mouseJoint, this.maxForce = 0, this.frequencyHz = 5, this.dampingRatio = .7
    }, Box2D.inherit(T, Box2D.Dynamics.Joints.b2Joint), T.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, T.b2PrismaticJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchor1 = new a, this.m_localAnchor2 = new a, this.m_localXAxis1 = new a, this.m_localYAxis1 = new a, this.m_axis = new a, this.m_perp = new a, this.m_K = new i, this.m_impulse = new f
    }, T.prototype.GetAnchorA = function () {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    }, T.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    }, T.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), e * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
    }, T.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), e * this.m_impulse.y
    }, T.prototype.GetJointTranslation = function () {
        var e = this.m_bodyA,
            t = this.m_bodyB,
            n, r = e.GetWorldPoint(this.m_localAnchor1),
            i = t.GetWorldPoint(this.m_localAnchor2),
            s = i.x - r.x,
            o = i.y - r.y,
            u = e.GetWorldVector(this.m_localXAxis1),
            a = u.x * s + u.y * o;
        return a
    }, T.prototype.GetJointSpeed = function () {
        var e = this.m_bodyA,
            t = this.m_bodyB,
            n;
        n = e.m_xf.R;
        var r = this.m_localAnchor1.x - e.m_sweep.localCenter.x,
            i = this.m_localAnchor1.y - e.m_sweep.localCenter.y,
            s = n.col1.x * r + n.col2.x * i;
        i = n.col1.y * r + n.col2.y * i, r = s, n = t.m_xf.R;
        var o = this.m_localAnchor2.x - t.m_sweep.localCenter.x,
            u = this.m_localAnchor2.y - t.m_sweep.localCenter.y;
        s = n.col1.x * o + n.col2.x * u, u = n.col1.y * o + n.col2.y * u, o = s;
        var a = e.m_sweep.c.x + r,
            f = e.m_sweep.c.y + i,
            l = t.m_sweep.c.x + o,
            c = t.m_sweep.c.y + u,
            h = l - a,
            p = c - f,
            d = e.GetWorldVector(this.m_localXAxis1),
            v = e.m_linearVelocity,
            m = t.m_linearVelocity,
            g = e.m_angularVelocity,
            y = t.m_angularVelocity,
            b = h * -g * d.y + p * g * d.x + (d.x * (m.x + -y * u - v.x - -g * i) + d.y * (m.y + y * o - v.y - g * r));
        return b
    }, T.prototype.IsLimitEnabled = function () {
        return this.m_enableLimit
    }, T.prototype.EnableLimit = function (e) {
        this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_enableLimit = e
    }, T.prototype.GetLowerLimit = function () {
        return this.m_lowerTranslation
    }, T.prototype.GetUpperLimit = function () {
        return this.m_upperTranslation
    }, T.prototype.SetLimits = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0), this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_lowerTranslation = e, this.m_upperTranslation = t
    }, T.prototype.IsMotorEnabled = function () {
        return this.m_enableMotor
    }, T.prototype.EnableMotor = function (e) {
        this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_enableMotor = e
    }, T.prototype.SetMotorSpeed = function (e) {
        e === undefined && (e = 0), this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_motorSpeed = e
    }, T.prototype.GetMotorSpeed = function () {
        return this.m_motorSpeed
    }, T.prototype.SetMaxMotorForce = function (e) {
        e === undefined && (e = 0), this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_maxMotorForce = e
    }, T.prototype.GetMotorForce = function () {
        return this.m_motorImpulse
    }, T.prototype.b2PrismaticJoint = function (e) {
        this.__super.b2Joint.call(this, e);
        var t, n = 0,
            r = 0;
        this.m_localAnchor1.SetV(e.localAnchorA), this.m_localAnchor2.SetV(e.localAnchorB), this.m_localXAxis1.SetV(e.localAxisA), this.m_localYAxis1.x = -this.m_localXAxis1.y, this.m_localYAxis1.y = this.m_localXAxis1.x, this.m_refAngle = e.referenceAngle, this.m_impulse.SetZero(), this.m_motorMass = 0, this.m_motorImpulse = 0, this.m_lowerTranslation = e.lowerTranslation, this.m_upperTranslation = e.upperTranslation, this.m_maxMotorForce = e.maxMotorForce, this.m_motorSpeed = e.motorSpeed, this.m_enableLimit = e.enableLimit, this.m_enableMotor = e.enableMotor, this.m_limitState = g.e_inactiveLimit, this.m_axis.SetZero(), this.m_perp.SetZero()
    }, T.prototype.InitVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            r = this.m_bodyB,
            i, o = 0;
        this.m_localCenterA.SetV(t.GetLocalCenter()), this.m_localCenterB.SetV(r.GetLocalCenter());
        var u = t.GetTransform(),
            a = r.GetTransform();
        i = t.m_xf.R;
        var f = this.m_localAnchor1.x - this.m_localCenterA.x,
            l = this.m_localAnchor1.y - this.m_localCenterA.y;
        o = i.col1.x * f + i.col2.x * l, l = i.col1.y * f + i.col2.y * l, f = o, i = r.m_xf.R;
        var c = this.m_localAnchor2.x - this.m_localCenterB.x,
            h = this.m_localAnchor2.y - this.m_localCenterB.y;
        o = i.col1.x * c + i.col2.x * h, h = i.col1.y * c + i.col2.y * h, c = o;
        var p = r.m_sweep.c.x + c - t.m_sweep.c.x - f,
            d = r.m_sweep.c.y + h - t.m_sweep.c.y - l;
        this.m_invMassA = t.m_invMass, this.m_invMassB = r.m_invMass, this.m_invIA = t.m_invI, this.m_invIB = r.m_invI, this.m_axis.SetV(s.MulMV(u.R, this.m_localXAxis1)), this.m_a1 = (p + f) * this.m_axis.y - (d + l) * this.m_axis.x, this.m_a2 = c * this.m_axis.y - h * this.m_axis.x, this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2, this.m_motorMass > Number.MIN_VALUE && (this.m_motorMass = 1 / this.m_motorMass), this.m_perp.SetV(s.MulMV(u.R, this.m_localYAxis1)), this.m_s1 = (p + f) * this.m_perp.y - (d + l) * this.m_perp.x, this.m_s2 = c * this.m_perp.y - h * this.m_perp.x;
        var v = this.m_invMassA,
            m = this.m_invMassB,
            y = this.m_invIA,
            b = this.m_invIB;
        this.m_K.col1.x = v + m + y * this.m_s1 * this.m_s1 + b * this.m_s2 * this.m_s2, this.m_K.col1.y = y * this.m_s1 + b * this.m_s2, this.m_K.col1.z = y * this.m_s1 * this.m_a1 + b * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = y + b, this.m_K.col2.z = y * this.m_a1 + b * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = v + m + y * this.m_a1 * this.m_a1 + b * this.m_a2 * this.m_a2;
        if (this.m_enableLimit) {
            var w = this.m_axis.x * p + this.m_axis.y * d;
            s.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * n.b2_linearSlop ? this.m_limitState = g.e_equalLimits : w <= this.m_lowerTranslation ? this.m_limitState != g.e_atLowerLimit && (this.m_limitState = g.e_atLowerLimit, this.m_impulse.z = 0) : w >= this.m_upperTranslation ? this.m_limitState != g.e_atUpperLimit && (this.m_limitState = g.e_atUpperLimit, this.m_impulse.z = 0) : (this.m_limitState = g.e_inactiveLimit, this.m_impulse.z = 0)
        } else this.m_limitState = g.e_inactiveLimit;
        this.m_enableMotor == 0 && (this.m_motorImpulse = 0);
        if (e.warmStarting) {
            this.m_impulse.x *= e.dtRatio, this.m_impulse.y *= e.dtRatio, this.m_motorImpulse *= e.dtRatio;
            var E = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x,
                S = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y,
                x = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1,
                T = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
            t.m_linearVelocity.x -= this.m_invMassA * E, t.m_linearVelocity.y -= this.m_invMassA * S, t.m_angularVelocity -= this.m_invIA * x, r.m_linearVelocity.x += this.m_invMassB * E, r.m_linearVelocity.y += this.m_invMassB * S, r.m_angularVelocity += this.m_invIB * T
        } else this.m_impulse.SetZero(), this.m_motorImpulse = 0
    }, T.prototype.SolveVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            n = this.m_bodyB,
            r = t.m_linearVelocity,
            i = t.m_angularVelocity,
            o = n.m_linearVelocity,
            u = n.m_angularVelocity,
            l = 0,
            c = 0,
            h = 0,
            p = 0;
        if (this.m_enableMotor && this.m_limitState != g.e_equalLimits) {
            var d = this.m_axis.x * (o.x - r.x) + this.m_axis.y * (o.y - r.y) + this.m_a2 * u - this.m_a1 * i,
                v = this.m_motorMass * (this.m_motorSpeed - d),
                m = this.m_motorImpulse,
                y = e.dt * this.m_maxMotorForce;
            this.m_motorImpulse = s.Clamp(this.m_motorImpulse + v, -y, y), v = this.m_motorImpulse - m, l = v * this.m_axis.x, c = v * this.m_axis.y, h = v * this.m_a1, p = v * this.m_a2, r.x -= this.m_invMassA * l, r.y -= this.m_invMassA * c, i -= this.m_invIA * h, o.x += this.m_invMassB * l, o.y += this.m_invMassB * c, u += this.m_invIB * p
        }
        var b = this.m_perp.x * (o.x - r.x) + this.m_perp.y * (o.y - r.y) + this.m_s2 * u - this.m_s1 * i,
            w = u - i;
        if (this.m_enableLimit && this.m_limitState != g.e_inactiveLimit) {
            var E = this.m_axis.x * (o.x - r.x) + this.m_axis.y * (o.y - r.y) + this.m_a2 * u - this.m_a1 * i,
                S = this.m_impulse.Copy(),
                x = this.m_K.Solve33(new f, -b, -w, -E);
            this.m_impulse.Add(x), this.m_limitState == g.e_atLowerLimit ? this.m_impulse.z = s.Max(this.m_impulse.z, 0) : this.m_limitState == g.e_atUpperLimit && (this.m_impulse.z = s.Min(this.m_impulse.z, 0));
            var T = -b - (this.m_impulse.z - S.z) * this.m_K.col3.x,
                N = -w - (this.m_impulse.z - S.z) * this.m_K.col3.y,
                C = this.m_K.Solve22(new a, T, N);
            C.x += S.x, C.y += S.y, this.m_impulse.x = C.x, this.m_impulse.y = C.y, x.x = this.m_impulse.x - S.x, x.y = this.m_impulse.y - S.y, x.z = this.m_impulse.z - S.z, l = x.x * this.m_perp.x + x.z * this.m_axis.x, c = x.x * this.m_perp.y + x.z * this.m_axis.y, h = x.x * this.m_s1 + x.y + x.z * this.m_a1, p = x.x * this.m_s2 + x.y + x.z * this.m_a2, r.x -= this.m_invMassA * l, r.y -= this.m_invMassA * c, i -= this.m_invIA * h, o.x += this.m_invMassB * l, o.y += this.m_invMassB * c, u += this.m_invIB * p
        } else {
            var k = this.m_K.Solve22(new a, -b, -w);
            this.m_impulse.x += k.x, this.m_impulse.y += k.y, l = k.x * this.m_perp.x, c = k.x * this.m_perp.y, h = k.x * this.m_s1 + k.y, p = k.x * this.m_s2 + k.y, r.x -= this.m_invMassA * l, r.y -= this.m_invMassA * c, i -= this.m_invIA * h, o.x += this.m_invMassB * l, o.y += this.m_invMassB * c, u += this.m_invIB * p
        }
        t.m_linearVelocity.SetV(r), t.m_angularVelocity = i, n.m_linearVelocity.SetV(o), n.m_angularVelocity = u
    }, T.prototype.SolvePositionConstraints = function (e) {
        e === undefined && (e = 0);
        var t = 0,
            i = 0,
            o = this.m_bodyA,
            u = this.m_bodyB,
            l = o.m_sweep.c,
            c = o.m_sweep.a,
            h = u.m_sweep.c,
            p = u.m_sweep.a,
            d, v = 0,
            m = 0,
            g = 0,
            y = 0,
            b = 0,
            w = 0,
            E = 0,
            S = false,
            x = 0,
            T = r.FromAngle(c),
            N = r.FromAngle(p);
        d = T;
        var C = this.m_localAnchor1.x - this.m_localCenterA.x,
            k = this.m_localAnchor1.y - this.m_localCenterA.y;
        v = d.col1.x * C + d.col2.x * k, k = d.col1.y * C + d.col2.y * k, C = v, d = N;
        var L = this.m_localAnchor2.x - this.m_localCenterB.x,
            A = this.m_localAnchor2.y - this.m_localCenterB.y;
        v = d.col1.x * L + d.col2.x * A, A = d.col1.y * L + d.col2.y * A, L = v;
        var O = h.x + L - l.x - C,
            M = h.y + A - l.y - k;
        if (this.m_enableLimit) {
            this.m_axis = s.MulMV(T, this.m_localXAxis1), this.m_a1 = (O + C) * this.m_axis.y - (M + k) * this.m_axis.x, this.m_a2 = L * this.m_axis.y - A * this.m_axis.x;
            var _ = this.m_axis.x * O + this.m_axis.y * M;
            s.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * n.b2_linearSlop ? (x = s.Clamp(_, -n.b2_maxLinearCorrection, n.b2_maxLinearCorrection), w = s.Abs(_), S = true) : _ <= this.m_lowerTranslation ? (x = s.Clamp(_ - this.m_lowerTranslation + n.b2_linearSlop, -n.b2_maxLinearCorrection, 0), w = this.m_lowerTranslation - _, S = true) : _ >= this.m_upperTranslation && (x = s.Clamp(_ - this.m_upperTranslation + n.b2_linearSlop, 0, n.b2_maxLinearCorrection), w = _ - this.m_upperTranslation, S = true)
        }
        this.m_perp = s.MulMV(T, this.m_localYAxis1), this.m_s1 = (O + C) * this.m_perp.y - (M + k) * this.m_perp.x, this.m_s2 = L * this.m_perp.y - A * this.m_perp.x;
        var D = new f,
            P = this.m_perp.x * O + this.m_perp.y * M,
            H = p - c - this.m_refAngle;
        w = s.Max(w, s.Abs(P)), E = s.Abs(H);
        if (S) m = this.m_invMassA, g = this.m_invMassB, y = this.m_invIA, b = this.m_invIB, this.m_K.col1.x = m + g + y * this.m_s1 * this.m_s1 + b * this.m_s2 * this.m_s2, this.m_K.col1.y = y * this.m_s1 + b * this.m_s2, this.m_K.col1.z = y * this.m_s1 * this.m_a1 + b * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = y + b, this.m_K.col2.z = y * this.m_a1 + b * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = m + g + y * this.m_a1 * this.m_a1 + b * this.m_a2 * this.m_a2, this.m_K.Solve33(D, -P, -H, -x);
        else {
            m = this.m_invMassA, g = this.m_invMassB, y = this.m_invIA, b = this.m_invIB;
            var B = m + g + y * this.m_s1 * this.m_s1 + b * this.m_s2 * this.m_s2,
                j = y * this.m_s1 + b * this.m_s2,
                F = y + b;
            this.m_K.col1.Set(B, j, 0), this.m_K.col2.Set(j, F, 0);
            var I = this.m_K.Solve22(new a, -P, -H);
            D.x = I.x, D.y = I.y, D.z = 0
        }
        var q = D.x * this.m_perp.x + D.z * this.m_axis.x,
            R = D.x * this.m_perp.y + D.z * this.m_axis.y,
            U = D.x * this.m_s1 + D.y + D.z * this.m_a1,
            z = D.x * this.m_s2 + D.y + D.z * this.m_a2;
        return l.x -= this.m_invMassA * q, l.y -= this.m_invMassA * R, c -= this.m_invIA * U, h.x += this.m_invMassB * q, h.y += this.m_invMassB * R, p += this.m_invIB * z, o.m_sweep.a = c, u.m_sweep.a = p, o.SynchronizeTransform(), u.SynchronizeTransform(), w <= n.b2_linearSlop && E <= n.b2_angularSlop
    }, Box2D.inherit(N, Box2D.Dynamics.Joints.b2JointDef), N.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, N.b2PrismaticJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new a, this.localAnchorB = new a, this.localAxisA = new a
    }, N.prototype.b2PrismaticJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_prismaticJoint, this.localAxisA.Set(1, 0), this.referenceAngle = 0, this.enableLimit = false, this.lowerTranslation = 0, this.upperTranslation = 0, this.enableMotor = false, this.maxMotorForce = 0, this.motorSpeed = 0
    }, N.prototype.Initialize = function (e, t, n, r) {
        this.bodyA = e, this.bodyB = t, this.localAnchorA = this.bodyA.GetLocalPoint(n), this.localAnchorB = this.bodyB.GetLocalPoint(n), this.localAxisA = this.bodyA.GetLocalVector(r), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    }, Box2D.inherit(C, Box2D.Dynamics.Joints.b2Joint), C.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, C.b2PulleyJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_groundAnchor1 = new a, this.m_groundAnchor2 = new a, this.m_localAnchor1 = new a, this.m_localAnchor2 = new a, this.m_u1 = new a, this.m_u2 = new a
    }, C.prototype.GetAnchorA = function () {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    }, C.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    }, C.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * this.m_impulse * this.m_u2.x, e * this.m_impulse * this.m_u2.y)
    }, C.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), 0
    }, C.prototype.GetGroundAnchorA = function () {
        var e = this.m_ground.m_xf.position.Copy();
        return e.Add(this.m_groundAnchor1), e
    }, C.prototype.GetGroundAnchorB = function () {
        var e = this.m_ground.m_xf.position.Copy();
        return e.Add(this.m_groundAnchor2), e
    }, C.prototype.GetLength1 = function () {
        var e = this.m_bodyA.GetWorldPoint(this.m_localAnchor1),
            t = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
            n = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
            r = e.x - t,
            i = e.y - n;
        return Math.sqrt(r * r + i * i)
    }, C.prototype.GetLength2 = function () {
        var e = this.m_bodyB.GetWorldPoint(this.m_localAnchor2),
            t = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            n = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y,
            r = e.x - t,
            i = e.y - n;
        return Math.sqrt(r * r + i * i)
    }, C.prototype.GetRatio = function () {
        return this.m_ratio
    }, C.prototype.b2PulleyJoint = function (e) {
        this.__super.b2Joint.call(this, e);
        var t, n = 0,
            r = 0;
        this.m_ground = this.m_bodyA.m_world.m_groundBody, this.m_groundAnchor1.x = e.groundAnchorA.x - this.m_ground.m_xf.position.x, this.m_groundAnchor1.y = e.groundAnchorA.y - this.m_ground.m_xf.position.y, this.m_groundAnchor2.x = e.groundAnchorB.x - this.m_ground.m_xf.position.x, this.m_groundAnchor2.y = e.groundAnchorB.y - this.m_ground.m_xf.position.y, this.m_localAnchor1.SetV(e.localAnchorA), this.m_localAnchor2.SetV(e.localAnchorB), this.m_ratio = e.ratio, this.m_constant = e.lengthA + this.m_ratio * e.lengthB, this.m_maxLength1 = s.Min(e.maxLengthA, this.m_constant - this.m_ratio * C.b2_minPulleyLength), this.m_maxLength2 = s.Min(e.maxLengthB, (this.m_constant - C.b2_minPulleyLength) / this.m_ratio), this.m_impulse = 0, this.m_limitImpulse1 = 0, this.m_limitImpulse2 = 0
    }, C.prototype.InitVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            r = this.m_bodyB,
            i;
        i = t.m_xf.R;
        var s = this.m_localAnchor1.x - t.m_sweep.localCenter.x,
            o = this.m_localAnchor1.y - t.m_sweep.localCenter.y,
            u = i.col1.x * s + i.col2.x * o;
        o = i.col1.y * s + i.col2.y * o, s = u, i = r.m_xf.R;
        var a = this.m_localAnchor2.x - r.m_sweep.localCenter.x,
            f = this.m_localAnchor2.y - r.m_sweep.localCenter.y;
        u = i.col1.x * a + i.col2.x * f, f = i.col1.y * a + i.col2.y * f, a = u;
        var l = t.m_sweep.c.x + s,
            c = t.m_sweep.c.y + o,
            h = r.m_sweep.c.x + a,
            p = r.m_sweep.c.y + f,
            d = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
            v = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
            m = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        this.m_u1.Set(l - d, c - v), this.m_u2.Set(h - m, p - y);
        var b = this.m_u1.Length(),
            w = this.m_u2.Length();
        b > n.b2_linearSlop ? this.m_u1.Multiply(1 / b) : this.m_u1.SetZero(), w > n.b2_linearSlop ? this.m_u2.Multiply(1 / w) : this.m_u2.SetZero();
        var E = this.m_constant - b - this.m_ratio * w;
        E > 0 ? (this.m_state = g.e_inactiveLimit, this.m_impulse = 0) : this.m_state = g.e_atUpperLimit, b < this.m_maxLength1 ? (this.m_limitState1 = g.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = g.e_atUpperLimit, w < this.m_maxLength2 ? (this.m_limitState2 = g.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = g.e_atUpperLimit;
        var S = s * this.m_u1.y - o * this.m_u1.x,
            x = a * this.m_u2.y - f * this.m_u2.x;
        this.m_limitMass1 = t.m_invMass + t.m_invI * S * S, this.m_limitMass2 = r.m_invMass + r.m_invI * x * x, this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2, this.m_limitMass1 = 1 / this.m_limitMass1, this.m_limitMass2 = 1 / this.m_limitMass2, this.m_pulleyMass = 1 / this.m_pulleyMass;
        if (e.warmStarting) {
            this.m_impulse *= e.dtRatio, this.m_limitImpulse1 *= e.dtRatio, this.m_limitImpulse2 *= e.dtRatio;
            var T = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x,
                N = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y,
                C = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x,
                k = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y;
            t.m_linearVelocity.x += t.m_invMass * T, t.m_linearVelocity.y += t.m_invMass * N, t.m_angularVelocity += t.m_invI * (s * N - o * T), r.m_linearVelocity.x += r.m_invMass * C, r.m_linearVelocity.y += r.m_invMass * k, r.m_angularVelocity += r.m_invI * (a * k - f * C)
        } else this.m_impulse = 0, this.m_limitImpulse1 = 0, this.m_limitImpulse2 = 0
    }, C.prototype.SolveVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            n = this.m_bodyB,
            r;
        r = t.m_xf.R;
        var i = this.m_localAnchor1.x - t.m_sweep.localCenter.x,
            o = this.m_localAnchor1.y - t.m_sweep.localCenter.y,
            u = r.col1.x * i + r.col2.x * o;
        o = r.col1.y * i + r.col2.y * o, i = u, r = n.m_xf.R;
        var a = this.m_localAnchor2.x - n.m_sweep.localCenter.x,
            f = this.m_localAnchor2.y - n.m_sweep.localCenter.y;
        u = r.col1.x * a + r.col2.x * f, f = r.col1.y * a + r.col2.y * f, a = u;
        var l = 0,
            c = 0,
            h = 0,
            p = 0,
            d = 0,
            v = 0,
            m = 0,
            y = 0,
            b = 0,
            w = 0,
            E = 0;
        this.m_state == g.e_atUpperLimit && (l = t.m_linearVelocity.x + -t.m_angularVelocity * o, c = t.m_linearVelocity.y + t.m_angularVelocity * i, h = n.m_linearVelocity.x + -n.m_angularVelocity * f, p = n.m_linearVelocity.y + n.m_angularVelocity * a, b = -(this.m_u1.x * l + this.m_u1.y * c) - this.m_ratio * (this.m_u2.x * h + this.m_u2.y * p), w = this.m_pulleyMass * -b, E = this.m_impulse, this.m_impulse = s.Max(0, this.m_impulse + w), w = this.m_impulse - E, d = -w * this.m_u1.x, v = -w * this.m_u1.y, m = -this.m_ratio * w * this.m_u2.x, y = -this.m_ratio * w * this.m_u2.y, t.m_linearVelocity.x += t.m_invMass * d, t.m_linearVelocity.y += t.m_invMass * v, t.m_angularVelocity += t.m_invI * (i * v - o * d), n.m_linearVelocity.x += n.m_invMass * m, n.m_linearVelocity.y += n.m_invMass * y, n.m_angularVelocity += n.m_invI * (a * y - f * m)), this.m_limitState1 == g.e_atUpperLimit && (l = t.m_linearVelocity.x + -t.m_angularVelocity * o, c = t.m_linearVelocity.y + t.m_angularVelocity * i, b = -(this.m_u1.x * l + this.m_u1.y * c), w = -this.m_limitMass1 * b, E = this.m_limitImpulse1, this.m_limitImpulse1 = s.Max(0, this.m_limitImpulse1 + w), w = this.m_limitImpulse1 - E, d = -w * this.m_u1.x, v = -w * this.m_u1.y, t.m_linearVelocity.x += t.m_invMass * d, t.m_linearVelocity.y += t.m_invMass * v, t.m_angularVelocity += t.m_invI * (i * v - o * d)), this.m_limitState2 == g.e_atUpperLimit && (h = n.m_linearVelocity.x + -n.m_angularVelocity * f, p = n.m_linearVelocity.y + n.m_angularVelocity * a, b = -(this.m_u2.x * h + this.m_u2.y * p), w = -this.m_limitMass2 * b, E = this.m_limitImpulse2, this.m_limitImpulse2 = s.Max(0, this.m_limitImpulse2 + w), w = this.m_limitImpulse2 - E, m = -w * this.m_u2.x, y = -w * this.m_u2.y, n.m_linearVelocity.x += n.m_invMass * m, n.m_linearVelocity.y += n.m_invMass * y, n.m_angularVelocity += n.m_invI * (a * y - f * m))
    }, C.prototype.SolvePositionConstraints = function (e) {
        e === undefined && (e = 0);
        var t = this.m_bodyA,
            r = this.m_bodyB,
            i, o = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
            u = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
            a = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            f = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y,
            l = 0,
            c = 0,
            h = 0,
            p = 0,
            d = 0,
            v = 0,
            m = 0,
            y = 0,
            b = 0,
            w = 0,
            E = 0,
            S = 0,
            x = 0,
            T = 0,
            N = 0,
            C = 0;
        return this.m_state == g.e_atUpperLimit && (i = t.m_xf.R, l = this.m_localAnchor1.x - t.m_sweep.localCenter.x, c = this.m_localAnchor1.y - t.m_sweep.localCenter.y, N = i.col1.x * l + i.col2.x * c, c = i.col1.y * l + i.col2.y * c, l = N, i = r.m_xf.R, h = this.m_localAnchor2.x - r.m_sweep.localCenter.x, p = this.m_localAnchor2.y - r.m_sweep.localCenter.y, N = i.col1.x * h + i.col2.x * p, p = i.col1.y * h + i.col2.y * p, h = N, d = t.m_sweep.c.x + l, v = t.m_sweep.c.y + c, m = r.m_sweep.c.x + h, y = r.m_sweep.c.y + p, this.m_u1.Set(d - o, v - u), this.m_u2.Set(m - a, y - f), b = this.m_u1.Length(), w = this.m_u2.Length(), b > n.b2_linearSlop ? this.m_u1.Multiply(1 / b) : this.m_u1.SetZero(), w > n.b2_linearSlop ? this.m_u2.Multiply(1 / w) : this.m_u2.SetZero(), E = this.m_constant - b - this.m_ratio * w, C = s.Max(C, -E), E = s.Clamp(E + n.b2_linearSlop, -n.b2_maxLinearCorrection, 0), S = -this.m_pulleyMass * E, d = -S * this.m_u1.x, v = -S * this.m_u1.y, m = -this.m_ratio * S * this.m_u2.x, y = -this.m_ratio * S * this.m_u2.y, t.m_sweep.c.x += t.m_invMass * d, t.m_sweep.c.y += t.m_invMass * v, t.m_sweep.a += t.m_invI * (l * v - c * d), r.m_sweep.c.x += r.m_invMass * m, r.m_sweep.c.y += r.m_invMass * y, r.m_sweep.a += r.m_invI * (h * y - p * m), t.SynchronizeTransform(), r.SynchronizeTransform()), this.m_limitState1 == g.e_atUpperLimit && (i = t.m_xf.R, l = this.m_localAnchor1.x - t.m_sweep.localCenter.x, c = this.m_localAnchor1.y - t.m_sweep.localCenter.y, N = i.col1.x * l + i.col2.x * c, c = i.col1.y * l + i.col2.y * c, l = N, d = t.m_sweep.c.x + l, v = t.m_sweep.c.y + c, this.m_u1.Set(d - o, v - u), b = this.m_u1.Length(), b > n.b2_linearSlop ? (this.m_u1.x *= 1 / b, this.m_u1.y *= 1 / b) : this.m_u1.SetZero(), E = this.m_maxLength1 - b, C = s.Max(C, -E), E = s.Clamp(E + n.b2_linearSlop, -n.b2_maxLinearCorrection, 0), S = -this.m_limitMass1 * E, d = -S * this.m_u1.x, v = -S * this.m_u1.y, t.m_sweep.c.x += t.m_invMass * d, t.m_sweep.c.y += t.m_invMass * v, t.m_sweep.a += t.m_invI * (l * v - c * d), t.SynchronizeTransform()), this.m_limitState2 == g.e_atUpperLimit && (i = r.m_xf.R, h = this.m_localAnchor2.x - r.m_sweep.localCenter.x, p = this.m_localAnchor2.y - r.m_sweep.localCenter.y, N = i.col1.x * h + i.col2.x * p, p = i.col1.y * h + i.col2.y * p, h = N, m = r.m_sweep.c.x + h, y = r.m_sweep.c.y + p, this.m_u2.Set(m - a, y - f), w = this.m_u2.Length(), w > n.b2_linearSlop ? (this.m_u2.x *= 1 / w, this.m_u2.y *= 1 / w) : this.m_u2.SetZero(), E = this.m_maxLength2 - w, C = s.Max(C, -E), E = s.Clamp(E + n.b2_linearSlop, -n.b2_maxLinearCorrection, 0), S = -this.m_limitMass2 * E, m = -S * this.m_u2.x, y = -S * this.m_u2.y, r.m_sweep.c.x += r.m_invMass * m, r.m_sweep.c.y += r.m_invMass * y, r.m_sweep.a += r.m_invI * (h * y - p * m), r.SynchronizeTransform()), C < n.b2_linearSlop
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
    }), Box2D.inherit(k, Box2D.Dynamics.Joints.b2JointDef), k.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, k.b2PulleyJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.groundAnchorA = new a, this.groundAnchorB = new a, this.localAnchorA = new a, this.localAnchorB = new a
    }, k.prototype.b2PulleyJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_pulleyJoint, this.groundAnchorA.Set(-1, 1), this.groundAnchorB.Set(1, 1), this.localAnchorA.Set(-1, 0), this.localAnchorB.Set(1, 0), this.lengthA = 0, this.maxLengthA = 0, this.lengthB = 0, this.maxLengthB = 0, this.ratio = 1, this.collideConnected = true
    }, k.prototype.Initialize = function (e, t, n, r, i, s, o) {
        o === undefined && (o = 0), this.bodyA = e, this.bodyB = t, this.groundAnchorA.SetV(n), this.groundAnchorB.SetV(r), this.localAnchorA = this.bodyA.GetLocalPoint(i), this.localAnchorB = this.bodyB.GetLocalPoint(s);
        var u = i.x - n.x,
            a = i.y - n.y;
        this.lengthA = Math.sqrt(u * u + a * a);
        var f = s.x - r.x,
            l = s.y - r.y;
        this.lengthB = Math.sqrt(f * f + l * l), this.ratio = o;
        var c = this.lengthA + this.ratio * this.lengthB;
        this.maxLengthA = c - this.ratio * C.b2_minPulleyLength, this.maxLengthB = (c - C.b2_minPulleyLength) / this.ratio
    }, Box2D.inherit(L, Box2D.Dynamics.Joints.b2Joint), L.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, L.b2RevoluteJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.K = new r, this.K1 = new r, this.K2 = new r, this.K3 = new r, this.impulse3 = new f, this.impulse2 = new a, this.reduced = new a, this.m_localAnchor1 = new a, this.m_localAnchor2 = new a, this.m_impulse = new f, this.m_mass = new i
    }, L.prototype.GetAnchorA = function () {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    }, L.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    }, L.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * this.m_impulse.x, e * this.m_impulse.y)
    }, L.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), e * this.m_impulse.z
    }, L.prototype.GetJointAngle = function () {
        return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
    }, L.prototype.GetJointSpeed = function () {
        return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
    }, L.prototype.IsLimitEnabled = function () {
        return this.m_enableLimit
    }, L.prototype.EnableLimit = function (e) {
        this.m_enableLimit = e
    }, L.prototype.GetLowerLimit = function () {
        return this.m_lowerAngle
    }, L.prototype.GetUpperLimit = function () {
        return this.m_upperAngle
    }, L.prototype.SetLimits = function (e, t) {
        e === undefined && (e = 0), t === undefined && (t = 0), this.m_lowerAngle = e, this.m_upperAngle = t
    }, L.prototype.IsMotorEnabled = function () {
        return this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_enableMotor
    }, L.prototype.EnableMotor = function (e) {
        this.m_enableMotor = e
    }, L.prototype.SetMotorSpeed = function (e) {
        e === undefined && (e = 0), this.m_bodyA.SetAwake(true), this.m_bodyB.SetAwake(true), this.m_motorSpeed = e
    }, L.prototype.GetMotorSpeed = function () {
        return this.m_motorSpeed
    }, L.prototype.SetMaxMotorTorque = function (e) {
        e === undefined && (e = 0), this.m_maxMotorTorque = e
    }, L.prototype.GetMotorTorque = function () {
        return this.m_maxMotorTorque
    }, L.prototype.b2RevoluteJoint = function (e) {
        this.__super.b2Joint.call(this, e), this.m_localAnchor1.SetV(e.localAnchorA), this.m_localAnchor2.SetV(e.localAnchorB), this.m_referenceAngle = e.referenceAngle, this.m_impulse.SetZero(), this.m_motorImpulse = 0, this.m_lowerAngle = e.lowerAngle, this.m_upperAngle = e.upperAngle, this.m_maxMotorTorque = e.maxMotorTorque, this.m_motorSpeed = e.motorSpeed, this.m_enableLimit = e.enableLimit, this.m_enableMotor = e.enableMotor, this.m_limitState = g.e_inactiveLimit
    }, L.prototype.InitVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            r = this.m_bodyB,
            i, o = 0;
        this.m_enableMotor || this.m_enableLimit, i = t.m_xf.R;
        var u = this.m_localAnchor1.x - t.m_sweep.localCenter.x,
            a = this.m_localAnchor1.y - t.m_sweep.localCenter.y;
        o = i.col1.x * u + i.col2.x * a, a = i.col1.y * u + i.col2.y * a, u = o, i = r.m_xf.R;
        var f = this.m_localAnchor2.x - r.m_sweep.localCenter.x,
            l = this.m_localAnchor2.y - r.m_sweep.localCenter.y;
        o = i.col1.x * f + i.col2.x * l, l = i.col1.y * f + i.col2.y * l, f = o;
        var c = t.m_invMass,
            h = r.m_invMass,
            p = t.m_invI,
            d = r.m_invI;
        this.m_mass.col1.x = c + h + a * a * p + l * l * d, this.m_mass.col2.x = -a * u * p - l * f * d, this.m_mass.col3.x = -a * p - l * d, this.m_mass.col1.y = this.m_mass.col2.x, this.m_mass.col2.y = c + h + u * u * p + f * f * d, this.m_mass.col3.y = u * p + f * d, this.m_mass.col1.z = this.m_mass.col3.x, this.m_mass.col2.z = this.m_mass.col3.y, this.m_mass.col3.z = p + d, this.m_motorMass = 1 / (p + d), this.m_enableMotor == 0 && (this.m_motorImpulse = 0);
        if (this.m_enableLimit) {
            var v = r.m_sweep.a - t.m_sweep.a - this.m_referenceAngle;
            s.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * n.b2_angularSlop ? this.m_limitState = g.e_equalLimits : v <= this.m_lowerAngle ? (this.m_limitState != g.e_atLowerLimit && (this.m_impulse.z = 0), this.m_limitState = g.e_atLowerLimit) : v >= this.m_upperAngle ? (this.m_limitState != g.e_atUpperLimit && (this.m_impulse.z = 0), this.m_limitState = g.e_atUpperLimit) : (this.m_limitState = g.e_inactiveLimit, this.m_impulse.z = 0)
        } else this.m_limitState = g.e_inactiveLimit;
        if (e.warmStarting) {
            this.m_impulse.x *= e.dtRatio, this.m_impulse.y *= e.dtRatio, this.m_motorImpulse *= e.dtRatio;
            var m = this.m_impulse.x,
                y = this.m_impulse.y;
            t.m_linearVelocity.x -= c * m, t.m_linearVelocity.y -= c * y, t.m_angularVelocity -= p * (u * y - a * m + this.m_motorImpulse + this.m_impulse.z), r.m_linearVelocity.x += h * m, r.m_linearVelocity.y += h * y, r.m_angularVelocity += d * (f * y - l * m + this.m_motorImpulse + this.m_impulse.z)
        } else this.m_impulse.SetZero(), this.m_motorImpulse = 0
    }, L.prototype.SolveVelocityConstraints = function (e) {
        var t = this.m_bodyA,
            n = this.m_bodyB,
            r, i = 0,
            o = 0,
            u = 0,
            a = 0,
            f = 0,
            l = 0,
            c = t.m_linearVelocity,
            h = t.m_angularVelocity,
            p = n.m_linearVelocity,
            d = n.m_angularVelocity,
            v = t.m_invMass,
            m = n.m_invMass,
            y = t.m_invI,
            b = n.m_invI;
        if (this.m_enableMotor && this.m_limitState != g.e_equalLimits) {
            var w = d - h - this.m_motorSpeed,
                E = this.m_motorMass * -w,
                S = this.m_motorImpulse,
                x = e.dt * this.m_maxMotorTorque;
            this.m_motorImpulse = s.Clamp(this.m_motorImpulse + E, -x, x), E = this.m_motorImpulse - S, h -= y * E, d += b * E
        }
        if (this.m_enableLimit && this.m_limitState != g.e_inactiveLimit) {
            r = t.m_xf.R, u = this.m_localAnchor1.x - t.m_sweep.localCenter.x, a = this.m_localAnchor1.y - t.m_sweep.localCenter.y, i = r.col1.x * u + r.col2.x * a, a = r.col1.y * u + r.col2.y * a, u = i, r = n.m_xf.R, f = this.m_localAnchor2.x - n.m_sweep.localCenter.x, l = this.m_localAnchor2.y - n.m_sweep.localCenter.y, i = r.col1.x * f + r.col2.x * l, l = r.col1.y * f + r.col2.y * l, f = i;
            var T = p.x + -d * l - c.x - -h * a,
                N = p.y + d * f - c.y - h * u,
                C = d - h;
            this.m_mass.Solve33(this.impulse3, -T, -N, -C), this.m_limitState == g.e_equalLimits ? this.m_impulse.Add(this.impulse3) : this.m_limitState == g.e_atLowerLimit ? (o = this.m_impulse.z + this.impulse3.z, o < 0 && (this.m_mass.Solve22(this.reduced, -T, -N), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0)) : this.m_limitState == g.e_atUpperLimit && (o = this.m_impulse.z + this.impulse3.z, o > 0 && (this.m_mass.Solve22(this.reduced, -T, -N), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0)), c.x -= v * this.impulse3.x, c.y -= v * this.impulse3.y, h -= y * (u * this.impulse3.y - a * this.impulse3.x + this.impulse3.z), p.x += m * this.impulse3.x, p.y += m * this.impulse3.y, d += b * (f * this.impulse3.y - l * this.impulse3.x + this.impulse3.z)
        } else {
            r = t.m_xf.R, u = this.m_localAnchor1.x - t.m_sweep.localCenter.x, a = this.m_localAnchor1.y - t.m_sweep.localCenter.y, i = r.col1.x * u + r.col2.x * a, a = r.col1.y * u + r.col2.y * a, u = i, r = n.m_xf.R, f = this.m_localAnchor2.x - n.m_sweep.localCenter.x, l = this.m_localAnchor2.y - n.m_sweep.localCenter.y, i = r.col1.x * f + r.col2.x * l, l = r.col1.y * f + r.col2.y * l, f = i;
            var k = p.x + -d * l - c.x - -h * a,
                L = p.y + d * f - c.y - h * u;
            this.m_mass.Solve22(this.impulse2, -k, -L), this.m_impulse.x += this.impulse2.x, this.m_impulse.y += this.impulse2.y, c.x -= v * this.impulse2.x, c.y -= v * this.impulse2.y, h -= y * (u * this.impulse2.y - a * this.impulse2.x), p.x += m * this.impulse2.x, p.y += m * this.impulse2.y, d += b * (f * this.impulse2.y - l * this.impulse2.x)
        }
        t.m_linearVelocity.SetV(c), t.m_angularVelocity = h, n.m_linearVelocity.SetV(p), n.m_angularVelocity = d
    }, L.prototype.SolvePositionConstraints = function (e) {
        e === undefined && (e = 0);
        var t = 0,
            r = 0,
            i, o = this.m_bodyA,
            u = this.m_bodyB,
            a = 0,
            f = 0,
            l = 0,
            c = 0,
            h = 0;
        if (this.m_enableLimit && this.m_limitState != g.e_inactiveLimit) {
            var p = u.m_sweep.a - o.m_sweep.a - this.m_referenceAngle,
                d = 0;
            this.m_limitState == g.e_equalLimits ? (r = s.Clamp(p - this.m_lowerAngle, -n.b2_maxAngularCorrection, n.b2_maxAngularCorrection), d = -this.m_motorMass * r, a = s.Abs(r)) : this.m_limitState == g.e_atLowerLimit ? (r = p - this.m_lowerAngle, a = -r, r = s.Clamp(r + n.b2_angularSlop, -n.b2_maxAngularCorrection, 0), d = -this.m_motorMass * r) : this.m_limitState == g.e_atUpperLimit && (r = p - this.m_upperAngle, a = r, r = s.Clamp(r - n.b2_angularSlop, 0, n.b2_maxAngularCorrection), d = -this.m_motorMass * r), o.m_sweep.a -= o.m_invI * d, u.m_sweep.a += u.m_invI * d, o.SynchronizeTransform(), u.SynchronizeTransform()
        }
        i = o.m_xf.R;
        var v = this.m_localAnchor1.x - o.m_sweep.localCenter.x,
            m = this.m_localAnchor1.y - o.m_sweep.localCenter.y;
        l = i.col1.x * v + i.col2.x * m, m = i.col1.y * v + i.col2.y * m, v = l, i = u.m_xf.R;
        var y = this.m_localAnchor2.x - u.m_sweep.localCenter.x,
            b = this.m_localAnchor2.y - u.m_sweep.localCenter.y;
        l = i.col1.x * y + i.col2.x * b, b = i.col1.y * y + i.col2.y * b, y = l;
        var w = u.m_sweep.c.x + y - o.m_sweep.c.x - v,
            E = u.m_sweep.c.y + b - o.m_sweep.c.y - m,
            S = w * w + E * E,
            x = Math.sqrt(S);
        f = x;
        var T = o.m_invMass,
            N = u.m_invMass,
            C = o.m_invI,
            k = u.m_invI,
            A = 10 * n.b2_linearSlop;
        if (S > A * A) {
            var O = w / x,
                M = E / x,
                _ = T + N,
                D = 1 / _;
            c = D * -w, h = D * -E;
            var P = .5;
            o.m_sweep.c.x -= P * T * c, o.m_sweep.c.y -= P * T * h, u.m_sweep.c.x += P * N * c, u.m_sweep.c.y += P * N * h, w = u.m_sweep.c.x + y - o.m_sweep.c.x - v, E = u.m_sweep.c.y + b - o.m_sweep.c.y - m
        }
        return this.K1.col1.x = T + N, this.K1.col2.x = 0, this.K1.col1.y = 0, this.K1.col2.y = T + N, this.K2.col1.x = C * m * m, this.K2.col2.x = -C * v * m, this.K2.col1.y = -C * v * m, this.K2.col2.y = C * v * v, this.K3.col1.x = k * b * b, this.K3.col2.x = -k * y * b, this.K3.col1.y = -k * y * b, this.K3.col2.y = k * y * y, this.K.SetM(this.K1), this.K.AddM(this.K2), this.K.AddM(this.K3), this.K.Solve(L.tImpulse, -w, -E), c = L.tImpulse.x, h = L.tImpulse.y, o.m_sweep.c.x -= o.m_invMass * c, o.m_sweep.c.y -= o.m_invMass * h, o.m_sweep.a -= o.m_invI * (v * h - m * c), u.m_sweep.c.x += u.m_invMass * c, u.m_sweep.c.y += u.m_invMass * h, u.m_sweep.a += u.m_invI * (y * h - b * c), o.SynchronizeTransform(), u.SynchronizeTransform(), f <= n.b2_linearSlop && a <= n.b2_angularSlop
    }, Box2D.postDefs.push(function () {
        Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new a
    }), Box2D.inherit(A, Box2D.Dynamics.Joints.b2JointDef), A.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, A.b2RevoluteJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new a, this.localAnchorB = new a
    }, A.prototype.b2RevoluteJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_revoluteJoint, this.localAnchorA.Set(0, 0), this.localAnchorB.Set(0, 0), this.referenceAngle = 0, this.lowerAngle = 0, this.upperAngle = 0, this.maxMotorTorque = 0, this.motorSpeed = 0, this.enableLimit = false, this.enableMotor = false
    }, A.prototype.Initialize = function (e, t, n) {
        this.bodyA = e, this.bodyB = t, this.localAnchorA = this.bodyA.GetLocalPoint(n), this.localAnchorB = this.bodyB.GetLocalPoint(n), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    }, Box2D.inherit(O, Box2D.Dynamics.Joints.b2Joint), O.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype, O.b2WeldJoint = function () {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments), this.m_localAnchorA = new a, this.m_localAnchorB = new a, this.m_impulse = new f, this.m_mass = new i
    }, O.prototype.GetAnchorA = function () {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    }, O.prototype.GetAnchorB = function () {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    }, O.prototype.GetReactionForce = function (e) {
        return e === undefined && (e = 0), new a(e * this.m_impulse.x, e * this.m_impulse.y)
    }, O.prototype.GetReactionTorque = function (e) {
        return e === undefined && (e = 0), e * this.m_impulse.z
    }, O.prototype.b2WeldJoint = function (e) {
        this.__super.b2Joint.call(this, e), this.m_localAnchorA.SetV(e.localAnchorA), this.m_localAnchorB.SetV(e.localAnchorB), this.m_referenceAngle = e.referenceAngle, this.m_impulse.SetZero(), this.m_mass = new i
    }, O.prototype.InitVelocityConstraints = function (e) {
        var t, n = 0,
            r = this.m_bodyA,
            i = this.m_bodyB;
        t = r.m_xf.R;
        var s = this.m_localAnchorA.x - r.m_sweep.localCenter.x,
            o = this.m_localAnchorA.y - r.m_sweep.localCenter.y;
        n = t.col1.x * s + t.col2.x * o, o = t.col1.y * s + t.col2.y * o, s = n, t = i.m_xf.R;
        var u = this.m_localAnchorB.x - i.m_sweep.localCenter.x,
            a = this.m_localAnchorB.y - i.m_sweep.localCenter.y;
        n = t.col1.x * u + t.col2.x * a, a = t.col1.y * u + t.col2.y * a, u = n;
        var f = r.m_invMass,
            l = i.m_invMass,
            c = r.m_invI,
            h = i.m_invI;
        this.m_mass.col1.x = f + l + o * o * c + a * a * h, this.m_mass.col2.x = -o * s * c - a * u * h, this.m_mass.col3.x = -o * c - a * h, this.m_mass.col1.y = this.m_mass.col2.x, this.m_mass.col2.y = f + l + s * s * c + u * u * h, this.m_mass.col3.y = s * c + u * h, this.m_mass.col1.z = this.m_mass.col3.x, this.m_mass.col2.z = this.m_mass.col3.y, this.m_mass.col3.z = c + h, e.warmStarting ? (this.m_impulse.x *= e.dtRatio, this.m_impulse.y *= e.dtRatio, this.m_impulse.z *= e.dtRatio, r.m_linearVelocity.x -= f * this.m_impulse.x, r.m_linearVelocity.y -= f * this.m_impulse.y, r.m_angularVelocity -= c * (s * this.m_impulse.y - o * this.m_impulse.x + this.m_impulse.z), i.m_linearVelocity.x += l * this.m_impulse.x, i.m_linearVelocity.y += l * this.m_impulse.y, i.m_angularVelocity += h * (u * this.m_impulse.y - a * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
    }, O.prototype.SolveVelocityConstraints = function (e) {
        var t, n = 0,
            r = this.m_bodyA,
            i = this.m_bodyB,
            s = r.m_linearVelocity,
            o = r.m_angularVelocity,
            u = i.m_linearVelocity,
            a = i.m_angularVelocity,
            l = r.m_invMass,
            c = i.m_invMass,
            h = r.m_invI,
            p = i.m_invI;
        t = r.m_xf.R;
        var d = this.m_localAnchorA.x - r.m_sweep.localCenter.x,
            v = this.m_localAnchorA.y - r.m_sweep.localCenter.y;
        n = t.col1.x * d + t.col2.x * v, v = t.col1.y * d + t.col2.y * v, d = n, t = i.m_xf.R;
        var m = this.m_localAnchorB.x - i.m_sweep.localCenter.x,
            g = this.m_localAnchorB.y - i.m_sweep.localCenter.y;
        n = t.col1.x * m + t.col2.x * g, g = t.col1.y * m + t.col2.y * g, m = n;
        var y = u.x - a * g - s.x + o * v,
            b = u.y + a * m - s.y - o * d,
            w = a - o,
            E = new f;
        this.m_mass.Solve33(E, -y, -b, -w), this.m_impulse.Add(E), s.x -= l * E.x, s.y -= l * E.y, o -= h * (d * E.y - v * E.x + E.z), u.x += c * E.x, u.y += c * E.y, a += p * (m * E.y - g * E.x + E.z), r.m_angularVelocity = o, i.m_angularVelocity = a
    }, O.prototype.SolvePositionConstraints = function (e) {
        e === undefined && (e = 0);
        var t, r = 0,
            i = this.m_bodyA,
            o = this.m_bodyB;
        t = i.m_xf.R;
        var u = this.m_localAnchorA.x - i.m_sweep.localCenter.x,
            a = this.m_localAnchorA.y - i.m_sweep.localCenter.y;
        r = t.col1.x * u + t.col2.x * a, a = t.col1.y * u + t.col2.y * a, u = r, t = o.m_xf.R;
        var l = this.m_localAnchorB.x - o.m_sweep.localCenter.x,
            c = this.m_localAnchorB.y - o.m_sweep.localCenter.y;
        r = t.col1.x * l + t.col2.x * c, c = t.col1.y * l + t.col2.y * c, l = r;
        var h = i.m_invMass,
            p = o.m_invMass,
            d = i.m_invI,
            v = o.m_invI,
            m = o.m_sweep.c.x + l - i.m_sweep.c.x - u,
            g = o.m_sweep.c.y + c - i.m_sweep.c.y - a,
            y = o.m_sweep.a - i.m_sweep.a - this.m_referenceAngle,
            b = 10 * n.b2_linearSlop,
            w = Math.sqrt(m * m + g * g),
            E = s.Abs(y);
        w > b && (d *= 1, v *= 1), this.m_mass.col1.x = h + p + a * a * d + c * c * v, this.m_mass.col2.x = -a * u * d - c * l * v, this.m_mass.col3.x = -a * d - c * v, this.m_mass.col1.y = this.m_mass.col2.x, this.m_mass.col2.y = h + p + u * u * d + l * l * v, this.m_mass.col3.y = u * d + l * v, this.m_mass.col1.z = this.m_mass.col3.x, this.m_mass.col2.z = this.m_mass.col3.y, this.m_mass.col3.z = d + v;
        var S = new f;
        return this.m_mass.Solve33(S, -m, -g, -y), i.m_sweep.c.x -= h * S.x, i.m_sweep.c.y -= h * S.y, i.m_sweep.a -= d * (u * S.y - a * S.x + S.z), o.m_sweep.c.x += p * S.x, o.m_sweep.c.y += p * S.y, o.m_sweep.a += v * (l * S.y - c * S.x + S.z), i.SynchronizeTransform(), o.SynchronizeTransform(), w <= n.b2_linearSlop && E <= n.b2_angularSlop
    }, Box2D.inherit(M, Box2D.Dynamics.Joints.b2JointDef), M.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype, M.b2WeldJointDef = function () {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments), this.localAnchorA = new a, this.localAnchorB = new a
    }, M.prototype.b2WeldJointDef = function () {
        this.__super.b2JointDef.call(this), this.type = g.e_weldJoint, this.referenceAngle = 0
    }, M.prototype.Initialize = function (e, t, n) {
        this.bodyA = e, this.bodyB = t, this.localAnchorA.SetV(this.bodyA.GetLocalPoint(n)), this.localAnchorB.SetV(this.bodyB.GetLocalPoint(n)), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    }
}(), function () {
    var e = Box2D.Dynamics.b2DebugDraw;
    e.b2DebugDraw = function () {
        this.m_drawScale = 1, this.m_lineThickness = 1, this.m_alpha = 1, this.m_fillAlpha = 1, this.m_xformScale = 1;
        var e = this;
        this.m_sprite = {
            graphics: {
                clear: function () {
                    e.m_ctx.clearRect(0, 0, e.m_ctx.canvas.width, e.m_ctx.canvas.height)
                }
            }
        }
    }, e.prototype._color = function (e, t) {
        return "rgba(" + ((e & 16711680) >> 16) + "," + ((e & 65280) >> 8) + "," + (e & 255) + "," + t + ")"
    }, e.prototype.b2DebugDraw = function () {
        this.m_drawFlags = 0
    }, e.prototype.SetFlags = function (e) {
        e === undefined && (e = 0), this.m_drawFlags = e
    }, e.prototype.GetFlags = function () {
        return this.m_drawFlags
    }, e.prototype.AppendFlags = function (e) {
        e === undefined && (e = 0), this.m_drawFlags |= e
    }, e.prototype.ClearFlags = function (e) {
        e === undefined && (e = 0), this.m_drawFlags &= ~e
    }, e.prototype.SetSprite = function (e) {
        this.m_ctx = e
    }, e.prototype.GetSprite = function () {
        return this.m_ctx
    }, e.prototype.SetDrawScale = function (e) {
        e === undefined && (e = 0), this.m_drawScale = e
    }, e.prototype.GetDrawScale = function () {
        return this.m_drawScale
    }, e.prototype.SetLineThickness = function (e) {
        e === undefined && (e = 0), this.m_lineThickness = e, this.m_ctx.strokeWidth = e
    }, e.prototype.GetLineThickness = function () {
        return this.m_lineThickness
    }, e.prototype.SetAlpha = function (e) {
        e === undefined && (e = 0), this.m_alpha = e
    }, e.prototype.GetAlpha = function () {
        return this.m_alpha
    }, e.prototype.SetFillAlpha = function (e) {
        e === undefined && (e = 0), this.m_fillAlpha = e
    }, e.prototype.GetFillAlpha = function () {
        return this.m_fillAlpha
    }, e.prototype.SetXFormScale = function (e) {
        e === undefined && (e = 0), this.m_xformScale = e
    }, e.prototype.GetXFormScale = function () {
        return this.m_xformScale
    }, e.prototype.DrawPolygon = function (e, t, n) {
        if (!t) return;
        var r = this.m_ctx,
            i = this.m_drawScale;
        r.beginPath(), r.strokeStyle = this._color(n.color, this.m_alpha), r.moveTo(e[0].x * i, e[0].y * i);
        for (var s = 1; s < t; s++) r.lineTo(e[s].x * i, e[s].y * i);
        r.lineTo(e[0].x * i, e[0].y * i), r.closePath(), r.stroke()
    }, e.prototype.DrawSolidPolygon = function (e, t, n) {
        if (!t) return;
        var r = this.m_ctx,
            i = this.m_drawScale;
        r.beginPath(), r.strokeStyle = this._color(n.color, this.m_alpha), r.fillStyle = this._color(n.color, this.m_fillAlpha), r.moveTo(e[0].x * i, e[0].y * i);
        for (var s = 1; s < t; s++) r.lineTo(e[s].x * i, e[s].y * i);
        r.lineTo(e[0].x * i, e[0].y * i), r.closePath(), r.fill(), r.stroke()
    }, e.prototype.DrawCircle = function (e, t, n) {
        if (!t) return;
        var r = this.m_ctx,
            i = this.m_drawScale;
        r.beginPath(), r.strokeStyle = this._color(n.color, this.m_alpha), r.arc(e.x * i, e.y * i, t * i, 0, Math.PI * 2, true), r.closePath(), r.stroke()
    }, e.prototype.DrawSolidCircle = function (e, t, n, r) {
        if (!t) return;
        var i = this.m_ctx,
            s = this.m_drawScale,
            o = e.x * s,
            u = e.y * s;
        i.moveTo(0, 0), i.beginPath(), i.strokeStyle = this._color(r.color, this.m_alpha), i.fillStyle = this._color(r.color, this.m_fillAlpha), i.arc(o, u, t * s, 0, Math.PI * 2, true), i.moveTo(o, u), i.lineTo((e.x + n.x * t) * s, (e.y + n.y * t) * s), i.closePath(), i.fill(), i.stroke()
    }, e.prototype.DrawSegment = function (e, t, n) {
        var r = this.m_ctx,
            i = this.m_drawScale;
        r.strokeStyle = this._color(n.color, this.m_alpha), r.beginPath(), r.moveTo(e.x * i, e.y * i), r.lineTo(t.x * i, t.y * i), r.closePath(), r.stroke()
    }, e.prototype.DrawTransform = function (e) {
        var t = this.m_ctx,
            n = this.m_drawScale;
        t.beginPath(), t.strokeStyle = this._color(16711680, this.m_alpha), t.moveTo(e.position.x * n, e.position.y * n), t.lineTo((e.position.x + this.m_xformScale * e.R.col1.x) * n, (e.position.y + this.m_xformScale * e.R.col1.y) * n), t.strokeStyle = this._color(65280, this.m_alpha), t.moveTo(e.position.x * n, e.position.y * n), t.lineTo((e.position.x + this.m_xformScale * e.R.col2.x) * n, (e.position.y + this.m_xformScale * e.R.col2.y) * n), t.closePath(), t.stroke()
    }
}();
var i;
for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs, exports.Box2D = Box2D, exports.b2AABB = Box2D.Collision.b2AABB, exports.b2Body = Box2D.Dynamics.b2Body, exports.b2BodyDef = Box2D.Dynamics.b2BodyDef, exports.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, exports.b2DebugDraw = Box2D.Dynamics.b2DebugDraw, exports.b2Fixture = Box2D.Dynamics.b2Fixture, exports.b2FixtureDef = Box2D.Dynamics.b2FixtureDef, exports.b2MassData = Box2D.Collision.Shapes.b2MassData, exports.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, exports.b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef, exports.b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef, exports.b2Transform = Box2D.Common.Math.b2Transform, exports.b2Vec2 = Box2D.Common.Math.b2Vec2, exports.b2World = Box2D.Dynamics.b2World, tagpro.ready(function () {
    tagpro.world = new function () {
        function r(e) {
            if (!tagpro.map) {
                setTimeout(function () {
                    r(e)
                }, 0);
                return
            }
            e()
        }
        function u(n) {
            if (n.rx == undefined || n.ry == undefined || n.lx == undefined || n.ly == undefined || n.a == undefined) return;
            n.sync = null;
            var r = new Box2D.Dynamics.b2FixtureDef,
                i = new Box2D.Dynamics.b2BodyDef,
                s = .19;
            r.density = 1, r.friction = .5, r.restitution = .2, r.shape = new Box2D.Collision.Shapes.b2CircleShape(s), i.type = Box2D.Dynamics.b2Body.b2_dynamicBody, i.linearDamping = .5, i.angularDamping = .5, tagpro.events.setPlayerPhysics && tagpro.events.setPlayerPhysics.forEach(function (e) {
                e.setPlayerPhysics(Box2D, i, r)
            });
            var o = e.CreateBody(i),
                u = o.CreateFixture(r);
            return o.SetPosition(new Box2D.Common.Math.b2Vec2(n.rx, n.ry)), n.x = n.rx * 100, n.y = n.ry * 100, n.angle = n.ra, o.player = n, o.fixture = u, t[n.id] = o, o
        }
        function a(t) {
            if (t.rx == undefined || t.ry == undefined || t.lx == undefined || t.ly == undefined || t.a == undefined) return;
            var r = new Box2D.Dynamics.b2FixtureDef,
                i = new Box2D.Dynamics.b2BodyDef,
                s = .39;
            r.density = 2, r.friction = .5, r.restitution = .6, r.shape = new Box2D.Collision.Shapes.b2CircleShape(s), i.type = Box2D.Dynamics.b2Body.b2_dynamicBody, i.linearDamping = .5, i.angularDamping = .5;
            var o = e.CreateBody(i),
                u = o.CreateFixture(r);
            return o.SetPosition(new Box2D.Common.Math.b2Vec2(t.rx, t.ry)), t.x = t.rx * 100, t.y = t.ry * 100, o.object = t, n[t.id] = o, o
        }
        var e = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 0), true),
            t = {},
            n = {},
            i = 1e3 / 60,
            s = (new Date).getTime() + i,
            o = true;
        setTimeout(function () {
            o = false
        }, 5e3), this.update = function (r) {
            if (tagpro.state == 2) return;
            var o = (new Date).getTime();
            if (!r && s - o > i) return tagpro.fps > 60 && setTimeout(tagpro.world.update, 0), false;
            r && o - r >= 10 && (s = o);
            for (var u in t) {
                var a = t[u],
                    f = a.player;
                a.SetAwake(true);
                if (!f.draw || f.dead) {
                    a.SetPosition(new Box2D.Common.Math.b2Vec2(-100, -100));
                    continue
                }
                var l = a.GetPosition(),
                    c = a.GetAngle(),
                    h = f.sync;
                h && (h.frame--, h.step.x > 0 && l.x < h.to.x || h.step.x < 0 && l.x > h.to.x ? l.x += h.step.x : h.step.x = 0, h.step.y > 0 && l.y < h.to.y || h.step.y < 0 && l.y > h.to.y ? l.y += h.step.y : h.step.y = 0, h.step.a > 0 && c < h.to.a || h.step.a < 0 && c > h.to.a ? c += h.step.a : h.step.a = 0, h.frame <= 0 && (f.sync = null));
                var p = a.GetLinearVelocity();
                tagpro.state == 1 && (f.left && p.x > -f.ms && (p.x -= f.ac), f.right && p.x < f.ms && (p.x += f.ac), f.up && p.y > -f.ms && (p.y -= f.ac), f.down && p.y < f.ms && (p.y += f.ac)), a.SetPosition(l), a.SetAngle(c), a.SetLinearVelocity(p), f.x = l.x * 100, f.y = l.y * 100, f.angle = c
            }
            for (var u in n) {
                var a = n[u],
                    d = a.object;
                a.SetAwake(true);
                if (!d.draw) {
                    a.SetPosition(new Box2D.Common.Math.b2Vec2(-100, -100));
                    continue
                }
                var l = a.GetPosition(),
                    h = d.sync;
                h && (h.frame--, h.step.x > 0 && l.x < h.to.x || h.step.x < 0 && l.x > h.to.x ? l.x += h.step.x : h.step.x = 0, h.step.y > 0 && l.y < h.to.y || h.step.y < 0 && l.y > h.to.y ? l.y += h.step.y : h.step.y = 0, h.frame <= 0 && (d.sync = null)), a.SetPosition(l), d.x = l.x * 100, d.y = l.y * 100
            }
            e.Step(1 / 60, 8, 3), s += i;
            var o = (new Date).getTime();
            return o >= s ? tagpro.world.update(r || o) : true
        }, r(function () {
            var t = tagpro.map,
                n = new Box2D.Dynamics.b2FixtureDef,
                r = new Box2D.Dynamics.b2BodyDef;
            n.density = 1, n.friction = .5, n.restitution = .2, r.type = Box2D.Dynamics.b2Body.b2_staticBody;
            for (var i = 0, s = t.length; i != s; i++) for (var o = 0, u = t[0].length; o != u; o++) {
                if (parseInt(t[i][o]) != 1) continue;
                n.shape = new Box2D.Collision.Shapes.b2PolygonShape, t[i][o] == 1.1 ? n.shape.SetAsArray([new Box2D.Common.Math.b2Vec2(-0.2, .2), new Box2D.Common.Math.b2Vec2(-0.2, -0.2), new Box2D.Common.Math.b2Vec2(.2, .2)]) : t[i][o] == 1.2 ? n.shape.SetAsArray([new Box2D.Common.Math.b2Vec2(-0.2, -0.2), new Box2D.Common.Math.b2Vec2(.2, -0.2), new Box2D.Common.Math.b2Vec2(-0.2, .2)]) : t[i][o] == 1.3 ? n.shape.SetAsArray([new Box2D.Common.Math.b2Vec2(.2, -0.2), new Box2D.Common.Math.b2Vec2(.2, .2), new Box2D.Common.Math.b2Vec2(-0.2, -0.2)]) : t[i][o] == 1.4 ? n.shape.SetAsArray([new Box2D.Common.Math.b2Vec2(.2, .2), new Box2D.Common.Math.b2Vec2(-0.2, .2), new Box2D.Common.Math.b2Vec2(.2, -0.2)]) : n.shape.SetAsBox(.2, .2), r.position.Set(i * .4, o * .4);
                var a = e.CreateBody(r);
                a.CreateFixture(n)
            }
        }), this.syncObject = function (e, t) {
            var r = n[e.id] || a(e);
            if (!r) return;
            if (!e.draw) return;
            r.SetAwake(true);
            if (!t) {
                var i = r.GetPosition();
                e.sync = {
                    to: {
                        x: e.rx,
                        y: e.ry
                    },
                    frame: Math.ceil((tagpro.fps || 60) / 10)
                }, e.sync.step = {
                    x: (e.sync.to.x - i.x) / e.sync.frame,
                    y: (e.sync.to.y - i.y) / e.sync.frame
                }, e.sync.frame == 0 && (e.sync = null)
            } else e.sync = null, r.SetPosition(new Box2D.Common.Math.b2Vec2(e.rx, e.ry));
            r.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(e.lx, e.ly)), r.SetAngularVelocity(e.a)
        }, this.syncPlayer = function (e, n) {
            var r = t[e.id] || u(e);
            if (!r) return;
            r.SetAwake(true);
            if (!n) {
                if (e.dead || !e.draw) return;
                var i = r.GetPosition(),
                    s = r.GetAngle();
                e.sync = {
                    to: {
                        x: e.rx,
                        y: e.ry,
                        a: e.ra
                    },
                    frame: Math.ceil((tagpro.fps || 60) / 10)
                }, e.sync.step = {
                    x: (e.sync.to.x - i.x) / e.sync.frame,
                    y: (e.sync.to.y - i.y) / e.sync.frame,
                    a: (e.sync.to.a - s) / e.sync.frame
                }, e.sync.frame == 0 && (e.sync = null)
            } else e.sync = null, r.SetPosition(new Box2D.Common.Math.b2Vec2(e.rx, e.ry)), r.SetAngle(e.ra);
            r.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(e.lx, e.ly)), r.SetAngularVelocity(e.a), r.fixture.GetDensity() != e.den && (r.fixture.SetDensity(e.den), r.ResetMassData())
        }, this.destoryPlayer = function (n) {
            var r = t[n];
            e.DestroyBody(r), delete t[n]
        }
    }
})