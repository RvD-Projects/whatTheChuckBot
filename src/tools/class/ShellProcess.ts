import { exec, execFile, fork, spawn } from "child_process";
import path, { resolve } from "path/posix";

export default class ShellProcess {

    public static bashCmd(command: string, args: string[]) {
        const execProcess = spawn(command, args);
        console.log('bashCmd');
        console.log(execProcess.spawnfile);

        // Events
        execProcess.on('spawn', () => {
            console.log('bashCmd on spawn');
        });
        execProcess.stdout.on('data', (data) => {
            console.log(`bashCmd stdout: ${data}`);
        });
        execProcess.stderr.on('data', (data) => {
            console.log(`bashCmd on error ${data}`);
        });
        execProcess.on('exit', (code, signal) => {
            console.log(`bashCmd on exit code: ${code} signal: ${signal}`);
        });
        execProcess.on('close', (code: number, args: any[]) => {
            console.log(`bashCmd on close code: ${code} args: ${args}`);
        });
    }
}