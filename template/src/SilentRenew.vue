<template>
<div>
</div>
</template>
<script>
import { mgr } from './api/auth/identityApi.js'

export default{
    mounted: function () {
        mgr.signinSilentCallback()
    }
}
</script>
