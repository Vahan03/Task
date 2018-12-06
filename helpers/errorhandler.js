const colors = require('colors/safe')

module.exports = (message,errorFunction,errorModule,dirname)=>{
  console.log(colors.rainbow(
`|-----------------Error-----------------|
|-Message: ${message}
|-Function: ${errorFunction}
|-Module: ${errorModule}
|-Path: ${dirname}
|---------------------------------------|
Process will be terminated to avoid data corruption`
));
  process.exitCode = 1;
  process.exit();
}
