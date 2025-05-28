<template>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<main class="main-area">
			<h2>게시물 목록</h2>
			 건수 : 
			 <select name="size" id="size" v-model="size">
				<option v-for="size in sizes" :key="size" :value="size">
					{{ size }}
				</option>
			</select>

			<!-- 현재 페이지 번호 / 전체 페이지 번호 -->
			({{pageResponse.pageNo}}/{{pageResponse.totalPage}})

			<form @submit.prevent="searchID" :name="searchID" :id="searchID">
				검색어 : 
				<input type="text" :name="searchValue" :id="searchValue" v-model="searchValue"> 
				<input type="submit" value="검색">
			</form>

			<table class="table table-striped table-hover table-bordered mt-4">
				<thead class="table-dark text-center">
					<tr>
						<th>글번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>등록일</th>
						<th>조회수</th>
						<!-- <template v-if="member.supervisor === 'Y'">
						<th>삭제여부</th>
						<th>삭제일</th>
						</template> -->
					</tr>
				</thead>
				<tbody class="text-center">
						<tr v-for="item in pageResponse.list" :key="item">
							<td>{{item.bno}}</td>
							<td>
								<router-link :to="`detailView?bno=${item.bno}`">{{item.title}}</router-link>
							</td>
							<td>{{item.writer}}</td>
							<td>{{item.reg_date}}</td>
							<td>{{item.view_count}}</td>
							<!-- <template v-if="member.supervisor === 'Y'">
								<td>{{item.is_deleted}}</td>
								<td>{{item.deleted_at}}</td>
							</template> -->
						</tr>
				</tbody>
			</table>
			<!-- 페이지 처리 -->
				<div class="d-flex justify-content-center">
					<template v-if="pageResponse.prev">
						<router-link :to="makeUrl(pageResponse.startPage - 1)">이전 </router-link>
					</template>

					<template v-for="pageNo in pageRange" :key="pageNo">
						<router-link :to="{name: 'Board_List', query:{pageNo, size: size,  searchValue: searchValue || undefined}}">
							<template v-if="pageNo === pageResponse.pageNo">
								<b>{{ pageNo }}</b>
							</template>
							<template v-else>
								{{ pageNo }}
							</template>
						</router-link>
						&nbsp;
					</template>

					<template v-if="pageResponse.next">
						<router-link :to="makeUrl(pageResponse.endPage + 1)">다음</router-link>
					</template>
				</div>
		</main>
	</div>
</div>
</template>



<script setup>
	import { computed, watch, reactive} from 'vue'
	import axios from 'axios'
	import { useRouter, useRoute } from 'vue-router'
	const router = useRouter() // 보낼 경로
	const route = useRoute() // 현재 경로
	const sizes = [10, 30, 90, 100] // 건수 사이즈 
	// 초기값 설정
	const pageResponse = reactive ({ 
		list: [],
		endPage: 1,
		next: false,
		prev: false,
		startPage: 1,
		totalPage: 1
	})

	// size와 pagNo변경시 감지하여 함수 발생
	const pageNo = computed(() => parseInt(route.query.pageNo) || 1)
	const size = computed({
		get: () => parseInt(route.query.size) || 10,
		set: (val) => {
			router.push({
				name: 'Board_List',
				query: {
					...route.query,
					pageNo: 1, // 사이즈 바꾸면 1페이지로 초기화
					size: val
				}
			})
		}
	})

	const searchValue = computed({
		get: () => route.query.searchValue || '',
		set: (val) => {
			router.push({
			name: 'Board_List',
			query: {
				...route.query,
				pageNo: 1,
				searchValue: val || null
			}
			})
		}
	})
	
	const pageRange = computed(() => {
	  const range = []
	  for (let i = pageResponse.startPage; i <= pageResponse.endPage; i++) {
		range.push(i)
	  }
	  return range
	})
	
	watch([pageNo, size, () => route.query.searchValue], ([newPageNo, newSize, newSearch]) => {
		fetchData(newPageNo, newSize, newSearch)
	}, 
	{ immediate: true }
	)
	
	function searchID() {
		router.push({
			name: 'Board_List',
			query: {
			pageNo: 1, // 검색 시 1페이지로 이동
			size: size.value,
			searchValue: pageResponse.searchValue || null
			}
		})
	}
	// 값 변경시 다시 list 가져오도록 요청
	function fetchData(pageNo, size, searchValue) {
	axios.get(`/api/board/list?pageNo=${pageNo}&size=${size}&searchValue=${encodeURIComponent(searchValue || '')}`)
		.then(res => {
		Object.assign(pageResponse, res.data.pageResponse)
		})
	}

	// url 변경시 반응
	function makeUrl(pageNo) {
	const base = `list?pageNo=${pageNo}&size=${pageResponse.size}`
	return pageResponse.searchValue ? `${base}&searchValue=${encodeURIComponent(searchValue)}` : base
	}
</script>