/* Do not edit this file to avoid losing your changes when upgrade the theme */
var BTCollection={selectors:{section:".collection-template-section",filter:".cf",filterContent:".cf__content",filterForm:".cf__form",filterLink:".cf__link",filterInput:".cf__link__input",filterPriceSlider:".cf__price-slider",filterPriceFrom:".cf__price-from",filterPriceTo:".cf__price-to",filterPriceInputMin:".cf__price-input-min",filterPriceInputMax:".cf__price-input-max",filterCurrentInline:".cf__current-inline",filterApplyBtn:".filter-action-mobile__item--submit-btn",sortInput:".cf__sort-by",sortLink:".ct__sort__link",products:".collection__products",currentTags:".collection__current-tags",productsInner:".products",modeLink:".ct__mode__link",sort:".ct__sort",total:".ct__total",pagination:".pagination",scrollBtn:".collection__scroll",paginationButton:".collection__scroll,.button--more,.pagination",productGrid:".grid--products",productItem:".grid__item",recentViewWrap:".recent-view",recentViewTitle:".rv__title",recentViewWrapContent:".rv__wrap-content",recentViewList:".rv__content",recentViewNumber:".rv__number",wrap:"#collection-template"},options:{clickEvent:"click",ajaxView:"ajax",recentViewOverlayEvent:"recent-view"},data:{collectionUrl:"",priceSlider:[]},ignoreViewParam:function(t){return""!=t&&null!=t&&(t=t.replace(/\?view=ajax\"/g,'"').replace(/\?view=ajax\&/g,"?").replace(/\&view=ajax/g,"")),t},updateHtml:function(t){var e=this.selectors,i=($(e.filter,t).html(),$(e.section));0<$(e.scrollBtn).length&&this.destroyInfiniteScroll(),i.html($(e.section,t).html()),BT.reLoadReview(e.productGrid),BtCurrency.convertSilence(shopCurrency,BtCurrency.currentCurrency,$(e.wrap).find("span.money")),BT.applyCustomColorSwatches(e.products),BT.applyCustomColorSwatches(e.filter),BT.initDealCountdown(e.products),BT.popularAddedWishlistItems(e.products),this.updateTotalValuesNumber(),i.offset().top<$(window).scrollTop()&&$("html, body").animate({scrollTop:i.offset().top-100},400),this.loadRecentViewProducts(),0<$(e.scrollBtn).length&&this.initInfiniteScrollCollection(e.products)},resetPricesliders:function(){$.each(this.data.priceSlider,function(t,e){var i=$(e);e.noUiSlider.updateOptions({start:[i.attr("data-min"),i.attr("data-max")]},!0)})},initPriceSliders:function(){var a=this;$.each(this.data.priceSlider,function(t,e){e.noUiSlider.destroy()}),this.data.priceSlider=[],$(this.selectors.filterPriceSlider).each(function(){var l=$(this),c=(l.parents(a.selectors.filterContent),document.getElementById(l.attr("id"))),t=+$(this).attr("data-start"),e=+$(this).attr("data-end"),i=+$(this).attr("data-min"),n=+$(this).attr("data-max");noUiSlider.create(c,{connect:[!1,!0,!1],start:[t,e],range:{min:i,max:n},step:1,format:{from:function(t){return Math.round(t)},to:function(t){return Math.round(t)}},direction:rtl?"rtl":"ltr"}),c.noUiSlider.on("update",function(t,e,i,n,r,o){l.parent().find(a.selectors.filterPriceFrom).html(BT.getPriceHtml(100*t[0])),l.parent().find(a.selectors.filterPriceTo).html(BT.getPriceHtml(100*t[1])),l.siblings(a.selectors.filterPriceInputMin).val(t[0]),l.siblings(a.selectors.filterPriceInputMax).val(t[1]),BtCurrency.convertSilence(shopCurrency,BtCurrency.currentCurrency,".cf__price span.money")}),c.noUiSlider.on("change",function(t,e,i,n,r,o){BT.data.cacheWindowWidth>BT.options.windowScreen.mobile&&(c.setAttribute("disabled",!0),a.submitFilterForm(l))}),a.data.priceSlider.push(c)})},addHistoryUrlToState:function(t,e){if(!this.inIframe())try{var i,n=this.ignoreViewParam(t);(i=null!=e&&null!=e?new URLSearchParams(e):new URLSearchParams(window.location.search)).delete("section_id");var r=i.toString();""!=r&&(t.indexOf("?")<0?n+="?":n+="&",n+=r),window.history.pushState({path:n},"",n)}catch(t){console.log(t)}},inIframe:function(){try{return window.self!==window.top}catch(t){return!0}},updateNewContent:function(e,i,n){BT.showLoadingFull(),BT.callAjax(e,"GET",i,null,function(t){this.updateHtml(t),this.initPriceSliders(),BT.hideLoadingFull(),e.indexOf("/search?")<0&&(this.data.collectionUrl=e.split("?")[0]),n&&this.addHistoryUrlToState(e,i)}.bind(this))},getSectionId:function(t){return t.parents(this.selectors.section).first().attr("data-section-id")},submitFilterForm:function(t){t.parents(this.selectors.filterForm).first().submit()},hideFilterCanvasOnMobile:function(){BT.data.cacheWindowWidth<1200&&$("body").hasClass("open-sidebar-canvas--sidebar-filter")&&$("#sidebar-filter .bt-sidebar__close").trigger("click")},updateTotalValuesNumber:function(){var t=parseInt($(this.selectors.filterApplyBtn).attr("data-total-active-values"));0<t?$(".filter-active-number").removeClass("hide").text(t):$(".filter-active-number").addClass("hide")},initAjaxLinkEvent:function(){var o=this;$(document).on(this.options.clickEvent,this.selectors.filterLink,function(t){t.preventDefault();var e=$(this).attr("href"),i={section_id:o.getSectionId($(this))};o.hideFilterCanvasOnMobile(),o.updateNewContent(e,i,!0)}),$(document).on("change",this.selectors.filterInput,function(t){t.preventDefault(),BT.data.cacheWindowWidth>BT.options.windowScreen.mobile&&o.submitFilterForm($(this))}),$(document).on(this.options.clickEvent,this.selectors.sortLink,function(t){t.preventDefault(),$(o.selectors.sortInput).val($(this).attr("data-value")),o.submitFilterForm($(o.selectors.sortInput))}),$(document).on("submit",this.selectors.filterForm,function(t){t.preventDefault();var e=new FormData(t.target),i=new URLSearchParams(e).toString(),n=o.getSectionId($(this)),r=window.location.pathname+"?"+i;o.updateNewContent(r,{section_id:n},!0),o.hideFilterCanvasOnMobile()}),$(document).on("click",this.selectors.filterApplyBtn,function(t){t.preventDefault(),$(o.selectors.filterForm).submit()}),this.updateTotalValuesNumber()},initPopState:function(){this.addHistoryUrlToState(window.location.pathname),$(window).bind("popstate",function(t){var e=t.originalEvent.state;null!==e&&this.updateNewContent(e.path,{},!1)}.bind(this))},destroyInfiniteScroll:function(){BT.destroyInfiniteScroll("collection-template")},initInfiniteScrollCollection:function(t){this.destroyInfiniteScroll(),BT.initInfiniteScroll(t)},openCurrentFilterDropdown:function(){$(".cfc__link.active").each(function(){$(this).parents(".cfc__dropdown").each(function(){var t=$(this);t.show(),t.parent(".link-list__item").addClass("open")})})},loadRecentViewProducts:function(){var e=this,i=$(this.selectors.recentViewWrap),n="open",r="working";if(0<i.length){var o=$(this.selectors.recentViewList),t=BT.getCookieItemsValue(!0,BT.options.recentView.cookieName);if(0<t.length){t.reverse();var l=t.join(",");BT.callAjax(theme.rootUrl,"GET",{view:"recent_view_list",q:l},null,function(t){o.html(t),0<o.find(".item").length&&(BT.convertCurrencySilence(o.find("span.money")),BT.applyCustomColorSwatches(o),$(e.selectors.recentViewNumber).text(o.find(".item").length))})}else o.append('<div class="alert alert-warning w100" style="margin-top:20px;margin-left:15px;margin-right:15px;">'+theme.strings.recentViewEmpty+"</div>");var c=BT.options.overlay.hidePrefixEvent+e.options.recentViewOverlayEvent,a=$(e.selectors.recentViewWrapContent);$(document).on("click",e.selectors.recentViewTitle,function(t){t.preventDefault(),i.hasClass(r)||(i.addClass(r),i.hasClass(n)?(BT.hideOverlay(),a.slideUp(300,function(){i.toggleClass(n),i.removeClass(r)})):a.slideDown(300,function(){i.toggleClass(n),i.removeClass(r),BT.showOverlay(e.options.recentViewOverlayEvent)}))}),$(document).on(c,function(){a.slideUp(300,function(){i.removeClass(n).removeClass(r)})})}},init:function(){this.initAjaxLinkEvent(),BT.initExpandTrigger(),this.loadRecentViewProducts(),this.initPopState(),$(document).on("click",".close-filter-btn",function(t){t.preventDefault(),$("#sidebar-filter .bt-sidebar__close").trigger("click")})}};theme.collectionTemplate={},theme.CollectionTemplateSection=function(t){var e=this.$container=$(t);this.obj="#"+e.attr("data-section-id"),BTCollection.data.collectionUrl=e.attr("data-url"),BtCurrency.convertSilence(shopCurrency,BtCurrency.currentCurrency,e.find("span.money")),BTCollection.initInfiniteScrollCollection(e),BT.applyCustomColorSwatches(e),BT.initDealCountdown(e.find(BTCollection.selectors.products)),BTCollection.initPriceSliders()},theme.CollectionTemplateSection.prototype=_.assignIn({},theme.CollectionTemplateSection.prototype,{onUnload:function(){BTCollection.destroyInfiniteScroll()}}),BTCollection.init(),theme.sections.constructors["collection-template"]=theme.CollectionTemplateSection;