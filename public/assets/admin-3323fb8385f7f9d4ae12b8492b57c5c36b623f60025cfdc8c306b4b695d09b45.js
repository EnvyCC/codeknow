define("ember-addons/decorator-alias", ["exports", "./utils/extract-value"], function (exports, _extractValue) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = decoratorAlias;
  function decoratorAlias(fn, errorMessage) {
    return function () {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      // determine if user called as @computed('blah', 'blah') or @computed
      if (params.length === 0) {
        throw new Error(errorMessage);
      } else {
        return function (target, key, desc) {
          return {
            enumerable: desc.enumerable,
            configurable: desc.configurable,
            writable: desc.writable,
            initializer: function initializer() {
              var value = (0, _extractValue.default)(desc);
              return fn.apply(null, params.concat(value));
            }
          };
        };
      }
    };
  }
});
define("ember-addons/ember-computed-decorators", ["exports", "./utils/handle-descriptor", "./utils/is-descriptor", "./utils/extract-value", "./decorator-alias", "./macro-alias"], function (exports, _handleDescriptor, _isDescriptor, _extractValue, _decoratorAlias, _macroAlias) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.uniq = exports.union = exports.sum = exports.sort = exports.setDiff = exports.reads = exports.or = exports.oneWay = exports.notEmpty = exports.not = exports.none = exports.min = exports.max = exports.match = exports.mapBy = exports.map = exports.lte = exports.lt = exports.gte = exports.gt = exports.filterBy = exports.filter = exports.equal = exports.empty = exports.collect = exports.bool = exports.and = exports.alias = exports.observes = exports.on = undefined;
  exports.default = computedDecorator;
  exports.readOnly = readOnly;
  function computedDecorator() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    // determine if user called as @computed('blah', 'blah') or @computed
    if ((0, _isDescriptor.default)(params[params.length - 1])) {
      return _handleDescriptor.default.apply(undefined, arguments);
    } else {
      return function () /* target, key, desc */{
        return _handleDescriptor.default.apply(undefined, Array.prototype.slice.call(arguments).concat([params]));
      };
    }
  }

  function readOnly(target, name, desc) {
    return {
      writable: false,
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      initializer: function initializer() {
        var value = (0, _extractValue.default)(desc);
        return value.readOnly();
      }
    };
  }

  var on = exports.on = (0, _decoratorAlias.default)(Ember.on, "Can not `on` without event names");
  var observes = exports.observes = (0, _decoratorAlias.default)(Ember.observer, "Can not `observe` without property names");

  var alias = exports.alias = (0, _macroAlias.default)(Ember.computed.alias);
  var and = exports.and = (0, _macroAlias.default)(Ember.computed.and);
  var bool = exports.bool = (0, _macroAlias.default)(Ember.computed.bool);
  var collect = exports.collect = (0, _macroAlias.default)(Ember.computed.collect);
  var empty = exports.empty = (0, _macroAlias.default)(Ember.computed.empty);
  var equal = exports.equal = (0, _macroAlias.default)(Ember.computed.equal);
  var filter = exports.filter = (0, _macroAlias.default)(Ember.computed.filter);
  var filterBy = exports.filterBy = (0, _macroAlias.default)(Ember.computed.filterBy);
  var gt = exports.gt = (0, _macroAlias.default)(Ember.computed.gt);
  var gte = exports.gte = (0, _macroAlias.default)(Ember.computed.gte);
  var lt = exports.lt = (0, _macroAlias.default)(Ember.computed.lt);
  var lte = exports.lte = (0, _macroAlias.default)(Ember.computed.lte);
  var map = exports.map = (0, _macroAlias.default)(Ember.computed.map);
  var mapBy = exports.mapBy = (0, _macroAlias.default)(Ember.computed.mapBy);
  var match = exports.match = (0, _macroAlias.default)(Ember.computed.match);
  var max = exports.max = (0, _macroAlias.default)(Ember.computed.max);
  var min = exports.min = (0, _macroAlias.default)(Ember.computed.min);
  var none = exports.none = (0, _macroAlias.default)(Ember.computed.none);
  var not = exports.not = (0, _macroAlias.default)(Ember.computed.not);
  var notEmpty = exports.notEmpty = (0, _macroAlias.default)(Ember.computed.notEmpty);
  var oneWay = exports.oneWay = (0, _macroAlias.default)(Ember.computed.oneWay);
  var or = exports.or = (0, _macroAlias.default)(Ember.computed.or);
  var reads = exports.reads = (0, _macroAlias.default)(Ember.computed.reads);
  var setDiff = exports.setDiff = (0, _macroAlias.default)(Ember.computed.setDiff);
  var sort = exports.sort = (0, _macroAlias.default)(Ember.computed.sort);
  var sum = exports.sum = (0, _macroAlias.default)(Ember.computed.sum);
  var union = exports.union = (0, _macroAlias.default)(Ember.computed.union);
  var uniq = exports.uniq = (0, _macroAlias.default)(Ember.computed.uniq);
});
define("ember-addons/fmt", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (str, formats) {
    var cachedFormats = formats;

    if (!isArray(cachedFormats) || arguments.length > 2) {
      cachedFormats = new Array(arguments.length - 1);

      for (var i = 1, l = arguments.length; i < l; i++) {
        cachedFormats[i - 1] = arguments[i];
      }
    }

    // first, replace any ORDERED replacements.
    var idx = 0; // the current index for non-numerical replacements
    return str.replace(/%@([0-9]+)?/g, function (s, argIndex) {
      argIndex = argIndex ? parseInt(argIndex, 10) - 1 : idx++;
      s = cachedFormats[argIndex];
      return s === null ? "(null)" : s === undefined ? "" : inspect(s);
    });
  };

  var inspect = _ember.default.inspect;
  var isArray = _ember.default.isArray;
});
define("ember-addons/macro-alias", ["exports", "./utils/is-descriptor"], function (exports, _isDescriptor) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = macroAlias;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function handleDescriptor(target, property, desc, fn) {
    var params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

    return {
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      writable: desc.writable,
      initializer: function initializer() {
        return fn.apply(undefined, _toConsumableArray(params));
      }
    };
  }

  function macroAlias(fn) {
    return function () {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if ((0, _isDescriptor.default)(params[params.length - 1])) {
        return handleDescriptor.apply(undefined, params.concat([fn]));
      } else {
        return function (target, property, desc) {
          return handleDescriptor(target, property, desc, fn, params);
        };
      }
    };
  }
});
define("ember-addons/utils/extract-value", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = extractValue;
  function extractValue(desc) {
    return desc.value || typeof desc.initializer === "function" && desc.initializer();
  }
});
define("ember-addons/utils/handle-descriptor", ["exports", "ember", "./extract-value"], function (exports, _ember, _extractValue) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = handleDescriptor;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var computed = _ember.default.computed,
      get = _ember.default.get;
  function handleDescriptor(target, key, desc) {
    var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    return {
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      writeable: desc.writeable,
      initializer: function initializer() {
        var computedDescriptor = void 0;

        if (desc.writable) {
          var val = (0, _extractValue.default)(desc);
          if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
            var value = {};
            if (val.get) {
              value.get = callUserSuppliedGet(params, val.get);
            }
            if (val.set) {
              value.set = callUserSuppliedSet(params, val.set);
            }
            computedDescriptor = value;
          } else {
            computedDescriptor = callUserSuppliedGet(params, val);
          }
        } else {
          throw new Error("ember-computed-decorators does not support using getters and setters");
        }

        return computed.apply(null, params.concat(computedDescriptor));
      }
    };
  }

  function niceAttr(attr) {
    var parts = attr.split(".");
    var i = void 0;

    for (i = 0; i < parts.length; i++) {
      if (parts[i] === "@each" || parts[i] === "[]" || parts[i].indexOf("{") !== -1) {
        break;
      }
    }

    return parts.slice(0, i).join(".");
  }

  function callUserSuppliedGet(params, func) {
    params = params.map(niceAttr);
    return function () {
      var _this = this;

      var paramValues = params.map(function (p) {
        return get(_this, p);
      });

      return func.apply(this, paramValues);
    };
  }

  function callUserSuppliedSet(params, func) {
    params = params.map(niceAttr);
    return function (key, value) {
      var _this2 = this;

      var paramValues = params.map(function (p) {
        return get(_this2, p);
      });
      paramValues.unshift(value);

      return func.apply(this, paramValues);
    };
  }
});
define("ember-addons/utils/is-descriptor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isDescriptor;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function isDescriptor(item) {
    return item && (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" && "writable" in item && "enumerable" in item && "configurable" in item;
  }
});
define("admin/models/user-field", ["exports", "discourse/models/rest", "discourse/lib/computed"], function (exports, _rest, _computed) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var UserField = _rest.default.extend();

  var UserFieldType = Ember.Object.extend({
    name: (0, _computed.i18n)("id", "admin.user_fields.field_types.%@")
  });

  UserField.reopenClass({
    fieldTypes: function fieldTypes() {
      if (!this._fieldTypes) {
        this._fieldTypes = [UserFieldType.create({ id: "text" }), UserFieldType.create({ id: "confirm" }), UserFieldType.create({ id: "dropdown", hasOptions: true })];
      }

      return this._fieldTypes;
    },
    fieldTypeById: function fieldTypeById(id) {
      return this.fieldTypes().findBy("id", id);
    }
  });

  exports.default = UserField;
});
define("admin/models/site-setting", ["exports", "discourse/lib/ajax", "admin/mixins/setting-object"], function (exports, _ajax, _settingObject) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var SiteSetting = Discourse.Model.extend(_settingObject.default, {});

  SiteSetting.reopenClass({
    findAll: function findAll() {
      return (0, _ajax.ajax)("/admin/site_settings").then(function (settings) {
        // Group the results by category
        var categories = {};
        settings.site_settings.forEach(function (s) {
          if (!categories[s.category]) {
            categories[s.category] = [];
          }
          categories[s.category].pushObject(SiteSetting.create(s));
        });

        return Object.keys(categories).map(function (n) {
          return {
            nameKey: n,
            name: I18n.t("admin.site_settings.categories." + n),
            siteSettings: categories[n]
          };
        });
      });
    },
    update: function update(key, value) {
      var data = {};
      data[key] = value;
      return (0, _ajax.ajax)("/admin/site_settings/" + key, { type: "PUT", data: data });
    }
  });

  exports.default = SiteSetting;
});
define("admin/models/screened-ip-address", ["exports", "discourse/lib/ajax", "ember-addons/ember-computed-decorators"], function (exports, _ajax, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  var ScreenedIpAddress = Discourse.Model.extend((_dec = (0, _emberComputedDecorators.default)("action_name"), _dec2 = (0, _emberComputedDecorators.default)("ip_address"), (_obj = {
    actionName: function actionName(_actionName) {
      return I18n.t("admin.logs.screened_ips.actions." + _actionName);
    },


    isBlocked: Ember.computed.equal("action_name", "block"),

    isRange: function isRange(ipAddress) {
      return ipAddress.indexOf("/") > 0;
    },
    save: function save() {
      return (0, _ajax.ajax)("/admin/logs/screened_ip_addresses" + (this.id ? "/" + this.id : "") + ".json", {
        type: this.id ? "PUT" : "POST",
        data: {
          ip_address: this.get("ip_address"),
          action_name: this.get("action_name")
        }
      });
    },
    destroy: function destroy() {
      return (0, _ajax.ajax)("/admin/logs/screened_ip_addresses/" + this.get("id") + ".json", { type: "DELETE" });
    }
  }, (_applyDecoratedDescriptor(_obj, "actionName", [_dec], Object.getOwnPropertyDescriptor(_obj, "actionName"), _obj), _applyDecoratedDescriptor(_obj, "isRange", [_dec2], Object.getOwnPropertyDescriptor(_obj, "isRange"), _obj)), _obj)));

  ScreenedIpAddress.reopenClass({
    findAll: function findAll(filter) {
      return (0, _ajax.ajax)("/admin/logs/screened_ip_addresses.json", {
        data: { filter: filter }
      }).then(function (screened_ips) {
        return screened_ips.map(function (b) {
          return ScreenedIpAddress.create(b);
        });
      });
    },
    rollUp: function rollUp() {
      return (0, _ajax.ajax)("/admin/logs/screened_ip_addresses/roll_up", { type: "POST" });
    }
  });

  exports.default = ScreenedIpAddress;
});
define("admin/models/api-key", ["exports", "admin/models/admin-user", "discourse/lib/ajax"], function (exports, _adminUser, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var ApiKey = Discourse.Model.extend({
    /**
      Regenerates the api key
       @method regenerate
      @returns {Promise} a promise that resolves to the key
    **/
    regenerate: function regenerate() {
      var self = this;
      return (0, _ajax.ajax)("/admin/api/key", {
        type: "PUT",
        data: { id: this.get("id") }
      }).then(function (result) {
        self.set("key", result.api_key.key);
        return self;
      });
    },

    /**
      Revokes the current key
       @method revoke
      @returns {Promise} a promise that resolves when the key has been revoked
    **/
    revoke: function revoke() {
      return (0, _ajax.ajax)("/admin/api/key", {
        type: "DELETE",
        data: { id: this.get("id") }
      });
    }
  });

  ApiKey.reopenClass({
    create: function create() {
      var result = this._super.apply(this, arguments);
      if (result.user) {
        result.user = _adminUser.default.create(result.user);
      }
      return result;
    },


    /**
      Finds a list of API keys
       @method find
      @returns {Promise} a promise that resolves to the array of `ApiKey` instances
    **/
    find: function find() {
      return (0, _ajax.ajax)("/admin/api/keys").then(function (keys) {
        return keys.map(function (key) {
          return ApiKey.create(key);
        });
      });
    },

    /**
      Generates a master api key and returns it.
       @method generateMasterKey
      @returns {Promise} a promise that resolves to a master `ApiKey`
    **/
    generateMasterKey: function generateMasterKey() {
      return (0, _ajax.ajax)("/admin/api/key", { type: "POST" }).then(function (result) {
        return ApiKey.create(result.api_key);
      });
    }
  });

  exports.default = ApiKey;
});
define("admin/models/tl3-requirements", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Discourse.Model.extend((_dec = (0, _emberComputedDecorators.default)("days_visited", "time_period"), _dec2 = (0, _emberComputedDecorators.default)("min_days_visited", "time_period"), (_obj = {
    days_visited_percent: function days_visited_percent(daysVisited, timePeriod) {
      return Math.round(daysVisited * 100 / timePeriod);
    },
    min_days_visited_percent: function min_days_visited_percent(minDaysVisited, timePeriod) {
      return Math.round(minDaysVisited * 100 / timePeriod);
    },


    met: function () {
      return {
        days_visited: this.get("days_visited") >= this.get("min_days_visited"),
        topics_replied_to: this.get("num_topics_replied_to") >= this.get("min_topics_replied_to"),
        topics_viewed: this.get("topics_viewed") >= this.get("min_topics_viewed"),
        posts_read: this.get("posts_read") >= this.get("min_posts_read"),
        topics_viewed_all_time: this.get("topics_viewed_all_time") >= this.get("min_topics_viewed_all_time"),
        posts_read_all_time: this.get("posts_read_all_time") >= this.get("min_posts_read_all_time"),
        flagged_posts: this.get("num_flagged_posts") <= this.get("max_flagged_posts"),
        flagged_by_users: this.get("num_flagged_by_users") <= this.get("max_flagged_by_users"),
        likes_given: this.get("num_likes_given") >= this.get("min_likes_given"),
        likes_received: this.get("num_likes_received") >= this.get("min_likes_received"),
        likes_received_days: this.get("num_likes_received_days") >= this.get("min_likes_received_days"),
        likes_received_users: this.get("num_likes_received_users") >= this.get("min_likes_received_users"),
        level_locked: this.get("trust_level_locked"),
        silenced: this.get("penalty_counts.silenced") === 0,
        suspended: this.get("penalty_counts.suspended") === 0
      };
    }.property("days_visited", "min_days_visited", "num_topics_replied_to", "min_topics_replied_to", "topics_viewed", "min_topics_viewed", "posts_read", "min_posts_read", "num_flagged_posts", "max_flagged_posts", "topics_viewed_all_time", "min_topics_viewed_all_time", "posts_read_all_time", "min_posts_read_all_time", "num_flagged_by_users", "max_flagged_by_users", "num_likes_given", "min_likes_given", "num_likes_received", "min_likes_received", "num_likes_received", "min_likes_received", "num_likes_received_days", "min_likes_received_days", "num_likes_received_users", "min_likes_received_users", "trust_level_locked", "penalty_counts.silenced", "penalty_counts.suspended")
  }, (_applyDecoratedDescriptor(_obj, "days_visited_percent", [_dec], Object.getOwnPropertyDescriptor(_obj, "days_visited_percent"), _obj), _applyDecoratedDescriptor(_obj, "min_days_visited_percent", [_dec2], Object.getOwnPropertyDescriptor(_obj, "min_days_visited_percent"), _obj)), _obj)));
});
define("admin/models/admin-user", ["exports", "discourse-common/lib/icon-library", "discourse/lib/ajax", "ember-addons/ember-computed-decorators", "discourse/lib/computed", "discourse/lib/ajax-error", "admin/models/api-key", "discourse/models/group", "discourse/lib/url"], function (exports, _iconLibrary, _ajax, _emberComputedDecorators, _computed, _ajaxError, _apiKey, _group, _url) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _obj, _init, _init2, _init3;

  var wrapAdmin = function wrapAdmin(user) {
    return user ? AdminUser.create(user) : null;
  };

  var AdminUser = Discourse.User.extend((_dec = (0, _emberComputedDecorators.default)("bounce_score", "reset_bounce_score_after"), _dec2 = (0, _emberComputedDecorators.default)("bounce_score"), _dec3 = (0, _emberComputedDecorators.default)("tl3_requirements"), _dec4 = (0, _emberComputedDecorators.default)("suspended_by"), _dec5 = (0, _emberComputedDecorators.default)("silenced_by"), _dec6 = (0, _emberComputedDecorators.default)("approved_by"), (_obj = {
    adminUserView: true,
    customGroups: Ember.computed.filter("groups", function (g) {
      return !g.automatic && _group.default.create(g);
    }),
    automaticGroups: Ember.computed.filter("groups", function (g) {
      return g.automatic && _group.default.create(g);
    }),

    canViewProfile: Ember.computed.or("active", "staged"),

    bounceScore: function bounceScore(bounce_score, reset_bounce_score_after) {
      if (bounce_score > 0) {
        return bounce_score + " - " + moment(reset_bounce_score_after).format("LL");
      } else {
        return bounce_score;
      }
    },
    bounceScoreExplanation: function bounceScoreExplanation(bounce_score) {
      if (bounce_score === 0) {
        return I18n.t("admin.user.bounce_score_explanation.none");
      } else if (bounce_score < Discourse.SiteSettings.bounce_score_threshold) {
        return I18n.t("admin.user.bounce_score_explanation.some");
      } else {
        return I18n.t("admin.user.bounce_score_explanation.threshold_reached");
      }
    },
    bounceLink: function bounceLink() {
      return Discourse.getURL("/admin/email/bounced");
    },


    canResetBounceScore: Ember.computed.gt("bounce_score", 0),

    resetBounceScore: function resetBounceScore() {
      var _this = this;

      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/reset_bounce_score", {
        type: "POST"
      }).then(function () {
        return _this.setProperties({
          bounce_score: 0,
          reset_bounce_score_after: null
        });
      });
    },
    generateApiKey: function generateApiKey() {
      var self = this;
      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/generate_api_key", {
        type: "POST"
      }).then(function (result) {
        var apiKey = _apiKey.default.create(result.api_key);
        self.set("api_key", apiKey);
        return apiKey;
      });
    },
    groupAdded: function groupAdded(added) {
      var _this2 = this;

      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/groups", {
        type: "POST",
        data: { group_id: added.id }
      }).then(function () {
        return _this2.get("groups").pushObject(added);
      });
    },
    groupRemoved: function groupRemoved(groupId) {
      var _this3 = this;

      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/groups/" + groupId, {
        type: "DELETE"
      }).then(function () {
        _this3.set("groups.[]", _this3.get("groups").rejectBy("id", groupId));
        if (_this3.get("primary_group_id") === groupId) {
          _this3.set("primary_group_id", null);
        }
      });
    },
    revokeApiKey: function revokeApiKey() {
      var _this4 = this;

      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/revoke_api_key", {
        type: "DELETE"
      }).then(function () {
        return _this4.set("api_key", null);
      });
    },
    deleteAllPosts: function deleteAllPosts() {
      var user = this,
          message = I18n.messageFormat("admin.user.delete_all_posts_confirm_MF", {
        POSTS: user.get("post_count"),
        TOPICS: user.get("topic_count")
      }),
          buttons = [{
        label: I18n.t("composer.cancel"),
        class: "d-modal-cancel",
        link: true
      }, {
        label: (0, _iconLibrary.iconHTML)("exclamation-triangle") + " " + I18n.t("admin.user.delete_all_posts"),
        class: "btn btn-danger",
        callback: function callback() {
          (0, _ajax.ajax)("/admin/users/" + user.get("id") + "/delete_all_posts", {
            type: "PUT"
          }).then(function () {
            return user.set("post_count", 0);
          });
        }
      }];
      bootbox.dialog(message, buttons, { classes: "delete-all-posts" });
    },
    revokeAdmin: function revokeAdmin() {
      var _this5 = this;

      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/revoke_admin", {
        type: "PUT"
      }).then(function () {
        _this5.setProperties({
          admin: false,
          can_grant_admin: true,
          can_revoke_admin: false
        });
      });
    },
    grantAdmin: function grantAdmin() {
      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/grant_admin", {
        type: "PUT"
      }).then(function () {
        bootbox.alert(I18n.t("admin.user.grant_admin_confirm"));
      }).catch(_ajaxError.popupAjaxError);
    },
    revokeModeration: function revokeModeration() {
      var self = this;
      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/revoke_moderation", {
        type: "PUT"
      }).then(function () {
        self.setProperties({
          moderator: false,
          can_grant_moderation: true,
          can_revoke_moderation: false
        });
      }).catch(_ajaxError.popupAjaxError);
    },
    grantModeration: function grantModeration() {
      var self = this;
      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/grant_moderation", {
        type: "PUT"
      }).then(function () {
        self.setProperties({
          moderator: true,
          can_grant_moderation: false,
          can_revoke_moderation: true
        });
      }).catch(_ajaxError.popupAjaxError);
    },
    disableSecondFactor: function disableSecondFactor() {
      var _this6 = this;

      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/disable_second_factor", {
        type: "PUT"
      }).then(function () {
        _this6.set("second_factor_enabled", false);
      }).catch(_ajaxError.popupAjaxError);
    },
    refreshBrowsers: function refreshBrowsers() {
      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/refresh_browsers", {
        type: "POST"
      }).finally(function () {
        return bootbox.alert(I18n.t("admin.user.refresh_browsers_message"));
      });
    },
    approve: function approve() {
      var self = this;
      return (0, _ajax.ajax)("/admin/users/" + this.get("id") + "/approve", {
        type: "PUT"
      }).then(function () {
        self.setProperties({
          can_approve: false,
          approved: true,
          approved_by: Discourse.User.current()
        });
      });
    },
    setOriginalTrustLevel: function setOriginalTrustLevel() {
      this.set("originalTrustLevel", this.get("trust_level"));
    },


    dirty: (0, _computed.propertyNotEqual)("originalTrustLevel", "trustLevel.id"),

    saveTrustLevel: function saveTrustLevel() {
      return (0, _ajax.ajax)("/admin/users/" + this.id + "/trust_level", {
        type: "PUT",
        data: { level: this.get("trustLevel.id") }
      }).then(function () {
        window.location.reload();
      }).catch(function (e) {
        var error = void 0;
        if (e.responseJSON && e.responseJSON.errors) {
          error = e.responseJSON.errors[0];
        }
        error = error || I18n.t("admin.user.trust_level_change_failed", {
          error: "http: " + e.status + " - " + e.body
        });
        bootbox.alert(error);
      });
    },
    restoreTrustLevel: function restoreTrustLevel() {
      this.set("trustLevel.id", this.get("originalTrustLevel"));
    },
    lockTrustLevel: function lockTrustLevel(locked) {
      return (0, _ajax.ajax)("/admin/users/" + this.id + "/trust_level_lock", {
        type: "PUT",
        data: { locked: !!locked }
      }).then(function () {
        window.location.reload();
      }).catch(function (e) {
        var error = void 0;
        if (e.responseJSON && e.responseJSON.errors) {
          error = e.responseJSON.errors[0];
        }
        error = error || I18n.t("admin.user.trust_level_change_failed", {
          error: "http: " + e.status + " - " + e.body
        });
        bootbox.alert(error);
      });
    },


    canLockTrustLevel: function () {
      return this.get("trust_level") < 4;
    }.property("trust_level"),

    canSuspend: Em.computed.not("staff"),

    suspendDuration: function () {
      var suspended_at = moment(this.suspended_at),
          suspended_till = moment(this.suspended_till);
      return suspended_at.format("L") + " - " + suspended_till.format("L");
    }.property("suspended_till", "suspended_at"),

    suspend: function suspend(data) {
      var _this7 = this;

      return (0, _ajax.ajax)("/admin/users/" + this.id + "/suspend", {
        type: "PUT",
        data: data
      }).then(function (result) {
        return _this7.setProperties(result.suspension);
      });
    },
    unsuspend: function unsuspend() {
      var _this8 = this;

      return (0, _ajax.ajax)("/admin/users/" + this.id + "/unsuspend", {
        type: "PUT"
      }).then(function (result) {
        return _this8.setProperties(result.suspension);
      });
    },
    logOut: function logOut() {
      return (0, _ajax.ajax)("/admin/users/" + this.id + "/log_out", {
        type: "POST",
        data: { username_or_email: this.get("username") }
      }).then(function () {
        bootbox.alert(I18n.t("admin.user.logged_out"));
      });
    },
    impersonate: function impersonate() {
      return (0, _ajax.ajax)("/admin/impersonate", {
        type: "POST",
        data: { username_or_email: this.get("username") }
      }).then(function () {
        document.location = Discourse.getURL("/");
      }).catch(function (e) {
        if (e.status === 404) {
          bootbox.alert(I18n.t("admin.impersonate.not_found"));
        } else {
          bootbox.alert(I18n.t("admin.impersonate.invalid"));
        }
      });
    },
    activate: function activate() {
      return (0, _ajax.ajax)("/admin/users/" + this.id + "/activate", {
        type: "PUT"
      }).then(function () {
        window.location.reload();
      }).catch(function (e) {
        var error = I18n.t("admin.user.activate_failed", {
          error: "http: " + e.status + " - " + e.body
        });
        bootbox.alert(error);
      });
    },
    deactivate: function deactivate() {
      return (0, _ajax.ajax)("/admin/users/" + this.id + "/deactivate", {
        type: "PUT",
        data: { context: document.location.pathname }
      }).then(function () {
        window.location.reload();
      }).catch(function (e) {
        var error = I18n.t("admin.user.deactivate_failed", {
          error: "http: " + e.status + " - " + e.body
        });
        bootbox.alert(error);
      });
    },
    unsilence: function unsilence() {
      var _this9 = this;

      this.set("silencingUser", true);

      return (0, _ajax.ajax)("/admin/users/" + this.id + "/unsilence", {
        type: "PUT"
      }).then(function (result) {
        _this9.setProperties(result.unsilence);
      }).catch(function (e) {
        var error = I18n.t("admin.user.unsilence_failed", {
          error: "http: " + e.status + " - " + e.body
        });
        bootbox.alert(error);
      }).finally(function () {
        _this9.set("silencingUser", false);
      });
    },
    silence: function silence(data) {
      var _this10 = this;

      this.set("silencingUser", true);
      return (0, _ajax.ajax)("/admin/users/" + this.id + "/silence", {
        type: "PUT",
        data: data
      }).then(function (result) {
        _this10.setProperties(result.silence);
      }).catch(function (e) {
        var error = I18n.t("admin.user.silence_failed", {
          error: "http: " + e.status + " - " + e.body
        });
        bootbox.alert(error);
      }).finally(function () {
        _this10.set("silencingUser", false);
      });
    },
    sendActivationEmail: function sendActivationEmail() {
      return (0, _ajax.ajax)((0, _url.userPath)("action/send_activation_email"), {
        type: "POST",
        data: { username: this.get("username") }
      }).then(function () {
        bootbox.alert(I18n.t("admin.user.activation_email_sent"));
      }).catch(_ajaxError.popupAjaxError);
    },
    anonymize: function anonymize() {
      var user = this,
          message = I18n.t("admin.user.anonymize_confirm");

      var performAnonymize = function performAnonymize() {
        return (0, _ajax.ajax)("/admin/users/" + user.get("id") + "/anonymize.json", {
          type: "PUT"
        }).then(function (data) {
          if (data.success) {
            if (data.username) {
              document.location = Discourse.getURL("/admin/users/" + user.get("id") + "/" + data.username);
            } else {
              document.location = Discourse.getURL("/admin/users/list/active");
            }
          } else {
            bootbox.alert(I18n.t("admin.user.anonymize_failed"));
            if (data.user) {
              user.setProperties(data.user);
            }
          }
        }).catch(function () {
          bootbox.alert(I18n.t("admin.user.anonymize_failed"));
        });
      };

      var buttons = [{
        label: I18n.t("composer.cancel"),
        class: "cancel",
        link: true
      }, {
        label: (0, _iconLibrary.iconHTML)("exclamation-triangle") + " " + I18n.t("admin.user.anonymize_yes"),
        class: "btn btn-danger",
        callback: function callback() {
          performAnonymize();
        }
      }];

      bootbox.dialog(message, buttons, { classes: "delete-user-modal" });
    },
    destroy: function destroy(opts) {
      var user = this,
          message = I18n.t("admin.user.delete_confirm"),
          location = document.location.pathname;

      var performDestroy = function performDestroy(block) {
        bootbox.dialog(I18n.t("admin.user.deleting_user"));
        var formData = { context: location };
        if (block) {
          formData["block_email"] = true;
          formData["block_urls"] = true;
          formData["block_ip"] = true;
        }
        if (opts && opts.deletePosts) {
          formData["delete_posts"] = true;
        }
        return (0, _ajax.ajax)("/admin/users/" + user.get("id") + ".json", {
          type: "DELETE",
          data: formData
        }).then(function (data) {
          if (data.deleted) {
            if (/^\/admin\/users\/list\//.test(location)) {
              document.location = location;
            } else {
              document.location = Discourse.getURL("/admin/users/list/active");
            }
          } else {
            bootbox.alert(I18n.t("admin.user.delete_failed"));
            if (data.user) {
              user.setProperties(data.user);
            }
          }
        }).catch(function () {
          AdminUser.find(user.get("id")).then(function (u) {
            return user.setProperties(u);
          });
          bootbox.alert(I18n.t("admin.user.delete_failed"));
        });
      };

      var buttons = [{
        label: I18n.t("composer.cancel"),
        class: "btn",
        link: true
      }, {
        label: (0, _iconLibrary.iconHTML)("exclamation-triangle") + " " + I18n.t("admin.user.delete_and_block"),
        class: "btn btn-danger",
        callback: function callback() {
          performDestroy(true);
        }
      }, {
        label: I18n.t("admin.user.delete_dont_block"),
        class: "btn btn-primary",
        callback: function callback() {
          performDestroy(false);
        }
      }];

      bootbox.dialog(message, buttons, { classes: "delete-user-modal" });
    },
    loadDetails: function loadDetails() {
      var user = this;

      if (user.get("loadedDetails")) {
        return Ember.RSVP.resolve(user);
      }

      return AdminUser.find(user.get("id")).then(function (result) {
        user.setProperties(result);
        user.set("loadedDetails", true);
      });
    },
    tl3Requirements: function tl3Requirements(requirements) {
      if (requirements) {
        return this.store.createRecord("tl3Requirements", requirements);
      }
    },

    suspendedBy: wrapAdmin,

    silencedBy: wrapAdmin,

    approvedBy: wrapAdmin
  }, (_applyDecoratedDescriptor(_obj, "bounceScore", [_dec], Object.getOwnPropertyDescriptor(_obj, "bounceScore"), _obj), _applyDecoratedDescriptor(_obj, "bounceScoreExplanation", [_dec2], Object.getOwnPropertyDescriptor(_obj, "bounceScoreExplanation"), _obj), _applyDecoratedDescriptor(_obj, "bounceLink", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "bounceLink"), _obj), _applyDecoratedDescriptor(_obj, "tl3Requirements", [_dec3], Object.getOwnPropertyDescriptor(_obj, "tl3Requirements"), _obj), _applyDecoratedDescriptor(_obj, "suspendedBy", [_dec4], (_init = Object.getOwnPropertyDescriptor(_obj, "suspendedBy"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "silencedBy", [_dec5], (_init2 = Object.getOwnPropertyDescriptor(_obj, "silencedBy"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "approvedBy", [_dec6], (_init3 = Object.getOwnPropertyDescriptor(_obj, "approvedBy"), _init3 = _init3 ? _init3.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init3;
    }
  }), _obj)), _obj)));

  AdminUser.reopenClass({
    bulkApprove: function bulkApprove(users) {
      _.each(users, function (user) {
        user.setProperties({
          approved: true,
          can_approve: false,
          selected: false
        });
      });

      return (0, _ajax.ajax)("/admin/users/approve-bulk", {
        type: "PUT",
        data: { users: users.map(function (u) {
            return u.id;
          }) }
      }).finally(function () {
        return bootbox.alert(I18n.t("admin.user.approve_bulk_success"));
      });
    },
    bulkReject: function bulkReject(users) {
      _.each(users, function (user) {
        user.set("can_approve", false);
        user.set("selected", false);
      });

      return (0, _ajax.ajax)("/admin/users/reject-bulk", {
        type: "DELETE",
        data: {
          users: users.map(function (u) {
            return u.id;
          }),
          context: window.location.pathname
        }
      });
    },
    find: function find(user_id) {
      return (0, _ajax.ajax)("/admin/users/" + user_id + ".json").then(function (result) {
        result.loadedDetails = true;
        return AdminUser.create(result);
      });
    },
    findAll: function findAll(query, filter) {
      return (0, _ajax.ajax)("/admin/users/list/" + query + ".json", {
        data: filter
      }).then(function (users) {
        return users.map(function (u) {
          return AdminUser.create(u);
        });
      });
    }
  });

  exports.default = AdminUser;
});
define("admin/models/admin-dashboard-next", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var GENERAL_ATTRIBUTES = ["disk_space", "updated_at", "last_backup_taken_at"];

  var AdminDashboardNext = Discourse.Model.extend({});

  AdminDashboardNext.reopenClass({
    fetch: function fetch() {
      return (0, _ajax.ajax)("/admin/dashboard.json").then(function (json) {
        var model = AdminDashboardNext.create();
        model.set("version_check", json.version_check);
        return model;
      });
    },
    fetchGeneral: function fetchGeneral() {
      return (0, _ajax.ajax)("/admin/dashboard/general.json").then(function (json) {
        var model = AdminDashboardNext.create();

        var attributes = {};
        GENERAL_ATTRIBUTES.forEach(function (a) {
          return attributes[a] = json[a];
        });

        model.setProperties({
          reports: json.reports,
          attributes: attributes,
          loaded: true
        });

        return model;
      });
    },


    /**
      Only fetch the list of problems that should be rendered on the dashboard.
      The model will only have its "problems" attribute set.
       @method fetchProblems
      @return {jqXHR} a jQuery Promise object
    **/
    fetchProblems: function fetchProblems() {
      return (0, _ajax.ajax)("/admin/dashboard/problems.json", {
        type: "GET",
        dataType: "json"
      }).then(function (json) {
        var model = AdminDashboardNext.create(json);
        model.set("loaded", true);
        return model;
      });
    }
  });

  exports.default = AdminDashboardNext;
});
define("admin/models/admin-dashboard", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var AdminDashboard = Discourse.Model.extend({});

  AdminDashboard.reopenClass({
    /**
      Fetch all dashboard data. This can be an expensive request when the cached data
      has expired and the server must collect the data again.
       @method find
      @return {jqXHR} a jQuery Promise object
    **/
    find: function find() {
      return (0, _ajax.ajax)("/admin/dashboard-old.json").then(function (json) {
        var model = AdminDashboard.create(json);
        model.set("loaded", true);
        return model;
      });
    }
  });

  exports.default = AdminDashboard;
});
define("admin/models/backup-status", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Discourse.Model.extend((_dec = (0, _emberComputedDecorators.default)("allowRestore", "isOperationRunning"), (_obj = {
    restoreDisabled: Em.computed.not("restoreEnabled"),

    restoreEnabled: function restoreEnabled(allowRestore, isOperationRunning) {
      return allowRestore && !isOperationRunning;
    }
  }, (_applyDecoratedDescriptor(_obj, "restoreEnabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "restoreEnabled"), _obj)), _obj)));
});
define("admin/models/backup", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Backup = Discourse.Model.extend({
    destroy: function destroy() {
      return (0, _ajax.ajax)("/admin/backups/" + this.get("filename"), { type: "DELETE" });
    },
    restore: function restore() {
      return (0, _ajax.ajax)("/admin/backups/" + this.get("filename") + "/restore", {
        type: "POST",
        data: { client_id: window.MessageBus.clientId }
      });
    }
  });

  Backup.reopenClass({
    find: function find() {
      return (0, _ajax.ajax)("/admin/backups.json").then(function (backups) {
        return backups.map(function (backup) {
          return Backup.create(backup);
        });
      });
    },
    start: function start(withUploads) {
      if (withUploads === undefined) {
        withUploads = true;
      }
      return (0, _ajax.ajax)("/admin/backups", {
        type: "POST",
        data: {
          with_uploads: withUploads,
          client_id: window.MessageBus.clientId
        }
      }).then(function (result) {
        if (!result.success) {
          bootbox.alert(result.message);
        }
      });
    },
    cancel: function cancel() {
      return (0, _ajax.ajax)("/admin/backups/cancel.json", {
        type: "DELETE"
      }).then(function (result) {
        if (!result.success) {
          bootbox.alert(result.message);
        }
      });
    },
    rollback: function rollback() {
      return (0, _ajax.ajax)("/admin/backups/rollback.json", {
        type: "POST"
      }).then(function (result) {
        if (!result.success) {
          bootbox.alert(result.message);
        } else {
          // redirect to homepage (session might be lost)
          window.location.pathname = Discourse.getURL("/");
        }
      });
    }
  });

  exports.default = Backup;
});
define("admin/models/color-scheme-color", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var ColorSchemeColor = Discourse.Model.extend({
    init: function init() {
      this._super();
      this.startTrackingChanges();
    },

    startTrackingChanges: function startTrackingChanges() {
      this.set("originals", { hex: this.get("hex") || "FFFFFF" });
      this.notifyPropertyChange("hex"); // force changed property to be recalculated
    },

    // Whether value has changed since it was last saved.
    changed: function () {
      if (!this.originals) return false;
      if (this.get("hex") !== this.originals["hex"]) return true;
      return false;
    }.property("hex"),

    // Whether the current value is different than Discourse's default color scheme.
    overridden: function () {
      return this.get("hex") !== this.get("default_hex");
    }.property("hex", "default_hex"),

    // Whether the saved value is different than Discourse's default color scheme.
    savedIsOverriden: function () {
      return this.get("originals").hex !== this.get("default_hex");
    }.property("hex", "default_hex"),

    revert: function revert() {
      this.set("hex", this.get("default_hex"));
    },

    undo: function undo() {
      if (this.originals) this.set("hex", this.originals["hex"]);
    },

    translatedName: function () {
      return I18n.t("admin.customize.colors." + this.get("name") + ".name");
    }.property("name"),

    description: function () {
      return I18n.t("admin.customize.colors." + this.get("name") + ".description");
    }.property("name"),

    /**
      brightness returns a number between 0 (darkest) to 255 (brightest).
      Undefined if hex is not a valid color.
       @property brightness
    **/
    brightness: function () {
      var hex = this.get("hex");
      if (hex.length === 6 || hex.length === 3) {
        if (hex.length === 3) {
          hex = hex.substr(0, 1) + hex.substr(0, 1) + hex.substr(1, 1) + hex.substr(1, 1) + hex.substr(2, 1) + hex.substr(2, 1);
        }
        return Math.round((parseInt("0x" + hex.substr(0, 2)) * 299 + parseInt("0x" + hex.substr(2, 2)) * 587 + parseInt("0x" + hex.substr(4, 2)) * 114) / 1000);
      }
    }.property("hex"),

    hexValueChanged: function () {
      if (this.get("hex")) {
        this.set("hex", this.get("hex").toString().replace(/[^0-9a-fA-F]/g, ""));
      }
    }.observes("hex"),

    valid: function () {
      return this.get("hex").match(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/) !== null;
    }.property("hex")
  });

  exports.default = ColorSchemeColor;
});
define("admin/models/color-scheme", ["exports", "discourse/lib/ajax", "admin/models/color-scheme-color"], function (exports, _ajax, _colorSchemeColor) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var ColorScheme = Discourse.Model.extend(Ember.Copyable, {
    init: function init() {
      this._super();
      this.startTrackingChanges();
    },

    description: function () {
      return "" + this.name;
    }.property(),

    startTrackingChanges: function startTrackingChanges() {
      this.set("originals", {
        name: this.get("name")
      });
    },

    schemeJson: function schemeJson() {
      var buffer = [];
      _.each(this.get("colors"), function (c) {
        buffer.push("  \"" + c.get("name") + "\": \"" + c.get("hex") + "\"");
      });

      return ["\"" + this.get("name") + "\": {", buffer.join(",\n"), "}"].join("\n");
    },


    copy: function copy() {
      var newScheme = ColorScheme.create({
        name: this.get("name"),
        can_edit: true,
        colors: Em.A()
      });
      _.each(this.get("colors"), function (c) {
        newScheme.colors.pushObject(_colorSchemeColor.default.create({
          name: c.get("name"),
          hex: c.get("hex"),
          default_hex: c.get("default_hex")
        }));
      });
      return newScheme;
    },

    changed: function () {
      if (!this.originals) return false;
      if (this.originals["name"] !== this.get("name")) return true;
      if (_.any(this.get("colors"), function (c) {
        return c.get("changed");
      })) return true;
      return false;
    }.property("name", "colors.@each.changed", "saving"),

    disableSave: function () {
      if (this.get("theme_id")) {
        return false;
      }
      return !this.get("changed") || this.get("saving") || _.any(this.get("colors"), function (c) {
        return !c.get("valid");
      });
    }.property("changed"),

    newRecord: function () {
      return !this.get("id");
    }.property("id"),

    save: function save(opts) {
      if (this.get("is_base") || this.get("disableSave")) return;

      var self = this;
      this.set("savingStatus", I18n.t("saving"));
      this.set("saving", true);

      var data = {};

      if (!opts || !opts.enabledOnly) {
        data.name = this.name;
        data.base_scheme_id = this.get("base_scheme_id");
        data.colors = [];
        _.each(this.get("colors"), function (c) {
          if (!self.id || c.get("changed")) {
            data.colors.pushObject({ name: c.get("name"), hex: c.get("hex") });
          }
        });
      }

      return (0, _ajax.ajax)("/admin/color_schemes" + (this.id ? "/" + this.id : "") + ".json", {
        data: JSON.stringify({ color_scheme: data }),
        type: this.id ? "PUT" : "POST",
        dataType: "json",
        contentType: "application/json"
      }).then(function (result) {
        if (result.id) {
          self.set("id", result.id);
        }
        if (!opts || !opts.enabledOnly) {
          self.startTrackingChanges();
          _.each(self.get("colors"), function (c) {
            c.startTrackingChanges();
          });
        }
        self.set("savingStatus", I18n.t("saved"));
        self.set("saving", false);
        self.notifyPropertyChange("description");
      });
    },

    destroy: function destroy() {
      if (this.id) {
        return (0, _ajax.ajax)("/admin/color_schemes/" + this.id, { type: "DELETE" });
      }
    }
  });

  var ColorSchemes = Ember.ArrayProxy.extend({});

  ColorScheme.reopenClass({
    findAll: function findAll() {
      var colorSchemes = ColorSchemes.create({ content: [], loading: true });
      return (0, _ajax.ajax)("/admin/color_schemes").then(function (all) {
        _.each(all, function (colorScheme) {
          colorSchemes.pushObject(ColorScheme.create({
            id: colorScheme.id,
            name: colorScheme.name,
            is_base: colorScheme.is_base,
            theme_id: colorScheme.theme_id,
            theme_name: colorScheme.theme_name,
            base_scheme_id: colorScheme.base_scheme_id,
            colors: colorScheme.colors.map(function (c) {
              return _colorSchemeColor.default.create({
                name: c.name,
                hex: c.hex,
                default_hex: c.default_hex
              });
            })
          }));
        });
        return colorSchemes;
      });
    }
  });

  exports.default = ColorScheme;
});
define("admin/models/email-log", ["exports", "discourse/lib/ajax", "admin/models/admin-user"], function (exports, _ajax, _adminUser) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var EmailLog = Discourse.Model.extend({});

  EmailLog.reopenClass({
    create: function create(attrs) {
      attrs = attrs || {};

      if (attrs.user) {
        attrs.user = _adminUser.default.create(attrs.user);
      }

      if (attrs.post_url) {
        attrs.post_url = Discourse.getURL(attrs.post_url);
      }

      return this._super(attrs);
    },
    findAll: function findAll(filter, offset) {
      filter = filter || {};
      offset = offset || 0;

      var status = filter.status || "sent";
      filter = _.omit(filter, "status");

      return (0, _ajax.ajax)("/admin/email/" + status + ".json?offset=" + offset, {
        data: filter
      }).then(function (logs) {
        return _.map(logs, function (log) {
          return EmailLog.create(log);
        });
      });
    }
  });

  exports.default = EmailLog;
});
define("admin/models/email-preview", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.oneWeekAgo = oneWeekAgo;

  var EmailPreview = Discourse.Model.extend({});

  function oneWeekAgo() {
    return moment().locale("en").subtract(7, "days").format("YYYY-MM-DD");
  }

  EmailPreview.reopenClass({
    findDigest: function findDigest(username, lastSeenAt) {
      return (0, _ajax.ajax)("/admin/email/preview-digest.json", {
        data: { last_seen_at: lastSeenAt || oneWeekAgo(), username: username }
      }).then(function (result) {
        return EmailPreview.create(result);
      });
    },
    sendDigest: function sendDigest(username, lastSeenAt, email) {
      return (0, _ajax.ajax)("/admin/email/send-digest.json", {
        data: { last_seen_at: lastSeenAt || oneWeekAgo(), username: username, email: email }
      });
    }
  });

  exports.default = EmailPreview;
});
define("admin/models/email-settings", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var EmailSettings = Discourse.Model.extend({});

  EmailSettings.reopenClass({
    find: function find() {
      return (0, _ajax.ajax)("/admin/email.json").then(function (settings) {
        return EmailSettings.create(settings);
      });
    }
  });

  exports.default = EmailSettings;
});
define("admin/models/email-template", ["exports", "discourse/lib/ajax", "discourse/models/rest"], function (exports, _ajax, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _Ember = Ember,
      getProperties = _Ember.getProperties;
  exports.default = _rest.default.extend({
    revert: function revert() {
      return (0, _ajax.ajax)("/admin/customize/email_templates/" + this.get("id"), {
        method: "DELETE"
      }).then(function (result) {
        return getProperties(result.email_template, "subject", "body", "can_revert");
      });
    }
  });
});
define("admin/models/flag-type", ["exports", "discourse/models/rest", "ember-addons/ember-computed-decorators"], function (exports, _rest, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = _rest.default.extend((_dec = (0, _emberComputedDecorators.default)("id"), (_obj = {
    name: function name(id) {
      return I18n.t("admin.flags.summary.action_type_" + id, { count: 1 });
    }
  }, (_applyDecoratedDescriptor(_obj, "name", [_dec], Object.getOwnPropertyDescriptor(_obj, "name"), _obj)), _obj)));
});
define("admin/models/flagged-post", ["exports", "discourse/lib/ajax", "discourse/models/post", "ember-addons/ember-computed-decorators", "discourse/lib/ajax-error"], function (exports, _ajax, _post, _emberComputedDecorators, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _obj;

  exports.default = _post.default.extend((_dec = (0, _emberComputedDecorators.default)("last_revised_at", "post_actions.@each.created_at"), _dec2 = (0, _emberComputedDecorators.default)("post_actions"), _dec3 = (0, _emberComputedDecorators.default)("post_actions.@each.name_key"), _dec4 = (0, _emberComputedDecorators.default)("post_actions.@each.targets_topic"), _dec5 = (0, _emberComputedDecorators.default)("post_actions.@each.targets_topic"), _dec6 = (0, _emberComputedDecorators.default)("flaggedForSpam"), (_obj = {
    summary: function summary() {
      return _(this.post_actions).groupBy(function (a) {
        return a.post_action_type_id;
      }).map(function (v, k) {
        return I18n.t("admin.flags.summary.action_type_" + k, {
          count: v.length
        });
      }).join(",");
    },
    wasEdited: function wasEdited(lastRevisedAt) {
      if (Ember.isEmpty(this.get("last_revised_at"))) {
        return false;
      }
      lastRevisedAt = Date.parse(lastRevisedAt);
      return _.some(this.get("post_actions"), function (postAction) {
        return Date.parse(postAction.created_at) < lastRevisedAt;
      });
    },
    hasDisposedBy: function hasDisposedBy() {
      return this.get("post_actions").some(function (action) {
        return action.disposed_by;
      });
    },
    flaggedForSpam: function flaggedForSpam() {
      return this.get("post_actions").every(function (action) {
        return action.name_key === "spam";
      });
    },
    topicFlagged: function topicFlagged() {
      return _.any(this.get("post_actions"), function (action) {
        return action.targets_topic;
      });
    },
    postAuthorFlagged: function postAuthorFlagged() {
      return _.any(this.get("post_actions"), function (action) {
        return !action.targets_topic;
      });
    },
    canDeleteAsSpammer: function canDeleteAsSpammer(flaggedForSpam) {
      return flaggedForSpam && this.get("user.can_delete_all_posts") && this.get("user.can_be_deleted");
    },
    deletePost: function deletePost() {
      if (this.get("post_number") === 1) {
        return (0, _ajax.ajax)("/t/" + this.topic_id, { type: "DELETE", cache: false });
      } else {
        return (0, _ajax.ajax)("/posts/" + this.id, { type: "DELETE", cache: false });
      }
    },
    disagreeFlags: function disagreeFlags() {
      return (0, _ajax.ajax)("/admin/flags/disagree/" + this.id, {
        type: "POST",
        cache: false
      }).catch(_ajaxError.popupAjaxError);
    },
    deferFlags: function deferFlags(deletePost) {
      var _this = this;

      var action = function action() {
        return (0, _ajax.ajax)("/admin/flags/defer/" + _this.id, {
          type: "POST",
          cache: false,
          data: { delete_post: deletePost }
        });
      };

      if (deletePost && this._hasDeletableReplies()) {
        return this._actOnFlagAndDeleteReplies(action);
      } else {
        return action().catch(_ajaxError.popupAjaxError);
      }
    },
    agreeFlags: function agreeFlags(actionOnPost) {
      var _this2 = this;

      var action = function action() {
        return (0, _ajax.ajax)("/admin/flags/agree/" + _this2.id, {
          type: "POST",
          cache: false,
          data: { action_on_post: actionOnPost }
        });
      };

      if (actionOnPost === "delete" && this._hasDeletableReplies()) {
        return this._actOnFlagAndDeleteReplies(action);
      } else {
        return action().catch(_ajaxError.popupAjaxError);
      }
    },
    _hasDeletableReplies: function _hasDeletableReplies() {
      return this.get("post_number") > 1 && this.get("reply_count") > 0;
    },
    _actOnFlagAndDeleteReplies: function _actOnFlagAndDeleteReplies(action) {
      var _this3 = this;

      return new Ember.RSVP.Promise(function (resolve, reject) {
        return (0, _ajax.ajax)("/posts/" + _this3.id + "/reply-ids/all.json").then(function (replies) {
          var buttons = [];

          buttons.push({
            label: I18n.t("no_value"),
            callback: function callback() {
              action().then(resolve).catch(function (error) {
                (0, _ajaxError.popupAjaxError)(error);
                reject();
              });
            }
          });

          buttons.push({
            label: I18n.t("yes_value"),
            class: "btn-danger",
            callback: function callback() {
              _post.default.deleteMany(replies.map(function (r) {
                return r.id;
              })).then(action).then(resolve).catch(function (error) {
                (0, _ajaxError.popupAjaxError)(error);
                reject();
              });
            }
          });

          bootbox.dialog(I18n.t("admin.flags.delete_replies", { count: replies.length }), buttons);
        }).catch(function (error) {
          (0, _ajaxError.popupAjaxError)(error);
          reject();
        });
      });
    },


    postHidden: Ember.computed.alias("hidden"),

    deleted: Ember.computed.or("deleted_at", "topic_deleted_at")
  }, (_applyDecoratedDescriptor(_obj, "summary", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "summary"), _obj), _applyDecoratedDescriptor(_obj, "wasEdited", [_dec], Object.getOwnPropertyDescriptor(_obj, "wasEdited"), _obj), _applyDecoratedDescriptor(_obj, "hasDisposedBy", [_dec2], Object.getOwnPropertyDescriptor(_obj, "hasDisposedBy"), _obj), _applyDecoratedDescriptor(_obj, "flaggedForSpam", [_dec3], Object.getOwnPropertyDescriptor(_obj, "flaggedForSpam"), _obj), _applyDecoratedDescriptor(_obj, "topicFlagged", [_dec4], Object.getOwnPropertyDescriptor(_obj, "topicFlagged"), _obj), _applyDecoratedDescriptor(_obj, "postAuthorFlagged", [_dec5], Object.getOwnPropertyDescriptor(_obj, "postAuthorFlagged"), _obj), _applyDecoratedDescriptor(_obj, "canDeleteAsSpammer", [_dec6], Object.getOwnPropertyDescriptor(_obj, "canDeleteAsSpammer"), _obj)), _obj)));
});
define("admin/models/incoming-email", ["exports", "discourse/lib/ajax", "admin/models/admin-user"], function (exports, _ajax, _adminUser) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var IncomingEmail = Discourse.Model.extend({});

  IncomingEmail.reopenClass({
    create: function create(attrs) {
      attrs = attrs || {};

      if (attrs.user) {
        attrs.user = _adminUser.default.create(attrs.user);
      }

      return this._super(attrs);
    },
    find: function find(id) {
      return (0, _ajax.ajax)("/admin/email/incoming/" + id + ".json");
    },
    findByBounced: function findByBounced(id) {
      return (0, _ajax.ajax)("/admin/email/incoming_from_bounced/" + id + ".json");
    },
    findAll: function findAll(filter, offset) {
      filter = filter || {};
      offset = offset || 0;

      var status = filter.status || "received";
      filter = _.omit(filter, "status");

      return (0, _ajax.ajax)("/admin/email/" + status + ".json?offset=" + offset, {
        data: filter
      }).then(function (incomings) {
        return _.map(incomings, function (incoming) {
          return IncomingEmail.create(incoming);
        });
      });
    },
    loadRawEmail: function loadRawEmail(id) {
      return (0, _ajax.ajax)("/admin/email/incoming/" + id + "/raw.json");
    }
  });

  exports.default = IncomingEmail;
});
define("admin/models/permalink", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Permalink = Discourse.Model.extend({
    save: function save() {
      return (0, _ajax.ajax)("/admin/permalinks.json", {
        type: "POST",
        data: {
          url: this.get("url"),
          permalink_type: this.get("permalink_type"),
          permalink_type_value: this.get("permalink_type_value")
        }
      });
    },

    destroy: function destroy() {
      return (0, _ajax.ajax)("/admin/permalinks/" + this.get("id") + ".json", {
        type: "DELETE"
      });
    }
  });

  Permalink.reopenClass({
    findAll: function findAll(filter) {
      return (0, _ajax.ajax)("/admin/permalinks.json", { data: { filter: filter } }).then(function (permalinks) {
        return permalinks.map(function (p) {
          return Permalink.create(p);
        });
      });
    }
  });

  exports.default = Permalink;
});
define("admin/models/report", ["exports", "discourse/lib/utilities", "discourse/lib/ajax", "discourse/lib/round", "ember-addons/ember-computed-decorators", "discourse/lib/formatter", "discourse/helpers/user-avatar"], function (exports, _utilities, _ajax, _round, _emberComputedDecorators, _formatter, _userAvatar) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SCHEMA_VERSION = undefined;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _desc, _value, _obj;

  // Change this line each time report format change
  // and you want to ensure cache is reset
  var SCHEMA_VERSION = exports.SCHEMA_VERSION = 3;

  var Report = Discourse.Model.extend((_dec = (0, _emberComputedDecorators.default)("modes"), _dec2 = (0, _emberComputedDecorators.default)("type", "start_date", "end_date"), _dec3 = (0, _emberComputedDecorators.default)("yesterdayCount", "higher_is_better"), _dec4 = (0, _emberComputedDecorators.default)("lastSevenDaysCount", "higher_is_better"), _dec5 = (0, _emberComputedDecorators.default)("data"), _dec6 = (0, _emberComputedDecorators.default)("data", "currentTotal"), _dec7 = (0, _emberComputedDecorators.default)("trend", "higher_is_better"), _dec8 = (0, _emberComputedDecorators.default)("sevenDaysTrend", "higher_is_better"), _dec9 = (0, _emberComputedDecorators.default)("thirtyDaysTrend", "higher_is_better"), _dec10 = (0, _emberComputedDecorators.default)("yesterdayTrend", "higher_is_better"), _dec11 = (0, _emberComputedDecorators.default)("prev_period", "currentTotal", "currentAverage", "higher_is_better"), _dec12 = (0, _emberComputedDecorators.default)("prev30Days", "lastThirtyDaysCount", "higher_is_better"), _dec13 = (0, _emberComputedDecorators.default)("type"), _dec14 = (0, _emberComputedDecorators.default)("prev_period", "currentTotal", "currentAverage"), _dec15 = (0, _emberComputedDecorators.default)("yesterdayCount"), _dec16 = (0, _emberComputedDecorators.default)("lastSevenDaysCount"), _dec17 = (0, _emberComputedDecorators.default)("prev30Days", "lastThirtyDaysCount"), _dec18 = (0, _emberComputedDecorators.default)("data"), _dec19 = (0, _emberComputedDecorators.default)("data"), _dec20 = (0, _emberComputedDecorators.default)("labels"), (_obj = {
    average: false,
    percent: false,
    higher_is_better: true,

    onlyTable: function onlyTable(modes) {
      return modes.length === 1 && modes[0] === "table";
    },
    reportUrl: function reportUrl(type, start_date, end_date) {
      start_date = moment.utc(start_date).locale("en").format("YYYY-MM-DD");

      end_date = moment.utc(end_date).locale("en").format("YYYY-MM-DD");

      return Discourse.getURL("/admin/reports/" + type + "?start_date=" + start_date + "&end_date=" + end_date);
    },
    valueAt: function valueAt(numDaysAgo) {
      if (this.data) {
        var wantedDate = moment().subtract(numDaysAgo, "days").locale("en").format("YYYY-MM-DD");
        var item = this.data.find(function (d) {
          return d.x === wantedDate;
        });
        if (item) {
          return item.y;
        }
      }
      return 0;
    },
    valueFor: function valueFor(startDaysAgo, endDaysAgo) {
      if (this.data) {
        var earliestDate = moment().subtract(endDaysAgo, "days").startOf("day");
        var latestDate = moment().subtract(startDaysAgo, "days").startOf("day");
        var d = void 0,
            sum = 0,
            count = 0;
        _.each(this.data, function (datum) {
          d = moment(datum.x);
          if (d >= earliestDate && d <= latestDate) {
            sum += datum.y;
            count++;
          }
        });
        if (this.get("method") === "average" && count > 0) {
          sum /= count;
        }
        return (0, _round.default)(sum, -2);
      }
    },


    todayCount: function () {
      return this.valueAt(0);
    }.property("data", "average"),
    yesterdayCount: function () {
      return this.valueAt(1);
    }.property("data", "average"),
    sevenDaysAgoCount: function () {
      return this.valueAt(7);
    }.property("data", "average"),
    thirtyDaysAgoCount: function () {
      return this.valueAt(30);
    }.property("data", "average"),

    lastSevenDaysCount: function () {
      return this.averageCount(7, this.valueFor(1, 7));
    }.property("data", "average"),
    lastThirtyDaysCount: function () {
      return this.averageCount(30, this.valueFor(1, 30));
    }.property("data", "average"),

    averageCount: function averageCount(count, value) {
      return this.get("average") ? value / count : value;
    },
    yesterdayTrend: function yesterdayTrend(yesterdayCount, higherIsBetter) {
      return this._computeTrend(this.valueAt(2), yesterdayCount, higherIsBetter);
    },
    sevenDaysTrend: function sevenDaysTrend(lastSevenDaysCount, higherIsBetter) {
      return this._computeTrend(this.valueFor(8, 14), lastSevenDaysCount, higherIsBetter);
    },
    currentTotal: function currentTotal(data) {
      return _.reduce(data, function (cur, pair) {
        return cur + pair.y;
      }, 0);
    },
    currentAverage: function currentAverage(data, total) {
      return Ember.makeArray(data).length === 0 ? 0 : parseFloat((total / parseFloat(data.length)).toFixed(1));
    },
    trendIcon: function trendIcon(trend, higherIsBetter) {
      return this._iconForTrend(trend, higherIsBetter);
    },
    sevenDaysTrendIcon: function sevenDaysTrendIcon(sevenDaysTrend, higherIsBetter) {
      return this._iconForTrend(sevenDaysTrend, higherIsBetter);
    },
    thirtyDaysTrendIcon: function thirtyDaysTrendIcon(thirtyDaysTrend, higherIsBetter) {
      return this._iconForTrend(thirtyDaysTrend, higherIsBetter);
    },
    yesterdayTrendIcon: function yesterdayTrendIcon(yesterdayTrend, higherIsBetter) {
      return this._iconForTrend(yesterdayTrend, higherIsBetter);
    },
    trend: function trend(prev, currentTotal, currentAverage, higherIsBetter) {
      var total = this.get("average") ? currentAverage : currentTotal;
      return this._computeTrend(prev, total, higherIsBetter);
    },
    thirtyDaysTrend: function thirtyDaysTrend(prev30Days, lastThirtyDaysCount, higherIsBetter) {
      return this._computeTrend(prev30Days, lastThirtyDaysCount, higherIsBetter);
    },
    method: function method(type) {
      if (type === "time_to_first_response") {
        return "average";
      } else {
        return "sum";
      }
    },
    percentChangeString: function percentChangeString(val1, val2) {
      var change = this._computeChange(val1, val2);

      if (isNaN(change) || !isFinite(change)) {
        return null;
      } else if (change > 0) {
        return "+" + change.toFixed(0) + "%";
      } else {
        return change.toFixed(0) + "%";
      }
    },
    trendTitle: function trendTitle(prev, currentTotal, currentAverage) {
      var current = this.get("average") ? currentAverage : currentTotal;
      var percent = this.percentChangeString(prev, current);

      if (this.get("average")) {
        prev = prev ? prev.toFixed(1) : "0";
        if (this.get("percent")) {
          current += "%";
          prev += "%";
        }
      } else {
        prev = (0, _formatter.number)(prev);
        current = (0, _formatter.number)(current);
      }

      return I18n.t("admin.dashboard.reports.trend_title", {
        percent: percent,
        prev: prev,
        current: current
      });
    },
    changeTitle: function changeTitle(valAtT1, valAtT2, prevPeriodString) {
      var change = this.percentChangeString(valAtT1, valAtT2);
      var title = "";
      if (change) {
        title += change + " change. ";
      }
      title += "Was " + (0, _formatter.number)(valAtT1) + " " + prevPeriodString + ".";
      return title;
    },
    yesterdayCountTitle: function yesterdayCountTitle(yesterdayCount) {
      return this.changeTitle(this.valueAt(2), yesterdayCount, "two days ago");
    },
    sevenDaysCountTitle: function sevenDaysCountTitle(lastSevenDaysCount) {
      return this.changeTitle(this.valueFor(8, 14), lastSevenDaysCount, "two weeks ago");
    },
    thirtyDaysCountTitle: function thirtyDaysCountTitle(prev30Days, lastThirtyDaysCount) {
      return this.changeTitle(prev30Days, lastThirtyDaysCount, "in the previous 30 day period");
    },
    sortedData: function sortedData(data) {
      return this.get("xAxisIsDate") ? data.toArray().reverse() : data.toArray();
    },
    xAxisIsDate: function xAxisIsDate() {
      if (!this.data[0]) return false;
      return this.data && this.data[0].x.match(/\d{4}-\d{1,2}-\d{1,2}/);
    },
    computedLabels: function computedLabels(labels) {
      var _this = this;

      return labels.map(function (label) {
        var type = label.type || "string";

        var mainProperty = void 0;
        if (label.property) mainProperty = label.property;else if (type === "user") mainProperty = label.properties["username"];else if (type === "topic") mainProperty = label.properties["title"];else if (type === "post") mainProperty = label.properties["truncated_raw"];else mainProperty = label.properties[0];

        return {
          title: label.title,
          sortProperty: label.sort_property || mainProperty,
          mainProperty: mainProperty,
          type: type,
          compute: function compute(row) {
            var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var value = row[mainProperty];

            if (type === "user") return _this._userLabel(label.properties, row);
            if (type === "post") return _this._postLabel(label.properties, row);
            if (type === "topic") return _this._topicLabel(label.properties, row);
            if (type === "seconds") return _this._secondsLabel(value);
            if (type === "link") return _this._linkLabel(label.properties, row);
            if (type === "percent") return _this._percentLabel(value);
            if (type === "number") {
              return _this._numberLabel(value, opts);
            }
            if (type === "date") {
              var date = moment(value, "YYYY-MM-DD");
              if (date.isValid()) return _this._dateLabel(value, date);
            }
            if (type === "text") return _this._textLabel(value);

            return {
              value: value,
              type: type,
              property: mainProperty,
              formatedValue: value ? (0, _utilities.escapeExpression)(value) : "—"
            };
          }
        };
      });
    },
    _userLabel: function _userLabel(properties, row) {
      var username = row[properties.username];

      var formatedValue = function formatedValue() {
        var userId = row[properties.id];

        var user = Ember.Object.create({
          username: username,
          name: (0, _utilities.formatUsername)(username),
          avatar_template: row[properties.avatar]
        });

        var href = Discourse.getURL("/admin/users/" + userId + "/" + username);

        var avatarImg = (0, _userAvatar.renderAvatar)(user, {
          imageSize: "tiny",
          ignoreTitle: true
        });

        return "<a href='" + href + "'>" + avatarImg + "<span class='username'>" + user.name + "</span></a>";
      };

      return {
        value: username,
        formatedValue: username ? formatedValue(username) : "—"
      };
    },
    _topicLabel: function _topicLabel(properties, row) {
      var topicTitle = row[properties.title];

      var formatedValue = function formatedValue() {
        var topicId = row[properties.id];
        var href = Discourse.getURL("/t/-/" + topicId);
        return "<a href='" + href + "'>" + topicTitle + "</a>";
      };

      return {
        value: topicTitle,
        formatedValue: topicTitle ? formatedValue() : "—"
      };
    },
    _postLabel: function _postLabel(properties, row) {
      var postTitle = row[properties.truncated_raw];
      var postNumber = row[properties.number];
      var topicId = row[properties.topic_id];
      var href = Discourse.getURL("/t/-/" + topicId + "/" + postNumber);

      return {
        property: properties.title,
        value: postTitle,
        formatedValue: "<a href='" + href + "'>" + postTitle + "</a>"
      };
    },
    _secondsLabel: function _secondsLabel(value) {
      return {
        value: value,
        formatedValue: (0, _formatter.durationTiny)(value)
      };
    },
    _percentLabel: function _percentLabel(value) {
      return {
        value: value,
        formatedValue: value ? value + "%" : "—"
      };
    },
    _numberLabel: function _numberLabel(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var formatNumbers = Ember.isEmpty(options.formatNumbers) ? true : options.formatNumbers;

      var formatedValue = function formatedValue() {
        return formatNumbers ? (0, _formatter.number)(value) : value;
      };

      return {
        value: value,
        formatedValue: value ? formatedValue() : "—"
      };
    },
    _dateLabel: function _dateLabel(value, date) {
      return {
        value: value,
        formatedValue: value ? date.format("LL") : "—"
      };
    },
    _textLabel: function _textLabel(value) {
      var escaped = (0, _utilities.escapeExpression)(value);

      return {
        value: value,
        formatedValue: value ? escaped : "—"
      };
    },
    _linkLabel: function _linkLabel(properties, row) {
      var property = properties[0];
      var value = Discourse.getURL(row[property]);
      var formatedValue = function formatedValue(href, anchor) {
        return "<a href=\"" + (0, _utilities.escapeExpression)(href) + "\">" + (0, _utilities.escapeExpression)(anchor) + "</a>";
      };

      return {
        value: value,
        formatedValue: value ? formatedValue(value, row[properties[1]]) : "—"
      };
    },
    _computeChange: function _computeChange(valAtT1, valAtT2) {
      return (valAtT2 - valAtT1) / valAtT1 * 100;
    },
    _computeTrend: function _computeTrend(valAtT1, valAtT2, higherIsBetter) {
      var change = this._computeChange(valAtT1, valAtT2);

      if (change > 50) {
        return higherIsBetter ? "high-trending-up" : "high-trending-down";
      } else if (change > 2) {
        return higherIsBetter ? "trending-up" : "trending-down";
      } else if (change <= 2 && change >= -2) {
        return "no-change";
      } else if (change < -50) {
        return higherIsBetter ? "high-trending-down" : "high-trending-up";
      } else if (change < -2) {
        return higherIsBetter ? "trending-down" : "trending-up";
      }
    },
    _iconForTrend: function _iconForTrend(trend, higherIsBetter) {
      switch (trend) {
        case "trending-up":
          return higherIsBetter ? "angle-up" : "angle-down";
        case "trending-down":
          return higherIsBetter ? "angle-down" : "angle-up";
        case "high-trending-up":
          return higherIsBetter ? "angle-double-up" : "angle-double-down";
        case "high-trending-down":
          return higherIsBetter ? "angle-double-down" : "angle-double-up";
        default:
          return "minus";
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "onlyTable", [_dec], Object.getOwnPropertyDescriptor(_obj, "onlyTable"), _obj), _applyDecoratedDescriptor(_obj, "reportUrl", [_dec2], Object.getOwnPropertyDescriptor(_obj, "reportUrl"), _obj), _applyDecoratedDescriptor(_obj, "yesterdayTrend", [_dec3], Object.getOwnPropertyDescriptor(_obj, "yesterdayTrend"), _obj), _applyDecoratedDescriptor(_obj, "sevenDaysTrend", [_dec4], Object.getOwnPropertyDescriptor(_obj, "sevenDaysTrend"), _obj), _applyDecoratedDescriptor(_obj, "currentTotal", [_dec5], Object.getOwnPropertyDescriptor(_obj, "currentTotal"), _obj), _applyDecoratedDescriptor(_obj, "currentAverage", [_dec6], Object.getOwnPropertyDescriptor(_obj, "currentAverage"), _obj), _applyDecoratedDescriptor(_obj, "trendIcon", [_dec7], Object.getOwnPropertyDescriptor(_obj, "trendIcon"), _obj), _applyDecoratedDescriptor(_obj, "sevenDaysTrendIcon", [_dec8], Object.getOwnPropertyDescriptor(_obj, "sevenDaysTrendIcon"), _obj), _applyDecoratedDescriptor(_obj, "thirtyDaysTrendIcon", [_dec9], Object.getOwnPropertyDescriptor(_obj, "thirtyDaysTrendIcon"), _obj), _applyDecoratedDescriptor(_obj, "yesterdayTrendIcon", [_dec10], Object.getOwnPropertyDescriptor(_obj, "yesterdayTrendIcon"), _obj), _applyDecoratedDescriptor(_obj, "trend", [_dec11], Object.getOwnPropertyDescriptor(_obj, "trend"), _obj), _applyDecoratedDescriptor(_obj, "thirtyDaysTrend", [_dec12], Object.getOwnPropertyDescriptor(_obj, "thirtyDaysTrend"), _obj), _applyDecoratedDescriptor(_obj, "method", [_dec13], Object.getOwnPropertyDescriptor(_obj, "method"), _obj), _applyDecoratedDescriptor(_obj, "trendTitle", [_dec14], Object.getOwnPropertyDescriptor(_obj, "trendTitle"), _obj), _applyDecoratedDescriptor(_obj, "yesterdayCountTitle", [_dec15], Object.getOwnPropertyDescriptor(_obj, "yesterdayCountTitle"), _obj), _applyDecoratedDescriptor(_obj, "sevenDaysCountTitle", [_dec16], Object.getOwnPropertyDescriptor(_obj, "sevenDaysCountTitle"), _obj), _applyDecoratedDescriptor(_obj, "thirtyDaysCountTitle", [_dec17], Object.getOwnPropertyDescriptor(_obj, "thirtyDaysCountTitle"), _obj), _applyDecoratedDescriptor(_obj, "sortedData", [_dec18], Object.getOwnPropertyDescriptor(_obj, "sortedData"), _obj), _applyDecoratedDescriptor(_obj, "xAxisIsDate", [_dec19], Object.getOwnPropertyDescriptor(_obj, "xAxisIsDate"), _obj), _applyDecoratedDescriptor(_obj, "computedLabels", [_dec20], Object.getOwnPropertyDescriptor(_obj, "computedLabels"), _obj)), _obj)));

  Report.reopenClass({
    fillMissingDates: function fillMissingDates(report) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var dataField = options.dataField || "data";
      var filledField = options.filledField || "data";
      var startDate = options.startDate || "start_date";
      var endDate = options.endDate || "end_date";

      if (_.isArray(report[dataField])) {
        var startDateFormatted = moment.utc(report[startDate]).locale("en").format("YYYY-MM-DD");
        var endDateFormatted = moment.utc(report[endDate]).locale("en").format("YYYY-MM-DD");
        report[filledField] = (0, _utilities.fillMissingDates)(JSON.parse(JSON.stringify(report[dataField])), startDateFormatted, endDateFormatted);
      }
    },
    find: function find(type, startDate, endDate, categoryId, groupId) {
      return (0, _ajax.ajax)("/admin/reports/" + type, {
        data: {
          start_date: startDate,
          end_date: endDate,
          category_id: categoryId,
          group_id: groupId
        }
      }).then(function (json) {
        // don’t fill for large multi column tables
        // which are not date based
        var modes = json.report.modes;
        if (modes.length !== 1 && modes[0] !== "table") {
          Report.fillMissingDates(json.report);
        }

        var model = Report.create({ type: type });
        model.setProperties(json.report);

        if (json.report.related_report) {
          // TODO: fillMissingDates if xaxis is date
          var related = Report.create({
            type: json.report.related_report.type
          });
          related.setProperties(json.report.related_report);
          model.set("relatedReport", related);
        }

        return model;
      });
    }
  });

  exports.default = Report;
});
define("admin/models/screened-email", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ScreenedEmail = Discourse.Model.extend({
    actionName: function () {
      return I18n.t("admin.logs.screened_actions." + this.get("action"));
    }.property("action"),

    clearBlock: function clearBlock() {
      return (0, _ajax.ajax)("/admin/logs/screened_emails/" + this.get("id"), {
        method: "DELETE"
      });
    }
  });

  ScreenedEmail.reopenClass({
    findAll: function findAll() {
      return (0, _ajax.ajax)("/admin/logs/screened_emails.json").then(function (screened_emails) {
        return screened_emails.map(function (b) {
          return ScreenedEmail.create(b);
        });
      });
    }
  });

  exports.default = ScreenedEmail;
});
define("admin/models/screened-url", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ScreenedUrl = Discourse.Model.extend({
    actionName: function () {
      return I18n.t("admin.logs.screened_actions." + this.get("action"));
    }.property("action")
  });

  ScreenedUrl.reopenClass({
    findAll: function findAll() {
      return (0, _ajax.ajax)("/admin/logs/screened_urls.json").then(function (screened_urls) {
        return screened_urls.map(function (b) {
          return ScreenedUrl.create(b);
        });
      });
    }
  });

  exports.default = ScreenedUrl;
});
define("admin/models/site-text", ["exports", "discourse/lib/ajax", "discourse/models/rest"], function (exports, _ajax, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _Ember = Ember,
      getProperties = _Ember.getProperties;
  exports.default = _rest.default.extend({
    revert: function revert() {
      return (0, _ajax.ajax)("/admin/customize/site_texts/" + this.get("id"), {
        method: "DELETE"
      }).then(function (result) {
        return getProperties(result.site_text, "value", "can_revert");
      });
    }
  });
});
define("admin/models/staff-action-log", ["exports", "ember-addons/ember-computed-decorators", "discourse/lib/ajax", "admin/models/admin-user", "discourse/lib/utilities"], function (exports, _emberComputedDecorators, _ajax, _adminUser, _utilities) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj;

  function format(label, value) {
    var escape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    return value ? "<b>" + I18n.t(label) + "</b>: " + (escape ? (0, _utilities.escapeExpression)(value) : value) : "";
  }

  var StaffActionLog = Discourse.Model.extend((_dec = (0, _emberComputedDecorators.default)("action_name"), _dec2 = (0, _emberComputedDecorators.default)("email", "ip_address", "topic_id", "post_id", "category_id", "new_value", "previous_value", "details", "useCustomModalForDetails", "useModalForDetails"), _dec3 = (0, _emberComputedDecorators.default)("details"), _dec4 = (0, _emberComputedDecorators.default)("action_name"), (_obj = {
    showFullDetails: false,

    actionName: function actionName(_actionName) {
      return I18n.t("admin.logs.staff_actions.actions." + _actionName);
    },
    formattedDetails: function formattedDetails(email, ipAddress, topicId, postId, categoryId, newValue, previousValue, details, useCustomModalForDetails, useModalForDetails) {
      var postLink = postId ? "<a href data-link-post-id=\"" + postId + "\">" + postId + "</a>" : null;

      var lines = [format("email", email), format("admin.logs.ip_address", ipAddress), format("admin.logs.topic_id", topicId), format("admin.logs.post_id", postLink, false), format("admin.logs.category_id", categoryId)];

      if (!useCustomModalForDetails) {
        lines.push(format("admin.logs.staff_actions.new_value", newValue));
        lines.push(format("admin.logs.staff_actions.previous_value", previousValue));
      }

      if (!useModalForDetails && details) {
        lines = [].concat(_toConsumableArray(lines), _toConsumableArray((0, _utilities.escapeExpression)(details).split("\n")));
      }

      var formatted = lines.filter(function (l) {
        return l.length > 0;
      }).join("<br/>");
      return formatted.length > 0 ? formatted + "<br/>" : "";
    },
    useModalForDetails: function useModalForDetails(details) {
      return details && details.length > 100;
    },
    useCustomModalForDetails: function useCustomModalForDetails(actionName) {
      return ["change_theme", "delete_theme"].includes(actionName);
    }
  }, (_applyDecoratedDescriptor(_obj, "actionName", [_dec], Object.getOwnPropertyDescriptor(_obj, "actionName"), _obj), _applyDecoratedDescriptor(_obj, "formattedDetails", [_dec2], Object.getOwnPropertyDescriptor(_obj, "formattedDetails"), _obj), _applyDecoratedDescriptor(_obj, "useModalForDetails", [_dec3], Object.getOwnPropertyDescriptor(_obj, "useModalForDetails"), _obj), _applyDecoratedDescriptor(_obj, "useCustomModalForDetails", [_dec4], Object.getOwnPropertyDescriptor(_obj, "useCustomModalForDetails"), _obj)), _obj)));

  StaffActionLog.reopenClass({
    create: function create(attrs) {
      attrs = attrs || {};

      if (attrs.acting_user) {
        attrs.acting_user = _adminUser.default.create(attrs.acting_user);
      }
      if (attrs.target_user) {
        attrs.target_user = _adminUser.default.create(attrs.target_user);
      }
      return this._super(attrs);
    },
    findAll: function findAll(data) {
      return (0, _ajax.ajax)("/admin/logs/staff_action_logs.json", { data: data }).then(function (result) {
        return {
          staff_action_logs: result.staff_action_logs.map(function (s) {
            return StaffActionLog.create(s);
          }),
          user_history_actions: result.user_history_actions
        };
      });
    }
  });

  exports.default = StaffActionLog;
});
define("admin/models/theme-settings", ["exports", "admin/mixins/setting-object"], function (exports, _settingObject) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Model.extend(_settingObject.default, {});
});
define("admin/models/theme", ["exports", "discourse/models/rest", "ember-addons/ember-computed-decorators", "discourse/lib/ajax-error"], function (exports, _rest, _emberComputedDecorators, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.COMPONENTS = exports.THEMES = undefined;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _desc, _value, _obj, _init;

  var THEME_UPLOAD_VAR = 2;

  var THEMES = exports.THEMES = "themes";
  var COMPONENTS = exports.COMPONENTS = "components";
  var SETTINGS_TYPE_ID = 5;

  var Theme = _rest.default.extend((_dec = (0, _emberComputedDecorators.default)("theme_fields"), _dec2 = (0, _emberComputedDecorators.default)("theme_fields", "theme_fields.@each"), _dec3 = (0, _emberComputedDecorators.default)("theme_fields", "theme_fields.@each.error"), _dec4 = (0, _emberComputedDecorators.default)("theme_fields.@each"), _dec5 = (0, _emberComputedDecorators.default)("remote_theme.last_error_text"), _dec6 = (0, _emberComputedDecorators.default)("childThemes.@each"), _dec7 = (0, _emberComputedDecorators.default)("name", "default"), (_obj = {
    FIELDS_IDS: [0, 1],
    isActive: Em.computed.or("default", "user_selectable"),
    isPendingUpdates: Em.computed.gt("remote_theme.commits_behind", 0),
    hasEditedFields: Em.computed.gt("editedFields.length", 0),

    themeFields: function themeFields(fields) {
      var _this = this;

      if (!fields) {
        this.set("theme_fields", []);
        return {};
      }

      var hash = {};
      fields.forEach(function (field) {
        if (!field.type_id || _this.get("FIELDS_IDS").includes(field.type_id)) {
          hash[_this.getKey(field)] = field;
        }
      });
      return hash;
    },
    uploads: function uploads(fields) {
      if (!fields) {
        return [];
      }
      return fields.filter(function (f) {
        return f.target === "common" && f.type_id === THEME_UPLOAD_VAR;
      });
    },
    isBroken: function isBroken(fields) {
      return fields && fields.some(function (field) {
        return field.error && field.error.length > 0;
      });
    },
    editedFields: function editedFields(fields) {
      return fields.filter(function (field) {
        return !Em.isBlank(field.value) && field.type_id !== SETTINGS_TYPE_ID;
      });
    },
    remoteError: function remoteError(errorText) {
      if (errorText && errorText.length > 0) {
        return errorText;
      }
    },
    getKey: function getKey(field) {
      return field.target + " " + field.name;
    },
    hasEdited: function hasEdited(target, name) {
      if (name) {
        return !Em.isEmpty(this.getField(target, name));
      } else {
        var fields = this.get("theme_fields") || [];
        return fields.any(function (field) {
          return field.target === target && !Em.isEmpty(field.value);
        });
      }
    },
    getError: function getError(target, name) {
      var themeFields = this.get("themeFields");
      var key = this.getKey({ target: target, name: name });
      var field = themeFields[key];
      return field ? field.error : "";
    },
    getField: function getField(target, name) {
      var themeFields = this.get("themeFields");
      var key = this.getKey({ target: target, name: name });
      var field = themeFields[key];
      return field ? field.value : "";
    },
    removeField: function removeField(field) {
      this.set("changed", true);

      field.upload_id = null;
      field.value = null;

      return this.saveChanges("theme_fields");
    },
    setField: function setField(target, name, value, upload_id, type_id) {
      this.set("changed", true);
      var themeFields = this.get("themeFields");
      var field = { name: name, target: target, value: value, upload_id: upload_id, type_id: type_id };

      // slow path for uploads and so on
      if (type_id && type_id > 1) {
        var fields = this.get("theme_fields");
        var existing = fields.find(function (f) {
          return f.target === target && f.name === name && f.type_id === type_id;
        });
        if (existing) {
          existing.value = value;
          existing.upload_id = upload_id;
        } else {
          fields.push(field);
        }
        return;
      }

      // fast path
      var key = this.getKey({ target: target, name: name });
      var existingField = themeFields[key];
      if (!existingField) {
        this.theme_fields.push(field);
        themeFields[key] = field;
      } else {
        existingField.value = value;
      }
    },
    child_theme_ids: function child_theme_ids(childThemes) {
      if (childThemes) {
        return childThemes.map(function (theme) {
          return Ember.get(theme, "id");
        });
      }
    },
    removeChildTheme: function removeChildTheme(theme) {
      var childThemes = this.get("childThemes");
      childThemes.removeObject(theme);
      return this.saveChanges("child_theme_ids");
    },
    addChildTheme: function addChildTheme(theme) {
      var childThemes = this.get("childThemes");
      if (!childThemes) {
        childThemes = [];
        this.set("childThemes", childThemes);
      }
      childThemes.removeObject(theme);
      childThemes.pushObject(theme);
      return this.saveChanges("child_theme_ids");
    },

    description: function description(name, isDefault) {
      if (isDefault) {
        return I18n.t("admin.customize.theme.default_name", { name: name });
      } else {
        return name;
      }
    },

    checkForUpdates: function checkForUpdates() {
      var _this2 = this;

      return this.save({ remote_check: true }).then(function () {
        return _this2.set("changed", false);
      });
    },
    updateToLatest: function updateToLatest() {
      var _this3 = this;

      return this.save({ remote_update: true }).then(function () {
        return _this3.set("changed", false);
      });
    },


    changed: false,

    saveChanges: function saveChanges() {
      var _this4 = this;

      var hash = this.getProperties.apply(this, arguments);
      return this.save(hash).finally(function () {
        return _this4.set("changed", false);
      }).catch(_ajaxError.popupAjaxError);
    },
    saveSettings: function saveSettings(name, value) {
      var settings = {};
      settings[name] = value;
      return this.save({ settings: settings });
    }
  }, (_applyDecoratedDescriptor(_obj, "themeFields", [_dec], Object.getOwnPropertyDescriptor(_obj, "themeFields"), _obj), _applyDecoratedDescriptor(_obj, "uploads", [_dec2], Object.getOwnPropertyDescriptor(_obj, "uploads"), _obj), _applyDecoratedDescriptor(_obj, "isBroken", [_dec3], Object.getOwnPropertyDescriptor(_obj, "isBroken"), _obj), _applyDecoratedDescriptor(_obj, "editedFields", [_dec4], Object.getOwnPropertyDescriptor(_obj, "editedFields"), _obj), _applyDecoratedDescriptor(_obj, "remoteError", [_dec5], Object.getOwnPropertyDescriptor(_obj, "remoteError"), _obj), _applyDecoratedDescriptor(_obj, "child_theme_ids", [_dec6], Object.getOwnPropertyDescriptor(_obj, "child_theme_ids"), _obj), _applyDecoratedDescriptor(_obj, "description", [_dec7], (_init = Object.getOwnPropertyDescriptor(_obj, "description"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj)), _obj)));

  exports.default = Theme;
});
define("admin/models/version-check", ["exports", "discourse/lib/ajax", "ember-addons/ember-computed-decorators"], function (exports, _ajax, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

  var VersionCheck = Discourse.Model.extend((_dec = (0, _emberComputedDecorators.default)("updated_at"), _dec2 = (0, _emberComputedDecorators.default)("missing_versions_count"), _dec3 = (0, _emberComputedDecorators.default)("missing_versions_count"), _dec4 = (0, _emberComputedDecorators.default)("git_branch", "installed_sha"), _dec5 = (0, _emberComputedDecorators.default)("installed_sha"), (_obj = {
    noCheckPerformed: function noCheckPerformed(updatedAt) {
      return updatedAt === null;
    },
    upToDate: function upToDate(missingVersionsCount) {
      return missingVersionsCount === 0 || missingVersionsCount === null;
    },
    behindByOneVersion: function behindByOneVersion(missingVersionsCount) {
      return missingVersionsCount === 1;
    },
    gitLink: function gitLink(gitBranch, installedSHA) {
      if (gitBranch) {
        return "https://github.com/discourse/discourse/compare/" + installedSHA + "..." + gitBranch;
      } else {
        return "https://github.com/discourse/discourse/tree/" + installedSHA;
      }
    },
    shortSha: function shortSha(installedSHA) {
      return installedSHA.substr(0, 10);
    }
  }, (_applyDecoratedDescriptor(_obj, "noCheckPerformed", [_dec], Object.getOwnPropertyDescriptor(_obj, "noCheckPerformed"), _obj), _applyDecoratedDescriptor(_obj, "upToDate", [_dec2], Object.getOwnPropertyDescriptor(_obj, "upToDate"), _obj), _applyDecoratedDescriptor(_obj, "behindByOneVersion", [_dec3], Object.getOwnPropertyDescriptor(_obj, "behindByOneVersion"), _obj), _applyDecoratedDescriptor(_obj, "gitLink", [_dec4], Object.getOwnPropertyDescriptor(_obj, "gitLink"), _obj), _applyDecoratedDescriptor(_obj, "shortSha", [_dec5], Object.getOwnPropertyDescriptor(_obj, "shortSha"), _obj)), _obj)));

  VersionCheck.reopenClass({
    find: function find() {
      return (0, _ajax.ajax)("/admin/version_check").then(function (json) {
        return VersionCheck.create(json);
      });
    }
  });

  exports.default = VersionCheck;
});
define("admin/models/watched-word", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var WatchedWord = Discourse.Model.extend({
    save: function save() {
      return (0, _ajax.ajax)("/admin/logs/watched_words" + (this.id ? "/" + this.id : "") + ".json", {
        type: this.id ? "PUT" : "POST",
        data: { word: this.get("word"), action_key: this.get("action") },
        dataType: "json"
      });
    },
    destroy: function destroy() {
      return (0, _ajax.ajax)("/admin/logs/watched_words/" + this.get("id") + ".json", {
        type: "DELETE"
      });
    }
  });

  WatchedWord.reopenClass({
    findAll: function findAll() {
      return (0, _ajax.ajax)("/admin/logs/watched_words").then(function (list) {
        var actions = {};
        list.words.forEach(function (s) {
          if (!actions[s.action]) {
            actions[s.action] = [];
          }
          actions[s.action].pushObject(WatchedWord.create(s));
        });

        list.actions.forEach(function (a) {
          if (!actions[a]) {
            actions[a] = [];
          }
        });

        return Object.keys(actions).map(function (n) {
          return Ember.Object.create({
            nameKey: n,
            name: I18n.t("admin.watched_words.actions." + n),
            words: actions[n],
            count: actions[n].length,
            regularExpressions: list.regular_expressions
          });
        });
      });
    }
  });

  exports.default = WatchedWord;
});
define("admin/models/web-hook", ["exports", "discourse/models/rest", "discourse/models/category", "discourse/models/group", "ember-addons/ember-computed-decorators"], function (exports, _rest, _category, _group, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj, _init;

  exports.default = _rest.default.extend((_dec = (0, _emberComputedDecorators.default)("wildcard_web_hook"), _dec2 = (0, _emberComputedDecorators.default)("category_ids"), _dec3 = (0, _emberComputedDecorators.observes)("group_ids"), _dec4 = (0, _emberComputedDecorators.default)("wildcard_web_hook", "web_hook_event_types.[]"), (_obj = {
    content_type: 1, // json
    last_delivery_status: 1, // inactive
    wildcard_web_hook: false,
    verify_certificate: true,
    active: false,
    web_hook_event_types: null,
    groupsFilterInName: null,

    webHookType: {
      get: function get(wildcard) {
        return wildcard ? "wildcard" : "individual";
      },
      set: function set(value) {
        this.set("wildcard_web_hook", value === "wildcard");
      }
    },

    categories: function categories(categoryIds) {
      return _category.default.findByIds(categoryIds);
    },
    updateGroupsFilter: function updateGroupsFilter() {
      var groupIds = this.get("group_ids");
      this.set("groupsFilterInName", Discourse.Site.currentProp("groups").reduce(function (groupNames, g) {
        if (groupIds.includes(g.id)) {
          groupNames.push(g.name);
        }
        return groupNames;
      }, []));
    },
    groupFinder: function groupFinder(term) {
      return _group.default.findAll({ term: term, ignore_automatic: false });
    },
    description: function description(isWildcardWebHook, types) {
      var desc = "";

      types.forEach(function (type) {
        var name = type.name.toLowerCase() + "_event";
        desc += desc !== "" ? ", " + name : name;
      });

      return isWildcardWebHook ? "*" : desc;
    },
    createProperties: function createProperties() {
      var types = this.get("web_hook_event_types");
      var categoryIds = this.get("categories").map(function (c) {
        return c.id;
      });

      // Hack as {{group-selector}} accepts a comma-separated string as data source, but
      // we use an array to populate the datasource above.
      var groupsFilter = this.get("groupsFilterInName");
      var groupNames = typeof groupsFilter === "string" ? groupsFilter.split(",") : groupsFilter;

      return {
        payload_url: this.get("payload_url"),
        content_type: this.get("content_type"),
        secret: this.get("secret"),
        wildcard_web_hook: this.get("wildcard_web_hook"),
        verify_certificate: this.get("verify_certificate"),
        active: this.get("active"),
        web_hook_event_type_ids: Ember.isEmpty(types) ? [null] : types.map(function (type) {
          return type.id;
        }),
        category_ids: Ember.isEmpty(categoryIds) ? [null] : categoryIds,
        group_ids: Ember.isEmpty(groupNames) || Ember.isEmpty(groupNames[0]) ? [null] : Discourse.Site.currentProp("groups").reduce(function (groupIds, g) {
          if (groupNames.includes(g.name)) {
            groupIds.push(g.id);
          }
          return groupIds;
        }, [])
      };
    },
    updateProperties: function updateProperties() {
      return this.createProperties();
    }
  }, (_applyDecoratedDescriptor(_obj, "webHookType", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "webHookType"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "categories", [_dec2], Object.getOwnPropertyDescriptor(_obj, "categories"), _obj), _applyDecoratedDescriptor(_obj, "updateGroupsFilter", [_dec3], Object.getOwnPropertyDescriptor(_obj, "updateGroupsFilter"), _obj), _applyDecoratedDescriptor(_obj, "description", [_dec4], Object.getOwnPropertyDescriptor(_obj, "description"), _obj)), _obj)));
});
define("discourse/lib/export-result", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.outputExportResult = outputExportResult;
  function outputExportResult(result) {
    if (result.success) {
      bootbox.alert(I18n.t("admin.export_csv.success"));
    } else {
      bootbox.alert(I18n.t("admin.export_csv.failed"));
    }
  }
});
define("admin/adapters/build-plugin", ["exports", "discourse/adapters/rest"], function (exports, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildPluginAdapter;
  function buildPluginAdapter(pluginName) {
    return _rest.default.extend({
      pathFor: function pathFor(store, type, findArgs) {
        return "/admin/plugins/" + pluginName + this._super(store, type, findArgs);
      }
    });
  }
});
define("admin/adapters/customization-base", ["exports", "discourse/adapters/rest"], function (exports, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rest.default.extend({
    basePath: function basePath() {
      return "/admin/customize/";
    }
  });
});
define("admin/adapters/embedding", ["exports", "discourse/adapters/rest"], function (exports, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rest.default.extend({
    pathFor: function pathFor() {
      return "/admin/customize/embedding";
    }
  });
});
define("admin/adapters/flagged-post", ["exports", "discourse/adapters/rest"], function (exports, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rest.default.extend({
    pathFor: function pathFor(store, type, findArgs) {
      var args = _.merge({ rest_api: true }, findArgs);
      delete args.filter;
      return "/admin/flags/" + findArgs.filter + ".json?" + $.param(args);
    },
    afterFindAll: function afterFindAll(results, helper) {
      results.forEach(function (flag) {
        var conversations = [];
        flag.post_actions.forEach(function (pa) {
          if (pa.conversation) {
            var conversation = {
              permalink: pa.permalink,
              hasMore: pa.conversation.has_more,
              response: {
                excerpt: pa.conversation.response.excerpt,
                user: helper.lookup("user", pa.conversation.response.user_id)
              }
            };

            if (pa.conversation.reply) {
              conversation.reply = {
                excerpt: pa.conversation.reply.excerpt,
                user: helper.lookup("user", pa.conversation.reply.user_id)
              };
            }
            conversations.push(conversation);
          }
        });
        flag.set("conversations", conversations);
      });

      return results;
    }
  });
});
define("admin/adapters/site-text", ["exports", "admin/adapters/customization-base"], function (exports, _customizationBase) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _customizationBase.default;
});
define("admin/adapters/theme", ["exports", "discourse/adapters/rest"], function (exports, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rest.default.extend({
    basePath: function basePath() {
      return "/admin/";
    },
    afterFindAll: function afterFindAll(results) {
      var map = {};
      results.forEach(function (theme) {
        map[theme.id] = theme;
      });
      results.forEach(function (theme) {
        var mapped = theme.get("child_themes") || [];
        mapped = mapped.map(function (t) {
          return map[t.id];
        });
        theme.set("childThemes", mapped);
      });
      return results;
    },


    jsonMode: true
  });
});
define("admin/adapters/user-field", ["exports", "admin/adapters/customization-base"], function (exports, _customizationBase) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _customizationBase.default;
});
define("admin/adapters/web-hook-event", ["exports", "discourse/adapters/rest"], function (exports, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rest.default.extend({
    basePath: function basePath() {
      return "/admin/api/";
    }
  });
});
define("admin/adapters/web-hook", ["exports", "discourse/adapters/rest"], function (exports, _rest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rest.default.extend({
    basePath: function basePath() {
      return "/admin/api/";
    }
  });
});
define("admin/components/ace-editor", ["exports", "discourse/lib/load-script", "ember-addons/ember-computed-decorators"], function (exports, _loadScript, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.observes)("editorId"), _dec2 = (0, _emberComputedDecorators.observes)("content"), _dec3 = (0, _emberComputedDecorators.observes)("mode"), _dec4 = (0, _emberComputedDecorators.observes)("disabled"), (_obj = {
    mode: "css",
    classNames: ["ace-wrapper"],
    _editor: null,
    _skipContentChangeEvent: null,
    disabled: false,

    editorIdChanged: function editorIdChanged() {
      if (this.get("autofocus")) {
        this.send("focus");
      }
    },
    contentChanged: function contentChanged() {
      if (this._editor && !this._skipContentChangeEvent) {
        this._editor.getSession().setValue(this.get("content"));
      }
    },
    modeChanged: function modeChanged() {
      if (this._editor && !this._skipContentChangeEvent) {
        this._editor.getSession().setMode("ace/mode/" + this.get("mode"));
      }
    },
    disabledStateChanged: function disabledStateChanged() {
      this.changeDisabledState();
    },
    changeDisabledState: function changeDisabledState() {
      var editor = this._editor;
      if (editor) {
        var disabled = this.get("disabled");
        editor.setOptions({
          readOnly: disabled,
          highlightActiveLine: !disabled,
          highlightGutterLine: !disabled
        });
        editor.container.parentNode.setAttribute("data-disabled", disabled);
      }
    },


    _destroyEditor: function () {
      if (this._editor) {
        this._editor.destroy();
        this._editor = null;
      }
      if (this.appEvents) {
        // xxx: don't run during qunit tests
        this.appEvents.off("ace:resize", this, this.resize);
      }

      $(window).off("ace:resize");
    }.on("willDestroyElement"),

    resize: function resize() {
      if (this._editor) {
        this._editor.resize();
      }
    },
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super();

      (0, _loadScript.default)("/javascripts/ace/ace.js").then(function () {
        window.ace.require(["ace/ace"], function (loadedAce) {
          if (!_this.element || _this.isDestroying || _this.isDestroyed) {
            return;
          }
          var editor = loadedAce.edit(_this.$(".ace")[0]);

          editor.setTheme("ace/theme/chrome");
          editor.setShowPrintMargin(false);
          editor.setOptions({ fontSize: "14px" });
          editor.getSession().setMode("ace/mode/" + _this.get("mode"));
          editor.on("change", function () {
            _this._skipContentChangeEvent = true;
            _this.set("content", editor.getSession().getValue());
            _this._skipContentChangeEvent = false;
          });
          editor.$blockScrolling = Infinity;
          editor.renderer.setScrollMargin(10, 10);

          _this.$().data("editor", editor);
          _this._editor = editor;
          _this.changeDisabledState();

          $(window).off("ace:resize").on("ace:resize", function () {
            _this.appEvents.trigger("ace:resize");
          });

          if (_this.appEvents) {
            // xxx: don't run during qunit tests
            _this.appEvents.on("ace:resize", function () {
              return _this.resize();
            });
          }

          if (_this.get("autofocus")) {
            _this.send("focus");
          }
        });
      });
    },


    actions: {
      focus: function focus() {
        if (this._editor) {
          this._editor.focus();
          this._editor.navigateFileEnd();
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "editorIdChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "editorIdChanged"), _obj), _applyDecoratedDescriptor(_obj, "contentChanged", [_dec2], Object.getOwnPropertyDescriptor(_obj, "contentChanged"), _obj), _applyDecoratedDescriptor(_obj, "modeChanged", [_dec3], Object.getOwnPropertyDescriptor(_obj, "modeChanged"), _obj), _applyDecoratedDescriptor(_obj, "disabledStateChanged", [_dec4], Object.getOwnPropertyDescriptor(_obj, "disabledStateChanged"), _obj)), _obj)));
});
define("admin/components/admin-backups-logs", ["exports", "discourse/lib/debounce", "discourse/helpers/loading-spinner", "discourse/lib/utilities", "discourse-common/lib/buffered-render", "ember-addons/ember-computed-decorators"], function (exports, _debounce, _loadingSpinner, _utilities, _bufferedRender, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj, _init;

  exports.default = Ember.Component.extend((0, _bufferedRender.bufferedRender)((_dec = (0, _emberComputedDecorators.on)("init"), _dec2 = (0, _emberComputedDecorators.observes)("logs.[]"), _dec3 = (0, _emberComputedDecorators.on)("init"), _dec4 = (0, _emberComputedDecorators.observes)("logs.[]"), (_obj = {
    classNames: ["admin-backups-logs"],

    init: function init() {
      this._super();
      this._reset();
    },
    _reset: function _reset() {
      this.setProperties({ formattedLogs: "", index: 0 });
    },
    _scrollDown: function _scrollDown() {
      var $div = this.$()[0];
      $div.scrollTop = $div.scrollHeight;
    },
    _resetFormattedLogs: function _resetFormattedLogs() {
      if (this.get("logs").length === 0) {
        this._reset(); // reset the cached logs whenever the model is reset
        this.rerenderBuffer();
      }
    },

    _updateFormattedLogs: (0, _debounce.default)(function () {
      var logs = this.get("logs");
      if (logs.length === 0) return;

      // do the log formatting only once for HELLish performance
      var formattedLogs = this.get("formattedLogs");
      for (var i = this.get("index"), length = logs.length; i < length; i++) {
        var date = logs[i].get("timestamp"),
            message = (0, _utilities.escapeExpression)(logs[i].get("message"));
        formattedLogs += "[" + date + "] " + message + "\n";
      }
      // update the formatted logs & cache index
      this.setProperties({
        formattedLogs: formattedLogs,
        index: logs.length
      });
      // force rerender
      this.rerenderBuffer();

      Ember.run.scheduleOnce("afterRender", this, this._scrollDown);
    }, 150),

    buildBuffer: function buildBuffer(buffer) {
      var formattedLogs = this.get("formattedLogs");
      if (formattedLogs && formattedLogs.length > 0) {
        buffer.push("<pre>");
        buffer.push(formattedLogs);
        buffer.push("</pre>");
      } else {
        buffer.push("<p>" + I18n.t("admin.backups.logs.none") + "</p>");
      }
      // add a loading indicator
      if (this.get("status.isOperationRunning")) {
        buffer.push((0, _loadingSpinner.renderSpinner)("small"));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_resetFormattedLogs", [_dec, _dec2], Object.getOwnPropertyDescriptor(_obj, "_resetFormattedLogs"), _obj), _applyDecoratedDescriptor(_obj, "_updateFormattedLogs", [_dec3, _dec4], (_init = Object.getOwnPropertyDescriptor(_obj, "_updateFormattedLogs"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj)), _obj))));
});
define("admin/components/admin-directory-toggle", ["exports", "discourse-common/lib/icon-library", "discourse-common/lib/buffered-render"], function (exports, _iconLibrary, _bufferedRender) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend((0, _bufferedRender.bufferedRender)({
    tagName: "th",
    classNames: ["sortable"],
    rerenderTriggers: ["order", "ascending"],

    buildBuffer: function buildBuffer(buffer) {
      var icon = this.get("icon");

      if (icon) {
        buffer.push((0, _iconLibrary.iconHTML)(icon));
      }

      buffer.push(I18n.t(this.get("i18nKey")));

      if (this.get("field") === this.get("order")) {
        buffer.push((0, _iconLibrary.iconHTML)(this.get("ascending") ? "chevron-up" : "chevron-down"));
      }
    },
    click: function click() {
      var currentOrder = this.get("order");
      var field = this.get("field");

      if (currentOrder === field) {
        this.set("ascending", this.get("ascending") ? null : true);
      } else {
        this.setProperties({ order: field, ascending: null });
      }
    }
  }));
});
define("admin/components/admin-form-row", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["row"]
  });
});
define("admin/components/admin-graph", ["exports", "discourse/lib/load-script", "discourse/lib/formatter"], function (exports, _loadScript, _formatter) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: "canvas",
    refreshChart: function refreshChart() {
      var ctx = this.$()[0].getContext("2d");
      var model = this.get("model");
      var rawData = this.get("model.data");

      var data = {
        labels: rawData.map(function (r) {
          return r.x;
        }),
        datasets: [{
          data: rawData.map(function (r) {
            return r.y;
          }),
          label: model.get("title"),
          backgroundColor: "rgba(200,220,240,0.3)",
          borderColor: "#08C"
        }]
      };

      var config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          tooltips: {
            callbacks: {
              title: function title(context) {
                return moment(context[0].xLabel, "YYYY-MM-DD").format("LL");
              }
            }
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                callback: function callback(label) {
                  return (0, _formatter.number)(label);
                },
                suggestedMin: 0
              }
            }]
          }
        }
      };

      this._chart = new window.Chart(ctx, config);
    },
    didInsertElement: function didInsertElement() {
      var _this = this;

      (0, _loadScript.default)("/javascripts/Chart.min.js").then(function () {
        return _this.refreshChart.apply(_this);
      });
    }
  });
});
define("admin/components/admin-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: ""
  });
});
define("admin/components/admin-report-chart", ["exports", "discourse/lib/formatter", "discourse/lib/load-script"], function (exports, _formatter, _loadScript) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["admin-report-chart"],
    limit: 8,
    total: 0,

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);

      this._resetChart();
    },
    didReceiveAttrs: function didReceiveAttrs() {
      var _this = this;

      this._super.apply(this, arguments);

      Ember.run.schedule("afterRender", function () {
        var $chartCanvas = _this.$(".chart-canvas");
        if (!$chartCanvas || !$chartCanvas.length) return;

        var context = $chartCanvas[0].getContext("2d");
        var model = _this.get("model");
        var chartData = Ember.makeArray(model.get("chartData") || model.get("data"));
        var prevChartData = Ember.makeArray(model.get("prevChartData") || model.get("prev_data"));

        var labels = chartData.map(function (d) {
          return d.x;
        });

        var data = {
          labels: labels,
          datasets: [{
            data: chartData.map(function (d) {
              return Math.round(parseFloat(d.y));
            }),
            backgroundColor: prevChartData.length ? "transparent" : model.secondary_color,
            borderColor: model.primary_color
          }]
        };

        if (prevChartData.length) {
          data.datasets.push({
            data: prevChartData.map(function (d) {
              return Math.round(parseFloat(d.y));
            }),
            borderColor: model.primary_color,
            borderDash: [5, 5],
            backgroundColor: "transparent",
            borderWidth: 1,
            pointRadius: 0
          });
        }

        (0, _loadScript.default)("/javascripts/Chart.min.js").then(function () {
          _this._resetChart();
          _this._chart = new window.Chart(context, _this._buildChartConfig(data));
        });
      });
    },
    _buildChartConfig: function _buildChartConfig(data) {
      return {
        type: "line",
        data: data,
        options: {
          tooltips: {
            callbacks: {
              title: function title(tooltipItem) {
                return moment(tooltipItem[0].xLabel, "YYYY-MM-DD").format("LL");
              }
            }
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                userCallback: function userCallback(label) {
                  if (Math.floor(label) === label) return label;
                },
                callback: function callback(label) {
                  return (0, _formatter.number)(label);
                }
              }
            }],
            xAxes: [{
              display: true,
              gridLines: { display: false },
              type: "time",
              time: {
                parser: "YYYY-MM-DD"
              }
            }]
          }
        }
      };
    },
    _resetChart: function _resetChart() {
      if (this._chart) {
        this._chart.destroy();
        this._chart = null;
      }
    }
  });
});
define("admin/components/admin-report-counters", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["admin-report-counters"]
  });
});
define("admin/components/admin-report-counts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    allTime: true,
    tagName: "tr",
    reverseColors: Ember.computed.match("report.type", /^(time_to_first_response|topics_with_no_response)$/),
    classNameBindings: ["reverseColors"]
  });
});
define("admin/components/admin-report-inline-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["admin-report-inline-table"]
  });
});
define("admin/components/admin-report-per-day-counts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: "tr"
  });
});
define("admin/components/admin-report-table-cell", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("label", "data", "options"), (_obj = {
    tagName: "td",
    classNames: ["admin-report-table-cell"],
    classNameBindings: ["type", "property"],
    options: null,

    computedLabel: function computedLabel(label, data, options) {
      return label.compute(data, options || {});
    },


    type: Ember.computed.alias("label.type"),
    property: Ember.computed.alias("label.mainProperty"),
    formatedValue: Ember.computed.alias("computedLabel.formatedValue"),
    value: Ember.computed.alias("computedLabel.value")
  }, (_applyDecoratedDescriptor(_obj, "computedLabel", [_dec], Object.getOwnPropertyDescriptor(_obj, "computedLabel"), _obj)), _obj)));
});
define("admin/components/admin-report-table-header", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("currentSortLabel.sortProperty", "label.sortProperty"), _dec2 = (0, _emberComputedDecorators.default)("currentSortDirection"), (_obj = {
    tagName: "th",
    classNames: ["admin-report-table-header"],
    classNameBindings: ["label.mainProperty", "label.type", "isCurrentSort"],
    attributeBindings: ["label.title:title"],

    isCurrentSort: function isCurrentSort(currentSortField, labelSortField) {
      return currentSortField === labelSortField;
    },
    sortIcon: function sortIcon(currentSortDirection) {
      return currentSortDirection === 1 ? "caret-up" : "caret-down";
    }
  }, (_applyDecoratedDescriptor(_obj, "isCurrentSort", [_dec], Object.getOwnPropertyDescriptor(_obj, "isCurrentSort"), _obj), _applyDecoratedDescriptor(_obj, "sortIcon", [_dec2], Object.getOwnPropertyDescriptor(_obj, "sortIcon"), _obj)), _obj)));
});
define("admin/components/admin-report-table-row", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: "tr",
    classNames: ["admin-report-table-row"],
    options: null
  });
});
define("admin/components/admin-report-table", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _desc, _value, _obj;

  var PAGES_LIMIT = 8;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("model.computedLabels.length"), _dec2 = (0, _emberComputedDecorators.default)("totalsForSample", "options.total", "model.dates_filtering"), _dec3 = (0, _emberComputedDecorators.default)("model.total", "options.total", "twoColumns"), _dec4 = (0, _emberComputedDecorators.default)("model.data.length"), _dec5 = (0, _emberComputedDecorators.default)("totalsForSampleRow", "model.computedLabels"), _dec6 = (0, _emberComputedDecorators.default)("model.data", "model.computedLabels"), _dec7 = (0, _emberComputedDecorators.default)("sortLabel", "sortDirection", "model.data.[]"), _dec8 = (0, _emberComputedDecorators.default)("sortedData.[]", "perPage", "page"), _dec9 = (0, _emberComputedDecorators.default)("model.data", "perPage", "page"), (_obj = {
    classNameBindings: ["sortable", "twoColumns"],
    classNames: ["admin-report-table"],
    sortable: false,
    sortDirection: 1,
    perPage: Ember.computed.alias("options.perPage"),
    page: 0,

    twoColumns: function twoColumns(labelsLength) {
      return labelsLength === 2;
    },
    showTotalForSample: function showTotalForSample(totalsForSample, total, datesFiltering) {
      // check if we have at least one cell which contains a value
      var sum = totalsForSample.map(function (t) {
        return t.value;
      }).compact().reduce(function (s, v) {
        return s + v;
      }, 0);

      return sum >= 1 && total && datesFiltering;
    },
    showTotal: function showTotal(reportTotal, total, twoColumns) {
      return reportTotal && total && twoColumns;
    },
    showSortingUI: function showSortingUI(dataLength) {
      return dataLength >= 5;
    },
    totalsForSample: function totalsForSample(row, labels) {
      return labels.map(function (label) {
        var computedLabel = label.compute(row);
        computedLabel.type = label.type;
        computedLabel.property = label.mainProperty;
        return computedLabel;
      });
    },
    totalsForSampleRow: function totalsForSampleRow(rows, labels) {
      if (!rows || !rows.length) return {};

      var totalsRow = {};

      labels.forEach(function (label) {
        var reducer = function reducer(sum, row) {
          var computedLabel = label.compute(row);
          var value = computedLabel.value;

          if (!["seconds", "number", "percent"].includes(label.type)) {
            return;
          } else {
            return sum + Math.round(value || 0);
          }
        };

        var total = rows.reduce(reducer, 0);
        totalsRow[label.mainProperty] = label.type === "percent" ? Math.round(total / rows.length) : total;
      });

      return totalsRow;
    },
    sortedData: function sortedData(sortLabel, sortDirection, data) {
      data = Ember.makeArray(data);

      if (sortLabel) {
        var compare = function compare(label, direction) {
          return function (a, b) {
            var aValue = label.compute(a).value;
            var bValue = label.compute(b).value;
            var result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            return result * direction;
          };
        };

        return data.sort(compare(sortLabel, sortDirection));
      }

      return data;
    },
    paginatedData: function paginatedData(data, perPage, page) {
      if (perPage < data.length) {
        var start = perPage * page;
        return data.slice(start, start + perPage);
      }

      return data;
    },
    pages: function pages(data, perPage, page) {
      if (!data || data.length <= perPage) return [];

      var pages = [].concat(_toConsumableArray(Array(Math.ceil(data.length / perPage)).keys())).map(function (v) {
        return {
          page: v + 1,
          index: v,
          class: v === page ? "is-current" : null
        };
      });

      if (pages.length > PAGES_LIMIT) {
        var before = Math.max(0, page - PAGES_LIMIT / 2);
        var after = Math.max(PAGES_LIMIT, page + PAGES_LIMIT / 2);
        pages = pages.slice(before, after);
      }

      return pages;
    },


    actions: {
      changePage: function changePage(page) {
        this.set("page", page);
      },
      sortByLabel: function sortByLabel(label) {
        if (this.get("sortLabel") === label) {
          this.set("sortDirection", this.get("sortDirection") === 1 ? -1 : 1);
        } else {
          this.set("sortLabel", label);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "twoColumns", [_dec], Object.getOwnPropertyDescriptor(_obj, "twoColumns"), _obj), _applyDecoratedDescriptor(_obj, "showTotalForSample", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showTotalForSample"), _obj), _applyDecoratedDescriptor(_obj, "showTotal", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showTotal"), _obj), _applyDecoratedDescriptor(_obj, "showSortingUI", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showSortingUI"), _obj), _applyDecoratedDescriptor(_obj, "totalsForSample", [_dec5], Object.getOwnPropertyDescriptor(_obj, "totalsForSample"), _obj), _applyDecoratedDescriptor(_obj, "totalsForSampleRow", [_dec6], Object.getOwnPropertyDescriptor(_obj, "totalsForSampleRow"), _obj), _applyDecoratedDescriptor(_obj, "sortedData", [_dec7], Object.getOwnPropertyDescriptor(_obj, "sortedData"), _obj), _applyDecoratedDescriptor(_obj, "paginatedData", [_dec8], Object.getOwnPropertyDescriptor(_obj, "paginatedData"), _obj), _applyDecoratedDescriptor(_obj, "pages", [_dec9], Object.getOwnPropertyDescriptor(_obj, "pages"), _obj)), _obj)));
});
define("admin/components/admin-report-trust-level-counts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: "tr"
  });
});
define("admin/components/admin-report", ["exports", "discourse/lib/reports-loader", "discourse/models/category", "discourse/lib/export-csv", "discourse/lib/export-result", "admin/models/report", "ember-addons/ember-computed-decorators", "discourse/lib/tooltip"], function (exports, _reportsLoader, _category, _exportCsv, _exportResult, _report, _emberComputedDecorators, _tooltip) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _desc, _value, _obj;

  var TABLE_OPTIONS = {
    perPage: 8,
    total: true,
    limit: 20,
    formatNumbers: true
  };

  var CHART_OPTIONS = {};

  function collapseWeekly(data, average) {
    var aggregate = [];
    var bucket = void 0,
        i = void 0;
    var offset = data.length % 7;
    for (i = offset; i < data.length; i++) {
      if (bucket && i % 7 === offset) {
        if (average) {
          bucket.y = parseFloat((bucket.y / 7.0).toFixed(2));
        }
        aggregate.push(bucket);
        bucket = null;
      }

      bucket = bucket || { x: data[i].x, y: 0 };
      bucket.y += data[i].y;
    }
    return aggregate;
  }

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("dataSourceName", "model.type"), _dec2 = (0, _emberComputedDecorators.default)("dataSourceName", "model.type"), _dec3 = (0, _emberComputedDecorators.default)("displayedModes.length"), _dec4 = (0, _emberComputedDecorators.default)("currentMode", "model.modes", "forcedModes"), _dec5 = (0, _emberComputedDecorators.default)(), _dec6 = (0, _emberComputedDecorators.default)("currentMode"), _dec7 = (0, _emberComputedDecorators.default)("startDate"), _dec8 = (0, _emberComputedDecorators.default)("endDate"), _dec9 = (0, _emberComputedDecorators.default)("dataSourceName", "categoryId", "groupId", "normalizedStartDate", "normalizedEndDate"), (_obj = {
    classNameBindings: ["isEnabled", "isLoading", "dasherizedDataSourceName"],
    classNames: ["admin-report"],
    isEnabled: true,
    disabledLabel: "admin.dashboard.disabled",
    isLoading: false,
    rateLimitationString: null,
    dataSourceName: null,
    report: null,
    model: null,
    reportOptions: null,
    forcedModes: null,
    showAllReportsLink: false,
    filters: null,
    startDate: null,
    endDate: null,
    category: null,
    groupId: null,
    showTrend: false,
    showHeader: true,
    showTitle: true,
    showFilteringUI: false,
    showCategoryOptions: Ember.computed.alias("model.category_filtering"),
    showDatesOptions: Ember.computed.alias("model.dates_filtering"),
    showGroupOptions: Ember.computed.alias("model.group_filtering"),
    showExport: Ember.computed.not("model.onlyTable"),
    showRefresh: Ember.computed.or("showCategoryOptions", "showDatesOptions", "showGroupOptions"),
    shouldDisplayTrend: Ember.computed.and("showTrend", "model.prev_period"),

    init: function init() {
      this._super.apply(this, arguments);

      this._reports = [];
    },
    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);

      var state = this.get("filters") || {};

      this.setProperties({
        category: _category.default.findById(state.categoryId),
        groupId: state.groupId,
        startDate: state.startDate,
        endDate: state.endDate
      });

      if (this.get("report")) {
        this._renderReport(this.get("report"), this.get("forcedModes"), this.get("currentMode"));
      } else if (this.get("dataSourceName")) {
        this._fetchReport();
      }
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      (0, _tooltip.registerHoverTooltip)($(".info[data-tooltip]"));
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);

      (0, _tooltip.unregisterHoverTooltip)($(".info[data-tooltip]"));
    },


    showError: Ember.computed.or("showTimeoutError", "showExceptionError"),
    showTimeoutError: Ember.computed.equal("model.error", "timeout"),
    showExceptionError: Ember.computed.equal("model.error", "exception"),

    hasData: Ember.computed.notEmpty("model.data"),

    dasherizedDataSourceName: function dasherizedDataSourceName(dataSourceName, type) {
      return (dataSourceName || type || "undefined").replace(/_/g, "-");
    },
    dataSource: function dataSource(dataSourceName, type) {
      dataSourceName = dataSourceName || type;
      return "/admin/reports/" + dataSourceName;
    },
    showModes: function showModes(displayedModesLength) {
      return displayedModesLength > 1;
    },


    categoryId: Ember.computed.alias("category.id"),

    displayedModes: function displayedModes(currentMode, reportModes, forcedModes) {
      var modes = forcedModes ? forcedModes.split(",") : reportModes;

      return Ember.makeArray(modes).map(function (mode) {
        var base = "btn-default mode-btn " + mode;
        var cssClass = currentMode === mode ? base + " is-current" : base;

        return {
          mode: mode,
          cssClass: cssClass,
          icon: mode === "table" ? "table" : "signal"
        };
      });
    },
    groupOptions: function groupOptions() {
      var arr = [{ name: I18n.t("admin.dashboard.reports.groups"), value: "all" }];
      return arr.concat((this.site.groups || []).map(function (i) {
        return { name: i["name"], value: i["id"] };
      }));
    },
    modeComponent: function modeComponent(currentMode) {
      return "admin-report-" + currentMode;
    },
    normalizedStartDate: function normalizedStartDate(startDate) {
      return startDate && typeof startDate.isValid === "function" ? moment.utc(startDate.toISOString()).locale("en").format("YYYYMMDD") : moment(startDate).locale("en").format("YYYYMMDD");
    },
    normalizedEndDate: function normalizedEndDate(endDate) {
      return endDate && typeof endDate.isValid === "function" ? moment.utc(endDate.toISOString()).locale("en").format("YYYYMMDD") : moment(endDate).locale("en").format("YYYYMMDD");
    },
    reportKey: function reportKey(dataSourceName, categoryId, groupId, startDate, endDate) {
      if (!dataSourceName || !startDate || !endDate) return null;

      var reportKey = "reports:";
      reportKey += [dataSourceName, categoryId, startDate.replace(/-/g, ""), endDate.replace(/-/g, ""), groupId, "[:prev_period]", this.get("reportOptions.table.limit"), _report.SCHEMA_VERSION].filter(function (x) {
        return x;
      }).map(function (x) {
        return x.toString();
      }).join(":");

      return reportKey;
    },


    actions: {
      refreshReport: function refreshReport() {
        this.attrs.onRefresh({
          categoryId: this.get("categoryId"),
          groupId: this.get("groupId"),
          startDate: this.get("startDate"),
          endDate: this.get("endDate")
        });
      },
      exportCsv: function exportCsv() {
        (0, _exportCsv.exportEntity)("report", {
          name: this.get("model.type"),
          start_date: this.get("startDate"),
          end_date: this.get("endDate"),
          category_id: this.get("categoryId") === "all" ? undefined : this.get("categoryId"),
          group_id: this.get("groupId") === "all" ? undefined : this.get("groupId")
        }).then(_exportResult.outputExportResult);
      },
      changeMode: function changeMode(mode) {
        this.set("currentMode", mode);
      }
    },

    _computeReport: function _computeReport() {
      var _this = this;

      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }

      if (!this._reports || !this._reports.length) {
        return;
      }

      // on a slow network _fetchReport could be called multiple times between
      // T and T+x, and all the ajax responses would occur after T+(x+y)
      // to avoid any inconsistencies we filter by period and make sure
      // the array contains only unique values
      var filteredReports = this._reports.uniqBy("report_key");
      var report = void 0;

      var sort = function sort(r) {
        if (r.length > 1) {
          return r.findBy("type", _this.get("dataSourceName"));
        } else {
          return r;
        }
      };

      if (!this.get("startDate") || !this.get("endDate")) {
        report = sort(filteredReports)[0];
      } else {
        var reportKey = this.get("reportKey");

        report = sort(filteredReports.filter(function (r) {
          return r.report_key.includes(reportKey);
        }))[0];

        if (!report) return;
      }

      this._renderReport(report, this.get("forcedModes"), this.get("currentMode"));
    },
    _renderReport: function _renderReport(report, forcedModes, currentMode) {
      var modes = forcedModes ? forcedModes.split(",") : report.modes;
      currentMode = currentMode || (modes ? modes[0] : null);

      this.setProperties({
        model: report,
        currentMode: currentMode,
        options: this._buildOptions(currentMode)
      });
    },
    _fetchReport: function _fetchReport() {
      var _this2 = this;

      this._super();

      this.setProperties({ isLoading: true, rateLimitationString: null });

      Ember.run.next(function () {
        var payload = _this2._buildPayload(["prev_period"]);

        var callback = function callback(response) {
          if (!_this2.element || _this2.isDestroying || _this2.isDestroyed) {
            return;
          }

          _this2.set("isLoading", false);

          if (response === 429) {
            _this2.set("rateLimitationString", I18n.t("admin.dashboard.too_many_requests"));
          } else if (response === 500) {
            _this2.set("model.error", "exception");
          } else if (response) {
            _this2._reports.push(_this2._loadReport(response));
            _this2._computeReport();
          }
        };

        _reportsLoader.default.enqueue(_this2.get("dataSourceName"), payload.data, callback);
      });
    },
    _buildPayload: function _buildPayload(facets) {
      var payload = { data: { cache: true, facets: facets } };

      if (this.get("startDate")) {
        payload.data.start_date = moment.utc(this.get("startDate"), "YYYY-MM-DD").toISOString();
      }

      if (this.get("endDate")) {
        payload.data.end_date = moment.utc(this.get("endDate"), "YYYY-MM-DD").toISOString();
      }

      if (this.get("groupId") && this.get("groupId") !== "all") {
        payload.data.group_id = this.get("groupId");
      }

      if (this.get("categoryId") && this.get("categoryId") !== "all") {
        payload.data.category_id = this.get("categoryId");
      }

      if (this.get("reportOptions.table.limit")) {
        payload.data.limit = this.get("reportOptions.table.limit");
      }

      return payload;
    },
    _buildOptions: function _buildOptions(mode) {
      if (mode === "table") {
        var tableOptions = JSON.parse(JSON.stringify(TABLE_OPTIONS));
        return Ember.Object.create(Object.assign(tableOptions, this.get("reportOptions.table") || {}));
      } else {
        var chartOptions = JSON.parse(JSON.stringify(CHART_OPTIONS));
        return Ember.Object.create(Object.assign(chartOptions, this.get("reportOptions.chart") || {}));
      }
    },
    _loadReport: function _loadReport(jsonReport) {
      _report.default.fillMissingDates(jsonReport, { filledField: "chartData" });

      if (jsonReport.chartData && jsonReport.chartData.length > 40) {
        jsonReport.chartData = collapseWeekly(jsonReport.chartData, jsonReport.average);
      }

      if (jsonReport.prev_data) {
        _report.default.fillMissingDates(jsonReport, {
          filledField: "prevChartData",
          dataField: "prev_data",
          starDate: jsonReport.prev_start_date,
          endDate: jsonReport.prev_end_date
        });

        if (jsonReport.prevChartData && jsonReport.prevChartData.length > 40) {
          jsonReport.prevChartData = collapseWeekly(jsonReport.prevChartData, jsonReport.average);
        }
      }

      return _report.default.create(jsonReport);
    }
  }, (_applyDecoratedDescriptor(_obj, "dasherizedDataSourceName", [_dec], Object.getOwnPropertyDescriptor(_obj, "dasherizedDataSourceName"), _obj), _applyDecoratedDescriptor(_obj, "dataSource", [_dec2], Object.getOwnPropertyDescriptor(_obj, "dataSource"), _obj), _applyDecoratedDescriptor(_obj, "showModes", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showModes"), _obj), _applyDecoratedDescriptor(_obj, "displayedModes", [_dec4], Object.getOwnPropertyDescriptor(_obj, "displayedModes"), _obj), _applyDecoratedDescriptor(_obj, "groupOptions", [_dec5], Object.getOwnPropertyDescriptor(_obj, "groupOptions"), _obj), _applyDecoratedDescriptor(_obj, "modeComponent", [_dec6], Object.getOwnPropertyDescriptor(_obj, "modeComponent"), _obj), _applyDecoratedDescriptor(_obj, "normalizedStartDate", [_dec7], Object.getOwnPropertyDescriptor(_obj, "normalizedStartDate"), _obj), _applyDecoratedDescriptor(_obj, "normalizedEndDate", [_dec8], Object.getOwnPropertyDescriptor(_obj, "normalizedEndDate"), _obj), _applyDecoratedDescriptor(_obj, "reportKey", [_dec9], Object.getOwnPropertyDescriptor(_obj, "reportKey"), _obj)), _obj)));
});
define("admin/components/admin-user-field-item", ["exports", "admin/models/user-field", "discourse/mixins/buffered-content", "discourse/lib/ajax-error", "discourse/lib/computed"], function (exports, _userField, _bufferedContent, _ajaxError, _computed) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend((0, _bufferedContent.bufferedProperty)("userField"), {
    editing: Ember.computed.empty("userField.id"),
    classNameBindings: [":user-field"],

    cantMoveUp: (0, _computed.propertyEqual)("userField", "firstField"),
    cantMoveDown: (0, _computed.propertyEqual)("userField", "lastField"),

    userFieldsDescription: function () {
      return I18n.t("admin.user_fields.description");
    }.property(),

    bufferedFieldType: function () {
      return _userField.default.fieldTypeById(this.get("buffered.field_type"));
    }.property("buffered.field_type"),

    _focusOnEdit: function () {
      if (this.get("editing")) {
        Ember.run.scheduleOnce("afterRender", this, "_focusName");
      }
    }.observes("editing").on("didInsertElement"),

    _focusName: function _focusName() {
      $(".user-field-name").select();
    },

    fieldName: function () {
      return _userField.default.fieldTypeById(this.get("userField.field_type")).get("name");
    }.property("userField.field_type"),

    flags: function () {
      var ret = [];
      if (this.get("userField.editable")) {
        ret.push(I18n.t("admin.user_fields.editable.enabled"));
      }
      if (this.get("userField.required")) {
        ret.push(I18n.t("admin.user_fields.required.enabled"));
      }
      if (this.get("userField.show_on_profile")) {
        ret.push(I18n.t("admin.user_fields.show_on_profile.enabled"));
      }
      if (this.get("userField.show_on_user_card")) {
        ret.push(I18n.t("admin.user_fields.show_on_user_card.enabled"));
      }

      return ret.join(", ");
    }.property("userField.editable", "userField.required", "userField.show_on_profile", "userField.show_on_user_card"),

    actions: {
      save: function save() {
        var self = this;
        var buffered = this.get("buffered");
        var attrs = buffered.getProperties("name", "description", "field_type", "editable", "required", "show_on_profile", "show_on_user_card", "options");

        this.get("userField").save(attrs).then(function () {
          self.set("editing", false);
          self.commitBuffer();
        }).catch(_ajaxError.popupAjaxError);
      },
      moveUp: function moveUp() {
        this.sendAction("moveUpAction", this.get("userField"));
      },
      moveDown: function moveDown() {
        this.sendAction("moveDownAction", this.get("userField"));
      },
      edit: function edit() {
        this.set("editing", true);
      },
      destroy: function destroy() {
        this.sendAction("destroyAction", this.get("userField"));
      },
      cancel: function cancel() {
        var id = this.get("userField.id");
        if (Ember.isEmpty(id)) {
          this.sendAction("destroyAction", this.get("userField"));
        } else {
          this.rollbackBuffer();
          this.set("editing", false);
        }
      }
    }
  });
});
define("admin/components/admin-watched-word", ["exports", "discourse-common/lib/icon-library", "discourse-common/lib/buffered-render"], function (exports, _iconLibrary, _bufferedRender) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend((0, _bufferedRender.bufferedRender)({
    classNames: ["watched-word"],

    buildBuffer: function buildBuffer(buffer) {
      buffer.push((0, _iconLibrary.iconHTML)("times"));
      buffer.push(" " + this.get("word.word"));
    },
    click: function click() {
      var _this = this;

      this.get("word").destroy().then(function () {
        _this.sendAction("action", _this.get("word"));
      }).catch(function (e) {
        bootbox.alert(I18n.t("generic_error_with_reason", {
          error: "http: " + e.status + " - " + e.body
        }));
      });
    }
  }));
});
define("admin/components/admin-web-hook-event-chooser", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj, _init;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("typeName"), _dec2 = (0, _emberComputedDecorators.default)("typeName"), _dec3 = (0, _emberComputedDecorators.default)("model.[]", "typeName"), _dec4 = (0, _emberComputedDecorators.default)("eventTypeExists"), (_obj = {
    classNames: ["hook-event"],
    typeName: Ember.computed.alias("type.name"),

    name: function name(typeName) {
      return I18n.t("admin.web_hooks." + typeName + "_event.name");
    },
    details: function details(typeName) {
      return I18n.t("admin.web_hooks." + typeName + "_event.details");
    },
    eventTypeExists: function eventTypeExists(eventTypes, typeName) {
      return eventTypes.any(function (event) {
        return event.name === typeName;
      });
    },

    enabled: {
      get: function get(eventTypeExists) {
        return eventTypeExists;
      },
      set: function set(value, eventTypeExists) {
        var type = this.get("type");
        var model = this.get("model");
        // add an association when not exists
        if (value !== eventTypeExists) {
          if (value) {
            model.addObject(type);
          } else {
            model.removeObjects(model.filter(function (eventType) {
              return eventType.name === type.name;
            }));
          }
        }

        return value;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "name", [_dec], Object.getOwnPropertyDescriptor(_obj, "name"), _obj), _applyDecoratedDescriptor(_obj, "details", [_dec2], Object.getOwnPropertyDescriptor(_obj, "details"), _obj), _applyDecoratedDescriptor(_obj, "eventTypeExists", [_dec3], Object.getOwnPropertyDescriptor(_obj, "eventTypeExists"), _obj), _applyDecoratedDescriptor(_obj, "enabled", [_dec4], (_init = Object.getOwnPropertyDescriptor(_obj, "enabled"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj)), _obj)));
});
define("admin/components/admin-web-hook-event", ["exports", "ember-addons/ember-computed-decorators", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/lib/formatter"], function (exports, _emberComputedDecorators, _ajax, _ajaxError, _formatter) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("model.status"), _dec2 = (0, _emberComputedDecorators.default)("model.created_at"), _dec3 = (0, _emberComputedDecorators.default)("model.duration"), (_obj = {
    tagName: "li",
    expandDetails: null,

    statusColorClasses: function statusColorClasses(status) {
      if (!status) return "";

      if (status >= 200 && status <= 299) {
        return "text-successful";
      } else {
        return "text-danger";
      }
    },
    createdAt: function createdAt(_createdAt) {
      return moment(_createdAt).format("YYYY-MM-DD HH:mm:ss");
    },
    completion: function completion(duration) {
      var seconds = Math.floor(duration / 10.0) / 100.0;
      return I18n.t("admin.web_hooks.events.completed_in", { count: seconds });
    },


    actions: {
      redeliver: function redeliver() {
        var _this = this;

        return bootbox.confirm(I18n.t("admin.web_hooks.events.redeliver_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            (0, _ajax.ajax)("/admin/api/web_hooks/" + _this.get("model.web_hook_id") + "/events/" + _this.get("model.id") + "/redeliver", { type: "POST" }).then(function (json) {
              _this.set("model", json.web_hook_event);
            }).catch(_ajaxError.popupAjaxError);
          }
        });
      },
      toggleRequest: function toggleRequest() {
        var expandDetailsKey = "request";

        if (this.get("expandDetails") !== expandDetailsKey) {
          var headers = _.extend({
            "Request URL": this.get("model.request_url"),
            "Request method": "POST"
          }, (0, _formatter.ensureJSON)(this.get("model.headers")));
          this.setProperties({
            headers: (0, _formatter.plainJSON)(headers),
            body: (0, _formatter.prettyJSON)(this.get("model.payload")),
            expandDetails: expandDetailsKey,
            bodyLabel: I18n.t("admin.web_hooks.events.payload")
          });
        } else {
          this.set("expandDetails", null);
        }
      },
      toggleResponse: function toggleResponse() {
        var expandDetailsKey = "response";

        if (this.get("expandDetails") !== expandDetailsKey) {
          this.setProperties({
            headers: (0, _formatter.plainJSON)(this.get("model.response_headers")),
            body: this.get("model.response_body"),
            expandDetails: expandDetailsKey,
            bodyLabel: I18n.t("admin.web_hooks.events.body")
          });
        } else {
          this.set("expandDetails", null);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "statusColorClasses", [_dec], Object.getOwnPropertyDescriptor(_obj, "statusColorClasses"), _obj), _applyDecoratedDescriptor(_obj, "createdAt", [_dec2], Object.getOwnPropertyDescriptor(_obj, "createdAt"), _obj), _applyDecoratedDescriptor(_obj, "completion", [_dec3], Object.getOwnPropertyDescriptor(_obj, "completion"), _obj)), _obj)));
});
define("admin/components/admin-web-hook-status", ["exports", "ember-addons/ember-computed-decorators", "discourse-common/lib/icon-library", "discourse-common/lib/buffered-render"], function (exports, _emberComputedDecorators, _iconLibrary, _bufferedRender) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  exports.default = Ember.Component.extend((0, _bufferedRender.bufferedRender)((_dec = (0, _emberComputedDecorators.default)("deliveryStatuses", "model.last_delivery_status"), _dec2 = (0, _emberComputedDecorators.default)("status.id", "icons"), _dec3 = (0, _emberComputedDecorators.default)("status.id", "classes"), (_obj = {
    classes: ["text-muted", "text-danger", "text-successful"],
    icons: ["circle-o", "times-circle", "circle"],

    status: function status(deliveryStatuses, lastDeliveryStatus) {
      return deliveryStatuses.find(function (s) {
        return s.id === lastDeliveryStatus;
      });
    },
    icon: function icon(statusId, icons) {
      return icons[statusId - 1];
    },
    class: function _class(statusId, classes) {
      return classes[statusId - 1];
    },
    buildBuffer: function buildBuffer(buffer) {
      buffer.push((0, _iconLibrary.iconHTML)(this.get("icon"), { class: this.get("class") }));
      buffer.push(I18n.t("admin.web_hooks.delivery_status." + this.get("status.name")));
    }
  }, (_applyDecoratedDescriptor(_obj, "status", [_dec], Object.getOwnPropertyDescriptor(_obj, "status"), _obj), _applyDecoratedDescriptor(_obj, "icon", [_dec2], Object.getOwnPropertyDescriptor(_obj, "icon"), _obj), _applyDecoratedDescriptor(_obj, "class", [_dec3], Object.getOwnPropertyDescriptor(_obj, "class"), _obj)), _obj))));
});
define("admin/components/admin-wrapper", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    didInsertElement: function didInsertElement() {
      this._super();
      $("body").addClass("admin-interface");
    },
    willDestroyElement: function willDestroyElement() {
      this._super();
      $("body").removeClass("admin-interface");
    }
  });
});
define("admin/components/cancel-link", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: ""
  });
});
define("admin/components/color-input", ["exports", "discourse/lib/load-script"], function (exports, _loadScript) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["color-picker"],
    hexValueChanged: function () {
      var hex = this.get("hexValue");
      var $text = this.$("input.hex-input");

      if (this.get("valid")) {
        $text.attr("style", "color: " + (this.get("brightnessValue") > 125 ? "black" : "white") + "; background-color: #" + hex + ";");

        if (this.get("pickerLoaded")) {
          this.$(".picker").spectrum({ color: "#" + this.get("hexValue") });
        }
      } else {
        $text.attr("style", "");
      }
    }.observes("hexValue", "brightnessValue", "valid"),

    didInsertElement: function didInsertElement() {
      var _this = this;

      (0, _loadScript.default)("/javascripts/spectrum.js").then(function () {
        (0, _loadScript.loadCSS)("/javascripts/spectrum.css").then(function () {
          Em.run.schedule("afterRender", function () {
            _this.$(".picker").spectrum({ color: "#" + _this.get("hexValue") }).on("change.spectrum", function (me, color) {
              _this.set("hexValue", color.toHexString().replace("#", ""));
            });
            _this.set("pickerLoaded", true);
          });
        });
      });
      Em.run.schedule("afterRender", function () {
        _this.hexValueChanged();
      });
    }
  });
});
define("admin/components/embeddable-host", ["exports", "discourse/mixins/buffered-content", "ember-addons/ember-computed-decorators", "discourse/lib/ajax-error"], function (exports, _bufferedContent, _emberComputedDecorators, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  exports.default = Ember.Component.extend((0, _bufferedContent.bufferedProperty)("host"), (_dec = (0, _emberComputedDecorators.on)("didInsertElement"), _dec2 = (0, _emberComputedDecorators.observes)("editing"), _dec3 = (0, _emberComputedDecorators.default)("buffered.host", "host.isSaving"), (_obj = {
    editToggled: false,
    tagName: "tr",
    categoryId: null,

    editing: Ember.computed.or("host.isNew", "editToggled"),

    _focusOnInput: function _focusOnInput() {
      var _this = this;

      Ember.run.schedule("afterRender", function () {
        _this.$(".host-name").focus();
      });
    },
    cantSave: function cantSave(host, isSaving) {
      return isSaving || Ember.isEmpty(host);
    },


    actions: {
      edit: function edit() {
        this.set("categoryId", this.get("host.category.id"));
        this.set("editToggled", true);
      },
      save: function save() {
        var _this2 = this;

        if (this.get("cantSave")) {
          return;
        }

        var props = this.get("buffered").getProperties("host", "path_whitelist", "class_name");
        props.category_id = this.get("categoryId");

        var host = this.get("host");

        host.save(props).then(function () {
          host.set("category", Discourse.Category.findById(_this2.get("categoryId")));
          _this2.set("editToggled", false);
        }).catch(_ajaxError.popupAjaxError);
      },
      delete: function _delete() {
        var _this3 = this;

        bootbox.confirm(I18n.t("admin.embedding.confirm_delete"), function (result) {
          if (result) {
            _this3.get("host").destroyRecord().then(function () {
              _this3.sendAction("deleteHost", _this3.get("host"));
            });
          }
        });
      },
      cancel: function cancel() {
        var host = this.get("host");
        if (host.get("isNew")) {
          this.sendAction("deleteHost", host);
        } else {
          this.rollbackBuffer();
          this.set("editToggled", false);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_focusOnInput", [_dec, _dec2], Object.getOwnPropertyDescriptor(_obj, "_focusOnInput"), _obj), _applyDecoratedDescriptor(_obj, "cantSave", [_dec3], Object.getOwnPropertyDescriptor(_obj, "cantSave"), _obj)), _obj)));
});
define("admin/components/embedding-setting", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj, _init;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("field"), _dec2 = (0, _emberComputedDecorators.default)("field"), _dec3 = (0, _emberComputedDecorators.default)("type"), _dec4 = (0, _emberComputedDecorators.default)("value"), (_obj = {
    classNames: ["embed-setting"],

    inputId: function inputId(field) {
      return field.dasherize();
    },
    translationKey: function translationKey(field) {
      return "admin.embedding." + field;
    },
    isCheckbox: function isCheckbox(type) {
      return type === "checkbox";
    },

    checked: {
      get: function get(value) {
        return !!value;
      },
      set: function set(value) {
        this.set("value", value);
        return value;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "inputId", [_dec], Object.getOwnPropertyDescriptor(_obj, "inputId"), _obj), _applyDecoratedDescriptor(_obj, "translationKey", [_dec2], Object.getOwnPropertyDescriptor(_obj, "translationKey"), _obj), _applyDecoratedDescriptor(_obj, "isCheckbox", [_dec3], Object.getOwnPropertyDescriptor(_obj, "isCheckbox"), _obj), _applyDecoratedDescriptor(_obj, "checked", [_dec4], (_init = Object.getOwnPropertyDescriptor(_obj, "checked"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj)), _obj)));
});
define("admin/components/flag-user-lists", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["flag-user-lists"]
  });
});
define("admin/components/flagged-post-response", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["flagged-post-response"]
  });
});
define("admin/components/flagged-post-title", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: "h3"
  });
});
define("admin/components/flagged-post", ["exports", "discourse/lib/show-modal", "ember-addons/ember-computed-decorators"], function (exports, _showModal, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("filter"), (_obj = {
    adminTools: Ember.inject.service(),
    expanded: false,
    tagName: "div",
    classNameBindings: [":flagged-post", "flaggedPost.hidden:hidden-post", "flaggedPost.deleted"],

    canAct: Ember.computed.alias("actableFilter"),

    actableFilter: function actableFilter(filter) {
      return filter === "active";
    },
    removeAfter: function removeAfter(promise) {
      var _this = this;

      return promise.then(function () {
        return _this.attrs.removePost();
      });
    },
    _spawnModal: function _spawnModal(name, model, modalClass) {
      var _this2 = this;

      var controller = (0, _showModal.default)(name, { model: model, admin: true, modalClass: modalClass });
      controller.removeAfter = function (p) {
        return _this2.removeAfter(p);
      };
    },


    actions: {
      removeAfter: function removeAfter(promise) {
        return this.removeAfter(promise);
      },
      disagree: function disagree() {
        this.removeAfter(this.get("flaggedPost").disagreeFlags());
      },
      defer: function defer() {
        this.removeAfter(this.get("flaggedPost").deferFlags());
      },
      expand: function expand() {
        var _this3 = this;

        this.get("flaggedPost").expandHidden().then(function () {
          _this3.set("expanded", true);
        });
      },
      showModerationHistory: function showModerationHistory() {
        this.get("adminTools").showModerationHistory({
          filter: "post",
          post_id: this.get("flaggedPost.id")
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "actableFilter", [_dec], Object.getOwnPropertyDescriptor(_obj, "actableFilter"), _obj)), _obj)));
});
define("admin/components/highlighted-code", ["exports", "ember-addons/ember-computed-decorators", "discourse/lib/highlight-syntax"], function (exports, _emberComputedDecorators, _highlightSyntax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj, _init;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.on)("didInsertElement"), _dec2 = (0, _emberComputedDecorators.observes)("code"), (_obj = {
    _refresh: function _refresh() {
      (0, _highlightSyntax.default)(this.$());
    }
  }, (_applyDecoratedDescriptor(_obj, "_refresh", [_dec, _dec2], (_init = Object.getOwnPropertyDescriptor(_obj, "_refresh"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj)), _obj)));
});
define("admin/components/inline-edit-checkbox", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.observes)("checked"), _dec2 = (0, _emberComputedDecorators.default)("labelKey"), _dec3 = (0, _emberComputedDecorators.default)("checked", "checkedInternal"), (_obj = {
    init: function init() {
      this._super();
      this.set("checkedInternal", this.get("checked"));
    },


    classNames: ["inline-edit"],

    checkedChanged: function checkedChanged() {
      this.set("checkedInternal", this.get("checked"));
    },
    label: function label(key) {
      return I18n.t(key);
    },
    changed: function changed(checked, checkedInternal) {
      return !!checked !== !!checkedInternal;
    },


    actions: {
      cancelled: function cancelled() {
        this.set("checkedInternal", this.get("checked"));
      },
      finished: function finished() {
        this.set("checked", this.get("checkedInternal"));
        this.sendAction();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "checkedChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "checkedChanged"), _obj), _applyDecoratedDescriptor(_obj, "label", [_dec2], Object.getOwnPropertyDescriptor(_obj, "label"), _obj), _applyDecoratedDescriptor(_obj, "changed", [_dec3], Object.getOwnPropertyDescriptor(_obj, "changed"), _obj)), _obj)));
});
define("admin/components/ip-lookup", ["exports", "discourse/lib/ajax", "admin/models/admin-user", "discourse/lib/copy-text"], function (exports, _ajax, _adminUser, _copyText) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["ip-lookup"],

    otherAccountsToDelete: function () {
      // can only delete up to 50 accounts at a time
      var total = Math.min(50, this.get("totalOthersWithSameIP") || 0);
      var visible = Math.min(50, this.get("other_accounts.length") || 0);
      return Math.max(visible, total);
    }.property("other_accounts", "totalOthersWithSameIP"),

    actions: {
      lookup: function lookup() {
        var self = this;
        this.set("show", true);

        if (!this.get("location")) {
          (0, _ajax.ajax)("/admin/users/ip-info", {
            data: { ip: this.get("ip") }
          }).then(function (location) {
            self.set("location", Em.Object.create(location));
          });
        }

        if (!this.get("other_accounts")) {
          this.set("otherAccountsLoading", true);

          var data = {
            ip: this.get("ip"),
            exclude: this.get("userId"),
            order: "trust_level DESC"
          };

          (0, _ajax.ajax)("/admin/users/total-others-with-same-ip", { data: data }).then(function (result) {
            self.set("totalOthersWithSameIP", result.total);
          });

          _adminUser.default.findAll("active", data).then(function (users) {
            self.setProperties({
              other_accounts: users,
              otherAccountsLoading: false
            });
          });
        }
      },

      hide: function hide() {
        this.set("show", false);
      },

      copy: function copy() {
        var _this = this;

        var text = "IP: " + this.get("ip") + "\n";
        var location = this.get("location");
        if (location) {
          if (location.hostname) {
            text += I18n.t("ip_lookup.hostname") + ": " + location.hostname + "\n";
          }

          text += I18n.t("ip_lookup.location");
          if (location.location) {
            text += ": " + location.location + "\n";
          } else {
            text += ": " + I18n.t("ip_lookup.location_not_found") + "\n";
          }

          if (location.organization) {
            text += I18n.t("ip_lookup.organisation");
            text += ": " + location.organization + "\n";
          }
        }
        var copyRange = $('<p id="copy-range"></p>');
        copyRange.html(text.trim().replace(/\n/g, "<br>"));
        $(document.body).append(copyRange);
        if ((0, _copyText.default)(text, copyRange[0])) {
          this.set("copied", true);
          Ember.run.later(function () {
            return _this.set("copied", false);
          }, 2000);
        }
        copyRange.remove();
      },

      deleteOtherAccounts: function deleteOtherAccounts() {
        var self = this;
        bootbox.confirm(I18n.t("ip_lookup.confirm_delete_other_accounts"), I18n.t("no_value"), I18n.t("yes_value"), function (confirmed) {
          if (confirmed) {
            self.setProperties({
              other_accounts: null,
              otherAccountsLoading: true,
              totalOthersWithSameIP: null
            });

            (0, _ajax.ajax)("/admin/users/delete-others-with-same-ip.json", {
              type: "DELETE",
              data: {
                ip: self.get("ip"),
                exclude: self.get("userId"),
                order: "trust_level DESC"
              }
            }).then(function () {
              self.send("lookup");
            });
          }
        });
      }
    }
  });
});
define("admin/components/moderation-history-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: "tr"
  });
});
define("admin/components/penalty-post-action", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _desc, _value, _obj;

  var ACTIONS = ["delete", "edit", "none"];
  exports.default = Ember.Component.extend((_obj = {
    postAction: null,
    postEdit: null,

    penaltyActions: function penaltyActions() {
      return ACTIONS.map(function (id) {
        return { id: id, name: I18n.t("admin.user.penalty_post_" + id) };
      });
    },


    editing: Ember.computed.equal("postAction", "edit"),

    actions: {
      penaltyChanged: function penaltyChanged() {
        var _this = this;

        var postAction = this.get("postAction");

        // If we switch to edit mode, jump to the edit textarea
        if (postAction === "edit") {
          Ember.run.scheduleOnce("afterRender", function () {
            var $elem = _this.$();
            var body = $elem.closest(".modal-body");
            body.scrollTop(body.height());
            $elem.find(".post-editor").focus();
          });
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "penaltyActions", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "penaltyActions"), _obj)), _obj));
});
define("admin/components/permalink-form", ["exports", "admin/models/permalink"], function (exports, _permalink) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["permalink-form"],
    formSubmitted: false,
    permalinkType: "topic_id",

    permalinkTypes: function () {
      return [{ id: "topic_id", name: I18n.t("admin.permalink.topic_id") }, { id: "post_id", name: I18n.t("admin.permalink.post_id") }, { id: "category_id", name: I18n.t("admin.permalink.category_id") }, { id: "external_url", name: I18n.t("admin.permalink.external_url") }];
    }.property(),

    permalinkTypePlaceholder: function () {
      return "admin.permalink." + this.get("permalinkType");
    }.property("permalinkType"),

    actions: {
      submit: function submit() {
        if (!this.get("formSubmitted")) {
          var self = this;
          self.set("formSubmitted", true);
          var permalink = _permalink.default.create({
            url: self.get("url"),
            permalink_type: self.get("permalinkType"),
            permalink_type_value: self.get("permalink_type_value")
          });
          permalink.save().then(function (result) {
            self.set("url", "");
            self.set("permalink_type_value", "");
            self.set("formSubmitted", false);
            self.sendAction("action", _permalink.default.create(result.permalink));
            Em.run.schedule("afterRender", function () {
              self.$(".permalink-url").focus();
            });
          }, function (e) {
            self.set("formSubmitted", false);
            var error = void 0;
            if (e.responseJSON && e.responseJSON.errors) {
              error = I18n.t("generic_error_with_reason", {
                error: e.responseJSON.errors.join(". ")
              });
            } else {
              error = I18n.t("generic_error");
            }
            bootbox.alert(error, function () {
              self.$(".permalink-url").focus();
            });
          });
        }
      }
    },

    didInsertElement: function didInsertElement() {
      var self = this;
      self._super();
      Em.run.schedule("afterRender", function () {
        self.$(".external-url").keydown(function (e) {
          if (e.keyCode === 13) {
            // enter key
            self.send("submit");
          }
        });
      });
    }
  });
});
define("admin/components/resumable-upload", ["exports", "discourse-common/lib/icon-library", "discourse-common/lib/buffered-render"], function (exports, _iconLibrary, _bufferedRender) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend((0, _bufferedRender.bufferedRender)({
    tagName: "button",
    classNames: ["btn", "ru"],
    classNameBindings: ["isUploading"],
    attributeBindings: ["translatedTitle:title"],

    resumable: null,

    isUploading: false,
    progress: 0,

    rerenderTriggers: ["isUploading", "progress"],

    translatedTitle: function () {
      var title = this.get("title");
      return title ? I18n.t(title) : this.get("text");
    }.property("title", "text"),

    text: function () {
      if (this.get("isUploading")) {
        return this.get("progress") + " %";
      } else {
        return this.get("uploadText");
      }
    }.property("isUploading", "progress"),

    buildBuffer: function buildBuffer(buffer) {
      var icon = this.get("isUploading") ? "times" : "upload";
      buffer.push((0, _iconLibrary.iconHTML)(icon));
      buffer.push("<span class='ru-label'>" + this.get("text") + "</span>");
      buffer.push("<span class='ru-progress' style='width:" + this.get("progress") + "%'></span>");
    },


    click: function click() {
      if (this.get("isUploading")) {
        this.resumable.cancel();
        var self = this;
        Em.run.later(function () {
          self._reset();
        });
        return false;
      } else {
        return true;
      }
    },

    _reset: function _reset() {
      this.setProperties({ isUploading: false, progress: 0 });
    },

    _initialize: function () {
      this.resumable = new Resumable({
        target: Discourse.getURL(this.get("target")),
        maxFiles: 1, // only 1 file at a time
        headers: {
          "X-CSRF-Token": $("meta[name='csrf-token']").attr("content")
        }
      });

      var self = this;

      this.resumable.on("fileAdded", function () {
        // automatically upload the selected file
        self.resumable.upload();
        // mark as uploading
        Em.run.later(function () {
          self.set("isUploading", true);
        });
      });

      this.resumable.on("fileProgress", function (file) {
        // update progress
        Em.run.later(function () {
          self.set("progress", parseInt(file.progress() * 100, 10));
        });
      });

      this.resumable.on("fileSuccess", function (file) {
        Em.run.later(function () {
          // mark as not uploading anymore
          self._reset();
          // fire an event to allow the parent route to reload its model
          self.sendAction("success", file.fileName);
        });
      });

      this.resumable.on("fileError", function (file, message) {
        Em.run.later(function () {
          // mark as not uploading anymore
          self._reset();
          // fire an event to allow the parent route to display the error message
          self.sendAction("error", file.fileName, message);
        });
      });
    }.on("init"),

    _assignBrowse: function () {
      var self = this;
      Em.run.schedule("afterRender", function () {
        self.resumable.assignBrowse(self.$());
      });
    }.on("didInsertElement"),

    _teardown: function () {
      if (this.resumable) {
        this.resumable.cancel();
        this.resumable = null;
      }
    }.on("willDestroyElement")
  }));
});
define("admin/components/save-controls", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("model.isSaving"), (_obj = {
    classNames: ["controls"],

    buttonDisabled: Ember.computed.or("model.isSaving", "saveDisabled"),

    savingText: function savingText(saving) {
      return saving ? "saving" : "save";
    },


    actions: {
      saveChanges: function saveChanges() {
        this.sendAction();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "savingText", [_dec], Object.getOwnPropertyDescriptor(_obj, "savingText"), _obj)), _obj)));
});
define("admin/components/screened-ip-address-form", ["exports", "admin/models/screened-ip-address", "ember-addons/ember-computed-decorators"], function (exports, _screenedIpAddress, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("adminWhitelistEnabled"), _dec2 = (0, _emberComputedDecorators.on)("didInsertElement"), (_obj = {
    classNames: ["screened-ip-address-form"],
    formSubmitted: false,
    actionName: "block",

    adminWhitelistEnabled: function adminWhitelistEnabled() {
      return Discourse.SiteSettings.use_admin_ip_whitelist;
    },
    actionNames: function actionNames(adminWhitelistEnabled) {
      if (adminWhitelistEnabled) {
        return [{ id: "block", name: I18n.t("admin.logs.screened_ips.actions.block") }, {
          id: "do_nothing",
          name: I18n.t("admin.logs.screened_ips.actions.do_nothing")
        }, {
          id: "allow_admin",
          name: I18n.t("admin.logs.screened_ips.actions.allow_admin")
        }];
      } else {
        return [{ id: "block", name: I18n.t("admin.logs.screened_ips.actions.block") }, {
          id: "do_nothing",
          name: I18n.t("admin.logs.screened_ips.actions.do_nothing")
        }];
      }
    },


    actions: {
      submit: function submit() {
        var _this = this;

        if (!this.get("formSubmitted")) {
          this.set("formSubmitted", true);
          var screenedIpAddress = _screenedIpAddress.default.create({
            ip_address: this.get("ip_address"),
            action_name: this.get("actionName")
          });
          screenedIpAddress.save().then(function (result) {
            _this.setProperties({ ip_address: "", formSubmitted: false });
            _this.sendAction("action", _screenedIpAddress.default.create(result.screened_ip_address));
            Ember.run.schedule("afterRender", function () {
              return _this.$(".ip-address-input").focus();
            });
          }).catch(function (e) {
            _this.set("formSubmitted", false);
            var msg = e.jqXHR.responseJSON && e.jqXHR.responseJSON.errors ? I18n.t("generic_error_with_reason", {
              error: e.jqXHR.responseJSON.errors.join(". ")
            }) : I18n.t("generic_error");
            bootbox.alert(msg, function () {
              return _this.$(".ip-address-input").focus();
            });
          });
        }
      }
    },

    _init: function _init() {
      var _this2 = this;

      Ember.run.schedule("afterRender", function () {
        _this2.$(".ip-address-input").keydown(function (e) {
          if (e.keyCode === 13) {
            _this2.send("submit");
          }
        });
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "adminWhitelistEnabled", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "adminWhitelistEnabled"), _obj), _applyDecoratedDescriptor(_obj, "actionNames", [_dec], Object.getOwnPropertyDescriptor(_obj, "actionNames"), _obj), _applyDecoratedDescriptor(_obj, "_init", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_init"), _obj)), _obj)));
});
define("admin/components/secret-value-list", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.on)("didReceiveAttrs"), (_obj = {
    classNameBindings: [":value-list", ":secret-value-list"],
    inputDelimiter: null,
    collection: null,
    values: null,
    validationMessage: null,

    _setupCollection: function _setupCollection() {
      var values = this.get("values");

      this.set("collection", this._splitValues(values, this.get("inputDelimiter") || "\n"));
    },


    actions: {
      changeKey: function changeKey(index, newValue) {
        if (this._checkInvalidInput(newValue)) return;
        this._replaceValue(index, newValue, "key");
      },
      changeSecret: function changeSecret(index, newValue) {
        if (this._checkInvalidInput(newValue)) return;
        this._replaceValue(index, newValue, "secret");
      },
      addValue: function addValue() {
        if (this._checkInvalidInput([this.get("newKey"), this.get("newSecret")])) return;
        this._addValue(this.get("newKey"), this.get("newSecret"));
        this.setProperties({ newKey: "", newSecret: "" });
      },
      removeValue: function removeValue(value) {
        this._removeValue(value);
      }
    },

    _checkInvalidInput: function _checkInvalidInput(inputs) {
      this.set("validationMessage", null);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var input = _step.value;

          if (Ember.isEmpty(input) || input.includes("|")) {
            this.set("validationMessage", I18n.t("admin.site_settings.secret_list.invalid_input"));
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    _addValue: function _addValue(value, secret) {
      this.get("collection").addObject({ key: value, secret: secret });
      this._saveValues();
    },
    _removeValue: function _removeValue(value) {
      var collection = this.get("collection");
      collection.removeObject(value);
      this._saveValues();
    },
    _replaceValue: function _replaceValue(index, newValue, keyName) {
      var item = this.get("collection")[index];
      Ember.set(item, keyName, newValue);

      this._saveValues();
    },
    _saveValues: function _saveValues() {
      this.set("values", this.get("collection").map(function (elem) {
        return elem.key + "|" + elem.secret;
      }).join("\n"));
    },
    _splitValues: function _splitValues(values, delimiter) {
      if (values && values.length) {
        var keys = ["key", "secret"];
        var res = [];
        values.split(delimiter).forEach(function (str) {
          var object = {};
          str.split("|").forEach(function (a, i) {
            object[keys[i]] = a;
          });
          res.push(object);
        });

        return res;
      } else {
        return [];
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_setupCollection", [_dec], Object.getOwnPropertyDescriptor(_obj, "_setupCollection"), _obj)), _obj)));
});
define("admin/components/silence-details", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: ""
  });
});
define("admin/components/site-setting", ["exports", "discourse/mixins/buffered-content", "admin/models/site-setting", "admin/mixins/setting-component"], function (exports, _bufferedContent, _siteSetting, _settingComponent) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_bufferedContent.default, _settingComponent.default, {
    _save: function _save() {
      var setting = this.get("buffered");
      return _siteSetting.default.update(setting.get("setting"), setting.get("value"));
    }
  });
});
define("admin/components/site-settings/bool", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj, _init;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("value"), (_obj = {
    enabled: {
      get: function get(value) {
        if (Ember.isEmpty(value)) {
          return false;
        }
        return value.toString() === "true";
      },
      set: function set(value) {
        this.set("value", value ? "true" : "false");
        return value;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "enabled", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "enabled"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj)), _obj)));
});
define("admin/components/site-settings/category-list", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj, _init;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("value"), (_obj = {
    selectedCategories: {
      get: function get(value) {
        return Discourse.Category.findByIds(value.split("|"));
      },
      set: function set(value) {
        this.set("value", value.mapBy("id").join("|"));
        return value;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "selectedCategories", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "selectedCategories"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj)), _obj)));
});
define("admin/components/site-settings/uploaded-image-list", ["exports", "discourse/lib/show-modal"], function (exports, _showModal) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      showUploadModal: function showUploadModal(_ref) {
        var _this = this;

        var value = _ref.value,
            setting = _ref.setting;

        (0, _showModal.default)("admin-uploaded-image-list", {
          admin: true,
          title: "admin.site_settings." + setting.setting + ".title",
          model: { value: value, setting: setting }
        }).setProperties({
          save: function save(v) {
            return _this.set("value", v);
          }
        });
      }
    }
  });
});
define("admin/components/site-text-summary", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.on)("didInsertElement"), (_obj = {
    classNames: ["site-text"],
    classNameBindings: ["siteText.overridden"],

    highlightTerm: function highlightTerm() {
      var term = this.get("term");
      if (term) {
        this.$(".site-text-id, .site-text-value").highlight(term, {
          className: "text-highlight"
        });
      }
      this.$(".site-text-value").ellipsis();
    },
    click: function click() {
      this.send("edit");
    },


    actions: {
      edit: function edit() {
        this.sendAction("editAction", this.get("siteText"));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "highlightTerm", [_dec], Object.getOwnPropertyDescriptor(_obj, "highlightTerm"), _obj)), _obj)));
});
define("admin/components/staff-actions", ["exports", "discourse/lib/url"], function (exports, _url) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["table", "staff-actions"],

    willDestroyElement: function willDestroyElement() {
      this.$().off("click.discourse-staff-logs");
    },
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super();

      this.$().on("click.discourse-staff-logs", "[data-link-post-id]", function (e) {
        var postId = $(e.target).attr("data-link-post-id");

        _this.store.find("post", postId).then(function (p) {
          _url.default.routeTo(p.get("url"));
        });
        return false;
      });
    }
  });
});
define("admin/components/suspension-details", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: ""
  });
});
define("admin/components/tags-uploader", ["exports", "discourse/mixins/upload"], function (exports, _upload) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Em.Component.extend(_upload.default, {
    type: "csv",
    uploadUrl: "/tags/upload",
    addDisabled: Em.computed.alias("uploading"),
    elementId: "tag-uploader",

    validateUploadedFilesOptions: function validateUploadedFilesOptions() {
      return { csvOnly: true };
    },
    uploadDone: function uploadDone() {
      var _this = this;

      bootbox.alert(I18n.t("tagging.upload_successful"), function () {
        _this.sendAction("refresh");
        _this.sendAction("closeModal");
      });
    }
  });
});
define("admin/components/theme-setting", ["exports", "discourse/mixins/buffered-content", "admin/mixins/setting-component"], function (exports, _bufferedContent, _settingComponent) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_bufferedContent.default, _settingComponent.default, {
    layoutName: "admin/templates/components/site-setting",
    _save: function _save() {
      return this.get("model").saveSettings(this.get("setting.setting"), this.get("buffered.value"));
    }
  });
});
define("admin/components/themes-list-item", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  var MAX_COMPONENTS = 4;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.observes)("theme.selected"), _dec2 = (0, _emberComputedDecorators.default)("theme.component", "theme.childThemes.@each.name", "theme.childThemes.length", "childrenExpanded"), _dec3 = (0, _emberComputedDecorators.default)("theme.childThemes.length", "theme.component", "childrenExpanded", "children.length"), (_obj = {
    childrenExpanded: false,
    classNames: ["themes-list-item"],
    classNameBindings: ["theme.selected:selected"],
    hasComponents: Em.computed.gt("children.length", 0),
    displayComponents: Em.computed.and("hasComponents", "theme.isActive"),
    displayHasMore: Em.computed.gt("theme.childThemes.length", MAX_COMPONENTS),

    click: function click(e) {
      if (!$(e.target).hasClass("others-count")) {
        this.navigateToTheme();
      }
    },
    init: function init() {
      this._super.apply(this, arguments);
      this.scheduleAnimation();
    },
    triggerAnimation: function triggerAnimation() {
      this.animate();
    },
    scheduleAnimation: function scheduleAnimation() {
      var _this = this;

      Ember.run.schedule("afterRender", function () {
        _this.animate(true);
      });
    },
    animate: function animate(isInitial) {
      var $container = this.$();
      var $list = this.$(".components-list");
      if ($list.length === 0 || Ember.testing) {
        return;
      }
      var duration = 300;
      if (this.get("theme.selected")) {
        this.collapseComponentsList($container, $list, duration);
      } else if (!isInitial) {
        this.expandComponentsList($container, $list, duration);
      }
    },
    children: function children() {
      var theme = this.get("theme");
      var children = theme.get("childThemes");
      if (theme.get("component") || !children) {
        return [];
      }
      children = this.get("childrenExpanded") ? children : children.slice(0, MAX_COMPONENTS);
      return children.map(function (t) {
        return t.get("name");
      });
    },
    moreCount: function moreCount(childrenCount, component, expanded) {
      if (component || !childrenCount || expanded) {
        return 0;
      }
      return childrenCount - MAX_COMPONENTS;
    },
    expandComponentsList: function expandComponentsList($container, $list, duration) {
      $container.css("height", $container.height() + "px");
      $list.css("display", "");
      $container.animate({
        height: $container.height() + $list.outerHeight(true) + "px"
      }, {
        duration: duration,
        done: function done() {
          $list.css("display", "");
          $container.css("height", "");
        }
      });
      $list.animate({
        opacity: 1
      }, {
        duration: duration
      });
    },
    collapseComponentsList: function collapseComponentsList($container, $list, duration) {
      $container.animate({
        height: $container.height() - $list.outerHeight(true) + "px"
      }, {
        duration: duration,
        done: function done() {
          $list.css("display", "none");
          $container.css("height", "");
        }
      });
      $list.animate({
        opacity: 0
      }, {
        duration: duration
      });
    },


    actions: {
      toggleChildrenExpanded: function toggleChildrenExpanded() {
        this.toggleProperty("childrenExpanded");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "triggerAnimation", [_dec], Object.getOwnPropertyDescriptor(_obj, "triggerAnimation"), _obj), _applyDecoratedDescriptor(_obj, "children", [_dec2], Object.getOwnPropertyDescriptor(_obj, "children"), _obj), _applyDecoratedDescriptor(_obj, "moreCount", [_dec3], Object.getOwnPropertyDescriptor(_obj, "moreCount"), _obj)), _obj)));
});
define("admin/components/themes-list", ["exports", "admin/models/theme", "ember-addons/ember-computed-decorators"], function (exports, _theme, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("themes", "components", "currentTab"), _dec2 = (0, _emberComputedDecorators.default)("themesList", "currentTab", "themesList.@each.user_selectable", "themesList.@each.default"), _dec3 = (0, _emberComputedDecorators.default)("themesList", "currentTab", "themesList.@each.user_selectable", "themesList.@each.default"), (_obj = {
    THEMES: _theme.THEMES,
    COMPONENTS: _theme.COMPONENTS,

    classNames: ["themes-list"],

    hasThemes: Em.computed.gt("themesList.length", 0),
    hasUserThemes: Em.computed.gt("userThemes.length", 0),
    hasInactiveThemes: Em.computed.gt("inactiveThemes.length", 0),

    themesTabActive: Em.computed.equal("currentTab", _theme.THEMES),
    componentsTabActive: Em.computed.equal("currentTab", _theme.COMPONENTS),

    themesList: function themesList(themes, components) {
      if (this.get("themesTabActive")) {
        return themes;
      } else {
        return components;
      }
    },
    inactiveThemes: function inactiveThemes(themes) {
      if (this.get("componentsTabActive")) {
        return [];
      }
      return themes.filter(function (theme) {
        return !theme.get("user_selectable") && !theme.get("default");
      });
    },
    userThemes: function userThemes(themes) {
      if (this.get("componentsTabActive")) {
        return [];
      }
      themes = themes.filter(function (theme) {
        return theme.get("user_selectable") || theme.get("default");
      });
      return _.sortBy(themes, function (t) {
        return [!t.get("default"), !t.get("user_selectable"), t.get("name").toLowerCase()];
      });
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      // hide scrollbar
      var $container = this.$(".themes-list-container");
      var containerNode = $container[0];
      if (containerNode) {
        var width = containerNode.offsetWidth - containerNode.clientWidth;
        $container.css("width", "calc(100% + " + width + "px)");
      }
    },


    actions: {
      changeView: function changeView(newTab) {
        if (newTab !== this.get("currentTab")) {
          this.set("currentTab", newTab);
        }
      },
      navigateToTheme: function navigateToTheme(theme) {
        Em.getOwner(this).lookup("router:main").transitionTo("adminCustomizeThemes.show", theme);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "themesList", [_dec], Object.getOwnPropertyDescriptor(_obj, "themesList"), _obj), _applyDecoratedDescriptor(_obj, "inactiveThemes", [_dec2], Object.getOwnPropertyDescriptor(_obj, "inactiveThemes"), _obj), _applyDecoratedDescriptor(_obj, "userThemes", [_dec3], Object.getOwnPropertyDescriptor(_obj, "userThemes"), _obj)), _obj)));
});
define("admin/components/user-flag-percentage", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("percentage"), _dec2 = (0, _emberComputedDecorators.default)("user.flags_agreed", "user.flags_disagreed", "user.flags_ignored"), (_obj = {
    tagName: "",

    showPercentage: function showPercentage(percentage) {
      return percentage.total >= 3;
    },
    percentage: function percentage(agreed, disagreed, ignored) {
      var total = agreed + disagreed + ignored;
      var result = { total: total };

      if (total > 0) {
        result.agreed = Math.round(agreed / total * 100);
        result.disagreed = Math.round(disagreed / total * 100);
        result.ignored = Math.round(ignored / total * 100);
      }

      var highest = Math.max(agreed, disagreed, ignored);
      if (highest === agreed) {
        result.icon = "thumbs-up";
        result.className = "agreed";
        result.label = result.agreed + "%";
      } else if (highest === disagreed) {
        result.icon = "thumbs-down";
        result.className = "disagreed";
        result.label = result.disagreed + "%";
      } else {
        result.icon = "external-link";
        result.className = "ignored";
        result.label = result.ignored + "%";
      }

      result.title = I18n.t("admin.flags.user_percentage.summary", {
        agreed: I18n.t("admin.flags.user_percentage.agreed", {
          count: result.agreed
        }),
        disagreed: I18n.t("admin.flags.user_percentage.disagreed", {
          count: result.disagreed
        }),
        ignored: I18n.t("admin.flags.user_percentage.ignored", {
          count: result.ignored
        }),
        count: total
      });

      return result;
    }
  }, (_applyDecoratedDescriptor(_obj, "showPercentage", [_dec], Object.getOwnPropertyDescriptor(_obj, "showPercentage"), _obj), _applyDecoratedDescriptor(_obj, "percentage", [_dec2], Object.getOwnPropertyDescriptor(_obj, "percentage"), _obj)), _obj)));
});
define("admin/components/value-list", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.on)("didReceiveAttrs"), _dec2 = (0, _emberComputedDecorators.default)("choices.[]", "collection.[]"), (_obj = {
    classNameBindings: [":value-list"],

    inputInvalid: Ember.computed.empty("newValue"),

    inputDelimiter: null,
    inputType: null,
    newValue: "",
    collection: null,
    values: null,
    noneKey: Ember.computed.alias("addKey"),

    _setupCollection: function _setupCollection() {
      var values = this.get("values");
      if (this.get("inputType") === "array") {
        this.set("collection", values || []);
        return;
      }

      this.set("collection", this._splitValues(values, this.get("inputDelimiter") || "\n"));
    },
    filteredChoices: function filteredChoices(choices, collection) {
      return Ember.makeArray(choices).filter(function (i) {
        return collection.indexOf(i) < 0;
      });
    },
    keyDown: function keyDown(event) {
      if (event.keyCode === 13) this.send("addValue", this.get("newValue"));
    },


    actions: {
      changeValue: function changeValue(index, newValue) {
        this._replaceValue(index, newValue);
      },
      addValue: function addValue(newValue) {
        if (this.get("inputInvalid")) return;

        this.set("newValue", "");
        this._addValue(newValue);
      },
      removeValue: function removeValue(value) {
        this._removeValue(value);
      },
      selectChoice: function selectChoice(choice) {
        this._addValue(choice);
      }
    },

    _addValue: function _addValue(value) {
      this.get("collection").addObject(value);
      this._saveValues();
    },
    _removeValue: function _removeValue(value) {
      var collection = this.get("collection");
      collection.removeObject(value);
      this._saveValues();
    },
    _replaceValue: function _replaceValue(index, newValue) {
      this.get("collection").replace(index, 1, [newValue]);
      this._saveValues();
    },
    _saveValues: function _saveValues() {
      if (this.get("inputType") === "array") {
        this.set("values", this.get("collection"));
        return;
      }

      this.set("values", this.get("collection").join(this.get("inputDelimiter") || "\n"));
    },
    _splitValues: function _splitValues(values, delimiter) {
      if (values && values.length) {
        return values.split(delimiter).filter(function (x) {
          return x;
        });
      } else {
        return [];
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_setupCollection", [_dec], Object.getOwnPropertyDescriptor(_obj, "_setupCollection"), _obj), _applyDecoratedDescriptor(_obj, "filteredChoices", [_dec2], Object.getOwnPropertyDescriptor(_obj, "filteredChoices"), _obj)), _obj)));
});
define("admin/components/watched-word-form", ["exports", "admin/models/watched-word", "ember-addons/ember-computed-decorators"], function (exports, _watchedWord, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj;

  exports.default = Ember.Component.extend((_dec = (0, _emberComputedDecorators.default)("regularExpressions"), _dec2 = (0, _emberComputedDecorators.observes)("word"), _dec3 = (0, _emberComputedDecorators.default)("word"), _dec4 = (0, _emberComputedDecorators.on)("didInsertElement"), (_obj = {
    classNames: ["watched-word-form"],
    formSubmitted: false,
    actionKey: null,
    showMessage: false,

    placeholderKey: function placeholderKey(regularExpressions) {
      return "admin.watched_words.form.placeholder" + (regularExpressions ? "_regexp" : "");
    },
    removeMessage: function removeMessage() {
      if (this.get("showMessage") && !Ember.isEmpty(this.get("word"))) {
        this.set("showMessage", false);
      }
    },
    isUniqueWord: function isUniqueWord(word) {
      var _this = this;

      var words = this.get("filteredContent") || [];
      var filtered = words.filter(function (content) {
        return content.action === _this.get("actionKey");
      });
      return filtered.every(function (content) {
        return content.word.toLowerCase() !== word.toLowerCase();
      });
    },


    actions: {
      submit: function submit() {
        var _this2 = this;

        if (!this.get("isUniqueWord")) {
          this.setProperties({
            showMessage: true,
            message: I18n.t("admin.watched_words.form.exists")
          });
          return;
        }

        if (!this.get("formSubmitted")) {
          this.set("formSubmitted", true);

          var watchedWord = _watchedWord.default.create({
            word: this.get("word"),
            action: this.get("actionKey")
          });

          watchedWord.save().then(function (result) {
            _this2.setProperties({
              word: "",
              formSubmitted: false,
              showMessage: true,
              message: I18n.t("admin.watched_words.form.success")
            });
            _this2.sendAction("action", _watchedWord.default.create(result));
            Ember.run.schedule("afterRender", function () {
              return _this2.$(".watched-word-input").focus();
            });
          }).catch(function (e) {
            _this2.set("formSubmitted", false);
            var msg = e.jqXHR.responseJSON && e.jqXHR.responseJSON.errors ? I18n.t("generic_error_with_reason", {
              error: e.jqXHR.responseJSON.errors.join(". ")
            }) : I18n.t("generic_error");
            bootbox.alert(msg, function () {
              return _this2.$(".watched-word-input").focus();
            });
          });
        }
      }
    },

    _init: function _init() {
      var _this3 = this;

      Ember.run.schedule("afterRender", function () {
        _this3.$(".watched-word-input").keydown(function (e) {
          if (e.keyCode === 13) {
            _this3.send("submit");
          }
        });
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "placeholderKey", [_dec], Object.getOwnPropertyDescriptor(_obj, "placeholderKey"), _obj), _applyDecoratedDescriptor(_obj, "removeMessage", [_dec2], Object.getOwnPropertyDescriptor(_obj, "removeMessage"), _obj), _applyDecoratedDescriptor(_obj, "isUniqueWord", [_dec3], Object.getOwnPropertyDescriptor(_obj, "isUniqueWord"), _obj), _applyDecoratedDescriptor(_obj, "_init", [_dec4], Object.getOwnPropertyDescriptor(_obj, "_init"), _obj)), _obj)));
});
define("admin/components/watched-word-uploader", ["exports", "ember-addons/ember-computed-decorators", "discourse/mixins/upload"], function (exports, _emberComputedDecorators, _upload) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Em.Component.extend(_upload.default, (_dec = (0, _emberComputedDecorators.default)("actionKey"), (_obj = {
    type: "csv",
    classNames: "watched-words-uploader",
    uploadUrl: "/admin/logs/watched_words/upload",
    addDisabled: Em.computed.alias("uploading"),

    validateUploadedFilesOptions: function validateUploadedFilesOptions() {
      return { csvOnly: true };
    },
    data: function data(actionKey) {
      return { action_key: actionKey };
    },
    uploadDone: function uploadDone() {
      if (this) {
        bootbox.alert(I18n.t("admin.watched_words.form.upload_successful"));
        this.sendAction("done");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "data", [_dec], Object.getOwnPropertyDescriptor(_obj, "data"), _obj)), _obj)));
});
define("admin/controllers/admin-api-keys", ["exports", "admin/models/api-key"], function (exports, _apiKey) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      generateMasterKey: function generateMasterKey() {
        var _this = this;

        _apiKey.default.generateMasterKey().then(function (key) {
          return _this.get("model").pushObject(key);
        });
      },
      regenerateKey: function regenerateKey(key) {
        bootbox.confirm(I18n.t("admin.api.confirm_regen"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            key.regenerate();
          }
        });
      },
      revokeKey: function revokeKey(key) {
        var _this2 = this;

        bootbox.confirm(I18n.t("admin.api.confirm_revoke"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            key.revoke().then(function () {
              return _this2.get("model").removeObject(key);
            });
          }
        });
      }
    },

    // Has a master key already been generated?
    hasMasterKey: function () {
      return !!this.get("model").findBy("user", null);
    }.property("model.[]")
  });
});
define("admin/controllers/admin-backups-index", ["exports", "discourse/lib/ajax", "ember-addons/ember-computed-decorators"], function (exports, _ajax, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_obj = {
    adminBackups: Ember.inject.controller(),
    status: Ember.computed.alias("adminBackups.model"),

    localBackupStorage: function localBackupStorage() {
      return this.siteSettings.backup_location === "local";
    },


    uploadLabel: function () {
      return I18n.t("admin.backups.upload.label");
    }.property(),

    restoreTitle: function () {
      if (!this.get("status.allowRestore")) {
        return "admin.backups.operations.restore.is_disabled";
      } else if (this.get("status.isOperationRunning")) {
        return "admin.backups.operations.is_running";
      } else {
        return "admin.backups.operations.restore.title";
      }
    }.property("status.{allowRestore,isOperationRunning}"),

    actions: {
      toggleReadOnlyMode: function toggleReadOnlyMode() {
        var self = this;
        if (!this.site.get("isReadOnly")) {
          bootbox.confirm(I18n.t("admin.backups.read_only.enable.confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (confirmed) {
            if (confirmed) {
              Discourse.User.currentProp("hideReadOnlyAlert", true);
              self._toggleReadOnlyMode(true);
            }
          });
        } else {
          this._toggleReadOnlyMode(false);
        }
      },
      download: function download(backup) {
        var link = backup.get("filename");
        (0, _ajax.ajax)("/admin/backups/" + link, { type: "PUT" }).then(function () {
          bootbox.alert(I18n.t("admin.backups.operations.download.alert"));
        });
      }
    },

    _toggleReadOnlyMode: function _toggleReadOnlyMode(enable) {
      var site = this.site;
      (0, _ajax.ajax)("/admin/backups/readonly", {
        type: "PUT",
        data: { enable: enable }
      }).then(function () {
        site.set("isReadOnly", enable);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "localBackupStorage", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "localBackupStorage"), _obj)), _obj));
});
define("admin/controllers/admin-backups-logs", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    logs: [],
    adminBackups: Ember.inject.controller(),
    status: Em.computed.alias("adminBackups.model")
  });
});
define("admin/controllers/admin-backups", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    noOperationIsRunning: Ember.computed.not("model.isOperationRunning"),
    rollbackEnabled: Ember.computed.and("model.canRollback", "model.restoreEnabled", "noOperationIsRunning"),
    rollbackDisabled: Ember.computed.not("rollbackEnabled")
  });
});
define("admin/controllers/admin-badges-show", ["exports", "discourse/lib/ajax-error", "discourse/mixins/buffered-content", "discourse/lib/computed"], function (exports, _ajaxError, _bufferedContent, _computed) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_bufferedContent.default, {
    adminBadges: Ember.inject.controller(),
    saving: false,
    savingStatus: "",

    badgeTypes: Ember.computed.alias("adminBadges.badgeTypes"),
    badgeGroupings: Ember.computed.alias("adminBadges.badgeGroupings"),
    badgeTriggers: Ember.computed.alias("adminBadges.badgeTriggers"),
    protectedSystemFields: Ember.computed.alias("adminBadges.protectedSystemFields"),

    readOnly: Ember.computed.alias("buffered.system"),
    showDisplayName: (0, _computed.propertyNotEqual)("name", "displayName"),

    hasQuery: function () {
      var bQuery = this.get("buffered.query");
      if (bQuery) {
        return bQuery.trim().length > 0;
      }
      var mQuery = this.get("model.query");
      return mQuery && mQuery.trim().length > 0;
    }.property("model.query", "buffered.query"),

    _resetSaving: function () {
      this.set("saving", false);
      this.set("savingStatus", "");
    }.observes("model.id"),

    actions: {
      save: function save() {
        var _this = this;

        if (!this.get("saving")) {
          var fields = ["allow_title", "multiple_grant", "listable", "auto_revoke", "enabled", "show_posts", "target_posts", "name", "description", "long_description", "icon", "image", "query", "badge_grouping_id", "trigger", "badge_type_id"];

          if (this.get("buffered.system")) {
            var protectedFields = this.get("protectedSystemFields");
            fields = _.filter(fields, function (f) {
              return !_.include(protectedFields, f);
            });
          }

          this.set("saving", true);
          this.set("savingStatus", I18n.t("saving"));

          var boolFields = ["allow_title", "multiple_grant", "listable", "auto_revoke", "enabled", "show_posts", "target_posts"];

          var data = {};
          var buffered = this.get("buffered");
          fields.forEach(function (field) {
            var d = buffered.get(field);
            if (_.include(boolFields, field)) {
              d = !!d;
            }
            data[field] = d;
          });

          var newBadge = !this.get("id");
          var model = this.get("model");
          this.get("model").save(data).then(function () {
            if (newBadge) {
              var adminBadges = _this.get("adminBadges.model");
              if (!adminBadges.includes(model)) {
                adminBadges.pushObject(model);
              }
              _this.transitionToRoute("adminBadges.show", model.get("id"));
            } else {
              _this.commitBuffer();
              _this.set("savingStatus", I18n.t("saved"));
            }
          }).catch(_ajaxError.popupAjaxError).finally(function () {
            _this.set("saving", false);
            _this.set("savingStatus", "");
          });
        }
      },
      destroy: function destroy() {
        var _this2 = this;

        var adminBadges = this.get("adminBadges.model");
        var model = this.get("model");

        if (!model.get("id")) {
          this.transitionToRoute("adminBadges.index");
          return;
        }

        return bootbox.confirm(I18n.t("admin.badges.delete_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            model.destroy().then(function () {
              adminBadges.removeObject(model);
              _this2.transitionToRoute("adminBadges.index");
            }).catch(function () {
              bootbox.alert(I18n.t("generic_error"));
            });
          }
        });
      }
    }
  });
});
define("admin/controllers/admin-badges", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend();
});
define("admin/controllers/admin-customize-colors-show", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("model.colors", "onlyOverridden"), (_obj = {
    colors: function colors(allColors, onlyOverridden) {
      if (onlyOverridden) {
        return allColors.filter(function (color) {
          return color.get("overridden");
        });
      } else {
        return allColors;
      }
    },


    actions: {
      revert: function revert(color) {
        color.revert();
      },

      undo: function undo(color) {
        color.undo();
      },

      copyToClipboard: function copyToClipboard() {
        var _this = this;

        $(".table.colors").hide();
        var area = $("<textarea id='copy-range'></textarea>");
        $(".table.colors").after(area);
        area.text(this.get("model").schemeJson());
        var range = document.createRange();
        range.selectNode(area[0]);
        window.getSelection().addRange(range);
        var successful = document.execCommand("copy");
        if (successful) {
          this.set("model.savingStatus", I18n.t("admin.customize.copied_to_clipboard"));
        } else {
          this.set("model.savingStatus", I18n.t("admin.customize.copy_to_clipboard_error"));
        }

        setTimeout(function () {
          _this.set("model.savingStatus", null);
        }, 2000);

        window.getSelection().removeAllRanges();

        $(".table.colors").show();
        $(area).remove();
      },
      copy: function copy() {
        var _this2 = this;

        var newColorScheme = Em.copy(this.get("model"), true);
        newColorScheme.set("name", I18n.t("admin.customize.colors.copy_name_prefix") + " " + this.get("model.name"));
        newColorScheme.save().then(function () {
          _this2.get("allColors").pushObject(newColorScheme);
          _this2.replaceRoute("adminCustomize.colors.show", newColorScheme);
        });
      },


      save: function save() {
        this.get("model").save();
      },

      destroy: function destroy() {
        var _this3 = this;

        var model = this.get("model");
        return bootbox.confirm(I18n.t("admin.customize.colors.delete_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            model.destroy().then(function () {
              _this3.get("allColors").removeObject(model);
              _this3.replaceRoute("adminCustomize.colors");
            });
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "colors", [_dec], Object.getOwnPropertyDescriptor(_obj, "colors"), _obj)), _obj)));
});
define("admin/controllers/admin-customize-colors", ["exports", "discourse/lib/show-modal"], function (exports, _showModal) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    baseColorScheme: function () {
      return this.get("model").findBy("is_base", true);
    }.property("model.@each.id"),

    baseColorSchemes: function () {
      return this.get("model").filterBy("is_base", true);
    }.property("model.@each.id"),

    baseColors: function () {
      var baseColorsHash = Em.Object.create({});
      _.each(this.get("baseColorScheme.colors"), function (color) {
        baseColorsHash.set(color.get("name"), color);
      });
      return baseColorsHash;
    }.property("baseColorScheme"),

    actions: {
      newColorSchemeWithBase: function newColorSchemeWithBase(baseKey) {
        var _this = this;

        var base = this.get("baseColorSchemes").findBy("base_scheme_id", baseKey);
        var newColorScheme = Em.copy(base, true);
        newColorScheme.set("name", I18n.t("admin.customize.colors.new_name"));
        newColorScheme.set("base_scheme_id", base.get("base_scheme_id"));
        newColorScheme.save().then(function () {
          _this.get("model").pushObject(newColorScheme);
          newColorScheme.set("savingStatus", null);
          _this.replaceRoute("adminCustomize.colors.show", newColorScheme);
        });
      },
      newColorScheme: function newColorScheme() {
        (0, _showModal.default)("admin-color-scheme-select-base", {
          model: this.get("baseColorSchemes"),
          admin: true
        });
      }
    }
  });
});
define("admin/controllers/admin-customize-email-templates-edit", ["exports", "discourse/lib/ajax-error", "discourse/mixins/buffered-content"], function (exports, _ajaxError, _bufferedContent) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend((0, _bufferedContent.bufferedProperty)("emailTemplate"), {
    saved: false,

    hasMultipleSubjects: function () {
      var buffered = this.get("buffered");
      if (buffered.getProperties("subject")["subject"]) {
        return false;
      } else {
        return buffered.getProperties("id")["id"];
      }
    }.property("buffered"),

    actions: {
      saveChanges: function saveChanges() {
        var _this = this;

        this.set("saved", false);
        var buffered = this.get("buffered");
        this.get("emailTemplate").save(buffered.getProperties("subject", "body")).then(function () {
          _this.set("saved", true);
        }).catch(_ajaxError.popupAjaxError);
      },
      revertChanges: function revertChanges() {
        var _this2 = this;

        this.set("saved", false);
        bootbox.confirm(I18n.t("admin.customize.email_templates.revert_confirm"), function (result) {
          if (result) {
            _this2.get("emailTemplate").revert().then(function (props) {
              var buffered = _this2.get("buffered");
              buffered.setProperties(props);
              _this2.commitBuffer();
            }).catch(_ajaxError.popupAjaxError);
          }
        });
      }
    }
  });
});
define("admin/controllers/admin-customize-email-templates", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    titleSorting: ["title"],
    emailTemplates: null,

    sortedTemplates: Ember.computed.sort("emailTemplates", "titleSorting")
  });
});
define("admin/controllers/admin-customize-themes-edit", ["exports", "discourse/lib/computed", "ember-addons/ember-computed-decorators"], function (exports, _computed, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _desc, _value, _obj, _init;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("onlyOverridden"), _dec2 = (0, _emberComputedDecorators.default)("onlyOverridden"), _dec3 = (0, _emberComputedDecorators.default)("onlyOverridden"), _dec4 = (0, _emberComputedDecorators.observes)("onlyOverridden"), _dec5 = (0, _emberComputedDecorators.default)("currentTarget"), _dec6 = (0, _emberComputedDecorators.default)("fieldName"), _dec7 = (0, _emberComputedDecorators.default)("currentTargetName", "fieldName", "saving"), _dec8 = (0, _emberComputedDecorators.default)("fieldName", "currentTargetName"), _dec9 = (0, _emberComputedDecorators.default)("fieldName", "currentTargetName", "model"), _dec10 = (0, _emberComputedDecorators.default)("currentTargetName", "onlyOverridden"), _dec11 = (0, _emberComputedDecorators.default)("maximized"), _dec12 = (0, _emberComputedDecorators.default)("model.isSaving"), _dec13 = (0, _emberComputedDecorators.default)("model.changed", "model.isSaving"), (_obj = {
    section: null,
    currentTarget: 0,
    maximized: false,
    previewUrl: (0, _computed.url)("model.id", "/admin/themes/%@/preview"),

    editRouteName: "adminCustomizeThemes.edit",

    targets: [{ id: 0, name: "common" }, { id: 1, name: "desktop" }, { id: 2, name: "mobile" }, { id: 3, name: "settings" }],

    fieldsForTarget: function fieldsForTarget(target) {
      var common = ["scss", "head_tag", "header", "after_header", "body_tag", "footer"];
      switch (target) {
        case "common":
          return [].concat(common, ["embedded_scss"]);
        case "desktop":
          return common;
        case "mobile":
          return common;
        case "settings":
          return ["yaml"];
      }
    },

    showCommon: function showCommon() {
      return this.shouldShow("common");
    },
    showDesktop: function showDesktop() {
      return this.shouldShow("desktop");
    },
    showMobile: function showMobile() {
      return this.shouldShow("mobile");
    },
    onlyOverriddenChanged: function onlyOverriddenChanged() {
      if (this.get("onlyOverridden")) {
        if (!this.get("model").hasEdited(this.get("currentTargetName"), this.get("fieldName"))) {
          var target = this.get("showCommon") && "common" || this.get("showDesktop") && "desktop" || this.get("showMobile") && "mobile";

          var fields = this.get("model.theme_fields");
          var field = fields && fields.find(function (f) {
            return f.target === target;
          });
          this.replaceRoute(this.get("editRouteName"), this.get("model.id"), target, field && field.name);
        }
      }
    },
    shouldShow: function shouldShow(target) {
      if (!this.get("onlyOverridden")) {
        return true;
      }
      return this.get("model").hasEdited(target);
    },


    setTargetName: function setTargetName(name) {
      var target = this.get("targets").find(function (t) {
        return t.name === name;
      });
      this.set("currentTarget", target && target.id);
    },

    currentTargetName: function currentTargetName(id) {
      var target = this.get("targets").find(function (t) {
        return t.id === parseInt(id, 10);
      });
      return target && target.name;
    },
    activeSectionMode: function activeSectionMode(fieldName) {
      if (fieldName === "yaml") return "yaml";
      return fieldName && fieldName.indexOf("scss") > -1 ? "scss" : "html";
    },
    error: function error(target, fieldName) {
      return this.get("model").getError(target, fieldName);
    },
    editorId: function editorId(fieldName, currentTarget) {
      return fieldName + "|" + currentTarget;
    },

    activeSection: {
      get: function get(fieldName, target, model) {
        return model.getField(target, fieldName);
      },
      set: function set(value, fieldName, target, model) {
        model.setField(target, fieldName, value);
        return value;
      }
    },

    fields: function fields(target, onlyOverridden) {
      var fields = this.fieldsForTarget(target);

      if (onlyOverridden) {
        var model = this.get("model");
        var targetName = this.get("currentTargetName");
        fields = fields.filter(function (name) {
          return model.hasEdited(targetName, name);
        });
      }

      return fields.map(function (name) {
        var hash = {
          key: "admin.customize.theme." + name + ".text",
          name: name
        };

        if (name.indexOf("_tag") > 0) {
          hash.icon = "file-text-o";
        }

        hash.title = I18n.t("admin.customize.theme." + name + ".title");

        return hash;
      });
    },
    maximizeIcon: function maximizeIcon(maximized) {
      return maximized ? "compress" : "expand";
    },
    saveButtonText: function saveButtonText(isSaving) {
      return isSaving ? I18n.t("saving") : I18n.t("admin.customize.save");
    },
    saveDisabled: function saveDisabled(changed, isSaving) {
      return !changed || isSaving;
    },


    actions: {
      save: function save() {
        var _this = this;

        this.set("saving", true);
        this.get("model").saveChanges("theme_fields").finally(function () {
          _this.set("saving", false);
        });
      },


      toggleMaximize: function toggleMaximize() {
        var _this2 = this;

        this.toggleProperty("maximized");
        Em.run.next(function () {
          _this2.appEvents.trigger("ace:resize");
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "showCommon", [_dec], Object.getOwnPropertyDescriptor(_obj, "showCommon"), _obj), _applyDecoratedDescriptor(_obj, "showDesktop", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showDesktop"), _obj), _applyDecoratedDescriptor(_obj, "showMobile", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showMobile"), _obj), _applyDecoratedDescriptor(_obj, "onlyOverriddenChanged", [_dec4], Object.getOwnPropertyDescriptor(_obj, "onlyOverriddenChanged"), _obj), _applyDecoratedDescriptor(_obj, "currentTargetName", [_dec5], Object.getOwnPropertyDescriptor(_obj, "currentTargetName"), _obj), _applyDecoratedDescriptor(_obj, "activeSectionMode", [_dec6], Object.getOwnPropertyDescriptor(_obj, "activeSectionMode"), _obj), _applyDecoratedDescriptor(_obj, "error", [_dec7], Object.getOwnPropertyDescriptor(_obj, "error"), _obj), _applyDecoratedDescriptor(_obj, "editorId", [_dec8], Object.getOwnPropertyDescriptor(_obj, "editorId"), _obj), _applyDecoratedDescriptor(_obj, "activeSection", [_dec9], (_init = Object.getOwnPropertyDescriptor(_obj, "activeSection"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "fields", [_dec10], Object.getOwnPropertyDescriptor(_obj, "fields"), _obj), _applyDecoratedDescriptor(_obj, "maximizeIcon", [_dec11], Object.getOwnPropertyDescriptor(_obj, "maximizeIcon"), _obj), _applyDecoratedDescriptor(_obj, "saveButtonText", [_dec12], Object.getOwnPropertyDescriptor(_obj, "saveButtonText"), _obj), _applyDecoratedDescriptor(_obj, "saveDisabled", [_dec13], Object.getOwnPropertyDescriptor(_obj, "saveDisabled"), _obj)), _obj)));
});
define("admin/controllers/admin-customize-themes-show", ["exports", "ember-addons/ember-computed-decorators", "discourse/lib/computed", "discourse/lib/ajax-error", "discourse/lib/show-modal", "admin/models/theme-settings", "admin/models/theme"], function (exports, _emberComputedDecorators, _computed, _ajaxError, _showModal, _themeSettings, _theme) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _desc, _value, _obj;

  var THEME_UPLOAD_VAR = 2;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("model", "allThemes", "model.component"), _dec2 = (0, _emberComputedDecorators.default)("model.editedFields"), _dec3 = (0, _emberComputedDecorators.default)("colorSchemeId", "model.color_scheme_id"), _dec4 = (0, _emberComputedDecorators.default)("availableChildThemes", "model.childThemes.@each", "model"), _dec5 = (0, _emberComputedDecorators.default)("allThemes", "model.component", "model"), _dec6 = (0, _emberComputedDecorators.default)("model.component"), _dec7 = (0, _emberComputedDecorators.default)("model.component"), _dec8 = (0, _emberComputedDecorators.default)("model.component"), _dec9 = (0, _emberComputedDecorators.default)("model.settings"), _dec10 = (0, _emberComputedDecorators.default)("settings"), _dec11 = (0, _emberComputedDecorators.default)("model.remoteError", "updatingRemote"), (_obj = {
    downloadUrl: (0, _computed.url)("model.id", "/admin/themes/%@"),
    previewUrl: (0, _computed.url)("model.id", "/admin/themes/%@/preview"),
    addButtonDisabled: Em.computed.empty("selectedChildThemeId"),
    editRouteName: "adminCustomizeThemes.edit",

    parentThemes: function parentThemes(model, allThemes) {
      if (!model.get("component")) {
        return null;
      }
      var parents = allThemes.filter(function (theme) {
        return _.contains(theme.get("childThemes"), model);
      });
      return parents.length === 0 ? null : parents;
    },
    editedFieldsFormatted: function editedFieldsFormatted() {
      var _this = this;

      var descriptions = [];
      ["common", "desktop", "mobile"].forEach(function (target) {
        var fields = _this.editedFieldsForTarget(target);
        if (fields.length < 1) {
          return;
        }
        var resultString = I18n.t("admin.customize.theme." + target);
        var formattedFields = fields.map(function (f) {
          return I18n.t("admin.customize.theme." + f.name + ".text");
        }).join(" , ");
        resultString += ": " + formattedFields;
        descriptions.push(resultString);
      });
      return descriptions;
    },
    colorSchemeChanged: function colorSchemeChanged(colorSchemeId, existingId) {
      colorSchemeId = colorSchemeId === null ? null : parseInt(colorSchemeId);
      return colorSchemeId !== existingId;
    },
    selectableChildThemes: function selectableChildThemes(available, childThemes) {
      if (available) {
        var themes = !childThemes ? available : available.filter(function (theme) {
          return childThemes.indexOf(theme) === -1;
        });
        return themes.length === 0 ? null : themes;
      }
    },
    availableChildThemes: function availableChildThemes(allThemes) {
      if (!this.get("model.component")) {
        var themeId = this.get("model.id");
        return allThemes.filter(function (theme) {
          return theme.get("id") !== themeId && theme.get("component");
        });
      }
    },
    convertKey: function convertKey(component) {
      var type = component ? "component" : "theme";
      return "admin.customize.theme.convert_" + type;
    },
    convertIcon: function convertIcon(component) {
      return component ? "cube" : "";
    },
    convertTooltip: function convertTooltip(component) {
      var type = component ? "component" : "theme";
      return "admin.customize.theme.convert_" + type + "_tooltip";
    },
    settings: function settings(_settings) {
      return _settings.map(function (setting) {
        return _themeSettings.default.create(setting);
      });
    },
    hasSettings: function hasSettings(settings) {
      return settings.length > 0;
    },
    showRemoteError: function showRemoteError(errorMessage, updating) {
      return errorMessage && !updating;
    },
    editedFieldsForTarget: function editedFieldsForTarget(target) {
      return this.get("model.editedFields").filter(function (field) {
        return field.target === target;
      });
    },
    commitSwitchType: function commitSwitchType() {
      var _this2 = this;

      var model = this.get("model");
      var newValue = !model.get("component");
      model.set("component", newValue);

      if (newValue) {
        this.set("parentController.currentTab", _theme.COMPONENTS);
      } else {
        this.set("parentController.currentTab", _theme.THEMES);
      }

      model.saveChanges("component").then(function () {
        _this2.set("colorSchemeId", null);

        model.setProperties({
          default: false,
          color_scheme_id: null,
          user_selectable: false,
          child_themes: [],
          childThemes: []
        });

        _this2.get("parentController.model.content").forEach(function (theme) {
          var children = _.toArray(theme.get("childThemes"));
          var rawChildren = _.toArray(theme.get("child_themes") || []);
          var index = children ? children.indexOf(model) : -1;
          if (index > -1) {
            children.splice(index, 1);
            rawChildren.splice(index, 1);
            theme.setProperties({
              childThemes: children,
              child_themes: rawChildren
            });
          }
        });
      }).catch(_ajaxError.popupAjaxError);
    },
    transitionToEditRoute: function transitionToEditRoute() {
      this.transitionToRoute(this.get("editRouteName"), this.get("model.id"), "common", "scss");
    },

    actions: {
      updateToLatest: function updateToLatest() {
        var _this3 = this;

        this.set("updatingRemote", true);
        this.get("model").updateToLatest().catch(_ajaxError.popupAjaxError).finally(function () {
          _this3.set("updatingRemote", false);
        });
      },
      checkForThemeUpdates: function checkForThemeUpdates() {
        var _this4 = this;

        this.set("updatingRemote", true);
        this.get("model").checkForUpdates().catch(_ajaxError.popupAjaxError).finally(function () {
          _this4.set("updatingRemote", false);
        });
      },
      addUploadModal: function addUploadModal() {
        (0, _showModal.default)("admin-add-upload", { admin: true, name: "" });
      },
      addUpload: function addUpload(info) {
        var model = this.get("model");
        model.setField("common", info.name, "", info.upload_id, THEME_UPLOAD_VAR);
        model.saveChanges("theme_fields").catch(function (e) {
          return (0, _ajaxError.popupAjaxError)(e);
        });
      },
      cancelChangeScheme: function cancelChangeScheme() {
        this.set("colorSchemeId", this.get("model.color_scheme_id"));
      },
      changeScheme: function changeScheme() {
        var schemeId = this.get("colorSchemeId");
        this.set("model.color_scheme_id", schemeId === null ? null : parseInt(schemeId));
        this.get("model").saveChanges("color_scheme_id");
      },
      startEditingName: function startEditingName() {
        this.set("oldName", this.get("model.name"));
        this.set("editingName", true);
      },
      cancelEditingName: function cancelEditingName() {
        this.set("model.name", this.get("oldName"));
        this.set("editingName", false);
      },
      finishedEditingName: function finishedEditingName() {
        this.get("model").saveChanges("name");
        this.set("editingName", false);
      },
      editTheme: function editTheme() {
        var _this5 = this;

        if (this.get("model.remote_theme")) {
          bootbox.confirm(I18n.t("admin.customize.theme.edit_confirm"), function (result) {
            if (result) {
              _this5.transitionToEditRoute();
            }
          });
        } else {
          this.transitionToEditRoute();
        }
      },
      applyDefault: function applyDefault() {
        var _this6 = this;

        var model = this.get("model");
        model.saveChanges("default").then(function () {
          if (model.get("default")) {
            _this6.get("allThemes").forEach(function (theme) {
              if (theme !== model && theme.get("default")) {
                theme.set("default", false);
              }
            });
          }
        });
      },
      applyUserSelectable: function applyUserSelectable() {
        this.get("model").saveChanges("user_selectable");
      },
      addChildTheme: function addChildTheme() {
        var themeId = parseInt(this.get("selectedChildThemeId"));
        var theme = this.get("allThemes").findBy("id", themeId);
        this.get("model").addChildTheme(theme);
      },
      removeUpload: function removeUpload(upload) {
        var _this7 = this;

        return bootbox.confirm(I18n.t("admin.customize.theme.delete_upload_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            _this7.get("model").removeField(upload);
          }
        });
      },
      removeChildTheme: function removeChildTheme(theme) {
        this.get("model").removeChildTheme(theme);
      },
      destroy: function destroy() {
        var _this8 = this;

        return bootbox.confirm(I18n.t("admin.customize.delete_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            var model = _this8.get("model");
            model.destroyRecord().then(function () {
              _this8.get("allThemes").removeObject(model);
              _this8.transitionToRoute("adminCustomizeThemes");
            });
          }
        });
      },
      switchType: function switchType() {
        var _this9 = this;

        var relatives = this.get("model.component") ? this.get("parentThemes") : this.get("model.childThemes");
        if (relatives && relatives.length > 0) {
          var names = relatives.map(function (relative) {
            return relative.get("name");
          });
          bootbox.confirm(I18n.t(this.get("convertKey") + "_alert", {
            relatives: names.join(", ")
          }), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
            if (result) {
              _this9.commitSwitchType();
            }
          });
        } else {
          this.commitSwitchType();
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "parentThemes", [_dec], Object.getOwnPropertyDescriptor(_obj, "parentThemes"), _obj), _applyDecoratedDescriptor(_obj, "editedFieldsFormatted", [_dec2], Object.getOwnPropertyDescriptor(_obj, "editedFieldsFormatted"), _obj), _applyDecoratedDescriptor(_obj, "colorSchemeChanged", [_dec3], Object.getOwnPropertyDescriptor(_obj, "colorSchemeChanged"), _obj), _applyDecoratedDescriptor(_obj, "selectableChildThemes", [_dec4], Object.getOwnPropertyDescriptor(_obj, "selectableChildThemes"), _obj), _applyDecoratedDescriptor(_obj, "availableChildThemes", [_dec5], Object.getOwnPropertyDescriptor(_obj, "availableChildThemes"), _obj), _applyDecoratedDescriptor(_obj, "convertKey", [_dec6], Object.getOwnPropertyDescriptor(_obj, "convertKey"), _obj), _applyDecoratedDescriptor(_obj, "convertIcon", [_dec7], Object.getOwnPropertyDescriptor(_obj, "convertIcon"), _obj), _applyDecoratedDescriptor(_obj, "convertTooltip", [_dec8], Object.getOwnPropertyDescriptor(_obj, "convertTooltip"), _obj), _applyDecoratedDescriptor(_obj, "settings", [_dec9], Object.getOwnPropertyDescriptor(_obj, "settings"), _obj), _applyDecoratedDescriptor(_obj, "hasSettings", [_dec10], Object.getOwnPropertyDescriptor(_obj, "hasSettings"), _obj), _applyDecoratedDescriptor(_obj, "showRemoteError", [_dec11], Object.getOwnPropertyDescriptor(_obj, "showRemoteError"), _obj)), _obj)));
});
define("admin/controllers/admin-customize-themes", ["exports", "ember-addons/ember-computed-decorators", "admin/models/theme"], function (exports, _emberComputedDecorators, _theme) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("model", "model.@each.component"), _dec2 = (0, _emberComputedDecorators.default)("model", "model.@each.component"), (_obj = {
    currentTab: _theme.THEMES,

    fullThemes: function fullThemes(themes) {
      return themes.filter(function (t) {
        return !t.get("component");
      });
    },
    childThemes: function childThemes(themes) {
      return themes.filter(function (t) {
        return t.get("component");
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "fullThemes", [_dec], Object.getOwnPropertyDescriptor(_obj, "fullThemes"), _obj), _applyDecoratedDescriptor(_obj, "childThemes", [_dec2], Object.getOwnPropertyDescriptor(_obj, "childThemes"), _obj)), _obj)));
});
define("admin/controllers/admin-dashboard-next-general", ["exports", "discourse/lib/computed", "ember-addons/ember-computed-decorators", "admin/models/admin-dashboard-next", "admin/models/report", "admin/mixins/period-computation"], function (exports, _computed, _emberComputedDecorators, _adminDashboardNext, _report, _periodComputation) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  function staticReport(reportType) {
    return function () {
      return Ember.makeArray(this.get("reports")).find(function (report) {
        return report.type === reportType;
      });
    }.property("reports.[]");
  }

  exports.default = Ember.Controller.extend(_periodComputation.default, (_dec = (0, _emberComputedDecorators.default)("startDate", "endDate"), _dec2 = (0, _emberComputedDecorators.default)("model.attributes.updated_at"), _dec3 = (0, _emberComputedDecorators.default)("lastBackupTakenAt"), (_obj = {
    isLoading: false,
    dashboardFetchedAt: null,
    exceptionController: Ember.inject.controller("exception"),
    diskSpace: Ember.computed.alias("model.attributes.disk_space"),
    logSearchQueriesEnabled: (0, _computed.setting)("log_search_queries"),
    lastBackupTakenAt: Ember.computed.alias("model.attributes.last_backup_taken_at"),
    shouldDisplayDurability: Ember.computed.and("diskSpace"),

    activityMetrics: function activityMetrics() {
      return ["page_view_total_reqs", "visits", "time_to_first_response", "likes", "flags", "user_to_user_private_messages_with_replies"];
    },
    activityMetricsFilters: function activityMetricsFilters() {
      return {
        startDate: this.get("lastMonth"),
        endDate: this.get("today")
      };
    },
    topReferredTopicsOptions: function topReferredTopicsOptions() {
      return {
        table: { total: false, limit: 8 }
      };
    },
    topReferredTopicsFilters: function topReferredTopicsFilters() {
      return {
        startDate: moment().subtract(6, "days").startOf("day"),
        endDate: this.get("today")
      };
    },
    trendingSearchFilters: function trendingSearchFilters() {
      return {
        startDate: moment().subtract(6, "days").startOf("day"),
        endDate: this.get("today")
      };
    },
    trendingSearchOptions: function trendingSearchOptions() {
      return {
        table: { total: false, limit: 8 }
      };
    },


    usersByTypeReport: staticReport("users_by_type"),
    usersByTrustLevelReport: staticReport("users_by_trust_level"),

    fetchDashboard: function fetchDashboard() {
      var _this = this;

      if (this.get("isLoading")) return;

      if (!this.get("dashboardFetchedAt") || moment().subtract(30, "minutes").toDate() > this.get("dashboardFetchedAt")) {
        this.set("isLoading", true);

        _adminDashboardNext.default.fetchGeneral().then(function (adminDashboardNextModel) {
          _this.setProperties({
            dashboardFetchedAt: new Date(),
            model: adminDashboardNextModel,
            reports: Ember.makeArray(adminDashboardNextModel.reports).map(function (x) {
              return _report.default.create(x);
            })
          });
        }).catch(function (e) {
          _this.get("exceptionController").set("thrown", e.jqXHR);
          _this.replaceRoute("exception");
        }).finally(function () {
          return _this.set("isLoading", false);
        });
      }
    },
    filters: function filters(startDate, endDate) {
      return { startDate: startDate, endDate: endDate };
    },
    updatedTimestamp: function updatedTimestamp(updatedAt) {
      return moment(updatedAt).tz(moment.tz.guess()).format("LLL");
    },
    backupTimestamp: function backupTimestamp(lastBackupTakenAt) {
      return moment(lastBackupTakenAt).tz(moment.tz.guess()).format("LLL");
    },
    _reportsForPeriodURL: function _reportsForPeriodURL(period) {
      return Discourse.getURL("/admin?period=" + period);
    }
  }, (_applyDecoratedDescriptor(_obj, "activityMetrics", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "activityMetrics"), _obj), _applyDecoratedDescriptor(_obj, "activityMetricsFilters", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "activityMetricsFilters"), _obj), _applyDecoratedDescriptor(_obj, "topReferredTopicsOptions", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "topReferredTopicsOptions"), _obj), _applyDecoratedDescriptor(_obj, "topReferredTopicsFilters", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "topReferredTopicsFilters"), _obj), _applyDecoratedDescriptor(_obj, "trendingSearchFilters", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "trendingSearchFilters"), _obj), _applyDecoratedDescriptor(_obj, "trendingSearchOptions", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "trendingSearchOptions"), _obj), _applyDecoratedDescriptor(_obj, "filters", [_dec], Object.getOwnPropertyDescriptor(_obj, "filters"), _obj), _applyDecoratedDescriptor(_obj, "updatedTimestamp", [_dec2], Object.getOwnPropertyDescriptor(_obj, "updatedTimestamp"), _obj), _applyDecoratedDescriptor(_obj, "backupTimestamp", [_dec3], Object.getOwnPropertyDescriptor(_obj, "backupTimestamp"), _obj)), _obj)));
});
define("admin/controllers/admin-dashboard-next-moderation", ["exports", "ember-addons/ember-computed-decorators", "admin/mixins/period-computation"], function (exports, _emberComputedDecorators, _periodComputation) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Controller.extend(_periodComputation.default, (_dec = (0, _emberComputedDecorators.default)("startDate", "endDate"), _dec2 = (0, _emberComputedDecorators.default)("lastWeek", "endDate"), (_obj = {
    flagsStatusOptions: function flagsStatusOptions() {
      return {
        table: {
          total: false,
          perPage: 10
        }
      };
    },
    mostDisagreedFlaggersOptions: function mostDisagreedFlaggersOptions() {
      return {
        table: {
          total: false,
          perPage: 10
        }
      };
    },
    filters: function filters(startDate, endDate) {
      return { startDate: startDate, endDate: endDate };
    },
    lastWeekfilters: function lastWeekfilters(startDate, endDate) {
      return { startDate: startDate, endDate: endDate };
    },
    _reportsForPeriodURL: function _reportsForPeriodURL(period) {
      return Discourse.getURL("/admin/dashboard/moderation?period=" + period);
    }
  }, (_applyDecoratedDescriptor(_obj, "flagsStatusOptions", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "flagsStatusOptions"), _obj), _applyDecoratedDescriptor(_obj, "mostDisagreedFlaggersOptions", [_emberComputedDecorators.default], Object.getOwnPropertyDescriptor(_obj, "mostDisagreedFlaggersOptions"), _obj), _applyDecoratedDescriptor(_obj, "filters", [_dec], Object.getOwnPropertyDescriptor(_obj, "filters"), _obj), _applyDecoratedDescriptor(_obj, "lastWeekfilters", [_dec2], Object.getOwnPropertyDescriptor(_obj, "lastWeekfilters"), _obj)), _obj)));
});
define("admin/controllers/admin-dashboard-next", ["exports", "discourse/lib/computed", "ember-addons/ember-computed-decorators", "admin/models/admin-dashboard-next", "admin/models/version-check"], function (exports, _computed, _emberComputedDecorators, _adminDashboardNext, _versionCheck) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  var PROBLEMS_CHECK_MINUTES = 1;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("problems.length"), _dec2 = (0, _emberComputedDecorators.default)("problemsFetchedAt"), (_obj = {
    isLoading: false,
    dashboardFetchedAt: null,
    exceptionController: Ember.inject.controller("exception"),
    showVersionChecks: (0, _computed.setting)("version_checks"),

    foundProblems: function foundProblems(problemsLength) {
      return this.currentUser.get("admin") && (problemsLength || 0) > 0;
    },
    fetchProblems: function fetchProblems() {
      if (this.get("isLoadingProblems")) return;

      if (!this.get("problemsFetchedAt") || moment().subtract(PROBLEMS_CHECK_MINUTES, "minutes").toDate() > this.get("problemsFetchedAt")) {
        this._loadProblems();
      }
    },
    fetchDashboard: function fetchDashboard() {
      var _this = this;

      var versionChecks = this.siteSettings.version_checks;

      if (this.get("isLoading") || !versionChecks) return;

      if (!this.get("dashboardFetchedAt") || moment().subtract(30, "minutes").toDate() > this.get("dashboardFetchedAt")) {
        this.set("isLoading", true);

        _adminDashboardNext.default.fetch().then(function (model) {
          var properties = {
            dashboardFetchedAt: new Date()
          };

          if (versionChecks) {
            properties.versionCheck = _versionCheck.default.create(model.version_check);
          }

          _this.setProperties(properties);
        }).catch(function (e) {
          _this.get("exceptionController").set("thrown", e.jqXHR);
          _this.replaceRoute("exception");
        }).finally(function () {
          _this.set("isLoading", false);
        });
      }
    },
    _loadProblems: function _loadProblems() {
      var _this2 = this;

      this.setProperties({
        loadingProblems: true,
        problemsFetchedAt: new Date()
      });

      _adminDashboardNext.default.fetchProblems().then(function (model) {
        return _this2.set("problems", model.problems);
      }).finally(function () {
        return _this2.set("loadingProblems", false);
      });
    },
    problemsTimestamp: function problemsTimestamp(problemsFetchedAt) {
      return moment(problemsFetchedAt).locale("en").format("LLL");
    },


    actions: {
      refreshProblems: function refreshProblems() {
        this._loadProblems();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "foundProblems", [_dec], Object.getOwnPropertyDescriptor(_obj, "foundProblems"), _obj), _applyDecoratedDescriptor(_obj, "problemsTimestamp", [_dec2], Object.getOwnPropertyDescriptor(_obj, "problemsTimestamp"), _obj)), _obj)));
});
define("admin/controllers/admin-dashboard", ["exports", "admin/models/admin-dashboard", "admin/models/report", "admin/models/admin-user", "ember-addons/ember-computed-decorators"], function (exports, _adminDashboard, _report, _adminUser, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  var ATTRIBUTES = ["disk_space", "admins", "moderators", "silenced", "suspended", "top_traffic_sources", "top_referred_topics", "updated_at"];

  var REPORTS = ["global_reports", "page_view_reports", "private_message_reports", "http_reports", "user_reports", "mobile_reports"];

  // This controller supports the default interface when you enter the admin section.
  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("updated_at"), (_obj = {
    loading: null,
    versionCheck: null,
    dashboardFetchedAt: null,
    exceptionController: Ember.inject.controller("exception"),

    fetchDashboard: function fetchDashboard() {
      var _this = this;

      if (!this.get("dashboardFetchedAt") || moment().subtract(30, "minutes").toDate() > this.get("dashboardFetchedAt")) {
        this.set("loading", true);
        _adminDashboard.default.find().then(function (d) {
          _this.set("dashboardFetchedAt", new Date());

          REPORTS.forEach(function (name) {
            return _this.set(name, d[name].map(function (r) {
              return _report.default.create(r);
            }));
          });

          var topReferrers = d.top_referrers;
          if (topReferrers && topReferrers.data) {
            d.top_referrers.data = topReferrers.data.map(function (user) {
              return _adminUser.default.create(user);
            });
            _this.set("top_referrers", topReferrers);
          }

          ATTRIBUTES.forEach(function (a) {
            return _this.set(a, d[a]);
          });
        }).catch(function (e) {
          _this.get("exceptionController").set("thrown", e.jqXHR);
          _this.replaceRoute("exception");
        }).finally(function () {
          _this.set("loading", false);
        });
      }
    },
    updatedTimestamp: function updatedTimestamp(updatedAt) {
      return moment(updatedAt).format("LLL");
    },


    actions: {
      showTrafficReport: function showTrafficReport() {
        this.set("showTrafficReport", true);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "updatedTimestamp", [_dec], Object.getOwnPropertyDescriptor(_obj, "updatedTimestamp"), _obj)), _obj)));
});
define("admin/controllers/admin-email-bounced", ["exports", "admin/controllers/admin-email-logs", "discourse/lib/debounce", "admin/models/email-log"], function (exports, _adminEmailLogs, _debounce, _emailLog) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailLogs.default.extend({
    filterEmailLogs: (0, _debounce.default)(function () {
      var _this = this;

      _emailLog.default.findAll(this.get("filter")).then(function (logs) {
        return _this.set("model", logs);
      });
    }, 250).observes("filter.{user,address,type}")
  });
});
define("admin/controllers/admin-email-incomings", ["exports", "admin/models/incoming-email"], function (exports, _incomingEmail) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,

    actions: {
      loadMore: function loadMore() {
        var _this = this;

        if (this.get("loading") || this.get("model.allLoaded")) {
          return;
        }
        this.set("loading", true);

        _incomingEmail.default.findAll(this.get("filter"), this.get("model.length")).then(function (incoming) {
          if (incoming.length < 50) {
            _this.get("model").set("allLoaded", true);
          }
          _this.get("model").addObjects(incoming);
        }).finally(function () {
          _this.set("loading", false);
        });
      }
    }
  });
});
define("admin/controllers/admin-email-index", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    /**
      Is the "send test email" button disabled?
       @property sendTestEmailDisabled
    **/
    sendTestEmailDisabled: Em.computed.empty("testEmailAddress"),

    /**
      Clears the 'sentTestEmail' property on successful send.
       @method testEmailAddressChanged
    **/
    testEmailAddressChanged: function () {
      this.set("sentTestEmail", false);
    }.observes("testEmailAddress"),

    actions: {
      /**
        Sends a test email to the currently entered email address
         @method sendTestEmail
      **/
      sendTestEmail: function sendTestEmail() {
        var _this = this;

        this.setProperties({
          sendingEmail: true,
          sentTestEmail: false
        });

        (0, _ajax.ajax)("/admin/email/test", {
          type: "POST",
          data: { email_address: this.get("testEmailAddress") }
        }).then(function (response) {
          return _this.set("sentTestEmailMessage", response.send_test_email_message);
        }).catch(function (e) {
          if (e.responseJSON && e.responseJSON.errors) {
            bootbox.alert(I18n.t("admin.email.error", {
              server_error: e.responseJSON.errors[0]
            }));
          } else {
            bootbox.alert(I18n.t("admin.email.test_error"));
          }
        }).finally(function () {
          return _this.set("sendingEmail", false);
        });
      }
    }
  });
});
define("admin/controllers/admin-email-logs", ["exports", "admin/models/email-log"], function (exports, _emailLog) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,

    actions: {
      loadMore: function loadMore() {
        var _this = this;

        if (this.get("loading") || this.get("model.allLoaded")) {
          return;
        }

        this.set("loading", true);
        return _emailLog.default.findAll(this.get("filter"), this.get("model.length")).then(function (logs) {
          if (logs.length < 50) {
            _this.get("model").set("allLoaded", true);
          }
          _this.get("model").addObjects(logs);
        }).finally(function () {
          _this.set("loading", false);
        });
      }
    }
  });
});
define("admin/controllers/admin-email-preview-digest", ["exports", "admin/models/email-preview", "discourse/lib/ajax-error"], function (exports, _emailPreview, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    username: null,
    lastSeen: null,

    emailEmpty: Ember.computed.empty("email"),
    sendEmailDisabled: Ember.computed.or("emailEmpty", "sendingEmail"),
    showSendEmailForm: Ember.computed.notEmpty("model.html_content"),
    htmlEmpty: Ember.computed.empty("model.html_content"),

    actions: {
      refresh: function refresh() {
        var _this = this;

        var model = this.get("model");

        this.set("loading", true);
        this.set("sentEmail", false);

        var username = this.get("username");
        if (!username) {
          username = this.currentUser.get("username");
          this.set("username", username);
        }

        _emailPreview.default.findDigest(username, this.get("lastSeen")).then(function (email) {
          model.setProperties(email.getProperties("html_content", "text_content"));
          _this.set("loading", false);
        });
      },
      toggleShowHtml: function toggleShowHtml() {
        this.toggleProperty("showHtml");
      },
      sendEmail: function sendEmail() {
        var _this2 = this;

        this.set("sendingEmail", true);
        this.set("sentEmail", false);

        _emailPreview.default.sendDigest(this.get("username"), this.get("lastSeen"), this.get("email")).then(function (result) {
          if (result.errors) {
            bootbox.alert(result.errors);
          } else {
            _this2.set("sentEmail", true);
          }
        }).catch(_ajaxError.popupAjaxError).finally(function () {
          _this2.set("sendingEmail", false);
        });
      }
    }
  });
});
define("admin/controllers/admin-email-received", ["exports", "admin/controllers/admin-email-incomings", "discourse/lib/debounce", "admin/models/incoming-email"], function (exports, _adminEmailIncomings, _debounce, _incomingEmail) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailIncomings.default.extend({
    filterIncomingEmails: (0, _debounce.default)(function () {
      var _this = this;

      _incomingEmail.default.findAll(this.get("filter")).then(function (incomings) {
        return _this.set("model", incomings);
      });
    }, 250).observes("filter.{from,to,subject}")
  });
});
define("admin/controllers/admin-email-rejected", ["exports", "admin/controllers/admin-email-incomings", "discourse/lib/debounce", "admin/models/incoming-email"], function (exports, _adminEmailIncomings, _debounce, _incomingEmail) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailIncomings.default.extend({
    filterIncomingEmails: (0, _debounce.default)(function () {
      var _this = this;

      _incomingEmail.default.findAll(this.get("filter")).then(function (incomings) {
        return _this.set("model", incomings);
      });
    }, 250).observes("filter.{from,to,subject,error}")
  });
});
define("admin/controllers/admin-email-sent", ["exports", "admin/controllers/admin-email-logs", "discourse/lib/debounce", "admin/models/email-log"], function (exports, _adminEmailLogs, _debounce, _emailLog) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailLogs.default.extend({
    filterEmailLogs: (0, _debounce.default)(function () {
      var _this = this;

      _emailLog.default.findAll(this.get("filter")).then(function (logs) {
        return _this.set("model", logs);
      });
    }, 250).observes("filter.{user,address,type,reply_key}")
  });
});
define("admin/controllers/admin-email-skipped", ["exports", "admin/controllers/admin-email-logs", "discourse/lib/debounce", "admin/models/email-log"], function (exports, _adminEmailLogs, _debounce, _emailLog) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailLogs.default.extend({
    filterEmailLogs: (0, _debounce.default)(function () {
      var _this = this;

      _emailLog.default.findAll(this.get("filter")).then(function (logs) {
        return _this.set("model", logs);
      });
    }, 250).observes("filter.{user,address,type}")
  });
});
define("admin/controllers/admin-embedding", ["exports", "ember-addons/ember-computed-decorators", "discourse/lib/ajax-error"], function (exports, _emberComputedDecorators, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("embedding.embeddable_hosts.@each.isCreated"), _dec2 = (0, _emberComputedDecorators.default)("embedding.base_url"), (_obj = {
    saved: false,
    embedding: null,

    showSecondary: function showSecondary() {
      var hosts = this.get("embedding.embeddable_hosts");
      return hosts.length && hosts.findBy("isCreated");
    },
    embeddingCode: function embeddingCode(baseUrl) {
      var html = "<div id='discourse-comments'></div>\n\n<script type=\"text/javascript\">\n  DiscourseEmbed = { discourseUrl: '" + baseUrl + "/',\n                     discourseEmbedUrl: 'REPLACE_ME' };\n\n  (function() {\n    var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;\n    d.src = DiscourseEmbed.discourseUrl + 'javascripts/embed.js';\n    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);\n  })();\n</script>";

      return html;
    },


    actions: {
      saveChanges: function saveChanges() {
        var _this = this;

        var embedding = this.get("embedding");
        var updates = embedding.getProperties(embedding.get("fields"));

        this.set("saved", false);
        this.get("embedding").update(updates).then(function () {
          return _this.set("saved", true);
        }).catch(_ajaxError.popupAjaxError);
      },
      addHost: function addHost() {
        var host = this.store.createRecord("embeddable-host");
        this.get("embedding.embeddable_hosts").pushObject(host);
      },
      deleteHost: function deleteHost(host) {
        this.get("embedding.embeddable_hosts").removeObject(host);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "showSecondary", [_dec], Object.getOwnPropertyDescriptor(_obj, "showSecondary"), _obj), _applyDecoratedDescriptor(_obj, "embeddingCode", [_dec2], Object.getOwnPropertyDescriptor(_obj, "embeddingCode"), _obj)), _obj)));
});
define("admin/controllers/admin-emojis", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    sortedEmojis: Ember.computed.sort("model", "emojiSorting"),
    emojiSorting: ["name"],

    actions: {
      emojiUploaded: function emojiUploaded(emoji) {
        emoji.url += "?t=" + new Date().getTime();
        this.get("model").pushObject(Ember.Object.create(emoji));
      },
      destroy: function destroy(emoji) {
        var _this = this;

        return bootbox.confirm(I18n.t("admin.emoji.delete_confirm", { name: emoji.get("name") }), I18n.t("no_value"), I18n.t("yes_value"), function (destroy) {
          if (destroy) {
            return (0, _ajax.ajax)("/admin/customize/emojis/" + emoji.get("name"), {
              type: "DELETE"
            }).then(function () {
              _this.get("model").removeObject(emoji);
            });
          }
        });
      }
    }
  });
});
define("admin/controllers/admin-logs-screened-emails", ["exports", "discourse/lib/export-csv", "discourse/lib/export-result", "admin/models/screened-email"], function (exports, _exportCsv, _exportResult, _screenedEmail) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,

    actions: {
      clearBlock: function clearBlock(row) {
        row.clearBlock().then(function () {
          // feeling lazy
          window.location.reload();
        });
      },
      exportScreenedEmailList: function exportScreenedEmailList() {
        (0, _exportCsv.exportEntity)("screened_email").then(_exportResult.outputExportResult);
      }
    },

    show: function show() {
      var _this = this;

      this.set("loading", true);
      _screenedEmail.default.findAll().then(function (result) {
        _this.set("model", result);
        _this.set("loading", false);
      });
    }
  });
});
define("admin/controllers/admin-logs-screened-ip-addresses", ["exports", "discourse/lib/debounce", "discourse/lib/export-result", "discourse/lib/export-csv", "admin/models/screened-ip-address"], function (exports, _debounce, _exportResult, _exportCsv, _screenedIpAddress) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,
    filter: null,
    savedIpAddress: null,

    show: (0, _debounce.default)(function () {
      var _this = this;

      this.set("loading", true);
      _screenedIpAddress.default.findAll(this.get("filter")).then(function (result) {
        _this.set("model", result);
        _this.set("loading", false);
      });
    }, 250).observes("filter"),

    actions: {
      allow: function allow(record) {
        record.set("action_name", "do_nothing");
        record.save();
      },
      block: function block(record) {
        record.set("action_name", "block");
        record.save();
      },
      edit: function edit(record) {
        if (!record.get("editing")) {
          this.set("savedIpAddress", record.get("ip_address"));
        }
        record.set("editing", true);
      },
      cancel: function cancel(record) {
        if (this.get("savedIpAddress") && record.get("editing")) {
          record.set("ip_address", this.get("savedIpAddress"));
        }
        record.set("editing", false);
      },
      save: function save(record) {
        var _this2 = this;

        var wasEditing = record.get("editing");
        record.set("editing", false);
        record.save().then(function () {
          _this2.set("savedIpAddress", null);
        }).catch(function (e) {
          if (e.jqXHR.responseJSON && e.jqXHR.responseJSON.errors) {
            bootbox.alert(I18n.t("generic_error_with_reason", {
              error: e.jqXHR.responseJSON.errors.join(". ")
            }));
          } else {
            bootbox.alert(I18n.t("generic_error"));
          }
          if (wasEditing) record.set("editing", true);
        });
      },
      destroy: function destroy(record) {
        var _this3 = this;

        return bootbox.confirm(I18n.t("admin.logs.screened_ips.delete_confirm", {
          ip_address: record.get("ip_address")
        }), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            record.destroy().then(function (deleted) {
              if (deleted) {
                _this3.get("model").removeObject(record);
              } else {
                bootbox.alert(I18n.t("generic_error"));
              }
            }).catch(function (e) {
              bootbox.alert(I18n.t("generic_error_with_reason", {
                error: "http: " + e.status + " - " + e.body
              }));
            });
          }
        });
      },
      recordAdded: function recordAdded(arg) {
        this.get("model").unshiftObject(arg);
      },
      rollUp: function rollUp() {
        var self = this;
        return bootbox.confirm(I18n.t("admin.logs.screened_ips.roll_up_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (confirmed) {
          if (confirmed) {
            self.set("loading", true);
            return _screenedIpAddress.default.rollUp().then(function (results) {
              if (results && results.subnets) {
                if (results.subnets.length > 0) {
                  self.send("show");
                  bootbox.alert(I18n.t("admin.logs.screened_ips.rolled_up_some_subnets", {
                    subnets: results.subnets.join(", ")
                  }));
                } else {
                  self.set("loading", false);
                  bootbox.alert(I18n.t("admin.logs.screened_ips.rolled_up_no_subnet"));
                }
              }
            });
          }
        });
      },
      exportScreenedIpList: function exportScreenedIpList() {
        (0, _exportCsv.exportEntity)("screened_ip").then(_exportResult.outputExportResult);
      }
    }
  });
});
define("admin/controllers/admin-logs-screened-urls", ["exports", "discourse/lib/export-csv", "discourse/lib/export-result", "admin/models/screened-url"], function (exports, _exportCsv, _exportResult, _screenedUrl) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,

    show: function show() {
      var _this = this;

      this.set("loading", true);
      _screenedUrl.default.findAll().then(function (result) {
        _this.set("model", result);
        _this.set("loading", false);
      });
    },


    actions: {
      exportScreenedUrlList: function exportScreenedUrlList() {
        (0, _exportCsv.exportEntity)("screened_url").then(_exportResult.outputExportResult);
      }
    }
  });
});
define("admin/controllers/admin-logs-staff-action-logs", ["exports", "discourse/lib/export-csv", "discourse/lib/export-result", "admin/models/staff-action-log"], function (exports, _exportCsv, _exportResult, _staffActionLog) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,
    filters: null,
    userHistoryActions: [],

    filtersExists: Ember.computed.gt("filterCount", 0),

    filterActionIdChanged: function () {
      var filterActionId = this.get("filterActionId");
      if (filterActionId) {
        this._changeFilters({
          action_name: this.get("userHistoryActions").findBy("id", parseInt(filterActionId, 10)).name_raw,
          action_id: filterActionId
        });
      }
    }.observes("filterActionId"),

    actionFilter: function () {
      var name = this.get("filters.action_name");
      if (name) {
        return I18n.t("admin.logs.staff_actions.actions." + name);
      } else {
        return null;
      }
    }.property("filters.action_name"),

    showInstructions: Ember.computed.gt("model.length", 0),

    _refresh: function _refresh() {
      var _this = this;

      this.set("loading", true);

      var filters = this.get("filters"),
          params = {},
          count = 0;

      // Don't send null values
      Object.keys(filters).forEach(function (k) {
        var val = filters.get(k);
        if (val) {
          params[k] = val;
          count += 1;
        }
      });
      this.set("filterCount", count);

      _staffActionLog.default.findAll(params).then(function (result) {
        _this.set("model", result.staff_action_logs);
        if (_this.get("userHistoryActions").length === 0) {
          var actionTypes = result.user_history_actions.map(function (pair) {
            return {
              id: pair.id,
              name: I18n.t("admin.logs.staff_actions.actions." + pair.name),
              name_raw: pair.name
            };
          });
          actionTypes = _.sortBy(actionTypes, function (row) {
            return row.name;
          });
          _this.set("userHistoryActions", actionTypes);
        }
      }).finally(function () {
        _this.set("loading", false);
      });
    },
    scheduleRefresh: function scheduleRefresh() {
      Ember.run.scheduleOnce("afterRender", this, this._refresh);
    },


    resetFilters: function () {
      this.set("filters", Ember.Object.create());
      this.scheduleRefresh();
    }.on("init"),

    _changeFilters: function _changeFilters(props) {
      this.get("filters").setProperties(props);
      this.scheduleRefresh();
    },

    actions: {
      clearFilter: function clearFilter(key) {
        var changed = {};

        // Special case, clear all action related stuff
        if (key === "actionFilter") {
          changed.action_name = null;
          changed.action_id = null;
          changed.custom_type = null;
          this.set("filterActionId", null);
        } else {
          changed[key] = null;
        }
        this._changeFilters(changed);
      },

      clearAllFilters: function clearAllFilters() {
        this.set("filterActionId", null);
        this.resetFilters();
      },


      filterByAction: function filterByAction(logItem) {
        this._changeFilters({
          action_name: logItem.get("action_name"),
          action_id: logItem.get("action"),
          custom_type: logItem.get("custom_type")
        });
      },

      filterByStaffUser: function filterByStaffUser(acting_user) {
        this._changeFilters({ acting_user: acting_user.username });
      },

      filterByTargetUser: function filterByTargetUser(target_user) {
        this._changeFilters({ target_user: target_user.username });
      },

      filterBySubject: function filterBySubject(subject) {
        this._changeFilters({ subject: subject });
      },

      exportStaffActionLogs: function exportStaffActionLogs() {
        (0, _exportCsv.exportEntity)("staff_action").then(_exportResult.outputExportResult);
      }
    }
  });
});
define("admin/controllers/admin-permalinks", ["exports", "discourse/lib/debounce", "admin/models/permalink"], function (exports, _debounce, _permalink) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,
    filter: null,

    show: (0, _debounce.default)(function () {
      var _this = this;

      _permalink.default.findAll(this.get("filter")).then(function (result) {
        _this.set("model", result);
        _this.set("loading", false);
      });
    }, 250).observes("filter"),

    actions: {
      recordAdded: function recordAdded(arg) {
        this.get("model").unshiftObject(arg);
      },


      destroy: function destroy(record) {
        var _this2 = this;

        return bootbox.confirm(I18n.t("admin.permalink.delete_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            record.destroy().then(function (deleted) {
              if (deleted) {
                _this2.get("model").removeObject(record);
              } else {
                bootbox.alert(I18n.t("generic_error"));
              }
            }, function () {
              bootbox.alert(I18n.t("generic_error"));
            });
          }
        });
      }
    }
  });
});
define("admin/controllers/admin-plugins", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    adminRoutes: function () {
      return this.get("model").map(function (p) {
        if (p.get("enabled")) {
          return p.admin_route;
        }
      }).compact();
    }.property(),
    actions: {
      clearFilter: function clearFilter() {
        this.setProperties({ filter: "", onlyOverridden: false });
      },
      toggleMenu: function toggleMenu() {
        $(".admin-detail").toggleClass("mobile-closed mobile-open");
      }
    }
  });
});
define("admin/controllers/admin-reports-show", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("model.type"), _dec2 = (0, _emberComputedDecorators.default)("category_id", "group_id", "start_date", "end_date"), (_obj = {
    queryParams: ["start_date", "end_date", "category_id", "group_id"],

    reportOptions: function reportOptions(type) {
      var options = { table: { perPage: 50, limit: 50, formatNumbers: false } };

      if (type === "top_referred_topics") {
        options.table.limit = 10;
      }

      return options;
    },
    filters: function filters(categoryId, groupId, startDate, endDate) {
      return {
        categoryId: categoryId,
        groupId: groupId,
        startDate: startDate,
        endDate: endDate
      };
    },


    actions: {
      onParamsChange: function onParamsChange(params) {
        this.setProperties({
          start_date: params.startDate,
          category_id: params.categoryId,
          group_id: params.groupId,
          end_date: params.endDate
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "reportOptions", [_dec], Object.getOwnPropertyDescriptor(_obj, "reportOptions"), _obj), _applyDecoratedDescriptor(_obj, "filters", [_dec2], Object.getOwnPropertyDescriptor(_obj, "filters"), _obj)), _obj)));
});
define("admin/controllers/admin-search-logs-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,
    period: "all",
    searchType: "all",

    searchTypeOptions: [{
      id: "all",
      name: I18n.t("admin.logs.search_logs.types.all_search_types")
    }, { id: "header", name: I18n.t("admin.logs.search_logs.types.header") }, { id: "full_page", name: I18n.t("admin.logs.search_logs.types.full_page") }]
  });
});
define("admin/controllers/admin-search-logs-term", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loading: false,
    term: null,
    period: "quarterly",
    searchType: "all",

    searchTypeOptions: [{
      id: "all",
      name: I18n.t("admin.logs.search_logs.types.all_search_types")
    }, { id: "header", name: I18n.t("admin.logs.search_logs.types.header") }, { id: "full_page", name: I18n.t("admin.logs.search_logs.types.full_page") }, {
      id: "click_through_only",
      name: I18n.t("admin.logs.search_logs.types.click_through_only")
    }]
  });
});
define("admin/controllers/admin-site-settings-category", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("adminSiteSettings.model", "categoryNameKey"), _dec2 = (0, _emberComputedDecorators.default)("category"), (_obj = {
    categoryNameKey: null,
    adminSiteSettings: Ember.inject.controller(),

    category: function category(categories, nameKey) {
      return (categories || []).findBy("nameKey", nameKey);
    },
    filteredContent: function filteredContent(category) {
      return category ? category.siteSettings : [];
    }
  }, (_applyDecoratedDescriptor(_obj, "category", [_dec], Object.getOwnPropertyDescriptor(_obj, "category"), _obj), _applyDecoratedDescriptor(_obj, "filteredContent", [_dec2], Object.getOwnPropertyDescriptor(_obj, "filteredContent"), _obj)), _obj)));
});
define("admin/controllers/admin-site-settings", ["exports", "discourse/lib/debounce"], function (exports, _debounce) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    filter: null,
    onlyOverridden: false,

    filterContentNow: function filterContentNow(category) {
      var _this = this;

      // If we have no content, don't bother filtering anything
      if (!!Ember.isEmpty(this.get("allSiteSettings"))) return;

      var filter = void 0;
      if (this.get("filter")) {
        filter = this.get("filter").toLowerCase();
      }

      if ((!filter || 0 === filter.length) && !this.get("onlyOverridden")) {
        this.set("model", this.get("allSiteSettings"));
        this.transitionToRoute("adminSiteSettings");
        return;
      }

      var all = {
        nameKey: "all_results",
        name: I18n.t("admin.site_settings.categories.all_results"),
        siteSettings: []
      };
      var matchesGroupedByCategory = [all];

      var matches = [];
      this.get("allSiteSettings").forEach(function (settingsCategory) {
        var siteSettings = settingsCategory.siteSettings.filter(function (item) {
          if (_this.get("onlyOverridden") && !item.get("overridden")) return false;
          if (filter) {
            var setting = item.get("setting").toLowerCase();
            return setting.includes(filter) || setting.replace(/_/g, " ").includes(filter) || item.get("description").toLowerCase().includes(filter) || (item.get("value") || "").toLowerCase().includes(filter);
          } else {
            return true;
          }
        });
        if (siteSettings.length > 0) {
          matches.pushObjects(siteSettings);
          matchesGroupedByCategory.pushObject({
            nameKey: settingsCategory.nameKey,
            name: I18n.t("admin.site_settings.categories." + settingsCategory.nameKey),
            siteSettings: siteSettings,
            count: siteSettings.length
          });
        }
      });

      all.siteSettings.pushObjects(matches.slice(0, 30));
      all.hasMore = matches.length > 30;
      all.count = all.hasMore ? "30+" : matches.length;

      this.set("model", matchesGroupedByCategory);
      this.transitionToRoute("adminSiteSettingsCategory", category || "all_results");
    },


    filterContent: (0, _debounce.default)(function () {
      if (this.get("_skipBounce")) {
        this.set("_skipBounce", false);
      } else {
        this.filterContentNow();
      }
    }, 250).observes("filter", "onlyOverridden"),

    actions: {
      clearFilter: function clearFilter() {
        this.setProperties({ filter: "", onlyOverridden: false });
      },
      toggleMenu: function toggleMenu() {
        $(".admin-detail").toggleClass("mobile-closed mobile-open");
      }
    }
  });
});
define("admin/controllers/admin-site-text-edit", ["exports", "discourse/lib/ajax-error", "discourse/mixins/buffered-content"], function (exports, _ajaxError, _bufferedContent) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend((0, _bufferedContent.bufferedProperty)("siteText"), {
    saved: false,

    actions: {
      saveChanges: function saveChanges() {
        var _this = this;

        var buffered = this.get("buffered");
        this.get("siteText").save(buffered.getProperties("value")).then(function () {
          _this.commitBuffer();
          _this.set("saved", true);
        }).catch(_ajaxError.popupAjaxError);
      },
      revertChanges: function revertChanges() {
        var _this2 = this;

        this.set("saved", false);
        bootbox.confirm(I18n.t("admin.site_text.revert_confirm"), function (result) {
          if (result) {
            _this2.get("siteText").revert().then(function (props) {
              var buffered = _this2.get("buffered");
              buffered.setProperties(props);
              _this2.commitBuffer();
            }).catch(_ajaxError.popupAjaxError);
          }
        });
      }
    }
  });
});
define("admin/controllers/admin-site-text-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var lastSearch = void 0;
  var lastOverridden = void 0;

  exports.default = Ember.Controller.extend({
    searching: false,
    siteTexts: null,
    preferred: false,
    queryParams: ["q", "overridden"],

    q: null,
    overridden: null,

    _performSearch: function _performSearch() {
      var _this = this;

      this.store.find("site-text", this.getProperties("q", "overridden")).then(function (results) {
        _this.set("siteTexts", results);
      }).finally(function () {
        return _this.set("searching", false);
      });
    },


    actions: {
      edit: function edit(siteText) {
        this.transitionToRoute("adminSiteText.edit", siteText.get("id"));
      },
      search: function search(overridden) {
        this.set("overridden", overridden);

        var q = this.get("q");
        if (q !== lastSearch || overridden !== lastOverridden) {
          this.set("searching", true);
          Ember.run.debounce(this, this._performSearch, 400);
          lastSearch = q;
          lastOverridden = overridden;
        }
      }
    }
  });
});
define("admin/controllers/admin-user-badges", ["exports", "discourse/mixins/grant-badge-controller"], function (exports, _grantBadgeController) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_grantBadgeController.default, {
    adminUser: Ember.inject.controller(),
    user: Ember.computed.alias("adminUser.model"),
    userBadges: Ember.computed.alias("model"),
    allBadges: Ember.computed.alias("badges"),

    sortedBadges: Ember.computed.sort("model", "badgeSortOrder"),
    badgeSortOrder: ["granted_at:desc"],

    groupedBadges: function () {
      var allBadges = this.get("model");

      var grouped = _.groupBy(allBadges, function (badge) {
        return badge.badge_id;
      });

      var expanded = [];
      var expandedBadges = allBadges.get("expandedBadges");

      _(grouped).each(function (badges) {
        var lastGranted = badges[0].granted_at;

        _.each(badges, function (badge) {
          lastGranted = lastGranted < badge.granted_at ? badge.granted_at : lastGranted;
        });

        if (badges.length === 1 || _.include(expandedBadges, badges[0].badge.id)) {
          _.each(badges, function (badge) {
            return expanded.push(badge);
          });
          return;
        }

        var result = {
          badge: badges[0].badge,
          granted_at: lastGranted,
          badges: badges,
          count: badges.length,
          grouped: true
        };

        expanded.push(result);
      });

      return _(expanded).sortBy(function (group) {
        return group.granted_at;
      }).reverse().value();
    }.property("model", "model.[]", "model.expandedBadges.[]"),

    actions: {
      expandGroup: function expandGroup(userBadge) {
        var model = this.get("model");
        model.set("expandedBadges", model.get("expandedBadges") || []);
        model.get("expandedBadges").pushObject(userBadge.badge.id);
      },

      grantBadge: function grantBadge() {
        var _this = this;

        this.grantBadge(this.get("selectedBadgeId"), this.get("user.username"), this.get("badgeReason")).then(function () {
          _this.set("badgeReason", "");
          Ember.run.next(function () {
            // Update the selected badge ID after the combobox has re-rendered.
            var newSelectedBadge = _this.get("grantableBadges")[0];
            if (newSelectedBadge) {
              _this.set("selectedBadgeId", newSelectedBadge.get("id"));
            }
          });
        }, function () {
          // Failure
          bootbox.alert(I18n.t("generic_error"));
        });
      },
      revokeBadge: function revokeBadge(userBadge) {
        var _this2 = this;

        return bootbox.confirm(I18n.t("admin.badges.revoke_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            userBadge.revoke().then(function () {
              _this2.get("model").removeObject(userBadge);
            });
          }
        });
      }
    }
  });
});
define("admin/controllers/admin-user-fields", ["exports", "discourse/lib/ajax-error"], function (exports, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var MAX_FIELDS = 20;

  exports.default = Ember.Controller.extend({
    fieldTypes: null,
    createDisabled: Em.computed.gte("model.length", MAX_FIELDS),

    fieldSortOrder: ["position"],
    sortedFields: Ember.computed.sort("model", "fieldSortOrder"),

    actions: {
      createField: function createField() {
        var f = this.store.createRecord("user-field", {
          field_type: "text",
          position: MAX_FIELDS
        });
        this.get("model").pushObject(f);
      },
      moveUp: function moveUp(f) {
        var idx = this.get("sortedFields").indexOf(f);
        if (idx) {
          var prev = this.get("sortedFields").objectAt(idx - 1);
          var prevPos = prev.get("position");

          prev.update({ position: f.get("position") });
          f.update({ position: prevPos });
        }
      },
      moveDown: function moveDown(f) {
        var idx = this.get("sortedFields").indexOf(f);
        if (idx > -1) {
          var next = this.get("sortedFields").objectAt(idx + 1);
          var nextPos = next.get("position");

          next.update({ position: f.get("position") });
          f.update({ position: nextPos });
        }
      },
      destroy: function destroy(f) {
        var model = this.get("model");

        // Only confirm if we already been saved
        if (f.get("id")) {
          bootbox.confirm(I18n.t("admin.user_fields.delete_confirm"), function (result) {
            if (result) {
              f.destroyRecord().then(function () {
                model.removeObject(f);
              }).catch(_ajaxError.popupAjaxError);
            }
          });
        } else {
          model.removeObject(f);
        }
      }
    }
  });
});
define("admin/controllers/admin-user-index", ["exports", "discourse/lib/ajax", "discourse/mixins/can-check-emails", "discourse/lib/computed", "discourse/lib/url", "discourse/lib/ajax-error", "ember-addons/ember-computed-decorators"], function (exports, _ajax, _canCheckEmails, _computed, _url, _ajaxError, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _desc, _value, _obj;

  exports.default = Ember.Controller.extend(_canCheckEmails.default, (_dec = (0, _emberComputedDecorators.default)("model.customGroups"), _dec2 = (0, _emberComputedDecorators.default)("customGroupIdsBuffer", "customGroupIds"), _dec3 = (0, _emberComputedDecorators.default)("model.automaticGroups"), _dec4 = (0, _emberComputedDecorators.default)("model.associated_accounts"), _dec5 = (0, _emberComputedDecorators.default)("model.associated_accounts"), _dec6 = (0, _emberComputedDecorators.default)("model.username_lower"), _dec7 = (0, _emberComputedDecorators.default)("model.can_delete_all_posts", "model.staff", "model.post_count"), _dec8 = (0, _emberComputedDecorators.default)("model.canBeDeleted", "model.staff"), (_obj = {
    adminTools: Ember.inject.service(),
    editingUsername: false,
    editingName: false,
    editingTitle: false,
    originalPrimaryGroupId: null,
    customGroupIdsBuffer: null,
    availableGroups: null,
    userTitleValue: null,

    showApproval: (0, _computed.setting)("must_approve_users"),
    showBadges: (0, _computed.setting)("enable_badges"),
    hasLockedTrustLevel: Ember.computed.notEmpty("model.manual_locked_trust_level"),

    primaryGroupDirty: (0, _computed.propertyNotEqual)("originalPrimaryGroupId", "model.primary_group_id"),

    canDisableSecondFactor: Ember.computed.and("model.second_factor_enabled", "model.can_disable_second_factor"),

    customGroupIds: function customGroupIds(customGroups) {
      return customGroups.mapBy("id");
    },
    customGroupsDirty: function customGroupsDirty(buffer, original) {
      if (buffer === null) return false;

      return buffer.length === original.length ? buffer.any(function (id) {
        return !original.includes(id);
      }) : true;
    },
    automaticGroups: function automaticGroups(_automaticGroups) {
      return _automaticGroups.map(function (group) {
        var name = Ember.String.htmlSafe(group.name);
        return "<a href=\"/groups/" + name + "\">" + name + "</a>";
      }).join(", ");
    },
    associatedAccountsLoaded: function associatedAccountsLoaded(associatedAccounts) {
      return typeof associatedAccounts !== "undefined";
    },
    associatedAccounts: function associatedAccounts(_associatedAccounts) {
      return _associatedAccounts.map(function (provider) {
        return provider.name + " (" + provider.description + ")";
      }).join(", ");
    },


    userFields: function () {
      var siteUserFields = this.site.get("user_fields"),
          userFields = this.get("model.user_fields");

      if (!Ember.isEmpty(siteUserFields)) {
        return siteUserFields.map(function (uf) {
          var value = userFields ? userFields[uf.get("id").toString()] : null;
          return { name: uf.get("name"), value: value };
        });
      }
      return [];
    }.property("model.user_fields.[]"),

    preferencesPath: function preferencesPath(username) {
      return (0, _url.userPath)(username + "/preferences");
    },
    deleteAllPostsExplanation: function deleteAllPostsExplanation(canDeleteAllPosts, staff, postCount) {
      if (canDeleteAllPosts) {
        return null;
      }

      if (staff) {
        return I18n.t("admin.user.delete_posts_forbidden_because_staff");
      }
      if (postCount > this.siteSettings.delete_all_posts_max) {
        return I18n.t("admin.user.cant_delete_all_too_many_posts", {
          count: this.siteSettings.delete_all_posts_max
        });
      } else {
        return I18n.t("admin.user.cant_delete_all_posts", {
          count: this.siteSettings.delete_user_max_post_age
        });
      }
    },
    deleteExplanation: function deleteExplanation(canBeDeleted, staff) {
      if (canBeDeleted) {
        return null;
      }

      if (staff) {
        return I18n.t("admin.user.delete_forbidden_because_staff");
      } else {
        return I18n.t("admin.user.delete_forbidden", {
          count: this.siteSettings.delete_user_max_post_age
        });
      }
    },
    groupAdded: function groupAdded(added) {
      this.get("model").groupAdded(added).catch(function () {
        bootbox.alert(I18n.t("generic_error"));
      });
    },
    groupRemoved: function groupRemoved(groupId) {
      var _this = this;

      this.get("model").groupRemoved(groupId).then(function () {
        if (groupId === _this.get("originalPrimaryGroupId")) {
          _this.set("originalPrimaryGroupId", null);
        }
      }).catch(function () {
        bootbox.alert(I18n.t("generic_error"));
      });
    },


    actions: {
      impersonate: function impersonate() {
        return this.get("model").impersonate();
      },
      logOut: function logOut() {
        return this.get("model").logOut();
      },
      resetBounceScore: function resetBounceScore() {
        return this.get("model").resetBounceScore();
      },
      refreshBrowsers: function refreshBrowsers() {
        return this.get("model").refreshBrowsers();
      },
      approve: function approve() {
        return this.get("model").approve();
      },
      deactivate: function deactivate() {
        return this.get("model").deactivate();
      },
      sendActivationEmail: function sendActivationEmail() {
        return this.get("model").sendActivationEmail();
      },
      activate: function activate() {
        return this.get("model").activate();
      },
      revokeAdmin: function revokeAdmin() {
        return this.get("model").revokeAdmin();
      },
      grantAdmin: function grantAdmin() {
        return this.get("model").grantAdmin();
      },
      revokeModeration: function revokeModeration() {
        return this.get("model").revokeModeration();
      },
      grantModeration: function grantModeration() {
        return this.get("model").grantModeration();
      },
      saveTrustLevel: function saveTrustLevel() {
        return this.get("model").saveTrustLevel();
      },
      restoreTrustLevel: function restoreTrustLevel() {
        return this.get("model").restoreTrustLevel();
      },
      lockTrustLevel: function lockTrustLevel(locked) {
        return this.get("model").lockTrustLevel(locked);
      },
      unsilence: function unsilence() {
        return this.get("model").unsilence();
      },
      silence: function silence() {
        return this.get("model").silence();
      },
      deleteAllPosts: function deleteAllPosts() {
        return this.get("model").deleteAllPosts();
      },
      anonymize: function anonymize() {
        return this.get("model").anonymize();
      },
      disableSecondFactor: function disableSecondFactor() {
        return this.get("model").disableSecondFactor();
      },
      clearPenaltyHistory: function clearPenaltyHistory() {
        var user = this.get("model");
        return (0, _ajax.ajax)("/admin/users/" + user.get("id") + "/penalty_history", {
          type: "DELETE"
        }).then(function () {
          user.set("tl3_requirements.penalty_counts.total", 0);
        }).catch(_ajaxError.popupAjaxError);
      },
      destroy: function destroy() {
        var postCount = this.get("model.post_count");
        if (postCount <= 5) {
          return this.get("model").destroy({ deletePosts: true });
        } else {
          return this.get("model").destroy();
        }
      },
      viewActionLogs: function viewActionLogs() {
        this.get("adminTools").showActionLogs(this, {
          target_user: this.get("model.username")
        });
      },
      showFlagsReceived: function showFlagsReceived() {
        this.get("adminTools").showFlagsReceived(this.get("model"));
      },
      showSuspendModal: function showSuspendModal() {
        this.get("adminTools").showSuspendModal(this.get("model"));
      },
      unsuspend: function unsuspend() {
        this.get("model").unsuspend().catch(_ajaxError.popupAjaxError);
      },
      showSilenceModal: function showSilenceModal() {
        this.get("adminTools").showSilenceModal(this.get("model"));
      },
      toggleUsernameEdit: function toggleUsernameEdit() {
        this.set("userUsernameValue", this.get("model.username"));
        this.toggleProperty("editingUsername");
      },
      saveUsername: function saveUsername() {
        var _this2 = this;

        var oldUsername = this.get("model.username");
        this.set("model.username", this.get("userUsernameValue"));

        return (0, _ajax.ajax)("/users/" + oldUsername.toLowerCase() + "/preferences/username", {
          data: { new_username: this.get("userUsernameValue") },
          type: "PUT"
        }).catch(function (e) {
          _this2.set("model.username", oldUsername);
          (0, _ajaxError.popupAjaxError)(e);
        }).finally(function () {
          return _this2.toggleProperty("editingUsername");
        });
      },
      toggleNameEdit: function toggleNameEdit() {
        this.set("userNameValue", this.get("model.name"));
        this.toggleProperty("editingName");
      },
      saveName: function saveName() {
        var _this3 = this;

        var oldName = this.get("model.name");
        this.set("model.name", this.get("userNameValue"));

        return (0, _ajax.ajax)((0, _url.userPath)(this.get("model.username").toLowerCase() + ".json"), {
          data: { name: this.get("userNameValue") },
          type: "PUT"
        }).catch(function (e) {
          _this3.set("model.name", oldName);
          (0, _ajaxError.popupAjaxError)(e);
        }).finally(function () {
          return _this3.toggleProperty("editingName");
        });
      },
      toggleTitleEdit: function toggleTitleEdit() {
        this.set("userTitleValue", this.get("model.title"));
        this.toggleProperty("editingTitle");
      },
      saveTitle: function saveTitle() {
        var _this4 = this;

        var prevTitle = this.get("userTitleValue");

        this.set("model.title", this.get("userTitleValue"));
        return (0, _ajax.ajax)((0, _url.userPath)(this.get("model.username").toLowerCase() + ".json"), {
          data: { title: this.get("userTitleValue") },
          type: "PUT"
        }).catch(function (e) {
          _this4.set("model.title", prevTitle);
          (0, _ajaxError.popupAjaxError)(e);
        }).finally(function () {
          return _this4.toggleProperty("editingTitle");
        });
      },
      generateApiKey: function generateApiKey() {
        this.get("model").generateApiKey();
      },
      saveCustomGroups: function saveCustomGroups() {
        var _this5 = this;

        var currentIds = this.get("customGroupIds");
        var bufferedIds = this.get("customGroupIdsBuffer");
        var availableGroups = this.get("availableGroups");

        bufferedIds.filter(function (id) {
          return !currentIds.includes(id);
        }).forEach(function (id) {
          _this5.groupAdded(availableGroups.findBy("id", id));
        });

        currentIds.filter(function (id) {
          return !bufferedIds.includes(id);
        }).forEach(function (id) {
          return _this5.groupRemoved(id);
        });
      },
      resetCustomGroups: function resetCustomGroups() {
        this.set("customGroupIdsBuffer", null);
      },
      savePrimaryGroup: function savePrimaryGroup() {
        var self = this;

        return (0, _ajax.ajax)("/admin/users/" + this.get("model.id") + "/primary_group", {
          type: "PUT",
          data: { primary_group_id: this.get("model.primary_group_id") }
        }).then(function () {
          self.set("originalPrimaryGroupId", self.get("model.primary_group_id"));
        }).catch(function () {
          bootbox.alert(I18n.t("generic_error"));
        });
      },
      resetPrimaryGroup: function resetPrimaryGroup() {
        this.set("model.primary_group_id", this.get("originalPrimaryGroupId"));
      },
      regenerateApiKey: function regenerateApiKey() {
        var self = this;

        bootbox.confirm(I18n.t("admin.api.confirm_regen"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            self.get("model").generateApiKey();
          }
        });
      },
      revokeApiKey: function revokeApiKey() {
        var self = this;

        bootbox.confirm(I18n.t("admin.api.confirm_revoke"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            self.get("model").revokeApiKey();
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "customGroupIds", [_dec], Object.getOwnPropertyDescriptor(_obj, "customGroupIds"), _obj), _applyDecoratedDescriptor(_obj, "customGroupsDirty", [_dec2], Object.getOwnPropertyDescriptor(_obj, "customGroupsDirty"), _obj), _applyDecoratedDescriptor(_obj, "automaticGroups", [_dec3], Object.getOwnPropertyDescriptor(_obj, "automaticGroups"), _obj), _applyDecoratedDescriptor(_obj, "associatedAccountsLoaded", [_dec4], Object.getOwnPropertyDescriptor(_obj, "associatedAccountsLoaded"), _obj), _applyDecoratedDescriptor(_obj, "associatedAccounts", [_dec5], Object.getOwnPropertyDescriptor(_obj, "associatedAccounts"), _obj), _applyDecoratedDescriptor(_obj, "preferencesPath", [_dec6], Object.getOwnPropertyDescriptor(_obj, "preferencesPath"), _obj), _applyDecoratedDescriptor(_obj, "deleteAllPostsExplanation", [_dec7], Object.getOwnPropertyDescriptor(_obj, "deleteAllPostsExplanation"), _obj), _applyDecoratedDescriptor(_obj, "deleteExplanation", [_dec8], Object.getOwnPropertyDescriptor(_obj, "deleteExplanation"), _obj)), _obj)));
});
define("admin/controllers/admin-user", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend();
});
define("admin/controllers/admin-users-list-show", ["exports", "discourse/lib/debounce", "discourse/lib/computed", "admin/models/admin-user", "ember-addons/ember-computed-decorators"], function (exports, _debounce, _computed, _adminUser, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj, _init;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.observes)("order", "ascending"), (_obj = {
    query: null,
    queryParams: ["order", "ascending"],
    order: null,
    ascending: null,
    showEmails: false,
    refreshing: false,
    listFilter: null,
    selectAll: false,

    queryNew: Em.computed.equal("query", "new"),
    queryPending: Em.computed.equal("query", "pending"),
    queryHasApproval: Em.computed.or("queryNew", "queryPending"),
    showApproval: Em.computed.and("siteSettings.must_approve_users", "queryHasApproval"),
    searchHint: (0, _computed.i18n)("search_hint"),
    hasSelection: Em.computed.gt("selectedCount", 0),

    selectedCount: function () {
      var model = this.get("model");
      if (!model || !model.length) return 0;
      return model.filterBy("selected").length;
    }.property("model.@each.selected"),

    selectAllChanged: function () {
      var val = this.get("selectAll");
      this.get("model").forEach(function (user) {
        if (user.get("can_approve")) {
          user.set("selected", val);
        }
      });
    }.observes("selectAll"),

    title: function () {
      return I18n.t("admin.users.titles." + this.get("query"));
    }.property("query"),

    _filterUsers: (0, _debounce.default)(function () {
      this._refreshUsers();
    }, 250).observes("listFilter"),

    _refreshUsers: function _refreshUsers() {
      var _this = this;

      this.set("refreshing", true);

      _adminUser.default.findAll(this.get("query"), {
        filter: this.get("listFilter"),
        show_emails: this.get("showEmails"),
        order: this.get("order"),
        ascending: this.get("ascending")
      }).then(function (result) {
        _this.set("model", result);
      }).finally(function () {
        _this.set("refreshing", false);
      });
    },

    actions: {
      approveUsers: function approveUsers() {
        _adminUser.default.bulkApprove(this.get("model").filterBy("selected"));
        this._refreshUsers();
      },

      rejectUsers: function rejectUsers() {
        var maxPostAge = this.siteSettings.delete_user_max_post_age;
        var controller = this;
        _adminUser.default.bulkReject(this.get("model").filterBy("selected")).then(function (result) {
          var message = I18n.t("admin.users.reject_successful", {
            count: result.success
          });
          if (result.failed > 0) {
            message += " " + I18n.t("admin.users.reject_failures", { count: result.failed });
            message += " " + I18n.t("admin.user.delete_forbidden", { count: maxPostAge });
          }
          bootbox.alert(message);
          controller._refreshUsers();
        });
      },

      showEmails: function showEmails() {
        this.set("showEmails", true);
        this._refreshUsers(true);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_refreshUsers", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "_refreshUsers"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj)), _obj)));
});
define("admin/controllers/admin-watched-words-action", ["exports", "ember-addons/ember-computed-decorators", "admin/models/watched-word"], function (exports, _emberComputedDecorators, _watchedWord) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("actionNameKey", "adminWatchedWords.model"), _dec2 = (0, _emberComputedDecorators.default)("actionNameKey"), _dec3 = (0, _emberComputedDecorators.default)("actionNameKey", "adminWatchedWords.model"), (_obj = {
    actionNameKey: null,
    adminWatchedWords: Ember.inject.controller(),
    showWordsList: Ember.computed.or("adminWatchedWords.filtered", "adminWatchedWords.showWords"),

    findAction: function findAction(actionName) {
      return (this.get("adminWatchedWords.model") || []).findBy("nameKey", actionName);
    },
    filteredContent: function filteredContent(actionNameKey) {
      if (!actionNameKey) {
        return [];
      }

      var a = this.findAction(actionNameKey);
      return a ? a.words : [];
    },
    actionDescription: function actionDescription(actionNameKey) {
      return I18n.t("admin.watched_words.action_descriptions." + actionNameKey);
    },
    wordCount: function wordCount(actionNameKey) {
      var a = this.findAction(actionNameKey);
      return a ? a.words.length : 0;
    },


    actions: {
      recordAdded: function recordAdded(arg) {
        var _this = this;

        var a = this.findAction(this.get("actionNameKey"));
        if (a) {
          a.words.unshiftObject(arg);
          a.incrementProperty("count");
          Em.run.schedule("afterRender", function () {
            // remove from other actions lists
            var match = null;
            _this.get("adminWatchedWords.model").forEach(function (action) {
              if (match) return;

              if (action.nameKey !== _this.get("actionNameKey")) {
                match = action.words.findBy("id", arg.id);
                if (match) {
                  action.words.removeObject(match);
                  action.decrementProperty("count");
                }
              }
            });
          });
        }
      },
      recordRemoved: function recordRemoved(arg) {
        var a = this.findAction(this.get("actionNameKey"));
        if (a) {
          a.words.removeObject(arg);
          a.decrementProperty("count");
        }
      },
      uploadComplete: function uploadComplete() {
        var _this2 = this;

        _watchedWord.default.findAll().then(function (data) {
          _this2.set("adminWatchedWords.model", data);
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "filteredContent", [_dec], Object.getOwnPropertyDescriptor(_obj, "filteredContent"), _obj), _applyDecoratedDescriptor(_obj, "actionDescription", [_dec2], Object.getOwnPropertyDescriptor(_obj, "actionDescription"), _obj), _applyDecoratedDescriptor(_obj, "wordCount", [_dec3], Object.getOwnPropertyDescriptor(_obj, "wordCount"), _obj)), _obj)));
});
define("admin/controllers/admin-watched-words", ["exports", "discourse/lib/debounce"], function (exports, _debounce) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    filter: null,
    filtered: false,
    showWords: false,
    disableShowWords: Ember.computed.alias("filtered"),
    regularExpressions: null,

    filterContentNow: function filterContentNow() {
      if (!!Ember.isEmpty(this.get("allWatchedWords"))) return;

      var filter = void 0;
      if (this.get("filter")) {
        filter = this.get("filter").toLowerCase();
      }

      if (filter === undefined || filter.length < 1) {
        this.set("model", this.get("allWatchedWords"));
        return;
      }

      var matchesByAction = [];

      this.get("allWatchedWords").forEach(function (wordsForAction) {
        var wordRecords = wordsForAction.words.filter(function (wordRecord) {
          return wordRecord.word.indexOf(filter) > -1;
        });
        matchesByAction.pushObject(Ember.Object.create({
          nameKey: wordsForAction.nameKey,
          name: wordsForAction.name,
          words: wordRecords,
          count: wordRecords.length
        }));
      });

      this.set("model", matchesByAction);
    },


    filterContent: (0, _debounce.default)(function () {
      this.filterContentNow();
      this.set("filtered", !Ember.isEmpty(this.get("filter")));
    }, 250).observes("filter"),

    actions: {
      clearFilter: function clearFilter() {
        this.setProperties({ filter: "" });
      },
      toggleMenu: function toggleMenu() {
        $(".admin-detail").toggleClass("mobile-closed mobile-open");
      }
    }
  });
});
define("admin/controllers/admin-web-hooks-show-events", ["exports", "discourse/lib/ajax", "discourse/lib/ajax-error", "ember-addons/ember-computed-decorators"], function (exports, _ajax, _ajaxError, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("incomingCount"), (_obj = {
    pingDisabled: false,
    incomingEventIds: [],
    incomingCount: Ember.computed.alias("incomingEventIds.length"),

    hasIncoming: function hasIncoming(incomingCount) {
      return incomingCount > 0;
    },
    subscribe: function subscribe() {
      var _this = this;

      this.messageBus.subscribe("/web_hook_events/" + this.get("model.extras.web_hook_id"), function (data) {
        if (data.event_type === "ping") {
          _this.set("pingDisabled", false);
        }
        _this._addIncoming(data.web_hook_event_id);
      });
    },
    unsubscribe: function unsubscribe() {
      this.messageBus.unsubscribe("/web_hook_events/*");
    },
    _addIncoming: function _addIncoming(eventId) {
      var incomingEventIds = this.get("incomingEventIds");

      if (incomingEventIds.indexOf(eventId) === -1) {
        incomingEventIds.pushObject(eventId);
      }
    },


    actions: {
      loadMore: function loadMore() {
        this.get("model").loadMore();
      },
      ping: function ping() {
        var _this2 = this;

        this.set("pingDisabled", true);

        (0, _ajax.ajax)("/admin/api/web_hooks/" + this.get("model.extras.web_hook_id") + "/ping", {
          type: "POST"
        }).catch(function (error) {
          _this2.set("pingDisabled", false);
          (0, _ajaxError.popupAjaxError)(error);
        });
      },
      showInserted: function showInserted() {
        var _this3 = this;

        var webHookId = this.get("model.extras.web_hook_id");

        (0, _ajax.ajax)("/admin/api/web_hooks/" + webHookId + "/events/bulk", {
          type: "GET",
          data: { ids: this.get("incomingEventIds") }
        }).then(function (data) {
          var objects = data.map(function (event) {
            return _this3.store.createRecord("web-hook-event", event);
          });
          _this3.get("model").unshiftObjects(objects);
          _this3.set("incomingEventIds", []);
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "hasIncoming", [_dec], Object.getOwnPropertyDescriptor(_obj, "hasIncoming"), _obj)), _obj)));
});
define("admin/controllers/admin-web-hooks-show", ["exports", "discourse/lib/ajax-error", "discourse/lib/utilities", "ember-addons/ember-computed-decorators", "discourse/models/input-validation"], function (exports, _ajaxError, _utilities, _emberComputedDecorators, _inputValidation) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("model.isSaving", "saved", "saveButtonDisabled"), _dec2 = (0, _emberComputedDecorators.default)("model.isNew"), _dec3 = (0, _emberComputedDecorators.default)("model.secret"), _dec4 = (0, _emberComputedDecorators.default)("model.wildcard_web_hook", "model.web_hook_event_types.[]"), _dec5 = (0, _emberComputedDecorators.default)("model.isSaving", "secretValidation", "eventTypeValidation"), (_obj = {
    adminWebHooks: Ember.inject.controller(),
    eventTypes: Ember.computed.alias("adminWebHooks.eventTypes"),
    defaultEventTypes: Ember.computed.alias("adminWebHooks.defaultEventTypes"),
    contentTypes: Ember.computed.alias("adminWebHooks.contentTypes"),

    savingStatus: function savingStatus(isSaving, saved, saveButtonDisabled) {
      if (isSaving) {
        return I18n.t("saving");
      } else if (!saveButtonDisabled && saved) {
        return I18n.t("saved");
      }
      // Use side effect of validation to clear saved text
      this.set("saved", false);
      return "";
    },
    saveButtonText: function saveButtonText(isNew) {
      return isNew ? I18n.t("admin.web_hooks.create") : I18n.t("admin.web_hooks.save");
    },
    secretValidation: function secretValidation(secret) {
      if (!Ember.isEmpty(secret)) {
        if (secret.indexOf(" ") !== -1) {
          return _inputValidation.default.create({
            failed: true,
            reason: I18n.t("admin.web_hooks.secret_invalid")
          });
        }

        if (secret.length < 12) {
          return _inputValidation.default.create({
            failed: true,
            reason: I18n.t("admin.web_hooks.secret_too_short")
          });
        }
      }
    },
    eventTypeValidation: function eventTypeValidation(isWildcard, eventTypes) {
      if (!isWildcard && Ember.isEmpty(eventTypes)) {
        return _inputValidation.default.create({
          failed: true,
          reason: I18n.t("admin.web_hooks.event_type_missing")
        });
      }
    },
    saveButtonDisabled: function saveButtonDisabled(isSaving, secretValidation, eventTypeValidation) {
      return isSaving ? false : secretValidation || eventTypeValidation;
    },


    actions: {
      save: function save() {
        var _this = this;

        this.set("saved", false);
        var url = (0, _utilities.extractDomainFromUrl)(this.get("model.payload_url"));
        var model = this.get("model");
        var isNew = model.get("isNew");

        var saveWebHook = function saveWebHook() {
          return model.save().then(function () {
            _this.set("saved", true);
            _this.get("adminWebHooks").get("model").addObject(model);

            if (isNew) {
              _this.transitionToRoute("adminWebHooks.show", model.get("id"));
            }
          }).catch(_ajaxError.popupAjaxError);
        };

        if (url === "localhost" || url.match(/192\.168\.\d+\.\d+/) || url.match(/127\.\d+\.\d+\.\d+/) || url === Discourse.BaseUrl) {
          return bootbox.confirm(I18n.t("admin.web_hooks.warn_local_payload_url"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
            if (result) {
              return saveWebHook();
            }
          });
        }

        return saveWebHook();
      },
      destroy: function destroy() {
        var _this2 = this;

        return bootbox.confirm(I18n.t("admin.web_hooks.delete_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            var model = _this2.get("model");
            model.destroyRecord().then(function () {
              _this2.get("adminWebHooks").get("model").removeObject(model);
              _this2.transitionToRoute("adminWebHooks");
            }).catch(_ajaxError.popupAjaxError);
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "savingStatus", [_dec], Object.getOwnPropertyDescriptor(_obj, "savingStatus"), _obj), _applyDecoratedDescriptor(_obj, "saveButtonText", [_dec2], Object.getOwnPropertyDescriptor(_obj, "saveButtonText"), _obj), _applyDecoratedDescriptor(_obj, "secretValidation", [_dec3], Object.getOwnPropertyDescriptor(_obj, "secretValidation"), _obj), _applyDecoratedDescriptor(_obj, "eventTypeValidation", [_dec4], Object.getOwnPropertyDescriptor(_obj, "eventTypeValidation"), _obj), _applyDecoratedDescriptor(_obj, "saveButtonDisabled", [_dec5], Object.getOwnPropertyDescriptor(_obj, "saveButtonDisabled"), _obj)), _obj)));
});
define("admin/controllers/admin-web-hooks", ["exports", "discourse/lib/ajax-error"], function (exports, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      destroy: function destroy(webhook) {
        var _this = this;

        return bootbox.confirm(I18n.t("admin.web_hooks.delete_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (result) {
          if (result) {
            webhook.destroyRecord().then(function () {
              _this.get("model").removeObject(webhook);
            }).catch(_ajaxError.popupAjaxError);
          }
        });
      },
      loadMore: function loadMore() {
        this.get("model").loadMore();
      }
    }
  });
});
define("admin/controllers/admin", ["exports", "ember-addons/ember-computed-decorators"], function (exports, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  exports.default = Ember.Controller.extend((_dec = (0, _emberComputedDecorators.default)("siteSettings.enable_group_directory"), _dec2 = (0, _emberComputedDecorators.default)("siteSettings.enable_badges"), _dec3 = (0, _emberComputedDecorators.default)("application.currentPath"), (_obj = {
    application: Ember.inject.controller(),

    showGroups: function showGroups(enableGroupDirectory) {
      return !enableGroupDirectory;
    },
    showBadges: function showBadges(enableBadges) {
      return this.currentUser.get("admin") && enableBadges;
    },
    adminContentsClassName: function adminContentsClassName(currentPath) {
      return currentPath.split(".").filter(function (segment) {
        return segment !== "index" && segment !== "loading" && segment !== "show" && segment !== "admin";
      }).map(Ember.String.dasherize).join(" ");
    }
  }, (_applyDecoratedDescriptor(_obj, "showGroups", [_dec], Object.getOwnPropertyDescriptor(_obj, "showGroups"), _obj), _applyDecoratedDescriptor(_obj, "showBadges", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showBadges"), _obj), _applyDecoratedDescriptor(_obj, "adminContentsClassName", [_dec3], Object.getOwnPropertyDescriptor(_obj, "adminContentsClassName"), _obj)), _obj)));
});
define("admin/controllers/modals/admin-add-upload", ["exports", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "ember-addons/ember-computed-decorators", "discourse/lib/ajax-error"], function (exports, _modalFunctionality, _ajax, _emberComputedDecorators, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  var THEME_FIELD_VARIABLE_TYPE_IDS = [2, 3, 4];

  var SCSS_VARIABLE_NAMES = [
  // common/foundation/colors.scss
  "primary", "secondary", "tertiary", "quaternary", "header_background", "header_primary", "highlight", "danger", "success", "love",
  // common/foundation/math.scss
  "E", "PI", "LN2", "SQRT2",
  // common/foundation/variables.scss
  "small-width", "medium-width", "large-width", "google", "instagram", "facebook", "cas", "twitter", "yahoo", "github", "base-font-size", "base-line-height", "base-font-family", "primary-low", "primary-medium", "secondary-low", "secondary-medium", "tertiary-low", "quaternary-low", "highlight-low", "highlight-medium", "danger-low", "danger-medium", "success-low", "love-low"];

  exports.default = Ember.Controller.extend(_modalFunctionality.default, (_dec = (0, _emberComputedDecorators.default)("name", "adminCustomizeThemesShow.model.theme_fields"), _dec2 = (0, _emberComputedDecorators.default)("errorMessage"), _dec3 = (0, _emberComputedDecorators.observes)("name"), (_obj = {
    adminCustomizeThemesShow: Ember.inject.controller(),

    uploadUrl: "/admin/themes/upload_asset",

    onShow: function onShow() {
      this.set("name", null);
      this.set("fileSelected", false);
    },


    enabled: Em.computed.and("nameValid", "fileSelected"),
    disabled: Em.computed.not("enabled"),

    errorMessage: function errorMessage(name, themeFields) {
      if (name) {
        if (!name.match(/^[a-z_][a-z0-9_-]*$/i)) {
          return I18n.t("admin.customize.theme.variable_name_error.invalid_syntax");
        } else if (SCSS_VARIABLE_NAMES.includes(name.toLowerCase())) {
          return I18n.t("admin.customize.theme.variable_name_error.no_overwrite");
        } else if (themeFields.some(function (tf) {
          return THEME_FIELD_VARIABLE_TYPE_IDS.includes(tf.type_id) && name === tf.name;
        })) {
          return I18n.t("admin.customize.theme.variable_name_error.must_be_unique");
        }
      }

      return null;
    },
    nameValid: function nameValid(errorMessage) {
      return null === errorMessage;
    },
    uploadChanged: function uploadChanged() {
      var file = $("#file-input")[0];
      this.set("fileSelected", file && file.files[0]);
    },


    actions: {
      updateName: function updateName() {
        var name = this.get("name");
        if (Em.isEmpty(name)) {
          name = $("#file-input")[0].files[0].name;
          this.set("name", name.split(".")[0]);
        }
        this.uploadChanged();
      },
      upload: function upload() {
        var _this = this;

        var file = $("#file-input")[0].files[0];

        var options = {
          type: "POST",
          processData: false,
          contentType: false,
          data: new FormData()
        };

        options.data.append("file", file);

        (0, _ajax.ajax)(this.get("uploadUrl"), options).then(function (result) {
          var upload = {
            upload_id: result.upload_id,
            name: _this.get("name"),
            original_filename: file.name
          };
          _this.get("adminCustomizeThemesShow").send("addUpload", upload);
          _this.send("closeModal");
        }).catch(function (e) {
          (0, _ajaxError.popupAjaxError)(e);
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "errorMessage", [_dec], Object.getOwnPropertyDescriptor(_obj, "errorMessage"), _obj), _applyDecoratedDescriptor(_obj, "nameValid", [_dec2], Object.getOwnPropertyDescriptor(_obj, "nameValid"), _obj), _applyDecoratedDescriptor(_obj, "uploadChanged", [_dec3], Object.getOwnPropertyDescriptor(_obj, "uploadChanged"), _obj)), _obj)));
});
define("admin/controllers/modals/admin-badge-preview", ["exports", "discourse/lib/utilities"], function (exports, _utilities) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    sample: Ember.computed.alias("model.sample"),
    errors: Ember.computed.alias("model.errors"),
    count: Ember.computed.alias("model.grant_count"),

    count_warning: function () {
      if (this.get("count") <= 10) {
        return this.get("sample.length") !== this.get("count");
      } else {
        return this.get("sample.length") !== 10;
      }
    }.property("count", "sample.length"),

    has_query_plan: function () {
      return !!this.get("model.query_plan");
    }.property("model.query_plan"),

    query_plan_html: function () {
      var raw = this.get("model.query_plan"),
          returned = "<pre class='badge-query-plan'>";

      _.each(raw, function (linehash) {
        returned += (0, _utilities.escapeExpression)(linehash["QUERY PLAN"]);
        returned += "<br>";
      });

      returned += "</pre>";
      return returned;
    }.property("model.query_plan"),

    processed_sample: Ember.computed.map("model.sample", function (grant) {
      var i18nKey = "admin.badges.preview.grant.with",
          i18nParams = { username: (0, _utilities.escapeExpression)(grant.username) };

      if (grant.post_id) {
        i18nKey += "_post";
        i18nParams.link = "<a href='/p/" + grant.post_id + "' data-auto-route='true'>" + Handlebars.Utils.escapeExpression(grant.title) + "</a>";
      }

      if (grant.granted_at) {
        i18nKey += "_time";
        i18nParams.time = (0, _utilities.escapeExpression)(moment(grant.granted_at).format(I18n.t("dates.long_with_year")));
      }

      return I18n.t(i18nKey, i18nParams);
    })
  });
});
define("admin/controllers/modals/admin-color-scheme-select-base", ["exports", "discourse/mixins/modal-functionality"], function (exports, _modalFunctionality) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_modalFunctionality.default, {
    adminCustomizeColors: Ember.inject.controller(),

    actions: {
      selectBase: function selectBase() {
        this.get("adminCustomizeColors").send("newColorSchemeWithBase", this.get("selectedBaseThemeId"));
        this.send("closeModal");
      }
    }
  });
});
define("admin/controllers/modals/admin-create-theme", ["exports", "discourse/mixins/modal-functionality", "ember-addons/ember-computed-decorators", "discourse/lib/ajax-error", "admin/models/theme"], function (exports, _modalFunctionality, _emberComputedDecorators, _ajaxError, _theme) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

  var MIN_NAME_LENGTH = 4;

  exports.default = Ember.Controller.extend(_modalFunctionality.default, (_dec = (0, _emberComputedDecorators.default)("triggerError", "nameTooShort"), _dec2 = (0, _emberComputedDecorators.default)("name"), _dec3 = (0, _emberComputedDecorators.default)("component"), _dec4 = (0, _emberComputedDecorators.default)("themesController.currentTab"), _dec5 = (0, _emberComputedDecorators.default)("selectedType"), (_obj = {
    saving: false,
    triggerError: false,
    themesController: Ember.inject.controller("adminCustomizeThemes"),
    types: [{ name: I18n.t("admin.customize.theme.theme"), value: _theme.THEMES }, { name: I18n.t("admin.customize.theme.component"), value: _theme.COMPONENTS }],

    showError: function showError(trigger, tooShort) {
      return trigger && tooShort;
    },
    nameTooShort: function nameTooShort(name) {
      return !name || name.length < MIN_NAME_LENGTH;
    },
    placeholder: function placeholder(component) {
      if (component) {
        return I18n.t("admin.customize.theme.component_name");
      } else {
        return I18n.t("admin.customize.theme.theme_name");
      }
    },
    selectedType: function selectedType(tab) {
      return tab;
    },
    component: function component(type) {
      return type === _theme.COMPONENTS;
    },


    actions: {
      createTheme: function createTheme() {
        var _this = this;

        if (this.get("nameTooShort")) {
          this.set("triggerError", true);
          return;
        }

        this.set("saving", true);
        var theme = this.store.createRecord("theme");
        theme.save({ name: this.get("name"), component: this.get("component") }).then(function () {
          _this.get("themesController").send("addTheme", theme);
          _this.send("closeModal");
        }).catch(_ajaxError.popupAjaxError).finally(function () {
          return _this.set("saving", false);
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "showError", [_dec], Object.getOwnPropertyDescriptor(_obj, "showError"), _obj), _applyDecoratedDescriptor(_obj, "nameTooShort", [_dec2], Object.getOwnPropertyDescriptor(_obj, "nameTooShort"), _obj), _applyDecoratedDescriptor(_obj, "placeholder", [_dec3], Object.getOwnPropertyDescriptor(_obj, "placeholder"), _obj), _applyDecoratedDescriptor(_obj, "selectedType", [_dec4], Object.getOwnPropertyDescriptor(_obj, "selectedType"), _obj), _applyDecoratedDescriptor(_obj, "component", [_dec5], Object.getOwnPropertyDescriptor(_obj, "component"), _obj)), _obj)));
});
define("admin/controllers/modals/admin-edit-badge-groupings", ["exports", "discourse/lib/ajax", "discourse/mixins/modal-functionality"], function (exports, _ajax, _modalFunctionality) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_modalFunctionality.default, {
    modelChanged: function () {
      var model = this.get("model");
      var copy = Em.A();
      var store = this.store;

      if (model) {
        model.forEach(function (o) {
          copy.pushObject(store.createRecord("badge-grouping", o));
        });
      }

      this.set("workingCopy", copy);
    }.observes("model"),

    moveItem: function moveItem(item, delta) {
      var copy = this.get("workingCopy");
      var index = copy.indexOf(item);
      if (index + delta < 0 || index + delta >= copy.length) {
        return;
      }

      copy.removeAt(index);
      copy.insertAt(index + delta, item);
    },

    actions: {
      up: function up(item) {
        this.moveItem(item, -1);
      },
      down: function down(item) {
        this.moveItem(item, 1);
      },
      delete: function _delete(item) {
        this.get("workingCopy").removeObject(item);
      },
      cancel: function cancel() {
        this.set("model", null);
        this.set("workingCopy", null);
        this.send("closeModal");
      },
      edit: function edit(item) {
        item.set("editing", true);
      },
      save: function save(item) {
        item.set("editing", false);
      },
      add: function add() {
        var obj = this.store.createRecord("badge-grouping", {
          editing: true,
          name: I18n.t("admin.badges.badge_grouping")
        });
        this.get("workingCopy").pushObject(obj);
      },
      saveAll: function saveAll() {
        var self = this;
        var items = this.get("workingCopy");
        var groupIds = items.map(function (i) {
          return i.get("id") || -1;
        });
        var names = items.map(function (i) {
          return i.get("name");
        });

        (0, _ajax.ajax)("/admin/badges/badge_groupings", {
          data: { ids: groupIds, names: names },
          method: "POST"
        }).then(function (data) {
          items = self.get("model");
          items.clear();
          data.badge_groupings.forEach(function (g) {
            items.pushObject(self.store.createRecord("badge-grouping", g));
          });
          self.set("model", null);
          self.set("workingCopy", null);
          self.send("closeModal");
        }, function () {
          bootbox.alert(I18n.t("generic_error"));
        });
      }
    }
  });
});
define("admin/controllers/modals/admin-flags-received", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loadingFlags: null,
    user: null,

    onShow: function onShow() {
      var _this = this;

      this.set("loadingFlags", true);
      this.store.findAll("flagged-post", {
        filter: "without_custom",
        user_id: this.get("model.id")
      }).then(function (result) {
        _this.set("loadingFlags", false);
        console.log(result);
        _this.set("flaggedPosts", result);
      });
    }
  });
});
define("admin/controllers/modals/admin-import-theme", ["exports", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "discourse/lib/ajax-error", "ember-addons/ember-computed-decorators"], function (exports, _modalFunctionality, _ajax, _ajaxError, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Controller.extend(_modalFunctionality.default, (_dec = (0, _emberComputedDecorators.default)("loading", "remote", "uploadUrl", "local", "localFile"), _dec2 = (0, _emberComputedDecorators.observes)("privateChecked"), (_obj = {
    local: Ember.computed.equal("selection", "local"),
    remote: Ember.computed.equal("selection", "remote"),
    selection: "local",
    adminCustomizeThemes: Ember.inject.controller(),
    loading: false,
    keyGenUrl: "/admin/themes/generate_key_pair",
    importUrl: "/admin/themes/import",
    checkPrivate: Ember.computed.match("uploadUrl", /^git/),
    localFile: null,
    uploadUrl: null,

    importDisabled: function importDisabled(isLoading, isRemote, uploadUrl, isLocal, localFile) {
      return isLoading || isRemote && !uploadUrl || isLocal && !localFile;
    },
    privateWasChecked: function privateWasChecked() {
      var _this = this;

      var checked = this.get("privateChecked");
      if (checked && !this._keyLoading) {
        this._keyLoading = true;
        (0, _ajax.ajax)(this.get("keyGenUrl"), { method: "POST" }).then(function (pair) {
          _this.set("privateKey", pair.private_key);
          _this.set("publicKey", pair.public_key);
        }).catch(_ajaxError.popupAjaxError).finally(function () {
          _this._keyLoading = false;
        });
      }
    },


    actions: {
      uploadLocaleFile: function uploadLocaleFile() {
        this.set("localFile", $("#file-input")[0].files[0]);
      },
      importTheme: function importTheme() {
        var _this2 = this;

        var options = {
          type: "POST"
        };

        if (this.get("local")) {
          options.processData = false;
          options.contentType = false;
          options.data = new FormData();
          options.data.append("theme", this.get("localFile"));
        } else {
          options.data = {
            remote: this.get("uploadUrl"),
            branch: this.get("branch")
          };

          if (this.get("privateChecked")) {
            options.data.private_key = this.get("privateKey");
          }
        }

        this.set("loading", true);
        (0, _ajax.ajax)(this.get("importUrl"), options).then(function (result) {
          var theme = _this2.store.createRecord("theme", result.theme);
          _this2.get("adminCustomizeThemes").send("addTheme", theme);
          _this2.send("closeModal");
        }).then(function () {
          _this2.set("privateKey", null);
          _this2.set("publicKey", null);
        }).catch(_ajaxError.popupAjaxError).finally(function () {
          return _this2.set("loading", false);
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "importDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "importDisabled"), _obj), _applyDecoratedDescriptor(_obj, "privateWasChecked", [_dec2], Object.getOwnPropertyDescriptor(_obj, "privateWasChecked"), _obj)), _obj)));
});
define("admin/controllers/modals/admin-incoming-email", ["exports", "discourse/mixins/modal-functionality", "admin/models/incoming-email", "ember-addons/ember-computed-decorators", "discourse/lib/formatter", "discourse/lib/ajax-error"], function (exports, _modalFunctionality, _incomingEmail, _emberComputedDecorators, _formatter, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Controller.extend(_modalFunctionality.default, (_dec = (0, _emberComputedDecorators.default)("model.date"), (_obj = {
    date: function date(d) {
      return (0, _formatter.longDate)(d);
    },
    load: function load(id) {
      var _this = this;

      return _incomingEmail.default.find(id).then(function (result) {
        return _this.set("model", result);
      });
    },
    loadFromBounced: function loadFromBounced(id) {
      var _this2 = this;

      return _incomingEmail.default.findByBounced(id).then(function (result) {
        return _this2.set("model", result);
      }).catch(function (error) {
        _this2.send("closeModal");
        (0, _ajaxError.popupAjaxError)(error);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "date", [_dec], Object.getOwnPropertyDescriptor(_obj, "date"), _obj)), _obj)));
});
define("admin/controllers/modals/admin-moderation-history", ["exports", "discourse/mixins/modal-functionality"], function (exports, _modalFunctionality) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_modalFunctionality.default, {
    loading: null,
    historyTarget: null,
    history: null,

    onShow: function onShow() {
      this.set("loading", true);
      this.set("history", null);
    },
    loadHistory: function loadHistory(target) {
      var _this = this;

      this.store.findAll("moderation-history", target).then(function (result) {
        _this.set("history", result);
      }).finally(function () {
        return _this.set("loading", false);
      });
    }
  });
});
define("admin/controllers/modals/admin-silence-user", ["exports", "ember-addons/ember-computed-decorators", "admin/mixins/penalty-controller"], function (exports, _emberComputedDecorators, _penaltyController) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Controller.extend(_penaltyController.default, (_dec = (0, _emberComputedDecorators.default)("silenceUntil", "reason", "silencing"), (_obj = {
    silenceUntil: null,
    silencing: false,

    onShow: function onShow() {
      this.resetModal();
      this.setProperties({ silenceUntil: null, silencing: false });
    },
    submitDisabled: function submitDisabled(silenceUntil, reason, silencing) {
      return silencing || Ember.isEmpty(silenceUntil) || !reason || reason.length < 1;
    },


    actions: {
      silence: function silence() {
        var _this = this;

        if (this.get("submitDisabled")) {
          return;
        }

        this.set("silencing", true);
        this.penalize(function () {
          return _this.get("user").silence({
            silenced_till: _this.get("silenceUntil"),
            reason: _this.get("reason"),
            message: _this.get("message"),
            post_id: _this.get("post.id"),
            post_action: _this.get("postAction"),
            post_edit: _this.get("postEdit")
          });
        }).finally(function () {
          return _this.set("silencing", false);
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "submitDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj)), _obj)));
});
define("admin/controllers/modals/admin-staff-action-log-details", ["exports", "discourse/mixins/modal-functionality"], function (exports, _modalFunctionality) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_modalFunctionality.default);
});
define("admin/controllers/modals/admin-start-backup", ["exports", "discourse/mixins/modal-functionality"], function (exports, _modalFunctionality) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_modalFunctionality.default, {
    adminBackupsLogs: Ember.inject.controller(),

    actions: {
      startBackupWithUploads: function startBackupWithUploads() {
        this.send("closeModal");
        this.send("startBackup", true);
      },
      startBackupWithoutUploads: function startBackupWithoutUploads() {
        this.send("closeModal");
        this.send("startBackup", false);
      },
      cancel: function cancel() {
        this.send("closeModal");
      }
    }
  });
});
define("admin/controllers/modals/admin-suspend-user", ["exports", "ember-addons/ember-computed-decorators", "admin/mixins/penalty-controller"], function (exports, _emberComputedDecorators, _penaltyController) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = Ember.Controller.extend(_penaltyController.default, (_dec = (0, _emberComputedDecorators.default)("suspendUntil", "reason", "suspending"), (_obj = {
    suspendUntil: null,
    suspending: false,

    onShow: function onShow() {
      this.resetModal();
      this.setProperties({ suspendUntil: null, suspending: false });
    },
    submitDisabled: function submitDisabled(suspendUntil, reason, suspending) {
      return suspending || Ember.isEmpty(suspendUntil) || !reason || reason.length < 1;
    },


    actions: {
      suspend: function suspend() {
        var _this = this;

        if (this.get("submitDisabled")) {
          return;
        }

        this.set("suspending", true);

        this.penalize(function () {
          return _this.get("user").suspend({
            suspend_until: _this.get("suspendUntil"),
            reason: _this.get("reason"),
            message: _this.get("message"),
            post_id: _this.get("post.id"),
            post_action: _this.get("postAction"),
            post_edit: _this.get("postEdit")
          });
        }).finally(function () {
          return _this.set("suspending", false);
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "submitDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj)), _obj)));
});
define("admin/controllers/modals/admin-theme-change", ["exports", "discourse/mixins/modal-functionality", "discourse/lib/ajax"], function (exports, _modalFunctionality, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_modalFunctionality.default, {
    loadDiff: function loadDiff() {
      var _this = this;

      this.set("loading", true);
      (0, _ajax.ajax)("/admin/logs/staff_action_logs/" + this.get("model.id") + "/diff").then(function (diff) {
        _this.set("loading", false);
        _this.set("diff", diff.side_by_side);
      });
    }
  });
});
define("admin/controllers/modals/admin-uploaded-image-list", ["exports", "ember-addons/ember-computed-decorators", "discourse/mixins/modal-functionality"], function (exports, _emberComputedDecorators, _modalFunctionality) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = Ember.Controller.extend(_modalFunctionality.default, (_dec = (0, _emberComputedDecorators.on)("init"), _dec2 = (0, _emberComputedDecorators.observes)("model.value"), (_obj = {
    _setup: function _setup() {
      var value = this.get("model.value");
      this.set("images", value && value.length ? value.split("\n") : []);
    },


    actions: {
      uploadDone: function uploadDone(_ref) {
        var url = _ref.url;

        this.get("images").addObject(url);
      },
      remove: function remove(url) {
        this.get("images").removeObject(url);
      },
      close: function close() {
        this.save(this.get("images").join("\n"));
        this.send("closeModal");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_setup", [_dec, _dec2], Object.getOwnPropertyDescriptor(_obj, "_setup"), _obj)), _obj)));
});
define("admin/helpers/check-icon", ["discourse-common/lib/helpers", "discourse-common/lib/icon-library"], function (_helpers, _iconLibrary) {
  "use strict";

  (0, _helpers.registerUnbound)("check-icon", function (value) {
    var icon = value ? "check" : "times";
    return new Handlebars.SafeString((0, _iconLibrary.renderIcon)("string", icon));
  });
});
define("admin/helpers/disposition-icon", ["exports", "discourse-common/lib/icon-library"], function (exports, _iconLibrary) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = Ember.Helper.extend({
    compute: function compute(_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          disposition = _ref2[0];

      if (!disposition) {
        return null;
      }
      var icon = void 0;
      var title = "admin.flags.dispositions." + disposition;
      switch (disposition) {
        case "deferred":
          {
            icon = "external-link";
            break;
          }
        case "agreed":
          {
            icon = "thumbs-o-up";
            break;
          }
        case "disagreed":
          {
            icon = "thumbs-o-down";
            break;
          }
      }
      return (0, _iconLibrary.iconHTML)(icon, { title: title }).htmlSafe();
    }
  });
});
define("admin/helpers/human-size", ["exports", "discourse-common/lib/helpers"], function (exports, _helpers) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = (0, _helpers.htmlHelper)(function (size) {
    return I18n.toHumanSize(size);
  });
});
define("admin/helpers/post-action-title", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function postActionTitle(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        nameKey = _ref2[1];

    var title = I18n.t("admin.flags.short_names." + nameKey, {
      defaultValue: null
    });

    // TODO: We can remove this once other translations have been updated
    if (!title) {
      return I18n.t("admin.flags.summary.action_type_" + id, { count: 1 });
    }

    return title;
  }

  exports.default = Ember.Helper.helper(postActionTitle);
});
define("admin/helpers/preserve-newlines", ["exports", "discourse-common/lib/helpers", "discourse/lib/utilities"], function (exports, _helpers, _utilities) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = (0, _helpers.htmlHelper)(function (str) {
    return (0, _utilities.escapeExpression)(str).replace(/\n/g, "<br>");
  });
});
define("admin/helpers/value-at-tl", ["discourse-common/lib/helpers"], function (_helpers) {
  "use strict";

  (0, _helpers.registerUnbound)("value-at-tl", function (data, params) {
    var tl = parseInt(params.level, 10);
    if (data) {
      var item = data.find(function (d) {
        return parseInt(d.x, 10) === tl;
      });
      if (item) {
        return item.y;
      } else {
        return 0;
      }
    }
  });
});
define("admin/mixins/penalty-controller", ["exports", "discourse/mixins/modal-functionality", "discourse/lib/ajax-error"], function (exports, _modalFunctionality, _ajaxError) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Mixin.create(_modalFunctionality.default, {
    reason: null,
    message: null,
    postEdit: null,
    postAction: null,
    user: null,
    post: null,
    successCallback: null,

    resetModal: function resetModal() {
      this.setProperties({
        reason: null,
        message: null,
        loadingUser: true,
        post: null,
        postEdit: null,
        postAction: "delete",
        before: null,
        successCallback: null
      });
    },
    penalize: function penalize(cb) {
      var _this = this;

      var before = this.get("before");
      var promise = before ? before() : Ember.RSVP.resolve();

      return promise.then(function () {
        return cb();
      }).then(function (result) {
        _this.send("closeModal");
        var callback = _this.get("successCallback");
        if (callback) {
          callback(result);
        }
      }).catch(_ajaxError.popupAjaxError);
    }
  });
});
define("admin/mixins/period-computation", ["exports", "discourse/lib/url", "ember-addons/ember-computed-decorators"], function (exports, _url, _emberComputedDecorators) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

  exports.default = Ember.Mixin.create((_dec = (0, _emberComputedDecorators.default)("period"), _dec2 = (0, _emberComputedDecorators.default)(), _dec3 = (0, _emberComputedDecorators.default)(), _dec4 = (0, _emberComputedDecorators.default)(), _dec5 = (0, _emberComputedDecorators.default)(), (_obj = {
    queryParams: ["period"],

    period: "monthly",

    availablePeriods: ["yearly", "quarterly", "monthly", "weekly"],

    startDate: function startDate(period) {
      var fullDay = moment().locale("en").utc().subtract(1, "day");

      switch (period) {
        case "yearly":
          return fullDay.subtract(1, "year").startOf("day");
          break;
        case "quarterly":
          return fullDay.subtract(3, "month").startOf("day");
          break;
        case "weekly":
          return fullDay.subtract(1, "week").startOf("day");
          break;
        case "monthly":
          return fullDay.subtract(1, "month").startOf("day");
          break;
        default:
          return fullDay.subtract(1, "month").startOf("day");
      }
    },
    lastWeek: function lastWeek() {
      return moment().locale("en").utc().endOf("day").subtract(1, "week");
    },
    lastMonth: function lastMonth() {
      return moment().locale("en").utc().startOf("day").subtract(1, "month");
    },
    endDate: function endDate() {
      return moment().locale("en").utc().subtract(1, "day").endOf("day");
    },
    today: function today() {
      return moment().locale("en").utc().endOf("day");
    },


    actions: {
      changePeriod: function changePeriod(period) {
        _url.default.routeTo(this._reportsForPeriodURL(period));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "startDate", [_dec], Object.getOwnPropertyDescriptor(_obj, "startDate"), _obj), _applyDecoratedDescriptor(_obj, "lastWeek", [_dec2], Object.getOwnPropertyDescriptor(_obj, "lastWeek"), _obj), _applyDecoratedDescriptor(_obj, "lastMonth", [_dec3], Object.getOwnPropertyDescriptor(_obj, "lastMonth"), _obj), _applyDecoratedDescriptor(_obj, "endDate", [_dec4], Object.getOwnPropertyDescriptor(_obj, "endDate"), _obj), _applyDecoratedDescriptor(_obj, "today", [_dec5], Object.getOwnPropertyDescriptor(_obj, "today"), _obj)), _obj)));
});
define("admin/mixins/setting-component", ["exports", "ember-addons/ember-computed-decorators", "discourse/helpers/category-link"], function (exports, _emberComputedDecorators, _categoryLink) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _desc, _value, _obj;

  var CUSTOM_TYPES = ["bool", "enum", "list", "url_list", "host_list", "category_list", "value_list", "category", "uploaded_image_list", "compact_list", "secret_list"];

  exports.default = Ember.Mixin.create((_dec = (0, _emberComputedDecorators.default)("buffered.value", "setting.value"), _dec2 = (0, _emberComputedDecorators.default)("setting", "buffered.value"), _dec3 = (0, _emberComputedDecorators.default)("componentType"), _dec4 = (0, _emberComputedDecorators.default)("setting.setting"), _dec5 = (0, _emberComputedDecorators.default)("type"), _dec6 = (0, _emberComputedDecorators.default)("setting"), _dec7 = (0, _emberComputedDecorators.default)("typeClass"), (_obj = {
    classNameBindings: [":row", ":setting", "setting.overridden", "typeClass"],
    content: Ember.computed.alias("setting"),
    validationMessage: null,
    isSecret: Ember.computed.oneWay("setting.secret"),

    dirty: function dirty(bufferVal, settingVal) {
      if (bufferVal === null || bufferVal === undefined) bufferVal = "";
      if (settingVal === null || settingVal === undefined) settingVal = "";

      return bufferVal.toString() !== settingVal.toString();
    },
    preview: function preview(setting, value) {
      // A bit hacky, but allows us to use helpers
      if (setting.get("setting") === "category_style") {
        var category = this.site.get("categories.firstObject");
        if (category) {
          return (0, _categoryLink.categoryLinkHTML)(category, {
            categoryStyle: value
          });
        }
      }

      var preview = setting.get("preview");
      if (preview) {
        return new Handlebars.SafeString("<div class='preview'>" + preview.replace(/\{\{value\}\}/g, value) + "</div>");
      }
    },
    typeClass: function typeClass(componentType) {
      return componentType.replace(/\_/g, "-");
    },
    settingName: function settingName(setting) {
      return setting.replace(/\_/g, " ");
    },
    componentType: function componentType(type) {
      return CUSTOM_TYPES.indexOf(type) !== -1 ? type : "string";
    },
    type: function type(setting) {
      if (setting.type === "list" && setting.list_type) {
        return setting.list_type + "_list";
      }

      return setting.type;
    },
    componentName: function componentName(typeClass) {
      return "site-settings/" + typeClass;
    },


    _watchEnterKey: function () {
      var self = this;
      this.$().on("keydown.setting-enter", ".input-setting-string", function (e) {
        if (e.keyCode === 13) {
          // enter key
          self.send("save");
        }
      });
    }.on("didInsertElement"),

    _removeBindings: function () {
      this.$().off("keydown.setting-enter");
    }.on("willDestroyElement"),

    _save: function _save() {
      Em.warn("You should define a `_save` method", {
        id: "admin.mixins.setting-component"
      });
      return Ember.RSVP.resolve();
    },


    actions: {
      save: function save() {
        var _this = this;

        this._save().then(function () {
          _this.set("validationMessage", null);
          _this.commitBuffer();
        }).catch(function (e) {
          if (e.jqXHR.responseJSON && e.jqXHR.responseJSON.errors) {
            _this.set("validationMessage", e.jqXHR.responseJSON.errors[0]);
          } else {
            _this.set("validationMessage", I18n.t("generic_error"));
          }
        });
      },
      cancel: function cancel() {
        this.rollbackBuffer();
      },
      resetDefault: function resetDefault() {
        this.set("buffered.value", this.get("setting.default"));
        this.send("save");
      },
      toggleSecret: function toggleSecret() {
        this.toggleProperty("isSecret");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "dirty", [_dec], Object.getOwnPropertyDescriptor(_obj, "dirty"), _obj), _applyDecoratedDescriptor(_obj, "preview", [_dec2], Object.getOwnPropertyDescriptor(_obj, "preview"), _obj), _applyDecoratedDescriptor(_obj, "typeClass", [_dec3], Object.getOwnPropertyDescriptor(_obj, "typeClass"), _obj), _applyDecoratedDescriptor(_obj, "settingName", [_dec4], Object.getOwnPropertyDescriptor(_obj, "settingName"), _obj), _applyDecoratedDescriptor(_obj, "componentType", [_dec5], Object.getOwnPropertyDescriptor(_obj, "componentType"), _obj), _applyDecoratedDescriptor(_obj, "type", [_dec6], Object.getOwnPropertyDescriptor(_obj, "type"), _obj), _applyDecoratedDescriptor(_obj, "componentName", [_dec7], Object.getOwnPropertyDescriptor(_obj, "componentName"), _obj)), _obj)));
});
define("admin/mixins/setting-object", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Mixin.create({
    overridden: function () {
      var val = this.get("value"),
          defaultVal = this.get("default");

      if (val === null) val = "";
      if (defaultVal === null) defaultVal = "";

      return val.toString() !== defaultVal.toString();
    }.property("value", "default"),

    validValues: function () {
      var vals = [],
          translateNames = this.get("translate_names");

      this.get("valid_values").forEach(function (v) {
        if (v.name && v.name.length > 0 && translateNames) {
          vals.addObject({ name: I18n.t(v.name), value: v.value });
        } else {
          vals.addObject(v);
        }
      });
      return vals;
    }.property("valid_values"),

    allowsNone: function () {
      if (_.indexOf(this.get("valid_values"), "") >= 0) return "admin.settings.none";
    }.property("valid_values")
  });
});
define("admin/routes/admin-api-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo("adminApiKeys");
    }
  });
});
define("admin/routes/admin-api-keys", ["exports", "admin/models/api-key"], function (exports, _apiKey) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return _apiKey.default.find();
    }
  });
});
define("admin/routes/admin-backups-index", ["exports", "admin/models/backup"], function (exports, _backup) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    activate: function activate() {
      var _this = this;

      this.messageBus.subscribe("/admin/backups", function (backups) {
        return _this.controller.set("model", backups.map(function (backup) {
          return _backup.default.create(backup);
        }));
      });
    },
    model: function model() {
      return _backup.default.find();
    },
    deactivate: function deactivate() {
      this.messageBus.unsubscribe("/admin/backups");
    }
  });
});
define("admin/routes/admin-backups-logs", ["exports", "preload-store"], function (exports, _preloadStore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    // since the logs are pushed via the message bus
    // we only want to preload them (hence the beforeModel hook)
    beforeModel: function beforeModel() {
      var logs = this.controllerFor("adminBackupsLogs").get("logs");
      // preload the logs if any
      _preloadStore.default.getAndRemove("logs").then(function (preloadedLogs) {
        if (preloadedLogs && preloadedLogs.length) {
          // we need to filter out message like: "[SUCCESS]"
          // and convert POJOs to Ember Objects
          var newLogs = _.chain(preloadedLogs).reject(function (log) {
            return log.message.length === 0 || log.message[0] === "[";
          }).map(function (log) {
            return Em.Object.create(log);
          }).value();
          logs.pushObjects(newLogs);
        }
      });
    },
    setupController: function setupController() {
      /* prevent default behavior */
    }
  });
});
define("admin/routes/admin-backups", ["exports", "discourse/lib/ajax", "discourse/lib/show-modal", "admin/models/backup-status", "admin/models/backup", "preload-store"], function (exports, _ajax, _showModal, _backupStatus, _backup, _preloadStore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var LOG_CHANNEL = "/admin/backups/logs";

  exports.default = Discourse.Route.extend({
    activate: function activate() {
      var _this = this;

      this.messageBus.subscribe(LOG_CHANNEL, function (log) {
        if (log.message === "[STARTED]") {
          Discourse.User.currentProp("hideReadOnlyAlert", true);
          _this.controllerFor("adminBackups").set("model.isOperationRunning", true);
          _this.controllerFor("adminBackupsLogs").get("logs").clear();
        } else if (log.message === "[FAILED]") {
          _this.controllerFor("adminBackups").set("model.isOperationRunning", false);
          bootbox.alert(I18n.t("admin.backups.operations.failed", {
            operation: log.operation
          }));
        } else if (log.message === "[SUCCESS]") {
          Discourse.User.currentProp("hideReadOnlyAlert", false);
          _this.controllerFor("adminBackups").set("model.isOperationRunning", false);
          if (log.operation === "restore") {
            // redirect to homepage when the restore is done (session might be lost)
            window.location.pathname = Discourse.getURL("/");
          }
        } else {
          _this.controllerFor("adminBackupsLogs").get("logs").pushObject(Em.Object.create(log));
        }
      });
    },
    model: function model() {
      return _preloadStore.default.getAndRemove("operations_status", function () {
        return (0, _ajax.ajax)("/admin/backups/status.json");
      }).then(function (status) {
        return _backupStatus.default.create({
          isOperationRunning: status.is_operation_running,
          canRollback: status.can_rollback,
          allowRestore: status.allow_restore
        });
      });
    },
    deactivate: function deactivate() {
      this.messageBus.unsubscribe(LOG_CHANNEL);
    },


    actions: {
      showStartBackupModal: function showStartBackupModal() {
        (0, _showModal.default)("admin-start-backup", { admin: true });
        this.controllerFor("modal").set("modalClass", "start-backup-modal");
      },
      startBackup: function startBackup(withUploads) {
        this.transitionTo("admin.backups.logs");
        _backup.default.start(withUploads);
      },
      destroyBackup: function destroyBackup(backup) {
        var self = this;
        bootbox.confirm(I18n.t("admin.backups.operations.destroy.confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (confirmed) {
          if (confirmed) {
            backup.destroy().then(function () {
              self.controllerFor("adminBackupsIndex").get("model").removeObject(backup);
            });
          }
        });
      },
      startRestore: function startRestore(backup) {
        var self = this;
        bootbox.confirm(I18n.t("admin.backups.operations.restore.confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (confirmed) {
          if (confirmed) {
            self.transitionTo("admin.backups.logs");
            backup.restore();
          }
        });
      },
      cancelOperation: function cancelOperation() {
        var self = this;
        bootbox.confirm(I18n.t("admin.backups.operations.cancel.confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (confirmed) {
          if (confirmed) {
            _backup.default.cancel().then(function () {
              self.controllerFor("adminBackups").set("model.isOperationRunning", false);
            });
          }
        });
      },
      rollback: function rollback() {
        bootbox.confirm(I18n.t("admin.backups.operations.rollback.confirm"), I18n.t("no_value"), I18n.t("yes_value"), function (confirmed) {
          if (confirmed) {
            _backup.default.rollback();
          }
        });
      },
      uploadSuccess: function uploadSuccess(filename) {
        bootbox.alert(I18n.t("admin.backups.upload.success", { filename: filename }));
      },
      uploadError: function uploadError(filename, message) {
        bootbox.alert(I18n.t("admin.backups.upload.error", {
          filename: filename,
          message: message
        }));
      },
      remoteUploadSuccess: function remoteUploadSuccess() {
        var _this2 = this;

        _backup.default.find().then(function (backups) {
          _this2.controllerFor("adminBackupsIndex").set("model", backups.map(function (backup) {
            return _backup.default.create(backup);
          }));
        });
      }
    }
  });
});
define("admin/routes/admin-badges-show", ["exports", "discourse/lib/ajax", "discourse/models/badge", "discourse/lib/show-modal"], function (exports, _ajax, _badge, _showModal) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    serialize: function serialize(m) {
      return { badge_id: Em.get(m, "id") || "new" };
    },
    model: function model(params) {
      if (params.badge_id === "new") {
        return _badge.default.create({
          name: I18n.t("admin.badges.new_badge")
        });
      }
      return this.modelFor("adminBadges").findBy("id", parseInt(params.badge_id));
    },


    actions: {
      saveError: function saveError(e) {
        var msg = I18n.t("generic_error");
        if (e.responseJSON && e.responseJSON.errors) {
          msg = I18n.t("generic_error_with_reason", {
            error: e.responseJSON.errors.join(". ")
          });
        }
        bootbox.alert(msg);
      },
      editGroupings: function editGroupings() {
        var model = this.controllerFor("admin-badges").get("badgeGroupings");
        (0, _showModal.default)("admin-edit-badge-groupings", { model: model, admin: true });
      },
      preview: function preview(badge, explain) {
        badge.set("preview_loading", true);
        (0, _ajax.ajax)("/admin/badges/preview.json", {
          method: "post",
          data: {
            sql: badge.get("query"),
            target_posts: !!badge.get("target_posts"),
            trigger: badge.get("trigger"),
            explain: explain
          }
        }).then(function (model) {
          badge.set("preview_loading", false);
          (0, _showModal.default)("admin-badge-preview", { model: model, admin: true });
        }).catch(function (error) {
          badge.set("preview_loading", false);
          Em.Logger.error(error);
          bootbox.alert("Network error");
        });
      }
    }
  });
});
define("admin/routes/admin-badges", ["exports", "discourse/lib/ajax", "discourse/models/badge", "discourse/models/badge-grouping"], function (exports, _ajax, _badge, _badgeGrouping) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    _json: null,

    model: function model() {
      var _this = this;

      return (0, _ajax.ajax)("/admin/badges.json").then(function (json) {
        _this._json = json;
        return _badge.default.createFromJson(json);
      });
    },
    setupController: function setupController(controller, model) {
      var json = this._json;
      var badgeTriggers = [];
      var badgeGroupings = [];

      _.each(json.admin_badges.triggers, function (v, k) {
        badgeTriggers.push({
          id: v,
          name: I18n.t("admin.badges.trigger_type." + k)
        });
      });

      json.badge_groupings.forEach(function (badgeGroupingJson) {
        badgeGroupings.push(_badgeGrouping.default.create(badgeGroupingJson));
      });

      controller.setProperties({
        badgeGroupings: badgeGroupings,
        badgeTypes: json.badge_types,
        protectedSystemFields: json.admin_badges.protected_system_fields,
        badgeTriggers: badgeTriggers,
        model: model
      });
    }
  });
});
define("admin/routes/admin-customize-colors-show", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      var all = this.modelFor("adminCustomize.colors");
      var model = all.findBy("id", parseInt(params.scheme_id));
      return model ? model : this.replaceWith("adminCustomize.colors.index");
    },
    serialize: function serialize(model) {
      return { scheme_id: model.get("id") };
    },
    setupController: function setupController(controller, model) {
      controller.set("model", model);
      controller.set("allColors", this.modelFor("adminCustomize.colors"));
    }
  });
});
define("admin/routes/admin-customize-colors", ["exports", "admin/models/color-scheme"], function (exports, _colorScheme) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return _colorScheme.default.findAll();
    },
    setupController: function setupController(controller, model) {
      controller.set("model", model);
    }
  });
});
define("admin/routes/admin-customize-email-templates-edit", ["exports", "discourse/mixins/scroll-top"], function (exports, _scrollTop) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      var all = this.modelFor("adminCustomizeEmailTemplates");
      return all.findBy("id", params.id);
    },
    setupController: function setupController(controller, emailTemplate) {
      controller.setProperties({ emailTemplate: emailTemplate, saved: false });
      (0, _scrollTop.scrollTop)();
    }
  });
});
define("admin/routes/admin-customize-email-templates", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll("email-template");
    },
    setupController: function setupController(controller, model) {
      controller.set("emailTemplates", model);
    }
  });
});
define("admin/routes/admin-customize-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo("adminCustomizeThemes");
    }
  });
});
define("admin/routes/admin-customize-themes-edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      var all = this.modelFor("adminCustomizeThemes");
      var model = all.findBy("id", parseInt(params.theme_id));
      return model ? {
        model: model,
        target: params.target,
        field_name: params.field_name
      } : this.replaceWith("adminCustomizeThemes.index");
    },
    serialize: function serialize(wrapper) {
      return {
        model: wrapper.model,
        target: wrapper.target || "common",
        field_name: wrapper.field_name || "scss",
        theme_id: wrapper.model.get("id")
      };
    },
    setupController: function setupController(controller, wrapper) {
      var fields = controller.fieldsForTarget(wrapper.target);
      if (!fields.includes(wrapper.field_name)) {
        this.transitionTo("adminCustomizeThemes.edit", wrapper.model.id, wrapper.target, fields[0]);
        return;
      }
      controller.set("model", wrapper.model);
      controller.setTargetName(wrapper.target || "common");
      controller.set("fieldName", wrapper.field_name || "scss");
      this.controllerFor("adminCustomizeThemes").set("editingTheme", true);
      this.set("shouldAlertUnsavedChanges", true);
    },


    actions: {
      willTransition: function willTransition(transition) {
        var _this = this;

        if (this.get("controller.model.changed") && this.get("shouldAlertUnsavedChanges") && transition.intent.name !== this.routeName) {
          transition.abort();
          bootbox.confirm(I18n.t("admin.customize.theme.unsaved_changes_alert"), I18n.t("admin.customize.theme.discard"), I18n.t("admin.customize.theme.stay"), function (result) {
            if (!result) {
              _this.set("shouldAlertUnsavedChanges", false);
              transition.retry();
            }
          });
        }
      }
    }
  });
});
define("admin/routes/admin-customize-themes-index", ["exports", "discourse/lib/text"], function (exports, _text) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var externalResources = [{
    key: "admin.customize.theme.beginners_guide_title",
    link: "https://meta.discourse.org/t/91966",
    icon: "book"
  }, {
    key: "admin.customize.theme.developers_guide_title",
    link: "https://meta.discourse.org/t/93648",
    icon: "book"
  }, {
    key: "admin.customize.theme.browse_themes",
    link: "https://meta.discourse.org/c/theme",
    icon: "paint-brush"
  }];

  exports.default = Ember.Route.extend({
    setupController: function setupController(controller) {
      this._super.apply(this, arguments);
      this.controllerFor("adminCustomizeThemes").set("editingTheme", false);
      controller.setProperties({
        externalResources: externalResources,
        womanArtistEmojiURL: (0, _text.emojiUrlFor)("woman_artist:t5")
      });
    }
  });
});
define("admin/routes/admin-customize-themes-show", ["exports", "discourse/mixins/scroll-top", "admin/models/theme"], function (exports, _scrollTop, _theme) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    serialize: function serialize(model) {
      return { theme_id: model.get("id") };
    },
    model: function model(params) {
      var all = this.modelFor("adminCustomizeThemes");
      var model = all.findBy("id", parseInt(params.theme_id));
      return model ? model : this.replaceWith("adminCustomizeTheme.index");
    },
    setupController: function setupController(controller, model) {
      this._super.apply(this, arguments);

      var parentController = this.controllerFor("adminCustomizeThemes");
      parentController.setProperties({
        editingTheme: false,
        currentTab: model.get("component") ? _theme.COMPONENTS : _theme.THEMES
      });

      controller.setProperties({
        model: model,
        parentController: parentController,
        allThemes: parentController.get("model"),
        colorSchemeId: model.get("color_scheme_id"),
        colorSchemes: parentController.get("model.extras.color_schemes")
      });

      this.handleHighlight(model);
    },
    deactivate: function deactivate() {
      this.handleHighlight();
    },
    handleHighlight: function handleHighlight(theme) {
      this.get("controller.allThemes").filter(function (t) {
        return t.get("selected");
      }).forEach(function (t) {
        return t.set("selected", false);
      });
      if (theme) {
        theme.set("selected", true);
      }
    },


    actions: {
      didTransition: function didTransition() {
        (0, _scrollTop.scrollTop)();
      }
    }
  });
});
define("admin/routes/admin-customize-themes", ["exports", "discourse/lib/show-modal"], function (exports, _showModal) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll("theme");
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set("editingTheme", false);
    },


    actions: {
      importModal: function importModal() {
        (0, _showModal.default)("admin-import-theme", { admin: true });
      },
      addTheme: function addTheme(theme) {
        var all = this.modelFor("adminCustomizeThemes");
        all.pushObject(theme);
        this.transitionTo("adminCustomizeThemes.show", theme.get("id"));
      },
      showCreateModal: function showCreateModal() {
        (0, _showModal.default)("admin-create-theme", { admin: true });
      }
    }
  });
});
define("admin/routes/admin-dashboard-next-general", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    activate: function activate() {
      this.controllerFor("admin-dashboard-next-general").fetchDashboard();
    }
  });
});
define("admin/routes/admin-dashboard-next", ["exports", "discourse/mixins/scroll-top"], function (exports, _scrollTop) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    activate: function activate() {
      this.controllerFor("admin-dashboard-next").fetchProblems();
      this.controllerFor("admin-dashboard-next").fetchDashboard();
      (0, _scrollTop.scrollTop)();
    }
  });
});
define("admin/routes/admin-dashboard", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    setupController: function setupController(controller) {
      controller.fetchDashboard();
    }
  });
});
define("admin/routes/admin-email-bounced", ["exports", "discourse/lib/show-modal", "admin/routes/admin-email-logs"], function (exports, _showModal, _adminEmailLogs) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailLogs.default.extend({
    status: "bounced",

    actions: {
      showIncomingEmail: function showIncomingEmail(id) {
        (0, _showModal.default)("admin-incoming-email", { admin: true });
        this.controllerFor("modals/admin-incoming-email").loadFromBounced(id);
      }
    }
  });
});
define("admin/routes/admin-email-incomings", ["exports", "admin/models/incoming-email"], function (exports, _incomingEmail) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return _incomingEmail.default.findAll({ status: this.get("status") });
    },
    setupController: function setupController(controller, model) {
      controller.set("model", model);
      controller.set("filter", { status: this.get("status") });
    }
  });
});
define("admin/routes/admin-email-index", ["exports", "admin/models/email-settings"], function (exports, _emailSettings) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return _emailSettings.default.find();
    }
  });
});
define("admin/routes/admin-email-logs", ["exports", "admin/models/email-log"], function (exports, _emailLog) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return _emailLog.default.findAll({ status: this.get("status") });
    },
    setupController: function setupController(controller, model) {
      controller.set("model", model);
      controller.set("filter", { status: this.get("status") });
    }
  });
});
define("admin/routes/admin-email-preview-digest", ["exports", "admin/models/email-preview"], function (exports, _emailPreview) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return _emailPreview.default.findDigest(this.currentUser.get("username"));
    },
    afterModel: function afterModel(model) {
      var controller = this.controllerFor("adminEmailPreviewDigest");
      controller.setProperties({
        model: model,
        username: this.currentUser.get("username"),
        lastSeen: (0, _emailPreview.oneWeekAgo)(),
        showHtml: true
      });
    }
  });
});
define("admin/routes/admin-email-received", ["exports", "admin/routes/admin-email-incomings"], function (exports, _adminEmailIncomings) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailIncomings.default.extend({ status: "received" });
});
define("admin/routes/admin-email-rejected", ["exports", "discourse/lib/show-modal", "admin/routes/admin-email-incomings"], function (exports, _showModal, _adminEmailIncomings) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailIncomings.default.extend({
    status: "rejected",

    actions: {
      showIncomingEmail: function showIncomingEmail(id) {
        (0, _showModal.default)("admin-incoming-email", { admin: true });
        this.controllerFor("modals/admin-incoming-email").load(id);
      }
    }
  });
});
define("admin/routes/admin-email-sent", ["exports", "admin/routes/admin-email-logs"], function (exports, _adminEmailLogs) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailLogs.default.extend({ status: "sent" });
});
define("admin/routes/admin-email-skipped", ["exports", "admin/routes/admin-email-logs"], function (exports, _adminEmailLogs) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adminEmailLogs.default.extend({ status: "skipped" });
});
define("admin/routes/admin-embedding", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.find("embedding");
    },
    setupController: function setupController(controller, model) {
      controller.set("embedding", model);
    }
  });
});
define("admin/routes/admin-emojis", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return (0, _ajax.ajax)("/admin/customize/emojis.json").then(function (emojis) {
        return emojis.map(function (emoji) {
          return Ember.Object.create(emoji);
        });
      });
    }
  });
});
define("admin/routes/admin-flags-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    redirect: function redirect() {
      var segment = this.siteSettings.flags_default_topics ? "topics" : "postsActive";
      this.replaceWith("adminFlags." + segment);
    }
  });
});
define("admin/routes/admin-flags-posts-active", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return this.store.findAll("flagged-post", { filter: "active" });
    }
  });
});
define("admin/routes/admin-flags-posts-old", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return this.store.findAll("flagged-post", { filter: "old" });
    }
  });
});
define("admin/routes/admin-flags-topics-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return this.store.findAll("flagged-topic");
    },
    setupController: function setupController(controller, model) {
      controller.set("flaggedTopics", model);
    }
  });
});
define("admin/routes/admin-flags-topics-show", ["exports", "discourse/models/topic"], function (exports, _topic) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      var topicRecord = this.store.createRecord("topic", { id: params.id });
      var topic = (0, _topic.loadTopicView)(topicRecord).then(function () {
        return topicRecord;
      });

      return Ember.RSVP.hash({
        topic: topic,
        flaggedPosts: this.store.findAll("flagged-post", {
          filter: "active",
          topic_id: params.id
        })
      });
    },
    setupController: function setupController(controller, hash) {
      controller.setProperties(hash);
    }
  });
});
define("admin/routes/admin-logs-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    redirect: function redirect() {
      this.transitionTo("adminLogs.staffActionLogs");
    }
  });
});
define("admin/routes/admin-logs-screened-emails", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    renderTemplate: function renderTemplate() {
      this.render("admin/templates/logs/screened-emails", { into: "adminLogs" });
    },

    setupController: function setupController() {
      return this.controllerFor("adminLogsScreenedEmails").show();
    }
  });
});
define("admin/routes/admin-logs-screened-ip-addresses", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    renderTemplate: function renderTemplate() {
      this.render("admin/templates/logs/screened-ip-addresses", {
        into: "adminLogs"
      });
    },
    setupController: function setupController() {
      return this.controllerFor("adminLogsScreenedIpAddresses").show();
    }
  });
});
define("admin/routes/admin-logs-screened-urls", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    renderTemplate: function renderTemplate() {
      this.render("admin/templates/logs/screened-urls", { into: "adminLogs" });
    },

    setupController: function setupController() {
      return this.controllerFor("adminLogsScreenedUrls").show();
    }
  });
});
define("admin/routes/admin-logs-staff-action-logs", ["exports", "discourse/lib/show-modal"], function (exports, _showModal) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    // TODO: make this automatic using an `{{outlet}}`
    renderTemplate: function renderTemplate() {
      this.render("admin/templates/logs/staff-action-logs", {
        into: "adminLogs"
      });
    },

    actions: {
      showDetailsModal: function showDetailsModal(model) {
        (0, _showModal.default)("admin-staff-action-log-details", { model: model, admin: true });
        this.controllerFor("modal").set("modalClass", "log-details-modal");
      },
      showCustomDetailsModal: function showCustomDetailsModal(model) {
        var modal = (0, _showModal.default)("admin-theme-change", { model: model, admin: true });
        this.controllerFor("modal").set("modalClass", "history-modal");
        modal.loadDiff();
      }
    }
  });
});
define("admin/routes/admin-permalinks", ["exports", "admin/models/permalink"], function (exports, _permalink) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return _permalink.default.findAll();
    },
    setupController: function setupController(controller, model) {
      controller.set("model", model);
    }
  });
});
define("admin/routes/admin-plugins", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll("plugin");
    },


    actions: {
      showSettings: function showSettings(plugin) {
        var controller = this.controllerFor("adminSiteSettings");
        this.transitionTo("adminSiteSettingsCategory", "plugins").then(function () {
          if (plugin) {
            var siteSettingFilter = plugin.get("enabled_setting_filter");
            var match = /^(.*)_enabled/.exec(plugin.get("enabled_setting"));
            var filter = siteSettingFilter || match[1];

            if (filter) {
              // filterContent() is normally on a debounce from typing.
              // Because we don't want the default of "All Results", we tell it
              // to skip the next debounce.
              controller.set("filter", filter);
              controller.set("_skipBounce", true);
              controller.filterContentNow("plugins");
            }
          }
        });
      }
    }
  });
});
define("admin/routes/admin-reports-index", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return (0, _ajax.ajax)("/admin/reports").then(function (json) {
        return json;
      });
    },
    setupController: function setupController(controller, model) {
      controller.setProperties({ model: model.reports });
    }
  });
});
define("admin/routes/admin-reports-show", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    setupController: function setupController(controller) {
      this._super.apply(this, arguments);

      if (!controller.get("start_date")) {
        controller.set("start_date", moment.utc().subtract(1, "day").subtract(1, "month").startOf("day").format("YYYY-MM-DD"));
      }

      if (!controller.get("end_date")) {
        controller.set("end_date", moment().utc().endOf("day").format("YYYY-MM-DD"));
      }
    }
  });
});
define("admin/routes/admin-route-map", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    this.route("admin", { resetNamespace: true }, function () {
      this.route("dashboard", { path: "/dashboard-old" });

      this.route("dashboardNext", { path: "/" }, function () {
        this.route("general", { path: "/" });
        this.route("admin.dashboardNextModeration", {
          path: "/dashboard/moderation",
          resetNamespace: true
        });
      });

      this.route("adminSiteSettings", { path: "/site_settings", resetNamespace: true }, function () {
        this.route("adminSiteSettingsCategory", {
          path: "category/:category_id",
          resetNamespace: true
        });
      });

      this.route("adminEmail", { path: "/email", resetNamespace: true }, function () {
        this.route("sent");
        this.route("skipped");
        this.route("bounced");
        this.route("received");
        this.route("rejected");
        this.route("previewDigest", { path: "/preview-digest" });
      });

      this.route("adminCustomize", { path: "/customize", resetNamespace: true }, function () {
        this.route("colors", function () {
          this.route("show", { path: "/:scheme_id" });
        });

        this.route("adminCustomizeThemes", { path: "themes", resetNamespace: true }, function () {
          this.route("show", { path: "/:theme_id" });
          this.route("edit", { path: "/:theme_id/:target/:field_name/edit" });
        });

        this.route("adminSiteText", { path: "/site_texts", resetNamespace: true }, function () {
          this.route("edit", { path: "/:id" });
        });

        this.route("adminUserFields", {
          path: "/user_fields",
          resetNamespace: true
        });
        this.route("adminEmojis", { path: "/emojis", resetNamespace: true });
        this.route("adminPermalinks", {
          path: "/permalinks",
          resetNamespace: true
        });
        this.route("adminEmbedding", {
          path: "/embedding",
          resetNamespace: true
        });
        this.route("adminCustomizeEmailTemplates", { path: "/email_templates", resetNamespace: true }, function () {
          this.route("edit", { path: "/:id" });
        });
      });

      this.route("adminApi", { path: "/api", resetNamespace: true }, function () {
        this.route("adminApiKeys", { path: "/keys", resetNamespace: true });

        this.route("adminWebHooks", { path: "/web_hooks", resetNamespace: true }, function () {
          this.route("show", { path: "/:web_hook_id" });
          this.route("showEvents", { path: "/:web_hook_id/events" });
        });
      });

      this.route("admin.backups", { path: "/backups", resetNamespace: true }, function () {
        this.route("logs");
      });

      this.route("adminReports", { path: "/reports", resetNamespace: true }, function () {
        this.route("show", { path: ":type" });
      });

      this.route("adminFlags", { path: "/flags", resetNamespace: true }, function () {
        this.route("postsActive", { path: "active" });
        this.route("postsOld", { path: "old" });
        this.route("topics", { path: "topics" }, function () {
          this.route("show", { path: ":id" });
        });
      });

      this.route("adminLogs", { path: "/logs", resetNamespace: true }, function () {
        this.route("staffActionLogs", { path: "/staff_action_logs" });
        this.route("screenedEmails", { path: "/screened_emails" });
        this.route("screenedIpAddresses", { path: "/screened_ip_addresses" });
        this.route("screenedUrls", { path: "/screened_urls" });
        this.route("adminSearchLogs", { path: "/search_logs", resetNamespace: true }, function () {
          this.route("index", { path: "/" });
          this.route("term", { path: "/term/:term" });
        });
        this.route("adminWatchedWords", { path: "/watched_words", resetNamespace: true }, function () {
          this.route("index", { path: "/" });
          this.route("action", { path: "/action/:action_id" });
        });
      });

      this.route("adminUsers", { path: "/users", resetNamespace: true }, function () {
        this.route("adminUser", { path: "/:user_id/:username", resetNamespace: true }, function () {
          this.route("badges");
          this.route("tl3Requirements", { path: "/tl3_requirements" });
        });

        this.route("adminUsersList", { path: "/list", resetNamespace: true }, function () {
          this.route("show", { path: "/:filter" });
        });
      });

      this.route("adminBadges", { path: "/badges", resetNamespace: true }, function () {
        this.route("show", { path: "/:badge_id" });
      });

      this.route("adminPlugins", { path: "/plugins", resetNamespace: true }, function () {
        this.route("index", { path: "/" });
      });
    });
  };
});
define("admin/routes/admin-search-logs-index", ["exports", "discourse/lib/ajax"], function (exports, _ajax) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    queryParams: {
      period: { refreshModel: true },
      searchType: { refreshModel: true }
    },

    model: function model(params) {
      this._params = params;
      return (0, _ajax.ajax)("/admin/logs/search_logs.json", {
        data: { period: params.period, search_type: params.searchType }
      }).then(function (search_logs) {
        return search_logs.map(function (sl) {
          return Ember.Object.create(sl);
        });
      });
    },
    setupController: function setupController(controller, model) {
      var params = this._params;
      controller.setProperties({
        model: model,
        period: params.period,
        searchType: params.searchType
      });
    }
  });
});
define("admin/routes/admin-search-logs-term", ["exports", "discourse/lib/ajax", "discourse/lib/utilities", "discourse/lib/search"], function (exports, _ajax, _utilities, _search) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    queryParams: {
      period: { refreshModel: true },
      searchType: { refreshModel: true }
    },

    model: function model(params) {
      this._params = params;

      return (0, _ajax.ajax)("/admin/logs/search_logs/term/" + params.term + ".json", {
        data: {
          period: params.period,
          search_type: params.searchType
        }
      }).then(function (json) {
        // Add zero values for missing dates
        if (json.term.data.length > 0) {
          var startDate = json.term.period === "all" ? moment(json.term.data[0].x).format("YYYY-MM-DD") : moment(json.term.start_date).format("YYYY-MM-DD");
          var endDate = moment(json.term.end_date).format("YYYY-MM-DD");
          json.term.data = (0, _utilities.fillMissingDates)(json.term.data, startDate, endDate);
        }
        if (json.term.search_result) {
          json.term.search_result = (0, _search.translateResults)(json.term.search_result);
        }

        var model = Ember.Object.create({ type: "search_log_term" });
        model.setProperties(json.term);
        return model;
      });
    },
    setupController: function setupController(controller, model) {
      var params = this._params;
      controller.setProperties({
        model: model,
        term: params.term,
        period: params.period,
        searchType: params.searchType
      });
    }
  });
});
define("admin/routes/admin-site-settings-category", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model(params) {
      // The model depends on user input, so let the controller do the work:
      this.controllerFor("adminSiteSettingsCategory").set("categoryNameKey", params.category_id);
      return Ember.Object.create({
        nameKey: params.category_id,
        name: I18n.t("admin.site_settings.categories." + params.category_id),
        siteSettings: this.controllerFor("adminSiteSettingsCategory").get("filteredContent")
      });
    }
  });
});
define("admin/routes/admin-site-settings-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    beforeModel: function beforeModel() {
      this.replaceWith("adminSiteSettingsCategory", this.modelFor("adminSiteSettings")[0].nameKey);
    }
  });
});
define("admin/routes/admin-site-settings", ["exports", "admin/models/site-setting"], function (exports, _siteSetting) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    queryParams: {
      filter: { replace: true }
    },

    model: function model() {
      return _siteSetting.default.findAll();
    },
    afterModel: function afterModel(siteSettings) {
      this.controllerFor("adminSiteSettings").set("allSiteSettings", siteSettings);
    }
  });
});
define("admin/routes/admin-site-text-edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      return this.store.find("site-text", params.id);
    },
    setupController: function setupController(controller, siteText) {
      controller.setProperties({ siteText: siteText, saved: false });
    }
  });
});
define("admin/routes/admin-site-text-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    queryParams: {
      q: { replace: true },
      overridden: { replace: true }
    },

    model: function model(params) {
      return this.store.find("site-text", Ember.getProperties(params, "q", "overridden"));
    },
    setupController: function setupController(controller, model) {
      controller.set("siteTexts", model);
    }
  });
});
define("admin/routes/admin-user-badges", ["exports", "discourse/models/user-badge", "discourse/models/badge"], function (exports, _userBadge, _badge) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      var username = this.modelFor("adminUser").get("username");
      return _userBadge.default.findByUsername(username);
    },
    setupController: function setupController(controller, model) {
      // Find all badges.
      controller.set("loading", true);
      _badge.default.findAll().then(function (badges) {
        controller.set("badges", badges);
        if (badges.length > 0) {
          var grantableBadges = controller.get("grantableBadges");
          if (grantableBadges.length > 0) {
            controller.set("selectedBadgeId", grantableBadges[0].get("id"));
          }
        }
        controller.set("loading", false);
      });
      // Set the model.
      controller.set("model", model);
    }
  });
});
define("admin/routes/admin-user-fields", ["exports", "admin/models/user-field"], function (exports, _userField) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return this.store.findAll("user-field");
    },

    setupController: function setupController(controller, model) {
      controller.setProperties({ model: model, fieldTypes: _userField.default.fieldTypes() });
    }
  });
});
define("admin/routes/admin-user-index", ["exports", "discourse/models/group"], function (exports, _group) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return this.modelFor("adminUser");
    },
    afterModel: function afterModel(model) {
      if (this.currentUser.get("admin")) {
        var self = this;
        return _group.default.findAll().then(function (groups) {
          self._availableGroups = groups.filterBy("automatic", false);
          return model;
        });
      }
    },
    setupController: function setupController(controller, model) {
      controller.setProperties({
        originalPrimaryGroupId: model.get("primary_group_id"),
        availableGroups: this._availableGroups,
        model: model
      });
    }
  });
});
define("admin/routes/admin-user-tl3-requirements", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model() {
      return this.modelFor("adminUser");
    }
  });
});
define("admin/routes/admin-user", ["exports", "admin/models/admin-user"], function (exports, _adminUser) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    serialize: function serialize(model) {
      return {
        user_id: model.get("id"),
        username: model.get("username").toLowerCase()
      };
    },
    model: function model(params) {
      return _adminUser.default.find(Em.get(params, "user_id"));
    },
    renderTemplate: function renderTemplate() {
      this.render({ into: "admin" });
    },
    afterModel: function afterModel(adminUser) {
      return adminUser.loadDetails().then(function () {
        adminUser.setOriginalTrustLevel();
        return adminUser;
      });
    }
  });
});
define("admin/routes/admin-users-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    redirect: function redirect() {
      this.transitionTo("adminUsersList");
    }
  });
});
define("admin/routes/admin-users-list-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo("adminUsersList.show", "active");
    }
  });
});
define("admin/routes/admin-users-list-show", ["exports", "admin/models/admin-user"], function (exports, _adminUser) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model(params) {
      this.userFilter = params.filter;
      return _adminUser.default.findAll(params.filter);
    },

    setupController: function setupController(controller, model) {
      controller.setProperties({
        model: model,
        query: this.userFilter,
        showEmails: false,
        refreshing: false
      });
    }
  });
});
define("admin/routes/admin-users-list", ["exports", "discourse/lib/export-csv", "discourse/lib/export-result", "admin/models/admin-user"], function (exports, _exportCsv, _exportResult, _adminUser) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    actions: {
      exportUsers: function exportUsers() {
        (0, _exportCsv.exportEntity)("user_list", {
          trust_level: this.controllerFor("admin-users-list-show").get("query")
        }).then(_exportResult.outputExportResult);
      },
      sendInvites: function sendInvites() {
        this.transitionTo("userInvited", Discourse.User.current());
      },
      deleteUser: function deleteUser(user) {
        _adminUser.default.create(user).destroy({ deletePosts: true });
      }
    }
  });
});
define("admin/routes/admin-watched-words-action", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model(params) {
      this.controllerFor("adminWatchedWordsAction").set("actionNameKey", params.action_id);
      var filteredContent = this.controllerFor("adminWatchedWordsAction").get("filteredContent");
      return Ember.Object.create({
        nameKey: params.action_id,
        name: I18n.t("admin.watched_words.actions." + params.action_id),
        words: filteredContent
      });
    }
  });
});
define("admin/routes/admin-watched-words-index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    beforeModel: function beforeModel() {
      this.replaceWith("adminWatchedWords.action", this.modelFor("adminWatchedWords")[0].nameKey);
    }
  });
});
define("admin/routes/admin-watched-words", ["exports", "admin/models/watched-word"], function (exports, _watchedWord) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    queryParams: {
      filter: { replace: true }
    },

    model: function model() {
      return _watchedWord.default.findAll();
    },
    setupController: function setupController(controller, model) {
      controller.set("model", model);
      if (model && model.length) {
        controller.set("regularExpressions", model[0].get("regularExpressions"));
      }
    },
    afterModel: function afterModel(watchedWordsList) {
      this.controllerFor("adminWatchedWords").set("allWatchedWords", watchedWordsList);
    }
  });
});
define("admin/routes/admin-web-hooks-show-events", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    model: function model(params) {
      return this.store.findAll("web-hook-event", Ember.get(params, "web_hook_id"));
    },
    setupController: function setupController(controller, model) {
      controller.set("model", model);
      controller.subscribe();
    },
    deactivate: function deactivate() {
      this.controllerFor("adminWebHooks.showEvents").unsubscribe();
    },
    renderTemplate: function renderTemplate() {
      this.render("admin/templates/web-hooks-show-events", { into: "adminApi" });
    }
  });
});
define("admin/routes/admin-web-hooks-show", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    serialize: function serialize(model) {
      return { web_hook_id: model.get("id") || "new" };
    },
    model: function model(params) {
      if (params.web_hook_id === "new") {
        return this.store.createRecord("web-hook");
      }
      return this.store.find("web-hook", Ember.get(params, "web_hook_id"));
    },
    setupController: function setupController(controller, model) {
      if (model.get("isNew") || Ember.isEmpty(model.get("web_hook_event_types"))) {
        model.set("web_hook_event_types", controller.get("defaultEventTypes"));
      }

      model.set("category_ids", model.get("category_ids"));
      model.set("group_ids", model.get("group_ids"));
      controller.setProperties({ model: model, saved: false });
    },
    renderTemplate: function renderTemplate() {
      this.render("admin/templates/web-hooks-show", { into: "adminApi" });
    }
  });
});
define("admin/routes/admin-web-hooks", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll("web-hook");
    },
    setupController: function setupController(controller, model) {
      controller.setProperties({
        model: model,
        eventTypes: model.extras.event_types,
        defaultEventTypes: model.extras.default_event_types,
        contentTypes: model.extras.content_types,
        deliveryStatuses: model.extras.delivery_statuses
      });
    }
  });
});
define("admin/routes/admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Discourse.Route.extend({
    titleToken: function titleToken() {
      return I18n.t("admin_title");
    },
    activate: function activate() {
      this.controllerFor("application").setProperties({
        showTop: false,
        showFooter: false
      });
    },
    deactivate: function deactivate() {
      this.controllerFor("application").set("showTop", true);
    }
  });
});
define("admin/services/admin-tools", ["exports", "admin/models/admin-user", "discourse-common/lib/icon-library", "discourse/lib/ajax", "discourse/lib/show-modal", "discourse-common/lib/get-owner"], function (exports, _adminUser, _iconLibrary, _ajax, _showModal, _getOwner) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    init: function init() {
      this._super();

      // TODO: Make `siteSettings` a service that can be injected
      this.siteSettings = (0, _getOwner.getOwner)(this).lookup("site-settings:main");
    },
    showActionLogs: function showActionLogs(target, filters) {
      var controller = (0, _getOwner.getOwner)(target).lookup("controller:adminLogs.staffActionLogs");
      target.transitionToRoute("adminLogs.staffActionLogs").then(function () {
        controller.set("filters", Ember.Object.create());
        controller._changeFilters(filters);
      });
    },
    showFlagsReceived: function showFlagsReceived(user) {
      (0, _showModal.default)("admin-flags-received", { admin: true, model: user });
    },
    checkSpammer: function checkSpammer(userId) {
      var _this = this;

      return _adminUser.default.find(userId).then(function (au) {
        return _this.spammerDetails(au);
      });
    },
    deleteUser: function deleteUser(id) {
      _adminUser.default.find(id).then(function (user) {
        return user.destroy({ deletePosts: true });
      });
    },
    spammerDetails: function spammerDetails(adminUser) {
      var _this2 = this;

      return {
        deleteUser: function deleteUser() {
          return _this2._deleteSpammer(adminUser);
        },
        canDelete: adminUser.get("can_be_deleted") && adminUser.get("can_delete_all_posts")
      };
    },
    _showControlModal: function _showControlModal(type, user, opts) {
      opts = opts || {};

      var controller = (0, _showModal.default)("admin-" + type + "-user", {
        admin: true,
        modalClass: type + "-user-modal"
      });
      if (opts.post) {
        controller.setProperties({
          post: opts.post,
          postEdit: opts.post.get("raw")
        });
      }

      return (user.adminUserView ? Ember.RSVP.resolve(user) : _adminUser.default.find(user.get("id"))).then(function (loadedUser) {
        controller.setProperties({
          user: loadedUser,
          loadingUser: false,
          before: opts.before,
          successCallback: opts.successCallback
        });
      });
    },
    showSilenceModal: function showSilenceModal(user, opts) {
      this._showControlModal("silence", user, opts);
    },
    showSuspendModal: function showSuspendModal(user, opts) {
      this._showControlModal("suspend", user, opts);
    },
    showModerationHistory: function showModerationHistory(target) {
      var controller = (0, _showModal.default)("admin-moderation-history", { admin: true });
      controller.loadHistory(target);
    },
    _deleteSpammer: function _deleteSpammer(adminUser) {
      // Try loading the email if the site supports it
      var tryEmail = this.siteSettings.show_email_on_profile ? adminUser.checkEmail() : Ember.RSVP.resolve();

      return tryEmail.then(function () {
        var message = I18n.messageFormat("flagging.delete_confirm_MF", {
          POSTS: adminUser.get("post_count"),
          TOPICS: adminUser.get("topic_count"),
          email: adminUser.get("email") || I18n.t("flagging.hidden_email_address"),
          ip_address: adminUser.get("ip_address") || I18n.t("flagging.ip_address_missing")
        });

        var userId = adminUser.get("id");

        return new Ember.RSVP.Promise(function (resolve, reject) {
          var buttons = [{
            label: I18n.t("composer.cancel"),
            class: "d-modal-cancel",
            link: true
          }, {
            label: (0, _iconLibrary.iconHTML)("exclamation-triangle") + " " + I18n.t("flagging.yes_delete_spammer"),
            class: "btn btn-danger confirm-delete",
            callback: function callback() {
              return (0, _ajax.ajax)("/admin/users/" + userId + ".json", {
                type: "DELETE",
                data: {
                  delete_posts: true,
                  block_email: true,
                  block_urls: true,
                  block_ip: true,
                  delete_as_spammer: true,
                  context: window.location.pathname
                }
              }).then(function (result) {
                if (result.deleted) {
                  resolve();
                } else {
                  throw new Error("failed to delete");
                }
              }).catch(function () {
                bootbox.alert(I18n.t("admin.user.delete_failed"));
                reject();
              });
            }
          }];

          bootbox.dialog(message, buttons, {
            classes: "flagging-delete-spammer"
          });
        });
      });
    }
  });
});
Ember.TEMPLATES["admin/templates/admin"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"admin-wrapper\"],null,[[\"class\"],[\"container\"]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"full-width\"],[13],[0,\"              \\n    \"],[11,\"div\",[]],[15,\"class\",\"admin-main-nav\"],[13],[0,\"\\n\\n      \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-pills\"],[13],[0,\"\\n\\n        \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"admin.dashboardNext\",\"admin.dashboard.title\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminSiteSettings\",\"admin.site_settings.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminUsersList\",\"admin.users.title\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showGroups\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"groups\",\"admin.groups.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"showBadges\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminBadges\",\"admin.badges.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmail\",\"admin.email.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminFlags\",\"admin.flags.title\"]]],false],[0,\"\\n        \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminLogs\",\"admin.logs.title\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminCustomize\",\"admin.customize.title\"]]],false],[0,\"\\n          \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminApi\",\"admin.api.title\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"siteSettings\",\"enable_backups\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"admin.backups\",\"admin.backups.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"        \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminPlugins\",\"admin.plugins.title\"]]],false],[0,\"\\n        \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"connectorTagName\",\"tagName\"],[\"admin-menu\",\"\",\"\"]]],false],[0,\"\\n\\n      \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"boxed white admin-content\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[16,\"class\",[34,[\"admin-contents \",[26,[\"adminContentsClassName\"]]]]],[13],[0,\"\\n          \"],[1,[26,[\"outlet\"]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/admin"}});
Ember.TEMPLATES["admin/templates/api-keys"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"api-keys grid\"],[13],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.api.key\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.api.user\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[13],[0,\" \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"key\"],[13],[1,[28,[\"k\",\"key\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"key-user\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"k\",\"user\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"adminUser\",[28,[\"k\",\"user\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"avatar\"],[[28,[\"k\",\"user\"]]],[[\"imageSize\"],[\"small\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"            \"],[1,[33,[\"i18n\"],[\"admin.api.all_users\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"key-controls\"],[13],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"label\"],[\"btn-default\",\"regenerateKey\",[28,[\"k\"]],\"undo\",\"admin.api.regenerate\"]]],false],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"label\"],[\"btn-default\",\"revokeKey\",[28,[\"k\"]],\"times\",\"admin.api.revoke\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"k\"]},null],[0,\"  \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.api.none\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"hasMasterKey\"]]],null,{\"statements\":[[11,\"button\",[]],[15,\"class\",\"btn btn-icon no-text btn-primary\"],[5,[\"action\"],[[28,[null]],\"generateMasterKey\"]],[13],[1,[33,[\"d-icon\"],[\"key\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/api-keys"}});
Ember.TEMPLATES["admin/templates/api"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"admin-nav\"],null,null,{\"statements\":[[0,\"  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminApiKeys\",\"admin.api.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminWebHooks\",\"admin.web_hooks.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-container\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/api"}});
Ember.TEMPLATES["admin/templates/backups-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[0,\"     \"],[11,\"div\",[]],[15,\"class\",\"backup-options\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"localBackupStorage\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"resumable-upload\"],null,[[\"target\",\"success\",\"error\",\"uploadText\",\"title\",\"class\"],[\"/admin/backups/upload\",\"uploadSuccess\",\"uploadError\",[28,[\"uploadLabel\"]],\"admin.backups.upload.title\",\"btn-default\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"backup-uploader\"],null,[[\"done\"],[\"remoteUploadSuccess\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[6,[\"if\"],[[28,[\"site\",\"isReadOnly\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"icon\",\"action\",\"disabled\",\"title\",\"label\"],[\"btn-default\",\"eye\",\"toggleReadOnlyMode\",[28,[\"status\",\"isOperationRunning\"]],\"admin.backups.read_only.disable.title\",\"admin.backups.read_only.disable.label\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"icon\",\"action\",\"disabled\",\"title\",\"label\"],[\"btn-default\",\"eye\",\"toggleReadOnlyMode\",[28,[\"status\",\"isOperationRunning\"]],\"admin.backups.read_only.enable.title\",\"admin.backups.read_only.enable.label\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n\"],[11,\"table\",[]],[15,\"class\",\"grid\"],[13],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"th\",[]],[15,\"width\",\"55%\"],[13],[1,[33,[\"i18n\"],[\"admin.backups.columns.filename\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[15,\"width\",\"10%\"],[13],[1,[33,[\"i18n\"],[\"admin.backups.columns.size\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"backup-filename\"],[13],[1,[28,[\"backup\",\"filename\"]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"backup-size\"],[13],[1,[33,[\"human-size\"],[[28,[\"backup\",\"size\"]]],null],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"backup-controls\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"title\",\"label\"],[\"btn-default download\",\"download\",[28,[\"backup\"]],\"download\",\"admin.backups.operations.download.title\",\"admin.backups.operations.download.label\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"status\",\"isOperationRunning\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"actionParam\",\"class\",\"disabled\",\"title\"],[\"trash-o\",\"destroyBackup\",[28,[\"backup\"]],\"btn-danger\",\"true\",\"admin.backups.operations.is_running\"]]],false],[0,\"\\n            \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"actionParam\",\"disabled\",\"class\",\"title\",\"label\"],[\"play\",\"startRestore\",[28,[\"backup\"]],[28,[\"status\",\"restoreDisabled\"]],\"btn-default\",[28,[\"restoreTitle\"]],\"admin.backups.operations.restore.label\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"actionParam\",\"class\",\"title\"],[\"trash-o\",\"destroyBackup\",[28,[\"backup\"]],\"btn-danger\",\"admin.backups.operations.destroy.title\"]]],false],[0,\"\\n            \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"actionParam\",\"disabled\",\"class\",\"title\",\"label\"],[\"play\",\"startRestore\",[28,[\"backup\"]],[28,[\"status\",\"restoreDisabled\"]],\"btn-default\",[28,[\"restoreTitle\"]],\"admin.backups.operations.restore.label\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"backup\"]},{\"statements\":[[0,\"    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"admin.backups.none\"],null],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/backups-index"}});
Ember.TEMPLATES["admin/templates/backups-logs"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"admin-backups-logs\"],null,[[\"logs\",\"status\"],[[28,[\"logs\"]],[28,[\"status\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/backups-logs"}});
Ember.TEMPLATES["admin/templates/backups"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"admin-backups\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n    \"],[11,\"nav\",[]],[13],[0,\"\\n      \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-pills\"],[13],[0,\"\\n        \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"admin.backups.index\",\"admin.backups.menu.backups\"]]],false],[0,\"\\n        \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"admin.backups.logs\",\"admin.backups.menu.logs\"]]],false],[0,\"\\n        \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"tagName\"],[\"downloader\",\"\"]]],false],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"admin-actions\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"canRollback\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"label\",\"title\",\"icon\",\"disabled\"],[\"rollback\",\"btn-default btn-rollback\",\"admin.backups.operations.rollback.label\",\"admin.backups.operations.rollback.title\",\"ambulance\",[28,[\"rollbackDisabled\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"isOperationRunning\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"title\",\"label\",\"icon\"],[\"cancelOperation\",\"btn-danger\",\"admin.backups.operations.cancel.title\",\"admin.backups.operations.cancel.label\",\"times\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"title\",\"label\",\"icon\"],[\"showStartBackupModal\",\"btn-primary\",\"admin.backups.operations.backup.title\",\"admin.backups.operations.backup.label\",\"rocket\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"admin-container\"],[13],[0,\"\\n    \"],[1,[26,[\"outlet\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/backups"}});
Ember.TEMPLATES["admin/templates/badges-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-section\"],null,[[\"class\"],[\"current-badge content-body\"]],{\"statements\":[[0,\"  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.none_selected\"],null],false],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminBadges.show\",\"new\"],[[\"class\"],[\"btn btn-default\"]],{\"statements\":[[0,\"      \"],[1,[33,[\"d-icon\"],[\"plus\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.badges.new\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/badges-index"}});
Ember.TEMPLATES["admin/templates/badges-show"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-section\"],null,[[\"class\"],[\"current-badge content-body\"]],{\"statements\":[[0,\"  \"],[11,\"form\",[]],[15,\"class\",\"form-horizontal\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"name\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.name\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"readOnly\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"disabled\"],[\"text\",\"name\",[28,[\"buffered\",\"name\"]],true]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\"],[\"text\",\"name\",[28,[\"buffered\",\"name\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"icon\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.icon\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\"],[\"text\",\"icon\",[28,[\"buffered\",\"icon\"]]]]],false],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"help\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.icon_help\"],null],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"image\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.image\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\"],[\"text\",\"image\",[28,[\"buffered\",\"image\"]]]]],false],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"help\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.image_help\"],null],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"badge_type_id\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.badge_type\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"combo-box\"],null,[[\"name\",\"value\",\"content\",\"allowInitialValueMutation\",\"isDisabled\"],[\"badge_type_id\",[28,[\"buffered\",\"badge_type_id\"]],[28,[\"badgeTypes\"]],true,[28,[\"readOnly\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"badge_grouping_id\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.badge_grouping\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"combo-box\"],null,[[\"name\",\"value\",\"content\",\"nameProperty\"],[\"badge_grouping_id\",[28,[\"buffered\",\"badge_grouping_id\"]],[28,[\"badgeGroupings\"]],\"name\"]]],false],[0,\"\\n       \"],[11,\"button\",[]],[15,\"class\",\"btn btn-icon btn-default\"],[5,[\"action\"],[[28,[null]],\"editGroupings\"]],[13],[1,[33,[\"d-icon\"],[\"pencil\"],null],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.description\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"buffered\",\"system\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"textarea\"],null,[[\"name\",\"value\",\"disabled\"],[\"description\",[28,[\"buffered\",\"description\"]],true]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"textarea\"],null,[[\"name\",\"value\"],[\"description\",[28,[\"buffered\",\"description\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"long_description\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.long_description\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"buffered\",\"system\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"textarea\"],null,[[\"name\",\"value\",\"disabled\"],[\"long_description\",[28,[\"buffered\",\"long_description\"]],true]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"textarea\"],null,[[\"name\",\"value\"],[\"long_description\",[28,[\"buffered\",\"long_description\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"siteSettings\",\"enable_badge_sql\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"for\",\"query\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.query\"],null],false],[14],[0,\"\\n        \"],[1,[33,[\"ace-editor\"],null,[[\"content\",\"mode\",\"disabled\"],[[28,[\"buffered\",\"query\"]],\"sql\",[28,[\"readOnly\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"hasQuery\"]]],null,{\"statements\":[[0,\"        \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"preview\",[28,[\"buffered\"]],\"false\"]],[13],[1,[33,[\"i18n\"],[\"admin.badges.preview.link_text\"],null],false],[14],[0,\"\\n        |\\n        \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"preview\",[28,[\"buffered\"]],\"true\"]],[13],[1,[33,[\"i18n\"],[\"admin.badges.preview.plan_text\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"preview_loading\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"i18n\"],[\"loading\"],null],false],[0,\"...\\n\"]],\"locals\":[]},null],[0,\"\\n        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"label\",[]],[13],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\",\"disabled\"],[\"checkbox\",[28,[\"buffered\",\"auto_revoke\"]],[28,[\"readOnly\"]]]]],false],[0,\"\\n            \"],[1,[33,[\"i18n\"],[\"admin.badges.auto_revoke\"],null],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"label\",[]],[13],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\",\"disabled\"],[\"checkbox\",[28,[\"buffered\",\"target_posts\"]],[28,[\"readOnly\"]]]]],false],[0,\"\\n            \"],[1,[33,[\"i18n\"],[\"admin.badges.target_posts\"],null],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"trigger\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.trigger\"],null],false],[14],[0,\"\\n          \"],[1,[33,[\"combo-box\"],null,[[\"name\",\"value\",\"content\",\"optionValuePath\",\"optionLabelPath\",\"disabled\"],[\"trigger\",[28,[\"buffered\",\"trigger\"]],[28,[\"badgeTriggers\"]],\"content.id\",\"content.name\",[28,[\"readOnly\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"buffered\",\"allow_title\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.badges.allow_title\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\",\"disabled\"],[\"checkbox\",[28,[\"buffered\",\"multiple_grant\"]],[28,[\"readOnly\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.badges.multiple_grant\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\",\"disabled\"],[\"checkbox\",[28,[\"buffered\",\"listable\"]],[28,[\"readOnly\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.badges.listable\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\",\"disabled\"],[\"checkbox\",[28,[\"buffered\",\"show_posts\"]],[28,[\"readOnly\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.badges.show_posts\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"buffered\",\"enabled\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.badges.enabled\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[16,\"disabled\",[26,[\"saving\"]],null],[15,\"class\",\"btn btn-primary\"],[5,[\"action\"],[[28,[null]],\"save\"]],[13],[1,[33,[\"i18n\"],[\"admin.badges.save\"],null],false],[14],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"saving\"],[13],[1,[26,[\"savingStatus\"]],false],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"readOnly\"]]],null,{\"statements\":[[0,\"        \"],[11,\"a\",[]],[15,\"class\",\"delete-link\"],[5,[\"action\"],[[28,[null]],\"destroy\"]],[13],[1,[33,[\"i18n\"],[\"admin.badges.delete\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"grant_count\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"content-body current-badge-actions\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[6,[\"link-to\"],[\"badges.show\",[28,[null]]],null,{\"statements\":[[1,[33,[\"i18n\"],[\"badges.granted\"],[[\"count\"],[[28,[\"grant_count\"]]]]],false]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/badges-show"}});
Ember.TEMPLATES["admin/templates/badges"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"badges\"],[13],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"content-list\"],[13],[0,\"\\n    \"],[11,\"h3\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.title\"],null],false],[14],[0,\"\\n    \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminBadges.show\",[28,[\"badge\",\"id\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"badge-button\"],null,[[\"badge\"],[[28,[\"badge\"]]]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"badge\",\"newBadge\"]]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"list-badge\"],[13],[1,[33,[\"i18n\"],[\"filters.new.lower_title\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"badge\"]},null],[0,\"    \"],[14],[0,\"\\n\"],[6,[\"link-to\"],[\"adminBadges.show\",\"new\"],[[\"class\"],[\"btn btn-default\"]],{\"statements\":[[0,\"      \"],[1,[33,[\"d-icon\"],[\"plus\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.badges.new\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/badges"}});
Ember.TEMPLATES["admin/templates/components/ace-editor"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"ace\"],[13],[1,[26,[\"content\"]],false],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/ace-editor"}});
Ember.TEMPLATES["admin/templates/components/admin-form-row"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"form-element label-area\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"label\"]]],null,{\"statements\":[[0,\"    \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[[28,[\"label\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"     \\n\"]],\"locals\":[]}],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"form-element input-area\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"wrapLabel\"]]],null,{\"statements\":[[0,\"    \"],[11,\"label\",[]],[13],[18,\"default\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-form-row"}});
Ember.TEMPLATES["admin/templates/components/admin-nav"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n  \"],[11,\"nav\",[]],[13],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-pills\"],[13],[0,\"\\n      \"],[18,\"default\"],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-nav"}});
Ember.TEMPLATES["admin/templates/components/admin-report-chart"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"chart-canvas-container\"],[13],[0,\"\\n  \"],[11,\"canvas\",[]],[15,\"class\",\"chart-canvas\"],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-chart"}});
Ember.TEMPLATES["admin/templates/components/admin-report-counters"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cell title\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"icon\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"d-icon\"],[[28,[\"model\",\"icon\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"model\",\"reportUrl\"]]]]],[13],[1,[28,[\"model\",\"title\"]],false],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"cell value today-count\"],[13],[1,[33,[\"number\"],[[28,[\"model\",\"todayCount\"]]],null],false],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[16,\"class\",[34,[\"cell value yesterday-count \",[28,[\"model\",\"yesterdayTrend\"]]]]],[16,\"title\",[28,[\"model\",\"yesterdayCountTitle\"]],null],[13],[0,\"\\n  \"],[1,[33,[\"number\"],[[28,[\"model\",\"yesterdayCount\"]]],null],false],[0,\" \"],[1,[33,[\"d-icon\"],[[28,[\"model\",\"yesterdayTrendIcon\"]]],null],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[16,\"class\",[34,[\"cell value sevendays-count \",[28,[\"model\",\"sevenDaysTrend\"]]]]],[16,\"title\",[28,[\"model\",\"sevenDaysCountTitle\"]],null],[13],[0,\"\\n  \"],[1,[33,[\"number\"],[[28,[\"model\",\"lastSevenDaysCount\"]]],null],false],[0,\" \"],[1,[33,[\"d-icon\"],[[28,[\"model\",\"sevenDaysTrendIcon\"]]],null],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[16,\"class\",[34,[\"cell value thirty-days-count \",[28,[\"model\",\"thirtyDaysTrend\"]]]]],[16,\"title\",[28,[\"model\",\"thirtyDaysCountTitle\"]],null],[13],[0,\"\\n  \"],[1,[33,[\"number\"],[[28,[\"model\",\"lastThirtyDaysCount\"]]],null],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"prev30Days\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"d-icon\"],[[28,[\"model\",\"thirtyDaysTrendIcon\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-counters"}});
Ember.TEMPLATES["admin/templates/components/admin-report-counts"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"td\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"report\",\"icon\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"d-icon\"],[[28,[\"report\",\"icon\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"report\",\"reportUrl\"]]]]],[13],[1,[28,[\"report\",\"title\"]],false],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"number\"],[[28,[\"report\",\"todayCount\"]]],null],false],[14],[0,\"\\n\\n\"],[11,\"td\",[]],[16,\"class\",[34,[\"value \",[28,[\"report\",\"yesterdayTrend\"]]]]],[16,\"title\",[28,[\"report\",\"yesterdayCountTitle\"]],null],[13],[0,\"\\n  \"],[1,[33,[\"number\"],[[28,[\"report\",\"yesterdayCount\"]]],null],false],[0,\" \"],[1,[33,[\"d-icon\"],[[28,[\"report\",\"yesterdayTrendIcon\"]]],null],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"td\",[]],[16,\"class\",[34,[\"value \",[28,[\"report\",\"sevenDaysTrend\"]]]]],[16,\"title\",[28,[\"report\",\"sevenDaysCountTitle\"]],null],[13],[0,\"\\n  \"],[1,[33,[\"number\"],[[28,[\"report\",\"lastSevenDaysCount\"]]],null],false],[0,\" \"],[1,[33,[\"d-icon\"],[[28,[\"report\",\"sevenDaysTrendIcon\"]]],null],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"td\",[]],[16,\"class\",[34,[\"value \",[28,[\"report\",\"thirtyDaysTrend\"]]]]],[16,\"title\",[28,[\"report\",\"thirtyDaysCountTitle\"]],null],[13],[0,\"\\n  \"],[1,[33,[\"number\"],[[28,[\"report\",\"lastThirtyDaysCount\"]]],null],false],[0,\" \"],[1,[33,[\"d-icon\"],[[28,[\"report\",\"thirtyDaysTrendIcon\"]]],null],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"allTime\"]]],null,{\"statements\":[[0,\"  \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"number\"],[[28,[\"report\",\"total\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-counts"}});
Ember.TEMPLATES["admin/templates/components/admin-report-inline-table"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"table-container\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"data\"]]],null,{\"statements\":[[0,\"    \"],[11,\"a\",[]],[16,\"class\",[34,[\"table-cell user-\",[28,[\"data\",\"key\"]]]]],[16,\"href\",[34,[[28,[\"data\",\"url\"]]]]],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"data\",\"icon\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[[28,[\"data\",\"icon\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[1,[28,[\"data\",\"x\"]],false],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n          \"],[1,[33,[\"number\"],[[28,[\"data\",\"y\"]]],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"data\"]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-inline-table"}});
Ember.TEMPLATES["admin/templates/components/admin-report-per-day-counts"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"td\",[]],[15,\"class\",\"title\"],[13],[11,\"a\",[]],[16,\"href\",[28,[\"report\",\"reportUrl\"]],null],[13],[1,[28,[\"report\",\"title\"]],false],[14],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"report\",\"todayCount\"]],false],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"report\",\"yesterdayCount\"]],false],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"report\",\"sevenDaysAgoCount\"]],false],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"report\",\"thirtyDaysAgoCount\"]],false],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-per-day-counts"}});
Ember.TEMPLATES["admin/templates/components/admin-report-table-cell"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[26,[\"formatedValue\"]],true],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-table-cell"}});
Ember.TEMPLATES["admin/templates/components/admin-report-table-header"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"showSortingUI\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"icon\",\"class\"],[[28,[\"sortByLabel\"]],[28,[\"sortIcon\"]],\"sort-btn\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"span\",[]],[15,\"class\",\"title\"],[13],[1,[28,[\"label\",\"title\"]],false],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-table-header"}});
Ember.TEMPLATES["admin/templates/components/admin-report-table-row"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"each\"],[[28,[\"labels\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"admin-report-table-cell\"],null,[[\"label\",\"data\",\"options\"],[[28,[\"label\"]],[28,[\"data\"]],[28,[\"options\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"label\"]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-table-row"}});
Ember.TEMPLATES["admin/templates/components/admin-report-table"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"table\",[]],[15,\"class\",\"table\"],[13],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"computedLabels\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"model\",\"computedLabels\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"admin-report-table-header\"],null,[[\"showSortingUI\",\"currentSortDirection\",\"currentSortLabel\",\"label\",\"sortByLabel\"],[[28,[\"showSortingUI\"]],[28,[\"sortDirection\"]],[28,[\"sortLabel\"]],[28,[\"label\"]],[33,[\"action\"],[[28,[null]],\"sortByLabel\",[28,[\"label\"]]],null]]]],false],[0,\"\\n\"]],\"locals\":[\"label\",\"index\"]},null]],\"locals\":[]},{\"statements\":[[6,[\"each\"],[[28,[\"model\",\"data\"]]],null,{\"statements\":[[0,\"          \"],[11,\"th\",[]],[13],[1,[28,[\"data\",\"x\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"data\"]},null]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"paginatedData\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"admin-report-table-row\"],null,[[\"data\",\"labels\",\"options\"],[[28,[\"data\"]],[28,[\"model\",\"computedLabels\"]],[28,[\"options\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"data\"]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showTotalForSample\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[15,\"class\",\"total-row\"],[13],[0,\"\\n        \"],[11,\"td\",[]],[16,\"colspan\",[34,[[28,[\"totalsForSample\",\"length\"]]]]],[13],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.totals_for_sample\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[15,\"class\",\"admin-report-table-row\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"totalsForSample\"]]],null,{\"statements\":[[0,\"          \"],[11,\"td\",[]],[16,\"class\",[34,[\"admin-report-table-cell \",[28,[\"total\",\"type\"]],\" \",[28,[\"total\",\"property\"]]]]],[13],[0,\"\\n            \"],[1,[28,[\"total\",\"formatedValue\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"total\"]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showTotal\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[15,\"class\",\"total-row\"],[13],[0,\"\\n        \"],[11,\"td\",[]],[15,\"colspan\",\"2\"],[13],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.total\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[15,\"class\",\"admin-report-table-row\"],[13],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"admin-report-table-cell date x\"],[13],[0,\"—\"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"admin-report-table-cell number y\"],[13],[1,[33,[\"number\"],[[28,[\"model\",\"total\"]]],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"pagination\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"pages\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"d-button\"],null,[[\"translatedLabel\",\"action\",\"actionParam\",\"class\"],[[28,[\"pageState\",\"page\"]],\"changePage\",[28,[\"pageState\",\"index\"]],[28,[\"pageState\",\"class\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"pageState\"]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-table"}});
Ember.TEMPLATES["admin/templates/components/admin-report-trust-level-counts"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"td\",[]],[15,\"class\",\"title\"],[13],[1,[28,[\"report\",\"title\"]],false],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"newuser\"],null,{\"statements\":[[1,[33,[\"number\"],[[33,[\"value-at-tl\"],[[28,[\"report\",\"data\"]]],[[\"level\"],[\"0\"]]]],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"basic\"],null,{\"statements\":[[1,[33,[\"number\"],[[33,[\"value-at-tl\"],[[28,[\"report\",\"data\"]]],[[\"level\"],[\"1\"]]]],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"member\"],null,{\"statements\":[[1,[33,[\"number\"],[[33,[\"value-at-tl\"],[[28,[\"report\",\"data\"]]],[[\"level\"],[\"2\"]]]],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"regular\"],null,{\"statements\":[[1,[33,[\"number\"],[[33,[\"value-at-tl\"],[[28,[\"report\",\"data\"]]],[[\"level\"],[\"3\"]]]],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"leader\"],null,{\"statements\":[[1,[33,[\"number\"],[[33,[\"value-at-tl\"],[[28,[\"report\",\"data\"]]],[[\"level\"],[\"4\"]]]],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report-trust-level-counts"}});
Ember.TEMPLATES["admin/templates/components/admin-report"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"isEnabled\"]]],null,{\"statements\":[[6,[\"conditional-loading-section\"],null,[[\"isLoading\"],[[28,[\"isLoading\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"showHeader\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"header\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showTitle\"]]],null,{\"statements\":[[0,\"        \"],[11,\"ul\",[]],[15,\"class\",\"breadcrumb\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showAllReportsLink\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[15,\"class\",\"item all-reports\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminReports\"],[[\"class\"],[\"report-url\"]],{\"statements\":[[0,\"                \"],[1,[33,[\"i18n\"],[\"admin.dashboard.all_reports\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n            \"],[11,\"li\",[]],[15,\"class\",\"item separator\"],[13],[0,\"|\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"item report\"],[13],[0,\"\\n            \"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"model\",\"reportUrl\"]]]]],[15,\"class\",\"report-url\"],[13],[0,\"\\n              \"],[1,[28,[\"model\",\"title\"]],false],[0,\"\\n            \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"description\"]]],null,{\"statements\":[[0,\"              \"],[11,\"span\",[]],[15,\"class\",\"info\"],[16,\"data-tooltip\",[34,[[28,[\"model\",\"description\"]]]]],[13],[0,\"\\n                \"],[1,[33,[\"d-icon\"],[\"question-circle\"],null],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"shouldDisplayTrend\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[16,\"class\",[34,[\"trend \",[28,[\"model\",\"trend\"]]]]],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"value\"],[16,\"title\",[34,[[28,[\"model\",\"trendTitle\"]]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"average\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"number\"],[[28,[\"model\",\"currentAverage\"]]],null],false],[6,[\"if\"],[[28,[\"model\",\"percent\"]]],null,{\"statements\":[[0,\"%\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[1,[33,[\"number\"],[[28,[\"model\",\"currentTotal\"]]],[[\"noTitle\"],[\"true\"]]],false],[6,[\"if\"],[[28,[\"model\",\"percent\"]]],null,{\"statements\":[[0,\"%\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"trendIcon\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"d-icon\"],[[28,[\"model\",\"trendIcon\"]]],[[\"class\"],[\"icon\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"body\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"main\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"showError\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"hasData\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"currentMode\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"component\"],[[28,[\"modeComponent\"]]],[[\"model\",\"options\"],[[28,[\"model\"]],[28,[\"options\"]]]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"relatedReport\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"admin-report\"],null,[[\"showFilteringUI\",\"dataSourceName\"],[false,[28,[\"model\",\"relatedReport\",\"type\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"rateLimitationString\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"alert alert-error report-alert rate-limited\"],[13],[0,\"\\n              \"],[1,[33,[\"d-icon\"],[\"thermometer-three-quarters\"],null],false],[0,\"\\n              \"],[11,\"span\",[]],[13],[1,[26,[\"rateLimitationString\"]],false],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"alert alert-info report-alert no-data\"],[13],[0,\"\\n              \"],[1,[33,[\"d-icon\"],[\"pie-chart\"],null],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"reportUrl\"]]],null,{\"statements\":[[0,\"                \"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"model\",\"reportUrl\"]]]]],[15,\"class\",\"report-url\"],[13],[0,\"\\n                  \"],[11,\"span\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"title\"]]],null,{\"statements\":[[0,\"                      \"],[1,[28,[\"model\",\"title\"]],false],[0,\" —\\n\"]],\"locals\":[]},null],[0,\"                    \"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.no_data\"],null],false],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"span\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.no_data\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"showTimeoutError\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"alert alert-error report-alert timeout\"],[13],[0,\"\\n            \"],[1,[33,[\"d-icon\"],[\"exclamation-triangle\"],null],false],[0,\"\\n            \"],[11,\"span\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.timeout_error\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showExceptionError\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"alert alert-error report-alert exception\"],[13],[0,\"\\n            \"],[1,[33,[\"d-icon\"],[\"exclamation-triangle\"],null],false],[0,\"\\n            \"],[11,\"span\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.exception_error\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showFilteringUI\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showModes\"]]],null,{\"statements\":[[0,\"          \"],[11,\"ul\",[]],[15,\"class\",\"modes\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"displayedModes\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[15,\"class\",\"mode\"],[13],[0,\"\\n                \"],[1,[33,[\"d-button\"],null,[[\"action\",\"actionParam\",\"class\",\"icon\"],[\"changeMode\",[28,[\"displayedMode\",\"mode\"]],[28,[\"displayedMode\",\"cssClass\"]],[28,[\"displayedMode\",\"icon\"]]]]],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"displayedMode\"]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showDatesOptions\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"control\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[0,\"\\n              \"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.start_date\"],null],false],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"input\"],[13],[0,\"\\n              \"],[1,[33,[\"date-picker-past\"],null,[[\"value\",\"defaultDate\"],[[28,[\"startDate\"]],[28,[\"startDate\"]]]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n          \"],[11,\"div\",[]],[15,\"class\",\"control\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[0,\"\\n              \"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.end_date\"],null],false],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"input\"],[13],[0,\"\\n              \"],[1,[33,[\"date-picker-past\"],null,[[\"value\",\"defaultDate\"],[[28,[\"endDate\"]],[28,[\"endDate\"]]]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showCategoryOptions\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"control\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"input\"],[13],[0,\"\\n              \"],[1,[33,[\"search-advanced-category-chooser\"],null,[[\"filterable\",\"value\",\"castInteger\"],[true,[28,[\"category\"]],true]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showGroupOptions\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"control\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"input\"],[13],[0,\"\\n              \"],[1,[33,[\"combo-box\"],null,[[\"castInteger\",\"filterable\",\"valueAttribute\",\"content\",\"value\"],[true,true,\"value\",[28,[\"groupOptions\"]],[28,[\"groupId\"]]]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showExport\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"control\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"input\"],[13],[0,\"\\n              \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\",\"icon\"],[\"btn-default export-csv-btn\",\"exportCsv\",\"admin.export_csv.button_text\",\"download\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showRefresh\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"control\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"input\"],[13],[0,\"\\n              \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\",\"icon\"],[\"refresh-report-btn btn-primary\",\"refreshReport\",\"admin.dashboard.reports.refresh_report\",\"refresh\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"alert alert-info\"],[13],[0,\"\\n    \"],[1,[33,[\"i18n\"],[[28,[\"disabledLabel\"]]],null],true],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-report"}});
Ember.TEMPLATES["admin/templates/components/admin-user-field-item"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"editing\"]]],null,{\"statements\":[[6,[\"admin-form-row\"],null,[[\"label\"],[\"admin.user_fields.type\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\"],[[28,[\"fieldTypes\"]],[28,[\"buffered\",\"field_type\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"admin-form-row\"],null,[[\"label\"],[\"admin.user_fields.name\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"input\"],null,[[\"value\",\"class\",\"maxlength\"],[[28,[\"buffered\",\"name\"]],\"user-field-name\",\"255\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"admin-form-row\"],null,[[\"label\"],[\"admin.user_fields.description\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"input\"],null,[[\"value\",\"class\",\"maxlength\"],[[28,[\"buffered\",\"description\"]],\"user-field-desc\",\"255\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"bufferedFieldType\",\"hasOptions\"]]],null,{\"statements\":[[6,[\"admin-form-row\"],null,[[\"label\"],[\"admin.user_fields.options\"]],{\"statements\":[[0,\"      \"],[1,[33,[\"value-list\"],null,[[\"values\",\"inputType\"],[[28,[\"buffered\",\"options\"]],\"array\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"admin-form-row\"],null,[[\"wrapLabel\"],[\"true\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"buffered\",\"editable\"]]]]],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user_fields.editable.title\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"admin-form-row\"],null,[[\"wrapLabel\"],[\"true\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"buffered\",\"required\"]]]]],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user_fields.required.title\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"admin-form-row\"],null,[[\"wrapLabel\"],[\"true\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"buffered\",\"show_on_profile\"]]]]],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user_fields.show_on_profile.title\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"admin-form-row\"],null,[[\"wrapLabel\"],[\"true\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"buffered\",\"show_on_user_card\"]]]]],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user_fields.show_on_user_card.title\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"admin-form-row\"],null,null,{\"statements\":[[0,\"    \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\",\"label\"],[\"save\",\"btn-primary\",\"check\",\"admin.user_fields.save\"]]],false],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\",\"label\"],[\"cancel\",\"btn-danger\",\"times\",\"admin.user_fields.cancel\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"form-display\"],[13],[0,\"\\n      \"],[11,\"strong\",[]],[13],[1,[28,[\"userField\",\"name\"]],false],[14],[0,\"\\n      \"],[11,\"br\",[]],[13],[14],[0,\"\\n      \"],[1,[28,[\"userField\",\"description\"]],true],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"form-display\"],[13],[1,[26,[\"fieldName\"]],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"form-element controls\"],[13],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\",\"label\"],[\"edit\",\"btn-default\",\"pencil\",\"admin.user_fields.edit\"]]],false],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\",\"label\"],[\"destroy\",\"btn-danger\",\"trash-o\",\"admin.user_fields.delete\"]]],false],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\",\"disabled\"],[\"moveUp\",\"btn-default\",\"arrow-up\",[28,[\"cantMoveUp\"]]]]],false],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\",\"disabled\"],[\"moveDown\",\"btn-default\",\"arrow-down\",[28,[\"cantMoveDown\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[1,[26,[\"flags\"]],false],[14],[0,\"\\n\"]],\"locals\":[]}],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-user-field-item"}});
Ember.TEMPLATES["admin/templates/components/admin-web-hook-event-chooser"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"input\"],null,[[\"id\",\"type\",\"name\",\"checked\"],[[28,[\"typeName\"]],\"checkbox\",\"event-choice\",[28,[\"enabled\"]]]]],false],[0,\"\\n\"],[11,\"label\",[]],[16,\"for\",[26,[\"typeName\"]],null],[13],[1,[26,[\"name\"]],false],[14],[0,\"\\n\"],[11,\"p\",[]],[13],[1,[26,[\"details\"]],false],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-web-hook-event-chooser"}});
Ember.TEMPLATES["admin/templates/components/admin-web-hook-event"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"col first status\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[16,\"class\",[34,[[26,[\"statusColorClasses\"]]]]],[13],[1,[28,[\"model\",\"status\"]],false],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"col event-id\"],[13],[1,[28,[\"model\",\"id\"]],false],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"col timestamp\"],[13],[1,[26,[\"createdAt\"]],false],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"col completion\"],[13],[1,[26,[\"completion\"]],false],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"col actions\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"label\"],[\"ellipsis-v\",\"toggleRequest\",\"admin.web_hooks.events.request\"]]],false],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"label\"],[\"ellipsis-v\",\"toggleResponse\",\"admin.web_hooks.events.response\"]]],false],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"label\"],[\"refresh\",\"redeliver\",\"admin.web_hooks.events.redeliver\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"expandDetails\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n    \"],[11,\"h3\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.headers\"],null],false],[14],[0,\"\\n    \"],[11,\"pre\",[]],[13],[11,\"code\",[]],[13],[1,[26,[\"headers\"]],false],[14],[14],[0,\"\\n    \"],[11,\"h3\",[]],[13],[1,[26,[\"bodyLabel\"]],false],[14],[0,\"\\n    \"],[11,\"pre\",[]],[13],[11,\"code\",[]],[13],[1,[26,[\"body\"]],false],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/admin-web-hook-event"}});
Ember.TEMPLATES["admin/templates/components/embeddable-host"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"editing\"]]],null,{\"statements\":[[0,\"  \"],[11,\"td\",[]],[15,\"class\",\"editing-input\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.host\"],null],false],[14],[0,\"\\n    \"],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\",\"enter\",\"class\"],[[28,[\"buffered\",\"host\"]],\"example.com\",\"save\",\"host-name\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\\t\"],[11,\"td\",[]],[15,\"class\",\"editing-input\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.class_name\"],null],false],[14],[0,\"\\n    \"],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\",\"enter\",\"class\"],[[28,[\"buffered\",\"class_name\"]],\"class\",\"save\",\"class-name\"]]],false],[0,\"\\n\\t\"],[14],[0,\"\\n  \"],[11,\"td\",[]],[15,\"class\",\"editing-input\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.path_whitelist\"],null],false],[14],[0,\"\\n    \"],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\",\"enter\",\"class\"],[[28,[\"buffered\",\"path_whitelist\"]],\"/blog/.*\",\"save\",\"path-whitelist\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"td\",[]],[15,\"class\",\"editing-input\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.category\"],null],false],[14],[0,\"\\n    \"],[1,[33,[\"category-chooser\"],null,[[\"value\",\"class\"],[[28,[\"categoryId\"]],\"small\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"td\",[]],[15,\"class\",\"editing-controls\"],[13],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"class\",\"disabled\"],[\"check\",\"save\",\"btn-primary\",[28,[\"cantSave\"]]]]],false],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"class\",\"disabled\"],[\"times\",\"cancel\",\"btn-danger\",[28,[\"host\",\"isSaving\"]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"td\",[]],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.host\"],null],false],[14],[1,[28,[\"host\",\"host\"]],false],[14],[0,\"\\n  \"],[11,\"td\",[]],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.class_name\"],null],false],[14],[1,[28,[\"host\",\"class_name\"]],false],[14],[0,\"\\n  \"],[11,\"td\",[]],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.path_whitelist\"],null],false],[14],[1,[28,[\"host\",\"path_whitelist\"]],false],[14],[0,\"\\n  \"],[11,\"td\",[]],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.category\"],null],false],[14],[1,[33,[\"category-badge\"],[[28,[\"host\",\"category\"]]],null],false],[14],[0,\"\\n  \"],[11,\"td\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\"],[\"pencil\",\"edit\"]]],false],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"action\",\"class\"],[\"trash-o\",\"delete\",\"btn-danger\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/embeddable-host"}});
Ember.TEMPLATES["admin/templates/components/embedding-setting"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"isCheckbox\"]]],null,{\"statements\":[[0,\"  \"],[11,\"label\",[]],[16,\"for\",[26,[\"inputId\"]],null],[13],[0,\"\\n    \"],[1,[33,[\"input\"],null,[[\"checked\",\"id\",\"type\"],[[28,[\"checked\"]],[28,[\"inputId\"]],\"checkbox\"]]],false],[0,\"\\n    \"],[1,[33,[\"i18n\"],[[28,[\"translationKey\"]]],null],false],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"label\",[]],[16,\"for\",[26,[\"inputId\"]],null],[13],[1,[33,[\"i18n\"],[[28,[\"translationKey\"]]],null],false],[14],[0,\"\\n  \"],[1,[33,[\"input\"],null,[[\"value\",\"id\",\"placeholder\"],[[28,[\"value\"]],[28,[\"inputId\"]],[28,[\"placeholder\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/embedding-setting"}});
Ember.TEMPLATES["admin/templates/components/flag-counts"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/flag-counts"}});
Ember.TEMPLATES["admin/templates/components/flag-user-lists"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"flagged-by\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"user-list-title\"],[13],[0,\"\\n    \"],[1,[33,[\"i18n\"],[\"admin.flags.flagged_by\"],null],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"flag-users\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"flaggedPost\",\"post_actions\"]]],null,{\"statements\":[[6,[\"flag-user\"],null,[[\"user\",\"date\"],[[28,[\"postAction\",\"user\"]],[28,[\"postAction\",\"created_at\"]]]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"flagger-flag-type\"],[13],[0,\"\\n          \"],[1,[33,[\"post-action-title\"],[[28,[\"postAction\",\"post_action_type_id\"]],[28,[\"postAction\",\"name_key\"]]],null],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[1,[33,[\"user-flag-percentage\"],null,[[\"user\"],[[28,[\"postAction\",\"user\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"postAction\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showResolvedBy\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"flagged-post-resolved-by\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"user-list-title\"],[13],[0,\"\\n      \"],[1,[33,[\"i18n\"],[\"admin.flags.resolved_by\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"flag-users\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"flaggedPost\",\"post_actions\"]]],null,{\"statements\":[[6,[\"flag-user\"],null,[[\"user\",\"date\"],[[28,[\"postAction\",\"disposed_by\"]],[28,[\"postAction\",\"disposed_at\"]]]],{\"statements\":[[0,\"          \"],[1,[33,[\"disposition-icon\"],[[28,[\"postAction\",\"disposition\"]]],null],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"postAction\",\"staff_took_action\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"d-icon\"],[\"gavel\"],[[\"title\"],[\"admin.flags.took_action\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[\"postAction\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/flag-user-lists"}});
Ember.TEMPLATES["admin/templates/components/flag-user"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"flag-user\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminUser\",[28,[\"user\",\"id\"]],[28,[\"user\",\"username\"]]],[[\"class\"],[\"flag-user-avatar\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"avatar\"],[[28,[\"user\"]]],[[\"imageSize\"],[\"small\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"flag-user-details\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"flag-user-who\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminUser\",[28,[\"user\",\"id\"]],[28,[\"user\",\"username\"]]],[[\"class\"],[\"flag-user-username\"]],{\"statements\":[[0,\"        \"],[1,[28,[\"user\",\"username\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"flag-user-date\"],[16,\"title\",[34,[[33,[\"raw-date\"],[[28,[\"date\"]]],null]]]],[13],[0,\"\\n        \"],[1,[33,[\"format-age\"],[[28,[\"date\"]]],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"flag-user-extra\"],[13],[0,\"\\n      \"],[18,\"default\"],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/flag-user"}});
Ember.TEMPLATES["admin/templates/components/flagged-post-response"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"link-to\"],[\"adminUser\",[28,[\"response\",\"user\",\"id\"]],[28,[\"response\",\"user\",\"username\"]]],[[\"class\"],[\"response-avatar\"]],{\"statements\":[[0,\"  \"],[1,[33,[\"avatar\"],[[28,[\"response\",\"user\"]]],[[\"imageSize\"],[\"small\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[11,\"div\",[]],[15,\"class\",\"excerpt\"],[13],[1,[28,[\"response\",\"excerpt\"]],true],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"hasMore\"]]],null,{\"statements\":[[0,\"  \"],[11,\"a\",[]],[16,\"href\",[26,[\"permalink\"]],null],[15,\"class\",\"has-more\"],[13],[1,[33,[\"i18n\"],[\"admin.flags.more\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/flagged-post-response"}});
Ember.TEMPLATES["admin/templates/components/flagged-post-title"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"flaggedPost\",\"topic\",\"isPrivateMessage\"]]],null,{\"statements\":[[0,\"  \"],[11,\"span\",[]],[15,\"class\",\"private-message-glyph\"],[13],[1,[33,[\"d-icon\"],[\"envelope\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[1,[33,[\"topic-status\"],null,[[\"topic\"],[[28,[\"flaggedPost\",\"topic\"]]]]],false],[0,\"\\n\"],[11,\"a\",[]],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"flaggedPost\",\"url\"]]],null]]]],[13],[1,[33,[\"unbound\"],[[28,[\"flaggedPost\",\"topic\",\"fancyTitle\"]]],null],true],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"flaggedPost\",\"reply_count\"]]],null,{\"statements\":[[0,\"  \"],[11,\"span\",[]],[15,\"class\",\"flagged-post-reply-count\"],[13],[1,[33,[\"i18n\"],[\"admin.flags.replies\"],[[\"count\"],[[28,[\"flaggedPost\",\"reply_count\"]]]]],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/flagged-post-title"}});
Ember.TEMPLATES["admin/templates/components/flagged-post"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"flagged-post-details\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"flagged-post-avatar\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"flaggedPost\",\"postAuthorFlagged\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"flaggedPost\",\"user\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"adminUser\",[28,[\"flaggedPost\",\"user\",\"id\"]],[28,[\"flaggedPost\",\"user\",\"username\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"avatar\"],[[28,[\"flaggedPost\",\"user\"]]],[[\"imageSize\"],[\"large\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"flaggedPost\",\"wasEdited\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"edited-after\"],[13],[0,\"\\n            \"],[1,[33,[\"d-icon\"],[\"pencil\"],[[\"title\"],[\"admin.flags.was_edited\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"canAct\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"flaggedPost\",\"previous_flags_count\"]]],null,{\"statements\":[[0,\"        \"],[11,\"span\",[]],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.flags.previous_flags_count\"],[[\"count\"],[[28,[\"flaggedPost\",\"previous_flags_count\"]]]]]]]],[15,\"class\",\"badge-notification previous-flagged-posts\"],[13],[1,[28,[\"flaggedPost\",\"previous_flags_count\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"flagged-post-contents\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"flagged-post-user-details\"],[13],[0,\"\\n      \"],[11,\"a\",[]],[15,\"class\",\"username\"],[16,\"href\",[28,[\"user\",\"path\"]],null],[16,\"data-user-card\",[28,[\"flaggedPost\",\"user\",\"username\"]],null],[13],[1,[33,[\"format-username\"],[[28,[\"flaggedPost\",\"user\",\"username\"]]],null],false],[14],[0,\"\\n      \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"tagName\",\"args\"],[\"flagged-post-controls\",\"\",[33,[\"hash\"],null,[[\"flaggedPost\",\"actableFilter\",\"topic\"],[[28,[\"flaggedPost\"]],[28,[\"actableFilter\"]],[28,[\"topic\"]]]]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"flagged-post-excerpt\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"hideTitle\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"flagged-post-title\"],null,[[\"flaggedPost\"],[[28,[\"flaggedPost\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"flaggedPost\",\"postAuthorFlagged\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"expanded\"]]],null,{\"statements\":[[0,\"          \"],[1,[28,[\"flaggedPost\",\"cooked\"]],true],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"p\",[]],[13],[0,\"\\n            \"],[1,[28,[\"flaggedPost\",\"excerpt\"]],true],[0,\"\\n            \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"expand\"]],[13],[1,[33,[\"i18n\"],[\"admin.flags.show_full\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"flaggedPost\",\"topicFlagged\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"flagged-post-message\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[1,[33,[\"i18n\"],[\"admin.flags.topic_flagged\"],null],true],[14],[0,\"\\n        \"],[11,\"a\",[]],[16,\"href\",[28,[\"flaggedPost\",\"url\"]],null],[15,\"class\",\"btn\"],[13],[1,[33,[\"i18n\"],[\"admin.flags.visit_topic\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"each\"],[[28,[\"flaggedPost\",\"conversations\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"flag-conversation\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"c\",\"response\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"flagged-post-response\"],null,[[\"response\"],[[28,[\"c\",\"response\"]]]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"c\",\"reply\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"flagged-post-response\"],null,[[\"response\",\"hasMore\",\"permalink\"],[[28,[\"c\",\"reply\"]],[28,[\"c\",\"hasMore\"]],[28,[\"c\",\"permalink\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[11,\"a\",[]],[16,\"href\",[28,[\"c\",\"permalink\"]],null],[15,\"class\",\"btn reply-conversation btn-small\"],[13],[0,\"\\n            \"],[1,[33,[\"d-icon\"],[\"reply\"],null],false],[0,\"\\n            \"],[1,[33,[\"i18n\"],[\"admin.flags.reply_message\"],null],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"c\"]},null],[0,\"\\n    \"],[1,[33,[\"flag-user-lists\"],null,[[\"flaggedPost\",\"showResolvedBy\"],[[28,[\"flaggedPost\"]],[28,[\"showResolvedBy\"]]]]],false],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"flagged-post-controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"canAct\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"admin-agree-flag-dropdown\"],null,[[\"post\",\"removeAfter\"],[[28,[\"flaggedPost\"]],[33,[\"action\"],[[28,[null]],\"removeAfter\"],null]]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"flaggedPost\",\"postHidden\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"title\",\"class\",\"action\",\"icon\",\"label\"],[\"admin.flags.disagree_flag_unhide_post_title\",\"btn-default disagree-flag\",\"disagree\",\"thumbs-o-down\",\"admin.flags.disagree_flag_unhide_post\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"title\",\"class\",\"action\",\"icon\",\"label\"],[\"admin.flags.disagree_flag_title\",\"btn-default disagree-flag\",\"disagree\",\"thumbs-o-down\",\"admin.flags.disagree_flag\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"title\",\"action\",\"icon\",\"label\"],[\"btn-default defer-flag\",\"admin.flags.ignore_flag_title\",\"defer\",\"external-link\",\"admin.flags.ignore_flag\"]]],false],[0,\"\\n\\n        \"],[1,[33,[\"admin-delete-flag-dropdown\"],null,[[\"post\",\"removeAfter\"],[[28,[\"flaggedPost\"]],[33,[\"action\"],[[28,[null]],\"removeAfter\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"class\",\"icon\",\"label\",\"action\"],[\"btn-default\",\"list\",\"admin.flags.moderation_history\",[33,[\"action\"],[[28,[null]],\"showModerationHistory\"],null]]]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"tagName\",\"args\"],[\"flagged-post-below-controls\",\"\",[33,[\"hash\"],null,[[\"flaggedPost\",\"canAct\",\"actableFilter\"],[[28,[\"flaggedPost\"]],[28,[\"canAct\"]],[28,[\"actableFilter\"]]]]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/flagged-post"}});
Ember.TEMPLATES["admin/templates/components/flagged-posts"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"flaggedPosts\"]]],null,{\"statements\":[[6,[\"load-more\"],null,[[\"selector\",\"action\"],[\".flagged-post\",[33,[\"action\"],[[28,[null]],\"loadMore\"],null]]],{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"flagged-posts\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"flaggedPosts\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"flagged-post\"],null,[[\"flaggedPost\",\"filter\",\"topic\",\"showResolvedBy\",\"removePost\",\"hideTitle\"],[[28,[\"flaggedPost\"]],[28,[\"filter\"]],[28,[\"topic\"]],[28,[\"showResolvedBy\"]],[33,[\"action\"],[[28,[null]],\"removePost\",[28,[\"flaggedPost\"]]],null],[28,[\"topic\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"flaggedPost\"]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.flags.no_results\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/flagged-posts"}});
Ember.TEMPLATES["admin/templates/components/flagged-topic-users"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"each\"],[[28,[\"users\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"adminUser\",[28,[\"u\",\"id\"]],[28,[\"u\",\"username\"]]],[[\"class\"],[\"flagged-topic-user\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"avatar\"],[[28,[\"u\"]]],[[\"imageSize\"],[\"small\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"u\"]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/flagged-topic-users"}});
Ember.TEMPLATES["admin/templates/components/highlighted-code"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"pre\",[]],[13],[11,\"code\",[]],[16,\"class\",[26,[\"lang\"]],null],[13],[1,[26,[\"code\"]],false],[14],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/highlighted-code"}});
Ember.TEMPLATES["admin/templates/components/inline-edit-checkbox"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"label\",[]],[15,\"class\",\"checkbox-label\"],[13],[0,\"\\n  \"],[1,[33,[\"input\"],null,[[\"type\",\"disabled\",\"checked\"],[\"checkbox\",[28,[\"disabled\"]],[28,[\"checkedInternal\"]]]]],false],[0,\"\\n  \"],[1,[26,[\"label\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"changed\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"finished\",\"btn-primary btn-small submit-edit\",\"check\"]]],false],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"cancelled\",\"btn-small cancel-edit\",\"times\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/inline-edit-checkbox"}});
Ember.TEMPLATES["admin/templates/components/moderation-history-item"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"td\",[]],[15,\"class\",\"date\"],[13],[0,\"\\n  \"],[1,[33,[\"format-date\"],[[28,[\"item\",\"created_at\"]]],null],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"history-item-action\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"action-name\"],[13],[0,\"\\n    \"],[1,[33,[\"i18n\"],[[33,[\"concat\"],[\"admin.moderation_history.actions.\",[28,[\"item\",\"action_name\"]]],null]],null],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"action-details\"],[13],[1,[28,[\"item\",\"details\"]],false],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"history-item-actor\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"acting_user\"]]],null,{\"statements\":[[6,[\"user-link\"],null,[[\"user\"],[[28,[\"item\",\"acting_user\"]]]],{\"statements\":[[0,\"      \"],[1,[33,[\"avatar\"],[[28,[\"item\",\"acting_user\"]]],[[\"imageSize\"],[\"small\"]]],false],[0,\"\\n      \"],[11,\"span\",[]],[13],[1,[33,[\"format-username\"],[[28,[\"item\",\"acting_user\",\"username\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/moderation-history-item"}});
Ember.TEMPLATES["admin/templates/components/penalty-post-action"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"penalty-post-controls\"],[13],[0,\"\\n  \"],[11,\"label\",[]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"penalty-post-label\"],[13],[0,\"\\n      \"],[1,[33,[\"i18n\"],[\"admin.user.penalty_post_actions\"],null],true],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"combo-box\"],null,[[\"value\",\"content\",\"onSelect\"],[[28,[\"postAction\"]],[28,[\"penaltyActions\"]],[33,[\"action\"],[[28,[null]],\"penaltyChanged\"],null]]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"editing\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"penalty-post-edit\"],[13],[0,\"\\n    \"],[1,[33,[\"textarea\"],null,[[\"value\",\"class\"],[[28,[\"postEdit\"]],\"post-editor\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/penalty-post-action"}});
Ember.TEMPLATES["admin/templates/components/permalink-form"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"b\",[]],[13],[1,[33,[\"i18n\"],[\"admin.permalink.form.label\"],null],false],[14],[0,\"\\n\"],[1,[33,[\"text-field\"],null,[[\"value\",\"disabled\",\"class\",\"placeholderKey\",\"autocorrect\",\"autocapitalize\"],[[28,[\"url\"]],[28,[\"formSubmitted\"]],\"permalink-url\",\"admin.permalink.url\",\"off\",\"off\"]]],false],[0,\"\\n\"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\"],[[28,[\"permalinkTypes\"]],[28,[\"permalinkType\"]]]]],false],[0,\"\\n\"],[1,[33,[\"text-field\"],null,[[\"value\",\"disabled\",\"class\",\"placeholderKey\",\"autocorrect\",\"autocapitalize\"],[[28,[\"permalink_type_value\"]],[28,[\"formSubmitted\"]],\"external-url\",[28,[\"permalinkTypePlaceholder\"]],\"off\",\"off\"]]],false],[0,\"\\n\"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"disabled\",\"label\"],[\"btn-default\",\"submit\",[28,[\"formSubmitted\"]],\"admin.permalink.form.add\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/permalink-form"}});
Ember.TEMPLATES["admin/templates/components/permalinks-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/permalinks-list"}});
Ember.TEMPLATES["admin/templates/components/save-controls"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"d-button\"],null,[[\"action\",\"disabled\",\"label\",\"class\"],[\"saveChanges\",[28,[\"buttonDisabled\"]],[28,[\"savingText\"]],\"btn-primary save-changes\"]]],false],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"save-messages\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"saved\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"saved\"],[13],[1,[33,[\"i18n\"],[\"saved\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/save-controls"}});
Ember.TEMPLATES["admin/templates/components/screened-ip-address-form"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"b\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.screened_ips.form.label\"],null],false],[14],[0,\"\\n\"],[1,[33,[\"text-field\"],null,[[\"value\",\"disabled\",\"class\",\"placeholderKey\",\"autocorrect\",\"autocapitalize\"],[[28,[\"ip_address\"]],[28,[\"formSubmitted\"]],\"ip-address-input\",\"admin.logs.screened_ips.form.ip_address\",\"off\",\"off\"]]],false],[0,\"\\n\"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\"],[[28,[\"actionNames\"]],[28,[\"actionName\"]]]]],false],[0,\"\\n\"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"disabled\",\"label\"],[\"btn-default\",\"submit\",[28,[\"formSubmitted\"]],\"admin.logs.screened_ips.form.add\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/screened-ip-address-form"}});
Ember.TEMPLATES["admin/templates/components/secret-value-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"collection\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"values\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"collection\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[16,\"data-index\",[28,[\"index\"]],null],[13],[0,\"\\n        \"],[1,[33,[\"d-button\"],null,[[\"action\",\"actionParam\",\"icon\",\"class\"],[\"removeValue\",[28,[\"value\"]],\"times\",\"remove-value-btn btn-small\"]]],false],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"value\",\"class\",\"focus-out\"],[[28,[\"value\",\"key\"]],\"value-input\",[33,[\"action\"],[[28,[null]],\"changeKey\",[28,[\"index\"]]],null]]]],false],[0,\"\\n        \"],[1,[33,[\"input\"],[[33,[\"-input-type\"],[[33,[\"if\"],[[28,[\"isSecret\"]],\"password\",\"text\"],null]],null]],[[\"value\",\"class\",\"focus-out\",\"type\"],[[28,[\"value\",\"secret\"]],\"value-input\",[33,[\"action\"],[[28,[null]],\"changeSecret\",[28,[\"index\"]]],null],[33,[\"if\"],[[28,[\"isSecret\"]],\"password\",\"text\"],null]]]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"value\",\"index\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n  \"],[1,[33,[\"text-field\"],null,[[\"value\",\"class\",\"placeholder\"],[[28,[\"newKey\"]],\"new-value-input key\",[28,[\"setting\",\"placeholder\",\"key\"]]]]],false],[0,\"\\n  \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"password\",[28,[\"newSecret\"]],\"new-value-input secret\",[28,[\"setting\",\"placeholder\",\"value\"]]]]],false],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"icon\",\"class\"],[\"addValue\",\"plus\",\"add-value-btn btn-small\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/secret-value-list"}});
Ember.TEMPLATES["admin/templates/components/setting-validation-message"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"validation-error \",[33,[\"unless\"],[[28,[\"message\"]],\"hidden\"],null]]]],[13],[0,\"\\n  \"],[1,[33,[\"d-icon\"],[\"times\"],null],false],[0,\"\\n  \"],[1,[26,[\"message\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/setting-validation-message"}});
Ember.TEMPLATES["admin/templates/components/silence-details"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"reason-controls\"],[13],[0,\"\\n  \"],[11,\"label\",[]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"silence-reason-label\"],[13],[0,\"\\n      \"],[1,[33,[\"i18n\"],[\"admin.user.silence_reason_label\"],null],true],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"text-field\"],null,[[\"value\",\"class\",\"placeholderKey\"],[[28,[\"reason\"]],\"silence-reason\",\"admin.user.silence_reason_placeholder\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"label\",[]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"silence-message-label\"],[13],[0,\"\\n    \"],[1,[33,[\"i18n\"],[\"admin.user.silence_message\"],null],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[1,[33,[\"textarea\"],null,[[\"value\",\"class\",\"placeholder\"],[[28,[\"message\"]],\"silence-message\",[33,[\"i18n\"],[\"admin.user.silence_message_placeholder\"],null]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/silence-details"}});
Ember.TEMPLATES["admin/templates/components/site-customization-change-details"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"section\",[]],[15,\"class\",\"field\"],[13],[0,\"\\n  \"],[11,\"b\",[]],[13],[1,[33,[\"i18n\"],[\"admin.customize.enabled\"],null],false],[14],[0,\": \"],[1,[28,[\"change\",\"enabled\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"field\",\"name\"],[[28,[\"change\",\"stylesheet\"]],\"admin.customize.css\"]]],false],[0,\"\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"icon\",\"field\",\"name\"],[\"mobile\",[28,[\"change\",\"mobile_stylesheet\"]],\"admin.customize.css\"]]],false],[0,\"\\n\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"field\",\"name\"],[[28,[\"change\",\"header\"]],\"admin.customize.header\"]]],false],[0,\"\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"icon\",\"field\",\"name\"],[\"mobile\",[28,[\"change\",\"mobile_header\"]],\"admin.customize.header\"]]],false],[0,\"\\n\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"field\",\"name\"],[[28,[\"change\",\"top\"]],\"admin.customize.top\"]]],false],[0,\"\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"icon\",\"field\",\"name\"],[\"mobile\",[28,[\"change\",\"mobile_top\"]],\"admin.customize.top\"]]],false],[0,\"\\n\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"field\",\"name\"],[[28,[\"change\",\"footer\"]],\"admin.customize.footer\"]]],false],[0,\"\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"icon\",\"field\",\"name\"],[\"mobile\",[28,[\"change\",\"mobile_footer\"]],\"admin.customize.footer\"]]],false],[0,\"\\n\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"icon\",\"field\",\"name\"],[\"file-text-o\",[28,[\"change\",\"head_tag\"]],\"admin.customize.head_tag.text\"]]],false],[0,\"\\n\"],[1,[33,[\"site-customization-change-field\"],null,[[\"icon\",\"field\",\"name\"],[\"file-text-o\",[28,[\"change\",\"body_tag\"]],\"admin.customize.body_tag.text\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-customization-change-details"}});
Ember.TEMPLATES["admin/templates/components/site-customization-change-field"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"field\"]]],null,{\"statements\":[[0,\"  \"],[11,\"section\",[]],[15,\"class\",\"field\"],[13],[0,\"\\n    \"],[11,\"b\",[]],[13],[1,[33,[\"i18n\"],[[28,[\"name\"]]],null],false],[14],[0,\": (\"],[1,[33,[\"i18n\"],[\"character_count\"],[[\"count\"],[[28,[\"field\",\"length\"]]]]],false],[0,\")\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[1,[33,[\"textarea\"],null,[[\"value\",\"class\"],[[28,[\"field\"]],\"plain\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-customization-change-field"}});
Ember.TEMPLATES["admin/templates/components/site-setting"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"setting-label\"],[13],[0,\"\\n   \"],[11,\"h3\",[]],[13],[1,[33,[\"unbound\"],[[28,[\"settingName\"]]],null],false],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"setting-value\"],[13],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"componentName\"]]],[[\"setting\",\"value\",\"validationMessage\",\"preview\",\"isSecret\"],[[28,[\"setting\"]],[28,[\"buffered\",\"value\"]],[28,[\"validationMessage\"]],[28,[\"preview\"]],[28,[\"isSecret\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"dirty\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"setting-controls\"],[13],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\"],[\"ok\",\"save\",\"check\"]]],false],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\"],[\"cancel\",\"cancel\",\"times\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"setting\",\"overridden\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"setting\",\"secret\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"d-button\"],null,[[\"action\",\"icon\"],[\"toggleSecret\",\"eye-slash\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default undo\",\"resetDefault\",\"undo\",\"admin.settings.reset\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-setting"}});
Ember.TEMPLATES["admin/templates/components/site-settings/bool"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"label\",[]],[13],[0,\"\\n  \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"enabled\"]]]]],false],[0,\"\\n  \"],[11,\"span\",[]],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n  \"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/bool"}});
Ember.TEMPLATES["admin/templates/components/site-settings/category-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"category-selector\"],null,[[\"categories\"],[[28,[\"selectedCategories\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/category-list"}});
Ember.TEMPLATES["admin/templates/components/site-settings/category"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"category-chooser\"],null,[[\"value\",\"allowUncategorized\"],[[28,[\"value\"]],\"true\"]]],false],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/category"}});
Ember.TEMPLATES["admin/templates/components/site-settings/compact-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"list-setting\"],null,[[\"settingValue\",\"choices\",\"settingName\"],[[28,[\"value\"]],[28,[\"setting\",\"choices\"]],[28,[\"setting\",\"setting\"]]]]],false],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/compact-list"}});
Ember.TEMPLATES["admin/templates/components/site-settings/enum"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"combo-box\"],null,[[\"castInteger\",\"valueAttribute\",\"content\",\"value\",\"none\"],[true,\"value\",[28,[\"setting\",\"validValues\"]],[28,[\"value\"]],[28,[\"setting\",\"allowsNone\"]]]]],false],[0,\"\\n\"],[1,[26,[\"preview\"]],false],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/enum"}});
Ember.TEMPLATES["admin/templates/components/site-settings/host-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"value-list\"],null,[[\"values\",\"addKey\"],[[28,[\"value\"]],\"admin.site_settings.add_host\"]]],false],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/host-list"}});
Ember.TEMPLATES["admin/templates/components/site-settings/list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"value-list\"],null,[[\"values\",\"inputDelimiter\",\"choices\"],[[28,[\"value\"]],\"|\",[28,[\"setting\",\"choices\"]]]]],false],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/list"}});
Ember.TEMPLATES["admin/templates/components/site-settings/secret-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"secret-value-list\"],null,[[\"setting\",\"values\",\"isSecret\"],[[28,[\"setting\"]],[28,[\"value\"]],[28,[\"isSecret\"]]]]],false],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/secret-list"}});
Ember.TEMPLATES["admin/templates/components/site-settings/string"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"setting\",\"textarea\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"textarea\"],null,[[\"value\",\"classNames\"],[[28,[\"value\"]],\"input-setting-textarea\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"isSecret\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"classNames\"],[\"password\",[28,[\"value\"]],\"input-setting-string\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[1,[33,[\"text-field\"],null,[[\"value\",\"classNames\"],[[28,[\"value\"]],\"input-setting-string\"]]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/string"}});
Ember.TEMPLATES["admin/templates/components/site-settings/uploaded-image-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"d-button\"],null,[[\"label\",\"action\",\"actionParam\"],[\"admin.site_settings.uploaded_image_list.label\",\"showUploadModal\",[33,[\"hash\"],null,[[\"value\",\"setting\"],[[28,[\"value\"]],[28,[\"setting\"]]]]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/uploaded-image-list"}});
Ember.TEMPLATES["admin/templates/components/site-settings/url-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"value-list\"],null,[[\"values\",\"addKey\"],[[28,[\"value\"]],\"admin.site_settings.add_url\"]]],false],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/url-list"}});
Ember.TEMPLATES["admin/templates/components/site-settings/value-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"value-list\"],null,[[\"values\"],[[28,[\"value\"]]]]],false],[0,\"\\n\"],[1,[33,[\"setting-validation-message\"],null,[[\"message\"],[[28,[\"validationMessage\"]]]]],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"unbound\"],[[28,[\"setting\",\"description\"]]],null],true],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-settings/value-list"}});
Ember.TEMPLATES["admin/templates/components/site-text-summary"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"d-button\"],null,[[\"label\",\"class\",\"action\"],[\"admin.site_text.edit\",\"btn-default edit\",\"edit\"]]],false],[0,\"\\n\"],[11,\"h3\",[]],[15,\"class\",\"site-text-id\"],[13],[1,[28,[\"siteText\",\"id\"]],false],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"site-text-value\"],[13],[1,[28,[\"siteText\",\"value\"]],false],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/site-text-summary"}});
Ember.TEMPLATES["admin/templates/components/suspension-details"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"reason-controls\"],[13],[0,\"\\n  \"],[11,\"label\",[]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"suspend-reason-label\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"siteSettings\",\"hide_suspension_reasons\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"i18n\"],[\"admin.user.suspend_reason_hidden_label\"],null],true],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"i18n\"],[\"admin.user.suspend_reason_label\"],null],true],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"text-field\"],null,[[\"value\",\"class\",\"placeholderKey\"],[[28,[\"reason\"]],\"suspend-reason\",\"admin.user.suspend_reason_placeholder\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"label\",[]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"suspend-message-label\"],[13],[0,\"\\n    \"],[1,[33,[\"i18n\"],[\"admin.user.suspend_message\"],null],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[1,[33,[\"textarea\"],null,[[\"value\",\"class\",\"placeholder\"],[[28,[\"message\"]],\"suspend-message\",[33,[\"i18n\"],[\"admin.user.suspend_message_placeholder\"],null]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/suspension-details"}});
Ember.TEMPLATES["admin/templates/components/tags-uploader"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[0,\"  \"],[11,\"label\",[]],[16,\"class\",[34,[\"btn \",[33,[\"if\"],[[28,[\"addDisabled\"]],\"disabled\"],null]]]],[13],[0,\"\\n    \"],[1,[33,[\"d-icon\"],[\"upload\"],null],false],[0,\"\\n    \"],[1,[33,[\"i18n\"],[\"admin.watched_words.form.upload\"],null],false],[0,\"\\n    \"],[11,\"input\",[]],[15,\"class\",\"hidden-upload-field\"],[16,\"disabled\",[26,[\"addDisabled\"]],null],[15,\"type\",\"file\"],[15,\"accept\",\"text/plain,text/csv\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"instructions\"],[13],[1,[33,[\"i18n\"],[\"tagging.upload_instructions\"],null],false],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/tags-uploader"}});
Ember.TEMPLATES["admin/templates/components/themes-list-item"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"inner-wrapper\"],[13],[0,\"\\n  \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"connectorTagName\",\"args\"],[\"admin-customize-themes-list-item\",\"span\",[33,[\"hash\"],null,[[\"theme\"],[[28,[\"theme\"]]]]]]]],false],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"info\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"name\"],[13],[0,\"\\n      \"],[1,[28,[\"theme\",\"name\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"span\",[]],[15,\"class\",\"icons\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"theme\",\"selected\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"theme\",\"default\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"check\"],[[\"class\",\"title\"],[\"default-indicator\",\"admin.customize.theme.default_theme_tooltip\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"theme\",\"isPendingUpdates\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"refresh\"],[[\"title\",\"class\"],[\"admin.customize.theme.updates_available_tooltip\",\"light-grey-icon\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"theme\",\"isBroken\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"exclamation-circle\"],[[\"class\",\"title\"],[\"broken-indicator\",\"admin.customize.theme.broken_theme_tooltip\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"d-icon\"],[\"caret-right\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"displayComponents\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"components-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"children\"]]],null,{\"statements\":[[0,\"        \"],[11,\"span\",[]],[15,\"class\",\"component\"],[13],[0,\"\\n          \"],[1,[28,[\"child\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"child\"]},null],[6,[\"if\"],[[28,[\"displayHasMore\"]]],null,{\"statements\":[[0,\"        \"],[11,\"span\",[]],[15,\"class\",\"others-count\"],[5,[\"action\"],[[28,[null]],\"toggleChildrenExpanded\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"childrenExpanded\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"I18n\"],[\"admin.customize.theme.collapse\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[1,[33,[\"I18n\"],[\"admin.customize.theme.and_x_more\"],[[\"count\"],[[28,[\"moreCount\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/themes-list-item"}});
Ember.TEMPLATES["admin/templates/components/themes-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"themes-list-header\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"themes-tab tab \",[33,[\"if\"],[[28,[\"themesTabActive\"]],\"active\",\"\"],null]]]],[5,[\"action\"],[[28,[null]],\"changeView\",[28,[\"THEMES\"]]]],[13],[0,\"\\n    \"],[1,[33,[\"d-icon\"],[\"cube\"],null],false],[0,\"\\n    \"],[1,[33,[\"I18n\"],[\"admin.customize.theme.title\"],null],false],[0,\"\\n  \"],[14],[11,\"div\",[]],[16,\"class\",[34,[\"components-tab tab \",[33,[\"if\"],[[28,[\"componentsTabActive\"]],\"active\",\"\"],null]]]],[5,[\"action\"],[[28,[null]],\"changeView\",[28,[\"COMPONENTS\"]]]],[13],[0,\"\\n    \"],[1,[33,[\"I18n\"],[\"admin.customize.theme.components\"],null],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"themes-list-container\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"hasThemes\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"componentsTabActive\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"themesList\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"themes-list-item\"],null,[[\"theme\",\"navigateToTheme\"],[[28,[\"theme\"]],[33,[\"action\"],[[28,[null]],\"navigateToTheme\",[28,[\"theme\"]]],null]]]],false],[0,\"\\n\"]],\"locals\":[\"theme\"]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"hasUserThemes\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"userThemes\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"themes-list-item\"],null,[[\"theme\",\"navigateToTheme\"],[[28,[\"theme\"]],[33,[\"action\"],[[28,[null]],\"navigateToTheme\",[28,[\"theme\"]]],null]]]],false],[0,\"\\n\"]],\"locals\":[\"theme\"]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"hasInactiveThemes\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"themes-list-item inactive-indicator\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"empty\"],[13],[1,[33,[\"I18n\"],[\"admin.customize.theme.inactive_themes\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"hasInactiveThemes\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"inactiveThemes\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"themes-list-item\"],null,[[\"theme\",\"navigateToTheme\"],[[28,[\"theme\"]],[33,[\"action\"],[[28,[null]],\"navigateToTheme\",[28,[\"theme\"]]],null]]]],false],[0,\"\\n\"]],\"locals\":[\"theme\"]},null]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"themes-list-item\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"empty\"],[13],[1,[33,[\"I18n\"],[\"admin.customize.theme.empty\"],null],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/themes-list"}});
Ember.TEMPLATES["admin/templates/components/user-flag-percentage"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"showPercentage\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"user-flag-percentage\"],[16,\"title\",[28,[\"percentage\",\"title\"]],null],[13],[0,\"\\n    \"],[11,\"span\",[]],[16,\"class\",[34,[\"percentage-label \",[28,[\"percentage\",\"className\"]]]]],[13],[1,[28,[\"percentage\",\"label\"]],false],[14],[0,\"\\n    \"],[1,[33,[\"d-icon\"],[[28,[\"percentage\",\"icon\"]]],null],false],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/user-flag-percentage"}});
Ember.TEMPLATES["admin/templates/components/value-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"collection\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"values\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"collection\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[16,\"data-index\",[28,[\"index\"]],null],[13],[0,\"\\n        \"],[1,[33,[\"d-button\"],null,[[\"action\",\"actionParam\",\"icon\",\"class\"],[\"removeValue\",[28,[\"value\"]],\"times\",\"btn-default remove-value-btn btn-small\"]]],false],[0,\"\\n\\n        \"],[1,[33,[\"input\"],null,[[\"title\",\"value\",\"class\",\"focus-out\"],[[28,[\"value\"]],[28,[\"value\"]],\"value-input\",[33,[\"action\"],[[28,[null]],\"changeValue\",[28,[\"index\"]]],null]]]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"value\",\"index\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[33,[\"combo-box\"],null,[[\"allowAny\",\"allowContentReplacement\",\"none\",\"content\",\"onSelect\"],[true,true,[28,[\"noneKey\"]],[28,[\"filteredChoices\"]],[33,[\"action\"],[[28,[null]],\"selectChoice\"],null]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/value-list"}});
Ember.TEMPLATES["admin/templates/components/watched-word-form"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"b\",[]],[13],[1,[33,[\"i18n\"],[\"admin.watched_words.form.label\"],null],false],[14],[0,\"\\n\"],[1,[33,[\"text-field\"],null,[[\"value\",\"disabled\",\"class\",\"autocorrect\",\"autocapitalize\",\"placeholderKey\"],[[28,[\"word\"]],[28,[\"formSubmitted\"]],\"watched-word-input\",\"off\",\"off\",[28,[\"placeholderKey\"]]]]],false],[0,\"\\n\"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"disabled\",\"label\"],[\"btn-default\",\"submit\",[28,[\"formSubmitted\"]],\"admin.watched_words.form.add\"]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showMessage\"]]],null,{\"statements\":[[0,\"  \"],[11,\"span\",[]],[15,\"class\",\"success-message\"],[13],[1,[26,[\"message\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/watched-word-form"}});
Ember.TEMPLATES["admin/templates/components/watched-word-uploader"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"label\",[]],[16,\"class\",[34,[\"btn btn-default \",[33,[\"if\"],[[28,[\"addDisabled\"]],\"disabled\"],null]]]],[13],[0,\"\\n  \"],[1,[33,[\"d-icon\"],[\"upload\"],null],false],[0,\"\\n  \"],[1,[33,[\"i18n\"],[\"admin.watched_words.form.upload\"],null],false],[0,\"\\n  \"],[11,\"input\",[]],[15,\"class\",\"hidden-upload-field\"],[16,\"disabled\",[26,[\"addDisabled\"]],null],[15,\"type\",\"file\"],[15,\"accept\",\"text/plain,text/csv\"],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[11,\"span\",[]],[15,\"class\",\"instructions\"],[13],[0,\"One word per line\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/components/watched-word-uploader"}});
Ember.TEMPLATES["admin/templates/customize-colors-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"p\",[]],[15,\"class\",\"about\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.colors.about\"],null],false],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-colors-index"}});
Ember.TEMPLATES["admin/templates/customize-colors-show"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"color-scheme show-current-style\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"admin-container\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[6,[\"if\"],[[28,[\"model\",\"theme_id\"]]],null,{\"statements\":[[1,[28,[\"model\",\"name\"]],false]],\"locals\":[]},{\"statements\":[[1,[33,[\"text-field\"],null,[[\"class\",\"value\"],[\"style-name\",[28,[\"model\",\"name\"]]]]],false]],\"locals\":[]}],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"theme_id\"]]],null,{\"statements\":[[0,\"      \"],[11,\"button\",[]],[16,\"disabled\",[28,[\"model\",\"disableSave\"]],null],[15,\"class\",\"btn btn-primary\"],[5,[\"action\"],[[28,[null]],\"save\"]],[13],[1,[33,[\"i18n\"],[\"admin.customize.save\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"button\",[]],[15,\"class\",\"btn btn-default\"],[5,[\"action\"],[[28,[null]],\"copy\",[28,[\"model\"]]]],[13],[1,[33,[\"d-icon\"],[\"copy\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.customize.copy\"],null],false],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"btn btn-default\"],[5,[\"action\"],[[28,[null]],\"copyToClipboard\",[28,[\"model\"]]]],[13],[1,[33,[\"d-icon\"],[\"clipboard\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.customize.copy_to_clipboard\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"theme_id\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"i18n\"],[\"admin.customize.theme_owner\"],null],false],[0,\"\\n      \"],[6,[\"link-to\"],[\"adminCustomizeThemes.show\",[28,[\"model\",\"theme_id\"]]],null,{\"statements\":[[1,[28,[\"model\",\"theme_name\"]],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"button\",[]],[15,\"class\",\"btn btn-danger\"],[5,[\"action\"],[[28,[null]],\"destroy\"]],[13],[1,[33,[\"d-icon\"],[\"trash-o\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.customize.delete\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[11,\"span\",[]],[16,\"class\",[34,[\"saving \",[33,[\"unless\"],[[28,[\"model\",\"savingStatus\"]],\"hidden\"],null]]]],[13],[1,[28,[\"model\",\"savingStatus\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"search controls\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"onlyOverridden\"]]]]],false],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.settings.show_overriden\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"colors\",\"length\"]]],null,{\"statements\":[[0,\"    \"],[11,\"table\",[]],[15,\"class\",\"table colors\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[13],[0,\"\\n        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"th\",[]],[13],[14],[0,\"\\n          \"],[11,\"th\",[]],[15,\"class\",\"hex\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.color\"],null],false],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"colors\"]]],null,{\"statements\":[[0,\"          \"],[11,\"tr\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"c\",\"changed\"]],\"changed\"],null],\" \",[33,[\"if\"],[[28,[\"c\",\"valid\"]],\"valid\",\"invalid\"],null]]]],[13],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"name\"],[16,\"title\",[28,[\"c\",\"name\"]],null],[13],[0,\"\\n              \"],[11,\"b\",[]],[13],[1,[28,[\"c\",\"translatedName\"]],false],[14],[0,\"\\n              \"],[11,\"br\",[]],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"description\"],[13],[1,[28,[\"c\",\"description\"]],false],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"hex\"],[13],[1,[33,[\"color-input\"],null,[[\"hexValue\",\"brightnessValue\",\"valid\"],[[28,[\"c\",\"hex\"]],[28,[\"c\",\"brightness\"]],[28,[\"c\",\"valid\"]]]]],false],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"actions\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"theme_id\"]]],null,{\"statements\":[[0,\"              \"],[11,\"button\",[]],[16,\"class\",[34,[\"btn btn-default revert \",[33,[\"unless\"],[[28,[\"c\",\"savedIsOverriden\"]],\"invisible\"],null]]]],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.customize.colors.revert_title\"],null]]]],[5,[\"action\"],[[28,[null]],\"revert\",[28,[\"c\"]]]],[13],[1,[33,[\"i18n\"],[\"revert\"],null],false],[14],[0,\"\\n              \"],[11,\"button\",[]],[16,\"class\",[34,[\"btn btn-default undo \",[33,[\"unless\"],[[28,[\"c\",\"changed\"]],\"invisible\"],null]]]],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.customize.colors.undo_title\"],null]]]],[5,[\"action\"],[[28,[null]],\"undo\",[28,[\"c\"]]]],[13],[1,[33,[\"i18n\"],[\"undo\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"c\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"search.no_results\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-colors-show"}});
Ember.TEMPLATES["admin/templates/customize-colors"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-list color-schemes\"],[13],[0,\"\\n  \"],[11,\"h3\",[]],[13],[1,[33,[\"i18n\"],[\"admin.customize.colors.long_title\"],null],false],[14],[0,\"\\n  \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[6,[\"unless\"],[[28,[\"scheme\",\"is_base\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"adminCustomize.colors.show\",[28,[\"scheme\"]]],[[\"replace\"],[true]],{\"statements\":[[1,[33,[\"d-icon\"],[\"paint-brush\"],null],false],[1,[28,[\"scheme\",\"description\"]],false]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"scheme\"]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"btn btn-default\"],[5,[\"action\"],[[28,[null]],\"newColorScheme\"]],[13],[1,[33,[\"d-icon\"],[\"plus\"],null],false],[1,[33,[\"i18n\"],[\"admin.customize.new\"],null],false],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-colors"}});
Ember.TEMPLATES["admin/templates/customize-email-templates-edit"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"email-template\"],[13],[0,\"\\n  \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.customize.email_templates.subject\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"hasMultipleSubjects\"]]],null,{\"statements\":[[0,\"    \"],[11,\"h3\",[]],[13],[6,[\"link-to\"],[\"adminSiteText\",[33,[\"query-params\"],null,[[\"q\"],[[28,[\"hasMultipleSubjects\"]]]]]],null,{\"statements\":[[1,[33,[\"i18n\"],[\"admin.customize.email_templates.multiple_subjects\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"input\"],null,[[\"value\"],[[28,[\"buffered\",\"subject\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n  \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.customize.email_templates.body\"],null],false],[14],[0,\"\\n  \"],[1,[33,[\"d-editor\"],null,[[\"value\"],[[28,[\"buffered\",\"body\"]]]]],false],[0,\"\\n\\n\"],[6,[\"save-controls\"],null,[[\"model\",\"action\",\"saved\"],[[28,[\"emailTemplate\"]],\"saveChanges\",[28,[\"saved\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"emailTemplate\",\"can_revert\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"label\"],[\"revertChanges\",\"admin.customize.email_templates.revert\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-email-templates-edit"}});
Ember.TEMPLATES["admin/templates/customize-email-templates-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.customize.email_templates.none_selected\"],null],false],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-email-templates-index"}});
Ember.TEMPLATES["admin/templates/customize-email-templates"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"content-list\"],[13],[0,\"\\n    \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"sortedTemplates\"]]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[13],[0,\"\\n          \"],[6,[\"link-to\"],[\"adminCustomizeEmailTemplates.edit\",[28,[\"et\"]]],null,{\"statements\":[[1,[28,[\"et\",\"title\"]],false]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"et\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"content-editor\"],[13],[0,\"\\n    \"],[1,[26,[\"outlet\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-email-templates"}});
Ember.TEMPLATES["admin/templates/customize-themes-edit"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"current-style \",[33,[\"if\"],[[28,[\"maximized\"]],\"maximized\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"wrapper\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.edit_css_html\"],null],false],[0,\" \"],[6,[\"link-to\"],[\"adminCustomizeThemes.show\",[28,[\"model\",\"id\"]]],[[\"replace\"],[true]],{\"statements\":[[1,[28,[\"model\",\"name\"]],false]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"error\"]]],null,{\"statements\":[[0,\"      \"],[11,\"pre\",[]],[15,\"class\",\"field-error\"],[13],[1,[26,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"edit-main-nav\"],[13],[0,\"\\n      \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-pills target\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showCommon\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminCustomizeThemes.edit\",[28,[\"model\",\"id\"]],\"common\",[28,[\"fieldName\"]]],[[\"replace\"],[true]],{\"statements\":[[0,\"              \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.common\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"showDesktop\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminCustomizeThemes.edit\",[28,[\"model\",\"id\"]],\"desktop\",[28,[\"fieldName\"]]],[[\"replace\"],[true]],{\"statements\":[[0,\"              \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.desktop\"],null],false],[0,\"\\n              \"],[1,[33,[\"d-icon\"],[\"desktop\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"showMobile\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[15,\"class\",\"mobile\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminCustomizeThemes.edit\",[28,[\"model\",\"id\"]],\"mobile\",[28,[\"fieldName\"]]],[[\"replace\"],[true]],{\"statements\":[[0,\"              \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.mobile\"],null],false],[0,\"\\n              \"],[1,[33,[\"d-icon\"],[\"mobile\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"show-overidden\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"onlyOverridden\"]]]]],false],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.settings.show_overriden\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n      \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-pills fields\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"fields\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminCustomizeThemes.edit\",[28,[\"model\",\"id\"]],[28,[\"currentTargetName\"]],[28,[\"field\",\"name\"]]],[[\"replace\",\"title\"],[true,[28,[\"field\",\"title\"]]]],{\"statements\":[[0,\"              \"],[6,[\"if\"],[[28,[\"field\",\"icon\"]]],null,{\"statements\":[[1,[33,[\"d-icon\"],[[28,[\"field\",\"icon\"]]],null],false],[0,\" \"]],\"locals\":[]},null],[0,\"\\n              \"],[1,[33,[\"i18n\"],[[28,[\"field\",\"key\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[\"field\"]},null],[0,\"        \"],[11,\"li\",[]],[15,\"class\",\"toggle-maximize\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"toggleMaximize\"]],[13],[0,\"\\n            \"],[1,[33,[\"d-icon\"],[[28,[\"maximizeIcon\"]]],null],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[1,[33,[\"ace-editor\"],null,[[\"content\",\"editorId\",\"mode\",\"autofocus\"],[[28,[\"activeSection\"]],[28,[\"editorId\"]],[28,[\"activeSectionMode\"]],\"true\"]]],false],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"admin-footer\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"status-actions\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"changed\"]]],null,{\"statements\":[[0,\"          \"],[11,\"a\",[]],[15,\"class\",\"preview-link\"],[16,\"href\",[26,[\"previewUrl\"]],null],[15,\"target\",\"_blank\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.customize.explain_preview\"],null]]]],[13],[1,[33,[\"i18n\"],[\"admin.customize.preview\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n\"],[6,[\"d-button\"],null,[[\"action\",\"disabled\",\"class\"],[\"save\",[28,[\"saveDisabled\"]],\"btn-primary\"]],{\"statements\":[[0,\"          \"],[1,[26,[\"saveButtonText\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-themes-edit"}});
Ember.TEMPLATES["admin/templates/customize-themes-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"themes-intro\"],[13],[0,\"\\n  \"],[11,\"img\",[]],[16,\"src\",[26,[\"womanArtistEmojiURL\"]],null],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"content-wrapper\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[1,[33,[\"I18n\"],[\"admin.customize.theme.themes_intro\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"external-resources\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"externalResources\"]]],null,{\"statements\":[[0,\"        \"],[11,\"a\",[]],[16,\"href\",[28,[\"resource\",\"link\"]],null],[15,\"class\",\"external-link\"],[15,\"target\",\"_blank\"],[13],[0,\"\\n          \"],[1,[33,[\"d-icon\"],[[28,[\"resource\",\"icon\"]]],null],false],[0,\"\\n          \"],[1,[33,[\"I18n\"],[[28,[\"resource\",\"key\"]]],null],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"resource\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-themes-index"}});
Ember.TEMPLATES["admin/templates/customize-themes-show"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"show-current-style\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"editingName\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"text-field\"],null,[[\"value\",\"autofocus\"],[[28,[\"model\",\"name\"]],\"true\"]]],false],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"finishedEditingName\",\"btn-primary btn-small submit-edit\",\"check\"]]],false],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"cancelEditingName\",\"btn-small cancel-edit\",\"times\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[1,[28,[\"model\",\"name\"]],false],[0,\" \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"startEditingName\"]],[13],[1,[33,[\"d-icon\"],[\"pencil\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\",\"errors\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"alert alert-error\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"close\"],[15,\"data-dismiss\",\"alert\"],[13],[0,\"×\"],[14],[0,\"\\n      \"],[1,[28,[\"error\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"remote_theme\"]]],null,{\"statements\":[[0,\"    \"],[11,\"a\",[]],[15,\"class\",\"url about-url\"],[16,\"href\",[34,[[28,[\"model\",\"remote_theme\",\"about_url\"]]]]],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.about_theme\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"remote_theme\",\"license_url\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"class\",\"url license-url\"],[16,\"href\",[34,[[28,[\"model\",\"remote_theme\",\"license_url\"]]]]],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.license\"],null],false],[0,\" \"],[1,[33,[\"d-icon\"],[\"copyright\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"parentThemes\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"control-unit\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mini-title\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.component_of\"],null],false],[14],[0,\"\\n      \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"parentThemes\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"adminCustomizeThemes.show\",[28,[\"theme\"]]],[[\"replace\"],[true]],{\"statements\":[[1,[28,[\"theme\",\"name\"]],false]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[\"theme\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"component\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"control-unit\"],[13],[0,\"\\n      \"],[1,[33,[\"inline-edit-checkbox\"],null,[[\"action\",\"labelKey\",\"checked\"],[\"applyDefault\",\"admin.customize.theme.is_default\",[28,[\"model\",\"default\"]]]]],false],[0,\"\\n      \"],[1,[33,[\"inline-edit-checkbox\"],null,[[\"action\",\"labelKey\",\"checked\"],[\"applyUserSelectable\",\"admin.customize.theme.user_selectable\",[28,[\"model\",\"user_selectable\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"control-unit\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mini-title\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.color_scheme\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.color_scheme_select\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"control\"],[13],[1,[33,[\"combo-box\"],null,[[\"content\",\"filterable\",\"forceEscape\",\"value\",\"icon\"],[[28,[\"colorSchemes\"]],true,true,[28,[\"colorSchemeId\"]],\"paint-brush\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"colorSchemeChanged\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"changeScheme\",\"btn-primary btn-small submit-edit\",\"check\"]]],false],[0,\"\\n            \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"cancelChangeScheme\",\"btn-default btn-small cancel-edit\",\"times\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n      \"],[6,[\"link-to\"],[\"adminCustomize.colors\"],[[\"class\"],[\"btn btn-default edit\"]],{\"statements\":[[1,[33,[\"i18n\"],[\"admin.customize.colors.edit\"],null],false]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"control-unit\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mini-title\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.css_html\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"hasEditedFields\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.custom_sections\"],null],false],[14],[0,\"\\n      \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"editedFieldsFormatted\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[13],[1,[28,[\"field\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"field\"]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"description\"],[13],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.edit_css_html_help\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"remote_theme\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"remote_theme\",\"commits_behind\"]]],null,{\"statements\":[[0,\"        \"],[6,[\"d-button\"],null,[[\"action\",\"icon\",\"class\"],[\"updateToLatest\",\"download\",\"btn-primary\"]],{\"statements\":[[1,[33,[\"i18n\"],[\"admin.customize.theme.update_to_latest\"],null],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[6,[\"d-button\"],null,[[\"action\",\"icon\",\"class\"],[\"checkForThemeUpdates\",\"refresh\",\"btn-default\"]],{\"statements\":[[1,[33,[\"i18n\"],[\"admin.customize.theme.check_for_updates\"],null],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"d-button\"],null,[[\"action\",\"class\"],[\"editTheme\",\"btn btn-default edit\"]],{\"statements\":[[1,[33,[\"i18n\"],[\"admin.customize.theme.edit_css_html\"],null],false]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"remote_theme\"]]],null,{\"statements\":[[0,\"      \"],[11,\"span\",[]],[15,\"class\",\"status-message\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"updatingRemote\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.updating\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"remote_theme\",\"commits_behind\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.commits_behind\"],[[\"count\"],[[28,[\"model\",\"remote_theme\",\"commits_behind\"]]]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"remote_theme\",\"github_diff_link\"]]],null,{\"statements\":[[0,\"              \"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"model\",\"remote_theme\",\"github_diff_link\"]]]]],[13],[0,\"\\n                \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.compare_commits\"],null],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[6,[\"unless\"],[[28,[\"showRemoteError\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.up_to_date\"],null],false],[0,\" \"],[1,[33,[\"format-date\"],[[28,[\"model\",\"remote_theme\",\"updated_at\"]]],[[\"leaveAgo\"],[\"true\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showRemoteError\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[0,\"\\n          \"],[1,[33,[\"d-icon\"],[\"exclamation-triangle\"],null],false],[0,\" \"],[1,[33,[\"I18n\"],[\"admin.customize.theme.repo_unreachable\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"raw-error\"],[13],[0,\"\\n          \"],[11,\"code\",[]],[13],[1,[28,[\"model\",\"remoteError\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"control-unit\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mini-title\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.uploads\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"uploads\"]]],null,{\"statements\":[[0,\"      \"],[11,\"ul\",[]],[15,\"class\",\"removable-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"uploads\"]]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"col\"],[13],[0,\"$\"],[1,[28,[\"upload\",\"name\"]],false],[0,\": \"],[11,\"a\",[]],[16,\"href\",[28,[\"upload\",\"url\"]],null],[15,\"target\",\"_blank\"],[13],[1,[28,[\"upload\",\"filename\"]],false],[14],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"col\"],[13],[0,\"\\n            \"],[1,[33,[\"d-button\"],null,[[\"action\",\"actionParam\",\"class\",\"icon\"],[\"removeUpload\",[28,[\"upload\"]],\"second btn-default btn-small cancel-edit\",\"times\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"upload\"]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.no_uploads\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[6,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"addUploadModal\",\"btn-default\",\"plus\"]],{\"statements\":[[1,[33,[\"i18n\"],[\"admin.customize.theme.add\"],null],false]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"hasSettings\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"control-unit\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mini-title\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.theme_settings\"],null],false],[14],[0,\"\\n\"],[6,[\"d-section\"],null,[[\"class\"],[\"form-horizontal theme settings\"]],{\"statements\":[[6,[\"each\"],[[28,[\"settings\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"theme-setting\"],null,[[\"setting\",\"model\",\"class\"],[[28,[\"setting\"]],[28,[\"model\"]],\"theme-setting\"]]],false],[0,\"\\n\"]],\"locals\":[\"setting\"]},null]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"availableChildThemes\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"control-unit\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mini-title\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.theme_components\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"childThemes\",\"length\"]]],null,{\"statements\":[[0,\"        \"],[11,\"ul\",[]],[15,\"class\",\"removable-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"childThemes\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"adminCustomizeThemes.show\",[28,[\"child\"]]],[[\"replace\",\"class\"],[true,\"col\"]],{\"statements\":[[1,[28,[\"child\",\"name\"]],false]],\"locals\":[]},null],[0,\" \"],[1,[33,[\"d-button\"],null,[[\"action\",\"actionParam\",\"class\",\"icon\"],[\"removeChildTheme\",[28,[\"child\"]],\"btn-default btn-small cancel-edit col\",\"times\"]]],false],[14],[0,\"\\n\"]],\"locals\":[\"child\"]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"selectableChildThemes\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"description\"],[13],[0,\"\\n          \"],[1,[33,[\"combo-box\"],null,[[\"forceEscape\",\"filterable\",\"content\",\"value\",\"none\"],[true,true,[28,[\"selectableChildThemes\"]],[28,[\"selectedChildThemeId\"]],\"admin.customize.theme.select_component\"]]],false],[0,\"\\n          \"],[6,[\"d-button\"],null,[[\"action\",\"icon\",\"disabled\",\"class\"],[\"addChildTheme\",\"plus\",[28,[\"addButtonDisabled\"]],\"btn-default add-component-button\"]],{\"statements\":[[1,[33,[\"i18n\"],[\"admin.customize.theme.add\"],null],false]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"a\",[]],[16,\"href\",[34,[[26,[\"previewUrl\"]]]]],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.customize.explain_preview\"],null]]]],[15,\"target\",\"_blank\"],[15,\"class\",\"btn btn-default\"],[13],[1,[33,[\"d-icon\"],[\"desktop\"],null],false],[1,[33,[\"i18n\"],[\"admin.customize.theme.preview\"],null],false],[14],[0,\"\\n  \"],[11,\"a\",[]],[15,\"class\",\"btn btn-default export\"],[15,\"target\",\"_blank\"],[16,\"href\",[26,[\"downloadUrl\"]],null],[13],[1,[33,[\"d-icon\"],[\"download\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.export_json.button_text\"],null],false],[14],[0,\"\\n\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"label\",\"icon\",\"class\",\"title\"],[\"switchType\",\"admin.customize.theme.convert\",[28,[\"convertIcon\"]],\"btn-default btn-normal\",[28,[\"convertTooltip\"]]]]],false],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"label\",\"icon\",\"class\"],[\"destroy\",\"admin.customize.delete\",\"trash\",\"btn-danger\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-themes-show"}});
Ember.TEMPLATES["admin/templates/customize-themes"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"unless\"],[[28,[\"editingTheme\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"customize-themes-header\"],[13],[0,\"\\n\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"create-actions\"],[13],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"label\",\"icon\",\"action\",\"class\"],[\"admin.customize.new\",\"plus\",\"showCreateModal\",\"btn-primary\"]]],false],[0,\"\\n      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"icon\",\"label\",\"class\"],[\"importModal\",\"upload\",\"admin.customize.import\",\"btn-default\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"themes-list\"],null,[[\"themes\",\"components\",\"currentTab\"],[[28,[\"fullThemes\"]],[28,[\"childThemes\"]],[28,[\"currentTab\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize-themes"}});
Ember.TEMPLATES["admin/templates/customize"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"admin-nav\"],null,null,{\"statements\":[[0,\"  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminCustomizeThemes\",\"admin.customize.theme.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminCustomize.colors\",\"admin.customize.colors.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminSiteText\",\"admin.site_text.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminCustomizeEmailTemplates\",\"admin.customize.email_templates.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminUserFields\",\"admin.user_fields.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmojis\",\"admin.emoji.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminPermalinks\",\"admin.permalink.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmbedding\",\"admin.embedding.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-container\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/customize"}});
Ember.TEMPLATES["admin/templates/dashboard-problems"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"foundProblems\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"section dashboard-problems\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"section-title\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[13],[0,\"\\n        \"],[1,[33,[\"d-icon\"],[\"exclamation-triangle\"],null],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.dashboard.problems_found\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"section-body\"],[13],[0,\"\\n\"],[6,[\"conditional-loading-section\"],null,[[\"isLoading\"],[[28,[\"loadingProblems\"]]]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"problem-messages\"],[13],[0,\"\\n          \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"problems\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[1,[28,[\"problem\"]],true],[14],[0,\"\\n\"]],\"locals\":[\"problem\"]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[15,\"class\",\"actions\"],[13],[0,\"\\n          \"],[11,\"small\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.last_checked\"],null],false],[0,\": \"],[1,[26,[\"problemsTimestamp\"]],false],[14],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\",\"label\"],[\"refreshProblems\",\"btn-default btn-small\",\"refresh\",\"admin.dashboard.refresh_problems\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/dashboard-problems"}});
Ember.TEMPLATES["admin/templates/dashboard"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"dashboard-left\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats trust-levels\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[13],[0,\" \"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[0,\"0\"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[0,\"1\"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[0,\"2\"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[0,\"3\"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[0,\"4\"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"user_reports\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"admin-report-trust-level-counts\"],null,[[\"report\"],[[28,[\"r\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"r\"]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats totals\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[13],[0,\"\\n        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"title\"],[13],[1,[33,[\"d-icon\"],[\"shield\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.dashboard.admins\"],null],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"admins\"],null,{\"statements\":[[1,[26,[\"admins\"]],false]],\"locals\":[]},null],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"title\"],[13],[1,[33,[\"d-icon\"],[\"ban\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.dashboard.suspended\"],null],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"suspended\"],null,{\"statements\":[[1,[26,[\"suspended\"]],false]],\"locals\":[]},null],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"title\"],[13],[1,[33,[\"d-icon\"],[\"shield\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.dashboard.moderators\"],null],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"moderators\"],null,{\"statements\":[[1,[26,[\"moderators\"]],false]],\"locals\":[]},null],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"title\"],[13],[1,[33,[\"d-icon\"],[\"ban\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.dashboard.silenced\"],null],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"silenced\"],null,{\"statements\":[[1,[26,[\"silenced\"]],false]],\"locals\":[]},null],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[13],[0,\" \"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.today\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.yesterday\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_7_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.all\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"global_reports\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"admin-report-counts\"],null,[[\"report\"],[[28,[\"r\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"r\"]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[15,\"class\",\"title\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.dashboard.page_views\"],null]]]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.page_views_short\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.today\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.yesterday\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_7_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.all\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"page_view_reports\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"admin-report-counts\"],null,[[\"report\"],[[28,[\"r\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"r\"]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[15,\"class\",\"title\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.dashboard.private_messages_title\"],null]]]],[13],[1,[33,[\"d-icon\"],[\"envelope\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.dashboard.private_messages_short\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.today\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.yesterday\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_7_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.all\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"private_message_reports\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"admin-report-counts\"],null,[[\"report\"],[[28,[\"r\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"r\"]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[15,\"class\",\"title\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.dashboard.mobile_title\"],null]]]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.mobile_title\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.today\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.yesterday\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_7_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.all\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"mobile_reports\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"admin-report-counts\"],null,[[\"report\"],[[28,[\"r\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"r\"]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[13],[0,\" \"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tbody\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.uploads\"],null],false],[14],[0,\"\\n            \"],[11,\"td\",[]],[13],[1,[28,[\"disk_space\",\"uploads_used\"]],false],[0,\" (\"],[1,[33,[\"i18n\"],[\"admin.dashboard.space_free\"],[[\"size\"],[[28,[\"disk_space\",\"uploads_free\"]]]]],false],[0,\")\"],[14],[0,\"\\n            \"],[11,\"td\",[]],[13],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[11,\"a\",[]],[15,\"href\",\"/admin/backups\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.backups\"],null],false],[14]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"td\",[]],[13],[1,[28,[\"disk_space\",\"backups_used\"]],false],[0,\" (\"],[1,[33,[\"i18n\"],[\"admin.dashboard.space_free\"],[[\"size\"],[[28,[\"disk_space\",\"backups_free\"]]]]],false],[0,\")\"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showTrafficReport\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[15,\"class\",\"title\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.dashboard.traffic\"],null]]]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.traffic_short\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.today\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.yesterday\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_7_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.all\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"loading\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"http_reports\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"admin-report-counts\"],null,[[\"report\"],[[28,[\"r\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"r\"]},null]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"showTrafficReport\"]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.show_traffic_report\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"dashboard-right\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[15,\"class\",\"title\"],[13],[1,[28,[\"top_referred_topics\",\"title\"]],false],[0,\" (\"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[0,\")\"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[28,[\"top_referred_topics\",\"ytitles\",\"num_clicks\"]],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"top_referred_topics\",\"data\"]]],null,{\"statements\":[[0,\"          \"],[11,\"tbody\",[]],[13],[0,\"\\n            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"td\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"referred-topic-title\"],[13],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"overflow-ellipsis\"],[13],[0,\"\\n                    \"],[11,\"a\",[]],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"data\",\"topic_url\"]]],null]]]],[13],[1,[28,[\"data\",\"topic_title\"]],false],[14],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"number\"],[[28,[\"data\",\"num_clicks\"]]],null],false],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"data\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[15,\"class\",\"title\"],[13],[1,[28,[\"top_traffic_sources\",\"title\"]],false],[0,\" (\"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[0,\")\"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[28,[\"top_traffic_sources\",\"ytitles\",\"num_clicks\"]],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[28,[\"top_traffic_sources\",\"ytitles\",\"num_topics\"]],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"top_traffic_sources\",\"data\"]]],null,{\"statements\":[[0,\"          \"],[11,\"tbody\",[]],[13],[0,\"\\n            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"td\",[]],[15,\"class\",\"title\"],[13],[1,[28,[\"s\",\"domain\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"number\"],[[28,[\"s\",\"num_clicks\"]]],null],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"number\"],[[28,[\"s\",\"num_topics\"]]],null],false],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats\"],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"class\",\"table table-condensed table-hover\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[15,\"class\",\"title\"],[13],[1,[28,[\"top_referrers\",\"title\"]],false],[0,\" (\"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[0,\")\"],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[28,[\"top_referrers\",\"ytitles\",\"num_clicks\"]],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[28,[\"top_referrers\",\"ytitles\",\"num_topics\"]],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"top_referrers\",\"data\"]]],null,{\"statements\":[[0,\"          \"],[11,\"tbody\",[]],[13],[0,\"\\n            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"td\",[]],[15,\"class\",\"title\"],[13],[6,[\"link-to\"],[\"adminUser\",[28,[\"r\",\"user_id\"]],[28,[\"r\",\"username\"]]],null,{\"statements\":[[1,[33,[\"unbound\"],[[28,[\"r\",\"username\"]]],null],false]],\"locals\":[]},null],[14],[0,\"\\n              \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"number\"],[[28,[\"r\",\"num_clicks\"]]],null],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"number\"],[[28,[\"r\",\"num_topics\"]]],null],false],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"r\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"dashboard-stats pull-right\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"pull-right\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.last_updated\"],null],false],[0,\" \"],[1,[26,[\"updatedTimestamp\"]],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/dashboard"}});
Ember.TEMPLATES["admin/templates/dashboard_next"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"plugin-outlet\"],null,[[\"name\"],[\"admin-dashboard-top\"]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showVersionChecks\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"section-top\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"version-checks\"],[13],[0,\"\\n      \"],[19,\"admin/templates/version-checks\"],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[19,\"admin/templates/dashboard-problems\"],[0,\"\\n\\n\"],[11,\"ul\",[]],[15,\"class\",\"navigation\"],[13],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"navigation-item general\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"admin.dashboardNext.general\"],[[\"class\"],[\"navigation-link\"]],{\"statements\":[[0,\"      \"],[1,[33,[\"i18n\"],[\"admin.dashboard.general_tab\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"navigation-item moderation\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"admin.dashboardNextModeration\"],[[\"class\"],[\"navigation-link\"]],{\"statements\":[[0,\"      \"],[1,[33,[\"i18n\"],[\"admin.dashboard.moderation_tab\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[1,[33,[\"plugin-outlet\"],null,[[\"name\"],[\"admin-dashboard-bottom\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}","meta":{"moduleName":"admin/templates/dashboard_next"}});
Ember.TEMPLATES["admin/templates/dashboard_next_general"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"isLoading\"]]]],{\"statements\":[[0,\"  \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\"],[\"admin-dashboard-general-top\"]]],false],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"community-health section\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"period-section\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"section-title\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"/admin/reports\"],[13],[0,\"\\n            \"],[1,[33,[\"i18n\"],[\"admin.dashboard.community_health\"],null],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[1,[33,[\"period-chooser\"],null,[[\"period\",\"action\",\"content\",\"fullDay\"],[[28,[\"period\"]],\"changePeriod\",[28,[\"availablePeriods\"]],true]]],false],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"section-body\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"charts\"],[13],[0,\"\\n          \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"showTrend\",\"forcedModes\",\"filters\"],[\"signups\",true,\"chart\",[28,[\"filters\"]]]]],false],[0,\"\\n\\n          \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"showTrend\",\"forcedModes\",\"filters\"],[\"topics\",true,\"chart\",[28,[\"filters\"]]]]],false],[0,\"\\n\\n          \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"showTrend\",\"forcedModes\",\"filters\"],[\"posts\",true,\"chart\",[28,[\"filters\"]]]]],false],[0,\"\\n\\n          \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"showTrend\",\"forcedModes\",\"filters\"],[\"dau_by_mau\",true,\"chart\",[28,[\"filters\"]]]]],false],[0,\"\\n\\n          \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"showTrend\",\"forcedModes\",\"filters\"],[\"daily_engaged_users\",true,\"chart\",[28,[\"filters\"]]]]],false],[0,\"\\n\\n          \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"showTrend\",\"forcedModes\",\"filters\"],[\"new_contributors\",true,\"chart\",[28,[\"filters\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"section-columns\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"section-column\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"admin-report activity-metrics\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"header\"],[13],[0,\"\\n          \"],[11,\"ul\",[]],[15,\"class\",\"breadcrumb\"],[13],[0,\"\\n            \"],[11,\"li\",[]],[15,\"class\",\"item report\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminReports\"],[[\"class\"],[\"report-url\"]],{\"statements\":[[0,\"                \"],[1,[33,[\"i18n\"],[\"admin.dashboard.activity_metrics\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"report-body\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"counters-list\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"counters-header\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"counters-cell\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"counters-cell\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.today\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"counters-cell\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.yesterday\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"counters-cell\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_7_days\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"counters-cell\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.last_30_days\"],null],false],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"activityMetrics\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"admin-report\"],null,[[\"showHeader\",\"filters\",\"forcedModes\",\"dataSourceName\"],[false,[28,[\"activityMetricsFilters\"]],\"counters\",[28,[\"metric\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"metric\"]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n\"],[6,[\"link-to\"],[\"adminReports\"],null,{\"statements\":[[0,\"          \"],[1,[33,[\"i18n\"],[\"admin.dashboard.all_reports\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"user-metrics\"],[13],[0,\"\\n\"],[6,[\"conditional-loading-section\"],null,[[\"isLoading\"],[[28,[\"isLoading\"]]]],{\"statements\":[[0,\"          \"],[1,[33,[\"admin-report\"],null,[[\"forcedModes\",\"dataSourceName\"],[\"inline-table\",\"users_by_type\"]]],false],[0,\"\\n\\n          \"],[1,[33,[\"admin-report\"],null,[[\"forcedModes\",\"dataSourceName\"],[\"inline-table\",\"users_by_trust_level\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-section\"],null,[[\"isLoading\",\"title\"],[[28,[\"isLoading\"]],[33,[\"i18n\"],[\"admin.dashboard.backups\"],null]]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"misc\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"shouldDisplayDurability\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"durability\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"backups\"],[13],[0,\"\\n                  \"],[11,\"h3\",[]],[15,\"class\",\"durability-title\"],[13],[0,\"\\n                    \"],[11,\"a\",[]],[15,\"href\",\"/admin/backups\"],[13],[1,[33,[\"d-icon\"],[\"archive\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.dashboard.backups\"],null],false],[14],[0,\"\\n                  \"],[14],[0,\"\\n                  \"],[11,\"p\",[]],[13],[0,\"\\n                    \"],[1,[28,[\"diskSpace\",\"backups_used\"]],false],[0,\" (\"],[1,[33,[\"i18n\"],[\"admin.dashboard.space_free\"],[[\"size\"],[[28,[\"diskSpace\",\"backups_free\"]]]]],false],[0,\")\\n\\n\"],[6,[\"if\"],[[28,[\"lastBackupTakenAt\"]]],null,{\"statements\":[[0,\"                      \"],[11,\"br\",[]],[13],[14],[0,\"\\n                      \"],[1,[33,[\"i18n\"],[\"admin.dashboard.lastest_backup\"],[[\"date\"],[[28,[\"backupTimestamp\"]]]]],true],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"uploads\"],[13],[0,\"\\n                \"],[11,\"h3\",[]],[15,\"class\",\"durability-title\"],[13],[1,[33,[\"d-icon\"],[\"upload\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.dashboard.uploads\"],null],false],[14],[0,\"\\n                \"],[11,\"p\",[]],[13],[0,\"\\n                  \"],[1,[28,[\"diskSpace\",\"uploads_used\"]],false],[0,\" (\"],[1,[33,[\"i18n\"],[\"admin.dashboard.space_free\"],[[\"size\"],[[28,[\"diskSpace\",\"uploads_free\"]]]]],false],[0,\")\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"last-dashboard-update\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"\\n            \"],[11,\"h4\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.last_updated\"],null],false],[0,\" \"],[14],[0,\"\\n            \"],[11,\"p\",[]],[13],[1,[26,[\"updatedTimestamp\"]],false],[14],[0,\"\\n               \"],[11,\"a\",[]],[15,\"rel\",\"noopener\"],[15,\"target\",\"_blank\"],[15,\"href\",\"https://meta.discourse.org/tags/release-notes\"],[15,\"class\",\"btn btn-default\"],[13],[0,\"\\n                 \"],[1,[33,[\"i18n\"],[\"admin.dashboard.whats_new_in_discourse\"],null],false],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.dashboard.find_old\"],null],false],[0,\" \"],[6,[\"link-to\"],[\"admin.dashboard\"],null,{\"statements\":[[1,[33,[\"i18n\"],[\"admin.dashboard.old_link\"],null],false]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"section-column\"],[13],[0,\"\\n      \"],[1,[33,[\"admin-report\"],null,[[\"filters\",\"dataSourceName\",\"reportOptions\"],[[28,[\"topReferredTopicsFilters\"]],\"top_referred_topics\",[28,[\"topReferredTopicsOptions\"]]]]],false],[0,\"\\n\\n      \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"reportOptions\",\"filters\",\"isEnabled\",\"disabledLabel\"],[\"trending_search\",[28,[\"trendingSearchOptions\"]],[28,[\"trendingSearchFilters\"]],[28,[\"logSearchQueriesEnabled\"]],\"admin.dashboard.reports.trending_search.disabled\"]]],false],[0,\"\\n      \"],[1,[33,[\"i18n\"],[\"admin.dashboard.reports.trending_search.more\"],null],true],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\"],[\"admin-dashboard-general-bottom\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/dashboard_next_general"}});
Ember.TEMPLATES["admin/templates/dashboard_next_moderation"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"sections\"],[13],[0,\"\\n  \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\"],[\"admin-dashboard-moderation-top\"]]],false],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"moderators-activity section\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"section-title\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"/admin/reports/moderators_activity\"],[13],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.dashboard.moderators_activity\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[1,[33,[\"period-chooser\"],null,[[\"period\",\"action\",\"content\",\"fullDay\"],[[28,[\"period\"]],\"changePeriod\",[28,[\"availablePeriods\"]],true]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"section-body\"],[13],[0,\"\\n      \"],[1,[33,[\"admin-report\"],null,[[\"filters\",\"showHeader\",\"dataSourceName\"],[[28,[\"filters\"]],false,\"moderators_activity\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"main-section\"],[13],[0,\"\\n    \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"reportOptions\",\"filters\"],[\"flags_status\",[28,[\"flagsStatusOptions\"]],[28,[\"lastWeekfilters\"]]]]],false],[0,\"\\n\\n    \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"filters\"],[\"post_edits\",[28,[\"lastWeekfilters\"]]]]],false],[0,\"\\n\\n    \"],[1,[33,[\"admin-report\"],null,[[\"dataSourceName\",\"filters\",\"reportOptions\"],[\"most_disagreed_flaggers\",[28,[\"lastWeekfilters\"]],[28,[\"mostDisagreedFlaggersOptions\"]]]]],false],[0,\"\\n\\n    \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\"],[\"admin-dashboard-moderation-bottom\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/dashboard_next_moderation"}});
Ember.TEMPLATES["admin/templates/email-bounced"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"load-more\"],null,[[\"selector\",\"action\"],[\".email-list tr\",\"loadMore\"]],{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"table email-list\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.time\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.user\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.to_address\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.email_type\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"tr\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.logs.filters.title\"],null],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"user\"]],\"admin.email.logs.filters.user_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"address\"]],\"admin.email.logs.filters.address_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"type\"]],\"admin.email.logs.filters.type_placeholder\"]]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"format-date\"],[[28,[\"l\",\"created_at\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"l\",\"user\"]]],null,{\"statements\":[[0,\"            \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"l\",\"user\"]]],null,{\"statements\":[[1,[33,[\"avatar\"],[[28,[\"l\",\"user\"]]],[[\"imageSize\"],[\"tiny\"]]],false]],\"locals\":[]},null],[0,\"\\n            \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"l\",\"user\"]]],null,{\"statements\":[[1,[28,[\"l\",\"user\",\"username\"]],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            —\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"l\",\"to_address\"]]],null]]]],[13],[1,[28,[\"l\",\"to_address\"]],false],[14],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"showIncomingEmail\",[28,[\"l\",\"id\"]]]],[13],[1,[28,[\"l\",\"email_type\"]],false],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"l\"]},{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[11,\"td\",[]],[15,\"colspan\",\"4\"],[13],[1,[33,[\"i18n\"],[\"admin.email.logs.none\"],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/email-bounced"}});
Ember.TEMPLATES["admin/templates/email-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"table\",[]],[15,\"class\",\"table\"],[13],[0,\"\\n  \"],[11,\"tr\",[]],[13],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.delivery_method\"],null],false],[14],[0,\"\\n    \"],[11,\"td\",[]],[13],[1,[26,[\"delivery_method\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\",\"settings\"]]],null,{\"statements\":[[0,\"    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"th\",[]],[15,\"style\",\"width: 25%\"],[13],[1,[28,[\"s\",\"name\"]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[28,[\"s\",\"value\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"s\"]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"sendingEmail\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"span15 controls\"],[13],[1,[33,[\"i18n\"],[\"admin.email.sending_test\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n    \"],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"testEmailAddress\"]],\"admin.email.test_email_address\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"btn btn-primary\"],[16,\"disabled\",[26,[\"sendTestEmailDisabled\"]],null],[5,[\"action\"],[[28,[null]],\"sendTestEmail\"]],[13],[1,[33,[\"i18n\"],[\"admin.email.send_test\"],null],false],[14],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"sentTestEmailMessage\"]]],null,{\"statements\":[[11,\"span\",[]],[15,\"class\",\"result-message\"],[13],[1,[26,[\"sentTestEmailMessage\"]],false],[14]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/email-index"}});
Ember.TEMPLATES["admin/templates/email-preview-digest"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.preview_digest_desc\"],null],false],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-controls email-preview\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"span7 controls\"],[13],[0,\"\\n    \"],[11,\"label\",[]],[15,\"for\",\"last-seen\"],[13],[1,[33,[\"i18n\"],[\"admin.email.last_seen_user\"],null],false],[14],[0,\"\\n    \"],[1,[33,[\"date-picker-past\"],null,[[\"value\",\"id\"],[[28,[\"lastSeen\"]],\"last-seen\"]]],false],[0,\"\\n    \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.user\"],null],false],[0,\":\"],[14],[0,\"\\n    \"],[1,[33,[\"user-selector\"],null,[[\"single\",\"usernames\",\"canReceiveUpdates\"],[\"true\",[28,[\"username\"]],\"true\"]]],false],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"refresh\"]],[13],[1,[33,[\"i18n\"],[\"admin.email.refresh\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"toggle\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.format\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showHtml\"]]],null,{\"statements\":[[0,\"        \"],[11,\"span\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.html\"],null],false],[14],[0,\" | \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"toggleShowHtml\"]],[13],[1,[33,[\"i18n\"],[\"admin.email.text\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"toggleShowHtml\"]],[13],[1,[33,[\"i18n\"],[\"admin.email.html\"],null],false],[14],[0,\" | \"],[11,\"span\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.text\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"email-preview-digest\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showSendEmailForm\"]]],null,{\"statements\":[[0,\"    \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"sendingEmail\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"i18n\"],[\"admin.email.sending_test\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.send_digest_label\"],null],false],[14],[0,\"\\n        \"],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"email\"]],\"admin.email.test_email_address\"]]],false],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"btn btn-default\"],[16,\"disabled\",[26,[\"sendEmailDisabled\"]],null],[5,[\"action\"],[[28,[null]],\"sendEmail\"]],[13],[1,[33,[\"i18n\"],[\"admin.email.send_digest\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"sentEmail\"]]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"result-message\"],[13],[1,[33,[\"i18n\"],[\"admin.email.sent_test\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"preview-output\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showHtml\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"htmlEmpty\"]]],null,{\"statements\":[[0,\"        \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.no_result\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"iframe\",[]],[16,\"srcdoc\",[28,[\"model\",\"html_content\"]],null],[13],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"pre\",[]],[13],[1,[28,[\"model\",\"text_content\"]],true],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/email-preview-digest"}});
Ember.TEMPLATES["admin/templates/email-received"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"load-more\"],null,[[\"selector\",\"action\"],[\".email-list tr\",\"loadMore\"]],{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"table email-list\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.time\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.from_address\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.to_addresses\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.subject\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"tr\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.logs.filters.title\"],null],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"from\"]],\"admin.email.incoming_emails.filters.from_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"to\"]],\"admin.email.incoming_emails.filters.to_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"subject\"]],\"admin.email.incoming_emails.filters.subject_placeholder\"]]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"time\"],[13],[1,[33,[\"format-date\"],[[28,[\"email\",\"created_at\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"username\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"email\",\"user\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"adminUser\",[28,[\"email\",\"user\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"avatar\"],[[28,[\"email\",\"user\"]]],[[\"imageSize\"],[\"tiny\"]]],false],[0,\"\\n                \"],[1,[28,[\"email\",\"from_address\"]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"              —\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"addresses\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"email\",\"to_addresses\"]]],null,{\"statements\":[[0,\"            \"],[11,\"p\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"to\"]]],null]]]],[15,\"title\",\"TO\"],[13],[1,[33,[\"unbound\"],[[28,[\"to\"]]],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[\"to\"]},null],[6,[\"each\"],[[28,[\"email\",\"cc_addresses\"]]],null,{\"statements\":[[0,\"            \"],[11,\"p\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"cc\"]]],null]]]],[15,\"title\",\"CC\"],[13],[1,[33,[\"unbound\"],[[28,[\"cc\"]]],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[\"cc\"]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"email\",\"post_url\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"email\",\"post_url\"]]]]],[13],[1,[28,[\"email\",\"subject\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[1,[28,[\"email\",\"subject\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"email\"]},{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[11,\"td\",[]],[15,\"colspan\",\"4\"],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.none\"],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/email-received"}});
Ember.TEMPLATES["admin/templates/email-rejected"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"load-more\"],null,[[\"selector\",\"action\"],[\".email-list tr\",\"loadMore\"]],{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"table email-list\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.time\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.from_address\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.to_addresses\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.subject\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.error\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"tr\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.logs.filters.title\"],null],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"from\"]],\"admin.email.incoming_emails.filters.from_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"to\"]],\"admin.email.incoming_emails.filters.to_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"subject\"]],\"admin.email.incoming_emails.filters.subject_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"error\"]],\"admin.email.incoming_emails.filters.error_placeholder\"]]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"time\"],[13],[1,[33,[\"format-date\"],[[28,[\"email\",\"created_at\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"username\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"email\",\"user\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"adminUser\",[28,[\"email\",\"user\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"avatar\"],[[28,[\"email\",\"user\"]]],[[\"imageSize\"],[\"tiny\"]]],false],[0,\"\\n                \"],[1,[28,[\"email\",\"from_address\"]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"email\",\"from_address\"]]],null,{\"statements\":[[0,\"                \"],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"email\",\"from_address\"]]],null]]]],[13],[1,[28,[\"email\",\"from_address\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                —\\n\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"addresses\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"email\",\"to_addresses\"]]],null,{\"statements\":[[0,\"            \"],[11,\"p\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"to\"]]],null]]]],[15,\"title\",\"TO\"],[13],[1,[33,[\"unbound\"],[[28,[\"to\"]]],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[\"to\"]},null],[6,[\"each\"],[[28,[\"email\",\"cc_addresses\"]]],null,{\"statements\":[[0,\"            \"],[11,\"p\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"cc\"]]],null]]]],[15,\"title\",\"CC\"],[13],[1,[33,[\"unbound\"],[[28,[\"cc\"]]],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[\"cc\"]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"email\",\"subject\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"error\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"showIncomingEmail\",[28,[\"email\",\"id\"]]]],[13],[1,[28,[\"email\",\"error\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"email\"]},{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[11,\"td\",[]],[15,\"colspan\",\"5\"],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.none\"],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/email-rejected"}});
Ember.TEMPLATES["admin/templates/email-sent"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"load-more\"],null,[[\"selector\",\"action\"],[\".email-list tr\",\"loadMore\"]],{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"table email-list\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.sent_at\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.user\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.to_address\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.email_type\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.reply_key\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"tr\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.logs.filters.title\"],null],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"user\"]],\"admin.email.logs.filters.user_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"address\"]],\"admin.email.logs.filters.address_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"type\"]],\"admin.email.logs.filters.type_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"reply_key\"]],\"admin.email.logs.filters.reply_key_placeholder\"]]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"format-date\"],[[28,[\"l\",\"created_at\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"l\",\"user\"]]],null,{\"statements\":[[0,\"            \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"l\",\"user\"]]],null,{\"statements\":[[1,[33,[\"avatar\"],[[28,[\"l\",\"user\"]]],[[\"imageSize\"],[\"tiny\"]]],false]],\"locals\":[]},null],[0,\"\\n            \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"l\",\"user\"]]],null,{\"statements\":[[1,[28,[\"l\",\"user\",\"username\"]],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            —\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"l\",\"bounced\"]]],null,{\"statements\":[[1,[33,[\"d-icon\"],[\"repeat\"],[[\"title\"],[\"admin.email.bounced\"]]],false]],\"locals\":[]},null],[0,\"\\n          \"],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"l\",\"to_address\"]]],null]]]],[13],[1,[28,[\"l\",\"to_address\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"l\",\"email_type\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"post-link\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"l\",\"post_url\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"l\",\"post_url\"]]]]],[13],[1,[28,[\"l\",\"post_description\"]],false],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"reply-key\"],[13],[1,[28,[\"l\",\"reply_key\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"reply-key\"],[13],[1,[28,[\"l\",\"reply_key\"]],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"l\"]},{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[11,\"td\",[]],[15,\"colspan\",\"5\"],[13],[1,[33,[\"i18n\"],[\"admin.email.logs.none\"],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/email-sent"}});
Ember.TEMPLATES["admin/templates/email-skipped"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"load-more\"],null,[[\"selector\",\"action\"],[\".email-list tr\",\"loadMore\"]],{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"table email-list\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.time\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.user\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.to_address\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.email_type\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.skipped_reason\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"tr\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.logs.filters.title\"],null],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"user\"]],\"admin.email.logs.filters.user_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"address\"]],\"admin.email.logs.filters.address_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\"],[[28,[\"filter\",\"type\"]],\"admin.email.logs.filters.type_placeholder\"]]],false],[14],[0,\"\\n      \"],[11,\"td\",[]],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"format-date\"],[[28,[\"l\",\"created_at\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"l\",\"user\"]]],null,{\"statements\":[[0,\"            \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"l\",\"user\"]]],null,{\"statements\":[[1,[33,[\"avatar\"],[[28,[\"l\",\"user\"]]],[[\"imageSize\"],[\"tiny\"]]],false]],\"locals\":[]},null],[0,\"\\n            \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"l\",\"user\"]]],null,{\"statements\":[[1,[28,[\"l\",\"user\",\"username\"]],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            —\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"l\",\"to_address\"]]],null]]]],[13],[1,[28,[\"l\",\"to_address\"]],false],[14],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"l\",\"email_type\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"l\",\"post_url\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"l\",\"post_url\"]]]]],[13],[1,[28,[\"l\",\"skipped_reason\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[1,[28,[\"l\",\"skipped_reason\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"l\"]},{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[11,\"td\",[]],[15,\"colspan\",\"5\"],[13],[1,[33,[\"i18n\"],[\"admin.email.logs.none\"],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/email-skipped"}});
Ember.TEMPLATES["admin/templates/email"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"admin-nav\"],null,null,{\"statements\":[[0,\"  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmail.index\",\"admin.email.settings\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmail.previewDigest\",\"admin.email.preview_digest\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminCustomizeEmailTemplates\",\"admin.email.templates\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmail.sent\",\"admin.email.sent\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmail.skipped\",\"admin.email.skipped\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmail.bounced\",\"admin.email.bounced\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmail.received\",\"admin.email.received\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminEmail.rejected\",\"admin.email.rejected\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-container\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/email"}});
Ember.TEMPLATES["admin/templates/embedding"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"embeddable-hosts\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"embedding\",\"embeddable_hosts\"]]],null,{\"statements\":[[0,\"    \"],[11,\"table\",[]],[15,\"class\",\"embedding grid\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[15,\"style\",\"width: 25%\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.host\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"style\",\"width: 15%\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.class_name\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"style\",\"width: 25%\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.path_whitelist\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"style\",\"width: 25%\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.category\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"style\",\"width: 10%\"],[13],[0,\" \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"embedding\",\"embeddable_hosts\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"embeddable-host\"],null,[[\"host\",\"deleteHost\"],[[28,[\"host\"]],\"deleteHost\"]]],false],[0,\"\\n\"]],\"locals\":[\"host\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.embedding.get_started\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"label\",\"action\",\"icon\",\"class\"],[\"admin.embedding.add_host\",\"addHost\",\"plus\",\"btn-primary add-host\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showSecondary\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"embedding-secondary\"],[13],[0,\"\\n    \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.embedding.sample\"],null],true],[14],[0,\"\\n    \"],[1,[33,[\"highlighted-code\"],null,[[\"code\",\"lang\"],[[28,[\"embeddingCode\"]],\"html\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"embedding-secondary\"],[13],[0,\"\\n    \"],[11,\"h3\",[]],[13],[1,[33,[\"i18n\"],[\"admin.embedding.settings\"],null],false],[14],[0,\"\\n\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\"],[\"embed_by_username\",[28,[\"embedding\",\"embed_by_username\"]]]]],false],[0,\"\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\"],[\"embed_post_limit\",[28,[\"embedding\",\"embed_post_limit\"]]]]],false],[0,\"\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\",\"placeholder\"],[\"embed_title_scrubber\",[28,[\"embedding\",\"embed_title_scrubber\"]],\"- site.com$\"]]],false],[0,\"\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\",\"type\"],[\"embed_truncate\",[28,[\"embedding\",\"embed_truncate\"]],\"checkbox\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"embedding-secondary\"],[13],[0,\"\\n    \"],[11,\"h3\",[]],[13],[1,[33,[\"i18n\"],[\"admin.embedding.feed_settings\"],null],false],[14],[0,\"\\n    \"],[11,\"p\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.feed_description\"],null],false],[14],[0,\"\\n\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\",\"type\"],[\"feed_polling_enabled\",[28,[\"embedding\",\"feed_polling_enabled\"]],\"checkbox\"]]],false],[0,\"\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\"],[\"feed_polling_url\",[28,[\"embedding\",\"feed_polling_url\"]]]]],false],[0,\"\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\"],[\"feed_polling_frequency_mins\",[28,[\"embedding\",\"feed_polling_frequency_mins\"]]]]],false],[0,\"\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\"],[\"embed_username_key_from_feed\",[28,[\"embedding\",\"embed_username_key_from_feed\"]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"embedding-secondary\"],[13],[0,\"\\n    \"],[11,\"h3\",[]],[13],[1,[33,[\"i18n\"],[\"admin.embedding.crawling_settings\"],null],false],[14],[0,\"\\n    \"],[11,\"p\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.embedding.crawling_description\"],null],false],[14],[0,\"\\n\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\",\"placeholder\"],[\"embed_whitelist_selector\",[28,[\"embedding\",\"embed_whitelist_selector\"]],\"article, #story, .post\"]]],false],[0,\"\\n\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\",\"placeholder\"],[\"embed_blacklist_selector\",[28,[\"embedding\",\"embed_blacklist_selector\"]],\".ad-unit, header\"]]],false],[0,\"\\n\\n    \"],[1,[33,[\"embedding-setting\"],null,[[\"field\",\"value\",\"placeholder\"],[\"embed_classname_whitelist\",[28,[\"embedding\",\"embed_classname_whitelist\"]],\"emoji, classname\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"embedding-secondary\"],[13],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"label\",\"action\",\"class\",\"disabled\"],[\"admin.embedding.save\",\"saveChanges\",\"btn-primary embed-save\",[28,[\"embedding\",\"isSaving\"]]]]],false],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"saved\"]]],null,{\"statements\":[[1,[33,[\"i18n\"],[\"saved\"],null],false]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/embedding"}});
Ember.TEMPLATES["admin/templates/emojis"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"emoji\"],[13],[0,\"\\n  \"],[11,\"h2\",[]],[13],[1,[33,[\"i18n\"],[\"admin.emoji.title\"],null],false],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"i18n\"],[\"admin.emoji.help\"],null],false],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[1,[33,[\"emoji-uploader\"],null,[[\"done\"],[\"emojiUploaded\"]]],false],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"sortedEmojis\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"table\",[]],[15,\"id\",\"custom_emoji\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.emoji.image\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.emoji.name\"],null],false],[14],[0,\"\\n            \"],[11,\"th\",[]],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"sortedEmojis\"]]],null,{\"statements\":[[0,\"            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"th\",[]],[13],[11,\"img\",[]],[15,\"class\",\"emoji emoji-custom\"],[16,\"src\",[34,[[33,[\"unbound\"],[[28,[\"e\",\"url\"]]],null]]]],[16,\"title\",[34,[[33,[\"unbound\"],[[28,[\"e\",\"name\"]]],null]]]],[13],[14],[14],[0,\"\\n              \"],[11,\"th\",[]],[13],[0,\":\"],[1,[28,[\"e\",\"name\"]],false],[0,\":\"],[14],[0,\"\\n              \"],[11,\"th\",[]],[13],[11,\"button\",[]],[15,\"class\",\"btn btn-danger no-text pull-right\"],[5,[\"action\"],[[28,[null]],\"destroy\",[28,[\"e\"]]]],[13],[1,[33,[\"d-icon\"],[\"trash-o\"],null],false],[0,\" \"],[14],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"e\"]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/emojis"}});
Ember.TEMPLATES["admin/templates/flags-posts-active"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"flagged-posts\"],null,[[\"flaggedPosts\",\"filter\"],[[28,[\"model\"]],\"active\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/flags-posts-active"}});
Ember.TEMPLATES["admin/templates/flags-posts-old"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"flagged-posts\"],null,[[\"flaggedPosts\",\"filter\"],[[28,[\"model\"]],\"old\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/flags-posts-old"}});
Ember.TEMPLATES["admin/templates/flags-topics-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"noTags\",\"args\"],[\"flagged-topics-before\",true,[33,[\"hash\"],null,[[\"flaggedTopics\"],[[28,[\"flaggedTopics\"]]]]]]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"flaggedTopics\"]]],null,{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"flagged-topics grid\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n      \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"noTags\"],[\"flagged-topic-header-row\",true]]],false],[0,\"\\n      \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.flags.flagged_topics.topic\"],null],false],[0,\" \"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.flags.flagged_topics.type\"],null],false],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[1,[33,[\"I18n\"],[\"admin.flags.flagged_topics.users\"],null],false],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.flags.flagged_topics.last_flagged\"],null],false],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"flaggedTopics\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[15,\"class\",\"flagged-topic\"],[13],[0,\"\\n        \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"noTags\",\"args\"],[\"flagged-topic-row\",true,[33,[\"hash\"],null,[[\"topic\"],[[28,[\"ft\",\"topic\"]]]]]]]],false],[0,\"\\n\\n        \"],[11,\"td\",[]],[15,\"class\",\"topic-title\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[16,\"href\",[28,[\"ft\",\"topic\",\"relative_url\"]],null],[15,\"target\",\"_blank\"],[13],[1,[33,[\"replace-emoji\"],[[28,[\"ft\",\"topic\",\"fancy_title\"]]],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"flag-counts\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"ft\",\"flag_counts\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"flag-counts\"],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"type-name\"],[13],[1,[33,[\"post-action-title\"],[[28,[\"fc\",\"post_action_type_id\"]],[28,[\"fc\",\"name_key\"]]],null],false],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"type-count\"],[13],[0,\"x\"],[1,[28,[\"fc\",\"count\"]],false],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"fc\"]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"flagged-topic-users\"],[13],[0,\"\\n          \"],[1,[33,[\"flagged-topic-users\"],null,[[\"users\",\"tagName\"],[[28,[\"ft\",\"users\"]],\"\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"last-flagged\"],[13],[0,\"\\n          \"],[1,[33,[\"format-age\"],[[28,[\"ft\",\"last_flag_at\"]]],null],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"flag-details\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminFlags.topics.show\",[28,[\"ft\",\"id\"]]],[[\"class\",\"title\"],[\"btn d-button no-text btn-small btn-primary show-details\",[33,[\"i18n\"],[\"admin.flags.show_details\"],null]]],{\"statements\":[[0,\"            \"],[1,[33,[\"d-icon\"],[\"list\"],null],false],[0,\"\\n            \"],[1,[33,[\"i18n\"],[\"admin.flags.details\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"ft\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[1,[33,[\"i18n\"],[\"admin.flags.flagged_topics.no_results\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/flags-topics-index"}});
Ember.TEMPLATES["admin/templates/flags-topics-show"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"flagged-topic-details\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"topic-title\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"\\n      \"],[1,[33,[\"topic-status\"],null,[[\"topic\"],[[28,[\"topic\"]]]]],false],[0,\"\\n\"],[6,[\"link-to\"],[\"topic\",[28,[\"topic\"]]],[[\"target\"],[\"_blank\"]],{\"statements\":[[0,\"        \"],[1,[28,[\"topic\",\"fancyTitle\"]],true],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"args\"],[\"flagged-topic-details-header\",[33,[\"hash\"],null,[[\"topic\"],[[28,[\"topic\"]]]]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"topic-flags\"],[13],[0,\"\\n  \"],[1,[33,[\"flagged-posts\"],null,[[\"flaggedPosts\",\"filter\",\"topic\"],[[28,[\"flaggedPosts\"]],\"active\",[28,[\"topic\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/flags-topics-show"}});
Ember.TEMPLATES["admin/templates/flags"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"admin-nav\"],null,null,{\"statements\":[[6,[\"if\"],[[28,[\"siteSettings\",\"flags_default_topics\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminFlags.topics\",\"admin.flags.topics\"]]],false],[0,\"\\n    \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminFlags.postsActive\",\"admin.flags.active_posts\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminFlags.postsActive\",\"admin.flags.active_posts\"]]],false],[0,\"\\n    \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminFlags.topics\",\"admin.flags.topics\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\",\"class\"],[\"adminFlags.postsOld\",\"admin.flags.old_posts\",\"right\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-container\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/flags"}});
Ember.TEMPLATES["admin/templates/logs"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"admin-nav\"],null,null,{\"statements\":[[0,\"  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminLogs.staffActionLogs\",\"admin.logs.staff_actions.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminLogs.screenedEmails\",\"admin.logs.screened_emails.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminLogs.screenedIpAddresses\",\"admin.logs.screened_ips.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminLogs.screenedUrls\",\"admin.logs.screened_urls.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminWatchedWords\",\"admin.watched_words.title\"]]],false],[0,\"\\n  \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminSearchLogs\",\"admin.logs.search_logs.title\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"nav-item\"],null,[[\"path\",\"label\"],[\"/logs\",\"admin.logs.logster.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-container\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/logs"}});
Ember.TEMPLATES["admin/templates/logs/screened-emails"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  \"],[1,[33,[\"i18n\"],[\"admin.logs.screened_emails.description\"],null],false],[0,\"\\n\"],[14],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"btn btn-default screened-email-export\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.export_csv.button_title.screened_email\"],null]]]],[5,[\"action\"],[[28,[null]],\"exportScreenedEmailList\"]],[13],[1,[33,[\"d-icon\"],[\"download\"],null],false],[1,[33,[\"i18n\"],[\"admin.export_csv.button_text\"],null],false],[14],[0,\"\\n\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"table\",[]],[15,\"class\",\"screened-emails grid\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"first email\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.screened_emails.email\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"action\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.action\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"match_count\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.match_count\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"last_match_at\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.last_match_at\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"created_at\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.created_at\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"ip_address\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.ip_address\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"action\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[15,\"class\",\"admin-list-item\"],[13],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col first email\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"overflow-ellipsis\"],[16,\"title\",[28,[\"item\",\"email\"]],null],[13],[1,[28,[\"item\",\"email\"]],false],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"action\"],[13],[1,[28,[\"item\",\"actionName\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"match_count\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.match_count\"],null],false],[14],[1,[28,[\"item\",\"match_count\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"last_match_at\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.last_match_at\"],null],false],[14],[1,[33,[\"age-with-tooltip\"],[[28,[\"item\",\"last_match_at\"]]],null],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"created_at\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.created_at\"],null],false],[14],[1,[33,[\"age-with-tooltip\"],[[28,[\"item\",\"created_at\"]]],null],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"ip_address\"],[13],[1,[28,[\"item\",\"ip_address\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"action\"],[13],[0,\"\\n            \"],[1,[33,[\"d-button\"],null,[[\"action\",\"actionParam\",\"icon\",\"label\"],[\"clearBlock\",[28,[\"item\"]],\"check\",\"admin.logs.screened_emails.actions.allow\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"i18n\"],[\"search.no_results\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/logs/screened-emails"}});
Ember.TEMPLATES["admin/templates/logs/screened-ip-addresses"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.screened_ips.description\"],null],false],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"screened-ip-controls\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"filter-screened-ip-address\"],[13],[0,\" \\n    \"],[1,[33,[\"text-field\"],null,[[\"value\",\"class\",\"placeholderKey\",\"autocorrect\",\"autocapitalize\"],[[28,[\"filter\"]],\"ip-address-input\",\"admin.logs.screened_ips.form.filter\",\"off\",\"off\"]]],false],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"title\",\"label\"],[\"btn-default\",\"rollUp\",\"admin.logs.screened_ips.roll_up.title\",\"admin.logs.screened_ips.roll_up.text\"]]],false],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"title\",\"label\"],[\"btn-default\",\"exportScreenedIpList\",\"download\",\"admin.export_csv.button_title.screened_ip\",\"admin.export_csv.button_text\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n    \"],[1,[33,[\"screened-ip-address-form\"],null,[[\"action\"],[\"recordAdded\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"table\",[]],[15,\"class\",\"admin-logs-table screened-ip-addresses grid\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[15,\"class\",\"heading-container\"],[13],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading first ip_address\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.ip_address\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading action\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.action\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading match_count\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.match_count\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading created_at\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.created_at\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading last_match_at\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.last_match_at\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading actions\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[15,\"class\",\"admin-list-item\"],[13],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col first ip_address\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"editing\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"text-field\"],null,[[\"value\",\"autofocus\"],[[28,[\"item\",\"ip_address\"]],\"autofocus\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"span\",[]],[5,[\"action\"],[[28,[null]],\"edit\",[28,[\"item\"]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"isRange\"]]],null,{\"statements\":[[0,\"                  \"],[11,\"strong\",[]],[13],[1,[28,[\"item\",\"ip_address\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                  \"],[1,[28,[\"item\",\"ip_address\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"              \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col action\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"isBlocked\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"d-icon\"],[\"ban\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[1,[33,[\"d-icon\"],[\"check\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[1,[28,[\"item\",\"actionName\"]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col match_count\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.match_count\"],null],false],[14],[0,\" \"],[1,[28,[\"item\",\"match_count\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col created_at\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.created_at\"],null],false],[14],[0,\" \"],[1,[33,[\"age-with-tooltip\"],[[28,[\"item\",\"created_at\"]]],null],false],[14],[0,\"\\n\\n          \"],[11,\"td\",[]],[15,\"class\",\"col last_match_at\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"last_match_at\"]]],null,{\"statements\":[[0,\"               \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.last_match_at\"],null],false],[0,\" \"],[1,[33,[\"age-with-tooltip\"],[[28,[\"item\",\"last_match_at\"]]],null],false],[14],[0,\"  \\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col actions\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"item\",\"editing\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"class\"],[\"btn-default\",\"destroy\",[28,[\"item\"]],\"trash-o\",\"btn-danger\"]]],false],[0,\"\\n              \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\"],[\"btn-default\",\"edit\",[28,[\"item\"]],\"pencil\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"isBlocked\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"label\"],[\"btn-default\",\"allow\",[28,[\"item\"]],\"check\",\"admin.logs.screened_ips.actions.do_nothing\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"label\"],[\"btn-default\",\"block\",[28,[\"item\"]],\"ban\",\"admin.logs.screened_ips.actions.block\"]]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"              \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"label\"],[\"btn-default\",\"save\",[28,[\"item\"]],\"admin.logs.save\"]]],false],[0,\"\\n              \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"cancel\",[28,[\"item\"]]]],[13],[1,[33,[\"i18n\"],[\"cancel\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"i18n\"],[\"search.no_results\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/logs/screened-ip-addresses"}});
Ember.TEMPLATES["admin/templates/logs/screened-urls"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  \"],[1,[33,[\"i18n\"],[\"admin.logs.screened_urls.description\"],null],false],[0,\"\\n\"],[14],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"btn btn-default\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.export_csv.button_title.screened_url\"],null]]]],[5,[\"action\"],[[28,[null]],\"exportScreenedUrlList\"]],[13],[1,[33,[\"d-icon\"],[\"download\"],null],false],[1,[33,[\"i18n\"],[\"admin.export_csv.button_text\"],null],false],[14],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"    \"],[11,\"table\",[]],[15,\"class\",\"screened-urls grid\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"first domain\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.screened_urls.domain\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"action\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.action\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"match_count\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.match_count\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"last_match_at\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.last_match_at\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"created_at\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.created_at\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[15,\"class\",\"admin-list-item\"],[13],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col first domain\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"overflow-ellipsis\"],[16,\"title\",[28,[\"url\",\"domain\"]],null],[13],[1,[28,[\"url\",\"domain\"]],false],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col action\"],[13],[1,[28,[\"url\",\"actionName\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col match_count\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.match_count\"],null],false],[14],[1,[28,[\"url\",\"match_count\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col last_match_at\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.last_match_at\"],null],false],[14],[1,[33,[\"age-with-tooltip\"],[[28,[\"url\",\"last_match_at\"]]],null],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col created_at\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.created_at\"],null],false],[14],[1,[33,[\"age-with-tooltip\"],[[28,[\"url\",\"created_at\"]]],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"url\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"i18n\"],[\"search.no_results\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/logs/screened-urls"}});
Ember.TEMPLATES["admin/templates/logs/staff-action-logs"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"staff-action-logs-controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filtersExists\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"staff-action-logs-filters\"],[13],[0,\"\\n    \"],[11,\"a\",[]],[15,\"class\",\"clear-filters filter\"],[5,[\"action\"],[[28,[null]],\"clearAllFilters\"]],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.clear_filters\"],null],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"actionFilter\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"class\",\"filter\"],[5,[\"action\"],[[28,[null]],\"clearFilter\",\"actionFilter\"]],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.action\"],null],false],[14],[0,\": \"],[1,[26,[\"actionFilter\"]],false],[0,\"\\n        \"],[1,[33,[\"d-icon\"],[\"times-circle\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"filters\",\"acting_user\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"class\",\"filter\"],[5,[\"action\"],[[28,[null]],\"clearFilter\",\"acting_user\"]],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.staff_user\"],null],false],[14],[0,\": \"],[1,[28,[\"filters\",\"acting_user\"]],false],[0,\"\\n        \"],[1,[33,[\"d-icon\"],[\"times-circle\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"filters\",\"target_user\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"class\",\"filter\"],[5,[\"action\"],[[28,[null]],\"clearFilter\",\"target_user\"]],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.target_user\"],null],false],[14],[0,\": \"],[1,[28,[\"filters\",\"target_user\"]],false],[0,\"\\n        \"],[1,[33,[\"d-icon\"],[\"times-circle\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"filters\",\"subject\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"class\",\"filter\"],[5,[\"action\"],[[28,[null]],\"clearFilter\",\"subject\"]],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.subject\"],null],false],[14],[0,\": \"],[1,[28,[\"filters\",\"subject\"]],false],[0,\"\\n        \"],[1,[33,[\"d-icon\"],[\"times-circle\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.filter\"],null],false],[0,\" \"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\",\"none\"],[[28,[\"userHistoryActions\"]],[28,[\"filterActionId\"]],\"admin.logs.staff_actions.all\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\",\"icon\"],[\"btn-default\",\"exportStaffActionLogs\",\"admin.export_csv.button_text\",\"download\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\\n\"],[6,[\"staff-actions\"],null,null,{\"statements\":[[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[0,\"\\n\"],[11,\"table\",[]],[15,\"class\",\"table staff-logs grid\"],[13],[0,\"\\n\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.staff_user\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.action\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.subject\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.when\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.details\"],null],false],[14],[0,\"\\n    \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.context\"],null],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[15,\"class\",\"admin-list-item\"],[13],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"staff-users\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"staff-user\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"acting_user\"]]],null,{\"statements\":[[0,\"              \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"item\",\"acting_user\"]]],null,{\"statements\":[[1,[33,[\"avatar\"],[[28,[\"item\",\"acting_user\"]]],[[\"imageSize\"],[\"tiny\"]]],false]],\"locals\":[]},null],[0,\"\\n              \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"filterByStaffUser\",[28,[\"item\",\"acting_user\"]]]],[13],[1,[28,[\"item\",\"acting_user\",\"username\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"span\",[]],[15,\"class\",\"deleted-user\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.user.deleted\"],null]]]],[13],[0,\"\\n                \"],[1,[33,[\"d-icon\"],[\"trash-o\"],null],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"col value action\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"filterByAction\",[28,[\"item\"]]]],[13],[1,[28,[\"item\",\"actionName\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"col value subject\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"subject\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"item\",\"target_user\"]]],null,{\"statements\":[[0,\"            \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"item\",\"target_user\"]]],null,{\"statements\":[[1,[33,[\"avatar\"],[[28,[\"item\",\"target_user\"]]],[[\"imageSize\"],[\"tiny\"]]],false]],\"locals\":[]},null],[0,\"\\n            \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"filterByTargetUser\",[28,[\"item\",\"target_user\"]]]],[13],[1,[28,[\"item\",\"target_user\",\"username\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"item\",\"subject\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[16,\"title\",[28,[\"item\",\"subject\"]],null],[5,[\"action\"],[[28,[null]],\"filterBySubject\",[28,[\"item\",\"subject\"]]]],[13],[1,[28,[\"item\",\"subject\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"col value created-at\"],[13],[1,[33,[\"age-with-tooltip\"],[[28,[\"item\",\"created_at\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"col value details\"],[13],[0,\"\\n          \"],[1,[28,[\"item\",\"formattedDetails\"]],true],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"useCustomModalForDetails\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"showCustomDetailsModal\",[28,[\"item\"]]]],[13],[1,[33,[\"d-icon\"],[\"info-circle\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.show\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"item\",\"useModalForDetails\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"showDetailsModal\",[28,[\"item\"]]]],[13],[1,[33,[\"d-icon\"],[\"info-circle\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.logs.staff_actions.show\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"col value context\"],[13],[1,[28,[\"item\",\"context\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},{\"statements\":[[0,\"      \"],[1,[33,[\"i18n\"],[\"search.no_results\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/logs/staff-action-logs"}});
Ember.TEMPLATES["admin/templates/modal/admin-add-upload"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"class\",\"title\"],[\"add-upload-modal\",\"admin.customize.theme.add_upload\"]],{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"inputs\"],[13],[0,\"\\n      \"],[11,\"input\",[]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"updateName\"],null],null],[15,\"type\",\"file\"],[15,\"id\",\"file-input\"],[15,\"accept\",\"*\"],[13],[14],[11,\"br\",[]],[13],[14],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.upload_file_tip\"],null],false],[14],[11,\"br\",[]],[13],[14],[0,\"\\n      \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.variable_name\"],null],false],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"id\",\"value\"],[\"name\",[28,[\"name\"]]]]],false],[11,\"br\",[]],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"fileSelected\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"errorMessage\"]]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"alert alert-error\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"disabled\",\"class\",\"icon\",\"label\"],[\"upload\",[28,[\"disabled\"]],\"btn btn-primary\",\"upload\",\"admin.customize.theme.upload\"]]],false],[0,\"\\n  \"],[1,[33,[\"d-modal-cancel\"],null,[[\"close\"],[[33,[\"action\"],[[28,[null]],\"closeModal\"],null]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-add-upload"}});
Ember.TEMPLATES["admin/templates/modal/admin-badge-preview"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"title\",\"class\"],[\"admin.badges.preview.modal_title\",\"badge-query-preview\"]],{\"statements\":[[6,[\"if\"],[[28,[\"errors\"]]],null,{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"error-header\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.preview.sql_error_header\"],null],false],[14],[0,\"\\n\\n    \"],[11,\"pre\",[]],[15,\"class\",\"badge-errors\"],[13],[1,[26,[\"errors\"]],false],[14],[0,\"\\n\\n    \"],[4,\"\\n    TODO we want some help pages for this, link to those instead\\n    <p>\\n      {{i18n 'admin.badges.preview.error_help'}}\\n    </p>\\n    <ul>\\n      <li><a href=\\\"https://meta.discourse.org/t/triggered-custom-badge-queries/19336\\\">https://meta.discourse.org/t/triggered-custom-badge-queries/19336</a></li>\\n    </ul>\\n    \"],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"grant-count\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"count\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"i18n\"],[\"admin.badges.preview.grant_count\"],[[\"count\"],[[28,[\"count\"]]]]],true],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"i18n\"],[\"admin.badges.preview.no_grant_count\"],null],true],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"count_warning\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"count-warning\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"heading\"],[13],[1,[33,[\"d-icon\"],[\"warning\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.badges.preview.bad_count_warning.header\"],null],false],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"body\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.preview.bad_count_warning.text\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"sample\"]]],null,{\"statements\":[[0,\"      \"],[11,\"p\",[]],[15,\"class\",\"sample\"],[13],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.badges.preview.sample\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"processed_sample\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[13],[1,[28,[\"html\"]],true],[14],[0,\"\\n\"]],\"locals\":[\"html\"]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"has_query_plan\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"badge-query-plan\"],[13],[0,\"\\n          \"],[1,[26,[\"query_plan_html\"]],true],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-badge-preview"}});
Ember.TEMPLATES["admin/templates/modal/admin-color-scheme-select-base"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"d-modal-body\"],null,[[\"title\"],[\"admin.customize.colors.select_base.title\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"i18n\"],[\"admin.customize.colors.select_base.description\"],null],false],[0,\"\\n    \"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\",\"allowInitialValueMutation\",\"valueAttribute\"],[[28,[\"model\"]],[28,[\"selectedBaseThemeId\"]],true,\"base_scheme_id\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"btn btn-primary\"],[5,[\"action\"],[[28,[null]],\"selectBase\"]],[13],[1,[33,[\"d-icon\"],[\"plus\"],null],false],[1,[33,[\"i18n\"],[\"admin.customize.new\"],null],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-color-scheme-select-base"}});
Ember.TEMPLATES["admin/templates/modal/admin-create-theme"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"class\",\"title\"],[\"create-theme-modal\",\"admin.customize.theme.create\"]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"input\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[0,\"\\n      \"],[1,[33,[\"I18n\"],[\"admin.customize.theme.create_name\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"control\"],[13],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\"],[[28,[\"name\"]],[28,[\"placeholder\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"input\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"label\"],[13],[0,\"\\n      \"],[1,[33,[\"I18n\"],[\"admin.customize.theme.create_type\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"control\"],[13],[0,\"\\n      \"],[1,[33,[\"combo-box\"],null,[[\"valueAttribute\",\"content\",\"value\"],[\"value\",[28,[\"types\"]],[28,[\"selectedType\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showError\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[0,\"\\n      \"],[1,[33,[\"d-icon\"],[\"warning\"],null],false],[0,\"\\n      \"],[1,[33,[\"I18n\"],[\"admin.customize.theme.name_too_short\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"class\",\"label\",\"action\",\"disabled\"],[\"btn btn-primary\",\"admin.customize.theme.create\",\"createTheme\",[28,[\"saving\"]]]]],false],[0,\"\\n  \"],[1,[33,[\"d-modal-cancel\"],null,[[\"close\"],[[33,[\"action\"],[[28,[null]],\"closeModal\"],null]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-create-theme"}});
Ember.TEMPLATES["admin/templates/modal/admin-edit-badge-groupings"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"title\"],[\"admin.badges.badge_groupings.modal_title\"]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[13],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"badge-groupings\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"workingCopy\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"wc\",\"editing\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"input\"],null,[[\"value\"],[[28,[\"wc\",\"name\"]]]]],false],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"btn no-text\"],[5,[\"action\"],[[28,[null]],\"save\",[28,[\"wc\"]]]],[13],[1,[33,[\"d-icon\"],[\"check\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[28,[\"wc\",\"displayName\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"actions\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"btn no-text\"],[16,\"disabled\",[28,[\"wc\",\"system\"]],null],[5,[\"action\"],[[28,[null]],\"edit\",[28,[\"wc\"]]]],[13],[1,[33,[\"d-icon\"],[\"pencil\"],null],false],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"btn no-text\"],[5,[\"action\"],[[28,[null]],\"up\",[28,[\"wc\"]]]],[13],[1,[33,[\"d-icon\"],[\"toggle-up\"],null],false],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"btn no-text\"],[5,[\"action\"],[[28,[null]],\"down\",[28,[\"wc\"]]]],[13],[1,[33,[\"d-icon\"],[\"toggle-down\"],null],false],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"btn no-text btn-danger\"],[16,\"disabled\",[28,[\"wc\",\"system\"]],null],[5,[\"action\"],[[28,[null]],\"delete\",[28,[\"wc\"]]]],[13],[1,[33,[\"d-icon\"],[\"times\"],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"wc\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"add\"]],[13],[1,[33,[\"i18n\"],[\"admin.badges.new\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"btn btn-primary\"],[16,\"disabled\",[26,[\"submitDisabled\"]],null],[5,[\"action\"],[[28,[null]],\"saveAll\"]],[13],[1,[33,[\"i18n\"],[\"admin.badges.save\"],null],false],[14],[0,\"\\n  \"],[1,[33,[\"d-modal-cancel\"],null,[[\"close\"],[[33,[\"action\"],[[28,[null]],\"closeModal\"],null]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-edit-badge-groupings"}});
Ember.TEMPLATES["admin/templates/modal/admin-flags-received"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"rawTitle\"],[[33,[\"i18n\"],[\"admin.user.flags_received_by\"],[[\"username\"],[[28,[\"model\",\"username\"]]]]]]],{\"statements\":[[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loadingFlags\"]]]],{\"statements\":[[6,[\"each\"],[[28,[\"flaggedPosts\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"received-flag flagged-post\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"flagged-post-excerpt\"],[13],[0,\"\\n          \"],[1,[33,[\"flagged-post-title\"],null,[[\"flaggedPost\"],[[28,[\"flaggedPost\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[1,[33,[\"flag-user-lists\"],null,[[\"flaggedPost\",\"showResolvedBy\"],[[28,[\"flaggedPost\"]],[28,[\"flaggedPost\",\"hasDisposedBy\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"flaggedPost\"]},{\"statements\":[[0,\"      \"],[1,[33,[\"i18n\"],[\"admin.user.flags_received_none\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-flags-received"}});
Ember.TEMPLATES["admin/templates/modal/admin-import-theme"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"class\",\"title\"],[\"upload-selector\",\"admin.customize.theme.import_theme\"]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"radios\"],[13],[0,\"\\n    \"],[1,[33,[\"radio-button\"],null,[[\"name\",\"id\",\"value\",\"selection\"],[\"upload\",\"local\",\"local\",[28,[\"selection\"]]]]],false],[0,\"\\n    \"],[11,\"label\",[]],[15,\"class\",\"radio\"],[15,\"for\",\"local\"],[13],[1,[33,[\"i18n\"],[\"upload_selector.from_my_computer\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"local\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"inputs\"],[13],[0,\"\\n        \"],[11,\"input\",[]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"uploadLocaleFile\"],null],null],[15,\"type\",\"file\"],[15,\"id\",\"file-input\"],[15,\"accept\",\".dcstyle.json,application/json\"],[13],[14],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.import_file_tip\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"radios\"],[13],[0,\"\\n    \"],[1,[33,[\"radio-button\"],null,[[\"name\",\"id\",\"value\",\"selection\"],[\"upload\",\"remote\",\"remote\",[28,[\"selection\"]]]]],false],[0,\"\\n    \"],[11,\"label\",[]],[15,\"class\",\"radio\"],[15,\"for\",\"remote\"],[13],[1,[33,[\"i18n\"],[\"upload_selector.from_the_web\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"remote\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"inputs\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"repo\"],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\"],[[28,[\"uploadUrl\"]],\"https://github.com/discourse/sample_theme\"]]],false],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.import_web_tip\"],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"branch\"],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\"],[[28,[\"branch\"]],\"beta\"]]],false],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"description\"],[13],[1,[33,[\"i18n\"],[\"admin.customize.theme.remote_branch\"],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"check-private\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"privateChecked\"]]]]],false],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.is_private\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"checkPrivate\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"privateChecked\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"publicKey\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"public-key\"],[13],[0,\"\\n            \"],[1,[33,[\"i18n\"],[\"admin.customize.theme.public_key\"],null],false],[0,\"\\n            \"],[1,[33,[\"textarea\"],null,[[\"readonly\",\"value\"],[true,[28,[\"publicKey\"]]]]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"disabled\",\"class\",\"icon\",\"label\"],[\"importTheme\",[28,[\"importDisabled\"]],\"btn btn-primary\",\"upload\",\"admin.customize.import\"]]],false],[0,\"\\n  \"],[1,[33,[\"d-modal-cancel\"],null,[[\"close\"],[[33,[\"action\"],[[28,[null]],\"closeModal\"],null]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-import-theme"}});
Ember.TEMPLATES["admin/templates/modal/admin-incoming-email"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"class\",\"title\"],[\"incoming-emails\",\"admin.email.incoming_emails.modal.title\"]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"control-group\"],[13],[0,\"\\n    \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.modal.error\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[1,[28,[\"model\",\"error\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"error_description\"]]],null,{\"statements\":[[0,\"        \"],[11,\"p\",[]],[15,\"class\",\"error-description\"],[13],[1,[28,[\"model\",\"error_description\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"control-group\"],[13],[0,\"\\n    \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.modal.headers\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n      \"],[1,[33,[\"textarea\"],null,[[\"value\",\"wrap\"],[[28,[\"model\",\"headers\"]],\"off\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"control-group\"],[13],[0,\"\\n    \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.modal.subject\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n      \"],[1,[28,[\"model\",\"subject\"]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"control-group\"],[13],[0,\"\\n    \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.modal.body\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n      \"],[1,[33,[\"textarea\"],null,[[\"value\"],[[28,[\"model\",\"body\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"rejection_message\"]]],null,{\"statements\":[[0,\"    \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"control-group\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.email.incoming_emails.modal.rejection_message\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n        \"],[1,[33,[\"textarea\"],null,[[\"value\"],[[28,[\"model\",\"rejection_message\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-incoming-email"}});
Ember.TEMPLATES["admin/templates/modal/admin-moderation-history"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"title\"],[\"admin.flags.moderation_history\"]],{\"statements\":[[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"history\"]]],null,{\"statements\":[[0,\"      \"],[11,\"table\",[]],[15,\"class\",\"moderation-history\"],[13],[0,\"\\n        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.created_at\"],null],false],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.logs.action\"],null],false],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.moderation_history.performed_by\"],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"history\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"moderation-history-item\"],null,[[\"item\"],[[28,[\"item\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"no-results\"],[13],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.moderation_history.no_results\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[]},null],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"label\"],[[33,[\"action\"],[[28,[null]],\"closeModal\"],null],\"close\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-moderation-history"}});
Ember.TEMPLATES["admin/templates/modal/admin-silence-user"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"title\"],[\"admin.user.silence_modal_title\"]],{\"statements\":[[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loadingUser\"]]]],{\"statements\":[[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"until-controls\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"\\n        \"],[1,[33,[\"future-date-input\"],null,[[\"class\",\"label\",\"includeFarFuture\",\"clearable\",\"input\"],[\"silence-until\",\"admin.user.silence_duration\",true,false,[28,[\"silenceUntil\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[1,[33,[\"silence-details\"],null,[[\"reason\",\"message\"],[[28,[\"reason\"]],[28,[\"message\"]]]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"post\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"penalty-post-action\"],null,[[\"post\",\"postAction\",\"postEdit\"],[[28,[\"post\"]],[28,[\"postAction\"]],[28,[\"postEdit\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"disabled\",\"icon\",\"label\"],[\"btn-danger perform-silence\",\"silence\",[28,[\"submitDisabled\"]],\"microphone-slash\",\"admin.user.silence\"]]],false],[0,\"\\n  \"],[1,[33,[\"d-modal-cancel\"],null,[[\"close\"],[[33,[\"action\"],[[28,[null]],\"closeModal\"],null]]]],false],[0,\"\\n  \"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\",\"size\"],[[28,[\"loading\"]],\"small\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-silence-user"}});
Ember.TEMPLATES["admin/templates/modal/admin-staff-action-log-details"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"title\"],[\"admin.logs.staff_actions.modal_title\"]],{\"statements\":[[0,\"  \"],[11,\"pre\",[]],[13],[1,[28,[\"model\",\"details\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"label\"],[[33,[\"action\"],[[28,[null]],\"closeModal\"],null],\"close\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-staff-action-log-details"}});
Ember.TEMPLATES["admin/templates/modal/admin-start-backup"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"title\"],[\"admin.backups.operations.backup.confirm\"]],{\"statements\":[[0,\"  \"],[11,\"button\",[]],[15,\"class\",\"btn btn-primary\"],[5,[\"action\"],[[28,[null]],\"startBackupWithUploads\"]],[13],[1,[33,[\"i18n\"],[\"yes_value\"],null],false],[14],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"startBackupWithoutUploads\"]],[13],[1,[33,[\"i18n\"],[\"admin.backups.operations.backup.without_uploads\"],null],false],[14],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"cancel\"]],[13],[1,[33,[\"i18n\"],[\"no_value\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-start-backup"}});
Ember.TEMPLATES["admin/templates/modal/admin-suspend-user"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"title\"],[\"admin.user.suspend_modal_title\"]],{\"statements\":[[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loadingUser\"]]]],{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[28,[\"user\",\"canSuspend\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"until-controls\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"\\n          \"],[1,[33,[\"future-date-input\"],null,[[\"class\",\"label\",\"includeFarFuture\",\"clearable\",\"input\"],[\"suspend-until\",\"admin.user.suspend_duration\",true,false,[28,[\"suspendUntil\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[1,[33,[\"suspension-details\"],null,[[\"reason\",\"message\"],[[28,[\"reason\"]],[28,[\"message\"]]]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"post\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"penalty-post-action\"],null,[[\"post\",\"postAction\",\"postEdit\"],[[28,[\"post\"]],[28,[\"postAction\"]],[28,[\"postEdit\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"cant-suspend\"],[13],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.user.cant_suspend\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"disabled\",\"icon\",\"label\"],[\"btn-danger perform-suspend\",\"suspend\",[28,[\"submitDisabled\"]],\"ban\",\"admin.user.suspend\"]]],false],[0,\"\\n  \"],[1,[33,[\"d-modal-cancel\"],null,[[\"close\"],[[33,[\"action\"],[[28,[null]],\"closeModal\"],null]]]],false],[0,\"\\n  \"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\",\"size\"],[[28,[\"loading\"]],\"small\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-suspend-user"}});
Ember.TEMPLATES["admin/templates/modal/admin-theme-change"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"d-modal-body\"],null,[[\"title\"],[\"admin.logs.staff_actions.modal_title\"]],{\"statements\":[[0,\"    \"],[1,[26,[\"diff\"]],true],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"btn btn-primary\"],[5,[\"action\"],[[28,[null]],\"closeModal\"]],[13],[1,[33,[\"i18n\"],[\"close\"],null],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-theme-change"}});
Ember.TEMPLATES["admin/templates/modal/admin-uploaded-image-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-modal-body\"],null,[[\"class\"],[\"uploaded-image-list\"]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"selectable-avatars\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"images\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"selectable-avatar\"],[5,[\"action\"],[[28,[null]],\"remove\",[28,[\"image\"]]]],[13],[0,\"\\n        \"],[1,[33,[\"bound-avatar-template\"],[[28,[\"image\"]],\"huge\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"image\"]},{\"statements\":[[0,\"      \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.site_settings.uploaded_image_list.empty\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"action\",\"label\"],[[33,[\"action\"],[[28,[null]],\"close\"],null],\"close\"]]],false],[0,\"\\n  \"],[1,[33,[\"images-uploader\"],null,[[\"uploading\",\"done\",\"class\"],[[28,[\"uploading\"]],\"uploadDone\",\"pull-right\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/modal/admin-uploaded-image-list"}});
Ember.TEMPLATES["admin/templates/permalinks"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"permalink-title\"],[13],[0,\"\\n  \"],[11,\"h2\",[]],[13],[1,[33,[\"i18n\"],[\"admin.permalink.title\"],null],false],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"permalink-search\"],[13],[0,\"\\n  \"],[1,[33,[\"text-field\"],null,[[\"value\",\"class\",\"placeholderKey\",\"autocorrect\",\"autocapitalize\"],[[28,[\"filter\"]],\"url-input\",\"admin.permalink.form.filter\",\"off\",\"off\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[1,[33,[\"permalink-form\"],null,[[\"action\"],[\"recordAdded\"]]],false],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"    \"],[11,\"table\",[]],[15,\"class\",\"admin-logs-table permalinks grid\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[15,\"class\",\"heading-container\"],[13],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading first url\"],[13],[1,[33,[\"i18n\"],[\"admin.permalink.url\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading topic\"],[13],[1,[33,[\"i18n\"],[\"admin.permalink.topic_title\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading post\"],[13],[1,[33,[\"i18n\"],[\"admin.permalink.post_title\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading category\"],[13],[1,[33,[\"i18n\"],[\"admin.permalink.category_title\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading external_url\"],[13],[1,[33,[\"i18n\"],[\"admin.permalink.external_url\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading actions\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[15,\"class\",\"admin-list-item\"],[13],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col first url\"],[13],[1,[28,[\"pl\",\"url\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col topic\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"pl\",\"topic_id\"]]],null,{\"statements\":[[0,\"              \"],[11,\"a\",[]],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"pl\",\"topic_url\"]]],null]]]],[13],[1,[28,[\"pl\",\"topic_title\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col post\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"pl\",\"post_id\"]]],null,{\"statements\":[[0,\"              \"],[11,\"a\",[]],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"pl\",\"post_url\"]]],null]]]],[13],[0,\"#\"],[1,[28,[\"pl\",\"post_number\"]],false],[0,\" \"],[1,[28,[\"pl\",\"post_topic_title\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col category\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"pl\",\"category_id\"]]],null,{\"statements\":[[0,\"              \"],[11,\"a\",[]],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"pl\",\"category_url\"]]],null]]]],[13],[1,[28,[\"pl\",\"category_name\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col external_url\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"pl\",\"external_url\"]]],null,{\"statements\":[[0,\"              \"],[11,\"a\",[]],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"pl\",\"external_url\"]]],null]]]],[13],[1,[28,[\"pl\",\"external_url\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col action\"],[13],[0,\"\\n            \"],[1,[33,[\"d-button\"],null,[[\"action\",\"actionParam\",\"icon\",\"class\"],[\"destroy\",[28,[\"pl\"]],\"trash-o\",\"btn-danger\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"pl\"]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"i18n\"],[\"search.no_results\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/permalinks"}});
Ember.TEMPLATES["admin/templates/plugins-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[1,[33,[\"i18n\"],[\"admin.plugins.installed\"],null],false],[14],[0,\"\\n\\n\\n  \"],[11,\"table\",[]],[15,\"class\",\"admin-plugins grid\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.plugins.name\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.plugins.version\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.plugins.enabled\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"plugin\",\"is_official\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"d-icon\"],[\"check-circle\"],[[\"title\",\"class\"],[\"admin.plugins.official\",\"admin-plugins-official-badge\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n\\n          \"],[11,\"td\",[]],[15,\"class\",\"plugin-name\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"plugin\",\"url\"]]],null,{\"statements\":[[0,\"              \"],[11,\"a\",[]],[16,\"href\",[28,[\"plugin\",\"url\"]],null],[15,\"target\",\"_blank\"],[13],[1,[28,[\"plugin\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[1,[28,[\"plugin\",\"name\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"version\"],[13],[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.plugins.version\"],null],false],[14],[0,\"\\n\"],[1,[28,[\"plugin\",\"version\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col-enabled\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.plugins.enabled\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"plugin\",\"enabled_setting\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"plugin\",\"enabled\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"i18n\"],[\"admin.plugins.is_enabled\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[1,[33,[\"i18n\"],[\"admin.plugins.not_enabled\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"              \"],[1,[33,[\"i18n\"],[\"admin.plugins.is_enabled\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"settings\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"plugin\",\"enabled_setting\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"label\"],[\"btn-default\",\"showSettings\",[28,[\"plugin\"]],\"gear\",\"admin.plugins.change_settings_short\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"plugin\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.plugins.none_installed\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[11,\"p\",[]],[15,\"class\",\"admin-plugins-howto\"],[13],[11,\"a\",[]],[15,\"href\",\"https://meta.discourse.org/t/install-a-plugin/19157\"],[13],[1,[33,[\"i18n\"],[\"admin.plugins.howto\"],null],false],[14],[14],[0,\"\\n\\n\"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"args\"],[\"admin-below-plugins-index\",[33,[\"hash\"],null,[[\"model\"],[[28,[\"model\"]]]]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/plugins-index"}});
Ember.TEMPLATES["admin/templates/plugins"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"toggleMenu\",\"menu-toggle\",\"bars\"]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"d-button\"],null,[[\"label\",\"icon\",\"class\",\"action\"],[\"admin.plugins.change_settings\",\"gear\",\"btn-default settings-button\",\"showSettings\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n  \\n  \"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-nav pull-left\"],[13],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-stacked\"],[13],[0,\"\\n    \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"adminPlugins.index\",\"admin.plugins.title\"]]],false],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"adminRoutes\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[[28,[\"route\",\"full_location\"]],[28,[\"route\",\"label\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"route\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-detail pull-left mobile-closed\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/plugins"}});
Ember.TEMPLATES["admin/templates/reports-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"h3\",[]],[13],[1,[33,[\"i18n\"],[\"admin.reports.title\"],null],false],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[15,\"class\",\"reports-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[15,\"class\",\"report\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminReports.show\",[28,[\"report\",\"type\"]]],null,{\"statements\":[[0,\"        \"],[11,\"h4\",[]],[15,\"class\",\"report-title\"],[13],[1,[28,[\"report\",\"title\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"report\",\"description\"]]],null,{\"statements\":[[0,\"        \"],[11,\"p\",[]],[15,\"class\",\"report-description\"],[13],[0,\"\\n          \"],[1,[28,[\"report\",\"description\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[\"report\"]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/reports-index"}});
Ember.TEMPLATES["admin/templates/reports-show"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[1,[33,[\"admin-report\"],null,[[\"showAllReportsLink\",\"dataSourceName\",\"filters\",\"reportOptions\",\"showFilteringUI\",\"onRefresh\"],[true,[28,[\"model\",\"type\"]],[28,[\"filters\"]],[28,[\"reportOptions\"]],true,[33,[\"action\"],[[28,[null]],\"onParamsChange\"],null]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/reports-show"}});
Ember.TEMPLATES["admin/templates/search-logs-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"admin-title\"],[13],[0,\"\\n  \"],[1,[33,[\"period-chooser\"],null,[[\"period\"],[[28,[\"period\"]]]]],false],[0,\"\\n  \"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\",\"class\"],[[28,[\"searchTypeOptions\"]],[28,[\"searchType\"]],\"search-logs-filter\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"table\",[]],[15,\"class\",\"search-logs-list grid\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading term\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.search_logs.term\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.search_logs.searches\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.search_logs.click_through\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"col heading\"],[16,\"title\",[34,[[33,[\"i18n\"],[\"admin.logs.search_logs.unique_title\"],null]]]],[13],[1,[33,[\"i18n\"],[\"admin.logs.search_logs.unique\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[15,\"class\",\"admin-list-item\"],[13],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col term\"],[13],[0,\"\\n            \"],[6,[\"link-to\"],[\"adminSearchLogs.term\",[28,[\"item\",\"term\"]]],null,{\"statements\":[[1,[28,[\"item\",\"term\"]],false]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.search_logs.searches\"],null],false],[14],[1,[28,[\"item\",\"searches\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.search_logs.click_through\"],null],false],[14],[1,[28,[\"item\",\"click_through\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"col\"],[13],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.logs.search_logs.unique_searches\"],null],false],[14],[1,[28,[\"item\",\"unique_searches\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"i18n\"],[\"search.no_results\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/search-logs-index"}});
Ember.TEMPLATES["admin/templates/search-logs-term"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  \"],[1,[33,[\"period-chooser\"],null,[[\"period\"],[[28,[\"period\"]]]]],false],[0,\"\\n  \"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\",\"class\"],[[28,[\"searchTypeOptions\"]],[28,[\"searchType\"]],\"search-logs-filter\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[13],[0,\"\\n  \"],[6,[\"link-to\"],[\"full-page-search\",[33,[\"query-params\"],null,[[\"q\"],[[28,[\"term\"]]]]]],null,{\"statements\":[[1,[26,[\"term\"]],false]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"refreshing\"]]]],{\"statements\":[[0,\"  \"],[1,[33,[\"admin-graph\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n\\n  \"],[11,\"br\",[]],[13],[14],[11,\"br\",[]],[13],[14],[0,\"\\n  \"],[11,\"h2\",[]],[13],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.logs.search_logs.header_search_results\"],null],false],[0,\" \"],[14],[0,\"\\n  \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"header-search-results\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"search_result\",\"posts\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"fps-result\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"author\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[16,\"href\",[28,[\"result\",\"userPath\"]],null],[16,\"data-user-card\",[34,[[33,[\"unbound\"],[[28,[\"result\",\"username\"]]],null]]]],[13],[0,\"\\n          \"],[1,[33,[\"avatar\"],[[28,[\"result\"]]],[[\"imageSize\"],[\"large\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"fps-topic\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"topic\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"class\",\"search-link\"],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"result\",\"url\"]]],null]]]],[13],[0,\"\\n            \"],[1,[33,[\"topic-status\"],null,[[\"topic\",\"disableActions\"],[[28,[\"result\",\"topic\"]],true]]],false],[11,\"span\",[]],[15,\"class\",\"topic-title\"],[13],[6,[\"highlight-text\"],null,[[\"highlight\"],[[28,[\"term\"]]]],{\"statements\":[[1,[33,[\"unbound\"],[[28,[\"result\",\"topic\",\"fancyTitle\"]]],null],true]],\"locals\":[]},null],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n          \"],[11,\"div\",[]],[15,\"class\",\"search-category\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"result\",\"topic\",\"category\",\"parentCategory\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"category-link\"],[[28,[\"result\",\"topic\",\"category\",\"parentCategory\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[1,[33,[\"category-link\"],[[28,[\"result\",\"topic\",\"category\"]]],[[\"hideParent\"],[true]]],false],[0,\"\\n\"],[6,[\"each\"],[[28,[\"result\",\"topic\",\"tags\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"discourse-tag\"],[[28,[\"tag\"]]],null],false],[0,\"\\n\"]],\"locals\":[\"tag\"]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"blurb container\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"date\"],[13],[0,\"\\n            \"],[1,[33,[\"format-age\"],[[28,[\"result\",\"created_at\"]]],null],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"result\",\"blurb\"]]],null,{\"statements\":[[0,\"              -\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"result\",\"blurb\"]]],null,{\"statements\":[[6,[\"highlight-text\"],null,[[\"highlight\"],[[28,[\"term\"]]]],{\"statements\":[[0,\"              \"],[1,[33,[\"unbound\"],[[28,[\"result\",\"blurb\"]]],null],true],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"result\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/search-logs-term"}});
Ember.TEMPLATES["admin/templates/site-settings-category"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"filteredContent\"]]],null,{\"statements\":[[6,[\"d-section\"],null,[[\"class\"],[\"form-horizontal settings\"]],{\"statements\":[[6,[\"each\"],[[28,[\"filteredContent\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"site-setting\"],null,[[\"setting\"],[[28,[\"setting\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"setting\"]},null],[6,[\"if\"],[[28,[\"category\",\"hasMore\"]]],null,{\"statements\":[[0,\"      \"],[11,\"p\",[]],[15,\"class\",\"warning\"],[13],[1,[33,[\"i18n\"],[\"admin.site_settings.more_than_30_results\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"br\",[]],[13],[14],[0,\"\\n  \"],[1,[33,[\"i18n\"],[\"admin.site_settings.no_results\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/site-settings-category"}});
Ember.TEMPLATES["admin/templates/site-settings"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"toggleMenu\",\"menu-toggle\",\"bars\"]]],false],[0,\"\\n    \"],[1,[33,[\"text-field\"],null,[[\"id\",\"value\",\"placeholderKey\",\"class\"],[\"setting-filter\",[28,[\"filter\"]],\"type_to_filter\",\"no-blur\"]]],false],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"class\",\"id\",\"action\",\"label\"],[\"btn-default\",\"clear-filter\",\"clearFilter\",\"admin.site_settings.clear_filter\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"search controls\"],[13],[0,\"\\n    \"],[11,\"label\",[]],[13],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"onlyOverridden\"]]]]],false],[0,\"\\n      \"],[1,[33,[\"i18n\"],[\"admin.settings.show_overriden\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-nav pull-left\"],[13],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-stacked\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[16,\"class\",[34,[[28,[\"category\",\"nameKey\"]]]]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminSiteSettingsCategory\",[28,[\"category\",\"nameKey\"]]],[[\"class\"],[[28,[\"category\",\"nameKey\"]]]],{\"statements\":[[0,\"          \"],[1,[28,[\"category\",\"name\"]],false],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"category\",\"count\"]]],null,{\"statements\":[[11,\"span\",[]],[15,\"class\",\"count\"],[13],[0,\"(\"],[1,[28,[\"category\",\"count\"]],false],[0,\")\"],[14]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"category\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-detail pull-left mobile-closed\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/site-settings"}});
Ember.TEMPLATES["admin/templates/site-text-edit"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"edit-site-text\"],[13],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n    \"],[11,\"h3\",[]],[13],[1,[28,[\"siteText\",\"id\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"expanding-text-area\"],null,[[\"value\",\"rows\",\"class\"],[[28,[\"buffered\",\"value\"]],\"1\",\"site-text-value\"]]],false],[0,\"\\n\\n\"],[6,[\"save-controls\"],null,[[\"model\",\"action\",\"saved\"],[[28,[\"siteText\"]],\"saveChanges\",[28,[\"saved\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"siteText\",\"can_revert\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"label\",\"class\"],[\"revertChanges\",\"admin.site_text.revert\",\"revert-site-text\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"link-to\"],[\"adminSiteText.index\"],[[\"class\"],[\"go-back\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"d-icon\"],[\"arrow-left\"],null],false],[0,\"\\n    \"],[1,[33,[\"i18n\"],[\"admin.site_text.go_back\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/site-text-edit"}});
Ember.TEMPLATES["admin/templates/site-text-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"search-area\"],[13],[0,\"\\n  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.site_text.description\"],null],false],[14],[0,\"\\n\\n  \"],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\",\"class\",\"autofocus\",\"key-up\"],[[28,[\"q\"]],\"admin.site_text.search\",\"no-blur site-text-search\",\"true\",\"search\"]]],false],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"extra-options\"],[13],[0,\"\\n    \"],[1,[33,[\"d-checkbox\"],null,[[\"label\",\"checked\",\"change\"],[\"admin.site_text.show_overriden\",[28,[\"overridden\"]],\"search\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"searching\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"siteTexts\",\"extras\",\"recommended\"]]],null,{\"statements\":[[0,\"    \"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[1,[33,[\"i18n\"],[\"admin.site_text.recommended\"],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"each\"],[[28,[\"siteTexts\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"site-text-summary\"],null,[[\"siteText\",\"editAction\",\"term\"],[[28,[\"siteText\"]],\"edit\",[28,[\"q\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"siteText\"]},null]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/site-text-index"}});
Ember.TEMPLATES["admin/templates/site-text"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"row site-texts\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/site-text"}});
Ember.TEMPLATES["admin/templates/user-badges"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n  \"],[11,\"nav\",[]],[13],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-pills\"],[13],[0,\"\\n      \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"adminUser\",[28,[\"user\"]]],null,{\"statements\":[[1,[33,[\"d-icon\"],[\"caret-left\"],null],false],[0,\"  \"],[1,[28,[\"user\",\"username\"]],false]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"loading\"]]]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"admin-container user-badges\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.grant_badge\"],null],false],[14],[0,\"\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"noGrantableBadges\"]]],null,{\"statements\":[[0,\"      \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.no_badges\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"form\",[]],[15,\"class\",\"form-horizontal\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.badge\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"combo-box\"],null,[[\"filterable\",\"value\",\"content\"],[true,[28,[\"selectedBadgeId\"]],[28,[\"grantableBadges\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.reason\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"value\"],[\"text\",[28,[\"badgeReason\"]]]]],false],[11,\"br\",[]],[13],[14],[11,\"small\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.reason_help\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"btn btn-primary\"],[5,[\"action\"],[[28,[null]],\"grantBadge\"]],[13],[1,[33,[\"i18n\"],[\"admin.badges.grant\"],null],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n    \"],[11,\"table\",[]],[15,\"id\",\"user-badges\"],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.badge\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.granted_by\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"reason\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.reason\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.granted_at\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"groupedBadges\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"td\",[]],[13],[1,[33,[\"user-badge\"],null,[[\"badge\",\"count\"],[[28,[\"userBadge\",\"badge\"]],[28,[\"userBadge\",\"count\"]]]]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminUser\",[28,[\"userBadge\",\"badge\",\"granted_by\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"avatar\"],[[28,[\"userBadge\",\"granted_by\"]]],[[\"imageSize\"],[\"tiny\"]]],false],[0,\"\\n              \"],[1,[28,[\"userBadge\",\"granted_by\",\"username\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"reason\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"userBadge\",\"postUrl\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"userBadge\",\"postUrl\"]]],null]]]],[13],[1,[28,[\"userBadge\",\"topic_title\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[1,[33,[\"age-with-tooltip\"],[[28,[\"userBadge\",\"granted_at\"]]],null],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"userBadge\",\"grouped\"]]],null,{\"statements\":[[0,\"              \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"expandGroup\",[28,[\"userBadge\"]]]],[13],[1,[33,[\"i18n\"],[\"admin.badges.expand\"],null],true],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"button\",[]],[15,\"class\",\"btn btn-danger\"],[5,[\"action\"],[[28,[null]],\"revokeBadge\",[28,[\"userBadge\"]]]],[13],[1,[33,[\"i18n\"],[\"admin.badges.revoke\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"userBadge\"]},{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"td\",[]],[15,\"colspan\",\"5\"],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.badges.no_user_badges\"],[[\"name\"],[[28,[\"user\",\"username\"]]]]],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/user-badges"}});
Ember.TEMPLATES["admin/templates/user-fields"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"user-fields\"],[13],[0,\"\\n  \"],[11,\"h2\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user_fields.title\"],null],false],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[15,\"class\",\"desc\"],[13],[1,[33,[\"i18n\"],[\"admin.user_fields.help\"],null],false],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"sortedFields\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"admin-user-field-item\"],null,[[\"userField\",\"fieldTypes\",\"firstField\",\"lastField\",\"destroyAction\",\"moveUpAction\",\"moveDownAction\"],[[28,[\"uf\"]],[28,[\"fieldTypes\"]],[28,[\"sortedFields\",\"firstObject\"]],[28,[\"sortedFields\",\"lastObject\"]],\"destroy\",\"moveUp\",\"moveDown\"]]],false],[0,\"\\n\"]],\"locals\":[\"uf\"]},null]],\"locals\":[]},null],[0,\"\\n  \"],[1,[33,[\"d-button\"],null,[[\"disabled\",\"class\",\"action\",\"label\",\"icon\"],[[28,[\"createDisabled\"]],\"btn-primary\",\"createField\",\"admin.user_fields.create\",\"plus\"]]],false],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/user-fields"}});
Ember.TEMPLATES["admin/templates/user-index"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"section\",[]],[16,\"class\",[34,[\"details \",[33,[\"unless\"],[[28,[\"model\",\"active\"]],\"not-activated\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"user-controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"canViewProfile\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"user\",[28,[\"model\"]]],[[\"class\"],[\"btn btn-default\"]],{\"statements\":[[0,\"        \"],[1,[33,[\"d-icon\"],[\"user\"],null],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.user.show_public_profile\"],null],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"can_view_action_logs\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"actionParam\",\"icon\",\"label\"],[\"viewActionLogs\",\"btn-default\",[28,[\"model\",\"username\"]],\"list-alt\",\"admin.user.action_logs\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"active\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"logOut\",\"power-off\",\"admin.user.log_out\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"    \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"args\",\"tagName\",\"connectorTagName\"],[\"admin-user-controls-after\",[33,[\"hash\"],null,[[\"model\"],[[28,[\"model\"]]]]],\"\",\"\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row username\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.username.title\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"editingUsername\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"text-field\"],null,[[\"value\",\"autofocus\"],[[28,[\"userUsernameValue\"]],\"autofocus\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"span\",[]],[5,[\"action\"],[[28,[null]],\"toggleUsernameEdit\"]],[13],[1,[28,[\"model\",\"username\"]],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"editingUsername\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\"],[\"btn-default\",\"saveUsername\",\"admin.user_fields.save\"]]],false],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"toggleUsernameEdit\"]],[13],[1,[33,[\"i18n\"],[\"cancel\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\"],[\"btn-default\",\"toggleUsernameEdit\",\"pencil\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.name.title\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"editingName\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"text-field\"],null,[[\"value\",\"autofocus\"],[[28,[\"userNameValue\"]],\"autofocus\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"span\",[]],[5,[\"action\"],[[28,[null]],\"toggleNameEdit\"]],[13],[1,[28,[\"model\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"editingName\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\"],[\"btn-default\",\"saveName\",\"admin.user_fields.save\"]]],false],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"toggleNameEdit\"]],[13],[1,[33,[\"i18n\"],[\"cancel\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\"],[\"btn-default\",\"toggleNameEdit\",\"pencil\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"args\",\"tagName\",\"connectorTagName\"],[\"admin-user-below-names\",[33,[\"hash\"],null,[[\"user\"],[[28,[\"model\"]]]]],\"\",\"\"]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"canCheckEmails\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row email\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.email.primary\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"active\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[1,[33,[\"i18n\"],[\"admin.users.not_verified\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"email\"]]],null,{\"statements\":[[0,\"          \"],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"model\",\"email\"]]],null]]]],[13],[1,[28,[\"model\",\"email\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"label\",\"title\"],[\"btn-default\",\"checkEmail\",[28,[\"model\"]],\"envelope-o\",\"admin.users.check_email.text\",\"admin.users.check_email.title\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"display-row secondary-emails\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.email.secondary\"],null],false],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"email\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"secondary_emails\"]]],null,{\"statements\":[[0,\"            \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"secondary_emails\"]]],null,{\"statements\":[[0,\"                \"],[11,\"li\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"mailto:\",[33,[\"unbound\"],[[28,[\"email\"]]],null]]]],[13],[1,[28,[\"email\"]],false],[14],[14],[0,\"\\n\"]],\"locals\":[\"email\"]},null],[0,\"            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[1,[33,[\"i18n\"],[\"user.email.no_secondary\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"actionParam\",\"icon\",\"label\",\"title\"],[\"checkEmail\",\"btn-default\",[28,[\"model\"]],\"envelope-o\",\"admin.users.check_email.text\",\"admin.users.check_email.title\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"display-row bounce-score\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"model\",\"bounceLink\"]]]]],[13],[1,[33,[\"i18n\"],[\"admin.user.bounce_score\"],null],false],[14],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"bounceScore\"]],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"canResetBounceScore\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\",\"title\"],[\"btn-default\",\"resetBounceScore\",\"admin.user.reset_bounce_score.label\",\"admin.user.reset_bounce_score.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[1,[28,[\"model\",\"bounceScoreExplanation\"]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"display-row associations\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.associated_accounts.title\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"associatedAccountsLoaded\"]]],null,{\"statements\":[[0,\"          \"],[1,[26,[\"associatedAccounts\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\",\"label\",\"title\"],[\"btn-default\",\"checkEmail\",[28,[\"model\"]],\"envelope-o\",\"admin.users.check_email.text\",\"admin.users.check_email.title\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.avatar.title\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"avatar\"],[[28,[\"content\"]]],[[\"imageSize\"],[\"large\"]]],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n      \"],[1,[33,[\"i18n\"],[\"admin.user.visit_profile\"],[[\"url\"],[[28,[\"preferencesPath\"]]]]],true],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.title.title\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"editingTitle\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"text-field\"],null,[[\"value\",\"autofocus\"],[[28,[\"userTitleValue\"]],\"autofocus\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"span\",[]],[5,[\"action\"],[[28,[null]],\"toggleTitleEdit\"]],[13],[1,[28,[\"model\",\"title\"]],false],[0,\" \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"editingTitle\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\"],[\"btn-default\",\"saveTitle\",\"admin.user_fields.save\"]]],false],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"\"],[5,[\"action\"],[[28,[null]],\"toggleTitleEdit\"]],[13],[1,[33,[\"i18n\"],[\"cancel\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\"],[\"btn-default\",\"toggleTitleEdit\",\"pencil\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row last-ip\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.ip_address.title\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"ip_address\"]],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"staff\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\"],[\"btn-default\",\"refreshBrowsers\",\"admin.user.refresh_browsers\"]]],false],[0,\"\\n        \"],[1,[33,[\"ip-lookup\"],null,[[\"ip\",\"userId\"],[[28,[\"model\",\"ip_address\"]],[28,[\"model\",\"id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row registration-ip\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.registration_ip_address.title\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"registration_ip_address\"]],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"staff\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"ip-lookup\"],null,[[\"ip\",\"userId\"],[[28,[\"model\",\"registration_ip_address\"]],[28,[\"model\",\"id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showBadges\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.badges.title\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"badges.badge_count\"],[[\"count\"],[[28,[\"model\",\"badge_count\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"adminUser.badges\",[28,[\"model\"]]],[[\"class\"],[\"btn\"]],{\"statements\":[[1,[33,[\"d-icon\"],[\"certificate\"],null],false],[1,[33,[\"i18n\"],[\"admin.badges.edit_badges\"],null],false]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.second_factor.title\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"second_factor_enabled\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"i18n\"],[\"yes_value\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"i18n\"],[\"no_value\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"canDisableSecondFactor\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"disableSecondFactor\",\"unlock-alt\",\"user.second_factor.disable\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"userFields\"]]],null,{\"statements\":[[0,\"  \"],[11,\"section\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"userFields\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[28,[\"uf\",\"name\"]],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"uf\",\"value\"]]],null,{\"statements\":[[0,\"            \"],[1,[28,[\"uf\",\"value\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            —\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"uf\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"args\"],[\"admin-user-details\",[33,[\"hash\"],null,[[\"model\"],[[28,[\"model\"]]]]]]]],false],[0,\"\\n\\n\"],[11,\"section\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.permissions\"],null],false],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showApproval\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.users.approved\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"approved\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"i18n\"],[\"admin.user.approved_by\"],null],false],[0,\"\\n          \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"model\",\"approvedBy\"]]],null,{\"statements\":[[1,[33,[\"avatar\"],[[28,[\"model\",\"approvedBy\"]]],[[\"imageSize\"],[\"small\"]]],false]],\"locals\":[]},null],[0,\"\\n          \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"model\",\"approvedBy\"]]],null,{\"statements\":[[1,[28,[\"model\",\"approvedBy\",\"username\"]],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"i18n\"],[\"no_value\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"approved\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"i18n\"],[\"admin.user.approve_success\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"can_approve\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"approve\",\"check\",\"admin.user.approve\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.users.active\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"i18n-yes-no\"],[[28,[\"model\",\"active\"]]],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"active\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"can_deactivate\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\"],[\"btn-default\",\"deactivate\",\"admin.user.deactivate_account\"]]],false],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.user.deactivate_explanation\"],null],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"can_send_activation_email\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"sendActivationEmail\",\"envelope\",\"admin.user.send_activation_email\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"can_activate\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"activate\",\"check\",\"admin.user.activate\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.staged\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"i18n-yes-no\"],[[28,[\"model\",\"staged\"]]],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[1,[33,[\"i18n\"],[\"admin.user.staged_explanation\"],null],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.api.key\"],null],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"api_key\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"long-value\"],[13],[0,\"\\n          \"],[1,[28,[\"model\",\"api_key\",\"key\"]],false],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"regenerateApiKey\",\"undo\",\"admin.api.regenerate\"]]],false],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"revokeApiKey\",\"times\",\"admin.api.revoke\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n          —\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"generateApiKey\",\"key\",\"admin.api.generate\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.admin\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"i18n-yes-no\"],[[28,[\"model\",\"admin\"]]],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"can_revoke_admin\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"revokeAdmin\",\"shield\",\"admin.user.revoke_admin\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"can_grant_admin\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"grantAdmin\",\"shield\",\"admin.user.grant_admin\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.moderator\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"i18n-yes-no\"],[[28,[\"model\",\"moderator\"]]],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"can_revoke_moderation\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"revokeModeration\",\"shield\",\"admin.user.revoke_moderation\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"can_grant_moderation\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-default\",\"grantModeration\",\"shield\",\"admin.user.grant_moderation\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"trust_level\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n      \"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\",\"nameProperty\"],[[28,[\"site\",\"trustLevels\"]],[28,[\"model\",\"trust_level\"]],\"detailedName\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"dirty\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\"],[\"ok no-text\",\"saveTrustLevel\",\"check\"]]],false],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\"],[\"cancel no-text\",\"restoreTrustLevel\",\"times\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"canLockTrustLevel\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"hasLockedTrustLevel\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"lock\"],[[\"title\"],[\"admin.user.trust_level_locked_tip\"]]],false],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"label\"],[\"btn-default\",\"lockTrustLevel\",false,\"admin.user.unlock_trust_level\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"unlock\"],[[\"title\"],[\"admin.user.trust_level_unlocked_tip\"]]],false],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"label\"],[\"btn-default\",\"lockTrustLevel\",true,\"admin.user.lock_trust_level\"]]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"tl3Requirements\"]]],null,{\"statements\":[[0,\"        \"],[6,[\"link-to\"],[\"adminUser.tl3Requirements\",[28,[\"model\"]]],[[\"class\"],[\"btn btn-default\"]],{\"statements\":[[1,[33,[\"i18n\"],[\"admin.user.trust_level_3_requirements\"],null],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"user-suspended display-row \",[33,[\"if\"],[[28,[\"model\",\"suspended\"]],\"highlight-danger\"],null]]]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.suspended\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n      \"],[1,[33,[\"i18n-yes-no\"],[[28,[\"model\",\"suspended\"]]],null],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"suspended\"]]],null,{\"statements\":[[6,[\"unless\"],[[28,[\"model\",\"suspendedForever\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"i18n\"],[\"admin.user.suspended_until\"],[[\"until\"],[[28,[\"model\",\"suspendedTillDate\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"suspended\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-danger unsuspend-user\",[33,[\"action\"],[[28,[null]],\"unsuspend\"],null],\"ban\",\"admin.user.unsuspend\"]]],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.user.suspended_explanation\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"canSuspend\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-danger suspend-user\",[33,[\"action\"],[[28,[null]],\"showSuspendModal\"],null],\"ban\",\"admin.user.suspend\"]]],false],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.user.suspended_explanation\"],null],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"suspended\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row highlight-danger suspension-info\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.suspended_by\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"model\",\"suspendedBy\"]]],null,{\"statements\":[[1,[33,[\"avatar\"],[[28,[\"model\",\"suspendedBy\"]]],[[\"imageSize\"],[\"tiny\"]]],false]],\"locals\":[]},null],[0,\"\\n        \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"model\",\"suspendedBy\"]]],null,{\"statements\":[[1,[28,[\"model\",\"suspendedBy\",\"username\"]],false]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n        \"],[11,\"b\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.suspend_reason\"],null],false],[14],[0,\":\\n        \"],[11,\"div\",[]],[15,\"class\",\"full-reason\"],[13],[1,[28,[\"model\",\"full_suspend_reason\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"display-row \",[33,[\"if\"],[[28,[\"model\",\"silenced\"]],\"highlight-danger\"],null]]]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.silenced\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n      \"],[1,[33,[\"i18n-yes-no\"],[[28,[\"model\",\"silenced\"]]],null],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"silenced\"]]],null,{\"statements\":[[6,[\"unless\"],[[28,[\"model\",\"silencedForever\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"i18n\"],[\"admin.user.suspended_until\"],[[\"until\"],[[28,[\"model\",\"silencedTillDate\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"size\",\"condition\"],[\"small\",[28,[\"model\",\"silencingUser\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"silenced\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-danger unsilence-user\",\"unsilence\",\"microphone-slash\",\"admin.user.unsilence\"]]],false],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.user.silence_explanation\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-danger silence-user\",[33,[\"action\"],[[28,[null]],\"showSilenceModal\"],null],\"microphone-slash\",\"admin.user.silence\"]]],false],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.user.silence_explanation\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"silenced\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row highlight-danger silence-info\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.silenced_by\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"model\",\"silencedBy\"]]],null,{\"statements\":[[1,[33,[\"avatar\"],[[28,[\"model\",\"silencedBy\"]]],[[\"imageSize\"],[\"tiny\"]]],false]],\"locals\":[]},null],[0,\"\\n        \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"model\",\"silencedBy\"]]],null,{\"statements\":[[1,[28,[\"model\",\"silencedBy\",\"username\"]],false]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n        \"],[11,\"b\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.silence_reason\"],null],false],[14],[0,\":\\n        \"],[11,\"div\",[]],[15,\"class\",\"full-reason\"],[13],[1,[28,[\"model\",\"silence_reason\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"tl3_requirements\",\"penalty_counts\",\"total\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row clear-penalty-history\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.penalty_count\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"tl3_requirements\",\"penalty_counts\",\"total\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n          \"],[1,[33,[\"d-button\"],null,[[\"label\",\"class\",\"icon\",\"action\"],[\"admin.user.clear_penalty_history.title\",\"btn-default\",\"times\",[33,[\"action\"],[[28,[null]],\"clearPenaltyHistory\"],null]]]],false],[0,\"\\n          \"],[1,[33,[\"i18n\"],[\"admin.user.clear_penalty_history.description\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"  \"],[11,\"section\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[1,[33,[\"i18n\"],[\"admin.groups.title\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.groups.automatic\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[26,[\"automaticGroups\"]],true],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.groups.custom\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n          \"],[1,[33,[\"admin-group-selector\"],null,[[\"selected\",\"available\",\"buffer\"],[[28,[\"model\",\"customGroups\"]],[28,[\"availableGroups\"]],[28,[\"customGroupIdsBuffer\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"customGroupsDirty\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n            \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"class\",\"action\"],[\"check\",\"ok\",\"saveCustomGroups\"]]],false],[0,\"\\n            \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"class\",\"action\"],[\"times\",\"cancel\",\"resetCustomGroups\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"customGroups\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.groups.primary\"],null],false],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n            \"],[1,[33,[\"combo-box\"],null,[[\"content\",\"value\",\"none\"],[[28,[\"model\",\"customGroups\"]],[28,[\"model\",\"primary_group_id\"]],\"admin.groups.no_primary\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"primaryGroupDirty\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n              \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"class\",\"action\"],[\"check\",\"ok\",\"savePrimaryGroup\"]]],false],[0,\"\\n              \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"class\",\"action\"],[\"times\",\"cancel\",\"resetPrimaryGroup\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"section\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.activity\"],null],false],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"created\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"format-date\"],[[28,[\"model\",\"created_at\"]]],[[\"leaveAgo\"],[\"true\"]]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.users.last_emailed\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"format-date\"],[[28,[\"model\",\"last_emailed_at\"]]],null],false],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"last_seen\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"format-date\"],[[28,[\"model\",\"last_seen_at\"]]],[[\"leaveAgo\"],[\"true\"]]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.like_count\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"like_given_count\"]],false],[0,\" / \"],[1,[28,[\"model\",\"like_count\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.topics_entered\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"topics_entered\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.post_count\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"post_count\"]],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"can_delete_all_posts\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"post_count\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-danger\",\"deleteAllPosts\",\"trash-o\",\"admin.user.delete_all_posts\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[26,[\"deleteAllPostsExplanation\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.posts_read_count\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"posts_read_count\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.warnings_received_count\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"warnings_received_count\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.flags_given_received_count\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[0,\"\\n      \"],[1,[28,[\"model\",\"flags_given_count\"]],false],[0,\" / \"],[1,[28,[\"model\",\"flags_received_count\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"flags_received_count\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"label\",\"icon\"],[\"btn-default\",[33,[\"action\"],[[28,[null]],\"showFlagsReceived\"],null],\"admin.user.show_flags_received\",\"flag\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.private_topics_count\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"private_topics_count\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.time_read\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[33,[\"format-duration\"],[[28,[\"model\",\"time_read\"]]],null],true],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"user.invited.days_visited\"],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"model\",\"days_visited\"]],true],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"single_sign_on_record\"]]],null,{\"statements\":[[11,\"section\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.sso.title\"],null],false],[14],[0,\"\\n\\n\"],[6,[\"with\"],[[28,[\"model\",\"single_sign_on_record\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.sso.external_id\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"sso\",\"external_id\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.sso.external_username\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"sso\",\"external_username\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.sso.external_name\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"sso\",\"external_name\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"sso\",\"external_email\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.sso.external_email\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"sso\",\"external_email\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"display-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[1,[33,[\"i18n\"],[\"admin.user.sso.external_avatar_url\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"value\"],[13],[1,[28,[\"sso\",\"external_avatar_url\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"sso\"]},null],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"args\"],[\"after-user-details\",[33,[\"hash\"],null,[[\"model\"],[[28,[\"model\"]]]]]]]],false],[0,\"\\n\\n\"],[11,\"section\",[]],[13],[0,\"\\n  \"],[11,\"hr\",[]],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"pull-right\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"active\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"can_impersonate\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"icon\",\"label\",\"title\"],[\"btn-danger\",\"impersonate\",\"crosshairs\",\"admin.impersonate.title\",\"admin.impersonate.help\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"can_be_anonymized\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"d-button\"],null,[[\"label\",\"icon\",\"class\",\"action\"],[\"admin.user.anonymize\",\"exclamation-triangle\",\"btn-danger\",\"anonymize\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"canBeDeleted\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"d-button\"],null,[[\"label\",\"icon\",\"class\",\"action\"],[\"admin.user.delete\",\"exclamation-triangle\",\"btn-danger\",\"destroy\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"deleteExplanation\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"pull-right\"],[13],[0,\"\\n      \"],[1,[33,[\"d-icon\"],[\"exclamation-triangle\"],null],false],[0,\" \"],[1,[26,[\"deleteExplanation\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/user-index"}});
Ember.TEMPLATES["admin/templates/user-tl3-requirements"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n  \"],[11,\"nav\",[]],[13],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-pills\"],[13],[0,\"\\n      \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"adminUser\",[28,[\"model\"]]],null,{\"statements\":[[1,[33,[\"d-icon\"],[\"caret-left\"],null],false],[0,\"  \"],[1,[28,[\"model\",\"username\"]],false]],\"locals\":[]},null],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"adminUsersList.show\",\"member\"],null,{\"statements\":[[1,[33,[\"i18n\"],[\"admin.user.trust_level_2_users\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-container tl3-requirements\"],[13],[0,\"\\n  \"],[11,\"h2\",[]],[13],[1,[28,[\"model\",\"username\"]],false],[0,\" - \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.title\"],null],false],[14],[0,\"\\n  \"],[11,\"br\",[]],[13],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.table_title\"],[[\"count\"],[[28,[\"model\",\"tl3Requirements\",\"time_period\"]]]]],false],[14],[0,\"\\n\\n  \"],[11,\"table\",[]],[15,\"class\",\"table\"],[15,\"style\",\"width: auto;\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.value_heading\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.requirement_heading\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tbody\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.visits\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"days_visited\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n          \"],[1,[28,[\"model\",\"tl3Requirements\",\"days_visited_percent\"]],false],[0,\"% (\"],[1,[28,[\"model\",\"tl3Requirements\",\"days_visited\"]],false],[0,\" / \"],[1,[28,[\"model\",\"tl3Requirements\",\"time_period\"]],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.days\"],null],false],[0,\")\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_days_visited_percent\"]],false],[0,\"%\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.topics_replied_to\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"topics_replied_to\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"num_topics_replied_to\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_topics_replied_to\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.topics_viewed\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"topics_viewed\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"topics_viewed\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_topics_viewed\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.topics_viewed_all_time\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"topics_viewed_all_time\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"topics_viewed_all_time\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_topics_viewed_all_time\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.posts_read\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"posts_read\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"posts_read\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_posts_read\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.posts_read_all_time\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"posts_read_all_time\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"posts_read_all_time\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_posts_read_all_time\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.flagged_posts\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"flagged_posts\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"num_flagged_posts\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"max_of_count\"],[[\"count\"],[[28,[\"model\",\"tl3Requirements\",\"max_flagged_posts\"]]]]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.flagged_by_users\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"flagged_by_users\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"num_flagged_by_users\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"i18n\"],[\"max_of_count\"],[[\"count\"],[[28,[\"model\",\"tl3Requirements\",\"max_flagged_by_users\"]]]]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.likes_given\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"likes_given\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"num_likes_given\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_likes_given\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.likes_received\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"likes_received\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"num_likes_received\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_likes_received\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.likes_received_days\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"likes_received_days\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"num_likes_received_days\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_likes_received_days\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.likes_received_users\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"likes_received_users\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"num_likes_received_users\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"min_likes_received_users\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.silenced\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"silenced\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"penalty_counts\",\"silenced\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"0\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.suspended\"],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"check-icon\"],[[28,[\"model\",\"tl3Requirements\",\"met\",\"suspended\"]]],null],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"tl3Requirements\",\"penalty_counts\",\"suspended\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"0\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"br\",[]],[13],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"istl3\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"tl3Requirements\",\"requirements_lost\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"tl3Requirements\",\"on_grace_period\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"times\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.on_grace_period\"],null],false],[0,\"\\n        \"]],\"locals\":[]},{\"statements\":[[0,\" \"],[0,\"\\n          \"],[1,[33,[\"d-icon\"],[\"times\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.does_not_qualify\"],null],false],[0,\"\\n                                      \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.will_be_demoted\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"]],\"locals\":[]},{\"statements\":[[0,\" \"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"tl3Requirements\",\"trust_level_locked\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"lock\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.locked_will_not_be_demoted\"],null],false],[0,\"\\n        \"]],\"locals\":[]},{\"statements\":[[0,\" \"],[0,\"\\n          \"],[1,[33,[\"d-icon\"],[\"check\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.qualifies\"],null],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"tl3Requirements\",\"on_grace_period\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.on_grace_period\"],null],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}],[0,\"    \"]],\"locals\":[]},{\"statements\":[[0,\" \"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"tl3Requirements\",\"requirements_met\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"d-icon\"],[\"check\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.qualifies\"],null],false],[0,\"\\n                                    \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.will_be_promoted\"],null],false],[0,\"\\n      \"]],\"locals\":[]},{\"statements\":[[0,\" \"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"tl3Requirements\",\"trust_level_locked\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"lock\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.locked_will_not_be_promoted\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"d-icon\"],[\"times\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.user.tl3_requirements.does_not_qualify\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/user-tl3-requirements"}});
Ember.TEMPLATES["admin/templates/user"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"d-section\"],null,null,{\"statements\":[[0,\"  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/user"}});
Ember.TEMPLATES["admin/templates/users-list-show"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"if\"],[[28,[\"hasSelection\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"id\",\"selected-controls\"],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"approveUsers\"]],[13],[1,[33,[\"count-i18n\"],null,[[\"key\",\"count\"],[\"admin.users.approved_selected\",[28,[\"selectedCount\"]]]]],false],[14],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"btn btn-danger\"],[5,[\"action\"],[[28,[null]],\"rejectUsers\"]],[13],[1,[33,[\"count-i18n\"],null,[[\"key\",\"count\"],[\"admin.users.reject_selected\",[28,[\"selectedCount\"]]]]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-title\"],[13],[0,\"\\n  \"],[11,\"h2\",[]],[13],[1,[26,[\"title\"]],false],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"showEmails\"]]],null,{\"statements\":[[0,\"      \"],[11,\"button\",[]],[15,\"class\",\"show-emails btn btn-default\"],[5,[\"action\"],[[28,[null]],\"showEmails\"]],[13],[1,[33,[\"i18n\"],[\"admin.users.show_emails\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"username controls\"],[13],[0,\"\\n  \"],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholder\"],[[28,[\"listFilter\"]],[28,[\"searchHint\"]]]]],false],[0,\"\\n  \\n\"],[14],[0,\"\\n\\n\"],[6,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"refreshing\"]]]],{\"statements\":[[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[11,\"table\",[]],[15,\"class\",\"table users-list grid\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showApproval\"]]],null,{\"statements\":[[0,\"          \"],[11,\"th\",[]],[13],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"selectAll\"]]]]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"username\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[15,\"class\",\"email-heading\"],[13],[1,[33,[\"i18n\"],[\"email\"],null],false],[14],[0,\"\\n        \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.users.last_emailed\"],null],false],[14],[0,\"\\n        \"],[1,[33,[\"admin-directory-toggle\"],null,[[\"field\",\"i18nKey\",\"order\",\"ascending\"],[\"seen\",\"last_seen\",[28,[\"order\"]],[28,[\"ascending\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"admin-directory-toggle\"],null,[[\"field\",\"i18nKey\",\"order\",\"ascending\"],[\"topics_viewed\",\"admin.user.topics_entered\",[28,[\"order\"]],[28,[\"ascending\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"admin-directory-toggle\"],null,[[\"field\",\"i18nKey\",\"order\",\"ascending\"],[\"posts_read\",\"admin.user.posts_read_count\",[28,[\"order\"]],[28,[\"ascending\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"admin-directory-toggle\"],null,[[\"field\",\"i18nKey\",\"order\",\"ascending\"],[\"read_time\",\"admin.user.time_read\",[28,[\"order\"]],[28,[\"ascending\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"admin-directory-toggle\"],null,[[\"field\",\"i18nKey\",\"order\",\"ascending\"],[\"created\",\"created\",[28,[\"order\"]],[28,[\"ascending\"]]]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showApproval\"]]],null,{\"statements\":[[0,\"          \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.users.approved\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[11,\"th\",[]],[13],[0,\" \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"          \"],[11,\"tr\",[]],[16,\"class\",[34,[\"user \",[28,[\"user\",\"selected\"]],\" \",[33,[\"unless\"],[[28,[\"user\",\"active\"]],\"not-activated\"],null]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showApproval\"]]],null,{\"statements\":[[0,\"            \"],[11,\"td\",[]],[15,\"class\",\"approval\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"user\",\"can_approve\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"user\",\"selected\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[11,\"td\",[]],[15,\"class\",\"username\"],[13],[0,\"\\n              \"],[11,\"a\",[]],[16,\"href\",[34,[[33,[\"unbound\"],[[28,[\"user\",\"path\"]]],null]]]],[16,\"data-user-card\",[34,[[33,[\"unbound\"],[[28,[\"user\",\"username\"]]],null]]]],[13],[0,\"\\n                \"],[1,[33,[\"avatar\"],[[28,[\"user\"]]],[[\"imageSize\"],[\"small\"]]],false],[0,\"\\n              \"],[14],[0,\"\\n              \"],[6,[\"link-to\"],[\"adminUser\",[28,[\"user\"]]],null,{\"statements\":[[1,[33,[\"unbound\"],[[28,[\"user\",\"username\"]]],null],false]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"user\",\"staged\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"d-icon\"],[\"envelope-o\"],[[\"title\"],[\"user.staged\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"email\"],[13],[1,[33,[\"unbound\"],[[28,[\"user\",\"email\"]]],null],false],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"last-emailed\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.users.last_emailed\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[1,[33,[\"format-duration\"],[[28,[\"user\",\"last_emailed_age\"]]],null],true],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"last-seen\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"last_seen\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[1,[33,[\"format-duration\"],[[28,[\"user\",\"last_seen_age\"]]],null],true],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"topics-entered\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.user.topics_entered\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[1,[33,[\"number\"],[[28,[\"user\",\"topics_entered\"]]],null],false],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"posts-read\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.user.posts_read_count\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[1,[33,[\"number\"],[[28,[\"user\",\"posts_read_count\"]]],null],false],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"time-read\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"admin.user.time_read\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[1,[33,[\"format-duration\"],[[28,[\"user\",\"time_read\"]]],null],true],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"td\",[]],[15,\"class\",\"created\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"label\"],[13],[1,[33,[\"i18n\"],[\"created\"],null],false],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[1,[33,[\"format-duration\"],[[28,[\"user\",\"created_at_age\"]]],null],true],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showApproval\"]]],null,{\"statements\":[[0,\"              \"],[11,\"td\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"user\",\"approved\"]]],null,{\"statements\":[[0,\"                  \"],[1,[33,[\"i18n\"],[\"yes_value\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                  \"],[1,[33,[\"i18n\"],[\"no_value\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[11,\"td\",[]],[15,\"class\",\"user-status\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"user\",\"admin\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"d-icon\"],[\"shield\"],[[\"title\"],[\"admin.title\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"user\",\"moderator\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"d-icon\"],[\"shield\"],[[\"title\"],[\"admin.moderator\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"user\",\"second_factor_enabled\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"d-icon\"],[\"lock\"],[[\"title\"],[\"admin.user.second_factor_enabled\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"user\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"search.no_results\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/users-list-show"}});
Ember.TEMPLATES["admin/templates/users-list"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n  \"],[11,\"nav\",[]],[13],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-pills\"],[13],[0,\"\\n      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"routeParam\",\"label\"],[\"adminUsersList.show\",\"active\",\"admin.users.nav.active\"]]],false],[0,\"\\n      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"routeParam\",\"label\"],[\"adminUsersList.show\",\"new\",\"admin.users.nav.new\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"siteSettings\",\"must_approve_users\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"routeParam\",\"label\"],[\"adminUsersList.show\",\"pending\",\"admin.users.nav.pending\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"routeParam\",\"label\"],[\"adminUsersList.show\",\"staff\",\"admin.users.nav.staff\"]]],false],[0,\"\\n      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"routeParam\",\"label\"],[\"adminUsersList.show\",\"suspended\",\"admin.users.nav.suspended\"]]],false],[0,\"\\n      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"routeParam\",\"label\"],[\"adminUsersList.show\",\"silenced\",\"admin.users.nav.silenced\"]]],false],[0,\"\\n      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"routeParam\",\"label\"],[\"adminUsersList.show\",\"suspect\",\"admin.users.nav.suspect\"]]],false],[0,\"\\n      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"routeParam\",\"label\"],[\"adminUsersList.show\",\"staged\",\"admin.users.nav.staged\"]]],false],[0,\"\\n      \"],[1,[33,[\"nav-item\"],null,[[\"route\",\"label\"],[\"groups\",\"groups.index.title\"]]],false],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"admin-actions\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"siteSettings\",\"enable_sso\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"title\",\"icon\",\"label\"],[\"btn-default\",\"sendInvites\",\"admin.invite.button_title\",\"user-plus\",\"admin.invite.button_text\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"currentUser\",\"admin\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"title\",\"icon\",\"label\"],[\"btn-default\",\"exportUsers\",\"admin.export_csv.button_title.user\",\"download\",\"admin.export_csv.button_text\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-container\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/users-list"}});
Ember.TEMPLATES["admin/templates/version-checks"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"section-title\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.version\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"dashboard-stats version-check \",[33,[\"if\"],[[28,[\"versionCheck\",\"critical_updates\"]],\"critical\",\"normal\"],null]]]],[13],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"version-number\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.installed_version\"],null],false],[14],[0,\"\\n        \"],[11,\"h3\",[]],[13],[11,\"a\",[]],[16,\"href\",[28,[\"versionCheck\",\"gitLink\"]],null],[15,\"target\",\"_blank\"],[13],[1,[33,[\"dash-if-empty\"],[[28,[\"versionCheck\",\"installed_describe\"]]],null],false],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"versionCheck\",\"noCheckPerformed\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"version-number\"],[13],[0,\" \\n          \"],[11,\"h4\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.latest_version\"],null],false],[14],[0,\"  \\n          \"],[11,\"h3\",[]],[13],[0,\"—\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"version-status\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"face\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"icon critical-updates-available\"],[13],[1,[33,[\"d-icon\"],[\"frown-o\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"version-notes\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"normal-note\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.no_check_performed\"],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"versionCheck\",\"stale_data\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"version-number\"],[13],[0,\"\\n            \"],[11,\"h4\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.latest_version\"],null],false],[14],[0,\"  \\n            \"],[11,\"h3\",[]],[13],[6,[\"if\"],[[28,[\"versionCheck\",\"version_check_pending\"]]],null,{\"statements\":[[1,[33,[\"dash-if-empty\"],[[28,[\"versionCheck\",\"installed_version\"]]],null],false]],\"locals\":[]},null],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"version-status\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"face\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"versionCheck\",\"version_check_pending\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"icon up-to-date\"],[13],[1,[33,[\"d-icon\"],[\"smile-o\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"icon critical-updates-available\"],[13],[1,[33,[\"d-icon\"],[\"frown-o\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"version-notes\"],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"normal-note\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"versionCheck\",\"version_check_pending\"]]],null,{\"statements\":[[0,\"                  \"],[1,[33,[\"i18n\"],[\"admin.dashboard.version_check_pending\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                  \"],[1,[33,[\"i18n\"],[\"admin.dashboard.stale_data\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"version-number\"],[13],[0,\"\\n            \"],[11,\"h4\",[]],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.latest_version\"],null],false],[14],[0,\"  \\n            \"],[11,\"h3\",[]],[13],[1,[33,[\"dash-if-empty\"],[[28,[\"versionCheck\",\"latest_version\"]]],null],false],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"version-status\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"face\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"versionCheck\",\"upToDate\"]]],null,{\"statements\":[[0,\"              \"],[11,\"span\",[]],[15,\"class\",\"icon up-to-date\"],[13],[1,[33,[\"d-icon\"],[\"smile-o\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"span\",[]],[16,\"class\",[34,[\"icon \",[33,[\"if\"],[[28,[\"versionCheck\",\"critical_updates\"]],\"critical-updates-available\",\"updates-available\"],null]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"versionCheck\",\"behindByOneVersion\"]]],null,{\"statements\":[[0,\"                    \"],[1,[33,[\"d-icon\"],[\"meh-o\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                    \"],[1,[33,[\"d-icon\"],[\"frown-o\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"                \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"version-notes\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"versionCheck\",\"upToDate\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"i18n\"],[\"admin.dashboard.up_to_date\"],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"critical-note\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.critical_available\"],null],false],[14],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"normal-note\"],[13],[1,[33,[\"i18n\"],[\"admin.dashboard.updates_available\"],null],false],[14],[0,\"\\n                \"],[1,[33,[\"i18n\"],[\"admin.dashboard.please_upgrade\"],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n      \"],[1,[33,[\"custom-html\"],null,[[\"name\",\"versionCheck\",\"tagName\",\"classNames\"],[\"upgrade-header\",[28,[\"versionCheck\"]],\"div\",\"upgrade-header\"]]],false],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/version-checks"}});
Ember.TEMPLATES["admin/templates/watched-words-action"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"h2\",[]],[13],[1,[28,[\"model\",\"name\"]],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[15,\"class\",\"about\"],[13],[1,[26,[\"actionDescription\"]],false],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"watched-word-controls\"],[13],[0,\"\\n\"],[1,[33,[\"watched-word-form\"],null,[[\"actionKey\",\"action\",\"filteredContent\",\"regularExpressions\"],[[28,[\"actionNameKey\"]],\"recordAdded\",[28,[\"filteredContent\"]],[28,[\"adminWatchedWords\",\"regularExpressions\"]]]]],false],[0,\"\\n\\n\"],[1,[33,[\"watched-word-uploader\"],null,[[\"uploading\",\"actionKey\",\"done\"],[[28,[\"uploading\"]],[28,[\"actionNameKey\"]],\"uploadComplete\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[13],[0,\"\\n  \"],[11,\"label\",[]],[15,\"class\",\"show-words-checkbox\"],[13],[0,\"\\n    \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\",\"disabled\"],[\"checkbox\",[28,[\"adminWatchedWords\",\"showWords\"]],[28,[\"adminWatchedWords\",\"disableShowWords\"]]]]],false],[0,\"\\n    \"],[1,[33,[\"i18n\"],[\"admin.watched_words.show_words\"],null],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"watched-words-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showWordsList\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"filteredContent\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"watched-word-box\"],[13],[1,[33,[\"admin-watched-word\"],null,[[\"word\",\"action\"],[[28,[\"word\"]],\"recordRemoved\"]]],false],[14],[0,\"\\n\"]],\"locals\":[\"word\"]},null]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"i18n\"],[\"admin.watched_words.word_count\"],[[\"count\"],[[28,[\"wordCount\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/watched-words-action"}});
Ember.TEMPLATES["admin/templates/watched-words"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"admin-controls\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"action\",\"class\",\"icon\"],[\"toggleMenu\",\"menu-toggle\",\"bars\"]]],false],[0,\"\\n    \"],[1,[33,[\"text-field\"],null,[[\"value\",\"placeholderKey\",\"class\"],[[28,[\"filter\"]],\"admin.watched_words.search\",\"no-blur\"]]],false],[0,\"\\n    \"],[1,[33,[\"d-button\"],null,[[\"action\",\"label\"],[\"clearFilter\",\"admin.watched_words.clear_filter\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-nav pull-left\"],[13],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"nav nav-stacked\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[16,\"class\",[34,[[28,[\"action\",\"nameKey\"]]]]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminWatchedWords.action\",[28,[\"action\",\"nameKey\"]]],null,{\"statements\":[[0,\"          \"],[1,[28,[\"action\",\"name\"]],false],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"action\",\"count\"]]],null,{\"statements\":[[11,\"span\",[]],[15,\"class\",\"count\"],[13],[0,\"(\"],[1,[28,[\"action\",\"count\"]],false],[0,\")\"],[14]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"action\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"admin-detail pull-left mobile-closed watched-words-detail\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/watched-words"}});
Ember.TEMPLATES["admin/templates/web-hooks-show-events"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[11,\"div\",[]],[15,\"class\",\"web-hook-direction\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminWebHooks\"],[[\"tagName\",\"classNames\"],[\"button\",\"btn\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"d-icon\"],[\"list\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.go_list\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[1,[33,[\"d-button\"],null,[[\"icon\",\"label\",\"action\",\"disabled\"],[\"send\",\"admin.web_hooks.events.ping\",\"ping\",[28,[\"pingDisabled\"]]]]],false],[0,\"\\n\"],[6,[\"link-to\"],[\"adminWebHooks.show\",[28,[\"model\",\"extras\",\"web_hook_id\"]]],[[\"tagName\",\"classNames\"],[\"button\",\"btn\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"d-icon\"],[\"edit\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.go_details\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"web-hook-events-listing\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[6,[\"load-more\"],null,[[\"selector\",\"action\"],[\".web-hook-events li\",\"loadMore\"]],{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"web-hook-events content-list\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"heading-container\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col heading first status\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.status\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col heading event-id\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.event_id\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col heading timestamp\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.timestamp\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col heading completion\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.completion\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col heading actions\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.actions\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"clearfix\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"hasIncoming\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"alert alert-info clickable\"],[15,\"tabindex\",\"0\"],[5,[\"action\"],[[28,[null]],\"showInserted\"]],[13],[0,\"\\n          \"],[1,[33,[\"count-i18n\"],null,[[\"key\",\"count\"],[\"admin.web_hooks.events.incoming\",[28,[\"incomingCount\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"admin-web-hook-event\"],null,[[\"model\"],[[28,[\"webHookEvent\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"webHookEvent\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"model\",\"loadingMore\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.none\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/web-hooks-show-events"}});
Ember.TEMPLATES["admin/templates/web-hooks-show"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[6,[\"link-to\"],[\"adminWebHooks\"],[[\"class\"],[\"go-back\"]],{\"statements\":[[0,\"  \"],[1,[33,[\"d-icon\"],[\"arrow-left\"],null],false],[0,\"\\n  \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.go_back\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"web-hook-container\"],[13],[0,\"\\n  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.detailed_instruction\"],null],false],[14],[0,\"\\n  \"],[11,\"form\",[]],[15,\"class\",\"web-hook form-horizontal\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"payload-url\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.payload_url\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"text-field\"],null,[[\"name\",\"value\",\"placeholderKey\"],[\"payload-url\",[28,[\"model\",\"payload_url\"]],\"admin.web_hooks.payload_url_placeholder\"]]],false],[0,\"\\n      \"],[1,[33,[\"input-tip\"],null,[[\"validation\"],[[28,[\"urlValidation\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"content-type\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.content_type\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"combo-box\"],null,[[\"content\",\"name\",\"value\"],[[28,[\"contentTypes\"]],\"content-type\",[28,[\"model\",\"content_type\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"secret\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.secret\"],null],false],[14],[0,\"\\n      \"],[1,[33,[\"text-field\"],null,[[\"name\",\"value\",\"placeholderKey\"],[\"secret\",[28,[\"model\",\"secret\"]],\"admin.web_hooks.secret_placeholder\"]]],false],[0,\"\\n      \"],[1,[33,[\"input-tip\"],null,[[\"validation\"],[[28,[\"secretValidation\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"cbox10\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.event_chooser\"],null],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[13],[0,\"\\n        \"],[1,[33,[\"radio-button\"],null,[[\"class\",\"name\",\"value\",\"selection\"],[\"subscription-choice\",\"subscription-choice\",\"individual\",[28,[\"model\",\"webHookType\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.individual_event\"],null],false],[0,\"\\n        \"],[1,[33,[\"input-tip\"],null,[[\"validation\"],[[28,[\"eventTypeValidation\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"wildcard_web_hook\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"event-selector\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"eventTypes\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"admin-web-hook-event-chooser\"],null,[[\"type\",\"model\"],[[28,[\"type\"]],[28,[\"model\",\"web_hook_event_types\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"type\"]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"div\",[]],[13],[0,\"\\n        \"],[1,[33,[\"radio-button\"],null,[[\"class\",\"name\",\"value\",\"selection\"],[\"subscription-choice\",\"subscription-choice\",\"wildcard\",[28,[\"model\",\"webHookType\"]]]]],false],[0,\"\\n        \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.wildcard_event\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"filter\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[1,[33,[\"d-icon\"],[\"circle\"],[[\"class\"],[\"tracking\"]]],false],[1,[33,[\"i18n\"],[\"admin.web_hooks.categories_filter\"],null],false],[14],[0,\"\\n        \"],[1,[33,[\"category-selector\"],null,[[\"categories\"],[[28,[\"model\",\"categories\"]]]]],false],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"instructions\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.categories_filter_instructions\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"filter\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[1,[33,[\"d-icon\"],[\"circle\"],[[\"class\"],[\"tracking\"]]],false],[1,[33,[\"i18n\"],[\"admin.web_hooks.groups_filter\"],null],false],[14],[0,\"\\n        \"],[1,[33,[\"group-selector\"],null,[[\"groupNames\",\"groupFinder\"],[[28,[\"model\",\"groupsFilterInName\"]],[28,[\"model\",\"groupFinder\"]]]]],false],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"instructions\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.groups_filter_instructions\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[1,[33,[\"plugin-outlet\"],null,[[\"name\",\"args\"],[\"web-hook-fields\",[33,[\"hash\"],null,[[\"model\"],[[28,[\"model\"]]]]]]]],false],[0,\"\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",\"verify_certificate\",[28,[\"model\",\"verify_certificate\"]]]]],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.verify_certificate\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"div\",[]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",\"active\",[28,[\"model\",\"active\"]]]]],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.active\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"active\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"instructions\"],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.active_notice\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"btn btn-default\"],[16,\"disabled\",[26,[\"saveButtonDisabled\"]],null],[5,[\"action\"],[[28,[null]],\"save\"]],[13],[1,[26,[\"saveButtonText\"]],false],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"isNew\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"d-button\"],null,[[\"class\",\"label\",\"action\"],[\"btn-danger\",\"admin.web_hooks.destroy\",\"destroy\"]]],false],[0,\"\\n\"],[6,[\"link-to\"],[\"adminWebHooks.showEvents\",[28,[\"model\",\"id\"]]],[[\"class\"],[\"btn\"]],{\"statements\":[[0,\"        \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.events.go_events\"],null],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"    \"],[11,\"span\",[]],[15,\"class\",\"saving\"],[13],[1,[26,[\"savingStatus\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/web-hooks-show"}});
Ember.TEMPLATES["admin/templates/web-hooks"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"web-hooks-listing\"],[13],[0,\"\\n  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.instruction\"],null],false],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"new-webhook\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"adminWebHooks.show\",\"new\"],[[\"tagName\",\"classNames\"],[\"button\",\"btn btn-default\"]],{\"statements\":[[0,\"      \"],[1,[33,[\"d-icon\"],[\"plus\"],null],false],[0,\" \"],[1,[33,[\"i18n\"],[\"admin.web_hooks.new\"],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[6,[\"load-more\"],null,[[\"selector\",\"action\"],[\".web-hooks tr\",\"loadMore\"]],{\"statements\":[[0,\"    \"],[11,\"table\",[]],[15,\"class\",\"web-hooks grid\"],[13],[0,\"\\n      \"],[11,\"thead\",[]],[13],[0,\"\\n        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.delivery_status.title\"],null],false],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.payload_url\"],null],false],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.description\"],null],false],[14],[0,\"\\n          \"],[11,\"th\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.controls\"],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"          \"],[11,\"tr\",[]],[13],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"delivery-status\"],[13],[6,[\"link-to\"],[\"adminWebHooks.showEvents\",[28,[\"webHook\",\"id\"]]],null,{\"statements\":[[1,[33,[\"admin-web-hook-status\"],null,[[\"deliveryStatuses\",\"model\"],[[28,[\"deliveryStatuses\"]],[28,[\"webHook\"]]]]],false]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"payload-url\"],[13],[6,[\"link-to\"],[\"adminWebHooks.show\",[28,[\"webHook\"]]],null,{\"statements\":[[1,[28,[\"webHook\",\"payload_url\"]],false]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"description\"],[13],[1,[28,[\"webHook\",\"description\"]],false],[14],[0,\"\\n            \"],[11,\"td\",[]],[15,\"class\",\"controls\"],[13],[0,\"\\n              \"],[6,[\"link-to\"],[\"adminWebHooks.show\",[28,[\"webHook\"]]],[[\"tagName\",\"classNames\"],[\"button\",\"btn btn-default no-text\"]],{\"statements\":[[1,[33,[\"d-icon\"],[\"edit\"],null],false]],\"locals\":[]},null],[0,\"\\n              \"],[1,[33,[\"d-button\"],null,[[\"class\",\"action\",\"actionParam\",\"icon\"],[\"destroy btn-danger\",\"destroy\",[28,[\"webHook\"]],\"remove\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"webHook\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"conditional-loading-spinner\"],null,[[\"condition\"],[[28,[\"model\",\"loadingMore\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[13],[1,[33,[\"i18n\"],[\"admin.web_hooks.none\"],null],false],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}","meta":{"moduleName":"admin/templates/web-hooks"}});
/*
* MIT Licensed
* http://www.23developer.com/opensource
* http://github.com/23/resumable.js
* Steffen Tiedemann Christensen, steffen@23company.com
*/


(function(){
"use strict";

  var Resumable = function(opts){
    if ( !(this instanceof Resumable) ) {
      return new Resumable(opts);
    }
    this.version = 1.0;
    // SUPPORTED BY BROWSER?
    // Check if these features are support by the browser:
    // - File object type
    // - Blob object type
    // - FileList object type
    // - slicing files
    this.support = (
                   (typeof(File)!=='undefined')
                   &&
                   (typeof(Blob)!=='undefined')
                   &&
                   (typeof(FileList)!=='undefined')
                   &&
                   (!!Blob.prototype.webkitSlice||!!Blob.prototype.mozSlice||!!Blob.prototype.slice||false)
                   );
    if(!this.support) return(false);


    // PROPERTIES
    var $ = this;
    $.files = [];
    $.defaults = {
      chunkSize:1*1024*1024,
      forceChunkSize:false,
      simultaneousUploads:3,
      fileParameterName:'file',
      chunkNumberParameterName: 'resumableChunkNumber',
      chunkSizeParameterName: 'resumableChunkSize',
      currentChunkSizeParameterName: 'resumableCurrentChunkSize',
      totalSizeParameterName: 'resumableTotalSize',
      typeParameterName: 'resumableType',
      identifierParameterName: 'resumableIdentifier',
      fileNameParameterName: 'resumableFilename',
      relativePathParameterName: 'resumableRelativePath',
      totalChunksParameterName: 'resumableTotalChunks',
      throttleProgressCallbacks: 0.5,
      query:{},
      headers:{},
      preprocess:null,
      method:'multipart',
      uploadMethod: 'POST',
      testMethod: 'GET',
      prioritizeFirstAndLastChunk:false,
      target:'/',
      testTarget: null,
      parameterNamespace:'',
      testChunks:true,
      generateUniqueIdentifier:null,
      getTarget:null,
      maxChunkRetries:100,
      chunkRetryInterval:undefined,
      permanentErrors:[400, 404, 415, 500, 501],
      maxFiles:undefined,
      withCredentials:false,
      xhrTimeout:0,
      clearInput:true,
      chunkFormat:'blob',
      setChunkTypeFromFile:false,
      maxFilesErrorCallback:function (files, errorCount) {
        var maxFiles = $.getOpt('maxFiles');
        alert('Please upload no more than ' + maxFiles + ' file' + (maxFiles === 1 ? '' : 's') + ' at a time.');
      },
      minFileSize:1,
      minFileSizeErrorCallback:function(file, errorCount) {
        alert(file.fileName||file.name +' is too small, please upload files larger than ' + $h.formatSize($.getOpt('minFileSize')) + '.');
      },
      maxFileSize:undefined,
      maxFileSizeErrorCallback:function(file, errorCount) {
        alert(file.fileName||file.name +' is too large, please upload files less than ' + $h.formatSize($.getOpt('maxFileSize')) + '.');
      },
      fileType: [],
      fileTypeErrorCallback: function(file, errorCount) {
        alert(file.fileName||file.name +' has type not allowed, please upload files of type ' + $.getOpt('fileType') + '.');
      }
    };
    $.opts = opts||{};
    $.getOpt = function(o) {
      var $opt = this;
      // Get multiple option if passed an array
      if(o instanceof Array) {
        var options = {};
        $h.each(o, function(option){
          options[option] = $opt.getOpt(option);
        });
        return options;
      }
      // Otherwise, just return a simple option
      if ($opt instanceof ResumableChunk) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { $opt = $opt.fileObj; }
      }
      if ($opt instanceof ResumableFile) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { $opt = $opt.resumableObj; }
      }
      if ($opt instanceof Resumable) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { return $opt.defaults[o]; }
      }
    };

    // EVENTS
    // catchAll(event, ...)
    // fileSuccess(file), fileProgress(file), fileAdded(file, event), filesAdded(files, filesSkipped), fileRetry(file),
    // fileError(file, message), complete(), progress(), error(message, file), pause()
    $.events = [];
    $.on = function(event,callback){
      $.events.push(event.toLowerCase(), callback);
    };
    $.fire = function(){
      // `arguments` is an object, not array, in FF, so:
      var args = [];
      for (var i=0; i<arguments.length; i++) args.push(arguments[i]);
      // Find event listeners, and support pseudo-event `catchAll`
      var event = args[0].toLowerCase();
      for (var i=0; i<=$.events.length; i+=2) {
        if($.events[i]==event) $.events[i+1].apply($,args.slice(1));
        if($.events[i]=='catchall') $.events[i+1].apply(null,args);
      }
      if(event=='fileerror') $.fire('error', args[2], args[1]);
      if(event=='fileprogress') $.fire('progress');
    };


    // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)
    var $h = {
      stopEvent: function(e){
        e.stopPropagation();
        e.preventDefault();
      },
      each: function(o,callback){
        if(typeof(o.length)!=='undefined') {
          for (var i=0; i<o.length; i++) {
            // Array or FileList
            if(callback(o[i])===false) return;
          }
        } else {
          for (i in o) {
            // Object
            if(callback(i,o[i])===false) return;
          }
        }
      },
      generateUniqueIdentifier:function(file, event){
        var custom = $.getOpt('generateUniqueIdentifier');
        if(typeof custom === 'function') {
          return custom(file, event);
        }
        var relativePath = file.webkitRelativePath||file.fileName||file.name; // Some confusion in different versions of Firefox
        var size = file.size;
        return(size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, ''));
      },
      contains:function(array,test) {
        var result = false;

        $h.each(array, function(value) {
          if (value == test) {
            result = true;
            return false;
          }
          return true;
        });

        return result;
      },
      formatSize:function(size){
        if(size<1024) {
          return size + ' bytes';
        } else if(size<1024*1024) {
          return (size/1024.0).toFixed(0) + ' KB';
        } else if(size<1024*1024*1024) {
          return (size/1024.0/1024.0).toFixed(1) + ' MB';
        } else {
          return (size/1024.0/1024.0/1024.0).toFixed(1) + ' GB';
        }
      },
      getTarget:function(request, params){
        var target = $.getOpt('target');

        if (request === 'test' && $.getOpt('testTarget')) {
          target = $.getOpt('testTarget') === '/' ? $.getOpt('target') : $.getOpt('testTarget');
        }

        if (typeof target === 'function') {
          return target(params);
        }

        var separator = target.indexOf('?') < 0 ? '?' : '&';
        var joinedParams = params.join('&');

        return target + separator + joinedParams;
      }
    };

    var onDrop = function(event){
      $h.stopEvent(event);

      //handle dropped things as items if we can (this lets us deal with folders nicer in some cases)
      if (event.dataTransfer && event.dataTransfer.items) {
        loadFiles(event.dataTransfer.items, event);
      }
      //else handle them as files
      else if (event.dataTransfer && event.dataTransfer.files) {
        loadFiles(event.dataTransfer.files, event);
      }
    };
    var preventDefault = function(e) {
      e.preventDefault();
    };

    /**
     * processes a single upload item (file or directory)
     * @param {Object} item item to upload, may be file or directory entry
     * @param {string} path current file path
     * @param {File[]} items list of files to append new items to
     * @param {Function} cb callback invoked when item is processed
     */
    function processItem(item, path, items, cb) {
      var entry;
      if(item.isFile){
        // file provided
        return item.file(function(file){
          file.relativePath = path + file.name;
          items.push(file);
          cb();
        });
      }else if(item.isDirectory){
        // item is already a directory entry, just assign
        entry = item;
      }else if(item instanceof File) {
        items.push(item);
      }
      if('function' === typeof item.webkitGetAsEntry){
        // get entry from file object
        entry = item.webkitGetAsEntry();
      }
      if(entry && entry.isDirectory){
        // directory provided, process it
        return processDirectory(entry, path + entry.name + '/', items, cb);
      }
      if('function' === typeof item.getAsFile){
        // item represents a File object, convert it
        item = item.getAsFile();
        if(item instanceof File) {
          item.relativePath = path + item.name;
          items.push(item);
        }
      }
      cb(); // indicate processing is done
    }


    /**
     * cps-style list iteration.
     * invokes all functions in list and waits for their callback to be
     * triggered.
     * @param  {Function[]}   items list of functions expecting callback parameter
     * @param  {Function} cb    callback to trigger after the last callback has been invoked
     */
    function processCallbacks(items, cb){
      if(!items || items.length === 0){
        // empty or no list, invoke callback
        return cb();
      }
      // invoke current function, pass the next part as continuation
      items[0](function(){
        processCallbacks(items.slice(1), cb);
      });
    }

    /**
     * recursively traverse directory and collect files to upload
     * @param  {Object}   directory directory to process
     * @param  {string}   path      current path
     * @param  {File[]}   items     target list of items
     * @param  {Function} cb        callback invoked after traversing directory
     */
    function processDirectory (directory, path, items, cb) {
      var dirReader = directory.createReader();
      dirReader.readEntries(function(entries){
        if(!entries.length){
          // empty directory, skip
          return cb();
        }
        // process all conversion callbacks, finally invoke own one
        processCallbacks(
          entries.map(function(entry){
            // bind all properties except for callback
            return processItem.bind(null, entry, path, items);
          }),
          cb
        );
      });
    }

    /**
     * process items to extract files to be uploaded
     * @param  {File[]} items items to process
     * @param  {Event} event event that led to upload
     */
    function loadFiles(items, event) {
      if(!items.length){
        return; // nothing to do
      }
      $.fire('beforeAdd');
      var files = [];
      processCallbacks(
          Array.prototype.map.call(items, function(item){
            // bind all properties except for callback
            return processItem.bind(null, item, "", files);
          }),
          function(){
            if(files.length){
              // at least one file found
              appendFilesFromFileList(files, event);
            }
          }
      );
    };

    var appendFilesFromFileList = function(fileList, event){
      // check for uploading too many files
      var errorCount = 0;
      var o = $.getOpt(['maxFiles', 'minFileSize', 'maxFileSize', 'maxFilesErrorCallback', 'minFileSizeErrorCallback', 'maxFileSizeErrorCallback', 'fileType', 'fileTypeErrorCallback']);
      if (typeof(o.maxFiles)!=='undefined' && o.maxFiles<(fileList.length+$.files.length)) {
        // if single-file upload, file is already added, and trying to add 1 new file, simply replace the already-added file
        if (o.maxFiles===1 && $.files.length===1 && fileList.length===1) {
          $.removeFile($.files[0]);
        } else {
          o.maxFilesErrorCallback(fileList, errorCount++);
          return false;
        }
      }
      var files = [], filesSkipped = [], remaining = fileList.length;
      var decreaseReamining = function(){
        if(!--remaining){
          // all files processed, trigger event
          if(!files.length && !filesSkipped.length){
            // no succeeded files, just skip
            return;
          }
          window.setTimeout(function(){
            $.fire('filesAdded', files, filesSkipped);
          },0);
        }
      };
      $h.each(fileList, function(file){
        var fileName = file.name;
        if(o.fileType.length > 0){
          var fileTypeFound = false;
          for(var index in o.fileType){
            var extension = '.' + o.fileType[index];
			if(fileName.toLowerCase().indexOf(extension.toLowerCase(), fileName.length - extension.length) !== -1){
              fileTypeFound = true;
              break;
            }
          }
          if (!fileTypeFound) {
            o.fileTypeErrorCallback(file, errorCount++);
            return false;
          }
        }

        if (typeof(o.minFileSize)!=='undefined' && file.size<o.minFileSize) {
          o.minFileSizeErrorCallback(file, errorCount++);
          return false;
        }
        if (typeof(o.maxFileSize)!=='undefined' && file.size>o.maxFileSize) {
          o.maxFileSizeErrorCallback(file, errorCount++);
          return false;
        }

        function addFile(uniqueIdentifier){
          if (!$.getFromUniqueIdentifier(uniqueIdentifier)) {(function(){
            file.uniqueIdentifier = uniqueIdentifier;
            var f = new ResumableFile($, file, uniqueIdentifier);
            $.files.push(f);
            files.push(f);
            f.container = (typeof event != 'undefined' ? event.srcElement : null);
            window.setTimeout(function(){
              $.fire('fileAdded', f, event)
            },0);
          })()} else {
            filesSkipped.push(file);
          };
          decreaseReamining();
        }
        // directories have size == 0
        var uniqueIdentifier = $h.generateUniqueIdentifier(file, event);
        if(uniqueIdentifier && typeof uniqueIdentifier.then === 'function'){
          // Promise or Promise-like object provided as unique identifier
          uniqueIdentifier
          .then(
            function(uniqueIdentifier){
              // unique identifier generation succeeded
              addFile(uniqueIdentifier);
            },
           function(){
              // unique identifier generation failed
              // skip further processing, only decrease file count
              decreaseReamining();
            }
          );
        }else{
          // non-Promise provided as unique identifier, process synchronously
          addFile(uniqueIdentifier);
        }
      });
    };

    // INTERNAL OBJECT TYPES
    function ResumableFile(resumableObj, file, uniqueIdentifier){
      var $ = this;
      $.opts = {};
      $.getOpt = resumableObj.getOpt;
      $._prevProgress = 0;
      $.resumableObj = resumableObj;
      $.file = file;
      $.fileName = file.fileName||file.name; // Some confusion in different versions of Firefox
      $.size = file.size;
      $.relativePath = file.relativePath || file.webkitRelativePath || $.fileName;
      $.uniqueIdentifier = uniqueIdentifier;
      $._pause = false;
      $.container = '';
      var _error = uniqueIdentifier !== undefined;

      // Callback when something happens within the chunk
      var chunkEvent = function(event, message){
        // event can be 'progress', 'success', 'error' or 'retry'
        switch(event){
        case 'progress':
          $.resumableObj.fire('fileProgress', $, message);
          break;
        case 'error':
          $.abort();
          _error = true;
          $.chunks = [];
          $.resumableObj.fire('fileError', $, message);
          break;
        case 'success':
          if(_error) return;
          $.resumableObj.fire('fileProgress', $); // it's at least progress
          if($.isComplete()) {
            $.resumableObj.fire('fileSuccess', $, message);
          }
          break;
        case 'retry':
          $.resumableObj.fire('fileRetry', $);
          break;
        }
      };

      // Main code to set up a file object with chunks,
      // packaged to be able to handle retries if needed.
      $.chunks = [];
      $.abort = function(){
        // Stop current uploads
        var abortCount = 0;
        $h.each($.chunks, function(c){
          if(c.status()=='uploading') {
            c.abort();
            abortCount++;
          }
        });
        if(abortCount>0) $.resumableObj.fire('fileProgress', $);
      };
      $.cancel = function(){
        // Reset this file to be void
        var _chunks = $.chunks;
        $.chunks = [];
        // Stop current uploads
        $h.each(_chunks, function(c){
          if(c.status()=='uploading')  {
            c.abort();
            $.resumableObj.uploadNextChunk();
          }
        });
        $.resumableObj.removeFile($);
        $.resumableObj.fire('fileProgress', $);
      };
      $.retry = function(){
        $.bootstrap();
        var firedRetry = false;
        $.resumableObj.on('chunkingComplete', function(){
          if(!firedRetry) $.resumableObj.upload();
          firedRetry = true;
        });
      };
      $.bootstrap = function(){
        $.abort();
        _error = false;
        // Rebuild stack of chunks from file
        $.chunks = [];
        $._prevProgress = 0;
        var round = $.getOpt('forceChunkSize') ? Math.ceil : Math.floor;
        var maxOffset = Math.max(round($.file.size/$.getOpt('chunkSize')),1);
        for (var offset=0; offset<maxOffset; offset++) {(function(offset){
            window.setTimeout(function(){
                $.chunks.push(new ResumableChunk($.resumableObj, $, offset, chunkEvent));
                $.resumableObj.fire('chunkingProgress',$,offset/maxOffset);
            },0);
        })(offset)}
        window.setTimeout(function(){
            $.resumableObj.fire('chunkingComplete',$);
        },0);
      };
      $.progress = function(){
        if(_error) return(1);
        // Sum up progress across everything
        var ret = 0;
        var error = false;
        $h.each($.chunks, function(c){
          if(c.status()=='error') error = true;
          ret += c.progress(true); // get chunk progress relative to entire file
        });
        ret = (error ? 1 : (ret>0.99999 ? 1 : ret));
        ret = Math.max($._prevProgress, ret); // We don't want to lose percentages when an upload is paused
        $._prevProgress = ret;
        return(ret);
      };
      $.isUploading = function(){
        var uploading = false;
        $h.each($.chunks, function(chunk){
          if(chunk.status()=='uploading') {
            uploading = true;
            return(false);
          }
        });
        return(uploading);
      };
      $.isComplete = function(){
        var outstanding = false;
        $h.each($.chunks, function(chunk){
          var status = chunk.status();
          if(status=='pending' || status=='uploading' || chunk.preprocessState === 1) {
            outstanding = true;
            return(false);
          }
        });
        return(!outstanding);
      };
      $.pause = function(pause){
          if(typeof(pause)==='undefined'){
              $._pause = ($._pause ? false : true);
          }else{
              $._pause = pause;
          }
      };
      $.isPaused = function() {
        return $._pause;
      };


      // Bootstrap and return
      $.resumableObj.fire('chunkingStart', $);
      $.bootstrap();
      return(this);
    }


    function ResumableChunk(resumableObj, fileObj, offset, callback){
      var $ = this;
      $.opts = {};
      $.getOpt = resumableObj.getOpt;
      $.resumableObj = resumableObj;
      $.fileObj = fileObj;
      $.fileObjSize = fileObj.size;
      $.fileObjType = fileObj.file.type;
      $.offset = offset;
      $.callback = callback;
      $.lastProgressCallback = (new Date);
      $.tested = false;
      $.retries = 0;
      $.pendingRetry = false;
      $.preprocessState = 0; // 0 = unprocessed, 1 = processing, 2 = finished

      // Computed properties
      var chunkSize = $.getOpt('chunkSize');
      $.loaded = 0;
      $.startByte = $.offset*chunkSize;
      $.endByte = Math.min($.fileObjSize, ($.offset+1)*chunkSize);
      if ($.fileObjSize-$.endByte < chunkSize && !$.getOpt('forceChunkSize')) {
        // The last chunk will be bigger than the chunk size, but less than 2*chunkSize
        $.endByte = $.fileObjSize;
      }
      $.xhr = null;

      // test() makes a GET request without any data to see if the chunk has already been uploaded in a previous session
      $.test = function(){
        // Set up request and listen for event
        $.xhr = new XMLHttpRequest();

        var testHandler = function(e){
          $.tested = true;
          var status = $.status();
          if(status=='success') {
            $.callback(status, $.message());
            $.resumableObj.uploadNextChunk();
          } else {
            $.send();
          }
        };
        $.xhr.addEventListener('load', testHandler, false);
        $.xhr.addEventListener('error', testHandler, false);
        $.xhr.addEventListener('timeout', testHandler, false);

        // Add data from the query options
        var params = [];
        var parameterNamespace = $.getOpt('parameterNamespace');
        var customQuery = $.getOpt('query');
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);
        $h.each(customQuery, function(k,v){
          params.push([encodeURIComponent(parameterNamespace+k), encodeURIComponent(v)].join('='));
        });
        // Add extra data to identify chunk
        params = params.concat(
          [
            // define key/value pairs for additional parameters
            ['chunkNumberParameterName', $.offset + 1],
            ['chunkSizeParameterName', $.getOpt('chunkSize')],
            ['currentChunkSizeParameterName', $.endByte - $.startByte],
            ['totalSizeParameterName', $.fileObjSize],
            ['typeParameterName', $.fileObjType],
            ['identifierParameterName', $.fileObj.uniqueIdentifier],
            ['fileNameParameterName', $.fileObj.fileName],
            ['relativePathParameterName', $.fileObj.relativePath],
            ['totalChunksParameterName', $.fileObj.chunks.length]
          ].filter(function(pair){
            // include items that resolve to truthy values
            // i.e. exclude false, null, undefined and empty strings
            return $.getOpt(pair[0]);
          })
          .map(function(pair){
            // map each key/value pair to its final form
            return [
              parameterNamespace + $.getOpt(pair[0]),
              encodeURIComponent(pair[1])
            ].join('=');
          })
        );
        // Append the relevant chunk and send it
        $.xhr.open($.getOpt('testMethod'), $h.getTarget('test', params));
        $.xhr.timeout = $.getOpt('xhrTimeout');
        $.xhr.withCredentials = $.getOpt('withCredentials');
        // Add data from header options
        var customHeaders = $.getOpt('headers');
        if(typeof customHeaders === 'function') {
          customHeaders = customHeaders($.fileObj, $);
        }
        $h.each(customHeaders, function(k,v) {
          $.xhr.setRequestHeader(k, v);
        });
        $.xhr.send(null);
      };

      $.preprocessFinished = function(){
        $.preprocessState = 2;
        $.send();
      };

      // send() uploads the actual data in a POST call
      $.send = function(){
        var preprocess = $.getOpt('preprocess');
        if(typeof preprocess === 'function') {
          switch($.preprocessState) {
          case 0: $.preprocessState = 1; preprocess($); return;
          case 1: return;
          case 2: break;
          }
        }
        if($.getOpt('testChunks') && !$.tested) {
          $.test();
          return;
        }

        // Set up request and listen for event
        $.xhr = new XMLHttpRequest();

        // Progress
        $.xhr.upload.addEventListener('progress', function(e){
          if( (new Date) - $.lastProgressCallback > $.getOpt('throttleProgressCallbacks') * 1000 ) {
            $.callback('progress');
            $.lastProgressCallback = (new Date);
          }
          $.loaded=e.loaded||0;
        }, false);
        $.loaded = 0;
        $.pendingRetry = false;
        $.callback('progress');

        // Done (either done, failed or retry)
        var doneHandler = function(e){
          var status = $.status();
          if(status=='success'||status=='error') {
            $.callback(status, $.message());
            $.resumableObj.uploadNextChunk();
          } else {
            $.callback('retry', $.message());
            $.abort();
            $.retries++;
            var retryInterval = $.getOpt('chunkRetryInterval');
            if(retryInterval !== undefined) {
              $.pendingRetry = true;
              setTimeout($.send, retryInterval);
            } else {
              $.send();
            }
          }
        };
        $.xhr.addEventListener('load', doneHandler, false);
        $.xhr.addEventListener('error', doneHandler, false);
        $.xhr.addEventListener('timeout', doneHandler, false);

        // Set up the basic query data from Resumable
        var query = [
          ['chunkNumberParameterName', $.offset + 1],
          ['chunkSizeParameterName', $.getOpt('chunkSize')],
          ['currentChunkSizeParameterName', $.endByte - $.startByte],
          ['totalSizeParameterName', $.fileObjSize],
          ['typeParameterName', $.fileObjType],
          ['identifierParameterName', $.fileObj.uniqueIdentifier],
          ['fileNameParameterName', $.fileObj.fileName],
          ['relativePathParameterName', $.fileObj.relativePath],
          ['totalChunksParameterName', $.fileObj.chunks.length],
        ].filter(function(pair){
          // include items that resolve to truthy values
          // i.e. exclude false, null, undefined and empty strings
          return $.getOpt(pair[0]);
        })
        .reduce(function(query, pair){
          // assign query key/value
          query[$.getOpt(pair[0])] = pair[1];
          return query;
        }, {});
        // Mix in custom data
        var customQuery = $.getOpt('query');
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);
        $h.each(customQuery, function(k,v){
          query[k] = v;
        });

        var func = ($.fileObj.file.slice ? 'slice' : ($.fileObj.file.mozSlice ? 'mozSlice' : ($.fileObj.file.webkitSlice ? 'webkitSlice' : 'slice')));
        var bytes = $.fileObj.file[func]($.startByte, $.endByte, $.getOpt('setChunkTypeFromFile') ? $.fileObj.file.type : "");
        var data = null;
        var params = [];

        var parameterNamespace = $.getOpt('parameterNamespace');
                if ($.getOpt('method') === 'octet') {
                    // Add data from the query options
                    data = bytes;
                    $h.each(query, function (k, v) {
                        params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join('='));
                    });
                } else {
                    // Add data from the query options
                    data = new FormData();
                    $h.each(query, function (k, v) {
                        data.append(parameterNamespace + k, v);
                        params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join('='));
                    });
                    if ($.getOpt('chunkFormat') == 'blob') {
                        data.append(parameterNamespace + $.getOpt('fileParameterName'), bytes, $.fileObj.fileName);
                    }
                    else if ($.getOpt('chunkFormat') == 'base64') {
                        var fr = new FileReader();
                        fr.onload = function (e) {
                            data.append(parameterNamespace + $.getOpt('fileParameterName'), fr.result);
                            $.xhr.send(data);
                        }
                        fr.readAsDataURL(bytes);
                    }
                }

        var target = $h.getTarget('upload', params);
        var method = $.getOpt('uploadMethod');

        $.xhr.open(method, target);
        if ($.getOpt('method') === 'octet') {
          $.xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        }
        $.xhr.timeout = $.getOpt('xhrTimeout');
        $.xhr.withCredentials = $.getOpt('withCredentials');
        // Add data from header options
        var customHeaders = $.getOpt('headers');
        if(typeof customHeaders === 'function') {
          customHeaders = customHeaders($.fileObj, $);
        }

        $h.each(customHeaders, function(k,v) {
          $.xhr.setRequestHeader(k, v);
        });

                if ($.getOpt('chunkFormat') == 'blob') {
                    $.xhr.send(data);
                }
      };
      $.abort = function(){
        // Abort and reset
        if($.xhr) $.xhr.abort();
        $.xhr = null;
      };
      $.status = function(){
        // Returns: 'pending', 'uploading', 'success', 'error'
        if($.pendingRetry) {
          // if pending retry then that's effectively the same as actively uploading,
          // there might just be a slight delay before the retry starts
          return('uploading');
        } else if(!$.xhr) {
          return('pending');
        } else if($.xhr.readyState<4) {
          // Status is really 'OPENED', 'HEADERS_RECEIVED' or 'LOADING' - meaning that stuff is happening
          return('uploading');
        } else {
          if($.xhr.status == 200 || $.xhr.status == 201) {
            // HTTP 200, 201 (created)
            return('success');
          } else if($h.contains($.getOpt('permanentErrors'), $.xhr.status) || $.retries >= $.getOpt('maxChunkRetries')) {
            // HTTP 415/500/501, permanent error
            return('error');
          } else {
            // this should never happen, but we'll reset and queue a retry
            // a likely case for this would be 503 service unavailable
            $.abort();
            return('pending');
          }
        }
      };
      $.message = function(){
        return($.xhr ? $.xhr.responseText : '');
      };
      $.progress = function(relative){
        if(typeof(relative)==='undefined') relative = false;
        var factor = (relative ? ($.endByte-$.startByte)/$.fileObjSize : 1);
        if($.pendingRetry) return(0);
        if(!$.xhr || !$.xhr.status) factor*=.95;
        var s = $.status();
        switch(s){
        case 'success':
        case 'error':
          return(1*factor);
        case 'pending':
          return(0*factor);
        default:
          return($.loaded/($.endByte-$.startByte)*factor);
        }
      };
      return(this);
    }

    // QUEUE
    $.uploadNextChunk = function(){
      var found = false;

      // In some cases (such as videos) it's really handy to upload the first
      // and last chunk of a file quickly; this let's the server check the file's
      // metadata and determine if there's even a point in continuing.
      if ($.getOpt('prioritizeFirstAndLastChunk')) {
        $h.each($.files, function(file){
          if(file.chunks.length && file.chunks[0].status()=='pending' && file.chunks[0].preprocessState === 0) {
            file.chunks[0].send();
            found = true;
            return(false);
          }
          if(file.chunks.length>1 && file.chunks[file.chunks.length-1].status()=='pending' && file.chunks[file.chunks.length-1].preprocessState === 0) {
            file.chunks[file.chunks.length-1].send();
            found = true;
            return(false);
          }
        });
        if(found) return(true);
      }

      // Now, simply look for the next, best thing to upload
      $h.each($.files, function(file){
        if(file.isPaused()===false){
         $h.each(file.chunks, function(chunk){
           if(chunk.status()=='pending' && chunk.preprocessState === 0) {
             chunk.send();
             found = true;
             return(false);
           }
          });
        }
        if(found) return(false);
      });
      if(found) return(true);

      // The are no more outstanding chunks to upload, check is everything is done
      var outstanding = false;
      $h.each($.files, function(file){
        if(!file.isComplete()) {
          outstanding = true;
          return(false);
        }
      });
      if(!outstanding) {
        // All chunks have been uploaded, complete
        $.fire('complete');
      }
      return(false);
    };


    // PUBLIC METHODS FOR RESUMABLE.JS
    $.assignBrowse = function(domNodes, isDirectory){
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        var input;
        if(domNode.tagName==='INPUT' && domNode.type==='file'){
          input = domNode;
        } else {
          input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.style.display = 'none';
          domNode.addEventListener('click', function(){
            input.style.opacity = 0;
            input.style.display='block';
            input.focus();
            input.click();
            input.style.display='none';
          }, false);
          domNode.appendChild(input);
        }
        var maxFiles = $.getOpt('maxFiles');
        if (typeof(maxFiles)==='undefined'||maxFiles!=1){
          input.setAttribute('multiple', 'multiple');
        } else {
          input.removeAttribute('multiple');
        }
        if(isDirectory){
          input.setAttribute('webkitdirectory', 'webkitdirectory');
        } else {
          input.removeAttribute('webkitdirectory');
        }
        var fileTypes = $.getOpt('fileType');
        if (typeof (fileTypes) !== 'undefined' && fileTypes.length >= 1) {
          input.setAttribute('accept', fileTypes.map(function (e) { return '.' + e }).join(','));
        }
        else {
          input.removeAttribute('accept');
        }
        // When new files are added, simply append them to the overall list
        input.addEventListener('change', function(e){
          appendFilesFromFileList(e.target.files,e);
          var clearInput = $.getOpt('clearInput');
          if (clearInput) {
            e.target.value = '';
          }
        }, false);
      });
    };
    $.assignDrop = function(domNodes){
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        domNode.addEventListener('dragover', preventDefault, false);
        domNode.addEventListener('dragenter', preventDefault, false);
        domNode.addEventListener('drop', onDrop, false);
      });
    };
    $.unAssignDrop = function(domNodes) {
      if (typeof(domNodes.length) == 'undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        domNode.removeEventListener('dragover', preventDefault);
        domNode.removeEventListener('dragenter', preventDefault);
        domNode.removeEventListener('drop', onDrop);
      });
    };
    $.isUploading = function(){
      var uploading = false;
      $h.each($.files, function(file){
        if (file.isUploading()) {
          uploading = true;
          return(false);
        }
      });
      return(uploading);
    };
    $.upload = function(){
      // Make sure we don't start too many uploads at once
      if($.isUploading()) return;
      // Kick off the queue
      $.fire('uploadStart');
      for (var num=1; num<=$.getOpt('simultaneousUploads'); num++) {
        $.uploadNextChunk();
      }
    };
    $.pause = function(){
      // Resume all chunks currently being uploaded
      $h.each($.files, function(file){
        file.abort();
      });
      $.fire('pause');
    };
    $.cancel = function(){
      $.fire('beforeCancel');
      for(var i = $.files.length - 1; i >= 0; i--) {
        $.files[i].cancel();
      }
      $.fire('cancel');
    };
    $.progress = function(){
      var totalDone = 0;
      var totalSize = 0;
      // Resume all chunks currently being uploaded
      $h.each($.files, function(file){
        totalDone += file.progress()*file.size;
        totalSize += file.size;
      });
      return(totalSize>0 ? totalDone/totalSize : 0);
    };
    $.addFile = function(file, event){
      appendFilesFromFileList([file], event);
    };
    $.addFiles = function(files, event){
      appendFilesFromFileList(files, event);
    };
    $.removeFile = function(file){
      for(var i = $.files.length - 1; i >= 0; i--) {
        if($.files[i] === file) {
          $.files.splice(i, 1);
        }
      }
    };
    $.getFromUniqueIdentifier = function(uniqueIdentifier){
      var ret = false;
      $h.each($.files, function(f){
        if(f.uniqueIdentifier==uniqueIdentifier) ret = f;
      });
      return(ret);
    };
    $.getSize = function(){
      var totalSize = 0;
      $h.each($.files, function(file){
        totalSize += file.size;
      });
      return(totalSize);
    };
    $.handleDropEvent = function (e) {
      onDrop(e);
    };
    $.handleChangeEvent = function (e) {
      appendFilesFromFileList(e.target.files, e);
      e.target.value = '';
    };
    $.updateQuery = function(query){
        $.opts.query = query;
    };

    return(this);
  };


  // Node.js-style export for Node and Component
  if (typeof module != 'undefined') {
    module.exports = Resumable;
  } else if (typeof define === "function" && define.amd) {
    // AMD/requirejs: Define the module
    define(function(){
      return Resumable;
    });
  } else {
    // Browser: Expose to window
    window.Resumable = Resumable;
  }

})();












(function () {

var $ = window.jQuery;
// IIFE Wrapped Content Begins:




// IIFE Wrapped Content Ends

 })(this);
