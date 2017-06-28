<template>
    <div class="layout-breadcrumb">
        <Breadcrumb>
            <template v-if="firstBool">
                <Breadcrumb-item href="#">\{{firstName}}</Breadcrumb-item>
                <!--<Breadcrumb-item href="#">\{{firstName}}</Breadcrumb-item>-->
            </template>
            <template v-else>
                <Breadcrumb-item href="#">\{{firstName}}</Breadcrumb-item>
                <Breadcrumb-item href="#" >\{{secondName}}</Breadcrumb-item>
            </template>
        </Breadcrumb>
    </div>
</template>
<script>
    import menu from '../../config/menu'
    export default {
        data () {
            return {
                index: this.$route.query.index,
                first: this.$route.path
            }
        },
        computed: {
            firstName () {
                if (this.index) {
                    let item = Number(this.index.substr(0, 1)) - 1
                    return menu[item].text
                }
            },
            secondName () {
                if (this.index) {
                    let childIndex = Number(this.index.substring(2)) - 1
                    if (childIndex !== -1) {
                        let item = Number(this.index.substr(0, 1)) - 1
                        let secondName = menu[item].child[childIndex].text
                        return secondName
                    } else {
                        return ''
                    }
                }
            },
            firstBool () {
                if (this.secondName === '') {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .layout-breadcrumb{
    }
</style>
