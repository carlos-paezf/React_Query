export interface IssueType {
    url: string
    repository_url: string
    labels_url: string
    comments_url: string
    events_url: string
    html_url: string
    id: number
    node_id: string
    number: number
    title: string
    user: UserType
    labels: LabelType[]
    state: StateType
    locked: boolean
    assignee: UserType | null
    assignees: UserType[]
    milestone: null
    comments: number
    created_at: string
    updated_at: string
    closed_at: null
    author_association: AuthorAssociationType
    active_lock_reason: null
    body: string
    reactions: ReactionsType
    timeline_url: string
    performed_via_github_app: null
    state_reason: null | string
    draft?: boolean
    pull_request?: PullRequestType
}

export interface UserType {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: Type
    site_admin: boolean
}

export enum Type {
    Bot = "Bot",
    User = "User",
}

export enum AuthorAssociationType {
    Collaborator = "COLLABORATOR",
    Contributor = "CONTRIBUTOR",
    Member = "MEMBER",
    None = "NONE",
}

export interface LabelType {
    id: number
    node_id: string
    url: string
    name: string
    color: string
    default: boolean
    description?: string
}

export interface PullRequestType {
    url: string
    html_url: string
    diff_url: string
    patch_url: string
    merged_at: null
}

export interface ReactionsType {
    url: string
    total_count: number
    "+1": number
    "-1": number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
}

export enum StateType {
    Open = "open",
    Closed = "closed"
}
