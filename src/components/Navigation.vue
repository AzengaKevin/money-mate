<template>
<div>
    <v-app-bar
      app
      color="primary"
      dark>
      <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="showDrawer">
        <v-list>
            <v-list-item-group>
            <v-list-item>
                <v-list-item-avatar size="96">
                    <img src="https://picsum.photos/400" alt="User Avatar">
                </v-list-item-avatar>
            </v-list-item>
            <v-list-item class="font-weight-bold">John Doe</v-list-item>
            </v-list-item-group>

            <v-list-item v-for="(link, index) in links" :key=index link :to=link.route>
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>

import { mapState } from "vuex";

export default {
    name: 'Navigation',
    props: {
      title: String
    },

    data() {
      return {
        showDrawer: false,
      }
    },

    computed: {
      ...mapState(['links'])
    },
}
</script>

<style scoped>

</style>