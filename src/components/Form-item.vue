<template>
	<el-form-item v-if="field.type == 'stat'" :label="field.name" :prop="field.code">
		<el-radio-group v-model="formData[field.code]">
			<el-radio v-for="option in field.rangeset" :key="option" :label="parseInt(option.split(':')[0])">{{option.split(':')[1]}}</el-radio>
		</el-radio-group>
	</el-form-item>
	
	<el-form-item v-else :label="field.name" :prop="field.code">
		<el-input v-model.number="formData[field.code]" :disabled="field.editable"></el-input>
	</el-form-item>
</template>


<script>
	export default {
		props: ['field','formData']
	}
</script>