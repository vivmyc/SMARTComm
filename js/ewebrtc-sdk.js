/*! ewebrtc-sdk_03-04-2015 */
function trace(a) {
    "\n" === a[a.length - 1] && (a = a.substring(0, a.length - 1)), console.log((performance.now() / 1e3).toFixed(3) + ": " + a)
}
if (function() {
    "use strict";
    var a = {
        "private": {
            factories: {},
            config: {}
        },
        utils: {},
        logManager: {},
        RESTClient: {},
        rtc: {},
        browser: {}
    };
    window.ATT = a
}(), !ATT) var ATT = {};
if (function(a) {
    "use strict";

    function b(a) {
        var b = {}, c = [],
            d = b;
        return a.split("\r\n").filter(k).forEach(function(a) {
            var b = a[0],
                e = a.slice(2);
            "m" === b && (c.push({
                rtp: [],
                fmtp: []
            }), d = c[c.length - 1]);
            for (var f = 0; f < (g[b] || []).length; f += 1) {
                var h = g[b][f];
                if (h.reg.test(e)) return j(h, d, e)
            }
        }), b.media = c, b
    }

    function c(a, b) {
        b = b || {}, null == a.version && (a.version = 0), null == a.name && (a.name = " "), a.media.forEach(function(a) {
            null == a.payloads && (a.payloads = "")
        });
        var c = b.outerOrder || o,
            d = b.innerOrder || p,
            e = [];
        return c.forEach(function(b) {
            g[b].forEach(function(c) {
                c.name in a ? e.push(n(b, c, a)) : c.push in a && a[c.push].forEach(function(a) {
                    e.push(n(b, c, a))
                })
            })
        }), a.media.forEach(function(a) {
            e.push(n("m", g.m[0], a)), d.forEach(function(b) {
                g[b].forEach(function(c) {
                    c.name in a ? e.push(n(b, c, a)) : c.push in a && a[c.push].forEach(function(a) {
                        e.push(n(b, c, a))
                    })
                })
            })
        }), e.join("\r\n") + "\r\n"
    }
    var d, e, f = {}, g = {
            v: [{
                name: "version",
                reg: /^(\d*)$/
            }],
            o: [{
                name: "origin",
                reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
                names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
                format: "%s %s %d %s IP%d %s"
            }],
            s: [{
                name: "name"
            }],
            i: [{
                name: "description"
            }],
            u: [{
                name: "uri"
            }],
            e: [{
                name: "email"
            }],
            p: [{
                name: "phone"
            }],
            z: [{
                name: "timezones"
            }],
            r: [{
                name: "repeats"
            }],
            t: [{
                name: "timing",
                reg: /^(\d*) (\d*)/,
                names: ["start", "stop"],
                format: "%d %d"
            }],
            c: [{
                name: "connection",
                reg: /^IN IP(\d) (\S*)/,
                names: ["version", "ip"],
                format: "IN IP%d %s"
            }],
            b: [{
                push: "bandwidth",
                reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
                names: ["type", "limit"],
                format: "%s:%s"
            }],
            m: [{
                reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
                names: ["type", "port", "protocol", "payloads"],
                format: "%s %d %s %s"
            }],
            a: [{
                push: "rtp",
                reg: /^rtpmap:(\d*) ([\w\-]*)\/(\d*)(?:\s*\/(\S*))?/,
                names: ["payload", "codec", "rate", "encoding"],
                format: function(a) {
                    return a.encoding ? "rtpmap:%d %s/%s/%s" : "rtpmap:%d %s/%s"
                }
            }, {
                push: "fmtp",
                reg: /^fmtp:(\d*) (\S*)/,
                names: ["payload", "config"],
                format: "fmtp:%d %s"
            }, {
                name: "control",
                reg: /^control:(.*)/,
                format: "control:%s"
            }, {
                name: "rtcp",
                reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
                names: ["port", "netType", "ipVer", "address"],
                format: function(a) {
                    return null != a.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d"
                }
            }, {
                push: "rtcpFbTrrInt",
                reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
                names: ["payload", "value"],
                format: "rtcp-fb:%d trr-int %d"
            }, {
                push: "rtcpFb",
                reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
                names: ["payload", "type", "subtype"],
                format: function(a) {
                    return null != a.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s"
                }
            }, {
                push: "ext",
                reg: /^extmap:([\w_\/]*) (\S*)(?: (\S*))?/,
                names: ["value", "uri", "config"],
                format: function(a) {
                    return null != a.config ? "extmap:%s %s %s" : "extmap:%s %s"
                }
            }, {
                push: "crypto",
                reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
                names: ["id", "suite", "config", "sessionConfig"],
                format: function(a) {
                    return null != a.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s"
                }
            }, {
                name: "setup",
                reg: /^setup:(\w*)/,
                format: "setup:%s"
            }, {
                name: "mid",
                reg: /^mid:(\w*)/,
                format: "mid:%s"
            }, {
                name: "ptime",
                reg: /^ptime:(\d*)/,
                format: "ptime:%d"
            }, {
                name: "maxptime",
                reg: /^maxptime:(\d*)/,
                format: "maxptime:%d"
            }, {
                name: "direction",
                reg: /^(sendrecv|recvonly|sendonly|inactive)/,
                format: "%s"
            }, {
                name: "iceUfrag",
                reg: /^ice-ufrag:(\S*)/,
                format: "ice-ufrag:%s"
            }, {
                name: "icePwd",
                reg: /^ice-pwd:(\S*)/,
                format: "ice-pwd:%s"
            }, {
                name: "fingerprint",
                reg: /^fingerprint:(\S*) (\S*)/,
                names: ["type", "hash"],
                format: "fingerprint:%s %s"
            }, {
                push: "candidates",
                reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: generation (\d*))?/,
                names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "generation"],
                format: function(a) {
                    var b = "candidate:%s %d %s %d %s %d typ %s";
                    return b += null != a.raddr ? " raddr %s rport %d" : "%v%v", null != a.generation && (b += " generation %d"), b
                }
            }, {
                name: "remoteCandidates",
                reg: /^remote-candidates:(.*)/,
                format: "remote-candidates:%s"
            }, {
                name: "iceOptions",
                reg: /^ice-options:(\S*)/,
                format: "ice-options:%s"
            }, {
                push: "ssrcs",
                reg: /^ssrc:(\d*) ([\w_]*):(.*)/,
                names: ["id", "attribute", "value"],
                format: "ssrc:%d %s:%s"
            }, {
                name: "msidSemantic",
                reg: /^msid-semantic: (\w*) (\S*)/,
                names: ["semantic", "token"],
                format: "msid-semantic: %s %s"
            }, {
                push: "groups",
                reg: /^group:(\w*) (.*)/,
                names: ["type", "mids"],
                format: "group:%s %s"
            }, {
                name: "rtcpMux",
                reg: /^(rtcp-mux)/
            }, {
                push: "invalid",
                names: ["value"]
            }]
        };
    Object.keys(g).forEach(function(a) {
        var b = g[a];
        b.forEach(function(a) {
            a.reg || (a.reg = /(.*)/), a.format || (a.format = "%s")
        })
    });
    var h = function(a) {
        return String(Number(a)) === a ? Number(a) : a
    }, i = function(a, b, c, d) {
            if (d && !c) b[d] = h(a[1]);
            else
                for (var e = 0; e < c.length; e += 1) null != a[e + 1] && (b[c[e]] = h(a[e + 1]))
        }, j = function(a, b, c) {
            var d = a.name && a.names;
            a.push && !b[a.push] ? b[a.push] = [] : d && !b[a.name] && (b[a.name] = {});
            var e = a.push ? {} : d ? b[a.name] : b;
            i(c.match(a.reg), e, a.names, a.name), a.push && b[a.push].push(e)
        }, k = RegExp.prototype.test.bind(/^([a-z])=(.*)/),
        l = /%[sdv%]/g,
        m = function(a) {
            var b = 1,
                c = arguments,
                d = c.length;
            return a.replace(l, function(a) {
                if (b >= d) return a;
                var e = c[b];
                switch (b += 1, a) {
                    case "%%":
                        return "%";
                    case "%s":
                        return String(e);
                    case "%d":
                        return Number(e);
                    case "%v":
                        return ""
                }
            })
        }, n = function(a, b, c) {
            var d = b.format instanceof Function ? b.format(b.push ? c : c[b.name]) : b.format,
                e = [a + "=" + d];
            if (b.names)
                for (var f = 0; f < b.names.length; f += 1) {
                    var g = b.names[f];
                    e.push(b.name ? c[b.name][g] : c[b.names[f]])
                } else e.push(c[b.name]);
            return m.apply(null, e)
        }, o = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
        p = ["i", "c", "b", "a"];
    e = function() {
        return {
            parse: function(a) {
                return b(a)
            },
            write: function(a) {
                return c(a)
            }
        }
    }, a.sdpParser = f, f.getInstance = function() {
        return d || (d = e()), d
    }
}(ATT || {}), function() {
    "use strict";

    function a(a, b, c) {
        return void 0 === c ? "object" == typeof b ? void console.log(a, b, "[" + l() + "]") : void console.log(a + " " + b + " [" + l() + "]") : "object" == typeof c ? (console.log(a + " " + b + ": [" + l() + "]"), void console.log(c)) : void console.log(a + " " + b + ": " + c + " [" + l() + "]")
    }

    function b(b) {
        var c = b.level,
            d = b.type;
        return {
            type: function() {
                return d
            },
            level: function() {
                return c
            },
            logError: function(b) {
                c >= m.LOG_LEVEL.ERROR && a("[ERROR]", b)
            },
            logWarning: function(b) {
                c >= m.LOG_LEVEL.WARNING && a("[WARN]", b)
            },
            logInfo: function(b) {
                c >= m.LOG_LEVEL.INFO && a("[INFO]", b)
            },
            logDebug: function(b) {
                c >= m.LOG_LEVEL.DEBUG && a("[DEBUG]", b)
            },
            logTrace: function(b, d) {
                c >= m.LOG_LEVEL.TRACE && a("[TRACE]", b, d)
            },
            setLevel: function(a) {
                c = a
            },
            setType: function(a) {
                d = a
            }
        }
    }

    function c(a, c, d) {
        var e = n[a];
        if (!e) return c === m.LOGGER_TYPE.CONSOLE && (e = b({
            level: d,
            type: c
        })), n[a] = e, !0
    }

    function d(a, c, d) {
        var e = c || m.LOGGER_TYPE.CONSOLE,
            f = d || m.LOG_LEVEL.INFO,
            g = n[a];
        return g || e === m.LOGGER_TYPE.CONSOLE && (g = b({
            level: f,
            type: e
        }), n[a] = g), g
    }

    function e(a) {
        var b, c = ATT.logManager.getInstance();
        return c.configureLogger(a, c.loggerType.CONSOLE, c.logLevel.TRACE), b = c.getLogger(a), o[a] = b, o[a]
    }

    function f(a) {
        var b = o[a];
        return void 0 === b ? e(a) : b
    }

    function g(a, b) {
        var c = d(a);
        void 0 !== c && c.setLevel(b)
    }

    function h(a) {
        void 0 === a && (a = m.LOG_LEVEL.WARNING);
        var b;
        for (b in o) o.hasOwnProperty(b) && this.updateLogLevel(b, a)
    }

    function i() {
        return {
            getLogger: d,
            configureLogger: c,
            loggerType: m.LOGGER_TYPE,
            logLevel: m.LOG_LEVEL,
            getLoggerByName: f,
            addLoggerForModule: e,
            updateLogLevel: g,
            setLogLevel: h
        }
    }
    var j, k, l, m = {}, n = [],
        o = [];
    m.LOGGER_TYPE = {
        CONSOLE: "Console",
        FILE: "File"
    }, m.LOG_LEVEL = {
        ERROR: 0,
        WARNING: 1,
        INFO: 2,
        DEBUG: 3,
        TRACE: 4
    }, l = function() {
        var a, b = "",
            c = "",
            d = [],
            e = "",
            f = [];
        try {
            throw new Error
        } catch (g) {
            return c = 0 === g.stack.split("\n")[0].indexOf("Error") ? g.stack.split("\n")[4] : g.stack.split("\n")[3], d = c.split(":"), e = d[2], f = void 0 === e ? [] : e.split("/"), b = f[f.length - 1], void 0 !== b && b.indexOf("?") > -1 && (b = b.split("?")[0]), a = d[3], b + ":" + a
        }
    }, m.getInstance = function() {
        return k || (k = i()), k
    }, "object" == typeof module && module && "object" == typeof module.exports && (module.exports = m), j = typeof window, "undefined" !== j && ATT && (ATT.logManager = m)
}(), function() {
    "use strict";

    function a() {
        function a(a, b) {
            a.callback.apply(a.context, b)
        }
        var b = {};
        return {
            getTopics: function() {
                return b
            },
            unsubscribe: function(a, c) {
                var d, e;
                if (!b.hasOwnProperty(a)) return !1;
                if ("function" != typeof c) throw new Error("Must pass in the callback you are unsubscribing");
                for (e = b[a], d = 0; d < e.length; d += 1)
                    if (e[d].callback === c) return e.splice(d, 1), 0 === e.length && delete b[a], !0;
                return !1
            },
            publish: function() {
                var c, d, e = Array.prototype.slice.call(arguments),
                    f = e.shift();
                if (!b.hasOwnProperty(f)) return !1;
                for (d = b[f], c = 0; c < d.length; c += 1) setTimeout(a.bind(null, b[f][c], e), 0);
                return !0
            },
            subscribe: function(a, c, d) {
                var e, f, g;
                if ("" === a || null === a || void 0 === a) return !1;
                if ("function" != typeof c) return !1;
                if (void 0 !== d && (null === d || "object" != typeof d)) return !1;
                for (g = {
                    context: d,
                    callback: c
                }, b.hasOwnProperty(a) || (b[a] = []), e = b[a], f = 0; f < e.length; f += 1)
                    if (c === e[f].callback) return !1;
                return b[a].push(g), !0
            }
        }
    }
    var b;
    b = typeof window.ATT, void 0 === b ? window.ATT = {
        "private": {
            factories: {}
        }
    } : void 0 === ATT["private"] && (ATT["private"] = {
        factories: {}
    }), ATT["private"].factories.createEventEmitter = a
}(), !ATT) var ATT = {};
var attUtils = null;
"object" == typeof module && module && "object" == typeof module.exports && (attUtils = {
    utils: require("./att.utils"),
    logManager: require("./att.log-manager.js")
}, module.exports = attUtils);
var RESTClient = function(a) {
    "use strict";

    function b(b) {
        b.forEach(function(b) {
            m.prototype[b] = function(c) {
                c.method = b, c.headers = i(a).extend(this.config.headers, c.headers), this.ajax(c)
            }
        })
    }
    var c, d, e = typeof window,
        f = "object" == typeof module && module && "object" == typeof module.exports,
        g = null,
        h = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }, i = function(a) {
            return f ? attUtils.utils.utils : a.utils
        }, j = function(a) {
            g = a
        }, k = function(a) {
            return f ? attUtils.logManager.getInstance() : a.logManager.getInstance()
        }, l = k(a),
        m = function(b) {
            l.configureLogger("RESTClient", l.loggerType.CONSOLE, l.logLevel.WARNING), g = l.getLogger("RESTClient"), g.setLevel(l.logLevel.WARNING), this.config = i(a).extend({}, b), this.config.async = this.config.async || !0, this.config.success = this.config.success || function() {}, this.config.error = this.config.error || c, this.config.ontimeout = this.config.ontimeout || function(a) {
                g.logDebug(a), g.logError("Request timed out")
            }, this.config.headers = this.config.headers || h
        }, n = function(a, b, c, d) {
            var e, f, g = JSON.stringify(d);
            try {
                e = l.getLogger("RESTClient")
            } catch (h) {
                console.log("Unable to configure request logger" + h)
            }
            e.logDebug("---------Request---------------"), e.logDebug(a + " " + b + " HTTP/1.1"), e.logDebug("=========headers=======");
            for (f in c) c.hasOwnProperty(f) && e.logDebug(f + ": " + c[f]);
            void 0 !== g && (e.logDebug("=========body=========="), e.logDebug(g))
        }, o = function(a) {
            var b;
            try {
                b = l.getLogger("RESTClient")
            } catch (c) {
                console.log("Unable to configure default logger" + c)
            }
            b.logDebug("---------Response--------------"), b.logDebug(a.getResponseStatus()), b.logDebug("=========headers======="), b.logDebug(a.headers), b.logDebug("=========body=========="), b.logDebug(a.responseText)
        }, p = function(a) {
            var b, c = a.getResponseHeader("Content-Type");
            return c && 0 === c.indexOf("application/json") ? (b = JSON.parse(a.responseText), "object" == typeof b ? b : JSON.parse(b)) : ""
        }, q = function(a, b) {
            var c = {
                getJson: function() {
                    return p(a)
                },
                getResponseHeader: function(b) {
                    return a.getResponseHeader(b)
                },
                responseText: a.responseText,
                headers: a.getAllResponseHeaders(),
                statusText: a.statusText,
                getResponseStatus: function() {
                    return a.status
                },
                getResourceURL: function() {
                    return b.method.toUpperCase() + " " + b.url
                }
            };
            return c
        }, r = function(b) {
            var e = this,
                f = q(e, b),
                g = i(a).extend({}, f);
            o(g), e.status >= 400 && e.status <= 599 ? "function" == typeof d ? d.call(e, g) : c.call(e, g) : b.success.call(e, g)
        }, s = function(b) {
            var c = this,
                d = q(c, b),
                e = i(a).extend({}, d);
            o(e), b.error.call(this, e)
        }, t = function(b) {
            var c = this,
                d = q(c, b),
                e = i(a).extend({}, d);
            o(e), g.logError("Request timeout"), b.ontimeout.call(this, e)
        };
    return m.prototype.ajax = function() {
        var a = this.config,
            b = new XMLHttpRequest,
            e = null,
            f = null,
            h = null;
        try {
            e = a.data && JSON.stringify(a.data), g || (console.log("Using console logger for debugging"), j(null)), void 0 !== a.timeout && (b.timeout = a.timeout), b.onload = r.bind(b, a), d = a.error, b.onerror = function() {
                if ("undefined" === a.error) throw new Error("Network error occurred in REST client.");
                s.call(this, a)
            }, b.onreadystatechange = function() {
                4 === this.readyState && 0 === this.status && "" === this.statusText && void 0 === a.ontimeout && (g.logError("Failed to complete request for resource:" + a.url), s.call(this, a))
            }, b.onabort = s.bind(b, a), b.ontimeout = t.bind(b, a), b.open(a.method, a.url, a.async);
            for (f in a.headers) a.headers.hasOwnProperty(f) && b.setRequestHeader(f, a.headers[f]);
            n(a.method, a.url, a.headers, e), b.send(e)
        } catch (i) {
            h = l.getLogger("RESTClient"), h.logError("XHR request failed, " + i), "function" == typeof d ? d.call(b, i) : c.call(b, i)
        }
    }, c = function(a) {
        throw new Error("RESTClient error handler triggered!" + a)
    }, b(["get", "post", "delete"]), m.prototype.getConfig = function() {
        return this.config
    }, "undefined" !== e && ATT && (ATT.RESTClient = m), m
}(ATT);
"object" == typeof module && module && "object" == typeof module.exports && (module.exports = RESTClient);
var attUtils = function(a) {
    "use strict";

    function b(a) {
        return null === a.match(new RegExp("[^0-9]")) ? 10 === a.length ? "tel:+" + a : 0 === a.indexOf("1") ? "tel:+" + a : 0 === a.indexOf("+") ? "tel:" + a : "sip:" + a + "@icmn.api.att.net" : a.indexOf("@") > 0 ? "sip:" + a : null
    }

    function c() {
        var a, b = navigator.userAgent,
            c = b.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        return /trident/i.test(c[1]) ? (a = /\brv[ :]+(\d+)/g.exec(b) || [], "IE " + (a[1] || "")) : "Chrome" === c[1] && (a = b.match(/\bOPR\/(\d+)/), null !== a) ? "Opera" : (c = c[2] ? [c[1], c[2]] : [navigator.appName, navigator.appVersion, "-?"], a = b.match(/version\/(\d+)/i), null !== a && c.splice(1, 1, a[1]), c[0])
    }

    function d() {
        var a, b = navigator.userAgent,
            c = b.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        return /trident/i.test(c[1]) ? (a = /\brv[ :]+(\d+)/g.exec(b) || [], "IE " + (a[1] || "")) : "Chrome" === c[1] && (a = b.match(/\bOPR\/(\d+)/), null !== a) ? a[1] : (c = c[2] ? [c[1], c[2]] : [navigator.appName, navigator.appVersion, "-?"], a = b.match(/version\/(\d+)/i), null !== a && c.splice(1, 1, a[1]), c[1])
    }
    var e = function(a, b) {
        var c;
        for (c in b) b.hasOwnProperty(c) && (a[c] = b[c] instanceof Object ? e(b[c]) : b[c]);
        return a
    }, f = function(a, b) {
            a["super"] = b, a.prototype = Object.create(b.prototype, {
                constructor: {
                    value: a,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        }, g = function(a, b) {
            var c = b.split("."),
                d = a;
            return c.forEach(function(a) {
                d[a] || (d[a] = {}), d = d[a]
            }), d
        };
    a.utils = {
        createNamespace: g,
        extend: e,
        inherits: f,
        createCalledPartyUri: b,
        getBrowserName: c,
        getBrowserVersion: d
    }, "object" == typeof module && module && "object" == typeof module.exports && (module.exports = a)
}(ATT);
if (!ATT) var ATT = {};
if (function(a) {
    "use strict";

    function b(a) {
        var b, c = 0;
        return b = a.replace(/m=video (\d*) RTP/g, function(a) {
            return c += 1, 1 === c ? "m=video 0 RTP" : a
        }), c = 0, b = b.replace(/a=rtcp:(\d*) IN/g, function(a) {
            return c += 1, 2 === c ? "a=rtcp:0 IN" : a
        })
    }

    function c(a, b) {
        var c = "a=" + a + "\r\n",
            d = b.indexOf(c);
        return d > 0 && (b = b.replace(c, "")), b
    }

    function d(a) {
        x.logTrace("increment sdp", a);
        var b = a.sdp.indexOf("o="),
            c = a.sdp.indexOf("s=-"),
            d = a.sdp.slice(b, c),
            e = d.split(" "),
            f = parseInt(e[2], 10) + 1,
            g = d.replace(" " + e[2].toString() + " ", " " + f.toString() + " ");
        return a.sdp = a.sdp.replace(d, g), x.logTrace("modified sdp", a), a
    }

    function e(a) {
        var b, c, d = [],
            e = ATT.sdpParser.getInstance().parse(a);
        for (x.logDebug("Parsed SDP " + e), b = 0; b < e.media.length; b += 1) c = {
            rtp: e.media[b].rtp,
            type: e.media[b].type
        }, 0 < c.rtp.length && d.push(c);
        return d
    }

    function f(a) {
        return a = a.replace(/a=mid:video\r\n/g, ""), a = a.replace(/a=mid:audio\r\n/g, ""), a = a.replace(/a=group:BUNDLE audio video\r\n/g, ""), a = a.replace(/a=group:BUNDLE audio\r\n/g, "")
    }

    function g(a) {
        return a = a.replace(/setup:passive/g, "setup:actpass"), a = a.replace(/setup:active/g, "setup:actpass")
    }

    function h(a, b) {
        return -1 === a.indexOf("m=" + b) ? !1 : !0
    }

    function i(a, b) {
        var c;
        return !1 === h(a, b) ? null : (c = a.split("m=" + b)[1], void 0 === c ? null : c)
    }

    function j(a) {
        var b;
        return !1 === h(a.sdp, a.mediaType) ? null : (b = i(a.sdp, a.mediaType).split(" ")[1], void 0 === b ? null : b)
    }

    function k(a) {
        return "string" != typeof a || 0 === a.length ? !1 : -1 === a.toLowerCase().indexOf("2 udp") ? !1 : !0
    }

    function l(a) {
        var b, c, d, e;
        return "string" != typeof a.sdp || 0 === a.sdp.length ? null : (c = i(a.sdp, a.mediaType), !1 === k(c) ? null : (b = c.split(/2 udp/i)[1], void 0 === b ? null : (d = b.split(a.ip)[1], void 0 === d ? null : e = d.split("typ")[0].trim())))
    }

    function m(a) {
        return -1 !== a.indexOf("c=IN IP4") ? a.split("c=IN IP4 ")[1].split("\r\n")[0] : null
    }

    function n(a) {
        var b, c, d, e, f;
        return d = m(a), b = j({
            sdp: a,
            mediaType: "audio"
        }), e = l({
            sdp: a,
            ip: d,
            mediaType: "audio"
        }), !0 === h(a, "video") && (c = j({
            sdp: a,
            mediaType: "video"
        }), e = l({
            sdp: a.split("m=video")[0],
            ip: d,
            mediaType: "audio"
        }), f = l({
            sdp: a,
            ip: d,
            mediaType: "video"
        })), {
            audioPort: b,
            videoPort: c,
            audioPortRTCP: e,
            videoPortRTCP: f,
            ip: d
        }
    }

    function o(a) {
        var b, c, d;
        return void 0 === a.sdpPorts.ip || null === a.sdpPorts.ip ? a.sdp : (d = a.sdp, void 0 !== a.sdpPorts.audioPort && void 0 !== a.sdpPorts.audioPortRTCP && (b = parseInt(a.sdpPorts.audioPort, 10) + 1, d = a.sdp.replace(a.sdpPorts.ip + " " + a.sdpPorts.audioPortRTCP, a.sdpPorts.ip + " " + b)), !0 === h(a.sdp, "video") && void 0 !== a.sdpPorts.videoPort && void 0 !== a.sdpPorts.videoPortRTCP && (c = parseInt(a.sdpPorts.videoPort, 10) + 1, d = d.replace(a.sdpPorts.ip + " " + a.sdpPorts.videoPortRTCP, a.sdpPorts.ip + " " + c)), d)
    }

    function p(a) {
        return -1 === a.sdp.indexOf("a=rtcp:" + a.sdpPorts.audioPort + " IN IP4") ? !1 : !0
    }

    function q(a) {
        return !1 === p(a) ? !1 : "string" != typeof a.sdpPorts.ip || "0.0.0.0" === a.sdpPorts.ip ? !1 : !1 === h(a.sdp, "audio") ? !1 : "string" != typeof a.sdpPorts.audioPort || "string" != typeof a.sdpPorts.audioPortRTCP || parseInt(a.sdpPorts.audioPortRTCP, 10) !== parseInt(a.sdpPorts.audioPort, 10) + 1 ? !1 : !0 !== h(a.sdp, "video") || "string" == typeof a.sdpPorts.videoPortRTCP && "string" == typeof a.sdpPorts.videoPort && parseInt(a.sdpPorts.videoPortRTCP, 10) === parseInt(a.sdpPorts.videoPort, 10) + 1 ? !0 : !1
    }

    function r(a) {
        var b, c, d, e;
        if (void 0 === a) throw new Error("No SDP provided");
        if (e = a, b = A.getBrowserName(), "Firefox" === b) {
            if (c = n(a), d = {
                sdp: a,
                sdpPorts: c,
                browser: b
            }, !0 === q(d) || 0 === Object.keys(c).length) return a;
            e = o(d)
        }
        return e
    }

    function s(a) {
        if (x.logDebug("sdpFilter.modifyForHoldCall"), void 0 === a) throw x.logError("Please pass the correct parameter for modifyForHoldCall"), new Error("parameter `localSdp` is undefined");
        try {
            var b = a;
            return b.sdp = b.sdp.replace(/a=sendrecv/g, "a=inactive"), b.type = "offer", b = d(b)
        } catch (c) {
            throw c
        }
    }

    function t(a) {
        if (x.logDebug("sdpFilter.modifyForResumeCall"), void 0 === a) throw x.logError("Please pass the correct parameter for modifyForResumeCall"), new Error("parameter `localSdp` is undefined");
        try {
            var b = a;
            return b.sdp = b.sdp.replace(/a=inactive/g, "a=sendrecv"), b.type = "offer", b = d(b)
        } catch (c) {
            throw c
        }
    }

    function u(a, c) {
        return c = d(c), -1 !== a.indexOf("sendrecv") && -1 !== c.sdp.indexOf("recvonly") && -1 !== a.indexOf("m=video 0 ") ? (c.sdp = b(c.sdp), c.sdp = c.sdp.replace(/a=recvonly/g, "a=sendrecv")) : -1 !== a.indexOf("sendrecv") && -1 !== c.sdp.indexOf("recvonly") && -1 !== a.indexOf("m=video 0 ") && -1 !== a.indexOf("sendonly") ? (c.sdp = b(c.sdp), c.sdp = c.sdp.replace(/a=recvonly/g, "a=sendrecv")) : -1 !== a.indexOf("sendonly") ? c.sdp = c.sdp.replace(/a=sendrecv/g, "a=recvonly") : -1 !== a.indexOf("inactive") ? c.sdp = c.sdp.replace(/a=sendonly/g, "a=inactive") : -1 !== a.indexOf("recvonly") ? c.sdp = c.sdp.replace(/a=inactive/g, "a=sendonly") : -1 !== a.indexOf("sendrecv") && (c.sdp = c.sdp.replace(/a=recvonly/g, "a=sendrecv")), c.sdp = f(c.sdp), c
    }
    var v, w, x, y = {}, z = ATT.logManager.getInstance(),
        A = ATT.utils;
    x = z.getLoggerByName("SDPFilterModule"), x.setLevel(z.logLevel.WARNING), w = function() {
        return {
            removeSDPAttribute: function(a, b) {
                return c(a, b)
            },
            getCodecfromSDP: function(a) {
                return e(a)
            },
            setupActivePassive: g,
            modifyForHoldCall: s,
            modifyForResumeCall: t,
            createManualAnswer: u,
            fixIcePorts: r,
            jslWorkarounds: f
        }
    }, a.sdpFilter = y, y.getInstance = function() {
        return v || (v = w()), v
    }
}(ATT || {}), function(a) {
    "use strict";
    var b = a.logManager.getInstance(),
        c = b.getLoggerByName("att.phonenumber"),
        d = {
            alphaLookup: {
                a: 2,
                b: 2,
                c: 2,
                d: 3,
                e: 3,
                f: 3,
                g: 4,
                h: 4,
                i: 4,
                j: 5,
                k: 5,
                l: 5,
                m: 6,
                n: 6,
                o: 6,
                p: 7,
                q: 7,
                r: 7,
                s: 7,
                t: 8,
                u: 8,
                v: 8,
                w: 9,
                x: 9,
                y: 9,
                z: 9
            },
            stringify: function(a) {
                c.logDebug("att.phonenumber: stringify"), c.logInfo("removes all the special character "), c.logTrace(a);
                var b, e = d.translate(a),
                    f = e.length,
                    g = "1" === e.charAt(0),
                    h = e.split("");
                return f > (g ? 11 : 10) ? e : !g && 4 > f ? e : (g && h.splice(0, 1), g ? f > 1 && (b = 4 - f, b = b > 0 ? b : 0, h.splice(0, 0, " ("), h.splice(4, 0, new Array(b + 1).join(" ") + ") "), f > 7 && h.splice(8, 0, "-")) : f > 7 ? (h.splice(0, 0, "("), h.splice(4, 0, ") "), h.splice(8, 0, "-")) : f > 3 && h.splice(3, 0, "-"), c.logTrace("return:" + (g ? "+1" : "") + h.join("")), (g ? "+1" : "") + h.join(""))
            },
            translate: function(a) {
                c.logDebug("att.phonenumber: translate"), c.logInfo("converts all the alphanumbers to Numbers "), c.logTrace(a);
                var b, e, f = "";
                for (b = 0; b < a.length; b += 1) e = a.charAt(b), isNaN(e) ? void 0 !== d.alphaLookup[e.toLowerCase()] && (f += d.alphaLookup[e.toLowerCase()]) : f += e;
                return c.logTrace("return:" + f), String(f)
            },
            getCallable: function(a, b) {
                var c = b || "us",
                    e = d.translate(a);
                return 10 !== e.length ? "us" === c && 11 === e.length && "1" === e.charAt(0) ? e : e : "us" === c ? "1" + e : void 0
            },
            cleanPhoneNumber: function(b) {
                c.logDebug("att.phonenumber: cleanPhoneNumber"), c.logInfo("removes special character and convert the number to a callable format"), c.logTrace(b);
                var d;
                try {
                    return -1 !== b.indexOf("@") ? b : (d = b.replace(/\s/g, ""), a.SpecialNumbers[b] ? (c.logTrace("return: " + b), b) : (d = a.phoneNumber.translate(d), c.logTrace("return: " + d), d))
                } catch (e) {
                    throw c.logTrace(e), c.logError("Error while cleaning the phonenumber"), a.errorDictionary.getSDKError(26001)
                }
            },
            formatNumber: function(b) {
                c.logDebug("att.phonenumber: formatNumber"), c.logInfo("converts the given number to a universal format"), c.logTrace(b);
                try {
                    var d = this.cleanPhoneNumber(b);
                    return d ? b.length <= 10 ? (c.logTrace("return: " + d), d) : (c.logInfo("The formated Number" + d), c.logTrace("return: " + a.phoneNumber.stringify(d)), a.phoneNumber.stringify(d)) : void c.logWarning("Phone number not formatable .")
                } catch (e) {
                    throw c.logTrace(e), c.logError("Error while formating the number "), a.errorDictionary.getSDKError(26001)
                }
            }
        };
    c.setLevel(b.logLevel.WARNING), a.phoneNumber = d
}(ATT), !ATT) var ATT = {};
if (function(a) {
    "use strict";
    var b = {};
    b.SpecialNumbers = {
        911: !0,
        411: !0,
        611: !0,
        "*69": !0,
        "#89": !0
    }, a.SpecialNumbers = Object.freeze(b.SpecialNumbers)
}(ATT || {}), function() {
    "use strict";
    var a, b, c, d = {};
    if (a = {
        MOBILE_NUMBER: "MOBILE_NUMBER",
        VIRTUAL_NUMBER: "VIRTUAL_NUMBER",
        ACCOUNT_ID: "ACCOUNT_ID"
    }, b = {
        OUTGOING: "Outgoing",
        INCOMING: "Incoming"
    }, c = {
        INVITATION_RECEIVED: "invitation-received",
        SESSION_OPEN: "session-open",
        SESSION_MODIFIED: "session-modified",
        SESSION_TERMINATED: "session-terminated",
        MODIFICATION_RECEIVED: "mod-received",
        MODIFICATION_TERMINATED: "mod-terminated",
        TRANSFER_INITIATED: "transfer-initiated",
        TRANSFER_TERMINATED: "transfer-terminated"
    }, void 0 === ATT["private"]) throw new Error("Error exporting ATT.private.enum");
    d.USER_TYPE = Object.freeze(a), d.CALL_TYPE = Object.freeze(b), d.API_EVENT = Object.freeze(c), ATT["private"]["enum"] = d
}(), !ATT) var ATT = {};
! function() {
    "use strict";

    function a(a) {
        e.logDebug("ATT.private.config.api: configure"), e.logInfo("Configuring API..."), e.logTrace("appConfig", a);
        var b = {
            rtc_endpoint: a.api_endpoint + a.ewebrtc_uri,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        };
        return {
            createWebRTCSession: {
                method: "POST",
                url: b.rtc_endpoint + "/sessions",
                formatters: {
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("createWebRTCSession:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        },
                        "x-e911Id": function(a) {
                            return e.logDebug("createWebRTCSession:formatters:headers:x-e911Id"), e.logTrace("x-e911Id", a), a
                        },
                        "x-Arg": function(a) {
                            return e.logDebug("createWebRTCSession:formatters:headers:x-Arg"), e.logTrace("x-Arg", a), a
                        }
                    }
                },
                headers: b.headers
            },
            refreshWebRTCSession: {
                method: "PUT",
                formatters: {
                    url: function(a) {
                        return e.logDebug("refreshWebRTCSession:formatters:url"), e.logTrace("sessionId", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a), b.rtc_endpoint + "/sessions/" + a
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("refreshWebRTCSession:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        }
                    }
                },
                headers: b.headers
            },
            deleteWebRTCSession: {
                method: "DELETE",
                formatters: {
                    url: function(a) {
                        return e.logDebug("deleteWebRTCSession:formatters:url"), e.logTrace("sessionId", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a), b.rtc_endpoint + "/sessions/" + a
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("deleteWebRTCSession:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        },
                        "x-e911Id": function(a) {
                            return e.logDebug("deleteWebRTCSession:formatters:headers:x-e911Id"), e.logTrace("x-e911Id", a), a
                        }
                    }
                },
                headers: b.headers
            },
            associateTokenWithUserId: {
                method: "PUT",
                formatters: {
                    url: function(a) {
                        return e.logDebug("associateTokenWithUserId:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/userIds/" + a.userId), b.rtc_endpoint + "/userIds/" + a.userId
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("associateTokenWithUserId:formatters:headers:Authorization"), e.logTrace("oAuthToken", a), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        }
                    }
                },
                headers: {
                    Accept: "application/json"
                }
            },
            associateE911Id: {
                method: "PUT",
                formatters: {
                    url: function(a) {
                        return e.logDebug("associateE911Id:formatters:url"), e.logTrace("sessionId", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a), b.rtc_endpoint + "/sessions/" + a
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("associateE911Id:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        }
                    }
                },
                headers: b.headers
            },
            getEvents: {
                formatters: {
                    method: "GET",
                    url: function(a) {
                        return e.logDebug("getEvents:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.eventChannelUri), b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.eventChannelUri
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("getEvents:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        }
                    }
                },
                headers: {
                    Accept: "application/json"
                }
            },
            createCall: {
                method: "POST",
                formatters: {
                    url: function(a) {
                        return e.logDebug("createCall:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type), b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("createCall:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        }
                    }
                },
                headers: b.headers
            },
            modifyCall: {
                method: "PUT",
                formatters: {
                    url: function(a) {
                        return e.logDebug("modifyCall:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId), b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("modifyCall:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        },
                        options: {
                            "x-conference-action": function(a) {
                                return e.logDebug("modifyCall:formatters:headers:options:x-conference-action"), e.logTrace("x-conference-action", a), a
                            },
                            "x-calls-action": function(a) {
                                return e.logDebug("modifyCall:formatters:headers:options:x-calls-action"), e.logTrace("x-calls-action", a), a
                            }
                        }
                    }
                },
                headers: b.headers
            },
            addParticipant: {
                method: "PUT",
                formatters: {
                    url: function(a) {
                        return e.logDebug("addParticipant:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a[0] + "/conferences/" + a[1] + "/participants/" + a[2]), b.rtc_endpoint + "/sessions/" + a[0] + "/conferences/" + a[1] + "/participants/" + a[2]
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("addParticipant:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        }
                    }
                },
                headers: b.headers
            },
            removeParticipant: {
                method: "DELETE",
                formatters: {
                    url: function(a) {
                        return e.logDebug("removeParticipant:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a[0] + "/conferences/" + a[1] + "/participants/" + a[2]), b.rtc_endpoint + "/sessions/" + a[0] + "/conferences/" + a[1] + "/participants/" + a[2]
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("removeParticipant:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        }
                    }
                },
                headers: b.headers
            },
            acceptCallModifications: {
                method: "PUT",
                formatters: {
                    url: function(a) {
                        return e.logDebug("acceptCallModifications:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId), b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("acceptCallModifications:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        },
                        "x-modId": function(a) {
                            return e.logDebug("acceptCallModifications:formatters:headers:x-modId"), e.logTrace("x-modId", a), a
                        }
                    }
                },
                headers: ATT.utils.extend({
                    "x-calls-action": "accept-call-mod"
                }, b.headers)
            },
            acceptConferenceModifications: {
                method: "PUT",
                formatters: {
                    url: function(a) {
                        return e.logDebug("acceptConferenceModifications:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId), b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("acceptConferenceModifications:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        },
                        "x-mod-Id": function(a) {
                            return e.logDebug("acceptConferenceModifications:formatters:headers:x-mod-Id"), e.logTrace("x-mod-Id", a), a
                        }
                    }
                },
                headers: ATT.utils.extend({
                    "x-conference-action": "accept-media-mod"
                }, b.headers)
            },
            deleteCall: {
                method: "DELETE",
                formatters: {
                    url: function(a) {
                        return e.logDebug("deleteCall:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId), b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("deleteCall:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        },
                        "x-delete-reason": function(a) {
                            return e.logDebug("deleteCall:formatters:headers:x-delete-reason"), e.logTrace("x-delete-reason", a), a
                        }
                    }
                },
                headers: b.headers
            },
            transferCall: {
                method: "PUT",
                formatters: {
                    url: function(a) {
                        return e.logDebug("transferCall:formatters:url"), e.logTrace("params", a), e.logTrace("url", b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId), b.rtc_endpoint + "/sessions/" + a.sessionId + "/" + a.type + "/" + a.callId
                    },
                    headers: {
                        Authorization: function(a) {
                            return e.logDebug("transferCall:formatters:headers:Authorization"), e.logTrace("Authorization", "Bearer " + a), "Bearer " + a
                        },
                        "x-transferTargetCallId": function(a) {
                            return e.logDebug("transferCall:formatters:headers:x-transferTargetCallId"), e.logTrace("x-transferTargetCallId", a), a
                        }
                    }
                },
                headers: ATT.utils.extend({
                    "x-calls-action": "initiate-call-transfer"
                }, b.headers)
            }
        }
    }

    function b() {
        e.logDebug("ATT.private.config.api: getAPIConfiguration");
        var b = c.app.getAppConfiguration();
        return e.logTrace("currentConfig", b), a(b)
    }
    var c, d = ATT.logManager.getInstance(),
        e = d.addLoggerForModule("Loading att.private.config.api...");
    if (e.setLevel(d.logLevel.WARNING), void 0 === ATT["private"] || void 0 === ATT["private"].config) throw e.logError("Error exporting ATT.private.config.api"), new Error("Error exporting ATT.private.config.api");
    c = ATT["private"].config, c.api = {
        getAPIConfiguration: b
    }
}(),
function() {
    "use strict";

    function a(a) {
        k.logDebug("ATT.private.config.app: setAppConfiguration"), k.logInfo("Setting app configuration"), k.logTrace("options", a), f = a.api_endpoint || f, g = a.ewebrtc_uri || g
    }

    function b() {
        return k.logDebug("ATT.private.config.app: getAppConfiguration"), k.logInfo("Getting app configuration"), d = {
            api_endpoint: f,
            ewebrtc_uri: g,
            eventChannelType: i
        }, k.logTrace("appConfig", d), d
    }

    function c() {
        return e
    }
    var d, e = {
            supported: [{
                name: "Chrome",
                version: {
                    min: 38
                }
            }, {
                name: "Firefox",
                version: {
                    min: 33,
                    max: 33
                }
            }],
            not_certified: [{
                name: "Chrome",
                version: {
                    min: 32,
                    max: 37
                }
            }, {
                name: "Firefox",
                version: {
                    min: 28,
                    max: 32
                }
            }, {
                name: "Opera"
            }]
        }, f = "https://api.att.com",
        g = "/RTC/v1",
        h = {
            WebSockets: "WebSockets",
            LongPolling: "LongPolling"
        }, i = h.LongPolling,
        j = ATT.logManager.getInstance(),
        k = j.addLoggerForModule("Loading att.private.config.api...");
    if (k.setLevel(j.logLevel.WARNING), k.logDebug("Loading ATT.private.config.app..."), void 0 === ATT["private"] || void 0 === ATT["private"].config) throw new Error("Error exporting ATT.private.config.app");
    ATT["private"].config.app = {
        getAppConfiguration: b,
        setAppConfiguration: a,
        getBrowserSupport: c
    }
}(),
function() {
    "use strict";

    function a(a) {
        return Object.freeze(a), a
    }
    var b = [{
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: "0000",
        ErrorMessage: "Error Code is not defined in error dictionary",
        Cause: "Error Code is not defined in error dictionary",
        Resolution: "Add the error object in error dictionary"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "configure",
        ErrorCode: "0001",
        ErrorMessage: "Unable to configure the endpoint for SDK. Please ensure that correct config key is used to configure the endpoint",
        Cause: "Configuration key is not found",
        Resolution: "Please check appConfig module for correct config key"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: "0002",
        ErrorMessage: "Unable to perform requested operation. Please ensure that the application is hosted on the provisioned domain.",
        Cause: "CORS configuration",
        Resolution: "Please ensure that the application is hosted on the provisioned domain"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: "0003",
        ErrorMessage: "Request timed out",
        Cause: "Network failure",
        Resolution: "Please check the logs and network connectivity and try again"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "Phone",
        ErrorCode: "1000",
        ErrorMessage: "Missing input parameter",
        Cause: "One or more of the input parameters are empty",
        Resolution: "Please check the values for input parameters"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "Phone",
        ErrorCode: "1001",
        ErrorMessage: "Missing local video stream",
        Cause: "Input parameter localVideoElementID is missing",
        Resolution: "Please check the values for localVideoElementID"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "Phone",
        ErrorCode: "1002",
        ErrorMessage: "Missing remote video stream",
        Cause: "Input parameter remoteVideoElementID is missing",
        Resolution: "Please check the values for remoteVideoElementID"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "Phone",
        ErrorCode: "1003",
        ErrorMessage: "Invalid media type",
        Cause: "Invalid media constraints",
        Resolution: "Please provide use valid Media constraints attributes"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "Phone",
        ErrorCode: "1004",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "Phone",
        ErrorCode: "1005",
        ErrorMessage: "Cannot join conference. An active call is already going on",
        Cause: "Invalid operation",
        Resolution: "Please end the active call before joining the incoming conference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "Phone",
        ErrorCode: "1006",
        ErrorMessage: "Cannot accept incoming call. An active conference is already going on",
        Cause: "Invalid operation",
        Resolution: "Please end the active conference before joining the incoming call"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "Phone",
        ErrorCode: "1007",
        ErrorMessage: "Cannot accept incoming conference. An active conference is already going on",
        Cause: "Invalid operation",
        Resolution: "Please end the active conference before joining the incoming conference"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: "2000",
        ErrorMessage: "Invalid user type",
        Cause: "Unsupported user type",
        Resolution: "Supported user types are Mobile Number, Virtual Number, Account ID"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: "2001",
        ErrorMessage: "Missing input parameter",
        Cause: "Access token & E911 ID is required",
        Resolution: "User type, Access token, E911 ID are mandatory fields for Mobile Number & Virtual Number user types"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: "2002",
        ErrorMessage: "Mandatory fields can not be empty",
        Cause: "One of the Mandatory Parameters is empty",
        Resolution: "Please check the values for input parameters"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: "2003",
        ErrorMessage: "Invalid input parameter",
        Cause: "Invalid parameter",
        Resolution: "For Account ID users E911 is not required"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: "2004",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: "2005",
        ErrorMessage: "User already logged in",
        Cause: "Duplicate operation",
        Resolution: "Login should be called only once per session"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "logout",
        ErrorCode: "3000",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "logout",
        ErrorCode: "3001",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid Logout operation",
        Resolution: "None"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "logout",
        ErrorCode: "3002",
        ErrorMessage: "User already logged out",
        Cause: "Duplicate operation",
        Resolution: "Logout should be called only once per session"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4000",
        ErrorMessage: "Invalid input parameter",
        Cause: "Invalid phone number",
        Resolution: "Please provide a valid phone number"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4001",
        ErrorMessage: "Invalid input parameter",
        Cause: "Invalid SIP URI",
        Resolution: "Please provide valid SIP URI"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4002",
        ErrorMessage: "Invalid media type",
        Cause: "Invalid media constraints",
        Resolution: "Please provide use valid Media constraints attributes"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4003",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4004",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking dial"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4005",
        ErrorMessage: "Can not make second call. Please put the current call on hold before making second call.",
        Cause: "Invalid operation",
        Resolution: "Please ensure that current call is on hold before making second call"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4006",
        ErrorMessage: "parameter `localMedia` is not defined",
        Cause: "localMedia is not defined",
        Resolution: "Please include `localMedia` parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4007",
        ErrorMessage: "parameter `remoteMedia` is not defined",
        Cause: "remoteMedia is not defined",
        Resolution: "Please include `remoteMedia` parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4008",
        ErrorMessage: "parameter `destination` is not defined",
        Cause: "destination is not defined",
        Resolution: "Please include `destination` parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4009",
        ErrorMessage: "options parameter is not defined",
        Cause: "options are not defined",
        Resolution: "You must include the options parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "dial",
        ErrorCode: "4010",
        ErrorMessage: "Cannot dial another call when there is a call in dialing state",
        Cause: "Trying to dial another call when a call is still in dialing state",
        Resolution: "The dialling (pending) call must be connected before you can proceed with another call"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "answer",
        ErrorCode: "5000",
        ErrorMessage: "Answer failed- No incoming call",
        Cause: "No incoming call",
        Resolution: "No incoming call"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "answer",
        ErrorCode: "5001",
        ErrorMessage: "Invalid media type",
        Cause: "Invalid media constraints",
        Resolution: "Please provide use valid Media constraints attributes"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "answer",
        ErrorCode: "5002",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "answer",
        ErrorCode: "5003",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking answer"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "answer",
        ErrorCode: "5004",
        ErrorMessage: "Mandatory fields can not be empty",
        Cause: "One of the Mandatory Parameters is empty",
        Resolution: "Please check the values for input parameters"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "answer",
        ErrorCode: "5005",
        ErrorMessage: "Invalid Action parameter",
        Cause: "Action can only be `hold` or `end`",
        Resolution: "Please provide a valid action (hold or end)"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "hangup",
        ErrorCode: "6000",
        ErrorMessage: "Hangup failed- Call is not in progress",
        Cause: "Can not hangup before the call is established",
        Resolution: "Please use cancel call, or allow call to be established before trying to hang-up."
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "hangup",
        ErrorCode: "6001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "hold",
        ErrorCode: "7000",
        ErrorMessage: "Hold failed- Call is not in progress",
        Cause: "Cannot hold. There is no active call in progress.",
        Resolution: "Please ensure an active call is in progress before trying to put the call on Hold."
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "hold",
        ErrorCode: "7001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "resume",
        ErrorCode: "8000",
        ErrorMessage: "Resume failed- Call is not in progress",
        Cause: "There is no active call in progress.",
        Resolution: "Please ensure an active call is in progress."
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "resume",
        ErrorCode: "8001",
        ErrorMessage: "Resume failed- An invalid operation or call is not on hold",
        Cause: "Invalid operation",
        Resolution: "Please confirm that an active call is on Hold before trying to Resume."
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "resume",
        ErrorCode: "8002",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "mute",
        ErrorCode: "9000",
        ErrorMessage: "Mute failed- Call is not in progress",
        Cause: "No media stream",
        Resolution: "Please confirm that an active call is in progress."
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "mute",
        ErrorCode: "9001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "mute",
        ErrorCode: "9002",
        ErrorMessage: "Mute failed- Already muted",
        Cause: "Duplicate operation",
        Resolution: ""
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "unmute",
        ErrorCode: "10000",
        ErrorMessage: "Unmute failed- No media stream",
        Cause: "No media stream",
        Resolution: "Please confirm that an active call is in progress."
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "unmute",
        ErrorCode: "10001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "unmute",
        ErrorCode: "10002",
        ErrorMessage: "Unmute failed- Already Unmuted",
        Cause: "Duplicate operation",
        Resolution: ""
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "cancel",
        ErrorCode: "11000",
        ErrorMessage: "Cancel failed-Call has not been initiated",
        Cause: "No call to cancel in progress",
        Resolution: "Please invoke dial before invoking cancel"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "cancel",
        ErrorCode: "11001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "reject",
        ErrorCode: "12000",
        ErrorMessage: "Reject failed-Call has not been initiated",
        Cause: "No call to reject",
        Resolution: "Reject can be performed only on incoming call"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "reject",
        ErrorCode: "12001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "13000",
        ErrorMessage: "Unable to send information about this party",
        Cause: "PeerConnection Create offer failed",
        Resolution: "Please check the logs on the console"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "13001",
        ErrorMessage: "Unable to acknowledge other party",
        Cause: "PeerConnection Create answer failed",
        Resolution: "Please check the logs on the console"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "13002",
        ErrorMessage: "Local media description not accepted by connection",
        Cause: "PeerConnection setLocalDescription failed",
        Resolution: "Please check the logs on the console"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "13003",
        ErrorMessage: "Other party media description not accepted by connection",
        Cause: "PeerConnection setRemoteDescription failed",
        Resolution: "Please check the logs on the console"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "13004",
        ErrorMessage: "Negotiation for connectivity failed",
        Cause: "PeerConnection addIceCandidate failed",
        Resolution: "Please check the logs on the console"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "13005",
        ErrorMessage: "onUserMediaError",
        Cause: "Failed to get the UserMedia",
        Resolution: "Please enable Media for the browser "
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "14000",
        ErrorMessage: "Permission denied to access audio/video",
        Cause: "User denied permission",
        Resolution: "User may intentionally have denied permission, please retry the requested operation"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "14001",
        ErrorMessage: "Unsupported browser-unable to get audio/video",
        Cause: "Unsupported browser",
        Resolution: "The browser does not support Enhanced WebRTC, please use Enhanced WebRTC supported browser"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "14002",
        ErrorMessage: "Invalid input for media request",
        Cause: "Invalid media constraints",
        Resolution: "Please check the media constraints"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "15000",
        ErrorMessage: "Cannot interpret other party's state",
        Cause: "Unable to Setup Event Interceptor. Please contact support.",
        Resolution: "Please contact support"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "15001",
        ErrorMessage: "Event Channel unable to shutdown gracefully",
        Cause: "Unable to shut down event channel. Please logout and login again.",
        Resolution: "Please login again"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: "15002",
        ErrorMessage: "Event Channel got shutdown unexpectedly",
        Cause: "Event Channel stopped. Please logout and login again.",
        Resolution: "Please login again"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "associateE911Id",
        ErrorCode: "17000",
        ErrorMessage: "e911Id parameter missing",
        Cause: "Once or more required input parameter(s) are missing",
        Resolution: "Please pass E911Id as a parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "associateE911Id",
        ErrorCode: "17001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "associateE911Id",
        ErrorCode: "17002",
        ErrorMessage: "Could not update E911 Id, E911 Id could be updated only for ongoing session",
        Cause: "Precondition failed",
        Resolution: "E911 Id can be updated only for ongoing session, Please login and then update E911 Id if necessary"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "startConference",
        ErrorCode: "18000",
        ErrorMessage: "parameters missing",
        Cause: "no parameter passed ",
        Resolution: "Please pass parameters to startConference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "startConference",
        ErrorCode: "18001",
        ErrorMessage: "Invalid localMedia passed ",
        Cause: "localMedia parameter missing",
        Resolution: "Please pass localMedia as a parameter for start conference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "startConference",
        ErrorCode: "18002",
        ErrorMessage: "Invalid remoteMedia passed",
        Cause: "remoteMedia parameter missing",
        Resolution: "Please pass remoteMedia as a parameter for start conference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "startConference",
        ErrorCode: "18003",
        ErrorMessage: "Invalid mediatype passed ",
        Cause: "mediatype parameter missing",
        Resolution: "please pass mediatype as a parameter for start conference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "startConference",
        ErrorCode: "18004",
        ErrorMessage: "Internal error occurred",
        Cause: "onUserMediaError",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "startConference",
        ErrorCode: "18005",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "startConference",
        ErrorCode: "18006",
        ErrorMessage: "Cannot make second conference when first in progress",
        Cause: "conference already exists",
        Resolution: "Please End your current Conference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "startConference",
        ErrorCode: "18007",
        ErrorMessage: "User not login to make conference",
        Cause: "User not logged In",
        Resolution: "Please login before you make a conference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipant",
        ErrorCode: "19000",
        ErrorMessage: "participant parameter missing",
        Cause: "One or more required input parameter(s) are missing",
        Resolution: "Please provide participant parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipant",
        ErrorCode: "19001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "joinConference",
        ErrorCode: "20000",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "joinConference",
        ErrorCode: "20001",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking join conference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "joinConference",
        ErrorCode: "20002",
        ErrorMessage: "No conference invite",
        Cause: "Invalid operation",
        Resolution: "Cannot join conference before receiving an invite"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "rejectConference",
        ErrorCode: "22000",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "rejectConference",
        ErrorCode: "22001",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking reject conference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "rejectConference",
        ErrorCode: "22002",
        ErrorMessage: "No conference invite",
        Cause: "Invalid operation",
        Resolution: "Cannot reject conference before receiving an invite"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "getParticipants",
        ErrorCode: "21000",
        ErrorMessage: "Conference not initiated",
        Cause: "Invalid operation",
        Resolution: "Please invoke conference first before invoking getParticipants"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "getParticipants",
        ErrorCode: "21001",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "getParticipants",
        ErrorCode: "21002",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking getParticipants"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "endConference",
        ErrorCode: "23000",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "endConference",
        ErrorCode: "23001",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking endConference"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "endConference",
        ErrorCode: "23002",
        ErrorMessage: "endConference failed - Conference is not in progress",
        Cause: "Cannot end Conference before the conference is established",
        Resolution: "Allow conference to be established before trying to end"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipants",
        ErrorCode: "24000",
        ErrorMessage: "participants parameter missing",
        Cause: "One or more required input parameter(s) are missing",
        Resolution: "Please provide participants parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipants",
        ErrorCode: "24001",
        ErrorMessage: "User is not logged in",
        Cause: "One or more required input parameter(s) are not correct",
        Resolution: "Please provide participants parameter of type array"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipants",
        ErrorCode: "24002",
        ErrorMessage: "participants parameter incorrect",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking addParticipants"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipants",
        ErrorCode: "24003",
        ErrorMessage: "Conference not initiated",
        Cause: "Invalid operation",
        Resolution: "Please invoke conference first before invoking addParticipants"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipants",
        ErrorCode: "24004",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipants",
        ErrorCode: "24005",
        ErrorMessage: "Cannot invite existing participant",
        Cause: "Invalid operation",
        Resolution: "Please invite new user"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipants",
        ErrorCode: "24006",
        ErrorMessage: "Invalid input parameter",
        Cause: "Invalid phone number",
        Resolution: "Please provide valid 10 digit phone number"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addParticipants",
        ErrorCode: "24007",
        ErrorMessage: "Invalid input parameter",
        Cause: "Invalid SIP URI",
        Resolution: "Please provide valid SIP URI"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "removeParticipant",
        ErrorCode: "25000",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking removeParticipant"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "removeParticipant",
        ErrorCode: "25001",
        ErrorMessage: "removeParticipant failed - Conference is not in progress",
        Cause: "Cannot remove participant before the conference is established",
        Resolution: "Allow conference to be established before trying to remove participant"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "removeParticipant",
        ErrorCode: "25002",
        ErrorMessage: "participant parameter missing",
        Cause: "One or more required input parameter(s) are missing",
        Resolution: "Please provide participant parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "removeParticipant",
        ErrorCode: "25003",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "CleanNumber",
        ErrorCode: "26001",
        ErrorMessage: "Number Invalid",
        Cause: "Invalid PhoneNumber passed",
        Resolution: "Please check the logs and pass a valid phone number"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27000",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27001",
        ErrorMessage: "Invalid options provided",
        Cause: "Input options are not provided",
        Resolution: "Please include the required parameters"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27002",
        ErrorMessage: "parameter `localMedia` is not defined",
        Cause: "LocalMedia is not defined",
        Resolution: "Please include localMedia parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27003",
        ErrorMessage: "parameter `remoteMedia` is not defined",
        Cause: "remoteMedia is not defined",
        Resolution: "Please include remoteMedia parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27004",
        ErrorMessage: "parameter `destination` is not defined",
        Cause: "destination is not defined",
        Resolution: "Please include destination parameter"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27005",
        ErrorMessage: "Invalid input parameter",
        Cause: "Invalid phone number",
        Resolution: "Please provide valid phone number"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27006",
        ErrorMessage: "Invalid input parameter",
        Cause: "Invalid SIP URI",
        Resolution: "Please provide valid SIP URI"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27007",
        ErrorMessage: "Invalid media type",
        Cause: "Invalid media constraints",
        Resolution: "Please provide use valid Media constraints attributes"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27008",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking dial"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27009",
        ErrorMessage: "Can not make second call. There is no first call in progress.",
        Cause: "Invalid operation",
        Resolution: "Please ensure that there is an existing call in progress before making second call"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "addCall",
        ErrorCode: "27010",
        ErrorMessage: "Cannot make a third call.",
        Cause: "Trying to make a third call.",
        Resolution: "Please end one of the calls."
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "move",
        ErrorCode: "28000",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking move"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "move",
        ErrorCode: "28001",
        ErrorMessage: "Move failed - call is not in progress",
        Cause: "Cannot move. There is no active call in progress.",
        Resolution: "Please ensure an active call is in progress before trying to move the call"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "move",
        ErrorCode: "28002",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "transfer",
        ErrorCode: "29000",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "transfer",
        ErrorCode: "29001",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking transfer"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "transfer",
        ErrorCode: "29002",
        ErrorMessage: "transfer failed - call is not in progress",
        Cause: "Cannot transfer. There is no active call in progress.",
        Resolution: "Please ensure an active call is in progress before trying to transfer the call"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "transfer",
        ErrorCode: "29003",
        ErrorMessage: "Cannot make a third call",
        Cause: "Trying to make a third call",
        Resolution: "Please end one of the calls"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "transfer",
        ErrorCode: "29004",
        ErrorMessage: "Transfer failed - There is only one call in progress",
        Cause: "invalid Options",
        Resolution: "Please establish two calls before invoking transfer"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "switch",
        ErrorCode: "30000",
        ErrorMessage: "Internal error occurred",
        Cause: "Uncaught error",
        Resolution: "Please check the logs and contact support if needed"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "switch",
        ErrorCode: "30001",
        ErrorMessage: "User is not logged in",
        Cause: "Invalid operation",
        Resolution: "Please login first before invoking switch"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "switch",
        ErrorCode: "30002",
        ErrorMessage: "Switch failed - call is not in progress",
        Cause: "Cannot switch. There is no active call in progress.",
        Resolution: "Please ensure an active call is in progress before trying to invoke switch"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "switch",
        ErrorCode: "30003",
        ErrorMessage: "Switch failed - only one call is in progress",
        Cause: "Trying to invoke switch when only one call is established",
        Resolution: "Please create two calls before invoking switch"
    }];
    if (void 0 === window.ATT.utils) throw new Error("Cannot export SDK Errors into ATT.utils.ErrorStore.SDKErrors, ATT.utils namespace is undefined...\n ATT: " + JSON.stringify(window.ATT));
    window.ATT.utils.ErrorStore = {}, window.ATT.utils.ErrorStore.SDKErrors = {
        getAllSDKErrors: function() {
            var c, d, e = {};
            for (c = 0; c < b.length; c += 1) d = b[c].ErrorCode, e[d] = b[c];
            return a(e)
        }
    }
}(),
function() {
    "use strict";
    var a = [{
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: 2500,
        ErrorMessage: "System error occurred",
        PossibleCauses: "System error occurred",
        PossibleResolution: "Use the explanation to find the reason for failure.",
        APIError: "SVC0001: A service error has occurred. Error code is <error_explanation>",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 400,
        MessageId: "SVC0001"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: 2501,
        ErrorMessage: "Mandatory parameter is missing in the Request.",
        PossibleCauses: "Mandatory parameter is missing in the request.",
        PossibleResolution: "The parameter name is suggested in the error text. …message part contains the missing parameter name.",
        APIError: "SVC0002 - Invalid input value for message part <part_name>",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 400,
        MessageId: "SVC0002"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: 2502,
        ErrorMessage: "Invalid values provided for a parameter in the Request.",
        PossibleCauses: "Invalid values are passed in the Request.",
        PossibleResolution: "Pass the valid values as suggested in the error response.",
        APIError: "SVC0003 - Invalid input value for message part <part_name>, valid values are <part_values>",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 400,
        MessageId: "SVC0003"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: 2504,
        ErrorMessage: "E911 not supported for non-telephone users",
        PossibleCauses: "E911 Id is not required a parameter for this user type (account id)",
        PossibleResolution: "Please don’t pass E911 id to login for account id users",
        APIError: "SVC8510:E911 not supported for non-telephone users",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 400,
        MessageId: "SVC8510"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: 2505,
        ErrorMessage: "Valid e911Id is mandatory for mobile number or virtual number",
        PossibleCauses: "x-e911Id is missing in the request. x-e911Id is invalid.",
        PossibleResolution: "e911Id should be retrieved using E911 API and appropriately passed in the Create Session Request.",
        APIError: "SVC8511:Valid e911Id is mandatory for <part_value>",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 400,
        MessageId: "SVC8511"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: 2506,
        ErrorMessage: "Access token not associated with virtual number or account id",
        PossibleCauses: "Access token not assigned to virtual number or account id.",
        PossibleResolution: "Call associate token operation before create session for virtual number or account id scenario.",
        APIError: "SVC8512:Unassigned token associate token to virtual number or account id",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 400,
        MessageId: "SVC8512"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: 2507,
        ErrorMessage: "Token in use.",
        PossibleCauses: "A session was already created with the access token",
        PossibleResolution: "In case user abruptly closed the application, called to expire the token and receive new token.",
        APIError: "SVC8513:Token in use.",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 400,
        MessageId: "SVC8513"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: 2508,
        ErrorMessage: "Access token is invalid.",
        PossibleCauses: "Access Token is incorrect or invalid. Access token is not authorized for the Enhanced WebRTC scope.",
        PossibleResolution: "Re-authenticate and retrieve the correct access token.",
        APIError: "POL0001:A policy error occurred.",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 401,
        MessageId: "POL0001"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: 2509,
        ErrorMessage: "Invalid token",
        PossibleCauses: "Access Token is incorrect or invalid.",
        PossibleResolution: "Re-Authenticate and retrieve the correct access token for Enhanced WebRTC",
        APIError: "POL0002:Privacy verification failed for address <address> request is refused",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 403,
        MessageId: "POL0002"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: 2510,
        ErrorMessage: "Not implemented",
        PossibleCauses: "Reserved for future use",
        PossibleResolution: "Reserved for future use",
        APIError: "POL0003:Too many addresses specified in Message part",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 403,
        MessageId: "POL0003"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "*",
        ErrorCode: 2511,
        ErrorMessage: "User has not been provisioned for Enhanced WebRTC",
        PossibleCauses: "User has not been provisioned for Enhanced WebRTC service",
        PossibleResolution: "End user needs to provide consent to get provisioned.",
        APIError: "POL1009:User has not been provisioned for %1",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 403,
        MessageId: "POL1009"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "login",
        ErrorCode: 2512,
        ErrorMessage: "Number of Session exceeds the allowed limit.",
        PossibleCauses: "For virtual number and account id users: Since virtual number is assigned to a specific user.Max number of sessions is defined by the network.",
        PossibleResolution: "For virtual number and account id scenario, contact Administrator.",
        APIError: "POL1100:Max number of session exceeded allowed limit %1",
        ResourceMethod: "POST /RTC/v1/sessions",
        HttpStatusCode: 403,
        MessageId: "POL1100"
    }, {
        JSObject: "ATT.rtc",
        JSMethod: "logout",
        ErrorCode: 3507,
        ErrorMessage: "Session Id is not associated with the Access Token passed in the request.",
        PossibleCauses: "Access Token that was passed in the Request is not mapped to the Session Id.",
        PossibleResolution: "Use the same Access Token that was initially passed in.",
        APIError: "POL1102:Session Id not associated with the token",
        ResourceMethod: "DELETE /RTC/v1/sessions/{sessionid}",
        HttpStatusCode: 403,
        MessageId: "POL1102"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "answer",
        ErrorCode: 5504,
        ErrorMessage: "Duplicate Request",
        PossibleCauses: "A media modification is in progress for the callId.",
        PossibleResolution: "Complete the In-Progress Media modification before initiating another request.",
        APIError: "SVC8501: Call <callid> in progress",
        ResourceMethod: "PUT /RTC/v1/sessions/{sessionid}/calls/{callid}",
        HttpStatusCode: 409,
        MessageId: "SVC8501"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "hold",
        ErrorCode: 7508,
        ErrorMessage: "Duplicate Request",
        PossibleCauses: "A media modification is in progress for the callId.",
        PossibleResolution: "Complete the In-Progress Media modification before initiating another request.",
        APIError: "SVC8501: Call <callid> in progress",
        ResourceMethod: "PUT /RTC/v1/sessions/{sessionid}/calls/{callid}",
        HttpStatusCode: 409,
        MessageId: "SVC8501"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "resume",
        ErrorCode: 8508,
        ErrorMessage: "Duplicate request",
        PossibleCauses: "A media modification is in progress for the callId.",
        PossibleResolution: "Complete the In-Progress Media modification before initiating another request.",
        APIError: "SVC8501: Call <callid> in progress",
        ResourceMethod: "PUT /RTC/v1/sessions/{sessionid}/calls/{callid}",
        HttpStatusCode: 409,
        MessageId: "SVC8501"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "createE911Id",
        ErrorCode: 16503,
        ErrorMessage: "Address provided by the end user is not geo codable.",
        PossibleCauses: "The address provided is unreachable.",
        PossibleResolution: "Correct the portion of address as per the error text and retry.",
        APIError: "SVC0015: Address is not valid address for E911 routing.Reason",
        ResourceMethod: "POST emergencyServices/v1/e911Location",
        HttpStatusCode: 400,
        MessageId: "SVC0015"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "createE911Id",
        ErrorCode: 16504,
        ErrorMessage: "The address provided is not present in the System.",
        PossibleCauses: "The address provided is not present in the System.",
        PossibleResolution: "Confirm the address by setting isAddressConfirmed to true and retry.",
        APIError: "SVC0016: Address Confirmation Required ",
        ResourceMethod: "POST emergencyServices/v1/e911Location",
        HttpStatusCode: 400,
        MessageId: "SVC0016"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "createE911Id",
        ErrorCode: 16505,
        ErrorMessage: "System is unavailable to process the request.",
        PossibleCauses: "System is unavailable to process the request.",
        PossibleResolution: "Please try again later.",
        APIError: "SVC0017: NENA provider system is not available.",
        ResourceMethod: "POST emergencyServices/v1/e911Location",
        HttpStatusCode: 400,
        MessageId: "SVC0017"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "createE911Id",
        ErrorCode: 16506,
        ErrorMessage: "System is available but could not process the request.",
        PossibleCauses: "System is available but could not process the request.",
        PossibleResolution: "Please contact system administrator.",
        APIError: "SVC0018: NENA provider system error",
        ResourceMethod: "POST emergencyServices/v1/e911Location",
        HttpStatusCode: 400,
        MessageId: "SVC0018"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "createE911Id",
        ErrorCode: 16507,
        ErrorMessage: "Access token is invalid.",
        PossibleCauses: "1. Access Token is incorrect or in valid.?2. Access token is not authorized for the Enhanced WebRTC scope.",
        PossibleResolution: "Re-Authenticate and retrieve the correct access token.",
        APIError: "POL0001: A policy error occurred. For example, rate…it error, authentication and authorization errors",
        ResourceMethod: "POST emergencyServices/v1/e911Location",
        HttpStatusCode: 401,
        MessageId: "POL0001"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "createE911Id",
        ErrorCode: 16508,
        ErrorMessage: "Invalid token",
        PossibleCauses: "Access Token is incorrect or in valid.",
        PossibleResolution: "Re-Authenticate and retrieve the correct access token for Enhanced WebRTC",
        APIError: "POL0002: Privacy verification failed for address <address> request is refused",
        ResourceMethod: "POST emergencyServices/v1/e911Location",
        HttpStatusCode: 403,
        MessageId: "POL0002"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "createE911Id",
        ErrorCode: 16509,
        ErrorMessage: "Not implemented",
        PossibleCauses: "Reserved for future use",
        PossibleResolution: "Reserved for future use",
        APIError: "POL0003: Too many addresses specified in Message part",
        ResourceMethod: "POST emergencyServices/v1/e911Location",
        HttpStatusCode: 403,
        MessageId: "POL0003"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "createE911Id",
        ErrorCode: 16511,
        ErrorMessage: "System error occurred",
        PossibleCauses: "System error occurred",
        PossibleResolution: "Use the explanation to find the reason for failure.",
        APIError: "SVC0001: A service error has occurred. Error code is <error_explanation>",
        ResourceMethod: "POST emergencyServices/v1/e911Location",
        HttpStatusCode: 400,
        MessageId: "SVC0001"
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: 500,
        ErrorMessage: "<method name> failed - Unable to complete requested operation",
        PossibleCauses: "System error occurred",
        PossibleResolution: "Use the explanation to find the reason for failure.",
        APIError: "Populated from API response if available",
        ResourceMethod: "METHOD: Resource URL",
        HttpStatusCode: 500,
        MessageId: ""
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: 502,
        ErrorMessage: "<method name> failed - Unable to complete requested operation",
        PossibleCauses: "Please look into API Error",
        PossibleResolution: "Please look into API Error",
        APIError: "Populated from API response if available",
        ResourceMethod: "METHOD: Resource URL",
        HttpStatusCode: 502,
        MessageId: ""
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: 503,
        ErrorMessage: "<method name> failed - Unable to complete requested operation",
        PossibleCauses: "Bad Gateway",
        PossibleResolution: "Please look into API Error",
        APIError: "Populated from API response if available",
        ResourceMethod: "METHOD: Resource URL",
        HttpStatusCode: 503,
        MessageId: ""
    }, {
        JSObject: "ATT.rtc.Phone",
        JSMethod: "*",
        ErrorCode: 504,
        ErrorMessage: "<method name> failed - Unable to complete requested operation",
        PossibleCauses: "Service Unavailable",
        PossibleResolution: "Please look into API Error",
        APIError: "Populated from API response if available",
        ResourceMethod: "METHOD: Resource URL",
        HttpStatusCode: 504,
        MessageId: ""
    }];
    if (void 0 === window.ATT.utils.ErrorStore) throw new Error("Cannot export SDK Errors into ATT.utils.ErrorStore.APIErrors, ATT.utils.ErrorStore namespace is undefined.\n ATT: " + JSON.stringify(window.ATT));
    window.ATT.utils.ErrorStore.APIErrors = {
        getAllAPIErrors: function() {
            return a
        }
    }
}(),
function() {
    "use strict";

    function a(a, b) {
        function c(a) {
            return a.formatError = function() {
                var b = a.JSObject + "-" + a.JSMethod + "-" + a.ErrorCode + "-" + a.ErrorMessage + "-" + a.PossibleCauses + "-" + a.PossibleResolution + "-" + a.APIError + "-" + a.ResourceMethod + "-" + a.HttpStatusCode + "-" + a.MessageId;
                return b
            }, a
        }

        function d(a) {
            return a.getId = function() {
                var b = a.ErrorCode;
                return b
            }, a
        }

        function e(a) {
            return a.getAPIErrorByMethodStatusMsgId = function() {
                var b = a.JSMethod + a.HttpStatusCode + a.MessageId;
                return b
            }, a
        }
        var f, g = {
                JSObject: "",
                JSMethod: "",
                ErrorCode: "",
                ErrorMessage: "",
                PossibleCauses: "",
                PossibleResolution: "",
                APIError: "",
                ResourceMethod: "",
                HttpStatusCode: "",
                MessageId: ""
            };
        return f = Object.create(g), f = b.extend(f, a), f = c(f), f = d(f), f = e(f)
    }

    function b(b, c) {
        var d = ATT.utils,
            e = null,
            f = 0,
            g = [],
            h = c.length;
        for (f = 0; h > f; f += 1) e = a(c[f], d), g[e.getId()] = e, g[e.getAPIErrorByMethodStatusMsgId()] = e;
        return {
            createError: function(b) {
                return a(b, d)
            },
            getSDKError: function(a) {
                return b[a]
            },
            getError: function(a) {
                return g[a]
            },
            getAPIError: function(a, b, c) {
                var d = g[a + b + c];
                return d || (d = g["*" + b + c], d && (d.JSMethod = a)), d
            },
            getDefaultError: function(b) {
                return a(b, d)
            }
        }
    }
    var c;
    c = typeof module, "undefined" !== c && module.exports ? module.exports = b : console.debug("Not exporting to NodeJS...");
    try {
        window.ATT.utils.createErrorDictionary = b
    } catch (d) {
        throw new Error("Error while exporting ATT.errorDictionary.\n ATT = ", JSON.stringify(window.ATT) + "Original Message: " + d.message)
    }
}(),
function() {
    "use strict";

    function a(a) {
        d.logDebug("ATT.private.error: parseAPIErrorResponse"), d.logInfo("Parses the error response and checks for Type"), d.logTrace(a);
        var b, c = a.getJson(),
            e = {};
        return c.RequestError ? (c.RequestError.ServiceException ? e = {
            APIError: c.RequestError.ServiceException.MessageId + ":" + c.RequestError.ServiceException.Text + ",Variables=" + c.RequestError.ServiceException.Variables,
            MessageId: c.RequestError.ServiceException.MessageId
        } : c.RequestError.PolicyException ? e = {
            APIError: c.RequestError.PolicyException.MessageId + ":" + c.RequestError.PolicyException.Text + ",Variables=" + c.RequestError.PolicyException.Variables,
            MessageId: c.RequestError.PolicyException.MessageId
        } : c.RequestError.Exception && (e = {
            APIError: (c.RequestError.Exception.MessageId || "") + ":" + c.RequestError.Exception.Text + ",Variables=" + c.RequestError.Exception.Variables || "",
            MessageId: c.RequestError.Exception.MessageId
        }), e.ResourceMethod = a.getResourceURL(), e.HttpStatusCode = a.getResponseStatus(), e.APIError || (e.APIError = a.responseText, e.MessageId = "", d.logError("Unable to parse API Error. Response is empty :" + a)), d.logTrace("return: " + e), e) : (a.getResponseStatus() >= 500 ? (b = "" !== a.getJson() ? JSON.stringify(a.getJson()) : a.responseText, e = ATT.errorDictionary.getAPIError("*", a.getResponseStatus(), ""), e.APIError = b, d.logError("Service Unavailable"), d.logError(a), d.logError(e)) : (e = {
            APIError: a.responseText
        }, d.logError(a), d.logError(e)), e.ResourceMethod = a.getResourceURL(), e.HttpStatusCode = a.getResponseStatus(), d.logTrace("return:" + e), e)
    }

    function b(a, b, c, e) {
        d.logDebug("ATT.private.error: createAPIErrorCode"), d.logInfo("Parses the error response and checks for Type"), d.logTrace("methodName: " + c), d.logTrace("moduleId: " + e), d.logTrace("raw error", a);
        var f, g;
        return void 0 !== a.HttpStatusCode ? g = a : void 0 !== a.errorDetail.HttpStatusCode && (g = a.errorDetail), c = c || "GeneralOperation", e = e || "RTC", 0 !== g.HttpStatusCode ? (f = ATT.errorDictionary.getAPIError(c, g.HttpStatusCode, g.MessageId), void 0 !== f && (f.APIError = g.APIError, f.HttpStatusCode = g.HttpStatusCode, f.MessageId = g.MessageId, f.ResourceMethod = g.ResourceMethod)) : f = g, f || (d.logError("Error not found in Error dictionary "), d.logError(a), f = ATT.errorDictionary.getDefaultError({
            JSObject: b,
            ErrorCode: e + "-UNKNOWN",
            JSMethod: c,
            HttpStatusCode: a.HttpStatusCode || "Unknown",
            ErrorMessage: c + " failed",
            APIError: g.APIError || a.responseText,
            PossibleCauses: "Please look into APIError",
            PossibleResolution: "Please look into APIError",
            MessageId: g.MessageId || "",
            ResourceMethod: g.ResourceMethod || a.getResourceURL()
        }), d.logError("Generating Missing error response:" + f)), f
    }
    var c = ATT.logManager.getInstance(),
        d = c.getLoggerByName("att.private.error");
    if (d.setLevel(c.logLevel.WARNING), d.logDebug("Initializing error module"), void 0 === ATT["private"]) throw new Error("Error exporting ATT.private.error");
    ATT["private"].error = {
        parseAPIErrorResponse: a,
        createAPIErrorCode: b
    }
}(),
function() {
    "use strict";

    function a(a) {
        if (d.logDebug("ATT.rtc: configure"), d.logTrace("options", a), d.logDebug("Configuring the SDK"), void 0 === a || 0 === Object.keys(a).length) throw new Error("No options provided");
        b.app.setAppConfiguration(a)
    }
    var b = ATT["private"].config,
        c = ATT.logManager.getInstance(),
        d = c.addLoggerForModule("att.rtc");
    d.setLevel(c.logLevel.WARNING), d.logDebug("Loading att.rtc..."), ATT.rtc.configure = a
}(),
function() {
    "use strict";

    function a() {
        if (g.logDebug("ATT.rtc: hasWebRTC"), g.logInfo("Checking if Enhanced WebRTC is supported"), "function" == typeof navigator.mozGetUserMedia || "function" == typeof navigator.webkitGetUserMedia || "function" == typeof navigator.getUserMedia) {
            var a, b, c = e.app.getBrowserSupport(),
                d = h.getBrowserName(),
                f = h.getBrowserVersion(),
                i = !1,
                j = !1;
            if (g.logInfo("Browser: " + d), g.logInfo("Version: " + f), 0 < c.supported.length && 0 < c.not_certified.length) {
                if (0 <= c.supported.length)
                    for (b = 0; b < c.supported.length; b += 1) a = c.supported[b], d === a.name && (i = !0, void 0 !== a.version && (void 0 !== a.version.min && a.version.min > Number.parseInt(f) && (i = !1), void 0 !== a.version.max && a.version.max < Number.parseInt(f) && (i = !1)));
                if (i) return g.logInfo("Browser supported"), "Supported";
                if (0 <= c.not_certified.length)
                    for (b = 0; b < c.not_certified.length; b += 1) a = c.not_certified[b], d === a.name && (j = !0, void 0 !== a.version && (void 0 !== a.version.min && a.version.min > Number.parseInt(f) && (j = !1), void 0 !== a.version.max && a.version.max < Number.parseInt(f) && (j = !1)));
                if (j) return g.logWarning("Browser not certified"), "Not Certified"
            }
        }
        return g.logError("Browser not supported"), "Not Supported"
    }

    function b() {
        return "undefined" !== navigator ? window.isNavigatorOnline() ? !0 : !1 : void 0
    }

    function c() {
        return window.navigator.onLine
    }

    function d() {
        return e.app.getBrowserSupport()
    }
    var e = ATT["private"].config,
        f = ATT.logManager.getInstance(),
        g = f.addLoggerForModule("att.browser"),
        h = ATT.utils;
    if (g.setLevel(f.logLevel.WARNING), g.logDebug("Loading att.browser..."), window.isNavigatorOnline = c, void 0 === ATT.browser) throw new Error("Error exporting ATT.browser methods");
    ATT.browser.hasWebRTC = a, ATT.browser.isNetworkConnected = b, ATT.browser.getBrowserSupport = d
}(),
function() {
    "use strict";

    function a(a) {
        function g(a, b) {
            f.logDebug("ATT.private.resourceManager: createRESTConfiguration"), f.logInfo("Creating REST configuration..."), f.logTrace("operationConfig", a), f.logTrace("options", b);
            var d, e, g, h, i, j, k, l;
            if (d = c.extend({}, a), e = a.formatters || {}, g = Object.keys(e).length, e && g > 0) {
                if (void 0 === b.params || g !== Object.keys(b.params).length) throw f.logError("Params passed in must match number of formatters"), f.logTrace("formatters", e), f.logTrace("params", b.params), new Error("Params passed in must match number of formatters.");
                if (e.method && !b.params.method) throw f.logError("Missing method parameter for the method formatter."), new Error("Missing method parameter for the method formatter.");
                if (e.url && !b.params.url) throw f.logError("Missing URL parameter for the URL formatter."), new Error("Missing URL parameter for the URL formatter.");
                if (e.headers && Object.keys(b.params.headers).length !== Object.keys(a.formatters.headers).length) throw f.logError("Header formatters in APIConfigs do not match header parameters provided."), new Error("Header formatters in APIConfigs do not match the header parameters being passed in.");
                if ("string" == typeof e.method && (d.method = b.params.method || a.formatters.method, f.logInfo("updated restConfig method"), f.logTrace("restConfig.method", d.method)), "function" == typeof e.url && (d.url = a.formatters.url(b.params.url), f.logInfo("updated restConfig url"), f.logTrace("restConfig.url", d.url)), "object" == typeof e.headers && Object.keys(e.headers).length > 0) {
                    l = {}, f.logInfo("Configuring request headers...");
                    for (h in b.params.headers)
                        if (b.params.headers.hasOwnProperty(h)) {
                            if ("options" === h && "object" == typeof a.formatters.headers[h]) {
                                if (0 === Object.keys(b.params.headers[h]).length) throw f.logError("Options for header not passed in. Cannot construct request"), new Error("Options for header not passed in. Cannot construct request");
                                k = Object.keys(b.params.headers[h])[0], i = a.formatters.headers[h][k], j = b.params.headers[h][k], h = k
                            } else i = a.formatters.headers[h], j = b.params.headers[h];
                            l[h] = i(j), f.logTrace(h, l[h])
                        }
                    d.headers = ATT.utils.extend({}, d.headers), d.headers = ATT.utils.extend(d.headers, l), f.logTrace("restConfig.headers", d.headers)
                }
            }
            return b.data && (d.data = b.data), f.logTrace("restConfig", d), d
        }

        function h(a) {
            function c(c, e, g) {
                f.logDebug("restOperation");
                var h;
                b = ATT.errorDictionary, a.success = c, a.error = function(a) {
                    0 === a.getResponseStatus() && "" === a.responseText ? (a.errorDetail = b.getSDKError("0003"), a.errorDetail.HttpStatusCode = a.getResponseStatus(), a.errorDetail.ResourceMethod = a.getResourceURL(), e.call(this, a.errorDetail)) : (a.errorDetail = d.parseAPIErrorResponse(a), e.call(this, a.errorDetail))
                }, a.ontimeout = function() {
                    var c = {};
                    c.errorDetail = b.getSDKError("0003"), c.errorDetail.HttpStatusCode = 0, c.errorDetail.ResourceMethod = a.url, g ? g.call(this, c.errorDetail) : e.call(this, c.errorDetail)
                }, h = new ATT.RESTClient(a), h.ajax()
            }
            return f.logDebug("ATT.private.resourceManager: createRESTOperation"), f.logInfo("Creating REST Operation..."), f.logTrace("restConfig", a), c
        }

        function i(a, b) {
            f.logDebug("ATT.private.resourceManager: getOperation"), f.logTrace("operationName", a), f.logTrace("operationOpts", b);
            var c, d, e, i;
            if (i = l.getAPIConfiguration(), c = i[a], void 0 === c) throw new Error("Operation not found.");
            if (void 0 === b) throw new Error("No options found.");
            return d = g(c, b), e = h(d)
        }

        function j(a, b) {
            if (f.logDebug("ATT.private.resourceManager: doOperation"), f.logTrace("operationName", a), f.logTrace("operationConfig", b), void 0 === a || 0 === a.length) throw f.logError("no operation name provided"), new Error("Must specify an operation name.");
            if (void 0 === b || 0 === Object.keys(b).length) throw new Error("No options found.");
            if (void 0 === b.success) throw new Error("No `success` callback passed.");
            if ("function" != typeof b.success) throw new Error("`success` callback has to be a function.");
            if (void 0 === b.error) throw new Error("No `error` callback passed.");
            if ("function" != typeof b.error) throw new Error("`error` callback has to be a function.");
            try {
                var c = i(a, b);
                f.logInfo("About to perform operation " + a), c(b.success, b.error, b.ontimeout)
            } catch (d) {
                throw f.logError("Error performing operation: " + a), f.logTrace(d), d
            }
        }

        function k() {
            return f.logDebug("ATT.private.resourceManager: getRestOperationsConfig"), l.getAPIConfiguration()
        }
        f.setLevel(e.logLevel.WARNING), f.logDebug("ATT.private.factories: createResourceManager"), f.logInfo("Creating resource manager..."), f.logTrace("apiConfig", a);
        var l;
        if (void 0 === a || 0 === Object.keys(a).length) throw new Error("No API configuration passed");
        if (void 0 === a.getAPIConfiguration) throw new Error("No `getAPIConfiguration` method found.");
        return l = a, {
            doOperation: j,
            getRestOperationsConfig: k
        }
    }
    var b, c = ATT.utils,
        d = ATT["private"].error,
        e = ATT.logManager.getInstance(),
        f = e.addLoggerForModule("att.private.resource-manager");
    if (f.setLevel(e.logLevel.WARNING), f.logDebug("Loading att.private.resource-manager..."), void 0 === ATT["private"].factories) throw new Error("Error exporting `createResourceManager`");
    ATT["private"].factories.createResourceManager = a
}(),
function() {
    "use strict";

    function a(a) {
        function f(a) {
            if (c.logDebug("ATT.utils.event-channel: processMessages"), c.logInfo("Processing events..."), c.logTrace("messages", a), n = JSON.parse(u ? a.responseText : a.data), c.logTrace("eventData", n), n.events) {
                c.logInfo("Publish events individually");
                var b, d = n.events.eventList;
                for (b in d) d.hasOwnProperty(b) && (c.logTrace("eventObject", d[b].eventObject), r.publish("api-event", d[b].eventObject))
            }
        }

        function g() {
            c.logDebug("ATT.utils.event-channel: stopListening"), c.logInfo("Stop listening to event channel"), t = !1
        }

        function h(a, b) {
            if (c.logDebug("ATT.utils.event-channel: on"), c.logInfo("Subscribing to event-channel event " + a), "api-event" !== a && "channel-error" !== a) throw c.logError("Event not defined"), new Error("Event not defined");
            if ("function" != typeof b) throw c.logError("Handler is not a function"), new Error("Handler is not a function");
            r.unsubscribe(a, b), r.subscribe(a, b, this)
        }

        function i(b, d) {
            c.logDebug("ATT.utils.event-channel: retry"), c.logInfo("Retry polling ..."), c.logTrace("config", b), c.logTrace("error", d), 204 !== d.HttpStatusCode ? (c.logInfo("Response code was: " + d.HttpStatusCode), c.logInfo("Re-polling...")) : 0 === d.HttpStatusCode ? (c.logInfo("Request timed out"), c.logInfo("Re-polling...")) : (c.logInfo("Response code was: " + d.HttpStatusCode), c.logInfo("Re-polling...")), setTimeout(function() {
                c.logInfo("Continue polling..."), a.resourceManager.doOperation(x, s)
            }, 0)
        }

        function j(b) {
            c.logDebug("ATT.utils.event-channel: startListening"), c.logInfo("Start listening to event channel..."), c.logTrace("config", b), t = !0, s = {
                params: {
                    method: u ? "GET" : "POST",
                    url: {
                        sessionId: a.sessionId,
                        eventChannelUri: u ? "events" : "websockets"
                    },
                    headers: {
                        Authorization: a.accessToken
                    }
                },
                success: o.bind(this, b),
                error: p.bind(this, b),
                ontimeout: q.bind(this, b)
            }, a.resourceManager.doOperation(x, s)
        }
        c.setLevel(b.logLevel.WARNING), c.logDebug("ATT.utils.event-channel: createEventChannel"), c.logInfo("Creating event channel..."), c.logTrace("channelConfig", a);
        var k, l, m, n, o, p, q, r, s = {}, t = !1,
            u = !0,
            v = 2e3,
            w = 3e5,
            x = "getEvents";
        if (void 0 === a || 0 === Object.keys(a).length) throw c.logError("No options"), new Error("No options");
        if (void 0 === a.accessToken) throw c.logError("No Access Token"), new Error("No Access Token");
        if (void 0 === a.sessionId) throw c.logError("NO Session Id"), new Error("No Session Id");
        if (void 0 === a.resourceManager) throw c.logError("No Resource Manager"), new Error("No Resource Manager");
        return void 0 !== a.interval && (c.logInfo("Configuring interval"), c.logTrace("interval", a.interval), v = a.interval), void 0 !== a.maxPollingTime && (c.logInfo("Configuring maximum polling time"), c.logTrace("maxPollingTime", a.maxPollingTime), w = a.maxPollingTime), "WebSockets" === a.channelType && (c.logInfo("Setting long polling to false for WebSockets"), c.logTrace("channelType", a.channelType), u = !1), r = d.createEventEmitter(), c.logTrace("event-channel / operationConfig: "), c.logTrace(s), o = function(b, d) {
            return c.logDebug("createEventChannel: onSuccess"), c.logInfo("Successfully created event channel"), c.logTrace("response", d), "function" == typeof b.success && (c.logInfo("Successfully got response from event channel"), b.success("Successfully got response from event channel")), t ? u ? (c.logInfo("Processing messages..."), 200 === d.getResponseStatus() && (f(d), c.logInfo("Messages processed, Re-polling..."), c.logTrace("response", d)), void setTimeout(function() {
                c.logInfo("Continue polling..."), a.resourceManager.doOperation(x, s)
            }, 0)) : (m = d.getResponseHeader("location"), c.logInfo("Channel sockets"), c.logTrace("locationForSocket", m), void(void 0 === l && m && (l = new WebSocket(m), l.onmessage = function(a) {
                c.logDebug("createEventChannel: onMessage"), c.logInfo("Message received"), c.logTrace("message", a), f(a)
            }))) : void c.logInfo("Not processing response because event channel is not running")
        }, p = function(a, b) {
            if (t) {
                if (c.logDebug("createEventChannel: onError"), c.logError("Error creating event channel"), c.logTrace("config", a), c.logInfo("Re-polling..."), v = 2 * v, v > w) return c.logInfo("Stopping event channel, maximum polling time reached"), c.logTrace("interval", v), c.logTrace("maxPollingTime", w), g(), void r.publish("channel-error", e.createAPIErrorCode(b, "ATT.rtc.Phone", "events", "RTC"));
                i(a, b)
            } else c.logError("Error running event channel"), c.logTrace("error", b)
        }, q = function(a, b) {
            c.logDebug("createEventChannel: onTimeOut"), c.logTrace("config", a), c.logTrace("error", b), t && (c.logError("Request timed out"), i(a, b))
        }, k = {
            isListening: function() {
                return t
            },
            startListening: j,
            stopListening: g,
            on: h
        }
    }
    var b = ATT.logManager.getInstance(),
        c = b.addLoggerForModule("ATT.utils.event-channel"),
        d = ATT["private"].factories,
        e = ATT["private"].error;
    if (b.updateLogLevel("ATT.utils.event-channel", b.logLevel.WARNING), void 0 === ATT["private"].factories) throw c.logError("Error exporting `createEventChannel`"), new Error("Error exporting `createEventChannel`");
    ATT["private"].factories.createEventChannel = a
}(),
function() {
    "use strict";

    function a(a) {
        function f(a) {
            e.logDebug("ATT.event-manager: processEvent"), e.logInfo("Processing the events coming from event channel");
            var b, d, f, g;
            if (!a) return void e.logError("Not able to consume null event...");
            switch (e.logDebug("Consumed event from event channel:"), void 0 !== a.type && e.logTrace("type:", a.type), void 0 !== a.from && e.logTrace("from:", a.from), void 0 !== a.state && e.logTrace("state:", a.state), void 0 !== a.sdp && e.logTrace("Event SDP", a.sdp), d = "calls" === a.type ? "call" : "conference", f = a.resourceURL.split("/")[4], g = a.resourceURL.split("/")[6], (a.state === c.API_EVENT.SESSION_OPEN || a.state === c.API_EVENT.SESSION_MODIFIED) && a.sdp && -1 !== a.sdp.indexOf("m=video 0") && -1 === a.sdp.indexOf("a=inactive") && (-1 === a.sdp.indexOf("c=IN IP4 0.0.0.0") && (a.sdp = a.sdp.replace("sendrecv", "inactive")), a.sdp = a.sdp.replace("c=IN IP4 0.0.0.0", "a=inactive")), e.logTrace("Event state", a.state), a.state) {
                case c.API_EVENT.INVITATION_RECEIVED:
                    b = ATT.sdpFilter.getInstance().getCodecfromSDP(a.sdp), o.publish(c.API_EVENT.INVITATION_RECEIVED + ":" + f, {
                        type: d,
                        id: g,
                        from: a.from,
                        mediaType: 1 === b.length ? "audio" : "video",
                        sdp: a.sdp
                    });
                    break;
                case c.API_EVENT.MODIFICATION_RECEIVED:
                    o.publish(c.API_EVENT.MODIFICATION_RECEIVED + ":" + g, {
                        id: g,
                        remoteSdp: a.sdp,
                        modificationId: a.modId
                    });
                    break;
                case c.API_EVENT.MODIFICATION_TERMINATED:
                    o.publish(c.API_EVENT.MODIFICATION_TERMINATED + ":" + g, {
                        id: g,
                        type: d,
                        remoteSdp: a.sdp,
                        modificationId: a.modId,
                        reason: a.reason,
                        from: a.from
                    });
                    break;
                case c.API_EVENT.SESSION_OPEN:
                    void 0 !== a.sdp && (b = ATT.sdpFilter.getInstance().getCodecfromSDP(a.sdp)), o.publish(c.API_EVENT.SESSION_OPEN + ":" + g, {
                        type: d,
                        id: g,
                        remoteSdp: a.sdp,
                        mediaType: b ? 1 === b.length ? "audio" : "video" : null,
                        codec: b || null,
                        provisionalSdp: a.provisionalSDP
                    });
                    break;
                case c.API_EVENT.SESSION_MODIFIED:
                    o.publish(c.API_EVENT.SESSION_MODIFIED + ":" + g, {
                        type: d,
                        id: g,
                        remoteSdp: a.sdp
                    });
                    break;
                case c.API_EVENT.TRANSFER_INITIATED:
                    o.publish(c.API_EVENT.TRANSFER_INITIATED + ":" + g, {
                        type: d,
                        id: g,
                        from: a.from,
                        transferToCallId: a.transferToCallId
                    });
                    break;
                case c.API_EVENT.TRANSFER_TERMINATED:
                    o.publish(c.API_EVENT.TRANSFER_TERMINATED + ":" + g, {
                        type: d,
                        id: g,
                        from: a.from,
                        transferToCallId: a.transferToCallId,
                        reason: a.reason
                    });
                    break;
                case c.API_EVENT.SESSION_TERMINATED:
                    o.publish(c.API_EVENT.SESSION_TERMINATED + ":" + g, {
                        type: d,
                        id: g,
                        from: a.from,
                        reason: a.reason
                    });
                    break;
                default:
                    e.logError("Unrecognized event state: " + a.state)
            }
        }

        function g(a) {
            e.logDebug("ATT.event-manager: setupEventChannel"), e.logInfo("Setting up the event channel"), e.logTrace(a);
            var c = {
                accessToken: a.token,
                sessionId: a.sessionId,
                publisher: o,
                resourceManager: n,
                channelType: l
            };
            m = b.createEventChannel(c), m && (e.logInfo("Event channel up and running"), m.on("api-event", function(a) {
                f(a)
            }), m.on("channel-error", function(b) {
                a.onError(b)
            }), e.logInfo("Subscribed to api-event from event channel"), m.startListening({
                success: function(a) {
                    e.logDebug("startListening: success"), e.logInfo("successfully started listening"), e.logTrace(a)
                },
                error: a.onError
            })), o.publish("listening")
        }

        function h() {
            e.logDebug("ATT.event-manager: stop"), e.logInfo("stop listening"), m && (m.stopListening(), e.logInfo("Event channel shutdown successfully")), o.publish("stop-listening")
        }

        function i(a, b) {
            e.logDebug("ATT.event-manager: off"), e.logInfo("Unsubscribing from event-manager event: " + a), o.unsubscribe(a, b)
        }

        function j(a, b) {
            if (e.logDebug("ATT.rtc.RTCManager: on"), e.logInfo("Subscribing to event-manager event: " + a), "listening" !== a && "stop-listening" !== a && a.indexOf(c.API_EVENT.INVITATION_RECEIVED + ":") < 0 && a.indexOf(c.API_EVENT.SESSION_OPEN + ":") < 0 && a.indexOf(c.API_EVENT.SESSION_MODIFIED + ":") < 0 && a.indexOf(c.API_EVENT.MODIFICATION_RECEIVED + ":") < 0 && a.indexOf(c.API_EVENT.MODIFICATION_TERMINATED + ":") < 0 && a.indexOf(c.API_EVENT.SESSION_TERMINATED + ":") < 0 && a.indexOf(c.API_EVENT.TRANSFER_INITIATED) < 0 && a.indexOf(c.API_EVENT.TRANSFER_TERMINATED) < 0) throw e.logError("Event " + a + " not found"), new Error("Event " + a + " not found");
            o.unsubscribe(a, b), o.subscribe(a, b)
        }

        function k(a) {
            if (e.logDebug("ATT.event-manager: setup"), e.logInfo("Setting up the event channel"), e.logTrace(a), void 0 === a) throw e.logError("Options not defined"), new Error("Options not defined");
            if (void 0 === a.sessionId) throw e.logError("Session id is not defined"), new Error("Session id is not defined");
            if (void 0 === a.token) throw e.logError("Token not defined"), new Error("Token not defined");
            g(a)
        }
        e.setLevel(d.logLevel.WARNING), e.logDebug("ATT.event-manager: createEventManager"), e.logTrace(a);
        var l, m, n, o;
        if (e.logDebug("createEventManager"), void 0 === a || 0 === Object.keys(a).length) throw e.logError("Invalid options"), new Error("Invalid options");
        if (void 0 === a.resourceManager) throw e.logError("Must pass `options.resourceManager`"), new Error("Must pass `options.resourceManager`");
        if (void 0 === a.eventChannelType) throw e.logError("Must pass `options.eventChannelType`"), new Error("Must pass `options.eventChannelType`");
        return l = a.eventChannelType, n = a.resourceManager, o = b.createEventEmitter(), {
            on: j,
            off: i,
            setup: k,
            stop: h
        }
    }
    var b = ATT["private"].factories,
        c = ATT["private"]["enum"],
        d = ATT.logManager.getInstance(),
        e = d.getLoggerByName("att.event-manager");
    if (void 0 === ATT["private"].factories) throw new Error("Error exporting createEventManager");
    ATT["private"].factories.createEventManager = a
}(),
function() {
    "use strict";

    function a(a) {
        function d(a) {
            g.logDebug("ATT.private.RTCManager: extractSessionInformation"), g.logTrace("responseObject", a);
            var b = null,
                c = null;
            if (a && (a.getResponseHeader("Location") && (b = a.getResponseHeader("Location").split("/")[4]), a.getResponseHeader("x-expires") && (c = a.getResponseHeader("x-expires"), c = Number(c), c = isNaN(c) ? 0 : 1e3 * c)), !b) throw "Failed to retrieve session id";
            return {
                sessionId: b,
                timeout: c
            }
        }

        function i(a, b) {
            g.logDebug("ATT.private.RTCManager: on"), g.logInfo("Subscribing to RTCmanager event: " + a), C.on(a, b)
        }

        function j(a, b) {
            g.logDebug("ATT.private.RTCManager: off"), g.logInfo("Unsubscribing from RTCmanager event: " + a), C.off(a, b)
        }

        function k(a) {
            if (g.logDebug("ATT.private.RTCManager: refreshSession"), g.logTrace("refreshSessionOpts", a), void 0 === a || 0 === Object.keys(a).length) throw new Error("Invalid options");
            if (void 0 === a.sessionId) throw new Error("No session ID passed");
            if (void 0 === a.token) throw new Error("No token passed");
            if (void 0 === a.success) throw new Error("No `success` callback passed");
            if ("function" != typeof a.success) throw new Error("`success` callback has to be a function");
            if (void 0 === a.error) throw new Error("No `error` callback passed");
            if ("function" != typeof a.error) throw new Error("`error` callback has to be a function");
            g.logInfo("Calling operation refreshWebRTCSession to refresh session..."), D.doOperation("refreshWebRTCSession", {
                success: function(b) {
                    g.logDebug("doOperation(refreshWebRTCSession): success"), g.logInfo("Successfully completed operation refreshWebRTCSession");
                    var c = parseInt(b.getResponseHeader("x-expires"), 10);
                    g.logTrace("Session timeout", c), a.success({
                        timeout: (1e3 * c).toString()
                    })
                },
                error: function(b) {
                    g.logDebug("doOperation(refreshWebRTCSession): error"), g.logError("Error during operation refreshWebRTCSession"), g.logTrace(b), a.onError(c.createAPIErrorCode(b, "ATT.rtc.Phone", "refreshSession", "RTC"))
                },
                params: {
                    url: [a.sessionId],
                    headers: {
                        Authorization: a.token
                    }
                }
            })
        }

        function l(a) {
            if (g.logDebug("ATT.private.RTCManager: connectSession"), g.logTrace("connectSessionOpts", a), void 0 === a) throw new Error("No options defined.");
            if (void 0 === a.token) throw new Error("No token defined.");
            if (void 0 === a.onSessionConnected) throw new Error("Callback onSessionConnected not defined.");
            if (void 0 === a.onSessionReady) throw new Error("Callback onSessionReady not defined.");
            if (void 0 === a.onError) throw new Error("Callback onError not defined.");
            var b = function(b) {
                var c, e;
                try {
                    g.logDebug("doOperation(createWebRTCSession): success"), g.logInfo("Successfully created web rtc session"), e = d(b), a.onSessionConnected(e), c = function() {
                        g.logInfo("listening@eventManager"), a.onSessionReady({
                            sessionId: e.sessionId
                        }), C.off("listening", c)
                    }, C.on("listening", c), g.logInfo("Trying to setup the event manager..."), C.setup({
                        sessionId: e.sessionId,
                        token: a.token,
                        onError: function(b) {
                            g.logDebug("eventManager.setup: onError"), g.logError("There was an error setting up the eventManager"), g.logTrace(b), a.onError(b)
                        }
                    })
                } catch (f) {
                    g.logError("Error during connectionSession"), g.logTrace(f), a.onError({
                        error: ATT.errorDictionary.getSDKError("2004")
                    })
                }
            };
            g.logInfo("Attempting to create enhanced webrtc session"), D.doOperation("createWebRTCSession", {
                data: {
                    session: {
                        mediaType: "dtls-srtp",
                        ice: "true",
                        services: ["ip_voice_call", "ip_video_call"]
                    }
                },
                params: {
                    headers: {
                        Authorization: a.token,
                        "x-e911Id": a.e911Id || "",
                        "x-Arg": "ClientSDK=WebRTCTestAppJavascript1"
                    }
                },
                success: b,
                error: function(b) {
                    g.logError("createWebRTCSession: error"), g.logTrace(b), a.onError(c.createAPIErrorCode(b, "ATT.rtc.Phone", "login", "RTC"))
                }
            })
        }

        function m(a) {
            if (g.logDebug("ATT.private.RTCManager: disconnectSession"), g.logTrace("disconnectSessionOpts", a), void 0 === a) throw new Error("No options defined.");
            if (void 0 === a.sessionId) throw new Error("No session id defined.");
            if (void 0 === a.token) throw new Error("No token defined.");
            if (void 0 === a.onSessionDisconnected) throw new Error("Callback onSessionDisconnected not defined.");
            g.logInfo("Attempting to stop event manager..."),
            C.stop(), g.logInfo("Attempting to delete enhanced webrtc session"), D.doOperation("deleteWebRTCSession", {
                params: {
                    url: [a.sessionId],
                    headers: {
                        Authorization: a.token,
                        "x-e911Id": a.e911Id
                    }
                },
                success: function() {
                    g.logDebug("doOperation(deleteWebRTCSession): error"), g.logInfo("Successfully deleted enhanced webrtc session"), a.onSessionDisconnected()
                },
                error: function(b) {
                    g.logDebug("doOperation(deleteWebRTCSession): error"), g.logError("Error during deleteWebRTCSession"), g.logTrace(b), a.onError(c.createAPIErrorCode(b, "ATT.rtc.Phone", "logout", "RTC"))
                }
            })
        }

        function n(a) {
            g.logDebug("ATT.private.RTCManager: connectCall"), g.logTrace("connectCallOpts", a);
            var b, c, d, e, f;
            if (void 0 === a) throw new Error("No options provided");
            if (void 0 === a.breed) throw new Error("No call breed provided");
            if ("call" === a.breed && void 0 === a.peer) throw new Error("No peer provided");
            if (void 0 === a.sessionId) throw new Error("No session id provided");
            if (void 0 === a.token) throw new Error("No token provided");
            if (void 0 === a.description) throw new Error("No description provided");
            if (void 0 === a.onSuccess && "function" != typeof a.onSuccess) throw new Error("No success callback provided");
            if (void 0 === a.onError && "function" != typeof a.onError) throw new Error("No error callback provided");
            return void 0 === a.callId ? (f = "call" === a.breed ? {
                call: {
                    calledParty: h.createCalledPartyUri(a.peer),
                    sdp: a.description.sdp
                }
            } : {
                conference: {
                    sdp: a.description.sdp
                }
            }, d = {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: a.breed + "s"
                    },
                    headers: {
                        Authorization: a.token
                    }
                },
                data: f,
                success: function(c) {
                    g.logDebug("doOperation(createCall): success"), g.logInfo("Success during creating call/conference"), g.logTrace("response", c), b = {
                        id: c.getResponseHeader("Location").split("/")[6],
                        state: c.getResponseHeader("x-state")
                    }, a.onSuccess(b)
                },
                error: a.onError
            }, g.logInfo("Attempting to create the call..."), void D.doOperation("createCall", d)) : (e = {
                Authorization: a.token,
                options: {}
            }, "call" === a.breed ? (e.options["x-calls-action"] = "call-answer", f = {
                callsMediaModifications: {
                    sdp: a.description.sdp
                }
            }) : (e.options["x-conference-action"] = "call-answer", f = {
                conferenceModifications: {
                    sdp: a.description.sdp
                }
            }), c = {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        callId: a.callId,
                        type: a.breed + "s"
                    },
                    headers: e
                },
                data: f,
                success: function(c) {
                    g.logDebug("doOperation(modifyCall): success"), g.logInfo("Success during answering call/conference"), g.logTrace("response", c), b = {
                        state: c.getResponseHeader("x-state")
                    }, a.onSuccess(b)
                },
                error: a.onError
            }, g.logInfo("Attempting to answer the call..."), void D.doOperation("modifyCall", c))
        }

        function o(a) {
            g.logDebug("ATT.private.RTCManager: acceptMediaModifications"), g.logTrace("acceptMediaModOpts", a);
            var b, c, d = "call" === a.breed ? "calls" : "conferences";
            b = {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: d,
                        callId: a.callId
                    },
                    headers: {
                        Authorization: a.token,
                        "x-modId": a.modId
                    }
                },
                data: {
                    callsMediaModifications: {
                        sdp: a.sdp
                    }
                },
                success: function() {
                    g.logDebug("doOperation(acceptMediaModifications): success"), g.logInfo("Successfully accepted media modifications for call")
                },
                error: function(a) {
                    g.logDebug("doOperation(acceptMediaModifications): error"), g.logError("Error during accepting media modifications for call"), g.logTrace(a)
                }
            }, c = {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: d,
                        callId: a.callId
                    },
                    headers: {
                        Authorization: a.token,
                        "x-mod-Id": a.modId
                    }
                },
                data: {
                    conferenceModifications: {
                        sdp: a.sdp
                    }
                },
                success: function() {
                    g.logDebug("doOperation(acceptConferenceModifications): success"), g.logInfo("Successfully accepted media modifications for conference")
                },
                error: function(a) {
                    g.logDebug("doOperation(acceptConferenceModifications): error"), g.logError("Error during accepting media modifications for conference"), g.logTrace(a)
                }
            }, g.logInfo("Attempting to accept media modifications for the " + a.breed), "calls" === d ? D.doOperation("acceptCallModifications", b) : D.doOperation("acceptConferenceModifications", c)
        }

        function p(a) {
            g.logDebug("ATT.private.RTCManager: addParticipant"), g.logTrace("addParticipantOpts", a);
            var b, d;
            if (void 0 === a) throw new Error("No `options` passed");
            if (void 0 === a.sessionInfo) throw new Error("No `sessionInfo` passed");
            if (void 0 === a.confId) throw new Error("No `confId` passed");
            if ("function" != typeof a.onSuccess) throw new Error("No `onSuccess` callback passed");
            b = a.invitee.toString(), b = b.indexOf("@") > -1 ? "sip:" + b : "tel:+" + b, g.logInfo("Attempting to add a participant to the conference"), D.doOperation("addParticipant", {
                params: {
                    url: [a.sessionInfo.sessionId, a.confId, b],
                    headers: {
                        Authorization: a.sessionInfo.token
                    }
                },
                success: function(b) {
                    g.logDebug("doOperation(addParticipant): success"), g.logInfo("Successfully added participant to the conference"), g.logTrace("response", b), "add-pending" === b.getResponseHeader("x-state") && (d = b.getResponseHeader("x-modId"), a.onSuccess(d))
                },
                error: function(b) {
                    g.logDebug("doOperation(addParticipant): error"), g.logError("Error during adding a participant to the conference"), g.logTrace(b), a.onError(c.createAPIErrorCode(b, "ATT.rtc.Phone", "addParticipant", "RTC"))
                }
            })
        }

        function q(a) {
            g.logDebug("ATT.private.RTCManager: removeParticipant"), g.logTrace("removeParticipantOpts", a);
            var b;
            if (void 0 === a) throw new Error("No `options` passed");
            if (void 0 === a.sessionInfo) throw new Error("No `sessionInfo` passed");
            if (void 0 === a.confId) throw new Error("No `confId` passed");
            if ("function" != typeof a.onSuccess) throw new Error("No `onSuccess` callback passed");
            b = a.participant.toString(), b = b.indexOf("@") > -1 ? "sip:" + b : "tel:+" + b, g.logInfo("Attempting to remove a participant from the the conference"), D.doOperation("removeParticipant", {
                params: {
                    url: [a.sessionInfo.sessionId, a.confId, b],
                    headers: {
                        Authorization: a.sessionInfo.token
                    }
                },
                success: function(b) {
                    g.logDebug("doOperation(removeParticipant): success"), g.logInfo("Successfully removed participant from the conference"), g.logTrace("response", b), "remove-pending" === b.getResponseHeader("x-state") && a.onSuccess()
                },
                error: function(b) {
                    g.logDebug("doOperation(removeParticipant): error"), g.logError("Error during removing participant from the conference"), g.logTrace(b), a.onError(b)
                }
            })
        }

        function r(a) {
            if (g.logDebug("ATT.private.RTCManager: disconnectCall"), g.logTrace("disconnectCallOpts", a), void 0 === a) throw new Error("No options provided");
            if (void 0 === a.callId) throw new Error("No CallId provided");
            if (void 0 === a.breed) throw new Error("No call breed provided");
            if (void 0 === a.sessionId) throw new Error("No sessionId provided");
            if (void 0 === a.token) throw new Error("No token provided");
            if (void 0 === a.onSuccess) throw new Error("No success callback provided");
            if (void 0 === a.onError) throw new Error("No error callback provided");
            var b = "call" === a.breed ? "hangup" : "endConference";
            g.logInfo("Attempting to delete the " + a.breed), D.doOperation("deleteCall", {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: a.breed + "s",
                        callId: a.callId
                    },
                    headers: {
                        Authorization: a.token,
                        "x-delete-reason": "terminate"
                    }
                },
                success: function() {
                    g.logDebug("doOperation(deleteCall): success"), g.logInfo("Successfully deleted the " + a.breed)
                },
                error: function(d) {
                    g.logDebug("doOperation(deleteCall): error"), g.logError("Error deleting the " + a.breed), g.logTrace(d), a.onError(c.createAPIErrorCode(d, "ATT.rtc.Phone", b, "RTC"))
                }
            })
        }

        function s(a) {
            if (g.logDebug("ATT.private.RTCManager: cancelCall"), g.logTrace("cancelCallOpts", a), void 0 === a) throw new Error("No options provided");
            if (void 0 === a.callId) throw new Error("No callId provided");
            if (void 0 === a.breed) throw new Error("No call breed provided");
            if (void 0 === a.sessionId) throw new Error("No sessionId provided");
            if (void 0 === a.token) throw new Error("No token provided");
            if (void 0 === a.onSuccess) throw new Error("No success callback provided");
            if (void 0 === a.onError) throw new Error("No error callback provided");
            a.callId.length > 0 && (g.logInfo("Attempting to cancel the " + a.breed), D.doOperation("deleteCall", {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: a.breed + "s",
                        callId: a.callId
                    },
                    headers: {
                        Authorization: a.token,
                        "x-delete-reason": "cancel"
                    }
                },
                success: function() {
                    g.logDebug("doOperation(deleteCall): success"), g.logInfo("Successfully deleted the " + a.breed), a.onSuccess()
                },
                error: function(b) {
                    g.logDebug("doOperation(deleteCall): error"), g.logError("Error canceling the " + a.breed), g.logTrace(b), a.onError(c.createAPIErrorCode(b, "ATT.rtc.Phone", "cancel", "RTC"))
                }
            }))
        }

        function t(a, b) {
            g.logDebug("ATT.private.RTCManager: holdOrMoveCall"), g.logTrace("holdOrMoveCallOpts", a), g.logTrace("action", b);
            var d, e, f;
            if (void 0 !== a && (f = "move" === b ? "move" : "hold"), void 0 === a) throw new Error("No options provided");
            if (void 0 === a.callId) throw new Error("No callId provided");
            if (void 0 === a.sessionId) throw new Error("No sessionId provided");
            if (void 0 === a.token) throw new Error("No token provided");
            if (void 0 === a.description) throw new Error("No sdp provided");
            if (void 0 === a.breed) throw new Error("No breed provided");
            if (void 0 === a.onSuccess) throw new Error("No success callback provided");
            if (void 0 === a.onError) throw new Error("No error callback provided");
            e = {
                Authorization: a.token,
                options: {}
            }, g.logDebug("Modification data:"), "conference" === a.breed ? (d = {
                conferenceModifications: {
                    sdp: a.description.sdp,
                    type: a.description.type
                }
            }, e.options["x-conference-action"] = "initiate-hold", g.logTrace("sdp", d.conferenceModifications.sdp), g.logTrace("type", d.conferenceModifications.type)) : (d = {
                callsMediaModifications: {
                    sdp: a.description.sdp,
                    type: a.description.type
                }
            }, e.options["x-calls-action"] = "initiate-call-" + f, g.logTrace("sdp", d.callsMediaModifications.sdp), g.logTrace("type", d.callsMediaModifications.type)), g.logInfo("Attempting to " + f + " the " + a.breed), D.doOperation("modifyCall", {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: a.breed + "s",
                        callId: a.callId
                    },
                    headers: e
                },
                data: d,
                success: function(b) {
                    g.logDebug("doOperation(modifyCall): success"), g.logInfo("Successfully performed operation " + f + " on the " + a.breed), g.logTrace("response", b), 204 === b.getResponseStatus() ? (g.logInfo("Response Status 204"), a.onSuccess()) : (g.logError("Response Status is not 204"), a.onError())
                },
                error: function(b) {
                    g.logDebug("doOperation(modifyCall): error"), g.logError("Error during performing operation" + f + " on the " + a.breed), g.logTrace(b), a.onError(c.createAPIErrorCode(b, "ATT.rtc.Phone", f, "RTC"))
                }
            })
        }

        function u(a) {
            g.logDebug("ATT.private.RTCManager: holdCall"), g.logTrace("holdCallOpts", a), t(a, "hold")
        }

        function v(a) {
            g.logDebug("ATT.private.RTCManager: moveCall"), g.logTrace("moveCallOpts", a), t(a, "move")
        }

        function w(a) {
            g.logDebug("ATT.private.RTCManager: resumeCall"), g.logTrace("resumeCallOpts", a);
            var b, d;
            if (void 0 === a) throw new Error("No options provided");
            if (void 0 === a.callId) throw new Error("No callId provided");
            if (void 0 === a.sessionId) throw new Error("No sessionId provided");
            if (void 0 === a.token) throw new Error("No token provided");
            if (void 0 === a.description) throw new Error("No sdp provided");
            if (void 0 === a.breed) throw new Error("No breed provided");
            if (void 0 === a.onSuccess) throw new Error("No success callback provided");
            if (void 0 === a.onError) throw new Error("No error callback provided");
            d = {
                Authorization: a.token,
                options: {}
            }, "conference" === a.breed ? (b = {
                conferenceModifications: {
                    sdp: a.description.sdp,
                    type: a.description.type
                }
            }, d.options["x-conference-action"] = "initiate-resume") : (b = {
                callsMediaModifications: {
                    sdp: a.description.sdp,
                    type: a.description.type
                }
            }, d.options["x-calls-action"] = "initiate-call-resume"), g.logInfo("Attempting to resume the " + a.breed), D.doOperation("modifyCall", {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: a.breed + "s",
                        callId: a.callId
                    },
                    headers: d
                },
                data: b,
                success: function(b) {
                    g.logDebug("doOperation(modifyCall): success"), g.logInfo("Successfully resuming the " + a.breed), g.logTrace("response", b), 204 === b.getResponseStatus() ? (g.logTrace("resume request sent..."), a.onSuccess()) : a.onError()
                },
                error: function(b) {
                    g.logDebug("doOperation(modifyCall): error"), g.logError("Error resuming the " + a.breed), g.logTrace(b), a.onError(c.createAPIErrorCode(b, "ATT.rtc.Phone", "resume", "RTC"))
                }
            })
        }

        function x(a) {
            g.logDebug("ATT.private.RTCManager: associateE911Id"), g.logTrace("associateE911IdOpts", a);
            var b;
            if (void 0 === a) throw "Invalid options";
            if (void 0 === a.token || "" === a.token) throw "No token passed";
            if (void 0 === a.e911Id || "" === a.e911Id) throw "No e911Id passed";
            if (void 0 === a.sessionId || "" === a.sessionId) throw "No session Id passed";
            if (void 0 === a.onSuccess || "function" != typeof a.onSuccess) throw "No success callback passed";
            if (void 0 === a.onError || "function" != typeof a.onError) throw "No error callback passed";
            b = {
                data: {
                    e911Association: {
                        e911Id: a.e911Id
                    }
                },
                params: {
                    url: [a.sessionId],
                    headers: {
                        Authorization: a.token
                    }
                },
                success: a.onSuccess,
                error: function(b) {
                    g.logDebug("doOperation(associateE911Id): error"), g.logError("Error associating e911 id with the session"), g.logTrace(b), a.onError(c.createAPIErrorCode(b, "ATT.rtc.Phone", "associateE911Id", "RTC"))
                }
            }, g.logInfo("Attempting to associate the e911Id with session..."), D.doOperation("associateE911Id", b)
        }

        function y(a) {
            if (g.logDebug("ATT.private.RTCManager: associateE911Id"), g.logTrace("associateTokenOpts", a), void 0 === a) throw new Error("No options provided.");
            if (void 0 === a.userId) throw new Error("No userId provided.");
            if (void 0 === a.token) throw new Error("No token provided.");
            g.logInfo("Attempting to associate token with the user id..."), D.doOperation("associateTokenWithUserId", {
                params: {
                    url: {
                        userId: a.userId
                    },
                    headers: {
                        Authorization: a.token
                    }
                },
                success: function() {
                    g.logDebug("doOperation(associateTokenWithUserId): success"), g.logInfo("Successfully associated token with user id"), a.success()
                },
                error: function(b) {
                    g.logDebug("doOperation(associateTokenWithUserId): error"), g.logError("Error associating token with the user id"), g.logTrace(b), a.error(b)
                }
            })
        }

        function z(a) {
            if (g.logDebug("ATT.private.RTCManager: associateE911Id"), g.logTrace("rejectCallOpts", a), void 0 === a) throw new Error("Invalid options");
            if (void 0 === a.callId || "" === a.callId) throw new Error("No callId provided");
            if (void 0 === a.breed || "" === a.breed) throw new Error("No call breed provided");
            if (void 0 === a.sessionId || "" === a.sessionId) throw new Error("No session Id provided");
            if (void 0 === a.token || "" === a.token) throw new Error("No token provided");
            if (void 0 === a.onSuccess || "function" != typeof a.onSuccess) throw new Error("No success callback provided");
            if (void 0 === a.onError || "function" != typeof a.onError) throw new Error("No error callback provided");
            var b = "call" === a.breed ? "reject" : "rejectConference";
            g.logInfo("Attempting to reject the " + a.breed), D.doOperation("deleteCall", {
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: a.breed + "s",
                        callId: a.callId
                    },
                    headers: {
                        Authorization: a.token,
                        "x-delete-reason": "reject"
                    }
                },
                success: function() {
                    g.logDebug("doOperation(deleteCall): success"), g.logInfo("Successfully deleted the " + a.breed)
                },
                error: function(d) {
                    g.logDebug("doOperation(deleteCall): error"), g.logError("Error deleting the " + a.breed), g.logTrace(d), a.onError(c.createAPIErrorCode(d, "ATT.rtc.Phone", b, "RTC"))
                }
            })
        }

        function A(a) {
            if (g.logDebug("ATT.private.RTCManager: transferCall"), g.logTrace("transferCallOpts", a), void 0 === a || 0 === Object.keys(a).length) throw new Error("No options provided");
            if (void 0 === a.callId) throw new Error("No call id provided");
            if (void 0 === a.breed) throw new Error("No call breed provided");
            if (void 0 === a.sessionId) throw new Error("No session id provided");
            if (void 0 === a.token) throw new Error("No token provided");
            if (void 0 === a.targetCallId) throw new Error("No target call id provided");
            if (void 0 === a.transfereeSdp) throw new Error("No sdp provided");
            if (void 0 === a.success) throw new Error("No success callback provided");
            if (void 0 === a.error) throw new Error("No error callback provided");
            g.logInfo("Attempting to transfer the " + a.breed), D.doOperation("transferCall", {
                data: {
                    callsMediaModifications: {
                        sdp: a.transfereeSdp
                    }
                },
                params: {
                    url: {
                        sessionId: a.sessionId,
                        type: a.breed + "s",
                        callId: a.callId
                    },
                    headers: {
                        Authorization: a.token,
                        "x-transferTargetCallId": a.targetCallId
                    }
                },
                success: function() {
                    g.logDebug("doOperation(transferCall): success"), g.logInfo("Successfully transferred the " + a.breed), a.success()
                },
                error: function(b) {
                    g.logDebug("doOperation(transferCall): error"), g.logError("Error transferring the " + a.breed), g.logTrace(b), a.error(b)
                }
            })
        }
        var B, C, D;
        D = a.resourceManager, g.setLevel(f.logLevel.WARNING), g.logDebug("ATT.private.RTCManager: Constructor"), g.logTrace("options", a), B = e.getAppConfiguration(), C = b.createEventManager({
            resourceManager: D,
            eventChannelType: B.eventChannelType
        }), this.on = i, this.off = j, this.connectSession = l, this.disconnectSession = m, this.connectCall = n, this.acceptMediaModifications = o, this.addParticipant = p, this.removeParticipant = q, this.disconnectCall = r, this.refreshSession = k, this.cancelCall = s, this.holdCall = u, this.moveCall = v, this.resumeCall = w, this.rejectCall = z, this.transferCall = A, this.associateE911Id = x, this.associateToken = y
    }
    var b = ATT["private"].factories,
        c = ATT["private"].error,
        d = ATT["private"].config.api,
        e = ATT["private"].config.app,
        f = ATT.logManager.getInstance(),
        g = f.getLoggerByName("att.rtc-manager"),
        h = ATT.utils;
    if (void 0 === ATT["private"]) throw new Error("Error exporting `RTCManager`");
    ATT["private"].RTCManager = a, ATT["private"].rtcManager = function() {
        var c, e;
        return {
            getRTCManager: function() {
                return void 0 === c && (e = b.createResourceManager(d), c = new a({
                    resourceManager: e
                })), c
            }
        }
    }()
}();
var RTCPeerConnection = null,
    RTCSessionDescription, RTCIceCandidate = null,
    getUserMedia = null,
    attachMediaStream = null,
    reattachMediaStream = null,
    webrtcDetectedBrowser = null,
    webrtcDetectedVersion = null,
    createIceServer;
