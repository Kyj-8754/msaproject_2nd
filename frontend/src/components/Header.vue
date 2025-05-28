<template>
	<div class="text-end bg-light py-2 px-4">
    <template v-if="!memberStore.authenticated">
        <router-link :to="{ name: 'Member_LoginForm' }">로그인</router-link> /
        <router-link :to="{ name: 'Member_RegistForm' }"> 회원 가입</router-link> 
    </template>
		<template v-else>
			<span class="me-3">
        <router-link :to="{ name: 'Member_DetailView', query: {userid : memberStore.userid} }">{{memberStore.userid}}</router-link>님
      </span>
      <router-link :to="{}" @click.prevent="memberStore.clearMember()">로그아웃</router-link>
      <template v-if="memberStore.supervisor === 'Y'">
        / <router-link :to="{ name: 'Member_List' }">유저관리</router-link>
      </template>
		</template>
	</div>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <span class="navbar-brand ps-2">TodoList App</span>
      <button class="navbar-toggler" type="button" @click="isNavShow = !isNavShow">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="isNavShow ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
                Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">
                About
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/todos">
                TodoList
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
	<!-- 헤더 -->
	<header class="header border-bottom"
		style="height: 250px; overflow: hidden;">
    <router-link to="/">
     <img :src="logoImage" alt="사이트 배너" style="width: 100%; height: auto; object-fit: cover;"> 
    </router-link>
	</header>
</template>

<script setup>
import { useMemberStore } from '@/stores/member'
import logoImage from '@/assets/image/bannerlogo.jpg';

const memberStore = useMemberStore();
</script>