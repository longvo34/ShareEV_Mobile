import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 48,
    color: '#000',
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },

  loginButton: {
    backgroundColor: '#FFD600',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },

  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  linkText: {
    fontSize: 14,
    color: '#000',
  },
});

export default styles;
