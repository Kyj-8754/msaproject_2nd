<template>
    <div class="card card-body">
        <h2>Home</h2>
    </div>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<jsp:include page="/WEB-INF/views/common/nav.jsp"/>
			<!-- 우측 본문 -->
			<main class="col-md-10 main-area">
				<h1><Strong>환영 합니다.</Strong></h1>
				<div>
                    <p>현재 시간: {{ serverTime }}</p>
                </div>
				<table class = "table table-striped table-hover table-bordered mt-4">
					<thead class="table-dark text-center">
						<tr>
							<th>글번호</th>
							<th>제목</th>
							<th>작성자</th>
							<th>등록일</th>
							<th>조회수</th>
						</tr>
					</thead>
					<tbody class="text-center">
                        <!-- <tr v-for="item in pageResponse.list" :key="item">
                            <td>{{item.bno}}</td>
                            <td><a :href="`board/detailView?bno=${item.bno}`">${item.title}</a></td>
                            <td>{{item.writer}}</td>
                            <td>{{item.reg_date}}</td>
                            <td>{{item.view_count}}</td>
                        </tr> -->
					</tbody>
				</table>
			</main>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      serverTime: ''
    };
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.serverTime = now.toLocaleString("ko-KR", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
  },
  mounted() {
    this.updateTime(); // 초기 실행
    setInterval(this.updateTime, 1000); // 1초마다 갱신
  }
};
</script>
