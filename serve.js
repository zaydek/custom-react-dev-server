const { build } = require("esbuild")
const chokidar = require("chokidar")
const fs = require("fs")
const liveServer = require("live-server")
const sass = require("sass")

function buildSass() {
	const res = sass.renderSync({
		file: "src/index.scss",
		includePaths: ["node_modules"],
		outFile: "build/bundle.css",
		outputStyle: process.env.NODE_ENV === "development" ? "compressed" : "expanded",
	})
	const css = res.css.toString()
	fs.writeFileSync("build/bundle.css", css)
}

;(async () => {
	const esbuild = await build({
		bundle: true,
		define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
		entryPoints: ["src/index.tsx"],
		incremental: process.env.NODE_ENV !== "production",
		minify: process.env.NODE_ENV === "production",
		outfile: "build/bundle.js",
	})

	if (process.env.NODE_ENV !== "production") {
		// TS
		chokidar
			.watch("src/**/*.{ts,tsx}", {
				interval: 0, // No delay
			})
			.on("all", () => {
				esbuild.rebuild()
			})

		// SCSS
		chokidar
			.watch("src/**/*.{css,scss}", {
				interval: 0, // No delay
			})
			.on("all", () => {
				buildSass()
			})

		liveServer.start({
			file: "index.html",
			open: true,
			port: +process.env.PORT || 8080,
			root: "build",
		})
	} else {
		buildSass()
	}
})()
