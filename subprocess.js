const { spawn } = require("child_process");


module.exports = (program, args) => {
    const processName = `${program} ${args.join(" ")}`;
    const sp = spawn(program, args, { shell: true });

    return {sp: sp, processName: processName};
};

