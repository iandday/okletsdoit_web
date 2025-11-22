<script lang="ts">
    import { Swiper } from "swiper";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import { Autoplay, Navigation, Pagination } from "swiper/modules";

    // Gallery configuration
    const photos = [
        { src: "/images/venue/gallery/boardwalk.webp", alt: "Venue Photo 1" },
        { src: "/images/venue/gallery/ceremonyLocation.webp", alt: "Venue Photo 2" },
        { src: "/images/venue/gallery/neighbors1.webp", alt: "Venue Photo 3" },
        { src: "/images/venue/gallery/neighbors2.webp", alt: "Venue Photo 4" },
        { src: "/images/venue/gallery/timberframe.webp", alt: "Venue Photo 5" },
    ];

    const swiperOptions = {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".gallery-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            prevEl: ".gallery-button-prev",
            nextEl: ".gallery-button-next",
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        modules: [Navigation, Pagination, Autoplay],
    };

    $effect(() => {
        new Swiper(".gallery-swiper", swiperOptions);
    });
</script>

<div class="pb-8 lg:pb-12 xl:pb-16">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <!-- Gallery Header -->
        <div class="text-center mb-8 md:mb-12">
            <div class="badge badge-primary badge-lg mb-4 gap-2 px-4 py-3">
                <span class="iconify lucide--images size-4"></span>
                Photo Gallery
            </div>
            <h2
                class="text-center text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Explore the Venue
            </h2>
            <p class="text-base-content/70 text-lg mt-4 max-w-2xl mx-auto">
                Take a visual tour of our beautiful wedding venue
            </p>
        </div>

        <!-- Swiper Gallery -->
        <div class="relative">
            <div class="gallery-swiper overflow-hidden rounded-2xl">
                <div class="swiper-wrapper">
                    {#each photos as photo}
                        <div class="swiper-slide">
                            <div
                                class="relative aspect-[4/3] overflow-hidden rounded-xl bg-base-200 shadow-lg transition-transform duration-300 hover:scale-105">
                                <img src={photo.src} alt={photo.alt} class="h-full w-full object-cover" />
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-8 flex items-center justify-center gap-4">
                <button
                    class="gallery-button-prev border-base-200 flex size-10 md:size-12 cursor-pointer items-center justify-center rounded-full bg-base-100 shadow-lg transition-all hover:shadow-xl hover:scale-110 dark:border-white/10 dark:bg-base-300">
                    <span class="iconify lucide--chevron-left size-5 md:size-6"></span>
                </button>

                <!-- Pagination -->
                <div class="gallery-pagination flex gap-2"></div>

                <button
                    class="gallery-button-next border-base-200 flex size-10 md:size-12 cursor-pointer items-center justify-center rounded-full bg-base-100 shadow-lg transition-all hover:shadow-xl hover:scale-110 dark:border-white/10 dark:bg-base-300">
                    <span class="iconify lucide--chevron-right size-5 md:size-6"></span>
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    :global(.gallery-pagination .swiper-pagination-bullet) {
        width: 10px;
        height: 10px;
        background: hsl(var(--bc) / 0.3);
        opacity: 1;
        transition: all 0.3s;
    }

    :global(.gallery-pagination .swiper-pagination-bullet-active) {
        background: hsl(var(--p));
        width: 24px;
        border-radius: 5px;
    }
</style>
