export interface VNode {
    tag: string ;
    children: string | VNode[];
    props: { [key: string]: string | EventListener };
}

export interface Component {
    tag: () => VNode;
    props: { [key: string]: string | EventListener };
    children: VNode[];
}

