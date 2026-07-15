import config from "@/lib/config.data";
import cities from "@/lib/cities.data";
import servicePages from "@/lib/servicePages.data";
import blogPosts from "@/lib/blogPosts.data";
import type { SiteBundle } from "@/lib/site";

const bundle: SiteBundle = { config, cities, servicePages, blogPosts };
export default bundle;
