import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'

const copy = function (options) {
  return {
    ongenerate () {
      const destDir = path.dirname(options.dest)

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir)
      }

      fs.writeFileSync(options.dest, fs.readFileSync(options.src))
    }
  }
}

const link = function (options) {
  return {
    ongenerate () {
      if (!fs.existsSync(options.dest)) {
        fs.symlinkSync(options.src, options.dest)
      }
    }
  }
}

export default {
  input: 'src/entry.js',
  output: {
    file: 'build/bundle.js',
    format: 'umd'
  },
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    json(),
    babel(),
    copy({
      src: 'src/index.html',
      dest: 'build/index.html'
    }),
    copy({
      src: 'src/app.css',
      dest: 'build/app.css'
    }),
    link({
      src: '../api/assets',
      dest: 'build/assets'
    })
  ]
}
