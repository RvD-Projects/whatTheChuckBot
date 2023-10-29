import { exec, execFile, fork, spawn } from "child_process";
import path, { resolve } from "path/posix";

export default class ShellProcess {

    public static shellExec(command: string, args: string[]) {
        const execProcess = spawn(command, args);
        console.log('shellExec', command, args);
        console.log('file:', execProcess.spawnfile);

        return execProcess;
    }
}


//  // Events examples
//  execProcess.on('spawn', () => {
//     console.log('shellExec on spawn');
// });
// execProcess.stdout.on('data', (data) => {
//     console.log(`shellExec stdout: ${data}`);
// });
// execProcess.stderr.on('data', (data) => {
//     console.log(`shellExec on error ${data}`);
// });
// execProcess.on('exit', (code, signal) => {
//     console.log(`shellExec on exit code: ${code} signal: ${signal}`);
// });
// execProcess.on('close', async (code: number, args: any[]) => {
//     console.log(`shellExec on close code: ${code} args: ${args}`);
// });