if (navigator.mozGetUserMedia) console.log("This appears to be Firefox"), console.log(navigator.userAgent), webrtcDetectedBrowser = "firefox", webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10), RTCPeerConnection = mozRTCPeerConnection, RTCSessionDescription = mozRTCSessionDescription, RTCIceCandidate = mozRTCIceCandidate, getUserMedia = navigator.mozGetUserMedia.bind(navigator), createIceServer = function(a, b, c) {
    var d, e = null,
        f = a.split(":");
    return 0 === f[0].indexOf("stun") ? e = {
        url: a
    } : 0 === f[0].indexOf("turn") ? webrtcDetectedVersion >= 27 ? e = {
        url: a,
        credential: c,
        username: b
    } : (d = a.split("?"), 0 === d[1].indexOf("transport=udp") ? e = {
        url: d[0],
        credential: c,
        username: b
    } : null) : void 0
}, attachMediaStream = function(a, b) {
    console.log("Attaching media stream"), a.mozSrcObject = b, a.play()
}, reattachMediaStream = function(a, b) {
    console.log("Reattaching media stream"), a.mozSrcObject = b.mozSrcObject, a.play()
}, MediaStream.prototype.getVideoTracks || (MediaStream.prototype.getVideoTracks = function() {
    return []
}), MediaStream.prototype.getAudioTracks || (MediaStream.prototype.getAudioTracks = function() {
    return []
});
else if (navigator.webkitGetUserMedia) {
    console.log("This appears to be Chrome"), console.log(navigator.userAgent), webrtcDetectedBrowser = "chrome", webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
    var createIceServer = function(a, b, c) {
        var d = null,
            e = a.split(":");
        return 0 === e[0].indexOf("stun") ? d = {
            url: a
        } : 0 === e[0].indexOf("turn") && (d = {
            url: a,
            credential: c,
            username: b
        }), d
    };
    RTCPeerConnection = webkitRTCPeerConnection, getUserMedia = navigator.webkitGetUserMedia.bind(navigator), attachMediaStream = function(a, b) {
        "undefined" !== a.srcObject ? a.srcObject = b : "undefined" !== a.mozSrcObject ? a.mozSrcObject = b : "undefined" !== a.src ? a.src = URL.createObjectURL(b) : console.log("Error attaching stream to element.")
    }, reattachMediaStream = function(a, b) {
        a.src = b.src
    }
} else console.log("Browser does not appear to be WebRTC-capable");
! function(a) {
    "use strict";
    var b, c = ATT.logManager.getInstance(),
        d = {
            audio: !0,
            video: !0
        }, e = c.getLoggerByName("att.user-media-service");
    e.setLevel(c.logLevel.WARNING), e.logDebug("Loading att.user-media-service"), b = {
        localMedia: null,
        remoteMedia: null,
        localStream: null,
        remoteStream: null,
        mediaConstraints: null,
        onUserMedia: null,
        onMediaEstablished: null,
        onUserMediaError: null,
        getUserMedia: function(a) {
            e.logDebug("ATT.UserMediaService: getUserMedia"), e.logInfo("Trying to get the user media"), e.logTrace(a);
            var b = this;
            this.localMedia = a.localMedia, this.remoteMedia = a.remoteMedia, this.mediaConstraints = d, this.onUserMedia = a.onUserMedia, this.onMediaEstablished = a.onMediaEstablished, this.onUserMediaError = a.onUserMediaError, void 0 !== a.mediaType && (this.mediaConstraints.video = "audio" !== a.mediaType), this.mediaConstraints.fake = !0 === a.fake, getUserMedia(this.mediaConstraints, b.getUserMediaSuccess.bind(b), function(b) {
                e.logDebug("getUserMedia: error"), e.logError("error getting user media"), e.logTrace("mediaError", b);
                var c = ATT.errorDictionary.getSDKError(14e3);
                a.onUserMediaError(c), e.logError(c)
            })
        },
        getUserMediaSuccess: function(a) {
            e.logDebug("getUserMedia: success"), e.logInfo("Got the user media."), e.logTrace("stream", a), this.showStream({
                localOrRemote: "local",
                stream: a
            });
            var b = {
                mediaConstraints: this.mediaConstraints,
                localStream: a
            };
            this.onUserMedia(b)
        },
        showStream: function(a) {
            e.logDebug("ATT.UserMediaService: showStream"), e.logTrace(a);
            var b;
            try {
                "remote" === a.localOrRemote ? (this.remoteStream = a.stream, b = this.remoteMedia) : (this.localStream = a.stream, b = this.localMedia, b.setAttribute("muted", "")), b && (b.src = window.URL.createObjectURL(a.stream), e.logInfo("About to play " + a.localOrRemote + " stream..."), b.play(), "remote" === a.localOrRemote && this.onMediaEstablished())
            } catch (c) {
                e.logError("Error during showStream"), e.logTrace(c), void 0 !== this.onUserMediaError && "function" == typeof this.onUserMediaError && this.onUserMediaError(c)
            }
        },
        stopUserMedia: function() {
            e.logDebug("ATT.UserMediaService: stopUserMedia");
            try {
                this.localStream && (e.logInfo("Stopping the local stream..."), this.localStream.stop(), this.localStream = null, this.localMedia.src = ""), this.remoteStream && "function" == typeof this.remoteStream.stop && (e.logInfo("Stopping the remote stream..."), this.remoteStream.stop(), this.remoteStream = null, this.remoteMedia.src = "")
            } catch (a) {
                e.logError("Error stopping local and remote streams"), e.logTrace(a), this.onUserMediaError(a)
            }
        }
    }, a.UserMediaService = b
}(ATT),
function() {
    "use strict";

    function a(a) {
        function e(a, b) {
            d.logDebug("ATT.private.peer-connection: processDescription"), d.logTrace("description", a), d.logInfo("Trying to set the local description..."), i.setLocalDescription(a, function() {
                d.logDebug("processDescription:setLocalDescription: success"), d.logInfo("Successfully set the local description during processDescription"), void 0 !== b && "function" == typeof b && b(a)
            }, function(a) {
                d.logDebug("processDescription:setLocalDescription: error"), d.logError("Error during processDescription:setLocalDescription"), d.logTrace(a), l(a)
            })
        }

        function f(a) {
            var b, c;
            if (m.OfferToReceiveVideo) {
                if (b = a.split("m=audio")[1].split("m=video")[0], c = a.split("m=video")[1], c.match(/1 udp/i) && b.match(/1 udp/i)) return !0
            } else if (b = a.split("m=audio")[1], b.match(/1 udp/i)) return !0;
            return !1
        }

        function g() {
            d.logDebug("ATT.private.peer-connection: createSdpOffer"), d.logInfo("Trying to create an SDP offer..."), i.createOffer(function(a) {
                d.logDebug("createOffer: success"), d.logInfo("Successfully created the sdp offer"), d.logTrace("local description", a), d.logInfo("Trying to set the local description..."), i.setLocalDescription(a, function() {
                    d.logDebug("createOffer:setLocalDescription: success"), d.logInfo("Successfully set the local description during createSdpOffer")
                }, function(a) {
                    d.logDebug("createSdpOffer:setLocalDescription: error"), d.logError("Error during createSdpOffer:setLocalDescription"), d.logTrace(a), l(a)
                })
            }, function(a) {
                d.logError("Error during createSdpOffer"), d.logTrace(a), l(a)
            }, {
                mandatory: m
            })
        }

        function h(a) {
            d.logDebug("ATT.private.peer-connection: acceptSdpOffer"), d.logTrace("acceptSdpOffer.options", a);
            try {
                d.logInfo("Trying to set the remote description..."), i.setRemoteDescription(new RTCSessionDescription({
                    sdp: a.remoteSdp,
                    type: "offer"
                }), function() {
                    d.logDebug("acceptSdpOffer:setRemoteDescription: success"), d.logInfo("Trying to set the create the SDP answer...");
                    try {
                        i.createAnswer(function(b) {
                            d.logDebug("createAnswer: success"), d.logInfo("Successfully created the SDP answer"), d.logTrace("description.type", b.type), d.logTrace("description.sdp", b.sdp), e(b, a.onSuccess)
                        }, function(a) {
                            d.logDebug("createAnswer: error"), d.logInfo("Error creating the SDP answer"), d.logTrace(a), l(a)
                        }, {
                            mandatory: m
                        })
                    } catch (b) {
                        throw d.logError("Error during acceptSdpOffer:createAnswer"), d.logTrace(b), b
                    }
                }, function(a) {
                    d.logDebug("acceptSdpOffer:setRemoteDescription: error"), d.logInfo("Error during acceptSdpOffer:setRemoteDescription"), d.logTrace(a), l(a)
                })
            } catch (b) {
                throw d.logError("Error during acceptSdpOffer"), d.logTrace(b), b
            }
        }
        d.setLevel(c.logLevel.WARNING), d.logDebug("ATT.private.factories: createPeerConnection"), d.logTrace("createPeerConnection.options", a);
        var i, j, k, l, m, n = !1;
        if (void 0 === a || 0 === Object.keys(a).length) throw d.logError("No options passed."), new Error("No options passed.");
        if (void 0 === a.stream) throw d.logError("No `stream` passed."), new Error("No `stream` passed.");
        if (void 0 === a.mediaType) throw d.logError("No `mediaType` passed."), new Error("No `mediaType` passed.");
        if ("function" != typeof a.onSuccess) throw d.logError("No `onSuccess` callback passed."), new Error("No `onSuccess` callback passed.");
        if (j = a.onSuccess, "function" != typeof a.onRemoteStream) throw d.logError("No `onRemoteStream` callback passed."), new Error("No `onRemoteStream` callback passed.");
        if (k = a.onRemoteStream, "function" != typeof a.onError) throw d.logError("No `onError` callback passed."), new Error("No `onError` callback passed.");
        l = a.onError, m = {
            OfferToReceiveAudio: !0,
            OfferToReceiveVideo: "video" === a.mediaType
        };
        try {
            d.logInfo("Creating the peer connection"), i = new RTCPeerConnection(b)
        } catch (o) {
            throw d.logError("Failed to create PeerConnection."), d.logTrace(o), new Error("Failed to create PeerConnection.")
        }
        return i.addStream(a.stream), i.onaddstream = function(a) {
            k(a.stream)
        }, void 0 === a.remoteSdp && (a.remoteSdp = null), i.onicecandidate = function(a) {
            d.logDebug("createPeerConnection: onIceCandidate"), n || f(i.localDescription.sdp) && (j(i.localDescription), n = !0), d.logInfo(a.candidate ? "Candidate: " + a.candidate : "End of candidates")
        }, null === a.remoteSdp ? g() : h({
            remoteSdp: a.remoteSdp
        }), d.logInfo("Peer connection created"), d.logTrace("Peer connection", i), {
            getLocalDescription: function() {
                return i.localDescription
            },
            setRemoteDescription: function(a) {
                i.setRemoteDescription(new RTCSessionDescription(a), function() {
                    d.logInfo("setRemoteDescription: success")
                }, function(a) {
                    d.logInfo("error while setting remote description"), d.logError(a), d.logError("setRemoteDescription: error"), d.logTrace("setRemoteDescription: error", a), l(a)
                })
            },
            setLocalDescription: function(a) {
                i.setLocalDescription(a, function() {
                    d.logDebug("processDescription:setLocalDescription: success"), d.logInfo("Successfully set the local description during processDescription")
                }, function(a) {
                    d.logDebug("processDescription:setLocalDescription: error"), d.logError("Error during processDescription:setLocalDescription"), d.logTrace(a), l(a)
                })
            },
            acceptSdpOffer: h,
            getRemoteDescription: function() {
                return i.remoteDescription
            },
            close: function() {
                i.close(), i = null
            }
        }
    }
    var b, c = ATT.logManager.getInstance(),
        d = c.addLoggerForModule("att.peer-connection");
    if (d.setLevel(c.logLevel.WARNING), d.logDebug("Loading att.peer-connection"), b = {
        iceServers: [{
            url: "STUN:12.194.159.4"
        }, {
            url: "STUN:12.194.159.7"
        }, {
            url: "STUN:12.194.159.10"
        }, {
            url: "STUN:12.194.194.4"
        }, {
            url: "STUN:12.194.194.7"
        }, {
            url: "STUN:12.194.194.10"
        }]
    }, void 0 === ATT["private"].factories) throw new Error("Error exporting `ATT.private.factories.createPeerConnection`");
    ATT["private"].factories.createPeerConnection = a
}(),
function() {
    "use strict";

    function a(a) {
        function e() {
            var a = {
                index: T,
                timestamp: new Date,
                mediaType: V
            };
            return void 0 !== ga && (a.codec = ga), void 0 !== Z && (a.downgrade = Z), W === c.CALL_TYPE.OUTGOING ? a.to = S : W === c.CALL_TYPE.INCOMING && (a.from = S), Object.keys(_).length > 0 && (a.invitations = _), Object.keys(aa).length > 0 && (a.participants = aa), a
        }

        function h() {
            return fa
        }

        function i(a) {
            fa = a, ja.publish(fa, e.call(this))
        }

        function j(a, b) {
            var c, d, f, g = $.invitations();
            for (c in g) g.hasOwnProperty(c) && (d = g[c], a === d.id && (f = d.invitee, aa[f] = {
                participant: f,
                status: b
            }, ja.publish("invite-accepted", e())))
        }

        function k(a, b, c) {
            _[a] = {
                invitee: a,
                id: b,
                status: c
            }
        }

        function l(a, b) {
            var c, d, e, f = $.invitations();
            for (c in f) f.hasOwnProperty(c) && (d = f[c], a === d.id && (e = d.invitee, _[e].status = b))
        }

        function m(a) {
            return a.toString(), a.indexOf("tel") > -1 ? a.split("+")[1] : a.indexOf("sip") > -1 ? a.split(":")[1].split("@")[0] : a
        }

        function n(a) {
            f.logDebug("ATT.rtc.Call: toggleLocalAudio");
            var b, c, d = $.localStream();
            if (null !== d)
                for (b = d.getAudioTracks(), c = 0; c < b.length; c += 1) b[c].enabled = a
        }

        function o(a) {
            f.logDebug("ATT.rtc.Call: toggleLocalVideo");
            var b, c, d = $.localStream();
            if (null !== d)
                for (b = d.getVideoTracks(), c = 0; c < b.length; c += 1) b[c].enabled = a
        }

        function p() {
            f.logDebug("ATT.rtc.Call: disableLocalMedia"), n(!1), o(!1)
        }

        function q() {
            f.logDebug("ATT.rtc.Call: enableLocalMedia"), n(!0), o(!0)
        }

        function r(a) {
            if (f.logDebug("Event: onModReceived"), f.logTrace("modificationId", a.modificationId), f.logTrace("remoteSdp", a.remoteSdp), la = a.modificationId, void 0 === a.remoteSdp) return f.logInfo("No remote sdp, accepting media modifications"), ka.acceptMediaModifications({
                sessionId: Y.sessionId,
                token: Y.token,
                callId: R,
                breed: X,
                sdp: $.localSdp().sdp,
                modId: la
            }), void(la = "");
            if (f.logInfo("Remote sdp exists, accepting sdp offer"), void 0 !== a.remoteSdp) {
                var b;
                b = g.removeSDPAttribute("rtcp-fb:100 nack", a.remoteSdp), b = g.setupActivePassive(b), U.acceptSdpOffer({
                    remoteSdp: b,
                    onSuccess: function(a) {
                        f.logDebug("acceptSdpOffer: onSuccess"), f.logInfo("Successfully accepted SDP offer"), f.logTrace("local description", a), ka.acceptMediaModifications({
                            sessionId: Y.sessionId,
                            token: Y.token,
                            callId: R,
                            breed: X,
                            sdp: a.sdp,
                            modId: la
                        }), la = ""
                    }
                })
            }
        }

        function s(a) {
            f.logDebug("Event: onModTerminated"), f.logTrace("type", a.type), f.logTrace("reason", a.reason), "success" === a.reason && "holding" === fa && (f.logInfo("Call is on hold."), $.setState("held"), U.setRemoteDescription({
                sdp: a.remoteSdp,
                type: "offer"
            })), "resuming" === fa && "success" === a.reason && (f.logInfo("Call is resumed."), $.setState("resumed"), U.setRemoteDescription({
                sdp: a.remoteSdp,
                type: "offer"
            })), void 0 !== a.remoteSdp && (f.logTrace("Remote SDP", a.remoteSdp), "connecting" === fa && U.setRemoteDescription({
                sdp: a.remoteSdp,
                type: "answer"
            })), "conference" === a.type && void 0 !== a.modificationId && (f.logDebug("onModTerminated:conference"), "success" === a.reason && j(a.modificationId, "active"), "Call rejected" === a.reason && (l(a.modificationId, "rejected"), ja.publish("rejected", e()))), "success" !== a.reason && "Call rejected" !== a.reason && ja.publish("notification", ATT.utils.extend(e(), {
                message: a.reason
            }))
        }

        function t(a) {
            f.logDebug("onSessionOpen"), f.logTrace("data", a), a.mediaType && ("audio" === a.mediaType && "video" === V && (Z = !0, o(!1)), V = a.mediaType), a.provisionalSdp || $.setState("connected"), void 0 !== a.remoteSdp && (f.logTrace("Remote SDP", a.remoteSdp), $.setRemoteSdp(a.remoteSdp), U.setRemoteDescription({
                sdp: a.remoteSdp,
                type: "answer"
            }))
        }

        function u(a) {
            f.logDebug("onSessionModified"), $.setState("connecting" === $.getState() ? "connected" : "moved"), ja.publish("stream-added", {
                stream: ea
            }), void 0 !== a.remoteSdp && (f.logTrace("Remote SDP", a.remoteSdp), $.setRemoteSdp(a.remoteSdp), U.setRemoteDescription({
                sdp: a.remoteSdp,
                type: "offer"
            }))
        }

        function v() {
            f.logDebug("att.call.js: onTransferInitiated"), f.logInfo("Transfer initiated successfully"), i("transferring")
        }

        function w(a) {
            return f.logDebug("att.call.js: onTransferTerminated"), f.logInfo("Transfer terminated"), f.logTrace("data", a), "success" !== a.reason ? void ja.publish("error", {
                error: "There was an error transferring the call. " + a.reason
            }) : void i("transferred")
        }

        function x(a) {
            f.logDebug("onSessionTerminated"), f.logTrace(a);
            var b;
            void 0 !== a ? "Call rejected" === a.reason || ia ? i("rejected") : "Call canceled" === a.reason || ha ? i("canceled") : void 0 !== a.reason ? (fa = "disconnected", b = e(), b.message = a.reason, ja.publish("disconnected", b)) : i("created" === fa ? "canceled" : "disconnected") : i("disconnected"), ka.off(c.API_EVENT.SESSION_OPEN + ":" + R, t), ka.off(c.API_EVENT.SESSION_MODIFIED + ":" + R, u), ka.off(c.API_EVENT.SESSION_TERMINATED + ":" + R, x), ka.off(c.API_EVENT.MODIFICATION_RECEIVED + ":" + R, r), ka.off(c.API_EVENT.MODIFICATION_TERMINATED + ":" + R, s), ka.off(c.API_EVENT.TRANSFER_INITIATED + ":" + R, v), ka.off(c.API_EVENT.TRANSFER_TERMINATED + ":" + R, w), void 0 !== U && (U.close(), U = void 0)
        }

        function y(a) {
            var b;
            return ba = $.localSdp(), f.logInfo("Modifying SDP for " + a), ba = g.modifyForHoldCall(ba), b = {
                description: ba,
                sessionId: Y.sessionId,
                token: Y.token,
                breed: X,
                callId: R,
                onSuccess: function() {
                    f.logDebug(a + "Call: onSuccess"), f.logInfo("Operation " + a + " on the call was successful")
                },
                onError: function(b) {
                    f.logDebug(a + "Call: onError"), f.logInfo("Error during " + a + " on the call"), f.logTrace(b), ja.publish("error", {
                        error: b
                    })
                }
            }, "move" === a ? void ka.moveCall(b) : (void 0 !== ba.sdp && f.logTrace("Local SDP", ba.sdp), void ka.holdCall(b))
        }

        function z() {
            f.logDebug("ATT.rtc.Call: registerForRTCEvents"), ka.on(c.API_EVENT.SESSION_OPEN + ":" + R, t), ka.on(c.API_EVENT.SESSION_MODIFIED + ":" + R, u), ka.on(c.API_EVENT.SESSION_TERMINATED + ":" + R, x), ka.on(c.API_EVENT.MODIFICATION_RECEIVED + ":" + R, r), ka.on(c.API_EVENT.MODIFICATION_TERMINATED + ":" + R, s), ka.on(c.API_EVENT.TRANSFER_INITIATED + ":" + R, v), ka.on(c.API_EVENT.TRANSFER_TERMINATED + ":" + R, w)
        }

        function A(a) {
            f.logDebug("ATT.rtc.Call: setId"), f.logTrace(a), R = a, null === R ? (f.logInfo("disconnecting..."), i("disconnected")) : (f.logInfo("connecting..."), i("connecting"))
        }

        function B(a) {
            f.logDebug("ATT.rtc.Call: setRemoteSdp"), ca = a, null !== a && (ga = g.getCodecfromSDP(a), f.logTrace("codec", ga))
        }

        function C(a, b) {
            if (f.logDebug("ATT.rtc.Call: on"), f.logInfo("Subscribing to call event: " + a), "connecting" !== a && "response-pending" !== a && "invite-accepted" !== a && "participant-removed" !== a && "canceled" !== a && "rejected" !== a && "connected" !== a && "muted" !== a && "muted" !== a && "unmuted" !== a && "stream-added" !== a && "error" !== a && "held" !== a && "resumed" !== a && "disconnecting" !== a && "disconnected" !== a && "notification" !== a && "moved" !== a && "transferring" !== a && "transferred" !== a) throw new Error("Event " + a + " not defined");
            ja.unsubscribe(a, b), ja.subscribe(a, b, this)
        }

        function D(a, b) {
            f.logDebug("ATT.rtc.Call: off"), f.logInfo("Unsubscribing from call event: " + a), ja.unsubscribe(a, b)
        }

        function E(a) {
            f.logDebug("ATT.rtc.Call: addStream"), f.logTrace(a), da = a
        }

        function F() {
            function a(a) {
                f.logDebug("createPeerConnection: onSuccess"), f.logTrace(a);
                var b = {
                    sessionId: Y.sessionId,
                    token: Y.token,
                    description: a,
                    breed: X,
                    onSuccess: function(a) {
                        f.logDebug("connectCall: onSuccess"), f.logInfo("Success during connectCall"), f.logTrace(a), c.CALL_TYPE.INCOMING === W ? i("connecting") : (A(a.id), z())
                    },
                    onError: function(a) {
                        f.logDebug("connectCall: onError"), f.logError("Error during connectCall"), f.logTrace(a), ja.publish("error", {
                            error: a
                        })
                    }
                };
                return void 0 !== R && null !== R && (b.callId = R), "call" === X && (b.peer = S), ha ? (f.logInfo("Call is being canceled..."), ha = !1, void x({
                    reason: "Call canceled"
                })) : (f.logInfo("Peer Connection created. Connecting now.."), b.description.sdp = g.fixIcePorts(b.description.sdp), void 0 !== b.description && f.logTrace("Call.connect SDP", b.description.sdp), void ka.connectCall(b))
            }
            f.logDebug("ATT.rtc.Call: connect");
            var d;
            try {
                d = {
                    mediaType: V,
                    stream: da,
                    onSuccess: a,
                    onError: function(a) {
                        f.logDebug("createPeerConnection: onError"), f.logError("Error creating peer connection"), f.logTrace(a), ja.publish("error", {
                            error: a
                        })
                    },
                    onRemoteStream: function(a) {
                        f.logDebug("createPeerConnection: onRemoteStream"), f.logTrace(a), ea = a, ja.publish("stream-added", {
                            stream: a
                        })
                    }
                }, d.remoteSdp = ca, d.sdpFilter = g, f.logInfo("Trying to create a peer connection..."), U = b.createPeerConnection(d)
            } catch (e) {
                f.logError("Error during connectCall"), f.logTrace(e), ja.publish("error", {
                    error: e
                })
            }
        }

        function G(a) {
            f.logDebug("ATT.rtc.Call: addParticipant"), f.logInfo("adding participant..."), f.logTrace(a);
            try {
                ka.addParticipant({
                    sessionInfo: Y,
                    invitee: a,
                    confId: R,
                    onSuccess: function(b) {
                        f.logDebug("rtcManager.addParticipant: onSuccess"), f.logInfo("Successfully added participant"), f.logTrace(b), k(m(a), b, "invited"), ja.publish("response-pending", e())
                    },
                    onError: function(a) {
                        f.logDebug("rtcManager.addParticipant: onError"), f.logError("Error adding participant"), f.logTrace(a), ja.publish("error", a)
                    }
                })
            } catch (b) {
                f.logError("Error adding participant"), f.logTrace(b), ja.publish("error", b)
            }
        }

        function H(a) {
            f.logDebug("ATT.rtc.Call: removeParticipant"), f.logTrace(a);
            try {
                ka.removeParticipant({
                    sessionInfo: Y,
                    participant: a,
                    confId: R,
                    onSuccess: function() {
                        f.logDebug("rtcManager.removeParticipant: onSuccess"), f.logInfo("Successfully removed participant"), delete $.participants()[a], ja.publish("participant-removed", e())
                    },
                    onError: function(a) {
                        f.logDebug("rtcManager.removeParticipant: onError"), f.logError("Error removing participant"), f.logTrace(a), ja.publish("error", a)
                    }
                })
            } catch (b) {
                f.logError("Error removing participant"), f.logTrace(b), ja.publish("error", b)
            }
        }

        function I() {
            if (f.logDebug("ATT.rtc.Call: disconnect"), this.on("error", x), "created" === fa || "connecting" === fa) {
                if (f.logInfo("Canceling.."), i("disconnecting"), ha = !0, null === R) return void f.logInfo("Call connecting not completed yet");
                f.logInfo("Call connecting completed. Sending cancel request"), ka.cancelCall({
                    callId: R,
                    breed: X,
                    sessionId: Y.sessionId,
                    token: Y.token,
                    onSuccess: function() {
                        f.logDebug("cancelCall: success"), f.logInfo("Successfully canceled call")
                    },
                    onError: function(a) {
                        f.logDebug("cancelCall: onError"), f.logError("Error canceling call"), f.logTrace(a), ja.publish("error", {
                            error: a
                        })
                    }
                })
            } else null !== R && (f.logInfo("Disconnecting..."), i("disconnecting"), ka.disconnectCall({
                sessionId: Y.sessionId,
                breed: X,
                token: Y.token,
                callId: R,
                onSuccess: function() {
                    f.logDebug("disconnectCall: onSuccess"), f.logInfo("Successfully disconnected call")
                },
                onError: function(a) {
                    f.logDebug("disconnectCall: onError"), f.logError("Error disconnecting call"), f.logTrace(a), ja.publish("error", {
                        error: a
                    })
                }
            }))
        }

        function J() {
            f.logDebug("ATT.rtc.Call: disconnectConference"), f.logInfo("Disconnecting Conference..."), i("disconnecting"), ka.disconnectCall({
                sessionId: Y.sessionId,
                token: Y.token,
                breed: "conference",
                callId: R,
                onSuccess: function() {
                    f.logDebug("disconnectCall: onSuccess"), f.logInfo("Successfully disconnected conference")
                },
                onError: function(a) {
                    f.logDebug("disconnectCall: onError"), f.logError("Error disconnecting conference"), f.logTrace(a), ja.publish("error", {
                        error: a
                    })
                }
            })
        }

        function K() {
            f.logDebug("ATT.rtc.Call: mute"), f.logInfo("Muting call...");
            try {
                n(!1), i("muted")
            } catch (a) {
                f.logError("Error muting call"), f.logTrace(a), ja.publish("error", {
                    error: a
                })
            }
        }

        function L() {
            f.logDebug("ATT.rtc.Call: unmute"), f.logInfo("Unmuting call...");
            try {
                n(!0), i("unmuted")
            } catch (a) {
                f.logError("Error unmuting call"), f.logTrace(a), ja.publish("error", {
                    error: a
                })
            }
        }

        function M() {
            f.logDebug("ATT.rtc.Call: hold"), f.logInfo("Holding call..."), fa = "holding", y("hold")
        }

        function N() {
            f.logDebug("ATT.rtc.Call: move"), f.logInfo("Moving call..."), y("move")
        }

        function O() {
            f.logDebug("ATT.rtc.Call: resume"), f.logInfo("Resuming call..."), ba = $.localSdp(), ba = g.modifyForResumeCall(ba), fa = "resuming", void 0 !== ba.sdp && f.logTrace("Local SDP", ba.sdp), ka.resumeCall({
                description: ba,
                sessionId: Y.sessionId,
                token: Y.token,
                callId: R,
                breed: X,
                onSuccess: function() {
                    f.logDebug("resumeCall: onSuccess"), f.logInfo("Successfully resumed the call")
                },
                onError: function(a) {
                    f.logDebug("resumeCall: onError"), f.logError("Error resuming the call"), f.logTrace(a), ja.publish("error", {
                        error: a
                    })
                }
            })
        }

        function P() {
            f.logDebug("ATT.rtc.Call: reject"), f.logInfo("Rejecting call..."), ia = !0, ka.rejectCall({
                callId: R,
                sessionId: Y.sessionId,
                token: Y.token,
                breed: X,
                onSuccess: function() {
                    f.logDebug("rejectCall: onSuccess"), f.logInfo("Successfully rejected the call")
                },
                onError: function(a) {
                    f.logDebug("rejectCall: onError"), f.logError("Error rejecting the call"), f.logTrace(a), ja.publish("error", a)
                }
            })
        }

        function Q(a) {
            if (f.logDebug("ATT.rtc.Call: transfer"), f.logInfo("Transferring call..."), f.logTrace(a), void 0 === a || 0 === Object.keys(a).length || void 0 === a.targetCallId) throw new Error("No targetCallId provided");
            ka.transferCall({
                callId: R,
                breed: X,
                sessionId: Y.sessionId,
                token: Y.token,
                targetCallId: a.targetCallId,
                transfereeSdp: U.getRemoteDescription().sdp,
                success: function() {
                    f.logDebug("transferCall: success"), f.logInfo("Successfully transferred the call"), "function" == typeof a.success && a.success()
                },
                error: function(b) {
                    f.logDebug("transferCall: error"), f.logError("Error transferring the call"), f.logTrace(b), "function" == typeof a.error && a.error(b)
                }
            })
        }
        f.logDebug("ATT.rtc.Call: Constructor");
        var R, S, T, U, V, W, X, Y, Z, $ = this,
            _ = {}, aa = {}, ba = null,
            ca = null,
            da = null,
            ea = null,
            fa = null,
            ga = [],
            ha = !1,
            ia = !1,
            ja = b.createEventEmitter(),
            ka = d.getRTCManager(),
            la = "";
        if (void 0 === a || 0 === Object.keys(a).length) throw new Error("No input provided");
        if (void 0 === a.breed) throw new Error("No breed provided");
        if ("call" === a.breed && void 0 === a.peer) throw new Error("No peer provided");
        if (void 0 === a.type) throw new Error("No type provided");
        if (void 0 === a.mediaType) throw new Error("No mediaType provided");
        X = a.breed, void 0 === a.id ? R = null : (R = a.id, z()), fa = "created", S = a.peer, T = a.index, V = a.mediaType, W = a.type, Y = a.sessionInfo, this.index = function() {
            return T
        }, this.peer = function() {
            return S
        }, this.codec = function() {
            return ga
        }, this.mediaType = function() {
            return V
        }, this.type = function() {
            return W
        }, this.breed = function() {
            return X
        }, this.participants = function() {
            return aa
        }, this.invitations = function() {
            return _
        }, this.sessionInfo = function() {
            return Y
        }, this.id = function() {
            return R
        }, this.localSdp = function() {
            return void 0 !== U ? null !== ba ? ba : U.getLocalDescription() : void 0
        }, this.remoteSdp = function() {
            var a;
            return void 0 === U ? ca : (a = U.getRemoteDescription(), a ? a.sdp : null)
        }, this.localStream = function() {
            return da
        }, this.remoteStream = function() {
            return ea
        }, this.canceled = function() {
            return ha
        }, this.rejected = function() {
            return ia
        }, this.setRemoteSdp = B, this.getState = h, this.setState = i, this.setId = A, this.on = C, this.off = D, this.addStream = E, this.connect = F, this.disconnect = I, this.disconnectConference = J, this.addParticipant = G, this.removeParticipant = H, this.mute = K, this.unmute = L, this.hold = M, this.resume = O, this.move = N, this.reject = P, this.transfer = Q, this.disableLocalMedia = p, this.enableLocalMedia = q
    }
    var b = ATT["private"].factories,
        c = ATT["private"]["enum"],
        d = ATT["private"].rtcManager,
        e = ATT.logManager.getInstance(),
        f = e.addLoggerForModule("att.rtc.call"),
        g = ATT.sdpFilter.getInstance();
    if (f.setLevel(e.logLevel.WARNING), f.logDebug("Loading att.rtc.call..."), void 0 === ATT.rtc) throw new Error("Cannot export Call. ATT.rtc is undefined");
    ATT.rtc.Call = a
}(),
function() {
    "use strict";

    function a() {
        function a(a) {
            e.logDebug("ATT.rtc.Session: onInvitationReceived"), e.logInfo("On getting invitation"), e.logTrace("Call information", a);
            var b, d, f;
            return null !== j.pendingCall ? void h.publish("notification", {
                from: a.from,
                mediaType: a.mediaType,
                type: a.type,
                timestamp: new Date,
                message: "Can only handle one incoming call at a time; ignoring the second incoming call."
            }) : Object.keys(m).length >= 2 ? void h.publish("notification", {
                from: a.from,
                mediaType: a.mediaType,
                type: a.type,
                timestamp: new Date,
                message: "Two calls already in progress, unable to handle a third incoming call."
            }) : (d = j.createCall({
                breed: a.type,
                id: a.id,
                peer: a.from,
                type: c.CALL_TYPE.INCOMING,
                mediaType: a.mediaType
            }), void(void 0 !== d && (a.sdp && (f = a.sdp, a.sdp.indexOf("a=sendonly") >= 0 && (f = f.replace(/a=sendonly/g, "a=inactive")), d.setRemoteSdp(f)), b = "call" === d.breed() ? "call:incoming" : "conference-invite", h.publish(b, {
                from: d.peer(),
                mediaType: d.mediaType(),
                codec: d.codec(),
                timestamp: new Date
            }))))
        }

        function f(a, b) {
            e.logDebug("ATT.rtc.Session: off"), e.logInfo("Unsubscribing the events"), e.logTrace("Event", a), h.unsubscribe(a, b)
        }

        function g(a, b) {
            if (e.logDebug("ATT.rtc.Session: on"), e.logInfo("Subscribing to session event: " + a), "ready" !== a && "connecting" !== a && "connected" !== a && "updating" !== a && "needs-refresh" !== a && "notification" !== a && "call:incoming" !== a && "conference-invite" !== a && "call:switched" !== a && "disconnecting" !== a && "disconnected" !== a && "address-updated" !== a && "all-calls-terminated" !== a && "error" !== a) throw e.logError("Event " + a + " not defined"), new Error("Event " + a + " not defined");
            h.unsubscribe(a, b), h.subscribe(a, b, this)
        }
        e.setLevel(d.logLevel.WARNING), e.logDebug("ATT.rtc.Session: Constructor");
        var h, i, j = this,
            k = null,
            l = null,
            m = {};
        h = b.createEventEmitter(), i = ATT["private"].rtcManager.getRTCManager(), this.timeout = null, this.e911Id = null, this.pendingCall = null, this.currentCall = null, this.timer = null, this.on = g.bind(this), this.off = f.bind(this), this.getToken = function() {
            return e.logDebug("ATT.rtc.Session: getToken"), e.logInfo("Getting the token"), e.logTrace("Token", l), l
        }, this.getId = function() {
            return e.logDebug("ATT.rtc.Session: getId"), e.logInfo("Getting the session Id"), e.logTrace("getId-Session Id", k), k
        }, this.setId = function(a) {
            return e.logDebug("ATT.rtc.Session: setId"), e.logInfo("set the session Id"), e.logTrace("setId-Session Id", a), k = a, null === a ? (e.logDebug("No session Id"), void h.publish("disconnected")) : void h.publish("connected")
        }, this.update = function(a) {
            if (e.logDebug("ATT.rtc.Session: update"), e.logInfo("Updating the session object"), e.logTrace("update-options", a), void 0 === a) throw e.logError("No options provided"), new Error("No options provided");
            if (void 0 !== a.timeout && "number" != typeof a.timeout) throw e.logError("Error invalid Timeout"), new Error("Timeout is not a number.");
            h.publish("updating", a), l = a.token || l, this.e911Id = a.e911Id || this.e911Id, e.logDebug("Updating the session object successfully"), void 0 !== a.timeout && (this.timeout = a.timeout < 6e4 ? a.timeout : a.timeout - 6e4, null !== this.timer && clearInterval(this.timer), this.timer = setInterval(function() {
                h.publish("needs-refresh"), i.refreshSession({
                    sessionId: k,
                    token: l,
                    success: function() {
                        e.logDebug("refreshSession: success"), e.logInfo("Successfully refreshed the session")
                    },
                    error: function(a) {
                        e.logDebug("refreshSession: error"), e.logInfo("Error refreshing the session"), e.logTrace(a), h.publish("error", {
                            error: a
                        })
                    }
                })
            }, this.timeout))
        }, this.connect = function(b) {
            e.logDebug("ATT.rtc.Session: connect"), e.logTrace("connect-options", b);
            try {
                if (void 0 === b) throw e.logError("No options passed"), ATT.errorDictionary.getSDKError("2002");
                if (void 0 === b.token) throw e.logError("No token passed"), ATT.errorDictionary.getSDKError("2001");
                try {
                    l = b.token, this.e911Id = b.e911Id, h.publish("connecting"), j = this, e.logInfo("Connect the session"), i.connectSession({
                        token: b.token,
                        e911Id: b.e911Id,
                        onSessionConnected: function(a) {
                            e.logDebug("connectSession: onSessionConnected"), e.logTrace("Session Information", a);
                            try {
                                j.setId(a.sessionId), j.update({
                                    timeout: a.timeout
                                })
                            } catch (b) {
                                e.logDebug("Error due to rtcManager.connectSession"), e.logError(b), h.publish("error", {
                                    error: ATT.errorDictionary.getSDKError("2004")
                                })
                            }
                        },
                        onSessionReady: function(b) {
                            e.logDebug("connectSession: onSessionReady"), e.logTrace("onSessionReady-data", b), h.publish("ready", b), i.on("invitation-received:" + k, a)
                        },
                        onError: function(a) {
                            e.logDebug("connectSession: onError"), e.logError("Error during connectSession"), e.logTrace("connectSession: error", a), h.publish("error", {
                                error: a
                            })
                        }
                    })
                } catch (c) {
                    throw e.logError("Error during connect"), e.logTrace("connect: error", c), ATT.errorDictionary.getSDKError("2004")
                }
            } catch (c) {
                e.logError("Error during connect"), e.logTrace(c), h.publish("error", {
                    error: c
                })
            }
        }, this.disconnect = function() {
            e.logDebug("ATT.rtc.Session: disconnect");
            try {
                h.publish("disconnecting"), clearInterval(this.timer), e.logInfo("Disconnect the session"), i.disconnectSession({
                    sessionId: j.getId(),
                    token: j.getToken(),
                    e911Id: j.e911Id,
                    onSessionDisconnected: function() {
                        e.logDebug("disconnectSession: onSessionDisconnected");
                        try {
                            j.setId(null)
                        } catch (a) {
                            h.publish("error", {
                                error: a
                            })
                        }
                    },
                    onError: function(a) {
                        e.logDebug("disconnectSession: onError"), e.logError("Error during disconnectSession"), e.logTrace("disconnectSession: error", a);
                        try {
                            j.setId(null)
                        } catch (b) {
                            e.logError("Error setting session id to null"), e.logTrace("setId: error", b)
                        }
                        h.publish("error", {
                            error: a
                        })
                    }
                })
            } catch (a) {
                e.logError("Error during disconnectSession"), e.logTrace(a), h.publish("error", {
                    error: a
                })
            }
        }, this.addCall = function(a) {
            e.logDebug("ATT.rtc.Session: addCall"), e.logInfo("Adding a call in the calls array"), e.logTrace("callId", a.id()), e.logTrace("Before", m), m[a.id()] = a, e.logTrace("After", m)
        }, this.createCall = function(a) {
            function b() {
                var a, b = 0;
                for (a in m) m.hasOwnProperty(a) && b < m[a].index() && (b = m[a].index());
                return b
            }
            e.logDebug("ATT.rtc.Session: createCall"), e.logInfo("Creating a new call"), e.logTrace("CreateCall-options", a);
            var c = new ATT.rtc.Call(ATT.utils.extend(a, {
                index: b() + 1,
                sessionInfo: {
                    sessionId: this.getId(),
                    token: this.getToken()
                }
            }));
            return e.logTrace("call.peer()", c.peer()), e.logTrace("call object", c), c.on("connected", function() {
                e.logDebug("call.on: connected"), null !== j.currentCall && (e.logInfo("Switching the calls..."), e.logTrace("From", j.currentCall.peer()), e.logTrace("To", j.pendingCall.peer()), h.publish("call:switched", {
                    from: j.currentCall.peer(),
                    to: j.pendingCall.peer(),
                    timestamp: new Date
                })), j.currentCall = j.pendingCall, j.pendingCall = null, j.addCall(j.currentCall)
            }), c.on("error", function() {
                e.logDebug("call.on: error"), c === j.pendingCall && (e.logInfo("Deleting pending call"), e.logTrace("session.pendingCall.peer", j.pendingCall.peer()), e.logTrace("session.pendingCall", j.pendingCall), j.pendingCall = null)
            }), this.pendingCall = c, e.logTrace("call.id", c.id()), e.logTrace("call object", c), c
        }, this.getCall = function(a) {
            return e.logDebug("ATT.rtc.Session: getCall"), e.logInfo("Getting call by id"), e.logTrace("callId", a), m[a]
        }, this.getCalls = function() {
            return e.logDebug("ATT.rtc.Session: getCalls"), e.logInfo("Getting all calls"), e.logTrace("calls", Object.keys(m)), m
        }, this.switchTo = function(a) {
            if (e.logDebug("ATT.rtc.Session: switchTo"), e.logInfo("Switching to call by callId"), e.logTrace("callId", a), void 0 === a) throw e.logError("You must pass a valid call id"), new Error("You must pass a valid call id");
            if (void 0 === m[a]) throw e.logError("Cannot find call with id " + a), new Error("Cannot find call with id " + a);
            h.publish("call:switched", {
                from: this.currentCall.peer(),
                to: m[a].peer(),
                timestamp: new Date
            }), this.currentCall = m[a], e.logTrace("currentCall.peer", this.currentCall.peer()), e.logTrace("currentCall", this.currentCall)
        }, this.terminateCalls = function() {
            e.logDebug("ATT.rtc.Session: terminateCalls"), e.logInfo("Terminating all the calls");
            var a;
            for (a in m) m.hasOwnProperty(a) && (e.logTrace("callId", a), e.logTrace("call.peer", m[a].peer()), m[a].disconnect())
        }, this.deleteCall = function(a) {
            if (e.logDebug("ATT.rtc.Session: deleteCall"), e.logInfo("Deleting a call by callId"), e.logTrace("callId", a), void 0 === m[a]) throw e.logError("Call not found"), new Error("Call not found");
            e.logInfo("Call deleted with peer " + m[a].peer()), e.logTrace("Call deleted", m[a]), delete m[a], 0 === Object.keys(m).length && (e.logInfo("All calls deleted from ATT.rtc.Session"), h.publish("all-calls-terminated"))
        }, this.deletePendingCall = function() {
            e.logDebug("ATT.rtc.Session: deletePendingCall"), e.logInfo("Deleting pending call"), null !== this.pendingCall && (e.logTrace("pendingCall.peer", this.pendingCall.peer()), e.logTrace("pendingCall", this.pendingCall), this.pendingCall = null)
        }, this.deleteCurrentCall = function() {
            e.logDebug("ATT.rtc.Session: deleteCurrentCall"), e.logInfo("Deleting current call"), null !== this.currentCall && (e.logTrace("currentCall.peer", this.currentCall.peer()), e.logTrace("currentCall", this.currentCall), this.deleteCall(this.currentCall.id()), this.currentCall = null)
        }, this.associateE911Id = function(a) {
            e.logDebug("ATT.rtc.Session: associateE911Id"), e.logInfo("Associating E911 ID"), e.logTrace("associateE911Id.options", a), i.associateE911Id(ATT.utils.extend(a, {
                sessionId: this.getId(),
                token: this.getToken(),
                onSuccess: function() {
                    e.logDebug("associateE911Id: onSuccess"), e.logInfo("Successfully associated E911 ID"), h.publish("address-updated")
                },
                onError: function(a) {
                    e.logDebug("associateE911Id: onError"), e.logError("Error during associating E911 ID"), e.logTrace(a), h.publish("error", {
                        error: a
                    })
                }
            }))
        }
    }
    var b = ATT["private"].factories,
        c = ATT["private"]["enum"],
        d = ATT.logManager.getInstance(),
        e = d.getLoggerByName("att.rtc.session");
    if (e.setLevel(d.logLevel.WARNING), e.logDebug("Loading att.rtc.session..."), void 0 === ATT.rtc) throw new Error("Cannot export Session. ATT.rtc is undefined");
    ATT.rtc.Session = a
}(),
function() {
    "use strict";

    function a() {
        function a(a) {
            return _.getSDKError(a)
        }

        function d(b, c) {
            e.logDebug("ATT.rtc.Phone: publishError");
            var d = a(b),
                f = {};
            f.error = void 0 === d ? "TODO: Error not in dictionary" : d, void 0 !== c && (f.data = c instanceof Error ? {
                message: c.message
            } : "string" == typeof c ? {
                message: c
            } : {
                message: JSON.stringify(c)
            }), e.logError("error", JSON.stringify(f)), Z.publish("error", f)
        }

        function f(a) {
            e.logDebug("call.on: rejected"), e.logInfo("call:rejected event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("call:rejected", a), $.deletePendingCall(), aa.stopUserMedia()
        }

        function g() {
            e.logDebug("Att.rtc.Phone: reject");
            try {
                var a = $.pendingCall;
                if (null === a || null === a.id()) return void d("12000");
                try {
                    a.off("rejected", f), a.on("rejected", f), e.logInfo("Rejecting..."), a.reject()
                } catch (b) {
                    return e.logError("Error during reject"), e.logTrace(b), void d("12001")
                }
            } catch (b) {
                e.logError("Error during reject"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function h() {
            e.logDebug("ATT.rtc.Phone: rejectConference");
            try {
                if (null === $ || null === $.getId()) return void d("22001");
                if (null === $.pendingCall) return void d("22002");
                try {
                    var a = $.pendingCall;
                    e.logTrace(a.peer(), a), a.on("rejected", function(a) {
                        e.logDebug("conference.on: rejected"), e.logInfo("conference:invitation-rejected event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:invitation-rejected", a), $.deletePendingCall(), aa.stopUserMedia()
                    }), e.logInfo("Rejecting conference invite..."), a.reject()
                } catch (b) {
                    return e.logError("Error during reject conference"), e.logTrace(b), void d("22000")
                }
            } catch (b) {
                e.logError("Error during reject conference"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function i(a, b) {
            var c, d;
            for (e.logDebug("ATT.rtc.Phone: validOperation"), e.logTrace("Operation", a), e.logTrace("State", b), c = {
                mute: ["connected", "resumed", "unmuted"],
                unmute: ["resumed", "muted"],
                resume: ["held"],
                hold: ["connected", "resumed", "muted", "unmuted"]
            }, d = 0; d < c[a].length; d += 1)
                if (b === c[a][d]) return !0;
            return !1
        }

        function j(a) {
            Z.publish("call:moved", a)
        }

        function k(a) {
            var b = $.currentCall;
            return aa.showStream({
                localOrRemote: "local",
                stream: b.localStream()
            }), aa.showStream({
                localOrRemote: "remote",
                stream: b.remoteStream()
            }), "conference" === b.breed() ? (e.logDebug("conference.on: resumed"), e.logInfo("conference:resumed event by ATT.rtc.Phone"), e.logTrace("data", a), void Z.publish("conference:resumed", a)) : (e.logDebug("call.on: resumed"), e.logInfo("call resumed by ATT.rtc.Phone"), e.logTrace("data", a), void Z.publish("call:resumed", a))
        }

        function l(a) {
            var b = $.currentCall;
            return "conference" === b.breed() ? (e.logDebug("conference.on: held"), e.logInfo("conference:held event by ATT.rtc.Phone"), e.logTrace("data", a), void Z.publish("conference:held", a)) : (e.logDebug("call.on: held"), e.logInfo("call:held event by ATT.rtc.Phone"), e.logTrace("data", a), void Z.publish("call:held", a))
        }

        function m(a, b) {
            var c, d;
            return e.logDebug("ATT.rtc.Phone: onCallDisconnected"), e.logInfo("call:disconnected event by ATT.rtc.Phone"), e.logTrace("data", b), Z.publish("call:disconnected", b), $.currentCall && a.id() === $.currentCall.id() ? (e.logInfo("Deleting current call"), $.deleteCurrentCall(), c = $.getCalls(), aa.stopUserMedia(), d = Object.keys(c), e.logTrace("Remaining background calls", d.length), void(d.length > 0 && (e.logInfo("Setting background call as current call"), $.currentCall = c[d[0]], "held" === $.currentCall.getState() && $.currentCall.autoresume && (e.logInfo("Resuming current call"), e.logTrace($.currentCall.peer(), $.currentCall), $.currentCall.off("resumed", k), $.currentCall.on("resumed", k), $.currentCall.resume())))) : $.pendingCall && a.id() === $.pendingCall.id() ? (e.logInfo("Deleting pending call"), e.logTrace($.pendingCall.peer(), $.pendingCall), $.deletePendingCall(), void aa.stopUserMedia()) : (e.logInfo("Deleting background call"), e.logTrace(a.peer(), a), $.deleteCall(a.id()), void aa.stopUserMedia())
        }

        function n(a) {
            e.logDebug("call.on: canceled"), e.logInfo("call:canceled event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("call:canceled", a), $.deletePendingCall(), aa.stopUserMedia()
        }

        function o(a) {
            e.logDebug("ATT.rtc.Phone: onSessionReady"), e.logTrace("data", a), Z.publish("session:ready", a)
        }

        function p(a) {
            e.logDebug("ATT.rtc.Phone: onSessionDisconnected"), e.logTrace("data", a), Z.publish("session:disconnected", a), aa.stopUserMedia(), $.off("ready", o), $.off("disconnected", p)
        }

        function q(a) {
            return a = a.replace(/\s/g, ""), a.indexOf("sip:") > -1 || a.indexOf("tel:") > -1 ? !0 : !1
        }

        function r(a) {
            e.logDebug("ATT.rtc.Phone: cleanPhoneNumber");
            try {
                return e.logInfo("Attempting to clean the phone number " + a), ATT.phoneNumber.cleanPhoneNumber(a)
            } catch (b) {
                e.logError("Error during cleanPhoneNumber"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function s(a) {
            e.logDebug("ATT.rtc.Phone: formatNumber");
            try {
                return e.logInfo("Attempting to format the phone number " + a), ATT.phoneNumber.formatNumber(a)
            } catch (b) {
                e.logError("Error during formatNumber"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function t(a) {
            if (void 0 === a) return null;
            var b, c, d = {};
            try {
                a.indexOf(";") > -1 && (b = a.split(";"), b.forEach(function(b, c) {
                    if (0 === c) a = b;
                    else if (b.indexOf("=") > -1) {
                        var e = b.split("=");
                        e.length > 0 && (d[e[0]] = 2 === e.length ? e[1] : "")
                    }
                })), a.indexOf(":") > -1 && (b = a.split(":"), d.protocol = b.length > 0 ? b[0] : "", a = b.length >= 2 ? b[1] : "", d.port = b.length >= 3 ? b[2] : ""), b = a.split("@"), d.callerId = b.length > 0 ? b[0] : "", d.domain = b.length >= 2 ? b[1] : "", c = new RegExp("^[+]?[0-9]+", "g"), d.callerId.match(c) || (d.callerId = d.callerId + "@" + d.domain)
            } catch (f) {
                e.logError("Error during getCallerInfo"), e.logTrace(f), Z.publish("error", {
                    error: f
                })
            }
            return d
        }

        function u(a, b) {
            if (e.logDebug("ATT.rtc.Phone: on"), e.logInfo("Subscribing to phone event: " + a), "session:ready" !== a && "session:disconnected" !== a && "session:call-switched" !== a && "session:expired" !== a && "notification" !== a && "dialing" !== a && "answering" !== a && "call:incoming" !== a && "call:connecting" !== a && "call:connected" !== a && "call:disconnecting" !== a && "call:disconnected" !== a && "call:muted" !== a && "call:unmuted" !== a && "call:held" !== a && "call:resumed" !== a && "call:canceled" !== a && "call:rejected" !== a && "call:moved" !== a && "call:transferring" !== a && "call:transferred" !== a && "address-updated" !== a && "call:ringback-provided" !== a && "media:established" !== a && "conference:invitation-received" !== a && "conference:joining" !== a && "conference:invitation-sending" !== a && "conference:invitation-rejected" !== a && "conference:connecting" !== a && "conference:invitation-sent" !== a && "conference:invitation-accepted" !== a && "conference:participant-removed" !== a && "conference:held" !== a && "conference:resumed" !== a && "conference:disconnecting" !== a && "conference:ended" !== a && "conference:canceled" !== a && "conference:connected" !== a && "warning" !== a && "error" !== a) throw new Error("Event " + a + " not defined");
            Z.unsubscribe(a, b), Z.subscribe(a, b, this)
        }

        function v() {
            e.logDebug("ATT.rtc.Phone: getCalls");
            var a, b, c, d, f = $.getCalls(),
                g = [];
            e.logInfo("Getting list of calls...");
            for (a in f)
                if (f.hasOwnProperty(a)) {
                    if (e.logTrace("call id", a), b = {
                        index: f[a].index(),
                        state: f[a].getState(),
                        breed: f[a].breed(),
                        type: f[a].type()
                    }, "conference" === f[a].breed()) {
                        b.participants = [], d = f[a].participants(), e.logTrace("Participants", Object.keys(d).length);
                        for (c in d) d.hasOwnProperty(c) && (e.logTrace("participant", c), b.participants.push(d[c]))
                    } else b.peer = f[a].peer();
                    g.push(b)
                }
            return e.logTrace("Call List", g), g
        }

        function w() {
            return $
        }

        function x(a) {
            e.logDebug("ATT.rtc.Phone: login"), e.logTrace("options", a);
            try {
                if (null !== $.getId()) return void e.logInfo("User is already logged in!");
                if (void 0 === a) return void d("2002");
                if (void 0 === a.token) return void d("2001");
                try {
                    $.off("ready", o), $.on("ready", o), e.logInfo("logging in..."), $.connect(a)
                } catch (b) {
                    return e.logError("Error during login"), e.logTrace(b), void d("2004")
                }
            } catch (b) {
                e.logError("Error during login"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function y(a) {
            if (e.logDebug("ATT.rtc: associateAccessToken"), e.logInfo("Associating access token  Domain"), void 0 === a || 0 === Object.keys(a).length) throw new Error("No options provided");
            if (void 0 === a.userId) throw new Error("No userId provided");
            if (void 0 === a.token) throw new Error("No token provided");
            if (void 0 === a.success) throw new Error("No success callback provided");
            if (void 0 === a.error) throw new Error("No error callback provided");
            var b = ATT["private"].rtcManager.getRTCManager();
            b.associateToken(a)
        }

        function z(a) {
            e.logDebug("ATT.rtc.Phone: associateE911Id");
            try {
                if (void 0 === a) return void d("17000");
                if (void 0 === $ || null === $.getId()) return void d("17002");
                if (void 0 === a.e911Id || null === a.e911Id) return void d("17000");
                try {
                    $.on("address-updated", function() {
                        e.logDebug("session.on: address-updated"), e.logInfo("address-updated event by ATT.rtc.Phone"), Z.publish("address-updated")
                    }), e.logTrace($.getId(), $), e.logTrace("E911 Id", $.e911Id), e.logInfo("Associating E911 Id..."), $.associateE911Id(a)
                } catch (b) {
                    return e.logInfo("Error during associateE911Id"), e.logTrace(b), void d("17001")
                }
            } catch (b) {
                e.logInfo("Error during associateE911Id"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function A() {
            function a() {
                e.logDebug("session.on: all-calls-terminated"), e.logInfo("All calls were terminated successfully"), $.off("all-calls-terminated", a), e.logInfo("logging out..."), $.disconnect()
            }
            e.logDebug("ATT.rtc.Phone: logout"), $.on("error", p);
            try {
                if (null === $ || null === $.getId()) return void d("3001");
                try {
                    e.logInfo("logging out..."), $.off("disconnected", p), $.on("disconnected", p), null !== $.pendingCall && (e.logInfo("Pending call exist. Deleting pending call..."), e.logTrace($.pendingCall.peer(), $.pendingCall), $.deletePendingCall()), Object.keys($.getCalls()).length > 0 ? (e.logInfo("Active calls exist. Attempting to disconnect active calls..."), $.on("all-calls-terminated", a), $.terminateCalls()) : (e.logInfo("logging out..."), $.disconnect())
                } catch (b) {
                    return e.logError("Error during logout"), e.logTrace(b), void d("3000")
                }
            } catch (b) {
                e.logError("Error during logout"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function B() {
            e.logDebug("ATT.rtc.Phone: rejectCallOnMediaError"), e.logInfo("Rejecting incoming call");
            var a, b = $.pendingCall;
            a = b.id(), b && void 0 !== a && null !== a && g()
        }

        function C(a, b, f) {
            e.logDebug("ATT.rtc.Phone: connectWithMediaStream"), e.logTrace("connectOpts", a), b.on("stream-added", function(a) {
                e.logDebug("call.on: stream-added"), aa.showStream({
                    stream: a.stream,
                    localOrRemote: "remote"
                })
            }), void 0 === a.mediaType && (a.mediaType = b.mediaType()), e.logInfo("Attempting to get user media"), aa.getUserMedia(ATT.utils.extend({
                onUserMedia: function(a) {
                    try {
                        e.logDebug("getUserMedia: onUserMedia"), e.logInfo("Got user media"), e.logTrace("media", a), b.addStream(a.localStream), e.logInfo("Connecting..."), b.connect()
                    } catch (c) {
                        e.logError("Error during onUserMedia"), e.logTrace(c), void 0 !== f && "function" == typeof f && f(c)
                    }
                },
                onMediaEstablished: function() {
                    if (e.logDebug("getUserMedia: onMediaEstablished"), e.logInfo("Remote media established"), null !== $.pendingCall && "connecting" === $.pendingCall.getState() && "call" === $.pendingCall.breed()) return e.logInfo("Got early media"), e.logInfo("call:ringback-provided event by ATT.rtc.Phone"), void Z.publish("call:ringback-provided", {
                        timestamp: new Date
                    });
                    if (null !== $.currentCall && "connected" === $.currentCall.getState()) {
                        var a = {
                            mediaType: $.currentCall.mediaType(),
                            codec: $.currentCall.codec(),
                            timestamp: new Date
                        };
                        c.CALL_TYPE.OUTGOING === $.currentCall.type() ? a.to = $.currentCall.peer() : a.from = $.currentCall.peer(), e.logInfo("media:established event by ATT.rtc.Phone"), Z.publish("media:established", a)
                    }
                },
                onUserMediaError: function(a) {
                    e.logDebug("getUserMedia: onUserMediaError"), e.logTrace(a), B(), d("13005", a)
                }
            }, a))
        }

        function D(a) {
            e.logDebug("ATT.rtc.Phone: dial"), e.logTrace("options", a);
            var b;
            try {
                if (null === $.getId()) return void d("4004");
                if (void 0 === a) return void d("4009");
                if (void 0 === a.localMedia || "VIDEO" !== a.localMedia.tagName && "AUDIO" !== a.localMedia.tagName) return void d("4006");
                if (void 0 === a.remoteMedia || "VIDEO" !== a.remoteMedia.tagName && "AUDIO" !== a.remoteMedia.tagName) return void d("4007");
                if (void 0 === a.destination) return void d("4008");
                if (void 0 !== a.mediaType && "audio" !== a.mediaType && "video" !== a.mediaType) return void d("4002");
                if (q(a.destination)) return void d("4000");
                if ($.pendingCall) return void d("4010");
                if (a.destination.split("@").length > 2) return void d("4001");
                try {
                    Z.publish("dialing", {
                        to: a.destination,
                        mediaType: a.mediaType,
                        timestamp: new Date
                    }), b = $.createCall({
                        peer: a.destination,
                        breed: "call",
                        type: c.CALL_TYPE.OUTGOING,
                        mediaType: a.mediaType,
                        localMedia: a.localMedia,
                        remoteMedia: a.remoteMedia
                    }), e.logTrace(b.peer(), b), b.on("connecting", function(a) {
                        e.logDebug("call.on: connecting"), e.logInfo("call:connecting event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("call:connecting", a)
                    }), b.on("rejected", f), b.on("connected", function(a) {
                        e.logDebug("call.on: connected"), e.logInfo("call:connected event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("call:connected", a)
                    }), b.on("disconnected", function(a) {
                        e.logDebug("call.on: disconnected"), m(b, a)
                    }), b.on("notification", function(a) {
                        e.logDebug("call.on: notification"),
                        e.logInfo("notification event by ATT.rtc.Phone"), Z.publish("notification", a), $.deletePendingCall(), aa.stopUserMedia()
                    }), b.on("error", function(a) {
                        return e.logDebug("call.on: error"), e.logError("error event by ATT.rtc.Phone"), e.logTrace("data", a), a.error && 404 === a.error.HttpStatusCode ? (e.logError("session:expired by ATT.rtc.Phone"), void Z.publish("session:expired", a)) : void Z.publish("error", a)
                    }), e.logInfo("Dialing..."), C(a, b, function(a) {
                        e.logError("Error during connectWthMediaStream"), e.logTrace(a), Z.publish("error", {
                            error: ATT.errorDictionary.getSDKError("4003"),
                            data: a
                        })
                    })
                } catch (g) {
                    return e.logError("Error during dial"), e.logTrace(g), void d("4003")
                }
            } catch (g) {
                e.logError("Error during dial"), e.logTrace(g), Z.publish("error", {
                    error: g
                })
            }
        }

        function E(a) {
            function b() {
                e.logDebug("ATT.rtc.Phone: dialSecondCall"), c.off("held", b), e.logInfo("Dialing second call..."), D(a)
            }
            e.logDebug("ATT.rtc.Phone: addCall"), e.logTrace("options", a);
            var c;
            if (2 <= v().length) return void d("27010");
            try {
                if (void 0 === a) return void d("27001");
                if (void 0 === a.localMedia || "VIDEO" !== a.localMedia.tagName && "AUDIO" !== a.localMedia.tagName) return void d("27002");
                if (void 0 === a.remoteMedia || "VIDEO" !== a.remoteMedia.tagName && "AUDIO" !== a.remoteMedia.tagName) return void d("27003");
                if (void 0 === a.destination) return void d("27004");
                if (q(a.destination)) return void d("27005");
                if (a.destination.split("@").length > 2) return void d("27006");
                if (void 0 !== a.mediaType && "audio" !== a.mediaType && "video" !== a.mediaType) return void d("27007");
                if (null === $.getId()) return void d("27008");
                if (null === $.currentCall) return void d("27009");
                try {
                    c = $.currentCall, e.logInfo("Putting existing call on hold"), c.on("held", b), c.hold(), c.autoresume = !0
                } catch (f) {
                    return e.logError("Error during hold current call"), e.logTrace(f), void d("27000", f)
                }
            } catch (f) {
                e.logError("Error during addCall"), e.logTrace(f), Z.publish("error", {
                    error: f
                })
            }
        }

        function F(a, b) {
            e.logDebug("ATT.rtc.Phone: answerCall"), e.logTrace("options", b), Z.publish("answering", {
                from: a.peer(),
                mediaType: a.mediaType(),
                codec: a.codec(),
                timestamp: new Date
            }), a.on("connecting", function(a) {
                e.logDebug("call.on: connecting"), e.logInfo("call:connecting event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("call:connecting", a)
            }), a.on("connected", function(a) {
                e.logDebug("call.on: connected"), e.logInfo("call:connecting event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("call:connected", a)
            }), a.on("disconnected", function(b) {
                e.logDebug("call.on: disconnected"), m(a, b)
            }), a.on("notification", function(a) {
                e.logDebug("call.on: notification"), e.logInfo("call:connecting event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("notification", a), $.deleteCurrentCall(), aa.stopUserMedia()
            }), a.on("error", function(a) {
                e.logDebug("call.on: error"), e.logError("error event by ATT.rtc.Phone"), e.logTrace("data", a), a.error && 404 === a.error.HttpStatusCode && (e.logError("session:expired by ATT.rtc.Phone"), Z.publish("session:expired", a)), Z.publish("error", a)
            }), e.logInfo("Answering..."), C(b, a)
        }

        function G(a) {
            function b() {
                e.logDebug("ATT.rtc.Phone: answerSecondCall"), e.logInfo("Answering second call"), c = "end" === a.action ? "disconnected" : "held", g.off(c, b), F(f, a)
            }
            e.logDebug("ATT.rtc.Phone: answer"), e.logTrace("options", a);
            var c, f, g;
            try {
                if (void 0 === a) return void d("5004");
                if (void 0 === a.localMedia || "VIDEO" !== a.localMedia.tagName && "AUDIO" !== a.localMedia.tagName) return void d("5001");
                if (void 0 === a.remoteMedia || "VIDEO" !== a.remoteMedia.tagName && "AUDIO" !== a.remoteMedia.tagName) return void d("5001");
                if (null === $.getId()) return void d("5003");
                if (f = $.pendingCall, null === f) return void d("5000");
                if (void 0 !== a.action && "hold" !== a.action && "end" !== a.action) return void d("5005");
                if (g = $.currentCall, null !== g) {
                    if (e.logTrace(g.peer(), g), e.logInfo("There is an existing call"), void 0 === a.action) return void d("5005");
                    if ("hold" === a.action) {
                        if ("held" !== g.getState()) return e.logInfo("Putting the current call on hold"), g.on("held", b), g.hold(), void(g.autoresume = !0);
                        b(f, a, !0)
                    }
                    return void("end" === a.action && (e.logInfo("Ending the current call"), g.on("disconnected", b), g.disconnect()))
                }
                void 0 !== a.action && e.logWarning("There is no current call. Action `" + a.action + "` will be ignored"), F(f, a)
            } catch (h) {
                return e.logError("Error during answer"), e.logTrace(h), void d("5002", h)
            }
        }

        function H() {
            e.logDebug("ATT.rtc.Phone: hangup");
            var a;
            try {
                if (a = $.currentCall, null === a || null === a.id()) return void d("6000");
                try {
                    e.logTrace(a.peer(), a), a.on("disconnecting", function(a) {
                        e.logDebug("call.on: disconnecting"), e.logInfo("call:disconnecting event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("call:disconnecting", a)
                    }), e.logInfo("Hanging up..."), a.disconnect()
                } catch (b) {
                    return e.logError("Error during hangup"), e.logTrace(b), void d("6001")
                }
            } catch (b) {
                e.logError("Error during hangup"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function I() {
            e.logDebug("Att.rtc.Phone: cancel");
            var a = $.pendingCall;
            try {
                if (null === a) return void d("11000");
                try {
                    e.logTrace(a.peer(), a), a.off("canceled", n), a.on("canceled", n), e.logInfo("Canceling..."), a.disconnect()
                } catch (b) {
                    return e.logError("Error during cancel"), e.logTrace(b), void d("11001")
                }
            } catch (b) {
                e.logError("Error during cancel"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function J(a) {
            e.logDebug("ATT.rtc.Phone: startConference"), e.logTrace("options", a);
            var b;
            try {
                if (void 0 === a || 0 === Object.keys(a).length) return e.logError("No options provided"), void d("18000");
                if (void 0 === $ || null === $.getId()) return e.logError("Cannot start session. user is not logged in"), void d("18007");
                if (null !== $.currentCall && "conference" === $.currentCall.breed()) return e.logError("Cannot start conference. Another conference already exists"), void d("18006");
                if (void 0 === a.localMedia || "VIDEO" !== a.localMedia.tagName && "AUDIO" !== a.localMedia.tagName) return e.logError("localMedia not provided"), void d("18001");
                if (void 0 === a.remoteMedia || "VIDEO" !== a.remoteMedia.tagName && "AUDIO" !== a.remoteMedia.tagName) return e.logError("remoteMedia not provided"), void d("18002");
                if (void 0 === a.mediaType || "audio" !== a.mediaType && "video" !== a.mediaType) return e.logError("mediaType not provided"), void d("18003");
                a.breed = "conference", a.type = c.CALL_TYPE.OUTGOING, b = $.createCall(a), e.logTrace(b.peer(), b), b.on("error", function(a) {
                    e.logDebug("conference.on: error"), e.logError("error event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("error", a)
                }), b.on("connected", function(a) {
                    e.logDebug("conference.on: connected"), e.logInfo("conference:connected event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:connected", a)
                }), b.on("response-pending", function(a) {
                    e.logDebug("conference.on: response-pending"), e.logInfo("conference:invitation-sent event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:invitation-sent", a)
                }), b.on("invite-accepted", function(a) {
                    e.logDebug("conference.on: invite-accepted"), e.logInfo("conference:invitation-accepted event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:invitation-accepted", a)
                }), b.on("rejected", function(a) {
                    e.logDebug("conference.on: rejected"), e.logInfo("conference:invitation-rejected event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:invitation-rejected", a)
                }), b.on("notification", function(a) {
                    e.logDebug("conference.on: notification"), e.logInfo("notification event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("notification", a)
                }), b.on("participant-removed", function(a) {
                    e.logDebug("conference.on: participant-removed"), e.logInfo("conference:participant-removed event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:participant-removed", a)
                }), b.on("disconnected", function(a) {
                    e.logDebug("conference.on: disconnected"), e.logInfo("conference:ended event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:ended", a), $.deleteCurrentCall(), aa.stopUserMedia()
                }), e.logInfo("Starting conference..."), C(a, b)
            } catch (f) {
                return void d("18005", f)
            }
        }

        function K(a) {
            e.logDebug("ATT.rtc.Phone: joinConference"), e.logTrace("options", a);
            try {
                if (null === $ || null === $.getId()) return void d("20001");
                if (null === $.pendingCall) return void d("20002");
                try {
                    var b = $.pendingCall;
                    e.logTrace(b.peer(), b), Z.publish("conference:joining", {
                        from: b.peer(),
                        mediaType: b.mediaType(),
                        codec: b.codec(),
                        timestamp: new Date
                    }), b.on("error", function(a) {
                        e.logDebug("conference.on: error"), e.logError("error event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("error", a)
                    }), b.on("connecting", function(a) {
                        e.logDebug("conference.on: connecting"), e.logInfo("conference:connecting event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:connecting", a)
                    }), b.on("connected", function(a) {
                        e.logDebug("conference.on: connected"), e.logInfo("conference:connected event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:connected", a)
                    }), b.on("disconnected", function(a) {
                        e.logDebug("conference.on: disconnected"), e.logInfo("conference:ended event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:ended", a), $.deleteCurrentCall(), aa.stopUserMedia()
                    }), b.on("notification", function(a) {
                        e.logDebug("conference.on: notification"), e.logInfo("notification event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("notification", a), $.deleteCurrentCall(), aa.stopUserMedia()
                    }), e.logInfo("Joining conference..."), C(a, b, function(a) {
                        e.logError("Error during connectWithMediaStream"), e.logTrace(a), Z.publish("error", {
                            error: ATT.errorDictionary.getSDKError("20000"),
                            data: a
                        })
                    })
                } catch (c) {
                    return e.logError("Error during joinConference"), e.logTrace(c), void d("20000")
                }
            } catch (c) {
                e.logError("Error during joinConference"), e.logTrace(c), Z.publish("error", {
                    error: c
                })
            }
        }

        function L(a) {
            e.logDebug("ATT.rtc.Phone: addParticipants"), e.logTrace("participants", a);
            var b, c, f, g, h, i;
            try {
                if (void 0 === a) return e.logError("Parameter missing"), void d("24000");
                if ("object" != typeof a || null === a || 0 === Object.keys(a).length) return void d("24001");
                if (null === $.getId()) return void d("24002");
                if (b = $.currentCall, e.logTrace(b.peer(), b), "conference" !== b.breed()) return e.logError("Conference not initiated "), void d("24003");
                for (e.logInfo("Getting list of current participants"), h = b.participants(), e.logTrace("currentParticipants", h), e.logInfo("Validating list of participants to add"), c = 0; c < a.length; c += 1) {
                    if (f = a[c], q(f)) return void d("24006");
                    if (f.split("@").length > 2) return void d("24007");
                    a[c] = f
                }
                e.logTrace("participants", a);
                try {
                    for (e.logInfo("Adding Participant..."), i = function(a) {
                        Z.publish("conference:invitation-sending", {
                            invitee: a,
                            timestamp: new Date
                        }), b.addParticipant(a)
                    }, c = 0; c < a.length; c += 1)
                        if (e.logInfo(c), f = a[c], e.logTrace("invitee", f), 0 === Object.keys(h).length) i(f);
                        else {
                            for (g in h)
                                if (h.hasOwnProperty(g) && f === g) return void d("24005", {
                                    invitee: f,
                                    timestamp: new Date
                                });
                            i(f)
                        }
                } catch (j) {
                    return e.logInfo("Error during addParticipants"), e.logTrace(j), void d("24004", j)
                }
            } catch (j) {
                e.logInfo("Error during addParticipants"), e.logTrace(j), Z.publish("error", {
                    error: j
                })
            }
        }

        function M(a) {
            e.logDebug("ATT.rtc.Phone: addParticipant"), e.logTrace("invitee", a);
            try {
                if (void 0 === a) return void d("19000");
                try {
                    e.logInfo("Adding Participant..."), this.addParticipants([a])
                } catch (b) {
                    return e.logInfo("Error during addParticipant"), e.logTrace(b), void d("19001", b)
                }
            } catch (b) {
                e.logInfo("Error during addParticipant"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function N() {
            e.logDebug("ATT.rtc.Phone: getParticipants");
            var a, b;
            try {
                if (null === $.getId()) return void d("21002");
                if (a = $.currentCall, null === a || "conference" !== a.breed()) return void d("21000");
                try {
                    return e.logTrace(a.peer(), a), e.logInfo("Getting participants..."), b = a.participants(), e.logTrace("participants", b), b
                } catch (c) {
                    return e.logError("Error during getParticipants"), e.logTrace(c), void d("21001", c)
                }
            } catch (c) {
                e.logError("Error during getParticipants"), e.logTrace(c), Z.publish("error", {
                    error: c
                })
            }
        }

        function O(a) {
            e.logDebug("ATT.rtc.Phone: removeParticipant");
            var b;
            try {
                if (null === $.getId()) return void d("25000");
                if (b = $.currentCall, null === b || "conference" !== b.breed()) return void d("25001");
                if (void 0 === a) return void d("25002");
                try {
                    e.logTrace(b.peer(), b), e.logInfo("Removing participant"), b.removeParticipant(a)
                } catch (c) {
                    return e.logError("Error during removeParticipant"), e.logTrace(c), void d("25003")
                }
            } catch (c) {
                e.logError("Error during removeParticipant"), e.logTrace(c), Z.publish("error", {
                    error: c
                })
            }
        }

        function P() {
            e.logDebug("ATT.rtc.Phone: endConference");
            var a;
            try {
                if (null === $.getId()) return void d("23001");
                if (a = $.currentCall, null === a || "conference" !== a.breed()) return void d("23002");
                e.logTrace(a.peer(), a), a.on("disconnecting", function(a) {
                    e.logDebug("conference.on: disconnecting"), e.logInfo("conference:disconnecting event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("conference:disconnecting", a)
                });
                try {
                    e.logInfo("Disconnecting conference"), a.disconnectConference()
                } catch (b) {
                    return e.logError("Error during endConference"), e.logTrace(b), void d("23000", b)
                }
            } catch (b) {
                e.logError("Error during endConference"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function Q() {
            e.logDebug("ATT.rtc.Phone: mute");
            try {
                var a = $.currentCall;
                if (null === a || null === a.id) return void d("9000");
                try {
                    if (e.logTrace(a.peer(), a), a.on("muted", function(a) {
                        e.logDebug("call.on: muted"), e.logInfo("call:muted event by ATT.rtc.Phone"), Z.publish("call:muted", a)
                    }), "muted" === a.getState()) return e.logWarning("warning event by ATT.rtc.Phone"), void Z.publish("warning", {
                        message: "Already muted"
                    });
                    if (i("mute", a.getState())) return e.logInfo("Muting..."), void a.mute();
                    e.logWarning("Invalid operation mute. Call state is " + a.getState())
                } catch (b) {
                    return e.logError("Error during mute"), e.logTrace(b), void d("9001")
                }
            } catch (b) {
                e.logError("Error during mute"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function R() {
            e.logDebug("ATT.rtc.Phone: unmute");
            try {
                var a = $.currentCall;
                if (null === a || null === a.id) return void d("10000");
                try {
                    if (e.logTrace(a.peer(), a), a.on("unmuted", function(a) {
                        e.logDebug("call.on: unmuted"), e.logInfo("call:unmuted event by ATT.rtc.Phone"), Z.publish("call:unmuted", a)
                    }), "unmuted" === a.getState()) return e.logWarning("warning event by ATT.rtc.Phone"), void Z.publish("warning", {
                        message: "Already unmuted"
                    });
                    if (i("unmute", a.getState())) return e.logInfo("Unmuting..."), void a.unmute();
                    e.logWarning("Invalid operation unmute. Call state is " + a.getState())
                } catch (b) {
                    return e.logError("Error during unmute"), e.logTrace(b), void d("10001")
                }
            } catch (b) {
                e.logError("Error during unmute"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function S() {
            e.logDebug("ATT.rtc.Phone: hold");
            var a;
            a = $.currentCall;
            try {
                if (e.logTrace(a.peer(), a), null === a || null === a.id()) return void d("7000");
                if ("held" === a.getState()) return e.logWarning("Call is already on hold"), void Z.publish("warning", {
                    message: "Call is already on hold",
                    timestamp: new Date
                });
                try {
                    if (i("hold", a.getState())) return e.logInfo("Holding..."), a.off("held", l), a.on("held", l), void a.hold();
                    e.logWarning("Invalid operation hold. Call state is " + a.getState())
                } catch (b) {
                    return e.logError("Error during hold"), e.logTrace(b), void d("7001")
                }
            } catch (b) {
                e.logError("Error during hold"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function T() {
            e.logDebug("ATT.rtc.Phone: resume");
            var a;
            a = $.currentCall;
            try {
                if (null === a) return void d("8000");
                if (e.logTrace(a.peer(), a), !i("resume", a.getState())) return void d("8001");
                try {
                    e.logInfo("Resuming..."), a.off("resumed", k), a.on("resumed", k), a.resume()
                } catch (b) {
                    return e.logError("Error during resume"), e.logTrace(b), void d("8002")
                }
            } catch (b) {
                e.logError("Error during resume"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function U() {
            e.logDebug("ATT.rtc.Phone: move");
            var a;
            try {
                if (null === $ || null === $.getId()) return void d("28000");
                if (a = $.currentCall, null === a || null === a.id()) return void d("28001");
                try {
                    e.logTrace(a.peer(), a), e.logInfo("Moving..."), a.off("moved", j), a.on("moved", j), a.move()
                } catch (b) {
                    return e.logError("Error during move"), e.logTrace(b), void d("28002")
                }
            } catch (b) {
                e.logError("Error during move"), e.logTrace(b), Z.publish("error", {
                    error: b
                })
            }
        }

        function V() {
            function a() {
                e.logDebug("ATT.rtc.Phone: switchToCall");
                var c, d, f;
                b.off("held", a), d = $.getCalls();
                for (c in d)
                    if (d.hasOwnProperty(c) && c !== b.id()) {
                        f = c;
                        break
                    }
                e.logInfo("Switching calls..."), e.logTrace("Switch to call id", f), $.switchTo(f), b = $.currentCall, "held" === b.getState() && b.autoresume && (e.logInfo("resuming current call"), b.off("resumed", k), b.on("resumed", k), b.resume(), b.autoresume = !1)
            }
            e.logDebug("ATT.rtc.Phone: switchCall");
            var b = $.currentCall;
            try {
                if (null === $ || null === $.getId()) return void d(30001);
                if (null === $.currentCall || null === $.currentCall.id()) return void d(30002);
                if (2 > Object.keys($.getCalls()).length) return void d(30003);
                if (e.logTrace(b.peer(), b), "held" !== b.getState()) return e.logInfo("Putting current call on hold"), b.on("held", a), b.hold(), void(b.autoresume = !0);
                a()
            } catch (c) {
                return e.logError("Error during switch"), e.logTrace(c), void d(3e4)
            }
        }

        function W() {
            function a(a) {
                Z.publish("call:transferring", a)
            }

            function b(a) {
                Z.publish("call:transferred", a)
            }
            e.logDebug("ATT.rtc.Phone: transfer");
            var c, f, g, h;
            try {
                if (null === $ || null === $.getId()) return void d("29001");
                if (c = $.currentCall, null === c || null === c.id()) return void d("29002");
                if (2 > Object.keys($.getCalls()).length) return void d("29004");
                try {
                    e.logTrace("currentCall", c.peer()), e.logTrace("currentCall id", c.id()), f = $.getCalls();
                    for (g in f)
                        if (f.hasOwnProperty(g) && g !== $.currentCall.id()) {
                            h = $.getCall(g);
                            break
                        }
                    e.logTrace("backgroundCall", h.peer()), e.logTrace("backgroundCall id", h.peer()), h.off("transferred", b), h.on("transferred", b), h.off("transferring", a), h.on("transferring", a), e.logInfo("Transferring call with peer " + h.peer() + " to " + c.peer()), h.transfer({
                        targetCallId: c.id()
                    })
                } catch (i) {
                    return e.logError("Error during transfer call"), e.logTrace(i), void d("29000", i)
                }
            } catch (i) {
                e.logError("Error during transfer call"), e.logTrace(i), Z.publish("error", {
                    error: i
                })
            }
        }

        function X() {
            e.logDebug("ATT.rtc.Phone: getMediaType"), e.logInfo("Getting current call media type...");
            var a = $.currentCall;
            return e.logTrace(a.peer(), a), e.logTrace("MediaType", a.mediaType()), a ? a.mediaType() : null
        }

        function Y() {
            e.logDebug("ATT.rtc.Phone: isCallInProgress"), e.logInfo("Checking if current call exists...");
            var a = $.currentCall;
            return null !== a ? (e.logTrace("Call in progress", !0), e.logTrace(a.peer(), a), !0) : (e.logTrace("Call in progress", !1), !1)
        }
        var Z = b.createEventEmitter(),
            $ = new ATT.rtc.Session,
            _ = ATT.errorDictionary,
            aa = ATT.UserMediaService;
        e.logDebug("ATT.rtc.Phone: Constructor"), e.logInfo("Creating a new instance of Phone"), $.on("call:incoming", function(a) {
            function b(c) {
                null !== $.pendingCall && c.id() === $.pendingCall.id() && (Z.publish("call:canceled", a), c.off("canceled", b), e.logInfo("Deleting canceled pending call"), e.logTrace(c.peer(), c), $.deletePendingCall(), aa.stopUserMedia())
            }

            function c(b) {
                null !== $.pendingCall && b.id() === $.pendingCall.id() && (Z.publish("call:disconnected", a), b.off("disconnected", c), e.logInfo("Deleting disconnected pending call"), e.logTrace(b.peer(), b), $.deletePendingCall(), aa.stopUserMedia())
            }
            return e.logDebug("session.on: call:incoming"), e.logInfo("call:incoming event  by ATT.rtc.Phone"), e.logTrace("data", a), null !== $.currentCall && "conference" === $.currentCall.breed() && "call" === $.pendingCall.breed() ? (e.logError("Cannot accept incoming call. An active conference is already going on"), d("1006"), void $.pendingCall.reject()) : (Z.publish("call:incoming", a), void($.pendingCall && (e.logTrace($.pendingCall.peer(), $.pendingCall), $.pendingCall.on("canceled", b.bind(null, $.pendingCall)), $.pendingCall.on("disconnected", c.bind(null, $.pendingCall)))))
        }), $.on("conference-invite", function(a) {
            function b(c) {
                null !== $.pendingCall && c.id() === $.pendingCall.id() && (Z.publish("conference:canceled", a), c.off("canceled", b), e.logInfo("Deleting canceled pending call"), e.logTrace(c.peer(), c), $.deletePendingCall(), aa.stopUserMedia())
            }

            function c(b) {
                null !== $.pendingCall && b.id() === $.pendingCall.id() && (Z.publish("conference:ended", a), b.off("disconnected", c), e.logInfo("Deleting disconnected pending call"), e.logTrace(b.peer(), b), $.deletePendingCall(), aa.stopUserMedia())
            }
            return e.logDebug("session.on: conference-invite"), e.logInfo("conference:invitation-received event by ATT.rtc.Phone"), e.logTrace("data", a), null !== $.currentCall && "call" === $.currentCall.breed() && "conference" === $.pendingCall.breed() ? (e.logError("Cannot join conference. An active call is already going on"), d("1005"), void $.deletePendingCall()) : null !== $.currentCall && "conference" === $.currentCall.breed() && "conference" === $.pendingCall.breed() ? (e.logError("Cannot accept incoming conference. An active conference is already going on"), d("1007"), void $.deletePendingCall()) : (Z.publish("conference:invitation-received", a), void($.pendingCall && (e.logTrace($.pendingCall.peer(), $.pendingCall), $.pendingCall.on("canceled", b.bind(null, $.pendingCall)), $.pendingCall.on("disconnected", c.bind(null, $.pendingCall)))))
        }), $.on("call:switched", function(a) {
            e.logDebug("session.on: call:switched"), e.logInfo("session:call-switched event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("session:call-switched", a)
        }), $.on("notification", function(a) {
            e.logDebug("session.on: notification"), e.logInfo("notification event by ATT.rtc.Phone"), e.logTrace("data", a), Z.publish("notification", a)
        }), $.on("error", function(a) {
            return e.logDebug("session.on: error"), e.logError("error event by ATT.rtc.Phone"), e.logTrace("data", a), a.error && 404 === a.error.HttpStatusCode ? (e.logError("session:expired by ATT.rtc.Phone"), void Z.publish("session:expired", a)) : void Z.publish("error", a)
        }), this.on = u, this.getSession = w, this.login = x, this.associateAccessToken = y, this.associateE911Id = z, this.logout = A, this.dial = D, this.addCall = E, this.answer = G, this.hangup = H, this.cancel = I, this.reject = g, this.move = U, this.transfer = W, this.startConference = J, this.joinConference = K, this.endConference = P, this.rejectConference = h, this.addParticipants = L, this.addParticipant = M, this.getParticipants = N, this.removeParticipant = O, this.mute = Q, this.unmute = R, this.hold = S, this.resume = T, this.switchCall = V, this.getCalls = v, this.getMediaType = X, this.isCallInProgress = Y, this.cleanPhoneNumber = r, this.formatNumber = s, this.getCallerInfo = t
    }
    var b = ATT["private"].factories,
        c = ATT["private"]["enum"],
        d = ATT.logManager.getInstance(),
        e = d.addLoggerForModule("ATT.rtc.Phone");
    if (e.logDebug("Loading att.rtc.phone..."), void 0 === ATT["private"]) throw new Error("Error exporting ATT.private.Phone.");
    if (ATT["private"].Phone = a, void 0 === ATT.rtc) throw new Error("Error exporting ATT.rtc.Phone.");
    ATT.rtc.Phone = function() {
        var b;
        return {
            getPhone: function() {
                return e.logDebug("ATT.rtc.Phone: getPhone"), void 0 === b && (b = new a), b
            }
        }
    }()
}(),
function() {
    "use strict";
    var a, b = ATT.logManager.getInstance(),
        c = b.getLogger("att.main");
    return c.setLevel(b.logLevel.WARNING), c.logDebug("Loading att.main..."), c.logInfo("Attempting to load Enhanced WebRC SDK..."), void 0 === window.ATT ? void c.logError("Cannot load ATT's Enhanced WebRTC SDK. ATT is not defined.") : (a = window.ATT, window.ATT = void 0, "Not Supported" === a.browser.hasWebRTC() ? (window.ATT = {
        browser: a.browser
    }, void c.logError("Failed to load ATT's Enhanced WebRTC SDK. The browser doesn't support Enhanced WebRTC")) : (window.ATT = a, c.logInfo("Loading error dictionary..."), void 0 === ATT.utils.createErrorDictionary ? void c.logError("Failed to load error dictionary. Missing ATT.utils.createErrorDictionary.") : (ATT.errorDictionary = ATT.utils.createErrorDictionary(ATT.utils.ErrorStore.SDKErrors.getAllSDKErrors(), ATT.utils.ErrorStore.APIErrors.getAllAPIErrors()), (void 0 === ATT.errorDictionary || null === ATT.errorDictionary) && c.logError("Failed to create error dictionary"), c.logInfo("Loading error dictionary complete"), void c.logInfo("Loading Enhanced WebRC SDK complete"))))
}();
