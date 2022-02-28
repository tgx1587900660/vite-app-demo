<template>
  <h1>App 根组件</h1>
  <router-link to="/home">首页</router-link> &nbsp;
  <router-link to="/movie">电影</router-link> &nbsp;
  <router-link to="/about">关于</router-link>
  <hr>
  <router-view></router-view>
</template>