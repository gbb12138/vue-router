export default {
    name: 'router-view',
    render() {
        return <div>{this.$route.path}</div>
    }
}
