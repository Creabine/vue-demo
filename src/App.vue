<template>
	<div id="dashboard">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/form' }">Form</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/list' }">List</el-breadcrumb-item>
		</el-breadcrumb>

		<router-view></router-view>

	</div>
</template>


<script>
	export default {
		data() {
			return {
				activeName: 'second'
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	};
</script>

<style>
	#dashboard{
		width: 80%;
		margin: 50px auto;
	}
</style>


