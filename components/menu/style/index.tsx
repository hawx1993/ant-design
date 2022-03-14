// import '../../style/index.less';
// import './index.less';

// // style dependencies
// // deps-lint-skip: layout
// import '../../tooltip/style';

// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
  clearFix,
} from '../../_util/theme';

interface MenuToken extends DerivativeToken {
  rootPrefixCls: string;
  menuCls: string;
}

// =============================== Base ===============================
const accessibilityFocus: GenerateStyle<MenuToken, CSSObject> = token => ({
  boxShadow: `0 0 0 2px ${token.primaryColor}`,
});

const genBaseStyle: GenerateStyle<MenuToken> = token => {
  const { menuCls, rootPrefixCls } = token;

  return {
    [menuCls]: {
      ...resetComponent(token),

      marginBottom: 0,
      paddingInlineStart: 0, // Override default ul/ol
      color: token.textColor,
      fontSize: token.fontSize,
      lineHeight: 0, // Fix display inline-block gap
      listStyle: 'none',
      background: token.componentBackground,
      outline: 'none',
      boxShadow: token.boxShadow, // FIXME: too many box shadow
      transition: `
        background ${token.duration},
        width ${token.duration} cubic-bezier(0.2, 0, 0, 1) 0s`,

      ...clearFix(),

      '&&-root:focus-visible': accessibilityFocus(token),

      'ul, ol': {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },

      // Overflow ellipsis
      '&-overflow': {
        display: 'flex',

        [`${menuCls}-overflow-item`]: {
          flex: 'none',
        },
      },

      //   &-hidden,
      //   &-submenu-hidden {
      //     display: none;
      //   }

      [`${menuCls}-item-group-title`]: {
        padding: `${token.paddingXS}px ${token.padding}px`,
        color: token.textColorSecondary,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        transition: `all ${token.duration}`,
      },

      [`&-horizontal ${menuCls}-submenu`]: {
        transition: `
          border-color ${token.duration} ${token.easeInOut},
          background ${token.duration} ${token.easeInOut}`,
      },

      [`
          ${menuCls}-submenu,
          ${menuCls}-submenu-inline
        `]: {
        transition: `
          border-color ${token.duration} ${token.easeInOut}
          background ${token.duration} ${token.easeInOut},
          padding ${token.durationMid} ${token.easeInOut}`, // FIXME: this is origin hard code 0.15s
      },

      [`${menuCls}-submenu-selected`]: {
        color: token.primaryColor,
      },

      [`
          ${menuCls}-item:active,
          ${menuCls}-submenu-title:active
        `]: {
        background: token.itemActiveBackground,
      },

      [`${menuCls}-submenu ${menuCls}-sub`]: {
        cursor: 'initial',
        transition: `
          background ${token.duration} ${token.easeInOut},
          padding ${token.duration} ${token.easeInOut}
        `,
      },

      [`${menuCls}-title-content`]: {
        transition: `color ${token.duration}s`,
      },

      [`${menuCls}-item a`]: {
        color: token.textColor,

        '&:hover': {
          color: token.primaryColor,
        },

        '&:before': {
          position: 'absolute',
          inset: 0,
          backgroundColor: 'transparent',
          content: '""',
        },
      },

      // FIXME: Remove this
      // https://github.com/ant-design/ant-design/issues/19809
      [`${menuCls}-item > .${rootPrefixCls}-badge a`]: {
        color: token.textColor,

        '&:hover': {
          color: token.primaryColor,
        },
      },

      [`${menuCls}-item-divider`]: {
        overflow: 'hidden',
        lineHeight: 0,
        borderColor: token.borderColorSplit,
        borderStyle: 'solid',
        borderWidth: '1px 0 0', // FIXME: hard code in v4
      },

      [`${menuCls}-item-divider-dashed`]: {
        borderStyle: 'dashed',
      },

      [`
        &-horizontal ${menuCls}-item,
        &-horizontal ${menuCls}-submenu
      `]: {
        marginTop: -1, // FIXME: hard code in v4
      },

      [`
        &-horizontal > ${menuCls}-item:hover,
        &-horizontal > ${menuCls}-item-active,
        &-horizontal > ${menuCls}-submenu ${menuCls}-submenu-title:hover
      `]: {
        backgroundColor: 'transparent',
      },

      //   &-item-selected {
      //     color: @menu-highlight-color;

      //     a,
      //     a:hover {
      //       color: @menu-highlight-color;
      //     }
      //   }

      //   &:not(&-horizontal) &-item-selected {
      //     background-color: @menu-item-active-bg;
      //   }

      //   &-inline,
      //   &-vertical,
      //   &-vertical-left {
      //     border-right: @border-width-base @border-style-base @border-color-split;
      //   }

      //   &-vertical-right {
      //     border-left: @border-width-base @border-style-base @border-color-split;
      //   }

      //   &-vertical&-sub,
      //   &-vertical-left&-sub,
      //   &-vertical-right&-sub {
      //     min-width: 160px;
      //     max-height: calc(100vh - 100px);
      //     padding: 0;
      //     overflow: hidden;
      //     border-right: 0;

      //     // https://github.com/ant-design/ant-design/issues/22244
      //     // https://github.com/ant-design/ant-design/issues/26812
      //     &:not([class*='-active']) {
      //       overflow-x: hidden;
      //       overflow-y: auto;
      //     }

      //     .@{menu-prefix-cls}-item {
      //       left: 0;
      //       margin-left: 0;
      //       border-right: 0;

      //       &::after {
      //         border-right: 0;
      //       }
      //     }
      //     > .@{menu-prefix-cls}-item,
      //     > .@{menu-prefix-cls}-submenu {
      //       transform-origin: 0 0;
      //     }
      //   }

      //   &-horizontal&-sub {
      //     min-width: 114px; // in case of submenu width is too big: https://codesandbox.io/s/qvpwm6mk66
      //   }

      //   &-horizontal &-item,
      //   &-horizontal &-submenu-title {
      //     transition: border-color @animation-duration-slow, background @animation-duration-slow;
      //   }

      //   &-item,
      //   &-submenu-title {
      //     position: relative;
      //     display: block;
      //     margin: 0;
      //     padding: @menu-item-padding;
      //     white-space: nowrap;
      //     cursor: pointer;
      //     transition: border-color @animation-duration-slow, background @animation-duration-slow,
      //       padding @animation-duration-slow @ease-in-out;

      //     .@{menu-prefix-cls}-item-icon,
      //     .@{iconfont-css-prefix} {
      //       min-width: 14px;
      //       font-size: @menu-icon-size;
      //       transition: font-size @menu-animation-duration-normal @ease-out,
      //         margin @animation-duration-slow @ease-in-out, color @animation-duration-slow;

      //       + span {
      //         margin-left: @menu-icon-margin-right;
      //         opacity: 1;
      //         transition: opacity @animation-duration-slow @ease-in-out, margin @animation-duration-slow,
      //           color @animation-duration-slow;
      //       }
      //     }

      //     .@{menu-prefix-cls}-item-icon.svg {
      //       vertical-align: -0.125em;
      //     }

      //     &.@{menu-prefix-cls}-item-only-child {
      //       > .@{iconfont-css-prefix},
      //       > .@{menu-prefix-cls}-item-icon {
      //         margin-right: 0;
      //       }
      //     }

      //     &:focus-visible {
      //       .accessibility-focus();
      //     }
      //   }

      //   & > &-item-divider {
      //     margin: 1px 0;
      //     padding: 0;
      //   }

      //   &-submenu {
      //     &-popup {
      //       position: absolute;
      //       z-index: @zindex-dropdown;
      //       background: transparent;
      //       border-radius: @border-radius-base;
      //       box-shadow: none;
      //       transform-origin: 0 0;

      //       // https://github.com/ant-design/ant-design/issues/13955
      //       &::before {
      //         position: absolute;
      //         top: -7px;
      //         right: 0;
      //         bottom: 0;
      //         left: 0;
      //         z-index: -1;
      //         width: 100%;
      //         height: 100%;
      //         opacity: 0.0001;
      //         content: ' ';
      //       }
      //     }

      //     // https://github.com/ant-design/ant-design/issues/13955
      //     &-placement-rightTop::before {
      //       top: 0;
      //       left: -7px;
      //     }

      //     > .@{menu-prefix-cls} {
      //       background-color: @menu-bg;
      //       border-radius: @border-radius-base;

      //       &-submenu-title::after {
      //         transition: transform @animation-duration-slow @ease-in-out;
      //       }
      //     }

      //     &-popup > .@{menu-prefix-cls} {
      //       background-color: @menu-popup-bg;
      //     }

      //     &-expand-icon,
      //     &-arrow {
      //       position: absolute;
      //       top: 50%;
      //       right: 16px;
      //       width: 10px;
      //       color: @menu-item-color;
      //       transform: translateY(-50%);
      //       transition: transform @animation-duration-slow @ease-in-out;
      //     }

      //     &-arrow {
      //       // →
      //       &::before,
      //       &::after {
      //         position: absolute;
      //         width: 6px;
      //         height: 1.5px;
      //         background-color: currentcolor;
      //         border-radius: 2px;
      //         transition: background @animation-duration-slow @ease-in-out,
      //           transform @animation-duration-slow @ease-in-out, top @animation-duration-slow @ease-in-out,
      //           color @animation-duration-slow @ease-in-out;
      //         content: '';
      //       }

      //       &::before {
      //         transform: rotate(45deg) translateY(-2.5px);
      //       }

      //       &::after {
      //         transform: rotate(-45deg) translateY(2.5px);
      //       }
      //     }

      //     &:hover > &-title > &-expand-icon,
      //     &:hover > &-title > &-arrow {
      //       color: @menu-highlight-color;
      //     }

      //     .@{menu-prefix-cls}-inline-collapsed &-arrow,
      //     &-inline &-arrow {
      //       // ↓
      //       &::before {
      //         transform: rotate(-45deg) translateX(2.5px);
      //       }

      //       &::after {
      //         transform: rotate(45deg) translateX(-2.5px);
      //       }
      //     }

      //     &-horizontal &-arrow {
      //       display: none;
      //     }

      //     &-open&-inline > &-title > &-arrow {
      //       // ↑
      //       transform: translateY(-2px);

      //       &::after {
      //         transform: rotate(-45deg) translateX(-2.5px);
      //       }

      //       &::before {
      //         transform: rotate(45deg) translateX(2.5px);
      //       }
      //     }
      //   }

      //   &-vertical &-submenu-selected,
      //   &-vertical-left &-submenu-selected,
      //   &-vertical-right &-submenu-selected {
      //     color: @menu-highlight-color;
      //   }

      //   &-horizontal {
      //     line-height: @menu-horizontal-line-height;
      //     border: 0;
      //     border-bottom: @border-width-base @border-style-base @border-color-split;
      //     box-shadow: none;

      //     &:not(.@{menu-prefix-cls}-dark) {
      //       > .@{menu-prefix-cls}-item,
      //       > .@{menu-prefix-cls}-submenu {
      //         margin-top: -1px;
      //         margin-bottom: 0;
      //         padding: @menu-item-padding;

      //         &:hover,
      //         &-active,
      //         &-open,
      //         &-selected {
      //           color: @menu-highlight-color;

      //           &::after {
      //             border-bottom: 2px solid @menu-highlight-color;
      //           }
      //         }
      //       }
      //     }

      //     > .@{menu-prefix-cls}-item,
      //     > .@{menu-prefix-cls}-submenu {
      //       position: relative;
      //       top: 1px;
      //       display: inline-block;
      //       vertical-align: bottom;

      //       &::after {
      //         position: absolute;
      //         right: @menu-item-padding-horizontal;
      //         bottom: 0;
      //         left: @menu-item-padding-horizontal;
      //         border-bottom: 2px solid transparent;
      //         transition: border-color @animation-duration-slow @ease-in-out;
      //         content: '';
      //       }
      //     }

      //     > .@{menu-prefix-cls}-submenu > .@{menu-prefix-cls}-submenu-title {
      //       padding: 0;
      //     }

      //     > .@{menu-prefix-cls}-item {
      //       a {
      //         color: @menu-item-color;

      //         &:hover {
      //           color: @menu-highlight-color;
      //         }

      //         &::before {
      //           bottom: -2px;
      //         }
      //       }

      //       &-selected a {
      //         color: @menu-highlight-color;
      //       }
      //     }

      //     &::after {
      //       display: block;
      //       clear: both;
      //       height: 0;
      //       content: '\20';
      //     }
      //   }

      //   &-vertical,
      //   &-vertical-left,
      //   &-vertical-right,
      //   &-inline {
      //     .@{menu-prefix-cls}-item {
      //       position: relative;

      //       &::after {
      //         position: absolute;
      //         top: 0;
      //         right: 0;
      //         bottom: 0;
      //         border-right: @menu-item-active-border-width solid @menu-highlight-color;
      //         transform: scaleY(0.0001);
      //         opacity: 0;
      //         transition: transform @menu-animation-duration-normal @ease-out,
      //           opacity @menu-animation-duration-normal @ease-out;
      //         content: '';
      //       }
      //     }

      //     .@{menu-prefix-cls}-item,
      //     .@{menu-prefix-cls}-submenu-title {
      //       height: @menu-item-height;
      //       margin-top: @menu-item-vertical-margin;
      //       margin-bottom: @menu-item-vertical-margin;
      //       padding: 0 16px;
      //       overflow: hidden;
      //       line-height: @menu-item-height;
      //       text-overflow: ellipsis;
      //     }

      //     // disable margin collapsed
      //     .@{menu-prefix-cls}-submenu {
      //       padding-bottom: 0.02px;
      //     }

      //     .@{menu-prefix-cls}-item:not(:last-child) {
      //       margin-bottom: @menu-item-boundary-margin;
      //     }

      //     > .@{menu-prefix-cls}-item,
      //     > .@{menu-prefix-cls}-submenu > .@{menu-prefix-cls}-submenu-title {
      //       height: @menu-inline-toplevel-item-height;
      //       line-height: @menu-inline-toplevel-item-height;
      //     }
      //   }

      //   &-vertical {
      //     .@{menu-prefix-cls}-item-group-list .@{menu-prefix-cls}-submenu-title,
      //     .@{menu-prefix-cls}-submenu-title {
      //       padding-right: 34px;
      //     }
      //   }

      //   &-inline {
      //     width: 100%;
      //     .@{menu-prefix-cls}-selected,
      //     .@{menu-prefix-cls}-item-selected {
      //       &::after {
      //         transform: scaleY(1);
      //         opacity: 1;
      //         transition: transform @menu-animation-duration-normal @ease-in-out,
      //           opacity @menu-animation-duration-normal @ease-in-out;
      //       }
      //     }

      //     .@{menu-prefix-cls}-item,
      //     .@{menu-prefix-cls}-submenu-title {
      //       width: ~'calc(100% + 1px)';
      //     }

      //     .@{menu-prefix-cls}-item-group-list .@{menu-prefix-cls}-submenu-title,
      //     .@{menu-prefix-cls}-submenu-title {
      //       padding-right: 34px;
      //     }

      //     // Motion enhance for first level
      //     &.@{menu-prefix-cls}-root {
      //       .@{menu-prefix-cls}-item,
      //       .@{menu-prefix-cls}-submenu-title {
      //         display: flex;
      //         align-items: center;
      //         transition: border-color @animation-duration-slow, background @animation-duration-slow,
      //           padding 0.1s @ease-out;

      //         > .@{menu-prefix-cls}-title-content {
      //           flex: auto;
      //           min-width: 0;
      //           overflow: hidden;
      //           text-overflow: ellipsis;
      //         }

      //         > * {
      //           flex: none;
      //         }
      //       }
      //     }
      //   }

      //   &&-inline-collapsed {
      //     width: @menu-collapsed-width;

      //     > .@{menu-prefix-cls}-item,
      //     > .@{menu-prefix-cls}-item-group
      //       > .@{menu-prefix-cls}-item-group-list
      //       > .@{menu-prefix-cls}-item,
      //     > .@{menu-prefix-cls}-item-group
      //       > .@{menu-prefix-cls}-item-group-list
      //       > .@{menu-prefix-cls}-submenu
      //       > .@{menu-prefix-cls}-submenu-title,
      //     > .@{menu-prefix-cls}-submenu > .@{menu-prefix-cls}-submenu-title {
      //       left: 0;
      //       padding: 0 ~'calc(50% - @{menu-icon-size-lg} / 2)';
      //       text-overflow: clip;

      //       .@{menu-prefix-cls}-submenu-arrow {
      //         opacity: 0;
      //       }

      //       .@{menu-prefix-cls}-item-icon,
      //       .@{iconfont-css-prefix} {
      //         margin: 0;
      //         font-size: @menu-icon-size-lg;
      //         line-height: @menu-item-height;

      //         + span {
      //           display: inline-block;
      //           opacity: 0;
      //         }
      //       }
      //     }

      //     .@{menu-prefix-cls}-item-icon,
      //     .@{iconfont-css-prefix} {
      //       display: inline-block;
      //     }

      //     &-tooltip {
      //       pointer-events: none;

      //       .@{menu-prefix-cls}-item-icon,
      //       .@{iconfont-css-prefix} {
      //         display: none;
      //       }

      //       a {
      //         color: @text-color-dark;
      //       }
      //     }

      //     .@{menu-prefix-cls}-item-group-title {
      //       padding-right: 4px;
      //       padding-left: 4px;
      //       overflow: hidden;
      //       white-space: nowrap;
      //       text-overflow: ellipsis;
      //     }
      //   }

      //   &-item-group-list {
      //     margin: 0;
      //     padding: 0;
      //     .@{menu-prefix-cls}-item,
      //     .@{menu-prefix-cls}-submenu-title {
      //       padding: 0 16px 0 28px;
      //     }
      //   }

      //   &-root&-vertical,
      //   &-root&-vertical-left,
      //   &-root&-vertical-right,
      //   &-root&-inline {
      //     box-shadow: none;
      //   }

      //   &-root&-inline-collapsed {
      //     .@{menu-prefix-cls}-item,
      //     .@{menu-prefix-cls}-submenu .@{menu-prefix-cls}-submenu-title {
      //       > .@{menu-prefix-cls}-inline-collapsed-noicon {
      //         font-size: @menu-icon-size-lg;
      //         text-align: center;
      //       }
      //     }
      //   }

      //   &-sub&-inline {
      //     padding: 0;
      //     background: @menu-inline-submenu-bg;
      //     border: 0;
      //     border-radius: 0;
      //     box-shadow: none;
      //     & > .@{menu-prefix-cls}-item,
      //     & > .@{menu-prefix-cls}-submenu > .@{menu-prefix-cls}-submenu-title {
      //       height: @menu-item-height;
      //       line-height: @menu-item-height;
      //       list-style-position: inside;
      //       list-style-type: disc;
      //     }

      //     & .@{menu-prefix-cls}-item-group-title {
      //       padding-left: 32px;
      //     }
      //   }

      //   // Disabled state sets text to gray and nukes hover/tab effects
      //   &-item-disabled,
      //   &-submenu-disabled {
      //     color: @disabled-color !important;
      //     background: none;
      //     cursor: not-allowed;

      //     &::after {
      //       border-color: transparent !important;
      //     }

      //     a {
      //       color: @disabled-color !important;
      //       pointer-events: none;
      //     }
      //     > .@{menu-prefix-cls}-submenu-title {
      //       color: @disabled-color !important;
      //       cursor: not-allowed;
      //       > .@{menu-prefix-cls}-submenu-arrow {
      //         &::before,
      //         &::after {
      //           background: @disabled-color !important;
      //         }
      //       }
      //     }
      //   }
    },
  };
};

// ============================== Export ==============================
export default function useStyle(
  rootPrefixCls: string,
  prefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const cascaderToken: MenuToken = {
    ...token,
    rootPrefixCls,
    menuCls: `.${prefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(cascaderToken),
    ]),
    hashId,
  ];
}
