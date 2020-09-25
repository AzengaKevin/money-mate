<script>
import { Pie } from "vue-chartjs";
export default {
    name: "PieChart",

    extends: Pie,

    data(){
        return {
        }
    },

    props: {
        label: String,
        chartData: Array,
        options: Object
    },

    mounted(){

        const totals = this.chartData.map(d => d.total)
        const colors = this.chartData.map(d => d.color)
        const labels = this.chartData.map(d => d.label)

        this.renderChart({
            labels,
            datasets: [{
                label: this.label,
                data: totals,
                backgroundColor: colors
            }]
        }, this.options)

    }

}
</script>

<style scoped>

</style>