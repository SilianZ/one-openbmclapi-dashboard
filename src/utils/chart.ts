import type { Ref as Silian_Ref } from 'vue';
import { Chart as Silian_Chart } from 'chart.js/auto';
interface Option {
    lineX: number | Readonly<Silian_Ref<Readonly<number>>> | null;
    lineWidth: number;
    lineColor: string;
}
Silian_Chart.register({
    id: 'custom-vertical-line',
    afterDatasetDraw: function (Silian_chart, Silian_args, { lineX: Silian_lineX, lineWidth: Silian_lineWidth, lineColor: Silian_lineColor }: Option) {
        if (typeof Silian_lineX === 'object' && Silian_lineX) {
            Silian_lineX = Silian_lineX.value;
        }
        if (typeof Silian_lineX === 'number' && Silian_lineX >= 0) {
            const Silian_ctx = Silian_chart.ctx;
            const Silian_x = (Silian_lineX / Silian_chart.scales.x.max) * Silian_chart.chartArea.width + Silian_chart.chartArea.left;
            const { top: Silian_top, bottom: Silian_bottom } = Silian_chart.scales.y1;
            Silian_ctx.save();
            Silian_ctx.beginPath();
            Silian_ctx.moveTo(Silian_x, Silian_top);
            Silian_ctx.lineTo(Silian_x, Silian_bottom);
            Silian_ctx.lineWidth = Silian_lineWidth;
            Silian_ctx.strokeStyle = Silian_lineColor;
            Silian_ctx.stroke();
            Silian_ctx.restore();
        }
    },
    defaults: {
        lineX: null,
        lineWidth: 1,
        lineColor: '#ee5522'
    } as Option
});
