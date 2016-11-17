jQuery(document).ready(function($) {
        
        var $canvas = $("#guycanvas");
        var ctx = $canvas.get(0).getContext("2d");
        
        ctx.scale(0.8, 0.8);
        
        var color_bg = "#a3b5b5";
        var color_fill = "#3ab0e2";
        var color_stripe = "#008ecc";
    
        // CANVAS
      
        var draw_figure = function (is_clip) {
            ctx.beginPath();
            
            // head
            ctx.moveTo(74.2, 56.5);
            ctx.bezierCurveTo(89.8, 56.5, 102.4, 43.9, 102.4, 28.3);
            ctx.bezierCurveTo(102.4, 12.7, 89.8, 0.0, 74.2, 0.0);
            ctx.bezierCurveTo(58.5, 0.0, 45.9, 12.7, 45.9, 28.3);
            ctx.bezierCurveTo(45.9, 43.9, 58.5, 56.5, 74.2, 56.5);
            
            // body
            ctx.moveTo(148.3, 112.0);
            ctx.bezierCurveTo(147.9, 90.1, 136.0, 78.7, 113.7, 78.7);
            ctx.lineTo(34.6, 78.7);
            ctx.bezierCurveTo(12.3, 78.7, 0.4, 90.1, 0.0, 112.0);
            ctx.bezierCurveTo(0.0, 112.3, 0.0, 112.7, 0.0, 113.0);
            ctx.lineTo(0.0, 214.8);
            ctx.bezierCurveTo(0.0, 221.0, 5.9, 226.1, 12.1, 226.1);
            ctx.bezierCurveTo(18.3, 226.1, 24.2, 221.0, 24.2, 214.8);
            ctx.bezierCurveTo(24.2, 214.8, 24.2, 148.3, 24.2, 136.2);
            ctx.bezierCurveTo(24.2, 124.1, 33.3, 124.1, 33.3, 136.2);
            ctx.bezierCurveTo(33.3, 145.3, 33.3, 201.5, 33.3, 231.1);
            ctx.lineTo(33.3, 248.7);
            ctx.lineTo(33.3, 368.0);
            ctx.bezierCurveTo(33.3, 377.0, 41.9, 384.4, 50.9, 384.4);
            ctx.lineTo(52.2, 384.4);
            ctx.bezierCurveTo(61.2, 384.4, 69.6, 377.0, 69.6, 368.0);
            ctx.bezierCurveTo(69.6, 368.0, 69.6, 260.3, 69.6, 248.2);
            ctx.bezierCurveTo(69.6, 236.1, 78.7, 236.1, 78.7, 248.2);
            ctx.bezierCurveTo(78.7, 260.3, 78.7, 368.0, 78.7, 368.0);
            ctx.bezierCurveTo(78.7, 377.0, 87.2, 384.4, 96.1, 384.4);
            ctx.lineTo(97.4, 384.4);
            ctx.bezierCurveTo(106.4, 384.4, 115.0, 377.0, 115.0, 368.0);
            ctx.lineTo(115.0, 248.7);
            ctx.lineTo(115.0, 231.1);
            ctx.bezierCurveTo(115.0, 201.5, 115.0, 145.3, 115.0, 136.2);
            ctx.bezierCurveTo(115.0, 124.1, 124.1, 124.1, 124.1, 136.2);
            ctx.bezierCurveTo(124.1, 148.3, 124.1, 214.8, 124.1, 214.8);
            ctx.bezierCurveTo(124.1, 221.0, 130.0, 226.1, 136.2, 226.1);
            ctx.bezierCurveTo(142.4, 226.1, 148.3, 221.0, 148.3, 214.8);
            ctx.lineTo(148.3, 113.0);
            ctx.bezierCurveTo(148.3, 112.7, 148.3, 112.3, 148.3, 112.0);
            
            if (is_clip)
                ctx.clip();
            else
                ctx.closePath();
        }
        
        var draw_fill = function(fill_percent) {
            fill_percent = typeof fill_percent !== 'undefined' ? fill_percent : 0;
            
            var w = ctx.canvas.width;
            var h = ctx.canvas.height;
            var h_scaled = h / 100;
            var fill_level = h - h_scaled * fill_percent;
            
            ctx.save(); // save current clipping setting as default
            
            ctx.beginPath();
            ctx.rect(0,fill_level,w,h);
            //ctx.rect(0,0,w,fill_level);
            ctx.clip();
            
            // Fill
            ctx.fillStyle = color_fill;
            ctx.fillRect(0, 0, w, h);
            
            // Draw stripe
            ctx.lineWidth = 100;
            ctx.beginPath();
            ctx.strokeStyle = color_stripe;
            ctx.moveTo(-50, h);
            ctx.lineTo(w*2, 0);
            ctx.stroke();
            
            ctx.restore();
        }
        
        var draw = function (is_initial, fill_percent) {
            fill_percent = typeof fill_percent !== 'undefined' ? fill_percent : 0;
            
            if (is_initial) {
                // Draw background figure
                draw_figure(false);
                ctx.fillStyle = color_bg; // light blue
                ctx.fill();
                
                draw_figure(true); // main clipping mask - figure
            }
            else {
                draw_fill(fill_percent); // progress clipping mask - rectangle
            }
        }
        
        // ANIMATION
        
        var animate_progress = function(upto, duration_ms) {
            duration_ms = typeof duration_ms !== 'undefined' ? duration_ms : 2000;
        
            var this_counter = 0;
            
            draw(true);
            
            jQuery({ Counter: this_counter }).animate({ Counter: upto }, {
                duration: duration_ms,
                easing: 'swing',
                step: function () {
                    this_counter = Math.ceil(this.Counter);
                    
                    // Percent display
                    $("#counter").text(this_counter + "%");
                    
                    // Progress image
                    draw(false, this_counter);
                }
            });
        }
        
        animate_progress( $("#counter").data("fill") );
        
    });
