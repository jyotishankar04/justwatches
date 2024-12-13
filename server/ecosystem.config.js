module.exports = {
    app:[
        {
            name:"watch-store-server",
            script: "./dist/index.js",
            exec_mode: "cluster",
            instances: "max",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            }
        }
    ]
}