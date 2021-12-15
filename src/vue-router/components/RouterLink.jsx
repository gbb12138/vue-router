export default {
    name: 'router-link',
    props: {
        to: String
    },
    render(createElement, context) {
        // 通过this.$slots拿到插槽
        return <a>{this.$slots.default}</a>
    }
}
