import rollup      from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';

export default {
    entry: 'app/main.js',
    dest: 'dist_final/build.js', // output a single application bundle
    sourceMap: false,
    format: 'iife',
    plugins: [
        nodeResolve({jsnext: true, module: true}),
        commonjs({
            include: 'node_modules/rxjs/**',
            namedExports: {
                "ng2-bootstrap.js": ['Ng2BootstrapModule']
            }
        }),
        uglify()
    ]
}
