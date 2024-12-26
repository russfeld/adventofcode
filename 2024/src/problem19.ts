import { Trie, TrieNode } from "@datastructures-js/trie";

export function problem19a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile).split(/\n\n/);
  const patterns = input[0].trim().split(",").map((x) => x.trim());
  const designs = input[1].trim().split("\n");
  const trie = new Trie();
  let max_length = 0;
  for (const pattern of patterns) {
    if (pattern.length > max_length) {
      max_length = pattern.length;
    }
    trie.insert(pattern);
  }
  trie.insert("");
  let count = 0;
  for (const design of designs) {
    let nodes: Set<TrieNode> = new Set();
    nodes.add(trie.find(""));
    for (const char of design) {
      const new_nodes: Set<TrieNode> = new Set();
      //console.log(nodes);
      for (const node of nodes) {
        if (node) {
          const next = node.getChild(char);
          if (next) {
            new_nodes.add(next);
            if (next.isEndOfWord()) {
              new_nodes.add(trie.find(""));
            }
          }
        }
      }
      nodes = new_nodes;
    }
    if (nodes.has(trie.find(""))) {
      count++;
    }
  }
  return count;
}

class NodeCount {
  node: TrieNode;
  count: number;
  constructor(node: TrieNode, count: number = 1) {
    this.node = node;
    this.count = count;
  }
}

export function problem19b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile).split(/\n\n/);
  const patterns = input[0].trim().split(",").map((x) => x.trim());
  const designs = input[1].trim().split("\n");
  const trie = new Trie();
  let max_length = 0;
  for (const pattern of patterns) {
    if (pattern.length > max_length) {
      max_length = pattern.length;
    }
    trie.insert(pattern);
  }
  trie.insert("");
  let count = 0;
  for (const design of designs) {
    let nodes: NodeCount[] = [new NodeCount(trie.find(""))];
    for (const char of design) {
      const new_nodes: NodeCount[] = [];
      //console.log(nodes);
      for (const node of nodes) {
        if (node) {
          const next = node.node.getChild(char);
          if (next) {
            const new_node = new_nodes.find((x) => x.node === next);
            if (new_node) {
              new_node.count += node.count;
            } else {
              new_nodes.push(new NodeCount(next, node.count));
            }
            if (next.isEndOfWord()) {
              const new_node = new_nodes.find((x) => x.node === trie.find(""));
              if (new_node) {
                new_node.count += node.count;
              } else {
                new_nodes.push(new NodeCount(trie.find(""), node.count));
              }
            }
          }
        }
      }
      nodes = new_nodes;
    }
    count += nodes.find((x) => x.node === trie.find(""))?.count || 0;
  }
  return count;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem19a("inputs/19e.txt"));
  console.log(problem19b("inputs/19e.txt"));
  console.log("Real Inputs");
  console.log(problem19a("inputs/19.txt"));
  console.log(problem19b("inputs/19.txt"));
}

Deno.bench("problem19a", () => {
  problem19a("inputs/19.txt");
});

Deno.bench("problem19b", () => {
  problem19b("inputs/19.txt");
});
