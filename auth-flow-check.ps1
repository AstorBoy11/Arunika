$base='http://localhost:3000'
$ws=New-Object Microsoft.PowerShell.Commands.WebRequestSession

function Get-StatusAndLocation([string]$url,[Microsoft.PowerShell.Commands.WebRequestSession]$session){
  try {
    $r=Invoke-WebRequest -Uri $url -WebSession $session -MaximumRedirection 0 -ErrorAction Stop
    return @{ Status=$r.StatusCode; Location=$r.Headers.Location }
  } catch {
    if ($_.Exception.Response) {
      return @{ Status=[int]$_.Exception.Response.StatusCode; Location=$_.Exception.Response.Headers['Location'] }
    }
    throw
  }
}

$unauthAdmin=Get-StatusAndLocation "$base/admin/dashboard" $ws
Write-Output "UNAUTH_ADMIN_STATUS=$($unauthAdmin.Status)"
Write-Output "UNAUTH_ADMIN_LOCATION=$($unauthAdmin.Location)"

$email="user$(Get-Random -Minimum 1000 -Maximum 9999)@example.com"
$registerBody=@{ name='Test User'; email=$email; password='User12345' } | ConvertTo-Json
$register=Invoke-WebRequest -Uri "$base/api/auth/register" -Method Post -ContentType 'application/json' -Body $registerBody
Write-Output "REGISTER_STATUS=$($register.StatusCode)"
Write-Output "REGISTER_BODY=$($register.Content)"

$csrfAdminResp=Invoke-WebRequest -Uri "$base/api/auth/csrf" -WebSession $ws
$csrfAdmin=((ConvertFrom-Json $csrfAdminResp.Content).csrfToken)
$adminEmail=[uri]::EscapeDataString('admin@arunika.local')
$adminPass=[uri]::EscapeDataString('Admin12345')
$adminCsrf=[uri]::EscapeDataString($csrfAdmin)
$adminCb=[uri]::EscapeDataString("$base/admin/dashboard")
$adminLoginBody="email=$adminEmail&password=$adminPass&csrfToken=$adminCsrf&callbackUrl=$adminCb&json=true"
$adminLogin=Invoke-WebRequest -Uri "$base/api/auth/callback/credentials" -Method Post -ContentType 'application/x-www-form-urlencoded' -Body $adminLoginBody -WebSession $ws
Write-Output "ADMIN_LOGIN_STATUS=$($adminLogin.StatusCode)"
Write-Output "ADMIN_LOGIN_BODY=$($adminLogin.Content)"

$adminSession=Invoke-WebRequest -Uri "$base/api/auth/session" -WebSession $ws
Write-Output "ADMIN_SESSION_BODY=$($adminSession.Content)"

$authAdmin=Get-StatusAndLocation "$base/admin/dashboard" $ws
Write-Output "AUTH_ADMIN_STATUS=$($authAdmin.Status)"
Write-Output "AUTH_ADMIN_LOCATION=$($authAdmin.Location)"

$csrfLogout=((ConvertFrom-Json (Invoke-WebRequest -Uri "$base/api/auth/csrf" -WebSession $ws).Content).csrfToken)
$logoutCsrf=[uri]::EscapeDataString($csrfLogout)
$logoutCb=[uri]::EscapeDataString("$base/auth")
$logoutBody="csrfToken=$logoutCsrf&callbackUrl=$logoutCb&json=true"
$logout=Invoke-WebRequest -Uri "$base/api/auth/signout" -Method Post -ContentType 'application/x-www-form-urlencoded' -Body $logoutBody -WebSession $ws
Write-Output "LOGOUT_STATUS=$($logout.StatusCode)"
Write-Output "LOGOUT_BODY=$($logout.Content)"

$sessionAfterLogout=Invoke-WebRequest -Uri "$base/api/auth/session" -WebSession $ws
Write-Output "SESSION_AFTER_LOGOUT=$($sessionAfterLogout.Content)"

$userWs=New-Object Microsoft.PowerShell.Commands.WebRequestSession
$csrfUser=((ConvertFrom-Json (Invoke-WebRequest -Uri "$base/api/auth/csrf" -WebSession $userWs).Content).csrfToken)
$userEmail=[uri]::EscapeDataString($email)
$userPass=[uri]::EscapeDataString('User12345')
$userCsrf=[uri]::EscapeDataString($csrfUser)
$userCb=[uri]::EscapeDataString("$base/user/dashboard")
$userLoginBody="email=$userEmail&password=$userPass&csrfToken=$userCsrf&callbackUrl=$userCb&json=true"
$userLogin=Invoke-WebRequest -Uri "$base/api/auth/callback/credentials" -Method Post -ContentType 'application/x-www-form-urlencoded' -Body $userLoginBody -WebSession $userWs
Write-Output "USER_LOGIN_STATUS=$($userLogin.StatusCode)"
Write-Output "USER_LOGIN_BODY=$($userLogin.Content)"

$userSession=Invoke-WebRequest -Uri "$base/api/auth/session" -WebSession $userWs
Write-Output "USER_SESSION_BODY=$($userSession.Content)"

$userAdminGate=Get-StatusAndLocation "$base/admin/dashboard" $userWs
Write-Output "USER_TO_ADMIN_STATUS=$($userAdminGate.Status)"
Write-Output "USER_TO_ADMIN_LOCATION=$($userAdminGate.Location)"

$userDash=Get-StatusAndLocation "$base/user/dashboard" $userWs
Write-Output "USER_DASH_STATUS=$($userDash.Status)"
Write-Output "USER_DASH_LOCATION=$($userDash.Location)"
