import config from "./site";
import cities from "./cities";
import servicePages from "./services";
import blogPosts from "./blog";
import type { SiteBundle } from "@/lib/site";

const bundle: SiteBundle = { config, cities, servicePages, blogPosts };
export default bundle;
