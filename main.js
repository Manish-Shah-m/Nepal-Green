$(document).ready(function() {
    // Mobile Menu Toggle
    $('#mobile-menu').click(function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // Smooth scrolling for navigation links
    $('.nav-link, .footer-links a').click(function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
            
            // Close mobile menu after click
            $('#mobile-menu').removeClass('active');
            $('.nav-menu').removeClass('active');
        }
    });

    // Navbar color change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#navbar ').addClass('scrolled');
        } else {
            $('#navbar ').removeClass('scrolled');
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#navbar a').addClass('scrolled');
        } else {
            $('#navbar a').removeClass('scrolled');
        }
    });

    // Counter animation for stats
    function animateStats() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.attr('data-count'));
            
            $({countNum: 0}).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger stats animation when scrolled into view
    const statsSection = $('#about');
    $(window).scroll(function() {
        if ($(this).scrollTop() > statsSection.offset().top - 500) {
            if (!statsSection.hasClass('counted')) {
                statsSection.addClass('counted');
                animateStats();
            }
        }
    });

    // Quote slider
    let currentQuote = 0;
    
    function showQuote(index) {
        $('.quote-slide').removeClass('active');
        $('.quote-dot').removeClass('active');
        
        $('.quote-slide').eq(index).addClass('active');
        $('.quote-dot').eq(index).addClass('active');
    }
    
    $('.quote-dot').click(function() {
        currentQuote = $(this).data('slide');
        showQuote(currentQuote);
    });
    
    // Auto rotate quotes
    setInterval(function() {
        currentQuote = (currentQuote + 1) % $('.quote-slide').length;
        showQuote(currentQuote);
    }, 5000);

    // Testimonial slider
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        $('.testimonial-slide').removeClass('active');
        $('.testimonial-dot').removeClass('active');
        
        $('.testimonial-slide').eq(index).addClass('active');
        $('.testimonial-dot').eq(index).addClass('active');
    }
    
    $('.testimonial-dot').click(function() {
        currentTestimonial = $(this).data('slide');
        showTestimonial(currentTestimonial);
    });
    
    $('.testimonial-arrow.next').click(function() {
        currentTestimonial = (currentTestimonial + 1) % $('.testimonial-slide').length;
        showTestimonial(currentTestimonial);
    });
    
    $('.testimonial-arrow.prev').click(function() {
        currentTestimonial = (currentTestimonial - 1 + $('.testimonial-slide').length) % $('.testimonial-slide').length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto rotate testimonials
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % $('.testimonial-slide').length;
        showTestimonial(currentTestimonial);
    }, 7000);

    // Project filters
    $('.filter-btn').click(function() {
        const filter = $(this).data('filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.project-card').show();
        } else {
            $('.project-card').hide();
            $('.project-card.' + filter).show();
        }
    });

    // Donation tabs
    $('.donation-tab').click(function() {
        const tab = $(this).data('tab');
        
        $('.donation-tab').removeClass('active');
        $(this).addClass('active');
        
        // Additional functionality for monthly/one-time donation could be added here
    });

    // Donation amount buttons
    $('.amount-btn').click(function() {
        const amount = $(this).data('amount');
        
        $('.amount-btn').removeClass('active');
        $(this).addClass('active');
        
        if (amount === 'custom') {
            $('.custom-amount').show();
        } else {
            $('.custom-amount').hide();
            $('.btn-full').text('Donate ₹' + amount + ' Now');
        }
    });

    // Custom donation amount input
    $('#custom-donation').on('input', function() {
        const customAmount = $(this).val();
        if (customAmount > 0) {
            $('.btn-full').text('Donate ₹' + customAmount + ' Now');
        } else {
            $('.btn-full').text('Donate Now');
        }
    });

    // Contact form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Display form submission message
        const formData = $(this).serialize();
        $(this).html('<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you for your message! We will get back to you soon.</p></div>');
        
        // In production, you would send the form data to a server here
        console.log("Form submitted with data:", formData);
    });

    // Newsletter form submission
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        if (email) {
            $(this).html('<p class="success-text">Thank you for subscribing!</p>');
            
            // In production, you would send the email to a server here
            console.log("Newsletter subscription:", email);
        }
    });
});