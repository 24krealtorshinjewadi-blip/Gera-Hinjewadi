param(
    [Parameter(Mandatory=$true)]
    [string]$GithubToken,
    [string]$Owner = "manishrai99-afk",
    [string]$Repo = "Gera-Developments"
)

$headers = @{
    "Authorization" = "token $GithubToken"
    "Accept"        = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

# -----------------
# 1. Master Branch
# -----------------
Write-Host "Configuring branch protection for master..."

$masterPayload = @{
    required_status_checks = @{
        strict = $true
        contexts = @("Build, Lint, Typecheck, and Test")
    }
    enforce_admins = $true
    required_pull_request_reviews = @{
        dismiss_stale_reviews = $true
        require_code_owner_reviews = $true
        required_approving_review_count = 1
    }
    restrictions = $null
    required_linear_history = $false
    allow_force_pushes = $false
    allow_deletions = $false
    block_creations = $false
    required_conversation_resolution = $true
    lock_branch = $false
    allow_fork_syncing = $false
} | ConvertTo-Json -Depth 10

$masterUrl = "https://api.github.com/repos/$Owner/$Repo/branches/master/protection"

try {
    $response = Invoke-RestMethod -Uri $masterUrl -Method Put -Headers $headers -Body $masterPayload -ContentType "application/json"
    Write-Host "Successfully protected master branch!" -ForegroundColor Green
} catch {
    Write-Error "Failed to configure master branch protection: $_"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errBody = $reader.ReadToEnd()
        Write-Host "Error details: $errBody" -ForegroundColor Red
    }
}

# ------------------
# 2. Develop Branch
# ------------------
Write-Host "Configuring branch protection for develop..."

$developPayload = @{
    required_status_checks = @{
        strict = $true
        contexts = @("Build, Lint, Typecheck, and Test")
    }
    enforce_admins = $true
    required_pull_request_reviews = @{
        dismiss_stale_reviews = $false
        require_code_owner_reviews = $false
        required_approving_review_count = 1
    }
    restrictions = $null
    required_linear_history = $false
    allow_force_pushes = $false
    allow_deletions = $false
    block_creations = $false
    required_conversation_resolution = $false
    lock_branch = $false
    allow_fork_syncing = $false
} | ConvertTo-Json -Depth 10

$developUrl = "https://api.github.com/repos/$Owner/$Repo/branches/develop/protection"

try {
    $response = Invoke-RestMethod -Uri $developUrl -Method Put -Headers $headers -Body $developPayload -ContentType "application/json"
    Write-Host "Successfully protected develop branch!" -ForegroundColor Green
} catch {
    Write-Error "Failed to configure develop branch protection: $_"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errBody = $reader.ReadToEnd()
        Write-Host "Error details: $errBody" -ForegroundColor Red
    }
}
