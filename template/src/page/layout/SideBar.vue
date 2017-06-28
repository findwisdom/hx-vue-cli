<template>
  <div>
    <div class="layout-logo-left">WMS</div>
    <ul class="menu-list" ref="menulist">
      <template v-for="(menuItem, index) in menu">
        <li v-if="!menuItem.child && routerRole(menuItem.role)" class="menu-list-item inactive">
            <span class="menu-list-text" @click.stop="[menuShow($event),routerChange(menuItem.name)]">
               <Tooltip :content="menuItem.text" placement="right">
                <Icon :type="menuItem.icon" :size="iconSize" class="icon-left item-icon"></Icon>
                <span class="layout-text item-text">{{menuItem.text}}</span>
               </Tooltip>
            </span>
        </li>
        <li v-else-if="routerRole(menuItem.role)" class="menu-list-item inactive">
            <span class="menu-list-text" @click.stop="menuShow($event)">
              <Tooltip :content="menuItem.text" placement="right">
                <Icon :type="menuItem.icon" :size="iconSize" class="icon-left item-icon"></Icon>
                <span class="layout-text item-text">{{menuItem.text}}</span>
              </Tooltip>
              <Icon type="arrow-down-b" :size="iconSize" class="layout-text item-icon active-icon" style="padding-right: 5px"></Icon>
            </span>
          <ul class="sub-menu-list" style="display: none">
            <template v-for="(item, val) in menuItem.child">
              <li v-if="!item.child && routerRole(item.role)" class="subinactive sub-item">
                        <span class="sub-list-text"
                              @click.stop="[menuShow($event),routerChange(item.name)]">
                          <Tooltip :content="item.text" placement="right">
                            <Icon :type="item.icon" :size="iconSize" class="icon-left sub-item-icon sub-icon"></Icon>
                            <span class="layout-text sub-item-text">{{item.text}}</span>
                        </Tooltip>
                    </span>
              </li>
              <li v-else-if="routerRole(item.role)" class="subinactive sub-item">
                    <span @click.stop="menuShow($event)" class="sub-list-text">
                      <Tooltip :content="item.text" placement="right">
                        <Icon :type="item.icon" :size="iconSize" class="icon-left sub-item-icon sub-icon"></Icon>
                        <span class="layout-text sub-item-text">{{item.text}}</span>
                      </Tooltip>
                      <Icon type="arrow-down-b" :size="iconSize" class="layout-text active-icon" style="display: inline-block;padding-right: 5px"></Icon>
                    </span>
                <ul style="display: none">
                  <template v-for="(subItem,endIndex) in item.child">
                    <li v-if="routerRole(subItem.role)">
                        <span class="end-list-text end-left"
                              @click.stop="[endSelect(val, index, endIndex), routerChange(subItem.name)]">
                          <Tooltip :content="subItem.text" placement="right">
                            <Icon :type="subItem.icon" :size="iconSize" class="icon-left sub-item-icon sub-icon"></Icon>
                            <span class="layout-text sub-item-text">{{subItem.text}}</span>
                          </Tooltip>
                        </span>
                    </li>
                  </template>
                </ul>
              </li>
            </template>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
  import $ from 'jquery'
  import menu from './../../config/menu.js'
  import * as role from '../../api/auth/auth'
  // const DEBOUNCE_TIME = 400
  export default {
    data () {
      return {
        menu: menu,
        iconSize: 14,
        tId: null
      }
    },
    computed: {},
    updated () {
    },
    mounted: function () {
    },
    methods: {
      routerRole (roleKey) {
        if (roleKey === '*' || role.inRole(roleKey)) {
          return true
        }
        return false
      },
      routerChange (name) {
        this.$router.push({name: name})
      },
      menuShow (e) {
        let dom = e.currentTarget
        if ($(dom).parent().hasClass('activeLi')) {
          $(dom).removeClass('activeLi').parent().removeClass('activeLi')
        } else {
          $(dom).parents('.menu-list-item').siblings('li').find('span').removeClass('activeLi')
          $(dom).addClass('activeLi').parent().addClass('activeLi')
          $(dom).parent('.subinactive').siblings().removeClass('activeLi').children('span').removeClass('activeLi')
        }
      },
      endSelect (val, index, endIndex) {
        let _self = $('.inactive').eq(index).children('ul').children('li').eq(val).children('ul').children('li').eq(endIndex).children('.end-list-text')
        _self.addClass('active-end-item-select')
        $('.end-list-text').not(_self).removeClass('active-end-item-select')
      }
    },
    components: {}
  }
</script>
<style scoped>
  .activeLi>ul,ul.activeLi{
    display: block!important;
  }
  span.activeLi{
    color: #ffffff;
  }
  a {
    color: #ffffff;
  }

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    color: #ffffff;
  }

  .end-left {
    margin-left: 8px;
  }

  .layout-text {
    padding-right: 32px;
  }

  .active-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -7px;
  }

  .active-item-select {
    color: #2d8cf0;
  }

  .active-sub-item-select {
    color: #2d8cf0;
  }

  .active-end-item-select {
    color: #2d8cf0;
  }

  .layout-logo-left {
    color: #ffffff;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 4px;
    line-height: 30px;
  }

  .icon-left {
    margin-right: 8px
  }

  .item-text {
  }

  .menu-list {
    color: #9ea7b4;
    width: 100%;
  }

  .menu-list li {
    cursor: pointer;
  }

  .menu-list-text {
    position: relative;
    font-size: 13px;
    padding: 0 20px;
    display: block;
    width: 100%;
    height: 47px;
    line-height: 47px;
  }

  .menu-list-item {
    color: #9ea7b4;
    position: relative;
  }

  .menu-list-item:hover .item-text {
    color: #ffffff;
  }

  .menu-list-item:hover .item-icon {
    color: #ffffff;
  }

  .sub-menu-list {
    background: #313540;
  }

  .sub-list-text {
    position: relative;
    padding: 14px 20px;
    display: block;
    width: 100%;
    font-size: 13px;
  }

  .end-list-text {
    position: relative;
    padding: 14px 20px;
    display: block;
    width: 100%;
    font-size: 13px;
  }

  .sub-list-text:hover {
    color: #ffffff;
  }

  .sub-item {
  }

  .sub-icon {
    margin-left: 12px;
  }

  .subinactive {
  }

  /*.sub-menu-show{*/
  /*display: no;*/
  /*}*/
  .sub-menu-hiden {
    display: none;
  }

  .menu-item-select {
    color: #ffffff;
  }
</style>
