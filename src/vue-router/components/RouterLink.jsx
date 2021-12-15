export default {
    name: 'router-link',
    props: {
        to: String
    },
    render(createElement, context) {
        const handler = () => {
            this.$router.push(this.to)
        }
        // 通过this.$slots拿到插槽
        return <a onClick={handler}>{this.$slots.default}</a>
    }
}
