param([switch]$NoTunnel)
$ErrorActionPreference='Stop'
$root=Split-Path -Parent $PSScriptRoot
$logs=Join-Path $root 'backups\runtime-logs'
New-Item -ItemType Directory -Path $logs -Force | Out-Null
if(-not (Test-Path (Join-Path $root '.env'))){throw '.env topilmadi.'}
$keys=Get-Content (Join-Path $root '.env') | Where-Object {$_ -match '^[A-Za-z_][A-Za-z0-9_]*=' -and $_ -notmatch '=\s*$'} | ForEach-Object {($_ -split '=',2)[0]}
if('TELEGRAM_BOT_TOKEN' -notin $keys){Write-Warning 'TELEGRAM_BOT_TOKEN kiritilmagan: web/API ishga tushadi, Telegram polling ishga tushmaydi.'}
$api=Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','api' -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logs 'api.out.log') -RedirectStandardError (Join-Path $logs 'api.err.log') -PassThru
$web=Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev','--','--host','127.0.0.1','--port','4173' -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logs 'web.out.log') -RedirectStandardError (Join-Path $logs 'web.err.log') -PassThru
$poll=$null;if('TELEGRAM_BOT_TOKEN' -in $keys){$poll=Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','telegram:poll' -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logs 'telegram.out.log') -RedirectStandardError (Join-Path $logs 'telegram.err.log') -PassThru}
$tunnel=$null;if(-not $NoTunnel){$found=Get-Command cloudflared -ErrorAction SilentlyContinue;$cloudflared=if($found){$found.Source}else{'C:\Program Files (x86)\cloudflared\cloudflared.exe'};if(-not(Test-Path -LiteralPath $cloudflared)){throw 'cloudflared topilmadi.'};$tunnel=Start-Process -FilePath $cloudflared -ArgumentList 'tunnel','--url','http://127.0.0.1:8787','--no-autoupdate' -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logs 'tunnel.out.log') -RedirectStandardError (Join-Path $logs 'tunnel.err.log') -PassThru}
[pscustomobject]@{ApiPid=$api.Id;WebPid=$web.Id;TelegramPid=$poll.Id;TunnelPid=$tunnel.Id;Logs=$logs}
