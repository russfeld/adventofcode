import java.nio.file.*;
import java.util.*;
import java.math.BigInteger;

public class problem07 {

  public static void main(String[] args) throws Exception {
    List<String> input_list = Files.readAllLines(Paths.get("../inputs/07.txt"));
    String[] input = input_list.toArray(new String[0]);
    Map<Integer, Long> lines = new HashMap<>();
    lines.put(input[0].indexOf('S'), (long) 1);
    int len = input.length;
    for (int i = 1; i < len; i++) {
      Map<Integer, Long> new_lines = new HashMap<>();
      for (Integer loc : lines.keySet()) {
        long count = lines.get(loc);
        if (input[i].charAt(loc) == '^') {
          if (new_lines.containsKey(loc - 1)) {
            new_lines.put(loc - 1, new_lines.get(loc - 1) + count);
          } else {
            new_lines.put(loc - 1, count);
          }
          if (new_lines.containsKey(loc + 1)) {
            new_lines.put(loc + 1, new_lines.get(loc + 1) + count);
          } else {
            new_lines.put(loc + 1, count);
          }
        } else {
          if (new_lines.containsKey(loc)) {
            new_lines.put(loc, new_lines.get(loc) + count);
          } else {
            new_lines.put(loc, count);
          }
        }
      }
      lines = new_lines;
    }
    long output = 0;
    for (long i : lines.values()) {
      output += i;
    }
    System.out.println(output);
  }
}